#!/usr/bin/env python3
"""Render the Little Hive house voice and lay it against the cut.

Reads vo_lines.json, synthesises each beat through ElevenLabs, then places every line
at its planned in-point on a silent bed the length of the cut. The point of rendering
per beat rather than as one take is that the pauses in the approved script are cut in
as measured silence instead of being left to the model to improvise — and that we get
a real duration per line to check the 42.4s arithmetic against.

    export ELEVENLABS_API_KEY=...        # set in the environment, never in the repo
    python3 render_vo.py                 # writes out/ and prints the timing report

Exit code is non-zero if any line overruns its slot, so this can gate a build.
"""
import json, os, subprocess, sys, urllib.request, urllib.error

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "out")
SPEC = os.path.join(HERE, "vo_lines.json")
CUT_LENGTH = 42.4
MODEL = "eleven_multilingual_v2"      # highest fidelity English; turbo trades quality for latency we don't need

# House voice — locked. Eleanor, "Warm British & Midlands Narration", middle-aged.
# Chosen by ear 2026-08-17 after auditioning on the real script lines. British English
# also settles the script's "favourite", which an American read had been fighting.
VOICE_ID = "DcADU5DwsQtYalQf4OwN"
VOICE_SETTINGS = {
    "stability": 0.35,   # low stability lets delivery vary between phrases — high stability is
                         # exactly what produces the flat, even cadence that reads as machine.
    "similarity_boost": 0.80,
    "style": 0.0,               # style > 0 adds performance; the brief explicitly does not want performing
    "use_speaker_boost": True,
    # Target 150 wpm, the top of the house band. Calibrated by measurement, not arithmetic:
    # renders are not deterministic, so the same speed varies a few wpm run to run
    # (0.80 gave 148, 0.81 gave 143, 0.83 gave 151, 0.84 gave 152). 0.83 lands closest.
    # Always measure the whole script — she read 145 on three lines and 154 on the full one.
    "speed": 0.85,
}


def synthesise(text, dest, key):
    req = urllib.request.Request(
        f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}",
        data=json.dumps({"text": text, "model_id": MODEL,
                         "voice_settings": VOICE_SETTINGS}).encode(),
        headers={"xi-api-key": key, "Content-Type": "application/json",
                 "Accept": "audio/mpeg"},
        method="POST")
    try:
        with urllib.request.urlopen(req, timeout=120) as r, open(dest, "wb") as fh:
            fh.write(r.read())
    except urllib.error.HTTPError as e:
        sys.exit(f"ElevenLabs {e.code} on '{text[:40]}...': {e.read().decode()[:300]}")


def duration(path):
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                          "-of", "csv=p=0", path], capture_output=True, text=True, check=True)
    return float(out.stdout.strip())


def main():
    key = os.environ.get("ELEVENLABS_API_KEY")
    if not key:
        sys.exit("ELEVENLABS_API_KEY is not set. Add it to the environment, not to the repo.")

    os.makedirs(OUT, exist_ok=True)
    spec = json.load(open(SPEC))
    lines = spec["lines"]

    rendered, overruns = [], []
    for ln in lines:
        dest = os.path.join(OUT, f"{ln['id']}.mp3")
        synthesise(ln["text"], dest, key)
        actual = duration(dest)
        planned = ln["out"] - ln["in"]
        rendered.append({**ln, "file": dest, "actual": actual, "planned": planned})
        if actual > planned + 0.05:
            overruns.append((ln["id"], actual, planned))

    # Lay every line at its planned in-point on a bed the length of the cut.
    inputs, filters, mixed = [], [], []
    for i, r in enumerate(rendered):
        inputs += ["-i", r["file"]]
        filters.append(f"[{i}:a]adelay={int(r['in'] * 1000)}|{int(r['in'] * 1000)},"
                       f"aformat=sample_fmts=fltp:sample_rates=48000:channel_layouts=stereo[a{i}]")
        mixed.append(f"[a{i}]")
    stem = os.path.join(OUT, "TLH_two-months_VO-STEM.wav")
    graph = (";".join(filters) + ";" + "".join(mixed) +
             f"amix=inputs={len(rendered)}:normalize=0,apad,atrim=0:{CUT_LENGTH}[out]")
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", *inputs,
                    "-filter_complex", graph, "-map", "[out]",
                    "-c:a", "pcm_s24le", "-ar", "48000", stem], check=True)

    speech = sum(r["actual"] for r in rendered)
    words = sum(len(r["text"].split()) for r in rendered)
    print(f"\n{'beat':<5}{'planned':>9}{'actual':>9}{'drift':>9}   text")
    for r in rendered:
        print(f"{r['id']:<5}{r['planned']:>9.2f}{r['actual']:>9.2f}"
              f"{r['actual'] - r['planned']:>+9.2f}   {r['text'][:44]}")
    print(f"\nspeech {speech:.1f}s over {words} words = {words / speech * 60:.0f} wpm net")
    print(f"stem   {duration(stem):.1f}s (cut is {CUT_LENGTH}s)")
    print(f"wrote  {stem}")

    if overruns:
        print("\nOVERRUNS — these beats do not fit their slot:")
        for bid, a, p in overruns:
            print(f"  {bid}: {a:.2f}s of audio in a {p:.2f}s hold (+{a - p:.2f}s)")
        print("Fix by lengthening the shot, not by cutting words — the script is approved.")
        return 1
    print("\nEvery beat fits its slot.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
