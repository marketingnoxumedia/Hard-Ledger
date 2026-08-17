#!/usr/bin/env python3
"""The Little Hive — "Two months" reel: animatic, safe-zone template, cover mock, SRT.

Renders the full text/timing/brand layer at 1080x1920 30fps so stock footage can be
dropped onto the slates. No footage is generated here by design.
"""
import os, subprocess, math
from PIL import Image, ImageDraw, ImageFont

W, H, FPS = 1080, 1920, 30
DUR = 42.4
OUT = "/tmp/claude-0/-home-user-Hard-Ledger/12d5cd10-461f-5333-bf98-e2d3871fcc04/scratchpad/out"
FRM = os.path.join(OUT, "frames")
os.makedirs(FRM, exist_ok=True)

# Palette — identity 1c "Honeycomb Frame"
GREEN  = (47, 94, 59)      # 2F5E3B
HONEY  = (244, 180, 0)     # F4B400
SKY    = (200, 221, 242)   # C8DDF2
CREAM  = (255, 247, 232)   # FFF7E8
BLACK  = (43, 43, 43)      # 2B2B2B
SLATE  = (228, 220, 206)   # neutral placeholder ground (not a brand colour, comp only)
SLATE2 = (208, 198, 182)

FD = "/usr/share/fonts/truetype/dejavu/"
def f(size, bold=True):
    return ImageFont.truetype(FD + ("DejaVuSans-Bold.ttf" if bold else "DejaVuSans.ttf"), size)

# Safe zones
TOP_SAFE, BOT_SAFE, RIGHT_SAFE = 250, 600, 200
LIVE_T, LIVE_B = 350, 1300
X_MIN, X_MAX = 90, W - RIGHT_SAFE + 20   # text keeps clear of the like/comment rail

# ---------------------------------------------------------------- shot timeline
# (id, start, end, kind, framing_label, box_scale, subject_y, motion, description)
SHOTS = [
    ("S1", 0.0,  5.2,  "MOTION", "CLOSE",  0.86, 620,  ("push", 1.00, 1.02),
     "Baby gazing up at parent. Envato.\n6-12wk, eyes open + converged.\nNo crib w/ bedding in background."),
    ("S2", 5.2,  8.9,  "MOTION", "CLOSE",  0.92, 700,  ("push", 1.00, 1.00),
     "Gaze ARRIVES on parent. Envato.\nLocked off. The turn must be visible."),
    ("S3a", 8.9, 12.0, "MOTION", "MID-CL", 0.74, 800,  ("drift", -0.03, 0.0),
     "Baby tracks parent's face. Envato.\nFollowing a FACE, not a toy."),
    ("S3b", 12.0,15.1, "STILL",  "WIDE",   0.60, 700,  ("driftpush", -0.04, 1.01),
     "Living room, window light. Pexels.\nNo face = no release needed.\nReject red cushions / cold light."),
    ("S4", 15.1,21.2, "MOTION", "MID-2SH",0.80, 750,  ("hold", 1.0, 1.0),
     "Social smile OR parent-smiling fallback.\nEnvato. HARDEST BEAT - age drift.\nHeld 6.1s, no cut."),
    ("S5", 21.2,26.5, "MOTION", "V.CLOSE",0.95, 640,  ("hold", 1.0, 1.0),
     "Mouth + chin, vowel shape. Envato.\nNEVER a crying baby."),
    ("S6", 26.5,31.2, "MOTION", "MID",    0.78, 800,  ("drift", 0.02, 0.0),
     "Parent speaks, then WAITS. Envato.\nCut lands in the pause."),
    ("S7", 31.2,37.1, "STILL",  "MID-CL", 0.76, 750,  ("push", 1.00, 1.03),
     "ONE calm baby. Envato.\nNO split screen / no age labels.\nComparison imagery = rule 5 breach."),
    ("S8", 37.1,39.5, "STILL",  "CLOSE",  0.88, 700,  ("push", 1.00, 1.005),
     "Parent leaning close. Envato.\nContinuity anchor - must match S1/S2."),
    ("S9", 39.5,42.4, "CARD",   "-",      0.00, 0,    ("hold", 1.0, 1.0), ""),
]

