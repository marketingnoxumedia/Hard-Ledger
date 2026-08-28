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
- **`DrawReel`** — "The rate, not the balance" (a ~51s reel on the retirement
  withdrawal-rate rule: two people retire with the same million dollars — one never
  runs out, the other goes broke, on the same balance and the same markets. The only
  difference is how fast they spend. On a $1M portfolio, drawing 4% a year is
  $40,000 (a rate that has historically tended to last decades) while 8% is $80,000
  — double the income and a far higher risk of running dry. The rule of thumb:
  withdraw around 4% and a portfolio has a strong chance of lasting a long
  retirement; double the rate and you roughly double the odds of running out. The
  rate, not the balance, sets the outcome — two retirees with identical savings can
  land in completely different places purely on spending speed, and timing compounds
  it, since a bad market early hurts the fast spender most). Continuous voiceover,
  scene durations on its exact spoken-word timestamps; count-up stats for the dollar
  figures, a red "the rate, not the balance" `impact` card mid-tail, and a 4%-vs-8%
  ("lasts decades" vs "can run dry") comparison closer. Full-bleed footage on nearly
  every beat, mixing video b-roll with stills. Media credits (Pexels, free license)
  — videos: a retired couple on a beach (7237634), hands budgeting cash (6326861), a
  draining hourglass (1196530), and a market chart (38168755). Photos: a content
  senior (8871552), an empty wallet (31330436), a market chart (6770775), a fan of
  cash (6266445), a savings jar (585292), a cash pile (6266280), counted bills
  (5466818), a relaxed senior couple (7330926), spread cash (6801640), a retirement
  planner (11350082), a calculator and notes (6863253), an empty wallet (11348104),
  two diverging roads (1117267), a wallet and card (6863252), and a market chart
  (6781273). **Illustration / guideline, not advice:** the "~4% withdrawal rate" is
  the widely-cited rule of thumb (Bengen / the Trinity study); real outcomes depend
  on asset mix, sequence-of-returns risk, fees, inflation and how long retirement
  lasts, and the $1M / 4% / 8% / $40k / $80k figures are round illustrative numbers —
  "a guideline, not a guarantee." Confirm before publishing.
