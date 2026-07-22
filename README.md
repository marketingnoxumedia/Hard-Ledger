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
- **`VulcanReel`** — "The gravel moat" (Vulcan Materials, the largest US
  aggregates producer — its moat is physics: crushed stone is too cheap per
  tonne and too costly to move for a distant rival to compete, and permitting
  freezes the quarry map). ~46s, footage-forward with the red "weight is the
  whole moat" `impact` card mid-reel and a closing quarry-aerial beat rather
  than the red card. Media credits (Pexels, free license) — photos: an aerial
  sand/aggregate quarry (33122147), a gray stone texture (237950), a crushed
  gravel heap (5799727), a yellow mining truck (34150285), an open-pit mine
  (33122148), excavators in a rocky pit (6553283), a shovel in a gravel pile
  (26925731), an industrial quarry conveyor (31096912), an asphalt paver on a
  road (37820986), a dump truck unloading rock (35177799), a highway paving
  machine (29181420), a dump truck in a dusty quarry (14704774), a printed map
  (31067412), an open-pit mining site (36236254), an aerial mining-earth
  pattern (288096), city construction cranes (30617023), a sand quarry with
  machinery (33122152), a macro gravel texture (4599912), and a top-down aerial
  of a mine with conveyors (6542371, closing beat). **Unverified claims:** names
  a real public company (Vulcan Materials, NYSE: VMC) and cites ~$7.9B revenue,
  ~$1B net income, and its status as the largest US aggregates producer —
  verify against Vulcan's latest 10-K before publishing.
