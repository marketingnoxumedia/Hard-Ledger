#!/usr/bin/env python3
"""Build the final cut from the measured voice: timeline, overlay, stem, picture.

The planned 42.4s timeline was arithmetic. This derives the real one from the rendered
audio — each beat lasts as long as its line actually takes plus the pause the script
asks for after it — then paints the text layer to match and cuts the footage to fit.
Audio leads; picture follows. That is the only way the captions stay locked to the voice.

    python3 finalise.py --selects selects.json
"""
import argparse, json, math, os, subprocess, sys
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "out")
W, H, FPS = 1080, 1920, 30

GREEN, HONEY, SKY, CREAM, BLACK = (47,94,59), (244,180,0), (200,221,242), (255,247,232), (43,43,43)
FD = "/usr/share/fonts/truetype/dejavu/"
def F(sz): return ImageFont.truetype(FD + "DejaVuSans.ttf", sz)

LIVE_T, LIVE_B, X_MIN, X_MAX = 350, 1300, 90, 900
MAX_TEXT_W = X_MAX - X_MIN - 48

# line id -> (shot id, gap after the line, minimum shot length)
# The minimums protect deliberate holds: S1's beat-and-a-half after the question, and
# S4's long hold, which rule 6 says to let simply be the delightful thing.
BEATS = [("L1","S1",1.5,0), ("L2","S2",0.4,0), ("L3","S3a",0.0,0), ("L4","S3b",0.4,0),
         ("L5","S4",0.6,6.1), ("L6","S5",0.8,0), ("L7","S6",0.6,0), ("L8","S7",0.5,0),
         ("L9","S8",0.6,0), ("L10","S9",0.0,2.9)]

# line id -> on-screen pieces, verbatim. kind: feature-cream | feature-sky | caption | card
TEXT = {
 "L1": [("caption","Have you noticed your"), ("caption","two-month-old looking right at you?")],
 "L2": [("feature-cream","Two months is when they start looking back.")],
 "L3": [("caption","Faces become the most"), ("caption","interesting thing in the room.")],
 "L4": [("caption","And yours is the favourite.")],
 "L5": [("caption","Smile at them, talk to them"), ("caption","some babies will smile back.")],
 "L6": [("feature-sky","Listen for sounds that aren't crying."), ("feature-sky","A grumble. A small vowel.")],
 "L7": [("feature-sky","Make the sound back, then wait."), ("feature-sky","Often, they go again.")],
 "L8": [("caption","Some do this at six weeks."), ("caption","Some nearer three months."),
        ("feature-cream","Both are ordinary.")],
 "L9": [("caption","Say something back.")],
 "L10":[("card","Save this for the week it happens.")],
}


def dur(p):
    r = subprocess.run(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",p],
                       capture_output=True, text=True, check=True)
    return float(r.stdout.strip())


def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode:
        sys.exit(f"ffmpeg failed: {' '.join(cmd[:6])}...\n{r.stderr[-700:]}")


def fit(draw, text, target, max_lines=2, min_sz=30):
    words, sz = text.split(), target
    while sz >= min_sz:
        f, lines, cur, ok = F(sz), [], "", True
        for w in words:
            t = (cur + " " + w).strip()
            if draw.textlength(t, font=f) <= MAX_TEXT_W: cur = t
            else:
                if cur: lines.append(cur)
                cur = w
                if draw.textlength(w, font=f) > MAX_TEXT_W: ok = False; break
        if cur: lines.append(cur)
        if ok and len(lines) <= max_lines: return f, lines
        sz -= 2
    return F(min_sz), [text]


