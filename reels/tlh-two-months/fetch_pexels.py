#!/usr/bin/env python3
"""Search Pexels for every beat in the shot list and shortlist usable candidates.

Runs the SEARCH TERMS from section B, keeps only assets that can actually make a
1080x1920 cut, and writes a manifest with the attribution fields so the licence log
is a by-product of fetching rather than a thing to remember later.

    export PEXELS_API_KEY=...          # environment only, never the repo
    python3 fetch_pexels.py            # writes footage/manifest.json + candidate files

Nothing here judges whether a clip is SAFE or the RIGHT AGE — the API cannot see a
crib full of soft toys in the background. That pass is human, against the SELECTION
CRITERIA, and it happens after this script narrows the field.
"""
import json, os, subprocess, sys, urllib.parse

HERE = os.path.dirname(os.path.abspath(__file__))
FOOTAGE = os.path.join(HERE, "footage")
SHOTS = os.path.join(HERE, "shots.json")

MIN_W, MIN_H = 1080, 1920          # anything smaller upscales and looks it
PORTRAIT_RATIO = 0.75              # h/w must exceed this to crop to 9:16 without losing the subject


def api(path, params, key):
    """Pexels via curl: the sandbox proxy handles curl's TLS correctly where urllib trips."""
    url = f"https://api.pexels.com/{path}?{urllib.parse.urlencode(params)}"
    r = subprocess.run(["curl", "-s", "--max-time", "40", "-H", f"Authorization: {key}", url],
                       capture_output=True, text=True)
    try:
        return json.loads(r.stdout)
    except json.JSONDecodeError:
        sys.exit(f"Pexels returned non-JSON for {params.get('query')!r}: {r.stdout[:200]}")


def usable_video(v, need_seconds):
    if v["duration"] < need_seconds:
        return None
    files = [f for f in v["video_files"] if f.get("width") and f.get("height")]
    if not files:
        return None
    # Prefer a native vertical file; fall back to the largest, which we crop.
    vertical = [f for f in files if f["height"] / f["width"] >= 1.7]
    pick = max(vertical or files, key=lambda f: f["width"] * f["height"])
    if pick["width"] < MIN_W or pick["height"] < MIN_H:
        if pick["height"] / pick["width"] < PORTRAIT_RATIO:
            return None
    return pick


def main():
    key = os.environ.get("PEXELS_API_KEY")
    if not key:
        sys.exit("PEXELS_API_KEY is not set. Add it to the environment, not to the repo.")
    os.makedirs(FOOTAGE, exist_ok=True)
    shots = json.load(open(SHOTS))["shots"]

    manifest, gaps = [], []
    for s in shots:
        if s["source"] != "pexels":
            continue
        need = s["out"] - s["in"]
        found = {}
        for q in s["queries"]:
            kind = "videos/search" if s["kind"] == "motion" else "v1/search"
            d = api(kind, {"query": q, "per_page": 8, "orientation": "portrait"}, key)
            for item in d.get("videos" if s["kind"] == "motion" else "photos", []):
                if item["id"] in found:
                    continue
                if s["kind"] == "motion":
                    pick = usable_video(item, need)
                    if not pick:
                        continue
                    found[item["id"]] = {"id": item["id"], "query": q, "page": item["url"],
                                         "credit": item["user"]["name"], "duration": item["duration"],
                                         "w": pick["width"], "h": pick["height"], "file": pick["link"]}
                else:
                    if item["height"] / item["width"] < PORTRAIT_RATIO:
                        continue
                    found[item["id"]] = {"id": item["id"], "query": q, "page": item["url"],
                                         "credit": item["photographer"],
                                         "w": item["width"], "h": item["height"],
                                         "file": item["src"]["original"]}
        cands = list(found.values())[:8]
        if not cands:
            gaps.append(s["id"])
        manifest.append({"shot": s["id"], "need_seconds": round(need, 2),
                         "kind": s["kind"], "criteria": s["criteria"], "candidates": cands})
        print(f"{s['id']:<5} {len(cands):>2} candidates for a {need:.1f}s {s['kind']} slot")

    path = os.path.join(FOOTAGE, "manifest.json")
    json.dump({"note": "Attribution: Pexels does not require credit but we log it anyway — "
                       "the licence check in QC asks for it.",
               "shots": manifest}, open(path, "w"), indent=2, ensure_ascii=False)
    print(f"\nwrote {path}")
    if gaps:
        print(f"NO CANDIDATES for: {', '.join(gaps)} — use the fallback query or reassign the beat.")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
