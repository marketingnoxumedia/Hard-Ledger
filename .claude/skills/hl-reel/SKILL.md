---
name: hl-reel
description: >-
  Build a 9:16 kinetic-typography short/reel with Remotion in this repo's house
  style — Anton condensed caps on a near-black canvas with ONE red focal word
  per scene, a soft directional caption shadow, mixed Pexels b-roll (unique per
  scene) with Ken Burns + slide/zoom transitions, an ElevenLabs cloned voiceover
  word-synced to the cuts, ElevenLabs upbeat music + SFX. Use whenever the user
  wants a new reel / short / faceless video in "the same format" as the storage
  video, adapts the script, or asks to restyle/extend it. Reproduces the
  StorageUnit composition format for any script.
---

# Kinetic reel (9:16) — house format

This skill reproduces the format of `src/StorageVideo.tsx` (composition id
`StorageUnit`) for any new script. It is a data-driven Remotion composition:
you mostly edit one `SCENES` array plus audio/media, then render.

Read this fully, then work top-to-bottom. `reference/` holds a working snapshot
you can copy from: `StorageVideo.template.tsx`, `Root.template.tsx`,
`index.template.ts`, `package.json`, `tsconfig.json`, `remotion.config.ts`, and
`gen_vo_timestamps.mjs`.

## Format at a glance

- **Canvas:** 1080×1920 (9:16), 30 fps. Composition id `StorageUnit`.
- **Type:** headers in **Anton** (condensed caps, uppercase); small labels in a
  **Helvetica Now Display Condensed** stack (falls back to Roboto Condensed at
  render). Word-by-word caption reveals.
- **Palette:** near-black `#0A0A0A` base, white `#F4F4F4` text, and exactly **one
  red (`#FF2E2E`) focal token per scene** — the number or word that matters.
- **Caption legibility:** ONE shared soft **directional** drop shadow (`SH`
  constant) on every caption, white and red alike — reads as depth, not a glow.
  No stroke, no colored glow, and never darken the footage to make text pop.
- **Backgrounds:** most scenes have full-bleed Pexels media (stills + video),
  **each asset used once — no repeats within a reel AND no reuse across reels**
  (every reel sources its own footage; see the hard rule below), shown at full
  brightness with a Ken Burns move; a few beats sit on solid black or a solid
  red "impact" card.
- **Motion:** quick cuts; `enter: 'slideL'|'slideR'|'slideUp'|'zoom'` adds a
  transition on some in-between scenes (media + text move together).
- **Audio:** ElevenLabs voice **cloned from the client's reference video**,
  word-synced to the cuts; an upbeat **ElevenLabs Music** bed ducked under the
  voice; **ElevenLabs SFX** (whoosh on cuts, impact on stat/impact beats,
  cha-ching on revenue) via an `SFX` cue array.
- **HUD:** monochrome top-left brand label + a thin bottom progress bar (no
  waveform). Keep a `HUD` "brand" label per project (e.g. "THE STORAGE MOAT").
- **Logo watermark:** the client's logo persists **bottom-center at 45% opacity,
  hard edges** (`LogoWatermark` in the composition, reading
  `public/media/logo.png`), sitting just above the waveform.

## Scene kinds (the `SCENES` array)

Each entry: `{dur, kind, ...}`. `dur` is in frames. Kinds:

- `hook` — kicker line + big caption. `{text, kicker, highlights, size, media}`.
- `lines` — stacked list, staggered reveal. `{text: 'A|B|C', highlights, reveal:[f,f,f], media}`.
- `text` — centered word-by-word caption. `{text: 'line1|line2', highlights, size, media}`.
- `stat` — count-up number, optional bar. `{stat:{pre?,prefix?,value,decimals?,suffix?,post?,bar?}, media?}`.
- `impact` — big 2-line beat, optional solid red card. `{text:'Boring is|beautiful.', redBg:true}`.
- `outro` — the fixed stacked closer (edit in `SceneOutro`).

`text` is `|`-separated lines; `highlights` lists the lowercased word(s) to turn
red (keep it to ONE concept per scene). `media` omitted ⇒ solid black beat.
`enter` on any scene adds an entrance transition.

`DURATION_IN_FRAMES` is derived from the sum of `dur`s — no need to set it.

**Don't end every reel on the solid-red `impact` card.** The client flagged the
red-background closer as too repetitive across reels — it had become the default
last beat. The red `impact` card is a great punch, but VARY where the reel lands:
rotate the closer so it isn't the same device every time. Good endings to mix in:
- a full-bleed **media beat** whose caption carries the red focal word (close on
  the footage, not a flat colour);
- a **black beat** with the payoff line and one red token;
- put the red `impact` card **mid-reel** (e.g. the thesis) and resolve on a
  quieter media/black line after it;
