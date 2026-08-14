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
