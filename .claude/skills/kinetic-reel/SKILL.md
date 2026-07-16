---
name: kinetic-reel
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
  **each asset used once — no repeats**, shown at full brightness with a Ken
  Burns move; a few beats sit on solid black or a solid red "impact" card.
- **Motion:** quick cuts; `enter: 'slideL'|'slideR'|'slideUp'|'zoom'` adds a
  transition on some in-between scenes (media + text move together).
- **Audio:** ElevenLabs voice **cloned from the client's reference video**,
  word-synced to the cuts; an upbeat **ElevenLabs Music** bed ducked under the
  voice; **ElevenLabs SFX** (whoosh on cuts, impact on stat/impact beats,
  cha-ching on revenue) via an `SFX` cue array.
- **HUD:** monochrome top label + faux waveform + progress bar.
- Keep a `HUD` "brand" label per project (e.g. "THE STORAGE MOAT").
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
     length). Save to `public/media/music.mp3`; it plays ducked (~0.14) with a
     fade envelope in the composition.
   - SFX: `POST /v1/sound-generation` with `{text, duration_seconds}` for
     `sfx_whoosh` / `sfx_impact` / `sfx_chaching`. Place cues in the `SFX` array
     at the `STARTS` of key scenes (cuts, stat reveals, revenue).

6. **Fill in `SCENES`** — write the beats: one red focal token each, pick `stat`
   for every number, `impact` (redBg) for the punchline, `lines` for lists,
   `enter` transitions on ~1/4 of scenes. Set the `HUD` brand label.

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
- **No-repeat media**: every footage scene must use a distinct asset; convert a
  couple of scenes to solid black/red if you're short one, rather than reusing.
- **Secrets**: the ElevenLabs key is the user's — use it only for API calls, never
  write it into files, the repo, or commit messages. Remind them to rotate it.
- **Factual claims**: if a script names a real company / cites financials, render
  it as written but flag that it's unverified before publishing.

## Adapting the look

Swap the `HUD` label, tune `SH`, or change the accent by editing `C.red`. Keep the
core rules (one red token/scene, Anton caps, soft directional shadow, unique
media, word-synced cuts) — that's the format the client approved.