- **`KeepReel`** — "Income vs. wealth" (a ~60s reel busting the belief that a big
  salary means you're rich: income and wealth aren't the same thing. Income is
  visible — the car, the title, the address — so the paycheck becomes the
  scoreboard, but net worth tracks the savings rate far more than the salary.
  Studies of actual millionaires keep finding ordinary incomes paired with high
  savings and decades of investing; lifestyle expands to fill income, so a raise
  without a higher savings rate leaves net worth flat. Income is what flows in;
  net worth is what you keep — someone earning $300K who spends all of it builds
  nothing, while someone on $90K who keeps a fifth quietly compounds into real
  wealth. The decisive number was never the paycheck; it's the gap between earning
  and spending, compounded over time. Income sets the ceiling, the savings rate
  decides how much of it becomes wealth: a big salary is income, what you keep is
  wealth — they're not the same). Continuous voiceover, scene durations on its
  exact spoken-word timestamps; opens flat on the myth (no count-up), a red "the
  gap between earning and spending" `impact` card in the tail, and a close on a
  modest home ("they're not the same"). Full-bleed footage on nearly every beat,
  mixing video b-roll with stills, with two black beats for rhythm. Media credits
  (Pexels, free license) — videos: a convertible on the open road (8629198), a
  parked Lamborghini (14052063), rising financial charts on a screen (7580445),
  US coins in a savings jar (3752537), and a close-up of vintage coins on a
  turntable (7348172). Photos: a jar of saved cash (7927422), two diverging paths
  (7519009), a hand to the head over bills (7927426), a luxury watch (38264003), a
  stadium scoreboard (6862449), a rising stock chart (6289041), an ordinary older
  couple (33552524), a modest kitchen (12513371), a growing plant in coins
  (7318903), a flat market line (4965011), a full savings jar (9822690), an empty
  wallet (7927429), two houses side by side (12956000), a ceiling detail (7518782),
  a person weighing decisions (11624819), cash flowing in (35345626), and a modest
  home (10286038). **Illustration, not verified data:** the $300K / $90K / "keeps
  a fifth" figures are round, illustrative numbers used to make the point, not
  measured statistics; the broader claims (income ≠ wealth, net worth tracks the
  savings rate, ordinary incomes + high savings among many millionaires) echo the
  Federal Reserve's Survey of Consumer Finances and *The Millionaire Next Door* —
  confirm current figures and sources before publishing.
- **`BlackberryReel`** — "The strength trap" (a ~53s reel on BlackBerry: one company
  owned the business smartphone — every exec and government office carried its
  device — and when the iPhone arrived it called the touchscreen a fad serious
  professionals would never want. Its physical keyboard and secure email were the
  whole advantage and the whole trap: doubling down looked like discipline, not
  denial, because that was exactly why enterprises and governments had standardised
  on it and customers said they wanted it — right up until those buyers changed
  their minds. Touchscreens and apps became the entire market, the differentiator
  turned into ballast, and BlackBerry went from number one to a rounding error, a
  company that once defined the smartphone vanishing from it in a few years. The
  lesson: your strength can be the trap — the hardest feature to drop is the one
  that made you; number one to almost zero, it held the keyboard the whole way
  down). Continuous voiceover, scene durations on its exact spoken-word timestamps;
  a black "and the whole trap" beat, a red "your strength is the trap" `impact`
  card in the tail, and a close on an abandoned BlackBerry keyboard rather than the
  red card. Full-bleed footage on nearly every beat, mixing video b-roll with
  stills. Media credits (Pexels, free license) — videos: a suited exec texting
  (852250), a finger on a touchscreen (6279147), a professional reviewing a device
  (6930642), a crowd absorbed in phones (8088617), and scrolling a social feed
  (38410501). Photos: an exec on a phone by a window (6699308), a finger on a
  touchscreen (4278336), a poised businessman (34762353), a BlackBerry Passport
  keyboard (87736), a bright corporate office (31071841), a padlock on a dark latch
  (37095097), a boardroom of executives (6949494), hands on a slide-out keyboard
  phone (34387186), a finger on a glowing touchscreen (27788817), a business
  handshake (6918529), a rusty anchor and chains (6588323), a lone obsolete phone
  (4224099), a collection of retro phones (16388464), a pile of phones for recycling
  (19037726), a keyboard-equipped business PDA (28266696), an abandoned BlackBerry in
  ivy (1474232), a moody vintage phone (28266692), and a BlackBerry keyboard with a
  red petal (1474234). **Illustration / real company:** the BlackBerry story is
  rendered as written — the broad arc (dominance in late-2000s business phones,
  dismissing touch, collapse to negligible share) is widely reported, but "number
  one," "a rounding error," and the timeline are characterisations, not exact
  figures; a few vintage b-roll phones carry other brands' logos (HP, Sony, Nokia)
  as period relics of the "phone graveyard." Confirm specifics before publishing.
- **`SanitationReel`** — "The disgust moat" (a ~53s reel on portable sanitation as a
  moat business: there's a recurring-revenue business with almost no competition
  for a simple reason — nobody wants to run it, and the very thing that makes people
  avoid it is exactly what protects it. It's the companies that rent and service
  portable toilets for construction sites and events on recurring contracts. The
  moat is other people's reluctance: the work is unpleasant enough that competitors
  don't rush in, so pricing stays rational with no brand or technology edge; the
  servicing recurs — units are cleaned on a schedule — and the contracts renew
  whether anyone thinks about them or not. Construction and events guarantee steady
  demand, and the unpleasantness itself is the barrier that keeps rivals out. Low
  competition plus recurring servicing is a quietly strong model — a reputation for
  gross is a kind of protection, and the same thing that makes people avoid a
  business defends the ones already in it: nobody wants it, so nobody enters —
  that's the moat). Continuous voiceover, scene durations on its exact spoken-word
  timestamps; no count-up stat (margins vary too much by route to quote honestly),
  two black beats, a red "gross is protection" `impact` card mid-tail, and a close
  on the units themselves ("that's the moat") rather than the red card. Full-bleed
  footage on nearly every beat, mixing video b-roll with stills. Media credits
  (Pexels, free license) — videos: construction workers on a site (19832500), an
  aerial building site (35025685), and an aerial night event stage (2361938).
  Photos: a lone portable toilet (28759904), a worker holding a hard hat (34670931),
  a graffitied street porta-potty (12081508), a fenced empty site in B&W (26648941),
  a row of teal units (2949748), blue units at a construction site (25461701), a
  hand signing a contract (7054502), hands in cleaning gloves (28576636), a vacant
  lot (7519198), a worker reviewing documents (18504013), putting on cleaning gloves
  (28576645), marking a date on a calendar (11773871), a spiral wall calendar
  (29509502), a row of units under trees (34585129), two units in a field (9000864),
  a smiling worker in a safety vest (34670926), a red row of units (17527938), an
  empty lot with a distant crane (20074182), and a top-down grid of units
  (35437525). **Illustration, not verified data:** the reel deliberately quotes no
  figure — it states outright that operator margins vary too much by route to give
  an honest number; the claims (low competition, recurring servicing, disgust as a
  barrier to entry) are a qualitative characterisation of the industry, not measured
  data. Confirm before publishing.
- **`ActiveReel`** — "The average wins" (a ~57s myth-bust reel on active vs. index
  investing: there's a belief that professionals beat the market — that paying an
  expert to pick stocks beats the plain average — but the people paid to do it
  mostly lose to it. It sounds obvious that a paid professional with research and
  tools should beat a free, do-nothing index, but over 15 years about 90% of active
  large-cap funds fail to beat the S&P 500 — nine in ten, behind a simple index —
  and at 20 years the failure rate climbs to ~92%. Fees and trading costs drag the
  experts below the index, and last year's table-toppers rarely repeat, so the drag
  is structural, not bad luck: after fees, the average active dollar has to trail
  the market it collectively makes up. The index wins less by being clever than by
  being cheap and staying in — so if nine in ten pros can't beat it, matching it
  isn't settling, it's the option that usually wins: nine in ten professionals,
  beaten by the average). Continuous voiceover, scene durations on its exact
  spoken-word timestamps; opens flat on the myth, two count-up stat beats (90% with
  a filling bar / 92%), two black beats, a red "matching it isn't settling" `impact`
  card in the tail, and a close on a rising chart ("beaten by the average") rather
  than the red card. Full-bleed footage on nearly every beat, mixing video b-roll
  with stills. Media credits (Pexels, free license) — videos: a stock price board
  (7579943), a market ticker board (38431825), and a rising chart animation
  (5849646). Photos: business people in a strategy meeting (36733312), a trading
  screen (16594725), a professional with a laptop (36733315), multiple market
  monitors (38412413), a market chart screen (10653886), a diverse group of
  professionals (7108454), a calculator with cash (7111588), a falling candlestick
  chart (5831268), a gold trophy (7005047), concrete structural pillars (8254160),
  coins with a calculator (7054801), stacked coins (6927350), a rising graph screen
  (38375328), colleagues in a meeting (7793096), and a financial trading graph
  (38975904). **Illustration — real data, rendered as written:** the 90% (15-yr)
  and 92% (20-yr) active-underperformance figures track the widely-cited S&P Dow
  Jones Indices SPIVA scorecard, but the exact percentages shift by category, region
  and reporting period; "nine in ten" is a round restatement. Confirm the latest
  SPIVA data before publishing. (Note: overlaps thematically with `IndexReel`, which
  cites the same ~90% stat within a broader compounding-and-patience story; this
  reel is the focused active-vs-index myth-bust.)
- **`HeadstartReel`** — "The ten-year head start" (a ~52s reel on compounding and
  starting early: two people save the exact same $500 a month at the same assumed
  7% return for their whole careers, and one ends up with more than double the
  other — the only difference is a ten-year head start. Begin at 25 and stop at 65
  and about $240K of your own money grows, as an illustration, to roughly $1.3M;
  begin at 35 instead, pay in about $60K less, and you end near $610K. A ten-year
  delay roughly halves the result on barely less money in, because compounding pays
  growth on past growth, so the earliest dollars matter most — the first decade
  isn't a quarter of the outcome, it's closer to half. Time did more of the work
  than the money: the gap wasn't effort, it was years. Same $500 a month — $1.3M,
  or $610K). Continuous voiceover, scene durations on its exact spoken-word
  timestamps; two count-up stat beats ($1.3M for the 25-start, $610K for the
  35-start), two black beats, a red "it's closer to half" `impact` card mid-tail,
  and a close on the two outcomes over coins ("$1.3M or $610K") rather than the red
  card. Full-bleed footage on nearly every beat, mixing video b-roll with stills.
  Media credits (Pexels, free license) — videos: coins dropping into a savings jar
  (34263260), a collage of a coin added to a growing stack (5849643), and a macro
  of coins (5651783). Photos: a savings jar (9929281), coins spilling (259209), an
  antique clock (280254), a fan of $100 bills (14820466), stacked bills (5466791),
  a calendar (35013837), a young adult (8727454), an older adult (30372403), coins
  into a jar (8369778), stacked bills (11624755), coins into a jar (8369776), a
  seedling growing from coins (6775160), a vintage hourglass (3570733), a piggy
  bank (11933549), and fanned cash (10905773). **Illustration, not advice or a
  quote:** the $500/mo, 7% return, $240K/$60K contributions, and $1.3M/$610K
  outcomes are round illustrative figures to show how a ten-year head start
  compounds — actual results depend on the return, fees, taxes, sequence and
  contribution timing; 7% is an assumed nominal average, not a promise. Confirm the
  math and assumptions before publishing. (Note: the "$500/mo from 25 → $1.3M"
  figure also appears as a closing beat in `LifetimeReel`; this reel is the focused
  head-start comparison.)
- **`BrandReel`** — "Paying for the name" (a ~50s reel on the name-brand premium:
  two products sit on the same shelf, one noticeably cheaper, and in plenty of
  cases they were made in the same factory to the same standard — you're often
  paying for the name. Compared against the store's own-label version of the same
  item, the name brand costs more and the store label frequently costs noticeably
  less; what the extra usually buys isn't a better product, it's the brand and the
  marketing. In many categories the store version is made to similar standards,
  sometimes on the same production lines, so a chunk of the premium pays for the
  label and shelf position and advertising, not the contents. Sometimes the premium
  is justified — real differences in quality or taste exist — and sometimes it
  isn't; the only way to know is to compare the actual items: ingredients, specs,
  reviews. Where the specs match, the extra buys the name. Same shelf, two prices,
  sometimes the same maker). Continuous voiceover, scene durations on its exact
  spoken-word timestamps; no count-up stat, two black beats ("you're paying for
  the name", "sometimes it isn't"), a red "the specs match? you buy the name"
  `impact` card near the tail, and a close on footage ("sometimes the same maker")
  rather than the red card. Full-bleed footage on nearly every beat, mixing video
  b-roll with stills. Media credits (Pexels, free license) — videos: a blurred
  supermarket aisle (13752470), a generic production/packaging line (32386521),
  and a blurred store interior (853782). Photos: discounted goods (12039676), a
  factory interior (36823725), a production line (34221997), two plain cans
  (9462408), a price tag (11417942), sale tags (6114606), a blank container
  (4464884), a marketing/advertising scene (14853183), unbranded bottles
  (18631424), a plain can (8015704), a generic jar (8947553), a store shelf
  (2449665), a plain box (8015797), a market aisle (34066399), plated food
  (4451867), two plain cans (9462352), unbranded pouches (12024976), and a price
  tag (6114347). **Brand-safety:** every product and shelf shown is generic,
  unbranded, or blurred — no real brand logos or trade dress appear, deliberately,
  since the reel is *about* brands. **General characterization, not a claim about
  any specific product:** "made in the same factory / on the same production lines"
  and "the store label costs less" are broadly true across many categories but vary
  by item and retailer — verify per-category before attaching to any named brand or
  store, and don't imply a specific private-label/name-brand pair unless confirmed.
- **`NokiaReel`** — "When the game changes" (a ~56s reel on Nokia losing the
  smartphone: at its peak it sold close to half the world's phones, but leadership
  in handsets didn't transfer to the smartphone that replaced it. Clinging to its
  own software felt like strength, not stubbornness — Nokia led global handset
  share, owned world-class hardware and distribution, and had beaten every previous
  challenger by out-manufacturing them; adopting an outside operating system meant
  handing control to a partner and admitting its own software was finished, a
  concession a market leader almost never makes. The iPhone and Android defined the
  smartphone and moved the contest to software and apps, where Nokia's hardware lead
  counted for nothing; in 2014 it sold its phone business to Microsoft. When the
  basis of competition shifts, defending the old battlefield brilliantly is still
  how you lose — half the world's phones, then sold for parts). Continuous
  voiceover, scene durations on its exact spoken-word timestamps; one count-up stat
  (~50% of the world's phones), two black beats ("felt like strength / not
  stubbornness", "leaders almost never do that"), a red "a former king / sold off"
  `impact` card near the tail, and a close on footage (e-waste, "sold for parts")
  rather than the red card. Full-bleed footage on nearly every beat, mixing video
  b-roll with stills. Media credits (Pexels, free license) — videos: an electronics
  assembly/conveyor line (32386534), a hand using a modern smartphone (10374888),
  scrolling code on a screen (5473795), and a pile of electronic waste (14593616).
  Photos: a single dark feature phone (28266695), a candybar keypad phone (896895),
  a world globe (269724), a vintage rotary phone (13620775), a hand gripping a flip
  phone (8680077), a stack of old phones (5744290), a phone circuit board
  (5554949), a blank phone mockup (6373164), an office handshake (8112186), a
  contract being signed (955392), a decayed feature phone in leaves (27910251), a
  blank modern smartphone (8217435), programming code (2004161), a cracked phone
  screen (288479), a corporate handshake (4963359), a chess game (13814951), and a
  red market-downtrend chart (38933572). **Brand-safety:** the reel names Nokia,
  iPhone, Android and Microsoft in voiceover as the subject/context, but the footage
  is deliberately generic — devices shown are vintage keypad phones, unbranded
  smartphones, blank mockups, circuit boards, or (for the decay beats) a worn
  discarded phone; competitor-logo shots were rejected during sourcing. Confirm no
  unintended readable brand marks before publishing. **Illustration / general
  characterization, not verified financials:** "close to half the world's phones" is
  a rounded characterization of Nokia's peak share (verify the exact figure and
  scope — mobile handsets vs smartphones differ), and the 2014 sale to Microsoft is
  a real event stated without a price; confirm the specific numbers and framing
  before publishing. (Note: this is thematically close to `BlackberryReel` — "The
  strength trap," also a dominant phone maker losing to iPhone/Android — so schedule
  the two well apart; each uses entirely separate footage.)
- **`PalletReel`** — "The pallet pool" (a ~71s reel on the CHEP/Brambles blue-pallet
  pooling moat: look under almost anything you buy and you'll find the same blue
  platform. Brambles, through CHEP, owns a pool of ~348 million blue pallets and
  never sells them — it issues, collects, repairs and reissues the same platform for
  years, so one pallet earns many times over. The pooling is the moat: a rival can
  build a pallet but can't cheaply replicate the network of 750+ collection/service
  centres that makes the pool work. That circular pool of wooden platforms brought
  in ~$6.67B at ~20% margin, roughly $1.37B in profit. Own the platform everything
  sits on, rent it forever, and a commodity becomes infrastructure — 348 million
  pallets, $6.67B, rented, never sold). Continuous voiceover, scene durations on its
  exact spoken-word timestamps; four count-up stats (348M pallets, 750+ centres,
  $6.67B revenue, $1.37B profit), two black beats ("never sells a single one",
  "pooling beats selling"), a red "renting beats selling" `impact` card mid-reel, and
  a close on footage (a blue-pallet hero, "rented, never sold") rather than the red
  card. Full-bleed footage on nearly every beat, mixing video b-roll with stills.
  Media credits (Pexels, free license) — videos: a wide warehouse aisle (37208833), a
  forklift moving loads (37651089), an industrial conveyor line (34394492), and a
  forklift loading pallets outdoors (32838797). Photos: stacked blue pallets
  (10096887), stacked wooden pallets in a yard (9565565), loading a truck (27490857),
  an aerial pallet yard (9552902), a neat stack of pallets (9498584), a man repairing
  a pallet (12134140), an aerial logistics centre with trucks (2804929), a single
  wooden pallet (11001887), loading-dock bays with trailers (27099093), stacked port
  containers (2091159), warehouse workers (4483862), an aerial logistics yard
  (16726161), semi-trucks on a highway (30344500), US banknotes (16809843), crates on
  a pallet base (11911889), a tall warehouse racking aisle (5860937), a port with
  gantry cranes (20581299), and a blue-pallet hero shot (10096886). **Brand-safety:**
  the reel names Brambles/CHEP in voiceover as the subject, but all footage is
  generic — plain blue/wooden pallets, warehouses, forklifts, trucks, containers and
  cash, with no CHEP or retailer logos/signage (a "global brands" container shot was
  rejected during sourcing). The blue pallets carry only normal stamped handling
  codes, not brand marks; confirm no readable branding before publishing.
  **Illustration / verify the financials:** ~348M pallets, 750+ centres, $6.67B
  revenue, ~20% margin and ~$1.37B profit are figures for a recent year stated as
  round characterizations — confirm the exact numbers, currency (Brambles reports in
  US$) and reporting period against Brambles' filings before publishing. (Note: the
  "own-the-infrastructure / rent-it-forever moat" thesis overlaps thematically with
  `WasteReel` — "own the landfill"; the two use entirely separate footage, but
  schedule them apart.)
- **`DepreciationReel`** — "The depreciation curve" (a ~58s reel on the hidden cost
  of buying new: a new car loses about a fifth of its value the instant it becomes
  yours — faster than fuel, insurance or repairs, and almost nobody counts it. A
  $40K car is worth about $32K within a year, so driving it off the lot quietly
  spends ~$8K in year-one depreciation. The drop is steepest first — down ~20% after
  one year, ~60% after five, worth less than half its sticker before the warranty
  ends — most of the value leaving in the years you can't see it going. Which is why
  a 2-3 year old car is a different deal: it has already taken the worst of the fall
  while keeping most of its life; the first owner paid for the new smell. New isn't a
  cost, it's a luxury — the depreciation curve is the real price tag). Continuous
  voiceover, scene durations on its exact spoken-word timestamps; three count-up
  stats ($8K year-one drop, then 20% and 60% "down" with animated bars for the
  curve), two black beats ("almost nobody counts it", "the curve is the real price
  tag"), a red "new isn't a cost / it's a luxury" `impact` card near the tail, and a
  close on footage (cash counting, "$8K, gone in a year") rather than the red card.
  Full-bleed footage on nearly every beat, mixing video b-roll with stills. Media
  credits (Pexels, free license) — videos: an aerial car lot (34448142), a car
  driving off on a road (5558025), and hands counting cash (6197173). Photos: a car-
  key handover (97079), a fuel nozzle (21811094), a shiny new car (4257581), a
  showroom (14615222), a "for sale" placard at a car (7414901), a calendar (273153),
  cash banknotes (15633962), a red downtrend chart (38963049), a pre-owned car lot at
  night (12700837), signing paperwork (8730998), a dashboard/odometer (241188), an
  older convertible (16636019), a descending mountain road (8274863), a car engine
  bay (11455717), a clean car interior (15223424), a sale price tag (7564282), and a
  row of new cars in a lot with a city skyline (29566907). **Brand-safety:** the reel
  is about cars generally, not any one make — footage varies makes/colors and avoids
  badge-dominated shots; a dealership exterior with a giant illuminated brand sign
  was caught in preview and swapped for a generic mixed-make car-lot shot, so no
  single brand is associated with "losing value". Confirm no readable brand badges
  before publishing. **Illustration, not verified data:** the $40K→$32K, ~20%/~60%
  depreciation curve, and ~$8K year-one figure are round, illustrative numbers to
  show the shape of car depreciation — real depreciation varies widely by make,
  model, mileage, condition and market. Present as a general illustration, not a
  guarantee for any specific vehicle.
- **`GoldReel`** — "Store of value" (a ~63s reel busting the idea that gold is the
  best long-run store of wealth: gold gets called the ultimate store of value, but
  over a century stocks didn't just beat it, they buried it. A dollar in US stocks in
  1926 grew, after inflation, to roughly $1,081 by 2025; the same dollar in gold
  reached only about $5. Gold roughly held its purchasing power while stocks
  multiplied it hundreds of times, because the businesses behind stocks reinvest and
  grow, whereas gold pays no dividend and earns only what the next buyer will pay.
  The mix-up is between safe and growing: gold is a hedge that preserves value,
  stocks are a stake in businesses that expand — both real jobs, but only one
  compounds; over decades, something that barely grows quietly falls behind. A dollar
  in stocks: about a thousand; in gold: about five). Continuous voiceover, scene
  durations on its exact spoken-word timestamps; two count-up stats ($1,081 for
  stocks vs $5 for gold), two black beats ("they buried it", "but — measure it"), a
  red "both real jobs / only one compounds" `impact` card near the tail, and a close
  on footage (gold coins, "in gold: about five") rather than the red card. Full-bleed
  footage on nearly every beat, mixing video b-roll with stills. Media credits
  (Pexels, free license) — videos: a gold-bars animation (8733007), a moving market
  chart (38557069), and gold coins falling in slow motion (32017747). Photos: gold
  bars in a vault (32570273), a pile of gold coins (19704271), antique coins
  (318820), a typewriter reading "Crisis" (4057659), a printed stock-price report
  (102152), a $100 banknote (14820446), a single gold bar (35065436), a stack of gold
  bars (33539235), a plant growing from coins (5550910), gold coins on black
  (8442324), an industrial facility (36915547), a brick-smokestack factory (28572048),
  a balance scale (8666805), stacked gold bars (33539242), a glass-skyscraper skyline
  (13012283), an hourglass (11069123), a snail (5341217), a red-vs-green trend chart
  (27288569), and the New York Stock Exchange facade (36050277). **Brand-safety:**
  the reel names no company — footage is generic gold/finance imagery. Chart/ticker
  shots were chosen without a dominant readable company name or brokerage logo; the
  NYSE facade shows the exchange's own lettering (a public landmark standing in for
  "stocks," not a commercial brand). An ambiguous green-tinted-coin closing clip was
  caught in preview and swapped for a clean gold-coins shot. Confirm no stray tickers
  read as a single company before publishing. **Illustration / verify the figures:**
  the ~$1,081-vs-$5 (a 1926 dollar to 2025, real) contrast reflects widely-cited
  long-run return studies but the exact endpoints depend on the index, dates,
  inflation series and assumptions — verify the specific numbers and cite the source
  before publishing; gold's real return in particular varies a lot by start/end date.
- **`BordersReel`** — "The outsourced channel" (a ~62s reel on how Borders handed
  its future to Amazon: a book-retail giant looked at the internet, judged building
  an online store too expensive, and in 2001 handed its entire web business to a
  small rival — Amazon. Outsourcing looked like prudence, not surrender: e-commerce
  was lossmaking, Amazon's platform already worked, and the deal gave Borders an
  online presence with no capital outlay. What it quietly handed over was the
  customer relationship and the purchase data — the two assets that would decide the
  next decade — so Borders never built its own online muscle, customers or data, and
  when shopping moved online for good it had nothing of its own to stand on. It filed
  for bankruptcy ten years later, in 2011. Don't outsource the future: give a rival
  the channel about to matter most and you hand over your customers and everything
  you'd have learned). Continuous voiceover, scene durations on its exact spoken-word
  timestamps; no count-up stat (the punch is the 2001 → 2011 year contrast in big
  type), three black beats ("that rival was Amazon", "nothing of its own to stand
  on", "ten years later"), a red "don't outsource the future" `impact` card near the
  tail, and a close on footage (packing up, "outsourced 2001 / bankrupt 2011") rather
  than the red card. Full-bleed footage on nearly every beat, mixing video b-roll
  with stills. Media credits (Pexels, free license) — videos: a bookstore corridor
  (19231459), online shopping on a laptop (8937985), and packing books into a box
  (4520154). Photos: an e-commerce cart on a laptop (6214472), a business handshake
  (33175650), a wall of books (7167083), a bookstore interior (1850021), a vintage
  cash register (27038010), a boardroom meeting (6950031), a market-crash chart
  (5561922), a fulfillment warehouse (4277794), an e-commerce site on a laptop
  (17485352), counting cash (6328893), a shopper with a bag (4127641), a data-center
  server room (5480781), a chessboard (17768376), partly-empty store shelves
  (4437145), a generic "closed" sign (5961722), a symbolic handover of keys
  (8470846), a shuttered closed storefront (10971626), a lit storefront window
  (24554242), and an analytics dashboard (7109243). **Brand-safety:** the reel names
  Borders and Amazon in voiceover only — all footage is generic, with no Borders or
  Amazon logos/signage. Two auto-sourced shots were caught in preview and swapped: a
  box with a prominent USPS/Express-Mail logo (and a Patagonia jacket) on the "2001"
  beat, and a storefront plastered with lottery/beer/tobacco ads on the "2011" beat —
  replaced with a plain key-handover and a plain shuttered storefront. Confirm no
  stray brand marks before publishing. **Real companies/dates — verify:** the Borders
  outsourcing-to-Amazon deal (2001) and Borders' bankruptcy (2011) are real events
  rendered as written; double-check the specifics and framing before publishing.
  (Note: shares the "incumbent killed by the digital shift" theme with
  `BlockbusterReel`, `KodakReel` and `SearsReel` — schedule them apart; each uses
  entirely separate footage.)
- **`RevenueReel`** — "Not all revenue is good" (a ~58s reel on why a company would
  deliberately shed paying customers and make more money once they leave: every
  customer carries a cost to serve — support, returns, discounts, rework — and for
  some accounts that cost quietly exceeds everything they pay. But revenue is visible
  and every account feels like a win, so dropping a customer looks like self-harm,
  while cost to serve is scattered thin enough that it never lands on a line anyone is
  judged by. Measure profit per customer instead of revenue and a slice of accounts
  are losing money; shed them — raise prices, drop the money-losers — and revenue
  falls while margin rises. The accounts that left were the drag; the ones that stayed
  paid the bills. Not all revenue is good revenue; busy and profitable aren't the same
  thing). Continuous voiceover, scene durations on its exact spoken-word timestamps;
  no count-up stat (it's a principle, not a figure), two black beats ("the instinct
  runs the other way", "which customers walked out?"), a red "not all revenue is good
  revenue" `impact` card near the tail, and a close on footage (a customer walking
  away) rather than the red card. Full-bleed footage on nearly every beat, mixing
  video b-roll with stills. Media credits (Pexels, free license) — videos: a busy
  checkout (8421362), a moving financial chart (38395147), and a customer walking
  through a store (5700362). Photos: a customer leaving through shop doors (16073011),
  paying by card at a checkout (8475161), a call-center agent (8681899), an invoice on
  a clipboard (7651555), a register printing a receipt (19224085), scissors cutting
  paper (3951825), scattered desk papers (11952176), a stack of cardboard boxes
  (7203701), a spreadsheet on a laptop (34639577), a calculator with documents
  (33175673), a phone showing red market losses (28682350), an exit sign (878832), a
  retail price tag (11702921), a downward financial graph (8369831), a ship's anchor
  (17485780), a stack of dollar bills (4430244), a hectic office (8468112), and a
  rising profit chart with a thumbs-up (7172858). **Brand-safety:** all footage is
  generic — no readable retailer/app logos. **Sensitivity note:** the auto-sourced
  closing clip read as a homeless person pushing a cart of belongings through an empty
  garage — pairing that with "never paying their way" was tone-deaf, so it was caught
  in preview and swapped for an ordinary customer walking through a store. Confirm the
  closing footage reads as a regular customer before publishing. **Illustration, not a
  specific company:** the "revenue falls / margin rises" story is a general business
  principle with no named company or figures — present it as a concept, not a claim
  about anyone in particular. (Note: this is the SAME idea as `CullReel` — "Busy isn't
  profitable," also about firing unprofitable customers — this is a differently-angled
  second take with entirely separate footage; publish one or the other, or schedule
  them well apart, so the feed doesn't repeat the concept.)
- **`OutputReel`** — "Hours aren't output" (a ~53s reel on the hours-worked-vs-
  productivity myth: if more hours always meant more output, why do some countries
  work far fewer hours and still produce more per hour? Effort is what you can
  control and busyness reads as productivity, and hours are simple to count while
  value isn't — but across countries longer average hours don't track higher output;
  several nations work fewer hours per worker yet produce more per hour than places
  that grind longer. Past a point extra hours bring fatigue and diminishing returns:
  a rested worker out-produces an exhausted one on the same task in less time,
  because output is capped by focus and energy, not the clock. Treating hours as the
  goal confuses effort with results — the lever was never the length of the day, it's
  the value inside each hour). Continuous voiceover, scene durations on its exact
  spoken-word timestamps; no count-up stat (it's a concept), two black beats ("value
  isn't", "same task / less time"), a red "the lever was never the length of the day"
  `impact` card near the tail, and a close on footage (working late, "what was it all
  buying?") rather than the red card. Full-bleed footage on nearly every beat, mixing
  video b-roll with stills. Media credits (Pexels, free license) — videos: a ticking
  clock (5571638), an artisan hand-carving a sculpture (34133304), and a man working
  late at a desk (8369273). Photos: a world map (6564830), a thoughtful person
  (11464447), a bricklayer at hard labor (30571028), a cluttered busy desk (6539020),
  a retro punch clock with time cards (23549137), a flat line graph (6203473), a calm
  worker at a tidy desk (7654428), an exhausted worker on a stack of files (6538615),
  a rising-then-flattening curve (5849595), a rested person in morning light (321599),
  one lit bulb among dark ones (12198521), a wall clock (20050353), a hedge maze
  (12040985), an hourglass (11162131), a faceted diamond (4997548), and an office
  building lit at night (14711252). **Brand-safety:** all footage is generic — no
  readable company logos; the establishing clock carries a decorative "Old Town
  Clocks / London" maker's label (a stylistic clock face, not a commercial brand).
  Confirm no stray marks before publishing. **Illustration / general
  characterization:** the "fewer hours, more output per hour across countries" claim
  reflects widely-cited cross-country productivity comparisons (e.g. OECD output-per-
  hour data) but is stated generally with no specific numbers or nations — verify and,
  if you want, cite a source before publishing. (Note: this is the SAME topic as
  `HoursReel` — also "The value inside the hour," the hours-vs-productivity myth —
  built as a differently-worded second take with a different HUD and entirely
  separate footage; publish one or the other, or schedule them well apart.)
- **`GrindReel`** — "The grind myth" (a ~52s reel — a third take on the hours-worked-
  vs-productivity idea, after `HoursReel` and `OutputReel`; same body, a reworded
  "grinding longest" hook, and entirely fresh footage. Why do some countries work far
  fewer hours yet produce more per hour than the ones grinding longest? Effort is what
  you can control and busyness reads as productivity, and hours are simple to count
  while value isn't — but across countries longer average hours don't track higher
  output. Past a point extra hours bring fatigue and diminishing returns: a rested
  worker out-produces an exhausted one on the same task in less time, because output
  is capped by focus and energy, not the clock. The lever was never the length of the
  day — it's the value inside each hour). Continuous voiceover (loudness-evened so it
  holds a steady level), scene durations on its exact spoken-word timestamps; no
  count-up stat, three black beats, a red "the lever was never the length of the day"
  `impact` card near the tail, and a close on footage (office towers at dusk, "what
  was it all buying?") rather than the red card. Full-bleed footage on nearly every
  beat, mixing video b-roll with stills. Media credits (Pexels, free license) —
  videos: a clean macro clock face (7033786), a maker at a wood lathe (6790004), and
  lit office towers at dusk (38735892). Photos: a vintage globe (30792661), a woman
  working late (9062790), a thoughtful man (6144062), a blacksmith forging (37226044),
  a cluttered desk (7794043), vintage time cards in a rack (38814009), a plain line
  chart (7172774), a calm worker at a tidy desk (7034739), a burnt-out worker
  (5712122), a rising-then-flattening curve (9034758), a relaxed person with coffee
  (39093467), a single lit bulb (355978), an alarm clock (4185554), a labyrinth
  (3715428), an hourglass (35215486), a cut diamond (5276885), and an office lit at
  night (15389577). **Brand-safety:** all footage is generic — no company logos; an
  auto-sourced establishing clock stamped "Made in China" / "Polaris" was caught in
  preview (pairing that with "some countries work fewer hours" reads as an unintended
  dig at one country) and swapped for a plain, text-free clock face. Confirm no stray
  marks before publishing. **Illustration / general characterization:** the "fewer
  hours, more output per hour across countries" claim reflects widely-cited cross-
  country productivity comparisons (e.g. OECD output-per-hour data) but is stated
  generally with no numbers or named nations — verify/cite before publishing. (Note:
  this is the SAME topic as `HoursReel` and `OutputReel`; the three are near-identical
  in message — publish only one, or schedule them far apart.)
- **`PerHourReel`** — "The productivity gap" (a ~55s reel — a data-driven fourth take
  on hours-worked vs output-per-hour, after `HoursReel` / `OutputReel` / `GrindReel`;
  this one leads with concrete numbers and entirely fresh footage. Germany's average
  worker puts in ~1,343 hours a year, Mexico's ~2,207 — a gap of about 864 hours,
  roughly a hundred extra eight-hour days — yet output per hour runs the other way.
  Line up ~40 developed economies and the pattern holds: the more a country works on
  average, the less it tends to make per hour, with every extra 100 annual hours lining
  up with roughly $10 less output per hour. Hours measure effort, not output; past a
  point more time in the chair adds fatigue, not value — the lever was never the length
  of the day, it's what gets made inside each hour). Continuous voiceover (cloned voice,
  +6% pace, loudness-evened), scene durations on its exact spoken-word timestamps; five
  count-up stats (1,343 / 2,207 / 864 / 40 / $10), one black "Value isn't" beat, a red
  "the lever was never the length of the day" `impact` card near the tail, and a close
  on footage (a lone worker leaving an empty office, "what were those extra days
  buying?") rather than the red card. Full-bleed footage on nearly every beat, mixing
  video b-roll with stills. Media credits (Pexels, free license) — videos: an open-plan
  office at work (5683815), automated factory robotics (32386590), an anonymous blurred
  commuter crowd (852107), an animated finance chart display (38736274), a person on a
  treadmill (4945121), a maker at focused workshop work (2480790), and a lone worker
  leaving an empty office (5483205). Photos: an analog wall clock (9367466), a man
  working late (17511838), hands on a keyboard (6684793), a cluttered desk (6913349), a
  paper calendar (7059605), a planner being filled in (7428213), a data/analytics
  screen (6120209), an abstract bar chart (38933571), a downward-trending graph
  (7172863), a pile of generic coins (144233), an exhausted businessman (8428065), and
  an overwhelmed worker (7984780). **Brand-safety:** imagery is kept deliberately
  neutral — no flags, landmarks, currency, or country-identifying footage; the two
  countries are named only in the voiceover and on the stat labels. Generic-coins,
  anonymous-crowd, and abstract-chart shots were chosen specifically to avoid
  country-specific currency, transit signage, or branded screens; a stock actor in the
  closing clip wears a prop lanyard with a fictional name (no real company). **FLAG —
  named figures are illustrative:** the 1,343 vs 2,207 hour figures are per-worker
  averages of the kind the OECD publishes and the "~$10 less output per hour per extra
  100 hours" correlation is a stylized characterization — verify the exact OECD numbers
  before publishing. (Note: this is the SAME core topic as `HoursReel` / `OutputReel` /
  `GrindReel`; publish only one of the four, or schedule them far apart.)
- **`HardestReel`** — "The hours myth" (a ~59s reel — a curiosity-hook variant of
  `PerHourReel`: same body and numbers, but it opens on a question ("why does the
  country that works the most hours produce the LEAST per hour?") instead of leading
  with the figure, and uses entirely fresh footage. Germany works ~1,343 hours a year,
  Mexico ~2,207, and Germany still produces more per hour — a gap of about 864 hours,
  roughly a hundred extra eight-hour days. Across ~40 developed economies the pattern
  holds: the more a country works on average, the less it tends to make per hour, with
  every extra 100 annual hours lining up with roughly $10 less output per hour. Hours
  measure effort, not output; past a point more time in the chair adds fatigue, not
  value — the lever was never the length of the day, it's what gets made inside each
  hour). Continuous voiceover (cloned voice, +6% pace, loudness-normalized), scene
  durations on its exact spoken-word timestamps; five count-up stats (1,343 / 2,207 /
  864 / 40 / $10 — the fast "Mexico 2,207" line holds through "Germany produces more"
  so both opening numbers stay count-ups). After the opening question ("...produce the
  least per hour?") there's a deliberate 3-second held pause — the question stays on
  screen while 3s of silence let it land, with a heartbeat SFX under it (music ducked to
  ~40%) building anticipation before the numbers reveal. Then one black "Value isn't"
  beat, a red "the
  lever was never the length of the day" `impact` card near the tail, and a close on
  footage (a quiet empty office, "what were those extra days buying?") rather than the
  red card. Full-bleed footage on nearly every beat, mixing video b-roll with stills.
  Media credits (Pexels, free license) — videos: a woman striding through a glass-walled
  office (7652208), a blurred anonymous commuter crowd (853946), a candlestick chart on
  screen (30289540), a woman on a treadmill (6455384), a jeweler's precise handwork
  (6262797), and a quiet empty office (8347240). Photos: a man checking a wristwatch
  (5951320), a plain twin-bell alarm clock (7558438), a man working late at a lamplit
  desk (8369251), hands on a keyboard (6143822), a laptop buried in crumpled paper with
  a "focus time" note (8386571), 2021 calendar pages (5417674), a hand writing in a
  day-planner (4968703), rows of data/printouts (6779570), business charts (7605981), a
  downward bar chart (5561919), generic gold coins (34579924), an exhausted worker
  (7255321), and a stressed man gripping his hair (7792752). **Brand-safety:** imagery
  is kept deliberately neutral — no flags, landmarks, currency, or country-identifying
  footage; the two countries are named only in the voiceover and on the stat labels.
  The media subagent rejected and swapped a long list of candidates carrying brand/
  nation/currency cues (Euro/złoty/lire/US coins, several branded or city-labelled
  clocks, Milano/Harajuku/Turkish transit signage, Binance/Belarus trading screens,
  branded treadmills, a Siemens box). One clip auto-sourced with a prominent Cyrillic
  keyboard on the "looking busy" beat (5185074) was caught in preview and swapped for a
  keyboard-free overwhelm shot (8386571) so no regional cue reads on a country-
  comparison reel. **FLAG — named figures are illustrative:** the 1,343 vs 2,207 hour
  figures are per-worker averages of the kind the OECD publishes and the "~$10 less
  output per hour per extra 100 hours" correlation is a stylized characterization —
  verify the exact OECD numbers before publishing. (Note: this is a NEAR-DUPLICATE of
  `PerHourReel` — same body, curiosity hook — and the same core topic as `HoursReel` /
  `OutputReel` / `GrindReel`; publish only one, or space them well apart.)
- **`CapitalReel`** — "What's behind the hour" (a punchy ~40s reel — the WHY behind the
  productivity gap, and the first take that explains the mechanism rather than just
  showing the correlation. Germany works ~1,300 hours a year, Mexico >2,200 — but that
  doesn't mean Germans work harder or others work worse. Productivity isn't mainly
  effort; it's what sits behind each worker: machinery, technology, capital,
  infrastructure, logistics, management. One worker has a shovel, one has an excavator —
  who moves more dirt? Economies get rich not from more hours but from making every hour
  worth more, closing on "why isn't each hour worth more?"). Continuous voiceover (cloned
  voice, +6% pace, normalized), scene durations on its exact spoken-word timestamps; two
  count-up stats (1,300 / 2,200+), two staggered list beats (machinery/technology/capital,
  infrastructure/logistics/management), the shovel-vs-excavator example as the memorable
  core, a short ~1.5s pause after the opening question (the question holds on screen while
  45 frames of silence sit before the stats reveal), three black beats (the myth stated
  "in the dark" before the reveal, plus a
  pre-close bridge), one red "they get rich from more per hour" `impact` card mid-reel,
  and a close on footage (a dusk city skyline) rather than the red card. Full-bleed
  footage on nearly every beat, mixing video b-roll with stills. Media credits (Pexels,
  free license) — videos: an automated line with a yellow robotic arm (32386532), a
  tight excavator-bucket dig (16002856), and a dusk city skyline (3642642). Photos: a man
  checking a wristwatch (13801775), a wall of antique clocks (38699699), a woman working
  late (30215681), workers hauling planks (28913835), a hand on a machine pendant control
  (4487675), an industrial welding robot arm (11951215), port gantry cranes at dusk
  (4940272), a boot pressing a spade into soil (8993775), an excavator on a pile of moved
  earth (27986719), a modern city skyline (12593065), and a contemplative man (8498405).
  **Brand-safety:** this reel features heavy machinery, which usually carries prominent
  brand logos — the sourcing pass rejected a large number of otherwise-good candidates
  for legible branding (excavators/machines stamped CAT, Komatsu, Hitachi, Doosan, Case,
  Deere, Sany, XCMG, Kobelco and others; robot lines marked Yaskawa/Fanuc/Festo; container
  and port shots with Maersk, Evergreen, MSC, COSCO, CMA CGM, Eurogate; a 3M Peltor
  operator shot; a Sydney Tower landmark; and a ship flying a national flag). The final 14
  have no legible logos, no flags, and no country-identifying landmarks; countries are
  named only in the VO and stat labels. **FLAG — figures are illustrative:** the ~1,300 /
  ~2,200 hour figures are per-worker averages of the kind the OECD publishes — verify
  before publishing. (Note: this is the 6th reel on the hours-vs-productivity theme, but
  the only one that explains the *mechanism* — capital/tooling per worker — so it's a
  genuinely distinct angle from `HoursReel` / `OutputReel` / `GrindReel` / `PerHourReel` /
  `HardestReel` rather than a duplicate; still, mind how many of these publish close
  together.)
- **`StillReel`** — "Just sit still" (a ~57s reel on index investing vs the pros, built
  off a punchy hook. Why do 9 in 10 professional investors lose to a strategy that takes
  zero skill? The broad US market has returned ~10%/yr for a century (~7% real); at ~10%
  money doubles roughly every 7 years — $10K → $20K → $40K with nothing added — yet over
  15 years ~90% of pro stock funds fail to beat that simple index; the experts mostly
  lose to the average. You don't beat the market by being clever, you capture it by
  staying in — the horizon does the heavy lifting and the real enemy is impatience, not
  stock-picking; the hard part was sitting still, closing on "so why think you're
  smarter?"). Continuous voiceover (cloned voice, +6% pace, normalized) with a short
  ~1.5s pause spliced in after the hook (the hook holds on screen while the silence sits
  before the reveal — a house convention), scene durations on its exact spoken-word
  timestamps; three count-up stats (10% / 7% / 90%), the
  $10K→$20K→$40K doubling, six black beats (the punch-lines land in the dark), one red
  "the real enemy is impatience" `impact` card mid-reel, and a close on footage (a
  golden-hour skyline) rather than the red card. Media credits (Pexels, free license) —
  videos: an abstract green candlestick chart with streaming prices (34645321), a generic
  multi-panel data dashboard (34128979), a calm open road to distant mountains (29342443),
  and a dusk city skyline (34398523). Photos: a dartboard with scattered darts (32623458),
  a candlestick chart on a dark screen (38947200), a trader's hand at monitors (5831253),
  scattered banknotes (15633961), coins spilling from a jar (259165), stacked cash bundles
  (14655998), hands holding an empty wallet (10994723), a finance meeting (5668495), an
  analyst at a data board (8353793), a long desert road at dawn (2990770), a rising area
  chart (7947635), a relaxed man with coffee (7155739), business professionals (7434018),
  and a level road to the horizon (31340924). **Brand-safety:** finance footage is full
  of logos/tickers, so the sourcing pass rejected many candidates for legible branding
  (full ticker heat-maps with NVDA/AAPL/Micron, TradingView/Binance-style UIs, HP and
  Apple logos on monitors, crypto coins, a Panasonic projector, a NASA poster, route
  signage). The final set has no exchange/broker/platform brands, no real tickers (the
  analyst board shows only fictional ones — BLW, AZX, OTAO…), no news chyrons, no flags,
  and no country-identifying landmarks. **FLAG — figures are illustrative and cite real
  data:** ~10% nominal / ~7% real long-run US equity return, rule-of-72 doubling, and the
  "~90% of active funds trail the index over 15 years" claim (SPIVA-style) are widely
  cited but approximate — verify against S&P/SPIVA before publishing, and treat this as
  general market commentary, not investment advice. (Note: this is the 3rd reel on this
  exact topic — `IndexReel` "The return was always there" is a near-identical earlier
  cut and `ActiveReel` "The average wins" is the same myth-bust — so publish only one of
  the three, or space them far apart.)
- **`ShedReel`** — "Boring is the moat" (a ~65s reel on self-storage as a boring-but-
  highly-profitable business, built off a punchy hook. A company with almost no staff
  pulls in ~$4.8B a year and you drive past it every week without a glance: self-storage.
  Metal units on cheap land, run by the customers themselves; the company owns the boxes
  and collects the rent. The moat is what it doesn't need — no inventory, almost no staff,
  cheap upkeep — and once your things are inside, moving out costs a weekend and a truck,
  so the small annual rent bumps just get paid. Recessions don't empty the units (moves,
  divorces, downsizing are what a downturn produces), so rent rises automatically and
  customers rarely leave — which is how metal boxes keep ~79 cents of every dollar at the
  facility level and land ~37% net margin. Boring is the moat, closing on "what's the most
  profitable thing you'll drive past today? A shed you forgot you were paying for."
  Continuous voiceover (cloned voice, +6% pace, normalized) with a short ~1.5s pause after
  the hook (the hook holds while silence sits before the "It's self-storage" reveal — house
  convention); scene durations on its exact spoken-word timestamps; three count-up stats
  ($4.8B / 79% / 37%), a cha-ching on the revenue reveal, seven black beats (punch-lines
  and lists in the dark), one red "Boring is the moat" `impact` card near the tail, and a
  question close that resolves on footage (a shed at dusk) rather than the red card. Media
  credits (Pexels, free license) — videos: a roadside pass of a long metal storage building
  (13307522), a commercial-strip driving POV (3782354), two men loading boxes into an
  unbranded van (9507657), and a suburban intersection drive (4707180). Photos: a metal
  storage aisle (5759037), colourful numbered unit doors (32038719), a metal roll-up shutter
  (12534135), a person accessing a unit (14580631), a padlocked door (33550139), stacked
  moving boxes (6347891), a crashing red chart (38963051), a couple carrying boxes (4246086),
  a pile of worn boxes (36504458), hands counting cash (6328944), a calculator keypad
  (7054402), a bland building + empty lot (933588), an entry keypad (6682880), and a lone
  shed at golden hour (2904295). **Brand-safety:** self-storage footage is full of operator
  signage and truck brands, so the sourcing pass rejected many candidates for legible
  branding — a "SHURGARD SELF-STORAGE" box, a Chevrolet steering-wheel logo, an Evergreen
  shipping container, an Ocado/Howdens aerial, a visible national flag, and an Italian
  "VIETATO"/"TIENDA" sign were all caught and swapped. The final set has no storage-brand
  logos, no truck brands, no flags, no country-identifying signage. **FLAG — figures are
  illustrative:** the ~$4.8B revenue / ~79% facility-level / ~37% net-margin numbers echo a
  large public self-storage operator but are round approximations — verify before
  publishing. (Note: this is the SAME topic as the repo's flagship `StorageVideo` /
  `StorageUnit` "The storage moat" — the reel this whole skill is based on — so publish only
  one of the two, or space them far apart.)
- **`PaymentReel`** — "The endless payment" (a ~45s reel on car lease-vs-buy as two
  spending *shapes* rather than a price tag. Two people drive the same car for ten years;
  one ends the decade owning nothing and still paying, the other stopped paying years ago —
  the only difference is how they hold it. One leases continuously (always a new car, but
  the monthly payment never stops); the other buys once and keeps it (more up front, then
  the loan simply ends and the cost trends toward zero). Over a long horizon holding is the
  cheaper path, and the longer the car is kept the wider the gap grows — closing on "same
  car, same years, what was that endless payment actually buying?" This is a *conceptual*
  comparison, so it carries no count-up stat beats; the numbers are shapes, not figures.
  Continuous voiceover (cloned voice, +6% pace, normalized) with a short ~1.5s pause after
  the hook (the hook line holds while silence sits before the "The only difference…" reveal —
  house convention); scene durations sit on its exact spoken-word timestamps; four black
  beats for the punch-lines, one red "Leasing buys an endless payment." `impact` card as the
  mid-tail thesis, and a question close that resolves on footage (a car on an empty road at
  dusk) rather than the red card. Media credits (Pexels, free license) — videos: an interior
  driving POV (15330792), a top-down lot of covered new cars (5972216), an open road
  (34566528), and a car on a road at dusk (4203568). Photos: two parked cars (108160), a hand
  making a payment (9304427), a paid-off / keys-in-hand moment (4160236), a car dealership lot
  (34298678), a person keeping/washing their own car (12969398), cash up front (7680565), loan
  paperwork ending (48148), a recurring monthly payment (7688524), an owner with a settled car
  (35810979), a widening gap/road (1578750), and US twenty-dollar bills spread out (15633962).
  **Brand-safety:** car footage is thick with manufacturer badges, dealer signage and licence
  plates, so the sourcing pass rejected many candidates for legible branding — VW, Mercedes,
  Corvette, Ford and Honda badges, Cuban and Turkish plates, a Union Jack, and a 7-Eleven
  storefront were all caught and swapped. The final set shows no manufacturer badges, no
  dealer/brand signage, no readable plates, and no flags. **FLAG — illustrative, not a
  quote:** the reel makes no dollar claim; the lease-costs-more-over-a-long-hold conclusion is
  a general characterization of the two structures — specific lease terms, rates and resale
  move the *size* of the gap, not its direction. (Note: this is the SAME topic as the repo's
  existing `LeaseReel` — publish only one of the two, or space them far apart.)
- **`NeverstopReel`** — "The never-ending payment" (a ~56s reel on car lease-vs-buy told
  through the numbers. Two drivers on the same $400/month car budget end up thousands apart:
  over ten years one leases and pays every single month, the other buys, finances for five
  years, then drives five years for free. A lease feels smart — a newish car, a fixed cost,
  nothing up front — so the payment never feels like the problem; but lease continuously and
  it never ends. Ten years in: 120 payments and you own nothing. Buy: about 60 payments, then
  the loan ends and the cost drops toward zero. Leasing rents access permanently — you pay for
  the newest model, not for something you keep; the lever was never which car, it's whether the
  payment ever stops. Closes on "same car, same budget — what was it really buying?" Unlike
  `PaymentReel` (a pure shape/comparison), this cut is **numbers-driven**: three count-up `stat`
  beats ($400/mo, 120 payments, 60 payments). Continuous voiceover (cloned voice, +6% pace,
  normalized) with a short ~1.5s pause after the hook (the hook holds through the silence before
  the "$400 a month" reveal — house convention); scene durations on its exact spoken-word
  timestamps; eight black beats for the punch-lines, one red "Leasing rents access. Permanently."
  `impact` card as the mid-tail thesis, and a rhetorical question close that resolves on footage
  (a dusk highway) rather than the red card. Media credits (Pexels, free license) — videos: an
  interior open-highway driving POV (11367262), an aerial b&w lot of parked cars (33763794), a
  bright prairie-highway POV (32060910), and a dusk highway drive at sunset (38880705). Photos: a
  hand on a calculator beside cash (5466806), a spiral desk calendar with glasses (5386754), a
  couple signing a purchase document (8292838), a glossy badge-free car headlight detail
  (16352272), hands passing cash (4968548), hands unrolling a very long receipt (4959926), an
  empty two-car driveway (15267098), a hand pressing a "paid" stamp on paperwork (6358834), a
  windshield POV of an open coastal road (2513977), a hand holding a plain car key fob (97075),
  and a scatter of one-dollar bills (259191). **Brand-safety:** car footage is thick with
  manufacturer badges and plates, so the sourcing pass rejected several candidates for legible
  branding — a BMW roundel (31362321), two VW center-cap logos (11501948, 14436192), an Indian
  licence plate plus a Toyota badge (36930790), and a storefront-with-logos / Audi R8 front
  (3007435) were all caught and swapped. The final set shows no manufacturer badges, no dealer
  signage, no readable plates, and no flags. **FLAG — illustrative, not a quote:** the $400/mo,
  120-vs-60-payments and "drive five years for free" figures are a clean model of the two
  structures, not a cited case; specific lease terms, rates and resale move the *size* of the
  gap, not its direction — verify before publishing. (Note: this is the SAME lease-vs-buy topic
  as the existing `LeaseReel` and `PaymentReel` — publish only one, or space them far apart.)
- **`WonderReel`** — "The never-ending payment" (a ~58s reel — an **A/B twin of `NeverstopReel`**:
  the same numbers-driven car lease-vs-buy message and structure, its own fresh footage, and a
  different hook opener ("Did you ever wonder…" vs "Want to know…"). Two drivers on the same
  $400/month car budget end up thousands apart: over ten years one leases and pays every single
  month, the other buys, finances for five years, then drives five years for free. A lease feels
  smart — a newish car, a fixed cost, nothing up front — so the payment never feels like the
  problem; but lease continuously and it never ends. Ten years in: 120 payments and you own
  nothing. Buy: about 60 payments, then the loan ends and the cost drops toward zero. Leasing
  rents access permanently — you pay for the newest model, not for something you keep; the lever
  was never which car, it's whether the payment ever stops. Numbers-driven: three count-up `stat`
  beats ($400/mo, 120 payments, 60 payments). Continuous voiceover (cloned voice, +6% pace,
  normalized) with a short ~1.5s pause after the hook (the hook holds through the silence before
  the "$400 a month" reveal — house convention); scene durations on its exact spoken-word
  timestamps; eight black beats for the punch-lines, one red "Leasing rents access. Permanently."
  `impact` card as the mid-tail thesis, and a rhetorical question close on footage (a car at
  dusk) rather than the red card. Media credits (Pexels, free license) — videos: a driver-POV of
  a curvy hill road (19201236), a top-down aerial of a packed car lot (5982899), an empty road
  curving toward sunset (20063577), and a single car at golden-hour sunset (13681532). Photos: a
  hand on a calculator beside bills (5900228), a flip desk calendar (2504924), a handshake with
  car keys handed over (7144207), a wet shiny car detail (20381587), a hand passing a $20 bill
  (4968385), a tall stack of aged documents (7654130), two empty cupped palms (2844473), a man
  stamping paperwork (7654118), an open road from inside a car (36651210), a plain black key fob
  (11017012), and a macro of dollar bills (9043018). **Brand-safety:** car footage is thick with
  manufacturer badges and plates, so the sourcing pass rejected many candidates for legible
  branding — an Audi sedan + Turkish plate, a Casio calculator, a Pirelli "Scorpion Verde" tire,
  Infiniti dealership signage + grille badge, Ford / Peugeot / Corvette key fobs, a "Tile"
  tracker, and Qlik / Decathlon / ProUctenka.cz text on statements and receipts were all caught
  and swapped. (The hook clip was also re-sourced post-hand-off — the agent's first pick,
  15330792, is already `PaymentReel`'s hook, so it was replaced with 19201236 to keep every
  reel's footage unique.) The final set shows no manufacturer badges, no dealer signage, no
  readable plates, and no flags. **FLAG — illustrative, not a quote:** the $400/mo,
  120-vs-60-payments and "drive five years for free" figures are a clean model of the two
  structures, not a cited case; specific lease terms, rates and resale move the *size* of the
  gap, not its direction — verify before publishing. (Note: this is the SAME lease-vs-buy topic
  as `LeaseReel`, `PaymentReel` and `NeverstopReel` — publish only one, or run this as a
  deliberate A/B against NeverstopReel.)
- **`RallyReel`** — "Owners, not earners" (a ~54s reel on US stock-ownership / wealth
  concentration. You think the stock market is everyone's market; it isn't. The top 10% of
  households own about 90% of all stocks, the bottom half roughly 1%. The line that divides
  wealth isn't mainly income — it's who owns the assets that compound. When the market rises
  20%, almost all of that gain flows to the top 10% who already hold nearly every share, so a
  booming market and a struggling household sit in the same year. At the very top, the
  wealthiest 1% now hold a record ~31% of all household wealth: wages get taxed and spent,
  assets grow on themselves, and ownership pulls further ahead every year. Markets reward
  owners, not earners. Numbers-driven: four count-up `stat` beats (90% / 1% / 20% / 31%).
  Continuous voiceover (cloned voice, +6% pace, normalized) with a short ~1.5s pause inside the
  hook — after "...everyone's market." and BEFORE the "It isn't." punch, so the statement lands,
  silence holds, then the punch drops (house convention, placed for the beat);
  scene durations on its exact spoken-word timestamps; eight black beats for the punch-lines,
  one red "Markets reward owners. Not earners." `impact` card as the mid-tail thesis, and a
  rhetorical question close ("who was it really for?") on footage (a dusk cityscape) rather
  than the red card. Media credits (Pexels, free license) — videos: an anonymous crowd across
  a city plaza (27700659), an abstract green data-viz chart ticking up (18743334), a lit city
  skyline at night (10093263), and a wide dusk cityscape (36145164). Photos: a green stock
  chart on screen (4604639), a motion-blurred commuter crowd (29736026), an upward analytics
  dashboard (97080), a private mansion with pool (8143671), a "STOCK MARKET" flat-lay with
  $100 bills (6801681), a tired worker in coveralls (37301862), a cash-counting machine with
  bills (6266699), a wallet of banknotes (31550977), an illustrated money tree (6289031), and
  a razor-wire fence against the sky (20597291). **Brand-safety:** finance footage is thick
  with tickers, chyrons and logos, so the sourcing pass rejected many candidates for legible
  branding — crypto tickers (DOGE/BTC/TRON) and a Binance watermark, a "coinmarketcap.com" URL,
  a Nike swoosh, "PKP Intercity" rail livery, "Chicago Tribune" / "Prudential" / Nissan
  building-and-grille marks, and downward-trending charts were all caught and swapped; the
  first `v_close` pick was also replaced post-hand-off because a "Deloitte" sign was legible on
  a tower. The final set has no legible tickers, chyrons, company names, plates or flags.
  **FLAG — real figures, round approximations:** the ~90% of stocks (top 10%), ~1% (bottom
  half), and record ~31% of wealth (top 1%) are widely-cited US wealth-concentration numbers
  but drift with the data vintage; the "market rises 20%" is illustrative. Verify the current
  figures before publishing. (Note: this is the SAME topic as the existing `OwnershipReel`
  ("the ownership gap") — publish only one, or run this as a deliberate A/B / refreshed take.)
- **`NumbersReel`** — "Run the numbers" (a ~51s reel on the rent-vs-buy myth. "Renting is
  throwing money away" is one of the most expensive things people believe; sometimes buying is
  the worse move — it depends on numbers most people never run. The belief is easy to hold (rent
  leaves nothing to point to, a mortgage feels like forced saving), but buying carries costs the
  slogan ignores — interest, property taxes, maintenance, insurance, fees — and the down payment
  has an opportunity cost: that cash could have been invested. Whether buying wins depends on how
  long you stay, the local price-to-rent ratio, and what the cash would otherwise earn. Owners
  build equity but tie up capital; renters keep flexibility and invest the difference. The same
  house can favor buying in one city and renting in another. The honest answer is a calculation,
  not a slogan — change the inputs and it flips. This is a *conceptual* reel, so it carries no
  count-up stats; two `lines` beats carry the five costs and the three inputs. Continuous
  voiceover (cloned voice, +6% pace, normalized) with a short ~1.5s pause after the hook (the
  hook holds through the silence before the reveal — house convention); scene durations on its
  exact spoken-word timestamps; black beats for the lists and punch-lines, one red "A
  calculation, not a slogan." `impact` card as the mid-tail thesis, and a rhetorical question
  close ("which way do the numbers tip?") on footage (a dusk skyline) rather than the red card.
  Media credits (Pexels, free license) — videos: a golden-hour aerial over a suburban
  neighborhood (12240430), a city apartment/rental block (4693665), a hand unlocking a house
  door (8292925), and a city skyline at dusk (4687314). Photos: a generic "Home For Sale" yard
  sign (8482510), a loan-agreement document (7841821), a calculator with coins (7111553),
  home-repair tools (4792495), banded stacks of $100 bills (6266282), coins over financial
  charts (12955794), a bright apartment living room (6480208), a warmly-lit house at dusk
  (4933643), stacked moving boxes (4553261), and a row of similar houses (25242991).
  **Brand-safety:** real-estate footage is full of agency signage and addresses, so the sourcing
  pass rejected candidates for legible branding — an "Electrolux" fridge, "TOPEX" tool branding,
  a visible house number, Canadian/USA flag drone shots, and all crypto-coin/ticker images were
  caught and swapped; the "For Sale" sign is generic (no agency name, phone, or URL). The final
  set has no realtor/lender brands, no readable addresses or plates, and no flags. **FLAG — no
  hard figures:** the reel makes no numeric claim; the rent-vs-buy conclusion is a general
  characterization (the answer genuinely depends on the inputs), so nothing needs fact-checking
  beyond the framing. (Note: this is the SAME topic as the existing `RentReel` ("Rent vs. buy —
  it depends") — publish only one, or run this as a deliberate A/B / refreshed take.)
- **`SpeedReel`** — "The withdrawal rate" (a ~50s reel on the retirement safe-withdrawal-rate
  rule. Two people retire with the exact same $1,000,000; one runs out, the other never does —
  same balance, same markets, the only difference is how fast they spend. One draws $40,000 a
  year (4%, a rate that has historically tended to last decades), the other $80,000 (8%, double
  the income and a far higher chance of running dry). It isn't about better investments — same
  portfolio, same returns; double the withdrawal rate and you roughly double the risk of running
  out, and sequence sharpens it (a bad market early hurts the fast spender most). The balance was
  never the whole game — the rate is the hidden variable. Numbers-driven: four count-up `stat`
  beats ($40k / $80k / 4% / 8%). Continuous voiceover (cloned voice, +6% pace, normalized) with a
  short ~1.5s pause after the hook (the hook holds through the silence before the reveal — house
  convention); scene durations on its exact spoken-word timestamps; black beats for the
  punch-lines, one red "The rate is the hidden variable." `impact` card as the mid-tail thesis,
  and a rhetorical question close ("which retiree were you?") on footage (a golden-hour beach)
  rather than the red card. Media credits (Pexels, free license) — videos: an elderly couple
  relaxing at home (5798907), an abstract market-data animation (34645214), an hourglass with
  running sand (35590093), and a golden-hour beach at sunset (28975117). Photos: a coin dropping
  into a savings jar (5849596), a comfortable older man with a record player (6867997), a worried
  elderly woman (3921418), a calculator with cash and a notepad (4386325), an abstract
  candlestick/line chart (6801639), a declining candlestick chart (7947741), an open empty wallet
  (12001949), a macro of $100 bills (10149610), and a forked forest trail (9608654). **Brand-
  safety:** finance footage is full of tickers, app UIs and logos, so the sourcing pass rejected
  candidates for legible branding — a "MacBook Pro" wordmark, a "Casio fx-350ES" calculator, a
  "© StockCharts.com" watermark, and market screens showing Binance / crypto tickers (1000CAT,
  EUR/USDC) were all caught and swapped (the market clip is an abstract animation with generic
  decimals only), and non-US currency shots were skipped for the $100-bill slots. The final set
  has no legible tickers, app UIs, fund/brokerage brands, or recognizable people. **FLAG —
  illustrative rule of thumb:** the "4% lasts decades / 8% far higher risk" figures are the
  widely-cited safe-withdrawal heuristic, not a guarantee — real outcomes depend on returns,
  sequence, horizon and fees; verify the framing before publishing. (Note: this is the SAME topic
  as the existing `DrawReel` ("The rate, not the balance") — publish only one, or run this as a
  deliberate A/B / refreshed take.)
- **`NestReel`** — "The withdrawal rate" (a ~52s reel — an **A/B twin of `SpeedReel`**: the same
  numbers-driven retirement-withdrawal-rate message and captions, its own fresh footage, and a
  different hook opener ("Want to know…" vs "Did you ever wonder…"). Two people retire with the
  exact same $1,000,000; one runs out, the other never does — same balance, same markets, the
  only difference is how fast they spend. One draws $40,000 a year (4%, historically lasts
  decades), the other $80,000 (8%, a far higher chance of running dry). It isn't about better
  investments — same portfolio, same returns; double the withdrawal rate and you roughly double
  the risk of running out, and a bad market early hurts the fast spender most. The balance was
  never the whole game — the rate is the hidden variable. Numbers-driven: four count-up `stat`
  beats ($40k / $80k / 4% / 8%). Continuous voiceover (cloned voice, +6% pace, normalized) with a
  short ~1.5s pause after the hook (the hook holds through the silence before the reveal — house
  convention); scene durations on its exact spoken-word timestamps; black beats for the
  punch-lines (including the "same balance, same markets" beat), one red "The rate is the hidden
  variable." `impact` card as the mid-tail thesis, and a rhetorical question close ("which retiree
  were you?") on footage (a golden-hour lake) rather than the red card. Media credits (Pexels,
  free license) — videos: a relaxed older couple at home (7329851), an hourglass with running
  sand (5660498), and a golden-hour lake at sunset (33825393). Photos: a coin dropping into a
  piggy bank (12357530), a content senior by a lake (5934345), a stressed senior over papers
  (6975209), an unbranded calculator with cash (7680697), an abstract two-line chart (7580844), a
  red declining candlestick chart (38892298), a wallet with a single $1 bill (17674675), a fan of
  $100 bills (14820438), and a forked forest road (31747091). **Brand-safety:** finance footage
  is full of tickers, app UIs and logos, so the sourcing pass rejected a "Casio fx-350ES"
  calculator and crypto/forex chart screens, and skipped foreign-currency cash/calculator shots;
  the intended market clip was also dropped post-hand-off (its 9:16 crop collapsed to an off-brand
  cash collage), so the "same markets" beat renders on black. The final set has no legible
  tickers, app UIs, fund/brokerage brands, or recognizable people. **FLAG — illustrative rule of
  thumb:** the "4% lasts decades / 8% far higher risk" figures are the widely-cited safe-withdrawal
  heuristic, not a guarantee — real outcomes depend on returns, sequence, horizon and fees; verify
  the framing before publishing. (Note: this is the SAME topic as the existing `DrawReel` ("The
  rate, not the balance") and `SpeedReel` — publish only one, or run this as a deliberate A/B
  against SpeedReel.)
- **`CeilingReel`** — "Income vs. wealth" (a ~53s reel on why a big salary isn't wealth. You
  think a big salary means you're rich? Plenty of people earning $300K a year have almost nothing
  saved — income and wealth aren't the same thing. Income is visible (the car, the title, the
  address) while net worth stays invisible, so the paycheck becomes the scoreboard. But net worth
  tracks the savings rate far more than the salary — studies of real millionaires keep finding
  ordinary incomes, high savings, decades of investing — and lifestyle expands to fill income, so
  a raise without more saving leaves net worth flat. Income is what flows in; net worth is what
  you keep. Someone on $300K who spends it all builds nothing; someone on $90K who keeps a fifth
  compounds into real wealth — same effort, decades apart. The decisive number was never the
  paycheck: income sets the ceiling, the savings rate decides how much becomes wealth. Continuous
  voiceover (cloned voice, +6% pace, normalized) with a short ~1.5s pause after the hook (the hook
  holds through the silence before the reveal — house convention); scene durations on its exact
  spoken-word timestamps; a $300K count-up `stat`, two staggered `lines` beats (the car/title/
  address and ordinary-incomes/high-savings/decades), black beats for the punch-lines, one red
  "It was never the paycheck." `impact` card as the mid-tail thesis, and a rhetorical question
  close ("what were you measuring?") on footage (a suburban street at dusk) rather than the red
  card. Media credits (Pexels, free license) — videos: a suited businessman (6100893), a modern
  luxury living room (31617700), a stop-motion rising arrow (7055025), and a suburban neighborhood
  at sunset (19959745). Photos: a blank "Payroll" document (6289029), a hand with a car key at a
  door (4930676), a suburban two-car-garage house (8583638), a near-empty wallet (8719570), a
  piggy bank with coins (6052793), a rising bar chart with coins (11333721), a fan of $100 bills
  (32553500), an ordinary office worker (8691820), and an older couple reviewing finances
  (39191612). **Brand-safety:** the sourcing pass rejected a Ferrari-badged car, Bitcoin coins,
  Peugeot/emblem key fobs, and a religiously-specific interior; the "Payroll" doc is blank (no
  employer name), the car/key shows no readable badge or plate. The car-key photo was also
  re-sourced post-hand-off because the agent's first pick collided with NeverstopReel's clip. No
  car badges, employer names, readable plates, or addresses remain. **FLAG — illustrative:** the
  $300K/$90K/"keeps a fifth" figures are a clean model of the income-vs-savings-rate point, not
  specific claims; the "studies of real millionaires" line references the popular finding
  (ordinary incomes + high savings) — worth a light check before publishing. (Note: this is the
  SAME topic as the existing `KeepReel` ("Income vs. wealth") — publish only one, or run this as a
  deliberate A/B / refreshed take.)
- **`MattressReel`** — "The safe illusion" (a ~54s reel on inflation quietly eating idle cash.
  You think cash is the safe place to keep your money? $10,000 hidden under a mattress in 1980,
  untouched, buys only about $2,500 worth today — nobody took it, prices did. Cash feels solid
  (the number never drops), so it feels like the no-risk thing, but since 1980 the price level
  roughly quadrupled: a 1980 dollar buys ~25 cents now, and what cost $100 then costs ~$390 today.
  It isn't a one-year blip — it compounds every year in the background; that same $10K in the
  market would be worth far more, even after inflation, and the loss came from doing nothing at
  all. Cash isn't neutral: held long enough it slowly loses, and the safe-feeling choice is the
  one quietly shrinking — standing still doesn't hold your place, it moves you backwards.
  Numbers-driven: three count-up `stat` beats ($2,500 / 25¢ / $390). Continuous voiceover (cloned
  voice, +6% pace, normalized) with a short ~1.5s pause after the hook (the hook holds through the
  silence before the reveal — house convention); scene durations on its exact spoken-word
  timestamps; black beats for the punch-lines, one red "It moves you backwards." `impact` card as
  the mid-tail thesis, and a rhetorical question close ("what is cash protecting you from?") on
  footage (a dim wall clock) rather than the red card. Media credits (Pexels, free license) —
  videos: stacks of banded $100 bills (6266286), a shopping-cart aisle glide (29068393), abstract
  rising green arrows (34934562), and a dim analog wall clock (9945032). Photos: rolled cash in a
  jar (7680552), a worn rolled bill on red (4938241), scattered $100 bills (11624902), unbranded
  fresh produce (6653621), a stack of US quarters (12920771), a row of safe handles (8466227), an
  aged leather wallet (12444594), and a minimalist wall clock (14976142). **Brand-safety:** the
  sourcing pass rejected euro price tags on a grocery clip, crypto-token coins, a "Master Lock"
  lockbox, and a recognizable trading-app UI; the chart photo was also dropped after hand-off
  because it collided with WaterReel's clip, so the "even after inflation" beat renders on black
  (the rising-market clip already precedes it). No store/retailer brands, legible tickers, or
  non-US currency remain. **FLAG — real figures:** the "US price level ~4x since 1980 / a 1980
  dollar buys ~25¢ / $100 → ~$390" numbers are broadly correct CPI-based approximations but drift
  with the exact base month and current data — verify against current CPI before publishing. (Note:
  this is the SAME topic as the existing `InflationReel` ("The inflation tax") — publish only one,
  or run this as a deliberate A/B / refreshed take.)
- **`SudsReel`** — "A subscription with soap" (a ~62s reel on why Wall Street is
  buying car washes: it's a business you drive through in four minutes — no app, no
  founder, just soap, water and a monthly charge that never stops. The modern car
  wash stopped charging per wash and started selling unlimited monthly memberships,
  turning a one-off service into recurring, subscription revenue. What attracts the
  money isn't the wash, it's the contract behind it — members pay every month
  whether they show up or not, cost per wash is low, and the land underneath holds
  its value; a weather-dependent one-off purchase becomes predictable monthly cash,
  exactly the cash-flow profile a financial buyer pays a premium for. So private
  equity has been rolling up independent washes into large chains, buying two assets
  in one purchase — the recurring membership base and the appreciating real estate
  under it. Recurring changes everything: attach a subscription to a piece of land
  and an unglamorous service becomes a roll-up target). Continuous voiceover, scene
  durations on its exact spoken-word timestamps; a black "no app / no founder / just
  soap & water" list, a car-wash reveal, a red "recurring changes everything"
  `impact` card near the end, and a close on a soapy hand-wash ("a subscription with
  soap"). Full-bleed footage on nearly every beat, mixing video b-roll with stills.
  Media credits (Pexels, free license) — videos: a drive-through automatic wash
  (4816721), a car in a misty wash bay (6873167), a pressure-wash spray (6872468),
  a driveway hand-wash (4849139), foam being applied (6873500), and a sponge on a
  soapy car (6873324). Photos: a boardroom handshake (8101922), a subscription card
  (6237886), a card payment (11952304), a signed contract (7567600), an empty wash
  bay (32667420), an aerial commercial lot (9716297), a stack of cash (11624907), a
  deal over money (5520322), a private-equity handshake (7792841), a car-wash
  frontage (20435095), an aerial lot with building (15984741), cars at a wash
  (4870724), aerial real estate (13185326), paperwork (175045), and an empty land
  plot (15422584). **Illustration, not figures:** the "Wall Street /
  private equity buying and rolling up car washes into membership chains" trend is
  widely reported; the script deliberately quotes no operator margin or price
  ("varies too much for an honest single figure") and names no company — directional,
  confirm specifics before publishing. (Distinct from `CarWashReel`, "the car wash
  play.")
- **`RentReel`** — "It depends" (a ~57s reel debunking the rent-vs-buy slogan:
  there's a belief that renting is throwing money away and buying is always the
  smart move — but sometimes buying is the more expensive mistake. The belief is
  easy to hold because rent leaves nothing to point to while a mortgage feels like
  forced saving, but buying carries costs the slogan ignores — interest, property
  taxes, maintenance, insurance, transaction fees — and the down payment has an
  opportunity cost, since that money could have been invested. Whether buying wins
  depends on how long you stay, local price-to-rent ratios, and what the cash would
  otherwise earn. Owners build equity but tie up capital; renters keep flexibility
  and can invest the difference — the same house can favour buying in one city and
  renting in another. The honest answer is a calculation, not a maxim; change the
  inputs and it often flips within a few years of break-even. Renting isn't always
  waste, buying isn't always smart — it depends). Continuous voiceover, scene
  durations on its exact spoken-word timestamps; a black hidden-cost list (interest
  / property taxes / maintenance / insurance / fees), a red "a calculation, not a
  slogan" `impact` card near the end, and a close on a house-with-sign ("it
  depends"). Full-bleed footage on nearly every beat. Media credits (Pexels, free
  license) — photos: a for-rent sign (12933051), a for-sale sign (7937763), a
  stressed homeowner with bills (5900161), a thoughtful person (6919706), an empty
  rental (8962228), house keys as forced saving (7599735), a home budget calculator
  (5900160), cash as a down payment (5900186), an investing chart (7948072), moving
  boxes (4554249), an apartment tower for price-to-rent (20538974), coins the cash
  could earn (5466814), house keys and equity (8293781), a mover with a box
  (7203775), coins invested as the difference (5466798), a balance scale (7707115),
  a city skyline (17113690), a budget calculation (4386366), an investment chart at
  break-even (6802052), an apartment building (11839273), and a house with a sign
  (8469940). **Illustration, not advice:** a conceptual explainer with no asserted
  prices or figures; whether renting or buying wins genuinely depends on time
  horizon, local price-to-rent, mortgage rate and the opportunity cost of the down
  payment — directional, not a recommendation for any specific market.
- **`OwnersReel`** — "Markets reward owners, not earners" (a ~55s reel on who
  actually owns the stock market: it gets called everyone's market, but when it
  booms almost none of the gain reaches most households — because of who owns it.
  The wealthiest ~10% of US households own about 90% of all stocks; the bottom half
  own roughly 1%. So when the market rises 20%, almost all of that gain flows to the
  people already holding nearly all the shares — a booming market and a struggling
  household can share the same country and the same year. The divide isn't mainly
  income, it's ownership: wages get taxed and spent while assets compound on their
  own, and at the very top ~1% of households now hold a record ~31% of all US
  wealth. The households pulling away aren't necessarily out-earning everyone — they
  own things that grow while they sleep. Markets reward owners, not earners, and
  most people watch the gains from the wrong side of that line). Continuous
  voiceover, scene durations on its exact spoken-word timestamps; the red "markets
  reward owners, not earners" `impact` card sits near the end and the reel closes on
  a black 10%-own-ninety vs half-the-country-owns-one comparison. Full-bleed footage
  on nearly every beat. Media credits (Pexels, free license) — photos: a stock
  ticker board (534216), a modest suburban house (12619604), a hand over market data
  (7567445), a brick manor and lawn (8143683), an empty wallet (8719574), a green
  rising chart (186461), cash changing hands (3768145), a trading-floor screen
  (11798250), a market surge board (187041), a worried household (7927581), a payslip
  at a desk (8872389), house keys/home ownership (12505403), tax paperwork (6927335),
  a money plant compounding (6774947), an aerial luxury estate (9150640), a steep
  growth chart (7108043), an office worker (7654610), someone asleep at night
  (6541074), stacked coins as assets (8369680), and a person looking out a window
  (16634008). **Real figures — verify before publishing:** the "top 10% own ~90% of
  stocks", "bottom 50% own ~1%", and "top 1% hold a record ~31% of US wealth" stats
  echo the Federal Reserve Distributional Financial Accounts and are widely reported,
  but the exact shares move each quarter and the "market rises 20%" is an
  illustrative round number; confirm the current DFA figures before publishing.
  (Distinct from `OwnershipReel`, "the ownership gap.")
- **`LeaseReel`** — "One path ends the payment" (a ~47s reel on leasing forever vs
  buying and holding a car: two people drive the same kind of car for ten years —
  one ends the decade owning nothing and still writing a monthly cheque, the other
  is paid off and still driving. They didn't pick different cars; they picked
  different ways to hold one. Lease continuously and you're always in a new car but
  carry a permanent payment; buy once and keep it and you pay more up front, or
  finance for a few years, then the loan ends and the cost trends toward zero. Over
  a long horizon holding is usually the cheaper path, and the longer the car is
  kept the wider the gap — terms, rates and upkeep move the size of it, not the
  direction. One path ends the payment; the other never does). Continuous
  voiceover, scene durations on its exact spoken-word timestamps; a "different ways
  to hold it" black beat and a "one path ends the payment" red `impact` card near
  the end, closing on a vintage odometer ("the other never does"). Full-bleed
  footage on nearly every beat. Media credits (Pexels, free license) — photos: a
  key handover (8482859), a stack of bills (5900179), cars on a dealership lot
  (5864164), a fork in an open road (22775934), an open highway (6333640), a clean
  new SUV in a showroom (9542003), a monthly payment/calculator (6963887), cash in
  hand (4394806), signing paperwork (8112169), a market chart on a laptop
  (7108092), a dealership key handover (7489107), a relaxed driver (3785441), a
  declining chart (5561912), a new car detail (6817007), bills and a calendar
  (5900184), a piggy bank (3833052), a financial chart (6203470), a mechanic at
  work (8478259), and a vintage car odometer (7409808). **Illustration, not
  advice:** a conceptual comparison — no specific prices, rates or figures are
  asserted, and "holding is usually cheaper over a long horizon" depends on lease
  terms, interest rates, resale value and upkeep; confirm the numbers for a real
  decision before publishing.
- **`IndexReel`** — "The return was always there" (a ~51s reel on index investing
  and patience: there's a return that's been available for a hundred years, it beats
  most professional investors, and it asks for no skill — only patience. It's the
  broad US stock market: over the long run it's returned about ten percent a year,
  roughly seven after inflation, so as a rule of thumb money doubles about every
  seven years — ten thousand becomes twenty, then forty, without adding a cent,
  though the average hides wild up-and-down years inside it. The catch: over fifteen
  years, about ninety percent of professional large-cap funds fail to beat that
  simple index; the experts, with all their tools, mostly trail it. You don't beat
  the market by being clever, you capture it by staying in — the horizon does the
  heavy lifting and the usual enemy is impatience, not stock-picking. The return was
  always available; the hard part was never the strategy — it was sitting still).
  Continuous voiceover, scene durations on its exact spoken-word timestamps; a
  "sitting still" red `impact` card near the end and a "10% the return / 90% the
  pros, behind" black compare closer that lays the whole thesis in one frame.
  Full-bleed footage on nearly every beat. Media credits (Pexels, free license) —
  photos: stacked euro coins (9648153), a suited professional (5831522), a calm
  seated figure (11743785), a stock-market screen (11798249), a rising chart
  (38821936), an inflation-worn note (38877603), a compounding growth chart
  (10531120), a seven-year calendar (12920750), a growing money plant (12198523),
  a century-old ledger detail (8369695), a volatile market chart (38782891), a
  magnifier over data (36755611), a fifteen-year horizon chart (38782896), a
  ninety-percent gauge (38343508), a downcast analyst (7567554), a trailing chart
  (5831255), a clever-looking trader (7567440), a steady long-term investor
  (4912789), a distant horizon (38877604), a frustrated impatient trader (5831256),
  and an ever-available market board (12198531). **Unverified claims:** the figures
  — ~10% nominal / ~7% real long-run US equity returns, the ~7-year doubling rule of
  thumb, and ~90% of active large-cap funds trailing the index over fifteen years —
  echo long-run market history and SPIVA-style persistence studies and are rendered
  as an illustration, not advice; confirm the current sources and figures before
  publishing.
- **`HoursReel`** — "The value inside the hour" (a ~50s reel on the hours-worked
  vs productivity myth: there's a belief that more hours means more produced and
  more earned, but compare whole countries and the numbers don't back it up. It's
  easy to believe — effort is the part you control, visible busyness looks like
  productivity, and hours are simple to count while value isn't. Across countries,
  longer hours don't track higher output; several nations work fewer hours per
  worker and produce more per hour than places that grind longer. Past a point,
  extra hours bring fatigue and diminishing returns — a rested worker out-produces
  an exhausted one on the same task in less time; output is capped by focus and
  energy, not the clock. Treating hours as the goal confuses effort with results —
  the question isn't how long it took, it's how much value each hour created. The
  lever was never the length of the day; it's the value inside each hour).
  Continuous voiceover, scene durations on its exact spoken-word timestamps; a
  "value isn't" black beat, the "the lever was never the length of the day" red
  `impact` card near the end, and a "fewer hours / more produced / across
  economies" closer. Full-bleed footage on nearly every beat. Media credits
  (Pexels, free license) — photos: a wall clock with desk supplies (5477685), a
  flag-pinned world map (8828597), a laptop world-map screen (7411970), a person
  at a desk (5717792), a man rubbing tired eyes (8867253), an overworked man with
  a cup (8472560), a white analog clock (7016218), a b&w world-map silhouette
  (5725589), a relaxed man with coffee and laptop (4939594), a serene woman on a
  laptop (6443357), a worker asleep at a desk late at night (36713392), a woman
  asleep on her desk (9062785), a woman relaxing with coffee and laptop
  (35962978), a focused worker by a cafe window (4925870), a coffee break in
  sunlight (9222386), a round black wall clock (1010480), an overworked man
  staring at a laptop (6837647), a wooden-framed clock (191703), a serene coffee
  workspace (8472577), a vintage alarm clock (37808313), and a relaxed morning
  laptop scene (6613598). General productivity explainer — no company named and no
  figures asserted; the cross-country claim reflects the widely-reported OECD
  hours-vs-productivity pattern (directional), so confirm specifics before
  publishing.
- **`ExciteReel`** — "Distribution fades" (a ~57s reel on Excite passing on Google
  in 1999: you could have bought the future of search for less than the price of a
  house — the sellers even dropped their price, and the buyer still said no. The
  buyer was Excite, a top web portal; the company for sale was Google, two Stanford
  students with a noticeably better search engine. Google's founders offered ~$1M,
  then dropped to ~$750K; Excite declined, on every portal's logic of the day —
  traffic was the asset, search a commodity that just sent users away, and paying
  to make visitors leave faster looked like a bad trade. Nobody yet knew the money
  was in answering the query. Google's search took over the internet, Excite faded
  into irrelevance, and Alphabet grew into a company worth well over a trillion
  dollars — from a price Excite thought too high. Distribution fades; a genuinely
  better product compounds, sometimes by a factor of a million). Continuous
  voiceover, scene durations on its exact spoken-word timestamps; $1M / $750K /
  $1T+ count-up stats, a mid-tail "distribution fades" red `impact` card, and a
  $750K-refused-vs-$1T-gone closing comparison. Full-bleed footage on nearly every
  beat (only the closing comparison is black). Media credits (Pexels, free
  license) — photos: a 90s CRT desk setup (36763947), a magnifying glass (4144768),
  macro dollar bills (4386475), scattered hundreds (5466789), a man with a
  magnifier (6614797), a CRT typing scene (5185179), two founders coding (1181263),
  code on a laptop (12899151), fanned hundreds (10149293), stacked bills (545064),
  vintage PC accessories (8720273), a vintage office team (8872441), a blue-lit
  server (17489163), a floppy-disk computer (37919866), banknotes on a surface
  (5466821), a magnifying glass on blue (4205767), a night city skyline (30373052),
  a b&w vintage Macintosh (12950487), an illuminated skyline (16422868), bills with
  a laptop (5980800), and a finance-concept money stack (32553499). **Unverified
  (historical):** names real companies (Excite, Google, Alphabet) and recounts the
  widely-reported ~1999 episode (a ~$1M then ~$750K offer Excite passed on;
  Alphabet later exceeding a $1T market cap) — the commonly-cited version of the
  story, rendered as written and **not** independently re-verified; confirm before
  publishing.
- **`VendReel`** — "The route, not the snacks" (a ~67s reel on the vending-route
  business: a business with no employees, no hours and no rent that collects the
  cash before anyone consumes a thing, and runs while the owner sleeps. It's a
  vending route — a fleet of machines in offices, gyms and lobbies selling around
  the clock, where the business is the route and the placement, not the snacks.
  Customers pay before they consume, the machines never take a day off, and the
  operator borrows space in someone else's building and pays no storefront rent.
  What looks like a snack business is really a logistics one — returns follow route
  density, not the margin on a single chocolate bar. The economics live in
  placement: a busy spot and a tight restock route make a small money pump, a bad
  location is dead weight. There's no honest single figure for profit per machine;
  one machine is a rounding error, a well-run route of dozens is a real, low-touch
  business — boring and repeatable beats exciting and fragile). Continuous
  voiceover, scene durations on its exact spoken-word timestamps; an offices /
  gyms / lobbies `lines` beat, the "boring beats fragile" red `impact` card near
  the end, and a "no staff / no rent / paid before the bite" closer over a night
  vending row. Full-bleed footage on nearly every beat (only the "no honest single
  figure" line is black). Media credits (Pexels, free license) — videos: a lit
  drink machine (5758028) and a lone machine at a roadside at night (25810707).
  Photos: a hand of coins (6328870), a Tokyo vending machine at night (34492643),
  a beverage machine row (20210396), soda/candy machines in a building (4062275),
  a sticker-covered street machine (31327341), silver coins in a hand (3943720), a
  woman choosing a drink (37380681), a red soda machine at night (9395585), a
  street machine (21840652), a courier unloading a van (6169177), machines on a
  street (20576570), Kyoto night machines (30251193), a Tokyo street machine
  (37533033), assorted chocolate bars (32402905), machines beside a bin (27152951),
  gourmet chocolate bars (8794094), candy on a dark surface (14147300), a hand
  truck of boxes (6169660), a lone snack machine (38803615), and a cluster of city
  machines (16029615). General small-business explainer — no company named and no
  profit figure asserted (the script says there's no honest single number);
  incidental brand packaging appears in the machine b-roll but no brand is
  referenced.
- **`SpreadReel`** — "A maybe vs a bill" (a ~46s reel on cash-vs-mortgage
  arithmetic: paying cash for a house feels safe, but sometimes the arithmetic
  favours carrying a mortgage you don't need. Say you have $500K and a $500K home.
  Option A: pay cash — the money sits in the walls earning nothing. Option B: take
  a mortgage at ~4% and invest the $500K at an expected ~6%. The loan costs ~$20K a
  year in interest; the money earns ~$30K, if returns hold — a spread of ~2%, about
  $10K a year in favour of financing. But it's a spread bet, not free money: the 6%
  is an expectation, the mortgage payment is a certainty. A certain cost against an
  uncertain return — what matters is the margin of safety, not the average. The
  return is a maybe; the payment is a bill). Continuous voiceover, scene durations
  on its exact spoken-word timestamps; a $500K and $10K/yr stat, two comparisons
  (4%-vs-6%, $20K-vs-$30K), and a mid-tail "margin of safety" red `impact` card.
  Full-bleed footage on nearly every beat (only the two comparisons sit on black).
  Media credits (Pexels, free license) — photos: a suburban home at dusk (186077),
  keys with documents and a calculator (27505120), a key handoff with a sold sign
  (8293717), a fan of $100 bills (15206825), a red-brick home (31602311), a forked
  dirt road (17342282), a hand holding a stack of cash (7231804), a minimalist
  house gable (358636), a person holding loan documents (8872719), a candlestick
  display (35118250), a rural road junction (35368202), a fan of banknotes
  (14820437), casino chips with dice and cards (269630), a candlestick analysis
  chart (38892300), papers marked paid and due (7111490), a mechanical balance
  scale (16204377), red dice falling mid-air (6990398), a hand holding a past-due
  bill (7926666), and a scenic village of homes (18189047). **Illustration, not
  advice:** a worked arithmetic example — the 4% rate, 6% expected return and the
  ~$20K / ~$30K / ~$10K figures are round, assumed numbers to show the spread;
  actual rates and returns vary and the return is uncertain.
- **`RunwayReel`** — "Short on years, not money" (a ~52s reel on retirement
  savings: the typical American near retirement has about $185K saved — the median
  for households nearing 65 — and for most it only tops up other income, not a
  salary. Drawn down safely at 4%, it produces only ~$7,400 a year, about $600 a
  month on top of Social Security — enough to cover a gap for a few years, not to
  fund thirty. The figure isn't fixed by fate; it tracks when saving started. At an
  assumed 7%, the same $300 a month reaches ~$790K from age 25 but only ~$245K from
  40. Same money, different runway — most people near retirement aren't short on
  money, they're short on years). Continuous voiceover, scene durations on its
  exact spoken-word timestamps; five count-up stats ($185K / $7,400 / 4% / 30yrs /
  7%), a $245K-vs-$790K comparison, and the "short on years" red `impact` card near
  the end. Full-bleed footage on nearly every beat (only the comparison sits on
  black). Media credits (Pexels, free license) — photos: a senior couple by the sea
  (8170251), a calculator on $100s (5466795), counting cash (5900189), a printed
  line chart (590045), a couple on a couch (5591274), an income growth chart with
  coins (6289026), a calculator on banknotes (4386406), a couple buying groceries
  (8422672), a person holding cash (5466811), a calculator with a notebook
  (5466785), a highway at sunset (1046606), a highway under dramatic sky
  (13681232), a lonely road to the horizon (35999387), an accountant with bills
  (4386327), a finance review with a pencil (7876507), a blue bar graph (7947754),
  a black piggy bank with coins (3943727), a calculator on dollar bills (5942527), a
  black-and-white desert highway (1038935), a person computing with bills
  (5900225), and a warm older couple outdoors (16519714). **Illustration /
  unverified:** the ~$185K median and the 4% drawdown math (~$7,400/yr) echo widely
  reported figures; the $300/mo → ~$790K (from 25) vs ~$245K (from 40) projections
  are a worked example at an assumed 7% return, not a forecast — confirm the median
  and assumptions before publishing.
- **`CullReel`** — "Busy isn't profitable" (a ~58s reel on firing unprofitable
  customers: some companies quietly shed paying customers on purpose and make more
  money after — the revenue leaves, the profit goes up, both true at once. Every
  customer carries a cost to serve — support, returns, discounts, hassle — and for
  some accounts that cost quietly exceeds everything they ever pay. The instinct
  runs the other way (revenue is visible, every account feels like a win, so
  dropping one looks like self-harm), but cost to serve is scattered and never
  lands on one line. Measure profit per customer instead of revenue and a slice of
  accounts are losing money, so the company sheds them — raising prices, dropping
  the money-losers, steering them elsewhere. Revenue falls, margin rises: the
  accounts that left were the drag, the ones that stayed paid the bills). Continuous
  voiceover, scene durations on its exact spoken-word timestamps; two staggered
  `lines` lists (cost to serve; how they shed accounts), the "not all revenue is
  good revenue" red `impact` card near the end, and a "fewer customers / more
  profit / both true" closer over empty cafe chairs. Full-bleed footage carries
  nearly every beat (only two black beats plus the one red card). Media credits
  (Pexels, free license) — videos: call-center agents with headsets (8865706) and
  a customer paying at a cafe counter (6683943). Photos: a headset support agent
  (7709255), counting cash (4968545), euro bills with a calculator (7654163), two
  businessmen in discussion (6285071), a boutique returns counter (36730430), a
  cash-counting machine (6266447), a brainstorm session (7693692), a business
  handshake (8837510), a pen analyzing rates (8292880), scattered receipts
  (7680681), top-down data sheets (6694560), a hand at a chart on a monitor
  (5833762), a hand pointing to a market drop (9301837), a cashier handing over a
  bag (7667454), a card payment at a boutique (36730429), a rising green line
  (38821934), an accountant signing with a calculator (8296977), a "loss"
  thumbs-down whiteboard (7172860), employees cooperating in an office (12903168),
  and empty cafe chairs (18001286). General management principle (customer-level
  profitability / cost to serve) — not about a specific named company, and no
  financial figures are asserted.
- **`KodakReel`** — "The future in its own lab" (a ~58s reel on Kodak — rebuilt with
  video b-roll and a fuller script: there was a device locked in a drawer that could
  have owned the next fifty years of photography, and the company that invented it
  made sure almost no one saw it, because selling it would have killed the business
  it already had. It was Kodak — in 1975 its engineer Steven Sasson built the world's
  first digital camera, so Kodak held the future of photography in its own lab.
  Shelving it was rational: film and processing earned on every roll shot, developed
  and printed — a recurring, very-high-margin stream a one-off camera could never
  match, while the prototype was slow and coarse and the market looked like nothing.
  Digital exploded anyway, led by everyone else, and Kodak filed for bankruptcy in
  2012 — from 1975 to 2012 it invented the thing that would destroy it, sat on it for
  decades, and was killed by it regardless. Defending a profitable present blinds a
  company to the future in its own lab; cannibalise yourself, or someone else will).
  Continuous voiceover, scene durations on its exact spoken-word timestamps; a
  "looked like nothing" black beat, a red "cannibalise yourself, or be eaten"
  `impact` card near the end, and a close on a vintage camera. Full-bleed footage on
  nearly every beat, mixing video b-roll with stills. Media credits (Pexels, free
  license) — videos: a vintage camera in hand (3627134), a Kodak film strip
  (10276178), a spinning film reel (856593), smartphone photography (7857000), and a
  family phone photo (3198273). Photos: a vintage camera (3945326), a film roll in
  shadow (16438451), a film strip (3939961), a retro camera (3733981), a lab
  engineer (8439003), lab electronics (8533076), a research lab (8439005), a lab
  shelf (8666440), a darkroom with prints (8114057), Kodak film boxes (11469206), a
  lone film camera (3945336), a moody darkroom (7205373), an abandoned office
  (35090156), an empty office (2294135), an old camera in shadow (3585012), a dark
  darkroom (8113904), and a vintage cine camera (3945312). **Historical — well
  documented, verify before publishing:** names a real company (Kodak) and person
  (Steven Sasson); Sasson built the first digital camera prototype at Kodak in 1975
  and Kodak filed Chapter 11 in January 2012. Widely documented facts rendered as
  written; a Kodak-branded film strip appears as illustrative b-roll. Confirm
  specifics before publishing.
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
- **`InflationReel`** — "The inflation tax" (a ~51s reel — rebuilt with a fuller
  script and fresh footage: $10,000 hidden under a mattress since 1980 and never
  touched; every bill is still there, but it now buys only about $2,500 worth.
  Nobody took it — prices did. The price level has roughly quadrupled since 1980,
  so a 1980 dollar buys about 25¢ today, and what cost $100 then costs about $390
  now: same items, four times the dollars. That's why idle cash is riskier than it
  looks — the mattress money melted to a fraction of its buying power, while the
  same $10,000 in stocks would be worth far more, even after inflation. The loss
  came from doing nothing: cash isn't neutral — left alone it slowly loses, quietly
  every year, until decades add up to most of it. Standing still doesn't hold your
  place; it moves you backwards. Same bills, a quarter of the value, 46 years
  later). Continuous voiceover, scene durations on its exact spoken-word timestamps;
  three count-up stat beats on black ($2,500 / 25¢ / $390), two black text beats
  ("even after inflation," "cash isn't neutral"), a red "it moves you backwards"
  `impact` card in the tail, and a close on footage (a vintage calendar, "46 years
  later") rather than the red card. Full-bleed footage on nearly every beat, mixing
  video b-roll with stills. Media credits (Pexels, free license) — videos: hands
  fanning US $100 bills (5466780), a supermarket aisle POV (29376327), a descending
  escalator (3563056), and hands counting US cash (6700265). Photos: US bills on
  black (6590647), a banded stack of bills (6266268), a neatly made bed (8112905),
  a $2.00 produce price chalkboard (7456532), a basket of fresh groceries (9070110),
  a store receipt with sale tags (6127098), dollar bills on a wooden table
  (4430247), melting ice on dark marble (10526899), a seedling sprouting from coins
  (5550904), a single chair in a dark room (12586595), a vintage hourglass (7224866),
  an antique wall clock (35980873), a close-up US quarter (64824), and an old
  vintage calendar (11177238). **Illustration, verify before publishing:** the
  $10,000 / $2,500 / 25¢ / ~4× / $100→$390 / "46 years" figures track long-run US
  CPI (Bureau of Labor Statistics) but shift with the exact reference month and the
  stocks-vs-cash comparison depends on the period and index — confirm against the
  latest BLS data before publishing.
- **`LaundromatReel`** — "Boring cash that compounds" (a ~52s reel on the laundromat
  — rebuilt with a fuller script and fresh footage: a cash business on your corner
  that barely notices a recession, employs almost no one, and gets paid in quarters;
  nobody who owns one ever brags about it — that's the point. It's a laundromat, a
  room of machines customers operate themselves paying per load, so self-service
  means the customers supply the labour. It's defended by what it lacks — no staff to
  manage, no inventory to buy, no brand to hold up, machines that run for years on
  simple maintenance, and demand anchored to renters without in-unit laundry, a base
  that grows, not shrinks, when money gets tight. That steady local demand doesn't
  vanish when the economy dips; people still need clean clothes in a downturn. The
  appeal is durable cash flow on almost no staffing — durability beats excitement,
  and a well-located laundromat is the kind of boring cash flow that quietly
  compounds). Continuous voiceover, scene durations on its exact spoken-word
  timestamps; a "no staff / no inventory / no brand" black beat, a red "durability
  beats excitement" `impact` card near the end, and a close on an empty laundromat.
  Full-bleed footage on nearly every beat, mixing video b-roll with stills. Media
  credits (Pexels, free license) — videos: a laundromat interior (8756892), scattered
  coins (7118320), a spinning washer drum (4119968), tumbling dryers (5535856), and
  an empty laundromat (8756816). Photos: a calm laundromat (7282378), a plain
  laundromat (4700400), a customer loading a machine (11852050), hands loading
  laundry (5901622), a row of machines (10207554), a machine close-up (4386143), an
  apartment building (38894397), a city apartment block (1330753), folded laundry
  (7282433), a stack of coins (7738887), an empty laundromat (5816934), coins
  (8844580), coins growing (3943714), folded clothes (4440566), and an empty
  self-service laundromat (3639870). **Illustration, not figures:** a conceptual
  explainer; the script deliberately quotes no margin or price ("swing too much ...
  to quote an honest single figure") and names no company — the recession-resistant /
  low-labour framing is directional, sanity-check before publishing.
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
