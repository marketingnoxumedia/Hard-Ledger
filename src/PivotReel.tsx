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
// "The pivot" reel (PivotReel) — Hard Ledger house VISUAL format, tech / autos / markets news topic.
// TOPIC: TESLA is WINDING DOWN CYBERTRUCK production at its Texas factory by mid-2027 to free the space for the CYBERCAB,
// its two-seat autonomous robotaxi. Unveiled 2019, Musk predicted up to 250,000 Cybertrucks a year to challenge Ford and
// GM pickups; instead Tesla sold just 20,237 in the US last year, DOWN 48% from 2024, amid recalls, high prices and
// regulatory limits abroad. The wind-down marks a major shift of factory capacity from a struggling EV pickup toward the
// ambitious robotaxi business. IMPORTANT DISTINCTION rendered in the script: this is an announced TEXAS-FACTORY wind-down,
// NOT a confirmed worldwide Cybertruck cancellation — it is unclear whether production moves elsewhere or ends. Debate:
// was the Cybertruck ahead of its time, or did Tesla misjudge truck buyers?
// NOTE ON VOICE: built VERBATIM from a client-supplied script in the influencer "curiosity-gap" format (HOOK / CURIOSITY
// GAP / EARLY CTA / CONTEXT / EVIDENCE / ESCALATION / CONSEQUENCES / CONTROVERSY / AUDIENCE DEBATE), NOT the faceless
// house voice — it names Tesla / Elon Musk / Cybertruck / Cybercab / Ford / General Motors, uses an EARLY "follow for
// more" CTA, and CLOSES on a "let me know in the comments" debate CTA. Per the saved house preference, captions are <=5-6
// words/beat with LARGER on-screen type (Anton 42-52). 52 beats. 3 stat cards: 250,000 / VEHICLES (predicted annual
// sales); 20,237 / CYBERTRUCKS (US sales last year); DOWN 48% FROM 2024 — the script's hard figures. 1 red impact at the
// CONSEQUENCES pivot ("A major / shift." — the capacity shift to robotaxi; reel closes on the comments-CTA media beat),
// no black beat. Captions match the VO verbatim (the inline "2019", "mid-2027" read as spoken). Durations/reveals/SFX
// locked to the VO via a scribe_v1 word-timestamp anchor pass (public/pivot/voiceover.mp3). Built at the house +10%
// pacing default; its own tense, forward-driving tech/autos music mixed at 0.2. OWN distinct footage under public/pivot/
// (51 stills), NO reuse of any other reel's clips (including the existing TeslaReel and the Tesla revenue reel) —
// ledger-checked.
// FOOTAGE is strictly BRAND-FREE and VEHICLE-FREE — because the reel is ABOUT specific, instantly recognizable, trademarked
// vehicles and real companies, NONE of them appear: NO Tesla / Cybertruck / Cybercab, NO the angular stainless Cybertruck
// shape or any Tesla car (Model 3/Y/S/X), NO Ford / GM / any branded pickup or car, NO visible car badge / grille / logo /
// wordmark / license plate, NO Elon Musk or any identifiable face, NO Tesla "T" logo, NO readable brand name / sign /
// screen text, NO national flag, NO identifiable currency. Metaphor-led EV / factory / autonomy / markets b-roll only:
// generic unbranded EV charging ports and cables and battery cells/modules, a generic automotive assembly line and factory
// robot arms and a stamped-metal body-in-white (no badge), an abstract self-driving / lidar / sensor-scan / HUD motif, a
// generic steering wheel or empty driver seat, an empty highway / road at night, a declining red sales chart and a down
// arrow, money / a price tag for the high prices, a gavel / regulator motif, a world map for international markets, a
// crossroads / fork / switch for the pivot, a glowing futuristic abstract for the robotaxi future, a blank-screen phone.
// **UNVERIFIED — states specific, checkable but evolving claims (the mid-2027 Texas wind-down and the Cybercab plan; the
// 2019 250k prediction; 20,237 US sales and the 48% YoY drop; recalls/prices/regulatory limits). Rendered VERBATIM as
// supplied, but every figure and claim MUST be fact-checked against primary reporting before publishing — product and
// factory plans change fast, and the script itself stresses this is a Texas wind-down, NOT a confirmed global
// cancellation. This is general information, not investment advice.**
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 76, kind: 'hook', reveal: [3, 40], text: 'Elon Musk’s|futuristic Cybertruck', kicker: 'The pivot', highlights: [], size: 54, media: {src: 'pivot/pv00_reveal.jpg', type: 'img', effect: 'in'}},
  // 1
  {dur: 49, kind: 'text', reveal: [2, 28], text: 'is facing a|major setback.', highlights: ['setback.'], size: 48, pos: 'upperRight', media: {src: 'pivot/pv01_setback.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 55, kind: 'text', reveal: [2, 28], text: 'Tesla plans to|wind down production', highlights: ['production'], size: 44, pos: 'left', media: {src: 'pivot/pv02_winddown.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 38, kind: 'text', reveal: [2], text: 'at its Texas factory', highlights: [], size: 50, pos: 'lowerRight', media: {src: 'pivot/pv03_factory.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 61, kind: 'text', reveal: [2], text: 'by mid-2027,', highlights: ['2027,'], size: 52, pos: 'upperLeft', media: {src: 'pivot/pv04_date.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 52, kind: 'text', reveal: [2, 28], text: 'just a few years|after launching', highlights: [], size: 44, pos: 'right', media: {src: 'pivot/pv05_launch.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 57, kind: 'text', reveal: [2, 28], text: 'the controversial|electric pickup.', highlights: ['controversial'], size: 50, pos: 'lower', media: {src: 'pivot/pv06_pickup.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 26, kind: 'text', reveal: [2], text: 'But here’s the twist.', highlights: [], size: 50, pos: 'upperLeft', media: {src: 'pivot/pv07_twist.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 38, kind: 'text', reveal: [2], text: 'Musk isn’t simply', highlights: [], size: 52, pos: 'upperRight', media: {src: 'pivot/pv08_notsimple.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 46, kind: 'text', reveal: [2, 28], text: 'shutting down|a production line.', highlights: ['shutting'], size: 48, pos: 'lowerLeft', media: {src: 'pivot/pv09_line.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 29, kind: 'text', reveal: [2], text: 'He’s making room', highlights: [], size: 52, pos: 'right', media: {src: 'pivot/pv10_room.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 54, kind: 'text', reveal: [2, 28], text: 'for a completely|different vehicle', highlights: ['different'], size: 48, pos: 'left', media: {src: 'pivot/pv11_vehicle.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 59, kind: 'text', reveal: [2, 28], text: 'that could define|Tesla’s future.', highlights: ['future.'], size: 48, pos: 'lowerRight', media: {src: 'pivot/pv12_future.jpg', type: 'img', effect: 'in'}},
  // 13 FOLLOW
  {dur: 39, kind: 'text', reveal: [2], text: 'Follow for|more updates', highlights: ['follow'], size: 50, pos: 'upper', media: {src: 'pivot/pv13_follow.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 82, kind: 'text', reveal: [2, 28], text: 'on the companies shaping|the future of technology.', highlights: [], size: 44, pos: 'left', media: {src: 'pivot/pv14_tech.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 69, kind: 'text', reveal: [2, 28], text: 'When the Cybertruck|was unveiled in 2019,', highlights: ['2019,'], size: 44, pos: 'right', media: {src: 'pivot/pv15_unveiled.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 66, kind: 'text', reveal: [2, 28], text: 'Musk predicted|annual sales could reach', highlights: [], size: 44, pos: 'lowerLeft', media: {src: 'pivot/pv16_predicted.jpg', type: 'img', effect: 'in'}},
  // 17 CARD
  {dur: 73, kind: 'stat', stat: {value: 250000, post: 'VEHICLES'}, media: {src: 'pivot/pv17_card250k.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 43, kind: 'text', reveal: [2], text: 'Its futuristic design', highlights: [], size: 52, pos: 'upperRight', media: {src: 'pivot/pv18_design.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 36, kind: 'text', reveal: [2], text: 'was supposed to challenge', highlights: ['challenge'], size: 50, pos: 'left', media: {src: 'pivot/pv19_challenge.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 41, kind: 'text', reveal: [2], text: 'traditional pickup makers', highlights: [], size: 52, pos: 'lowerRight', media: {src: 'pivot/pv20_makers.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 66, kind: 'text', reveal: [2], text: 'like Ford and General Motors.', highlights: [], size: 46, pos: 'upperLeft', media: {src: 'pivot/pv21_rivals.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 68, kind: 'text', reveal: [2, 28], text: 'But the numbers|tell a different story.', highlights: ['numbers'], size: 44, pos: 'right', media: {src: 'pivot/pv22_numbers.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 26, kind: 'text', reveal: [2], text: 'Tesla sold just', highlights: [], size: 52, pos: 'lower', media: {src: 'pivot/pv23_soldjust.jpg', type: 'img', effect: 'in'}},
  // 24 CARD
  {dur: 77, kind: 'stat', stat: {value: 20237, post: 'CYBERTRUCKS'}, media: {src: 'pivot/pv24_card20k.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 44, kind: 'text', reveal: [2, 28], text: 'in the United States|last year,', highlights: [], size: 44, pos: 'upperRight', media: {src: 'pivot/pv25_lastyear.jpg', type: 'img', effect: 'in'}},
  // 26 CARD
  {dur: 76, kind: 'stat', stat: {pre: 'DOWN', value: 48, suffix: '%', post: 'FROM 2024'}, media: {src: 'pivot/pv26_card48.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 60, kind: 'text', reveal: [2, 28], text: 'The truck also faced|repeated recalls,', highlights: ['recalls,'], size: 44, pos: 'lowerLeft', media: {src: 'pivot/pv27_recalls.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 26, kind: 'text', reveal: [2], text: 'high prices,', highlights: ['prices,'], size: 52, pos: 'left', media: {src: 'pivot/pv28_prices.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 43, kind: 'text', reveal: [2], text: 'and regulatory challenges', highlights: ['regulatory'], size: 52, pos: 'right', media: {src: 'pivot/pv29_regulatory.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 41, kind: 'text', reveal: [2], text: 'that limited its availability', highlights: ['limited'], size: 50, pos: 'lowerRight', media: {src: 'pivot/pv30_limited.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 38, kind: 'text', reveal: [2], text: 'in international markets.', highlights: [], size: 52, pos: 'upperLeft', media: {src: 'pivot/pv31_markets.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 37, kind: 'text', reveal: [2], text: 'Now Musk wants to use', highlights: [], size: 46, pos: 'right', media: {src: 'pivot/pv32_nowuse.jpg', type: 'img', effect: 'in'}},
  // 33
  {dur: 50, kind: 'text', reveal: [2], text: 'the Texas factory space', highlights: [], size: 50, pos: 'upperRight', media: {src: 'pivot/pv33_space.jpg', type: 'img', effect: 'in'}},
  // 34
  {dur: 63, kind: 'text', reveal: [2, 28], text: 'to increase production|of the Cybercab,', highlights: ['Cybercab,'], size: 44, pos: 'left', media: {src: 'pivot/pv34_cybercab.jpg', type: 'img', effect: 'in'}},
  // 35
  {dur: 90, kind: 'text', reveal: [2, 28], text: 'Tesla’s two-seat|autonomous robotaxi.', highlights: ['robotaxi.'], size: 50, pos: 'lowerLeft', media: {src: 'pivot/pv35_robotaxi.jpg', type: 'img', effect: 'in'}},
  // 36 RED
  {dur: 53, kind: 'impact', redBg: true, text: 'A major|shift.'},
  // 37
  {dur: 41, kind: 'text', reveal: [2], text: 'in Tesla’s priorities,', highlights: ['priorities,'], size: 52, pos: 'upper', media: {src: 'pivot/pv37_priorities.jpg', type: 'img', effect: 'in'}},
  // 38
  {dur: 60, kind: 'text', reveal: [2], text: 'moving factory capacity away', highlights: [], size: 50, pos: 'right', media: {src: 'pivot/pv38_capacity.jpg', type: 'img', effect: 'in'}},
  // 39
  {dur: 32, kind: 'text', reveal: [2], text: 'from an electric pickup', highlights: [], size: 50, pos: 'lowerRight', media: {src: 'pivot/pv39_pickup2.jpg', type: 'img', effect: 'in'}},
  // 40
  {dur: 63, kind: 'text', reveal: [2, 28], text: 'that struggled to|meet expectations', highlights: ['struggled'], size: 48, pos: 'upperLeft', media: {src: 'pivot/pv40_struggled.jpg', type: 'img', effect: 'in'}},
  // 41
  {dur: 74, kind: 'text', reveal: [2, 28], text: 'and toward its|ambitious robotaxi business.', highlights: ['ambitious'], size: 44, pos: 'left', media: {src: 'pivot/pv41_ambitious.jpg', type: 'img', effect: 'in'}},
  // 42
  {dur: 47, kind: 'text', reveal: [2, 28], text: 'But there’s an|important distinction.', highlights: ['distinction.'], size: 48, pos: 'lowerRight', media: {src: 'pivot/pv42_distinction.jpg', type: 'img', effect: 'in'}},
  // 43
  {dur: 82, kind: 'text', reveal: [2, 28], text: 'Tesla has announced|a production wind-down', highlights: [], size: 44, pos: 'upperRight', media: {src: 'pivot/pv43_announced.jpg', type: 'img', effect: 'in'}},
  // 44
  {dur: 41, kind: 'text', reveal: [2], text: 'at its Texas factory,', highlights: [], size: 50, pos: 'right', media: {src: 'pivot/pv44_factory2.jpg', type: 'img', effect: 'in'}},
  // 45
  {dur: 77, kind: 'text', reveal: [2, 28], text: 'not a confirmed|worldwide cancellation.', highlights: ['cancellation.'], size: 48, pos: 'lowerLeft', media: {src: 'pivot/pv45_cancel.jpg', type: 'img', effect: 'in'}},
  // 46
  {dur: 72, kind: 'text', reveal: [2, 28], text: 'It’s still unclear|whether production', highlights: ['unclear'], size: 48, pos: 'left', media: {src: 'pivot/pv46_unclear.jpg', type: 'img', effect: 'in'}},
  // 47
  {dur: 89, kind: 'text', reveal: [2, 28], text: 'will move elsewhere|or end entirely.', highlights: ['entirely.'], size: 44, pos: 'upperRight', media: {src: 'pivot/pv47_entirely.jpg', type: 'img', effect: 'in'}},
  // 48
  {dur: 30, kind: 'text', reveal: [2], text: 'So what do you think?', highlights: [], size: 46, pos: 'lower', media: {src: 'pivot/pv48_think.jpg', type: 'img', effect: 'in'}},
  // 49
  {dur: 80, kind: 'text', reveal: [2, 28], text: 'Was the Cybertruck|ahead of its time,', highlights: ['ahead'], size: 44, pos: 'right', media: {src: 'pivot/pv49_ahead.jpg', type: 'img', effect: 'in'}},
  // 50
  {dur: 72, kind: 'text', reveal: [2, 28], text: 'or did Tesla|completely misjudge', highlights: ['misjudge'], size: 48, pos: 'upperLeft', media: {src: 'pivot/pv50_misjudge.jpg', type: 'img', effect: 'in'}},
  // 51
  {dur: 56, kind: 'text', reveal: [2, 28], text: 'what truck buyers|actually wanted?', highlights: ['wanted?'], size: 48, pos: 'lowerRight', media: {src: 'pivot/pv51_buyers.jpg', type: 'img', effect: 'in'}},
  // 52 CTA
  {dur: 38, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Let me know|in the comments.', highlights: ['comments'], size: 46, media: {src: 'pivot/pv52_comments.jpg', type: 'img', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 896, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1249, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1370, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1894, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 2863, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The pivot</span>
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
export const PivotReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('pivot/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('pivot/music.mp3')}
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