- **`PayFirstReel`** — "Pay yourself first" (record household debt and a
  rock-bottom saving rate are one story — the gap between spending and income
  fills with ~21%-rate credit; wealth is what you remove before you spend, not
  what's left after). ~42s, footage-forward with the red "wealth isn't what's
  left over" `impact` card at the penultimate beat and a closing
  coin-into-savings media beat rather than the red card. Media credits (Pexels,
  free license) — photos: a pile of credit cards (32641818), cash and cards on
  a desk (6266627), hands opening an empty wallet (8719576), a stressed person
  with a card (7534380), a falling stock chart (7054384), a coin jar with a
  calculator (9821387), red shopping bags (7318916), a hand holding a credit
  card (5849580), a desk calendar (29509491), a coin going into a piggy bank
  (1602726), a Mastercard close-up (210742), a person holding a gold card
  (11006806), a bearish market-trend analysis (36633901), a hand holding a
  "Savings" jar (9755383), a shopper with a bag and card (7679727), and a hand
  dropping a coin into a gold piggy bank (12956000, closing beat). **Unverified
  claims:** cites a record ~$18.8T in US household debt, a personal saving rate
  in the low single digits (vs ~10% decades ago), and ~21% average card rates —
  broadly consistent with recent NY Fed / BEA / Fed figures, but verify the
  current numbers before publishing.
- **`ToysReel`** — "The leverage trap" (Toys R Us wasn't beaten by a better
  product — a 2005 leveraged buyout loaded it with ~$5B of debt whose interest
  starved the stores as Amazon and Walmart arrived). ~50s, footage-forward with
  the red "leverage cuts both ways" `impact` card at the penultimate beat and a
  closing lone-teddy-bear media beat rather than the red card. Media credits
  (Pexels, free license) — photos: packaged plush toys on shelves (31112564),
  toy robots and superheroes in a shop (6390193), tax documents with a
  calculator (6863282), a vibrant toy-store interior (36625295), a business
  handshake in suits (6918507), a fan of $100 bills on black (6590645), a desk
  with a financial report and calculator (33175667), a woman shopping among
  toys (29790215), penguin plush toys on shelves (691125), financial analysis
  with a calculator (33175651), a stack of cardboard boxes in a warehouse
  (29653988), scattered dollar bills on a dark surface (34746298), a sparse
  supermarket hallway (7451936), an empty mall with a shuttered store
  (27452443), a store "sale" sign (5699156), a clearance discount sign
  (10826514), and a lone teddy bear slumped in a dim corner (30027302, closing
  beat). **Unverified claims:** names a real company (Toys R Us) and cites the
  ~$6.6B 2005 KKR/Bain/Vornado LBO, ~$5B of debt, ~$400M/yr interest, and the
  2017 bankruptcy / 2018 US liquidation — widely reported but verify the
  specifics before publishing.
- **`CintasReel`** — "The rental machine" (Cintas rents businesses their own
  uniforms and launders them on recurring contracts — a garment becomes an
  annuity). ~48s, footage-forward with the "one garment / an annuity" red
  `impact` card mid-reel and a closing service-van beat rather than the red
  card. Media credits (Pexels, free license) — photos: shirts on a wooden
  hanger rack (18880644), a stack of folded linens (11733651), warehouse staff
  in uniform (4484152), hands holding folded shirts (4440574), dress shirts on
  hangers (965632), an industrial washing machine (8774414), a worker in a
  hi-vis safety vest (36122947), a driver at a service van (7843970), workers
  handling fabric in a laundry (8774570), a worker with a cart of linens
  (8774638), a professional handshake over a contract (17682883), uniformed
  workers folding garments (31251590), industrial workers in safety gear
  (32845683), an aerial city skyline (28279109), workers at industrial washers
  (8774639), and a driver stepping out of a delivery van (6169135, closing
  beat). **Unverified claims:** names a real public company (Cintas, NASDAQ:
  CTAS) and cites ~1M+ business customers, ~$10.3B revenue, a ~22% operating
  margin, and ~$1.8B profit — verify against Cintas's latest 10-K before
  publishing.
- **`RefundReel`** — "The refund trap" (a tax refund is your own money returned
  late, interest-free — a no-interest loan you didn't mean to make). ~41.5s,
  footage-forward and ending on a wall-clock beat rather than the red card (the
  red `impact` sits at the penultimate thesis beat). Media credits (Pexels, free
  license) — photos: a blurred 1040 income-tax return (7688995), a macro of
  stacked $100 bills (3531895), a hand fanning $20 bills (545065), a quartz clock
  face (8102178), tax paperwork with a calculator (6694543), hands stacking coins
  (9755376), the US Capitol dome (12505005), a hand dropping a stamped envelope
  into a mailbox (1550334), a digital stock-market chart (7567223), a candlestick
  trading screen (6770610), a hand holding a payroll cheque (6862457), a person
  smiling with a fan of cash (7680634), assorted US bills on black (6590651), a
  ribbon-wrapped gift (1661959), and a wooden wall clock (191703, closing beat).
  **Unverified claims:** the figures are illustrative round numbers — a ~$3,300
  average refund, ~$275/month overpaid, a 7% assumed return, and ~$335K
  compounded over a career. They're arithmetic on stated assumptions, not a
  claim about any specific person or year; sanity-check the average-refund and
  return assumptions before publishing.
- **`ParcReel`** — "The cash-cow trap" (Xerox PARC invented modern computing and
  captured almost none of it). ~48s. Media credits (Pexels, free license) —
  photos: a vintage "General" desktop computer (35378672), a Commodore CRT
  (9140593), a row of vintage CRT monitors (9140600), hands on a retro computer
  (9140591), a green circuit board (459411), a photocopier in use (9301897,
  3791246), stacks of cash (6266622), an Apple II with green screen (9140597),
  vintage Apple Macintosh computers (37148208), a briefcase of cash (6266770),
  an office tower at dusk (16960662), a vintage Epson by a window (35014684), and
  a fan of burnt banknotes on a wooden table (4588678, closing beat).
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
  (8148350), an aerial suburban neighborhood (28490242), and a suburban home
  under a crescent moon at dusk (20793769, closing beat). **Unverified
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
  marked dates (9810172), a coin going into a piggy bank (3943724), and a forked
  country road under a grey sky (17342281, closing beat). Note: the
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
  white crosses (36070577), and rows of white gravestones on green lawn
  (6375819, closing beat). **Unverified claims:** this reel names a real public
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