# ------------------------------------------------------- text (verbatim, fixed)
# feature lines: (start, end, text, style)  style: cream | sky
FEATURE = [
    (5.2,  8.9,  "Two months is when they\nstart looking back.", "cream", 84, True),
    (21.2, 23.6, "Listen for sounds\nthat aren't crying.",       "sky",   64, False),
    (23.6, 26.2, "A grumble. A small vowel.",                    "sky",   64, False),
    (26.5, 29.0, "Make the sound back,\nthen wait.",             "sky",   64, False),
    (29.0, 31.2, "Often, they go again.",                        "sky",   64, False),
    (34.6, 37.1, "Both are ordinary.",                           "cream", 76, False),
]
# captions: (start, end, text)
CAPS = [
    (0.0,  1.9,  "Have you noticed your"),
    (1.9,  3.7,  "two-month-old looking right at you?"),
    (8.9,  10.6, "Faces become the most"),
    (10.6, 12.0, "interesting thing in the room."),
    (12.0, 14.7, "And yours is the favourite."),
    (15.1, 17.9, "Smile at them, talk to them —"),
    (17.9, 20.6, "some babies will smile back."),
    (31.2, 33.0, "Some do this at six weeks."),
    (33.0, 34.6, "Some nearer three months."),
    (37.1, 38.9, "Say something back."),
]
CTA = "Save this for the week it happens."

def ease(t):
    return t * t * (3 - 2 * t)

def fade(now, s, e, d=0.27):
    """Opacity ramp for entries/exits."""
    if now < s or now >= e:
        return 0.0
    return min(1.0, min((now - s) / d, (e - now) / 0.13, 1.0))

def blend(c, a, bg):
    return tuple(int(bg[i] + (c[i] - bg[i]) * a) for i in range(3))

SIZES = {}
MAX_TEXT_W = X_MAX - X_MIN - 48   # live width minus chip padding — the right rail is hard

def fit_text(draw, text, target_size, max_w=MAX_TEXT_W, min_size=30, max_lines=2):
    """Word-wrap to max_w, shrinking until every line fits. The right rail is not negotiable,
    so type size yields to it rather than the other way round."""
    words = text.replace("\n", " ").split()
    size = target_size
    while size >= min_size:
        font = f(size)
        lines, cur = [], ""
        ok = True
        for w in words:
            trial = (cur + " " + w).strip()
            if draw.textlength(trial, font=font) <= max_w:
                cur = trial
            else:
                if cur:
                    lines.append(cur)
                cur = w
                if draw.textlength(w, font=font) > max_w:
                    ok = False
                    break
        if cur:
            lines.append(cur)
        if ok and len(lines) <= max_lines:
            return font, lines, size
        size -= 2
    return f(min_size), [text], min_size


def wrapped(draw, text, font, spacing=14):
    lines = text.split("\n")
    hs = []
    for ln in lines:
        b = draw.textbbox((0, 0), ln, font=font)
        hs.append(b[3] - b[1])
    return lines, hs, sum(hs) + spacing * (len(lines) - 1)

