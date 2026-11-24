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
// "The glut" reel (GlutReel) -- fast OIL / GEOPOLITICS / MARKETS news reel, Hard Ledger house VISUAL format.
// TOPIC: OIL PRICES fell nearly 4% -- partly on hopes the ~9-month US/IRAN war could move toward an end, but the BIGGER
// threat may be an approaching global SUPPLY GLUT. CONTEXT: oil steadied after Monday's drop, US crude ~$80/bbl, Brent above
// $89. EVIDENCE: VP JD Vance met Qatar's PM (Qatar mediating) to discuss Iran talks; Persian Gulf exports surged despite
// tanker attacks near the STRAIT OF HORMUZ. CONSEQUENCES: the IEA expects supply to exceed demand this quarter and Goldman
// Sachs warns of a possible surplus next year -- more oil, more downward price pressure. CONTROVERSY: peace isn't guaranteed
// -- Iran wants sanctions eased, frozen assets released, the US naval blockade lifted; Washington wants nuclear concessions.
// DEBATE close: what moves oil next -- a peace deal or a supply surplus, and could cheaper oil come sooner than expected?
// NOTE ON VOICE: written VERBATIM in the influencer "curiosity-gap" format (NOT the faceless house voice) -- EARLY
// "follow for more" CTA, CLOSES on a debate question.
// Distinct from CrudeReel ("The slide", oil falling after TRUMP signals no further strikes; Brent ~$98) -- this reel's NEW
// hook is the SUPPLY-GLUT-is-the-bigger-threat framing + the JD Vance/Qatar mediation + $80/$89 prices. Flagged as a near-
// dup before building; the client chose a new standalone reel. Own footage under public/glut/.
// Per the saved house preference, captions are <=5-6 words/beat with LARGER on-screen type (Anton 42-52). 54 beats. 4 stat
// cards: NEARLY 4% DROP, U.S. CRUDE $80 A BARREL, BRENT ABOVE $89, NEARLY 9 MONTH CONFLICT. 1 red impact at the CONTROVERSY
// pivot ("But peace is / far from guaranteed."), no black beat. Debate question lands over footage.
// FOOTAGE -- TOPICAL but STRICTLY BRAND-FREE, because the reel names real officials/nations/firms, so NONE appear: NO JD
// Vance / any official or real face; NO US / Iran / Qatar or any flag; NO named / liveried tanker or warship; NO IEA /
// Goldman Sachs / oil-major logo; NO readable brand / Arabic / Farsi / ticker / screen text; NO identifiable landmark.
// Metaphor-led oil/energy/geopolitics b-roll: red falling oil-price charts & a down arrow, a desert dusk, light through
// clouds, a winding road, storm clouds, oil barrels / a tank farm / a refinery / a pump-jack / an offshore rig / black oil,
// a blank-screen phone, a glowing globe & world map, a diplomatic handshake & negotiation table & a gulf skyline, a calendar
// & clock, a sea strait & a tanker silhouette & smoke over water, an institutional building, chains & a padlock & ice & a
// naval-ship silhouette & a cooling tower for sanctions/blockade/nuclear, a dove / olive branch for peace. Mix of short
// videos + photos. OWN footage under public/glut/, NO reuse -- ledger-checked (incl. vs CrudeReel / StraitReel / OilReel).
// **UNVERIFIED -- the reel names real people (JD Vance, Qatar's PM), nations (US, Iran, Qatar), bodies (the IEA, Goldman
// Sachs) and figures (a ~4% oil drop; US crude ~$80; Brent above $89; a ~9-month conflict; IEA supply>demand this quarter;
// a Goldman surplus warning). These are post-cutoff claims (Jan 2026 knowledge cutoff) supplied by the client. Rendered as
// written. Oil prices and a live geopolitical conflict move fast; every figure AND the attributed diplomatic claims MUST be
// fact-checked against primary reporting before publishing. General markets/geopolitics news, NOT investment advice; the
// closing line is the client's engagement prompt.**
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 70, kind: 'hook', reveal: [3, 40], text: 'Oil prices|just suffered', kicker: 'The glut', highlights: ['Oil'], size: 54, media: {src: 'glut/gl00_oildrop.jpg', type: 'img', effect: 'in'}},
  // 1 CARD
  {dur: 70, kind: 'stat', stat: {pre: 'NEARLY', value: 4, suffix: '%', post: 'DROP'}, media: {src: 'glut/gl01_fourpct.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'And the reason|isn’t just', highlights: ['reason'], size: 48, pos: 'upperRight', media: {src: 'glut/gl02_reason.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'what’s happening|in the Middle East.', highlights: ['Middle'], size: 44, pos: 'left', media: {src: 'glut/gl03_mideast.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'It’s the growing|possibility', highlights: ['possibility'], size: 50, pos: 'lowerRight', media: {src: 'glut/gl04_possibility.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 70, kind: 'text', reveal: [2], text: 'that the war with Iran', highlights: ['Iran'], size: 46, pos: 'upperLeft', media: {src: 'glut/gl05_iran.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'could finally|move toward an end.', highlights: ['end.'], size: 44, pos: 'right', media: {src: 'glut/gl06_end.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'But here’s|the twist:', highlights: ['twist:'], size: 50, pos: 'lower', media: {src: 'glut/gl07_twist.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'even with tensions|still running high,', highlights: ['tensions'], size: 44, pos: 'lowerLeft', media: {src: 'glut/gl08_tensions.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'the bigger threat|to oil prices', highlights: ['threat'], size: 44, pos: 'upperRight', media: {src: 'glut/gl09_threat.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 70, kind: 'text', reveal: [2], text: 'may be an approaching', highlights: ['approaching'], size: 50, pos: 'left', media: {src: 'glut/gl10_approaching.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 70, kind: 'text', reveal: [2], text: 'global supply glut.', highlights: ['glut.'], size: 52, pos: 'right', media: {src: 'glut/gl11_glut.jpg', type: 'img', effect: 'in'}},
  // 12 FOLLOW
  {dur: 70, kind: 'text', reveal: [2], text: 'Follow for more updates', highlights: ['Follow'], size: 50, pos: 'upperLeft', media: {src: 'glut/gl12_follow.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 70, kind: 'text', reveal: [2], text: 'on the biggest moves', highlights: ['biggest'], size: 50, pos: 'lowerRight', media: {src: 'glut/gl13_moves.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 70, kind: 'text', reveal: [2], text: 'in energy, business,', highlights: ['energy,'], size: 52, pos: 'upper', media: {src: 'glut/gl14_energy.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 70, kind: 'text', reveal: [2], text: 'and global markets.', highlights: ['markets.'], size: 52, pos: 'left', media: {src: 'glut/gl15_markets.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Oil steadied after|Monday’s sharp decline,', highlights: ['steadied'], size: 44, pos: 'right', media: {src: 'glut/gl16_steadied.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 70, kind: 'text', reveal: [2], text: 'with U.S. crude trading', highlights: ['crude'], size: 50, pos: 'lowerLeft', media: {src: 'glut/gl17_crude.jpg', type: 'img', effect: 'in'}},
  // 18 CARD
  {dur: 70, kind: 'stat', stat: {pre: 'U.S. CRUDE', prefix: '$', value: 80, post: 'A BARREL'}, media: {src: 'glut/gl18_usd80.jpg', type: 'img', effect: 'in'}},
  // 19 CARD
  {dur: 70, kind: 'stat', stat: {pre: 'BRENT ABOVE', prefix: '$', value: 89}, media: {src: 'glut/gl19_brent89.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Vice President|JD Vance', highlights: ['Vance'], size: 50, pos: 'upperRight', media: {src: 'glut/gl20_vance.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'met with Qatar’s|prime minister', highlights: ['minister'], size: 48, pos: 'left', media: {src: 'glut/gl21_minister.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'to discuss|negotiations with Iran.', highlights: ['negotiations'], size: 48, pos: 'lowerRight', media: {src: 'glut/gl22_negotiations.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Qatar has been|acting', highlights: ['Qatar'], size: 50, pos: 'upperLeft', media: {src: 'glut/gl23_qatar.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 70, kind: 'text', reveal: [2], text: 'as a mediator', highlights: ['mediator'], size: 52, pos: 'right', media: {src: 'glut/gl24_mediator.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 70, kind: 'text', reveal: [2], text: 'in efforts to end', highlights: ['end'], size: 50, pos: 'lower', media: {src: 'glut/gl25_efforts.jpg', type: 'img', effect: 'in'}},
  // 26 CARD
  {dur: 70, kind: 'stat', stat: {pre: 'NEARLY', value: 9, post: 'MONTH CONFLICT'}, media: {src: 'glut/gl26_ninemonth.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 70, kind: 'text', reveal: [2], text: 'At the same time,', highlights: ['time,'], size: 50, pos: 'upperRight', media: {src: 'glut/gl27_sametime.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'oil exports|from the Persian Gulf', highlights: ['Persian'], size: 44, pos: 'lowerLeft', media: {src: 'glut/gl28_persian.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 70, kind: 'text', reveal: [2], text: 'have surged', highlights: ['surged'], size: 52, pos: 'left', media: {src: 'glut/gl29_surged.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 70, kind: 'text', reveal: [2], text: 'despite continued attacks', highlights: ['attacks'], size: 52, pos: 'right', media: {src: 'glut/gl30_attacks.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 70, kind: 'text', reveal: [2], text: 'on tankers passing through', highlights: ['tankers'], size: 50, pos: 'lowerRight', media: {src: 'glut/gl31_tankers.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 70, kind: 'text', reveal: [2], text: 'the Strait of Hormuz.', highlights: ['Hormuz.'], size: 50, pos: 'upperLeft', media: {src: 'glut/gl32_hormuz.jpg', type: 'img', effect: 'in'}},
  // 33
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'The International|Energy Agency', highlights: ['Energy'], size: 50, pos: 'right', media: {src: 'glut/gl33_iea.jpg', type: 'img', effect: 'in'}},
  // 34
  {dur: 70, kind: 'text', reveal: [2], text: 'expects global oil supply', highlights: ['supply'], size: 50, pos: 'upperRight', media: {src: 'glut/gl34_supply.jpg', type: 'img', effect: 'in'}},
  // 35
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'to exceed demand|this quarter,', highlights: ['exceed'], size: 48, pos: 'left', media: {src: 'glut/gl35_exceed.jpg', type: 'img', effect: 'in'}},
  // 36
  {dur: 70, kind: 'text', reveal: [2], text: 'while Goldman Sachs', highlights: ['Goldman'], size: 52, pos: 'lowerLeft', media: {src: 'glut/gl36_goldman.jpg', type: 'img', effect: 'in'}},
  // 37
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'has warned of|a possible surplus', highlights: ['surplus'], size: 44, pos: 'upper', media: {src: 'glut/gl37_surplus.jpg', type: 'img', effect: 'in'}},
  // 38
  {dur: 70, kind: 'text', reveal: [2], text: 'next year.', highlights: ['year.'], size: 52, pos: 'right', media: {src: 'glut/gl38_nextyear.jpg', type: 'img', effect: 'in'}},
  // 39
  {dur: 70, kind: 'text', reveal: [2], text: 'More available oil', highlights: ['More'], size: 52, pos: 'lowerRight', media: {src: 'glut/gl39_moreoil.jpg', type: 'img', effect: 'in'}},
  // 40
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'could put further|downward pressure', highlights: ['downward'], size: 48, pos: 'upperLeft', media: {src: 'glut/gl40_downward.jpg', type: 'img', effect: 'in'}},
  // 41
  {dur: 70, kind: 'text', reveal: [2], text: 'on prices.', highlights: ['prices.'], size: 52, pos: 'left', media: {src: 'glut/gl41_prices.jpg', type: 'img', effect: 'in'}},
  // 42 RED
  {dur: 70, kind: 'impact', redBg: true, text: 'But peace is|far from guaranteed.'},
  // 43
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Iran wants|sanctions eased,', highlights: ['sanctions'], size: 50, pos: 'lowerRight', media: {src: 'glut/gl42_sanctions.jpg', type: 'img', effect: 'in'}},
  // 44
  {dur: 70, kind: 'text', reveal: [2], text: 'frozen assets released,', highlights: ['frozen'], size: 52, pos: 'upperRight', media: {src: 'glut/gl43_frozen.jpg', type: 'img', effect: 'in'}},
  // 45
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'and the U.S.|naval blockade lifted.', highlights: ['blockade'], size: 44, pos: 'right', media: {src: 'glut/gl44_blockade.jpg', type: 'img', effect: 'in'}},
  // 46
  {dur: 70, kind: 'text', reveal: [2], text: 'Washington is demanding', highlights: ['Washington'], size: 52, pos: 'lowerLeft', media: {src: 'glut/gl45_washington.jpg', type: 'img', effect: 'in'}},
  // 47
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'concessions on Iran’s|nuclear program.', highlights: ['nuclear'], size: 48, pos: 'left', media: {src: 'glut/gl46_nuclear.jpg', type: 'img', effect: 'in'}},
  // 48
  {dur: 70, kind: 'text', reveal: [2], text: 'So what will move', highlights: ['move'], size: 50, pos: 'upperRight', media: {src: 'glut/gl47_move.jpg', type: 'img', effect: 'in'}},
  // 49
  {dur: 70, kind: 'text', reveal: [2], text: 'oil prices next:', highlights: ['next:'], size: 52, pos: 'lower', media: {src: 'glut/gl48_next.jpg', type: 'img', effect: 'in'}},
  // 50
  {dur: 70, kind: 'text', reveal: [2], text: 'a possible peace deal', highlights: ['peace'], size: 50, pos: 'right', media: {src: 'glut/gl49_peace.jpg', type: 'img', effect: 'in'}},
  // 51
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'or a growing|supply surplus?', highlights: ['surplus?'], size: 48, pos: 'upperLeft', media: {src: 'glut/gl50_surplus2.jpg', type: 'img', effect: 'in'}},
  // 52
  {dur: 70, kind: 'text', reveal: [2], text: 'And could cheaper oil', highlights: ['cheaper'], size: 50, pos: 'lowerRight', media: {src: 'glut/gl51_cheaper.jpg', type: 'img', effect: 'in'}},
  // 53 CTA
  {dur: 70, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'be coming sooner|than expected?', highlights: ['expected?'], size: 50, media: {src: 'glut/gl52_expected.jpg', type: 'img', effect: 'in'}},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The glut</span>
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
export const GlutReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('glut/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('glut/music.mp3')}
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
