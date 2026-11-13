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
};

// ---------------------------------------------------------------------------
// "The drop" reel (DropReel) — fast NEWS reel, Hard Ledger house format.
// TOPIC: how Hoover Dam loses ~3/4 of its power while the river still flows through it.
// Thesis: capacity fell from ~1,191 MW (last month) to a federal forecast of ~317 MW next April — a ~73%
// cut — because 12 of 17 turbines were built for a lake at ~1,200 ft; Lake Mead sits at ~1,037.4 ft and
// below ~1,035 ft those 12 cavitate (water vaporises and sandblasts the blades). Only 5 units run below
// the line and one is broken, so 4. The lake is ~2.4 ft above the line; forecasts cross it ~Nov 2026
// (dry: Halloween) and don't recover before Sept 2028; ~$52M of new turbines won't arrive till 2028-2031.
// Mechanic: a dam sells HEIGHT, not water — power = how far the water falls (full ~590 ft of head, today
// ~391 ft); lose the drop, lose the power even at the same flow. The lights stay on because utilities buy
// the missing power on the open market — it shows up on the bill. Payoff: Hoover isn't running out of
// water, it's running out of GRAVITY. Full QUESTION/STORY/ANSWER/CTA with a ~1.1s post-hook pause; close
// is the CTA as the house rhetorical question ("Do you live on Hoover's power?"). 44 beats: 37 media
// (incl. 4 cards: 1,191 MW -> 317 MW / -73%; LAKE 1,037.4 / LINE 1,035 / BELOW IT 4 OF 17; CROSSES NOV
// 2026 / BACK ABOVE 2028+ / NEW UNITS 2028-31; DROP 590 FT -> 391 FT) / 1 red impact ("It's running out
// of gravity.") mid-tail / 2 black. Captions match the VO verbatim (except the stylized number cards).
// Durations / reveals / SFX locked to the VO via a scribe_v1 word-timestamp anchor pass
// (public/drop/voiceover.mp3, ~109.5s incl. the pause).
// NB: OWN distinct footage under public/drop/, NO reuse of any other reel's clips.
// FOOTAGE is BRAND-FREE and FACE-FREE — generic hydro/infrastructure/landscape b-roll: concrete dams,
// spillways, turbine halls / generators, penstocks, reservoirs with low-water "bathtub" rings, rivers,
// waterfalls, transmission lines, desert, dry cracked earth, control rooms, calendars, charts, a utility
// bill / electric meter, a night desert-city skyline. NO company/utility logos, NO readable signage, NO
// identifiable faces, NO foreign text, NO national flags, NO casino/hotel brands in the city skyline.
// **UNVERIFIED — asserts specific, checkable engineering/forecast figures; render as written but FACT-
// CHECK before publishing:** the ~1,191 MW last month / ~317 MW next-April forecast / ~73% cut; "12 of 17
// turbines built for ~1,200 ft"; Lake Mead ~1,037.4 ft and the ~1,035 ft cavitation line; "5 units below,
// 1 broken, so 4"; the ~2.4 ft margin and the Nov-2026 / Halloween / Sept-2028 crossing dates; ~$52M new
// turbines (2028-2031); and the ~590 ft -> ~391 ft head figures. The "sells height / running out of
// gravity / the physics moved" framing is editorial analysis.
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK (held through ~1.1s post-hook pause)
  {dur: 214, kind: 'hook', reveal: [3, 60, 120], text: 'How does America’s most famous dam|lose three-quarters of its power|while water still flows through it?', kicker: 'The drop', highlights: ['three-quarters'], size: 32, media: {src: 'drop/dp00_dam.mp4', type: 'video', effect: 'in'}},
  // 1
  {dur: 26, kind: 'text', reveal: [2], text: 'Hoover Dam.', highlights: [], size: 58, media: {src: 'drop/dp01_damface.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 44, kind: 'text', reveal: [2, 22], text: 'Seventeen|turbines.', highlights: ['Seventeen'], size: 50, media: {src: 'drop/dp02_turbinehall.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 138, kind: 'text', reveal: [2, 70], text: 'Capacity last month:|1,191 megawatts.', highlights: ['1,191'], size: 38, media: {src: 'drop/dp03_generators.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 94, kind: 'text', reveal: [2, 48], text: 'The federal forecast for next April:|317.', highlights: ['317.'], size: 36, media: {src: 'drop/dp04_forecast.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 50, kind: 'text', reveal: [2, 26], text: 'Same dam.|Same river.', highlights: ['river.'], size: 48, media: {src: 'drop/dp05_damriver.mp4', type: 'video', effect: 'in'}},
  // 6 CARD 1
  {dur: 40, kind: 'lines', reveal: [0, 40], text: '1,191 MW → 317 MW|−73%', highlights: ['−73%'], media: {src: 'drop/dp06_powerplant.jpg', type: 'img', effect: 'in'}},
  // 7 BLACK
  {dur: 71, kind: 'text', reveal: [0, 0], text: 'But there’s one thing|most people overlook.', highlights: ['overlook.'], size: 46},
  // 8
  {dur: 59, kind: 'text', reveal: [2, 30], text: 'Twelve of the seventeen|turbines were built', highlights: ['Twelve'], size: 38, media: {src: 'drop/dp08_turbineblades.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 97, kind: 'text', reveal: [2, 50], text: 'for a lake that could sit|at 1,200 feet.', highlights: ['1,200'], size: 38, media: {src: 'drop/dp09_fullreservoir.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 72, kind: 'text', reveal: [2, 38], text: 'Lake Mead is at|1,037.', highlights: ['1,037.'], size: 42, media: {src: 'drop/dp10_bathtubring.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 123, kind: 'text', reveal: [2, 62], text: 'Below 1,035, those twelve|start destroying themselves.', highlights: ['destroying'], size: 34, media: {src: 'drop/dp11_cavitation.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 65, kind: 'text', reveal: [2, 34], text: 'The water pressure|drops so far', highlights: ['pressure'], size: 42, media: {src: 'drop/dp12_intake.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 105, kind: 'text', reveal: [2, 54], text: 'it turns to vapor inside the turbine|and sandblasts the blades.', highlights: ['sandblasts'], size: 32, media: {src: 'drop/dp13_erodedblade.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 82, kind: 'text', reveal: [2, 42], text: 'Only five units|can run below that line.', highlights: ['five'], size: 38, media: {src: 'drop/dp14_fewunits.jpg', type: 'img', effect: 'in'}},
  // 15 CARD 2
  {dur: 42, kind: 'lines', reveal: [0, 24, 46], text: 'LAKE: 1,037.4 FT|LINE: 1,035 FT|BELOW IT: 4 OF 17', highlights: ['4'], media: {src: 'drop/dp15_lowreservoir.jpg', type: 'img', effect: 'in'}},
  // 16 BLACK
  {dur: 42, kind: 'text', reveal: [0, 0], text: 'And this is where|things get interesting.', highlights: ['interesting.'], size: 46},
  // 17
  {dur: 79, kind: 'text', reveal: [2, 42], text: 'The lake is 2.4 feet|above the line.', highlights: ['2.4'], size: 40, media: {src: 'drop/dp17_watermarker.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 93, kind: 'text', reveal: [2, 48], text: 'The most likely forecast|crosses it at the end of November.', highlights: ['November.'], size: 32, media: {src: 'drop/dp18_calendar.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 65, kind: 'text', reveal: [2, 34], text: 'The dry one|crosses on Halloween.', highlights: ['Halloween.'], size: 42, media: {src: 'drop/dp19_crackedearth.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 97, kind: 'text', reveal: [2, 50], text: 'Neither puts the lake back|above it before Sept 2028.', highlights: ['2028.'], size: 34, media: {src: 'drop/dp20_timeline.jpg', type: 'img', effect: 'in'}},
  // 21 CARD 3
  {dur: 107, kind: 'lines', reveal: [0, 26, 48], text: 'CROSSES: NOV 2026|BACK ABOVE: 2028+|NEW UNITS: 2028–31', highlights: ['nov'], media: {src: 'drop/dp21_construction.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 107, kind: 'text', reveal: [2, 54], text: 'The first two can’t be finished|before October 2028.', highlights: ['2028.'], size: 34, media: {src: 'drop/dp22_fabrication.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 93, kind: 'text', reveal: [2, 48], text: 'The repair: 2029.|Two more, maybe 2031.', highlights: ['2031.'], size: 38, media: {src: 'drop/dp23_workshop.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 50, kind: 'text', reveal: [2, 26], text: 'Now let me show|how to actually do this.', highlights: ['actually'], size: 42, media: {src: 'drop/dp24_diagram.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 40, kind: 'text', reveal: [2, 20], text: 'A dam doesn’t|sell water.', highlights: ['water.'], size: 46, media: {src: 'drop/dp25_outflow.mp4', type: 'video', effect: 'in'}},
  // 26
  {dur: 28, kind: 'text', reveal: [2, 14], text: 'It sells|height.', highlights: ['height.'], size: 56, media: {src: 'drop/dp26_tallface.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 100, kind: 'text', reveal: [2, 52], text: 'Power comes from how far|the water falls onto the blade.', highlights: ['falls'], size: 34, media: {src: 'drop/dp27_waterfall.mp4', type: 'video', effect: 'in'}},
  // 28
  {dur: 92, kind: 'text', reveal: [2, 46], text: 'Full lake: about|590 feet of drop.', highlights: ['590'], size: 40, media: {src: 'drop/dp28_tallpenstock.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 66, kind: 'text', reveal: [2, 34], text: 'Today:|391.', highlights: ['391.'], size: 56, media: {src: 'drop/dp29_lowerwater.jpg', type: 'img', effect: 'in'}},
  // 30 CARD 4
  {dur: 51, kind: 'lines', reveal: [0, 40], text: 'DROP|590 FT → 391 FT', highlights: ['391'], media: {src: 'drop/dp30_damface2.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 47, kind: 'text', reveal: [2, 24], text: 'even with the same|water going through.', highlights: ['same'], size: 40, media: {src: 'drop/dp31_waterthrough.mp4', type: 'video', effect: 'in'}},
  // 32
  {dur: 64, kind: 'text', reveal: [2, 34], text: 'The lights in Vegas|and Phoenix stay on.', highlights: ['on.'], size: 38, media: {src: 'drop/dp32_cityskyline.jpg', type: 'img', effect: 'in'}},
  // 33
  {dur: 134, kind: 'text', reveal: [2, 68], text: 'Utilities buy the missing power|on the open market, at market prices.', highlights: ['market'], size: 30, media: {src: 'drop/dp33_powerlines.jpg', type: 'img', effect: 'in'}},
  // 34
  {dur: 76, kind: 'text', reveal: [2, 40], enter: 'slideL', text: 'It shows up on your bill,|not your light switch.', highlights: ['bill,'], size: 36, media: {src: 'drop/dp34_utilitybill.jpg', type: 'img', effect: 'in'}},
  // 35
  {dur: 44, kind: 'text', reveal: [2, 22], text: 'Hoover isn’t running|out of water.', highlights: ['water.'], size: 42, media: {src: 'drop/dp35_waterflow.jpg', type: 'img', effect: 'in'}},
  // 36 RED impact (thesis)
  {dur: 34, kind: 'impact', text: 'It’s running out|of gravity.', redBg: true},
  // 37
  {dur: 32, kind: 'text', reveal: [2, 16], text: 'The river|still flows,', highlights: ['flows,'], size: 46, media: {src: 'drop/dp37_river.jpg', type: 'img', effect: 'in'}},
  // 38
  {dur: 74, kind: 'text', reveal: [2, 38], text: 'but it doesn’t fall far enough|to be worth much.', highlights: ['far'], size: 34, media: {src: 'drop/dp38_shallow.jpg', type: 'img', effect: 'in'}},
  // 39
  {dur: 33, kind: 'text', reveal: [2, 16], text: 'For the next|two years,', highlights: ['two'], size: 44, media: {src: 'drop/dp39_calendar2.jpg', type: 'img', effect: 'in'}},
  // 40
  {dur: 104, kind: 'text', reveal: [2, 54], text: 'four turbines carry a plant|built for seventeen,', highlights: ['four'], size: 34, media: {src: 'drop/dp40_bighall.jpg', type: 'img', effect: 'in'}},
  // 41
  {dur: 68, kind: 'text', reveal: [2, 36], text: 'and the Southwest pays the|difference every month.', highlights: ['difference'], size: 34, media: {src: 'drop/dp41_desertlines.jpg', type: 'img', effect: 'in'}},
  // 42
  {dur: 49, kind: 'text', reveal: [2, 26], text: 'The dam is fine.|The physics moved.', highlights: ['physics'], size: 42, media: {src: 'drop/dp42_solidface.jpg', type: 'img', effect: 'in'}},
  // 43 CTA (question close)
  {dur: 95, kind: 'text', reveal: [2, 50], enter: 'zoom', text: 'Do you live on|Hoover’s power?', highlights: ['Hoover’s'], size: 44, media: {src: 'drop/dp43_dusk.mp4', type: 'video', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 214, src: 'media/sfx_whoosh.mp3', vol: 0.35}, // hook -> Hoover
  {at: 566, src: 'media/sfx_impact.mp3', vol: 0.46}, // CARD 1
  {at: 606, src: 'media/sfx_whoosh.mp3', vol: 0.35}, // into black
  {at: 1280, src: 'media/sfx_impact.mp3', vol: 0.46}, // CARD 2
  {at: 1322, src: 'media/sfx_whoosh.mp3', vol: 0.35}, // into black
  {at: 1697, src: 'media/sfx_impact.mp3', vol: 0.46}, // CARD 3
  {at: 2381, src: 'media/sfx_impact.mp3', vol: 0.46}, // CARD 4
  {at: 2543, src: 'media/sfx_chaching.mp3', vol: 0.4}, // open market
  {at: 2797, src: 'media/sfx_impact.mp3', vol: 0.55}, // red thesis (gravity)
  {at: 3191, src: 'media/sfx_whoosh.mp3', vol: 0.4}, // close
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
const Caption: React.FC<{text: string; highlights?: string[]; size?: number; align?: 'center' | 'flex-start'; typewriter?: boolean; lineSync?: boolean; lineReveal?: number[]}> = ({text, highlights = [], size = 112, align = 'center', typewriter = false, lineSync = false, lineReveal}) => {
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
        <div key={li} style={{display: 'flex', flexWrap: 'wrap', justifyContent: align === 'center' ? 'center' : 'flex-start', gap: '0 18px', opacity: lineOp[li]}}>
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

const SceneText: React.FC<{text: string; highlights?: string[]; size?: number; reveal?: number[]}> = ({text, highlights, size = 100, reveal}) => (
  <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', padding: 84}}>
    <Caption text={text} highlights={highlights} size={size} typewriter={false} lineSync lineReveal={reveal} />
  </AbsoluteFill>
);

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
          {stat.suffix ? <span style={{fontFamily: HEAD, fontSize: 120, color: C.red, lineHeight: 1}}>{stat.suffix}</span> : null}
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The drop</span>
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
      return <SceneText text={s.text!} highlights={s.highlights} size={s.size} reveal={s.reveal} />;
    case 'stat':
      return <SceneStat stat={s.stat!} />;
    case 'impact':
      return <SceneImpact text={s.text!} redBg={s.redBg} />;
    default:
      return null;
  }
};

// ---------------------------------------------------------------------------
export const DropReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('drop/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('drop/music.mp3')}
        volume={(f) => interpolate(f, [0, 20, DURATION_IN_FRAMES - 55, DURATION_IN_FRAMES], [0, 0.17, 0.17, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}
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
