# The Storage Moat — Remotion video

A 9:16, ~80-second kinetic-typography video built with [Remotion](https://remotion.dev),
narrating the self-storage / Public Storage "moat" investment story.

- **Format:** 1080 × 1920 (9:16 vertical), 30 fps, 2328 frames (~77.6s)
- **Composition id:** `StorageUnit`
- **Source:** `src/StorageVideo.tsx` (all scenes + timeline), `src/Root.tsx` (composition)

## Script

> There's a business on the edge of your town with no employees, no product, and
> no customers who ever leave. Last year it made four point eight billion dollars.
> Public Storage rents simple, unstaffed metal units. Low labour. Low upkeep. Rent
> due monthly. A unit rented and forgotten is close to pure margin. Once a facility
> is built, it runs on almost nothing. No inventory. Minimal staff. Automatic rent
> increases. And customers who rarely leave. The moat is unglamorous, and that's why
> it holds. Once your belongings are inside, moving them out costs a weekend and a
> truck. So a small annual rent increase is easier to accept than to fight. Occupancy
> holds through downturns — because the things that trigger storage are moves,
> divorces, downsizing. The exact things recessions produce. This is a REIT. Around
> four point eight billion dollars in annual revenue. A fortress balance sheet. Built
> on sheds. Facility operating margins run near seventy-nine percent. Same-store
> around seventy-eight. Net margin near thirty-seven. Once the building is up, there
> is almost nothing on the cost side. Boring is beautiful. The least glamorous corner
> of real estate — a shed you forget you're paying for — is one of the most profitable
> in the country. No brand. No buzz. Just rent. The absence of a story is part of why
> the margins survive.

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

## Scenes

The script is split into 26 beats defined by the `SCENES` array in
`src/StorageVideo.tsx`, each with its own text, red focal token, background, and
duration timed to the narration. Scene kinds: `hook`, `lines` (staggered list),
`text` (word-by-word caption), `stat` (count-up number with optional bar — used
for `$4.8B`, `79%`, `78%`, `37%`), `impact` (the red "Boring is beautiful" beat),
and `outro`. Edit copy, highlight words, media, and timing directly in that array.

## Backgrounds & audio

- Narration lives at `public/voiceover.mp3` and is enabled via the `HAS_VOICEOVER`
  flag in `src/StorageVideo.tsx`. Scene durations are timed to the read.
- Most scenes have a full-bleed background (mixed stills + video) in
  `public/media/`, sourced from [Pexels](https://www.pexels.com) (free license);
  a few beats sit on solid black or red. Videos are pre-cropped to 1080×1920
  silent clips, shown at full brightness with a Ken Burns move, a text-only drop
  shadow for legibility, and quick cuts between scenes.

Every footage scene uses a distinct background (no repeats). Media credits
(Pexels, free license) — videos: warehouse aerial (3969002), industrial area
(32338863), wood-pallet yard (31025294), semi truck (17899033), stock-market
screen (7578613), counting dollars (6266251), US dollars (856668), suburban
street aerial (29052852). Photos: dollar bills (4386469), cash briefcase
(259027), moving truck at night (26443249), man carrying boxes (6169046),
young man with boxes (7203789), labeled boxes (9603487), house keys (373550),
aerial houses (3997060), padlock on metal door (18783949), steel construction
(14213937).

Audio (all in `public/`):
- **Narration** — ElevenLabs voice cloned from the client's reference video,
  sped +3% for pace (`voiceover.mp3`). Scene durations are timed to the read.
- **Music** — upbeat instrumental generated with ElevenLabs Music
  (`media/music.mp3`), ducked under the narration with fade in/out.
- **SFX** — ElevenLabs sound-generation: `sfx_whoosh` on cuts, `sfx_impact` on
  stat/impact beats, `sfx_chaching` on the revenue reveal. Cues live in the
  `SFX` array in `src/StorageVideo.tsx`.

## Additional reels

The repo holds several reels in the same house format, each its own Remotion
composition with its own footage under `public/<name>/` (no photo/video
background is reused across reels — only the cloned voice, `media/logo.png`, and
`media/sfx_*.mp3` are shared):

- **`YahooReel`** — "Know when to sell."
- **`CarWashReel`** — "The car wash play" (Wall Street car-wash rollup).
- **`ParcReel`** — "The cash-cow trap" (Xerox PARC invented modern computing and
  captured almost none of it). ~48s. Media credits (Pexels, free license) —
  photos: a vintage "General" desktop computer (35378672), a Commodore CRT
  (9140593), a row of vintage CRT monitors (9140600), hands on a retro computer
  (9140591), a green circuit board (459411), a photocopier in use (9301897,
  3791246), stacks of cash (6266622), an Apple II with green screen (9140597),
  vintage Apple Macintosh computers (37148208), a briefcase of cash (6266770),
  an office tower at dusk (16960662), and a vintage Epson by a window (35014684).
  **Unverified claims:** references real companies (Xerox, Apple, Microsoft) and
  the historical PARC story (the 1979 Steve Jobs visit; PARC's invention of the
  GUI, mouse and ethernet) — widely told but verify the specifics before
  publishing.
- **`PestReel`** — "It kills bugs" (Rollins / Orkin: recurring pest-control
  revenue guaranteed by biology). ~43s. Media credits (Pexels, free license) —
  photos: a technician fogging outside a house (19789841), code on a screen
  (546819), cockroach macros (19294665, 11032990, 6526933), an exterminator in
  a warehouse (32055757), a fumigation tech (4176548, 36302077), a tech fogging
  a yard (19789837), a cockroach on a leaf (17177368), a printed receipt
  (14647295), dashboard GPS navigation (30954662), an aerial intersection
  (8148350), and an aerial suburban neighborhood (28490242). **Unverified
  claims:** names a real company (Rollins, NYSE: ROL, parent of Orkin) and cites
  ~24 straight years of revenue growth, ~$3.8B revenue, and a ~19% operating
  margin — verify against Rollins's latest 10-K before publishing.
- **`LifetimeReel`** — "When it starts working" (a lifetime of income, where it
  goes, and how two identical earners end up nowhere near each other). ~50s.
  Media credits (Pexels,
  free license) — videos: counting a stack of cash (5466769), dollar bills on a
  table (11587838). Photos: an empty wallet (8515596), graduates in caps
  (8106631), a cap and diploma (37945360), a house keychain (29094497), keys to
  a new home (29726512), a grocery cart (15491800), a 1040 tax form with
  calculator (6863178), coins forming a rising chart (30711884), a calendar with
  marked dates (9810172), a coin going into a piggy bank (3943724). Note: the
  figures (a ~$2.4M lifetime, ~$1.6M/$2.8M lifetime earnings by education,
  housing/transport/food ≈ 63% of budget, and the 7% compounding examples) are
  illustrative round numbers drawn from typical US averages — sanity-check the
  specifics before publishing.
- **`WasteReel`** — "Own the landfill" (Waste Management: the permit-protected
  moat of a "hole in the ground"). ~50s. Media credits (Pexels, free license) —
  videos: a front-loader garbage truck (34421895), a drone shot over a waste
  facility (10170423). Photos: an aerial trash field (3174347), a landfill hill
  with skyline (4454064), a landfill at dawn (5424849), an urban garbage truck
  (35436630), a rubber stamp on documents (18687845), an aerial landfill with an
  excavator (3181031), an aerial highway with a truck (20684574), trucks along a
  road (15978610), an aerial fleet of refuse trucks (8783849), a scrap dumpsite
  (128421), a landfill on a shore (5441305), an official document with a stamp
  (9858904). **Unverified claims:** names a real company (Waste Management, NYSE:
  WM) and cites ~$25B revenue, ~17% operating margin, >30% EBITDA margin, and
  20+ years of dividend increases — verify against WM's latest 10-K before
  publishing.
- **`QuibiReel`** — "Money isn't demand" (Quibi burned ~$1.75B and folded ~6
  months after launch). ~48s. Media credits (Pexels, free license) — videos:
  sweeping spotlights (8515272), hand scrolling a phone (9785300). Photos: $100
  bills (14820469), a film set with clapperboard (8088386), empty dark cinema
  seats (7234225), hands holding a phone with a blank screen (6611922), scattered
  $100 bills (5466788), a film-camera monitor (8089248), a hand holding cash
  (14820420), empty numbered theater seats (8159242), a "CLOSED" storefront sign
  (16723181). **Unverified claims:** names a real company (Quibi) and cites ~$1.75B
  raised and an April→December 2020 timeline — widely reported but verify before
  publishing.
- **`SciReel`** — "The invisible roll-up" (Service Corporation International, the
  quiet national consolidator of local funeral homes and cemeteries). ~55s.
  Media credits (Pexels, free license) — videos: memorial candle with teapot
  (12123574), single candle flame (15667292). Photos: white funeral flowers with
  ribbon (8986709), signing a business document (8441783), white steepled church
  (27686680), rows of military headstones (18495412), brick chapel with bell
  tower (7237663), brick chapel green roof (28674966), tree-lined cemetery
  (13919893), white lilies on a grave (8963948), vintage cemetery (18759200),
  signing a contract (261621), senior signing a document (618158), small chapel
  in a park (28574958), cemetery headstone under blue sky (28525326), rows of
  white crosses (36070577). **Unverified claims:** this reel names a real public
  company (Service Corporation International, NYSE: SCI) and cites specific
  figures — ~700k families/yr, ~1,490 funeral homes, ~496 cemeteries, $4.186B
  revenue, ~22% operating margin, ~$928M operating income. Treat these as
  approximate and verify against SCI's latest 10-K/annual report before
  publishing.
- **`InflationReel`** — "The inflation tax" ($10,000 left in a safe since 1980
  quietly loses ~75% of its purchasing power). ~32s, footage-forward with the
  three count-up stat beats on black and one red card. Media credits (Pexels,
  free license) — videos: a keypad safe lock (6573544), a vintage coin machine
  (4836575), a rising candlestick chart (38395147). Photos: a "$10,000" currency
  band (11624826), a stack of $20 bills (15633963), supermarket price shelves
  (4437145), a produce aisle with price signs (264636), a supermarket checkout
  (36772947), an hourglass (9771338). Note: the figures (a 1980 dollar ≈ 25¢
  today, price level ~4× since 1980, $100 → ~$390) track long-run US CPI but
  shift with the reference month — verify against the latest BLS data before
  publishing.
- **`LaundromatReel`** — "The laundromat play" (a boring, durable, recession-
  resistant local cash business). ~53s, footage-forward (only three plain-black
  beats and one red card). Media credits (Pexels, free license) — videos: coin
  laundry storefront (9737915), laundry interiors/machines (8756951, 8756892,
  8756955, 6482495, 8756884, 8756816, 5535852), folded-clothes stacking
  (5116403). Photos: coin-laundry washers (9669475), patrons waiting (4397175),
  fan of US dollars (4968663), apartment block with hanging laundry (7189284),
  pile of quarters (8018103), woman folding in a laundromat (2927523). No hard
  financials are quoted; the "recession-resistant / low-labour" framing is a
  general business characterization — sanity-check before publishing.
- **`OwnershipReel`** — "The ownership gap" (wealth concentration: the top 1%'s
  record share vs the bottom half). ~37s. Mostly full-bleed footage with just
  three plain-black beats (the two stats + one pivot line) and one red card.
  Media credits (Pexels, free license) — videos: commuters in a station
  (38342155), night street crowd (3542101), aerial luxury yacht (31873241), NYSE
  facade (4319342), rising candlestick chart (30289537), dark trading-screen
  with green charts (38412249), aerial night skyline (32258501). Photos: white
  domed luxury mansion (12594566), stack of US dollars (7680623), stacked gold
  bars (386318), aerial residential rooftops (16049973), counting cash at a desk
  (6694965), business team in an office (1181370). Note: the figures (top 1% ≈ a
  third of wealth, bottom 50% ≈ 2.5%,
  top 10% ≈ 90% of stocks) track widely reported US Federal Reserve
  distributional data but shift over time — verify against the latest release
  before publishing.
- **`AttReel`** — "The forecast trap" (AT&T reportedly walking away from mobile
  after a consultant forecast, then paying to re-enter). ~35s. Media credits
  (Pexels, free license) — videos: retro slider mobile phone (3878355), empty
  boardroom pan (6951299), busy Times Square crowd (34539087). Photos: upward
  glass skyscraper (374122), cellular tower (36962826), vintage telephone
  switchboard (2267635). Note: the AT&T / McKinsey "~900k by 2000" forecast, the
  ~$12.5B cost to re-enter (the 1994 McCaw Cellular acquisition), and the ~109M
  actual-subscribers figure are widely cited but vary across retellings — treat
  the specifics as approximate business folklore, not audited numbers, and
  verify before publishing.

## Export note

`out/storage-unit.mp4` is the full-quality master. For platforms with an upload
cap, transcode a smaller copy, e.g.:

```bash
npx remotion ffmpeg -i out/storage-unit.mp4 -c:v libx264 -crf 21 -preset slow \
  -c:a aac -b:a 160k -movflags +faststart out/storage-unit-web.mp4
```
