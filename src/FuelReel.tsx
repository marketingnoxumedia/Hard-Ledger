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
// "The holiday" reel (FuelReel) — fast NEWS reel, Hard Ledger house VISUAL format, economy / fuel-prices / consumer topic.
// TOPIC: THANKSGIVING GAS PRICES could BREAK A RECORD even though gasoline has fallen for SIX STRAIGHT WEEKS. Prices are
// finally easing across America, but this year's holiday fuel could still be the most expensive on record. Per AAA,
// regular gas averaged $4.01/gal on November 9 (down from ~$4.48 in late September); the highest Thanksgiving-week average
// in government records was just $3.65 (2022), and the latest weekly reading of $4.15 means this year is on track to beat
// it. DIESEL is worse — above $6/gal, with US diesel inventories at their lowest since 2003. Higher fuel costs ripple
// beyond road trips: they raise business transport costs and push up the price of moving food and everyday goods. The
// six-week decline offers relief, but the outlook hinges on oil supplies and whether Middle East tensions escalate again.
// Debate: real relief, or still pain at the pump this Thanksgiving?
// NOTE ON VOICE: built VERBATIM from a client-supplied script in the influencer "curiosity-gap" format, NOT the faceless
// house voice — it uses an EARLY "follow for more" CTA and CLOSES on a "let me know in the comments" debate CTA. Per the
// saved house preference, captions are <=5-6 words/beat with LARGER on-screen type (Anton 42-52). 58 beats. 4 stat cards:
// $4.01 / REGULAR GAS (AAA, Nov 9); $3.65 / 2022 RECORD (old Thanksgiving-week high); $4.15 / LATEST WEEK (the
// record-breaker); ABOVE $6 / DIESEL — the script's hard figures. 1 red impact at the CONTROVERSY pivot ("Hinges on /
// oil." — the outlook's dependence on oil supplies; reel closes on the comments-CTA media beat), no black beat. Captions
// match the VO verbatim (secondary numbers like $4.48 and the years 2022/2003 stay in-caption as the VO states them).
// Durations/reveals/SFX locked to the VO via a scribe_v1 word-timestamp anchor pass (public/fuel/voiceover.mp3). Built at
// the house +10% pacing default; its own tense economy/energy music mixed at 0.2. OWN distinct footage under public/fuel/
// (57 stills), NO reuse of any other reel's clips — ledger-checked. ADJACENT to but DISTINCT from CrudeReel (that is the
// Iran/Hormuz oil-price slide; this is US retail gas/diesel and the Thanksgiving record).
// FOOTAGE is strictly BRAND-FREE — NO gas-station brand or logo (Shell / Exxon / BP / Chevron / etc.), NO AAA logo, NO
// readable pump brand or specific price display, NO identifiable car badge / license plate, NO national flag, NO readable
// brand / sign / screen text. Metaphor-led fuel / economy b-roll only: a generic unbranded fuel-pump nozzle and handle, a
// blank/abstract pump display, a fuel gauge on empty, oil drums and crude, a diesel nozzle, a red falling price chart and a
// downward arrow for the decline and the cards, a highway / cars-from-behind / a loaded road-trip car (NO plate/badge) for
// Thanksgiving travel, a cargo truck silhouette and shipping for freight costs, a grocery cart / a receipt / coins for the
// household-cost beats, a calendar for the dates, a refinery / tanker / a Middle-East-desert-pipeline motif and a red chart
// for the oil-supply caveat, blank-screen phones for the FOLLOW and comments CTAs.
// **UNVERIFIED — states specific, fast-moving, checkable figures (AAA's $4.01 Nov-9 average and ~$4.48 September level; the
// $3.65 2022 Thanksgiving-week record; the $4.15 latest weekly reading; diesel above $6 and inventories lowest since 2003).
// Rendered VERBATIM as supplied, but every figure and claim MUST be fact-checked against primary sources (AAA, EIA) before
// publishing — fuel prices move daily. This is general information, not investment advice.**
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 70, kind: 'hook', reveal: [3, 40], text: 'Gas prices are|finally falling', kicker: 'The holiday', highlights: [], size: 52, media: {src: 'fuel/fu00_falling.jpg', type: 'img', effect: 'in'}},
  // 1
  {dur: 70, kind: 'text', reveal: [2], text: 'across America.', highlights: ['America.'], size: 52, pos: 'upperRight', media: {src: 'fuel/fu01_america.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 70, kind: 'text', reveal: [2], text: 'But millions of drivers', highlights: ['millions'], size: 50, pos: 'left', media: {src: 'fuel/fu02_drivers.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 70, kind: 'text', reveal: [2], text: 'could still face', highlights: [], size: 52, pos: 'lowerRight', media: {src: 'fuel/fu03_stillface.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'the most expensive|Thanksgiving fuel prices', highlights: ['expensive'], size: 44, pos: 'upperLeft', media: {src: 'fuel/fu04_expensive.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 70, kind: 'text', reveal: [2], text: 'in history.', highlights: ['history.'], size: 52, pos: 'right', media: {src: 'fuel/fu05_history.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Here’s the|surprising part:', highlights: [], size: 50, pos: 'lower', media: {src: 'fuel/fu06_surprising.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 70, kind: 'text', reveal: [2], text: 'gasoline has dropped', highlights: ['dropped'], size: 52, pos: 'lowerLeft', media: {src: 'fuel/fu07_dropped.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 70, kind: 'text', reveal: [2], text: 'for six straight weeks,', highlights: ['six'], size: 50, pos: 'upperRight', media: {src: 'fuel/fu08_sixweeks.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'yet this year’s|holiday prices', highlights: [], size: 48, pos: 'left', media: {src: 'fuel/fu09_holiday.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'are still expected|to beat', highlights: ['beat'], size: 48, pos: 'right', media: {src: 'fuel/fu10_beat.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 70, kind: 'text', reveal: [2], text: 'the previous record.', highlights: ['record.'], size: 52, pos: 'upperLeft', media: {src: 'fuel/fu11_record.jpg', type: 'img', effect: 'in'}},
  // 12 FOLLOW
  {dur: 70, kind: 'text', reveal: [2], text: 'Follow for|more updates', highlights: ['follow'], size: 50, pos: 'lowerRight', media: {src: 'fuel/fu12_follow.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'on the economy|and the everyday costs', highlights: [], size: 44, pos: 'upper', media: {src: 'fuel/fu13_costs.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'affecting|American families.', highlights: [], size: 52, pos: 'left', media: {src: 'fuel/fu14_families.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 70, kind: 'text', reveal: [2], text: 'As millions of Americans', highlights: [], size: 50, pos: 'right', media: {src: 'fuel/fu15_americans.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'prepare to travel|for Thanksgiving,', highlights: ['Thanksgiving,'], size: 48, pos: 'lowerLeft', media: {src: 'fuel/fu16_travel.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'fuel prices are moving|in the right direction.', highlights: ['right'], size: 44, pos: 'upperRight', media: {src: 'fuel/fu17_direction.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'But the relief|at the pump', highlights: ['relief'], size: 44, pos: 'left', media: {src: 'fuel/fu18_pump.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 70, kind: 'text', reveal: [2], text: 'may not be enough', highlights: [], size: 50, pos: 'lowerRight', media: {src: 'fuel/fu19_enough.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'to make this|holiday affordable.', highlights: ['affordable.'], size: 48, pos: 'upperLeft', media: {src: 'fuel/fu20_affordable.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 70, kind: 'text', reveal: [2], text: 'According to AAA,', highlights: ['AAA,'], size: 52, pos: 'right', media: {src: 'fuel/fu21_aaa.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 70, kind: 'text', reveal: [2], text: 'regular gasoline averaged', highlights: [], size: 52, pos: 'lower', media: {src: 'fuel/fu22_averaged.jpg', type: 'img', effect: 'in'}},
  // 23 CARD
  {dur: 70, kind: 'stat', stat: {prefix: '$', value: 4.01, decimals: 2, post: 'REGULAR GAS'}, media: {src: 'fuel/fu23_card401.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'per gallon|on November 9,', highlights: [], size: 48, pos: 'upperRight', media: {src: 'fuel/fu24_nov9.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'down from nearly|$4.48 in late September.', highlights: ['$4.48'], size: 44, pos: 'lowerLeft', media: {src: 'fuel/fu25_sept.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'But the highest|Thanksgiving-week average', highlights: ['highest'], size: 48, pos: 'left', media: {src: 'fuel/fu26_highest.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'in government records|was just', highlights: [], size: 48, pos: 'right', media: {src: 'fuel/fu27_records.jpg', type: 'img', effect: 'in'}},
  // 28 CARD
  {dur: 70, kind: 'stat', stat: {prefix: '$', value: 3.65, decimals: 2, post: '2022 RECORD'}, media: {src: 'fuel/fu28_card365.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 70, kind: 'text', reveal: [2], text: 'set in 2022.', highlights: ['2022.'], size: 52, pos: 'lowerRight', media: {src: 'fuel/fu29_2022.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'The latest|weekly reading was', highlights: [], size: 48, pos: 'upperLeft', media: {src: 'fuel/fu30_latest.jpg', type: 'img', effect: 'in'}},
  // 31 CARD
  {dur: 70, kind: 'stat', stat: {prefix: '$', value: 4.15, decimals: 2, post: 'LATEST WEEK'}, media: {src: 'fuel/fu31_card415.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 70, kind: 'text', reveal: [2], text: 'meaning this year’s holiday', highlights: [], size: 50, pos: 'right', media: {src: 'fuel/fu32_thisyear.jpg', type: 'img', effect: 'in'}},
  // 33
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'is still on track|to break that record.', highlights: ['break'], size: 44, pos: 'upperRight', media: {src: 'fuel/fu33_ontrack.jpg', type: 'img', effect: 'in'}},
  // 34
  {dur: 70, kind: 'text', reveal: [2], text: 'And diesel drivers', highlights: ['diesel'], size: 52, pos: 'left', media: {src: 'fuel/fu34_diesel.jpg', type: 'img', effect: 'in'}},
  // 35
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'have an even|bigger problem.', highlights: ['bigger'], size: 48, pos: 'lowerLeft', media: {src: 'fuel/fu35_bigger.jpg', type: 'img', effect: 'in'}},
  // 36
  {dur: 70, kind: 'text', reveal: [2], text: 'Prices remain', highlights: [], size: 52, pos: 'upper', media: {src: 'fuel/fu36_remain.jpg', type: 'img', effect: 'in'}},
  // 37 CARD
  {dur: 70, kind: 'stat', stat: {pre: 'ABOVE', prefix: '$', value: 6, post: 'DIESEL'}, media: {src: 'fuel/fu37_card6.jpg', type: 'img', effect: 'in'}},
  // 38
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'per gallon,|while US diesel inventories', highlights: [], size: 44, pos: 'right', media: {src: 'fuel/fu38_inventories.jpg', type: 'img', effect: 'in'}},
  // 39
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'have fallen to|their lowest level', highlights: ['lowest'], size: 44, pos: 'lowerRight', media: {src: 'fuel/fu39_lowest.jpg', type: 'img', effect: 'in'}},
  // 40
  {dur: 70, kind: 'text', reveal: [2], text: 'since 2003.', highlights: ['2003.'], size: 52, pos: 'upperLeft', media: {src: 'fuel/fu40_2003.jpg', type: 'img', effect: 'in'}},
  // 41
  {dur: 70, kind: 'text', reveal: [2], text: 'Higher fuel costs', highlights: ['costs'], size: 52, pos: 'left', media: {src: 'fuel/fu41_costs2.jpg', type: 'img', effect: 'in'}},
  // 42
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'affect more than|family road trips.', highlights: [], size: 44, pos: 'lowerRight', media: {src: 'fuel/fu42_roadtrips.jpg', type: 'img', effect: 'in'}},
  // 43
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'They increase|transportation expenses', highlights: ['transportation'], size: 50, pos: 'upperRight', media: {src: 'fuel/fu43_transport.jpg', type: 'img', effect: 'in'}},
  // 44
  {dur: 70, kind: 'text', reveal: [2], text: 'for businesses,', highlights: [], size: 52, pos: 'right', media: {src: 'fuel/fu44_businesses.jpg', type: 'img', effect: 'in'}},
  // 45
  {dur: 70, kind: 'text', reveal: [2], text: 'pushing up the cost', highlights: ['cost'], size: 50, pos: 'lowerLeft', media: {src: 'fuel/fu45_cost.jpg', type: 'img', effect: 'in'}},
  // 46
  {dur: 70, kind: 'text', reveal: [2], text: 'of moving food, products,', highlights: [], size: 50, pos: 'left', media: {src: 'fuel/fu46_food.jpg', type: 'img', effect: 'in'}},
  // 47
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'and other everyday|necessities.', highlights: ['necessities.'], size: 50, pos: 'upperRight', media: {src: 'fuel/fu47_necessities.jpg', type: 'img', effect: 'in'}},
  // 48
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'The six-week decline|offers some relief,', highlights: ['relief,'], size: 44, pos: 'lower', media: {src: 'fuel/fu48_decline.jpg', type: 'img', effect: 'in'}},
  // 49
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'but experts say|the outlook', highlights: ['experts'], size: 48, pos: 'right', media: {src: 'fuel/fu49_outlook.jpg', type: 'img', effect: 'in'}},
  // 50 RED
  {dur: 70, kind: 'impact', redBg: true, text: 'Hinges on|oil.'},
  // 51
  {dur: 70, kind: 'text', reveal: [2], text: 'and whether tensions', highlights: ['tensions'], size: 52, pos: 'upperLeft', media: {src: 'fuel/fu51_tensions.jpg', type: 'img', effect: 'in'}},
  // 52
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'in the Middle East|escalate again.', highlights: ['escalate'], size: 44, pos: 'lowerRight', media: {src: 'fuel/fu52_escalate.jpg', type: 'img', effect: 'in'}},
  // 53
  {dur: 70, kind: 'text', reveal: [2], text: 'So what do you think?', highlights: [], size: 46, pos: 'left', media: {src: 'fuel/fu53_think.jpg', type: 'img', effect: 'in'}},
  // 54
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Are falling gas prices|finally bringing relief,', highlights: ['bringing'], size: 44, pos: 'upperRight', media: {src: 'fuel/fu54_bringing.jpg', type: 'img', effect: 'in'}},
  // 55
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'or will Americans|still feel the pain', highlights: ['pain'], size: 44, pos: 'right', media: {src: 'fuel/fu55_pain.jpg', type: 'img', effect: 'in'}},
  // 56
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'at the pump|this Thanksgiving?', highlights: ['Thanksgiving?'], size: 48, pos: 'lowerLeft', media: {src: 'fuel/fu56_pumppain.jpg', type: 'img', effect: 'in'}},
  // 57 CTA
  {dur: 70, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Let me know|in the comments.', highlights: ['comments'], size: 46, media: {src: 'fuel/fu57_comments.jpg', type: 'img', effect: 'in'}},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The holiday</span>
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
export const FuelReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('fuel/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('fuel/music.mp3')}
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
