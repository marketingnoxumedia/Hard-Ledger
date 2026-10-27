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
- **`AutopayReel`** — "The autopay trap" (A/B twin of `DriftReel`: where
  `DriftReel`/`PhantomReel` land on the perception gap — you spend more on
  subscriptions than you think — this cut leads on the compounding OPPORTUNITY
  COST of one forgotten $50/mo sub over ten years: you pay in $6,000 for access
  you barely use, versus ~$8,700 if that same $50 were invested at an assumed 7%;
  the charge drifts out on autopay, felt month to month by no one, which is why a
  decade slips by unexamined — the point isn't to cancel everything, only to
  choose where the money goes). ~45.3s, question hook ("A forgotten $50 sub —
  what's a decade cost?") with a ~1.2s post-hook pause, two count-up stat beats
  ($6,000 paid / ~$8,700 compounded), the red "Small / Recurring" `impact` card
  mid-tail, and a question close ("Which one would you actually miss?").
  Media-dense (15 media / 2 black / 1 red). Its own footage under
  `public/autopay/`. Media credits (Pexels, free license) — videos: water
  draining in a sink (4106935), US coins accumulating (6747066), and a lone man
  sitting pensively (32789559, closing beat). Photos: a TV remote on a blanket
  (38466607), a face-down phone (37669736), a wall calendar (5635111), hands on a
  calculator (6963017), a dusty old keyboard (5393415), a seedling in soil
  (401213), ascending coin stacks (12198528), a US $50 bill (6590620), a blank
  card in hand (3616891), an hourglass (11873897), a pile of US coins (8018103),
  and a forked forest trail (10124559). **Illustrative figures — verify before
  publishing:** the $50/mo, 7% return, $6,000-paid and ~$8,700-compounded numbers
  are round-number arithmetic on stated assumptions, not a claim about any
  specific product or period; real returns vary by year. **Theme note:** same
  forgotten-subscription case as `DriftReel` and `PhantomReel` — publish only one
  subscription reel to a given audience.
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
- **`UglyReel`** — "Nobody will touch it" (a ~56s reel; the **A/B twin of `SanitationReel`**,
  same portable-sanitation moat but opening and closing on questions rather than declaratively).
  One of the most defensible small businesses is one almost nobody will start: renting and
  servicing portable toilets for construction sites and events on recurring contracts. The moat
  is other people's reluctance — the work is unpleasant enough that competitors don't rush in, so
  pricing stays rational with no brand or technology edge; the servicing recurs because units are
  cleaned on a schedule, and the contracts renew whether anyone thinks about them or not.
  Construction and events guarantee demand, and the unpleasantness itself is the barrier keeping
  rivals out. The lesson: a reputation for gross is a kind of protection; what makes people avoid
  a business defends the ones already in it. Question hook ("...one almost nobody will start?")
  and a rhetorical question close ("who's really winning — the pretty business, or the one nobody
  will touch?"); a ~1.5s post-hook pause (the hook holds through the silence before the reveal —
  house convention), a red "Gross is protection." `impact` card as the mid-tail thesis, and the
  close on a lone portable toilet rather than the red card. Numbers-honest: no margin figure is
  asserted (it states outright that margins vary too much by route). Continuous cloned voiceover
  (+6% pace, normalized); scene durations on exact spoken-word timestamps; music normalized and
  mixed at 0.17. Entirely its own fresh footage under `public/ugly/` — no asset shared with
  SanitationReel or any other reel. Media credits (Pexels, free license) — videos: a top-down
  aerial of a lone excavator in rubble (29704052), gloved hands cleaning in a tiled washroom
  (9472840), workers pressure-washing a public space (32621171), a night outdoor event (14881072),
  and a golden-hour construction skyline in silhouette (32636373). Photos: a pair of portable
  toilets in a field (9000867), a lone portable toilet in woodland (33424674), pink cleaning
  gloves with a sponge (4440530), a generic "CONTRACT" template document (7841410), a desk
  calendar (29509476), and a sunny festival crowd (17842575). **Brand-safety:** footage was
  screened for legible marks — construction/equipment clips showing brand logos (an excavator
  make, a power-tool make, an ad billboard, event ad-flags) and a "FIRM GRIP" work glove were
  rejected and either dropped to black beats or re-sourced clean. The one unavoidable exception is
  the small rental-company wordmark moulded on the portable toilets in the reveal (porta-potties
  always carry one); it is minor and incidental to the subject. No other legible company names or
  logos remain. **FLAG — same caveat as SanitationReel:** the "quietly strong model" claim is a
  qualitative characterisation of the industry (low competition, recurring servicing, reluctance
  as a barrier), not measured data, and no margin figure is given. Confirm the framing before
  publishing.
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
- **`PassiveReel`** — "What the fee buys" (a ~49s reel; the **A/B twin of `ActiveReel`** ("The
  average wins"), same active-vs-index myth-bust but opening and closing on questions rather than
  the flat myth + red card). The consensus is that a paid professional with research and tools
  should beat a free, do-nothing index — but over 15 years about 90% of active large-cap funds
  underperform the S&P 500, and it isn't luck evening out: stretch to 20 years and the failure rate
  climbs to ~92%. Fees and trading costs drag the experts below the index they chase, last stretch's
  winners rarely repeat, and after fees the average active dollar has to trail the market it
  collectively makes up — so the drag is structural, not bad picking; the index wins by being cheap
  and staying in. Question hook ("...nine out of ten pros lose to a strategy that takes zero
  skill?") and a rhetorical question close ("what exactly is the fee paying for?"); a ~1.5s
  post-hook pause (the hook holds through the silence before the reveal — house convention); two
  count-up `stat` beats (90% with a bar / 92%), one red "The drag is structural." `impact` card as
  the mid-tail thesis, and the question close on an empty office rather than the red card.
  Continuous cloned voiceover (+6% pace, normalized); durations on exact spoken-word timestamps;
  music normalized and mixed at 0.17. Entirely its own fresh footage under `public/passive/` — no
  asset shared with ActiveReel, IndexReel, StillReel, or any other reel. Media credits (Pexels, free
  license) — videos: a hand pointing at blurred chart monitors (39006630), abstract candlestick +
  volume charts (38209367), long-shadow figures walking (4698492), hands counting US bills
  (8134702), and an empty modern office (5483080). Photos: an analyst reviewing charts (7698817), a
  rising neon line chart (39212619), a team in a meeting (7643748), a phone calculator over a chart
  (35719588), an over-the-shoulder trading desk (39076656), a candlestick wall (29611783), and a
  minimalist empty desk (10567351). **Brand-safety:** footage was screened hard for legible marks —
  many candidates were rejected for readable tickers or brands (an "S&P 500/SPX/NDX" tablet, a
  "Binance/BNB-USDT" screen, HP-bezel + "TradingView.com"/"Bybit" home-office monitors, a "CASIO"
  wordmark, a "Captain America"/LinkedIn poster); the `v_charts` clip was cropped to remove a
  "Binance" header. Shipped assets carry no fund/brokerage/index brand, ticker, or legible company
  mark. **FLAG — real data, rendered as written:** the "~90% (15-yr) / ~92% (20-yr)
  active-underperformance" figures track the widely-cited SPIVA scorecard but shift by category,
  region and period ("nine in ten" is a round restatement) — confirm the latest SPIVA data before
  publishing. Same topic as ActiveReel (and overlaps IndexReel) — publish only one of the twins to
  a given audience.)
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
- **`WaitReel`** — "The cost of waiting" (a ~48s reel; the **A/B twin of `HeadstartReel`** ("The
  ten-year head start"), same $500/mo compounding story but opening and closing on questions rather
  than flat lines + the two figures). Two people save the same $500 a month at an assumed 7%
  return; the only difference is a ten-year head start. Begin at 25 and stop at 65 — about $240K of
  your own money grows, as an illustration, to roughly $1.3M. Begin at 35 instead: you pay in about
  $60K less and end near $610K — a ten-year delay roughly halves the result on barely less money
  in. Compounding pays growth on past growth, so the earliest dollars matter most; the first decade
  is closer to half the outcome than a quarter. Time did more of the work than the money — the gap
  was years, not effort. Question hook ("...why a ten-year head start can be worth more than the
  money itself?") and a rhetorical question close ("what is waiting to start actually costing?"); a
  ~1.5s post-hook pause (the hook holds through the silence before the reveal — house convention);
  two count-up `stat` beats ($1.3M / $610K, both on black), one red "It's closer to half." `impact`
  card as the mid-tail thesis, and the question close on a golden sunrise rather than the red card.
  Continuous cloned voiceover (+6% pace, normalized); durations on exact spoken-word timestamps;
  music normalized and mixed at 0.17. Media-dense by request: 19 of the 22 beats carry footage,
  with only 2 flat-black beats (the two count-up stats) plus the one red card. Entirely its own
  fresh footage under `public/wait/` — no asset shared with HeadstartReel or any other reel. Media
  credits (Pexels, free license) — videos: a moody coin macro (5651766), an abstract rising
  particle wave (29717425), a young woman at a window at golden hour (8091712), a ticking alarm
  clock (30084927), a misty countryside sunrise (29119700), a dark US-coin macro (5651768),
  sprouting seedlings (8522207), and a falling-sand hourglass (31112120). Photos: a US-dollar
  savings jar (7680554), an optimistic young man (37159572), a thoughtful older man (32063767), a
  fan of US $100 bills (10149619), a hand marking a calendar (7580934), a vintage hourglass
  (9771338), a B&W forked dirt road (18295331), a single folded US $1 bill (12584119), a bundle of
  US $20 bills (15633963), faceless clasped hands at rest (32167341), and a B&W tree-ring
  cross-section (33414459). **Brand-safety:** footage was screened for legible marks across two
  sourcing passes — candidates with foreign currency (euro/zloty coins), an Apple-logo laptop, and
  trading-screen tickers/brands (COIN360/TradingView/"FUNDS") were rejected and re-sourced; a
  bright cartoon growth-chart still was dropped as off-brand (that stat now renders on black), and a
  dessert/food still (originally on the "not a quarter" beat) was replaced with a moody US-cash
  macro. Shipped assets carry no bank/brokerage/fund brand, ticker, or legible company mark.
  **FLAG — illustrative figures:** the $500/mo, 7%, $240K/$60K-in, and $1.3M/$610K numbers are a
  compounding illustration (returns are not guaranteed and ignore inflation, taxes and fees) —
  present them as an example, not a promise, and confirm the math before publishing. Same topic as
  HeadstartReel (and the "$500/mo → $1.3M" beat in LifetimeReel) — publish only one twin to a given
  audience.)
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
- **`PremiumReel`** — "What the label buys" (a ~49s reel; the **A/B twin of `BrandReel`** ("Paying
  for the name"), same store-label vs name-brand premium myth-bust but opening and closing on
  questions rather than declaratively). You think the name brand is the better product — so why is
  the store label beside it often made in the same factory, to the same standard, for about a third
  less? The premium feels earned (a trusted name, a higher price; expensive reads as better), but
  often that store label is made to the same spec, sometimes on the same production line — so part
  of the premium pays for the label, not the contents; for shelf space and ads, not what's inside.
  It isn't true everywhere, which is the point: sometimes the premium is a real difference in
  quality, sometimes not, and the only way to know is to compare the actual items, not the names.
  The honest rule isn't "always buy cheap" — the label alone tells you nothing about what's inside;
  where the specs match the extra buys the name, where they don't it can be worth it. Question hook
  ("...made in the same factory, to the same standard, for a third less?") and a rhetorical
  question close ("what are you actually paying extra for?"); a ~1.5s post-hook pause (the hook
  holds through the silence before the reveal — house convention); one red "The label, not the
  contents." `impact` card as the mid-tail thesis, and the question close on footage. **Media-dense
  by request:** 18 of 21 beats carry footage, with only 2 flat-black beats plus the one red card.
  Continuous cloned voiceover (+6% pace, normalized); durations on exact spoken-word timestamps;
  music normalized and mixed at 0.17. Entirely its own fresh footage under `public/premium/` — no
  asset shared with BrandReel, LabelReel, or any other reel. Media credits (Pexels, free license) —
  videos: a faceless shopper with a basket (8801825), abstract factory machinery (32386600), a
  blank-can fill line (5532761), a woman examining a plain jar (5104005), a hand at a plain-bread
  shelf (4121749), and hands over receipts with a calculator (7710751). Photos: two blank white
  bottles (8015462), an amber pump bottle on stones (8789609), an upscale blank jar (18350286), a
  shopper with a blank list (8422697), blank cans in a rack (5532658), a blank billboard (16695395),
  a blurred warehouse aisle with a cart (5498024), a chef tasting (3338538), nested carts
  (11018212), a plain open tin (35972716), a blank label card (7967626), and a rustic artisan loaf
  (5732762). **Brand-safety (four sourcing passes — the hardest of the set, since the reel is about
  brands):** every readable brand, store sign, and foreign-language label was screened out —
  rejected among many: SPAR, S.PELLEGRINO, Carlsberg, Nescafé, Uncle Ben's, Cheetos/Lay's shelves, a
  Cyrillic produce case, a handwritten "LARANJA BAHIA" sign, semi-legible wine labels, and branded
  perfume bottles (Chanel/Tom Ford). A blank white price tag was also dropped for a white-on-white
  legibility clash and replaced with the dark amber bottle. Shipped assets carry no product/store/ad
  brand, wordmark, or readable/foreign label. **FLAG — general characterization:** "same factory /
  same standard / ~a third less" is broadly true in many private-label categories but varies by
  item and retailer; no specific brand or figure is asserted — same caveat as BrandReel. Same topic
  as BrandReel — publish only one twin to a given audience.)
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
- **`ThroneReel`** — "The old battlefield" (a ~56s reel; the **A/B twin of `NokiaReel`**
  ("When the game changes"), same Nokia-lost-the-smartphone case study but opening and
  closing on questions rather than declaratively, and carried on the recurring chess /
  "old battlefield" motif). Want to know how a company that sold one in every two phones
  ended up selling the whole business for parts? Nokia ruled mobile — nearly half of every
  phone sold at its peak — then clung to what had always won: it led handset share, owned
  world-class hardware, and out-manufactured every rival, so switching to an outside OS
  meant handing control to a partner and admitting its own software was finished, a
  concession a market leader almost never makes. The iPhone and Android moved the contest
  to software, where hardware share didn't help; in 2014 Nokia sold its phone business to
  Microsoft. When the basis of competition shifts, defending the old battlefield
  brilliantly is still how you lose. Question hook ("...selling the whole business for
  parts?") and a rhetorical question close ("what's shifting under the leaders now?"); a
  ~1.5s post-hook pause (the hook holds through the silence before the reveal — house
  convention); one count-up stat (~50% of phones sold at peak), one red "A former king,
  reduced to a sale." `impact` card near the tail, and the question close on footage
  (aerial night city) rather than the red card. **Media-dense by request:** 24 of 27 beats
  carry footage, with only 2 flat-black beats ("for parts?", "No leader concedes that.")
  plus the one red card. Continuous cloned voiceover (+6% pace, normalized); durations on
  exact spoken-word timestamps; music normalized and mixed at 0.17. Entirely its own fresh
  footage under `public/throne/` — no asset shared with NokiaReel or any other reel. Media
  credits (Pexels, free license) — videos: a hand moving a chess piece (33688494), a black
  rotary phone on books (7119842), an industrial press/assembly line (34775736), a finger
  tapping a device edge (853987), a phone photo-editing app UI (6962182), an aerial night
  cityscape (34690800), a night traffic overpass (8088611), and a logo-less dark phone
  face-down (9558109). Photos: a moody rotary phone dial (8715128), vintage green wall
  phones (35286031), a crystal chess king (15913924), phone circuit boards in trays
  (5554948), a worn keypad macro (29435052), a bare circuit board (6755078), a carved
  wooden throne chair (8674795), a white king over fallen chess pieces (29107599), a green
  CRT reading "GAME OVER" (35247741), the back of an unbranded dark-blue smartphone
  (10883732), an office handshake (12903031), a chessboard silhouette (112855), a dark
  analytics/share dashboard (27141307), a low-angle B&W skyscraper (35525661), hands
  signing a contract (5387258), and motherboard e-waste (38411739). **Brand-safety:** the
  reel names Nokia, iPhone, Android and Microsoft in voiceover as the subject/context, but
  the footage is deliberately generic — no device, screen, sign, or contract carries a
  readable brand mark or wordmark. Because a clean brand-free candybar *mobile* was not
  available, the "phone" beats lean on rotary/vintage phones, keypads, circuit boards and a
  chess "battlefield" motif; rejected during two sourcing passes: SONY, Motorola, PSION,
  HP, XEROX, Deloitte, Instagram and Chrome shots. Confirm no unintended readable brand
  marks before publishing. **Note — chess motif:** chess recurs across four beats (hook,
  "clung to what had always won", "software was finished", "basis of competition shifts")
  as the deliberate "old battlefield" through-line; each is a visually distinct shot.
  **Illustration / general characterization, not verified financials:** "~50% / one in two
  phones" is a rounded characterization of Nokia's peak share (verify the exact figure and
  scope — handsets vs smartphones differ), and the 2014 sale to Microsoft is a real event
  stated without a price; confirm the specifics before publishing. Same topic as NokiaReel
  and thematically close to BlackberryReel/GroundReel — schedule these apart and publish
  only one twin to a given audience.)
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
- **`PoolReel`** — "The rented platform" (a ~55s reel; the **A/B twin of `PalletReel`**
  ("The pallet pool"), same Brambles/CHEP wooden-pallet pooling moat but opening and
  closing on rhetorical questions rather than declaratively, and — unlike PalletReel —
  landing 348M only in the hook so the count-up stats don't repeat it). A wooden pallet
  looks worth almost nothing, yet one company owns ~348 million of them, rents them out
  endlessly, and never sells a single one: Brambles, through CHEP, runs a pool of pallets
  rented to makers and retailers, then collected, repaired and reissued for years. Renting
  beats selling because the same pallet earns many times over — and the pooling is the
  moat: a rival can build a pallet, but not the network of collection points (a fleet
  served by 750+ centres worldwide) that makes the pool work. That circular pool brought in
  ~$6.67B at about a 20% margin, ~$1.37B profit. Own the platform everything sits on, rent
  it forever, and a commodity becomes infrastructure. Question hook ("...rent them out
  endlessly, and never sell a single one?") and a rhetorical question close ("what else
  moves the entire economy while you've never once looked at it?"); a ~1.5s post-hook pause
  (the hook holds through the silence before the reveal — house convention); three count-up
  stats (750+ centres, $6.67B revenue, $1.37B profit), one red "A commodity became
  infrastructure." `impact` card as the mid-tail thesis, and the question close on footage
  (an aerial highway interchange) rather than the red card. **Media-dense:** 21 of 24 beats
  carry footage, with only 2 flat-black beats ("But not the network.", "It moves the whole
  economy.") plus the one red card. Continuous cloned voiceover (+6% pace, normalized);
  durations on exact spoken-word timestamps; music normalized and mixed at 0.17. Entirely
  its own fresh footage under `public/pool/` — no asset shared with PalletReel or any other
  reel. Media credits (Pexels, free license) — videos: a weathered pallet-slat close-up
  (11191776), a backlit warehouse forklift (31352807), a courier loading boxes from a van
  (6170600), a hand pallet-jack in a warehouse (6167610), hands repairing a wooden pallet
  (8447829), parcels moving on a conveyor into a truck (4473271), banknotes being counted
  (31750574), a high-bay warehouse aisle (4294436), and an aerial highway interchange
  (6543308). Photos: a
  stack of brown pallets in a yard (23625701), a tall racking aisle of palletized cartons
  (10697106), neatly stacked pallets (39275653), pallets gathered in a lot (635096), a
  cracked weathered pallet (10864361), an aerial pallet-recycling yard (9541900), a lone
  wooden pallet against a wall (33597923), a distribution-depot exterior (20021122), a
  top-down truck depot (35501716), a currency band on $100 bills (11624826), a dark
  candlestick trading chart (39228928), and paver blocks resting on a wooden pallet
  (37528609). **Brand-safety:** the reel names Brambles/CHEP in voiceover as the subject,
  but the footage is deliberately generic — plain brown WOODEN pallets, warehouses,
  forklifts, depots, cash and ports, with NO CHEP blue pool pallets and no readable brand
  marks, logos, or truck livery. Rejected during sourcing: blue/plastic pool pallets and an
  EPAL pallet-pool stamp; JUNGHEINRICH, HYSTER and International wordmarks; CASCADE, KLATT,
  Stertil, CASIO and an Amazon "prime" truck; and "DO NOT STACK" warning signage. A frame
  audit of the first render caught three more and they were re-sourced: a "Port Of
  Baltimore" crane sign (with the identifiable Key Bridge), a "TRAYECTO" trailer livery, and
  EVERGREEN/ONE/COSCO shipping-container brands — replaced with a brand-free highway
  interchange, a parcel conveyor, and a plain-van box load. Confirm no unintended readable
  marks before publishing. **Illustration / verify the financials:**
  ~348M pallets, 750+ centres, ~$6.67B revenue, ~20% margin and ~$1.37B profit are round
  characterizations for a recent year — confirm the exact numbers, currency (Brambles
  reports in US$) and reporting period against Brambles' filings before publishing. Same
  topic as PalletReel — publish only one twin to a given audience, and schedule apart.)
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
- **`NewCarReel`** — "The new-car tax" (a ~58s reel; the **A/B twin of `DepreciationReel`**
  ("The depreciation curve"), same new-car-depreciation case but opening and closing on
  rhetorical questions rather than declaratively). The most expensive year of a new car is
  the first: a $40K car is worth about $32K within twelve months, and nobody drove it into
  a wall. A new car sheds ~20% of its value in year one — faster than fuel, insurance or
  repairs — so driving it off the lot quietly spends ~$8K in year-one depreciation. The drop
  is steepest first: ~20% down after one year, ~60% after five, worth less than half its
  sticker before the warranty ends, most of the value leaving in the years you can't see it
  going. Which is why a two- or three-year-old car is a different deal — it has already taken
  the worst of the fall while keeping most of its life; the first owner paid for the new
  smell. New isn't a cost, it's a luxury; the depreciation curve is the real price tag.
  Question hook ("...the most expensive year of owning a new car?") and a rhetorical question
  close ("who really paid for that new smell?"); a ~1.2s post-hook pause (the hook holds
  through the silence before the reveal — house convention); three count-up stats ($8K
  year-one drop, then 20% and 60% "down" with animated bars for the curve), one red "the
  curve is the real price tag" `impact` card as the mid-tail thesis, and the question close
  on footage (a car driving away) rather than the red card. **Media-dense:** 22 of 25 beats
  carry footage, with only 2 flat-black beats ("Value you never see leave.", "Most vanishes
  before year three.") plus the one red card. Continuous cloned voiceover (+6% pace,
  normalized); durations on exact spoken-word timestamps; music normalized and mixed at 0.17.
  Entirely its own fresh footage under `public/newcar/` — no asset shared with
  DepreciationReel or any other reel. Media credits (Pexels, free license) — videos: a glossy
  new-car detail glide (33596417), mixed-color motorway traffic from above (12306835), a lone
  car down a tree-lined road (12768472), an aerial packed car lot (27365322), a luxury-car
  city glide (30254179), and a car driving away for the close (6942638). Photos: a
  brand-new 0-km instrument cluster (10296902), an aerial new-car stock lot (5982900), a
  key-and-handshake handover (7144212), a fuel filler (9216589), an empty open road to the
  horizon (10610187), a fan of banknotes (4968666), three fuel nozzles (31161428), a red car
  on a descending mountain road (32723685), a red descending candlestick chart (38343510), a
  second downtrend chart (38933569), a blank price tag on a dark ground (1111320), an
  odometer/speedo (2622122), a row of pre-owned cars (29566900), a clean leather
  interior (14667496), a car-key handover (7144201), and a new car with a red gift bow
  (38164944). **Brand-safety:** the reel is about cars in general, not any one make — footage
  varies makes/colors and avoids badge-dominated shots, dealership brand signs and readable
  plates, so no single brand is tied to "losing value". A frame audit of the first render
  caught three more and they were re-sourced: a "LODGY" model wordmark with a license plate
  and foreign parking signage, a readable Bentley grille badge, and a readable Turkish
  newspaper on a windshield — replaced with an empty open road, a red-bow new car (cropped
  above its readable tire/tagline text), and a blank price tag. Rejected during sourcing:
  Bentley, VW/GTI, Ford, Hyundai, Mercedes, Toyota, Nissan/Nismo, Honda, Mitsubishi, Polestar,
  Lexus, Ferrari and Tesla badges/signs; NISSAN/Infiniti/Hertz/Polaris dealer signage; and
  readable license plates and model wordmarks (a "TOYOTA" grille and an Audi Q3 with a plate
  were caught at full res and re-sourced). Confirm no readable brand badges before publishing. **Illustration, not
  verified data:** the $40K→$32K, ~20%/~60% depreciation curve and ~$8K year-one figure are
  round, illustrative numbers showing the shape of car depreciation — real depreciation
  varies widely by make, model, mileage, condition and market. Same topic as DepreciationReel
  — publish only one twin to a given audience, and schedule apart.)
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
- **`VaultReel`** — "Safe vs growing" (a ~55s reel; the **A/B twin of `GoldReel`** ("Store
  of value"), same gold-vs-stocks store-of-value case but opening and closing on rhetorical
  questions rather than declaratively). The asset people trust most to protect wealth is one
  of the worst at growing it: since 1926, a dollar in gold is worth about $5 today (after
  inflation) while the same dollar in stocks is worth about $1,081. Gold feels safe —
  tangible, ancient, climbs in the crises people remember — but both figures are real, and
  gold roughly held its value while stocks multiplied it hundreds of times. It isn't one
  lucky stretch: gold earns nothing (no dividend; its only return is what the next buyer
  pays), while stocks compound because the businesses underneath them reinvest and grow.
  Safe and growing are two different jobs; confusing them is the quiet, expensive mistake —
  over decades a store of value that barely grows just falls behind. Question hook ("...one
  of the worst at growing it?") and a rhetorical question close ("for a 30-year goal:
  something that sits, or something that compounds?"); a ~1.2s post-hook pause (the hook
  holds through the silence before the reveal — house convention); two count-up stats ($5
  gold vs $1,081 stocks), one red "Confusing them is expensive." `impact` card as the
  mid-tail thesis, and the question close on footage (coins on dark wood) rather than the
  red card. **Media-dense:** 20 of 23 beats carry footage, with only 2 flat-black beats
  ("Not one lucky stretch.", "just falls behind.") plus the one red card. Continuous cloned
  voiceover (+6% pace, normalized); durations on exact spoken-word timestamps; music
  normalized and mixed at 0.17. Entirely its own fresh footage under `public/vault/` — no
  asset shared with GoldReel or any other reel. Media credits (Pexels, free license) —
  videos: coins cascading into a vault (31750573), a rising trading chart on a laptop
  (30445101), wheatgrass sprouting from a pot (6596225), hands counting a growing cash stack
  (6266645), and coins on dark wood for the close (5253412). Photos: a "999.9 fine" gold bar
  on cash (29336323), gold coins on wood (7080470), numbered safe-deposit boxes (25913209),
  antique coins in a display case (28892477), a red/green "stock report" screen (7948045), a
  stack of 1000g gold bars (29336321), a heap of gold coins (9648243), a hand offering a
  gold ingot (7364046), an antique balance scale (15253932), a pile of crumpled banknotes
  (5909815), a team over business charts (6476254), factory press machines (31352672), two
  contrasting front doors (9226624), a snail (18671240), and an hourglass (6676154).
  **Brand-safety:** the reel names no company — footage is generic gold/finance imagery;
  chart/screen shots were chosen without a dominant readable company name or brokerage logo
  (a declining crypto-ticker screen, Bitcoin replica coins, and PERONI/GLOBAL INTERGOLD/MÜNZE
  ÖSTERREICH/PAMP-marked bullion were rejected during sourcing). Confirm no stray ticker
  reads as a single company before publishing. **Illustration / verify the figures:** the
  ~$5-vs-$1,081 (a 1926 dollar to today, real) contrast reflects widely-cited long-run
  return studies, but the exact endpoints depend on the index, dates, inflation series and
  assumptions — verify the specific numbers and cite the source before publishing; gold's
  real return in particular varies a lot by start/end date. Same topic as GoldReel — publish
  only one twin to a given audience, and schedule apart.)
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
- **`VendorReel`** — "The vendor trap" (a ~59s reel; the **A/B twin of `BordersReel`** ("The
  outsourced channel"), same Borders-outsourced-to-Amazon case but opening and closing on
  rhetorical questions rather than declaratively). A bookstore giant didn't just lose to a
  better rival — in the early 2000s Borders had no digital arm of its own and handed its
  entire online store to Amazon. Outsourcing looked like prudence, not surrender: e-commerce
  was lossmaking, Amazon's platform already worked, and the deal gave Borders an online
  presence for nothing. But what it quietly handed over was the customer and the purchase
  data — the two assets that would decide the next decade — so Borders never built its own
  online muscle, customers or data, and when shopping moved online for good it had nothing to
  stand on. It handed its digital future to a rival in 2001 and filed for bankruptcy in 2011.
  Don't outsource the future: give a rival the channel about to matter most and you hand over
  your customers and everything you'd have learned. Question hook ("...why did Borders hand
  its entire online store to Amazon, years before it collapsed?") and a rhetorical question
  close ("who's really building the business — them, or the vendor?"); a ~1.2s post-hook
  pause (the hook holds through the silence before the reveal — house convention); the punch
  is the 2001 → 2011 year contrast in big type (no count-up stat), one red "The two assets
  that decide it all." `impact` card as the mid-tail thesis, and the question close on
  footage (packing up) rather than the red card. **Media-dense:** 21 of 24 beats carry
  footage, with only 2 flat-black beats ("Borders built none of it.", "Nothing left to stand
  on.") plus the one red card. Continuous cloned voiceover (+6% pace, normalized); durations
  on exact spoken-word timestamps; music normalized and mixed at 0.17. Entirely its own fresh
  footage under `public/vendor/` — no asset shared with BordersReel or any other reel. Media
  credits (Pexels, free license) — videos: a moody library aisle (8567117), hands browsing a
  listings site on a laptop (8937986), a fulfillment warehouse with racking (16971219), and
  someone wrapping/packing an item (7855144). Photos: a business handshake (8441789), a
  second-hand bookstore aisle (2553427), a bookshop interior (15898141), a wall of books
  (29976380), an antique brass cash register (1581692), two executives in a boardroom
  (7433853), a red descending candlestick chart (38821173), a "shop now" e-commerce laptop
  (6214471), a shopper with a plain tote (6347550), a data-center server rack (37730212),
  bare emptied shelves (6580389), a contract being signed (8815843), a "sorry we're closed"
  sign (5414058), a dark road to the mountains (8532289), a motion-blur crowd of shoppers
  (14775626), a fictional analytics dashboard (38984817), and a freelancer at a laptop
  (3184459). **Brand-safety:** the reel names Borders and Amazon in voiceover only — all
  footage is generic, with no Borders or Amazon logos/boxes/signage and no other readable
  brand marks. Heavy screening was needed: rejected during sourcing were the literal
  Amazon.com storefront, Apple/Nike/Citi checkout screens, TESLA/TSLA/MRNA tickers, an
  adidas "closed" sign, Uncle Ben's and other product/mall-brand signage (Mackage, kate
  spade, BOSS), foreign-language book titles, and boxes with readable supplier logos +
  plates. Confirm no stray brand marks before publishing. **Real companies/dates — verify:**
  the Borders outsourcing-to-Amazon deal (2001) and Borders' bankruptcy (2011) are real
  events rendered as written; double-check the specifics and framing before publishing. Same
  topic as BordersReel — publish only one twin to a given audience, and schedule apart.)
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
- **`GroundReel`** — "When the ground shifts" (a ~58s reel on BlackBerry, whose strength became
  its trap. A company went from owning the smartphone to selling almost none a few years later, by
  defending the one thing that made it great: in the late 2000s its physical keyboard and secure
  email were the whole advantage — and the whole trap. When the iPhone arrived it called the
  all-touchscreen phone a fad serious pros would never want, and that looked like discipline, not
  denial — the keyboard and secure email were exactly why enterprises had standardised on it and
  customers said they wanted them; chasing a touchscreen meant walking away from the buyers who
  actually paid. Until those buyers changed their minds. Touchscreens and apps became the entire
  market, the differentiator turned into ballast, and share went from number one to a rounding
  error — a company that once defined the smartphone vanished from it. The lesson: your strength
  can be the trap; the hardest feature to drop is the one that made you. Continuous voiceover
  (cloned voice, +6% pace, normalized) with a short ~1.5s pause after the hook (the hook holds
  through the silence before the reveal — house convention); scene durations on its exact
  spoken-word timestamps; black beats for the punch-lines, one red "Your strength is the trap."
  `impact` card as the mid-tail thesis, and a rhetorical question close ("when the ground shifts…
  is it quietly holding you in place?") on footage (an aerial of cracked, shifting ground) rather
  than the red card. This is the **A/B twin of `BlackberryReel`** ("The strength trap"), which
  opens and closes declaratively; GroundReel opens on a question ("…to selling almost none a few
  years later?") and closes on one, with entirely its own fresh footage — no asset is shared with
  BlackberryReel or any other reel. Media credits (Pexels, free license) — videos: a suited exec
  on a mobile phone (6285683), a finger tapping a modern touchscreen (6611938), a corporate team
  meeting (7643614), a subway carriage of commuters on their phones (37689041), and an aerial over
  a cracked dry riverbed (30124780). Photos: a physical-keyboard BlackBerry-style phone on a desk
  (1474237), a bright modern office meeting (36733421), an extreme closeup of a phone keypad
  (216581), a glossy touchscreen closeup (5703424), a boardroom of executives (8134067), a business
  handshake (9870223), a weathered anchor chain (38201429), a lone obsolete keypad phone on rocky
  ground (10785779), a row of discarded old phones (270257), and a hand holding an obsolete
  cellphone (14127221). **Illustration of a real company (BlackBerry):** the broad arc —
  late-2000s business-phone dominance, dismissing the touchscreen, keyboard/secure-email lock-in,
  and collapse to a rounding error — is rendered as written and accurate in outline; no specific
  market-share percentages or financials are shown, and imagery carries no BlackBerry or competitor
  logos or legible brand marks.)
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
- **`DragReel`** — "The certain drag" (the same fund-fee case) — the
  **question-hook / question-close A/B twin of `FeeReel`.** Same math ($100K, 30
  years, 7% gross, a 0.05% index fee vs ~1%, a ~$180K gap on identical market
  exposure), but this cut opens on a question ("What does a 1% fee cost?") with a
  ~1.2s post-hook pause, adds the angle that the expensive fund probably won't
  even win (~90% of active funds trail the index over 15 years), and closes on a
  question ("What is that 1% actually buying?"). ~55.7s, media-dense (20 media /
  2 black / 1 red thesis card "The fee is certain / The upside isn't"). Its own
  footage under `public/drag/` — no asset shared with FeeReel or any other reel.
  Media credits (Pexels, free license) — videos: an animated rising chart
  (5849656), a clock face with a sweeping hand (7034335), a person reviewing
  paperwork at a desk (6100900, closing beat). Photos: a magnifying glass over a
  balance sheet (7821675), a banded stack of $100 bills (11341267), a hand
  dropping a coin (35877869), an aerial forked road (8976192), a single coin on
  wood (28103488), a hand on a stack of coins (6328873), gold coins spilling from
  a jar (20843727), a short pile of gold coins (19673920), a brass balance scale
  (6077861), a full-year wall calendar (6193140), a seedling in soil (17497507),
  an empty numbered running track (6033939), a bar-chart illustration under a
  magnifier (5842061), an hourglass with running sand (10180294), a hand turning
  a dial (8180073), golden eggs in a nest (6625217), and a hand signing an
  approval form (955393). **Unverified figures — verify before publishing:** the
  $755K / $574K / ~$180K outcomes are illustrative compounding on a flat 7% gross
  with the stated fees over 30 years, and "~90% of active funds trail the index
  over 15 years" tracks the SPIVA-style finding — sanity-check the specifics.
  **Twin note:** same topic as `FeeReel` — publish only one twin to a given
  audience, scheduled apart.
- **`MonthsReel`** — "Cash buys time" (why ~half of new US businesses close
  within five years — it's rarely a bad idea; the top causes are no market need
  (~35%) and running out of cash (~38%); cash is really time/runway, and every
  extra month is another chance for a wrong-for-now idea to find its market).
  ~48s, question hook ("Why do half fail in five years?") with a ~1.2s post-hook
  pause, red thesis card "Cash isn't safety / It's time" mid-tail, and a question
  close ("Short of ideas, or months?"). Media-dense (17 media / 2 black / 1 red).
  Its own footage under `public/months/`. Media credits (Pexels, free license) —
  videos: an empty modern office (8347237), a hand holding a compass (8028798), a
  founder looking out a window (5637953, closing beat). Photos: a closed shop's
  roller shutter (10984775), a lightbulb (269318), a sticky-note planning wall
  (29521529), a 3D-printed gear prototype (9242916), an empty cafe (31711911), an
  empty wallet (910122), an hourglass beside coin stacks (13111767), shuttered
  market stalls (31599622), a jar with the last coins spilling out (6863247), a
  fuel gauge on empty (12996956), a person working late (30215686), a hand-drawn
  month calendar (1059381), a dawn over the ocean (30923399), and a long empty
  highway (28271326). **Unverified figures — verify before publishing:** "~half
  of new businesses close within five years" (BLS-style survival data) and the
  ~35% no-market-need / ~38% ran-out-of-cash split (CB-Insights-style
  post-mortems) are widely cited but approximate — the causes overlap in the
  source data (a failure can be counted under both), so they're "top reasons,"
  not a clean partition. Sanity-check before publishing.
- **`WantedReel`** — "Why startups fail" (A/B twin of `MonthsReel`, myth-bust
  framing: hindsight rewrites a failed startup into "the idea was obviously bad,"
  but studied up close the top two causes are no market need ~35% and running out
  of cash ~38% — being beaten by a rival ranks lower; survival is confirming real
  demand and protecting the runway that buys time to learn; ideas are cheap,
  proven demand and cash are the whole game). ~47.4s, question hook ("Want to know
  why most startups fail?") with a ~1.2s post-hook pause held on the hook beat,
  red thesis card "Rarely / the idea" mid-tail, and a question close ("What were
  those failed founders really missing?"). Media-dense (20 media / 2 black / 1
  red). Its own footage under `public/wanted/`. Media credits (Pexels, free
  license) — videos: shoppers buying at a market (5701054), a founder reflecting
  at a window (5534473, closing beat). Photos: a founder working late (12899129),
  a glowing lightbulb (3217852), an empty pocket with a few coins (7927424),
  stacked unsold boxes (20187073), a rear-view mirror (8811463), soft-focus
  newsprint (5138716), a magnifier over a metrics sheet (7947749), an empty cafe
  (7934522), a short stack of coins (19266676), an arm-wrestle (7322494), a dark
  empty office (9331582), unsold cardboard stock (12354555), an empty piggy bank
  (4146006), a chalkboard of equations (6238050), a long empty road (9175181), a
  wall of blank sticky notes (6991363), a team collaborating (3184327), a green
  seedling (1002703). **Unverified figures — verify before publishing:** the ~35%
  no-market-need / ~38% ran-out-of-cash split (CB-Insights-style post-mortems) is
  widely cited but approximate and the causes overlap in the source data (a
  failure can be counted under both). **Theme note:** same why-startups-fail case
  as `MonthsReel` — publish only one of the two to a given audience.
- **`MajorReel`** — "What you study" (a myth-bust: two people with the same
  degree can end up millions apart in lifetime earnings because the field of
  study — the major — not the credential, sets the path; the gap between the
  highest- and lowest-paying majors runs into the millions, wider than the gap
  between degree and no degree). ~55s, question hook ("Two people, same degree —
  millions apart?") with a ~1.2s post-hook pause, red thesis card "The field /
  Not the diploma" mid-reel, and a question close ("Which decision actually
  mattered?"). Media-dense (18 media / 2 black / 1 red). Its own footage under
  `public/major/`. Media credits (Pexels, free license) — videos: students
  crossing a campus lawn (7683346), a packed lecture hall (37451040), a person
  walking to a fork in a path (16739537, closing beat). Photos: silhouetted
  graduates at sunset (8093042), an unequal coin-stack gap (730647), a
  ribbon-tied diploma (12794087), a stack of plain-spine books (11911071), a pay
  envelope with cash (11327902), a numbered finish-line track (32255498),
  chemistry flasks (8539752), an engineer over blueprints (6285159), a welder
  (22863131), a tape measure (4919433), a heap of banded dollar bundles (259132),
  a ladder against sky (30696818), a student's hands writing (7128758), a
  blank-arrow signpost (2801126), and an orange cut in half (6517121).
  **Unverified claims — verify before publishing:** "same degree, millions
  apart," "an engineering bachelor's can out-earn the typical master's," "some
  bachelor's paths trail a high-school diploma," and "the highest-vs-lowest major
  gap runs into the millions, wider than degree vs no degree" track widely-cited
  lifetime-earnings-by-major research (Georgetown CEW-style) but are directional
  — sanity-check the specifics before publishing.
- **`TuitionReel`** — "The tuition trap" (A/B twin of `MajorReel`: where
  `MajorReel` argues "what you study matters more than that you studied," this cut
  leads on the COST side — real, inflation-adjusted tuition is about 3x its 1980
  level while real wages barely moved, so a summer job that once funded a year of
  college now takes years of debt; that gap became the trillions in student debt,
  and a degree is an investment whose price and return both swing hugely by field
  — borrow $30K for an $80K job vs $120K for a $40K one). ~42.3s, question hook
  ("Why won't a summer job cover tuition now?") with a ~1.2s post-hook pause, a 3x
  count-up stat, red "Trillions / Student debt" card mid-tail, and a question
  close ("What is a degree worth now?"). Media-dense (16 media / 2 black / 1 red).
  Its own footage under `public/tuition/`. Media credits (Pexels, free license) —
  videos: a rising paper-cutout bar chart (5839005), an aerial of diverging trails
  (32600359), a graduate on steps (7712279, closing beat). Photos: a gothic
  university quad (29737876), a flat sea horizon (14635958), a blank receipt roll
  (9755391), a lawnmower at golden hour (6728919), a student with a loaded
  backpack (5538594), an empty lecture hall (356065), a typewriter typing "salary
  check" (5198201), a person counting cash over financial papers (6693644),
  ribbon-tied diplomas (7942430), a brass balance scale (13208025), a confident
  professional (36819484), a person stressed over bills (6964351), and a hand
  signing a form (955394). **Illustrative figures — verify before publishing:**
  "~3x real tuition since 1980," "real wages barely moved," "trillions in student
  debt," and the $30K/$80K vs $120K/$40K ROI pairs are directional, widely-cited
  framing, not a single audited dataset. **Theme note:** same college-value case
  as `MajorReel` — publish only one college reel to a given audience.
- **`ReturnReel`** — "The real ROI" (a second A/B twin on college value, distinct
  from both `MajorReel` ("what you study") and `TuitionReel` ("the tuition trap" /
  cost side): this cut leads on the INVESTMENT framing — a degree is a price AND a
  return; the price tripled (real tuition ~3x its 1980 level) while pay didn't, so
  the gap became trillions in student debt, but the part that matters is that the
  return swings hugely by field — borrow $30K for an $80K job vs $120K for a $40K
  one; same word on the diploma, opposite outcome). ~39.7s, question hook ("The
  same diploma — smartest money, or the worst?") with a ~1.2s post-hook pause, a
  3x count-up stat, red "Trillions / Student debt" card mid-reel, and a question
  close ("Which number are you actually buying?"). Media-dense (14 media / 2 black
  / 1 red). Its own footage under `public/return/`. Media credits (Pexels, free
  license) — videos: a 3D bar chart climbing to 3x (39570107), an aerial of
  diverging forest trails (35132715), a graduate waving a cap (8060928, closing
  beat). Photos: a 3D hand holding a "$" coin (8817677), a blank price tag
  (7966577), two opposite road arrows (8629452), a lone $1 bill (6590627), an
  empty lifeguard chair (4705023), a young man head-in-hands (33715989), a
  confident professional (36712868), an overwhelmed young worker (12911952), US
  bills stacked on books (5632406), blurred lecture-hall seats (1423655), and a
  calculator over a portfolio worksheet (6801682). **Illustrative figures — verify
  before publishing:** "~3x real tuition since 1980," "trillions in student debt,"
  and the $30K/$80K vs $120K/$40K ROI pairs are directional, widely-cited framing,
  not a single audited dataset. **Theme note:** same college-value case as
  `MajorReel` and `TuitionReel` — publish only one college reel to a given
  audience.
- **`ClarityReel`** — "Go time" (a fast crypto-regulation NEWS reel — a format
  departure from the evergreen case studies: Congress doesn't need to pass the
  crypto bill; the regulator just stopped waiting. The Senate blocked the Clarity
  Act (Sept 2026), but eight days later CFTC chair Mike Selig said "it's go time"
  and made five moves with zero votes — tokenised US stocks cleared onto public
  blockchains, wallet apps routed to regulated derivatives, two draft rulebooks at
  the White House. The catch: not spot — spot still needs Congress; so money moved
  to perps and two tokens ran. Framed Congress 0 / CFTC 5). ~51s. **By the
  client's explicit direction this reel breaks two house conventions:** a hard-cut
  declarative hook ("Congress doesn't need to pass the bill." — no withheld-subject
  question, so no post-hook pause) and a non-question CTA close ("Keep your eyes
  open.") instead of the rhetorical question. Red "It's go time" quote card
  mid-reel; three staggered `lines` beats carry the chain (every exchange /
  stablecoin / token), the 8-days / 5-moves / 0-votes stat, and the three
  regulatory actions. The "Congress 0 / CFTC 5" payoff is a caption contrast, not
  a literal two-bar chart (not a composition primitive). Media-dense (15 media / 1
  black / 1 red); the close lands on a green "go" traffic signal. Its own footage
  under `public/clarity/`. **Backgrounds fully re-sourced — all-new footage per
  beat; the script, upbeat voice, music and the red/black brand layer are
  unchanged.** Media credits (Pexels, free license) — videos: a broadcast
  interview set (6883837), a blurred trading screen of scrolling figures
  (7579577), a traffic light on green (3150346, closing beat). Photos: the US
  Capitol at dusk (3369102), a green neon glow (10196788), an abstract glowing
  network (14314638), a gavel on its block (5668481), an empty foggy road
  (14744912), a legislative chamber (32266781), an abstract split light-streak
  (15303326), a spiral desk calendar (11333728), a checklist pad (6192131),
  rising green candlesticks (39212618), candlesticks pulling back off a high
  (39494584), and a bronze balance scale (5668882). **TIME-SENSITIVE / UNVERIFIED —
  verify before publishing:** every claim (the Clarity Act Senate vote and its
  Sept-2026 date, the "Mike Selig / it's go time" CNBC quote, the five moves, and
  the Lighter ~$5.40 ATH / Hyperliquid ~2%-off figures) is dated news supplied and
  confirmed by the author; it is rendered as written and must be re-checked against
  primary sources at publish time, as crypto prices and regulatory status move
  daily. Being a dated news reel, it also has a short shelf life — publish
  promptly. **Voice:** this reel alone uses a distinct upbeat voice cloned from a
  client-supplied reference (energetic settings), not the shared house cloned
  voice used on every other reel.
- **`BellReel`** — "No bell" (an A/B TWIN of ClarityReel off the same news event —
  the Clarity Act dying, Sept 2026 — but the SEC's 24-hour-trading / "no bell"
  angle instead of ClarityReel's CFTC/perps angle. Thesis: Wall Street doesn't
  need Congress to change the rules — it just needs the market to stop closing.
  The stock market runs on one bell, 9:30–4:00, weekdays only — 6.5 hours a day,
  the other 17.5 locked. The Senate killed the Clarity Act; eight days later the
  SEC granted an innovation exemption putting tokenised US stocks on public
  blockchains — and a blockchain has one thing the NYSE doesn't: no bell. The
  catch: it's an exemption, not a law — five years, then back on the table. Payoff:
  the winner is whoever owns the rails that never switch off. Close: the bell still
  rings at four, it just doesn't mean anything anymore.) ~55s. **Like ClarityReel,
  this NEWS reel breaks two house conventions by client direction:** a hard-cut
  declarative hook ("Wall Street doesn't need Congress." — no withheld-subject
  question, so no post-hook pause) and a non-question CTA close ("Keep your eyes
  open."). Red "No bell" thesis card mid-reel; two staggered `lines` beats (every
  stock / trade / pension; tokenized stocks / public chains / zero votes). **Adds
  a new two-bar `chart` scene kind** — the client asked for the chart explicitly:
  the exchange's 6.5h against the chain's 24h, the taller chain bar glowing red,
  resolving to a ~3.7× stat. Media-dense (17 media / 2 black / 1 red); the close
  lands on a night-city skyline. Its own footage under `public/bell/`. Media
  credits (Pexels, free license) — videos: a moving market-data ticker (7579561),
  a busy office floor of people at desks (8865787), POV down railroad tracks
  (19555268), an aerial night cityscape (28464336, closing beat). Photos: a
  financial-district skyline (10786530), an empty after-hours office (12837026), a
  brass counter bell (5378701), an analog wall clock (5624978), the US Capitol
  (24376267), a neoclassical federal facade (38503730), a red approval check-mark
  (8850721), heavy industrial chain links (35930741), an hourglass (33795954), a
  dark server room (1148820), a rising line chart (39334005), glowing fiber-optic
  cables (17194840), and a masonry bell tower (38240712). **TIME-SENSITIVE /
  UNVERIFIED — verify before publishing:** the Clarity Act Senate vote and its
  Sept-2026 date, the SEC innovation-exemption / tokenised-US-stocks / 5-year,
  zero-vote moves, and the 6.5h-vs-24h / ~3.7× framing are dated news supplied by
  the author; rendered as written and to be re-checked against primary sources at
  publish time. **Voice:** uses the same distinct upbeat cloned voice as ClarityReel
  (energetic settings), not the shared house cloned voice.
- **`CageReel`** — "The cage" (the fourth fast NEWS reel in the series; **REPLACES
  MemoReel** at the client's direction). Topic: Nvidia ships tools to "cage"
  agentic AI on the same morning OpenAI reports a model "escaped its container,"
  read against the year's AI-IPO frenzy. Structure follows the client's QUESTION /
  STORY / ANSWER / CTA script. Thesis: nobody builds a fence the day the horse
  bolts — unless they knew it would; the box (containment) isn't the product
  anymore, the lock is, and Nvidia, which sells the chips that run the models, now
  sells the cage too. Beats: hook question ("Why cage AI agents the morning one got
  out?"), Monday before the bell, a model escaped its container, a black "not a hack
  / the model did it" beat, a stat card (2 tools to cage rogue agents), the
  fence/horse-bolts line, a black "unless they knew" beat, Dario Amodei ("slow
  down") and Donald Trump ("go faster") shown on their real faces, "the model waits
  for neither," a staggered market `lines` card (Dow -0.3% / S&P -0.4% / Nasdaq
  -0.9%), a 3x tech-selloff stat, a ~$2T Anthropic-IPO stat, "every IPO priced on
  one thing," "the model stays in the box," "so why cage it that morning," "the box
  isn't the product," a solid-red "The lock is" card (mid-tail, not the ending),
  "it sells the chips that run the models," "now it sells the cage too," "whoever
  sells the cage wins," the CTA question "Would you buy an AI IPO?", and the CTA
  close "Tell me below." ~58s. Hard-cut declarative hook (no post-hook pause).
  Inherits MemoReel's evolved style: a FOUR-MODE rotating text enter/exit animation
  (pop / slide / type / blur, cycled across beats). Two stat cards + one staggered
  `lines` card + a mid-tail red card. Tempo ADAPTIVE and CAPPED (~1.14 here) to keep
  the dense script under the 60s cap. Media-dense (20 media / 2 black / 1 red);
  closes on a night skyline. **The two named public figures ARE shown via real
  portraits:** Dario Amodei (Wikimedia Commons, **CC BY 2.0** — credit "Kimberly
  White / TechCrunch, CC BY 2.0" on publish) and Donald Trump (Wikimedia Commons,
  US-government work, public domain). The Pexels b-roll is brand-safe footage
  sourced clean AND frame-audited from the final render; **four beats use
  CLIENT-SUPPLIED GIFs** (see below). Media credits — Pexels (free license): a
  high-end GPU / graphics card (7859350), data-center aisle (4508751), red circuit
  board (6636500), market-data line chart (39398848), downtrend candles (39353380),
  columned building at night (6357114), dark price screen (10653885), wooden crate
  (7841145), fiber-optic light streams (8640331), circuit-board macro (1448561),
  rusted padlock (5795580), buy-app on phone (6347702), night skyline (18441167),
  and an abstract neural-network video (33164273). **Four beats use CLIENT-SUPPLIED
  GIFs** (uploaded by the client via Giphy links; the client owns the editorial +
  licensing decision): a cat ringing a service bell on "before the bell," a goat
  leaving a barn stall on "nobody builds a fence" (this clip carries a burned-in
  "@akash sidhu 123" creator watermark), a skeptical side-eye reaction on "so why
  cage it that morning," and an auction paddle ("300") film clip on "whoever sells
  the cage wins." **These are COPYRIGHTED third-party meme/film clips — used at the
  client's direction and risk, NOT brand-safe/licensed stock; they are the client's
  to clear before publishing** (see `used_ids.txt` for the Giphy ids). Public-figure
  portraits (Wikimedia Commons): Dario Amodei — TechCrunch Disrupt 2023 (CC BY 2.0,
  attribution required); Donald Trump — Official Presidential Portrait (2025, public
  domain). **TIME-SENSITIVE / UNVERIFIED —
  ELEVATED RISK, verify before publishing:** this reel states as fact that an
  agentic model "escaped its container," that Nvidia shipped two tools to "cage
  rogue agents" the same morning, that Amodei "spent months saying slow down" and
  "dined with Trump" (who "says go faster"), specific one-day index moves (Dow
  -0.3% / S&P -0.4% / Nasdaq -0.9%), a "3x" tech selloff, and a ~$2T Anthropic IPO
  valuation. All of it is dated news supplied by the author and rendered as written;
  because it names individuals (Nvidia, OpenAI, Anthropic, Dario Amodei, Donald
  Trump) and attributes actions/quotes, it carries real reputational/legal risk if
  any detail is wrong — EVERY claim (names, events, attributions, numbers) must be
  checked against primary sources before this publishes. **Voice:** uses the same
  distinct upbeat cloned voice as the rest of the series.
- **`ChequeReel`** — "One in twenty" (the fifth fast NEWS reel in the series). NEW
  topic: the $500 "Working Families Obamacare Refund" cheques. Thesis: this isn't a
  healthcare refund — it's a refund of the **HealthCare.gov website user fee**.
  Insurers pay that fee (now ~2.5% of premiums); enrolment held up, the fund
  overflowed into a **~$500M surplus**, and insurers pass the fee to full-price
  customers — so only full-price buyers (over 400% of the poverty line, no subsidy)
  get $500 back, while subsidized and state-exchange enrollees (mostly blue states)
  paid nothing into HealthCare.gov and get no cheque, and the people whose premiums
  doubled when the enhanced subsidies expired get nothing. ~950k cheques to 30
  states, each signed by Donald Trump, posted ~5 weeks before the midterms. Follows
  the client's QUESTION / STORY / ANSWER / CTA script; close is a CTA question ("Did
  you get one? Which state?"). **HARD-CONDENSED from ~420 words to ~205 to fit the
  sub-60s cap (client's call — some fee/subsidy detail trimmed).** Tempo ADAPTIVE
  and CAPPED (atempo ~1.33 — fast/dense) — total 1797 frames = ~59.9s. Captions are
  verbatim-leaning with big **number cards** for the CARD callouts ($500 / 950,000 /
  30 states; the $500M surplus; and the $500 ← $500M ← 950,000 payoff). 4-mode
  rotating text animation (pop/slide/type/blur). Media-dense (13 media / 2 black / 1
  red; a solid-red "Not a flaw. By design." card mid-tail, closing on a ballot box).
  **Donald Trump is shown via his public-domain official portrait** (Wikimedia
  Commons, US-government work; same portrait as CageReel). All b-roll is brand-safe
  Pexels footage sourced clean AND frame-audited from the final render — note the
  hook uses US cash in a black envelope as a brand-safe stand-in for a literal
  cheque (clean cheque shots were unusable), and the "website fee" beat uses a
  generic web form, NOT the real HealthCare.gov or any insurer logo. Media credits —
  Pexels (free license): cash-in-envelope (4386368), US map on asphalt (19784164),
  White House at night (31474056), generic web form (7709273), fanned cash
  (6590643), hands exchanging cash (4968384), suburban house (4832530), state
  capitol dome (17581789), person with a claim form (6919757), generic invoice
  (7688524), hands counting cash (4475469), "VOTE" ballot box (5935749).
  Public-figure portrait: Donald Trump — Official Presidential Portrait (2025,
  public domain). **TIME-SENSITIVE / UNVERIFIED — ELEVATED RISK, verify before
  publishing:** heavy factual + political claims — 19M Obamacare enrollees; $500
  cheques to ~950,000 people in 30 states signed by Donald Trump ~35 days before the
  midterms; the "Working Families Obamacare Refund" framing; the HealthCare.gov
  user-fee rate (~1.5%→2.5%); a ~$500M surplus; the >400%-of-poverty / ~$63k
  eligibility; the subsidized / state-exchange / "mostly blue states" exclusions;
  and the claim that those whose premiums doubled get nothing. All supplied by the
  author and rendered as written; EVERY figure, date, name and causal claim must be
  checked against primary sources before this publishes. **Voice:** uses the same
  distinct upbeat cloned voice as the rest of the series.
- **`MicronReel`** — "The cycle" (the sixth fast NEWS reel in the series). NEW topic:
  Micron's Q4 earnings **reaction**. It beat on revenue and profit, raised its
  outlook, and the CFO called margins a "new floor" that climbs from there — yet the
  stock **fell ~2%** the next morning. Thesis: a floor is only good news if you
  weren't already paying for the ceiling. The overlooked signals — margins now climb
  only on "more moderate" price increases (the rises are slowing), and the CEO's
  **26 customer agreements locking ~35% of revenue through 2030** (insurance against
  the memory boom-and-bust) — read as the company quietly conceding it's a cycle,
  exactly the scenario a stock **up ~280% this year** was priced to rule out. Follows
  the client's QUESTION / STORY / ANSWER / CTA script; close is a CTA question ("Up
  280%. Still holding?"). **HARD-CONDENSED from ~370 words to ~150 to fit the sub-60s
  cap (client's call — the named analyst, the exact compensation line, and other
  earnings-call detail trimmed).** Tempo ADAPTIVE and CAPPED; the cut brought it
  under the cap so it runs a comfortable atempo ~1.14 — total 1725 frames = ~57.5s.
  Captions are verbatim-leaning with big **number cards** for the CARD callouts (−2%;
  26 agreements / 35% through 2030; +280%). 4-mode rotating text animation
  (pop/slide/type/blur). Media-dense (14 media / 2 black / 1 red; a solid-red "Not
  bad news. A cycle." card mid-tail, closing on a grasping hand in darkness).
  **No faces are shown for the named CFO, CEO or analyst** — clean, clearly-licensed
  photos of corporate execs/analysts are unreliable, so those beats use generic
  b-roll (a lone microphone, etc.) with role labels. All b-roll is brand-safe Pexels
  footage sourced clean AND frame-audited from the final render — note brand-free
  RAM/DRAM sticks don't exist on Pexels, so the hook uses a generic dark chip macro,
  and the "still holding?" beat uses a grasping hand (a recognizable Robinhood app
  screen was rejected). Media credits — Pexels (free license): chip macro (36169773),
  LED ticker board (12960362), revenue-report page (7947847), lone microphone
  (12092846), falling candlestick screen (38905596), flattening chart (5834243),
  contract document (7841411), storm over a skyline (30792466), rising green chart
  (39494586), architectural oculus (32655950), trader's multi-screen desk (31650949),
  empty boardroom (17739892), chessboard (8336038), grasping hand in darkness
  (6141336). **TIME-SENSITIVE / UNVERIFIED — ELEVATED RISK, verify before
  publishing:** market-moving, attributed claims — Micron beat on revenue/profit and
  raised guidance; a ~2% next-day drop; the CFO's "new floor" / "more moderate price
  increases" remarks; the CEO's "26 agreements / ~35% of revenue through 2030"; the
  stock up ~280% YTD; and SK Hynix / Samsung named as rivals. All supplied by the
  author and rendered as written; EVERY figure, quote, attribution and date must be
  checked against primary sources (the actual earnings call / filings) before this
  publishes. **Voice:** uses the same distinct upbeat cloned voice as the rest of the
  series.
- **`DieselReel`** — "The tap" (the seventh fast NEWS reel in the series). NEW topic:
  China suspending October diesel/fuel **exports** while the world is short of
  diesel — energy as leverage. Thesis: a barrel in a Chinese tank beats a barrel on
  a ship; at home it holds prices down through winter, abroad it's leverage — and
  five weeks before the US midterms, China doesn't need to sell the fuel, it just
  needs the world to know it could. Signals: refiners suspend exports (except
  HK/Macau) with no restart date; China the biggest refining hub, which in August
  exported more than before "the Iran war," then nothing; **oil back above $100**, US
  diesel at **5-year lows**, the East Coast down **~a third**; Trump asked Xi for more
  a week earlier; Beijing cites domestic supply (Kpler: **~20M barrels short**); Asian
  diesel margins jumped to **~$75/bbl**. Follows the client's QUESTION / STORY /
  ANSWER / CTA script; close is a CTA question ("Does China turn the tap back on?").
  **HARD-CONDENSED from ~225 words to ~160 to fit the sub-60s cap (client's call).**
  Tempo ADAPTIVE and CAPPED; comfortable atempo ~1.20 — total 1725 frames = ~57.5s.
  Verbatim-leaning captions + big **number cards** for the CARD callouts ($100+ oil /
  5-yr low / EC −33%; −20M barrels; $75). 4-mode rotating text animation. Media-dense
  (13 media / 1 black / 1 red; a solid-red "It won't sell. It wants you to know it
  could." card mid-tail, closing on a pipeline-to-horizon). **Donald Trump shown via
  his public-domain 2017 official portrait** (Shealah Craighead / White House) on the
  "Trump asked Xi" beat — a deliberately DIFFERENT Trump photo from CageReel/ChequeReel's
  2025 portrait. All b-roll brand-safe Pexels footage, sourced clean AND
  frame-audited from the final render — generic refineries/tanks/ports/pipelines, no
  oil-company logos or national flags on infrastructure (the one flag is the American
  flag on the US-midterms beat). Media credits — Pexels (free license): fuel-pump
  nozzles (11116153), refinery at night (10407689), port cranes at dusk (4940270),
  refinery complex (10407692), shut-off valve (7616004), oil drums (3151717), tank
  farm (9407369), pressure gauge (16679540), tanker at sea (33333666), lone fuel pump
  at night (34056286), American flag (30962230), pipelines to the horizon (18784617).
  Public-figure portrait: Donald Trump — Official Presidential Portrait (2025, public
  domain). **TIME-SENSITIVE / UNVERIFIED — ELEVATED RISK, verify before publishing:**
  contested geopolitical + market claims — China/PetroChina suspending October fuel
  exports with no restart date (except HK/Macau); China as the biggest refining hub;
  oil above $100; US diesel at 5-year lows and the East Coast down ~a third; a
  Trump-Xi request a week prior; Beijing's domestic-supply rationale and the Kpler
  ~20M-barrel figure; ~$75/bbl Asian diesel margins; and US-midterms timing. All
  supplied by the author and rendered as written; EVERY figure, date, name and causal
  claim must be checked against primary sources before this publishes. **Voice:** uses
  the same distinct upbeat cloned voice as the rest of the series.
- **`JobsReel`** — "Trading the Fed" (the eighth fast NEWS reel in the series). NEW
  topic: the September US jobs report missing badly (**29k vs ~90k expected**) — yet
  **stocks rose**. Thesis: stocks aren't trading the economy, they're trading the Fed
  — a weak jobs print means no rate hike, no hike means yields fall, and falling
  yields lift stocks, so the market called a bad report "relief." Signals:
  unemployment up to **4.2%**, July revised to a loss; stocks and bonds up, oil down;
  the Fed had been hiking, markets priced **~69% odds** of another hike with the
  **10-year at ~5.3%** and bonds in their **worst quarter since 1994**; then the weak
  print cut hike odds to **~22%** within an hour. Payoff: good news is bad news, bad
  news is good news — until the day it's just bad. Follows the client's QUESTION /
  STORY / ANSWER / CTA script; close is a CTA question ("Is the Fed done?").
  **HARD-CONDENSED from ~190 words to ~165 to fit the sub-60s cap (client's call).**
  Tempo ADAPTIVE and CAPPED; comfortable atempo ~1.24 — total 1725 frames = ~57.5s.
  **Verbatim captions** on the text beats + big **number cards** for the CARD callouts
  (4.2% / July −10k; 69% / 10-yr 5.3% / worst since 1994; 69%→22%). 4-mode rotating
  text animation. Media-dense (13 media / 1 black / 1 red; a solid-red "Bad news is
  good news." card mid-tail, closing on a gavel). **No faces** — the actors here are
  institutions (Wall Street, the Fed, Treasury), not named individuals. All b-roll is
  brand-safe Pexels footage sourced clean AND frame-audited from the final render — no
  "Federal Reserve" seal/wordmark, no exchange logos, no tickers or app UIs (the Fed
  beat is a generic columned facade; the bonds beat is the "U.S. TREASURY" engraving
  on currency). Media credits — Pexels (free license): "HIRING" chalkboard (5598328),
  office clock (35758724), layoff with a box (7581040), green/red chart (39558511),
  columned facade (28198537), U.S. Treasury engraving (4386155), worker with head in
  hands (36713398), abstract line chart (39415759), hands pulling strings (5566169),
  balance scale (8431786), relief/exhale portrait (5294105), storm over a skyline
  (4028941), judge's gavel (6077189). **TIME-SENSITIVE / UNVERIFIED — ELEVATED RISK,
  verify before publishing:** market-moving figures — a 29k September jobs print vs
  ~90k expected; unemployment 4.2%; July revised to −10k; stocks/bonds up and oil down
  on the day; ~69% prior hike odds; the 10-year at ~5.3%; bonds' worst quarter since
  1994; and hike odds dropping to ~22% within an hour. All supplied by the author and
  rendered as written; EVERY figure, date and causal claim must be checked against
  primary sources before this publishes. **Voice:** uses the same distinct upbeat
  cloned voice as the rest of the series.
- **`SpacexReel`** — "The belief" (the ninth fast NEWS reel in the series). NEW topic:
  SpaceX's IPO prospectus claiming a **~$28.5 trillion** addressable market, of which
  rockets are ~**1%**. Revised to a riddle hook ("what do you call a rocket company
  where rockets are 1%?") answered "an AI company with a rocket for a logo." Thesis:
  the $28.5T isn't a market, it's a story big enough that the number stops mattering —
  SpaceX isn't selling launches, it's selling a claim on the entire digital economy;
  when a company's market is ~**1,000× its revenue**, the market isn't the point, the
  belief is. Breakdown:
  launch ~**$370B**, Starlink ~**$1.6T**, AI ~**$26.5T** (most of it, ~**$22.7T**, a
  single "enterprise applications = the entire digital economy" line) against
  ~**$12.5B** actual H1 revenue; Musk's ~**$1T-by-2030** target vs Wall Street's
  **<$400B**, at ~**18× next-year sales**. Follows the client's QUESTION / STORY /
  ANSWER / CTA script; close is a CTA question ("Space company or AI company?").
  **HARD-CONDENSED to ~170 words to fit the sub-60s cap (client's call).** Tempo
  ADAPTIVE and CAPPED (atempo ~1.33 — dense numbers) — total 1790 frames = ~59.7s.
  **Verbatim captions** on the text beats + big **number cards** for the CARD callouts
  ($28.5T / 1%; $370B / $1.6T / $26.5T; $22.7T; $12.5B; $1T vs $400B / 18×). 4-mode
  rotating text animation. Media-dense (12 media / 1 black / 1 red; a solid-red "Not
  the market. The belief." card mid-tail, closing on a silhouette under the stars).
  **No faces** — Elon Musk is named but not shown (clean licensing for his photos is
  unreliable; the "Musk's target" beat is a number card). All b-roll is brand-safe
  Pexels footage sourced clean AND frame-audited from the final render — generic
  rockets/space/data/cosmos, NO SpaceX/Starlink logos or branded Falcon/Starship
  livery (the agents rejected every branded rocket/Dragon shot). Media credits —
  Pexels (free license): rocket ascending (11086520), financial statement (7658352),
  space hardware over Earth (586072), digital circuit lattice (30547618), pennies +
  ledger (7063762), Mars-like planet (20376408), nebula (3180831), red stage
  spotlights (5389623), Earth at night (30596268), toy rocket (7355365), figure in a
  cavern (4275891), silhouette under the Milky Way (5194003). **TIME-SENSITIVE /
  UNVERIFIED — ELEVATED RISK, verify before publishing:** contested claims about
  SpaceX's (private) IPO prospectus — the ~$28.5T TAM and its launch/Starlink/AI
  breakdown; the ~$22.7T "enterprise applications / digital economy" line; ~$12.5B H1
  revenue; a "largest opportunity in human history" quote; Musk's ~$1T-by-2030 target;
  a Wall Street <$400B estimate; and an ~18× sales multiple. All supplied by the
  author and rendered as written; EVERY figure, quote and attribution must be checked
  against primary sources (the actual prospectus / filings) before this publishes.
  **Voice:** uses the same distinct upbeat cloned voice as the rest of the series.
- **`LandlordReel`** — "The landlord" (the tenth fast NEWS reel; an **A/B TWIN of
  SpacexReel** — same company, adjacent thesis, different angle). Topic: SpaceX is
  about to own **1M+ Nvidia GPUs** and rents them to AI companies — it's really an
  **AI-compute landlord**, not a rocket company (yet). Signals: ~**780k** GPUs running
  + ~**440k** switching on (over **1.2M** chips); **Anthropic & Google** pay ~**$26B/yr**
  to rent SpaceX's computers, one startup (Reflection) ~**$150M/mo**; last year
  ~**$18.7B** revenue but a ~**$4.9B loss**; the plan it's funding is **data centres in
  orbit, first launches 2028**. Thesis: SpaceX can't afford its own future yet, so it
  does the one thing that pays today — buy chips, rent them to AI firms — a landlord
  saving up for the space company. Follows the client's QUESTION / STORY / ANSWER /
  CTA script; close is a CTA question ("Would you buy the landlord to get the
  rocket?"). **HARD-CONDENSED to ~165 words to fit the sub-60s cap (client's call).**
  Tempo ADAPTIVE and CAPPED (atempo ~1.26) — total 1725 frames = ~57.5s. **Verbatim
  captions** on the text beats + big **number cards** for the CARD callouts (780k /
  +440k; 1.2M; $26B/yr & $150M/mo; $18.7B rev / −$4.9B loss; 2028). 4-mode rotating
  text animation. Media-dense (12 media / 1 black / 1 red; a solid-red "It's a
  landlord." card mid-tail, closing on a figure under the stars). **No faces.** All
  b-roll is brand-safe Pexels footage sourced clean AND frame-audited from the final
  render — generic compute/rockets/buildings, **NO Nvidia/SpaceX logos or branded
  rocket livery** (the agents rejected every branded chip/rocket shot). Media credits —
  Pexels (free license): red GPU board (6385893), server-rack aisle (5408005), rocket
  engine cluster (30467757), "house for rent" sign (8962327), counting cash (7680565),
  accounting statement (6779714), deep-space probe (12244791), rocket booster upright
  (18015296), rocket liftoff (5420670), server fiber cables (2881233), apartment
  high-rise (35758486), figure under the Milky Way (16563643). No asset is shared with
  SpacexReel or any other reel. **TIME-SENSITIVE / UNVERIFIED — ELEVATED RISK, verify
  before publishing:** contested claims about SpaceX — ~780k Nvidia GPUs running plus
  ~440k more (1.2M+ chips); Anthropic/Google renting compute for ~$26B/yr and a startup
  ~$150M/mo; ~$18.7B revenue and a ~$4.9B loss last year; and an orbital-data-centre
  plan with first launches in 2028. All supplied by the author and rendered as written;
  EVERY figure, name and causal claim must be checked against primary sources before
  this publishes. **Voice:** uses the same distinct upbeat cloned voice as the rest of
  the series.
- **`TeslaReel`** — "The bar" (the eleventh fast NEWS reel in the series). NEW topic:
  Tesla's stock jumped ~**5%** on a Q3 where it **delivered fewer cars**. Thesis: the
  stock didn't rise on growth — it rose because Tesla beat a **lowered Wall Street
  bar**; a beat on falling expectations masks stagnation. Signals: **486,532**
  deliveries vs **497,099** a year earlier (down ~2%) but the stock opened **+5%**;
  the Street wanted ~**461,974** (Goldman ~435k) so Tesla "beat" by ~**25,000**; Q3
  2023 was about the same (three years, **zero growth**); ~**98%** of deliveries are
  still two models (Model 3 & Y), everything else ~**8,295**; energy storage missed at
  **13.7 GWh** vs **15.9** expected; the stock is still ~**−21% YTD**. Answer: it just
  fell less than the forecast, and the bar keeps dropping. Follows the client's
  QUESTION / STORY / ANSWER / CTA script; close is a CTA question ("Beat or
  decline?"). **HARD-CONDENSED to ~155 words to fit the sub-60s cap (client's call).**
  Tempo ADAPTIVE and CAPPED (atempo ~1.19) — total 1725 frames = ~57.5s. **Verbatim
  captions** on the text beats + big **number cards** for the CARD callouts (486,532
  vs 497,099; Street 461,974 / beat 25k; 98% / 8,295; 13.7 vs 15.9 GWh; −21% YTD).
  4-mode rotating text animation. Media-dense (13 media / 1 black / 1 red; a solid-red
  "The bar keeps dropping." card mid-tail, closing on a forest crossroads). **No
  faces, and NO Tesla vehicles or logos** — the reel names Tesla, so all footage is
  generic (distant car lots with no legible badges, a generic battery bank not a
  Powerwall/Megapack, vintage VW Beetles for the "two models" beat). Media credits —
  Pexels (free license): car-storage lot (3864110), welding sparks (29976478), rows of
  SUVs (29566896), green up-chart (39315993), trading screens (33000152), flat road
  (24916070), battery bank (36594160), downtrend chart (39415760), low hurdle
  (3763878), treadmill (5411023), lowered barrier arms (15488504), vintage Beetles
  (16664158), forest crossroads (19049357). **TIME-SENSITIVE / UNVERIFIED — ELEVATED
  RISK, verify before publishing:** market-moving figures about Tesla, and names
  Goldman — Q3 deliveries 486,532 vs 497,099 (−2%) with the stock +5%; a Street
  estimate ~461,974 and Goldman ~435k (beat by ~25k); ~zero growth vs Q3 2023; ~98%
  two models / ~8,295 other; energy storage 13.7 vs 15.9 GWh; and ~−21% YTD. All
  supplied by the author and rendered as written; EVERY figure, name and causal claim
  must be checked against primary sources before this publishes. **Voice:** uses the
  same distinct upbeat cloned voice as the rest of the series.
- **`BalticReel`** — "The sea lane" (the twelfth fast NEWS reel in the series). NEW
  topic: Russia threatening nuclear war over **Kaliningrad**. Thesis: it isn't about
  the exclave, it's about the **water** around it — closing the Baltic wouldn't
  blockade a province, it would blockade **Russia's seaborne oil**; the nuclear note
  is the price tag Moscow is putting on that sea lane. Beats: a written note to NATO
  threatening its "entire arsenal, nuclear weapons included" if Kaliningrad is
  isolated; Kaliningrad as a Russian exclave between Poland and Lithuania, ringed by
  NATO; NATO's "defensive alliance, stop the threats" reply; a senior European
  official calling it the **first such threat since the Cold War**; **three countries
  / three days** of statements + simulated nuclear-capable missile launches near the
  EU; analyst **Nikolai Sokov** naming a Baltic blockade as the real fear; and **"a
  large share"** of Russia's seaborne oil leaving via the Baltic (**no percentage** —
  rendered as "a large share" per client; NOT an invented statistic). Follows the
  client's QUESTION / STORY / ANSWER / CTA script; close is a CTA question ("Who
  blinks first?"). **HARD-CONDENSED to ~160 words to fit the sub-60s cap (client's
  call).** Tempo ADAPTIVE and CAPPED (atempo ~1.23) — total 1725 frames = ~57.5s.
  **Verbatim captions** on the text beats + number/geo cards (Poland/Lithuania/NATO;
  3 countries / 3 days). 4-mode rotating text animation. Media-dense (13 media / 1
  black / 1 red; a solid-red "The price: nuclear." card mid-tail, closing on two
  opposing chess kings). **No faces.** All b-roll is brand-safe Pexels footage sourced
  clean AND frame-audited — generic missiles/warships/tankers/maps, **NO national
  flags, military insignia, readable ship names, or leaders' faces** (the agents
  rejected many named/flagged ships and marked hardware). Media credits — Pexels (free
  license): fallout-warning sign (12171952), wax-sealed note (35241517), missile over
  sea (7327336), Europe pushpin map (8828587), aerial tank column (12748681), radar
  antenna (33144955), missile launch (11086515), warship silhouette (18959229), oil
  tanker (27275198), open sea (20125592), Corinth-Canal chokepoint (38863293),
  container-ship lane (12530458), chess standoff (16222424). **TIME-SENSITIVE /
  UNVERIFIED — ELEVATED RISK, verify before publishing:** this reel makes grave,
  contested geopolitical claims and concerns NUCLEAR brinkmanship — a written Russian
  note to NATO threatening its "entire arsenal, nuclear weapons included" over
  Kaliningrad; NATO's reply; a "first since the Cold War" characterisation attributed
  to a senior European defence official; "three countries / three days" of embassy
  statements and simulated nuclear-capable missile launches near the EU; analyst
  Nikolai Sokov's named assessment; and the (unquantified) claim that a large share of
  Russia's seaborne oil ships through the Baltic. All supplied by the author and
  rendered as written; because it attributes statements to real institutions and
  individuals, EVERY claim must be checked against primary sources before this
  publishes. **Voice:** uses the same distinct upbeat cloned voice as the rest of the
  series.
- **`MortgageReel`** — "Priced in" (the thirteenth fast NEWS reel in the series). NEW
  topic: **UK fixed mortgage deals collapsing while the Bank of England HELD the base
  rate.** Thesis: a mortgage isn't priced on **Threadneedle Street**, it's priced in
  the **bond market** — and gilt yields have repriced on **Gulf-war** risk, so a UK
  household's fixed rate is now effectively a bet on the Gulf. Beats: the average
  5-year fix hitting **6.00%** (2-year **5.98%**), first time in three years;
  **Barclays raising fixed rates 4×** and six more lenders **3× each** in September;
  fixed deals under 5% collapsing from **1,494 to 9** (a **~99% wipeout** Moneyfacts
  called "brutal"); the base rate **unchanged**; gilt yields climbing since the Gulf
  war; **~5,000,000 households** rolling off fixed deals by **2028**; **diesel over
  £2/litre** and **energy +4%** the same week; close on "the bond market is pricing a
  war." Follows the client's QUESTION / STORY / ANSWER / CTA script; close is a CTA
  question ("When does your fix end?"). **HARD-CONDENSED to ~160 words to fit the
  sub-60s cap (client's call).** Tempo ADAPTIVE (atempo ~1.08) — total 1725 frames =
  ~57.5s. **Verbatim captions** on the text beats + number cards (rates; x4/x3 lender
  hikes; 1,494→9; 5,000,000 by 2028; £2 / +4%). 4-mode rotating text animation.
  Media-dense (11 media / 2 black / 1 red; a solid-red "A 99% wipeout." card mid-reel,
  closing on house-keys over a blurred "SOLD" sign). **No faces, no bank / estate-agent
  / fuel brand marks.** All b-roll is brand-safe Pexels footage sourced clean AND
  frame-audited — generic terraced houses, keys on blank paperwork, logo-free office
  towers, abstract declining charts, a generic candlestick screen, a cash handover, an
  aerial housing estate, a logo-free diesel nozzle, a columned financial facade, an oil
  platform silhouette (the agents rejected Bitcoin/Binance/bank-name trading screens).
  Media credits — Pexels (free license): terraced houses (20703515), keys on paperwork
  (34135038), glass office tower (8704354), declining chart (39368611), candlestick
  screen (7947742), cash handover (10400836), aerial estate (9716237), diesel nozzle
  (20500734), neoclassical facade (30849138), oil-platform silhouette (15973758),
  key-over-SOLD-sign (8470837). **TIME-SENSITIVE / UNVERIFIED — ELEVATED RISK, verify
  before publishing:** this reel states specific, dated UK financial figures (avg 5-yr
  fix 6.00% / 2-yr 5.98% on a named Monday; Barclays 4× and six more lenders 3× each in
  September; sub-5% deals 1,494 → 9; a 99% wipeout; Moneyfacts' "brutal"; the base rate
  held; ~5m households off fixed deals by 2028; diesel over £2/litre; energy +4%) and
  draws a causal link from the Gulf war to UK gilt yields and mortgage pricing. All
  supplied by the author and rendered as written; because it names real lenders and
  makes a market-causation claim tied to an ongoing conflict, EVERY figure and the
  causal claim must be checked against primary sources before this publishes.
  **Voice:** uses the same distinct upbeat cloned voice as the rest of the series.
- **`CondoReel`** — "The name" (the fourteenth fast NEWS reel in the series). NEW
  topic: **Miami's branded residences** — hotel-licensed luxury condo towers. Thesis:
  the hotel **doesn't build or own the tower**; it **licenses its name**, sets the
  standards, and takes a fee the developer passes on to the buyer. **Nobu earns a
  royalty on a tower it never owned; you earn a lobby.** The best business in Miami
  real estate isn't building condos — **it's lending them a name.** Beats: **48**
  branded towers finished / **55** under way (the **#2** market on earth); **50%+** of
  South Florida's new luxury condos carry a hotel name (Nobu / Four Seasons /
  Anantara); the amenity flex (**75 floors / 100,000 sq ft / helipad**); the licensing
  mechanism "the brochure skips"; and **Savills' ~30% "name" premium.** Follows the
  client's QUESTION / STORY / ANSWER / CTA script; close is a CTA question ("Would you
  pay the premium?"). **HARD-CONDENSED to ~165 words to fit the sub-60s cap (client's
  call).** Tempo ADAPTIVE (atempo ~1.17) — total 1725 frames = ~57.5s. **Verbatim
  captions** on the text beats + number cards (48/55/#2; 50%+; 75/100,000/helipad;
  +30%). 4-mode rotating text animation. Media-dense (12 media / 2 black / 1 red; a
  solid-red "It's lending them a name." thesis card mid-tail, closing on a penthouse
  view). **Brand names are editorial** (spoken + shown as text, because the reel is
  about them); **the footage is brand-free** — generic luxury towers, skylines,
  balconies, a rooftop pool, construction, a contract signing, cash/keys, an opulent
  lobby, a scale model, fine dining, a brass door-pull, a penthouse — **no hotel /
  developer / agency logos, no identifiable branded-building signage, no identifiable
  faces** (anonymous / back-turned figures only; the agents rejected visible currency
  faces, "APA HOTEL" signage, and engraved real-name plaques). Media credits — Pexels
  (free license): glass tower (5362096), skyline+cranes (35482397), balcony facade
  (5556585), rooftop pool (14546230), construction (2323080), contract signing
  (7504780), house keys (333837), marble lobby (695193), tower scale model (35630647),
  fine dining (30469688), brass door-pull (36404052), penthouse view (8572163).
  **UNVERIFIED — verify before publishing:** states specific counts (48 built / 55 under
  way; "second biggest market on earth"; 50%+ of South Florida's new luxury condos
  branded; a 75-storey tower; 100,000 sq ft of amenities + a helipad) and attributes a
  **~30% price premium to Savills**. The ~30% figure is a **commonly-cited** number
  used here **per the client's call, NOT a verified quote** — confirm Savills' exact
  figure and all the counts against primary sources before this publishes. **Voice:**
  uses the same distinct upbeat cloned voice as the rest of the series.
- **`FeldbergReel`** — "The snow line" (the fifteenth fast NEWS reel in the series).
  NEW topic: **a ski resort (Feldberg, Germany's Black Forest) making artificial snow
  on a mountain whose springs are drying up** — climate risk vs. sunk-cost denial.
  Thesis: **Feldberg is paying to delay a decision** (snowmaking spread across every
  lift ticket); France's **Métabief paid once to make it** (ran the numbers, set an end
  date, stopped replacing lifts). **Only one of them knows what its mountain is worth.**
  Beats: **12** lifts by **1968**; the **36-year ranger's** "I have no idea"; **4**
  winters with no Christmas snow; lifts closed **22 March**; the resort's answer —
  **100 snow guns / 2 reservoirs**; but snow needs water and Feldberg's springs are
  drying up; a **2,200-resort study** (**53%** high snow-risk at +2 degrees, **98%** at
  +4); and **Métabief's 2030–2040** end date. Follows the client's QUESTION / STORY /
  ANSWER / CTA script; close is a CTA question ("Which bet would you take?").
  **HARD-CONDENSED to ~165 words to fit the sub-60s cap (client's call).** Tempo
  ADAPTIVE (atempo ~1.15) — total 1725 frames = ~57.5s. **Verbatim captions** on the
  text beats + number cards (12/1968; 4 winters; 22 March; 100 guns; 53%→98%; Métabief
  2030-2040). 4-mode rotating text animation. **Closer VARIED** — no red card this reel
  (after three in a row); lands on a mountain-summit "what it's worth" beat + CTA.
  Media-dense (13 media / 2 black / 0 red). **No resort / lift-brand logos, no readable
  piste/trail signage, and no identifiable faces** — no photo stands in for the named
  ranger; people are anonymous, distant, or back-turned (the agents rejected
  TechnoAlpin / Alpe d'Huez / SHRED / IWC-LAAX / GONDOLA-signed shots and semi-visible
  faces). Media credits — Pexels (free license): snow cannon (14552167), chairlift
  (3651800), ridge figure (38891560), bare slope (15512911), closed lift (30092587),
  snow guns (19777497), dried lakebed (30678632), alpine panorama (4081283), disused
  lift station (29251880), turnstiles (6631838), chalet rooftops (35814411), summit
  (34613802), road fork (20061882). **UNVERIFIED — verify before publishing:** names a
  real ranger (**Achim Laber**, ~36 yrs) and two real resorts (Feldberg, Métabief) and
  cites specific figures (12 lifts by 1968; 4 winters without Christmas snow; lifts
  closed 22 March last winter; 100 snow guns + 2 reservoirs; a 2,200-resort study
  finding 53% high snow-risk at +2° warming and 98% at +4°; Métabief's 2030–2040 end
  date). All supplied by the author and rendered as written; confirm the figures, the
  attributed quotes, and the study against primary sources before this publishes.
  **Voice:** uses the same distinct upbeat cloned voice as the rest of the series.
- **`WesterlyReel`** — "The curtain" (the sixteenth fast NEWS reel in the series). NEW
  topic: **a hotel building a second, pricier hotel inside itself** (the Aruba Hilton's
  "The Westerly") — price discrimination on infrastructure you already own. Thesis: at
  **93%** occupancy there are no more nights to sell, so the only way to grow is to
  **sell the same night for more** — take a slice of rooms, wrap them in a name and a
  **velvet rope**, and charge boutique prices on resort infrastructure already paid for.
  **It isn't a new hotel; it's a new price for the old one.** Beats: a **1959** resort
  averaging **93%** occupancy; the owner (Milton Berlinski) not wanting to touch it;
  **$100M+** for a second hotel inside the first (The Westerly, **161 rooms**, swim-up
  suites); same beach/pools/spa plus "a door the other guests can't walk through";
  Hilton's Americas president on skipping the infrastructure; a Skift editor's "a
  curtain built out of drywall"; the same playbook at **3 more resorts**. Follows the
  client's QUESTION / STORY / ANSWER / CTA script; close is a CTA question ("Would you
  pay for the drywall?"). **HARD-CONDENSED to ~170 words to fit the sub-60s cap
  (client's call).** Tempo ADAPTIVE (atempo ~1.19) — total 1725 frames = ~57.5s.
  **Verbatim captions** on the text beats + number cards (1959/93%; $100M+; 161 rooms;
  3 more resorts). 4-mode rotating text animation. Media-dense (13 media / 2 black / 1
  red; a solid-red "A new price for the old one." thesis card, closing on a hotel
  corridor). **Brand names are editorial** (spoken + shown as text); **the footage is
  brand-free** — generic luxury resorts/interiors, **no hotel/airline logos, no
  identifiable famous hotel exteriors, no readable door/room numbers, no identifiable
  faces** (anonymous / distant / back-turned only; the agents rejected a visible face,
  Burj Al Arab / Marina Bay, named hotels and an Air Canada curtain). Media credits —
  Pexels (free license): resort tower (36477913), beach club (20194835), suite
  (12652920), scaffolding (2079615), rooftop pool (2149421), ornate door (1591240),
  resort aerial (30114340), drapery curtain (15679390), resort pool (4034153), packed
  beach (2880505), concierge bell (7821343), velvet rope (18573164), hotel corridor
  (18117654). **UNVERIFIED — verify before publishing:** names a real owner (Milton
  Berlinski) and real brands (Hilton, The Westerly, Skift, and del Coronado / Grand
  Wailea / Punta Cana as "three more resorts") and cites specific figures (open since
  1959; ~93% occupancy; $100M+ spend; 161 rooms; statements attributed to Hilton's
  Americas president and a Skift editor). All supplied by the author and rendered as
  written; confirm the figures and attributed quotes against primary sources before
  this publishes. **Voice:** uses the same distinct upbeat cloned voice as the rest of
  the series.
- **`TariffReel`** — "One in six" (the seventeenth fast NEWS reel in the series). NEW
  topic: **can tariffs pay for a $5,000 cheque to every American adult?** No — not by
  the government's own numbers. Thesis: tariff revenue covers about **$1 in $6** of the
  ~**$1.25T** bill; the other five get **borrowed**, at the highest long rates in 24
  years, into an economy where **prices are already rising** — the cheque comes once,
  the debt is forever. Beats: Trump's Oval-Office "**hundreds of billions** / **$5,000**
  to every adult"; the arithmetic (every adult × $5,000 ≈ **$1.25 trillion**); FY25
  tariff revenue **$195B** (**1 in 6**); net tariff revenue **negative** in some months;
  the rest borrowed — **$40T** debt, 30-yr yield **5.6%** (a 24-yr high); 2020-21 cheques
  preceded **1.4% → 9.1%** inflation; inflation today **3.4%** with rates rising. Follows
  the client's QUESTION / STORY / ANSWER / CTA script; close is a CTA question ("Would
  you take the five thousand?"). **HARD-CONDENSED to ~160 words to fit the sub-60s cap
  (client's call).** Tempo ADAPTIVE (atempo ~1.16) — total 1725 frames = ~57.5s.
  **Verbatim captions** on the text beats + number cards ($5,000; $1.25T; $195B / 1 in
  6; net negative; $40T / 5.6%; 1.4%-9.1%; 3.4%). 4-mode rotating text animation.
  Media-dense (13 media / 1 black / 1 red; a solid-red "Cheque: once. Debt: forever."
  thesis card, closing on a cheque). **No politicians / no identifiable faces** — Trump
  is named in the VO only; the Oval-Office beat is the **White House**, not his face.
  **Footage is brand-free** — US Capitol / White House / Treasury / a columned govt
  facade (public landmarks, not brands), cash, a pizza-as-fraction, a red down-chart, a
  rising chart, a single dollar, a certificate, a blurred grocery aisle, a generic
  template cheque — **no bank/app/ticker logos, no identifiable faces** (the agents
  rejected prop money, PERMANENT MARKER / BULLS / PRADA marks, bank signage, and a
  cheque with real routing numbers). Media credits — Pexels (free license): Capitol
  (37298774), White House (7017147), crowd-from-behind (30043599), cash pile (32553545),
  pizza fraction (30504707), red down-chart (39463634), Treasury (14955941), rising chart
  (7947993), govt facade (6534073), one-dollar bill (29484267), certificate (18449922),
  grocery cart (5498233), template cheque (6862442). **TIME-SENSITIVE / UNVERIFIED —
  verify before publishing:** attributes a specific statement to **Donald Trump** (Oval
  Office, ~28 Sep) and cites specific figures (every adult × $5,000 ≈ $1.25T; FY2025
  tariff revenue ~$195B ≈ 1 in 6; net tariff revenue negative in some months / SCOTUS-
  ordered refunds; US debt past $40T in Aug; 30-yr yield ~5.6%, a 24-yr high; 2020-21
  cheques then 1.4%→9.1% inflation; inflation ~3.4%). All supplied by the author and
  rendered as written; confirm the quote and every figure against primary sources before
  this publishes. **Note:** shares the "government cheque + one-in-N ratio" device with
  `ChequeReel` ($500 Obamacare refund, one-in-twenty) but is a distinct story ($5,000
  tariff dividend, one-in-six, "can tariffs pay? no"). **Voice:** uses the same distinct
  upbeat cloned voice as the rest of the series.
- **`DiggerReel`** — "The last star" (the eighteenth fast NEWS reel in the series). NEW
  topic: **Tom Cruise's film "Digger" opens to ~$8M** — a historic box-office bomb — and
  what it says about the **death of the movie star**. Thesis: **Cruise was never the
  product, the franchise was**; take away the jet / mission / sequel number and you have
  an original film that cost ~$180M. **Hollywood doesn't pay for stars anymore; it pays
  for what it has already sold once.** Beats: Digger (Cruise, from Warner Bros) in
  **3,321** cinemas; an **$8M** North-America open / **5th** place / **$20M** worldwide;
  ~**$2,400** per cinema; a ~**$180M** budget where experts wanted a **$40M** open and
  Warner hoped for **$18M**, but it got **$8M**; a projected **$150-200M** loss; an Anne
  Hathaway thriller opening to **$32M** the same weekend (**4× Cruise**); and Warner's
  year (**$438M** domestic vs **$1.8B** a year earlier). Follows the client's QUESTION /
  STORY / ANSWER / CTA script; close is a CTA question ("Who's the last real movie
  star?"). **HARD-CONDENSED to ~170 words to fit the sub-60s cap (client's call).** Tempo
  ADAPTIVE (atempo ~1.26) — total 1725 frames = ~57.5s. **Verbatim captions** on the text
  beats + number cards (3,321; $8M/$20M; $2,400; budget $180M/$40M/$8M; -$200M; $32M;
  $438M vs $1.8B). 4-mode rotating text animation. Media-dense (13 media / 1 black / 1
  red; a solid-red "It pays for what sold once." thesis card, closing on an empty
  spotlight). **Brand / film / actor names are editorial** (spoken + shown as text);
  **the footage is brand-free** — empty/packed cinemas, a marquee, a box office, a movie
  camera, a film strip, a clapperboard, an oil-rig silhouette, a jet silhouette, a gold
  star bokeh, a spotlight beam — **no studio or cinema-chain logos, no real movie posters
  / titles / stills, and no Cruise / Hathaway / celebrity faces** (no identifiable faces
  at all; the agents rejected a "WALCHE" venue sign, a screen showing content, and
  readable marks). Media credits — Pexels (free license): empty seats (3709370), "TEATR"
  marquee (37557083), box office (35260661), empty row (22908923), movie camera
  (34516665), red down-chart (38808474), packed audience (7513412), film strip (32728014),
  oil-rig silhouette (34389695), jet silhouette (18903553), clapperboard (29508639), gold
  star bokeh (1556654), spotlight beam (4722576). **TIME-SENSITIVE / UNVERIFIED — verify
  before publishing:** names real people (Tom Cruise, Anne Hathaway), a real studio
  (Warner Bros) and films (Digger, Verity) and cites specific figures (3,321 cinemas; $8M
  NA open / 5th / $20M worldwide; ~$2,400 per cinema; $160-180M budget; ~$40M expert
  minimum; Warner hoped $18M; projected $150-200M loss; Hathaway thriller $32M; Warner's
  year $438M vs $1.8B). All supplied by the author and rendered as written; confirm every
  figure and attributed claim against primary sources before this publishes. **Voice:**
  uses the same distinct upbeat cloned voice as the rest of the series.
- **`HedgeReel`** — "The Fed bet" (fast NEWS reel). NEW topic: **why gold is falling during
  a war with inflation rising.** Thesis: **gold was never an inflation hedge — it's a bet
  against the Fed;** it only wins when rates can't keep up with prices, and right now they
  can, so gold is **losing to the one asset it was meant to protect you from — cash.** Beats:
  gold's **January record ($5,608)** vs **~$4,121** now (**−26%**, −6% in September) while CPI
  runs **3.4** and oil is near **$100**; gold rose this week **not** on the war or inflation
  but because **a weak jobs report cut Fed-hike odds from 64% to 22%**; the mechanism (gold
  pays nothing, **Treasuries pay 5.3%** — the most in **24 years** — so cash earns **~2% real**
  while gold earns zero, and every time a hike looks likely that gap widens and gold loses).
  **Full VERBATIM** of the client's QUESTION / STORY / ANSWER / CTA script with a short
  **post-hook pause**; close is a **CTA question** ("Still holding gold?"). Pace sped up at the client's
  request (atempo ~1.2) — **2031 frames = ~68s**. Re-cut **MAX MEDIA-DENSE at 30 beats** (same
  VO + music, re-split via STT): **28 media beats** — **25 footage** (incl. **5 video b-roll**:
  gold-bar macro, soldier silhouettes, turning gears, an ascending escalator, a green waveform)
  **+ 3 number cards** (JAN $5,608 / NOW $4,121 / −26%; HIKE ODDS 64% → 22%; 10YR 5.3% − CPI
  3.4% = +1.9% REAL — each landing on the line whose figures it shows) **/ 1 solid-red impact**
  ("the craziest part") **/ 1 black** ("that's what moved it"). **NOT a duplicate of
  `GoldReel`** ("Store of value", the gold-vs-stocks long-run case) — this is the timely
  gold-vs-Fed-rates story with its own distinct footage. **Finance names/figures are
  editorial** (spoken + shown as text); **the footage is strictly BRAND-FREE** — gold bullion
  (generic "FINE GOLD" purity only, **no refiner stamps**), molten gold, abstract rising gold,
  a bullion vault, a declining and a rising chart, a red down-arrow, an oil pump-jack, an
  empty office, a neoclassical central-bank-style facade, a $100 Treasury-seal macro, cracked
  earth, cash, an empty hand, a balance scale, a rate sheet, gold coins — **no brand logos,
  wordmarks, tickers, flags, or identifiable faces** (sourcing rejected ARGOR-HERAEUS/GLOBAL
  INTERGOLD stamped bars, Britannia flag bars, and charts with J.P.Morgan/UBS/Itaú broker
  names). 28 distinct brand-free clips (18 original + 10 new for the 30-beat re-cut: a gloved
  single FINE GOLD bar, a grocery basket, soldier silhouettes, a columned facade, turning
  gears, an aged clock, a fuel-pump price board, an ascending escalator, a dim gold specimen,
  a green waveform), each used once, none reused across other reels; all Pexels ids
  collision-checked against the full ledger. **TIME-SENSITIVE / UNVERIFIED — verify
  before publishing:** cites specific figures (gold $5,608 Jan → ~$4,121, −26%; CPI 3.4; oil
  ~$100; Fed-hike odds 64% → 22%; 10yr 5.3%, most in 24 yrs; ~+1.9% real). All author-supplied
  and rendered as written; confirm against primary sources before publishing. **Voice:** the
  same upbeat cloned voice as the rest of the series.
- **`SilenceReel`** — "The silence" (fast NEWS reel). NEW topic: **why the US is offering
  Russia help with a disease it already knows how to cure.** Thesis: **the threat isn't the
  bacteria, it's the information** — antibiotics fix plague, but **nothing fixes a government
  that won't say what happened.** Beats: a **lab technician dies** at the **Anti-Plague
  Institute in Irkutsk** (**5 Oct**, **~200 observed**); **pneumonic plague is bacterial** and
  treatable (**CDC stockpile**, **WHO rates risk low**) — on paper a **contained local
  incident**; yet the **State Department sends Moscow a formal request**, **Trump offers help**,
  a **Putin call is scheduled**; what Washington **can't treat is the silence** (no cause of
  death, no lab records, nothing to the WHO). **Full VERBATIM** of the client's QUESTION /
  STORY / ANSWER / CTA script with a short **post-hook pause**; close is a **CTA question**
  ("Should the US be asking, or demanding?"). Sped VO (atempo ~1.25, client asked for a faster
  read) — **2156 frames = ~72s**.
  **24 beats: 21 media** (incl. **4 video b-roll** — a petri dish, cells under a microscope, a
  gloved test-tube, an abstract data wave — **+ 3 summary cards**: IRKUTSK / 5 OCTOBER / ~200
  OBSERVED; TREATABLE / WHO: LOW RISK; FORMAL REQUEST SENT / PUTIN CALL SCHEDULED) **/ 1
  solid-red impact** ("silence") **/ 2 black** ("makes it work", "what isn't in the statement").
  **NEW topic — not a duplicate of any existing reel.** **Names/figures/event are editorial**
  (spoken + shown as text); **the footage is strictly BRAND-FREE AND FACE-FREE** — generic lab,
  medical, and diplomatic b-roll (a brutalist facade, a red rotary phone, a wax-sealed letter,
  vault doors, a lone microphone, a declined handshake) — **no Trump/Putin likenesses, no
  national flags, no CDC/WHO/State-Dept seals, no brand logos, wordmarks, or foreign-language
  signage** (sourcing rejected COVID-labelled vials, a Cyrillic broadcaster chyron, brand
  wordmarks on a phone, and a flag behind a gavel). 21 distinct clips, each used once, none
  reused across reels; all Pexels ids collision-checked against the full ledger. **A tense,
  restrained news-underscore bed** (not the upbeat finance music) under the cloned voice.
  **TIME-SENSITIVE / UNVERIFIED — verify before publishing:** cites a specific breaking event
  and claims (Irkutsk lab death 5 Oct, ~200 under observation; CDC/WHO assessments; a formal US
  diplomatic request and a scheduled Trump–Putin call). All author-supplied and rendered as
  written; confirm every claim against primary sources before publishing.
- **`CoverupReel`** — "The cover-up" (fast NEWS reel). **A/B twin of `SilenceReel`** — same
  Irkutsk plague event, but a **different angle: the economic cost of silence.** Thesis: **a
  plague nobody will explain is an economic problem with no cure** — markets, airlines and ports
  don't price the pathogen, they **price the silence;** Russia is already losing **the one thing
  that keeps the bill small — credibility.** Beats: the Irkutsk lab death (**~200 observed**); an
  official **reportedly said plague**, the **wording was changed**, a **local warning deleted**;
  Russia says **under control**, WHO **low risk**, **treatable** — on paper **contained**; then
  the **1994 Surat** precedent — **56 deaths**, **half a million fled** in days, **airlines
  cancelled**, **ports turned away ships**, **up to $2 billion** lost — *the disease didn't cost
  $2B, the uncertainty did.* **Full VERBATIM** of the client's QUESTION / STORY / ANSWER / CTA
  script with a short **post-hook pause**; close is a **CTA question** ("Which costs more — the
  outbreak or the cover-up?"). Sped VO (atempo ~1.14) — **2239 frames = ~75s**. **24 beats: 22
  media** (incl. **4 video b-roll** — a rotating globe, microscope microbes, an aerial fleeing
  crowd, a falling-market screen — **+ 3 summary cards**: IRKUTSK / ~200 OBSERVED; WHO: LOW RISK
  / TREATABLE; 1994 SURAT / 56 DEATHS / −$2 BILLION) **/ 1 solid-red impact** ("the silence
  around it") **/ 1 black** ("makes it work"). **Its own distinct footage under `public/coverup/`
  — no reuse of `SilenceReel`'s clips** or any other reel's. **Footage strictly BRAND-FREE AND
  FACE-FREE** — a columned facade, a suited figure from behind, a red-pen strike-through, an
  empty ward, a shattered-glass crack, a balance scale — **no Trump/Putin likenesses, no flags
  (Russia/US/India), no CDC/WHO/agency seals, no airline livery, no brand logos or
  foreign-language signage** (sourcing rejected a hammer-and-sickle emblem, Cyrillic/Hindi signs,
  Ryanair/Alaska liveries, COVID-labelled vials, and broadcaster chyrons). 22 distinct clips,
  each used once; all Pexels ids collision-checked against the full ledger. Tense news-underscore
  bed under the cloned voice. **TIME-SENSITIVE / UNVERIFIED — verify before publishing:** cites a
  breaking event and figures (Irkutsk lab death, ~200 observed; WHO assessment; the 1994 Surat
  plague — 56 deaths, ~500k fled, up to $2B lost). All author-supplied and rendered as written;
  confirm every claim against primary sources before publishing.
- **`ScamReel`** — "Priced in" (fast NEWS reel). NEW topic: **what it takes to keep a scam ad
  running on Facebook — "less than you think."** Thesis: **a scammer at 94% isn't a risk to
  Meta, he's a premium customer — the system isn't failing to catch them, it's pricing them.**
  Beats: a **$294 "diabetes cure" deepfake** of **Mark Cuban's** face/voice as a paid **Facebook**
  ad; **Meta internal docs (reported by Reuters)** — **~$16B** of 2024 revenue (**~10%**) expected
  from scam/prohibited ads, **15B** higher-risk ads a day; its safety team estimated the platforms
  are in **1 in 3 US scams**, **seniors lost $7.7B** to online fraud (**+59%**); to be banned an
  advertiser must score **≥95%** scam — below that they aren't removed, they're **charged more**;
  suspected fraud is **upsold** — *stay under 95% and pay the surcharge.* **Full VERBATIM** of the
  client's QUESTION / STORY / ANSWER / CTA script with a short **post-hook pause**; close is a
  **tag/share CTA** ("Someone in your family is on Facebook right now. Tag them."). Sped VO (atempo
  1.33) — **2339 frames = ~78s**. **22 beats: 19 media** (incl. **3 video b-roll** — a phone feed,
  a spreading network, a cascade of coins — **+ 4 number cards**: $294 "CURE" / DEEPFAKE; $16B =
  10% OF REVENUE / 15B ADS A DAY; 1 IN 3 US SCAMS / SENIORS −$7.7B / +59%; UNDER 95% / PAY MORE,
  STAY LIVE) **/ 1 solid-red impact** ("premium customer") **/ 2 black** ("less than you think",
  "makes it work"). **Its own distinct footage under `public/scam/`.**
  **Footage strictly BRAND-FREE AND FACE-FREE** — a generic "ERROR" phone, a blank mannequin head
  (the deepfake), a "TOP SECRET FILES" prop folder, a server panel, a tachometer in the red, a POS
  tap, a fishing net — **no Meta/Facebook/Instagram logos or app UI, no Mark Cuban likeness (real
  or deepfake), no Reuters logo, no brand logos or identifiable public figures** (sourcing rejected
  an Instagram profile grid, Bitcoin-logo coin clips, Visa/mBank cards, and SEAT/WIKA-branded
  gauges). 19 distinct clips, each used once; all Pexels ids collision-checked against the ledger.
  Tense tech-exposé underscore under the cloned voice. **EDITORIAL / UNVERIFIED — verify before
  publishing:** makes serious allegations about a **named company** and cites specific figures
  attributed to Reuters reporting ($16B/~10%, 15B ads/day, 1-in-3 US scams, seniors −$7.7B/+59%,
  the 94%/95% thresholds). All author-supplied and rendered as written; **get a primary-source and
  legal review** for the named-company accusation before this publishes.
- **`NoteReel`** — "The note" (fast NEWS reel). **Third A/B reel on the Irkutsk plague event**
  (with `SilenceReel` and `CoverupReel`), a new angle: **international-health-law enforcement.**
  Thesis: **the demarche isn't about one death — it's about whether the only rule the world has
  on outbreaks still works when the country involved says no;** Russia may be right, but **if it
  isn't, nobody can make it say so.** Beats: a **28-year-old technician** at Russia's Anti-Plague
  Institute dies (**official cause "undetermined"**); **two stories** — a **broken test tube**,
  **~200 contacts** in quarantine, a **leaked** anti-plague order the watchdog calls **fake**;
  **Washington sends a demarche**, **Trump schedules a Putin call**, the **WHO asks publicly** —
  Russia's reply: **help with the US measles outbreak** and a **New Mexico plague death**; every
  WHO member signed the **IHR** (**notify within 24h**) but the WHO **can ask, not enforce** — the
  system runs on the country telling the truth. **Full VERBATIM** of the client's QUESTION / STORY
  / ANSWER / CTA script with a short **post-hook pause**; close is a **CTA question** ("Should any
  country be allowed to investigate its own lab?"). Sped VO (atempo ~1.32) — **2417 frames = ~81s**.
  **24 beats: 21 media** (incl. **3 video b-roll** — a gloved test tube, an aerial desert, Earth
  at night — **+ 4 summary cards**: OFFICIAL CAUSE "UNDETERMINED"; 2 STORIES / 1 FAKE DOCUMENT;
  DEMARCHE / PUTIN CALL / RUSSIA: HELP WITH MEASLES; 196 COUNTRIES / 24 HOURS / 0 ENFORCEMENT)
  **/ 1 solid-red impact** ("Russia may be right… nobody can make it say so") **/ 2 black** ("makes
  it work", "isn't about one death"). **Its own distinct footage under `public/note/` — no reuse
  of `SilenceReel`/`CoverupReel` clips.** **Footage strictly BRAND-FREE AND FACE-FREE** — an
  unmarked envelope, a lab-results sheet, a forking road, a crumpled-paper "fake," a vintage
  phone, a gavel, a "THE LAW" book, a red brushstroke "?", an empty lab — **no Trump/Putin
  likenesses, no flags (Russia/US), no WHO/UN/agency seals, no brand logos or foreign-language
  signage, and no identifiable likeness of the deceased** (sourcing rejected Ukrainian/Cyrillic
  tax forms, a "LivePlan" wordmark, "Dhaka Law Reports"/named-firm spines, and a heraldic crest).
  21 distinct clips, each used once; all Pexels ids collision-checked against the ledger. Tense
  geopolitical news-underscore bed under the cloned voice. **TIME-SENSITIVE / UNVERIFIED — verify
  before publishing:** cites a breaking event and claims (Irkutsk lab death, official cause
  "undetermined", a leaked "fake" order, ~200 in quarantine; a US demarche + scheduled Trump–Putin
  call; Russia's measles/New Mexico reply; the IHR's 24h-notify with no enforcement). All
  author-supplied and rendered as written; confirm every claim against primary sources before
  publishing.
- **`DelayReel`** — "The delay" (fast NEWS reel). **Fourth reel on the Irkutsk plague event**
  (with `SilenceReel`, `CoverupReel`, `NoteReel`), a new angle: **the science.** Thesis: **plague
  doesn't scare scientists — they've had the cure since the 1940s; what scares them is a lab that
  won't show its test results.** A disease you can treat in two days **shouldn't take a week to
  explain — the delay isn't a detail, the delay is the diagnosis.** Beats: the Irkutsk death
  (cause **"undetermined"**, **~200 observed**); an **unverified second case**, Russia says **90%
  clear**, WHO **"until we get answers"**; **plague isn't rare** (**~7 US cases a year**) — an
  **Arizona** man caught pneumonic plague **from a sick cat** and died **8 hours** after hospital,
  yet **no diplomatic note**, because everyone knew what it was; the science (**droplet, 3–6 feet**,
  symptoms in 1–2 days, **treat within 48 hours**, **beaten for 80 years**) — the only question is
  **one test: wild strain or lab strain?** (**Ashish Jha** on a weapons program; a **Tulane**
  microbiologist on coincidence); **one lab result settles it. Russia hasn't shared it.** **Full
  VERBATIM** of the client's QUESTION / STORY / ANSWER / CTA script with a short **post-hook
  pause**; close is a **CTA question** ("Would you trust a lab that investigates itself?"). **Its
  longest script yet** — the VO reads at the **max safe speed (atempo 1.33)** to land **2815
  frames = ~94s**. **25 beats: 22 media** (incl. **3 video b-roll** — a sick cat, a desert, a water
  droplet — **+ 4 summary cards**: IRKUTSK / "UNDETERMINED" / ~200 OBSERVED; 2ND CASE (UNVERIFIED)
  / RUSSIA 90% CLEAR / WHO "UNTIL WE GET ANSWERS"; USA ~7 CASES / YEAR / ARIZONA 2025 DEAD IN 8
  HOURS; 3–6 FEET / 48 HOURS / 1 TEST RESULT) **/ 1 solid-red impact** ("the delay is the
  diagnosis") **/ 2 black** ("but nobody tells you this part", "treat in two days shouldn't take a
  week"). **Its own distinct footage under `public/delay/` — no reuse of the other three Irkutsk
  reels.** **Footage strictly BRAND-FREE AND FACE-FREE** — an hourglass, an isolation figure, a
  warning light, bacterial colonies, a sick cat, an IV drip, an expert in silhouette, rolling dice,
  an apothecary bottle, a sealed lab door — **no real-person likenesses (incl. Ashish Jha / Trump /
  Putin / the deceased), no flags, no WHO/UN/agency/hospital seals, no brand logos or
  foreign-language signage** (sourcing rejected a Kodak timer, Cyrillic ER/exit signs, "med imagem"
  branding, and named medical forms). 22 distinct clips, each used once; all Pexels ids
  collision-checked against the ledger. Tense science-doc news-underscore bed under the cloned
  voice. **TIME-SENSITIVE / UNVERIFIED — verify before publishing:** cites a breaking event, an
  **attributed expert quote**, and claims (Irkutsk death; an unverified 2nd case; Russia 90% clear;
  ~7 US cases/yr; the July Arizona plague death; plague science; one unshared lab result). All
  author-supplied and rendered as written; confirm every claim (and the Jha/Tulane attributions)
  against primary sources before publishing.
- **`BetReel`** — "The bet" (fast NEWS reel). **Fifth reel on the Irkutsk plague event** (with
  `SilenceReel`, `CoverupReel`, `NoteReel`, `DelayReel`), a new angle: **the White House.** Thesis:
  **"we don't think so" isn't a finding — it's a bet.** You can't rule out what you haven't seen,
  and by Washington's own account it's seen **"a little bit"**; **the President isn't reporting
  intelligence, he's reporting hope.** Beats (Oval Office, quoted): Trump **"we don't think so"** /
  **"sharing a little bit"** / "expect them to share a lot"; his own comparison — **"China didn't
  say much in 2020, Russia isn't either"** (ruled it out and raised the doubt in one answer);
  **Trump says a Putin call is scheduled**, the **Kremlin says no specific discussion**; a **2nd
  worker** reported, **Russia calls it false**; **Rubio** asked on camera about the **FSB** and a
  **modified strain**; the exchange — a **US demarche** + **WHO asks for the lab results**, Russia
  describes (**no plague, 90% clear**). **Full VERBATIM** of the client's QUESTION / STORY / ANSWER
  / CTA script with a short **post-hook pause**; close is a **CTA question** ("Do you take 'we don't
  think so' as an answer?"). Sped VO (atempo ~1.23) — **2658 frames = ~89s**. **23 beats: 21 media**
  (incl. **3 video b-roll** — a mic, a chess standoff, rolling dice — **+ 3 summary cards**: "WE
  DON'T THINK SO" / SHARING A LITTLE BIT; CHINA DIDN'T SAY MUCH / RUSSIA ISN'T EITHER; TRUMP: CALL
  SCHEDULED / KREMLIN: NOT DISCUSSED / 2ND CASE: FALSE) **/ 1 solid-red impact** ("he's reporting
  hope") **/ 1 black** ("but nobody tells you this part"). **Its own distinct footage under
  `public/bet/` — no reuse of the other four Irkutsk reels.** **Footage strictly BRAND-FREE AND
  FACE-FREE** — an empty briefing room, an ornate study, a red hotline, a marble colonnade, a
  shadowed corridor, a chess standoff, red dice, a sealed envelope — **no Trump/Rubio/Putin
  likenesses, no flags (US/Russia/China), no White House/presidential/FSB/WHO seals, no landmarks
  (White House/Kremlin), no brand logos or foreign-language signage** (sourcing rejected RØDE/
  Neumann/maono mic logos, a Siemens poster, a Tanger annual report on a tablet, Polish court
  signage + a Dell logo, and a "witeg"-branded lab; the one face is an anonymous hand-over-mouth
  stock model for "silence," not a public figure). 21 distinct clips, each used once; all Pexels
  ids collision-checked against the ledger. Tense political-thriller news-underscore bed under the
  cloned voice. **TIME-SENSITIVE / UNVERIFIED — verify before publishing:** **attributes direct
  quotes to Trump and Rubio** and cites a breaking event (Oval Office remarks; a scheduled-vs-not
  Putin call; an unverified 2nd case; the FSB/strain question; a US demarche + WHO ask; Russia's
  90%-clear reply). All author-supplied and rendered as written; confirm every claim (and the
  direct quotes) against primary sources before publishing.
- **`StarlinkReel`** — "The queue" (fast NEWS reel). NEW topic: **why Elon Musk is picking a fight
  with the two men who agreed to sell Starlink in India.** Thesis: **Musk isn't fighting a ban —
  he's fighting a queue, and the men at the front of it are also his distributors.** Beats: Musk's
  Wednesday **X** post blaming **"certain oligarchs"** / a **"monopolistic chokehold"** (he names
  nobody — **Ambani's Jio, Mittal's Airtel**); but in **2025 both signed deals to distribute
  Starlink** devices in India — not just rivals, his **retailers**; India's ministry says all
  **three satellite licences** (Starlink, Jio, **OneWeb**) sit at the **same stage**, waiting on a
  **security review** before anyone gets spectrum; **Starlink has waited four years**; the market
  is forecast at **$1.9B by 2030** but the real prize is India's **1,000,000,000 internet
  subscriptions**, almost all on networks Ambani and Mittal own; the playbook — **let him in slowly,
  same queue/review/paperwork, then sell his product through your shops to your customers**; **he
  gets the sky, you keep the ground** — Starlink reaches anywhere on earth **except the phone bill.**
  **Full VERBATIM** of the client's QUESTION / STORY / ANSWER / CTA script with a short **post-hook
  pause**; close is a **CTA question** ("Is Musk right, or just late?"). Sped VO (atempo 1.33) —
  **2570 frames = ~86s** (final CTA beat extended so the whole VO, through "tell me below," plays
  with a clean tail). **26 beats: 23 media** (incl. **5 video b-roll** — a scrolling phone,
  hands signing, a ticking clock, a data tunnel, a card checkout — **+ 4 summary cards**: CERTAIN
  OLIGARCHS / CHOKEHOLD; JIO + AIRTEL SELL STARLINK; 3 LICENCES / SAME STAGE / SECURITY REVIEW; SAME
  QUEUE / REVIEW / PAPERWORK — **+ a $1.9B·2030 stat + a 1,000,000,000-subscriptions card**) **/ 1
  solid-red impact** ("anywhere but the phone bill") **/ 2 black** ("he names nobody" / "but nobody
  tells you this part"). **Its own distinct footage under `public/starlink/` — no reuse of any other
  reel.** **Footage strictly BRAND-FREE AND FACE-FREE** — a generic satellite, a dish, steel chain,
  two cell towers, a neoclassical facade, a silhouette queue, interlocking gears, a boom barrier, a
  data tunnel, a crowd from above — **no Musk/Ambani/Mittal likenesses, no SpaceX/Starlink/Tesla/X/
  Jio/Reliance/Airtel/OneWeb logos or wordmarks, no national flags or seals, no landmarks or
  foreign-language signage** (sourcing rejected the SpaceX Dragon photos carrying a "SpaceX"
  wordmark, plus ABUS/Master lock brands, a VW badge + plate, a HIKVISION label, Turkish/Dutch
  on-screen text, and a G-Technology/Thunderbolt drive). 23 distinct clips, each used once; all
  Pexels ids collision-checked against the ledger. Driving tech-business news-underscore bed under
  the cloned voice. **TIME-SENSITIVE / UNVERIFIED — verify before publishing:** attributes a
  specific **X post to Musk**, **2025 distribution deals to Jio/Airtel**, a licence-stage claim to
  **India's ministry**, and market/subscriber figures (**$1.9B by 2030; >1bn subscriptions**). All
  author-supplied and rendered as written; confirm every claim (and the Musk quote) against primary
  sources before publishing.
- **`PlaystationReel`** — "The exchange" (fast NEWS reel). NEW topic: **why a used PS5 Pro now sells
  for more than a new one.** Thesis: **the PlayStation isn't a console right now — it's a memory chip
  with a controller;** Sony can't make enough, the used market sets the price, and **GameStop is the
  exchange** running a **~$600 spread** the leaked memo itself calls **"intentional."** Beats: a
  leaked GameStop memo (**used $1,399.99** vs **new $899.99**, "intentional"); the new one is **sold
  out**, open market **~$1,500**, so the used price is **still a discount**; GameStop pays **$800** to
  trade in against a **$699.99 (2024) launch** — an **appreciating asset**; the mechanism — Sony
  blamed a **memory shortage** (the same chips sending **Micron +280%**), and **GTA 6 lands Nov 19**
  (finite supply + a hard deadline, buying at $800 and selling at $1,399); close — **not scalping,
  market-making.** **Full VERBATIM** of the client's QUESTION / STORY / ANSWER / CTA script with a
  short **post-hook pause**; close is a **CTA question** ("Would you sell your PS5 back at $800?").
  Sped VO (atempo 1.28) — **2494 frames = ~83s** (final CTA beat extended so the whole VO plays with
  a clean tail). **27 beats: 24 media** (incl. **5 video b-roll** — an RGB keyboard, empty shelves, a
  chip macro, an exchange board, a markets dashboard — **+ 3 cards**: USED $1,399.99 / NEW $899.99;
  OPEN MARKET ~$1,500 / STILL A DISCOUNT; BUY $800 / SELL $1,399 / GTA 6 · NOV 19 — **+ a $800
  trade-in stat + a +280% Micron stat**) **/ 1 solid-red impact** ("a memory chip with a controller")
  **/ 2 black** ("but nobody tells you this part" / "an appreciating asset"). **Its own distinct
  footage under `public/ps5/` — no reuse of any other reel.** **Footage strictly BRAND-FREE AND
  FACE-FREE** — a leaked contract, a blank price tag, an "intentional" stamp, empty racks, a cardboard
  unbox, a bare motherboard, cash bundles, a balance scale, a chess pivot — **no PlayStation/PS5
  console, no DualSense controller shape, no Sony/GameStop/Micron/Xbox/Nintendo/Rockstar/GTA logos,
  box art or product likenesses, no readable chip/ticker/store labels, no banknote portrait faces, no
  human faces** (sourcing rejected LivePlan/LG/Intel/Sega/Ingersoll wordmarks, Investing.com/yahoo/
  Binance/TradingView watermarks, a PlayStation-glyph arcade stick, Coles/Barilla branding, a $50
  Grant portrait, and a Portuguese "NOVEMBRO" calendar). 24 distinct clips, each used once; all Pexels
  ids collision-checked against the ledger. Sleek fintech/markets news-underscore bed under the cloned
  voice. **TIME-SENSITIVE / UNVERIFIED — verify before publishing:** attributes a leaked memo and
  specific prices to GameStop ($1,399.99 / $899.99 / $800 trade-in / $699.99 launch / ~$1,500 open
  market), a price rise + memory reason to Sony, a +280% move to Micron, and a Nov 19 GTA 6 date. All
  author-supplied and rendered as written; confirm every figure, the memo, and the "intentional" quote
  against primary sources before publishing.
- **`OilReel`** — "The handoff" (fast NEWS reel). NEW topic: **why BP sold out of the Bay du Nord
  offshore oil project ~3 months before Shell bought in.** Thesis: **BP and Shell weren't valuing the
  same project** — BP saw a **bill due at the 2027 investment decision** and sold; Shell bought a
  **30% option on 2031 oil** at a price set while **Brent sits near $100.** Beats: Friday — **Shell
  takes 30%** of Equinor's Bay du Nord (**C$14B**, **500 km** off Newfoundland, Canada's first
  **deepwater** field, farthest-from-shore project on earth); but in **July BP sold its 37.2%** and
  walked away, neither deal priced, **90 days apart**; nobody has even **decided to build it** (**FID
  early 2027, first oil 2031**, shelved 2023, revived when oil hit **$100**, no green light); the
  mechanism — a **30% option** on 2031 oil, **Iran war month nine**, a *no* loses an entry fee, a
  *yes* owns a slice of **~170,000 barrels a day for decades**; close — **the field didn't change, the
  balance sheets did.** **Full VERBATIM** of the client's QUESTION / STORY / ANSWER / CTA script with a
  short **post-hook pause**; close is a **CTA question** ("Who's right — the one who sold, or the one
  who bought?"). Sped VO (atempo 1.30) — **2551 frames = ~85s** (final CTA beat extended for a clean
  tail). **25 beats: 23 media** (incl. **5 video b-roll** — an offshore rig, a deepwater ocean, a
  barrel row, a markets chart, an oil refinery — **+ 2 cards**: JULY BP OUT 37.2% / OCT SHELL IN 30% /
  90 DAYS; FID 2027 / FIRST OIL 2031 / SHELVED 2023 — **+ a 170,000 barrels/day stat**) **/ 1 solid-red
  impact** ("same barrels — liability or asset") **/ 1 black** ("but nobody tells you this part").
  **Its own distinct footage under `public/oil/` — no reuse of any other reel.** **Footage strictly
  BRAND-FREE AND FACE-FREE** — a lone rig, a wellhead platform, a relay-baton handoff, a stormy sea, an
  unfinished build, interlocking gears, unbranded barrels, an oil refinery, a balance scale — **no
  BP/Shell/Equinor/Exxon/Chevron/Total logos, wordmarks or branded rigs/barrels, no readable tickers or
  company names on charts, no national flags or Canadian/Newfoundland landmarks, no human faces**
  (sourcing rejected a "SHELL DRAUGEN" rig wordmark, ASCO/LIEBHERR marks, Gessler/PINTU DARURAT exit
  signs, Glen Moray whisky, a Form-1040 bill, NVTK/CAKEUSDT tickers, TradingView watermarks, a Logitech
  logo, and Portuguese/Chinese signage). 23 distinct clips, each used once; all Pexels ids
  collision-checked against the ledger. Cold commodities-desk news-underscore bed under the cloned
  voice. **TIME-SENSITIVE / UNVERIFIED — verify before publishing:** attributes a 30% Shell buy-in and a
  37.2% BP sell-out of Bay du Nord to specific dates, the C$14B / 500km / FID 2027 / first-oil 2031 /
  shelved 2023 / ~160–175k bbl/day figures, and a "Brent near $100 / Iran war month nine" backdrop. All
  author-supplied and rendered as written; confirm every figure, date and stake against primary sources
  before publishing.
- **`OnePctReel`** — "One percent" (fast NEWS reel). **A/B twin of `MortgageReel` ("Priced in")** on the
  **same UK event** (the 5-year fix hitting 6% while the Bank of England HELD the base rate) but a **new
  angle: the personal cost.** Thesis: **one percent isn't one percent** — on a normal **£200k / 25-year**
  mortgage a 4%→6% move is **+£233 a month** (~£2,800 a year) for the same house, every month for the life
  of the deal; and **the number that sets it isn't on Threadneedle Street, it's in the Gulf** (lenders
  price off swap rates, swap rates move with the Middle East). Beats: the average **5-yr fix hits 6.00%**
  (Moneyfacts: **"disastrous"**); the **£200k** worked example (**4% = £1,056** vs **6% = £1,289 = +£233/mo**,
  £2,800/yr); the **BoE didn't move**, lenders price off **swap rates** tied to the **Middle East**,
  **+0.2% expected**, **5,000,000 households** off a fix by **2028**; **fixed deals under 5% down from 1,500
  to 9** vs **389 variable** — the fix **locks you in**, the variable **rides the base rate**, the choice is
  now **a bet on a war.** **Full VERBATIM** of the client's QUESTION / STORY / ANSWER / CTA script with a
  short **post-hook pause**; close is a **CTA question** ("When does your fix end?"). Sped VO (atempo 1.17)
  — **2555 frames = ~85s** (final CTA beat extended for a clean tail). **25 beats: 23 media** (incl. **5
  video b-roll** — a terraced street, a calculator, a swap-data board, a Gulf desert, turbulent water —
  **+ 2 cards**: SAME HOUSE / +£233 A MONTH / £2,800 A YEAR; BASE RATE UNCHANGED / +0.2% EXPECTED /
  5,000,000 BY 2028 — **+ a 6.00% fix stat**) **/ 1 solid-red impact** ("it's in the Gulf") **/ 1 black**
  ("but nobody tells you this part"). **A/B twin — its own distinct footage under `public/onepct/`, no
  reuse of `MortgageReel`'s (`public/mortgage/`) or any other reel.** **Footage strictly BRAND-FREE AND
  FACE-FREE** — a residential street, a lease document, house keys, a coin pile, a stone colonnade, a Gulf
  desert, a padlock, red dice, a neon "%", a calendar — **no Bank of England / Moneyfacts / Halifax /
  Nationwide / Barclays / HSBC / NatWest / Lloyds / Rightmove / Zoopla logos, no Bank of England /
  Threadneedle Street building or identifiable London landmarks, no banknote or coin portrait faces, no
  national flags, no faces** (sourcing rejected Master Lock / "MADE IN BRITAIN" padlocks, a Canada govt
  wordmark, Salesforce Tower + a Coca-Cola billboard, National Association of Realtors / Federal Reserve
  text, BINANCE / TradingView charts, Bitcoin coins, a Queen Elizabeth coin profile, and a euro coin). 23
  distinct clips, each used once; all Pexels ids collision-checked against the ledger. Cold mounting-bill
  news-underscore bed under the cloned voice. **TIME-SENSITIVE / UNVERIFIED — verify before publishing:**
  attributes a 6.00% 5-yr fix and a "disastrous" quote to Moneyfacts, the £200k example figures (4%=£1,056
  / 6%=£1,289 / +£233), a +0.2% analyst call, 5m households off a fix by 2028, and the fixed/variable deal
  counts (1,500→9 / 389), plus a causal swap-rate/Middle-East link. All author-supplied and rendered as
  written; confirm every figure against primary sources before publishing.
- **`CostaReel`** — "The lease" (fast NEWS reel). NEW topic: **how Coca-Cola — the company that sells
  more drinks than anyone on earth — failed at coffee.** Thesis: it didn't fail at coffee, **it failed
  at counters.** Coke's model is **selling syrup / the brand** (asset-light); **Costa is the opposite**
  — rent, baristas, milk, **2,700 leases** — the one business Coke never learned to run; it spent a
  century avoiding overheads, then **bought them.** The brand was never the problem, **the lease was.**
  Beats: **2018** — Coke buys Costa from **Whitbread** for **$5.1B** (**2,700 shops**, **20,000 staff**,
  Britain's biggest); **8 years on** it's trying to sell again (late-2025 process **pulled in January**,
  a buyer **walked on price**, back on the block **per Semafor**, **price unknown**); Costa lost nearly
  **£20M** across **2023–24** yet the **CEO is confident** (new HQ, iced drinks + **matcha**), the owner
  **wants out** anyway; the mechanism — **syrup vs leases.** **Full VERBATIM** of the client's QUESTION /
  STORY / ANSWER / CTA script with a short **post-hook pause**; close is a **CTA question** ("Should Coke
  never have bought it, or just can't run it?"). Sped VO (atempo ~1.37, ~10% faster) — **2247 frames = ~75s** (final
  CTA beat extended for a clean tail). **20 beats: 18 media** (incl. **4 video b-roll** — fizzing cola,
  a matcha pour, a syrup pour, a barista counter — **+ 3 cards**: 2,700 SHOPS / 20,000
  STAFF / BRITAIN'S BIGGEST; SALE 1 PULLED JAN 2026 / SALE 2 NOW / PRICE UNKNOWN; 2023-24 LOSS £20M / NEW
  HQ JAN 2027 / OWNER WANTS OUT — **+ a $5.1B stat**) **/ 1 solid-red impact** ("the brand wasn't the
  problem, the lease was") **/ 1 black** ("but nobody tells you this part"). **Its own distinct footage
  under `public/costa/` — no reuse of `CokeReel`'s (`public/coke/`, the 1985 New Coke reel) or any other
  reel.** **Footage strictly BRAND-FREE AND FACE-FREE** — fizzing cola in a plain glass, a generic cafe,
  cash bundles, shuttered shopfronts, an auction gavel, a syrup pour, a bottling line, an empty shop, a
  plain cup — **no Coca-Cola / Coke (no red cans/bottles/script), no Costa (no maroon logo / branded
  cups / storefronts), no Whitbread / Pepsi / Starbucks logos, no branded cups or shop signage, no
  banknote portrait faces, no national flags or landmarks, no faces** (sourcing rejected a Starbucks
  menu board, Miller & Miller syrup, Coors Light / Heinz / Ohio-Lottery signage, OTH Coffee Roastery /
  NOMAD / BOON cup wordmarks, euro notes and a $100 Franklin stack, and foreign-language signage). 18 distinct clips, each used once; all Pexels ids collision-checked against the ledger. Cold
  corporate-takeover news-underscore bed under the cloned voice. **TIME-SENSITIVE / UNVERIFIED — verify
  before publishing:** attributes a 2018 $5.1bn Costa acquisition (2,700 shops / 20,000 staff), a
  pulled-then-renewed 2025/26 sale process (per Semafor), a ~£20m 2023-24 loss, CEO-confidence / new-HQ
  claims, and the asset-light-vs-leases framing. All author-supplied and rendered as written; confirm
  every figure and the sale-process claims against primary sources before publishing.
- **`RulebookReel`** — "The rulebook" (fast NEWS reel). NEW topic: **how Citroën plans to build a
  brand-new EV for ~£13,000.** Thesis: it isn't a cheaper **car**, it's a cheaper **rulebook** —
  Citroën isn't beating China on the **factory floor**, it's beating it in **Brussels**, by deleting
  the parts of a car the law used to insist on. Beats: Citroën's new **2CV**, on sale **end-2028** from
  **€15,000 / ~£12,700**, electric, with an **egg crate in the door**; the EU is negotiating a looser
  new **"E-car"** vehicle class (**simpler safety/equipment rules**) so European makers can build
  something **China-priced** — the 2CV is the first car **designed for rules that don't exist yet**;
  every spec is a cost cut (**flat glass**, **unpainted injected tailgate**, exposed bumpers, pop-out
  windows, fabric roof, **steel wheels**, ~**1 tonne**, small battery); **Chinese brands took ~23%** of
  the UK market last month on price, and Europe can't match Chinese labour/subsidies, so it **changes
  what a car is legally required to be** — **less car, less cost, same badge.** **Full VERBATIM** of the
  client's QUESTION / STORY / ANSWER / CTA script with a ~**1.1s post-hook pause**; close is the
  supplied **CTA question** ("Would you buy a car with fewer rules? Tell me below."). Sped VO (atempo
  ~1.28) — **2467 frames = ~82s** (final CTA beat extended for a clean tail). **28 beats: 25 media**
  (incl. **6 video b-roll** — robot arm, EV charge plug, conveyor line, aerial car park, automated
  production hall, driving POV — **+ 3 cards**: FROM €15,000 / £12,700 / ELECTRIC; A NEW EU CLASS / THE
  E-CAR; EXPOSED BUMPERS / FABRIC ROOF / STEEL WHEELS — **+ a 1-TONNE stat + a 23% stat**) **/ 1
  solid-red impact** ("less car, less cost, same badge") **/ 2 black** ("here's the piece you're
  missing" + "this is the part that makes it work"). **Its own distinct footage under
  `public/rulebook/` — no reuse of `JaecooReel`'s or any other reel.** **Footage strictly BRAND-FREE
  AND FACE-FREE** — generic auto-robotics, a covered car, a charge plug, a blank price tag, a moulded
  egg carton, binders, an empty parliamentary chamber, a checklist, a conveyor, a blank drawing board,
  a magnifier, an invoice template, automotive glass, black plastic, steel rims, cast weights, battery
  cells, an aerial car park, a coin stack, a law library, a drafting blueprint, a rubber stamp, a
  production hall, a red-pen strike-through, an open road — **no Citroën / 2CV or any car badge, logo,
  wordmark, number plate, EU flag or national seal, no readable brand text, no banknote portrait faces,
  no faces** (sourcing rejected YASKAWA robot wordmarks on the best weld/assembly clips, a BMW-badged
  windscreen, tyre sidewall lettering, a ZARA HOME scale dial, peso/Franklin coin portraits, branded
  bank statements, and foreign-language forms). 25 distinct assets, each used once; all Pexels ids
  collision-checked against the ledger. Upbeat driving electronic bed under the cloned voice.
  **TIME-SENSITIVE / UNVERIFIED — verify before publishing:** attributes a new-2CV reveal, an
  on-sale-end-2028 / €15,000 (~£12,700) price, a proposed EU "E-car" regulatory class, specific
  design/spec choices, and a ~23% Chinese-brand UK market share "last month." All author-supplied and
  rendered as written; confirm every figure and the E-car policy claim against primary sources before
  publishing.
- **`PaperReel`** — "The paper" (fast NEWS reel). NEW topic: **how an AI boom could turn into a
  banking/credit crisis via circular financing.** Thesis: **2008 wasn't about houses — it was about
  who was holding the paper when prices stopped rising;** the question isn't whether AI works, **it's
  who's holding the paper.** Beats: the **IMF** names three risks (**energy, debt, AI** — AI bet on
  too hard with **borrowed money**); **Nvidia's filing** guaranteed up to **$105B** on an **Ohio**
  data-centre campus whose tenant is **OpenAI** on a **20-year lease**, running on **Nvidia chips** —
  so **Nvidia insures its own customer** to keep it buying from Nvidia; **private credit** went from
  **under $1T (2015) to over $2.5T**; governments and tech giants **borrow against each other**, and
  the **Fed** chair ties that to **24-year-high yields** — **the money goes round in a circle, chips
  as collateral.** The answer: **a boom becomes a crisis when the sellers of shovels start guaranteeing
  the loans of the buyers** — AI doesn't have to fail, **it just has to grow slower than the rent.**
  **Full VERBATIM** of the client's QUESTION / STORY / ANSWER / CTA script with a ~**1.1s post-hook
  pause**; close is the supplied **CTA question** ("Who's holding the paper this time? Tell me
  below."). Sped VO (atempo ~1.04) — **2736 frames = ~91s** (final CTA beat extended for a clean tail).
  **29 beats: 26 media** (incl. **5 video b-roll** — blinking indicator panel, data-centre aerial,
  rising chart, aerial roundabout, server — **+ 3 cards**: IMF: ENERGY / DEBT / AI; TENANT: OPENAI /
  20-YEAR LEASE / OHIO; PRIVATE CREDIT $1T → $2.5T / YIELDS 24-YR HIGH — **+ a $105B stat + a $2.5T
  stat**) **/ 1 solid-red impact** ("it just has to grow slower than the rent") **/ 2 black** ("here's
  the piece you're missing" + "this is the part that makes it work"). **Its own distinct footage under
  `public/paper/` — no reuse of `CageReel`'s (the Nvidia-cages-agentic-AI reel) or any other reel.**
  **Footage strictly BRAND-FREE AND FACE-FREE** — blinking indicator panel, empty mics/stage, a world
  globe, poker chips, suburban rooftops, archival paper bundles, a circuit board, hands holding a
  contract, a printed financial report, a bank vault, a data-centre aerial, a glass office tower, a
  GPU heatsink, an empty pocket, interlocking gears, a piggy bank, an abstract rising chart, a
  handshake, a financial-report chart, an aerial roundabout, a gold circuit wafer, toppling dominoes,
  a steel shovel, a contract signature, cracked glass, a single held sheet — **no Nvidia / OpenAI / any
  chip or tech brand, no bank/fund names, no stock tickers, no IMF/Fed/central-bank seals or national
  flags, no readable brand text, no banknote portrait faces, no faces** (sourcing rejected GPU-hub /
  RTX-5080 shroud logos, SHURE mics, PG&E/utility bills, TradingView/BINANCE/COIN360 ticker screens,
  and a peso coin portrait). 26 distinct assets, each used once; all Pexels ids collision-checked
  against the ledger. Tense finance-documentary bed under the cloned voice. **Topic-adjacent to
  `CageReel`** (also Nvidia/OpenAI) but a different thesis — publish them apart for the same audience.
  **TIME-SENSITIVE / UNVERIFIED — verify before publishing:** attributes an IMF three-risks warning, a
  Nvidia filing guaranteeing up to $105B on an Ohio OpenAI data-centre campus on a 20-year lease,
  private credit <$1T (2015) → >$2.5T, and a Fed-chair link to 24-year-high yields. All author-supplied
  and rendered as written; confirm every figure, the Nvidia/OpenAI guarantee, and the private-credit /
  yield claims against primary sources before publishing.
- **`ConcreteReel`** — "The invoice" (fast NEWS reel). NEW topic: **why Wall Street is rotating out
  of AI chips and into industrials/construction.** Thesis: **every gold rush has two trades — the
  gold and the shovels; the money rotates from the story to the invoice.** Beats: a Monday note from
  **Morgan Stanley's** top strategist (**Michael Wilson**) calls the next leg **industrials /
  machinery / capital goods**, not semiconductors; under the surface US valuations have already
  corrected — **2 in 3 of the largest ~1,000 stocks are down 10%+** from their highs — while
  **earnings haven't followed**; **Q3 growth is driven by AI infrastructure**, and the **strongest
  order books aren't the chipmakers** — they're the ones **building the sheds, the power, the steel**,
  with **backlogs broadening across machinery and metals**; **a chip is priced on what it might do, a
  backlog on a signed order**; **Nvidia sells the dream, somebody pours the floor it sits on** — and
  **the building phase is where the signed contracts are.** **Full VERBATIM** of the client's QUESTION
  / STORY / ANSWER / CTA script with a ~**1.1s post-hook pause**; close is the supplied **CTA
  question** ("Chips or concrete for the next two years? Tell me below."). Sped VO (atempo ~1.09) —
  **2729 frames = ~91s** (final CTA beat extended for a clean tail). **27 beats: 24 media** (incl. **4
  video b-roll** — an excavator, a high-voltage substation, a concrete pour, a concrete viaduct under
  construction — **+ 3 cards**: IT'S INDUSTRIALS / MACHINERY / CAPITAL GOODS; 2 IN 3 BIG STOCKS / DOWN
  10%+ / FROM PEAK; Q3 DRIVER AI INFRA / BACKLOGS BROADENING / MACHINERY + METALS) **/ 1 solid-red
  impact** ("Wall Street is moving to the second") **/ 2 black** ("here's the piece you're missing" +
  "this is the part that makes it work"). **Its own distinct footage under `public/concrete/` — no
  reuse of `PaperReel`'s (`public/paper/`, which also uses the shovels metaphor) or any other reel.**
  **Footage strictly BRAND-FREE AND FACE-FREE** — an unbranded excavator, an analyst report, a chip/
  wafer, a lathe, a falling market chart, a candlestick board, a financial-district skyline, an
  iceberg, a magnifier on a chart, an earnings statement, a substation, an order clipboard, steel
  roof girders, rebar bundles, a microprocessor, a signed order, a balance scale, an invoice, a
  concrete pour, raw gold ore, work-shovel blades, a tower crane, a dusk construction site, a concrete
  viaduct — **no Morgan Stanley / Nvidia / any chip or tech brand, no construction-equipment brand
  logos (CAT/Komatsu/Deere/JCB/GEHL), no stock tickers, no bank/fund names, no seals or flags, no
  readable brand text, no banknote portrait faces, no faces** (sourcing rejected JCB/GEHL/model-number
  excavators, an INTEL CORE i5 chip, a GLOBAL INTERGOLD bar set, a 新昌-labelled crane, MetLife/
  TowerBank skylines, and BINANCE/Deutsche-Bank/forex ticker charts). 24 distinct assets, each used
  once; all Pexels ids collision-checked against the ledger. Driving industrial-finance bed under the
  cloned voice. **Shares the "gold rush / shovels" metaphor with `PaperReel`** but a different thesis
  (a market rotation into industrials, not AI circular-financing) — publish them apart for the same
  audience. **TIME-SENSITIVE / UNVERIFIED — verify before publishing:** attributes a Monday Morgan
  Stanley note (Michael Wilson) calling industrials over semiconductors, a valuation drop since June
  with ~2/3 of the largest ~1,000 stocks >10% off highs, Q3 growth driven by AI infrastructure, and
  broadening machinery/metals backlogs. All author-supplied and rendered as written; confirm every
  figure and the Morgan Stanley call against primary sources before publishing.
- **`OptoutReel`** — "The premium" (fast NEWS reel). NEW topic: **how a government could raise
  income tax without breaking a promise not to — by renaming it a "premium" you can opt out of, and
  letting inertia collect.** Thesis: **you don't raise the tax; you rename it, make it automatic, and
  let inertia do the collecting — not a loophole, the design.** Beats: a Monday proposal (from a
  former pensions minister, via a consultancy) has everyone **over 40, pensioners included,** pay an
  extra **1p in every £** of taxable income (**avg ~£31/month**) to fund **social care**; it isn't
  called a tax — it's a **"premium"** with an **opt-out**, so **Labour's manifesto promise stays
  intact**; the mechanism is **auto-enrolment (the 2012 pensions trick)** — most people never opt out
  because **most people never do anything**, and the money comes out before you notice; the threat is
  real (**1 in 7 over-65s face £100,000+ care bills**, so it's sold as **insurance**) and it lands as
  the same PM proposes changing the **pension triple lock from 2030**; the close — the question isn't
  whether it's a tax, **it's whether you'll remember to say no.** **Full VERBATIM** of the client's
  QUESTION / STORY / ANSWER / CTA script with a ~**1.1s post-hook pause**; close is the supplied **CTA
  question** ("Would you opt out? Tell me below."). Sped VO (atempo ~1.03) — **2825 frames = ~94s**
  (final CTA beat extended for a clean tail). **30 beats: 27 media** (incl. **video b-roll** — a hand
  on a calculator over paperwork — **+ 3 cards**: OVER-40s / +1p IN THE £ / £31 A MONTH; "PREMIUM"
  NOT TAX / OPT-OUT = PROMISE KEPT; AUTO-ENROLMENT IN 2012 — **+ a £100,000+ stat**) **/ 1 solid-red
  impact** ("it's not a loophole, it's the design") **/ 2 black** ("here's the piece you're missing" +
  "this is the part that makes it work"). **Its own distinct footage under `public/optout/` — no reuse
  of any other reel.** **Footage strictly BRAND-FREE AND FACE-FREE** — a calculator on paperwork, a
  file box, a pensioner walking away, copper pennies, a financial statement, elderly clasped hands, a
  ballot-slip silhouette, a generic columned facade, an insurance-policy form, blank tick-boxes, a
  contract with a pen, a magnifier on terms, a coin nest-egg, a calendar, an empty office chair, cupped
  coins, a hospital corridor, a care wheelchair, a template invoice, a rain umbrella, a brass padlock,
  an hourglass, red-pen relabelling, precision gears, a question-mark notepad, a YES/NO hand-letter, a
  pen hovering to sign — **no real politicians, no party logos (no Labour rose), no UK government crest
  / royal arms, no £ banknote portrait faces, no identifiable landmark (no 10 Downing St / Big Ben),
  no HMRC/DWP or other readable brand marks, no faces** (sourcing rejected Nike/Honda high-street
  logos, a govt letterhead, the Rome Vittoriano landmark, US IRS 1040 forms, PG&E/bank-statement
  brands, a "Donald Trump / FAKE NEWS" French clipping, Chinese/Vietnamese/Ukrainian text, and a
  Cyrillic-engraved bracelet — and cropped a banknote portrait out of the magnifier shot). 27 distinct
  assets, each used once; all Pexels ids collision-checked against the ledger. Wry, clock-ticking
  finance bed under the cloned voice. **TIME-SENSITIVE / UNVERIFIED — verify before publishing:**
  attributes a Monday social-care "premium" proposal (over-40s, +1p, ~£31/month, opt-out, from a
  former pensions minister via a consultancy), the auto-enrolment-2012 framing, a 1-in-7 / £100k+
  care-cost stat, and a triple-lock-from-2030 change by the same PM. All author-supplied and rendered
  as written; confirm every figure and the proposal/party claims against primary sources before
  publishing.
- **`CarveryReel`** — "The comparison" (fast NEWS reel). NEW topic: **why Britain's biggest hotel
  company closed ~200 restaurants that new buyers now want to reopen.** Thesis: **the business didn't
  fail — it lost a comparison.** Beats: **April 2026**, **Whitbread** (owner of **Premier Inn**)
  shuts every **Beefeater** and **Brewers Fayre** — **197 restaurants / 3,800 jobs**, last closed
  September; this week **110 are coming back** via **two buyers** (one a new group run by a
  **doughnut-chain founder**), **1,600 jobs** from **mid-November**; it didn't close them because
  nobody wanted a **carvery** — it closed them because of **what sits next to them**: most Beefeaters
  are **bolted on to a Premier Inn**, and in **2024** Whitbread said it would turn **112 restaurants
  into 3,500 hotel rooms**; a **hotel room earns every night** (two staff per floor), a **restaurant
  earns twice a day** (a whole kitchen) — **same square footage, different margin**; the sites it
  **sold** are the ones with **no hotel to turn into** (dead weight to a hotel firm, a restaurant to a
  restaurant firm). The answer — Whitbread wasn't asking if a Brewers Fayre **makes money**, but if it
  **makes more than the rooms it's standing on**; it doesn't, so the new owners are **buying the bits
  a hotel company couldn't use.** **Full VERBATIM** of the client's QUESTION / STORY / ANSWER / CTA
  script with a ~**1.1s post-hook pause**; close is the supplied **CTA question** ("Would you go back
  to a reopened Beefeater? Tell me below."). Sped VO (atempo ~1.15) — **2789 frames = ~93s** (final
  CTA beat extended for a clean tail). **28 beats: 25 media** (incl. **8 video b-roll** — a dim restaurant interior, a paint roller, a
  wok over flames, carving a roast, an excavator demolition, a night city skyline, a gas-range flame,
  a pan across hotel-room balconies — **+ 3 cards**: 197 RESTAURANTS / 3,800 JOBS / CLOSED SEPT; 110 REOPENING /
  1,600 JOBS / FROM MID-NOV; 112 RESTAURANTS → 3,500 HOTEL ROOMS) **/ 1 solid-red impact** ("the
  business didn't fail, it lost a comparison") **/ 2 black** ("here's the piece you're missing" +
  "this is the part that makes it work"). **Its own distinct footage under `public/carvery/` — no
  reuse of `CostaReel`'s (the Coca-Cola/Costa-from-Whitbread reel) or any other reel.** **Footage
  strictly BRAND-FREE AND FACE-FREE** — a dim restaurant interior, a diary, a generic roadside hotel,
  a pulled-down shutter, an empty dining room, furniture under dust sheets, a handshake, plain glazed
  doughnuts, a pro kitchen pass, a magnifier, a carvery roast, two bolted-together buildings, a hotel
  facade, a gutted interior, a hotel room, a night room, a flaming pan, a floor plan, a standalone
  restaurant, a stripped floor plate, a calculator + coins, stacked balconies, a vacant room, a set of
  keys, a "we're open" sign — **no Whitbread / Premier Inn (no purple logo) / Beefeater / Brewers
  Fayre / Travelodge / any hotel or doughnut-chain logo, no readable brand text, no banknote portrait
  faces, no flags/seals, no faces** (sourcing rejected Turkish shop signage, an IRS W-9 form, a
  "Pop's Diner" wordmark, ACE/VISTA-LOCK branded keys, a branded water cooler, and ledger-dupe
  handshakes). **One flag: the standalone-restaurant still (b20) carries a generic "RESTAURANT"
  descriptor + a small non-brand cartoon mascot — no company name — kept as the cleanest brand-free
  standalone-restaurant option; swap if zero logo-shaped elements are required.** 25 distinct assets,
  each used once; all Pexels ids collision-checked against the ledger. Cool, analytical business bed
  under the cloned voice. **Whitbread-adjacent to `CostaReel`** (Coca-Cola bought Costa from
  Whitbread) but a different thesis. **TIME-SENSITIVE / UNVERIFIED — verify before publishing:**
  attributes an April-2026 Whitbread closure (197 restaurants / 3,800 jobs / last closed September), a
  110-reopening by two buyers (one a doughnut-chain founder, 1,600 jobs, mid-November), a 2024 plan to
  convert 112 restaurants into 3,500 hotel rooms, and the room-vs-restaurant margin framing. All
  author-supplied and rendered as written; confirm every figure and the closure/reopening claims
  against primary sources before publishing.
- **`JaecooReel`** — "The silhouette" (fast NEWS reel). NEW topic: **how a Chinese car
  nobody had heard of two years ago became Britain's bestselling car.** Thesis: **Britain
  didn't learn to love Chinese cars — it learned it couldn't afford British ones;** the
  Range Rover isn't losing to a better car, it's losing to a **cheaper monthly payment with
  the same silhouette.** Beats: the **Jaecoo 7** (built by **Chery**) out-selling the **Tesla
  Model 3** in September; it looks like a **Range Rover** at **£29k vs £44k** for an Evoque;
  the product is the **monthly payment** (**0% finance**); **3 in 5** buyers traded down from
  a BMW/Mercedes/Range Rover they couldn't finance; **Chinese brands at 23%** of the UK
  market, **Chery now out-sells Ford**; the playbook (copy the aspirational shape, undercut
  by a third, subsidise the loan, pick the one tariff-free rich European market — Britain).
  **Full VERBATIM** of the client's QUESTION / STORY / ANSWER / CTA script with a short
  **post-hook pause**; close is a **CTA question** ("Would you drive the Temu Range Rover?").
  Near-natural pace (atempo ~1.05) — **~2067 frames = ~69s**. Brand names are respelled
  phonetically in the VO input only (Jaecoo→"Jay-koo", Chery→"Sherry", Evoque→"Evoke",
  Temu→"Tee-moo") so the voice pronounces them correctly while the captions keep the real
  spelling. **20 beats: 16 footage / 3 number
  cards** (JAECOO 10,813 / TESLA 9,929; £29K vs £44K / 0% APR / 3 IN 5 TRADED DOWN; 23% /
  CHERY > FORD, over brand-safe non-car dark media) **/ 0 red / 2 black** (the "they couldn't
  afford to finance any more" line and the "couldn't afford British ones" thesis). Captions
  are timed so each spoken line is on screen exactly when it is voiced — the "couldn't afford
  to finance any more" line gets its own synced beat, with the £29K stats card landing right
  after it (where the script places the card); the earlier red "craziest part" card was
  dropped (its line is spoken over the £29K card). **CAR / COMPANY names are editorial**
  (spoken + shown as text only); **the footage
  is strictly BRAND-FREE** — generic unbadged cars, SUV silhouettes, a Range-Rover-shaped
  silhouette with no readable badge, money, UK finance paperwork, roads, an export car-port —
  **no car badges, emblems, grille logos, maker wordmarks, dealer signage, readable number
  plates, or identifiable faces** (sourcing rejected an Audi badge + "F-JU 272" plate, a
  TfL roundel, "ONE LINE" containers, a Chevrolet bowtie, a Corvette key fob, crypto-logo
  coins, and branded calculators). 18 distinct brand-free clips, each used once, none reused
  across other reels. Media credits — Pexels (free license): motorway (2815175), car-paint
  macro (9549134), SUV at dusk (27443726), hilltop SUV silhouette (17845049), 4x4 roof-rack
  (12984746), black SUV at dusk (5258329), car sketch (28614717), night tail-lights
  (1699588), blurred avenue (37112448), abstract light-trails (1679719), car port (3848788),
  windscreen POV (37832996), £5 note (5909809), gold coins (19613743), credit application
  (7821513), calculator (36543210), key in palm (7647753), scissors/cut (5412462).
  **TIME-SENSITIVE / UNVERIFIED — verify before publishing:** names real brands (Jaecoo,
  Chery, Tesla, Ford, Range Rover, BMW, Mercedes, Evoque) and cites figures (Jaecoo 7 10,813
  vs Tesla Model 3 9,929 in Sept; £29k vs £44k; 0% finance; 3 in 5 traded down; Chinese
  brands 23% of the UK market; Chery > Ford). All author-supplied and rendered as written;
  confirm against primary sources before publishing. **Voice:** the same upbeat cloned voice
  as the rest of the series.
- **`NikkeiReel`** — "The toolshed" (the nineteenth fast NEWS reel in the series). NEW
  topic: **Japan's Nikkei doubles in ~2 years after a 34-year recovery** — and why it's
  really an **AI-supply-chain trade**. Thesis: **Japan isn't being bought as Japan; it's
  the "toolshed" for America's AI build-out** (the machines that make and test chips),
  priced in a **yen that's never been cheaper**, with banks finally earning a spread as
  the BOJ raises rates. **The Nikkei didn't recover — it got repurposed.** Beats: the
  Nikkei closing above **70,000** (70,729); the **1989** peak near **38,957** and the
  **34-year** wait to reclaim it in 2024; now nearly double in **2.5 years**; the leaders
  are chip-equipment names (**Tokyo Electron +78%**), not Toyota/Sony; the banks right
  behind (**Mizuho +86%**, **MUFG +60%**) with the **yen ~163/$**; and the mechanism (US
  AI data centres need machines to make + test chips, Japan makes both; a weak yen; a BOJ
  rate-hike spread). Follows the client's QUESTION / STORY / ANSWER / CTA script; close is
  a CTA question ("Is Japan the AI trade nobody's talking about?"). **REVISION (client:
  "follow the script" → "full script"):** captions are **verbatim to the script with every
  line kept — nothing dropped** — and the number cards match the script's **exact CARD
  specs** (34 YEARS → 2 YEARS; NIKKEI 70,729; 1989: 38,957 / 2024: RECLAIMED; TOKYO ELECTRON
  +78% YTD; MIZUHO +86% / MUFG +60% / ¥163). Because the complete read is kept, this reel
  runs **over the usual 60s cap by design** — tempo is capped (atempo ~1.33) and total is
  **2576 frames = ~86s**. 4-mode rotating text animation. **MAX-MEDIA-DENSE 30-BEAT cut
  (client chose max media over the 19-beat version): 28 footage beats** (including all 5
  number cards, each over footage) **/ 2 black** (the two reflection turns) **/ 0 red** — no
  solid-red card this reel; it closes on a Tokyo night. **28 distinct brand-free clips**
  (the original 14 plus 14 newly sourced), each used once, **none reused across the other
  reels**. **Company / index names are editorial** (spoken + shown as text); **the footage
  is brand-free** — the original set (aerial Tokyo, bull/market sculpture, data-number wall,
  retro cityscape, candlestick chart, rainy alley, chip macro, finance towers, data centre,
  yen notes, columns, CNC machine, rusted pipes, neon reflection) plus 14 new: a dark
  trading desk, up-arrows, a daytime Tokyo aerial, watch gears, a soap bubble, a dawn
  skyline, an hourglass, commuter silhouettes, a silicon wafer, red fibre-optics, an
  engineering blueprint, a robot arm, a vault of deposit boxes, and a coin pile —
  **no company logos, no readable brand neon, no flags, no identifiable faces** (sourcing
  rejected boards full of Sony / Nintendo / Canon / NVDA tickers, crypto-logo coins, robot
  arms with UR / FANUC / Nikon / FESTO / NIRYO livery, and readable bank/brand signage).
  New media credits — Pexels (free license): trading desk (14963655), up-arrows (7679943),
  Tokyo aerial (31229239), gears (28390683), soap bubble (3371352), dawn skyline (9260176),
  hourglass (20766286), commuters (38231115), wafer (5118460), fibre-optics (17194838),
  blueprint (4134179), robot arm (8439000), vault boxes (33588626), coin pile (7186390)
  — on top of the original 14 ids. **TIME-SENSITIVE
  / UNVERIFIED — verify before publishing:** names real companies/indices (Nikkei, Toyota,
  Sony, Tokyo Electron, Mizuho, Mitsubishi UFJ, Bank of Japan) and cites specific figures
  (Nikkei ~70,729; 1989 peak ~38,957 reclaimed Feb 2024 after 34 yrs; Tokyo Electron +78%
  YTD; Mizuho +86%; MUFG +60%; yen ~163/$). All supplied by the author and rendered as
  written; confirm every figure against primary sources before this publishes. **Voice:**
  uses the same distinct upbeat cloned voice as the rest of the series.
- **`MinimumReel`** — "The minimum trap" (why a $5,000 credit-card balance can
  take 15+ years to clear: at ~21% APR, paying only the minimum you pay roughly
  the balance again in interest; a fixed $250/month clears the same debt in ~2
  years with ~$1,100 interest — interest runs on the balance, so the faster it
  falls the less it costs). ~55s, question hook ("$5,000 on a card — over 15
  years to clear?") with a ~1.2s post-hook pause, red thesis card "Solvent / And
  indebted" mid-tail, and a question close ("15 years of this — paying for
  what?"). Stat-heavy and media-dense (18 media / 2 black / 1 red). Its own
  footage under `public/minimum/`. Media credits (Pexels, free license) — videos:
  an hourglass (1188938), a card tap at a terminal (6540557), scissors making a
  cut (6949983, closing beat). Photos: a plain card held up (7821729), a calendar
  grid (11706725), hands counting cash over a planner (4475523), a rising coin
  stack (7111600), a pile of $10 bills (6590636), a red gauge at the top
  (12187076), a hand of $100 bills (14820436), bills falling by a flag (4386420),
  cash into an envelope (11809349), a hand stamping a document (6358840), a piggy
  bank with coins (3943716), a balance scale (8431782), a rising trend chart
  (6801648), a falling chart (38808472), and a close-up clock (280277).
  **Unverified figures — verify before publishing:** the ~$1.25T total US card
  debt and ~21% average APR track recent reporting, and the amortization figures
  ($5K at ~21% ≈ 15+ yrs / ~$5K interest on the minimum vs ~2 yrs / ~$1,100 on a
  fixed $250) are standard minimum-payment math on stated assumptions — sanity-
  check the rate and minimum-payment formula before publishing.
- **`HeirsReel`** — "Building vs keeping" (why so many family fortunes vanish
  within three generations: the skill that BUILDS wealth — an individual feat of
  earning, saving, investing, and compounding — and the skill that KEEPS it
  across decades and many heirs — a coordination problem of governance,
  discipline, and shared values — are almost opposites; creation rewards
  concentration and risk, preservation rewards restraint, so the mindset that
  makes a fortune won't automatically protect one). ~52s, question hook
  ("Fortunes gone in 3 generations?") with a ~1.2s post-hook pause, red thesis
  card "The mindset that makes it / won't protect it" mid-reel, and a question
  close ("Harder to make it, or make it last?"). Media-dense (18 media / 2 black
  / 1 red). Its own footage under `public/heirs/`. Media credits (Pexels, free
  license) — videos: a seedling growing (30252372), a grandfather and child
  walking a forest trail (10420165, closing beat). Photos: a grand mansion
  (38255315), a hand laying brick (39325789), a safe-dial macro (35625441), an
  aerial forked path (14240460), a campfire in snow (2004385), a lone cliff
  silhouette (1533863), a family with an advisor at a table (8205336), a
  multi-generation family hug (6148958), a handshake (6773401), a young hand on an
  elderly hand (32768955), tossed dice (20502040), a ship's anchor (12069400), a
  fan of cash held to the face (4968649), a decaying columned mansion (27568960),
  hands cupping a seedling (5027798), and a watchmaker's hands (8327868).
  **Conceptual — no hard figures to verify:** the only number is "three
  generations," used as framing (the well-known "shirtsleeves to shirtsleeves"
  pattern), not a precise statistic.
- **`SafeReel`** — "Safe isn't risk-free" (idle cash quietly loses buying power
  to inflation even though the account balance never drops: a ~0.5% account with
  ~3% inflation loses about 2.5% of its purchasing power a year — a negative real
  return, with nobody withdrawing a cent; because the number never drops the loss
  is invisible, compounding into a real loss). Nominal safety isn't real safety —
  cash guards you from a market dip but exposes you to inflation, right for money
  you need soon, costly for money you keep for years. ~56.6s, question hook ("Your
  money loses value — but the number never drops?") with a ~1.2s post-hook pause,
  red thesis card "Safe / Not risk-free" mid-tail, and a question close ("What is
  'safe' money quietly costing you?"). Media-dense (20 media / 2 black / 1 red).
  Its own footage under `public/safe/`. Media credits (Pexels, free license) —
  videos: a supermarket-aisle POV (39240106), a man reviewing papers (7125823,
  closing beat). Photos: a balance-sheet under a magnifier (7821689), abstract
  flat neon lines (16503709), a one-cent penny (26077633), blank price tags
  (8058803), a deflating balloon (16697108), cash tucked in a jar (7680483), a
  home safe (32334240), a torn banknote (5909820), a small pile of bills
  (13668628), autumn trees mirrored in a lake (34547571), a figure walking into
  fog (35317730), an abstract green step field (18874311), sand running through
  fingers (7527875), a snow roller (39183702), a woman under an umbrella
  (5357833), a hand offering cash (6694561), a year wall-planner (7504584), and a
  descending staircase (36463257). **Illustrative figures — verify before
  publishing:** the 0.5% yield / 3% inflation / ~2.5% real-loss example is
  round-number arithmetic on stated assumptions, not a claim about any specific
  account or period (real cash returns vary by year). **Theme note:** same
  idle-cash-vs-inflation theme as `MattressReel` and `InflationReel` — publish
  only one of the three to a given audience.
- **`RealReel`** — "Nominal vs real" (A/B twin of `SafeReel`: cash isn't the
  risk-free choice it looks like — an account paying ~0.5% while prices rise ~3%
  loses about 2.5% of its buying power a year, a negative real return, even though
  nobody withdrew a cent and the balance never falls; because the number holds,
  the loss is invisible, compounding into a real loss). Nominal safety isn't real
  safety — cash guards a market dip but exposes you to inflation, right for money
  you need soon, costly for money you keep for years. ~50.7s, challenge hook ("You
  think cash is risk-free. So why does an account paying 0.5%, while prices rise 3,
  lose about 2.5% of its buying power a year?") with a ~1.2s post-hook pause, red
  thesis card "Safe / Not risk-free" mid-tail, and a question close ("What is
  'safe' money quietly costing you?"). Media-dense (19 media / 2 black / 1 red).
  Its own footage under `public/real/`. Media credits (Pexels, free license) —
  videos: unbranded studio mini shopping carts (5924970), a pensive older man at a
  window (8087768, closing beat). Photos: a fan of $100 bills (11624906), a
  quarter-dollar macro (38764230), red sale tags (7986975), melting ice cubes
  (3675620), rolled banknotes (164527), a red piggy bank (7828324), a steel chain
  link (145683), a fan of $20 bills (4386370), a brick building mirrored in water
  (18671201), a misty forest (1367192), abstract green lines (33639667), an
  hourglass (1178684), a descending spiral staircase (15505900), an umbrella
  silhouette in rain (3581959), a leather wallet with bills (915915), a monthly
  calendar grid (273011), and a downward candlestick chart (35118242).
  **Illustrative figures — verify before publishing:** the 0.5% yield / 3%
  inflation / ~2.5% real-loss example is round-number arithmetic on stated
  assumptions, not a claim about any specific account or period. **Theme note:**
  same idle-cash-vs-inflation theme as `SafeReel`, `MattressReel` and
  `InflationReel` — publish only one of the four to a given audience.
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
- **`CertainReel`** — "The certain market" (Service Corporation International) —
  the **question-hook / question-close A/B twin of `SciReel`.** Same case (the
  quiet national consolidator of local funeral homes and cemeteries, funded by
  pre-need contracts years in advance, at ~22% operating margins), but this cut
  opens on a question ("Do you know this company? … almost none know its name")
  with a ~1.2s post-hook pause, and closes on one ("How many others are you
  walking past?"). ~57s. Its own footage under `public/certain/` — no asset
  shared with SciReel or any other reel. Media credits (Pexels, free license) —
  videos: glass corporate tower (7065900), market-price ticker (7578632),
  memorial candle flame (5767251), residential walking POV (37368966, closing
  beat). Photos: overcast small-town main street (17485603), white lilies close-up
  (13256146), white clapboard chapel (3508134), softly-blurred headstone rows
  (8050335), storefront with awning (14992893), plain white facade (17904894),
  empty church pews (13980225), hushed lobby interior (6758531), hand signing a
  document (7054505), coin savings jar (7680466), aerial suburban rooftops
  (7937274), aerial green memorial park (2524353), fan of banknotes (7680556),
  calculator on a chart (7580854), rising coin stacks (19693228), tree-lined
  residential street (12551268). **Unverified claims:** names a real public
  company (Service Corporation International, NYSE: SCI) and cites specific
  figures — ~700k families/yr, ~1,490 funeral homes, ~496 cemeteries, $4.186B
  revenue, ~22% operating margin, ~$928M operating income. Treat as approximate
  and verify against SCI's latest 10-K/annual report before publishing. **Twin
  note:** same topic as `SciReel` — publish only one twin to a given audience,
  scheduled apart.
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
- **`ForecastReel`** — "What a forecast is worth" (a ~58s reel; the fuller **A/B twin of
  `AttReel`**, telling the same AT&T/McKinsey story at length and opening/closing on questions
  rather than the older ~35s declarative cut). AT&T's Bell Labs invented cellular technology, then
  in 1980 asked McKinsey how big US mobile would get by 2000; the study came back at ~900,000
  subscribers — a rounding error next to the wired network. Saying no looked disciplined: handsets
  were heavy and costly, coverage thin, and the wired business was the crown jewel, so betting on a
  gadget the study called tiny was hard to justify to a board, and AT&T stepped back. By 2000 the
  US had over 100 million cellular subscribers — the forecast undershot reality by more than 120x —
  and to get back into the business it had walked away from, AT&T bought McCaw Cellular in 1994 for
  ~$12.6 billion. The lesson: a forecast isn't the future; even the company that invented the
  technology mistook a slow start for a small market. Question hook ("...pay $12.6 billion to undo
  one bad forecast?") and a rhetorical question close ("what's any forecast actually worth?"); a
  ~1.5s post-hook pause (the hook holds through the silence before the reveal — house convention);
  four count-up `stat` beats (900K / 100M / 120x / $12.6B), a red "A forecast isn't the future."
  `impact` card as the mid-tail thesis, and the question close on a moody night skyline rather than
  the red card. Continuous cloned voiceover (+6% pace, normalized); durations on exact spoken-word
  timestamps; music normalized and mixed at 0.17. Entirely its own fresh footage under
  `public/forecast/` — no asset shared with AttReel or any other reel. Media credits (Pexels, free
  license) — videos: a hand on a vintage keypad phone (8102790), a soldering iron on a circuit
  board (5736195), executives reviewing documents (8847933), a packed subway crowd on smartphones
  (34576168), and a night city skyline (34398886). Photos: a red 80s brick phone (37401990), a
  printed report with a bar chart (7947854), a cellular tower (36359722), a vintage rotary phone
  (33419837), a financial trend chart (7947757), a business handshake (6773517), a banded bundle on
  US $100 bills (11624820), and corporate glass towers (19570444). **Brand-safety:** footage was
  screened for legible marks — a SONY-branded phone, a distasteful placeholder form, and Cyrillic
  prop money were rejected and re-sourced; the shipped assets carry no phone-maker, carrier,
  AT&T/McKinsey, or other legible company marks. **FLAG — real company / real figures:** AT&T, Bell
  Labs, McKinsey, and the McCaw acquisition are named as written, and the ~900K-forecast /
  100M-by-2000 / ~120x / ~$12.6B (1994) figures are widely cited but approximate (they vary across
  retellings — the same caveat AttReel carries); verify before publishing.

- **`TwiceReel`** — "The bill" (fast NEWS reel). NEW topic: **what it would cost to reopen the 2016
  Brexit vote**, hung on Andy Burnham's claim that Russia interfered in the referendum and his
  openness to campaigning to rejoin the EU. 29 beats. Question hook ("What does it cost to reopen a
  decision 17 million already made?") with a ~1.1s post-hook pause (the hook caption holds through
  the silence before the reveal — house convention), and a rhetorical-question close ("Would you
  vote again? Tell me below.") on footage rather than the red card. Three fact cards rendered as
  `lines` beats (2020 "never assessed" / 2026 "asked. yes."; **17,400,000 votes for Leave**; OBR
  **≈ −4% of GDP / trade ≈ −15%**), two black reflective beats, and one red
  "...asked to pay twice." `impact` card as the mid-tail thesis. Continuous cloned voiceover
  (normalized), durations locked to exact spoken-word STT timestamps; music mixed at 0.17. Entirely
  its own fresh footage under `public/twice/` — no asset shared with any other reel. Media credits
  (Pexels, free license) — videos: a hand posting a ballot into a plain white box (7103424), a
  polling/count scene (37215067), and a working container port (35907894). Photos: a lit podium
  (6949364), a fibre-optic patch panel (5354506), a desk calendar (9036980), a redacted
  document (12220471), an archive dossier (8371715), an empty committee desk (19165510), a press
  microphone cluster (13061474), a magnifier over a printed report (17284804), stacked archive
  boxes (8371705), a crossroads/signpost (17342281), a Europe map (9494908), a tick-slip with a red
  checkmark (8850706), scattered ballots (8947495), a government building (38981286), a downward
  chart (7947698), a pen on a financial chart (13156204), a clock face (9862247), a ledger book
  (12983115), a weathered "years" calendar block (5417675), a blank price tag (6441572), fog over a
  road (97065), a gavel (34611943), and a hand ticking a checkbox (36496969). **Brand-safety:**
  every one of the 26 media beats was audited from the final render for legible marks, flags,
  country-specific civic/currency imagery, and foreign-language text. Rejected and re-sourced: the
  hook's original ballot-box clip (a US red/white/blue "I VOTED" sticker), a German-language
  stamp-catalogue page under the magnifier, a within-reel duplicate ballot image, a US ballot naming
  "Senator"/"State Representative", a code screen carrying the Spanish word "Clase", and a
  calculator shot with recognizable US coins. The shipped assets carry no flags, flag-colour motifs,
  company marks, foreign-language text, or country-specific civic/currency imagery, and no sharp
  faces. **FLAG — named individuals / contested claims:** Andy Burnham (corrected to **Mayor of
  Greater Manchester**, not PM, per client), Boris Johnson, the 2020 ISC finding that the government
  "never assessed" Russian interference in the referendum, the 17.4M Leave figure, and the OBR
  ≈ −4% GDP / ≈ −15% trade estimates are rendered as written but are a mix of attributed claims and
  approximate figures that **require a legal/defamation and fact check before publishing**.

- **`CargoReel`** — "The cheapest hull" (fast NEWS reel). NEW topic: **what it actually costs to
  ship grain through a war** — the Black Sea cargo-ship drone attacks of October 2026. Thesis: the
  real cost of moving cargo through the war isn't the insurance premium (the cargo owner pays that)
  — it's paid by the people on the ship, and the system is built so that's never anyone expensive;
  the grain still has to move, so it moves under the cheapest hulls, cheapest flags, cheapest crews
  (flags of convenience), where the insurance says don't go. 30 beats. Question hook ("What does it
  cost to ship a cargo of corn through a war?") with a ~1.1s post-hook pause, and the supplied CTA
  question close ("Who should be paying for this? Tell me below.") on a sea horizon. Four fact cards
  rendered as `lines` beats (20 MILES OFF BULGARIA / 11 MISSING; 3 ATTACKS / 8 DAYS / **23 DEAD OR
  MISSING**; GUINEA-BISSAU / TOGO / PALAU; 23 PEOPLE / CORN STILL REACHES ITALY), two black
  reflective beats, and one red "The bill gets paid by whoever is cheapest to lose." `impact` card
  as the mid-tail thesis. Continuous cloned voiceover (normalized), durations locked to exact
  spoken-word STT timestamps; music mixed at 0.17. Entirely its own fresh footage under
  `public/cargo/` — no asset shared with any other reel. Media credits (Pexels, free license) —
  videos: a bulk carrier's deck in open sea (36464448), man-overboard rescue floats (20621921), and
  grain augered into a hold (13125028). Photos: moody dark ocean (6288566), a quadcopter drone
  (3722737), a rocky coastline (36497146), a marine radar/sonar console (3582597), a life raft in
  rough sea (33492618), an English "january" calendar (5417669), a derelict shipwreck (37470632), an
  empty misty sea (18863547), a breakwater harbour at dusk (12202308), golden wheat grain
  (18378050), a smoke plume over water (34704004), a single candle (6129843), deck mooring bollards
  and rope (12069410), a vintage world map under a magnifier (7412013), gloved seafarer's hands on a
  rope (8917046), a rusty peeling hull (35892425), a red-marked nautical chart (2678374), a drone
  silhouette at dusk (12469812), a neoclassical government facade (13283526), a golden wheat field
  (17138441), a "home insurance policy" flat-lay (7735632), a weathered life jacket (13499020),
  grain silos (33520448), and a lone sea horizon at dawn (32846096). **Brand-safety:** the topic is
  literally ships-and-flags, so every asset was screened — twice at source and again from the final
  render — for national flags, readable ship names / IMO numbers / company livery / port signage,
  and foreign-language text. Rejected and re-sourced during sourcing: MSC line livery + a ship name,
  a "DJI MAVIC" logo, several painted vessel names ("HIND-M", a name on a life ring), a
  Portuguese "MARÇO" calendar, a French "Rivière Saguenay" chart, a Soviet hammer-and-sickle emblem,
  facades flying national flags, Cyrillic "NARODNA BIBLIOTEKA" text, a US flag, a branded life-jacket
  logo, and "JOHN DEERE"/KAMAZ machinery branding. The shipped assets carry **no national flag of any
  country**, no readable brand/ship-name/signage, no foreign-language text, and no identifiable sharp
  human face (hands/silhouettes only). **SENSITIVE — VERIFIED REAL, confirm details before
  publishing:** these are real October 2026 events (drone strikes on cargo ships off Bulgaria in the
  western Black Sea), corroborated by Reuters/Insurance Journal, Bloomberg, NBC, Euronews, CBC and
  gCaptain, and the script HEDGES attribution responsibly ("nobody has confirmed who fired the
  drones; Ukraine says Russia"). Two cautions: Rumen Radev is Bulgaria's **President**, not PM, and
  the ambassador summons runs through the state/Foreign Ministry (the script's "Bulgaria's PM" is
  rendered verbatim per client); and casualty counts, ship names and distances were still
  provisional/disputed across outlets at publication (the 23 total reconciles: 11 + 10 + 2).
  Legal/defamation-check the Russia-attribution framing and confirm the live figures against primary
  sources before this publishes.

- **`CentsReel`** — "Three cents" (fast NEWS reel). NEW topic: **why the world's only trillionaire
  spent $366M on a midterm he'd said he was done with** (Elon Musk's October 2026 political giving).
  Thesis: it isn't a donation, it's a **premium** — when a company's revenue depends on who chairs
  the committee, $366M (about three cents on every hundred of a >$1T fortune) is the cheapest
  insurance policy in America; the question was never why he spent it, it's why it's so cheap. 29
  beats. Question hook ("Why would the only trillionaire spend $366M on an election he quit?") with a
  ~1.1s post-hook pause, and the supplied CTA question close ("Donation or insurance? Tell me
  below."). Four number cards rendered as `lines` beats (MAY "DONE ENOUGH" / OCT **$366,000,000**;
  **$158M** TO ONE PAC / > ALL DEM DONORS; 2024 $290M / 2026 $366M; **$366M ÷ $1T = 0.04%**), two
  black reflective beats, and one red "This isn't a donation. It's a premium." `impact` card as the
  mid-tail thesis. Continuous cloned voiceover (normalized), durations locked to exact spoken-word STT
  timestamps; music mixed at 0.17. Entirely its own fresh footage under `public/cents/` — no asset
  shared with any other reel. Media credits (Pexels, free license) — video: a rocket lifting off
  (28953923). Photos: gold bars (33539240), a wall calendar (7059620), a lone mic before stage
  curtains (29858812), a flag-free capitol dome at dusk (17482000), bills fed into a counting machine
  (6266455), empty voting booths (7103098), banded cash from the back (5912587), a capitol rotunda
  dome (14495721), hands with printed cheques (6862443), an empty legislative chamber (34824202),
  balance scales (6077797), a pile of coins (7584351), cash in a black envelope (6801644), a blurred
  figure in a dark corridor (6310421), casino chips (7594235), a rally crowd from behind (13169914),
  stacked cash bundles (14338071), a gavel (5668473), a bank vault (23322329), a small stack of
  pennies (20205839), a calculator on a financial chart (7580753), a satellite/radar dish
  (10395944), hands signing a contract (16475250), an empty committee hearing room (6949383), a
  rain-soaked umbrella (5052681), and a vintage balance scale (8667547). **Brand-safety:** this is a
  US-politics topic, so every asset was screened — twice at source and again from the final render —
  for national flags, identifiable faces (no Musk/Trump/Paxton or any politician), party mascots or
  campaign logos, company logos (no Tesla/SpaceX/X/NASA), banknote portrait faces, and
  foreign-language text. Rejected and re-sourced: a US flag on a ballot box and below the Capitol
  dome, a "GLOBAL INTERGOLD"/"FICHET PARIS"/"PREMAX" brand mark, a clear SpaceX logo + "Canada" on an
  ISS arm, Russian/Portuguese/Polish/Chinese prop-money text, broadcaster and MacBook logos, multiple
  Franklin/president/monarch banknote-and-coin portraits, blurred recognizable faces, and a near-
  duplicate insurance flat-lay. The shipped assets carry **no national flag**, no identifiable face,
  no party/company logo, no banknote portrait, no readable brand/signage, and no foreign-language
  text. **SENSITIVE — verify + legal-check before publishing:** the donation figures are real Oct
  2026 reporting (NYT, corroborated by Reuters/CNBC/CNN/NBC/The Hill/Time) — ~$366M cycle / $276M
  since July / $158M to the Senate Leadership Fund / $76M to America PAC / $20M to the Congressional
  Leadership Fund / biggest known donor / ~$290M in 2024 / more via non-disclosing groups. Harder to
  verify or likely overstated: **SpaceX's "$2 trillion" valuation** (reported nearer ~$400B), the
  $10M-Paxton line, the ">every Dem rival-PAC donor that quarter" comparison, and the Dem-investigation
  claim; the "three cents" math rides on the >$1T net-worth figure. The motive framing ("it's
  insurance to protect contracts") is **editorial opinion about a named living person** — run a
  defamation/fact check before this publishes.

- **`PumpReel`** — "The pump" (fast NEWS reel). NEW topic: **why Washington is pressing Ukraine to
  stop hitting Russian oil refineries three weeks before the US midterms.** Thesis: Washington isn't
  managing a war, it's managing a price — Ukraine's refinery strikes are its most effective weapon
  (they pull Russian diesel off the world market), but they also push US diesel up, and three weeks
  before an election the only ask that counts is "stop fighting the way that costs us money"; Russia's
  weakest point is the same as America's — the pump. 28 beats. Question hook ("Why is Washington
  telling Ukraine to stop hitting Russian refineries?") with a ~1.1s post-hook pause, and the supplied
  CTA question close ("Should Ukraine stop? Tell me below."). Four cards rendered as `lines` beats
  (WASHINGTON TO KYIV / STOP THE STRIKES; EXPORTS BANNED / **BRENT $100+** / US DIESEL RECORD; THE
  THREAT / HALT WEAPONS / CUT INTEL; MIDTERMS NOV 3 / **21 DAYS**), two black reflective beats, and
  one red "Washington isn't managing a war. It's managing a price." `impact` card as the mid-tail
  thesis. Continuous cloned voiceover (a hallucinated TTS tail word was trimmed), durations locked to
  spoken-word STT timestamps; music mixed at 0.17. Entirely its own fresh footage under `public/pump/`
  — no asset shared with any other reel. Media credits (Pexels, free license) — videos: an aerial
  refinery at dusk (10407687) and a hand at a fuel pump (15556113). Photos: an empty conference hall
  (5026349), a studio microphone (1871132), two soldiers in silhouette (11452326), a classical
  colonnade (36658968), an energy plant lit at night (18016857), a STOP sign (15344629), a tiltrotor
  silhouette (2962230), fuel storage tanks (11922787), an oil-tanker deck (36563588), a markets
  candlestick screen (159888), a US "$4.69" roadside fuel board (26840197), rows of oil drums
  (615670), illegible folded newspaper (5505718), brass rifle cartridges (6092076), a handwritten
  classified file (8369216), chess pieces (4800923), wire cutters severing a cable (6412542), a geared
  mechanism (17126404), a masked voter dropping a plain ballot (7103191), a plain "November" calendar
  (34541911), a US "$/GALLONS" pump display (30743598), an end-on roll of US cash (4386472), and a
  refinery at dusk (5411674). **Brand-safety:** this is a war/politics topic, so every asset was
  screened — twice at source and again from the final render — for national flags, identifiable faces
  (no Grynkewich/Putin/Trump/Zelensky/soldiers), military insignia or unit patches, gas-station /
  weapon-maker / newspaper-masthead logos, banknote portrait faces, and foreign-language text.
  Rejected and re-sourced: a US-flag-wrapped ballot box and flags under a Capitol dome, Shell/BP/Exxon
  /Wawa/Irving/Lukoil/Pumptronics/Coca-Cola station marks, a Cyrillic pumpjack ("ОПАСНО ГАЗ") and a
  "ST BERNARD PORT"/"KIRBY" refinery, Portuguese "NOVEMBRO"/"SETEMBRO" calendars, a UK "pence per
  litre" pump, a leprechaun-hat novelty-coin money shot, and many Franklin/Lincoln/Jackson banknote
  portraits + Russian/Thai/Italian/Arabic money. The shipped assets carry **no national flag**, no
  identifiable face, no military insignia, no brand/station logo, no banknote portrait, and no
  foreign-language text. **RE-ATTRIBUTION (client-directed):** the script as supplied pinned the
  "stop the refinery strikes" ask on **Gen. Alex Grynkewich** (NATO's commander in Europe); reporting
  attributes that pressure to **Washington / US officials** (the Financial Times, 11 Oct 2026, via
  CNN/Reuters-relayed coverage), and Grynkewich publicly argued the OPPOSITE (arm Ukraine; Russia
  won't break Ukraine by hitting its energy sector). Per the client's choice the "stop" ask is
  re-attributed to Washington; Grynkewich appears only for his real "fight tonight" posture.
  **SENSITIVE — verify + legal-check before publishing:** the FT threat (halt the PURL weapons
  mechanism + cut intel sharing to stop refinery strikes, over diesel/oil-price fears) is real,
  corroborated Oct 2026 reporting, and the strikes' effectiveness (~half of Russian refining capacity,
  per Ukraine) is reported. STILL CONFIRM independently: **"Brent crossed $100," "Russia banned diesel
  exports to end-October," and "US diesel record last quarter"** (not verified here); and the motive
  framing ("managing a price," hurting Trump's polling) is editorial opinion — run a defamation/fact
  check before this publishes.

- **`TicketReel`** — "The ticket" (fast NEWS reel). NEW topic: **why Rockstar would give PC players
  GTA 6 roughly four months after the console launch when GTA 5 made PC wait nineteen.** Thesis: the
  console-exclusivity window was only ever a business model that pays when it *sells consoles* — and
  this time the consoles are already sold out, so the fastest route to the money isn't exclusivity,
  it's getting GTA Online in front of every screen on earth. The game is the ticket; Online is the
  business. 27 beats. Question hook ("Why would Rockstar give PC players GTA 6 in four months when GTA
  5 took nineteen?") with a ~1.1s post-hook pause, and the supplied CTA question close ("Waiting for PC
  or buying day one? Tell me below."). Four cards rendered as `lines` beats (GTA 5: 19 MONTHS / RDR2:
  13 / GTA 6: **~4**; and the exclusivity / sold-out / Online beats), two black reflective beats, and
  one red `impact` card as the mid-tail thesis. Continuous cloned voiceover, durations locked to
  spoken-word STT timestamps; music mixed at 0.17. Entirely its own fresh footage under
  `public/ticket/` — no asset shared with any other reel. Media credits (Pexels, free license) —
  videos: a backlit PC gaming rig (13549718) and a server/data-centre aisle (39918565). Photos: a wall
  calendar (3226865), a printed list (8581014), a plain console box (9765137), hands on a controller
  (5380584), stacked coins (7584363), a retro console (16781975), a desk monitor (5380792), a cowboy
  silhouette for the Red Dead line (27962447), a business handshake over documents (8441790), a "SOLD OUT" sign (12706241),
  bare memory chips (1432677), a factory line (36522029), a blank price tag (5650026), gold bullion
  coins (8442342), a plain payment card (11316617), a stadium/venue ticket (27639885), a rising graph
  (7947759), a crowd (5193526), a mechanical keyboard (37722338), a bank of screens (34212916), a queue
  (12591405), and a globe (20881520). **Brand-safety:** this is a named-company gaming topic, so every
  asset was screened — twice at source and again from the final render — for the GTA / Rockstar /
  Take-Two / Red Dead wordmarks and key art, PlayStation / Xbox / Nintendo / Steam logos and
  brand-shaped controllers, identifiable faces, banknote portrait faces, and foreign-language store /
  box text. Rejected and re-sourced: Sony/PS4/PS5, Nintendo, 8BitDo and brand-controller marks, SK
  hynix / memory-maker logos, and a Franklin $100 banknote stack for the "most profitable" money shot
  (swapped to brand-free gold coins). The shipped assets carry **no game/console/store brand mark**,
  no identifiable face, no banknote portrait, and no foreign-language text. **SENSITIVE — verify before
  publishing:** the console launch date (**19 Nov 2026**) is confirmed. These are NOT confirmed and
  must be checked (and are framed in the reel as reported, not fact): the **GamesBeat "Q1 2027 PC
  release" report** (four industry sources; Rockstar/Take-Two have not confirmed, and other estimates
  skew later into 2027–2028); the **"PS5 Pro sold out / used above new / memory-chip shortage"** claim;
  and **"GTA 5 is the most profitable entertainment product ever made."** Run a fact-check on all three
  before this publishes.

- **`EscapeReel`** — "The escape route" (fast NEWS reel). NEW topic: **how Marvell Technology — a chip
  company that never sold a GPU — is up ~214% in 2026, ~10x Nvidia.** Thesis: Marvell isn't an AI-chip
  company, it's the **escape route from Nvidia**. Every hyperscaler pays Nvidia a **>70% margin on
  every GPU** (the "Nvidia tax"); the way out is custom silicon — Amazon's Trainium, Microsoft's Maia —
  but you can't build it alone, so the money that used to go to Nvidia goes to the contractor who can:
  Marvell (**20+ design wins** across Amazon, Google, Microsoft, Meta). The catch: four customers — lose
  one design and the escape route becomes a cliff. 33 beats. Question hook ("How is a chip company
  that's never sold a GPU up 214%, 10x Nvidia?") with a ~1.1s post-hook pause, and the supplied CTA
  question close ("Nvidia, or the companies trying to leave it? Tell me below."). Three number cards as
  `lines` beats (**MRVL +214% / NVDA +22% / AVGO +3%**; **20+ DESIGN WINS / AMAZON·GOOGLE / MICROSOFT·
  META**; **MARKET $75B TO $94B / REVENUE $18B**), two black reflective beats, and one red "The Nvidia
  tax." `impact` card as the mid-tail thesis. Continuous cloned voiceover, durations/reveals locked to
  the VO via a scribe_v1 word-timestamp anchor pass (`public/escape/voiceover.mp3`, ~104.0s incl. the
  pause); music mixed at 0.17. Entirely its own fresh footage under `public/escape/` — no asset shared
  with any other reel. Media credits (Pexels, free license) — videos: a rainbow oil-swirl macro
  (26051329), an abstract glowing-circuit animation (31710198), a CNC cutting head throwing sparks
  (28221363), an aerial data-center campus (38081600), falling green binary "data rain" (19808379), a
  purple plexus network (33248294), a glowing-red chip with light-trails (36387552), and an abstract
  tunnel toward light (32934216). Photos: a gold CPU die (2105927), a rising chart on a monitor
  (30332440), a black chip on a green board (40068136), a copper PCB macro (6755081), a gloved/bare hand
  holding an iridescent wafer substrate (4705607), blue-lit server racks (17489151), gold CPU pins
  (270549), a dark circuit board (2182863), an empty auditorium/podium (34476625), a bar chart on paper
  (7054380), a US dollar Great-Seal/pyramid macro — no portrait (7076318), a descending industrial
  staircase (33688138), hands soldering a plain green PCB — no face (38145576), a finned heatsink with
  copper heat-pipes (31665486), a silhouetted lone worker at a red-lit door (7739881), a B&W coin macro
  — no portrait (7214230), a coastal cliff edge (31511695), a forked forest path (31747084), a copper
  circuit-trace macro (34924858), a glowing microchip (28767589), a road to a bright horizon (35574108),
  and four tall stone columns (14557887). **Brand-safety:** this is a named-company semiconductor topic,
  so every asset was screened — at source and again from the FINAL render (the audit caught five live
  misses that were re-sourced and re-rendered). Rejected and replaced: a fab clip with Chinese "捷泰科技
  / JIETAI TECHNOLOGY" signage; a stock heatmap full of real tickers (NVDA/AMD/MSFT/AAPL/MRVL/Micron);
  an "EUR/USDC" forex ticker; "OMRON" relays on a labelled refrigerator control board; plus (caught at
  source) Yaskawa/KUKA/FANUC robot-arm logos, Intel/AMD/Realtek/XFCE chip wordmarks, SAMSUNG server
  labels, a Binance watermark, Bitcoin/crypto coin stacks, and Franklin $100 portraits. The shipped
  assets carry **no company logo/wordmark, no readable real ticker, no foreign-language text, no
  identifiable face, no banknote portrait, no national flag, and no crypto symbol.** This reel names
  **Nvidia** as the foil like `CageReel` / `PaperReel` / the SpaceX-GPU reel — different subject
  (Marvell) and thesis, but **schedule it apart from those for the same audience.** **SENSITIVE — verify
  every figure before publishing (named public companies + financials):** the ~214% YTD (vs Nvidia ~22%,
  Broadcom ~3%), the Barron's "Maia 300 is the next leg up" piece, the "20+ design wins across Amazon/
  Google/Microsoft/Meta", the investor-day TAM raise ($75B → $94B for 2028) and ~$18B revenue outlook,
  ~60x forward earnings / "~2x a valuation model" / "−16% off the June high", and the ">70% Nvidia GPU
  margin" are all rendered as reported and must be confirmed independently. The "escape route / four-
  customer concentration" framing is editorial analysis.

- **`CounterReel`** — "The counter" (fast NEWS reel). NEW topic: **why Apple would launch a $299
  smart-home display ("HomeView") into a category that has never made money** (Amazon's devices
  division reportedly lost ~$10B in a year; Apple's own HomePod died in 3 years). Thesis: nobody makes
  money on the box — everyone's fighting to own the **voice that answers** when you ask a question in
  your kitchen. Apple isn't selling a tablet; it's buying a spot on your kitchen counter, and **$299 is
  the rent** (a Siri loss-leader land-grab, the same move Amazon made with Alexa). 30 beats. Question
  hook ("Why is Apple's new CEO launching a $299 version of a product that lost Amazon $10B?") with a
  ~1.1s post-hook pause, and the supplied CTA question close ("Would you put Siri in your kitchen? Tell
  me below."). Three cards as `lines` beats (**HOMEVIEW / $299 / 7-INCH / 6 FACES**; **HOMEPOD $349 TO
  $299 / DEAD IN 3 YEARS**; plus the inline number beats), two black reflective beats, and one red "Two
  ninety-nine is the rent." `impact` card as the mid-tail thesis. Continuous cloned voiceover,
  durations/reveals locked to a scribe_v1 word-timestamp anchor pass (`public/counter/voiceover.mp3`,
  ~103.7s incl. the pause); music mixed at 0.17. Entirely its own fresh footage under `public/counter/`
  — no asset shared with any other reel (note: this is a DIFFERENT reel from the existing housing
  `RentReel`). Media credits (Pexels, free license) — videos: an empty counter under warm lights
  (4691245), a generic smart-home touch panel (39857556), a glowing waveform (34335936), and concentric
  voice-rings (34202381). Photos: a generic black kiosk tablet on a stand (35985168), an empty circular
  auditorium (10880677), blank-screen monitors (5499551), a fabric-grille speaker — B&W, not a HomePod
  shape (31396349), a wall smart-home panel, hand only (16423104), a white wire-mesh head sculpture for
  the "face recognition" line (38078060), a blank price tag (7967222), an architectural blueprint
  (4458205), a vintage CRT monitor (8875501), a knotted/unplugged power cord (14071431), a B&W coin
  macro — no portrait (129492), a hand holding a generic blank-screen phone (6373210), an abstract
  glowing digital matrix (30547612), a stack of folded newspapers — no masthead (3866816), a purple
  wireframe-mesh brain (17483868), hands over a kitchen counter — no face (6209336), an empty shopping
  cart (12323216), a February wall calendar (36014360), a dark marble kitchen counter (8142046), house
  keys on a counter (37003193), an empty kraft box (7957726), a studio microphone (6878179), and a warm
  golden-hour kitchen (9794845). **Brand-safety:** this names Apple/Amazon/Google, so every asset was
  screened at source and again from the FINAL render. Rejected and replaced: Apple devices (an iPad
  home button, iMac/Apple-logo mockups) swapped for a generic kiosk tablet and blank monitors; a
  Nest-style branded thermostat; National Panasonic/Sony/Orion/Binatone wordmarks on vintage tech; a
  "QQQ" ticker on an up-trending chart; a "maono" mic wordmark; a wall A/C wordmark; a "Daily Star"
  masthead and a readable **coronavirus** newspaper macro (swapped for a generic folded-newspaper
  stack); crypto (Bitcoin/Ethereum) coins; and Japanese calendar text. The shipped assets carry **no
  Apple/Amazon/Google logo, no recognizable branded device, no on-screen brand UI, no readable ticker,
  no identifiable face, no banknote portrait, no foreign-language text, and no flag.** **SENSITIVE —
  this reel asserts specific, very recent, checkable claims about REAL people and companies; it is
  rendered as written but MUST be fully fact- and legal-checked before publishing:** that **John Ternus
  is Apple's new CEO** ("six weeks into the job") and that Apple unveiled a **"$299 HomeView 7-inch
  smart display, ships November"** this week (NOT verified here — treat as unconfirmed, possibly not yet
  real); **Amazon's devices division "lost ~$10B in a year"**; the **HomePod price history** ($349 →
  $299, discontinued in ~3 years); the **Ternus "no product is a better hub than the iPhone" quote**;
  and the **Bloomberg "boring on purpose" headline**. The "box is the cost / the answer is the
  business" framing is editorial analysis.

- **`BridgeReel`** — "The footbridge" (fast NEWS reel). NEW topic: **why American Airlines killed its
  one-hour Phoenix–Tijuana flight** (290 miles, its shortest to Mexico; launched Jan 2024, last flight
  2 Aug 2026 — dead at ~19 months). Thesis: the route didn't lose to a rival airline, it **lost to
  geography**. Tijuana's airport sits 20 miles from San Diego and, since 2015, the Cross Border Xpress
  **footbridge** lets you park in California, walk across the border, and board in Mexico — so from the
  US side Tijuana is a San Diego terminal in another country. Tijuana is also one of Mexico's
  best-connected domestic airports (Aeromexico ~7–9 flights/day), so the plane was competing with a
  four-hour drive and a footbridge; a route only survives if the plane is the cheapest way there.
  31 beats. Question hook ("Why did American Airlines kill a one-hour flight between two cities with
  family and business ties?") with a ~1.1s post-hook pause, and the supplied CTA question close ("Which
  route should they cut next? Tell me below."). Three cards as `lines` beats (**PHX TO TIJ / 290 MI / 1
  HOUR / DEAD AT 19 MONTHS**; **TIJ 20 MI FROM SAN DIEGO / 1 PEDESTRIAN BRIDGE**; **AEROMEXICO / 7-9
  FLIGHTS A DAY**), two black reflective beats, and one red "It lost to geography." `impact` card as the
  mid-tail thesis. Continuous cloned voiceover, durations/reveals locked to a scribe_v1 word-timestamp
  anchor pass (`public/bridge/voiceover.mp3`, ~103.7s incl. the pause); music mixed at 0.17. Entirely
  its own fresh footage under `public/bridge/` — no asset shared with any other reel. Media credits
  (Pexels, free license) — videos: a plane silhouette at dusk (28829996), a silhouette walking across a
  bridge (9756914), an aerial desert road (6335191), and night runway lights with a silhouette plane
  (10904752). Photos: a saguaro desert (4061938), an empty taxiway (3892808), push-pins on a map
  (1078850), a split-flap departure board — city names only (36681344), a desk calendar (29509484), an
  empty gate (54374), an enclosed pedestrian walkway (266041), a steel-slat border wall (11679654), an
  aerial parking lot (2402235), an empty terminal (8704693), an aerial airport apron — liveries
  unreadable (38490446), a split-flap schedule board — city names only (38343675), a map of Mexico with
  a pin (19937220), a covered pedestrian walkway (11788969), a plane silhouette at sunset (1161161), a
  December calendar (10326670), a chess knight (30182768), legs/feet walking on pavers (11692911), pins
  across a world map (8828593), an aerial desert river/terrain (35406803), a blank directional signpost
  (36411807), a wing + engine over clouds (3757137), a vintage suitcase (12025430), and an airport
  control tower (31709981). **Brand-safety:** this names a real airline in an aviation topic, so every
  asset was screened at source and again from the FINAL render. Rejected and replaced: easyJet /
  American / GOL / LATAM / British Airways / oneworld liveries and branded winglets, a "STAR ALLIANCE"
  aerial, an Ottawa/YOW.CA + French "Départs" board, Portuguese "JANEIRO" / "DEZEMBRO" calendars + a "Z
  PAPER" logo, an "Alexander Milano" suitcase badge, and readable place-name signposts. The shipped
  assets carry **no airline livery/logo, no airport brand signage, no readable airline names, no
  national flag, no identifiable face, no banknote portrait, no foreign-language brand text, and no
  readable license plate.** **SENSITIVE — names a real company and asserts specific checkable current
  claims; rendered as written but CONFIRM before publishing:** the PHX–TIJ route dates (launched Jan
  2024, last flight 2 Aug 2026, ~290 miles / ~1 hour), the Cross Border Xpress bridge (open since Dec
  2015, ~20 mi from San Diego), "Aeromexico ~7–9 flights a day into TIJ", "American's Phoenix–Monterrey
  route is cut next, in December", and "30 American destinations in Mexico" must all be verified
  independently. The "lost to geography" framing is editorial analysis.

- **`ForgivenReel`** — "The tax" (fast NEWS reel). NEW topic: **how a student-loan borrower can owe
  ~$12,000 in tax on debt they never received.** Thesis: last year's "One Big Beautiful Bill" let a tax
  exemption expire, so forgiven student debt now counts as **income** again — forgive $100K and the IRS
  treats it like $100K earned; one group estimates ~3M borrowers could face a ~$12K tax bill on debt
  they'll never see. Meanwhile the Education Dept cut staff and servicer oversight, borrowers got false
  delinquency notices, and the system that decides the tax can't process the paperwork. Whether the fix
  survives is now a line item in a budget negotiation decided by the 3 Nov midterms (a Democratic
  Congress can't repeal the bill — Trump holds the veto — but the budget has to pass). 33 beats.
  Question hook ("How can a borrower owe $12,000 in tax on money they never received?") with a ~1.1s
  post-hook pause, and the supplied CTA question close ("Did you know forgiveness is taxable? Tell me
  below."). Four cards as `lines` beats (**13,000,000 BORROWERS / 0 DEMOCRATIC VOTES**; **FORGIVENESS =
  INCOME / 3,000,000 BORROWERS / ~$12,000 TAX**; **FALSE DELINQUENCY NOTICES / BACKLOGS: MONTHS TO
  YEARS**; **3 NOVEMBER / VETO: STANDS / BUDGET: NEGOTIABLE**), two black reflective beats, and one red
  "They vote on whether relief counts as income." `impact` card as the mid-tail thesis. Continuous
  cloned voiceover, durations/reveals locked to a scribe_v1 word-timestamp anchor pass
  (`public/forgiven/voiceover.mp3`, ~104.8s incl. the pause); music mixed at 0.17. Entirely its own
  fresh footage under `public/forgiven/` — no asset shared with any other reel. Media credits (Pexels,
  free license) — video: graduates seen from behind tossing caps at sunset (8061011). Photos: a
  residential loan/mortgage application form (8292888), a calculator with coins (6266276), older hands
  over financial papers (8123845), two graduates from behind (25643188), an empty legislative chamber
  (32991337), a white-domed capitol down a mall — no flags (28532883), an income-tax questionnaire form
  — no agency seal (7821686), a pile of pennies (25961803), hands with paper checks — no face
  (6862446), a blank letter into an envelope (7318931), three students from behind on campus steps
  (7972506), a calculator showing "10 000" with coins (9822734), an empty open-plan office (5483233), a
  magnifying glass over documents (7691731), a past-due/overdue document (7927011), a clock on a stack
  of books (12170723), stacks of overstuffed files (17846111), an English "October" calendar page
  (29279352), a hand pressing a rubber stamp (39924600), a business handshake over charts — hands only
  (7693153), a "Monthly Budget" document with charts (7054413), a gavel and scale on a desk (5669602),
  rows of empty formal seats (38883416), a brass balance scale (7781900), an itemized "Expenses" ledger
  (16037849), people seen from behind (8088437), a hand signing with a pen (8730987), a rolled diploma
  with a ribbon (8177929), and a graduation cap on books (7713415). **Brand-safety (political):** this
  names real political actors, so every asset was screened — at source and again from the FINAL render
  — for national flags, identifiable faces, politicians/lookalikes, party symbols, ballots / "VOTE" /
  "I VOTED" stickers, government agency seals or names (IRS / Dept of Ed / Treasury), bank/lender logos,
  banknote portrait faces, foreign currency, and foreign-language text. Rejected and replaced: flags in
  chamber windows and US+state flags with an equestrian statue on a capitol, front-facing graduate
  faces, a uniformed/military-reading stadium crowd, Polish-zloty + Polish-text receipts, Philippine-
  peso coins with a portrait, PG&E / East Bay Energy utility bills and $100 Franklin-portrait bills,
  IRS / Form 1040 / W-9 forms, and Portuguese-month calendars. The shipped assets carry **no national
  flag, no identifiable face, no politician, no party symbol, no ballot, no agency seal, no bank logo,
  no banknote portrait, and no foreign-language text.** **SENSITIVE — this reel names real political
  actors (Trump, Democrats) and asserts specific, checkable policy claims; it is rendered as written
  but MUST be fully fact- and legal-checked (incl. a political/defamation pass) before publishing:**
  the 2025 "One Big Beautiful Bill" ending/phasing out income-driven repayment and cutting Parent PLUS
  forgiveness, "~13M borrowers / 0 Democratic votes"; the expired forgiveness tax exclusion so forgiven
  debt is taxed as income; the "~3M borrowers / ~$12K tax" estimate (attributed to "one group" — NAME
  and verify the source); the Education Dept staff/oversight cuts, false delinquency notices and
  backlogs; the 3 Nov 2026 midterms, the veto math, and the "2% fixed rate / federal refinancing"
  bipartisan bills. The "line item in a budget negotiation / voting on whether relief counts as income"
  framing is editorial analysis. **Schedule it APART from the other politics reels (`CentsReel` /
  `PumpReel` / etc.) for the same audience.**

- **`DegraderReel`** — "The option" (fast NEWS reel). NEW topic: **why Big Pharma is spending ~$28B on
  PROTEIN DEGRADERS, a drug class with exactly one approval.** Thesis: degraders *destroy* a target
  protein instead of just blocking it; the idea is ~25 years old and got its first approval (a breast-
  cancer drug from Arvinas + Pfizer) in May 2026 — one drug. Yet in two years pharma signed **>$28B** of
  deals (J&J ~$1B cash; Roche ~$700M upfront / up to $3B; AbbVie, Biogen and Novo Nordisk each ~$1.5B
  with the same small company, Neomorph). They're buying **platforms, not molecules** — small cash now,
  big milestones later — because ~**80%** of human proteins are "undruggable" the conventional way and
  the patent cliff hits by **2030**. Payoff framing: $28B is an *option on 80% of biology*; one approval
  proved the mechanism and every deal since is paying for a seat before the price rises. 36 beats.
  Question hook ("Why is Big Pharma spending $28 billion on a class of drugs that has exactly one
  approval?") with a ~1.1s post-hook pause, and the CTA rephrased as the house rhetorical-question close
  ("Breakthrough, or bubble?"). Four cards as `lines` beats (**IDEA: 2001 / FIRST APPROVAL: 2026 / 1
  DRUG**; **$28B / 2 YEARS / J&J $1B · ROCHE $3B / NEOMORPH ×3**; **PLATFORMS, NOT PILLS / SMALL CASH NOW
  / BILLIONS IF IT WORKS**; **80% UNDRUGGABLE / PATENT CLIFF: 2030**), two black reflective beats, and
  one red "An option on 80% of biology." `impact` card as the mid-tail thesis. Continuous cloned
  voiceover, durations/reveals locked to a scribe_v1 word-timestamp anchor pass
  (`public/degrader/voiceover.mp3`, ~102.2s incl. the pause); music mixed at 0.17. Entirely its own fresh
  footage under `public/degrader/` — no asset shared with any other reel. Media credits (Pexels, free
  license) — videos: a spinning lab centrifuge (4114135), an effervescent tablet dissolving in water
  (4482096), a robotic clean-room automation arm (32386523), a gloved hand on microscope objectives
  (4267248), microscope footage of a diatom filament (8739082), and a backlit soap-bubble network
  (4178366). Photos: a 3D ball-and-stick molecule (25626518), plain white pills by an unlabeled bottle
  (5699522), an antique brass microscope (12236834), clear medical vials in a tray (9259963), a
  hand-drawn "May" calendar page (15034880), US banknote edges — no portrait (4386379), a hand signing a
  generic approval form (7735699), a dropper bottle beside US $20s (5632351), low-angle glass office
  towers — no signage (258160), a colored financial chart printout (7947744), a biotech bench of sample
  tubes (3735739), an amber glass-bottle production line (36423805), teal fiber-optic patch cables
  (5073493), stacked plain green chips (7594181), a 3D molecular-structure cluster (25626509), a skeleton
  key in a keyhole (5485767), a pink microscopic surface texture (8720651), a glowing 3D biomolecule
  (25626587), a metal diamond-plate up-arrow (9773286), pills beside a digital clock (6943420), an
  embossed wax-seal document — no agency name (5425649), a coastal cliff edge (13026293), US $100-bill
  numerals — no portrait (10149291), a green traffic light with an up-arrow sign (11798545), rows of
  empty auditorium seats (32731350), and an alarm clock with a jar of coins and a featureless wooden
  mannequin (11348113). **Brand-safety:** this names real companies, so every asset was screened — at
  source and again from the FINAL render — and is free of pharma/company logos and wordmarks, readable
  drug names and pill imprints, identifiable faces, foreign-language text, national flags, foreign
  currency, and banknote portrait faces. Rejected and replaced during sourcing/audit: a "Dell"-logo
  server rack, an "intel"/"TP-Link"/"BD"/"unifrutti" wordmark, a "PENTALGIN" pill imprint, euro/rupee/
  zloty + Cyrillic/German-text documents and coins, and multiple Franklin/Washington/Jackson banknote
  portraits. **UNVERIFIED — names real companies and asserts specific financials and an approval date;
  rendered as written but MUST be fact-checked before publishing:** the first protein-degrader approval
  (Arvinas/Pfizer breast-cancer drug, "May 2026"); the >$28B / 2-year deal total; J&J ~$1B cash; Roche
  ~$700M upfront up to $3B; AbbVie/Biogen/Novo Nordisk each ~$1.5B with Neomorph; the ~80% "undruggable"
  figure; and the 2030 patent-cliff framing. The "option on 80% of biology / paying for a seat" framing
  is editorial analysis.

- **`AccountReel`** — "The account" (fast NEWS reel). NEW topic: **why Pepsi bought KFC in 1986 — and why
  it just lost the fountain account it bought the chain for.** Thesis: KFC is dropping Pepsi for Coca-Cola
  across ~**3,718** US restaurants (rollout January, done spring 2027), ending a **40-year** tie. In 1986
  KFC was Coke's #2 US fountain account (behind McDonald's); Pepsi's answer was to **buy the company** (it
  owned KFC, Pizza Hut, Taco Bell; spun them off in 1997 but kept the soda — 30 years of loyalty to a
  former parent). Pepsi has also lost Marriott and Costco food courts while Coke added Culver's, Arby's,
  Panda Express; Pepsi's CEO admits it's fallen behind in soft drinks; one analyst called KFC "the optical
  straw that breaks the camel's back." The mechanic: a fountain drink costs pennies and sells for dollars
  — the **highest-margin** menu item — so Coke/Pepsi don't just sell syrup, they **pay for the account**
  (marketing, equipment, rebates). Payoff: you can buy loyalty once, but keeping it is a payment every
  contract cycle — and this time Pepsi **lost the auction**. 35 beats. Question hook ("Why did Pepsi buy
  an entire fried-chicken chain in 1986…?") with a ~1.1s post-hook pause, and the CTA as the house
  rhetorical-question close ("Do you even notice which cola your fast food serves?"). **Captions match the
  VO verbatim** (except the three stylized number cards: 3,718 RESTAURANTS / PEPSI OUT, COKE IN / JAN
  2027; 1986 / PEPSI BUYS KFC / COKE'S #2, GONE; PEPSI LOST: KFC-MARRIOTT-COSTCO / COKE WON: ARBY'S), two
  black reflective beats, and one red "And this time, Pepsi lost the auction." `impact` card as the
  mid-tail thesis. Continuous cloned voiceover, durations/reveals locked to a scribe_v1 word-timestamp
  anchor pass (`public/account/voiceover.mp3`, ~106.6s incl. the pause); music mixed at 0.17. Entirely its
  own fresh footage under `public/account/` — no asset shared with any other reel. Media credits (Pexels,
  free license) — videos: dark cola poured over ice (8676987), a cola-fizz/ice macro (8676959), cola
  poured between plain glasses (8676950), dark syrup flowing (4458579), cola dispensed over ice (9021805).
  Photos: a "Monday/Thursday" day-planner (7428859), plain fried chicken pieces — no bucket (33254639), a
  blurred restaurant dining room (8495947), a dry-erase wall month calendar (28891929), a business
  handshake — hands only (33175653), a retro tiled soda-counter (36486522), a generic burger on a tray
  (5374419), a desk of binders and papers (15616259), a blue glass office tower — no signage (19279351), a
  restaurant interior with a skylight (30550197), an antique cash register with price keys (9258000), tree
  stump rings (37308882), a hotel lobby corridor (33857126), a kraft takeout bag — no logo (4440858), a
  tug-of-war rope (5851827), white drinking straws (5377155), an unbranded drink-tap spout (30582958), a
  cash-register till drawer of coins — B&W (38764731), unbranded glass beverage dispensers (26546527),
  empty diner booths (30251912), a hand signing a contract (7641842), a discarded plain paper cup — B&W
  (18399845), a "$1,000"-banded cash strap — no portrait (11624762), a pavement U-turn arrow (37357832), an
  empty retail room (35539060), hands exchanging folded US cash — no face (10400717), and bill envelopes
  with a calculator (6110309). **Brand-safety:** this reel names a dozen brands, so every asset was
  screened — at source and again from the FINAL render — and is free of ALL company logos/wordmarks (esp.
  Pepsi / Coca-Cola / Coke / KFC / McDonald's / Marriott / Costco / Culver's / Arby's / Panda Express /
  Pizza Hut / Taco Bell), readable cups/signage/menu boards, identifiable faces, foreign-language text,
  national flags, foreign currency, and banknote portrait faces. Rejected and replaced during
  sourcing/audit: a Coca-Cola cup on a chicken plate, a "Five Guys" dining room, "National"/"Anker" cash
  registers, McCafé/McDonald's takeout bags, food courts showing "Texas Chicken"/"Wagamama"/"Panera", a
  Pepsi/Coca-Cola/Fanta/Sprite dispenser wall, Cyrillic "SOUVENIR PRODUCTION" cash bands, euro notes, and
  multiple prominent Franklin/Jackson $100/$20 portraits (swapped for banded-strap / till-drawer / folded
  / blurred shots). **UNVERIFIED — names real companies and asserts specific facts; rendered as written
  but MUST be fact-checked before publishing:** the KFC→Coca-Cola switch across ~3,718 US restaurants
  (rollout Jan, done spring 2027); the 40-year tie; the 1986 purchase and KFC being Coke's #2 fountain
  account behind McDonald's; the 1997 spin-off; Pepsi losing Marriott/Costco and Coke adding
  Culver's/Arby's/Panda Express; the Pepsi-CEO admission; the "optical straw" analyst line. The "lost the
  auction / buy loyalty once" framing is editorial analysis.

- **`MetricReel`** — "The metric" (fast NEWS reel). NEW topic: **why Netflix fired the content chief
  behind its biggest hits the day after its biggest layoff.** Thesis: Wed Netflix cut ~**1,000** jobs
  (6%, its largest layoff); Thu chief content officer Bela Bajaria (~10 yrs) is out, replaced by Peter
  Rice (ex-Disney/Fox, starting "the 26th"). Her slate WAS the hits — Squid Game, Bridgerton, Wednesday,
  the live-sport push into WWE/NFL — and by the old metric, **subscribers**, she won the streaming war.
  But the metric changed: total viewing **hours** rose only ~**2%** in H1 2026, and Netflix is under ~**8%**
  of US TV time while **YouTube** is bigger — it's losing to a platform that pays nothing for most of its
  content. Because Netflix now sells **ads**, advertisers pay for hours not sign-ups, so flat hours = a
  flat ad business; the job changed from "find the next hit" to "find the next hundred hours." The layoff
  and the new chief are the same decision: it retired the metric she was hired for. 40 beats. Question
  hook ("Why did Netflix fire the executive behind Squid Game and Bridgerton the day after its biggest
  layoff ever?") with a ~1.1s post-hook pause, and the CTA as the house rhetorical-question close ("How
  many hours a week do you actually watch Netflix?"). **Captions match the VO verbatim** (except the three
  stylized number cards: WED −1,000 JOBS / THU CONTENT CHIEF OUT; SQUID GAME / BRIDGERTON / NFL / WWE;
  ENGAGEMENT +2% / NETFLIX <8% / OF ALL TV TIME), two black reflective beats, and one red "It retired the
  metric she was hired for." `impact` card as the mid-tail thesis. Continuous cloned voiceover,
  durations/reveals locked to a scribe_v1 word-timestamp anchor pass (`public/metric/voiceover.mp3`,
  ~107.4s incl. the pause); music mixed at 0.17. Entirely its own fresh footage under `public/metric/` —
  no asset shared with any other reel. Media credits (Pexels, free license) — videos: a blank glowing
  screen in a dark cinema (7989632), a glowing studio light on a stand (3888260), a hand scrolling a
  generic content grid (6756650), fast-scrolling grayscale data rows (12779321), a hand with a remote by a
  TV glow — no face (7328516). Photos: moving boxes (4554242), a generic pie chart (7947703), empty office
  desks (9300765), a glass-door office (6008847), a laptop on a desk — dark screen (9300736), an empty
  desk by a window (7930485), a blank film clapperboard (918281), stadium floodlights — no team marks
  (5581856), a gold trophy held in-hand (6250957), a gold medal on a pedestal (7267576), ascending
  checkered blocks (1329318), a speedometer gauge (19316774), a hand over a modest trend chart (590014),
  wooden "2026" blocks (32417524), a large painted "2" (38764157), a hand over a viewing-data bar chart
  (8068691), a thin pie slice (7947715), a row of blank monitors (990423), a ring light + camera on a
  tripod — no person (4793156), a hand-drawn whiteboard flowchart (1181311), a hand tapping a plain card
  on a terminal (8475155), a blank billboard on a brick wall (12883028), an hourglass with coin stacks
  (11899617), a flat ECG trace (415779), a "jobs wanted" classifieds page (9832716), unlabeled video
  cassettes (157541), moving boxes + a covered chair (4246119), an empty director's chair (30173144), rows
  of empty stadium seats (13030345), a bin of film reels (8113563), a retro TV with static (6976094), and
  a wall of glowing screens (8720260). **Brand-safety:** this reel names Netflix, YouTube, Disney, HBO,
  WWE, NFL and real executives, so every asset was screened — at source and again from the FINAL render —
  and is free of ALL service/show/network/league/team logos and app UI (no Netflix/YouTube/Disney/HBO/WWE/
  NFL marks or interfaces, no show stills), identifiable faces (no Bajaria/Rice likeness), foreign text,
  flags, foreign currency, and banknote portraits. Rejected and replaced during sourcing/audit: a literal
  Netflix UI with show titles/faces, an Instagram app UI + username, a visible pexels.com URL, Arsenal/
  Emirates/adidas/Prime stadium boards, SONY/JVC/GoldStar/Panasonic/ASUS/Canon/TILTA wordmarks, Disney/
  Mickey VHS and real movie titles, a "nicehash.com"/Monero crypto log, a PlayStation-symbol TV wall, and
  peso/baht coins + Cyrillic/Thai/French/Portuguese text. **UNVERIFIED — names real companies/people and
  asserts specific figures/dates; rendered as written but MUST be fact-checked before publishing:** the
  ~1,000-job / 6% layoff and timing; Bela Bajaria's departure and tenure; Peter Rice (ex-Disney/Fox)
  starting "the 26th"; the Squid Game/Bridgerton/Wednesday/WWE/NFL slate; the "~2% H1 2026 viewing-hours"
  and "<8% of US TV time / YouTube bigger" figures; and the ad-business framing. The "retired the metric /
  competing with everything" framing is editorial analysis.

- **`DropReel`** — "The drop" (fast NEWS reel). NEW topic: **how Hoover Dam loses ~3/4 of its power while
  the river still flows through it.** Thesis: capacity fell from ~**1,191 MW** (last month) to a federal
  forecast of ~**317 MW** next April — a ~**73%** cut — because 12 of 17 turbines were built for a lake
  at ~1,200 ft; Lake Mead sits at ~**1,037.4 ft** and below ~**1,035 ft** those 12 cavitate (the water
  vaporises and sandblasts the blades). Only 5 units run below the line and 1 is broken, so **4**. The
  lake is ~2.4 ft above the line; forecasts cross it ~Nov 2026 (dry: Halloween) and don't recover before
  Sept 2028; ~$52M of new turbines won't arrive till 2028–2031. Mechanic: a dam sells **HEIGHT**, not
  water — power = how far the water falls (full ~590 ft of head, today ~391 ft); lose the drop, lose the
  power even at the same flow. The lights stay on because utilities buy the missing power on the open
  market — it shows up on the bill. Payoff: Hoover isn't running out of water, it's running out of
  **gravity**. 44 beats. Question hook ("How does America's most famous dam lose three-quarters of its
  power while water still flows through it?") with a ~1.1s post-hook pause, and the CTA as the house
  rhetorical-question close ("Do you live on Hoover's power?"). **Captions match the VO verbatim** (except
  the four stylized number cards: 1,191 MW → 317 MW / −73%; LAKE 1,037.4 FT / LINE 1,035 FT / BELOW IT 4
  OF 17; CROSSES NOV 2026 / BACK ABOVE 2028+ / NEW UNITS 2028–31; DROP 590 FT → 391 FT), two black
  reflective beats, and one red "It's running out of gravity." `impact` card as the mid-tail thesis.
  Continuous cloned voiceover, durations/reveals locked to a scribe_v1 word-timestamp anchor pass
  (`public/drop/voiceover.mp3`, ~109.5s incl. the pause); music mixed at 0.17. Entirely its own fresh
  footage under `public/drop/` — no asset shared with any other reel. Media credits (Pexels, free license)
  — videos: a concrete dam with spillway chutes (15214494), a weir spilling into a river (28141914), a
  spillway discharge (29973133), a tall forest waterfall (3209859), water flowing from a brick outlet
  (33003041), a dam at dusk (38994479). Photos: a dam/spillway apron (18272063), a row of hydro generator
  housings (12270481), a generator rotor close-up (10143477), a powerhouse floor (17728780), curved
  turbine blades (25285744), a full reservoir behind a dam (14594593), the Lake Mead "bathtub ring"
  (8527332), a pitted/corroded metal surface (9291217), a reservoir intake tower (5694768), a worn
  turbine runner (7565165), a few-unit generator hall (40149844), a low drought reservoir (18314321), a
  water-level gauge staff (39051919), an English Jan/Feb calendar (5417661), dry cracked earth (1710813),
  a planner spread (1558691), stacked metal rings/bearings (12951633), a CNC-machined part (28752150), a
  lathe/machine shop (18569751), an engineering blueprint (10985350), a tall dam face (9720528), penstock
  pipes down a slope (31502428), a lower canyon reservoir (33038591), a gravity-dam face (18314304), a
  distant desert city skyline at dusk — no casino signage (13555934), a transmission pylon (230518), an
  antique "KILOWATT-HOURS" electric meter — no utility name (27862196), churning water (13196420), a
  canyon river (10136687), a shallow clear stream (5629918), an October-2026 calendar (39724371), a
  power-plant switchgear hall (15893947), desert transmission lines (17594279), and a monumental dam wall
  (17993794). The forecast-decline chart (`dp04_forecast.jpg`) is a **generated** minimal red-line graphic
  on the near-black house background, not a Pexels photo (clean declining charts are saturated in the
  ledger). **Brand-safety:** every asset was screened — at source and again from the FINAL render — and is
  free of company/utility logos and wordmarks, readable brand signage, identifiable faces, foreign text,
  flags, and casino/hotel marks. Rejected and replaced during sourcing/audit: SIEMENS/GE/AEG/ARCHIREX
  machinery wordmarks, a "PG&E SmartMeter", a FedEx box, Las Vegas casino signage and a Canary Wharf
  shot with Citi/Barclays/HSBC logos, a Portuguese "ATENÇÃO" sign, a Cyrillic Schengen form, Portuguese
  calendars, and a museum placard. **UNVERIFIED — asserts specific engineering/forecast figures; rendered
  as written but MUST be fact-checked before publishing:** the ~1,191 MW last month / ~317 MW next-April
  forecast / ~73% cut; "12 of 17 turbines built for ~1,200 ft"; Lake Mead ~1,037.4 ft and the ~1,035 ft
  cavitation line; "5 units below, 1 broken, so 4"; the ~2.4 ft margin and the Nov-2026 / Halloween /
  Sept-2028 crossing dates; ~$52M new turbines (2028–2031); and the ~590 ft → ~391 ft head figures. The
  "sells height / running out of gravity / the physics moved" framing is editorial analysis.

- **`AssetReel`** — "The assets" (fast NEWS reel). NEW topic: **why the oldest Americans got ~38%
  richer in three years while the youngest got ~23% poorer — in the same economy.** QUESTION/STORY/
  ANSWER/CTA. Thesis from the Federal Reserve's Survey of Consumer Finances: median net worth for
  households headed by someone 75+ rose ~38% since 2022 (after inflation) while under-35s fell ~23%; the
  national median rose only ~2% and every other age band moved <6% either way — the gap is entirely at the
  two ends (the oldest household now holds ~15× the youngest, up from ~9×). The mechanism is ownership, not
  income: older households hold homes and portfolios (both rose); younger households are less likely to own
  a home (~35%) and a bigger share of what they own is a car (which fell). Same economy, opposite results,
  because the assets moved in opposite directions — the oldest group didn't do anything different, the
  things they already owned appreciated; the youngest had the biggest jump on record in the pandemic
  (stimulus + paused loans) then it reversed, with the worst graduate job market on record and housing at
  its least affordable in ~40 years. Payoff: the economy didn't pay *people* for three years, it paid
  *assets* — own the house and the shares and you got paid for sitting still; if your biggest asset had
  wheels, you got charged. The wealth gap isn't old vs young, it's whoever got in before the price went up
  vs everyone else. Rhetorical-question close + comment CTA ("What's your biggest asset: the car or the
  house? Tell me below."). On-screen hook is "How did the same three years make one generation rich and
  another one broke?" 40
  beats: 37 media (incl. 4 stylized number cards — `75+ +38% / UNDER 35 −23%`; `ALL FAMILIES +2% / OLDEST
  ÷ YOUNGEST 9× → 15×`; `HOUSES↑ STOCKS↑ CARS↓`; `PANDEMIC +140% / THEN −23% / HOUSING 40-YR LOW`), 1 red
  impact ("It paid assets.") mid-tail, 2 black. **Captions match the VO verbatim** (except the stylized
  number cards; spoken figures rendered as numerals). Durations/reveals/SFX locked to the VO with a
  scribe_v1 word-timestamp anchor pass (`public/asset/voiceover.mp3`, ~109s incl. the ~1.1s post-hook
  pause); music mixed at 0.17. Entirely its own fresh footage under `public/asset/` — no asset shared with
  any other reel. Media credits (Pexels, free license) — videos: an aerial over suburban rooftops
  (40115701), an aerial of a car in a driveway (19120564), a suburban home at dusk (39547387). Photos: a
  neoclassical columned facade (15556402), a raw native-gold crystal specimen — unstamped (35497189), a
  generic financial report with charts (7109203), empty rocking chairs on a craftsman porch (24245767),
  red "SALE" price tags (7986990), a dark glowing market data-board (27141316), a misty calm lake with a
  flat horizon (38738831), a canyon/ravine (5717815), an ornate marble mansion staircase (30196215), a
  Lady Justice statue with scales (6077430), a macro of the US dollar's back / Great Seal — no portrait
  (7109882), antique keys on a dark board (10473517), a US single-family suburban home (5661019), a rising
  up-arrow / coins (16091893), a worn rental apartment block (14846410), a "FOR RENT" yard sign (8962329),
  rows of old cars in a lot (10034076), an open notebook and pen (97076), an empty armchair in a dark room
  (13232674), a brick house with a red "SOLD" sign (7641828), a monochrome candlestick trading chart
  (4911411), a row of houses (7475579), a ladder against a wall (6507602), an empty turned-out pocket — no
  face (7926949), wooden model houses on a dark table (4174740), a car odometer/gauge cluster — no plate
  (8786461), an old house beside a newer block (8748149), and a "SOLD" sticker on a real-estate sign
  (8470803). Six on-screen data graphics are **generated** minimal red-line/bar charts on the near-black
  house background, not Pexels photos (clean charts are saturated in the ledger): the +38% rise
  (`as05`), the two-tall-ends age-group bars (`as10`), the Card-3 up/up/down background (`as23`), the
  diverging "opposite directions" lines (`as24`), the pandemic rise-then-crash line (`as29`), and the
  Card-4 volatility background (`as30`). **Brand-safety:** every asset was screened — at source and again
  from the FINAL render — and is free of company/bank logos and wordmarks, readable brand signage,
  identifiable faces, banknote portraits, foreign text, flags, and foreign currency. Rejected and replaced
  during sourcing/audit: a "GLOBAL INTERGOLD" gold bar, a bright flat-cartoon "Payroll" illustration,
  house keys with Chinese characters (大吉) and a "VISTA LOCK" tag, a "pen+GEAR" (Walmart) calculator with a
  readable "7 Reasons to Own / Economics of buying a home" document, a US $100 spread showing Franklin's
  portrait (swapped to the dollar's back), and a light-beige arrow graphic whose white card text was
  illegible (swapped to a generated dark background). **UNVERIFIED — asserts specific, checkable figures
  from the Fed Survey of Consumer Finances; rendered as written but MUST be fact-checked before
  publishing:** the ~+38% (75+) / ~−23% (under-35) 2022→2025 real changes; the ~+2% national median and
  "<6% for every other age band"; the ~9× → ~15× oldest/youngest ratio; the ~35% under-35 homeownership;
  "houses & stocks up, cars down"; the pandemic ~+140% then ~−23% swing; and "housing least affordable in
  ~40 years / worst graduate job market on record." The "it paid assets, not people / got in before the
  price went up" framing is editorial analysis.

- **`StraitReel`** — "The strait" (fast NEWS reel). NEW topic: **why the US won't take a standing offer
  that reopens the Strait of Hormuz in six days.** QUESTION/STORY/ANSWER/CTA. Iran's foreign minister says
  an offer is on the table: accept Tehran's terms and the strait (which carried ~1/5 of the world's oil &
  gas before the war) reopens on day 6, talks start day 7, with the war in month 8. The terms — lift the
  US blockade on Iranian ports, lift sanctions on Iranian oil exports, end hostilities on every regional
  front; Iran gives back the strait, the US gives back everything else — and the nuclear programme is NOT
  on the list. Washington's position (attributed to Vance) is the mirror image: a meaningful cut to
  enrichment BEFORE anything else — nuclear first, strait after; Tehran wants strait first, nuclear later.
  Both agree on the end state; they're fighting over the ORDER. Mechanism: the strait is the only card Iran
  holds that the world feels (oil ~$100, record diesel, mortgage rates moving with the Gulf); open it on
  day 6 and that card is gone before talks begin — for the US, sanctions + the blockade are the same card
  in reverse. Payoff: nobody's refusing to reopen the strait, both sides refuse to go FIRST; the six-day
  offer is a sequencing dispute with 1/5 of the world's oil as the deposit, and every week unsettled the
  price is paid at the pump. Rhetorical-question close + comment CTA ("Who should blink first? Tell me
  below."). 50 beats: 47 media (incl. 4 stylized cards — `STRAIT 1/5 WORLD OIL+LNG / REOPENS DAY 6 / WAR
  MONTH 8`; `IRAN'S PRICE — PORTS/SANCTIONS/ALL FRONTS/NUCLEAR EXCLUDED`; `US NUCLEAR FIRST / IRAN STRAIT
  FIRST`; `IRAN'S CARD STRAIT / US'S CARD BLOCKADE`), 1 red impact ("It's a sequencing dispute.") mid-tail,
  2 black. **Captions match the VO verbatim** (except the stylized cards). Durations/reveals/SFX locked to
  the VO with a scribe_v1 word-timestamp anchor pass (`public/strait/voiceover.mp3`, ~116s incl. the ~1.1s
  post-hook pause); music mixed at 0.17. Entirely its own fresh footage under `public/strait/` — no asset
  shared with any other reel. Media credits (Pexels, free license) — videos: an aerial cargo ship on open
  water (28801855), a tanker silhouette at dusk (34780902). Photos: a dark station wall clock (37179006),
  an empty stage microphone + seats (9547593), a hand signing with a fountain pen (39148380), an oil-tanker
  deck from above (18115096), a refinery at dusk (15893881), a cargo ship on open sea (9808221), an empty
  boardroom table (3906592), a spherical LNG/gas storage tank (27404517), a document handled in hard light
  — text illegible (7054517), port cranes at dusk (14734002), white oil storage tanks (31403876), a calm
  dark sea (9387744), a tanker fleet at anchor (35421778), a hydraulic lock/barrier gate (5502728), stacked
  oil drums (10620466), a domed institutional building — no flag (33449126), industrial pipes + red valve
  wheels (5711732), a road forking around a tree (11273641), a night refinery with a flare stack (3855962),
  two armchairs by a blinded window (30065112), stacked papers + paperclips (6077886), a blank notebook +
  an unbranded pen (8250806), an aerial of a narrow canal chokepoint (34441263), stacked blue oil drums
  (39874186), a green fuel-pump nozzle — no brand (12377481), a suburban house (22485304), a ship's wake on
  open water (24350002), a padlock + chain on a gate (28901476), a wooden chess king (4576332), rows of
  empty chairs (30398459), a tanker on a backlit golden-hour sea (12366464), two facing chairs with a floor
  divider (24373601), a wax-sealed agreement with ribbon (28948619), vintage strongroom lockboxes (33583064),
  a mechanical rolling-digit counter — numbers only (11833044), a wireframe globe monument at dusk
  (16035533), wax-sealed envelopes (17262454), a gas flare stack (6692312), buildings mirrored in a puddle
  (11408793), a wooden-framed hourglass (4092356), ordered files/ledgers in a rack (40292283), concentric
  ripples on dark water (21134472), an ace of spades (4043022), an English "June" calendar page with day 7
  circled (7466945), and a petrol-station forecourt at dusk — no brand (18551982). No generated graphics
  this reel. **Brand-safety (sensitive geopolitics topic — screened hard
  at source and again from the FINAL render):** free of national flags, identifiable faces/politicians,
  military/weapons/uniforms/propaganda, company/oil-major logos and wordmarks, readable ship names, Farsi/
  Arabic or other foreign text, and labeled maps. Rejected and replaced during sourcing/audit: readable
  ship names (CHRISTINA, GNMTC, MTM VANCOUVER, SAGA, BELMAR, AEGEAN UNITY, CHIOS), LNG hull brands (CORAL
  ENERGY/Gasum), fuel-station brands (LUKOIL, GILBARCO VEEDER-ROOT, Tokheim), a "TANGO"/"MAXSEAL"/"MADE IN
  SINGAPORE" drum, barrier-gate brands (VW/Hikvision/MÜLLER), a "LAMY" pen wordmark, a readable "At-Will
  Employment Agreement" document (off-topic), "STATE TAX INSPECTORATE" (Ukrainian) and "Local Sponsor's
  Name" documents, a national flag on a tanker, and a duplicate Corinth-Canal shot. **UNVERIFIED /
  SENSITIVE — asserts specific, checkable geopolitical claims and attributes a position to a named official
  (Vance); rendered as written but MUST be fact-checked before publishing:** the existence/terms of a
  six-day Strait-of-Hormuz reopening offer; "war in month eight" (note: `OilReel`/`DieselReel` reference
  the Iran war as "month nine"); a US blockade of Iranian ports; the ~1/5 of world oil & gas figure; the
  Vance "enrichment cut first" vs Tehran "strait first" positions; and "oil near $100 / record diesel /
  mortgage rates moving with the Gulf." The "sequencing dispute / who blinks first / paid at the pump"
  framing is editorial analysis.

- **`BillReel`** — "The bill" (fast NEWS reel). NEW topic: **why the memory in a PlayStation 6
  reportedly costs more than an entire PlayStation 5 — the AI memory squeeze.** QUESTION/STORY/ANSWER/CTA.
  Per hardware leaker KeplerL2, the RAM + storage in Sony's next console now cost ~$680+ per unit — more
  than a new PS5 ($649). The memory that cost ~$3/GB when the console was designed is now ~$20-23/GB; the
  APU ("the brain") is only ~$150, so the memory costs ~4× the processor. Reported bill of materials
  ~$1,000 (was ~$760 in March); Sony won't sell at a loss, its CEO cites component shortages and no launch
  date, it's skipping CES, and reportedly weighing cutting memory 30GB→20GB. Mechanism: the same chips feed
  AI servers — Micron et al. sell to the highest bidder, Nvidia's customers pay most, retail memory is ~5×
  a year ago; Sony isn't bidding against Microsoft, it's bidding against OpenAI (a $100B guarantee behind
  it). Payoff: the PS6 isn't dear because Sony got greedy — the AI boom bought the memory first; every
  console/phone/laptop is in a bidding war with a data centre that has more money. The $1,000 PlayStation
  is the AI bill, delivered to your living room. Rhetorical-question close + comment CTA ("Would you pay
  $1,000 for a PlayStation? Tell me below."). 38 beats: 35 media (incl. 4 stylized cards — `PS6 RAM+STORAGE
  $680+ / PS5 $649`; `GDDR7 $3/GB → $20-23/GB / APU ~$150`; `BOM $760 → $1,000 / NO LAUNCH DATE / CES
  SKIPPED`; `RETAIL DDR5 5× IN A YEAR / SONY vs DATA CENTRES`), 1 red impact ("Delivered to your living
  room.") , 2 black. **Captions match the VO verbatim** (except the stylized cards; spoken figures as
  numerals). Durations/reveals/SFX locked to the VO via a scribe_v1 word-timestamp anchor pass
  (`public/bill/voiceover.mp3`, ~116s incl. the ~1.1s post-hook pause); music mixed at 0.17. Entirely its
  own fresh footage under `public/bill/` — no asset shared with any other reel. It is a SEPARATE twin of
  `PlaystationReel` ("The exchange", the used-market angle); this is the AI-bidding / bill-of-materials
  angle. Media credits (Pexels, free license) — videos: a circuit-board macro (6754820), a glowing CRT at
  dusk (3290180). Photos: a code screen (6424584), a rising-line chart on paper (590041), a motherboard +
  RAM macro (27977986), a BGA chip macro (6755086), a storage drive + RAM + CPU (37113174), a green PCB
  macro (18372336), a circuit module on design notes (3912367), a semiconductor/wafer surface (28215391), a
  CPU underside (31665489), a chip-die macro (6755145), an analog scale dial (5619064), an electronic-
  components grid (35686431), a hand-drawn March-2024 calendar (19915938), red "TAXES" on a legal pad
  (7111607), a black press microphone (4331578), empty storage racks (8910939), an empty exhibition hall
  (20030193), a hand lifting a PCB module (4705618), a dense motherboard macro (6755080), a whiteboard bar
  chart (9034997), a blue-lit server front (17489156), a chip pick-and-place line (32778341), a GPU fan +
  heatsink (7858769), a blue server-cabinet hall (17323801), a gavel (37732188), a raised auction hand
  (38433064), a stack of US $100 bills — no portrait in frame (11624767), a dark grand boardroom (13609018),
  a blue-lit AI-server front (37605913), a plain unbranded slab phone (13570137), a compute-warehouse
  exterior (36006588), a dark living room with a glowing TV (12432202). The memory-price-rise chart
  (`bl10_pricechart.jpg`) is a **generated** red-line graphic on the near-black house background, not a
  Pexels photo. **Brand-safety (screened hard at source and from the FINAL render):** free of company
  logos/wordmarks, especially NO PlayStation/Sony/Xbox/Microsoft consoles or logos and NO Nvidia/AMD/Intel/
  Micron/Samsung chip, GPU or RAM brand markings; no OpenAI/CES signage; no readable brand on any chip/
  board/device/screen; no faces, flags or foreign text. Rejected and replaced during sourcing/audit:
  branded RAM (SK hynix, Kingston, Micron, G.SKILL, GOODRAM…), branded GPUs (ZOTAC, GIGABYTE, SAPPHIRE,
  NVIDIA RTX FE), an ASUS "TUF" board, a Portuguese "MARÇO" calendar, Russian prop money, an iPhone with
  an Apple-logo leather case (swapped to a logo-free slab phone), and brighter off-tone options. **UNVERIFIED
  — asserts specific, checkable reported figures (a leaker's numbers, Sony statements, memory prices);
  rendered as written but MUST be fact-checked before publishing:** the ~$680+ RAM+storage vs $649 PS5; the
  ~$3 → ~$20-23/GB and ~$150 APU; the ~$1,000 (was $760) BOM; "won't sell at a loss / no launch date /
  skipping CES / cutting 30GB→20GB"; "retail memory 5× in a year"; and the Microsoft/OpenAI/$100B framing.
  The "AI bill delivered to your living room" thesis is editorial analysis.

- **`AskReel`** — "The ask" (fast NEWS reel). NEW topic: **why America's highest-paid airline CEO is
  calling for an inheritance tax of nearly 100%.** QUESTION/STORY/ANSWER/CTA. Scott Kirby (United) was paid
  ~$32.3M last year — the most of any US airline boss; in the NYT he calls inequality a danger and wants a
  national wealth tax and inheritance taxes near 100% ("I would pay them"). But the two taxes he picked are
  telling: a WEALTH tax hits what you HOLD, an INHERITANCE tax hits what you LEAVE — neither touches what
  you EARN this year, so a $32M salary is untouched; the only way to dodge both is to SPEND while alive.
  United's growth strategy is premium (Polaris, first-class suites, caviar) — the customer who spends down
  a fortune rather than passing it on is its best customer, so a regime that punishes saving/inheriting
  rewards buying a lie-flat seat. Payoff: he may mean every word, but the taxes a man on $32M volunteered
  for are the two that don't touch the $32M and nudge the rich toward what his airline sells; sincere and
  self-interested aren't opposites — in business they travel together, in first class. (Also: he was fired
  by American — promised the top job in 2016, then let go — took ~$13M severance, phoned a United board
  member the same day, and spent a decade building the rival.) Rhetorical-question close + comment CTA
  ("Would you trust a CEO who asks to be taxed? Tell me below."). 41 beats: 38 media (incl. 4 stylized
  cards — `KIRBY PAY $32.3M / WANTS WEALTH + ~100% INHERITANCE`; `FIRED BY AMERICAN 2016 / $13M SEVERANCE /
  NOW RUNS THE RIVAL`; `WEALTH TAX ASSETS / INHERITANCE ESTATES / SALARY UNTOUCHED`; `SPEND IT, DON'T LEAVE
  IT → PREMIUM CABINS`), 1 red impact ("In first class."), 2 black. **Captions match the VO verbatim**
  (except the stylized cards; spoken figures as numerals). Durations/reveals/SFX locked to the VO via a
  scribe_v1 word-timestamp anchor pass (`public/ask/voiceover.mp3`, ~116s incl. the ~1.1s post-hook pause);
  music mixed at 0.17. Entirely its own fresh footage under `public/ask/` — no asset shared with any other
  reel. Media credits (Pexels, free license) — videos: a dusk wing/window view — no livery (38043523), a
  champagne-toast close (11949126). Photos: a plush exec office (35058546), a US $100-bills close-up — no
  portrait in frame (40222113), a panel/mic desk (6949337), a folded newspaper — no masthead (7611758), a
  wealth-gap of model houses (31370888), "TAX" tiles on coins + a tax form (6863183), an estate paper with
  a wax seal (18690576), a gavel + brass Lady Justice (6077123), a hand packing a desk box (7203849), a
  business handshake — hands only (13801685), an empty chair in a doorway (4214666), torn paper (18718831),
  a $100-bill corner macro — no portrait (10149290), a dark desk phone (19683578), construction cranes at
  dusk (14354493), an empty boardroom (9300726), fanned file folders (7414277), a neoclassical mansion
  (39495896), a grand manor house (12894746), $20 bills in an envelope (4386365), a 1040 tax form +
  calculator (6929011), a luxury tote bag (5243552), a notebook of sketches (6614748), a premium cabin
  aisle (27303710), a private-jet suite (14914172), a caviar + champagne plate (32083417), a watch + cigar,
  arm only (29404552), a window-seat wing view (1547726), a red piggy bank — no coins (7828291), a first-
  class cabin (4061487), a vintage microphone (4552531), a hand signing a form — text illegible (8470831),
  numbered vault boxes (25025656), a premium jet seat (20562278), brass balance scales (6077665), a suited
  traveller with a briefcase — no face (9565852). No generated graphics this reel. **Brand-safety (screened
  hard at source and from the FINAL render):** free of airline LOGOS/LIVERIES (no tail-logo aircraft), the
  named CEO's face, any newspaper masthead or "Polaris"/brand wordmark, identifiable faces, banknote
  portraits, foreign currency, flags and foreign text. Rejected and replaced during sourcing/audit: airline
  winglet logos, a Turkish masthead, Cyrillic keyboards, "CISCO"/"Nissan Services" signage, a "FICHET
  PARIS" safe, a Ukrainian "STATE TAX INSPECTORATE" form with a personal name, a fanned-$100 Franklin
  portrait, foreign coins in a piggy bank, and a gavel id that collided with another reel. **UNVERIFIED /
  SENSITIVE — names a real living executive (Scott Kirby) and attributes views, pay and a career narrative
  to him and to United/American; rendered as written but MUST be fact-checked against primary sources
  before publishing:** the ~$32.3M pay and "highest-paid US airline boss"; the NYT wealth-tax / ~100%
  inheritance-tax remarks and "I would pay them"; the 2016 American firing, ~$13M severance, "phoned a
  United board member the same day" and decade-building-the-rival account; and the premium-cabin / "best
  customer" framing, which is editorial analysis.

- **`DebtReel`** — "The number" (fast NEWS reel). NEW topic: **the US just quietly hit "the most expensive
  number in its history" — the debt/deficit squeeze, and how it reaches your mortgage.** QUESTION/STORY/
  ANSWER/CTA. Thesis: a single-year deficit of ~$2 TRILLION — ~12% bigger than last year — while total debt
  just crossed ~$40 TRILLION, roughly the size of the whole economy, a level last seen paying for World War
  Two. The fastest-growing line item isn't roads or defence, it's INTEREST: ~$1.36T in one year just to
  service what's already owed, a record. The one thing meant to help — tariffs — went backwards: the Supreme
  Court struck most of them down and the government had to refund ~$145B, so the windfall became a bill.
  Washington's only answer is that growth will fix it, with no maths shown; economists don't agree whether
  growth can outrun a ~6% deficit or where the tipping point is. What's not in dispute: more borrowing ->
  more bonds -> higher yields, and the 30-year mortgage just hit ~7.40% (a decade ago: 3%). Binary
  rhetorical-question close + comment CTA ("Is the US still the safest borrower on earth, or is this the
  start of something? Pick a side below."). **No post-hook pause** this reel (per the client's revision —
  the claim flows straight into the "make it personal" beat), plus a mid-reel like+follow ask. **45 beats**
  (re-cut from 36 — the wordiest captions, the claim hook and the "make it personal" beat included, were
  split into shorter 1-2 line beats so the on-screen type sizes up, 32-64px; VO unchanged, durations
  re-anchored from the cached word-timestamps): 42 media (incl. **7 count-up stat cards** — `$2 TRILLION`
  single-year deficit; `+12%` vs last year; `$40 TRILLION` total debt; `$1.36 TRILLION` interest in one
  year; `$145 BILLION` tariff refund; `7.40%` 30-year mortgage; `3%` a decade ago), 1 red impact ("Or is
  this the start|of something?"), 2 black ("Interest." /
  "Honestly, the economists don't agree either."). **Captions match the VO verbatim** (except the stat
  cards; spoken figures as numerals). Durations/reveals/SFX locked to the VO via a scribe_v1 word-timestamp
  anchor pass (`public/debt/voiceover.mp3`, ~102s, NO inserted pause); music mixed at 0.17. Entirely its own
  fresh footage under `public/debt/` — no asset shared with any other reel. Media credits (Pexels, free
  license) — video: a grand civic/government dome at golden hour, no text/flag (40304294). Photos: a dark
  empty office (12866948), a generic credit-card-debt solicitation — no entity name (7821909), a dark bed +
  clock (6943990), a suburban house at dusk (18093637), a b&w hourglass (16399375), an old purchase/assembly
  ledger (12983110), a red warning chart (39262369), a $100-bill reverse — Independence Hall, no portrait
  (35486294), a rising chart on a dark screen (39295564), a navy field + $100 corner (5912574), a dusk
  skyline silhouette (352882), sepia vintage gears (19715967), a money-counter processing bills (6266459),
  aerial highway overpasses (8860492), a tall bound stack of papers (7054757), a vintage typewriter typing
  "INVESTMENTS" (12244851), a dark multi-screen dashboard (32396570), weathered orange container doors
  (29533762), a b&w classical colonnade (2935910), two hands passing a US cash bundle — no portrait
  (6266453), a "PAST DUE" statement (7926653), a hand drawing a rising chart on a whiteboard (5310563), a
  coffered rotunda dome interior (34192312), a chalkboard of equations (6256063), an empty night running
  track (886696), a dark trading/indicators chart (39121208), a house with a generic "FOR SALE" sign
  (7937268), a weathered-old-house-beside-new-framing contrast (33954649), a single hand pointing up
  (16274575), a grey safe/strongroom door (39704868), a forked forest trail (39380978), and a modest older
  house at golden hour (17928839). The 45-beat re-cut added 9 split-half backgrounds: a corridor of
  cascading glowing digits (36040448), a household-budget flat lay — "EXPENSES"/"RECEIPTS" cards
  (7111517), a template "CONTRACT" document — no real lender name (7841836), vintage numbered filing-cabinet
  drawers (12485504), a white back-pointing arrow on red (21327131), green scissors cutting a "TAXES" slip
  (6863324), a hand-painted "?" on crumpled paper (5428826), a bold painted upward arrow (11506752), and
  Earth from space — no flags/labels (30596249). No generated graphics this reel. **Brand-safety (screened hard at source
  and from the FINAL render):** free of company logos/wordmarks, identifiable faces/politicians, banknote
  portraits (US bills are the Independence Hall reverse or portrait-free cash bundles), flags, military/
  propaganda, and foreign text/currency. Rejected and replaced during sourcing/audit: a dome clip with a
  legible "ACADEMIA" frieze (foreign text / off-message, swapped to a text-free dome); a mislabeled "two
  doors" clip that was actually an overhead stone marker (swapped to a forked trail for the CTA); a real
  nonprofit's "Find Aid for the Aged, Inc." financial statement (swapped to a generic credit-card-debt
  envelope); "BINANCE" / "TradingView" chart screens, Maersk/Hapag-Lloyd/CMA CGM container livery,
  presidential-portrait bills, "PG&E" / "East Bay Community Energy" utility bills, a "Hallmark" logo,
  "consumerfinance.gov"/CFPB references, readable "TEXAS" plates, Chinese/Russian/Portuguese text, and
  mosque/cathedral domes (crescents/crosses) and a flagged Baku government building. **UNVERIFIED — asserts
  specific, checkable US macro figures and attributes actions to US institutions (Congress/Treasury/Supreme
  Court); rendered as written but MUST be fact-checked against primary sources before publishing:** the ~$2T
  single-year deficit and "+12% vs last year"; the ~$40T total debt and "size of the entire economy / last
  seen in WWII"; the ~$1.36T annual interest "record"; the Supreme Court striking down tariffs and the
  ~$145B refund; the ~6% deficit and "growth will fix it" framing; and the ~7.40% 30-year mortgage vs 3% a
  decade ago. The "most expensive number" / "start of something" thesis is editorial analysis.

- **`ListingReel`** — "The listing" (fast NEWS reel). NEW topic: **the SpaceX IPO — "the biggest IPO of the
  century" already underwater, and the segment (Rockets / Starlink / xAI) that really drives the
  valuation.** A/B TWIN of `SpacexReel` ("The belief", the ~$28.5T addressable-market angle); this is the
  post-IPO valuation / xAI-is-the-real-bet angle. QUESTION/STORY/ANSWER/CTA. Thesis: the stock is down ~8%
  from day one (up ~10% from the IPO price), trading at ~68x sales, revenue +92% in a quarter, worth nearly
  ~$2 TRILLION while still losing money. The three pieces — Rockets (sales +29%, LOSS ~$542M), Starlink
  (sales +66%, PROFIT ~$1.7B, the only profitable unit), xAI (sales +247%, LOSS ~$1.3B, the fastest-growing
  part is the biggest hole). The valuation isn't priced on rockets or satellites, it's priced on the AI
  unit: Alphabet reportedly pays it ~$920M/mo and Anthropic ~$1.25B/mo for data centres. The maths: for
  $5,000 to become $13,850 by 2030, SpaceX must grow ~50%/yr for five years and still lose half its
  multiple; Wall Street median target ~$217 vs a ~$148 stock — the gap is a bet on xAI, not on space. Binary
  close ("Is this the next Nvidia, or the most expensive internet provider ever listed? Pick a side below.").
  **NO post-hook pause** (claim flows straight into the personal beat), mid-reel like+follow ask. 41 beats:
  39 media (incl. **13 number cards** — three of the two-figure cards were split for pacing: DAY ONE -8%;
  IPO +10%; 68x; +92%; $2T; ROCKETS +29% / -$542M; STARLINK +66% / +$1.7B; xAI +247% / -$1.3B; ALPHABET
  $920M/MO; ANTHROPIC $1.25B/MO; $5,000 -> $13,850; 50%/YR; TARGET $217 / STOCK $148), 1 red impact
  ("...ever listed?"), 1 black ("Nobody actually knows."). **Captions match the VO verbatim** (except the
  number cards; spoken figures as numerals). Durations/reveals/SFX locked to the VO via a scribe_v1
  word-timestamp anchor pass (`public/listing/voiceover.mp3`, ~118s, NO inserted pause); music mixed at 0.17.
  Entirely its own fresh footage under `public/listing/` — no asset shared with any other reel (incl.
  SpacexReel). Media credits (Pexels, free license) — videos: an abstract glass tower (7702061), a forked
  highway (29464615). Photos: a frayed rope into deep water (13010775), a spotlit diamond (38505174), a
  burning prop bill — "IN PROPS WE TRUST", no real portrait (39463271), a phone candlestick chart — no
  ticker (34482029), a green bullish chart (38821178), a hand opening a plain box (9594416), a camera
  patent blueprint (4172287), hands tapping a plain phone (7054507), deflated balloons (5874688), one red
  piece amid blue (6990048), a magnifier over number columns (4494644), a rising chart (38782895), a vast
  cityscape (2893771), red ink in a bowl (6273455), three ice cubes (34927438), a generic model rocket +
  plume (4278308), a satellite dish under stars (6325003), a lone green sprout (4620544), an abstract neural
  render (17483867), a deep pit/hole (17054321), a red-needle gauge (13785111), a faint vapour trail in sky
  (27150471), a glowing data-core cube (30547566), blue server blades (17489160), teal fibre-optic patch
  panel (4373998), a folded newspaper — no masthead (18287623), a Lady Justice scales statue (40342662), a
  chalkboard of equations (6256072), a field of glowing coins (15854584), ascending block towers (1329317),
  a black apple with a slice cut out (5395773), top-down server modules (5050305), a retro checkered rocket
  at sunset (4653960), a candlestick chart with a gap — no ticker (38796150), a red die on felt (15017562),
  an open palm — hand only, no face (14566859), a red circuit board with an empty socket (6432056). No
  generated graphics this reel. **Brand-safety (screened hard at source and from the FINAL render):** free
  of company logos/wordmarks — especially NO SpaceX / Starlink / xAI / Tesla / X / Google / Alphabet /
  Anthropic / OpenAI / Nvidia / NASA / Blue Origin logos or products — NO Elon Musk or any identifiable
  face, NO readable stock tickers or company names, NO flags, foreign text, banknote portraits, or
  military/propaganda. Rejected and replaced during sourcing/audit: an unmarked SpaceX Falcon and
  Shuttle/Saturn-V/Vostok rockets, Dell/HP/IBM/Intel/Nvidia/Nuvoton-branded hardware, "TESLA INC / NASDAQ"
  and Binance/TradingView/StockRadars tickers, Bitcoin/Ethereum logos, Franklin-portrait cash, foreign
  currency + Cyrillic/Thai text, Dutch road signs, a partly-obscured face on the "so you tell me" beat
  (swapped to a hand-only palm), and several intra-reel / cross-reel Pexels-id collisions caught by the
  ledger check. **UNVERIFIED / ELEVATED RISK — names real companies (SpaceX, Starlink, xAI, Alphabet,
  Anthropic, Nvidia) and asserts specific, contested financials about a PRIVATE company's IPO; rendered as
  written but MUST be fact-checked against primary sources before publishing:** the ~8%/~10% price moves;
  ~68x sales; +92% quarterly revenue; the ~$2T valuation; the Rockets/Starlink/xAI sales-growth and
  profit/loss figures; the ~$920M/mo (Alphabet) and ~$1.25B/mo (Anthropic) data-centre payments; the
  $5,000->$13,850 / 50%/yr maths; and the ~$217 target vs ~$148 price. The "next Nvidia vs most expensive
  internet provider" close is editorial analysis.

- **`RaiseReel`** — "The raise" (fast NEWS reel). NEW topic: **the ~2026 US cost-of-living adjustment (COLA)
  — "twenty million Americans just got the biggest pay raise in four years, and almost none of them will
  feel it."** Social Security / VA / military-retiree COLA. QUESTION/STORY/ANSWER/CTA. Thesis: the raise is
  ~3.6% (vs ~2.8% last year, ~2.5% the year before — the biggest jump since the 2022 inflation spike). In
  dollars: a retiree on ~$2,500/mo gets ~+$90, a veteran on ~$1,500 VA gets ~+$54, the average Social
  Security cheque ~+$75. The twist: the COLA isn't a reward, it's a thermometer — it's set by how much
  prices already rose, so a bigger raise just means prices rose faster; the cheque is catching up to the
  bill, designed to leave you exactly where you were. If your rent/groceries/insurance rose faster than
  3.6%, the raise is a cut. It lands in January (notices late November) and disappears into the same prices
  that created it. Binary close ("Is a 3.6% raise good news, or a receipt for a bad year? Pick a side
  below."). **NO post-hook pause** (claim flows straight into the personal beat), mid-reel like+follow ask.
  38 beats: 35 media (incl. **5 number cards** — 3.6% this year; 2.8% last year / 2.5% the year before;
  retiree $2,500/mo -> +$90; veteran $1,500 VA -> +$54; avg SS cheque +$75), 1 red impact ("or a receipt|
  for a bad year?"), 2 black ("It's a|thermometer." / "Prices rose|faster."). **Captions match the VO
  verbatim** (except the number cards; spoken figures as numerals). Durations/reveals/SFX locked to the VO
  via a scribe_v1 word-timestamp anchor pass (`public/raise/voiceover.mp3`, ~110s, NO inserted pause); music
  mixed at 0.17. Entirely its own fresh footage under `public/raise/` — no asset shared with any other reel.
  Media credits (Pexels, free license) — videos: an overhead crosswalk crowd (30935166), an aerial forked
  road (30013606). Photos: a tablet chart — no ticker (5833843), two open empty palms (2258248), worn
  leather boots (817052), a hand holding a blank black card (6800944), an empty wallet (36343446), a hand +
  plain pen over a budget breakdown (7054415), hands on a blank phone (6611934), a hand on a radiator
  thermostat (12644994), one white egg among brown (8236170), a red "%" balloon (5625107), ascending coin
  stacks (6289058), an inflation-spike candlestick chart — no ticker (38892301), a magnifier over bar
  charts (7948058), hands counting a US cash roll — bill BACKS, no portrait (7680555), a dog-tag chain
  (147637), a black envelope + blank card (6373188), a red crack on black (12051245), a gold trophy
  (2098604), red "SALE" tags (7986985), a bold arrow sign (6833580), stacks of kraft envelopes/bills
  (29534962), a red running track + finish line (34368845), feet on a treadmill (5327545), a dartboard
  bullseye (131017), a template "Agreement" with bracketed placeholders — no real company (7841818), an
  apartment facade (11631278), groceries spilling from a bag (7705352), hands cutting paper with scissors
  (7015913), a "January" calendar page (6193328), a residential mailbox bank (11455225), a B&W whirlpool
  drain (39721532), a hand reaching toward the viewer — no face (40325295), a wooden mannequin hand holding
  a "?" tile (10981245). No generated graphics this reel. **Brand-safety (screened hard at source and from
  the FINAL render):** FACE-FREE (retirees/veterans/seniors shown via hands, backs and objects only),
  SEAL-FREE (NO Social Security Administration / VA / IRS / Treasury seals or letterhead), FLAG-FREE, and
  free of company logos/wordmarks, military insignia, banknote portraits (US bills are edge-on / backs),
  foreign text and foreign currency. Rejected and replaced during sourcing/audit: a dog-tags shot with a
  soldier's face, Franklin/Jackson-portrait cash and a Treasury-seal $20, a crowd/calendar/coin pile with
  foreign ("Janeiro"/Cyrillic/euro/złoty) text, Nike/Jenga/Goldfish/HP/Yandex and other brand marks, a
  "PERMANENT MARKER" branded pen on an off-topic geographic market-share pie (swapped to a clean budget
  breakdown), a hand with a person behind it (swapped to a hand-only shot), and several intra-reel /
  cross-reel Pexels-id collisions caught by the ledger check. **UNVERIFIED — asserts specific, checkable
  figures about the US COLA; rendered as written but MUST be fact-checked against primary sources (SSA/VA)
  before publishing:** the "~20 million" affected and "biggest raise in four years"; the ~3.6% / ~2.8% /
  ~2.5% COLA rates and "biggest jump since the 2022 spike"; the $2,500->+$90, $1,500->+$54 and avg-cheque
  ~+$75 dollar examples; and the January-lands / late-November-notices timing. The "thermometer / receipt
  for a bad year" framing is editorial analysis.

- **`FieldReel`** — "The field" (fast NEWS reel). NEW topic: **the UK approving the Shell/Equinor Jackdaw
  North Sea gas field — "the UK is about to approve a gas field it already approved four years ago."**
  QUESTION/STORY/ANSWER/CTA. Thesis: Jackdaw was approved in 2022, then struck down by a court; the
  government that pledged no new drilling is waving it through. The numbers: Jackdaw is ~6% of North Sea gas
  output, but the North Sea is shrinking — in UK demand terms that's ~2%, for roughly ten years, then it's
  gone. The platform is largely unmanned / remotely operated, so the jobs argument barely applies. The twist:
  the line is that Jackdaw isn't a *new* licence so the climate pledge "still stands" — technically true,
  because the court ruling was about the emissions from burning the gas, which haven't changed. Gas is priced
  globally, so ~2% likely doesn't move your bill. Rosebank decision due later this year. Binary close ("Energy
  security, or a very expensive way to keep a pledge technically intact? Pick a side below."). **NO post-hook
  pause** (claim flows straight into the personal beat), mid-reel like+follow ask. 42 beats: 39 media (incl.
  **4 number cards** — APPROVED 2022 / STRUCK DOWN BY A COURT; ~6% of North Sea gas output; ~2% in UK demand
  terms; ~10 years), 1 red impact ("or a very expensive way|to keep a pledge|technically intact?"), 1 black
  ("Technically|true."). **Captions match the VO verbatim** (except the number cards; spoken figures as
  numerals). Durations/reveals/SFX locked to the VO via a scribe_v1 word-timestamp anchor pass
  (`public/field/voiceover.mp3`, ~117s, NO inserted pause); music mixed at 0.17. Entirely its own fresh
  footage under `public/field/` — no asset shared with any other reel. Media credits (Pexels, free license) —
  videos: an offshore production platform at dusk (11363492), an aerial forked road/junction (40195249).
  Photos: an offshore rig deck "APPROVED"-style doc beat (8850720), a gas flame/burner (5691944), a domestic
  gas meter (38730229), industrial pipework (36794533), a magnifier over detail (31222825), a hand signing a
  blank document (8730977), a hand on a blank phone (6373084), a grey North Sea horizon (19926696), one
  standout object (38514396), an offshore rig silhouette (15961091), a wooden gavel (37732186), a plain
  government-style building facade (34083516), a green traffic light (11574912), a page of figures (7688365),
  a mock pie chart — generic "Company 01/02/03", no real brand (7947711), a bold "big" visual (7762112), a
  shrinking/receding subject (36500449), a thin sliver/wedge (30836855), a ten-year/calendar cue (5417621),
  an empty/"gone" frame (34389698), a warning sign (7570526), an empty control room / unmanned platform
  (25819964), a remote-control console (39536057), hard-hat/jobs b-roll — no faces (8488037), a "barely"
  minimal visual (8488021), a climate/sky beat (37577545), a blank permit document — no letterhead/seal
  (8441817), a handshake shown as hands only — no faces (9301860), a smokestack plume (11959368), a gas flare
  (31316362), gas-meter dials (8872400), a globe (1098518), an offshore rig on the horizon (33366290), an
  official handshake shown hands-only (5439460), a thin sliver (6402424), a hand pointing toward the viewer —
  no face (22747400), electricity pylons at dusk (35158378), a bronze Lady Justice / scales statue against
  open sky — no face, no landmark (27380388). No generated graphics this reel. **Brand-safety (screened hard
  at source and from the FINAL render):** FACE-FREE (officials/workers shown via hands, backs, hard-hats and
  objects only — the two justice/handshake beats use a statue and hands), BRAND-FREE (NO Shell / Equinor
  wordmarks, logos, rig livery or project branding — all footage is generic North Sea / gas / legal b-roll),
  FLAG-FREE, and free of military imagery, banknote portraits, foreign text and foreign signage; the one
  on-screen chart is generic mock data ("Company 01/02/03"). Rejected and replaced during sourcing/audit: a
  person-behind-hand shot (swapped to a hand-only pointing shot, 22747400), a duplicate gas-meter id that
  collided with another field beat (swapped to a paper "INVOICE" meter-dials shot, 8872400), and several
  intra-reel / cross-reel Pexels-id collisions caught by the ledger check. **UNVERIFIED — asserts specific,
  checkable, and politically contested claims about Shell, Equinor, Jackdaw, Rosebank and the UK government;
  rendered as written but MUST be fact-checked against primary sources before publishing:** that the field was
  approved in 2022 and struck down by a court; the ~6% of North Sea output, ~2% of UK demand and ~10-year
  lifespan figures; that the platform will be largely unmanned/remotely operated; the "not a new licence" /
  emissions-ruling framing; and the Rosebank "decision due later this year" timing. The "expensive way to keep
  a pledge technically intact" framing is editorial analysis.

- **`PensionReel`** — "The pension" (fast NEWS reel). NEW topic: **the UK's record state-pension rise (triple
  lock) colliding with the FROZEN personal tax allowance — "the UK just confirmed the biggest state pension in
  history, and for the first time the government will tax it."** QUESTION/STORY/ANSWER/CTA. Thesis: someone on
  the full state pension and nothing else has never paid income tax on it; from April that ends. The pension
  rises ~3.9% (the triple lock) = ~£488/yr, landing the full new state pension at ~£13,036 — but the personal
  allowance (tax-free amount) is ~£12,570, frozen since 2021, so the pension is now ~£466 over the line, taxed
  at 20% = ~£93/yr, meaning pensioners with no other income owe HMRC for the first time (paperwork, tax codes,
  letters, for £93). The institutional twist: the allowance used to rise with the pension; now the freeze
  holds the line still while the triple lock pushes the pension up — a collision that was always coming. Open
  questions: does the Chancellor fix it in the Budget? does the freeze run to 2030? Outcome: April 2027,
  ~£250.70/week — the richest state pension ever paid, the first with a tax bill attached. Binary close ("Is a
  £488 raise with £93 clawed back still a win, or is the triple lock quietly broken? Pick a side below.").
  **NO post-hook pause**, mid-reel like+follow ask. 45 beats: 42 media (incl. **7 number cards** — 3.9% rise;
  £488/yr; £13,036 pension; £12,570 allowance; £466 over; £93 tax; £250.70/week — plus a PENSION £13,036 vs
  ALLOWANCE £12,570 comparison card), 1 red impact ("or is the triple lock|quietly broken?"), 2 black
  ("Small." / "It's|happening now."). **Captions match the VO verbatim** (except the number cards; spoken
  figures as numerals). Durations/reveals/SFX locked to the VO via a scribe_v1 word-timestamp anchor pass
  (`public/pension/voiceover.mp3`, ~119s, NO inserted pause); music mixed at 0.17. Entirely its own fresh
  footage under `public/pension/` — no asset shared with any other reel (topically adjacent to RaiseReel's
  US-COLA reel, but UK-specific and its own footage). Media credits (Pexels, free license) — videos: a slow
  coin-counting pan (13037032), an aerial forked road (29760616). Photos: a blank clipboard/paperwork
  (6192334), elderly hands (36730753), an empty wallet (6649420), an April calendar page (6487204), a
  calculator (17065743), a blank-screen phone (30909364), a piggy bank (11427659), a padlock (36740854), an
  open planner/diary (636246), a rising line drawn on a whiteboard (6803528), soft-focus loose change —
  nothing legible (218392), banded note *edges* only, no denomination (7230324), a magnifier over figures
  (4494641), a generic crest-free application form — tax-allowance stand-in (7735624), a ruler/notebook
  threshold (8058636), frost on glass (35930150), a balance scale (14742906), a red line crossing a white
  line (2534499), a mannequin hand holding an exclamation mark (10988366), red "%" balloons (5625119), a hand
  lifting unmarked gold coins (6328871), an empty armchair (8389904), a kraft envelope + blank letter
  (7670749), a stack of leather ledgers/files (37100690), printed two-line graphs (8472938), a vintage pocket
  watch (4256089), icicles over water (16055963), a blue up-arrow sign (27136212), a flat ruler (7718680), an
  arrow in a bullseye (6620429), a plain red box (33187350), a lone microphone (34505078), a "Business Stages"
  roadmap graphic (7948029), a document + pen (6326287), an ENGLISH weekly planner page (27622180), novelty
  treasure coins — English text, no currency/portrait (7080480), a pink piggy bank (11933675), office binders
  + calculator (8297536), a finger on a camera — no face (7327306), an adult hand on a battle rope — no
  children (6551188). No generated graphics this reel. **Brand-safety (screened hard at source and from the
  FINAL render):** FACE-FREE (pensioners/officials shown via hands, backs and objects only), and free of
  bank/company logos, HMRC/DWP/Treasury crests or letterhead, flags (Union Jack / any), identifiable UK
  landmarks or buildings, foreign text, and — critically for a £ reel — **monarch/banknote portraits and
  identifiable foreign currency**: money is shown ONLY as piggy banks, unmarked/soft-focus coins, note edges
  or novelty (non-currency) coins. Rejected and replaced during sourcing/audit: a first pass that used **euro
  coins/notes and a $-sign render** for the money beats (all swapped to currency-neutral); a **Spanish "ABRIL"**
  calendar (swapped to an English planner); a **children-with-faces** tug-of-war (swapped to an adult battle
  rope); IRS/Treasury/utility-branded tax forms; and several intra-reel / cross-reel Pexels-id collisions
  caught by the ledger check (incl. a duplicate piggy-bank id). **UNVERIFIED — asserts specific, checkable,
  and politically contested figures about UK state pension, the triple lock, the frozen personal allowance and
  HMRC; rendered as written but MUST be fact-checked against primary sources (DWP / HMRC / Budget) before
  publishing:** "biggest state pension in history" and "for the first time the government will tax it"; the
  ~3.9% rise, ~£488/yr, ~£13,036 full new state pension, ~£12,570 allowance "frozen since 2021", ~£466 over
  the threshold, 20% / ~£93/yr; "owe HMRC for the first time"; the freeze running "to 2030"; and "April 2027 /
  £250.70 a week". The "triple lock quietly broken" framing is editorial analysis.

- **`SpiralReel`** — "The spiral" (fast NEWS reel). NEW topic: **a UK inflation jump feeding the government's
  record debt-interest bill, one week before the Budget — "UK inflation just jumped, and the government is the
  one who pays the biggest penalty for it. In cash. This month."** QUESTION/STORY/ANSWER/CTA. Thesis: if
  you've filled a car lately you know the number; the same number just added billions to the national interest
  bill, which you also pay. Inflation is ~3.5%, up from ~3.1% in a single month; motor fuel ~+29.8% on the year
  (petrol highest since 2022) — and it lands one week before the Chancellor's first Budget. The same morning:
  September debt interest ~£10.9bn (a monthly record), deficit ~£24.5bn, total debt crossing ~£3tn for the
  first time. Because a chunk of UK debt is index-linked, the interest rises with inflation automatically — the
  ONS says the jump added ~£4bn to September's interest alone. The twist: normally a Chancellor wants low
  inflation for voters; this one needs it for the balance sheet — every point of inflation is a bill from
  bondholders, and the same figure sets next year's pension/benefits uprating, so it costs twice. Open
  questions: does the Bank of England hike into a Budget? does the Chancellor have room left to spend? Outcome
  recap card: 3.5% / £10.9bn / £3tn / Budget next Wednesday. Binary close ("Is this a fuel-price blip, or the
  moment the debt starts setting policy? Pick a side below."). **NO post-hook pause**, mid-reel like+follow
  ask. 44 beats: 41 media (incl. **7 number cards** — 3.5% rise; 3.1% prior; 29.8% motor fuel; £10.9bn debt
  interest; £24.5bn deficit; £3tn total debt; £4bn added — plus a 4-line outcome recap card), 1 red impact
  ("Is this a fuel-price blip...setting policy?"), 2 black ("Which you|also pay." / "It costs|twice.").
  **Captions match the VO verbatim** (except the number cards; spoken figures as numerals). Durations/reveals/
  SFX locked to the VO via a scribe_v1 word-timestamp anchor pass (`public/spiral/voiceover.mp3`), **built at
  the house +10% pacing default** (~115s). Entirely its own fresh footage under `public/spiral/` — no asset
  shared with any other reel (NB: distinct from the existing `BillReel`/"The bill" PS6-memory reel, which it
  briefly collided with during scaffolding and was renamed away from). Media credits (Pexels, free license) —
  videos: a hand-held nozzle filling a car (9109484), an aerial forked dirt road (14239825). Photos: a 3D
  thumbs-down/penalty (8831812), a pink piggy bank (11427660), a green fuel nozzle (12377482), a dashboard fuel
  gauge (13060769), a digital dash readout (37072314), red/blue dice stacked as a bar chart (6990177),
  interlocking gears (21854072), a blank-screen phone (6373218), blank white price tags (8058800), one red
  standout pawn (38537381), a printed line chart — no brand (7054368), red "%" balloons (5625111), a generic
  pump nozzle in holster (34058522), a petrol forecourt — no brand (34636185), a hand writing on a calendar
  (6172482), red gift/"budget" boxes (1303087), hands on a plain document (10375945), a red calculator +
  receipts (7680748), wooden directional arrows (7679944), a red pen on accounts (207756), a black piggy bank +
  loose coins (3943715), a straight road to the horizon (1955134), a "Not in use" warning sign (5302090),
  chain links (1363191), machined cogs (7568421), a car instrument cluster (6075494), a hand + pen over a data
  report (590022), a pink piggy bank on navy (11933676), cut-out "VOTE YES!" letters — no flag (8850884),
  balanced stacked river stones for "balance" — no justice figure/face (26150937), rolled parchment (6939784),
  a magnifier over figures (4494634), hands holding kraft envelopes (4968675), a round pressure-gauge dial
  (462394), a ticker-free candlestick chart (39334006), a small coin purse (28028244), a descending block
  staircase (1329328, flipped), a gold-bokeh recap backdrop (34725175), a wooden mannequin pointing hand
  (16748673). No generated graphics this reel. **Brand-safety (screened hard at source and from the FINAL
  render):** FACE-FREE (people shown via hands, backs, objects, a mannequin hand; one mislabeled bar-scene clip
  with faces was caught in the render audit and swapped), and free of fuel-station/bank/company logos, HMRC/
  DWP/Treasury/Bank-of-England/ONS crests or letterhead, flags (Union Jack / US / any), identifiable UK
  landmarks or buildings, readable stock tickers, foreign text, military imagery, and — for a £ reel —
  **monarch/banknote portraits and identifiable foreign currency** (money shown only as piggy banks, a coin
  purse, unmarked loose coins, a gold-bokeh abstract). Rejected and replaced during sourcing/audit: a first
  pass that used **euro/dollar-marked money and a $-sign render**, a **wine-glass clip** mislabeled as "money
  growing", a **US-flag/stars "VOTE"** ballot, a **man's face** behind justice scales, a **Portuguese trading
  screen with live tickers**, children/faces, and several intra-reel / cross-reel Pexels-id collisions caught
  by the ledger check. **UNVERIFIED / SENSITIVE — asserts specific, checkable, politically contested UK macro
  figures and names real institutions; rendered as written but MUST be fact-checked against primary sources
  (ONS / HM Treasury / OBR / Bank of England / the Budget) before publishing:** the ~3.5% (up from ~3.1%) CPI
  and ~+29.8% motor fuel / "highest since 2022"; the ~£10.9bn September debt interest "highest ever", ~£24.5bn
  deficit, ~£3tn total debt "first time"; "index-linked" interest and the ONS ~£4bn attribution; "Budget next
  Wednesday". **FACTUAL ERROR: the script names "Healey" as the one with spending room, implying he is
  Chancellor — the UK Chancellor is Rachel REEVES (John Healey is Defence Secretary). Rendered verbatim but
  almost certainly wrong; correct the name before publishing.** The "debt starts setting policy" framing is
  editorial analysis.

- **`ConsoleReel`** — "The console" (fast NEWS reel). Topic: **the leaked/rumoured next Xbox ("Helix")
  price — "The next Xbox could cost more than a used car. And Microsoft already knows you can't afford it,
  because it's building the financing."** CLAIM/PERSONAL/EVIDENCE/CTA. **Built as a NEW A/B twin of the
  existing `BillReel`/"The bill"** (the PS6-memory console-pricing reel) — same console-squeeze thesis, its
  own fresh script + footage, confirmed with the user before building. Thesis: console hardware has outrun the
  paycheque, and the manufacturer quietly adds instalments + reslices the subscription to hide it. Walks the
  ladder: Series X launched at $499; an internal projection reportedly puts the next machine at
  $1,200–$1,800 before any subsidy, targeted for Christmas 2028; this year's rise adds up to ~$150;
  Sony's next machine's memory + storage alone reportedly tops $680 per console before the chip, case or
  controller. Second-order: Microsoft now offers buy-now-pay-later on consoles through its own store, and
  Game Pass is being rebuilt à la carte (pay for cloud, pay for multiplayer). Open questions: does Microsoft
  eat part of the cost? does the chip shortage ease by 2028? Recap card: HELIX · 2028 / $1,200–$1,800, plus
  an analyst's "north of a grand is the floor." Binary close ("Would you pay $1,800 for a console, or is this
  the generation you switch to PC? Pick a side below."). **NO post-hook pause**, mid-reel like+follow ask.
  55 beats: 52 media (incl. **8 cards** — $499 Series X launch ×2; a "Christmas 2028" lines card; $1,200;
  $1,800; up-to-$150; $680 memory+storage; and a HELIX·2028 / $1,200–$1,800 recap lines card), 1 red impact
  ("Would you pay $1,800...switch to PC?"), 2 black ("Nobody's|promising that." / "North of a grand|is the
  floor."). **Captions match the VO verbatim** (except the number cards; spoken figures as numerals).
  Durations/reveals/SFX locked to the VO via a scribe_v1 word-timestamp anchor pass
  (`public/console/voiceover.mp3`), **built at +21% VO pace — the house +10% default plus a further +10% on
  this reel at the client's request** (~111s; music bed reused from the longer cut, which still covers it).
  The 55-beat cut splits 8 of the longest captions into two beats each (each new half gets its own fresh
  clip), re-anchored against the same scribe_v1 word timestamps. Entirely its own fresh footage under
  `public/console/` — no asset shared
  with any other reel (incl. the sibling `BillReel`). Media credits (Pexels, free license) — videos: a red
  arcade control panel (7914769), an aerial forked road through forest (34120914). Photos: an empty wallet
  (7927411), a credit card (12920742), a plain unbranded device box (17260157), a blank price tag (7967223),
  internal documents (7841406), a stack of notes — no portraits (7241971), a hardware teardown (31945005), a
  blank-screen phone (7412033), a rising price readout (12198529), one red standout (9953660), a technical
  blueprint (25626437), a wall calendar (7059603), banded cash — no portraits (14820450), a cash stack — no
  portraits (12198524), a "no discount" tag (18978674), a factory assembly rig (18471551), a block staircase/
  ladder (35381781), a second blank price tag (5625003), an up arrow / rise (31904885), loose coins — no
  marks (40132858), memory modules (40342988), a RAM/chip macro (30662603), loose PC components (6755079), a
  caution triangle (33194321), a buy-now-pay-later screen (5240019), a checkout/shopping cart (6214364), an
  instalments planner (6928996), a paycheque/payslip (7820359), a loss-leader price scene (5502532), blank
  game discs — no brand (12585558), a bare CPU socket (1432675), a hand holding a blank card (6956818), an à
  la carte "specialty coffee" menu board (17719778), a sliced rainbow layer cake (8245038), a dot question
  mark (6266317), a two-way-traffic road sign (6833627), a motherboard/chip (39351698), an unbranded retro
  handheld (28978366), a 3D floral/butterfly "Helix" arrangement (35400900), a blue recap backdrop (12707786),
  an analyst's desk with charts (7948038), a 3D pointing hand (8834242). The 8 added (split-beat) clips: an
  empty open palm with a couple of coins (7298450), a calculator on a brand-free ruled ledger (7580852), a
  generic "BANK" card at a no-logo POS terminal — torso only, no face (4393427), an unbranded third-party
  gamepad — no PS/Xbox/Nintendo marks or button symbols (16445673), a sole-on running shoe on a red track —
  no shoe logo (8454901), cascading red "SALE" tags (7986977), a magnifier over a handwritten figures ledger
  (5370914), and scissors beside a blank card (5420895). No generated graphics this reel.
  **Brand-safety (screened hard at source and from the FINAL render):** FACE-FREE (people shown via hands,
  backs, objects, a 3D hand), and — despite being a reel ABOUT named console makers — free of any
  Xbox / PlayStation / Nintendo / Microsoft / Sony / Game Pass wordmark, logo or recognizable branded product
  (every controller/handheld/box shown is a GENERIC, unbranded stand-in; the arcade panel's "X A O B" and the
  handheld's "X Y A B" are standard gaming button labels, not trademarks — no brand name on either device),
  flags, identifiable landmarks, readable foreign text, military imagery, and banknote/monarch portraits
  (money shown only as blank tags, loose coins and portrait-free note stacks). USD figures are native to the
  topic. **UNVERIFIED / SPECULATIVE — the ENTIRE premise is built on leaks and rumours about UNANNOUNCED
  hardware (an unconfirmed "Helix" next Xbox, a 2028 date, a $1,200–$1,800 internal projection, a Sony
  memory-cost figure, console buy-now-pay-later, and a Game Pass restructure). Rendered as written but MUST be
  framed as rumour and fact-checked against primary reporting (Microsoft / Sony statements, the cited Fortune
  piece, the named analyst) before publishing — none of these prices or the "Helix" name are officially
  confirmed.** The "building the financing" / "outrun the paycheque" framing is editorial analysis.

- **`BuyoutReel`** — "The buyout" (fast NEWS reel). Topic: **the shutdown of game studio BioWare, one year
  after its parent EA was taken private in a debt-fuelled leveraged buyout — "The studio that made Mass
  Effect didn't die because its games stopped selling. It died because of a loan."** CLAIM/PERSONAL/PROMISE/
  SCALE/EVIDENCE/SECOND-ORDER/TWIST/QUESTIONS/OUTCOME/CTA (the client's 10-part structure). **New standalone
  reel on a different company/event from the existing `ToysReel`** (which covers the same LBO-debt mechanism
  for Toys R Us) — confirmed with the user before building. Thesis: a leveraged buyout makes the acquired
  company pay for its own purchase; when the interest bites, the slow, expensive single-player studios are cut
  first. Walks the deal: ~400 jobs cut across EA (~3% of staff, ~50 at BioWare Edmonton) with the next Mass
  Effect cancelled; EA taken private for $55B by Saudi Arabia's PIF, Silver Lake and Affinity, with $20B of
  junk-rated debt now on EA's own books; ~$2–2.5B/yr of cash increasingly going to lenders before games get
  funded. Open questions (is Motive next? does the next Sims project survive?), an outcome recap, and a binary
  close ("Did EA kill BioWare, or did the buyout? Pick a side below."). **NO post-hook pause**, mid-reel
  like+follow ask. 47 beats: 44 media (incl. **5 cards** — 400 jobs; 3%; $55B; $20B; and a $2–2.5B/yr lines
  card), 1 red impact ("Did EA kill BioWare, or did the buyout?"), 2 black ("Gone on a Tuesday." / "The
  company pays for its own purchase."). **Captions match the VO verbatim** (except the number cards; spoken
  figures as numerals). Durations/reveals/SFX locked to the VO via a scribe_v1 word-timestamp anchor pass
  (`public/buyout/voiceover.mp3`),  +10% pacing default** (~105s; its own music bed).
  Entirely its own fresh footage under `public/buyout/` — no asset shared with any other reel. Media credits
  (Pexels, free license) — videos: an empty open-plan office (8346903), an aerial forked highway (37404976).
  Photos: a lease/agreement document (7841424), a generic unbranded game controller (8154772), a backlit
  gaming keyboard (671629), a blank-screen retro handheld — no wordmark (8762841), a dev desk of generic code
  (34212896), a desk calendar (11363590), a magnifier over a no-brand chart (7947753), a blank-screen phone
  (6278759), a closed roller shutter (29602606), one red odd-one-out pawn (38536524), emptied office desks
  (5483245), a pie-chart slice (7580843), a bold red X (12960358), a calendar pushpin (12326585), gold bokeh
  (35072396), an architectural floor plan (271667), a metal safe (9662368), glass towers (38748511), gold/
  black liquid metal (5278711), a "Pay" IOU note (9882203), a red candlestick drop (39315994), stacked books
  (762685), a caution triangle (8634398), molten gold (26628059), a red "%" balloon (5650025), gold particles
  cascading (9665186), an empty piggy bank (11933551), a seedling in soil (4095200), opposing arrows
  (7679937), a metal vice (13765802), scissors cutting paper (7695352), a stool in a spotlight (32085882),
  toppling dominoes (8673063), a finger on a document (8068716), a model dollhouse — no Sims branding
  (7400882), a crossed-out notebook word (6193925), a wooden hourglass (14826119), six brown eggs (2959317),
  empty cinema seats (7991321), an aerial crowd (5191376), dawn light through blinds (30682989), a wooden
  pointing hand (37976852). No generated graphics this reel. **Brand-safety (screened hard at source and from
  the FINAL render):** FACE-FREE (people shown via hands, backs, overhead silhouettes, a mannequin hand), and
  — despite naming EA, BioWare, Mass Effect, Baldur's Gate, Dragon Age, The Sims, PIF, Silver Lake, Affinity —
  free of any game box/cover/screenshot or studio/publisher logo, any Xbox/PlayStation/Nintendo mark or button
  symbol (controllers/handheld are generic unbranded stand-ins), company wordmarks, flags (incl. Saudi / US),
  identifiable landmarks, readable foreign text, military imagery, and **banknote/coin portraits or
  identifiable currency**. Re-sourced during the render audit: a first money pass that used **euro banknotes**
  (bo16/20/22/25/27/28) and a **British "two pence" coin** (bo26) were all replaced with currency-neutral
  imagery (gold-abstract behind the number cards, a clean candlestick, an empty piggy bank, a red "%"
  balloon); a clip (bo15) that slipped a sourcing gap and had failed the first render was recovered. **UNVERIFIED
  / SENSITIVE — asserts specific, checkable, current claims about real companies, named funds and a named
  person's assets; rendered as written but MUST be fact-checked against primary sources before publishing.**
  Core claims that DO check out against reporting (as of the Oct 2026 build): the **$55B EA take-private** by
  PIF / Silver Lake / Affinity with **~$20B of debt** (CNBC, EA 8-K), and the **BioWare shutdown / ~400 jobs
  (~3%, ~50 at BioWare Edmonton) with the next Mass Effect's early development ended** (Gematsu, Variety,
  Quartz). Still to verify: the **~$2–2.5B/yr cash-flow** figure, the **"junk-rated"** characterization of the
  debt, the specific **analyst "most exposed" / Motive** claims, the **"next Sims project cancelled"** line,
  and the loose **"one year after"** timing (deal announced ~Sept 2025, closed ~Aug 2026). BioWare is ~31
  years old, so "thirty / thirty-plus years" is right. The "pays for its own purchase" framing is editorial
  analysis. **Also verify on playback that the VO pronounces "EA" as the letters "E-A"** (not a word) — not
  checkable from the transcript.

- **`ShareReel`** — "The share" (fast NEWS reel). Topic: **Meta is issuing a new NON-VOTING Class C share — "Meta
  just beat earnings, grew ad revenue 26%, and the stock fell. Because of a new share that comes with nothing
  attached."** 10-part structure. **New standalone reel** (no prior Meta/share-class reel). Thesis: the new
  share can't vote, and that's the point — every Class A/B holder gets one Class C share (a one-for-one dividend
  that "looks like a split"), so the share count doubles but the votes don't move; those non-voting shares are a
  currency Meta can sell for its AI build-out without Mark Zuckerberg giving up a single vote — he keeps
  control, everyone else gets diluted. Twist: instead of objecting, JPMorgan's line is "the sooner the better."
  Binary close ("Smart way to fund AI without losing the company, or a second share worth less by design? Pick a
  side below."). **NO post-hook pause**, mid-reel like+follow ask. 47 beats: 44 media (incl. **7 cards** —
  $1.7T; $64.6B; 26%; a "January 2027" lines card; $3.83; $3.56; 2%), 1 red impact, 2 black ("It looks like a
  split. It isn't." / "One new share class, zero new votes."). **Captions match the VO verbatim** (except the
  number cards; spoken figures as numerals; card text naming "META" is editorial overlay, not footage).
  Durations/reveals/SFX locked to the VO via a scribe_v1 word-timestamp anchor pass
  (`public/share/voiceover.mp3`),  +10% pacing default** (~123s; its own music bed).
  Entirely its own fresh footage under `public/share/` — no asset shared with any other reel. Media credits
  (Pexels, free license) — videos: an abstract finance dashboard (5849611), an aerial forked road (40433618).
  Photos: a plunging red decline chart — no numbers/ticker (39353382), a blank certificate (5420988), hands
  holding blank paper (8217368), two identical eggs (7404808), a taped-off megaphone (8923862), a magnifier
  over a no-brand chart (7947669), a blank-screen phone (6611918), stacked paper edges (6620969), one red
  standout meeple (6990039), a glass skyscraper (164370), a bronze bull — no inscription (12887750), a calendar
  (7723784), gold bokeh (35601585), a green growth sprout (7944406), interlocking gears (9242927), many hands
  stacked — overhead, no faces (9775854), a calendar grid (2381848), a blank voting slip (7319309), two doubled
  block stacks (36386917), a stuck gauge dial (8545564), a hazard triangle (18241245), printing-press rollers
  (1440504), server racks (17489157), marionette strings (7511711), a chess king (131616), ink dispersing in
  water (6402525), a raised stop palm (38834389), an hourglass (35646800), motion-blur speed (12973767), an
  overhanging cliff (28772721), calm still water (27075441), an empty waiting room (34110996), letter tiles
  spelling "QUESTION" (6005149), a blank tax form + calculator (7821688), a folded newspaper stack — no
  headlines (5505690), red SALE tags (7986984), a foggy path (3408552), a sunset leap silhouette — no face
  (19306843), gold "$" coins — generic symbol (12198525), a dartboard bullseye (6758919), red down arrows
  (31863693), a wooden pointing hand (9017427). No generated graphics this reel. **Brand-safety (screened hard
  at source and from the FINAL render):** FACE-FREE (hands, backs, overhead silhouettes, a marionette carving),
  and — despite naming Meta / Mark Zuckerberg / JPMorgan / Wall Street / Class A/B/C — free of any Meta /
  Facebook / Instagram / WhatsApp / JPMorgan or other company logo or wordmark, any identifiable face (no
  Zuckerberg likeness), stock TICKER symbols or a readable "META"/share price, exchange (NYSE/NASDAQ) signage,
  flags, identifiable landmarks, readable foreign text, banknote/coin portraits or identifiable currency, and
  military imagery. Re-sourced during the render audit: the "stock fell" chart (sh01) first carried crypto-range
  price numbers (~$111k) and was replaced with a number-free red decline chart; candidates were also rejected
  for tickers, crypto logos, Portuguese/Japanese calendars, US-flag ballot boxes and refinery-stamped gold.
  **UNVERIFIED / SENSITIVE — names a real company, its founder and a named bank; rendered as written but MUST be
  fact-checked before publishing. TWO LIKELY ERRORS: (1) the script says the stock FELL / "down 2% premarket,"
  but reporting had META UP ~3% after-hours on these results
  ([Yahoo](https://finance.yahoo.com/markets/stocks/articles/meta-stock-jumps-3-hours-212549647.html)); (2)
  "$3.83 against $3.56 expected / beat on earnings" — the $3.83 GAAP EPS INCLUDES a ~$9.89B legal charge
  (ex-charge ~$7.40) and the analyst estimate was ~$5.75
  ([CNBC](https://www.cnbc.com/2026/10/21/meta-earnings-q3-2026-live-updates.html)), so on GAAP it was a MISS
  and the $3.56 figure looks wrong.** Checks out: non-voting Class C effective Jan 2027, one-for-one dividend
  ("like a 2-for-1 split"), $64.6B revenue +26%, Zuckerberg's control preserved via a Founder Alignment
  Agreement ([SEC 10-Q](https://www.sec.gov/Archives/edgar/data/0001326801/000162828026066773/meta-20260930.htm)).
  Still verify: the $1.7T market-cap, the JPMorgan "sooner the better" quote, and the California billionaire-tax
  angle. "worth less by design" is editorial analysis.

- **`WithdrawalReel`** — "The withdrawal" (fast NEWS reel). Topic: **Tesla Q3 2026 — flat revenue but profit
  down 43% and R&D up 69%; the car business is funding a bet on robots, robotaxis and AI. "The cars are the
  bank. Everything else is the withdrawal."** 10-part structure. **New standalone reel on a different quarter/
  thesis from the existing `TeslaReel`** ("The bar", an earlier quarter where the stock rose on beating a
  lowered bar). Thesis: if you hold Tesla you don't own a car company any more — you own a bet on robots/
  robotaxis paid for by the cars. Revenue $28.05B (flat), net profit $787M (−43%), R&D $2.76B (+69%); operating
  income was just $718M, so R&D was ~4× operating profit in one quarter. Deliveries 486,532 (−2%) — cars flat,
  spending vertical. Capex guided over $25B this year ($13B nine months in): robotaxi fleet, Optimus, AI
  compute, a chip fab, solar; the CFO says capex keeps rising for years. Twist: a flat-sales company would
  normally cut back; Tesla does the opposite because the cars still make money — auto margin climbed to 18.1%
  (best in over a year). Open questions: does FSD carry it (subs 1.74M, +67%)? does the SpaceX merger come
  back? Outcome: flat revenue, profit −43%, R&D +69%, $45B cash, stock −3%. Binary close ("Is this a car
  company funding its next act, or funding someone else's? Pick a side below."). **NO post-hook pause**, mid-
  reel like+follow ask. 47 beats: 44 media (incl. **12 cards** — $28.05B; $787M; 43%; $2.76B; 69%; $718M;
  486,532; $25B; $13B; 18.1%; 1.74M — R&D $2.76B appears twice for the side-by-side), 1 red impact, 2 black
  ("In one quarter." / "The cars are the bank."). **Captions match the VO verbatim** (except the number cards;
  spoken figures as numerals). Durations/reveals/SFX locked to the VO via a scribe_v1 word-timestamp anchor
  pass (`public/withdrawal/voiceover.mp3`), **built at +21% VO pace — the house +10% default plus a further
  +10% on this reel at the client's request** (~125s; its own music bed, reused from the longer cut). Entirely its own fresh footage under `public/withdrawal/`
  — no asset shared with any other reel. Media credits (Pexels, free license) — videos: an abstract data-wave
  (34189433), an aerial forked road (14239824). Photos: architectural blueprints (34573691), an EV charging
  plug — no badge (9799736), an industrial robot arm — not humanoid (16544054), decorative gold coins
  (7080555), a blank till roll (13466249), gold bokeh (5804713), a blank phone (5484738), gold foil (6638269),
  a red standout seat (9771484), neon flat-line grid (8108682), a piggy bank (37498636), red descending steps
  (20419412), a lab microscope (8471982), a circuit board (40270780), green rising columns (28398621), a
  Lady-Justice scales statue (32739872), abstract gold (2872168), a lab flask (8442649), unequal chip stacks
  (29261090), an aerial new-car lot — no badges (3848791), a flat empty road (18124112), a rising candlestick
  chart — cropped, no numbers (39589930), a caution sign (32842045), construction cranes (31258538), a block
  calendar (10667530), a rooftop-lidar AV — no badge/not a Tesla (35076211), server cabinets (4597280), a
  stone staircase (28576047), scissors (5412469), a no-U-turn sign (31458377), a gold toy car (40175775), a
  climbing dial/watch (5640691), a green climbing trend (14240573), an abstract ATM cash slot (7251051), a
  plain steering wheel — no logo (33654843), a blank subscription card + coins (12920751), puzzle pieces
  (17770333), an unbranded mic (7807298), a charts dashboard (669610), a bank vault wall (19920920), cropped
  red candlesticks (39606276), a mannequin hand (13817408). No generated graphics this reel. **Brand-safety
  (screened hard at source and from the FINAL render):** FACE-FREE (hands, backs, objects, a mannequin hand;
  the Lady-Justice statue is an allegorical symbol, not a real person), and — despite naming Tesla / Elon Musk
  / SpaceX / Optimus / FSD / robotaxi — free of any Tesla logo or vehicle (Model 3/Y/S/X/Cybertruck) or
  identifiable car badge, Elon Musk or any identifiable face, SpaceX rocket/logo, Optimus/humanoid robot (robot
  ARMS only), FSD/Autopilot UI, company/bank logo or wordmark, stock TICKER or readable "TSLA"/price, exchange
  signage, flags, identifiable landmarks, readable foreign text, banknote/coin portraits or identifiable
  currency, and military. **This reel needed four footage-swap passes** at the render audit: the stock library
  kept pushing agents toward euro notes/coins (wd06/08/11/32 and the wd17/wd23 coin renders with €/£ glyphs —
  all replaced with gold-abstract / piggy bank / toy car / currency-neutral charts) and toward already-used
  images (wd05/wd09/wd34 collided with the cross-reel ledger — including the pre-existing bare-id block — and
  were re-sourced fresh). **UNVERIFIED / SENSITIVE — names a real company and its CEO; rendered as written but
  MUST be fact-checked before publishing.** Core numbers CHECK OUT (Oct 2026): revenue $28.05B flat, net profit
  $787M (EPS $0.22, ~−43%), operating income $718M, R&D $2.76B (+69%), deliveries 486,532 (−2%), FSD subs +67%
  ([Electrek](https://electrek.co/2026/10/21/tesla-tsla-q3-2026-financial-results/),
  [10-Q/TradingView](https://www.tradingview.com/news/tradingview:66d6bc8123840:0-tesla-3q-2026-revenue-28-05b-net-income-787m-eps-0-22-10-q-summary/),
  [SEC 8-K](https://www.sec.gov/Archives/edgar/data/0001318605/000162828026066738/exhibit9914.htm)). Still
  verify: the >$25B capex guide / $13B nine-month, the 18.1% auto margin, the $45B cash, the −3% stock move,
  and the two quotes (the CFO "capex keeps rising", Musk on the SpaceX merger). "The cars are the bank /
  everything else is the withdrawal" framing is editorial analysis.
- **`ConstraintReel`** — "The constraint" (fast NEWS reel). NEW topic: **Lam Research guided ~$8.6B for the
  quarter with one line — results "would have been higher if not for near-term supply chain constraints" — and
  the whole chip sector sold off. The bottleneck isn't demand; it's that the company that makes the machines
  that make the chips can't build fast enough.** 10-part structure. Thesis: the constraint is at the TOP of the
  supply chain, not the bottom — every AI data centre needs chips, every chip needs a fab, every fab needs Lam's
  machines; if Lam can't get its own parts the delay runs downhill through every layer. Unusual because a demand
  problem shows up as cancelled orders, but this is the opposite (demand fine, supply short) — and that's worse
  for the AI timeline, because you can fix demand with price, not a missing component with money. Open questions:
  what's the constraint (Lam didn't say), how long is "near-term", does it show up in Nvidia's numbers next
  month. Binary close ("Is this a supply blip, or the first sign the AI build-out has hit a physical wall? Pick a
  side below."). **NO post-hook pause**, mid-reel like+follow ask. 47 beats: 44 media (incl. **7 cards** —
  GUIDANCE $8.6B; LAM 10% down; APPLIED MATERIALS 6%; INTEL 5%; MARVELL 4%; THE WHOLE SECTOR 4%; GUIDED $8.6B),
  1 red impact, 2 black ("One sentence from one CFO." / "You can't fix a missing component with money.").
  **Captions match the VO verbatim** (except the number cards; spoken figures as numerals). Durations/reveals/SFX
  locked to the VO via a scribe_v1 word-timestamp anchor pass (`public/constraint/voiceover.mp3`), **built at the
  house +10% VO default** (~116s; its own music bed). Entirely its own fresh footage under `public/constraint/`
  — no asset shared with any other reel. Media credits (Pexels, free license) — videos: an abstract red data-wave
  (34396621), an aerial forked road (4726226). Photos: a warehouse of boxes — generic size labels only
  (10834810), a factory production hall (14804699), a glowing candlestick chart — no numbers (35638979), a red
  falling line (6289066), paper question marks (5428836), a black metal chain (14151825), a blank-screen phone in
  a hand (4724370), a toppling jenga tower (8762335), one red tulip among white (20924573), stainless plant
  equipment (18471472), a microchip macro (6636463), a financial report + pen (7054416), abstract decline arrows
  (27141317), a magnifier over text (8296049), white narrowing funnels (8940478), a toppling domino (8102734), a
  red candlestick downturn (38821935), a red arrow graphic (3683087), a dense red field (17560491), a deep-red
  sky (4622458), red falling bars (39121207), a red tulip field (37184830), a yellow hazard triangle (17801403),
  a fiber-optic patch panel (4486718), a cleanroom photomask handling — bunny-suit, face covered (5118461), a
  gritty industrial machine (12951623), descending metal stairs (26796714), stacked tiered blocks (20221477), a
  mountain summit (26799344), a "THE END" stamp (7186206), a two-way-traffic arrows sign — English (29147884), an
  idle conveyor (6364577), a project-timeline whiteboard — generic planning text (7376), blank hanging price tags
  (6441571), a red question-mark brushstroke (6757687), an hourglass on a book (37494738), a magnifier over
  calligraphy (8716069), a binoculars close-up (5537640), coins embedded in wood — no portraits/denominations
  (34654885), red dollar signs (12920770), an oil pumpjack silhouette (255552), a pointing-hand shadow (1981863).
  No generated graphics this reel. **Brand-safety (screened hard at source and from the FINAL render):**
  FACE-FREE (hands, backs, objects; the one cleanroom worker is hooded/masked/goggled, face covered), and —
  despite naming Lam Research / TSMC / Samsung / Nvidia / AMD / Micron / Applied Materials / Intel / Marvell /
  Qualcomm / Broadcom — free of any company logo or wordmark, product or identifiable chassis, stock TICKER or
  readable price, exchange signage, flags, identifiable landmarks, readable foreign text, banknote/coin portraits
  or identifiable currency, and military. **Swaps at the render audit:** the two parallel sourcing agents
  independently picked the same equipment still for ct10 and ct27 (byte-identical) — ct27 re-sourced to a
  distinct machine (12951623); and the data-centre beat (ct25) first landed on an identifiable Dell PowerEdge
  tower (blank badge, no readable wordmark, but the chassis shape is unmistakable) — swapped to a brand-free
  fiber-optic patch panel (4486718). **UNVERIFIED / SENSITIVE — names a real company and asserts a specific
  guidance figure, a CFO/company quote, and same-morning stock moves; rendered as written but MUST be
  fact-checked before publishing.** Verify in particular: the **$8.6B quarterly guidance** and the exact "would
  have been higher if not for near-term supply chain constraints" wording; the **per-name percentage moves**
  (Lam −10%, Applied Materials −6%, Intel −5%, Marvell −4%, sector −4% — these vary by source and intraday vs.
  close); and the **"oil up the same morning"** aside (unverified). The "constraint at the top of the supply
  chain / can't fix a missing component with money" framing is editorial analysis.
- **`ScarcityReel`** — "The scarcity" (fast NEWS reel). NEW topic: **Nvidia CEO Jensen Huang, on CNBC, said the
  AI slowdown isn't about demand — it's a "scarcity of capital," the working capital to pay for the build-out —
  and tech sold off. The bottleneck is MONEY, not chips.** 10-part structure. Thesis: the man selling every AI
  chip said the problem isn't demand, it's that nobody can find the cash to pay for it — and if your pension holds
  a tech index, that one sentence cost you money. Huang's words: demand for the "neoclouds" is off the charts but
  the working capital to fuel it is missing ("the demand for capital is much greater than the availability of
  capital"). Who's paying: Meta lifted its capex floor to ~$135B this year and created non-voting shares to raise
  more, while Tesla trimmed AI spend ~$25B→$20B — one borrowing to keep up, one stepping back. Twist: the chip
  supplier is normally last to admit a slowdown; Huang said it out loud and called it temporary ("that's going to
  get solved") — but if the fix is more capital, the fix is more debt, and the neoclouds buying his chips have the
  least of it. Open questions: who lends the neoclouds the money; does Meta's new share class sell fast enough; is
  ~$112 oil the same morning the thing that ends the party. Binary close ("Is 'scarcity of capital' a speed bump,
  or the first honest word about how this ends? Pick a side below."). **NO post-hook pause**, mid-reel like+follow
  ask. 47 beats: 44 media (incl. **7 cards** — NASDAQ 100 1.5%; META 5%; NVIDIA 4%; META SPEND FLOOR $135B; TESLA
  FROM $25B; TO $20B; BRENT $112), 1 red impact, 2 black ("Demand, fine. Money, missing." / "More capital means
  more debt."). **Captions match the VO verbatim** (except the number cards; spoken figures as numerals).
  Durations/reveals/SFX locked to the VO via a scribe_v1 word-timestamp anchor pass
  (`public/scarcity/voiceover.mp3`),  +10% VO default** (~110s; its own music bed). Entirely
  its own fresh footage under `public/scarcity/` — no asset shared with any other reel. **New STANDALONE reel;
  it is the CAPITAL-scarcity counterpart to `ConstraintReel` ("The constraint"), which is the SUPPLY-constraint
  angle on the same AI-selloff week — distinct subject/thesis, but publish only one of the two to a given audience
  to avoid the near-identical "is the AI build-out ending?" close landing twice.** Media credits (Pexels, free
  license) — videos: an abstract red data-field selloff (34127955), an aerial road fork — a paved road with a diverging dirt track (34731156).
  Photos: an empty open palm (8058739), a plain piggy bank — no money (4146007), an English planner page
  (7723802), a lone microphone under a spotlight (17722679), a blank sheet of paper (6801641), a hand with a
  blank-screen phone (13570135), a balancing-stone cairn (6226707), one fresh red match among burnt ones
  (32248356), a red light-streak on black (14212135), a dark geometric grid (28428591), abstract red 3D blocks
  (29738260), red smoke (16052073), a red geometric lattice (10559023), a broadcast camera / blurred auditorium
  (26803904), cracked drought earth (36767372), an ascending light-line (8959017), a jigsaw with a missing piece
  (262488), a tipped empty seesaw (13442292), a wordless yellow hazard triangle (11442941), a hand holding a blank
  card (6373874), crane jibs against sky (17297091), gold bokeh (8080577), a rolled certificate with a ribbon
  (7723731), gold scissors cutting paper (8058752), a red paint swirl (6757560), red smoke on black (38808411), a
  forest path forking in two (13219613), a circuit-board macro (33798614), a retro megaphone (8846789), a hand
  gripping a wrench (29459133), a dart in a bullseye (13179775), blinking server-rack lights (17489155), an empty
  glass jar (9477269), a hands-only handshake (33175672), an auction gavel (8693379), an oil pumpjack (20014443),
  a dark oil abstract (6141905), confetti aftermath (4929511), a declining chart line — numbers cropped out
  (39228929), a crude-oil sheen (14650696), an hourglass nearly run out (10994725), a hand pointing at the viewer
  (1259327). No generated graphics this reel. **Brand-safety (screened hard at source and from the FINAL
  render):** FACE-FREE (hands, objects, backs; one gavel shot has a person with face out of frame), and — despite
  naming Nvidia / Jensen Huang / Meta / Tesla / CNBC — free of any company logo or wordmark, identifiable face,
  product/chassis that names a maker, stock TICKER or readable price, exchange/CNBC signage, oil-company logo,
  flags, identifiable landmarks, readable foreign text, banknote/coin portraits or identifiable currency, and
  military. The sourcing agents rejected along the way: Dell/HP server chassis + "HP ProLiant" wordmarks, an
  Apple-logo laptop, a national flag, an Infineon-branded chip, a Neumann-branded mic, a bank statement naming
  Amazon/Target/Discover, Portuguese/Russian/Chinese text on calendars and scales, "PERGAMON LONDON" / "EGO" /
  "Ice Cold Drinks" wordmarks, and Jenga/Liebherr marks. A few beats use clean abstract STAND-INS where every
  literal, brand-free option was already used by another reel: the magnifier-over-document beat is a blank sheet
  (sc05), and the "falling bars" / "down arrow" / recap-chart beats are abstract red renders / a number-cropped
  chart (sc09, sc11, sc41). **UNVERIFIED / SENSITIVE — names real companies and a named CEO, quotes him, and
  asserts same-morning market moves; rendered as written but MUST be fact-checked before publishing.** Verify: the
  Jensen Huang "scarcity of capital" / "working capital" / "availability of capital" quotes and the CNBC setting;
  the per-name moves (Nasdaq 100 −1.5%, Meta −5%, Nvidia −4% — vary by source and intraday-vs-close); Meta's
  ~$135B capex floor and its new non-voting share class; Tesla trimming AI spend ~$25B→$20B; and ~$112 Brent "the
  same morning." The "scarcity of capital = more debt" framing is editorial analysis.
- **`WarehouseReel`** — "The warehouse" (fast NEWS reel). NEW topic: **the AI-capex boom is showing up in
  INDUSTRIAL REAL ESTATE — US big-box warehouse leasing had its biggest quarter in four years, driven by
  data-centre-adjacent tenants concentrated in Texas. The AI build-out lands as concrete, not just chips.**
  10-part structure. Thesis: where AI capex actually lands is warehouses — concrete, in Texas — pricing out the
  companies that used to rent the space. US industrial leasing ~202.6M sq ft in one quarter, up ~38.5% YoY, the
  biggest quarter since 2022. Who's signing: logistics first (~17.9%), construction materials (~14.7%), then the
  new names — comms & tech (~7.5%, rising), energy & utilities (~4.6%, rising): power, infrastructure, defence,
  the supply chain behind the data centre. Second-order: Savills tracked the data-centre-adjacent tenants alone —
  ~69M sq ft of big-box over two years, ~10.1% of all H1 leasing, concentrated in four metros (Dallas, Houston,
  Austin, the East Bay). Twist: a 38% jump reads like a boom but it's narrower — vacancy down to ~6.8%, ~317M sq
  ft under construction (most since early 2024), and a tenth of demand is one industry in one state, building
  boxes for servers. Open questions: does 10% become 20%; what happens to the Texas warehouse market if AI capital
  dries up (as Nvidia's CEO warned on Thursday — see ScarcityReel). Binary close ("Is this the AI boom reaching
  Main Street, or renting Main Street out from under it? Pick a side below."). **NO post-hook pause**, mid-reel
  like+follow ask. 47 beats: 44 media (incl. **10 cards** — 202.6M SQ FT; 38.5%; 17.9%; 14.7%; 7.5%; 4.6%; 69M SQ
  FT; 10.1%; 6.8%; 317M SQ FT — the most card-dense reel in the set; "2022" is a TEXT beat, NOT a stat, to avoid
  the thousands-comma on a year), 1 red impact, 2 black ("Power. Infrastructure. Defence." / "A tenth of the
  demand is one industry, one state."). **Captions match the VO verbatim** (except the number cards; spoken
  figures as numerals). Durations/reveals/SFX locked to the VO via a scribe_v1 word-timestamp anchor pass
  (`public/warehouse/voiceover.mp3`), **built at +21% VO pace — the house +10% default plus a further +10% at the
  client's request** (~107s; its own music bed, reused from the longer +10% cut). Entirely
  its own fresh footage under `public/warehouse/` — no asset shared with any other reel. **New STANDALONE reel;
  the DEMAND-side / real-estate-footprint companion to `ScarcityReel` and `ConstraintReel` (the same AI-capex
  week), but a wholly distinct subject.** Media credits (Pexels, free license) — videos: a drone pass over a
  big-box warehouse district (36306203), an aerial dirt path forking in two (14239817). Photos: an empty warehouse
  interior (236698), an ascending stone staircase (11582936), crane booms lifting (5272744), a blue microchip
  macro (40270771), a concrete foundation + rebar (36532625), a "rooms to let" sign (20857192), a magnifier over a
  data/metrics printout (7948002), a hand with a blank-screen phone (12876450), two forklifts + crates (11500419),
  one blue bulb among yellow (12198522), a row of industrial dock doors (13207872), an aerial of warehouse
  rooftops (15914881), an abstract upward arrow (12290514), a white stepped-cube stack (12977017), a hand marking
  an English calendar (6170766), a hand signing a document (8815849), shrink-wrapped goods on pallets (5532843),
  stacks of blue pallets (10096900), bundled steel rebar (5623179), a seedling sprouting (4173853), a comms/antenna
  tower (16189543), a high-voltage pylon (34532812), interlinked metal chain (34178925), a wordless warning
  triangle (14176910), abstract data/chart pages (7948032), an hourglass (4397907), an aerial of industrial
  rooftops (31729740), an orange cut in half (5223989), coloured powder in pie-like segments (2041707), an
  anonymous highway interchange aerial (13178602), fireworks on black (1503520), a corridor narrowing to a doorway
  (10792354), an empty industrial unit (1784543), an empty sunlit factory interior (8551121), two yellow tower
  cranes (5504311), a construction-site aerial (25461690), a server rear-ports close-up (2881228), abstract
  ascending steps (37490442), cracked dry earth (9025845), a single microphone on a stand (1745762), full
  warehouse racks (4483609), a dark empty loading-dock bay (15143512). No generated graphics this reel.
  **Brand-safety (screened hard at source and from the FINAL render):** FACE-FREE (hands, machines, objects,
  overhead specks only), and — **ESPECIALLY no Amazon/FedEx/UPS/Walmart/DHL or any company name/logo on a
  warehouse roof, truck, trailer or dock sign** — free of any company logo or wordmark, identifiable face, stock
  ticker or readable price, exchange signage, flags, identifiable landmarks or skyline, readable foreign text,
  banknote/coin portraits or identifiable currency, and military. The sourcing agents rejected along the way:
  Micron / Dell / HP / IBM eServer chip & server logos, Caterpillar (CAT), KLATT / Stertil dock-seal wordmarks,
  EPAL/UIC pallet stamps, a SHURE SM58 mic, a Google wordmark + a Google-Analytics/Dow-Jones dashboard, a
  SARGENT ART pencil mark, a Chinese forklift brand, Portuguese calendars and Spanish "ANDEN DE CARGA" / Turkish /
  Polish signage. A late comprehensive ledger check also caught one slip — wh39 (servers) first landed on 4373998,
  already used by `ListingReel`; re-sourced to 2881228. Clean abstract STAND-INS where the literal brand-free
  option didn't exist: the "to let / vacancy" beats use a generic rooms-to-let sign + an empty factory (every
  commercial lease sign carried agency branding), the "share" beat uses coloured-powder pie segments (chart
  printouts had readable numbers), and the chip macro (wh04) carries only a non-maker part code. **UNVERIFIED /
  SENSITIVE — cites a specific Savills industrial-market dataset and a CEO warning; rendered as written but MUST be
  fact-checked before publishing.** Verify: ~202.6M sq ft quarterly leasing and the ~38.5% YoY jump / "biggest
  since 2022"; the sector mix (logistics 17.9%, construction materials 14.7%, comms & tech 7.5%, energy &
  utilities 4.6%); the ~69M sq ft / ~10.1%-of-H1 data-centre-adjacent figures and the four-metro concentration;
  vacancy ~6.8% and ~317M sq ft under construction ("most since early 2024"); and the Nvidia-CEO "Thursday"
  cross-reference. The "AI boom renting Main Street out from under it" framing is editorial analysis.
- **`HalfReel`** — "The half" (personal-finance reel, Hard Ledger VISUAL style). Topic: **Michael Burry's advice to
  buy only HALF the house you can afford — leave room to breathe, because a bank approving a big mortgage doesn't
  make it the smart move.** Framed around the US affordability gap: a buyer needed ~$110k/yr to afford a typical
  home while the typical household earned ~$88k — a ~$22k gap, worsened by mortgage rates. A smaller mortgage
  leaves more to save, invest and absorb the unexpected; the goal is to own a house without it owning you.
  **BUILT VERBATIM from a client-supplied script that is deliberately NOT in the usual faceless Hard Ledger house
  voice** — it NAMES Michael Burry, relays his advice (imperatives), and CLOSES on a "let me know in the comments"
  CTA rather than the house binary "Pick a side below." The client asked for verbatim, so this is the one reel in
  the set with a comments-CTA and advice language by design; the red beat still poses the would-you-rather choice.
  32 beats (shorter, calmer than the news reels), **3 stat cards — $110,000 / $88,000 / $22,000** (money, so the
  thousands-comma is WANTED and rendered), 1 red impact (the would-you-rather), 1 black ("Own the house. Don't let
  it own you."). **Captions match the VO verbatim** (except the number cards; spoken figures as numerals).
  Durations/reveals/SFX locked to the VO via a scribe_v1 word-timestamp anchor pass (`public/half/voiceover.mp3`),
   +10% VO default** (~71s; its own calm music bed). Entirely its own fresh footage under
  `public/half/` — no asset shared with any other reel. **New STANDALONE reel; thematically adjacent to `RatioReel`
  ("The goalpost moved", the home-affordability mechanism) but a distinct hook (Burry's "buy half" rule).** Media
  credits (Pexels, free license) — video: an aerial suburban neighbourhood (38774217). Photos: a wooden toy house
  + vintage keys (8293715), model houses on finance charts (28738504), a small toy house in grass (9260450), pills
  arranged as a question mark (3683107), a handwritten to-do list (131979), a single light bulb on black
  (20766488), a coiled metal spring (7221094), a magnifier over a data chart (7948055), a hand on a column chart
  (7580704), a pink piggy bank (11618875), gold bokeh (34771372), a craftsman home exterior (6835077), a lived-in
  modern kitchen (7045356), gold glitter (7629494), cracked concrete slabs — a gap (29102198), a gold-bokeh
  abstract (34894234), a paper percent-sign (8680188), a slim wallet + shopping bags (6633602), hands holding
  light bulbs (6990487), an open window with leaves (19026351), hands filling a property form (7731326), a single
  chess piece (40227395), a hand holding a money-plant (10894354), water dripping from a rusty pipe (7190792), a
  hand holding house keys (27522902), legs under a pile of moving boxes (4553181), two front doors — blue & pink
  (33775202), a large columned luxury house (8082328), a grid of blank notes with one blue standout (6991345). No
  generated graphics this reel. **Brand-safety (screened hard at source and from the FINAL render):** FACE-FREE
  (hands, objects, houses; no identifiable faces), and free of any company/bank/realtor logo or wordmark, readable
  agency sign or phone, stock ticker or readable price, flags, identifiable landmarks, readable foreign text,
  banknote/coin portraits or identifiable currency, and military. The sourcing agents rejected along the way: a
  real-estate marketing flyer, Philippine-peso / US-penny / euro-cent coins (portraits + denominations), gold
  bullion coins ("999.9", country names) + a Bitcoin coin, a Mastercard receipt + a face, a US "Hamilton"
  banknote, a Cyrillic bank card, an IRS W-9 and a NASDAQ chart, Indonesian textbook text, a PAPAIZ padlock + a
  Portuguese street sign, a political "UKRAINE" sticker, a readable house address ("1225"), and a framed portrait.
  One more was caught at the FINAL-render brand audit: the $22k card first sat on a coin jar (12644993) whose
  handwritten label read as foreign text and whose coins were ambiguous foreign cents — swapped to a clean
  gold-bokeh abstract (34894234).
  Clean STAND-INS where the literal brand-free option didn't exist: coins almost always carry portraits/
  denominations, so the "earn/afford/gap" money beats use a piggy bank and gold-abstract (bokeh/glitter); the
  "stretch" beat is a metal spring (rubber-band shots were all people/faces); the "why?" beat
  is pills arranged as a question mark. **UNVERIFIED / SENSITIVE — attributes specific advice and a 2008-crash
  claim to a NAMED real person (Michael Burry) and cites affordability figures; rendered as written but MUST be
  fact-checked before publishing.** Verify: that Burry actually gave this "buy half the house" advice / the "list
  of life lessons for a 26-year-old" framing; the ~$110k-to-afford vs ~$88k-earned gap (~$22k), its source and
  date; and the mortgage-rate claim. "Own a house without it owning you" / the save-invest framing is editorial.
- **`HavenReel`** — "The haven" (personal-finance / markets reel, Hard Ledger VISUAL style). Topic: **Bitcoin AND
  gold are BOTH the worst-performing major assets of 2026 — both "safe havens" fell together, challenging the
  "digital gold" / "store of value" story.** Framed around Charlie Bilello's asset-performance rankings: Bitcoin
  ~−7.3% YTD, gold ~−7.5% YTD — reportedly the first time both finished at the bottom in the same year.
  Meanwhile commodities surged and US stocks were positive. The reason: neither pays interest, so when rates rise
  money prefers assets that pay you to hold it — which challenges "Bitcoin is digital gold" and "gold is a store
  of value." **BUILT VERBATIM from a client-supplied script in the influencer "curiosity-gap" format (like
  `HalfReel`), NOT the faceless house voice** — it NAMES strategist Charlie Bilello, uses an EARLY "follow for
  more" CTA, and CLOSES on a "let me know in the comments" audience-debate CTA rather than the house binary. The
  red beat still poses the would-you-rather ("can either protect your wealth?"). 34 beats, **2 stat cards —
  BITCOIN −7.3% / GOLD −7.5%**, 1 red impact, no black beat. **Captions match the VO verbatim** (except the number
  cards; spoken figures as numerals). Durations/reveals/SFX locked to the VO via a scribe_v1 word-timestamp anchor
  pass (`public/haven/voiceover.mp3`), **built at +21% VO pace — the house +10% default plus a further +10% at the client's request** (~70s; its own tense music bed, reused from the +10% cut).
  Entirely its own fresh footage under `public/haven/` — no asset shared with any other reel. **New STANDALONE
  reel; thematically adjacent to `GoldReel` ("Store of value") and `HedgeReel` ("The Fed bet", gold vs rates) but
  a distinct hook (Bitcoin AND gold together / the digital-gold myth).** Media credits (Pexels, free license) —
  video: abstract red digital particles falling (34338488). Photos: a gold trophy — no engraving (6532362), a furled
  umbrella in a storm (18582300), a steep downward chart (39032295), a chalk question mark (2646533), cracked
  glass (30798595), a hand with a blank-screen phone (6611961), an over-the-shoulder analyst at a desk — no face
  (5831355), a red downward arrow among up-arrows (9408386), a vault wheel on a safe door (12651886), a plunging
  candlestick chart (5834234), an abstract gold/silver particle sphere (30895543), dark orange/red digital light
  rays (20083446), gold glitter/dust (5594992), a molten-gold texture (4880794), a generic bar/pie chart sheet
  (669621), a winners' podium / last place (16042675), a generic bar/line chart sheet (669612), a studio
  spotlight (5389616), red light-streaks falling (14434976), a green up-arrow on concrete (9781834), golden wheat
  (19429312), a green upward flare (30066067), a macro human eye — B&W, unrecognizable (7098932), an open empty
  palm (20805379), a red balloon with a "%" symbol (5625108), a green sprout (7768447), a crumbling classical
  statue (14273631), gold-bokeh particles (751374), a crinkled-gold texture (2248589), a blue arrow pointing down
  (4843911), a brass balance scale (6077520), a speech bubble over blank notes (6991504). No generated graphics
  this reel. **Brand-safety (screened hard at source and from the FINAL render):** FACE-FREE (hands, objects, an
  unrecognizable macro eye, backs of heads only), and — this being a HIGH-RISK crypto/gold topic — free of any
  Bitcoin "₿" / Ethereum / crypto logo, exchange or charting-app (Binance / Coinbase / TradingView) screen,
  ticker or readable price, gold-bullion wordmark or coin portrait, identifiable currency, company logo,
  identifiable face, flags, landmarks, readable foreign text, and military. The three sourcing agents rejected a
  large pile along the way: Bitcoin ₿ novelty coins + "BITCOIN/CRYPTOCURRENCY" text, an Ethereum logo, "GLOBAL
  INTERGOLD" / "ARGOR-HERAEUS / Fine Gold 999.9" bullion wordmarks + serials, Krugerrand / "100 EURO" / "UNITED
  STATES OF AMERICA" coin text + portraits, forex tickers (EUR/USD, GBP/USD, a "1BTCUSD" and "BNBUSDT"),
  Dow-Jones / TradingView / S&P-500 / Google-Analytics dashboards with readable prices, a Pound-Sterling pair, a
  Vietnamese-dong safe shop (DENKO / HOA PHAT / EIKO) + a "FICHET PARIS" vault boss, a "PKO SILESIA MARATHON"
  podium, $-stamped coins, and many readable price labels (−0.26%, −3.76%, +2.22%, an H/L/C header, "Tue 17 Feb").
  Clean abstract STAND-INS where no brand-free literal source existed: crypto/digital-gold = abstract gold
  particles (hv11/hv29); gold-bar beats = textless gold glitter/molten/crinkled gold (hv13/hv14/hv30); "falling"
  = red light-streaks + a rotated-down arrow (hv20/hv31); "rising/positive" = a green flare + green sprout
  (hv23/hv27). At the FINAL-render audit one more was caught: the "not the record" beat (hv01) first used broken vinyl with
  readable "Arcade"/"Polydor" record-label marks — swapped to a brand-free gold trophy close-up (6532362). One
  tiny non-finance mark was kept: an incidental, unreadable monitor-bezel mark on the analyst beat (hv07). **UNVERIFIED / SENSITIVE — names a real strategist (Charlie Bilello) and cites his data; rendered as
  written but MUST be fact-checked before publishing.** Verify: Bitcoin ~−7.3% and gold ~−7.5% YTD 2026 and the
  "first time both at the bottom of Bilello's rankings in the same year" claim and its date; and that commodities
  "surged" / US stocks were positive the same period. The "digital gold / store of value can't protect wealth"
  framing is editorial analysis.
- **`SurvivorReel`** — "The survivor" (tech/markets reel, Hard Ledger VISUAL style). Topic: **Elon Musk / SpaceX
  closed a ~$40B debt deal to buy Nvidia GPUs for AI, while Musk warned that 200+ "neocloud" AI companies could
  consolidate down to a handful of survivors.** The irony: SpaceX borrows big to expand AI while warning others
  could collapse — its edge is Starlink/launch revenue, not pure AI-compute dependence. **BUILT VERBATIM from a
  client-supplied script in the influencer "curiosity-gap" format (like `HalfReel` / `HavenReel`), NOT the
  faceless house voice** — it NAMES Elon Musk / SpaceX / Starlink / Nvidia, uses an EARLY "follow for more" CTA,
  and CLOSES on a "let me know in the comments" debate CTA rather than the house binary. The red beat poses the
  would-you-rather ("dominate AI, or is the race getting dangerously expensive?"). 33 beats, **2 stat cards —
  SPACEX DEBT DEAL $40B / NEOCLOUD COMPANIES 200**, 1 red impact, no black beat. **Captions match the VO verbatim**
  (except the number cards; spoken figures as numerals). Durations/reveals/SFX locked to the VO via a scribe_v1
  word-timestamp anchor pass (`public/survivor/voiceover.mp3`), **built at +21% VO** (additional 10% on the house default; ~79s; its
  own driving music bed). Entirely its own fresh footage under `public/survivor/` — no asset shared with any other
  reel. **New STANDALONE reel; thematically adjacent to the existing SpaceX reels — `SpacexReel` ("The belief",
  IPO TAM) and `LandlordReel` ("The landlord", SpaceX as an AI-compute landlord with 1M+ Nvidia GPUs) — and to
  `ScarcityReel` (the neocloud / AI-capital-crunch angle). Distinct hook: the $40B debt deal + Musk's
  200-neocloud "only a few survive" warning.** Media credits (Pexels, free license) — video: a generic rocket
  engine firing (854266). Photos: toppling dominoes (1393972), warm spotlights (10140708), a copper circuit-board
  macro (6755087), a lone burning candle (5475164), a red stage curtain (4507866), a hand with a blank-screen
  phone (6611963), a generic rocket-launch light-trail (9710060), a generic radio satellite dish (29781587), blue
  network patch cables (4716292), a hands-only business handshake (9490632), gold bokeh (39359856), a blue chip
  macro (40342986), an abstract neural-network sphere (14314636), cracked dry earth (1097016), a weathered
  "CAUTION" signpost (38243793), an aerial crowd (26690512), an aerial motorway merge (20896696), a lone green
  tree in a barren field (20207947), a magnifier in a palm (3074542), a fiber-optic patch panel (4280702), an
  antique balance scale (29746445), a spread of playing cards (12119810), a wall of locked safe-deposit boxes
  (18725637), a raised "stop" palm (7114349), a winding S-curve road (26800142), a rising wooden staircase
  (14652792), a finger toppling dominoes (12969405), multiple industrial feed pipes (12380628), a single cracked
  ancient column (38162814), a white chess king (4038395), a speech bubble over sticky notes (6991502). No
  generated graphics this reel. **Brand-safety (screened hard at source and from the FINAL render):** FACE-FREE
  (hands, objects, crowds-from-above, backs only), and — despite naming Musk / SpaceX / Starlink / Nvidia — free
  of any identifiable face (no Musk), SpaceX/Starlink/Nvidia/Tesla logo or wordmark, identifiable SpaceX rocket
  (generic rockets only), Nvidia-branded GPU, stock ticker or readable price, flags, identifiable landmarks,
  readable foreign text, banknote/coin portraits or identifiable currency, and military. The three sourcing agents
  rejected a large pile: a Cyrillic "СССР/ВОСТОК" Vostok monument, a "NASA" SLS wordmark, a SpaceX Dragon capsule
  (SPACEX wordmark), HP/ProLiant / IBM eServer/xSeries / Intel / NetApp / Schneider server logos, a "SUMITUBE" and
  "PBI" mark, Micron/TI chip part-markings, a war-memorial roundabout, a Bank-of-Uganda "500 SHILLINGS" coin, an
  Ethereum coin, a $100-bill portrait, Philippine-Piso coins, Turkish-language earthquake banners, and several
  identifiable faces. Clean STAND-INS where no brand-free literal source existed: every logo-free wide server-hall
  shot carried vendor logos, so the "infrastructure / data center" beats use fiber patch-panel + cable macros
  (sv09, sv20 — both brand-free, so visually similar but distinct assets); the "house of cards" beat is a
  people-free card spread (card-tower shots had faces); the "borrow/scale-up" beat is a staircase (money shots
  carried currency portraits). **UNVERIFIED / SENSITIVE — names real people/companies (Elon Musk, SpaceX,
  Starlink, Nvidia) and asserts a specific debt deal + a market warning; rendered as written but MUST be
  fact-checked before publishing.** Verify: the ~$40B SpaceX debt deal to buy Nvidia GPUs; Musk's "200+ neoclouds
  could consolidate, only a few survive" warning and where/when he said it; and the "SpaceX's edge is
  Starlink/launch revenue" framing. The survival / "dangerously expensive" framing is editorial analysis.
- **`MetaReel`** — "The gamble" (tech/markets reel, Hard Ledger VISUAL style). Topic: **Meta announced (Oct 26) a
  ~$35B stock offering — ~$22.5B Class A common + ~$12.5B preferred — to fund its AI build-out, plus a separate
  ~$60B stock-sale program planned for the future; Meta's 2026 capex is guided to ~$135B–$145B.** The tension: big
  equity raises can dilute shareholders and the infrastructure spend creates pressure to turn AI demand into
  profit; Meta says its AI is already lifting engagement, ad performance and monetization — and the $60B program
  is only planned, not guaranteed. **BUILT VERBATIM from a client-supplied script in the influencer "curiosity-gap"
  format (like `HalfReel` / `HavenReel` / `SurvivorReel`), NOT the faceless house voice** — it NAMES Meta / Mark
  Zuckerberg / Facebook / Instagram / WhatsApp, uses an EARLY "follow for more" CTA, and CLOSES on a "let me know
  what you think in the comments" debate CTA rather than the house binary. The red beat poses the would-you-rather
  ("the right move… or a huge financial gamble?"). 37 beats, **5 stat cards — $35B (two public offerings) / $22.5B
  (Class A) / $12.5B (preferred) / $60B (future plan) / $135B (2026 capex, up to $145B)**, 1 red impact, no black
  beat. **Captions match the VO verbatim** (except the number cards; spoken figures as numerals).
  Durations/reveals/SFX locked to the VO via a scribe_v1 word-timestamp anchor pass (`public/meta/voiceover.mp3`),
   +10% VO default (~132s / 2:12 — a long, dense verbatim script; its own driving music bed).**
  Entirely its own fresh footage under `public/meta/` — no asset shared with any other reel. **New STANDALONE reel;
  thematically adjacent to the AI-capex cluster (`ScarcityReel`, `WarehouseReel`, `SurvivorReel`) but a DISTINCT
  story: a specific company (Meta), a specific equity raise and capex guide, and the dilution / return-on-AI-spend
  question.** Media credits (Pexels, free license) — video: an abstract particle-network motion (34912823). Photos:
  chess king/pawns in red backlight (16256893), a blank-gradient-screen phone (29486053), gold/mauve bokeh
  (18874025), a generic glass skyscraper (32203763), sprint starting blocks (14585535), a finger tapping a
  blank-screen phone (24503743), earth at night from space (30596263), a molten-gold pour (6804260), a blue-lit
  server unit (17489152), hands over a contract (8730986), a high-rise under construction (18078304), a pen set on
  a blank notepad (7841419), golden bokeh (19756486), an aged certificate-style paper stack (6607100), a riveted
  steel vault door (36329567), railway tracks forking into fog (6760319), an open road to mountains (2715004), an
  aerial of a vast crowd (36829130), tall stacks of gold casino chips (7594196), glass skyscrapers in fog
  (12570674), a fiber-optic cable bundle (28286034), a snow-capped peak through mist (14769110), a multi-arrow
  directional road sign (30170193), a playground seesaw (28939519), ink dispersing in water (5606167), a vintage
  bench vise (29404121), seedlings sprouting from soil (985626), hands cradling a glowing phone (19949818), a
  vintage cash register (5370036), a blindfolded Lady-Justice statue with scales (30483132), stacked steel I-beams
  (36003962), a megaphone on a stool (8846035), a hand-drafted blueprint (716661), a gold chess king over a toppled
  king (35835880), and pastel speech-bubble cutouts (31418370). No generated graphics this reel. **Brand-safety
  (screened hard at source and from the FINAL render):** FACE-FREE (hands, objects, crowds-from-above, allegorical
  statue only), and — despite naming Meta / Zuckerberg / Facebook / Instagram / WhatsApp — free of any identifiable
  face (no Zuckerberg), Meta/Facebook/Instagram/WhatsApp/Threads logo, wordmark or app UI, any other brand logo,
  stock ticker or readable price/chart, exchange signage, flags, identifiable landmarks or corporate HQ, readable
  foreign text, banknote/coin portraits or identifiable currency, and military. The three sourcing agents rejected
  a large pile: "plexus" network clips with floating @/envelope icons and a particle clip with readable stock
  prices; Philippine-peso ("BANGKO SENTRAL") / €2 / French-franc coins, crypto tokens, and "GLOBAL INTERGOLD
  999.9" / Argor-Heraeus gold bars; a "FIMET" gauge, a "LARIO/AVERY" scale, container-yard BIC codes / Textainer
  marks, a Cyrillic alarm-clock UI, and vendor logos on wide server-hall shots. Clean STAND-INS where no brand-free
  literal source existed: the "money/raise" beats use abstract gold bokeh (every coin/bill/bar carried currency
  portraits or bullion wordmarks); "common stock" is an aged certificate-style paper stack (no brand-safe share
  certificate exists on Pexels); "preferred stock" is a riveted vault door (clean vault interiors were all on the
  ledger). One cross-reel id collision was caught by the ledger check and re-sourced (mt23 question-marks →
  multi-arrow sign), and the FINAL-render audit caught a finance table with readable dollar/percentage figures on
  the capex beat and swapped it for brand-free gold casino-chip stacks (mt19). **UNVERIFIED / SENSITIVE — names a real company/person (Meta, Mark Zuckerberg) and asserts
  specific financials (a ~$35B offering split $22.5B/$12.5B, a planned ~$60B program, ~$135B–$145B 2026 capex, an
  Oct 26 date); rendered as written but MUST be fact-checked before publishing.** The dilution / "profitable
  business" framing is editorial analysis.
- **`SteamReel`** — "The freeze" (gaming/tech-news reel, Hard Ledger VISUAL style). Topic: **Steam (Valve's PC
  platform) users report the client getting stuck on a "Loading User Data" screen, locking some out of their game
  libraries — while Steam's official status dashboard shows no corresponding major outage.** Reports rose Oct 26
  across multiple countries (PC + Steam Deck); per TechRadar, Downdetector reports spiked to ~500 in the U.S. and
  ~450 in the U.K., and restarting/reinstalling didn't help. Store/Community may stay up while the client is
  broken; the cause is unconfirmed (bug, backend, or something else — explicitly flagged as speculation in-script).
  **BUILT VERBATIM from a client-supplied script in the influencer "curiosity-gap" format (like `HalfReel` /
  `HavenReel` / `SurvivorReel` / `MetaReel`), NOT the faceless house voice** — it NAMES Steam / Steam Deck /
  TechRadar / Downdetector, uses an EARLY "follow for more" CTA, and CLOSES on a "tell us ... in the comments"
  debate CTA rather than the house binary. The red beat poses the would-you-rather ("working normally ... or stuck
  on Loading User Data too?"). 40 beats, **2 stat cards — U.S. OUTAGE REPORTS 500 / U.K. OUTAGE REPORTS 450** (each
  card spans its full spoken phrase so the count-up completes), 1 red impact, no black beat. **Captions match the
  VO verbatim** (except the number cards; spoken figures as numerals). Durations/reveals/SFX locked to the VO via a
  scribe_v1 word-timestamp anchor pass (`public/steam/voiceover.mp3`),  +10% VO default
  (~104s); its own driving, urgent music bed.** Entirely its own fresh footage under `public/steam/` — no asset
  shared with any other reel. **New STANDALONE reel; a tonal/topic DEPARTURE from the finance/AI-capex cluster — a
  gaming-news / outage story.** Media credits (Pexels, free license) — video: a dark wireframe vortex loop
  (15886614). Photos: head-down over a glowing keyboard, face hidden (7915244), a blank glowing laptop screen
  (7864378), a padlock + chain (13429064), smoke forming a question mark (9202292), a dark control console with
  indicator lights (28292708), a hand on a dark phone, screen turned away (1670035), a B&W block calendar
  (9403177), earth at night (30596211), a mechanical keyboard (18172216), a vintage CRT showing static (5389621),
  a dark red glow (720457), a soft amber glow (17603458), an unbranded laptop power key (39481207), a cracked
  laptop screen (28379995), a clenched fist (6920651), a glowing loading-ring spinner (10187003), a wall of clocks
  (35165104), spreading data streams (10653941), a padlock on wood (9933020), an unbranded arcade joystick
  (374914), an empty wire shopping cart (30880205), a dark gaming desk with the screen off (33888376), a hand
  holding a "?" tile (10988654), a metallic beetle / literal bug (6037798), a hidden-face silhouette in smoke
  (1480689), an empty vintage microphone (12448179), drifting smoke (11230057), a 3D green-check checklist
  (20279300), and plain speech bubbles (4176482). Nine finer beat-splits added for the 40-beat cut use: a glowing
  dark monitor (7720712), a purple LED dot-matrix / loading dots (7293750), a soft green all-clear LED (37222947),
  a hand pressing a glowing glass panel (34731178), a generic unbranded handheld — not a Steam Deck (4978057),
  gold gears (3785931), an hourglass (12091109), a lit arcade button (8339264), and red smoke (39164825). No
  generated graphics this reel. **Brand-safety (screened hard at
  source and from the FINAL render):** FACE-FREE, and — despite naming Steam / Steam Deck / TechRadar /
  Downdetector — free of any Steam / Valve / Steam Deck logo, client UI or recognizable device, any console or
  controller brand mark, any game title / box art / character / IP, any TechRadar or Downdetector logo or UI, any
  other brand logo, readable error / dashboard / foreign text, flags, identifiable landmarks, and military. The
  three sourcing agents rejected a large pile: server-rack shots carrying vendor logos, Neumann / Razer / Maono /
  SteelSeries / ABUS / "stein BRASS" / "Rolens" marks, newspapers with readable mastheads (one showing Queen
  Elizabeth II), a museum panel with Turkish text, Korean / "CURFEW" / "HIGH" labels, and an on-screen game UI;
  two late dedup collisions (a server rack and a vintage mic md5-identical to a sibling slot) were re-sourced to a
  control console and a CRT-static TV. Three assets (st27 "?" tile, st32 green-check checklist, st34 speech
  bubbles) sit slightly off the near-black palette — brand-safe but brighter; flagged for a possible darker swap.
  **UNVERIFIED / SENSITIVE — names real entities (Steam/Valve, Steam Deck, TechRadar, Downdetector) and asserts a
  live, time-sensitive outage with specific figures (~500 U.S. / ~450 U.K. Downdetector reports, an Oct 26 date);
  rendered as written but MUST be fact-checked before publishing, and the outage data is PERISHABLE (counts and
  whether it is still down drift by the hour).** The bug/backend cause is explicitly flagged as speculation
  in-script.
- **`UniteReel`** — "Game over" (gaming-news reel, Hard Ledger VISUAL style). Topic: **The Pokémon Company confirmed
  Pokémon UNITE (the free-to-play 5-on-5 MOBA, launched on Nintendo Switch July 2021, later mobile) will END
  SERVICE on March 23, 2027, on both Switch and mobile** — after which players can't log in or battle. The countdown
  has started (Aeos Gem sales suspended; new UNITE Club memberships and auto-renewals stopped; remaining
  gems/benefits usable until the end). To keep records / Pokémon / cosmetics, players must use an upcoming library
  feature and complete a data download before shutdown. Bittersweet twist: the devs still plan special events and
  the Aeos Crown 2027 tournament before closing, so competitive play continues a little longer. **BUILT VERBATIM
  from a client-supplied script in the influencer "curiosity-gap" format (like `HalfReel` / `HavenReel` /
  `SurvivorReel` / `MetaReel` / `SteamReel`), NOT the faceless house voice** — it NAMES Pokémon / Pokémon UNITE /
  Nintendo Switch / The Pokémon Company / Aeos, uses an EARLY "follow for more" CTA, and CLOSES on a "let us know in
  the comments" debate CTA. The red beat poses the would-you-rather ("deserved more years of support ... or time to
  move on?"). 37 beats, **1 stat card — SERVICE ENDS MARCH 23 (2027)** (count-up on the day, the year as static
  text to avoid the year-comma bug), 1 red impact, no black beat. **Captions match the VO verbatim** (except the
  number card; spoken figures as numerals). Durations/reveals/SFX locked to the VO via a scribe_v1 word-timestamp
  anchor pass (`public/unite/voiceover.mp3`), **built at +21% VO** (additional 10% on the house default; ~104s; its own driving-but-
  bittersweet music bed.** Entirely its own fresh footage under `public/unite/` — no asset shared with any other
  reel. **New STANDALONE reel; a gaming-news story like `SteamReel` but a DISTINCT topic (a game sunset, not an
  outage).** Media credits (Pexels, free license) — video: near-black glitch/disintegration streaks (9988884).
  Photos: a silhouetted crowd from behind (26447527), clashing lightning bolts (13248344), a back-view figure at an
  ocean sunset (39452113), a magnifying glass on bokeh (1194775), a dimming data-center corridor (17505092), a hand
  on a reception bell (7820697), a pink firework (13108272), hands holding a blank-screen phone (34956281), a dark
  mechanical keyboard (29593536), B&W silhouettes one-vs-pair (6064637), a glass office facade (35158336), a wall
  rocker switch off (7822338), a soft-focus hourglass (7215824), a blank-screen phone (6373169), a bolted door
  (11483198), arena spotlight beams (5389617), a Roman-numeral clock (355915), tumbled crystals (15803904), two
  raised open palms (10052843), a hand holding raw crystals (6954663), a blank card on fabric (4862923), dark storm
  clouds (32637595), a floppy-disk hub (34890888), gems spilling from a box (10582459), wooden archive drawers
  (6549926), teal fiber-optic connectors (4657267), a dark spiral staircase (12951923), fireworks on black
  (6942352), generic gold star trophies (6532364), a hallway with a door ajar (3422552), an alarm clock near twelve
  (33992883), two chess kings facing off (136352), an hourglass on a wooden stand (39585687), hands cradling a
  glowing lightbulb (2938278), and blank speech bubbles (8015682). No generated graphics this reel. **Brand-safety
  (screened hard at source and from the FINAL render):** FACE-FREE, and — despite naming Pokémon / Nintendo / UNITE
  / Aeos — free of ANY Pokémon (no Pikachu, creatures or Poké Ball), any Pokémon / UNITE / Aeos / Nintendo logo,
  wordmark, character or game UI/screenshot, any Nintendo Switch / Joy-Con / recognizable console, any
  console/controller brand mark, any game title / box art / IP, readable game / UI / foreign text, other brand
  logos, flags, identifiable landmarks, and military. The three sourcing agents rejected a large pile across the
  unforgiving IP bar: an Apple iPad with iOS app icons, a monitor showing a recognizable anime/game character, an
  "O2" wordmark, "Nasdaq / StockCharts.com" chart text, Dell / HDD part-number + QR labels ("1.2TB", "2.4 TB/SAS",
  "ASSEMBLED IN MEXICO"), "DOUBLE LOCKING" / "Roto" locks, a "WHAT?" keyhole, a Cyrillic alarm-app UI, and
  identifiable faces. Clean STAND-INS where no brand-free literal source existed: no safe two-device / handheld shot
  existed without Apple logos, so the "Switch and mobile" beat uses a single generic blank-screen phone; the "gems"
  beats use generic tumbled crystals (no Aeos currency), the "cosmetics" beat uses generic gems in a box (no
  Pokémon). Two off-near-black notes: un29 (trophies) is on a bright background and un25 (archive drawers) has tiny
  illegible index tags — both fully brand-safe. **UNVERIFIED / SENSITIVE — names real entities (The Pokémon
  Company, Nintendo, Pokémon UNITE) and asserts a specific shutdown (March 23, 2027 end-of-service on Switch +
  mobile; Aeos Gem sales suspended; an Aeos Crown 2027 tournament); rendered as written but MUST be fact-checked
  against the official announcement before publishing.** The "deserved more support" framing is editorial analysis.
- **`AmocReel`** — "The conveyor" (science/climate-news reel, Hard Ledger VISUAL style). Topic: **satellite
  observations suggest the Atlantic Meridional Overturning Circulation (AMOC) — the "ocean conveyor belt" that
  carries warm water north and cold water south and helps keep parts of Europe warm — is WEAKENING; scientists
  estimate it has slowed ~18% over the past 40 years** (a *New Scientist* report finds less heat transported toward
  the North Atlantic). A weaker AMOC could reshape rainfall, affect storms, raise Atlantic sea levels and disrupt
  tropical rains; continued weakening could near a tipping point — but no imminent collapse is established, the
  AMOC is hard to measure, continuous records go back ~2 decades, and studies disagree on the pace. **BUILT
  VERBATIM from a client-supplied script in the influencer "curiosity-gap" format (like `HalfReel` /
  `SurvivorReel` / `MetaReel` / `SteamReel` / `UniteReel`), NOT the faceless house voice** — it NAMES the AMOC /
  New Scientist, uses an EARLY "follow for more" CTA, and CLOSES on a "let us know in the comments" debate CTA. The
  red beat poses the would-you-rather ("an underestimated climate risk ... or worst-case framing before the science
  is settled?"). 46 beats, **1 stat card — AMOC HAS SLOWED ~18% (over 40 years)**, 1 red impact, no black beat.
  **Captions match the VO verbatim** (except the number card; spoken figures as numerals). Durations/reveals/SFX
  locked to the VO via a scribe_v1 word-timestamp anchor pass (`public/amoc/voiceover.mp3`), 
  **built at +21% VO** (additional 10% on the house default; ~123s); its own driving, cinematic science-doc music bed. Entirely its own fresh footage under
  `public/amoc/` — no asset shared with any other reel. **New STANDALONE reel; a science/climate-news story (a
  departure from the finance and gaming reels).** Media credits (Pexels, free license) — video: Earth rotating in
  space, night side (33430410). Photos: a swirling ocean current (30175211), dark water with a fading glow
  (14124470), a storm sky over a churning sea (28320730), a lone ocean buoy (35689122), a calm cold-blue surface
  (38476578), a storm sky meeting the sea (11121564), blue-marble Earth over the Atlantic (30596282), a hand with a
  blank-screen phone (8217463), blue-marble Earth, Pacific hemisphere (30596214), a vast navy ocean (15305610),
  warm/cold water meeting (38374603), an industrial conveyor belt (6595775), water flow/contrast (34155535), a
  warm-vs-cool heat abstract (5739410), Earth / global weather (30596252), an open document on a dark desk
  (28426413), a satellite-dish silhouette (11724287), steam rising off the sea (6660742), a cold rough northern sea
  (38350381), fading waves (6914875), a frost/ice scene (30561193), lightning over the sea (40106397), waves on a
  coastline (5531700), a tropical downpour (38145936), a seasonal landscape (909291), a foreboding seascape
  (18553972), a rock balanced about to tip (37481507), a towering wave (39123286), a glacier calving (36718305), a
  boat wake into fog (6439497), an ocean beacon/instrument (27042627), layered geological strata (38404924), two
  arrows pointing opposite ways (10059343), a radio-telescope dish (29412940), a silhouette facing the sea
  (19489408), melting ice (36575340), an apocalyptic storm sky (1118873), and a paper speech bubble (9131059).
  Six finer beat-splits added for the 46-beat cut use: spreading ripples (17258044), light descending into deep
  cold water (12730725), swirling storm-cloud bands (1624599), icicle drift ice on a northern sea (29720363), a
  dissipating vortex (9667974), and cracked drought earth (32827206). No generated graphics this reel. **Brand-safety (screened hard at source and from the FINAL render):** FACE-FREE
  (silhouettes / hands / nature only), and — despite citing New Scientist — free of any New Scientist logo/cover or
  masthead, any NASA / ESA / NOAA or space-agency logo or marking on satellites, readable map country labels, stock
  tickers or readable chart/data text, other brand logos, flags, identifiable landmarks, readable foreign text, and
  military. The three sourcing agents rejected a pile: a SpaceX Dragon capsule (SPACEX wordmark) and a brand-logo'd
  dish for the satellite beat (settled on a logo-free dish silhouette), and a "Ridgeway" grandfather clock whose
  moon dial showed "AMERICA"/"AFRICA" map labels (swapped for text-free rock strata); one dedup collision (am10)
  was re-sourced. (Three blue-marble Earth-from-space frames across the global-context beats are distinct
  ids/hemispheres.) **UNVERIFIED / SENSITIVE — cites a real outlet (New Scientist) and specific science claims
  (AMOC slowed ~18% over 40 years; less heat transported north; tipping-point risk); rendered as written but MUST be
  fact-checked before publishing.** The reel itself flags the uncertainty (no imminent collapse established; studies
  disagree); the "underestimated risk" framing is editorial analysis.

- **`CorridorReel`** — "The corridor" (world-news / active-war reel, Hard Ledger VISUAL style). Topic: **Russia
  and Ukraine have reportedly agreed to a rare LOCAL ceasefire to let around 2,000 civilians escape the frontline
  town of Oleshky** (along the Dnipro River in southern Ukraine, under Russian control since the 2022 invasion),
  where residents have reportedly been cut off from food, medicine, electricity and water. Per a *Financial Times*
  report, the US-backed deal has Russian forces clear mines from roads out of the town so buses can evacuate
  residents and aid can reach those who stay — but President Volodymyr Zelenskyy warns evacuees could be routed
  through Crimea or Russia, and both sides accuse the other of obstructing aid; peace talks are expected to resume
  in Abu Dhabi. **BUILT VERBATIM from a client-supplied script in the influencer "curiosity-gap" format (like
  `SurvivorReel` / `MetaReel` / `SteamReel` / `UniteReel` / `AmocReel`), NOT the faceless house voice** — it NAMES
  the places/people/outlet, uses an EARLY "follow for more" CTA, and CLOSES on a "share your thoughts in the
  comments" debate CTA. The red beat poses the would-you-rather (can a local ceasefire become a stepping stone
  "toward a wider peace agreement?"). 46 beats, **1 stat card — AROUND 2,000 CIVILIANS TRAPPED**, 1 red impact, no
  black beat. **Captions match the VO verbatim** (except the number card; "2,000" as a numeral with its count
  comma, the "2022" year without one). Durations/reveals/SFX locked to the VO via a scribe_v1 word-timestamp anchor
  pass (`public/corridor/voiceover.mp3`), **built at +21% VO** (additional 10% on the house default; ~119s / 1:59); its own sombre, tense
  documentary music bed (deliberately NOT upbeat, to respect the subject). Entirely its own fresh footage under
  `public/corridor/` — no asset shared with any other reel. **New STANDALONE reel; a world-news / active-war story
  (the most sensitive topic in the set).** Media credits (Pexels, free license) — video: a single candle flame in
  darkness (35133765). Photos: two fingertips reaching / truce (1781944), light outlining an opening door
  (4132661), an anonymous crowd as distant sunset silhouettes (17791358), an empty road to a barren horizon
  (16962784), a derelict room with a lone chair by a broken window (11427279), an old dried-out outdoor tap
  (3868136), cracked dry earth (12861683), a mass of tangled cables (8071732), a finger on a dark out-of-focus
  phone screen (11391948), a calm river at dusk (5540508), a quiet aged town courtyard (16829187), a line where
  sand meets asphalt (29701209), hazard-striped stairs (33688140), a lone figure from behind in a foggy field
  (30728709), a stack of plain blank paper (14935583), a moody empty road through hills (26731360), a dim empty bus
  interior (14028104), stacked plain cardboard boxes (5025503), barriers across a road (29140417), a single raised
  hand (9464238), a road cresting into the sky (10207902), a lone red barrier across a rural lane (14201027), a
  vintage chrome microphone (7715783), a running-down hourglass in B&W (7215816), empty weathered wooden shelves
  (21369951), a single rustic loaf of bread (27418970), a road sealed off by a line of barriers (36333973), a
  foggy landscape with a tiny distant figure (33959686), an open palm / "stop" (6920650), an empty formal
  conference room (260689), a two-hand handshake close-up (9488837), an hourglass with running sand (15872365), an
  open road to an overcast horizon (32340333), a lone wooden observation tower in fog (36132996), top-down
  fracturing cracked earth (23331430), stepping stones across a shallow stream (32286784), and two blank paper
  speech bubbles (8015684). Seven finer beat-splits added for the 46-beat cut use: a tight knot in braided rope
  (11833498), a hand with a pen over a blank notebook (5357492), a bare rutted dirt track into fog (701447), a
  single warm-lit window in a dark building at dusk (30059049), two reel-to-reel tape spools in B&W (6764882), a
  dim narrow empty passage into darkness (13583306), and a brooding overcast storm sky over open water (1154510).
  No generated graphics this reel. **Brand-safety (screened hard at source and from the
  FINAL render — the strictest pass in the set given the active-war subject):** FACE-FREE (hands / silhouettes /
  distant tiny figures / objects / nature only), and — despite citing the Financial Times and naming
  Russia/Ukraine/Crimea/Zelenskyy — free of any national FLAG, any MILITARY (uniforms, weapons, vehicles, guard
  towers — the lone tower is a rustic civilian hunting hide), any Financial Times logo/masthead, readable Cyrillic
  or any readable foreign text, identifiable landmarks, map country labels, brand logos/wordmarks/licence plates,
  and identifiable currency. The three sourcing agents rejected a pile under View-QA: a Queen Elizabeth II photo +
  "SWNS" newspaper wordmark and readable WWII article text (cr15), a VW logo + licence plate and plate-reader
  screen text on boom gates (cr22), AKG/Neumann/Shure/"maono" wordmarks on microphones (cr23), "real" store logos +
  German text + shoppers' faces on supermarket shelves (cr25), a readable "65%" + app icons on the phone screen
  (cr09), a padlock brand, a warship-superstructure candidate, an Apple iPad UI, and Portuguese/Bengali text on
  other slots. **UNVERIFIED / HIGHLY SENSITIVE — an active-conflict news story citing a real outlet (Financial
  Times) and specific claims (a local Oleshky ceasefire, ~2,000 civilians trapped, a US-backed mine-clearing/bus
  evacuation deal, Zelenskyy's Crimea/Russia-routing warning, Abu Dhabi talks); rendered as written but MUST be
  fact-checked against primary sources before publishing, and the situation can change fast.** Two daytime beats
  (cr19 barrier, cr22 lane) are brighter than the rest of the near-black reel; darker swap candidates exist, and
  the evacuation-route / roadblock imagery recurs by design (it IS "the corridor"). Editorial framing is the
  client's.

## Export note

`out/storage-unit.mp4` is the full-quality master. For platforms with an upload
cap, transcode a smaller copy, e.g.:

```bash
npx remotion ffmpeg -i out/storage-unit.mp4 -c:v libx264 -crf 21 -preset slow \
  -c:a aac -b:a 160k -movflags +faststart out/storage-unit-web.mp4
```