- a short reveal (`enter: 'zoom'`) on the final image.
Use the solid-red card for maybe one reel in three, not as the house ending. One
red focal token per scene is still the rule — this is only about the *final beat*.

## Build a new reel — step by step

1. **Scaffold** (if not already a Remotion project): copy `reference/package.json`,
   `tsconfig.json`, `remotion.config.ts` to repo root; copy the three template
   `.tsx/.ts` into `src/` as `StorageVideo.tsx`, `Root.tsx`, `index.ts`.
   `npm install`. Node 18+.

2. **Voice** — clone the client's reference speaker with ElevenLabs (needs a paid
   plan + `ELEVEN_KEY`; the key is the user's, never commit it):
   - Extract ~60–75s of their voice: `ffmpeg -i ref.mp4 -vn -t 72 -ac 1 voice.mp3`.
   - `curl -X POST https://api.elevenlabs.io/v1/voices/add -H "xi-api-key: $KEY"
     -F name=ClientVoice -F remove_background_noise=true
     -F "files=@voice.mp3;type=audio/mpeg"` → returns `voice_id`.
   - Generate a short sample to confirm before the full read.

3. **Script → word-synced timing** — put the final script + one anchor phrase per
   scene into `reference/gen_vo_timestamps.mjs` (set `VOICE`, `SPEED`), then
   `ELEVEN_KEY=... node gen_vo_timestamps.mjs`. It writes the VO and prints the
   `DURS` array (paste into `SCENES[].dur`) and `STARTS` (for SFX cue frames).
   Apply the printed `atempo` to make `public/voiceover.mp3`. This is what makes
   captions land exactly on the spoken word — do NOT eyeball scene durations.

4. **Media (Pexels, unique per scene)** — one distinct asset per media scene:
   - Photos: grab the numeric id from a `pexels.com/photo/...-<id>/` URL; download
     `https://images.pexels.com/photos/<id>/pexels-photo-<id>.jpeg?auto=compress&cs=tinysrgb&w=1300&h=1730&fit=crop`.
   - Videos: `WebFetch` the `pexels.com/video/...` page, pull the
     `videos.pexels.com/video-files/...mp4` URL, download, then crop to 9:16:
     `ffmpeg -ss S -i raw.mp4 -t 8 -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920" -r 30 -an -c:v libx264 -crf 24 -pix_fmt yuv420p clip_x.mp4`.
   - Put everything under `public/media/`. Assign one per scene in `SCENES`; keep a
     few beats on black/red for rhythm. Credit Pexels ids in the README.

5. **Music + SFX (ElevenLabs)**:
   - Music: `POST /v1/music` with `{prompt, music_length_ms}` (match the video
     length). Prompt for an **upbeat, driving** instrumental (that's the tone the
     client approved). Save to `public/media/music.mp3`; it plays ducked (~0.17)
     under the full-volume narration, with a fade envelope in the composition.
     Tune the level at the music `<Audio volume={…}>` line — the client likes it
     present, not background wallpaper (`0.17` ≈ the current default; earlier
     reels sat at `0.14`).
   - SFX: `POST /v1/sound-generation` with `{text, duration_seconds}` for
     `sfx_whoosh` / `sfx_impact` / `sfx_chaching`. Place cues in the `SFX` array
     at the `STARTS` of key scenes (cuts, stat reveals, revenue).

6. **Fill in `SCENES`** — write the beats: one red focal token each, pick `stat`
   for every number, `impact` (redBg) for a punchline beat, `lines` for lists,
   `enter` transitions on ~1/4 of scenes. Set the `HUD` brand label. **Vary the
   closer — don't default to the red card as the ending** (see the scene-kinds
   note above); rotate how each reel lands.

7. **Logo watermark** — put the client's logo at `public/media/logo.png`
   (transparent background preferred). The composition overlays it via
   `LogoWatermark` (bottom-center, 45% opacity, `borderRadius: 0` = hard edges).
   If the client's file can't be read in the environment (chat attachments don't
   always land on disk), rebuild the wordmark from `reference/Logo.template.tsx`
   (a drawn `HardLedgerLogo` + a `Logo` still composition) and export a
   transparent PNG: `npx remotion still Logo public/media/logo.png
   --image-format=png --browser-executable=$EXE --ignore-certificate-errors`.
   Tell the user it's a rebuild and swap their exact export in later — no code
   change, same path.

8. **Render + deliver** (see below), then send the compressed copy and commit.

## Rendering in this environment

Fonts load via `@remotion/google-fonts`; the render browser must trust the proxy
CA, and use the pre-installed headless shell:

```bash
EXE=/opt/pw-browsers/chromium_headless_shell-*/chrome-linux/headless_shell
npx remotion render StorageUnit out/storage-unit.mp4 \
  --browser-executable=$EXE --ignore-certificate-errors --log=info
```

