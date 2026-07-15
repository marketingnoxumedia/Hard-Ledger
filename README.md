# The Storage Moat — Remotion video

A 9:16, 45-second kinetic-typography video built with [Remotion](https://remotion.dev),
narrating the self-storage business script (the "moat" that keeps 79¢ on every dollar).

- **Format:** 1080 × 1920 (9:16 vertical), 30 fps, 1350 frames (45.0s)
- **Composition id:** `StorageUnit`
- **Source:** `src/StorageVideo.tsx` (all scenes + timeline), `src/Root.tsx` (composition)

## Script

> You drive past this building every day. It keeps seventy-nine cents on every
> dollar. Metal boxes. Cheap land. Almost no staff. No inventory. Nothing to
> restock. Nothing spoils. Once the building is up, costs barely move. Rent rises
> every year. Automatically. Moving out costs a weekend and a truck. Recessions
> cause moves, divorces, downsizing. Storage fills. Four point eight billion in
> annual revenue. Nobody moves out. That is the moat. No brand. No buzz. Just rent.

## Develop

```bash
npm install
npm start          # opens Remotion Studio
```

## Render

```bash
npm run render     # -> out/storage-unit.mp4
```

In a headless environment where fonts are fetched through a TLS-intercepting
proxy, render with the pre-installed Chrome headless shell and allow the proxy
certificate:

```bash
npx remotion render StorageUnit out/storage-unit.mp4 \
  --browser-executable=/path/to/chrome-headless-shell \
  --ignore-certificate-errors
```

## Scene timeline

| # | Scene | Copy | Visual |
|---|-------|------|--------|
| 1 | Hook | "You drive past this building every day." | Storage-facade backdrop |
| 2 | Margin | "It keeps 79¢ on every dollar" | Animated 79¢ + kept/costs margin bar |
| 3 | Lines | "Metal boxes. Cheap land. Almost no staff." | Staggered bullet lines |
| 4 | Lines | "No inventory. Nothing to restock. Nothing spoils." | Staggered bullet lines |
| 5 | Text | "Once the building is up, costs barely move." | Highlighted caption |
| 6 | Rent | "Rent rises every year. Automatically." | Rising bar staircase |
| 7 | Text | "Moving out costs a weekend and a truck." | Highlighted caption |
| 8 | Text | "Recessions cause moves, divorces, downsizing." | Highlighted caption |
| 9 | Fills | "Storage fills." | Impact word |
| 10 | Revenue | "$4.8B in annual revenue" | Counting number |
| 11 | Moat | "Nobody moves out. That is the MOAT." | Green MOAT payoff + underline draw |
| 12 | Outro | "No brand. No buzz. Just rent." | Stacked reveal |

## Backgrounds & audio

- Narration lives at `public/voiceover.mp3` and is enabled via the `HAS_VOICEOVER`
  flag in `src/StorageVideo.tsx`. Scene cuts are timed to the speech pauses.
- Each scene has a full-bleed background (mixed stills + video) in
  `public/media/`, sourced from [Pexels](https://www.pexels.com) (free license).
  Videos are pre-cropped to 1080×1920 silent clips; each is graded dark +
  desaturated with a scrim for text legibility, given a Ken Burns move, and
  dip-to-black cross-dissolved between scenes.

Media credits (Pexels): warehouse aerial (video 3969002), industrial area with
warehouses & trucks (video 32338863), wood-pallet storage yard (video 31025294),
semi truck (video 17899033), stack of dollar bills (photo 4386469), cash in a
briefcase (photo 259027), moving truck at night (photo 26443249).

## Export note

`out/storage-unit.mp4` is the full-quality master. For platforms with an upload
cap, transcode a smaller copy, e.g.:

```bash
npx remotion ffmpeg -i out/storage-unit.mp4 -c:v libx264 -crf 21 -preset slow \
  -c:a aac -b:a 160k -movflags +faststart out/storage-unit-web.mp4
```
