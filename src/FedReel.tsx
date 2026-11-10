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
// "The Fed" reel (FedReel) — fast NEWS reel, Hard Ledger house VISUAL format, markets / monetary-policy / economy topic.
// TOPIC: THE STOCK MARKET IS DOING SOME OF THE FED'S DIRTY WORK. A falling stock market is helping the Federal Reserve
// fight inflation — by making investors and businesses think twice before spending, it tightens financial conditions the
// way rate hikes do. Per DataTrek Research, falling share prices and higher volatility (investors pulling back from risky
// assets, esp. tech) are tightening financial conditions: businesses find it harder to raise money and households with
// lower investment values turn cautious. Markets price in an expected QUARTER-POINT (+0.25%) hike at the Fed's DECEMBER
// meeting but see FEWER hikes in 2027, partly because the market is already pressuring the economy. If conditions stay
// tight, the Fed may not need to raise as aggressively. The danger: a moderate decline helps cool inflation, but a much
// deeper CRASH could damage business confidence, weaken growth and force the Fed to respond. Debate: is Wall Street
// helping the Fed, or is the sell-off creating a bigger economic problem?
// NOTE ON VOICE: built VERBATIM from a client-supplied script in the influencer "curiosity-gap" format, NOT the faceless
// house voice — it uses an EARLY "follow for more" CTA and CLOSES on a "let me know in the comments" debate CTA. Per the
// saved house preference, captions are <=5-6 words/beat with LARGER on-screen type (Anton 42-52). 57 beats. 1 stat card:
// +0.25% / DEC. HIKE (the expected quarter-point December rate increase — the script's one hard figure). 1 red impact at
// the CONTROVERSY pivot ("A dangerous / balance." — the moderate-decline-vs-deeper-crash tension; reel closes on the
// comments-CTA media beat), no black beat. Captions match the VO verbatim (the year "2027" and "December" stay in-caption
// as the VO states them). Durations/reveals/SFX locked to the VO via a scribe_v1 word-timestamp anchor pass
// (public/fed/voiceover.mp3). Built at the house +10% pacing default; its own tense markets/monetary-policy music mixed at
// 0.2. OWN distinct footage under public/fed/ (56 stills), NO reuse of any other reel's clips — ledger-checked. ADJACENT
// to but DISTINCT from InflationReel ("The inflation tax", the idle-cash-erosion evergreen) and the chip-selloff reels —
// this is MONETARY POLICY / the Fed using the market's own tightening.
// FOOTAGE is strictly BRAND-FREE — NO Federal Reserve seal / Eccles-building nameplate / Fed-chair likeness, NO stock-
// exchange name or logo (NYSE / Nasdaq), NO readable ticker / index / brand / screen / newspaper text, NO national flag,
// NO identifiable face, NO readable currency denomination. Metaphor-led markets / economy b-roll only: a generic columned
// institutional building and marble halls for the Fed, red falling charts / downward arrows / a declining candlestick wall
// for the market decline and the card, a trading-floor silhouette / screens of abstract red graphs (no readable text), a
// percent symbol / interest-rate dial / a calendar for the December meeting, coins / a wallet / a grocery cart / a receipt
// for household spending, a factory / office tower / "closed for business" shutter and empty boardroom for business
// confidence, scales / a balance beam / a tightrope for the "dangerous balance", a cracked facade / storm clouds for the
// crash caveat, blank-screen phones for the FOLLOW and comments CTAs.
// **UNVERIFIED — states a specific, fast-moving, checkable market/policy picture (the expected +0.25% December hike, the
// 2027 path, DataTrek Research's read that falling shares and volatility are tightening financial conditions). Rendered
// VERBATIM as supplied, but every figure and claim MUST be fact-checked against primary sources (the Fed, CME FedWatch,
// DataTrek) before publishing — rate expectations move daily. This is general information, not investment advice.**
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 79, kind: 'hook', reveal: [3, 40], text: 'Wall Street is helping|the Federal Reserve', kicker: 'The Fed', highlights: ['helping'], size: 48, media: {src: 'fed/fd00_wallst.jpg', type: 'img', effect: 'in'}},
  // 1
  {dur: 38, kind: 'text', reveal: [2], text: 'fight inflation,', highlights: ['inflation,'], size: 52, pos: 'upperRight', media: {src: 'fed/fd01_inflation.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 31, kind: 'text', reveal: [2], text: 'and it’s doing something', highlights: [], size: 50, pos: 'left', media: {src: 'fed/fd02_something.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 73, kind: 'text', reveal: [2, 28], text: 'the Fed doesn’t|have to do itself:', highlights: [], size: 44, pos: 'lowerRight', media: {src: 'fed/fd03_itself.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 62, kind: 'text', reveal: [2, 28], text: 'making investors|and businesses', highlights: [], size: 50, pos: 'upperLeft', media: {src: 'fed/fd04_investors.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 66, kind: 'text', reveal: [2, 28], text: 'think twice|before spending.', highlights: ['twice'], size: 50, pos: 'right', media: {src: 'fed/fd05_twice.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 36, kind: 'text', reveal: [2, 28], text: 'Here’s the|surprising part.', highlights: [], size: 50, pos: 'lower', media: {src: 'fed/fd06_surprising.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 30, kind: 'text', reveal: [2], text: 'A falling stock market', highlights: ['falling'], size: 50, pos: 'lowerLeft', media: {src: 'fed/fd07_falling.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 38, kind: 'text', reveal: [2], text: 'could reduce the need', highlights: ['reduce'], size: 50, pos: 'upperRight', media: {src: 'fed/fd08_reduce.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 62, kind: 'text', reveal: [2, 28], text: 'for additional|interest rate hikes,', highlights: ['hikes,'], size: 48, pos: 'left', media: {src: 'fed/fd09_hikes.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 38, kind: 'text', reveal: [2], text: 'potentially changing', highlights: [], size: 52, pos: 'right', media: {src: 'fed/fd10_changing.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 58, kind: 'text', reveal: [2, 28], text: 'the Fed’s|entire strategy.', highlights: ['strategy.'], size: 50, pos: 'upperLeft', media: {src: 'fed/fd11_strategy.jpg', type: 'img', effect: 'in'}},
  // 12 FOLLOW
  {dur: 34, kind: 'text', reveal: [2], text: 'Follow for|more updates', highlights: ['follow'], size: 50, pos: 'lowerRight', media: {src: 'fed/fd12_follow.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 55, kind: 'text', reveal: [2, 28], text: 'on the economy,|markets,', highlights: [], size: 50, pos: 'upper', media: {src: 'fed/fd13_markets.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 84, kind: 'text', reveal: [2, 28], text: 'and the decisions|affecting your money.', highlights: ['money.'], size: 44, pos: 'left', media: {src: 'fed/fd14_money.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 26, kind: 'text', reveal: [2, 28], text: 'The Federal Reserve|has been trying', highlights: [], size: 44, pos: 'right', media: {src: 'fed/fd15_reserve.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 65, kind: 'text', reveal: [2, 28], text: 'to control|stubborn inflation', highlights: ['stubborn'], size: 50, pos: 'lowerLeft', media: {src: 'fed/fd16_stubborn.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 80, kind: 'text', reveal: [2, 28], text: 'by keeping|borrowing costs high.', highlights: ['high.'], size: 48, pos: 'upperRight', media: {src: 'fed/fd17_high.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 78, kind: 'text', reveal: [2, 28], text: 'But after recent|market volatility,', highlights: ['volatility,'], size: 48, pos: 'left', media: {src: 'fed/fd18_volatility.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 26, kind: 'text', reveal: [2, 28], text: 'investors are|pulling back', highlights: ['pulling'], size: 50, pos: 'lowerRight', media: {src: 'fed/fd19_pullback.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 51, kind: 'text', reveal: [2], text: 'from risky assets,', highlights: ['risky'], size: 52, pos: 'upperLeft', media: {src: 'fed/fd20_risky.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 66, kind: 'text', reveal: [2, 28], text: 'particularly|technology stocks.', highlights: ['technology'], size: 52, pos: 'right', media: {src: 'fed/fd21_tech.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 56, kind: 'text', reveal: [2, 28], text: 'According to|DataTrek Research,', highlights: ['DataTrek'], size: 50, pos: 'lower', media: {src: 'fed/fd22_datatrek.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 34, kind: 'text', reveal: [2], text: 'falling share prices', highlights: ['falling'], size: 52, pos: 'upperRight', media: {src: 'fed/fd23_shareprices.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 53, kind: 'text', reveal: [2, 28], text: 'and increased|market volatility', highlights: [], size: 50, pos: 'lowerLeft', media: {src: 'fed/fd24_volatility2.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 72, kind: 'text', reveal: [2, 28], text: 'are tightening|financial conditions.', highlights: ['tightening'], size: 50, pos: 'left', media: {src: 'fed/fd25_tightening.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 35, kind: 'text', reveal: [2], text: 'That means businesses', highlights: [], size: 52, pos: 'right', media: {src: 'fed/fd26_businesses.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'may find it harder|to raise money,', highlights: ['harder'], size: 44, pos: 'lowerRight', media: {src: 'fed/fd27_harder.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 42, kind: 'text', reveal: [2], text: 'while households facing', highlights: [], size: 52, pos: 'upperLeft', media: {src: 'fed/fd28_households.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 44, kind: 'text', reveal: [2], text: 'lower investment values', highlights: ['lower'], size: 52, pos: 'right', media: {src: 'fed/fd29_lower.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 37, kind: 'text', reveal: [2, 28], text: 'could become|more cautious', highlights: ['cautious'], size: 50, pos: 'upperRight', media: {src: 'fed/fd30_cautious.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 32, kind: 'text', reveal: [2], text: 'about spending.', highlights: ['spending.'], size: 52, pos: 'left', media: {src: 'fed/fd31_spending.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 53, kind: 'text', reveal: [2, 28], text: 'Markets are now|pricing in', highlights: [], size: 48, pos: 'lowerLeft', media: {src: 'fed/fd32_pricing.jpg', type: 'img', effect: 'in'}},
  // 33 CARD
  {dur: 105, kind: 'stat', stat: {prefix: '+', value: 0.25, decimals: 2, suffix: '%', post: 'DEC. HIKE'}, media: {src: 'fed/fd33_card025.jpg', type: 'img', effect: 'in'}},
  // 34
  {dur: 32, kind: 'text', reveal: [2, 28], text: 'at the Fed’s|December meeting.', highlights: ['December'], size: 48, pos: 'upper', media: {src: 'fed/fd34_december.jpg', type: 'img', effect: 'in'}},
  // 35
  {dur: 31, kind: 'text', reveal: [2], text: 'But investors see', highlights: [], size: 52, pos: 'right', media: {src: 'fed/fd35_investors2.jpg', type: 'img', effect: 'in'}},
  // 36
  {dur: 83, kind: 'text', reveal: [2, 28], text: 'fewer additional hikes|in 2027,', highlights: ['fewer'], size: 48, pos: 'lowerRight', media: {src: 'fed/fd36_fewer.jpg', type: 'img', effect: 'in'}},
  // 37
  {dur: 42, kind: 'text', reveal: [2, 28], text: 'partly because|the stock market', highlights: [], size: 48, pos: 'upperLeft', media: {src: 'fed/fd37_stockmarket.jpg', type: 'img', effect: 'in'}},
  // 38
  {dur: 38, kind: 'text', reveal: [2, 28], text: 'is already|putting pressure', highlights: ['pressure'], size: 50, pos: 'left', media: {src: 'fed/fd38_pressure.jpg', type: 'img', effect: 'in'}},
  // 39
  {dur: 28, kind: 'text', reveal: [2], text: 'on the economy.', highlights: ['economy.'], size: 52, pos: 'lowerRight', media: {src: 'fed/fd39_economy.jpg', type: 'img', effect: 'in'}},
  // 40
  {dur: 59, kind: 'text', reveal: [2, 28], text: 'If financial conditions|remain tight,', highlights: ['tight,'], size: 48, pos: 'upperRight', media: {src: 'fed/fd40_tight.jpg', type: 'img', effect: 'in'}},
  // 41
  {dur: 39, kind: 'text', reveal: [2], text: 'the Fed may not need', highlights: [], size: 46, pos: 'right', media: {src: 'fed/fd41_mayneed.jpg', type: 'img', effect: 'in'}},
  // 42
  {dur: 65, kind: 'text', reveal: [2, 28], text: 'to raise rates|as aggressively', highlights: ['aggressively'], size: 48, pos: 'lowerLeft', media: {src: 'fed/fd42_aggressively.jpg', type: 'img', effect: 'in'}},
  // 43
  {dur: 63, kind: 'text', reveal: [2, 28], text: 'to slow demand|and fight inflation.', highlights: ['inflation.'], size: 44, pos: 'left', media: {src: 'fed/fd43_fightinflation.jpg', type: 'img', effect: 'in'}},
  // 44 RED
  {dur: 73, kind: 'impact', redBg: true, text: 'A dangerous|balance.'},
  // 45
  {dur: 53, kind: 'text', reveal: [2, 28], text: 'A moderate|market decline', highlights: ['moderate'], size: 50, pos: 'upperRight', media: {src: 'fed/fd45_moderate.jpg', type: 'img', effect: 'in'}},
  // 46
  {dur: 52, kind: 'text', reveal: [2, 28], text: 'can help|control inflation.', highlights: ['control'], size: 50, pos: 'lower', media: {src: 'fed/fd46_control.jpg', type: 'img', effect: 'in'}},
  // 47
  {dur: 43, kind: 'text', reveal: [2], text: 'A much deeper crash', highlights: ['deeper'], size: 50, pos: 'right', media: {src: 'fed/fd47_deeper.jpg', type: 'img', effect: 'in'}},
  // 48
  {dur: 55, kind: 'text', reveal: [2, 28], text: 'could damage|business confidence,', highlights: ['damage'], size: 50, pos: 'upperLeft', media: {src: 'fed/fd48_damage.jpg', type: 'img', effect: 'in'}},
  // 49
  {dur: 40, kind: 'text', reveal: [2, 28], text: 'weaken|economic growth,', highlights: ['weaken'], size: 52, pos: 'lowerRight', media: {src: 'fed/fd49_weaken.jpg', type: 'img', effect: 'in'}},
  // 50
  {dur: 72, kind: 'text', reveal: [2, 28], text: 'and force the|Fed to respond.', highlights: ['respond.'], size: 44, pos: 'left', media: {src: 'fed/fd50_respond.jpg', type: 'img', effect: 'in'}},
  // 51
  {dur: 35, kind: 'text', reveal: [2], text: 'So what do you think?', highlights: [], size: 46, pos: 'upperRight', media: {src: 'fed/fd51_think.jpg', type: 'img', effect: 'in'}},
  // 52
  {dur: 48, kind: 'text', reveal: [2, 28], text: 'Is Wall Street|helping the Fed', highlights: ['helping'], size: 44, pos: 'right', media: {src: 'fed/fd52_helping2.jpg', type: 'img', effect: 'in'}},
  // 53
  {dur: 36, kind: 'text', reveal: [2], text: 'control inflation,', highlights: ['inflation,'], size: 52, pos: 'lowerLeft', media: {src: 'fed/fd53_control2.jpg', type: 'img', effect: 'in'}},
  // 54
  {dur: 53, kind: 'text', reveal: [2, 28], text: 'or is the|market sell-off', highlights: [], size: 48, pos: 'upperLeft', media: {src: 'fed/fd54_selloff.jpg', type: 'img', effect: 'in'}},
  // 55
  {dur: 65, kind: 'text', reveal: [2, 28], text: 'creating a bigger|economic problem?', highlights: ['problem?'], size: 48, pos: 'right', media: {src: 'fed/fd55_problem.jpg', type: 'img', effect: 'in'}},
  // 56 CTA
  {dur: 38, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Let me know|in the comments.', highlights: ['comments'], size: 46, media: {src: 'fed/fd56_comments.jpg', type: 'img', effect: 'in'}},
];


type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 1704, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 2289, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 2914, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The Fed</span>
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
export const FedReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('fed/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('fed/music.mp3')}
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
