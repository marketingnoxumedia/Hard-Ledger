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
// "The record" reel (RecordReel) — Hard Ledger house VISUAL format, cars / EV / technology news topic.
// TOPIC: an ELECTRIC car just crossed 500 KM/H — and it wasn't Tesla. It was China's BYD, whose luxury brand Yangwang
// built a high-performance electric hypercar, the YANGWANG U9 XTREME, to push EV tech to its limits. On November 1, 2026,
// German racing driver MARC BASSENG took it to 503.17 KM/H on a closed road in Abu Dhabi. The FIA recognized the run and
// Guinness World Records awarded two records — highest single-direction speed by a production car, and by an electric
// production car. The machine makes MORE THAN 3,000 HORSEPOWER through four electric motors on a 1,200-VOLT architecture.
// The subtext: Chinese automakers are no longer competing only on affordable EVs — they're challenging the world's most
// exclusive performance brands. Important distinction: this was a SINGLE-DIRECTION record, not the traditional two-way
// average used for some production-car records. Debate: are electric cars the future of hypercars, or will gasoline
// machines always own the top?
// NOTE ON VOICE: built VERBATIM from a client-supplied script in the influencer "curiosity-gap" format (HOOK / CURIOSITY
// GAP / EARLY CTA / CONTEXT / EVIDENCE / ESCALATION / CONSEQUENCES / CONTROVERSY / AUDIENCE DEBATE), NOT the faceless
// house voice — it names BYD / Yangwang U9 Xtreme / Tesla / Marc Basseng / FIA / Guinness / Abu Dhabi / China, uses an
// EARLY "follow for more" CTA, and CLOSES on a "let me know in the comments" debate CTA. Per the saved house preference,
// captions are <=5-6 words/beat with LARGER on-screen type (Anton 42-52). 53 beats. 3 stat cards: 503.17 / KM/H (the
// record speed); MORE THAN / 3,000 / HORSEPOWER (the output); 1,200 / VOLT ARCHITECTURE (the electrical system) — the
// script's hard figures. 1 red impact at the SIGNIFICANCE pivot ("A different / conversation." — what the run really
// signals), no black beat. Captions match the VO verbatim. Durations/reveals/SFX locked to the VO via a scribe_v1
// word-timestamp anchor pass (public/record/voiceover.mp3). Built at the house +10% pacing default; its own driving,
// high-energy automotive/tech music mixed at 0.2. OWN distinct footage under public/record/ (52 stills), NO reuse of any
// other reel's clips — ledger-checked.
// FOOTAGE is strictly BRAND-FREE and VEHICLE-FREE — because the reel names real companies, a real car, places and a real
// driver, NONE of their assets appear: NO BYD / Yangwang / Tesla badge, logo, wordmark or recognizable car, NO license
// plate, NO China / UAE flag, NO identifiable Abu Dhabi skyline or landmark, NO real driver / person or any identifiable
// face, NO readable brand name / sign / screen text. Metaphor-led speed / racing / EV / power / record b-roll only:
// generic unbranded motion-blur light trails and speed streaks, an empty race track / tarmac, a speedometer / dashboard
// dial, tire-smoke and burnout abstracts, EV battery / charging / cabling and electric-motor abstracts, high-voltage power
// and electrical-glow abstracts for the volt/horsepower cards, a desert road / tarmac for Abu Dhabi, a trophy / podium /
// a checkered-flag abstract for the records, a world / Asia map motif for China, a crossroads for the EV-vs-gas debate,
// a blank-screen phone for the CTAs. **UNVERIFIED — states specific, checkable claims (the 503.17 km/h run, the date, the
// driver, FIA/Guinness recognition, the horsepower and voltage figures). Rendered VERBATIM as supplied, but every figure
// and claim MUST be fact-checked against primary reporting before publishing — records and specs are easy to mis-state.
// This is general information, not investment advice.**
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 57, kind: 'hook', reveal: [3, 40], text: 'An electric car|just crossed', kicker: 'The record', highlights: [], size: 52, media: {src: 'record/rc00_crossed.jpg', type: 'img', effect: 'in'}},
  // 1
  {dur: 46, kind: 'text', reveal: [2, 28], text: '500 kilometers|per hour.', highlights: ['500'], size: 50, pos: 'upperRight', media: {src: 'record/rc01_500.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 52, kind: 'text', reveal: [2], text: 'And it wasn’t Tesla.', highlights: ['Tesla.'], size: 50, pos: 'left', media: {src: 'record/rc02_nottesla.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 70, kind: 'text', reveal: [2], text: 'It was China’s BYD,', highlights: ['BYD,'], size: 50, pos: 'lowerRight', media: {src: 'record/rc03_byd.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 32, kind: 'text', reveal: [2], text: 'with a hypercar', highlights: ['hypercar'], size: 52, pos: 'upperLeft', media: {src: 'record/rc04_hypercar.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 76, kind: 'text', reveal: [2, 28], text: 'that just made|automotive history.', highlights: ['history.'], size: 48, pos: 'right', media: {src: 'record/rc05_history.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 82, kind: 'text', reveal: [2, 28], text: 'But here’s what makes this|even more impressive:', highlights: [], size: 44, pos: 'lower', media: {src: 'record/rc06_impressive.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 36, kind: 'text', reveal: [2], text: 'it didn’t just beat', highlights: [], size: 50, pos: 'upperLeft', media: {src: 'record/rc07_beat.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 74, kind: 'text', reveal: [2, 28], text: 'the previous|electric car record.', highlights: ['record.'], size: 48, pos: 'upperRight', media: {src: 'record/rc08_record.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 53, kind: 'text', reveal: [2], text: 'It crossed a speed barrier', highlights: ['barrier'], size: 46, pos: 'lowerLeft', media: {src: 'record/rc09_barrier.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 38, kind: 'text', reveal: [2], text: 'that production cars', highlights: [], size: 52, pos: 'right', media: {src: 'record/rc10_production.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 75, kind: 'text', reveal: [2, 28], text: 'have struggled to reach|for decades.', highlights: ['decades.'], size: 44, pos: 'left', media: {src: 'record/rc11_decades.jpg', type: 'img', effect: 'in'}},
  // 12 FOLLOW
  {dur: 56, kind: 'text', reveal: [2], text: 'Follow for more|incredible stories', highlights: ['follow'], size: 48, pos: 'lowerRight', media: {src: 'record/rc12_follow.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 48, kind: 'text', reveal: [2], text: 'about cars and technology.', highlights: [], size: 50, pos: 'upper', media: {src: 'record/rc13_tech.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 110, kind: 'text', reveal: [2, 28], text: 'The car is the|Yangwang U9 Xtreme,', highlights: [], size: 44, pos: 'left', media: {src: 'record/rc14_u9.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 82, kind: 'text', reveal: [2, 28], text: 'a high-performance|electric hypercar', highlights: ['performance'], size: 50, pos: 'right', media: {src: 'record/rc15_perf.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 82, kind: 'text', reveal: [2, 28], text: 'developed by|BYD’s luxury brand.', highlights: ['luxury'], size: 48, pos: 'lowerLeft', media: {src: 'record/rc16_luxury.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 39, kind: 'text', reveal: [2], text: 'It was built to push', highlights: ['push'], size: 46, pos: 'upperRight', media: {src: 'record/rc17_push.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 54, kind: 'text', reveal: [2], text: 'electric vehicle technology', highlights: [], size: 52, pos: 'left', media: {src: 'record/rc18_evtech.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 50, kind: 'text', reveal: [2], text: 'to its absolute limits.', highlights: ['limits.'], size: 50, pos: 'lowerRight', media: {src: 'record/rc19_limits.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 61, kind: 'text', reveal: [2], text: 'On November 1, 2026,', highlights: ['2026,'], size: 50, pos: 'upperLeft', media: {src: 'record/rc20_date.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'German racing driver|Marc Basseng', highlights: [], size: 48, pos: 'right', media: {src: 'record/rc21_driver.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 30, kind: 'text', reveal: [2], text: 'took the car to', highlights: [], size: 50, pos: 'lower', media: {src: 'record/rc22_took.jpg', type: 'img', effect: 'in'}},
  // 23 CARD
  {dur: 88, kind: 'stat', stat: {value: 503.17, decimals: 2, post: 'KM/H'}, media: {src: 'record/rc23_card503.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 56, kind: 'text', reveal: [2, 28], text: 'on a closed road|in Abu Dhabi.', highlights: ['Dhabi.'], size: 44, pos: 'upperRight', media: {src: 'record/rc24_abudhabi.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 85, kind: 'text', reveal: [2, 28], text: 'The FIA officially|recognized the achievement,', highlights: ['FIA'], size: 44, pos: 'lowerLeft', media: {src: 'record/rc25_fia.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 42, kind: 'text', reveal: [2], text: 'while Guinness World Records', highlights: ['Guinness'], size: 50, pos: 'left', media: {src: 'record/rc26_guinness.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 51, kind: 'text', reveal: [2], text: 'awarded it two records', highlights: ['two'], size: 50, pos: 'right', media: {src: 'record/rc27_tworecords.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 63, kind: 'text', reveal: [2, 28], text: 'for the highest|single-direction speed', highlights: ['highest'], size: 48, pos: 'lowerRight', media: {src: 'record/rc28_speed.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 57, kind: 'text', reveal: [2], text: 'achieved by a production car', highlights: [], size: 46, pos: 'upperLeft', media: {src: 'record/rc29_prodcar.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 61, kind: 'text', reveal: [2, 28], text: 'and an electric|production car.', highlights: [], size: 48, pos: 'right', media: {src: 'record/rc30_evprod.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 29, kind: 'text', reveal: [2], text: 'The machine produces', highlights: ['machine'], size: 52, pos: 'upperRight', media: {src: 'record/rc31_machine.jpg', type: 'img', effect: 'in'}},
  // 32 CARD
  {dur: 70, kind: 'stat', stat: {pre: 'MORE THAN', value: 3000, post: 'HORSEPOWER'}, media: {src: 'record/rc32_card3000.jpg', type: 'img', effect: 'in'}},
  // 33
  {dur: 55, kind: 'text', reveal: [2, 28], text: 'through four|electric motors', highlights: ['four'], size: 50, pos: 'left', media: {src: 'record/rc33_motors.jpg', type: 'img', effect: 'in'}},
  // 34
  {dur: 58, kind: 'text', reveal: [2], text: 'and uses a', highlights: [], size: 52, pos: 'lowerLeft', media: {src: 'record/rc34_uses.jpg', type: 'img', effect: 'in'}},
  // 35 CARD
  {dur: 40, kind: 'stat', stat: {value: 1200, post: 'VOLT ARCHITECTURE'}, media: {src: 'record/rc35_card1200.jpg', type: 'img', effect: 'in'}},
  // 36
  {dur: 67, kind: 'text', reveal: [2, 28], text: 'to handle its|extreme performance.', highlights: ['extreme'], size: 48, pos: 'upper', media: {src: 'record/rc36_extreme.jpg', type: 'img', effect: 'in'}},
  // 37
  {dur: 61, kind: 'text', reveal: [2], text: 'This achievement puts BYD', highlights: [], size: 50, pos: 'right', media: {src: 'record/rc37_byd2.jpg', type: 'img', effect: 'in'}},
  // 38 RED
  {dur: 49, kind: 'impact', redBg: true, text: 'A different|conversation.'},
  // 39
  {dur: 78, kind: 'text', reveal: [2, 28], text: 'Chinese automakers|are no longer competing', highlights: ['automakers'], size: 44, pos: 'lowerRight', media: {src: 'record/rc39_automakers.jpg', type: 'img', effect: 'in'}},
  // 40
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'only on affordable|electric vehicles.', highlights: ['affordable'], size: 48, pos: 'upperLeft', media: {src: 'record/rc40_affordable.jpg', type: 'img', effect: 'in'}},
  // 41
  {dur: 28, kind: 'text', reveal: [2], text: 'They’re challenging', highlights: ['challenging'], size: 52, pos: 'left', media: {src: 'record/rc41_challenging.jpg', type: 'img', effect: 'in'}},
  // 42
  {dur: 96, kind: 'text', reveal: [2, 28], text: 'the world’s most|exclusive performance brands.', highlights: ['exclusive'], size: 44, pos: 'lowerRight', media: {src: 'record/rc42_exclusive.jpg', type: 'img', effect: 'in'}},
  // 43
  {dur: 53, kind: 'text', reveal: [2, 28], text: 'But there’s an|important distinction.', highlights: ['distinction.'], size: 48, pos: 'upperRight', media: {src: 'record/rc43_distinction.jpg', type: 'img', effect: 'in'}},
  // 44
  {dur: 78, kind: 'text', reveal: [2, 28], text: 'This was a|single-direction record,', highlights: ['single-direction'], size: 48, pos: 'right', media: {src: 'record/rc44_singledir.jpg', type: 'img', effect: 'in'}},
  // 45
  {dur: 65, kind: 'text', reveal: [2, 28], text: 'not the traditional|two-way average', highlights: ['two-way'], size: 48, pos: 'lowerLeft', media: {src: 'record/rc45_twoway.jpg', type: 'img', effect: 'in'}},
  // 46
  {dur: 61, kind: 'text', reveal: [2, 28], text: 'used for some|production-car records.', highlights: [], size: 48, pos: 'left', media: {src: 'record/rc46_records.jpg', type: 'img', effect: 'in'}},
  // 47
  {dur: 26, kind: 'text', reveal: [2], text: 'So what do you think?', highlights: [], size: 46, pos: 'upperRight', media: {src: 'record/rc47_think.jpg', type: 'img', effect: 'in'}},
  // 48
  {dur: 53, kind: 'text', reveal: [2, 28], text: 'Is this proof|electric cars', highlights: ['proof'], size: 48, pos: 'lower', media: {src: 'record/rc48_proof.jpg', type: 'img', effect: 'in'}},
  // 49
  {dur: 53, kind: 'text', reveal: [2, 28], text: 'are the future|of hypercars,', highlights: ['future'], size: 48, pos: 'right', media: {src: 'record/rc49_future.jpg', type: 'img', effect: 'in'}},
  // 50
  {dur: 46, kind: 'text', reveal: [2], text: 'or will gasoline machines', highlights: ['gasoline'], size: 50, pos: 'upperLeft', media: {src: 'record/rc50_gasoline.jpg', type: 'img', effect: 'in'}},
  // 51
  {dur: 60, kind: 'text', reveal: [2, 28], text: 'always have a special|place at the top?', highlights: ['top?'], size: 44, pos: 'lowerRight', media: {src: 'record/rc51_top.jpg', type: 'img', effect: 'in'}},
  // 52 CTA
  {dur: 38, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Let me know|in the comments.', highlights: ['comments'], size: 46, media: {src: 'record/rc52_comments.jpg', type: 'img', effect: 'in'}},
];


type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 1373, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1905, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 2088, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 2256, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 3072, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The record</span>
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
export const RecordReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('record/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('record/music.mp3')}
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
