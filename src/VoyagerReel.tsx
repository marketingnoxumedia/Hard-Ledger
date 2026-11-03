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
// "The signal" reel (VoyagerReel) — Hard Ledger house VISUAL format, space / science / NASA news topic.
// TOPIC: NASA's Voyager 1 nearing a distance of ONE LIGHT-DAY. Launched 1977, Voyager 1 travels interstellar space at
// ~38,000 mph and is the farthest human-made object from Earth; on Nov 18, 2026 it is expected to reach one light-day
// (~16.09 billion miles) — so a command from Earth takes 24h to arrive and 24h for a reply, a 48-HOUR round trip. The
// tension: NASA briefly lost contact for 48 hours; the craft's power supply is slowly declining (~4 watts/year), and
// engineers ran a complex energy-saving upgrade (the "Big Bang") to keep its instruments alive as long as possible.
// Still, Voyager 1 explores a region no other spacecraft has directly investigated and keeps sending science home.
// Debate: how much longer can it keep going?
// NOTE ON VOICE: built VERBATIM from a client-supplied script in the influencer "curiosity-gap" format (HOOK / CURIOSITY
// GAP / CONTEXT / THE REVEAL / THE PROBLEM / THE BIGGER PICTURE / CTA — this one has NO early "follow" CTA), NOT the
// faceless house voice — it names NASA / Voyager 1 and CLOSES on a "let us know in the comments" debate CTA. Per the
// saved house preference, captions are <=5-6 words/beat with LARGER on-screen type (Anton 42-52). 54 beats. 3 stat
// cards: TRAVELING AT / 38,000 / MPH; ROUGHLY / 16.09 / BILLION MILES; A / 48 / HOUR ROUND TRIP. 1 red impact near the
// tail ("Becoming increasingly / difficult." — the power/contact problem; reel closes on the comments-CTA media beat),
// no black beat. Captions match the VO verbatim (hero figures are the 3 cards; minor inline numbers 1977 / 24 hours /
// 4 watts / Nov 18 2026 read as spoken). Durations/reveals/SFX locked to the VO via a scribe_v1 word-timestamp anchor
// pass (public/voyager/voiceover.mp3). Built at the house +10% pacing default; its own vast, cinematic cosmic music
// mixed at 0.2. OWN distinct footage under public/voyager/ (53 stills), NO reuse of any other reel's clips — ledger-checked.
// FOOTAGE is strictly BRAND-FREE and GENERIC — because the reel names NASA and a real mission, NONE of their assets
// appear: NO NASA logo / "meatball" / insignia / wordmark, NO ESA/JPL or any space-agency marking, NO identifiable
// Voyager spacecraft with mission decals, NO readable mission text/telemetry, NO identifiable faces, NO flags, NO brand
// logos. Metaphor-led deep-space / science b-roll only: star fields and the Milky Way, nebulae and galaxies, the deep
// black void, a generic unmarked probe / satellite / antenna silhouette, radio dishes and dish arrays, abstract light
// beams and signal/data streams, a distant Sun, generic gas-giant and rocky planets (not identifiable real-photo NASA
// imagery with captions), a clock / hourglass for the time delay, abstract electronics / circuit boards for aging
// equipment, a battery / power motif for fading power, Earth from a distance (used sparingly). **UNVERIFIED — states
// specific, checkable but evolving claims (the Nov 18 2026 one-light-day date; ~16.09 billion miles; ~38,000 mph; the
// 48-hour lost-contact and round-trip; ~4 watts/year decline; the "Big Bang" energy-saving upgrade). Rendered VERBATIM
// as supplied, but every figure, date and claim MUST be fact-checked against NASA/JPL's own Voyager updates before
// publishing — mission status changes over time. This is general information, not scientific or engineering advice.**
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 82, kind: 'hook', reveal: [3, 40], text: 'NASA’s Voyager 1|is about to reach', kicker: 'The signal', highlights: [], size: 48, media: {src: 'voyager/vy00_voyager.jpg', type: 'img', effect: 'in'}},
  // 1
  {dur: 48, kind: 'text', reveal: [2], text: 'a distance so enormous', highlights: ['enormous'], size: 50, pos: 'upperRight', media: {src: 'voyager/vy01_distance.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 56, kind: 'text', reveal: [2, 28], text: 'that even a message|from Earth', highlights: [], size: 44, pos: 'left', media: {src: 'voyager/vy02_message.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'will take an entire day|to get there.', highlights: ['day'], size: 44, pos: 'lowerRight', media: {src: 'voyager/vy03_entireday.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 61, kind: 'text', reveal: [2, 28], text: 'And the spacecraft|is still running,', highlights: ['running,'], size: 44, pos: 'upperLeft', media: {src: 'voyager/vy04_running.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 64, kind: 'text', reveal: [2], text: 'nearly 50 years after launch.', highlights: ['50'], size: 46, pos: 'right', media: {src: 'voyager/vy05_launch.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 74, kind: 'text', reveal: [2, 28], text: 'But here’s what’s|even more incredible.', highlights: ['incredible.'], size: 44, pos: 'lower', media: {src: 'voyager/vy06_incredible.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 60, kind: 'text', reveal: [2], text: 'NASA recently lost contact', highlights: ['lost'], size: 50, pos: 'upperLeft', media: {src: 'voyager/vy07_lostcontact.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 76, kind: 'text', reveal: [2], text: 'with Voyager 1 for 48 hours.', highlights: [], size: 42, pos: 'upperRight', media: {src: 'voyager/vy08_48hours.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 55, kind: 'text', reveal: [2], text: 'And engineers are now racing', highlights: ['racing'], size: 46, pos: 'lowerLeft', media: {src: 'voyager/vy09_racing.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 57, kind: 'text', reveal: [2], text: 'to keep the spacecraft alive', highlights: ['alive'], size: 46, pos: 'right', media: {src: 'voyager/vy10_alive.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 72, kind: 'text', reveal: [2, 28], text: 'as its power supply|slowly fades.', highlights: ['fades.'], size: 44, pos: 'left', media: {src: 'voyager/vy11_powerfades.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 78, kind: 'text', reveal: [2], text: 'Launched in 1977,', highlights: [], size: 52, pos: 'lowerRight', media: {src: 'voyager/vy12_1977.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 64, kind: 'text', reveal: [2, 28], text: 'Voyager 1 is traveling|through interstellar space', highlights: ['interstellar'], size: 44, pos: 'upper', media: {src: 'voyager/vy13_interstellar.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 65, kind: 'text', reveal: [2], text: 'at approximately', highlights: [], size: 52, pos: 'left', media: {src: 'voyager/vy14_approximately.jpg', type: 'img', effect: 'in'}},
  // 15 CARD
  {dur: 40, kind: 'stat', stat: {pre: 'TRAVELING AT', value: 38000, post: 'MPH'}, media: {src: 'voyager/vy15_card38k.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 49, kind: 'text', reveal: [2, 28], text: 'It’s already|farther from Earth', highlights: [], size: 48, pos: 'right', media: {src: 'voyager/vy16_farther.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 64, kind: 'text', reveal: [2, 28], text: 'than any other|human-made object.', highlights: ['human-made'], size: 48, pos: 'lowerLeft', media: {src: 'voyager/vy17_object.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 77, kind: 'text', reveal: [2], text: 'And on November 18, 2026,', highlights: [], size: 46, pos: 'upperRight', media: {src: 'voyager/vy18_date.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 100, kind: 'text', reveal: [2, 28], text: 'it’s expected to reach|a distance of one light-day.', highlights: ['light-day.'], size: 44, pos: 'left', media: {src: 'voyager/vy19_lightday.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 77, kind: 'text', reveal: [2], text: 'That’s approximately', highlights: [], size: 52, pos: 'lowerRight', media: {src: 'voyager/vy20_thatsapprox.jpg', type: 'img', effect: 'in'}},
  // 21 CARD
  {dur: 54, kind: 'stat', stat: {pre: 'ROUGHLY', value: 16.09, decimals: 2, post: 'BILLION MILES'}, media: {src: 'voyager/vy21_card1609.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 80, kind: 'text', reveal: [2, 28], text: 'But what does one light-day|actually mean?', highlights: ['mean?'], size: 44, pos: 'upperLeft', media: {src: 'voyager/vy22_whatmean.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 66, kind: 'text', reveal: [2], text: 'It means light itself', highlights: ['light'], size: 50, pos: 'right', media: {src: 'voyager/vy23_lightitself.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 32, kind: 'text', reveal: [2], text: 'takes 24 hours to travel', highlights: [], size: 46, pos: 'lower', media: {src: 'voyager/vy24_24hours.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 61, kind: 'text', reveal: [2], text: 'from Earth to Voyager 1.', highlights: [], size: 46, pos: 'upperRight', media: {src: 'voyager/vy25_earthtovoyager.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 74, kind: 'text', reveal: [2, 28], text: 'So if NASA sends|a command today,', highlights: ['command'], size: 44, pos: 'lowerLeft', media: {src: 'voyager/vy26_command.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 95, kind: 'text', reveal: [2, 28], text: 'it takes an entire day|to reach the spacecraft.', highlights: [], size: 44, pos: 'left', media: {src: 'voyager/vy27_reachspacecraft.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 44, kind: 'text', reveal: [2], text: 'And when Voyager responds?', highlights: ['responds?'], size: 50, pos: 'right', media: {src: 'voyager/vy28_responds.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 38, kind: 'text', reveal: [2], text: 'Another 24 hours.', highlights: [], size: 52, pos: 'lowerRight', media: {src: 'voyager/vy29_another24.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 27, kind: 'text', reveal: [2], text: 'That’s a', highlights: [], size: 52, pos: 'upperLeft', media: {src: 'voyager/vy30_thatsa.jpg', type: 'img', effect: 'in'}},
  // 31 CARD
  {dur: 40, kind: 'stat', stat: {pre: 'A', value: 48, post: 'HOUR ROUND TRIP'}, media: {src: 'voyager/vy31_card48.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 26, kind: 'text', reveal: [2], text: 'just to communicate.', highlights: ['communicate.'], size: 52, pos: 'right', media: {src: 'voyager/vy32_communicate.jpg', type: 'img', effect: 'in'}},
  // 33
  {dur: 64, kind: 'text', reveal: [2], text: 'And keeping Voyager alive is', highlights: [], size: 46, pos: 'upperRight', media: {src: 'voyager/vy33_keepingalive.jpg', type: 'img', effect: 'in'}},
  // 34 RED
  {dur: 71, kind: 'impact', redBg: true, text: 'Becoming increasingly|difficult.'},
  // 35
  {dur: 97, kind: 'text', reveal: [2, 28], text: 'Its power supply|is slowly declining,', highlights: ['declining,'], size: 44, pos: 'left', media: {src: 'voyager/vy35_declining.jpg', type: 'img', effect: 'in'}},
  // 36
  {dur: 113, kind: 'text', reveal: [2, 28], text: 'losing around 4 watts|of electricity every year.', highlights: ['4'], size: 44, pos: 'lowerLeft', media: {src: 'voyager/vy36_4watts.jpg', type: 'img', effect: 'in'}},
  // 37
  {dur: 80, kind: 'text', reveal: [2, 28], text: 'So NASA engineers|recently carried out', highlights: [], size: 44, pos: 'upper', media: {src: 'voyager/vy37_engineers.jpg', type: 'img', effect: 'in'}},
  // 38
  {dur: 80, kind: 'text', reveal: [2], text: 'a complex energy-saving upgrade', highlights: ['energy-saving'], size: 50, pos: 'right', media: {src: 'voyager/vy38_upgrade.jpg', type: 'img', effect: 'in'}},
  // 39
  {dur: 41, kind: 'text', reveal: [2], text: 'called the Big Bang.', highlights: ['big'], size: 50, pos: 'lowerRight', media: {src: 'voyager/vy39_bigbang.jpg', type: 'img', effect: 'in'}},
  // 40
  {dur: 23, kind: 'text', reveal: [2], text: 'The goal?', highlights: ['goal?'], size: 52, pos: 'upperLeft', media: {src: 'voyager/vy40_goal.jpg', type: 'img', effect: 'in'}},
  // 41
  {dur: 117, kind: 'text', reveal: [2, 28], text: 'Keep Voyager’s remaining|scientific instruments running', highlights: ['scientific'], size: 44, pos: 'left', media: {src: 'voyager/vy41_instruments.jpg', type: 'img', effect: 'in'}},
  // 42
  {dur: 43, kind: 'text', reveal: [2], text: 'for as long as possible.', highlights: ['possible.'], size: 46, pos: 'lowerRight', media: {src: 'voyager/vy42_aslong.jpg', type: 'img', effect: 'in'}},
  // 43
  {dur: 132, kind: 'text', reveal: [2, 28], text: 'And here’s what makes|this mission so extraordinary.', highlights: ['extraordinary.'], size: 44, pos: 'upperRight', media: {src: 'voyager/vy43_extraordinary.jpg', type: 'img', effect: 'in'}},
  // 44
  {dur: 65, kind: 'text', reveal: [2, 28], text: 'Voyager 1 is exploring|a region of space', highlights: [], size: 44, pos: 'right', media: {src: 'voyager/vy44_region.jpg', type: 'img', effect: 'in'}},
  // 45
  {dur: 129, kind: 'text', reveal: [2, 28], text: 'that no other spacecraft|has directly investigated.', highlights: ['investigated.'], size: 44, pos: 'lowerLeft', media: {src: 'voyager/vy45_investigated.jpg', type: 'img', effect: 'in'}},
  // 46
  {dur: 54, kind: 'text', reveal: [2], text: 'Even with fading power,', highlights: ['fading'], size: 50, pos: 'left', media: {src: 'voyager/vy46_fadingpower.jpg', type: 'img', effect: 'in'}},
  // 47
  {dur: 34, kind: 'text', reveal: [2], text: 'aging equipment,', highlights: ['aging'], size: 52, pos: 'upperRight', media: {src: 'voyager/vy47_aging.jpg', type: 'img', effect: 'in'}},
  // 48
  {dur: 56, kind: 'text', reveal: [2, 28], text: 'and mysterious|technical problems,', highlights: ['mysterious'], size: 50, pos: 'lower', media: {src: 'voyager/vy48_mysterious.jpg', type: 'img', effect: 'in'}},
  // 49
  {dur: 92, kind: 'text', reveal: [2, 28], text: 'it’s still sending|valuable scientific information', highlights: ['valuable'], size: 44, pos: 'right', media: {src: 'voyager/vy49_sending.jpg', type: 'img', effect: 'in'}},
  // 50
  {dur: 28, kind: 'text', reveal: [2], text: 'back to Earth.', highlights: ['earth.'], size: 52, pos: 'upperLeft', media: {src: 'voyager/vy50_backtoearth.jpg', type: 'img', effect: 'in'}},
  // 51
  {dur: 29, kind: 'text', reveal: [2], text: 'So what do you think?', highlights: [], size: 46, pos: 'lowerRight', media: {src: 'voyager/vy51_think.jpg', type: 'img', effect: 'in'}},
  // 52
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'How much longer can|Voyager 1 keep going?', highlights: ['going?'], size: 44, pos: 'left', media: {src: 'voyager/vy52_howlonger.jpg', type: 'img', effect: 'in'}},
  // 53 CTA
  {dur: 38, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Let us know|in the comments.', highlights: ['comments'], size: 46, media: {src: 'voyager/vy53_comments.jpg', type: 'img', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 982, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1389, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1960, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 2090, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 3444, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The signal</span>
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
export const VoyagerReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('voyager/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('voyager/music.mp3')}
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
