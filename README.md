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
- **`MillionaireReel`** — "Built, not inherited" (most millionaires aren't
  trust-fund heirs — around eight in ten are first-generation, built on ordinary
  jobs and a high savings rate held for decades; the asset is the gap between
  earning and spending, invested over time). ~41s, footage-forward and mixing
  video clips with stills, with the red "the habit is the asset" `impact` card
  near the end and a closing self-made-portrait beat rather than the red card.
  Media credits (Pexels, free license) — videos: an aerial luxury mansion
  (11400591), a hand adding coins to a savings jar (13107027), a young worker in
  a workshop (8964296), and a rising business chart (7947438). Photos: a man
  with champagne on a private jet (6700127), a young maker in a workshop
  (3846638), a man with a laptop (8278872), a suburban house (5785100), a
  confident professional (36712864), an accountant at a calculator (8276182), a
  teacher at a classroom desk (8499635), a professional in glasses (4872063), a
  hand adding a coin to a piggy bank (3848193), a vintage handwritten ledger
  (164686), hands reviewing a family budget (7735778), a suburban home
  (18280833), a woman poolside at a luxury resort (37651183), a businessman with
  crossed arms (8344740), and a young professional portrait (7289738, closing
  beat). **Unverified claims:** the figures are illustrative — the "~8 in 10
  first-generation" and "top professions" claims echo the *Millionaire Next
  Door* research and similar studies; treat the exact proportion as approximate
  and sanity-check before publishing.
- **`WaterReel`** — "Regulation as a moat" (the American Water story: one
  business whose demand can't fall to zero, with no substitute and no
  legally-allowed competitor; the regulator *is* the business model — rates are
  set to earn an allowed return on invested capital, so reinvesting in pipes and
  plants is the mechanism by which earnings grow). ~59s, footage-forward and
  mixing video clips with stills, with the red "regulation as a moat" `impact`
  card late-mid and a closing reservoir-outfall beat ("engineered, not won")
  rather than the red card. Media credits (Pexels, free license) — videos: a
  drone shot of a water-treatment facility (5115937), water flowing from
  discharge pipes (36928186), a running tap (2236003), and an aerial river
  outfall/dam (27114632). Photos: a reservoir dam intake tower (13543724), large
  iron pipes against the sky (4245539), a water-purification facility from the
  air (5712211), clarifier and aeration basins from above (35425759), a circular
  treatment structure (27490881), a gavel on a courtroom desk (5668484), a stack
  of US dollar bills (30795043), a rising financial chart (30268012), a clean
  glass of water on a table (7402619), large industrial water pipes with valves
  (32502650), fanned hundred-dollar bills (18921474), a green financial graph
  (5784807), blue water-treatment tanks (36926327), an aerial turquoise
  reservoir (28283852), and a bullish upward chart (30268013, growth beat).
  **Unverified claims:** the financials attributed to American Water (NYSE: AWK)
  — ~$1.137B regulated net income, adjusted EPS up ~8.9%, ~$3.2B reinvested, and
  a 7–9% growth target — are rendered as written in the client script and have
  **not** been independently verified; confirm against the company's latest
  filings before publishing.
- **`CokeReel`** — "Listen, then reverse" (the 1985 New Coke story: Coca-Cola
  replaced its flagship with a reformulation that blind taste tests genuinely
  preferred, hit a fierce consumer backlash, and brought the original back as
  Coca-Cola Classic just 79 days later — a famous blunder undone fast, arguably
  leaving a stronger brand; the research measured the drink, not the attachment).
  ~50s, footage-forward and mixing video clips with stills, with the red "listen,
  then reverse" `impact` card late and a closing clock beat ("replacement to
  reversal") rather than the red card. Media credits (Pexels, free license) —
  videos: a bottle of cola beside an empty glass (4114386), a stainless bottling
  machine (8720278), a macro cola-fizz close-up (8676994), and glassware moving
  through a production line (10615247). Photos: a glowing retro CRT television
  (704555), a red "Original Taste" cola can in smoke (31763557), wet red soda
  cans (6920721), a survey/results clipboard (9034980), a drinks-tasting judging
  session (31715289), a bearish downward market chart (35118208), a jar of sugar
  cubes (2523650), a vintage TV and rotary phone (28679905), a person taking
  research notes (6712711), a man shouting into a vintage telephone (1587014), a
  flip desk calendar (36239190), an April calendar page (29509489), a rising
  staircase-and-arrow growth symbol (9822733), and a close-up clock face
  (16371933, closing beat). **Note on brand imagery:** this reel names a real
  company (Coca-Cola) and, as editorial reference to the actual 1985 event, shows
  real Coca-Cola product imagery — an "Original Taste" can (31763557) and a Coke
  bottle (video 4114386). The "79 days," blind-taste-test, and "stronger brand"
  points are historical claims rendered as written; sanity-check the specifics
  and clear the brand imagery for your use case before publishing.
