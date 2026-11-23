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
  {dur: 70, kind: 'hook', reveal: [3, 40], text: 'Bitcoin just had|a brutal weekend.', kicker: 'The bounce', highlights: ['brutal'], size: 48, media: {src: 'bounce/bn00_crash.jpg', type: 'img', effect: 'in'}},
  // 1
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'At one point,|it was crashing.', highlights: ['crashing.'], size: 44, pos: 'upperRight', media: {src: 'bounce/bn01_falling.jpg', type: 'img', effect: 'in'}},
  // 2 CARD
  {dur: 70, kind: 'stat', stat: {pre: 'FELL TO', prefix: '$', value: 55326}, media: {src: 'bounce/bn02_low.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'The lowest|in over a year.', highlights: ['lowest'], size: 44, pos: 'left', media: {src: 'bounce/bn03_calendar.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Then it|bounced back.', highlights: ['bounced'], size: 50, pos: 'lowerRight', media: {src: 'bounce/bn04_bounce.jpg', type: 'img', effect: 'in'}},
  // 5 CARD
  {dur: 70, kind: 'stat', stat: {pre: 'BOUNCED +9%', prefix: '$', value: 61000}, media: {src: 'bounce/bn05_rebound.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'So what|actually happened?', highlights: ['happened?'], size: 50, pos: 'upperLeft', media: {src: 'bounce/bn06_question.jpg', type: 'img', effect: 'in'}},
  // 7 FOLLOW
  {dur: 70, kind: 'text', reveal: [2], text: 'Follow for more|on markets and money.', highlights: ['Follow'], size: 44, pos: 'right', media: {src: 'bounce/bn07_follow.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'It started with|forced selling.', highlights: ['forced'], size: 48, pos: 'lower', media: {src: 'bounce/bn08_selling.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Traders borrowed|to bet big.', highlights: ['borrowed'], size: 48, pos: 'lowerLeft', media: {src: 'bounce/bn09_leverage.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Falling prices|wiped them out.', highlights: ['wiped'], size: 48, pos: 'upperRight', media: {src: 'bounce/bn10_wiped.jpg', type: 'img', effect: 'in'}},
  // 11 CARD
  {dur: 70, kind: 'stat', stat: {pre: 'LIQUIDATED', prefix: '$', value: 1.8, decimals: 1, suffix: 'B'}, media: {src: 'bounce/bn11_liquidated.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Most were betting|on higher prices.', highlights: ['higher'], size: 44, pos: 'left', media: {src: 'bounce/bn12_bull.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'So the selling|fed on itself.', highlights: ['fed'], size: 44, pos: 'right', media: {src: 'bounce/bn13_domino.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'But it’s not|just crypto.', highlights: ['crypto.'], size: 48, pos: 'upperLeft', media: {src: 'bounce/bn14_stocks.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Stocks are|sliding too.', highlights: ['sliding'], size: 50, pos: 'lowerRight', media: {src: 'bounce/bn15_sliding.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'On Friday,|the Nasdaq tumbled.', highlights: ['tumbled.'], size: 48, pos: 'upper', media: {src: 'bounce/bn16_nasdaq.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Meanwhile,|the dollar is surging.', highlights: ['surging.'], size: 48, pos: 'left', media: {src: 'bounce/bn17_dollar.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'And big investors|are pulling out.', highlights: ['pulling'], size: 44, pos: 'right', media: {src: 'bounce/bn18_outflow.jpg', type: 'img', effect: 'in'}},
  // 19 CARD
  {dur: 70, kind: 'stat', stat: {pre: 'ETF OUTFLOWS', prefix: '$', value: 1.8, decimals: 1, suffix: 'B'}, media: {src: 'bounce/bn19_etf.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Here’s the|real pressure.', highlights: ['real'], size: 50, pos: 'lowerLeft', media: {src: 'bounce/bn20_pressure.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Rising|interest rates.', highlights: ['interest'], size: 52, pos: 'upperRight', media: {src: 'bounce/bn21_rates.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Safe returns|are going up.', highlights: ['Safe'], size: 48, pos: 'left', media: {src: 'bounce/bn22_yield.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'So an asset that|pays nothing', highlights: ['nothing'], size: 44, pos: 'lowerRight', media: {src: 'bounce/bn23_coin.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'looks a lot|less attractive.', highlights: ['less'], size: 48, pos: 'upperLeft', media: {src: 'bounce/bn24_down.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'And the Fed|might hike again.', highlights: ['Fed'], size: 44, pos: 'right', media: {src: 'bounce/bn25_fed.jpg', type: 'img', effect: 'in'}},
  // 26 RED
  {dur: 70, kind: 'impact', redBg: true, text: 'The pressure|hasn’t eased.'},
  // 27
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'So is this|the real bottom?', highlights: ['bottom?'], size: 44, pos: 'lower', media: {src: 'bounce/bn27_bottom.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Or just|a pause?', highlights: ['pause?'], size: 50, pos: 'upperRight', media: {src: 'bounce/bn28_pause.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Before the|next drop?', highlights: ['drop?'], size: 50, pos: 'lowerLeft', media: {src: 'bounce/bn29_drop.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'A buying|opportunity?', highlights: ['opportunity?'], size: 52, pos: 'left', media: {src: 'bounce/bn30_opportunity.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Or a deeper|crypto winter?', highlights: ['winter?'], size: 48, pos: 'right', media: {src: 'bounce/bn31_winter.jpg', type: 'img', effect: 'in'}},
  // 32 CTA
  {dur: 70, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Let me know|in the comments.', highlights: ['comments.'], size: 46, media: {src: 'bounce/bn32_comments.jpg', type: 'img', effect: 'in'}},
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
