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

// Header type: Anton (condensed caps).
const HEAD = ANTON;
// Body type: Helvetica Now Display Condensed if installed locally, otherwise a
// close free neo-grotesque condensed fallback bundled by the render.
const BODY = `'Helvetica Now Display Condensed','Helvetica Now Display','${ROBOTO_CONDENSED}','Arial Narrow',sans-serif`;

// ---------------------------------------------------------------------------
// Composition constants
// ---------------------------------------------------------------------------
export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

// Drop a narration track at public/voiceover.mp3 and flip this to true.
const HAS_VOICEOVER = true;

// Near-black canvas, monochrome type, exactly one red focal element per scene.
const C = {
  bg: '#0A0A0A',
  ink: '#F4F4F4',
  sub: '#9A9A9A',
  muted: '#585858',
  red: '#FF2E2E',
  track: '#1B1B1B',
  line: 'rgba(255,255,255,0.05)',
};

// ---------------------------------------------------------------------------
// Scene timeline (frames @ 30fps). Total = 1350 frames = 45.0s
// ---------------------------------------------------------------------------
type MediaCfg = {
  src: string;
  type: 'img' | 'video';
  from?: number; // start frame for video segment
  effect?: 'in' | 'out' | 'panL' | 'panR';
  scrim?: number;
};
type SceneDef = {
  dur: number;
  kind: string;
  text?: string;
  highlights?: string[];
  reveal?: number[];
  media?: MediaCfg;
};

