import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Img,
  OffthreadVideo,
  staticFile,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from 'remotion';
import {loadFont as loadAnton} from '@remotion/google-fonts/Anton';
import {loadFont as loadRobotoCondensed} from '@remotion/google-fonts/RobotoCondensed';

const {fontFamily: ANTON} = loadAnton();
const {fontFamily: ROBOTO_CONDENSED} = loadRobotoCondensed();

const HEAD = ANTON;
const BODY = `'Helvetica Now Display Condensed','Helvetica Now Display','${ROBOTO_CONDENSED}','Arial Narrow',sans-serif`;

// ---------------------------------------------------------------------------
export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

const HAS_VOICEOVER = true;

const C = {
  bg: '#0A0A0A',
  ink: '#F4F4F4',
  sub: '#9A9A9A',
  muted: '#585858',
  red: '#FF2E2E',
  track: '#1B1B1B',
  line: 'rgba(255,255,255,0.05)',
};

const SH = '1px 2px 5px rgba(0,0,0,0.55), 2px 4px 16px rgba(0,0,0,0.34)';

// ---------------------------------------------------------------------------
type MediaCfg = {
  src: string;
  type: 'img' | 'video';
  from?: number;
  effect?: 'in' | 'out' | 'panL' | 'panR';
  scrim?: number;
};
type StatCfg = {
  pre?: string;
  prefix?: string;
  value: number;
  decimals?: number;
  suffix?: string;
  post?: string;
  bar?: number;
};
type SceneDef = {
  dur: number;
  kind: 'hook' | 'lines' | 'text' | 'stat' | 'impact' | 'outro';
  text?: string;
  kicker?: string;
  highlights?: string[];
  reveal?: number[];
  size?: number;
  stat?: StatCfg;
  redBg?: boolean;
  media?: MediaCfg;
  enter?: 'slideL' | 'slideR' | 'slideUp' | 'zoom';
};

