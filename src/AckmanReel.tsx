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
// "The warning" reel (AckmanReel) -- fast MARKETS / MONETARY-POLICY / ECONOMY news reel, Hard Ledger house VISUAL format.
// TOPIC: billionaire investor BILL ACKMAN (Pershing Square) warns the FEDERAL RESERVE could tip the US economy into
// RECESSION by RAISING RATES AGAIN at its DECEMBER 9 meeting -- and that the Fed's inflation fight may be making it worse.
// EVIDENCE: tightening financial conditions -- SpaceX's recent debt financing carried an 8.259% rate vs below 6% for its
// unsecured bond around its IPO; plus geopolitical risk, tariffs, military spending and massive AI infrastructure cost.
// CONSEQUENCES: forcing inflation back to 2% with higher rates could trigger a US and global recession. CONTROVERSY: the
// catch -- lower rates would ALSO benefit Ackman's own holdings (Microsoft, Netflix), and inflation is still high, so the
// Fed has reason to stay cautious. DEBATE close: accept higher inflation to protect growth, or keep fighting to 2% -- could
// another hike push the economy over the edge?
// NOTE ON VOICE: written VERBATIM in the influencer "curiosity-gap" format (NOT the faceless house voice) -- EARLY
// "follow for more" CTA, CLOSES on a debate question.
// Distinct from FedReel ("The Fed", the market-does-the-Fed's-tightening / DataTrek angle) -- this is a NAMED-INVESTOR
// warning against the Dec 9 hike, with Ackman's SpaceX-8.259% evidence and his own conflict of interest. Flagged as a
// near-dup before building; the client chose a new standalone reel. Own footage under public/ackman/.
// Per the saved house preference, captions are <=5-6 words/beat with LARGER on-screen type (Anton 42-52). 55 beats. 4 stat
// cards: DECEMBER 9 MEETING, SPACEX DEBT 8.259%, VS. BELOW 6%, INFLATION TO 2%. 1 red impact at the CONTROVERSY pivot
// ("But there's / a catch."), no black beat. Debate question lands over footage.
// FOOTAGE -- TOPICAL but STRICTLY BRAND-FREE, because the reel names real people/companies, so NONE appear: NO Bill Ackman
// / Jerome Powell / Elon Musk or any real face; NO Federal Reserve seal, SpaceX / Microsoft / Netflix logo; NO readable
// ticker / brand / price / screen text; NO national flags. Generic royalty-free material: a classical columned bank/Fed-ish
// building, a percent-sign / rate-dial motif, a plunging or rising chart, a rocket-launch plume (generic), a bond/contract
// & calculator, a globe / shipping / geopolitics motif, a missile/defense silhouette, a server room / circuit for AI, a
// recession "cliff/storm" motif, stacks of cash & a vault, a blank-screen phone for FOLLOW, a scales/gavel, a question mark
// for the close. Mix of short videos + photos. OWN footage under public/ackman/, NO reuse -- ledger-checked.
// **UNVERIFIED -- the reel names a real person (Bill Ackman / Pershing Square) and companies (SpaceX, Microsoft, Netflix,
// the Federal Reserve) and ATTRIBUTES specific claims and figures to Ackman (a possible Dec 9 rate-hike "mistake"; SpaceX
// debt at 8.259% vs below 6% at its IPO; a recession risk; that lower rates would benefit his own holdings). These are
// post-cutoff claims (Jan 2026 knowledge cutoff) supplied by the client. Rendered as written. Every figure AND the direct
// attributions to Ackman MUST be fact-checked against the primary reporting before publishing -- it puts specific words and
// numbers in a named person's mouth. General markets/economy news, NOT investment advice; the closing line is the client's
// engagement prompt.**
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 66, kind: 'hook', reveal: [3, 40], text: 'Billionaire investor|Bill Ackman', kicker: 'The warning', highlights: ['Ackman'], size: 54, media: {src: 'ackman/ak00_ackman.jpg', type: 'img', effect: 'in'}},
  // 1
  {dur: 50, kind: 'text', reveal: [2, 28], text: 'is sounding|the alarm.', highlights: ['alarm.'], size: 50, pos: 'upperRight', media: {src: 'ackman/ak01_alarm.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 53, kind: 'text', reveal: [2, 28], text: 'He says|the Federal Reserve', highlights: ['Federal'], size: 48, pos: 'left', media: {src: 'ackman/ak02_fed.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 45, kind: 'text', reveal: [2, 28], text: 'could make|one decision', highlights: ['one'], size: 50, pos: 'lowerRight', media: {src: 'ackman/ak03_decision.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 54, kind: 'text', reveal: [2, 28], text: 'that pushes|the U.S. economy', highlights: ['economy'], size: 48, pos: 'upperLeft', media: {src: 'ackman/ak04_economy.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 39, kind: 'text', reveal: [2], text: 'toward a recession.', highlights: ['recession.'], size: 52, pos: 'right', media: {src: 'ackman/ak05_recession.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 44, kind: 'text', reveal: [2, 28], text: 'And the|surprising part?', highlights: ['surprising'], size: 50, pos: 'lower', media: {src: 'ackman/ak06_surprising.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 56, kind: 'text', reveal: [2, 28], text: 'Ackman believes|the Fed’s fight', highlights: ['fight'], size: 48, pos: 'lowerLeft', media: {src: 'ackman/ak07_fight.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 34, kind: 'text', reveal: [2], text: 'against inflation', highlights: ['inflation'], size: 52, pos: 'upperRight', media: {src: 'ackman/ak08_inflation.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 35, kind: 'text', reveal: [2, 28], text: 'could actually|be making', highlights: ['actually'], size: 50, pos: 'left', media: {src: 'ackman/ak09_actually.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 31, kind: 'text', reveal: [2], text: 'the problem worse.', highlights: ['worse.'], size: 52, pos: 'right', media: {src: 'ackman/ak10_worse.jpg', type: 'img', effect: 'in'}},
  // 11 FOLLOW
  {dur: 39, kind: 'text', reveal: [2], text: 'Follow for more stories', highlights: ['Follow'], size: 50, pos: 'upperLeft', media: {src: 'ackman/ak11_follow.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 42, kind: 'text', reveal: [2], text: 'about the biggest moves', highlights: ['biggest'], size: 50, pos: 'lowerRight', media: {src: 'ackman/ak12_moves.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 44, kind: 'text', reveal: [2], text: 'in business, finance,', highlights: ['finance,'], size: 52, pos: 'upper', media: {src: 'ackman/ak13_finance.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 42, kind: 'text', reveal: [2], text: 'and the global economy.', highlights: ['global'], size: 50, pos: 'left', media: {src: 'ackman/ak14_global.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 26, kind: 'text', reveal: [2], text: 'In a new warning,', highlights: ['warning,'], size: 50, pos: 'right', media: {src: 'ackman/ak15_warning.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 47, kind: 'text', reveal: [2], text: 'the Pershing Square CEO', highlights: ['Pershing'], size: 50, pos: 'lowerLeft', media: {src: 'ackman/ak16_pershing.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 43, kind: 'text', reveal: [2], text: 'says the Federal Reserve', highlights: ['Federal'], size: 50, pos: 'upperRight', media: {src: 'ackman/ak17_fed2.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 45, kind: 'text', reveal: [2, 28], text: 'could make|another mistake', highlights: ['mistake'], size: 50, pos: 'left', media: {src: 'ackman/ak18_mistake.jpg', type: 'img', effect: 'in'}},
  // 19 CARD
  {dur: 41, kind: 'stat', stat: {pre: 'DECEMBER', value: 9, post: 'MEETING'}, media: {src: 'ackman/ak19_dec9.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 68, kind: 'text', reveal: [2, 28], text: 'by raising|interest rates again.', highlights: ['raising'], size: 48, pos: 'lowerRight', media: {src: 'ackman/ak20_hike.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 81, kind: 'text', reveal: [2, 28], text: 'Ackman points to|tightening financial conditions.', highlights: ['tightening'], size: 44, pos: 'upperLeft', media: {src: 'ackman/ak21_tightening.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 66, kind: 'text', reveal: [2, 28], text: 'He highlights|SpaceX’s recent debt', highlights: ['debt'], size: 48, pos: 'right', media: {src: 'ackman/ak22_spacex.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 37, kind: 'text', reveal: [2], text: 'financing, which carried', highlights: ['financing,'], size: 52, pos: 'lower', media: {src: 'ackman/ak23_financing.jpg', type: 'img', effect: 'in'}},
  // 24 CARD
  {dur: 72, kind: 'stat', stat: {pre: 'SPACEX DEBT', value: 8.259, decimals: 3, suffix: '%'}, media: {src: 'ackman/ak24_rate8.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 46, kind: 'text', reveal: [2, 28], text: 'interest rate,|compared with', highlights: ['compared'], size: 50, pos: 'upperRight', media: {src: 'ackman/ak25_compared.jpg', type: 'img', effect: 'in'}},
  // 26 CARD
  {dur: 49, kind: 'stat', stat: {pre: 'VS. BELOW', value: 6, suffix: '%'}, media: {src: 'ackman/ak26_rate6.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 61, kind: 'text', reveal: [2, 28], text: 'for its|unsecured bond offering', highlights: ['unsecured'], size: 48, pos: 'lowerLeft', media: {src: 'ackman/ak27_bond.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 37, kind: 'text', reveal: [2], text: 'around its IPO.', highlights: ['IPO.'], size: 52, pos: 'left', media: {src: 'ackman/ak28_ipo.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 26, kind: 'text', reveal: [2], text: 'He also argues', highlights: ['argues'], size: 52, pos: 'right', media: {src: 'ackman/ak29_argues.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 61, kind: 'text', reveal: [2, 28], text: 'that rising|geopolitical risks,', highlights: ['geopolitical'], size: 50, pos: 'lowerRight', media: {src: 'ackman/ak30_geopolitical.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 47, kind: 'text', reveal: [2, 28], text: 'tariffs,|military spending,', highlights: ['tariffs,'], size: 52, pos: 'upperLeft', media: {src: 'ackman/ak31_tariffs.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 56, kind: 'text', reveal: [2, 28], text: 'and massive|AI infrastructure', highlights: ['AI'], size: 50, pos: 'right', media: {src: 'ackman/ak32_ai.jpg', type: 'img', effect: 'in'}},
  // 33
  {dur: 86, kind: 'text', reveal: [2, 28], text: 'investments are keeping|costs elevated.', highlights: ['elevated.'], size: 48, pos: 'upperRight', media: {src: 'ackman/ak33_elevated.jpg', type: 'img', effect: 'in'}},
  // 34
  {dur: 65, kind: 'text', reveal: [2, 28], text: 'Ackman warns that|pushing rates higher', highlights: ['higher'], size: 44, pos: 'left', media: {src: 'ackman/ak34_higher.jpg', type: 'img', effect: 'in'}},
  // 35
  {dur: 32, kind: 'text', reveal: [2, 28], text: 'to force|inflation', highlights: ['inflation'], size: 52, pos: 'lowerLeft', media: {src: 'ackman/ak35_force.jpg', type: 'img', effect: 'in'}},
  // 36 CARD
  {dur: 40, kind: 'stat', stat: {pre: 'INFLATION TO', value: 2, suffix: '%'}, media: {src: 'ackman/ak36_target2.jpg', type: 'img', effect: 'in'}},
  // 37
  {dur: 39, kind: 'text', reveal: [2, 28], text: 'could trigger|a recession', highlights: ['recession'], size: 50, pos: 'upper', media: {src: 'ackman/ak37_trigger.jpg', type: 'img', effect: 'in'}},
  // 38
  {dur: 30, kind: 'text', reveal: [2], text: 'in the United States', highlights: ['United'], size: 50, pos: 'right', media: {src: 'ackman/ak38_us.jpg', type: 'img', effect: 'in'}},
  // 39
  {dur: 30, kind: 'text', reveal: [2], text: 'and around the world.', highlights: ['world.'], size: 50, pos: 'lowerRight', media: {src: 'ackman/ak39_world.jpg', type: 'img', effect: 'in'}},
  // 40 RED
  {dur: 38, kind: 'impact', redBg: true, text: 'But there’s|a catch.'},
  // 41
  {dur: 31, kind: 'text', reveal: [2], text: 'Lower interest rates', highlights: ['Lower'], size: 52, pos: 'upperLeft', media: {src: 'ackman/ak40_lower.jpg', type: 'img', effect: 'in'}},
  // 42
  {dur: 78, kind: 'text', reveal: [2, 28], text: 'would also benefit|Ackman’s investments,', highlights: ['benefit'], size: 48, pos: 'left', media: {src: 'ackman/ak41_benefit.jpg', type: 'img', effect: 'in'}},
  // 43
  {dur: 59, kind: 'text', reveal: [2], text: 'including major holdings', highlights: ['holdings'], size: 52, pos: 'lowerRight', media: {src: 'ackman/ak42_holdings.jpg', type: 'img', effect: 'in'}},
  // 44
  {dur: 68, kind: 'text', reveal: [2, 28], text: 'like Microsoft|and Netflix.', highlights: ['Microsoft'], size: 50, pos: 'upperRight', media: {src: 'ackman/ak43_bigtech.jpg', type: 'img', effect: 'in'}},
  // 45
  {dur: 77, kind: 'text', reveal: [2, 28], text: 'And inflation remains|stubbornly high,', highlights: ['stubbornly'], size: 48, pos: 'right', media: {src: 'ackman/ak44_stubborn.jpg', type: 'img', effect: 'in'}},
  // 46
  {dur: 46, kind: 'text', reveal: [2], text: 'giving the Fed reasons', highlights: ['Fed'], size: 50, pos: 'lowerLeft', media: {src: 'ackman/ak45_fed3.jpg', type: 'img', effect: 'in'}},
  // 47
  {dur: 36, kind: 'text', reveal: [2], text: 'to remain cautious.', highlights: ['cautious.'], size: 52, pos: 'left', media: {src: 'ackman/ak46_cautious.jpg', type: 'img', effect: 'in'}},
  // 48
  {dur: 29, kind: 'text', reveal: [2], text: 'So who’s right?', highlights: ['right?'], size: 52, pos: 'upperRight', media: {src: 'ackman/ak47_right.jpg', type: 'img', effect: 'in'}},
  // 49
  {dur: 74, kind: 'text', reveal: [2, 28], text: 'Should the Fed|accept higher inflation', highlights: ['accept'], size: 44, pos: 'lower', media: {src: 'ackman/ak48_accept.jpg', type: 'img', effect: 'in'}},
  // 50
  {dur: 44, kind: 'text', reveal: [2, 28], text: 'to protect|economic growth,', highlights: ['growth,'], size: 50, pos: 'right', media: {src: 'ackman/ak49_growth.jpg', type: 'img', effect: 'in'}},
  // 51
  {dur: 26, kind: 'text', reveal: [2], text: 'or keep fighting', highlights: ['fighting'], size: 52, pos: 'upperLeft', media: {src: 'ackman/ak50_fighting.jpg', type: 'img', effect: 'in'}},
  // 52
  {dur: 69, kind: 'text', reveal: [2, 28], text: 'until inflation|returns to 2%?', highlights: ['2%?'], size: 48, pos: 'lowerRight', media: {src: 'ackman/ak51_returns2.jpg', type: 'img', effect: 'in'}},
  // 53
  {dur: 44, kind: 'text', reveal: [2, 28], text: 'Could another|rate hike', highlights: ['hike'], size: 50, pos: 'left', media: {src: 'ackman/ak52_hike2.jpg', type: 'img', effect: 'in'}},
  // 54 CTA
  {dur: 58, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'push the economy|over the edge?', highlights: ['edge?'], size: 46, media: {src: 'ackman/ak53_edge.jpg', type: 'img', effect: 'in'}},
];


type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 835, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1128, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1246, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1766, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1905, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 2624, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The warning</span>
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
export const AckmanReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('ackman/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('ackman/music.mp3')}
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
