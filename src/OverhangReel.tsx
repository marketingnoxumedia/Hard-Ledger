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
// "The overhang" reel (OverhangReel) -- fast OIL / ENERGY / MARKETS news reel, Hard Ledger house VISUAL format.
// TOPIC: OIL PRICES fall as SUPPLY-GLUT fears outweigh Middle East conflict risk -- traders fear the world will soon have
// TOO MUCH OIL. CONTEXT: on Wed Nov 25, Brent fell ~1% to $90.58, US crude ~1.3% to $80.96. EVIDENCE: the American Petroleum
// Institute reported US crude inventories rose just 126,000 barrels last week vs an expected ~1.5M. ESCALATION: Middle East
// exports are recovering and Libya's Sharara pipeline reopened, adding supply. CONSEQUENCES: the IEA outlook reinforces that
// global supply could exceed demand in Q4 and into 2027. CONTROVERSY: risks remain -- ships still targeted near the Strait of
// Hormuz, and OPEC+ decides 2027 output policy on Nov 29. DEBATE close: a growing surplus or continued disruptions -- could
// oil fall even further?
// NOTE ON VOICE: written VERBATIM in the influencer "curiosity-gap" format (NOT the faceless house voice) -- EARLY
// "follow for more" CTA, CLOSES on a debate question.
// Distinct from GlutReel ("The glut", the ~4% drop + JD Vance/Qatar mediation + $80/$89 prices) and CrudeReel ("The slide",
// Trump signals no strikes) -- this reel's NEW specifics are the Nov 25 $90.58/$80.96 prices, the API inventory surprise
// (+126,000 vs ~1.5M expected), Libya's Sharara reopening, and the OPEC+ Nov 29 output decision. Flagged as a near-dup
// before building; the client chose a new standalone reel. Own footage under public/overhang/, ledger-checked (incl. vs GlutReel).
// Per the saved house preference, captions are <=5-6 words/beat with LARGER on-screen type (Anton 42-52). 51 beats. 4 stat
// cards: BRENT -1% $90.58, U.S. CRUDE -1.3% $80.96, INVENTORIES ROSE +126,000 BARRELS, ANALYSTS EXPECTED 1.5 MILLION BBL. 1
// red impact at the CONTROVERSY pivot ("But the risks / haven't disappeared."), no black beat. Debate question lands over footage.
// FOOTAGE -- TOPICAL but STRICTLY BRAND-FREE, because the reel names real nations/firms/bodies, so NONE appear: NO real face
// or official; NO US / Iran / Libya / any flag; NO named / liveried tanker or warship; NO API / IEA / OPEC / oil-major logo;
// NO readable brand / Arabic / Farsi / ticker / screen text; NO identifiable landmark. Metaphor-led oil/energy/geopolitics
// b-roll: red falling oil-price charts, smoke over water, a desert, a globe, oil tank farms / a refinery / a pump-jack / an
// offshore rig / oil drums / black crude, a blank-screen phone, a data lattice, a sea strait & a tanker silhouette & a desert
// pipeline & a valve, a port, a calendar & a clock, an institutional building, a radar/crosshair, a meeting table, a tug-of-
// war, a cliff drop. Mix of short videos + photos. OWN footage under public/overhang/, NO reuse -- ledger-checked.
// **UNVERIFIED -- the reel names real nations (US, Iran implied, Libya), bodies/groups (the American Petroleum Institute, the
// IEA, OPEC+) and figures (Brent $90.58 -1%; US crude $80.96 -1.3%; a +126,000-barrel inventory build vs ~1.5M expected;
// Libya's Sharara reopening; IEA supply>demand in Q4 into 2027; an OPEC+ Nov 29 decision). These are post-cutoff claims (Jan
// 2026 knowledge cutoff) supplied by the client. Rendered as written. Oil prices and a live conflict move fast; every figure
// MUST be fact-checked against primary reporting before publishing. General markets/geopolitics news, NOT investment advice;
// the closing line is the client's engagement prompt.**
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 70, kind: 'hook', reveal: [3, 40], text: 'Oil prices|are falling again,', kicker: 'The overhang', highlights: ['falling'], size: 52, media: {src: 'overhang/ov00_falling.mp4', type: 'video', effect: 'in'}},
  // 1
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'even as ships|come under attack', highlights: ['attack'], size: 44, pos: 'upperRight', media: {src: 'overhang/ov01_attack.mp4', type: 'video', effect: 'in'}},
  // 2
  {dur: 70, kind: 'text', reveal: [2], text: 'in the Middle East.', highlights: ['Middle'], size: 50, pos: 'left', media: {src: 'overhang/ov02_mideast.mp4', type: 'video', effect: 'in'}},
  // 3
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'And the reason|is a growing fear', highlights: ['fear'], size: 44, pos: 'lowerRight', media: {src: 'overhang/ov03_fear.mp4', type: 'video', effect: 'in'}},
  // 4
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'that the world|could soon have', highlights: ['world'], size: 44, pos: 'upperLeft', media: {src: 'overhang/ov04_world.mp4', type: 'video', effect: 'in'}},
  // 5
  {dur: 70, kind: 'text', reveal: [2], text: 'too much oil.', highlights: ['too'], size: 52, pos: 'right', media: {src: 'overhang/ov05_toomuch.mp4', type: 'video', effect: 'in'}},
  // 6
  {dur: 70, kind: 'text', reveal: [2], text: 'Here’s the twist:', highlights: ['twist:'], size: 52, pos: 'lower', media: {src: 'overhang/ov06_twist.mp4', type: 'video', effect: 'in'}},
  // 7
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'traders are becoming|more worried', highlights: ['worried'], size: 48, pos: 'lowerLeft', media: {src: 'overhang/ov07_traders.mp4', type: 'video', effect: 'in'}},
  // 8
  {dur: 70, kind: 'text', reveal: [2], text: 'about a supply glut', highlights: ['glut'], size: 50, pos: 'upperRight', media: {src: 'overhang/ov08_glut.mp4', type: 'video', effect: 'in'}},
  // 9
  {dur: 70, kind: 'text', reveal: [2], text: 'than the conflict', highlights: ['conflict'], size: 52, pos: 'left', media: {src: 'overhang/ov09_conflict.mp4', type: 'video', effect: 'in'}},
  // 10
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'threatening one of|the world’s', highlights: ['threatening'], size: 48, pos: 'right', media: {src: 'overhang/ov10_routes.mp4', type: 'video', effect: 'in'}},
  // 11
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'most important|oil routes.', highlights: ['routes.'], size: 50, pos: 'upperLeft', media: {src: 'overhang/ov11_oilroutes.mp4', type: 'video', effect: 'in'}},
  // 12 FOLLOW
  {dur: 70, kind: 'text', reveal: [2], text: 'Follow for more updates', highlights: ['Follow'], size: 50, pos: 'lowerRight', media: {src: 'overhang/ov12_follow.mp4', type: 'video', effect: 'in'}},
  // 13
  {dur: 70, kind: 'text', reveal: [2], text: 'on the biggest moves', highlights: ['biggest'], size: 50, pos: 'upper', media: {src: 'overhang/ov13_moves.mp4', type: 'video', effect: 'in'}},
  // 14
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'in energy|and global markets.', highlights: ['energy'], size: 48, pos: 'left', media: {src: 'overhang/ov14_energy.mp4', type: 'video', effect: 'in'}},
  // 15
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'On Wednesday,|November 25,', highlights: ['Wednesday,'], size: 50, pos: 'right', media: {src: 'overhang/ov15_wednesday.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 70, kind: 'text', reveal: [2], text: 'Brent crude fell', highlights: ['Brent'], size: 52, pos: 'lowerLeft', media: {src: 'overhang/ov16_brentfell.mp4', type: 'video', effect: 'in'}},
  // 17 CARD
  {dur: 70, kind: 'stat', stat: {pre: 'BRENT −1%', prefix: '$', value: 90.58, decimals: 2}, media: {src: 'overhang/ov17_brent90.mp4', type: 'video', effect: 'in'}},
  // 18
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'a barrel, while|U.S. crude dropped', highlights: ['crude'], size: 44, pos: 'upperRight', media: {src: 'overhang/ov18_uscrude.mp4', type: 'video', effect: 'in'}},
  // 19 CARD
  {dur: 70, kind: 'stat', stat: {pre: 'U.S. CRUDE −1.3%', prefix: '$', value: 80.96, decimals: 2}, media: {src: 'overhang/ov19_usd80.mp4', type: 'video', effect: 'in'}},
  // 20
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'The American|Petroleum Institute', highlights: ['Petroleum'], size: 50, pos: 'left', media: {src: 'overhang/ov20_api.mp4', type: 'video', effect: 'in'}},
  // 21
  {dur: 70, kind: 'text', reveal: [2], text: 'reported U.S. crude inventories', highlights: ['inventories'], size: 50, pos: 'lowerRight', media: {src: 'overhang/ov21_inventories.mp4', type: 'video', effect: 'in'}},
  // 22
  {dur: 70, kind: 'text', reveal: [2], text: 'rose by', highlights: ['rose'], size: 52, pos: 'upperLeft', media: {src: 'overhang/ov22_roseby.mp4', type: 'video', effect: 'in'}},
  // 23 CARD
  {dur: 70, kind: 'stat', stat: {pre: 'INVENTORIES ROSE', prefix: '+', value: 126000, post: 'BARRELS'}, media: {src: 'overhang/ov23_126k.mp4', type: 'video', effect: 'in'}},
  // 24
  {dur: 70, kind: 'text', reveal: [2], text: 'barrels last week.', highlights: ['week.'], size: 52, pos: 'right', media: {src: 'overhang/ov24_lastweek.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 70, kind: 'text', reveal: [2], text: 'Analysts had expected', highlights: ['Analysts'], size: 52, pos: 'lower', media: {src: 'overhang/ov25_analysts.mp4', type: 'video', effect: 'in'}},
  // 26
  {dur: 70, kind: 'text', reveal: [2], text: 'a much larger increase', highlights: ['larger'], size: 50, pos: 'upperRight', media: {src: 'overhang/ov26_larger.mp4', type: 'video', effect: 'in'}},
  // 27 CARD
  {dur: 70, kind: 'stat', stat: {pre: 'ANALYSTS EXPECTED', value: 1.5, decimals: 1, post: 'MILLION BBL'}, media: {src: 'overhang/ov27_expected15m.mp4', type: 'video', effect: 'in'}},
  // 28
  {dur: 70, kind: 'text', reveal: [2], text: 'Meanwhile, oil exports', highlights: ['exports'], size: 52, pos: 'lowerLeft', media: {src: 'overhang/ov28_exports.mp4', type: 'video', effect: 'in'}},
  // 29
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'from the Middle East|are recovering,', highlights: ['recovering,'], size: 44, pos: 'left', media: {src: 'overhang/ov29_recovering.mp4', type: 'video', effect: 'in'}},
  // 30
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'and Libya’s|Sharara pipeline', highlights: ['Sharara'], size: 50, pos: 'right', media: {src: 'overhang/ov30_libya.mp4', type: 'video', effect: 'in'}},
  // 31
  {dur: 70, kind: 'text', reveal: [2], text: 'has reopened,', highlights: ['reopened,'], size: 52, pos: 'lowerRight', media: {src: 'overhang/ov31_reopened.mp4', type: 'video', effect: 'in'}},
  // 32
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'adding more supply|to the market.', highlights: ['supply'], size: 44, pos: 'upperLeft', media: {src: 'overhang/ov32_moresupply.mp4', type: 'video', effect: 'in'}},
  // 33
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'The International|Energy Agency’s', highlights: ['Energy'], size: 50, pos: 'right', media: {src: 'overhang/ov33_iea.mp4', type: 'video', effect: 'in'}},
  // 34
  {dur: 70, kind: 'text', reveal: [2], text: 'outlook has reinforced', highlights: ['reinforced'], size: 52, pos: 'upperRight', media: {src: 'overhang/ov34_outlook.mp4', type: 'video', effect: 'in'}},
  // 35
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'expectations that|global oil supply', highlights: ['supply'], size: 48, pos: 'left', media: {src: 'overhang/ov35_globalsupply.mp4', type: 'video', effect: 'in'}},
  // 36
  {dur: 70, kind: 'text', reveal: [2], text: 'could exceed demand', highlights: ['exceed'], size: 52, pos: 'lowerLeft', media: {src: 'overhang/ov36_exceed.mp4', type: 'video', effect: 'in'}},
  // 37
  {dur: 70, kind: 'text', reveal: [2], text: 'in the fourth quarter', highlights: ['fourth'], size: 50, pos: 'upper', media: {src: 'overhang/ov37_fourthquarter.jpg', type: 'img', effect: 'in'}},
  // 38
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'and potentially|into 2027.', highlights: ['2027.'], size: 50, pos: 'right', media: {src: 'overhang/ov38_2027.mp4', type: 'video', effect: 'in'}},
  // 39 RED
  {dur: 70, kind: 'impact', redBg: true, text: 'But the risks|haven’t disappeared.'},
  // 40
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Ships are still|being targeted', highlights: ['targeted'], size: 48, pos: 'lowerRight', media: {src: 'overhang/ov39_targeted.mp4', type: 'video', effect: 'in'}},
  // 41
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'near the Strait|of Hormuz,', highlights: ['Hormuz,'], size: 48, pos: 'upperLeft', media: {src: 'overhang/ov40_hormuz.mp4', type: 'video', effect: 'in'}},
  // 42
  {dur: 70, kind: 'text', reveal: [2], text: 'and OPEC+ producers', highlights: ['OPEC+'], size: 52, pos: 'left', media: {src: 'overhang/ov41_opec.mp4', type: 'video', effect: 'in'}},
  // 43
  {dur: 70, kind: 'text', reveal: [2], text: 'are preparing to decide', highlights: ['preparing'], size: 50, pos: 'lowerRight', media: {src: 'overhang/ov42_preparing.mp4', type: 'video', effect: 'in'}},
  // 44
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'their 2027|output policy', highlights: ['output'], size: 50, pos: 'upperRight', media: {src: 'overhang/ov43_output.mp4', type: 'video', effect: 'in'}},
  // 45
  {dur: 70, kind: 'text', reveal: [2], text: 'on November 29.', highlights: ['November'], size: 52, pos: 'right', media: {src: 'overhang/ov44_nov29.jpg', type: 'img', effect: 'in'}},
  // 46
  {dur: 70, kind: 'text', reveal: [2], text: 'So what will win:', highlights: ['win:'], size: 50, pos: 'lowerLeft', media: {src: 'overhang/ov45_win.mp4', type: 'video', effect: 'in'}},
  // 47
  {dur: 70, kind: 'text', reveal: [2], text: 'a growing oil surplus', highlights: ['surplus'], size: 50, pos: 'left', media: {src: 'overhang/ov46_surplus.mp4', type: 'video', effect: 'in'}},
  // 48
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'or continued|Middle East disruptions?', highlights: ['disruptions?'], size: 48, pos: 'upperRight', media: {src: 'overhang/ov47_disruptions.mp4', type: 'video', effect: 'in'}},
  // 49
  {dur: 70, kind: 'text', reveal: [2], text: 'And could oil prices', highlights: ['prices'], size: 50, pos: 'lower', media: {src: 'overhang/ov48_oilprices.mp4', type: 'video', effect: 'in'}},
  // 50 CTA
  {dur: 70, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'fall even further?', highlights: ['further?'], size: 54, media: {src: 'overhang/ov49_further.mp4', type: 'video', effect: 'in'}},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The overhang</span>
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
export const OverhangReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('overhang/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('overhang/music.mp3')}
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
