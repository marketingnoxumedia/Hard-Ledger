#!/usr/bin/env python3
"""Composite the finished reel: footage bed, brand text layer, voice.

    python3 assemble_reel.py --selects selects.json [--vo out/TLH_two-months_VO-STEM.wav]

selects.json maps each shot id to a local video/still file:

    {"S1": "footage/S1.mp4", "S3b": "footage/S3b.jpg", ...}

Any beat without a select falls back to its animatic slate, so a part-sourced reel
still plays end to end and the gaps are obvious rather than silently dropped.

Every clip is centre-cropped to 9:16 rather than letterboxed or pillarboxed — the brief
rules both out — and the crop is the reason SELECTION CRITERIA insist the subject sits
in the centre slice.
"""
import argparse, json, os, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "out")
W, H, FPS = 1080, 1920, 30


def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode:
        sys.exit(f"ffmpeg failed:\n{' '.join(cmd[:8])}...\n{r.stderr[-800:]}")
    return r


def shot_clip(src, seconds, motion, dest):
    """Scale to cover 1080x1920, centre-crop, hold for `seconds`, apply the planned move."""
    kind, a, b = motion
    frames = max(1, round(seconds * FPS))
    # zoompan drives the push/drift; it runs after the crop so the move stays inside frame.
    if kind == "push":
        z = f"{a}+({b}-{a})*on/{frames}"
        x, y = "iw/2-(iw/zoom/2)", "ih/2-(ih/zoom/2)"
    elif kind == "drift":
        z = "1.06"                                    # slight overscan gives the drift room to travel
        x, y = f"iw/2-(iw/zoom/2)+({a})*iw*on/{frames}", "ih/2-(ih/zoom/2)"
    elif kind == "driftpush":
        z = f"1.04+({b}-1.0)*on/{frames}"
        x, y = f"iw/2-(iw/zoom/2)+({a})*iw*on/{frames}", "ih/2-(ih/zoom/2)"
    else:                                             # hold
        z, x, y = "1.0", "iw/2-(iw/zoom/2)", "ih/2-(ih/zoom/2)"

    still = src.lower().endswith((".jpg", ".jpeg", ".png", ".webp"))
    pre = f"scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H}"
    vf = (f"{pre},zoompan=z='{z}':x='{x}':y='{y}':d=1:s={W}x{H}:fps={FPS},"
          f"trim=duration={seconds},setpts=PTS-STARTPTS")
    cmd = ["ffmpeg", "-y", "-loglevel", "error"]
    if still:
        cmd += ["-loop", "1", "-t", f"{seconds}", "-i", src]
    else:
        cmd += ["-stream_loop", "-1", "-t", f"{seconds}", "-i", src]   # loop shorts rather than freeze
    cmd += ["-vf", vf, "-an", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-r", str(FPS), dest]
    run(cmd)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--selects", required=True)
    ap.add_argument("--vo")
    ap.add_argument("--music")
    ap.add_argument("--out", default=os.path.join(OUT, "TLH_two-months_REEL.mp4"))
    args = ap.parse_args()

    shots = json.load(open(os.path.join(HERE, "shots.json")))["shots"]
    selects = json.load(open(args.selects))
    overlay = os.path.join(OUT, "overlay")
    if not os.path.isdir(overlay):
        sys.exit("Missing overlay frames. Run: python3 build_reel.py overlay")

    os.makedirs(os.path.join(OUT, "clips"), exist_ok=True)
    parts, missing = [], []
    for s in shots:
        seconds = s["out"] - s["in"]
        dest = os.path.join(OUT, "clips", f"{s['id']}.mp4")
        src = selects.get(s["id"])
        if s["kind"] == "card" or not src:
            if s["kind"] != "card":
                missing.append(s["id"])
            # Neutral bed; the overlay still paints text and logo on top.
            run(["ffmpeg", "-y", "-loglevel", "error", "-f", "lavfi",
                 "-i", f"color=c=0xE4DCCE:s={W}x{H}:r={FPS}:d={seconds}",
                 "-c:v", "libx264", "-pix_fmt", "yuv420p", dest])
        else:
            if not os.path.exists(src):
                sys.exit(f"{s['id']}: select not found on disk: {src}")
            shot_clip(src, seconds, s["motion"], dest)
        parts.append(dest)

    lst = os.path.join(OUT, "clips", "concat.txt")
    open(lst, "w").write("".join(f"file '{p}'\n" for p in parts))
    bed = os.path.join(OUT, "clips", "_bed.mp4")
    run(["ffmpeg", "-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", lst,
         "-c:v", "libx264", "-pix_fmt", "yuv420p", "-r", str(FPS), bed])

    cmd = ["ffmpeg", "-y", "-loglevel", "error", "-i", bed,
           "-framerate", str(FPS), "-i", os.path.join(overlay, "o%05d.png")]
    filters = "[0:v][1:v]overlay=0:0:format=auto[v]"
    amaps = []
    idx = 2
    if args.vo:
        cmd += ["-i", args.vo]; amaps.append(f"[{idx}:a]volume=1.0[vo]"); idx += 1
    if args.music:
        cmd += ["-i", args.music]; amaps.append(f"[{idx}:a]volume=0.16[mu]"); idx += 1  # ~16dB under VO
    if amaps:
        filters += ";" + ";".join(amaps)
        srcs = "".join(t for t in ["[vo]" if args.vo else "", "[mu]" if args.music else "" ] if t)
        filters += f";{srcs}amix=inputs={len(amaps)}:normalize=0[a]" if len(amaps) > 1 else \
                   f";{srcs}anull[a]"
    cmd += ["-filter_complex", filters, "-map", "[v]"]
    cmd += ["-map", "[a]"] if amaps else ["-f", "lavfi", "-i",
                                          "anullsrc=channel_layout=stereo:sample_rate=48000",
                                          "-map", f"{idx}:a", "-shortest"]
    cmd += ["-c:v", "libx264", "-profile:v", "high", "-pix_fmt", "yuv420p",
            "-b:v", "14M", "-maxrate", "16M", "-bufsize", "24M",
            "-c:a", "aac", "-b:a", "256k", "-ar", "48000", "-movflags", "+faststart", args.out]
    run(cmd)

    dur = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                          "-of", "csv=p=0", args.out], capture_output=True, text=True).stdout.strip()
    print(f"wrote {args.out}  ({float(dur):.2f}s)")
    if missing:
        print(f"SLATE STILL SHOWING for: {', '.join(missing)} — these beats have no footage yet.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
