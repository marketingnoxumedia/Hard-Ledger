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
// "The conveyor" reel (AmocReel) — Hard Ledger house VISUAL format, science/climate-news topic.
// TOPIC: Satellite observations suggest the Atlantic Meridional Overturning Circulation (AMOC) — the "ocean
// conveyor belt" that carries warm water north and cold water south and helps keep parts of Europe warm — is
// WEAKENING. Scientists estimate it has slowed ~18% over the past 40 years. A report (New Scientist) finds the
// AMOC transporting less heat toward the North Atlantic. A weaker AMOC could reshape rainfall, affect storms,
// raise Atlantic sea levels, and disrupt tropical rains; continued weakening could near a tipping point — but no
// imminent collapse is established and the future is uncertain. The catch: the AMOC is hard to measure,
// continuous records go back ~2 decades, and studies disagree on the pace. Debate: an underestimated climate risk,
// or worst-case framing before the science is settled?
// NOTE ON VOICE: built VERBATIM from a client-supplied script in the influencer "curiosity-gap" format (like
// HalfReel / SurvivorReel / MetaReel / SteamReel / UniteReel), NOT the faceless house voice — it NAMES the AMOC /
// New Scientist, uses an EARLY "follow for more" CTA, and CLOSES on a "let us know in the comments" debate CTA.
// The client's standing choice is "build verbatim." The red beat poses the would-you-rather (underestimated risk
// vs worst-case framing).
// 40 beats. 1 stat card: AMOC HAS SLOWED ~18% (over 40 years). 1 red impact, no black beat. Captions match the VO
// verbatim (except the number card; spoken figures as numerals). Durations/reveals/SFX locked to the VO via a
// scribe_v1 word-timestamp anchor pass (public/amoc/voiceover.mp3, NO inserted pause); music mixed at 0.17. Built
// at the house +10% pacing default. OWN distinct footage under public/amoc/, NO reuse of any other reel's clips —
// ledger-checked.
// New STANDALONE reel; a science/climate-news story (a departure from the finance and gaming reels). Card text is
// editorial overlay, not footage.
// FOOTAGE is BRAND-FREE and generic: satellites/Earth-from-space, ocean currents/waves, maps/globe, weather/storms,
// ice/cold seas, coastlines, data/measurement and research b-roll. **Screen HARD: NO New Scientist logo/cover or
// masthead; NO NASA / ESA / NOAA or any space-agency logo or marking on satellites; NO readable map country labels
// or place names; NO stock ticker or readable chart/data text; NO other brand logos/wordmarks; NO flags; NO
// identifiable landmarks; NO readable foreign text; NO identifiable faces; NO military.**
// **UNVERIFIED / SENSITIVE — cites a real outlet (New Scientist) and specific science claims (AMOC slowed ~18% over
// 40 years; less heat transported north; tipping-point risk); rendered as written but MUST be fact-checked before
// publishing.** The reel itself flags the uncertainty (no imminent collapse established; studies disagree); the
// "underestimated risk" framing is editorial analysis.
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 118, kind: 'hook', reveal: [3, 40], text: 'Satellites are revealing a disturbing|change in the Atlantic Ocean.', kicker: 'The conveyor', highlights: ['disturbing'], size: 27, media: {src: 'amoc/am00_satellite.mp4', type: 'video', effect: 'in'}},
  // 1
  {dur: 96, kind: 'text', reveal: [2, 28], text: 'The massive current system that helps|keep parts of Europe warm', highlights: [], size: 27, media: {src: 'amoc/am01_current.jpg', type: 'img', effect: 'panL'}},
  // 2
  {dur: 32, kind: 'text', reveal: [2], text: 'may be getting weaker —', highlights: ['weaker'], size: 38, media: {src: 'amoc/am02_weaker.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 86, kind: 'text', reveal: [2, 28], text: 'and the latest evidence|is raising serious concerns.', highlights: ['concerns.'], size: 30, media: {src: 'amoc/am03_concern.jpg', type: 'img', effect: 'panR'}},
  // 4
  {dur: 88, kind: 'text', reveal: [2, 28], text: 'Scientists estimate the system|has slowed by around', highlights: [], size: 30, media: {src: 'amoc/am04_estimate.jpg', type: 'img', effect: 'in'}},
  // 5 CARD 18%
  {dur: 72, kind: 'stat', stat: {pre: 'AMOC HAS SLOWED', prefix: '~', value: 18, suffix: '%', post: 'OVER 40 YEARS'}, media: {src: 'amoc/am05_decline.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 77, kind: 'text', reveal: [2, 28], text: 'But what does that actually mean|for Earth’s climate,', highlights: [], size: 29, media: {src: 'amoc/am06_climate.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 125, kind: 'text', reveal: [2, 28], text: 'and could this change trigger|consequences far beyond Europe?', highlights: ['Europe?'], size: 28, media: {src: 'amoc/am07_europe.jpg', type: 'img', effect: 'panL'}},
  // 8
  {dur: 62, kind: 'text', reveal: [2, 28], text: 'Follow for more science stories|and discoveries', highlights: ['follow'], size: 31, media: {src: 'amoc/am08_follow.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 66, kind: 'text', reveal: [2, 28], text: 'that could change how|we see our planet.', highlights: [], size: 32, media: {src: 'amoc/am09_planet.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 106, kind: 'text', reveal: [2, 28], text: 'The system is called the Atlantic|Meridional Overturning Circulation,', highlights: [], size: 25, media: {src: 'amoc/am10_amoc.jpg', type: 'img', effect: 'panR'}},
  // 11
  {dur: 32, kind: 'text', reveal: [2], text: 'or AMOC.', highlights: ['AMOC.'], size: 46, media: {src: 'amoc/am11_amoc2.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 73, kind: 'text', reveal: [2, 28], text: 'Think of it as a giant|ocean conveyor belt,', highlights: ['conveyor'], size: 32, media: {src: 'amoc/am12_conveyor.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 140, kind: 'text', reveal: [2, 28], text: 'carrying warm water northward|and returning colder, deeper water south.', highlights: [], size: 25, media: {src: 'amoc/am13_water.jpg', type: 'img', effect: 'panL'}},
  // 14
  {dur: 124, kind: 'text', reveal: [2, 28], text: 'It helps distribute heat around the|planet and influences weather patterns', highlights: [], size: 25, media: {src: 'amoc/am14_heat.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 53, kind: 'text', reveal: [2], text: 'across multiple continents.', highlights: ['continents.'], size: 32, media: {src: 'amoc/am15_continents.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 57, kind: 'text', reveal: [2, 28], text: 'In a report published|by New Scientist,', highlights: [], size: 32, media: {src: 'amoc/am16_report.jpg', type: 'img', effect: 'panR'}},
  // 17
  {dur: 76, kind: 'text', reveal: [2], text: 'researchers examined satellite observations', highlights: [], size: 26, media: {src: 'amoc/am17_satellite2.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 110, kind: 'text', reveal: [2, 28], text: 'and estimates of how much heat|the ocean releases into the atmosphere.', highlights: [], size: 25, media: {src: 'amoc/am18_oceanheat.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 152, kind: 'text', reveal: [2, 28], text: 'Their findings suggest the AMOC has been|transporting less heat toward the North Atlantic,', highlights: [], size: 23, media: {src: 'amoc/am19_northatlantic.jpg', type: 'img', effect: 'panL'}},
  // 20
  {dur: 128, kind: 'text', reveal: [2, 28], text: 'adding to growing evidence that this|crucial circulation system is weakening.', highlights: ['weakening.'], size: 24, media: {src: 'amoc/am20_weakening.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 92, kind: 'text', reveal: [2, 28], text: 'And the concern isn’t just about|colder weather in Europe.', highlights: [], size: 28, media: {src: 'amoc/am21_cold.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 111, kind: 'text', reveal: [2, 28], text: 'A weaker AMOC could reshape rainfall|patterns, affect storms,', highlights: ['reshape'], size: 27, media: {src: 'amoc/am22_storms.jpg', type: 'img', effect: 'panR'}},
  // 23
  {dur: 110, kind: 'text', reveal: [2, 28], text: 'and contribute to rising sea levels|along parts of the Atlantic coast.', highlights: ['coast.'], size: 25, media: {src: 'amoc/am23_sealevel.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 107, kind: 'text', reveal: [2, 28], text: 'Changes could also disrupt rainfall|in tropical regions', highlights: [], size: 28, media: {src: 'amoc/am24_tropical.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 81, kind: 'text', reveal: [2, 28], text: 'that depend on predictable|seasonal weather.', highlights: [], size: 30, media: {src: 'amoc/am25_seasonal.jpg', type: 'img', effect: 'panL'}},
  // 26
  {dur: 102, kind: 'text', reveal: [2, 28], text: 'The biggest worry is that continued|weakening could push the system', highlights: [], size: 26, media: {src: 'amoc/am26_worry.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 51, kind: 'text', reveal: [2], text: 'toward a major tipping point.', highlights: ['tipping'], size: 32, media: {src: 'amoc/am27_tipping.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 106, kind: 'text', reveal: [2, 28], text: 'If the AMOC weakened dramatically,|the consequences could be severe —', highlights: ['severe'], size: 26, media: {src: 'amoc/am28_severe.jpg', type: 'img', effect: 'panR'}},
  // 29
  {dur: 126, kind: 'text', reveal: [2, 28], text: 'but scientists have not established|that a sudden collapse is imminent,', highlights: ['collapse'], size: 26, media: {src: 'amoc/am29_collapse.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 72, kind: 'text', reveal: [2, 28], text: 'and the exact future|remains uncertain.', highlights: ['uncertain.'], size: 32, media: {src: 'amoc/am30_uncertain.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 95, kind: 'text', reveal: [2, 28], text: 'Here’s the catch: measuring|the AMOC directly is difficult,', highlights: ['catch:'], size: 27, media: {src: 'amoc/am31_measure.jpg', type: 'img', effect: 'panL'}},
  // 32
  {dur: 120, kind: 'text', reveal: [2, 28], text: 'and continuous observations|only go back about two decades.', highlights: [], size: 27, media: {src: 'amoc/am32_decades.jpg', type: 'img', effect: 'in'}},
  // 33
  {dur: 118, kind: 'text', reveal: [2, 28], text: 'Different studies have reached different|conclusions about the pace of weakening.', highlights: [], size: 24, media: {src: 'amoc/am33_studies.jpg', type: 'img', effect: 'in'}},
  // 34
  {dur: 110, kind: 'text', reveal: [2, 28], text: 'The evidence is concerning, but researchers|still need more observations', highlights: [], size: 24, media: {src: 'amoc/am34_more.jpg', type: 'img', effect: 'panR'}},
  // 35
  {dur: 71, kind: 'text', reveal: [2, 28], text: 'to understand exactly|what’s happening.', highlights: ['happening.'], size: 32, media: {src: 'amoc/am35_happening.jpg', type: 'img', effect: 'in'}},
  // 36
  {dur: 148, kind: 'text', reveal: [2, 28], text: 'So, is the weakening of this ocean current|one of the most underestimated climate risks —', highlights: ['underestimated'], size: 22, media: {src: 'amoc/am36_risk.jpg', type: 'img', effect: 'in'}},
  // 37
  {dur: 84, kind: 'text', reveal: [2, 28], text: 'or is the public being shown|the worst-case scenario', highlights: [], size: 28, media: {src: 'amoc/am37_worstcase.jpg', type: 'img', effect: 'panL'}},
  // 38 RED
  {dur: 59, kind: 'impact', redBg: true, text: 'before scientists have|all the answers?'},
  // 39 CTA
  {dur: 50, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'What do you think?|Let us know in the comments.', highlights: ['comments.'], size: 32, media: {src: 'amoc/am39_comments.jpg', type: 'img', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 420, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 960, src: 'media/sfx_whoosh.mp3', vol: 0.33},
  {at: 2831, src: 'media/sfx_whoosh.mp3', vol: 0.33},
  {at: 3577, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 3636, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The conveyor</span>
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
export const AmocReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('amoc/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('amoc/music.mp3')}
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
