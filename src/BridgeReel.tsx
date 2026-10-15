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
// "The footbridge" reel (BridgeReel) — fast NEWS reel, Hard Ledger house format.
// NEW topic: why American Airlines killed its one-hour Phoenix–Tijuana flight (290 miles, its
// shortest to Mexico; launched Jan 2024, last flight 2 Aug 2026 — dead at ~19 months). Thesis: the
// route didn't lose to a rival airline, it lost to GEOGRAPHY. Tijuana's airport sits 20 miles from
// San Diego and, since 2015, the Cross Border Xpress footbridge lets you park in California, walk
// across the border, and board in Mexico — so from the US side Tijuana is a San Diego terminal in
// another country. Tijuana is also one of Mexico's best-connected domestic airports (Aeromexico ~7-9
// flights/day), so the plane was competing with a four-hour drive and a footbridge. A route only
// survives if the plane is the cheapest way there; this one never was. Full QUESTION/STORY/ANSWER/CTA
// with a ~1.1s post-hook pause; close is the supplied CTA QUESTION ("Which route should they cut
// next? Tell me below."). 31 beats: 28 media (incl. 4 video + 3 cards: PHX TO TIJ / 290 MI / 1 HOUR /
// DEAD AT 19 MONTHS; TIJ 20 MI FROM SAN DIEGO / 1 PEDESTRIAN BRIDGE; AEROMEXICO 7-9 FLIGHTS A DAY) /
// 1 red impact ("It lost to geography.") / 2 black. Red card mid-tail (beat 26). Durations / reveals
// / SFX locked to the VO via a scribe_v1 word-timestamp anchor pass (public/bridge/voiceover.mp3,
// ~103.7s incl. the post-hook pause). Restated-fact number cards land where the VO speaks them.
// NB: OWN distinct footage under public/bridge/, NO reuse of any other reel's clips.
// FOOTAGE is strictly BRAND-FREE AND FACE-FREE -- generic aviation / airport / border / travel
// b-roll, NO airline logos/liveries/tail-fins or branded aircraft (no American / Aeromexico / any
// carrier), NO airport or airline BRAND signage, NO readable airline names on departure boards, NO
// "Cross Border Xpress" branding, NO national flags (US or Mexican -- this is a border topic, keep it
// flag-free), NO identifiable human faces (silhouettes / backs / feet only), NO banknote portraits,
// NO readable foreign-language brand signage, NO readable license plates.
// **SENSITIVE -- names a real company and asserts specific, checkable current claims; render as
// written but CONFIRM before publishing:** the PHX-TIJ route dates (launched Jan 2024, last flight
// 2 Aug 2026, ~290 miles / ~1 hour), the Cross Border Xpress bridge (open since Dec 2015, ~20 mi from
// San Diego), "Aeromexico ~7-9 flights a day into TIJ", "American's Phoenix-Monterrey route is cut
// next, in December", and "30 American destinations in Mexico" are all rendered as reported and must
// be verified independently. The "lost to geography" framing is editorial analysis.
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK (held through ~1.1s post-hook pause)
  {dur: 235, kind: 'hook', reveal: [3, 64, 128], text: 'Why did American Airlines|kill a one-hour flight|with family and business ties?', kicker: 'The footbridge', highlights: ['kill'], size: 38, media: {src: 'bridge/b00_takeoff.mp4', type: 'video', effect: 'in'}},
  // 1
  {dur: 88, kind: 'text', reveal: [2, 46], text: 'Phoenix to Tijuana.|290 miles.', highlights: ['290'], size: 44, media: {src: 'bridge/b01_phoenix.jpg', type: 'img', effect: 'in'}},
  // 2 (merged)
  {dur: 100, kind: 'text', reveal: [2, 50], enter: 'slideL', text: 'One hour, gate to gate.|America’s shortest to Mexico.', highlights: ['shortest'], size: 40, media: {src: 'bridge/b03_routemap.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 128, kind: 'text', reveal: [2, 66], text: 'Launched 2024,|sold as a game-changer.', highlights: ['game-changer.'], size: 42, media: {src: 'bridge/b05_calendar.jpg', type: 'img', effect: 'in'}},
  // 4 CARD 1
  {dur: 99, kind: 'lines', reveal: [0, 34, 68], text: 'PHX TO TIJ|290 MI / 1 HOUR|DEAD AT 19 MONTHS', highlights: ['dead'], media: {src: 'bridge/b06_emptygate.jpg', type: 'img', effect: 'in'}},
  // 5 BLACK
  {dur: 73, kind: 'text', reveal: [0, 0], text: 'But nobody tells you|this part.', highlights: ['part.'], size: 48},
  // 6
  {dur: 95, kind: 'text', reveal: [2, 48], text: 'Tijuana’s airport is|20 miles from San Diego.', highlights: ['20'], size: 42, media: {src: 'bridge/b07_pedbridge.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 67, kind: 'text', reveal: [2, 34], text: 'Since 2015,|there’s a bridge.', highlights: ['bridge.'], size: 46, media: {src: 'bridge/b08_borderfence.jpg', type: 'img', effect: 'in'}},
  // 8 CARD 2
  {dur: 46, kind: 'lines', reveal: [0, 24], text: 'TIJ: 20 MI FROM SAN DIEGO|1 PEDESTRIAN BRIDGE', highlights: ['bridge'], media: {src: 'bridge/b16_footbridge2.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 91, kind: 'text', reveal: [2, 46], text: 'Park in California,|walk across the border,', highlights: ['walk'], size: 42, media: {src: 'bridge/b09_parking.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 76, kind: 'text', reveal: [2, 38], text: 'and board your flight|in Mexico.', highlights: ['mexico.'], size: 44, media: {src: 'bridge/b10_walkingbridge.mp4', type: 'video', effect: 'in'}},
  // 11
  {dur: 116, kind: 'text', reveal: [2, 58], text: 'From the US side,|it isn’t a destination.', highlights: ['destination.'], size: 42, media: {src: 'bridge/b11_terminal.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 109, kind: 'text', reveal: [2, 56], enter: 'slideR', text: 'It’s a San Diego terminal|in another country.', highlights: ['country.'], size: 40, media: {src: 'bridge/b26_controltower.jpg', type: 'img', effect: 'in'}},
  // 13 BLACK
  {dur: 62, kind: 'text', reveal: [0, 0], text: 'But that’s not even|the craziest part.', highlights: ['craziest'], size: 48},
  // 14
  {dur: 129, kind: 'text', reveal: [2, 66], text: 'Tijuana is one of Mexico’s|best-connected airports.', highlights: ['best-connected'], size: 40, media: {src: 'bridge/b12_busyairport.jpg', type: 'img', effect: 'in'}},
  // 15 CARD 3
  {dur: 92, kind: 'lines', reveal: [0, 50], text: 'AEROMEXICO|7-9 FLIGHTS A DAY', highlights: ['7-9'], media: {src: 'bridge/b13_scheduleboard.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 51, kind: 'text', reveal: [2, 26], text: 'into it, from|across the country.', highlights: ['country.'], size: 44, media: {src: 'bridge/b04_departboard.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 133, kind: 'text', reveal: [2, 68], text: 'The traffic American chased|had two cheaper routes:', highlights: ['cheaper'], size: 40, media: {src: 'bridge/b14_mexicomap.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 114, kind: 'text', reveal: [2, 58], text: 'walk across from San Diego,|or fly in from Mexico.', highlights: ['walk'], size: 40, media: {src: 'bridge/b20_feetwalking.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 86, kind: 'text', reveal: [2, 44], text: 'Here’s exactly|how they do it.', highlights: ['exactly'], size: 46, media: {src: 'bridge/b19_chess.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 143, kind: 'text', reveal: [2, 74], text: 'A route survives only if|the plane’s the cheapest way.', highlights: ['cheapest'], size: 38, media: {src: 'bridge/b02_tarmac.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 100, kind: 'text', reveal: [2, 52], text: 'Phoenix–Tijuana wasn’t|competing with an airline.', highlights: ['airline.'], size: 40, media: {src: 'bridge/b15_highway.mp4', type: 'video', effect: 'in'}},
  // 22
  {dur: 106, kind: 'text', reveal: [2, 54], text: 'It was competing with|a drive and a footbridge.', highlights: ['footbridge.'], size: 40, media: {src: 'bridge/b22_aerialborder.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 91, kind: 'text', reveal: [2, 46], text: 'And the Monterrey route|from Phoenix', highlights: ['monterrey'], size: 42, media: {src: 'bridge/b17_planeroute.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 93, kind: 'text', reveal: [2, 46], text: 'goes next,|in December.', highlights: ['december.'], size: 46, media: {src: 'bridge/b18_decembercal.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 57, kind: 'text', reveal: [2, 28], text: 'American didn’t|lose to a rival.', highlights: ['rival.'], size: 44, media: {src: 'bridge/b24_jetwindow.jpg', type: 'img', effect: 'in'}},
  // 26 RED impact (mid-tail thesis)
  {dur: 49, kind: 'impact', text: 'It lost|to geography.', redBg: true},
  // 27
  {dur: 96, kind: 'text', reveal: [2, 48], text: 'Tijuana’s the one Mexican|city you can walk to.', highlights: ['walk'], size: 40, media: {src: 'bridge/b27_runwaylights.mp4', type: 'video', effect: 'in'}},
  // 28
  {dur: 131, kind: 'text', reveal: [2, 66], text: 'No one buys a ticket|to a place they reach on foot.', highlights: ['foot.'], size: 38, media: {src: 'bridge/b25_suitcase.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 175, kind: 'text', reveal: [2, 92], text: '30 destinations in Mexico.|The shortest never made sense.', highlights: ['shortest'], size: 38, media: {src: 'bridge/b21_mappins.jpg', type: 'img', effect: 'in'}},
  // 30 CTA (question close)
  {dur: 81, kind: 'text', reveal: [2, 40], enter: 'zoom', text: 'Which route|should they cut next?', highlights: ['cut'], size: 44, media: {src: 'bridge/b23_signpost.jpg', type: 'img', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 551, src: 'media/sfx_impact.mp3', vol: 0.46}, // PHX-TIJ dead card
  {at: 650, src: 'media/sfx_whoosh.mp3', vol: 0.35}, // into black
  {at: 885, src: 'media/sfx_impact.mp3', vol: 0.46}, // 20mi/bridge card
  {at: 1323, src: 'media/sfx_whoosh.mp3', vol: 0.35}, // into black
  {at: 1514, src: 'media/sfx_impact.mp3', vol: 0.48}, // Aeromexico card
  {at: 2580, src: 'media/sfx_impact.mp3', vol: 0.55}, // red thesis (lost to geography)
  {at: 3031, src: 'media/sfx_whoosh.mp3', vol: 0.4}, // CTA
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The footbridge</span>
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
export const BridgeReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('bridge/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('bridge/music.mp3')}
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
