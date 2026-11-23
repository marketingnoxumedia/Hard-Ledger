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
  pos?: 'center' | 'upper' | 'lower' | 'left' | 'right' | 'upperLeft' | 'upperRight' | 'lowerLeft' | 'lowerRight';
};

// ---------------------------------------------------------------------------
// "The bounce" reel (BounceReel) -- fast CRYPTO / MARKETS breaking-news reel, Hard Ledger house VISUAL format.
// TOPIC: BITCOIN rebounds back above $61,000 after a weekend LIQUIDATION-DRIVEN SELLOFF dragged it to a ~14-month low.
// CONTEXT: forced selling wiped out ~$1.8B in leveraged crypto bets in 24h (~$1.3B of them longs); BTC fell to ~$55,326
// (lowest since Sept 2024) then recovered >9% back above $61,000. EVIDENCE: it is a broad risk-off move, not just crypto --
// the Nasdaq fell >5% on Friday, the dollar is near a 19-month high, and US spot-BTC ETFs saw ~$1.8B of weekly outflows.
// ESCALATION/CONSEQUENCES: the real pressure is rising interest rates -- a non-yielding asset looks less attractive when
// safe returns rise, and the market sees a possible Fed hike next month. CONTROVERSY/pivot: the pressure hasn't eased.
// DEBATE close: is the bounce the real bottom, a pause before the next drop, a buying opportunity or a deeper crypto winter?
// NOTE ON VOICE: written in the influencer "curiosity-gap" format (NOT the faceless house voice) to match the client's
// reel series -- EARLY "follow for more" CTA, CLOSES on a "let me know in the comments" debate CTA.
// Distinct from MeltdownReel ("The crypto meltdown", the Binance-BREACH-driven crash to ~$76,400) -- this is a MACRO-driven
// selloff + REBOUND story (Fed/dollar/ETF headwinds, $55,326 low, >9% bounce). Flagged as a near-dup before building; the
// client chose a new standalone reel. Own footage under public/bounce/.
// Per the saved house preference, captions are <=5-6 words/beat with LARGER on-screen type (Anton 42-52). 33 beats. 4
// stat cards: FELL TO $55,326, BOUNCED +9% $61,000, LIQUIDATED $1.8B, ETF OUTFLOWS $1.8B. 1 red impact at the pivot
// ("The pressure / hasn't eased."), no black beat. Debate question lands over footage; the comments CTA is the close.
// FOOTAGE -- TOPICAL but STRICTLY BRAND-FREE, because the reel names Bitcoin / the Nasdaq / the Fed / ETFs, so NONE appear:
// NO Bitcoin / Binance / Coinbase / exchange logo, coin wordmark or branded coin; NO TradingView / exchange / terminal
// screens; NO readable ticker / brand / plate / headline text; NO real face; NO national flags. Generic royalty-free
// material: abstract red falling particles / down-charts / plunging candlesticks, a plain downward arrow, a calendar, a
// blank-screen phone, a trading-desk-from-behind, dominoes / cracked glass, a vault / safe wheel, stacks of cash & coins
// (unbranded, blank), the US dollar / a dollar-strength motif, a bull/bear abstract, a rate / percent motif, a snow/winter
// scene for "crypto winter", a comments / phone motif for the close. Mix of short videos + photos. OWN footage under
// public/bounce/, NO reuse -- ledger-checked (incl. vs MeltdownReel / HavenReel / TokenReel).
// **UNVERIFIED -- every figure (the $55,326 low, the >9% rebound, $61,000, the ~$1.8B of liquidations, the ~$1.8B of weekly
// ETF outflows, the Nasdaq's >5% Friday drop, the 19-month-high dollar, the possible Fed hike) is taken from a SINGLE
// Investing.com / Yahoo Finance article dated Nov 23, 2026 -- AFTER the Jan 2026 knowledge cutoff. Rendered as supplied.
// Crypto prices and market levels move fast and go stale quickly; every figure MUST be re-checked against primary
// reporting before publishing. General markets news, NOT investment advice; the closing line is the client's engagement
// prompt.**
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 76, kind: 'hook', reveal: [3, 40], text: 'Bitcoin just suffered|one of its worst', kicker: 'The bounce', highlights: ['worst'], size: 48, media: {src: 'bounce/bn00_crash.mp4', type: 'video', effect: 'in'}},
  // 1
  {dur: 110, kind: 'text', reveal: [2, 28], text: 'weekend drops, crashing|close to $55,000.', highlights: ['$55,000.'], size: 44, pos: 'upperRight', media: {src: 'bounce/bn01_candlestick.mp4', type: 'video', effect: 'in'}},
  // 2 CARD
  {dur: 135, kind: 'stat', stat: {pre: 'BACK ABOVE', prefix: '$', value: 61000}, media: {src: 'bounce/bn02_rebound.mp4', type: 'video', effect: 'in'}},
  // 3
  {dur: 44, kind: 'text', reveal: [2, 28], text: 'But don’t mistake|this rebound', highlights: ['rebound'], size: 48, pos: 'left', media: {src: 'bounce/bn03_doubt.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 55, kind: 'text', reveal: [2, 28], text: 'for a recovery|just yet.', highlights: ['recovery'], size: 48, pos: 'lowerRight', media: {src: 'bounce/bn04_caution.mp4', type: 'video', effect: 'in'}},
  // 5
  {dur: 54, kind: 'text', reveal: [2, 28], text: 'Billions of dollars|have already been', highlights: ['Billions'], size: 44, pos: 'upperLeft', media: {src: 'bounce/bn05_billions.mp4', type: 'video', effect: 'in'}},
  // 6
  {dur: 26, kind: 'text', reveal: [2], text: 'wiped out,', highlights: ['wiped'], size: 52, pos: 'right', media: {src: 'bounce/bn06_gone.mp4', type: 'video', effect: 'in'}},
  // 7
  {dur: 54, kind: 'text', reveal: [2, 28], text: 'and investors|are still nervous.', highlights: ['nervous.'], size: 48, pos: 'lower', media: {src: 'bounce/bn07_nervous.jpg', type: 'img', effect: 'in'}},
  // 8 FOLLOW
  {dur: 39, kind: 'text', reveal: [2], text: 'Follow for more updates', highlights: ['Follow'], size: 50, pos: 'lowerLeft', media: {src: 'bounce/bn08_follow.mp4', type: 'video', effect: 'in'}},
  // 9
  {dur: 59, kind: 'text', reveal: [2, 28], text: 'on the biggest moves|in cryptocurrency', highlights: ['cryptocurrency'], size: 44, pos: 'upperRight', media: {src: 'bounce/bn09_moves.mp4', type: 'video', effect: 'in'}},
  // 10
  {dur: 37, kind: 'text', reveal: [2], text: 'and financial markets.', highlights: ['markets.'], size: 52, pos: 'left', media: {src: 'bounce/bn10_markets.mp4', type: 'video', effect: 'in'}},
  // 11
  {dur: 58, kind: 'text', reveal: [2, 28], text: 'Bitcoin plunged|on Saturday', highlights: ['plunged'], size: 50, pos: 'right', media: {src: 'bounce/bn11_plunge.mp4', type: 'video', effect: 'in'}},
  // 12 CARD
  {dur: 109, kind: 'stat', stat: {pre: 'PLUNGED TO', prefix: '$', value: 55326}, media: {src: 'bounce/bn12_low.mp4', type: 'video', effect: 'in'}},
  // 13
  {dur: 95, kind: 'text', reveal: [2, 28], text: 'its weakest level|since September 2024,', highlights: ['weakest'], size: 44, pos: 'upperLeft', media: {src: 'bounce/bn13_calendar.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 74, kind: 'text', reveal: [2, 28], text: 'before recovering|more than 9%.', highlights: ['9%.'], size: 48, pos: 'lowerRight', media: {src: 'bounce/bn14_recover.mp4', type: 'video', effect: 'in'}},
  // 15
  {dur: 50, kind: 'text', reveal: [2], text: 'According to CoinGlass data', highlights: ['CoinGlass'], size: 50, pos: 'upper', media: {src: 'bounce/bn15_data.mp4', type: 'video', effect: 'in'}},
  // 16
  {dur: 64, kind: 'text', reveal: [2], text: 'cited by Investing.com,', highlights: ['Investing.com,'], size: 52, pos: 'left', media: {src: 'bounce/bn16_source.jpg', type: 'img', effect: 'in'}},
  // 17 CARD
  {dur: 69, kind: 'stat', stat: {pre: 'LIQUIDATED', prefix: '$', value: 1.8, decimals: 1, suffix: 'B'}, media: {src: 'bounce/bn17_liquidated.mp4', type: 'video', effect: 'in'}},
  // 18
  {dur: 53, kind: 'text', reveal: [2, 28], text: 'in leveraged|crypto positions', highlights: ['leveraged'], size: 50, pos: 'right', media: {src: 'bounce/bn18_leverage.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 88, kind: 'text', reveal: [2, 28], text: 'were liquidated|in just 24 hours.', highlights: ['liquidated'], size: 44, pos: 'lowerLeft', media: {src: 'bounce/bn19_clock.mp4', type: 'video', effect: 'in'}},
  // 20
  {dur: 59, kind: 'text', reveal: [2], text: 'About $1.3 billion', highlights: ['$1.3'], size: 52, pos: 'upperRight', media: {src: 'bounce/bn20_longs.mp4', type: 'video', effect: 'in'}},
  // 21
  {dur: 87, kind: 'text', reveal: [2, 28], text: 'came from traders|betting Bitcoin would rise.', highlights: ['betting'], size: 44, pos: 'left', media: {src: 'bounce/bn21_bull.mp4', type: 'video', effect: 'in'}},
  // 22
  {dur: 37, kind: 'text', reveal: [2, 28], text: 'The pressure isn’t|coming', highlights: ['pressure'], size: 50, pos: 'lowerRight', media: {src: 'bounce/bn22_pressure.mp4', type: 'video', effect: 'in'}},
  // 23
  {dur: 34, kind: 'text', reveal: [2], text: 'from crypto alone.', highlights: ['crypto'], size: 52, pos: 'upperLeft', media: {src: 'bounce/bn23_crypto.mp4', type: 'video', effect: 'in'}},
  // 24
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Technology stocks|have been selling off', highlights: ['selling'], size: 44, pos: 'right', media: {src: 'bounce/bn24_stocks.mp4', type: 'video', effect: 'in'}},
  // 25
  {dur: 91, kind: 'text', reveal: [2, 28], text: 'as investors question|massive AI spending', highlights: ['AI'], size: 44, pos: 'lower', media: {src: 'bounce/bn25_ai.mp4', type: 'video', effect: 'in'}},
  // 26
  {dur: 91, kind: 'text', reveal: [2, 28], text: 'and worry about|stretched valuations.', highlights: ['stretched'], size: 48, pos: 'upperRight', media: {src: 'bounce/bn26_valuations.mp4', type: 'video', effect: 'in'}},
  // 27
  {dur: 61, kind: 'text', reveal: [2, 28], text: 'There’s another|warning sign:', highlights: ['warning'], size: 50, pos: 'lowerLeft', media: {src: 'bounce/bn27_warning.mp4', type: 'video', effect: 'in'}},
  // 28
  {dur: 54, kind: 'text', reveal: [2], text: 'U.S. spot Bitcoin ETFs', highlights: ['ETFs'], size: 50, pos: 'left', media: {src: 'bounce/bn28_etf.mp4', type: 'video', effect: 'in'}},
  // 29 CARD
  {dur: 104, kind: 'stat', stat: {pre: 'ETF OUTFLOWS', prefix: '$', value: 1.8, decimals: 1, suffix: 'B'}, media: {src: 'bounce/bn29_outflow.mp4', type: 'video', effect: 'in'}},
  // 30
  {dur: 72, kind: 'text', reveal: [2, 28], text: 'net outflows|over the past week.', highlights: ['outflows'], size: 44, pos: 'right', media: {src: 'bounce/bn30_drain.mp4', type: 'video', effect: 'in'}},
  // 31
  {dur: 56, kind: 'text', reveal: [2], text: 'That’s a major source', highlights: ['major'], size: 50, pos: 'lowerRight', media: {src: 'bounce/bn31_bigmoney.mp4', type: 'video', effect: 'in'}},
  // 32
  {dur: 62, kind: 'text', reveal: [2], text: 'of institutional demand', highlights: ['institutional'], size: 52, pos: 'upperLeft', media: {src: 'bounce/bn32_institution.mp4', type: 'video', effect: 'in'}},
  // 33 RED
  {dur: 63, kind: 'impact', redBg: true, text: 'moving in the|wrong direction.'},
  // 34
  {dur: 57, kind: 'text', reveal: [2, 28], text: 'And with markets|increasingly expecting', highlights: ['markets'], size: 48, pos: 'right', media: {src: 'bounce/bn33_fed1.mp4', type: 'video', effect: 'in'}},
  // 35
  {dur: 59, kind: 'text', reveal: [2, 28], text: 'a possible|Federal Reserve rate hike', highlights: ['Federal'], size: 44, pos: 'upperRight', media: {src: 'bounce/bn34_fed2.mp4', type: 'video', effect: 'in'}},
  // 36
  {dur: 26, kind: 'text', reveal: [2], text: 'next month,', highlights: ['month,'], size: 52, pos: 'left', media: {src: 'bounce/bn35_month.jpg', type: 'img', effect: 'in'}},
  // 37
  {dur: 42, kind: 'text', reveal: [2], text: 'higher borrowing costs', highlights: ['borrowing'], size: 52, pos: 'lowerLeft', media: {src: 'bounce/bn36_costs.jpg', type: 'img', effect: 'in'}},
  // 38
  {dur: 48, kind: 'text', reveal: [2, 28], text: 'could put even|more pressure', highlights: ['pressure'], size: 48, pos: 'upper', media: {src: 'bounce/bn37_squeeze.mp4', type: 'video', effect: 'in'}},
  // 39
  {dur: 55, kind: 'text', reveal: [2, 28], text: 'on risky assets|like Bitcoin.', highlights: ['risky'], size: 48, pos: 'right', media: {src: 'bounce/bn38_risk.mp4', type: 'video', effect: 'in'}},
  // 40
  {dur: 52, kind: 'text', reveal: [2, 28], text: 'So is Bitcoin|finally finding', highlights: ['finding'], size: 48, pos: 'lowerRight', media: {src: 'bounce/bn39_finding.mp4', type: 'video', effect: 'in'}},
  // 41
  {dur: 26, kind: 'text', reveal: [2], text: 'its bottom,', highlights: ['bottom,'], size: 52, pos: 'upperLeft', media: {src: 'bounce/bn40_floor.mp4', type: 'video', effect: 'in'}},
  // 42
  {dur: 27, kind: 'text', reveal: [2], text: 'or is this just', highlights: ['this'], size: 50, pos: 'left', media: {src: 'bounce/bn41_or.mp4', type: 'video', effect: 'in'}},
  // 43
  {dur: 34, kind: 'text', reveal: [2], text: 'a temporary bounce', highlights: ['bounce'], size: 52, pos: 'lowerRight', media: {src: 'bounce/bn42_bounce2.mp4', type: 'video', effect: 'in'}},
  // 44
  {dur: 45, kind: 'text', reveal: [2], text: 'before another crash?', highlights: ['crash?'], size: 52, pos: 'upperRight', media: {src: 'bounce/bn43_crash2.mp4', type: 'video', effect: 'in'}},
  // 45 CTA
  {dur: 44, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Would you buy|at these levels?', highlights: ['levels?'], size: 46, media: {src: 'bounce/bn44_levels.mp4', type: 'video', effect: 'in'}},
];


type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 186, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 747, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1139, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1933, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 2227, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 2761, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
const Caption: React.FC<{text: string; highlights?: string[]; size?: number; align?: 'center' | 'flex-start' | 'flex-end'; typewriter?: boolean; lineSync?: boolean; lineReveal?: number[]}> = ({text, highlights = [], size = 112, align = 'center', typewriter = false, lineSync = false, lineReveal}) => {
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
        <div key={li} style={{display: 'flex', flexWrap: 'wrap', justifyContent: align === 'center' ? 'center' : align === 'flex-end' ? 'flex-end' : 'flex-start', gap: '0 18px', opacity: lineOp[li]}}>
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

const POS: Record<string, {jc: 'center' | 'flex-start' | 'flex-end'; ai: 'center' | 'flex-start' | 'flex-end'; al: 'center' | 'flex-start' | 'flex-end'; pt: number; pb: number}> = {
  center:     {jc: 'center',     ai: 'center',     al: 'center',     pt: 84,  pb: 84},
  upper:      {jc: 'flex-start', ai: 'center',     al: 'center',     pt: 300, pb: 84},
  lower:      {jc: 'flex-end',   ai: 'center',     al: 'center',     pt: 84,  pb: 360},
  left:       {jc: 'center',     ai: 'flex-start', al: 'flex-start', pt: 84,  pb: 84},
  right:      {jc: 'center',     ai: 'flex-end',   al: 'flex-end',   pt: 84,  pb: 84},
  upperLeft:  {jc: 'flex-start', ai: 'flex-start', al: 'flex-start', pt: 300, pb: 84},
  upperRight: {jc: 'flex-start', ai: 'flex-end',   al: 'flex-end',   pt: 190, pb: 84},
  lowerLeft:  {jc: 'flex-end',   ai: 'flex-start', al: 'flex-start', pt: 84,  pb: 320},
  lowerRight: {jc: 'flex-end',   ai: 'flex-end',   al: 'flex-end',   pt: 84,  pb: 320},
};
const SceneText: React.FC<{text: string; highlights?: string[]; size?: number; reveal?: number[]; pos?: string}> = ({text, highlights, size = 100, reveal, pos = 'center'}) => {
  const p = POS[pos] || POS.center;
  const sidey = pos !== 'center' && pos !== 'upper' && pos !== 'lower';
  return (
    <AbsoluteFill style={{justifyContent: p.jc, alignItems: p.ai, paddingLeft: 80, paddingRight: 80, paddingTop: p.pt, paddingBottom: p.pb}}>
      <div style={{maxWidth: sidey ? 740 : '100%'}}>
        <Caption text={text} highlights={highlights} size={size} align={p.al} typewriter={false} lineSync lineReveal={reveal} />
      </div>
    </AbsoluteFill>
  );
};

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
          {stat.suffix ? <span style={{fontFamily: HEAD, fontSize: 120, color: C.red, lineHeight: 1, marginLeft: stat.suffix && stat.suffix.trim().length > 1 ? 18 : 3}}>{stat.suffix.trim()}</span> : null}
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The bounce</span>
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
      return <SceneText text={s.text!} highlights={s.highlights} size={s.size} reveal={s.reveal} pos={s.pos} />;
    case 'stat':
      return <SceneStat stat={s.stat!} />;
    case 'impact':
      return <SceneImpact text={s.text!} redBg={s.redBg} />;
    default:
      return null;
  }
};

// ---------------------------------------------------------------------------
export const BounceReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('bounce/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('bounce/music.mp3')}
        volume={(f) => interpolate(f, [0, 20, DURATION_IN_FRAMES - 55, DURATION_IN_FRAMES], [0, 0.2, 0.2, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}
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