- **`RatioReel`** — "The goalpost moved" (home affordability is set by the
  price-to-income *multiple*, not the sticker: around 1980 a typical US home
  cost ~3× household income; today it's closer to ~5×, with the median home
  around $410K against a median income near $84K — the house didn't change, the
  multiple did, and higher mortgage rates on a bigger multiple compound the
  squeeze, so the same job buys less house). ~53s, footage-forward and mixing
  video clips with stills, with the red "the goalpost moved" `impact` card late
  and a closing lit-home-at-dusk beat ("five times now") rather than the red
  card. Media credits (Pexels, free license) — videos: an aerial suburban
  neighborhood (4770380), hands counting cash with a calculator (8479058), a
  worker framing a house (19654640), and a realtor greeting home-buying clients
  (8814975). Photos: a white-picket-fence home (5587941), a two-storey suburban
  house (164558), a "For Sale" yard sign at golden hour (32519068), a wallet of
  dollar bills (4430243), a two-story home with driveway (5353883), a hand
  holding a stack of bills (4691477), paper trend lines climbing (7947709), a
  couple reviewing bills with concern (6963889), a classic red-brick house
  (36086367), a modern family home (5071130), a check and financial ledgers
  (15240212), mortgage-rate documents with a calculator (8292895), a home with a
  prominent "For Sale" sign (7578855), a miniature house with keys and a
  contract (12955837), and a warmly lit home at dusk (1396132, closing beat).
  **Unverified claims:** the figures — ~3× income c.1980, ~5× today, ~$410K
  median home, ~$84K median income — are illustrative and rendered as written;
  they drift over time, so sanity-check against current data before publishing.