def chip_text(draw, text, font, cx_left, top, fg, chip, alpha, pad=24, radius=12, center=False,
              autofit=None):
    if autofit:
        font, ls, used = fit_text(draw, text, autofit)
        text = "\n".join(ls)
        SIZES.setdefault(text.replace("\n", " ")[:34], used)
    lines, hs, total = wrapped(draw, text, font)
    widths = [draw.textbbox((0, 0), l, font=font)[2] for l in lines]
    boxw = max(widths) + pad * 2
    x0 = cx_left if not center else (X_MIN + X_MAX) // 2 - boxw // 2
    y0 = top
    bgpix = draw._image.getpixel((min(W - 1, x0 + 4), min(H - 1, y0 + 4)))
    draw.rounded_rectangle([x0, y0, x0 + boxw, y0 + total + pad * 2],
                           radius=radius, fill=blend(chip, alpha, bgpix))
    y = y0 + pad
    for ln, h in zip(lines, hs):
        wpx = draw.textbbox((0, 0), ln, font=font)[2]
        tx = x0 + pad if not center else x0 + boxw // 2 - wpx // 2
        base = draw._image.getpixel((min(W - 1, max(0, tx + 2)), min(H - 1, y + h // 2)))
        draw.text((tx, y), ln, font=font, fill=blend(fg, alpha, base))
        y += h + 14
    return x0, y0, boxw, total + pad * 2

def draw_logo(d, x, y, w=120):
    """Honeycomb cell + bee. PLACEHOLDER geometry — swap for the real brand asset."""
    r = w / 2
    cx, cy = x + r, y + r * 0.87
    pts = [(cx + r * math.cos(math.radians(a)), cy + r * 0.87 * math.sin(math.radians(a)))
           for a in range(-90, 271, 60)]
    d.polygon(pts, fill=CREAM, outline=GREEN)
    for i in range(len(pts)):
        d.line([pts[i], pts[(i + 1) % len(pts)]], fill=GREEN, width=5)
    bw, bh = r * 0.62, r * 0.44
    d.ellipse([cx - bw / 2, cy - bh / 2, cx + bw / 2, cy + bh / 2], fill=HONEY, outline=GREEN, width=3)
    d.line([cx - bw * 0.10, cy - bh / 2 + 3, cx - bw * 0.10, cy + bh / 2 - 3], fill=GREEN, width=3)
    d.line([cx + bw * 0.18, cy - bh / 2 + 4, cx + bw * 0.18, cy + bh / 2 - 4], fill=GREEN, width=3)
    d.ellipse([cx - bw * 0.30, cy - bh * 1.25, cx + bw * 0.16, cy - bh * 0.15], outline=GREEN, width=3)

def shot_at(t):
    for s in SHOTS:
        if s[1] <= t < s[2]:
            return s
    return SHOTS[-1]

def render(t, guides=False):
    img = Image.new("RGB", (W, H), CREAM)
    d = ImageDraw.Draw(img)
    sh = shot_at(t)
    sid, s0, s1, kind, framing, boxs, sy, motion, desc = sh
    prog = (t - s0) / max(0.001, (s1 - s0))

    if kind == "CARD":
        img.paste(Image.new("RGB", (W, H), CREAM), (0, 0))
        d = ImageDraw.Draw(img)
        a = fade(t, s0, s1, 0.27)
        fnt = f(68)
        fnt, _ls, _sz = fit_text(d, "Save this for the week it happens.", 68)
        lines, hs, total = wrapped(d, "\n".join(_ls), fnt)
        y = 820
        for ln, h in zip(lines, hs):
            wpx = d.textbbox((0, 0), ln, font=fnt)[2]
            d.text((W // 2 - wpx // 2, y), ln, font=fnt, fill=blend(GREEN, a, CREAM))
            y += h + 18
        draw_logo(d, W // 2 - 80, 1090, 160)
    else:
        # placeholder ground for the stock clip
        d.rectangle([0, 0, W, H], fill=SLATE)
        mkind, m1, m2 = motion
        sc = 1.0
        dx = 0.0
        if mkind == "push":
            sc = m1 + (m2 - m1) * ease(prog)
        elif mkind == "drift":
            dx = m1 * W * ease(prog)
        elif mkind == "driftpush":
            dx = m1 * W * ease(prog)
            sc = 1.0 + (m2 - 1.0) * ease(prog)
        bw = W * boxs * sc
        bh = bw * 1.25
        cx = W / 2 + dx
        x0, y0 = cx - bw / 2, sy - bh / 2
        d.rectangle([x0, y0, x0 + bw, y0 + bh], fill=SLATE2, outline=(150, 140, 126), width=3)
        for i in range(-int(bh), int(bw), 46):   # hatch = "footage goes here"
            d.line([(x0 + i, y0 + bh), (x0 + i + bh, y0)], fill=(198, 188, 172), width=1)
        d.rectangle([x0, y0, x0 + bw, y0 + bh], outline=(126, 116, 104), width=4)
        d.text((X_MIN, 300), f"{sid}  ·  {kind}  ·  {framing}", font=f(30), fill=(96, 88, 78))
        df = f(24, bold=False)
        yy = 800
        for ln in desc.split("\n"):
            d.text((X_MIN, yy), ln, font=df, fill=(96, 88, 78))
            yy += 32
        d.text((X_MIN, 745), f"{s0:0.1f}s – {s1:0.1f}s   ({s1-s0:0.1f}s)", font=f(26), fill=(120, 110, 98))

    # feature text
    for (fs, fe, txt, style, size, underline) in FEATURE:
        a = fade(t, fs, fe)
        if a <= 0:
            continue
        fg, chip = (GREEN, CREAM) if style == "cream" else (BLACK, SKY)
        x0, y0, bwid, bhgt = chip_text(d, txt, f(size), X_MIN, 430, fg, chip, min(a, 0.92),
                                       center=False, autofit=size)
        if underline and a > 0.5:
            ulw = min(360, bwid - 48)
            d.rectangle([x0 + 24, y0 + bhgt - 16, x0 + 24 + ulw, y0 + bhgt - 10],
                        fill=blend(HONEY, a, CREAM))

    # captions
    for (cs, ce, txt) in CAPS:
        a = fade(t, cs, ce, 0.2)
        if a <= 0:
            continue
        chip_text(d, txt, f(46), X_MIN, 980, BLACK, SKY, min(a, 0.88), center=True, autofit=46)

    if shot_at(t)[3] != "CARD":
        draw_logo(d, X_MIN, 1190, 120)

    if guides:
        g = ImageDraw.Draw(img, "RGBA")
        g.rectangle([0, 0, W, TOP_SAFE], fill=(220, 60, 60, 70))
        g.rectangle([0, H - BOT_SAFE, W, H], fill=(220, 60, 60, 70))
        g.rectangle([W - RIGHT_SAFE, 0, W, H], fill=(220, 60, 60, 70))
        g.rectangle([0, LIVE_T, W, LIVE_B], outline=(0, 200, 120, 220), width=4)
        gf = f(26)
        g.text((24, TOP_SAFE - 44), "TOP SAFE 250px — profile / UI", font=gf, fill=(255, 255, 255, 255))
        g.text((24, H - BOT_SAFE + 14), "BOTTOM SAFE 600px — caption / audio / buttons", font=gf, fill=(255, 255, 255, 255))
        g.text((W - RIGHT_SAFE + 12, 700), "RIGHT", font=gf, fill=(255, 255, 255, 255))
        g.text((24, LIVE_T + 10), "LIVE BAND y350–1300", font=gf, fill=(0, 120, 70, 255))
    return img

# ------------------------------------------------------------------- animatic
n = int(DUR * FPS)
for i in range(n):
    render(i / FPS).save(os.path.join(FRM, f"f{i:05d}.png"))
print("frames:", n)

mp4 = os.path.join(OUT, "TLH_two-months_ANIMATIC_1080x1920.mp4")
subprocess.run([
    "ffmpeg", "-y", "-loglevel", "error", "-framerate", str(FPS),
    "-i", os.path.join(FRM, "f%05d.png"),
    "-f", "lavfi", "-i", "anullsrc=channel_layout=stereo:sample_rate=48000",
    "-shortest", "-c:v", "libx264", "-profile:v", "high", "-pix_fmt", "yuv420p",
    "-b:v", "14M", "-maxrate", "16M", "-bufsize", "24M",
    "-c:a", "aac", "-b:a", "256k", "-ar", "48000",
    "-movflags", "+faststart", mp4], check=True)

# --------------------------------------------------- safe-zone template + cover
render(6.5, guides=True).save(os.path.join(OUT, "TLH_two-months_SAFEZONE-CHECK.png"))

cov = Image.new("RGB", (W, H), SLATE)
dc = ImageDraw.Draw(cov)
dc.rectangle([0, 0, W, H], fill=SLATE)
dc.rectangle([120, 300, 960, 1350], fill=SLATE2, outline=(150, 140, 126), width=3)
for i in range(-1100, 900, 46):
    dc.line([(120 + i, 1350), (120 + i + 1050, 300)], fill=(198, 188, 172), width=1)
dc.text((150, 330), "COVER FRAME  ·  Envato  ·  baby held upright over shoulder,\n"
                    "eye contact to lens, ordinary living room, daylight frame-left.\n"
                    "6–12wk age tells: supported neck, closed fists, no teeth.",
        font=f(26, bold=False), fill=(96, 88, 78))
x0, y0, bw2, bh2 = chip_text(dc, "Two months is when they start looking back.",
                             f(84), X_MIN, 430, GREEN, CREAM, 0.92, autofit=84)
dc.rectangle([x0 + 24, y0 + bh2 - 16, x0 + 24 + min(360, bw2 - 48), y0 + bh2 - 10], fill=HONEY)
draw_logo(dc, X_MIN, 1190, 120)
cov.save(os.path.join(OUT, "TLH_two-months_COVER-LAYOUT.png"))

# ------------------------------------------------------------------------ SRT
def ts(x):
    h = int(x // 3600); m = int((x % 3600) // 60); s = x % 60
    return f"{h:02d}:{m:02d}:{s:06.3f}".replace(".", ",")

SRT = [
    (0.0, 3.7,   "Have you noticed your two-month-old looking right at you?"),
    (5.2, 8.5,   "Two months is when they start looking back."),
    (8.9, 12.0,  "Faces become the most interesting thing in the room."),
    (12.0, 14.7, "And yours is the favourite."),
    (15.1, 20.6, "Smile at them, talk to them — some babies will smile back."),
    (21.2, 23.6, "Listen for sounds that aren't crying."),
    (23.6, 25.7, "A grumble. A small vowel."),
    (26.5, 29.0, "Make the sound back, then wait."),
    (29.0, 30.6, "Often, they go again."),
    (31.2, 33.0, "Some do this at six weeks."),
    (33.0, 34.6, "Some nearer three months."),
    (34.6, 36.6, "Both are ordinary."),
    (37.1, 38.9, "Say something back."),
    (39.5, 42.4, "Save this for the week it happens."),
]
with open(os.path.join(OUT, "TLH_two-months_CAPTIONS.srt"), "w") as fh:
    for i, (a, b, tx) in enumerate(SRT, 1):
        fh.write(f"{i}\n{ts(a)} --> {ts(b)}\n{tx}\n\n")

print("done")
for k, v in SIZES.items():
    print(f"  {v}px  {k}")
