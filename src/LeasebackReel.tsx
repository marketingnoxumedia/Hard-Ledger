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
// "The leaseback" reel (LeasebackReel) — fast FINANCE / DATA-CENTER news reel, Hard Ledger house VISUAL format.
// TOPIC: BLACKSTONE is making a ~$5B bet on AMAZON's data centers — but AWS keeps using them. The twist is a SALE-
// LEASEBACK: Amazon sells most of its ownership, then leases the facilities back. CONTEXT: Blackstone Digital
// Infrastructure Trust (BXDC) agreed to acquire a 75% controlling interest in two JVs holding 13 newly built data-center
// buildings across campuses in northern Indiana and Mississippi; the portfolio is valued ~$5B, with AWS retaining 25%.
// EVIDENCE: AWS leases back the whole portfolio under a triple-net arrangement — a 12-year initial term, extensions up to
// 32 years, a 7% initial cap rate and 2.75% annual rent increases. ESCALATION: Blackstone gets a majority stake in the
// infrastructure while Amazon stays the tenant and operator. CONSEQUENCES: it's BXDC's first deal and a big step into the
// fast-growing AI-infrastructure market; for Amazon it unlocks capital while keeping the data-center capacity it needs.
// CONTROVERSY: data-center expansion faces growing community resistance over electricity demand, infrastructure pressure
// and resource use. DEBATE: who's smarter — Blackstone collecting long-term rent from the AI boom, or Amazon freeing up
// capital while keeping control?
// NOTE ON VOICE: built VERBATIM from a client-supplied script in the influencer "curiosity-gap" format, NOT the faceless
// house voice — it uses an EARLY "follow for more" CTA and CLOSES on a "who's making the smarter move?" debate question.
// Per the saved house preference, captions are <=5-6 words/beat with LARGER on-screen type (Anton 42-52). 50 beats. 3 stat
// cards: 75% CONTROLLING INTEREST, $5B PORTFOLIO VALUE, 7% INITIAL CAP RATE (the other figures — 13 buildings, 25%, 12 &
// 32 years, 2.75% — stay in-caption). 1 red impact at the CONTROVERSY pivot ("Growing / resistance."), no black beat.
// Captions match the VO verbatim (Blackstone / BXDC / AWS / Amazon / the state names stay in-caption). Durations/reveals/
// SFX locked to the VO via a scribe_v1 word-timestamp anchor pass (public/leaseback/voiceover.mp3). Built at the house +10%
// pacing default; its own tense finance/tech-news music mixed at 0.2. OWN distinct footage under public/leaseback/ (49
// stills), NO reuse — ledger-checked.
// FOOTAGE is strictly BRAND-FREE and FACE-FREE — NO Amazon / AWS / Blackstone / Google / Microsoft or any company logo, NO
// readable server / rack label or part number, NO identifiable real face (all human figures are silhouettes / backs /
// hands), NO readable ticker / price / sign / screen / document text in any language, NO national flag, NO identifiable
// landmark, NO identifiable currency. Metaphor-led data-center / infrastructure / finance b-roll only: glowing server
// racks / data halls for the data centers and capacity, a windowless facility / an aerial campus for the buildings, a
// handshake / keys changing hands for the sale and the deal, a key on a blueprint / a pen on a contract for the lease, a
// glass finance tower for Blackstone/BXDC, interlocking gears for the joint ventures, an hourglass / a long road for the
// lease term, a balance scale for the terms, a padlock/key for unlocking capital, power lines / a substation / a reservoir
// for the resource-resistance beats, a chessboard for the "smarter move", a hand on a lever for keeping control, a blank-
// screen phone for the FOLLOW CTA, a red beat for the red card.
// **UNVERIFIED — names REAL companies (Blackstone, Blackstone Digital Infrastructure Trust / BXDC, Amazon, AWS) and cites
// specific, checkable deal terms: a ~$5B portfolio, a 75% controlling interest (AWS retains 25%), 13 buildings in Indiana
// and Mississippi, a triple-net lease with a 12-year initial term and up to 32 years, a 7% initial cap rate and 2.75%
// annual rent increases. Rendered VERBATIM as supplied. Every figure, the structure, the attribution and the state
// locations MUST be fact-checked against the companies' announcements and reputable reporting before publishing. This is
// general business news, NOT investment advice; the closing line is the client's engagement prompt.**
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 95, kind: 'hook', reveal: [3, 40], text: 'Blackstone is making|a $5 billion bet', kicker: 'The leaseback', highlights: ['billion'], size: 48, media: {src: 'leaseback/lb00_bet.jpg', type: 'img', effect: 'in'}},
  // 1
  {dur: 56, kind: 'text', reveal: [2], text: 'on Amazon’s data centers.', highlights: ['data'], size: 50, pos: 'upperRight', media: {src: 'leaseback/lb01_datacenters.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 52, kind: 'text', reveal: [2, 28], text: 'But here’s|the interesting part:', highlights: ['interesting'], size: 48, pos: 'left', media: {src: 'leaseback/lb02_interesting.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 87, kind: 'text', reveal: [2, 28], text: 'Amazon isn’t walking away|from the buildings.', highlights: ['buildings.'], size: 44, pos: 'lowerRight', media: {src: 'leaseback/lb03_buildings.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 76, kind: 'text', reveal: [2, 28], text: 'It’s going to keep|using every single one.', highlights: ['every'], size: 44, pos: 'upperLeft', media: {src: 'leaseback/lb04_every.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 104, kind: 'text', reveal: [2, 28], text: 'So why would Amazon|sell most of its ownership,', highlights: ['sell'], size: 44, pos: 'right', media: {src: 'leaseback/lb05_sell.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 72, kind: 'text', reveal: [2, 28], text: 'only to lease|the facilities back?', highlights: ['lease'], size: 44, pos: 'lower', media: {src: 'leaseback/lb06_leaseback.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 85, kind: 'text', reveal: [2, 28], text: 'And what does Blackstone|see in this deal?', highlights: ['Blackstone'], size: 44, pos: 'lowerLeft', media: {src: 'leaseback/lb07_deal.jpg', type: 'img', effect: 'in'}},
  // 8 FOLLOW
  {dur: 192, kind: 'text', reveal: [2], text: 'Follow for more stories|shaping tech and finance.', highlights: ['follow'], size: 44, pos: 'upperRight', media: {src: 'leaseback/lb08_follow.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 73, kind: 'text', reveal: [2, 28], text: 'Blackstone Digital|Infrastructure Trust', highlights: ['Infrastructure'], size: 50, pos: 'left', media: {src: 'leaseback/lb09_bxdc.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 49, kind: 'text', reveal: [2], text: 'has agreed to acquire', highlights: ['acquire'], size: 50, pos: 'right', media: {src: 'leaseback/lb10_acquire.jpg', type: 'img', effect: 'in'}},
  // 11 CARD
  {dur: 80, kind: 'stat', stat: {value: 75, suffix: '%', post: 'CONTROLLING INTEREST'}, media: {src: 'leaseback/lb11_card75.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 48, kind: 'text', reveal: [2], text: 'in two joint ventures', highlights: ['joint'], size: 50, pos: 'upperLeft', media: {src: 'leaseback/lb12_jv.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 68, kind: 'text', reveal: [2], text: 'holding 13 newly constructed', highlights: ['13'], size: 50, pos: 'lowerRight', media: {src: 'leaseback/lb13_thirteen.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 34, kind: 'text', reveal: [2], text: 'data center buildings', highlights: ['buildings'], size: 52, pos: 'upper', media: {src: 'leaseback/lb14_buildings2.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 107, kind: 'text', reveal: [2, 28], text: 'across campuses in|northern Indiana and Mississippi.', highlights: ['Indiana'], size: 44, pos: 'left', media: {src: 'leaseback/lb15_campuses.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 50, kind: 'text', reveal: [2], text: 'The portfolio is valued', highlights: ['valued'], size: 50, pos: 'right', media: {src: 'leaseback/lb16_valued.jpg', type: 'img', effect: 'in'}},
  // 17 CARD
  {dur: 78, kind: 'stat', stat: {prefix: '$', value: 5, suffix: 'B', post: 'PORTFOLIO VALUE'}, media: {src: 'leaseback/lb17_card5b.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 60, kind: 'text', reveal: [2, 28], text: 'Amazon Web Services|will retain', highlights: ['retain'], size: 48, pos: 'lowerLeft', media: {src: 'leaseback/lb18_retain.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 61, kind: 'text', reveal: [2], text: 'the remaining 25 percent.', highlights: ['25'], size: 50, pos: 'upperRight', media: {src: 'leaseback/lb19_twentyfive.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 38, kind: 'text', reveal: [2], text: 'According to the agreement,', highlights: ['agreement,'], size: 50, pos: 'left', media: {src: 'leaseback/lb20_agreement.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 108, kind: 'text', reveal: [2, 28], text: 'AWS will lease back|the entire portfolio', highlights: ['lease'], size: 44, pos: 'lowerRight', media: {src: 'leaseback/lb21_leaseportfolio.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 59, kind: 'text', reveal: [2], text: 'under a triple-net arrangement,', highlights: ['triple-net'], size: 50, pos: 'upperLeft', media: {src: 'leaseback/lb22_triplenet.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 79, kind: 'text', reveal: [2, 28], text: 'with an initial lease term|of 12 years', highlights: ['12'], size: 44, pos: 'right', media: {src: 'leaseback/lb23_twelveyears.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 94, kind: 'text', reveal: [2, 28], text: 'and extensions that could|bring it to 32 years.', highlights: ['32'], size: 44, pos: 'lower', media: {src: 'leaseback/lb24_thirtytwo.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 45, kind: 'text', reveal: [2], text: 'The deal carries a', highlights: ['deal'], size: 50, pos: 'upperRight', media: {src: 'leaseback/lb25_dealcarries.jpg', type: 'img', effect: 'in'}},
  // 26 CARD
  {dur: 77, kind: 'stat', stat: {value: 7, suffix: '%', post: 'INITIAL CAP RATE'}, media: {src: 'leaseback/lb26_card7.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 125, kind: 'text', reveal: [2, 28], text: 'and annual rent increases|of 2.75 percent.', highlights: ['2.75'], size: 44, pos: 'lowerLeft', media: {src: 'leaseback/lb27_rentincrease.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 53, kind: 'text', reveal: [2], text: 'That means Blackstone gets', highlights: ['Blackstone'], size: 50, pos: 'left', media: {src: 'leaseback/lb28_means.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 89, kind: 'text', reveal: [2, 28], text: 'a majority stake|in valuable infrastructure,', highlights: ['majority'], size: 44, pos: 'right', media: {src: 'leaseback/lb29_majority.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 61, kind: 'text', reveal: [2], text: 'while Amazon remains the tenant', highlights: ['tenant'], size: 46, pos: 'lowerRight', media: {src: 'leaseback/lb30_tenant.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 77, kind: 'text', reveal: [2, 28], text: 'and continues operating|the facilities.', highlights: ['operating'], size: 48, pos: 'upperLeft', media: {src: 'leaseback/lb31_operating.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 45, kind: 'text', reveal: [2], text: 'For Blackstone, this is', highlights: ['Blackstone,'], size: 50, pos: 'right', media: {src: 'leaseback/lb32_forblackstone.jpg', type: 'img', effect: 'in'}},
  // 33
  {dur: 81, kind: 'text', reveal: [2], text: 'its first investment through BXDC', highlights: ['BXDC'], size: 46, pos: 'upperRight', media: {src: 'leaseback/lb33_bxdcfirst.jpg', type: 'img', effect: 'in'}},
  // 34
  {dur: 49, kind: 'text', reveal: [2], text: 'and a major step into', highlights: ['major'], size: 46, pos: 'left', media: {src: 'leaseback/lb34_majorstep.jpg', type: 'img', effect: 'in'}},
  // 35
  {dur: 88, kind: 'text', reveal: [2, 28], text: 'the rapidly growing|AI infrastructure market.', highlights: ['AI'], size: 44, pos: 'lowerLeft', media: {src: 'leaseback/lb35_aimarket.jpg', type: 'img', effect: 'in'}},
  // 36
  {dur: 45, kind: 'text', reveal: [2], text: 'For Amazon, the arrangement', highlights: ['Amazon,'], size: 50, pos: 'upper', media: {src: 'leaseback/lb36_foramazon.jpg', type: 'img', effect: 'in'}},
  // 37
  {dur: 72, kind: 'text', reveal: [2, 28], text: 'provides a way|to unlock capital', highlights: ['capital'], size: 44, pos: 'right', media: {src: 'leaseback/lb37_unlock.jpg', type: 'img', effect: 'in'}},
  // 38
  {dur: 44, kind: 'text', reveal: [2], text: 'while retaining access to', highlights: ['access'], size: 50, pos: 'lowerRight', media: {src: 'leaseback/lb38_access.jpg', type: 'img', effect: 'in'}},
  // 39
  {dur: 58, kind: 'text', reveal: [2], text: 'the data center capacity it needs.', highlights: ['capacity'], size: 42, pos: 'upperLeft', media: {src: 'leaseback/lb39_capacity.jpg', type: 'img', effect: 'in'}},
  // 40
  {dur: 59, kind: 'text', reveal: [2, 28], text: 'But the expansion|of data centers', highlights: ['expansion'], size: 44, pos: 'left', media: {src: 'leaseback/lb40_expansion.jpg', type: 'img', effect: 'in'}},
  // 41 RED
  {dur: 71, kind: 'impact', redBg: true, text: 'Growing|resistance.'},
  // 42
  {dur: 64, kind: 'text', reveal: [2], text: 'Communities are raising concerns', highlights: ['Communities'], size: 50, pos: 'lowerRight', media: {src: 'leaseback/lb42_communities.jpg', type: 'img', effect: 'in'}},
  // 43
  {dur: 50, kind: 'text', reveal: [2], text: 'about electricity demand,', highlights: ['electricity'], size: 52, pos: 'upperRight', media: {src: 'leaseback/lb43_electricity.jpg', type: 'img', effect: 'in'}},
  // 44
  {dur: 45, kind: 'text', reveal: [2], text: 'infrastructure pressure,', highlights: ['pressure,'], size: 52, pos: 'right', media: {src: 'leaseback/lb44_pressure.jpg', type: 'img', effect: 'in'}},
  // 45
  {dur: 82, kind: 'text', reveal: [2, 28], text: 'and the resources|these facilities require.', highlights: ['resources'], size: 44, pos: 'lowerLeft', media: {src: 'leaseback/lb45_resources.jpg', type: 'img', effect: 'in'}},
  // 46
  {dur: 53, kind: 'text', reveal: [2, 28], text: 'So who’s making|the smarter move here?', highlights: ['smarter'], size: 44, pos: 'left', media: {src: 'leaseback/lb46_smarter.jpg', type: 'img', effect: 'in'}},
  // 47
  {dur: 65, kind: 'text', reveal: [2], text: 'Blackstone, collecting long-term rent', highlights: ['rent'], size: 50, pos: 'upperRight', media: {src: 'leaseback/lb47_rent.jpg', type: 'img', effect: 'in'}},
  // 48
  {dur: 30, kind: 'text', reveal: [2], text: 'from the AI boom,', highlights: ['boom,'], size: 50, pos: 'lower', media: {src: 'leaseback/lb48_boom.jpg', type: 'img', effect: 'in'}},
  // 49 CTA
  {dur: 132, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'or Amazon, freeing up capital|while keeping control?', highlights: ['capital'], size: 46, media: {src: 'leaseback/lb49_control.jpg', type: 'img', effect: 'in'}},
];


type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 941, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1328, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1950, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 2973, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 3433, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The leaseback</span>
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
export const LeasebackReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('leaseback/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('leaseback/music.mp3')}
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