- **`LabelReel`** — "The unavoidable sliver" (Avery Dennison charges a fraction
  of a cent per item on the labels, tags and adhesive materials on a huge share
  of the world's packages, products and shipping boxes: the per-unit price is
  beneath fighting over, yet collected across billions of units; every product
  needs labelling — price tags, barcodes, shipping labels, RFID — and e-commerce
  compounds it, all embedded in retail/logistics supply chains and hard to
  displace). ~56s, footage-forward and mixing video clips with stills, with the
  red "tiny part, huge scale" `impact` card late and a black payoff closer ("a
  fraction of a cent, on nearly everything") rather than the red card; the ~16%
  EBITDA-margin stat uses a proportional red bar. Media credits (Pexels, free
  license) — videos: a retail self-checkout barcode scan (7457422), parcels on a
  sorting conveyor (10472351), a printer producing labels for boxes (7217134),
  and a labelled box on a conveyor belt (4156510). Photos: a package with barcode
  and QR labels (7843978), a hand holding a labelled shipping box (4440792), jeans
  with a price-and-barcode hangtag (7441481), stacked labelled cardboard boxes
  (4440789), a calculator on dollar bills (5942528), a supermarket shelf with
  priced milk cartons (7451957), a hand holding a strip of barcode labels
  (6250876), an express-mail parcel (4440788), a stocked grocery aisle (16211537),
  a warehouse of shelved boxes (38195854), a labelled warehouse aisle (5775099), a
  close-up of hundred-dollar bills (14820416), and stacked cash on a desk
  (6266701). **Unverified claims:** this reel names a real company (Avery
  Dennison, NYSE: AVY) and cites financials — ~$8.9B revenue, ~16% EBITDA margin,
  >$700M free cash flow — rendered as written and **not** independently verified;
  confirm against the company's latest filings before publishing.
- **`PhantomReel`** — "Phantom subscriptions" (a ~12s reel about the gap between
  what people think they spend on subscriptions and what they actually pay: they
  guess ~$86 a month, the real figure is ~$273, because each charge is small
  enough to never get cancelled; the save frame reveals the comparison — $86
  guessed vs $273 paid, per month, per US household, per West Monroe — and holds
  to the end while the footer swaps to "the price isn't the problem" as that line
  is spoken, the count is). The voiceover runs continuously with no dead air and
  scene durations sit on its exact spoken-word timestamps, so the reel lands at
  the natural pace of the read. Two video clips over a still; the two-number
  count-up comparison save frame holds on black. Media credits (Pexels, free
  license) — videos: a woman paying by card at a laptop (6607112) and a man
  relaxing with a TV remote (7100958). Photo: a man reacting with shock to his
  phone (11645171). **Unverified claim:** the ~$86-guessed / ~$273-paid per-month
  figures are attributed to West Monroe in the client script and rendered as
  written; confirm the source and the current figures before publishing.
- **`DriftReel`** — "Drift is the default" (the long-form ~57s companion to the
  `PhantomReel` loop: people guess ~$86/month on subscriptions but the average US
  household actually runs ~$273/month, ~$3,300/year — streaming, apps,
  memberships, cloud storage — small recurring charges designed to stay below the
  notice-and-cancel line; most name less than half of what they pay, ~4 in 10 pay
  for a subscription they no longer use, and it accrues $9 and $14 at a time on
  cards no one checks). Continuous voiceover, scene durations on its exact
  spoken-word timestamps; two count-up comparison beats ($86 vs $273, $86 vs
  $3,300), the red "drift is the default" `impact` card mid-late, and several
  beats on black. Media credits (Pexels, free license) — videos: scrolling an app
  store (14377147), a contactless card tap on a terminal (11158789), a close-up
  of coins (5651775), and coins with small bills on a table (6326928). Photos: a
  woman reviewing finances on her phone (5900034), a dark phone home screen of
  apps (89955), a fan of $100 bills (5466807), a magnifier over "terms and
  conditions" (7821937), a woman with her hand to her head over paperwork
  (6919751), a hand holding a fan of hundreds (14820411), and a woman holding up
  bills (5900089). **Unverified claims:** the figures — ~$86 guessed, ~$273/month,
  ~$3,300/year, ~4 in 10 with an unused subscription — echo West Monroe and
  similar surveys and are rendered as written; confirm the sources and current
  figures before publishing.
- **`BottleReel`** — "The label, not the liquid" (a ~36s reel on bottled water:
  you buy it by the case and think you're paying for water, but the water is the
  cheapest thing in the bottle — almost every cent goes to everything around it.
  From the tap the same volume costs a fraction of a cent per litre; on the shelf,
  a dollar or more. The gap isn't the liquid — it's packaging, branding, logistics
  and retail margin. You're buying convenience and a label; the contents are the
  smallest cost in the chain, the water a rounding error. The product isn't the
  water, it's everything wrapped around it — price tracks the packaging, not the
  thing inside). Continuous voiceover, scene durations on its exact spoken-word
  timestamps; two per-litre stats (<1¢ tap / $1+ bottled), a four-item cost list
  (packaging / branding / logistics / retail margin), the "price tracks the
  packaging" red `impact` card mid-tail, and a closing <1¢-vs-$1 comparison. Media
  credits (Pexels, free license) — videos: a running tap (11593539) and a water
  bottling/filling line (36968920). Photos: a case of capped bottles (15524063),
  a clear plastic bottle (11860562), a poured glass (4965574), and a
  bottle-to-glass pour (8074426). **Illustration:** the per-litre figures are
  round, order-of-magnitude values (tap at a fraction of a cent per litre vs
  bottled at roughly a dollar or more), not a quoted price for any brand or
  region; confirm local figures before publishing.
- **`LotteryReel`** — "Wealth is a habit" (a ~50s reel on the lottery-bankruptcy
  twist: the oft-repeated "most winners go broke" stat has no real source; the
  finding that does is stranger — a big win doesn't stop bankruptcy, it reschedules
  it. Researchers tracked lottery winners for five years and found big winners
  about 50% more likely to file than smaller winners, but not right away: a large
  prize delays bankruptcy by a few years rather than preventing it, with filings
  clustered three to five years after the win and about 1 in 18 big winners filing
  within five years. A windfall lifts spending immediately; holding wealth takes
  longer to build than the money takes to spend. A lump sum is income, wealth is a
  habit — more money doesn't fix money habits, it amplifies them). Continuous
  voiceover, scene durations on its exact spoken-word timestamps; two stats
  (50% / 1-in-18), the "wealth is a habit" red `impact` card mid-tail, and a
  "postponed, not prevented" calendar closer. Media credits (Pexels, free
  license) — videos: lottery tickets spinning on a roller (2982434) and a man in
  a parked sports car (30763728). Photos: a stack of $100 bills (14820469), an
  hourglass (8573370), an empty wallet (8515596), and a wall calendar (32381238).
  **Unverified claim:** this cites a real academic finding on lottery winners and
  bankruptcy (large winners ~50% more likely to file than small winners; filings
  clustered ~3–5 years post-win; ~1 in 18 big winners filed within five years —
  figures associated with Hankins, Hoekstra & Skiba, "The Ticket to Easy
  Street?"); rendered as written and **not** independently verified; confirm the
  study and figures before publishing.
- **`MarginReel`** — "Margin tells the business" (a ~44s reel on revenue vs
  margin: two companies each ring up a dollar of sales — one keeps about two
  cents, the other about a third. Revenue is the size of the pipe; margin is what
  actually stays, and two identical top lines can hide an order-of-magnitude gap.
  A grocer like Kroger keeps roughly 1–2¢ per dollar because competition and
  perishables leave almost no room; enterprise software like Microsoft keeps
  around 35¢, because serving one more customer costs almost nothing. Volume hides
  the gap — the grocer moves enormous revenue to earn what the software firm earns
  on a fraction of it. Revenue tells you the size; margin tells you the business).
  Continuous voiceover, scene durations on its exact spoken-word timestamps; two
  margin stats (2¢ / 35¢), the "margin tells the business" red `impact` card
  mid-tail, and a closing 2¢-vs-35¢-kept comparison as the payoff. Media credits
  (Pexels, free license) — videos: a checkout belt with a barcode scanner
  (29832466) and a shopper walking a grocery aisle (4081583). Photos: US dollar
  bills (6468225), a network of steel pipes (2310904), a refrigerated produce
  case (28670064), a server rack (37605910), a stocked warehouse aisle (4483608),
  and scattered coins (1006060). **Unverified claim:** this names real companies
  (Kroger, NYSE: KR; Microsoft, NASDAQ: MSFT) and characterises their net margins
  — a grocer at ~1–2¢ on the dollar, enterprise software at ~35¢ — as
  illustrative, order-of-magnitude figures; rendered as written and **not**
  independently verified; confirm against current filings before publishing.
- **`SaverReel`** — "Rate beats salary" (a ~45s reel on savings rate vs salary:
  two workers, same 30 years, same market. One earns $150K and saves 5%; the
  other earns $60K and saves 20% — so the higher earner invests $7,500 a year and
  the lower earner $12,000. Run both at an assumed 7% for 30 years and the pots
  flip — the higher earner reaches about $0.7M, the lower earner about $1.1M. The
  one who put in more each year wins, regardless of who earned more: the salary
  set the ceiling, the savings rate decided the outcome, and a raise you spend
  changes nothing. Net worth tracks the gap between earning and spending, not the
  size of the paycheck). Continuous voiceover, scene durations on its exact
  spoken-word timestamps; single-figure stats ($150K / $60K / 5% / 20% / 7%), two
  contrast comparisons ($7,500 vs $12,000 invested per year, $0.7M vs $1.1M pots),
  the "rate beats salary" red `impact` card mid-tail, and an earned-less /
  saved-more / retired-richer `lines` closer over the final clip. Media credits
  (Pexels, free license) — videos: two colleagues at a laptop (6930964) and a
  retired couple walking a beach path (8630075). Photos: a market ticker board
  (210607), a seaside bench overlooking the water (18260123), hands stacking coins
  into growing piles (9755376), a glass tower shot looking up (614228), a person
  with paper shopping bags (6238591), and a coin jar sprouting a green shoot
  (9755390). **Illustration, not a forecast:** the figures are a worked example,
  not real people — two hypothetical savers compounded at an assumed 7% for 30
  years ($150K×5% = $7,500/yr ≈ $0.7M; $60K×20% = $12,000/yr ≈ $1.1M); the 7%
  return and rounded pot figures are illustrative.
- **`ToyReel`** — "Looks like a toy" (the long-form ~60s companion to
  `BlockbusterReel`: in 2000 Blockbuster could have bought Netflix for about $50M
  and laughed it off. On the numbers of the day refusing looked sound — the
  stores were profitable, the brand national, late fees dependable, and Netflix
  was tiny, unprofitable, and dependent on the mail; buying it also meant funding
  a model whose success would kill the very late fees paying the bills. Streaming
  arrived, late fees died, customers left, and Blockbuster filed for bankruptcy in
  2010, while Netflix went on to be worth over $400B — roughly 8,000× the price
  Blockbuster wouldn't pay. The danger wasn't a bigger rival; it was a tiny one
  solving the customer's real annoyance). Continuous voiceover, scene durations
  on its exact spoken-word timestamps; three stats ($50M / $400B / 8,000×), the
  "looks like a toy" red `impact` card mid-tail, and a closing $50M-refused vs
  $400B-gone comparison as the payoff. Media credits (Pexels, free license) —
  videos: a hand browsing crates of records in a media store (6825964) and a
  woman lit by screen glow watching at night (9808085). Photos: a vintage CRT TV
  on a wood floor (333984), a long shopping receipt held in two hands (4959907),
  a person holding up a shiny disc (15092992), a neon "Video World" rental-store
  interior (15588865), and a shuttered brick storefront (8387508). **Unverified
  claim:** this names real companies (Blockbuster, Netflix) and cites a
  widely-reported anecdote — the ~$50M Netflix offer Blockbuster declined circa
  2000, its 2010 bankruptcy, Netflix later worth over $400B, and the resulting
  ~8,000× gap; rendered as written and **not** independently verified; confirm the
  figures before publishing.
- **`AwsReel`** — "The cloud is the business" (the long-form ~43s companion to
  `AmazonReel`: you think of Amazon as a store, and the store is most of what it
  sells but less than half of what it earns. Its own segment reporting flips the
  picture — retail, North America + International, brings in over 80% of revenue
  while AWS is under a fifth; on operating income it reverses, AWS earning more
  than half of all operating income on that small slice of sales. Retail makes
  money now, but AWS earns far out of proportion to its size, so investors price
  Amazon on the segment that earns, not the one that's visible). Continuous
  voiceover, scene durations on its exact spoken-word timestamps; two segment
  stats (>80% / >50%), the "on profit, it flips" red `impact` card, and a closing
  <20%-of-sales vs >50%-of-profit comparison. Media credits (Pexels, free
  license) — videos: a POV shopping-cart run through a store (5137848), a busy
  supermarket checkout (37101039), and a server room (5028622). Photos: a
  warm-lit grocery storefront at night (12805817), a cardboard delivery parcel on
  a doorstep (6170463), a printed quarterly bar-chart report (7947849), and two
  blue-lit server racks (37730211, 17323801). **Unverified claim:** this names a
  real company (Amazon, NASDAQ: AMZN) and characterises its segment economics —
  retail >80% of revenue, AWS under a fifth of revenue but >50% of operating
  income — as stated in the client script (attributed to Amazon's own segment
  reporting); rendered as written and **not** independently verified; confirm
  against the latest 10-K before publishing.
- **`AmazonReel`** — "The storefront was never the business" (a ~20s reel on
  Amazon's segment economics: the retail storefront barely earns — it's the
  front; retail carries almost all the revenue and almost none of the profit,
  while the cloud business, AWS, does the earning. The save frame lands the
  point — per segment reporting, AWS is ~15% of Amazon's revenue yet the majority
  of its operating income — then holds silent before the loop closer). Same
  storyboard-driven build as `PhantomReel`: beats spaced to the client's marks
  (2s / 4s / 4s / 4s / 4s / 2s) under a continuous voiceover with no dead air —
  the VO is split at its sentence boundaries and each beat placed at its mark,
  music under the holds. Three video clips over a store still; the save-frame
  stat (multi-line, with a source line) and loop closer sit on black. Media
  credits (Pexels, free license) — videos: a person shopping an online store on a
  laptop (8937982), an order being fulfilled amid shipping boxes (6169422), and a
  blue-lit server room (1085656). Photo: a modern grocery-store aisle (15491784).
  **Unverified claim:** this reel names a real company (Amazon, NASDAQ: AMZN) and
  characterises its segment economics — AWS ~15% of revenue but the majority of
  operating income — as stated in the client script (attributed to Amazon's
  10-K); rendered as written and **not** independently verified; confirm against
  the latest 10-K before publishing.
- **`BlockbusterReel`** — "It was a reasonable no" (the Blockbuster/Netflix
  story: around 2000 a DVD-by-mail startup offered to sell itself; Blockbuster
  declined — and reportedly laughed. Blockbuster later filed for bankruptcy; the
  startup was Netflix. The save frame lands the gap — Netflix became worth on the
  order of 8,000× the price Blockbuster refused to pay — before the loop closer:
  on the information available at the time, it was a reasonable no). The voiceover
  runs continuously with no dead air and scene durations sit on its exact
  spoken-word timestamps, so the reel lands at the natural ~13s of the read.
  Three video clips over an abandoned-mall still; the save-frame stat (multi-line)
  and loop closer sit on black. Media credits (Pexels, free license) — videos: an
  optical disc catching the light (4211105), a hand browsing a rack of media
  cases in a store (31760354), and a family on the couch for a movie night
  (6336598). Photo: the interior of a dead / abandoned shopping mall (35437549).
  **Unverified claim:** this recounts the widely-reported Blockbuster/Netflix
  anecdote and frames the outcome gap as 8,000×, an illustrative
  order-of-magnitude figure rendered as written; sanity-check the anecdote and
  the multiple before publishing.
- **`QwiksterReel`** — "The 3-week reversal" (Netflix's 2011 Qwikster fiasco:
  it split DVD and streaming, raised prices and renamed the DVD side, watched
  subscribers revolt, then killed the plan, admitted the mistake, and refocused
  — all in ~3 weeks, before a decade of growth). ~52s, footage-forward and
  mixing video clips with stills, with the red "reversing fast is a skill"
  `impact` card near the end and a closing calendar recap beat rather than the
  red card. Media credits (Pexels, free license) — videos: a hand with a TV
  remote (7184588), a spinning optical disc (4211106), a red downtrend market
  chart (35606045), and a rising market chart (38412249). Photos: a smart TV
  showing a streaming interface (5202925), executives in a boardroom (7433849),
  a U-turn road sign (9900008), a shelf of DVD movie cases (14213112), a
  strategy meeting (7648468), a stack of CDs (4734714), a couple watching a
  streaming TV (4009402), a man frustrated at a laptop (52608), a smart TV with
  a smartphone (35490296), a woman frustrated with paperwork (6029065), a TV
  streaming interface close-up (13806260), a woman with her head in her hands
  (6028573), businessmen analyzing data (6285073), a spiral desk calendar
  (29509513), colleagues reviewing documents (7433851), and a desk-calendar page
  (29509510, closing beat). **Unverified claims:** names a real company (Netflix)
  and the Qwikster episode — the ~800K subscriber loss, the stock drop, and the
  ~3-week reversal in 2011 are widely reported but verify the specifics before
  publishing.
- **`FastenalReel`** — "Embed, don't sell" (Fastenal puts industrial vending /
  dispensing systems inside its customers' factories; a third of sales flow
  through them, and once you run the customer's inventory you're impossible to
  switch out). ~47s, footage-forward and mixing video clips with stills, with
  the red "embed / don't sell" `impact` card near the end and a closing bolt-
  pile $8.2B stat beat rather than the red card. Media credits (Pexels, free
  license) — videos: a CNC/laser cutting machine (30409127), an industrial lathe
  (32063117), an industrial conveyor (32386524), and a tablet with data
  analytics (36328573). Photos: a worker organizing inventory (31112245), bolts
  in white bins (28867253), labeled parts bins (7018662), a pile of nuts and
  bolts (21050460), hex bolts (30496227), organized warehouse shelving
  (12234109), a macro of screws (28197097), a worker at a CNC machine
  (32845701), tangled server cables (12266914), long rows of industrial shelves
  (4224967), industrial shelving with molds (34718928), a worker in a red helmet
  at a machine (15947455), screws on a dark background (17372998), and a heap of
  rusty screws and bolts (15549169, closing beat). **Unverified claims:** names a
  real public company (Fastenal, NASDAQ: FAST) and cites a ~third of sales
  through vending, ~3,400 locations, ~$8.2B revenue, and a ~21% operating margin
  — verify against Fastenal's latest 10-K before publishing.
- **`FeeReel`** — "The 1% tax" (a fund fee almost nobody reads on their
  statement; over 30 years a 1% fee costs more than you originally invested,
  because it's taken every year including on the growth it prevents). ~41s,
  footage-forward and mixing video clips with stills, with the red "one percent
  / every year" `impact` card mid-reel and a closing black recap triad (one
  percent / thirty years / $187K) rather than the red card. Media credits
  (Pexels, free license) — videos: a person reviewing paperwork at a desk
  (6597520), an animated market chart (29344546), a coin placed on rising coin
  stacks (8661806), and financial charts on a screen (38670063). Photos: a
  magnifying glass over "Terms and Conditions" (7821573), a banded stack of
  $100 bills (11624813), piles of hundred-dollar bills (26668817), a plant
  sprouting from stacked coins (11391951), an income statement with a calculator
  (8962521), a calculator on a bar graph (209224), coins arranged incrementally
  (37416563), an alarm clock beside rising coin stacks (11743789), a calculator
  with charts (8068819), hands holding a phone with an investing app (7948056),
  a stock-trading app with candlesticks (28682345), a sprinter on a track
  (30159784), a runner crossing a finish line (18408979), and a piggy bank with
  a coin stack (4056856). **Unverified claims:** the figures are illustrative
  arithmetic — $100K invested 30 years at 7% growing to ~$761K vs ~$574K after a
  1% annual fee, a ~$187K gap, index funds around 0.1% and some active funds at
  ~1%+. They're standard compounding math on stated assumptions; the expense-
  ratio ranges are broadly typical but sanity-check before publishing.
- **`SearsReel`** — "The everything store" (Sears invented mail-order retail a
  century before Amazon, then couldn't build the online version of itself
  because it would have undercut the stores that made the profit). ~43s,
  footage-forward with the red "bankrupt / 2018" `impact` card near the end and
  a closing abandoned-store media beat rather than the red card. Mixes video
  clips with stills. Media credits (Pexels, free license) — videos: shopping
  online with a card at a laptop (6994676), a woman entering card details on a
  laptop (6607112), parcels moving on a sorting conveyor (5903898), and an
  automated warehouse packing line (32386619). Photos: a historic
  shopping-arcade facade (32122734), a vintage newspaper display (17660925), a
  stained-glass department-store dome (36963719), a grand glass-ceilinged store
  (15382149), an ornate department-store interior (11909534), a stack of old
  newspapers (10669434), a retro lamp with newspaper (15044919), black-and-
  white newsprint (13081133), a classic shopping center (18197630), a warehouse
  aisle of boxes (8377802), a shuttered market alley (4960603), hanging vintage
  newspapers (34392837), and an abandoned shopping cart in a derelict room
  (9539134, closing beat). **Unverified claims:** names a real company (Sears)
  and cites its ~century as a retail titan, its mail-order catalog heritage, and
  the 2018 bankruptcy — widely reported but verify the specifics before
  publishing.
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