// ---------------------------------------------------------------------------
// "The listing" reel (ListingReel) — fast NEWS reel, Hard Ledger house format.
// TOPIC: the SpaceX IPO — "the biggest IPO of the century" already underwater, and the segment (Rockets /
// Starlink / xAI) that really drives the valuation. A/B TWIN of SpacexReel ("The belief", the ~$28.5T TAM
// angle); this is the post-IPO valuation / xAI-is-the-real-bet angle.
// Thesis: the stock is down ~8% from day one (up ~10% from the IPO price), trading at ~68x sales, revenue
// +92% in a quarter, worth nearly ~$2 TRILLION while still losing money. The three pieces: Rockets (sales
// +29%, LOSS ~$542M), Starlink (sales +66%, PROFIT ~$1.7B — the only profitable unit), xAI (sales +247%,
// LOSS ~$1.3B — the fastest-growing part is the biggest hole). The valuation isn't priced on rockets or
// satellites, it's priced on the AI unit: Alphabet reportedly pays it ~$920M/mo and Anthropic ~$1.25B/mo
// for data centres. The maths: for $5,000 to become $13,850 by 2030, SpaceX must grow ~50%/yr for five
// years and still lose half its multiple. Wall Street median target ~$217 vs a ~$148 stock — the gap is a
// bet on xAI, not on space. Binary close ("Is this the next Nvidia, or the most expensive internet provider
// ever listed? Pick a side below."). QUESTION/STORY/ANSWER/CTA with NO post-hook pause (claim flows straight
// into the personal beat) and a mid-reel like+follow ask.
// 38 beats: 36 media (incl. 10 number cards — DAY ONE -8% / IPO +10%; 68x sales; +92%; $2T; ROCKETS +29% /
// -$542M; STARLINK +66% / +$1.7B; xAI +247% / -$1.3B; ALPHABET $920M/MO / ANTHROPIC $1.25B/MO; $5,000 ->
// $13,850 / 50%/YR; TARGET $217 / STOCK $148) / 1 red impact ("...ever listed?") / 1 black ("Nobody actually
// knows."). Captions match the VO verbatim (except the number cards; spoken figures as numerals).
// Durations/reveals/SFX locked to the VO via a scribe_v1 word-timestamp anchor pass
// (public/listing/voiceover.mp3, NO inserted pause); music mixed at 0.17.
// NB: OWN distinct footage under public/listing/, NO reuse of any other reel's clips (incl. SpacexReel).
// FOOTAGE is BRAND-FREE, FACE-FREE, FLAG-FREE — generic finance / space / AI b-roll: a trading floor, charts,
// money, a generic rocket + exhaust, a satellite/dish, abstract AI/circuit glow, server halls, a chalkboard,
// a crossroads. **NO SpaceX / Starlink / xAI / Tesla / X / Google / Alphabet / Anthropic / OpenAI / Nvidia /
// NASA logos, wordmarks or identifiable products; NO Elon Musk or any identifiable face; NO readable stock
// tickers or company names; NO flags, foreign text, banknote portraits, military/propaganda.**
// **UNVERIFIED / ELEVATED RISK — names real companies (SpaceX, Starlink, xAI, Alphabet, Anthropic, Nvidia)
// and asserts specific, contested financials about a private company's IPO; render as written but FACT-CHECK
// against primary sources before publishing:** the ~8%/~10% price moves; ~68x sales; +92% quarterly revenue;
// ~$2T valuation; the Rockets/Starlink/xAI sales-growth and profit/loss figures; the ~$920M/mo (Alphabet) and
// ~$1.25B/mo (Anthropic) data-centre payments; the $5,000->$13,850 / 50%/yr maths; and the ~$217 target vs
// ~$148 price. The "next Nvidia vs most expensive internet provider" close is editorial analysis.
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK a (no post-hook pause)
  {dur: 150, kind: 'hook', reveal: [3, 44], text: 'The biggest IPO|of the century', kicker: 'The listing', highlights: [], size: 40, media: {src: 'listing/ls00_floor.mp4', type: 'video', effect: 'in'}},
  // 1 HOOK b
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'is already|underwater.', highlights: ['underwater.'], size: 46, media: {src: 'listing/ls01_sink.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 110, kind: 'text', reveal: [2, 40], text: 'And the part making it|look valuable', highlights: [], size: 36, media: {src: 'listing/ls02_shine.jpg', type: 'img', effect: 'panL'}},
  // 3
  {dur: 100, kind: 'text', reveal: [2, 40], text: 'is the part losing|the most money.', highlights: ['losing'], size: 36, media: {src: 'listing/ls03_burn.jpg', type: 'img', effect: 'in'}},
  // 4 CARD personal (day one vs IPO)
  {dur: 150, kind: 'lines', reveal: [0, 22], text: 'DAY ONE: -8%|IPO PRICE: +10%', highlights: ['-8%'], media: {src: 'listing/ls04_portfolio.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 120, kind: 'text', reveal: [2, 40], text: 'Either way, you’re wondering|what you actually own.', highlights: ['own.'], size: 34, media: {src: 'listing/ls05_box.jpg', type: 'img', effect: 'panR'}},
  // 6
  {dur: 100, kind: 'text', reveal: [2, 40], text: 'I’ll show you exactly|what’s inside this company.', highlights: [], size: 36, media: {src: 'listing/ls06_cutaway.jpg', type: 'img', effect: 'in'}},
  // 7 ask
  {dur: 110, kind: 'text', reveal: [2, 40], text: 'But first, like the video|and make sure to follow.', highlights: ['follow.'], size: 36, media: {src: 'listing/ls07_phone.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 100, kind: 'text', reveal: [2, 40], text: 'Now, a hyped IPO going flat|is nothing new.', highlights: ['flat'], size: 36, media: {src: 'listing/ls08_flat.jpg', type: 'img', effect: 'panL'}},
  // 9
  {dur: 55, kind: 'text', reveal: [2, 28], enter: 'slideL', text: 'But this one|is different.', highlights: ['different.'], size: 48, media: {src: 'listing/ls09_breakout.jpg', type: 'img', effect: 'in'}},
  // 10 STAT 68x
  {dur: 95, kind: 'stat', stat: {pre: 'TRADING AT', value: 68, suffix: '×', post: 'SALES'}, media: {src: 'listing/ls10_magnifier.jpg', type: 'img', effect: 'in'}},
  // 11 STAT +92%
  {dur: 90, kind: 'stat', stat: {pre: 'REVENUE GREW', prefix: '+', value: 92, suffix: '%', post: 'IN ONE QUARTER'}, media: {src: 'listing/ls11_rising.jpg', type: 'img', effect: 'in'}},
  // 12 STAT $2T
  {dur: 95, kind: 'stat', stat: {pre: 'WORTH NEARLY', prefix: '$', value: 2, suffix: 'T'}, media: {src: 'listing/ls12_moneypile.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 100, kind: 'text', reveal: [2, 40], text: 'on a business that is|still losing money.', highlights: ['losing'], size: 36, media: {src: 'listing/ls13_leak.jpg', type: 'img', effect: 'panR'}},
  // 14
  {dur: 55, kind: 'text', reveal: [2, 28], enter: 'slideUp', text: 'Look at|the three pieces.', highlights: ['three'], size: 46, media: {src: 'listing/ls14_pieces.jpg', type: 'img', effect: 'in'}},
  // 15 CARD Rockets
  {dur: 150, kind: 'lines', reveal: [0, 18, 36], text: 'ROCKETS|SALES +29%|LOSS $542M', highlights: ['$542m'], media: {src: 'listing/ls15_rocket.jpg', type: 'img', effect: 'in'}},
  // 16 CARD Starlink
  {dur: 140, kind: 'lines', reveal: [0, 18, 36], text: 'STARLINK|SALES +66%|PROFIT $1.7B', highlights: ['$1.7b'], media: {src: 'listing/ls16_satellite.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'The only one|that makes money.', highlights: ['money.'], size: 42, media: {src: 'listing/ls17_sprout.jpg', type: 'img', effect: 'panL'}},
  // 18 CARD xAI
  {dur: 150, kind: 'lines', reveal: [0, 18, 36], text: 'xAI|SALES +247%|LOSS $1.3B', highlights: ['$1.3b'], media: {src: 'listing/ls18_ai.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 110, kind: 'text', reveal: [2, 40], text: 'The fastest-growing part|is the biggest hole.', highlights: ['hole.'], size: 34, media: {src: 'listing/ls19_hole.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'And the problem|doesn’t stop there.', highlights: ['problem'], size: 44, media: {src: 'listing/ls20_warning.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 100, kind: 'text', reveal: [2, 40], text: 'The valuation isn’t priced|on rockets or satellites.', highlights: [], size: 34, media: {src: 'listing/ls21_crossed.jpg', type: 'img', effect: 'panL'}},
  // 22
  {dur: 60, kind: 'text', reveal: [2, 28], enter: 'slideR', text: 'It’s priced|on the AI unit.', highlights: ['AI'], size: 44, media: {src: 'listing/ls22_chip.jpg', type: 'img', effect: 'in'}},
  // 23 CARD AI payments
  {dur: 150, kind: 'lines', reveal: [0, 22], text: 'ALPHABET: $920M/MO|ANTHROPIC: $1.25B/MO', highlights: ['$1.25b/mo'], media: {src: 'listing/ls23_datacentre.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 100, kind: 'text', reveal: [2, 40], text: 'That’s the story|the market is buying.', highlights: ['buying.'], size: 38, media: {src: 'listing/ls24_screen.jpg', type: 'img', effect: 'panR'}},
  // 25
  {dur: 120, kind: 'text', reveal: [2, 40], text: 'Normally you’d expect the numbers|to catch up to the hype.', highlights: ['hype.'], size: 32, media: {src: 'listing/ls25_scale.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 55, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'But run|the maths.', highlights: ['maths.'], size: 48, media: {src: 'listing/ls26_chalk.jpg', type: 'img', effect: 'in'}},
  // 27 CARD maths
  {dur: 160, kind: 'lines', reveal: [0, 18, 36], text: '$5,000 → $13,850|BY 2030|50%/YR FOR 5 YEARS', highlights: ['$13,850'], media: {src: 'listing/ls27_timeline.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 90, kind: 'text', reveal: [2, 40], text: 'And still lose|half its multiple.', highlights: ['half'], size: 42, media: {src: 'listing/ls28_half.jpg', type: 'img', effect: 'panL'}},
  // 29
  {dur: 100, kind: 'text', reveal: [2, 40], text: 'Does AI spending|hold for five years?', highlights: ['AI'], size: 38, media: {src: 'listing/ls29_spend.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 100, kind: 'text', reveal: [2, 40], text: 'Does the rocket business|ever turn a profit?', highlights: ['profit?'], size: 34, media: {src: 'listing/ls30_rocketledger.jpg', type: 'img', effect: 'in'}},
  // 31 BLACK
  {dur: 85, kind: 'impact', text: 'Nobody|actually knows.'},
  // 32 CARD target/stock
  {dur: 150, kind: 'lines', reveal: [0, 22], text: 'WALL ST TARGET: $217|THE STOCK: $148', highlights: ['$148'], media: {src: 'listing/ls32_gap.jpg', type: 'img', effect: 'in'}},
  // 33
  {dur: 110, kind: 'text', reveal: [2, 40], text: 'The gap is a bet on xAI,|not on space.', highlights: ['xAI,'], size: 34, media: {src: 'listing/ls33_bet.jpg', type: 'img', effect: 'panR'}},
  // 34
  {dur: 50, kind: 'text', reveal: [2], text: 'So you tell me.', highlights: ['you'], size: 50, media: {src: 'listing/ls34_point.jpg', type: 'img', effect: 'in'}},
  // 35
  {dur: 90, kind: 'text', reveal: [2, 28], text: 'Is this|the next Nvidia,', highlights: ['Nvidia,'], size: 44, media: {src: 'listing/ls35_gpu.jpg', type: 'img', effect: 'in'}},
  // 36 RED impact
  {dur: 120, kind: 'impact', redBg: true, text: 'or the most expensive|internet provider|ever listed?'},
  // 37 CTA
  {dur: 70, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Pick a side|below.', highlights: ['side'], size: 48, media: {src: 'listing/ls37_fork.mp4', type: 'video', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
];

const STARTS: number[] = (() => {
  const arr: number[] = [];
  let acc = 0;
  for (const s of SCENES) {
    arr.push(acc);
    acc += s.dur;
  }
  return arr;
})();
export const DURATION_IN_FRAMES = STARTS[STARTS.length - 1] + SCENES[SCENES.length - 1].dur;

const easeInOut = Easing.bezier(0.22, 1, 0.36, 1);
const useLocal = () => useCurrentFrame();

const enterTransform = (frame: number, enter?: string) => {
  if (!enter) return {tx: 0, ty: 0, sc: 1, op: 1};
  const t = interpolate(frame, [0, 9], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeInOut});
  let tx = 0;
  let ty = 0;
  let sc = 1;
  if (enter === 'slideL') tx = (1 - t) * 100;
  if (enter === 'slideR') tx = -(1 - t) * 100;
  if (enter === 'slideUp') ty = (1 - t) * 100;
  if (enter === 'zoom') sc = 1 + (1 - t) * 0.5;
  const op = interpolate(frame, [0, 6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return {tx, ty, sc, op};
};

// ---------------------------------------------------------------------------
const MediaBackground: React.FC<{cfg: MediaCfg; enter?: string}> = ({cfg, enter}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const p = interpolate(frame, [0, durationInFrames], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const isImg = cfg.type === 'img';
  const range = isImg ? 0.26 : 0.15;
  const effect = cfg.effect ?? 'in';
  const scale = effect === 'out' ? interpolate(p, [0, 1], [1 + range, 1]) : interpolate(p, [0, 1], [1, 1 + range]);
  let tx = 0;
  if (effect === 'panL') tx = interpolate(p, [0, 1], [3.5, -3.5]);
  if (effect === 'panR') tx = interpolate(p, [0, 1], [-3.5, 3.5]);
  const e = enterTransform(frame, enter);
  const opacity = interpolate(frame, [0, 5, durationInFrames - 5, durationInFrames], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) * e.op;
  const src = staticFile(cfg.src);
  const mediaStyle: React.CSSProperties = {width: '100%', height: '100%', objectFit: 'cover'};
  return (
    <AbsoluteFill style={{opacity}}>
      <AbsoluteFill style={{transform: `scale(${scale * e.sc}) translate(${tx + e.tx}%, ${e.ty}%)`, transformOrigin: 'center'}}>
        {isImg ? <Img src={src} style={mediaStyle} /> : <OffthreadVideo src={src} startFrom={cfg.from ?? 0} muted style={mediaStyle} />}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Grain: React.FC = () => {
  const frame = useCurrentFrame();
  const shift = (frame * 7) % 200;
  return (
    <AbsoluteFill style={{opacity: 0.045, mixBlendMode: 'overlay', backgroundImage: 'radial-gradient(rgba(255,255,255,0.9) 0.5px, transparent 0.6px)', backgroundSize: '3px 3px', backgroundPosition: `${shift}px ${shift}px`, pointerEvents: 'none'}} />
  );
};

const Treatment: React.FC = () => (
  <AbsoluteFill style={{pointerEvents: 'none'}}>
    <AbsoluteFill style={{backgroundImage: `linear-gradient(${C.line} 1px, transparent 1px), linear-gradient(90deg, ${C.line} 1px, transparent 1px)`, backgroundSize: '90px 90px', maskImage: 'radial-gradient(85% 65% at 50% 45%, black 20%, transparent 100%)', opacity: 0.6}} />
    <Grain />
  </AbsoluteFill>
);

// ---------------------------------------------------------------------------
const Caption: React.FC<{text: string; highlights?: string[]; size?: number; align?: 'center' | 'flex-start'; typewriter?: boolean; lineSync?: boolean; lineReveal?: number[]}> = ({text, highlights = [], size = 112, align = 'center', typewriter = false, lineSync = false, lineReveal}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const lines = text.split('|');
  const hset = highlights.map((h) => h.toLowerCase());
  const isHi = (w: string) => hset.includes(w.replace(/[.,—…-]/g, '').toLowerCase()) || hset.includes(w.toLowerCase());
  const lineOp: number[] = (() => {
    if (typewriter) return lines.map(() => 1);
    if (lineReveal && lineReveal.length === lines.length) {
      return lineReveal.map((rf) => interpolate(frame, [rf, rf + 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
    }
    if (!lineSync || lines.length < 2) return lines.map(() => 1);
    const lens = lines.map((l) => Math.max(1, l.length));
    const total = lens.reduce((a, b) => a + b, 0);
    let cum = 0;
    return lines.map((l, i) => {
      const start = (cum / total) * durationInFrames;
      cum += lens[i];
      return i === 0 ? 1 : interpolate(frame, [start - 2, start + 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
    });
  })();
  let wordIndex = 0;
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 2, alignItems: align, width: '100%'}}>
      {lines.map((line, li) => (
        <div key={li} style={{display: 'flex', flexWrap: 'wrap', justifyContent: align === 'center' ? 'center' : 'flex-start', gap: '0 18px', opacity: lineOp[li]}}>
          {line.split(' ').map((word, wi) => {
            const gi = wordIndex++;
            const op = typewriter ? interpolate(frame, [3 + gi * 2, 6 + gi * 2], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) : 1;
            const hi = isHi(word);
            return (
              <span key={wi} style={{display: 'inline-block', fontFamily: HEAD, fontSize: size, lineHeight: 0.98, letterSpacing: 0.5, textTransform: 'uppercase', color: hi ? C.red : C.ink, opacity: op, textShadow: SH}}>
                {word}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};

const Kicker: React.FC<{children: React.ReactNode; delay?: number}> = ({children, delay = 4}) => {
  const frame = useLocal();
  const {fps} = useVideoConfig();
  const p = spring({frame: frame - delay, fps, config: {damping: 200}});
  return (
    <div style={{fontFamily: BODY, fontWeight: 700, fontSize: 26, letterSpacing: 7, textTransform: 'uppercase', color: C.ink, opacity: p, transform: `translateY(${interpolate(p, [0, 1], [-12, 0])}px)`}}>
      {children}
    </div>
  );
};

// ---------------------------------------------------------------------------
const SceneHook: React.FC<{text: string; kicker?: string; highlights?: string[]; size?: number; reveal?: number[]}> = ({text, kicker, highlights, size = 92, reveal}) => (
  <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', padding: 84}}>
    {kicker ? <div style={{marginBottom: 44}}><Kicker>{kicker}</Kicker></div> : null}
    <Caption text={text} highlights={highlights} size={size} typewriter={false} lineReveal={reveal} />
  </AbsoluteFill>
);

const SceneText: React.FC<{text: string; highlights?: string[]; size?: number; reveal?: number[]}> = ({text, highlights, size = 100, reveal}) => (
  <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', padding: 84}}>
    <Caption text={text} highlights={highlights} size={size} typewriter={false} lineSync lineReveal={reveal} />
  </AbsoluteFill>
);

const SceneLines: React.FC<{text: string; highlights?: string[]; reveal?: number[]; mode?: string}> = ({text, highlights = [], reveal, mode}) => {
  const frame = useLocal();
  const lines = text.split('|');
  const hset = highlights.map((h) => h.toLowerCase());
  const useReveal = reveal && reveal.length === lines.length;
  const typewriter = mode === 'type' && !useReveal;
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'flex-start', padding: '0 96px'}}>
      <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
        {lines.map((l, i) => {
          const op = useReveal
            ? interpolate(frame, [reveal![i], reveal![i] + 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
            : typewriter
            ? interpolate(frame, [3 + i * 8, 9 + i * 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
            : 1;
          return (
            <div key={i} style={{opacity: op, fontFamily: HEAD, fontSize: 92, lineHeight: 0.98, letterSpacing: 0.5, textTransform: 'uppercase'}}>
              {l.split(' ').map((w, wi) => {
                const cw = w.replace(/[.,—…-]/g, '').toLowerCase();
                const hi = hset.includes(cw) || hset.includes(w.toLowerCase());
                return (
                  <span key={wi} style={{color: hi ? C.red : C.ink, textShadow: SH}}>
                    {w}
                    {wi < l.split(' ').length - 1 ? ' ' : ''}
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const SceneStat: React.FC<{stat: StatCfg}> = ({stat}) => {
  const frame = useLocal();
  const t = interpolate(frame, [4, 38], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeInOut});
  const shown = stat.value * t;
  const num = stat.decimals ? shown.toFixed(stat.decimals) : Math.round(shown).toLocaleString('en-US');
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', padding: 80}}>
      <div style={{textAlign: 'center'}}>
        {stat.pre ? <div style={{fontFamily: BODY, fontWeight: 700, fontSize: 30, letterSpacing: 6, color: C.ink, textTransform: 'uppercase', marginBottom: 8}}>{stat.pre}</div> : null}
        <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'center'}}>
          {stat.prefix ? <span style={{fontFamily: HEAD, fontSize: 120, color: C.red, lineHeight: 1}}>{stat.prefix}</span> : null}
          <span style={{fontFamily: HEAD, fontSize: 150, color: C.red, lineHeight: 0.9, letterSpacing: 2, textShadow: SH}}>{num}</span>
          {stat.suffix ? <span style={{fontFamily: HEAD, fontSize: 120, color: C.red, lineHeight: 1}}>{stat.suffix}</span> : null}
        </div>
        {stat.post ? <div style={{fontFamily: BODY, fontWeight: 600, fontSize: 46, color: C.ink, marginTop: 6, textTransform: 'uppercase', letterSpacing: 1}}>{stat.post}</div> : null}
      </div>
    </AbsoluteFill>
  );
};

const SceneImpact: React.FC<{text: string; redBg?: boolean}> = ({text, redBg}) => {
  const lines = text.split('|');
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', background: redBg ? 'radial-gradient(125% 90% at 50% 42%, #FF2E2E 0%, #E31E1E 62%, #C21414 100%)' : undefined}}>
      <div style={{position: 'relative', zIndex: 1, textAlign: 'center', fontFamily: HEAD, fontSize: 140, lineHeight: 0.92, letterSpacing: 1, textTransform: 'uppercase'}}>
        {lines.map((l, i) => (
          <div key={i} style={{color: redBg ? (i === 0 ? '#0A0A0A' : C.ink) : (i === lines.length - 1 ? C.red : C.ink), textShadow: redBg ? 'none' : SH}}>
            {l}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
const Hud: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = frame / DURATION_IN_FRAMES;
  return (
    <>
      <div style={{position: 'absolute', top: 70, left: 80, display: 'flex', alignItems: 'center', gap: 14}}>
        <div style={{width: 11, height: 11, borderRadius: 11, background: C.sub}} />
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The listing</span>
      </div>
      <div style={{position: 'absolute', bottom: 90, left: 80, right: 80, height: 3, borderRadius: 3, background: 'rgba(255,255,255,0.08)'}}>
        <div style={{height: '100%', width: `${progress * 100}%`, borderRadius: 3, background: C.sub}} />
      </div>
    </>
  );
};

const ANIMS = ['pop', 'slide', 'type', 'blur'];

const TextAnim: React.FC<{mode: string; children: React.ReactNode}> = ({mode, children}) => {
  const frame = useCurrentFrame();
  const {durationInFrames, fps} = useVideoConfig();
  const E = 11;
  const X = 9;
  const ein = interpolate(frame, [0, E], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeInOut});
  const eout = interpolate(frame, [durationInFrames - X, durationInFrames], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeInOut});
  let opacity = 1;
  let ty = 0;
  let sc = 1;
  let blur = 0;
  if (mode === 'pop') {
    const s = spring({frame, fps, config: {damping: 12, mass: 0.7, stiffness: 170}});
    sc = interpolate(s, [0, 1], [0.55, 1]) * interpolate(eout, [0, 1], [1, 1.3]);
    opacity = Math.min(ein * 1.6, 1) * (1 - eout);
  } else if (mode === 'slide') {
    ty = interpolate(ein, [0, 1], [170, 0]) + interpolate(eout, [0, 1], [0, -170]);
    opacity = ein * (1 - eout);
  } else if (mode === 'type') {
    opacity = Math.min(ein * 3, 1) * (1 - Math.min(eout * 2.2, 1));
  } else if (mode === 'blur') {
    blur = interpolate(ein, [0, 1], [28, 0]) + interpolate(eout, [0, 1], [0, 28]);
    sc = interpolate(ein, [0, 1], [1.1, 1]);
    opacity = ein * (1 - eout);
  }
  return (
    <AbsoluteFill style={{opacity, transform: `translateY(${ty}px) scale(${sc})`, filter: blur > 0.1 ? `blur(${blur}px)` : undefined, transformOrigin: 'center'}}>
      {children}
    </AbsoluteFill>
  );
};

const renderScene = (s: SceneDef, mode: string) => {
  switch (s.kind) {
    case 'hook':
      return <SceneHook text={s.text!} kicker={s.kicker} highlights={s.highlights} size={s.size} reveal={s.reveal} />;
    case 'lines':
      return <SceneLines text={s.text!} highlights={s.highlights} reveal={s.reveal} mode={mode} />;
    case 'text':
      return <SceneText text={s.text!} highlights={s.highlights} size={s.size} reveal={s.reveal} />;
    case 'stat':
      return <SceneStat stat={s.stat!} />;
    case 'impact':
      return <SceneImpact text={s.text!} redBg={s.redBg} />;
    default:
      return null;
  }
};

// ---------------------------------------------------------------------------
export const ListingReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('listing/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('listing/music.mp3')}
        volume={(f) => interpolate(f, [0, 20, DURATION_IN_FRAMES - 55, DURATION_IN_FRAMES], [0, 0.17, 0.17, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}
      />
      {SFX.map((s, i) => (
        <Sequence key={`sfx${i}`} from={s.at} durationInFrames={60} name={`sfx-${i}`}>
          <Audio src={staticFile(s.src)} volume={s.vol} />
        </Sequence>
      ))}
      <AbsoluteFill style={{opacity: globalOpacity}}>
        {SCENES.map((s, i) =>
          s.media ? (
            <Sequence key={`m${i}`} from={STARTS[i]} durationInFrames={s.dur} name={`bg-${i}-${s.kind}`}>
              <MediaBackground cfg={s.media} enter={s.enter} />
            </Sequence>
          ) : null,
        )}
        <Treatment />
        {SCENES.map((s, i) => {
          const TLEAD = 3;
          const tf = Math.max(0, STARTS[i] - TLEAD);
          const mode = ANIMS[i % ANIMS.length];
          return (
            <Sequence key={i} from={tf} durationInFrames={STARTS[i] + s.dur - tf} name={`${i}-${s.kind}-${mode}`}>
              <TextAnim mode={mode}>{renderScene(s, mode)}</TextAnim>
            </Sequence>
          );
        })}
        <Hud />
        <LogoWatermark />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const LogoWatermark: React.FC = () => (
  <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', pointerEvents: 'none'}}>
    <Img
      src={staticFile('media/logo.png')}
      style={{width: 330, height: 'auto', opacity: 0.45, marginBottom: 130, borderRadius: 0}}
    />
  </AbsoluteFill>
);