// Durations are tuned so each scene change lands on a detected pause in the
// narration (public/voiceover.mp3, speech 0..32.7s). Total = 990 frames = 33.0s.
const SCENES: SceneDef[] = [
  {dur: 74, kind: 'hook', media: {src: 'media/clip_industrial.mp4', type: 'video', from: 0, effect: 'in', scrim: 0.55}},
  {dur: 84, kind: 'margin', media: {src: 'media/p_cash_bills.jpeg', type: 'img', effect: 'in', scrim: 0.64}},
  {dur: 174, kind: 'lines', text: 'Metal boxes.|Cheap land.|Almost no staff.|No inventory.', highlights: ['staff'], reveal: [0, 42, 84, 134], media: {src: 'media/clip_yard.mp4', type: 'video', from: 0, effect: 'panL', scrim: 0.58}},
  {dur: 43, kind: 'lines', text: 'Nothing to restock.|Nothing spoils.', highlights: ['spoils'], reveal: [0, 20], media: {src: 'media/clip_warehouse.mp4', type: 'video', from: 0, effect: 'in', scrim: 0.58}},
  {dur: 78, kind: 'text', text: 'Once the building is up,|costs barely move.', highlights: ['barely', 'move'], media: {src: 'media/clip_industrial.mp4', type: 'video', from: 120, effect: 'out', scrim: 0.58}},
  {dur: 76, kind: 'rent', media: {src: 'media/p_cash_briefcase.jpeg', type: 'img', effect: 'in', scrim: 0.62}},
  {dur: 72, kind: 'text', text: 'Moving out costs|a weekend and a truck.', highlights: ['truck'], media: {src: 'media/p_truck_night.jpeg', type: 'img', effect: 'panR', scrim: 0.48}},
  {dur: 98, kind: 'text', text: 'Recessions cause|moves, divorces, downsizing.', highlights: ['recessions'], media: {src: 'media/clip_truck.mp4', type: 'video', from: 0, effect: 'in', scrim: 0.58}},
  {dur: 42, kind: 'fills'},
  {dur: 75, kind: 'revenue', media: {src: 'media/p_cash_briefcase.jpeg', type: 'img', effect: 'out', scrim: 0.64}},
  {dur: 90, kind: 'moat'},
  {dur: 84, kind: 'outro', media: {src: 'media/clip_industrial.mp4', type: 'video', from: 150, effect: 'out', scrim: 0.58}},
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

// ---------------------------------------------------------------------------
// Background: faint storage facade (neutral) + grid + vignette + grain
// ---------------------------------------------------------------------------
// Full-bleed Pexels media (photo or video) behind the text, with Ken Burns
// motion, a dark desaturated treatment, a legibility scrim, and a dissolve
// fade in/out at the scene edges.
const MediaBackground: React.FC<{cfg: MediaCfg}> = ({cfg}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const p = interpolate(frame, [0, durationInFrames], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const isImg = cfg.type === 'img';
  const range = isImg ? 0.26 : 0.15;
  const effect = cfg.effect ?? 'in';

  const scale =
    effect === 'out'
      ? interpolate(p, [0, 1], [1 + range, 1])
      : interpolate(p, [0, 1], [1, 1 + range]);
  let tx = 0;
  if (effect === 'panL') tx = interpolate(p, [0, 1], [3.5, -3.5]);
  if (effect === 'panR') tx = interpolate(p, [0, 1], [-3.5, 3.5]);

  const opacity = interpolate(
    frame,
    [0, 7, durationInFrames - 6, durationInFrames],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  const src = staticFile(cfg.src);
  const mediaStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  return (
    <AbsoluteFill style={{opacity}}>
      <AbsoluteFill style={{transform: `scale(${scale}) translateX(${tx}%)`, transformOrigin: 'center'}}>
        {isImg ? (
          <Img src={src} style={mediaStyle} />
        ) : (
          <OffthreadVideo src={src} startFrom={cfg.from ?? 0} muted style={mediaStyle} />
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Grain: React.FC = () => {
  const frame = useCurrentFrame();
  const shift = (frame * 7) % 200;
  return (
    <AbsoluteFill
      style={{
        opacity: 0.045,
        mixBlendMode: 'overlay',
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.9) 0.5px, transparent 0.6px)',
        backgroundSize: '3px 3px',
        backgroundPosition: `${shift}px ${shift}px`,
        pointerEvents: 'none',
      }}
    />
  );
};

// Global finishing pass rendered over the media but under the text: faint grid,
// film grain and a vignette so all footage reads as one graded system.
const Treatment: React.FC = () => {
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${C.line} 1px, transparent 1px), linear-gradient(90deg, ${C.line} 1px, transparent 1px)`,
          backgroundSize: '90px 90px',
          maskImage: 'radial-gradient(85% 65% at 50% 45%, black 20%, transparent 100%)',
          opacity: 0.6,
        }}
      />
      <Grain />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// Kinetic caption — Anton condensed caps, word-by-word, single red token(s)
// ---------------------------------------------------------------------------
const Caption: React.FC<{
  text: string;
  highlights?: string[];
  size?: number;
  align?: 'center' | 'flex-start';
  lineDelay?: number;
}> = ({text, highlights = [], size = 118, align = 'center', lineDelay = 0}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const lines = text.split('|');
  const hset = highlights.map((h) => h.toLowerCase());
  const isHi = (w: string) => hset.includes(w.replace(/[.,]/g, '').toLowerCase());

  let wordIndex = 0;
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 2, alignItems: align, width: '100%'}}>
      {lines.map((line, li) => (
        <div
          key={li}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: align === 'center' ? 'center' : 'flex-start',
            gap: '0 20px',
          }}
        >
          {line.split(' ').map((word, wi) => {
            const appear = lineDelay + wordIndex * 2.2;
            wordIndex++;
            const p = spring({frame: frame - appear, fps, config: {damping: 200, mass: 0.6}});
            const y = interpolate(p, [0, 1], [40, 0]);
            const hi = isHi(word);
            return (
              <span
                key={wi}
                style={{
                  display: 'inline-block',
                  fontFamily: HEAD,
                  fontSize: size,
                  lineHeight: 0.98,
                  letterSpacing: 0.5,
                  textTransform: 'uppercase',
                  color: hi ? C.red : C.ink,
                  opacity: p,
                  transform: `translateY(${y}px)`,
                  textShadow: hi ? '0 0 40px rgba(255,46,46,0.35)' : 'none',
                }}
              >
                {word}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};

const Kicker: React.FC<{children: React.ReactNode; delay?: number; color?: string}> = ({
  children,
  delay = 4,
  color = C.ink,
}) => {
  const frame = useLocal();
  const {fps} = useVideoConfig();
  const p = spring({frame: frame - delay, fps, config: {damping: 200}});
  return (
    <div
      style={{
        fontFamily: BODY,
        fontWeight: 700,
        fontSize: 26,
        letterSpacing: 7,
        textTransform: 'uppercase',
        color,
        opacity: p,
        transform: `translateY(${interpolate(p, [0, 1], [-12, 0])}px)`,
      }}
    >
      {children}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Scenes
// ---------------------------------------------------------------------------
const SceneHook: React.FC = () => {
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', padding: 80}}>
      <div style={{marginBottom: 46}}>
        <Kicker>The asset nobody talks about</Kicker>
      </div>
      <Caption text="You drive past|this building|every day." highlights={['building']} size={132} lineDelay={10} />
    </AbsoluteFill>
  );
};

const SceneMargin: React.FC = () => {
  const frame = useLocal();
  const {fps} = useVideoConfig();
  const enter = spring({frame: frame - 6, fps, config: {damping: 200}});
  const fill = interpolate(frame, [10, 56], [0, 79], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeInOut});
  const count = Math.round(fill);
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', padding: 80}}>
      <div style={{opacity: enter, transform: `translateY(${interpolate(enter, [0, 1], [26, 0])}px)`, textAlign: 'center'}}>
        <div style={{fontFamily: BODY, fontWeight: 700, fontSize: 30, letterSpacing: 6, color: C.ink, textTransform: 'uppercase', marginBottom: 10}}>
          It keeps
        </div>
        <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'center'}}>
          <span style={{fontFamily: HEAD, fontSize: 320, color: C.red, lineHeight: 0.85, letterSpacing: 2, textShadow: '0 0 70px rgba(255,46,46,0.35)'}}>{count}</span>
          <span style={{fontFamily: HEAD, fontSize: 140, color: C.red, lineHeight: 1}}>¢</span>
        </div>
        <div style={{fontFamily: BODY, fontWeight: 600, fontSize: 44, color: C.ink, marginTop: 6, textTransform: 'uppercase', letterSpacing: 1}}>
          on every dollar
        </div>
      </div>
      <div style={{width: 780, marginTop: 66, opacity: interpolate(frame, [12, 26], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
        <div style={{height: 44, width: '100%', borderRadius: 4, background: C.track, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)'}}>
          <div style={{height: '100%', width: `${fill}%`, background: C.red, boxShadow: '0 0 30px rgba(255,46,46,0.45)'}} />
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 16, fontFamily: BODY, fontWeight: 600, fontSize: 24, letterSpacing: 2, textTransform: 'uppercase', color: C.ink}}>
          <span>Kept · {count}%</span>
          <span>Costs · {100 - count}%</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneLines: React.FC<{text: string; highlights?: string[]; reveal?: number[]}> = ({text, highlights = [], reveal}) => {
  const frame = useLocal();
  const {fps} = useVideoConfig();
  const lines = text.split('|');
  const hset = highlights.map((h) => h.toLowerCase());
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'flex-start', padding: '0 96px'}}>
      <div style={{display: 'flex', flexDirection: 'column', gap: 22}}>
        {lines.map((l, i) => {
          const appearAt = reveal ? reveal[i] : 8 + i * 14;
          const p = spring({frame: frame - appearAt, fps, config: {damping: 200}});
          const x = interpolate(p, [0, 1], [-60, 0]);
          return (
            <div key={i} style={{opacity: p, transform: `translateX(${x}px)`, fontFamily: HEAD, fontSize: 108, lineHeight: 0.98, letterSpacing: 0.5, textTransform: 'uppercase'}}>
              {l.split(' ').map((w, wi) => {
                const hi = hset.includes(w.replace(/[.,]/g, '').toLowerCase());
                return (
                  <span key={wi} style={{color: hi ? C.red : C.ink, textShadow: hi ? '0 0 40px rgba(255,46,46,0.35)' : 'none'}}>
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

const SceneText: React.FC<{text: string; highlights?: string[]; size?: number}> = ({text, highlights, size = 112}) => {
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', padding: 84}}>
      <Caption text={text} highlights={highlights} size={size} lineDelay={6} />
    </AbsoluteFill>
  );
};

const SceneRent: React.FC = () => {
  const frame = useLocal();
  const {fps} = useVideoConfig();
  const bars = [0.34, 0.5, 0.64, 0.8, 1];
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', padding: 80}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 22, height: 430, marginBottom: 56}}>
        {bars.map((h, i) => {
          const p = spring({frame: frame - (10 + i * 10), fps, config: {damping: 200}});
          const isLast = i === bars.length - 1;
          return (
            <div
              key={i}
              style={{
                width: 92,
                height: 430 * h * p,
                borderRadius: '3px 3px 0 0',
                background: isLast ? C.red : '#242424',
                border: isLast ? 'none' : '1px solid rgba(255,255,255,0.06)',
                boxShadow: isLast ? '0 0 34px rgba(255,46,46,0.4)' : 'none',
              }}
            />
          );
        })}
      </div>
      <Caption text="Rent rises every year.|Automatically." size={92} lineDelay={4} />
    </AbsoluteFill>
  );
};

const SceneFills: React.FC = () => {
  const frame = useLocal();
  const {fps} = useVideoConfig();
  const p = spring({frame, fps, config: {damping: 13, mass: 0.8, stiffness: 120}});
  const scale = interpolate(p, [0, 1], [0.6, 1]);
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
      <div style={{transform: `scale(${scale})`, opacity: Math.min(1, p * 1.4), fontFamily: HEAD, fontSize: 180, lineHeight: 0.9, letterSpacing: 1, textTransform: 'uppercase', textAlign: 'center', color: C.ink}}>
        Storage<br />
        <span style={{color: C.red, textShadow: '0 0 60px rgba(255,46,46,0.4)'}}>fills.</span>
      </div>
    </AbsoluteFill>
  );
};

const SceneRevenue: React.FC = () => {
  const frame = useLocal();
  const {fps} = useVideoConfig();
  const enter = spring({frame: frame - 4, fps, config: {damping: 200}});
  const v = interpolate(frame, [8, 56], [0, 4.8], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeInOut});
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', padding: 70}}>
      <div style={{opacity: enter, transform: `translateY(${interpolate(enter, [0, 1], [24, 0])}px)`, textAlign: 'center'}}>
        <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'center'}}>
          <span style={{fontFamily: HEAD, fontSize: 180, color: C.red, lineHeight: 1}}>$</span>
          <span style={{fontFamily: HEAD, fontSize: 320, color: C.red, lineHeight: 0.85, letterSpacing: 2, textShadow: '0 0 70px rgba(255,46,46,0.35)'}}>{v.toFixed(1)}</span>
          <span style={{fontFamily: HEAD, fontSize: 180, color: C.red, lineHeight: 1}}>B</span>
        </div>
        <div style={{fontFamily: BODY, fontWeight: 600, fontSize: 48, color: C.ink, marginTop: 6, textTransform: 'uppercase', letterSpacing: 1}}>in annual revenue</div>
        <div style={{fontFamily: BODY, fontWeight: 500, fontSize: 26, letterSpacing: 5, color: C.ink, marginTop: 18, textTransform: 'uppercase'}}>
          U.S. self-storage industry
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneMoat: React.FC = () => {
  const frame = useLocal();
  const {fps} = useVideoConfig();
  const p1 = spring({frame: frame - 4, fps, config: {damping: 200}});
  const p2 = spring({frame: frame - 42, fps, config: {damping: 14, stiffness: 90}});
  const underline = interpolate(frame, [60, 86], [0, 100], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeInOut});
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', padding: 80}}>
      {/* solid red background (no footage) */}
      <AbsoluteFill style={{background: 'radial-gradient(125% 90% at 50% 42%, #FF2E2E 0%, #E31E1E 62%, #C21414 100%)'}} />
      <div style={{opacity: p1, transform: `translateY(${interpolate(p1, [0, 1], [22, 0])}px)`, fontFamily: HEAD, fontSize: 104, color: '#0A0A0A', textAlign: 'center', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 34, textShadow: 'none'}}>
        Nobody moves out.
      </div>
      <div style={{opacity: p2, transform: `scale(${interpolate(p2, [0, 1], [0.7, 1])})`, textAlign: 'center'}}>
        <div style={{fontFamily: BODY, fontWeight: 700, fontSize: 34, letterSpacing: 8, color: C.ink, textTransform: 'uppercase'}}>That is the</div>
        <div style={{fontFamily: HEAD, fontSize: 250, color: C.ink, letterSpacing: 4, lineHeight: 0.95, textTransform: 'uppercase', textShadow: '0 6px 44px rgba(0,0,0,0.3)'}}>Moat</div>
        <div style={{height: 10, width: `${underline}%`, margin: '0 auto', borderRadius: 4, background: C.ink, boxShadow: '0 0 26px rgba(0,0,0,0.25)'}} />
      </div>
    </AbsoluteFill>
  );
};

const SceneOutro: React.FC = () => {
  const frame = useLocal();
  const {fps} = useVideoConfig();
  const parts = [
    {t: 'No brand.', red: false},
    {t: 'No buzz.', red: false},
    {t: 'Just rent.', red: true},
  ];
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
      <div style={{display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center'}}>
        {parts.map((p, i) => {
          const s = spring({frame: frame - (6 + i * 16), fps, config: {damping: 200}});
          return (
            <span
              key={i}
              style={{
                fontFamily: HEAD,
                fontSize: p.red ? 150 : 116,
                textTransform: 'uppercase',
                letterSpacing: 1,
                color: C.ink,
                opacity: s,
                transform: `translateY(${interpolate(s, [0, 1], [34, 0])}px)`,
              }}
            >
              {p.red ? (
                <>
                  Just <span style={{color: C.red, textShadow: '0 0 60px rgba(255,46,46,0.4)'}}>rent.</span>
                </>
              ) : (
                p.t
              )}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// HUD — monochrome (keeps red reserved for the one focal token)
// ---------------------------------------------------------------------------
const Hud: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = frame / DURATION_IN_FRAMES;
  const bars = 40;
  return (
    <>
      <div style={{position: 'absolute', top: 70, left: 80, display: 'flex', alignItems: 'center', gap: 14}}>
        <div style={{width: 11, height: 11, borderRadius: 11, background: C.sub}} />
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase'}}>The storage moat</span>
      </div>
      <div style={{position: 'absolute', bottom: 120, left: 80, right: 80, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        {Array.from({length: bars}).map((_, i) => {
          const seed = Math.sin(i * 12.9898) * 43758.5453;
          const base = 0.25 + (seed - Math.floor(seed)) * 0.75;
          const wobble = 0.5 + 0.5 * Math.sin(frame / 4 + i * 0.6);
          const active = i / bars < progress;
          const h = 8 + 42 * base * (0.4 + 0.6 * wobble);
          return (
            <div key={i} style={{width: 6, height: h, borderRadius: 3, background: active ? C.sub : 'rgba(255,255,255,0.1)', opacity: active ? 0.85 : 0.5}} />
          );
        })}
      </div>
      <div style={{position: 'absolute', bottom: 90, left: 80, right: 80, height: 3, borderRadius: 3, background: 'rgba(255,255,255,0.08)'}}>
        <div style={{height: '100%', width: `${progress * 100}%`, borderRadius: 3, background: C.sub}} />
      </div>
    </>
  );
};

// ---------------------------------------------------------------------------
// Scene renderer
// ---------------------------------------------------------------------------
const renderScene = (s: SceneDef) => {
  switch (s.kind) {
    case 'hook':
      return <SceneHook />;
    case 'margin':
      return <SceneMargin />;
    case 'lines':
      return <SceneLines text={s.text!} highlights={s.highlights} reveal={s.reveal} />;
    case 'text':
      return <SceneText text={s.text!} highlights={s.highlights} />;
    case 'rent':
      return <SceneRent />;
    case 'fills':
      return <SceneFills />;
    case 'revenue':
      return <SceneRevenue />;
    case 'moat':
      return <SceneMoat />;
    case 'outro':
      return <SceneOutro />;
    default:
      return null;
  }
};

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
export const StorageVideo: React.FC = () => {
  const frame = useCurrentFrame();

  const globalOpacity = interpolate(
    frame,
    [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('voiceover.mp3')} /> : null}
      <AbsoluteFill style={{opacity: globalOpacity}}>
        {/* media layer (Pexels stills + video) */}
        {SCENES.map((s, i) =>
          s.media ? (
            <Sequence key={`m${i}`} from={STARTS[i]} durationInFrames={s.dur} name={`bg-${i}-${s.kind}`}>
              <MediaBackground cfg={s.media} />
            </Sequence>
          ) : null,
        )}
        {/* global grade over media, under text */}
        <Treatment />
        {/* text / graphics layer */}
        {SCENES.map((s, i) => (
          <Sequence key={i} from={STARTS[i]} durationInFrames={s.dur} name={`${i}-${s.kind}`}>
            <SceneTransition>{renderScene(s)}</SceneTransition>
          </Sequence>
        ))}
        <Hud />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const SceneTransition: React.FC<{children: React.ReactNode}> = ({children}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const opacity = interpolate(
    frame,
    [0, 8, durationInFrames - 8, durationInFrames],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  // Text-only shadow (halo on the glyphs, not an overlay on the clip) so type
  // stays legible over full-brightness footage. Inherited by all descendant text.
  return (
    <AbsoluteFill style={{opacity, textShadow: '0 2px 22px rgba(0,0,0,0.6), 0 2px 5px rgba(0,0,0,0.72)'}}>
      {children}
    </AbsoluteFill>
  );
};