`remotion.config.ts` already sets `Config.setChromiumIgnoreCertificateErrors(true)`.
Preview single frames with `npx remotion still StorageUnit out/f.png --frame=N ...`
(same flags) and Read them to check before a full render.

The chat upload cap is ~30 MiB, so ship a compressed copy (keep the master):

```bash
npx remotion ffmpeg -y -i out/storage-unit.mp4 -c:v libx264 -crf 27 -preset slow \
  -c:a aac -b:a 128k -movflags +faststart out/storage-unit-web.mp4
# CRF 21≈higher quality/bigger, 28≈smaller — pick to land < 30 MiB for the length.
```

## Gotchas learned (don't re-discover these)

- **Remotion's bundled ffmpeg is a reduced build**: no `afade`, no `hstack`, and
  `fps=` inside `-vf` fails. Do fps with `-r 30`; do audio fades via a Remotion
  `<Audio volume={(f)=>...}>` envelope, not `afade`.
- **ElevenLabs `speed`/tempo**: change pace with ffmpeg `atempo` (it exists in the
  bundled build) and scale scene frames by `1/atempo`. Word timestamps also scale
  by `1/atempo`, so derive timings at base speed then divide — see the script.
- **seed_audio `speech_rate` must be an integer**; prefer the with-timestamps TTS
  endpoint for narration regardless.
- **Legibility**: white text needs SOME separation on bright footage. Use the
  shared `SH` directional shadow — not a wide glow, not a stroke, and don't darken
  the video. Most "invisible white text" bugs come from a stray `textShadow:'none'`.
- **No-repeat media (HARD RULE)**: every footage scene uses a distinct asset,
  AND no photo/video background is reused across reels — each reel sources its
  own footage into `public/<name>/`. The only cross-reel sharing allowed is the
  cloned voice, `media/logo.png`, and `media/sfx_*.mp3`. If you're short an
  asset, convert a scene to solid black/red rather than reusing one. Before
  rendering, verify: `grep -oE "src: '[^']+'" src/<Name>Reel.tsx` should show
  ONLY this reel's own `public/<name>/` assets plus the shared
  `media/sfx_*.mp3` / `media/logo.png`. Equivalently, list every OTHER reel's
  folder — `grep -oE "src: '(media|yahoo|carwash|att|ownership|laundromat|inflation|sci|quibi|waste|lifetime|pest|parc)/[^']+'"
  src/<Name>Reel.tsx | grep -vE 'sfx_|logo'` must return nothing. Reusing
  another reel's clip is a defect to fix, not a shortcut.
- **Secrets**: the ElevenLabs key is the user's — use it only for API calls, never
  write it into files, the repo, or commit messages. Remind them to rotate it.
- **Factual claims**: if a script names a real company / cites financials, render
  it as written but flag that it's unverified before publishing.

## Multiple reels in one repo

Each reel is its own composition so earlier ones stay intact. To add one:
- Copy `src/StorageVideo.tsx` → `src/<Name>Reel.tsx`; rename the exported
  component; point its two `<Audio>` srcs at a namespaced folder
  (`<name>/voiceover.mp3`, `<name>/music.mp3`); set the `HUD` label; replace the
  `SCENES` + `SFX` arrays.
- Put that reel's media under `public/<name>/`. **Only these are shared across
  reels: the cloned voice (same `voice_id`), `media/logo.png`, and
  `media/sfx_*.mp3`.** Everything visual — every photo and video background —
  must be sourced fresh for each reel (see the hard rule below). Do NOT reference
  another reel's clips (`media/clip_*`, `media/p_*`, `yahoo/*`, etc.).
- Register a new `<Composition id="<Name>Reel" .../>` in `src/Root.tsx`
  (import its `DURATION_IN_FRAMES` aliased) and render that id.
- Examples in this repo alongside the original `StorageUnit`: `src/YahooReel.tsx`
  ("know when to sell"), `src/CarWashReel.tsx` ("the car wash play"),
  `src/AttReel.tsx` ("the forecast trap"), `src/OwnershipReel.tsx` ("the
  ownership gap"), `src/LaundromatReel.tsx` ("the laundromat play"), `src/InflationReel.tsx` ("the inflation tax"), `src/SciReel.tsx` ("the invisible roll-up"), `src/QuibiReel.tsx` ("money isn’t demand"), `src/WasteReel.tsx` ("own the landfill"), `src/LifetimeReel.tsx` ("when it starts working"), `src/PestReel.tsx` ("it kills bugs"), and
  `src/ParcReel.tsx` ("the cash-cow trap"). Each has
  its own footage under `public/<name>/` — confirm with the grep below before
  rendering.

## Adapting the look

Swap the `HUD` label, tune `SH`, or change the accent by editing `C.red`. Keep the
core rules (one red token/scene, Anton caps, soft directional shadow, unique
media, word-synced cuts) — that's the format the client approved.