def chip(img, text, top, fg, bg, alpha, size, centre, underline=False):
    d = ImageDraw.Draw(img, "RGBA")
    f, lines = fit(d, text, size)
    hs = [d.textbbox((0,0), l, font=f)[3] - d.textbbox((0,0), l, font=f)[1] for l in lines]
    total = sum(hs) + 14*(len(lines)-1)
    boxw = max(d.textbbox((0,0), l, font=f)[2] for l in lines) + 48
    x0 = (X_MIN + X_MAX)//2 - boxw//2 if centre else X_MIN
    a = int(255*alpha)
    d.rounded_rectangle([x0, top, x0+boxw, top+total+48], radius=12, fill=(*bg, int(a*0.93)))
    y = top + 24
    for l, h in zip(lines, hs):
        wpx = d.textbbox((0,0), l, font=f)[2]
        d.text((x0 + boxw//2 - wpx//2 if centre else x0+24, y), l, font=f, fill=(*fg, a))
        y += h + 14
    if underline:
        d.rectangle([x0+24, top+total+48-16, x0+24+min(360, boxw-48), top+total+48-10], fill=(*HONEY, a))
    return total + 48


def logo(img, x, y, w=120):
    d = ImageDraw.Draw(img, "RGBA")
    r = w/2; cx, cy = x+r, y+r*0.87
    pts = [(cx+r*math.cos(math.radians(a)), cy+r*0.87*math.sin(math.radians(a))) for a in range(-90,271,60)]
    d.polygon(pts, fill=(*CREAM,255))
    for i in range(len(pts)): d.line([pts[i], pts[(i+1)%len(pts)]], fill=(*GREEN,255), width=5)
    bw, bh = r*0.62, r*0.44
    d.ellipse([cx-bw/2, cy-bh/2, cx+bw/2, cy+bh/2], fill=(*HONEY,255), outline=(*GREEN,255), width=3)
    d.line([cx-bw*0.10, cy-bh/2+3, cx-bw*0.10, cy+bh/2-3], fill=(*GREEN,255), width=3)
    d.line([cx+bw*0.18, cy-bh/2+4, cx+bw*0.18, cy+bh/2-4], fill=(*GREEN,255), width=3)
    d.ellipse([cx-bw*0.30, cy-bh*1.25, cx+bw*0.16, cy-bh*0.15], outline=(*GREEN,255), width=3)


def main():
    ap = argparse.ArgumentParser(); ap.add_argument("--selects", required=True)
    ap.add_argument("--watermark", help="PNG wordmark, ideally with transparency")
    ap.add_argument("--watermark-opacity", type=float, default=0.45)
    ap.add_argument("--watermark-width", type=int, default=620)
    ap.add_argument("--out", default=os.path.join(OUT, "TLH_two-months_REEL.mp4"))
    args = ap.parse_args()
    selects = json.load(open(args.selects))

    mark = None
    if args.watermark:
        m = Image.open(args.watermark).convert("RGBA")
        m = m.resize((args.watermark_width, round(m.height * args.watermark_width / m.width)))
        # Instagram's bottom 600px carries the caption, audio strip and action buttons, so a
        # literal bottom-centre mark would sit under the UI. This hangs it off the bottom of
        # the live band instead: the lowest it can go and still be seen.
        mark = (m, (W - m.width)//2, LIVE_B - m.height - 10, args.watermark_opacity)
    shots = {s["id"]: s for s in json.load(open(os.path.join(HERE,"shots.json")))["shots"]}

    # ---- timeline from measured audio
    t, tl, cues = 0.0, [], []
    for lid, sid, gap, minlen in BEATS:
        mp3 = os.path.join(OUT, f"{lid}.mp3")
        a = dur(mp3) if os.path.exists(mp3) else 0.0
        length = max(a + gap, minlen)
        tl.append({"line": lid, "shot": sid, "in": round(t,3), "out": round(t+length,3),
                   "audio_in": round(t,3), "audio": round(a,3)})
        pieces = TEXT[lid]
        # split the line's speaking time across its on-screen pieces by character weight
        weights = [len(p[1]) for p in pieces]; tot = sum(weights) or 1
        c = t
        for (kind, txt), wgt in zip(pieces, weights):
            span = a * wgt/tot
            cues.append({"kind": kind, "text": txt, "in": round(c,3),
                         "out": round(c + span + (gap if (kind,txt)==pieces[-1] else 0.0), 3)})
            c += span
        t += length
    total = round(t, 2)
    json.dump({"duration": total, "beats": tl, "cues": cues},
              open(os.path.join(OUT,"timeline.json"),"w"), indent=1)
    print(f"timeline: {total}s across {len(tl)} beats, {len(cues)} text cues")

    # ---- voice stem re-laid on the new timeline (reuses rendered mp3s, no new API calls)
    ins, filt, mix = [], [], []
    for i, b in enumerate(tl):
        p = os.path.join(OUT, f"{b['line']}.mp3")
        if not os.path.exists(p): continue
        ins += ["-i", p]
        ms = int(b["audio_in"]*1000)
        filt.append(f"[{len(mix)}:a]adelay={ms}|{ms},aformat=sample_fmts=fltp:sample_rates=48000:channel_layouts=stereo[a{len(mix)}]")
        mix.append(f"[a{len(mix)}]")
    stem = os.path.join(OUT, "TLH_two-months_VO-STEM.wav")
    run(["ffmpeg","-y","-loglevel","error",*ins,"-filter_complex",
         ";".join(filt)+";"+"".join(mix)+f"amix=inputs={len(mix)}:normalize=0,apad,atrim=0:{total}[o]",
         "-map","[o]","-c:a","pcm_s24le","-ar","48000",stem])

    # ---- overlay frames
    ov = os.path.join(OUT,"overlay"); os.makedirs(ov, exist_ok=True)
    for f in os.listdir(ov): os.remove(os.path.join(ov,f))
    n = int(total*FPS)
    card_in = tl[-1]["in"]
    for i in range(n):
        now = i/FPS
        img = Image.new("RGBA",(W,H),(0,0,0,0))
        if now >= card_in:
            ImageDraw.Draw(img).rectangle([0,0,W,H], fill=(*CREAM,255))
        for c in cues:
            if not (c["in"] <= now < c["out"]): continue
            a = min(1.0, (now-c["in"])/0.25, (c["out"]-now)/0.15)
            if a <= 0: continue
            if c["kind"] == "caption":
                chip(img, c["text"], 980, BLACK, SKY, a, 46, True)
            elif c["kind"] == "feature-sky":
                chip(img, c["text"], 430, BLACK, SKY, a, 64, False)
            elif c["kind"] == "feature-cream":
                chip(img, c["text"], 430, GREEN, CREAM, a, 76, False, underline="Two months" in c["text"])
            else:
                chip(img, c["text"], 820, GREEN, CREAM, a, 68, True)
        if mark:
            m, mx, my, op = mark
            faded = m.copy()
            faded.putalpha(m.getchannel("A").point(lambda v: int(v*op)))
            img.alpha_composite(faded, (mx, my if now < card_in else my - 120))
        else:
            logo(img, X_MIN, 1190, 120) if now < card_in else logo(img, W//2-80, 1090, 160)
        img.save(os.path.join(ov, f"o{i:05d}.png"))
    print(f"overlay: {n} frames")

    # ---- picture
    clips = os.path.join(OUT,"clips"); os.makedirs(clips, exist_ok=True)
    parts, missing = [], []
    for b in tl:
        s = shots[b["shot"]]; secs = b["out"]-b["in"]; dest = os.path.join(clips, f"{b['shot']}.mp4")
        src = selects.get(b["shot"])
        if s["kind"] == "card" or not src:
            if s["kind"] != "card": missing.append(b["shot"])
            col = "0xFFF7E8" if s["kind"] == "card" else "0xE4DCCE"
            run(["ffmpeg","-y","-loglevel","error","-f","lavfi",
                 "-i",f"color=c={col}:s={W}x{H}:r={FPS}",
                 "-frames:v",str(max(1, round(secs*FPS))),
                 "-c:v","libx264","-pix_fmt","yuv420p",dest])
        else:
            kind, p1, p2 = s["motion"]; frames = max(1, round(secs*FPS))
            if kind == "push":   z, x = f"{p1}+({p2}-{p1})*on/{frames}", "iw/2-(iw/zoom/2)"
            elif kind == "drift":z, x = "1.06", f"iw/2-(iw/zoom/2)+({p1})*iw*on/{frames}"
            elif kind == "driftpush": z, x = f"1.04+({p2}-1.0)*on/{frames}", f"iw/2-(iw/zoom/2)+({p1})*iw*on/{frames}"
            else: z, x = "1.0", "iw/2-(iw/zoom/2)"
            # Exact frame count, not trim: zoompan's fps conversion makes trim=duration
            # land short, which silently drifts the picture ahead of the voice.
            vf = (f"scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H},"
                  f"zoompan=z='{z}':x='{x}':y='ih/2-(ih/zoom/2)':d=1:s={W}x{H}:fps={FPS}")
            run(["ffmpeg","-y","-loglevel","error","-stream_loop","-1","-i",src,
                 "-vf",vf,"-frames:v",str(frames),"-an","-c:v","libx264","-pix_fmt","yuv420p",
                 "-r",str(FPS),dest])
        parts.append(dest)

    lst = os.path.join(clips,"concat.txt"); open(lst,"w").write("".join(f"file '{p}'\n" for p in parts))
    bed = os.path.join(clips,"_bed.mp4")
    run(["ffmpeg","-y","-loglevel","error","-f","concat","-safe","0","-i",lst,
         "-c:v","libx264","-pix_fmt","yuv420p","-r",str(FPS),bed])
    run(["ffmpeg","-y","-loglevel","error","-i",bed,"-framerate",str(FPS),
         "-i",os.path.join(ov,"o%05d.png"),"-i",stem,
         "-filter_complex","[0:v][1:v]overlay=0:0:format=auto[v]",
         "-map","[v]","-map","2:a","-c:v","libx264","-profile:v","high","-pix_fmt","yuv420p",
         "-b:v","14M","-maxrate","16M","-bufsize","24M","-c:a","aac","-b:a","256k","-ar","48000",
         "-af","loudnorm=I=-14:TP=-1:LRA=11","-movflags","+faststart",args.out])
    print(f"wrote {args.out} ({dur(args.out):.2f}s)")
    if missing: print(f"SLATE for: {', '.join(missing)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
