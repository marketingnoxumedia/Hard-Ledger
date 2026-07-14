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

The video is text/animation only (no baked-in narration audio); drop a voiceover
track over it in your editor, or wire an audio file into the composition with
Remotion's `<Audio>` component.
