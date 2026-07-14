import React from 'react';
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from 'remotion';
import {loadFont as loadInter} from '@remotion/google-fonts/Inter';
import {loadFont as loadArchivo} from '@remotion/google-fonts/Archivo';

const {fontFamily: INTER} = loadInter();
const {fontFamily: ARCHIVO} = loadArchivo();

// ---------------------------------------------------------------------------
// Composition constants
// ---------------------------------------------------------------------------
export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

// Palette — dark, cinematic, "money" amber with a green accent for the payoff.
const C = {
  bg0: '#0A0C10',
  bg1: '#111620',
  ink: '#F4F7FB',
  muted: '#7C8794',
  amber: '#FFB020',
  amberDim: '#3A2E15',
  green: '#22C275',
  line: 'rgba(255,255,255,0.06)',
};

// ---------------------------------------------------------------------------
// Scene timeline (frames @ 30fps). Total = 1350 frames = 45.0s
// ---------------------------------------------------------------------------
type SceneDef = {dur: number; kind: string; text?: string; highlights?: string[]};

const SCENES: SceneDef[] = [
  {dur: 120, kind: 'hook', text: 'You drive past this building every day.'},
  {dur: 135, kind: 'margin'},
  {dur: 120, kind: 'lines', text: 'Metal boxes.|Cheap land.|Almost no staff.'},
  {dur: 120, kind: 'lines', text: 'No inventory.|Nothing to restock.|Nothing spoils.'},
  {dur: 105, kind: 'text', text: 'Once the building is up,|costs barely move.', highlights: ['costs barely move']},
  {dur: 105, kind: 'rent', text: 'Rent rises every year.|Automatically.'},
  {dur: 105, kind: 'text', text: 'Moving out costs|a weekend and a truck.', highlights: ['a weekend and a truck']},
  {dur: 120, kind: 'text', text: 'Recessions cause moves,|divorces, downsizing.', highlights: ['moves', 'divorces', 'downsizing']},
  {dur: 75, kind: 'fills', text: 'Storage fills.'},
  {dur: 135, kind: 'revenue'},
  {dur: 120, kind: 'moat', text: 'Nobody moves out.'},
  {dur: 90, kind: 'outro', text: 'No brand. No buzz. Just rent.'},
];

// cumulative starts
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

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------
const useLocal = () => useCurrentFrame();

const easeInOut = Easing.bezier(0.22, 1, 0.36, 1);

// ---------------------------------------------------------------------------
// Background: faint storage facade + grid + vignette + grain
// ---------------------------------------------------------------------------
const StorageFacade: React.FC<{intensity: number}> = ({intensity}) => {
  const frame = useCurrentFrame();
  const cols = 6;
  const rows = 5;
  const drift = interpolate(frame, [0, DURATION_IN_FRAMES], [0, -60]);
  const doors: React.ReactNode[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const idx = r * cols + c;
      doors.push(
        <div
          key={idx}
          style={{
            position: 'relative',
            borderRadius: 6,
            background:
              'repeating-linear-gradient(180deg,#20262f 0px,#20262f 6px,#171c24 6px,#171c24 12px)',
            border: '1px solid rgba(255,255,255,0.05)',
            boxShadow: 'inset 0 -8px 20px rgba(0,0,0,0.5)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: '30%',
              right: '30%',
              bottom: 8,
              height: 5,
              borderRadius: 3,
              background: 'rgba(255,176,32,0.25)',
            }}
          />
        </div>,
      );
    }
  }
  return (
    <AbsoluteFill style={{opacity: intensity}}>
      <div
        style={{
          position: 'absolute',
          left: -40,
          right: -40,
          top: 120 + drift,
          bottom: 120,
          display: 'grid',
          gridTemplateColumns: `repeat(${cols},1fr)`,
          gridTemplateRows: `repeat(${rows},1fr)`,
          gap: 14,
          transform: 'perspective(1400px) rotateX(6deg) scale(1.05)',
          filter: 'blur(0.4px)',
        }}
      >
        {doors}
      </div>
    </AbsoluteFill>
  );
};

const Grain: React.FC = () => {
  const frame = useCurrentFrame();
  const shift = (frame * 7) % 200;
  return (
    <AbsoluteFill
      style={{
        opacity: 0.05,
        mixBlendMode: 'overlay',
        backgroundImage:
          'radial-gradient(rgba(255,255,255,0.9) 0.5px, transparent 0.6px)',
        backgroundSize: '3px 3px',
        backgroundPosition: `${shift}px ${shift}px`,
        pointerEvents: 'none',
      }}
    />
  );
};

const Background: React.FC<{facade: number}> = ({facade}) => {
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          background: `radial-gradient(120% 80% at 50% 12%, ${C.bg1} 0%, ${C.bg0} 60%, #05070A 100%)`,
        }}
      />
      <StorageFacade intensity={facade} />
      {/* thin grid */}
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${C.line} 1px, transparent 1px), linear-gradient(90deg, ${C.line} 1px, transparent 1px)`,
          backgroundSize: '90px 90px',
          maskImage:
            'radial-gradient(80% 60% at 50% 45%, black 30%, transparent 100%)',
        }}
      />
      <Grain />
      {/* vignette */}
      <AbsoluteFill
        style={{
          boxShadow: 'inset 0 0 400px rgba(0,0,0,0.85)',
        }}
      />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// Word-by-word staggered caption
// ---------------------------------------------------------------------------
const Caption: React.FC<{
  text: string; // lines separated by |
  highlights?: string[];
  size?: number;
  weight?: number;
  color?: string;
  lineDelay?: number;
}> = ({text, highlights = [], size = 78, weight = 800, color = C.ink, lineDelay = 0}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const lines = text.split('|');

  const isHi = (w: string) => {
    const clean = w.replace(/[.,]/g, '').toLowerCase();
    return highlights.some((h) => h.toLowerCase().split(' ').includes(clean) || h.toLowerCase() === clean);
  };

  let wordIndex = 0;
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center'}}>
      {lines.map((line, li) => (
        <div
          key={li}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0 18px',
          }}
        >
          {line.split(' ').map((word, wi) => {
            const appear = lineDelay + wordIndex * 2.2;
            wordIndex++;
            const p = spring({frame: frame - appear, fps, config: {damping: 200, mass: 0.6}});
            const y = interpolate(p, [0, 1], [34, 0]);
            const hi = isHi(word);
            return (
              <span
                key={wi}
                style={{
                  display: 'inline-block',
                  fontFamily: ARCHIVO,
                  fontWeight: hi ? 900 : weight,
                  fontSize: size,
                  lineHeight: 1.04,
                  letterSpacing: -1,
                  color: hi ? C.amber : color,
                  opacity: p,
                  transform: `translateY(${y}px)`,
                  textShadow: hi ? '0 0 32px rgba(255,176,32,0.35)' : 'none',
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

// ---------------------------------------------------------------------------
// Scene: HOOK
// ---------------------------------------------------------------------------
const SceneHook: React.FC = () => {
  const frame = useLocal();
  const {fps} = useVideoConfig();
  const kicker = spring({frame: frame - 4, fps, config: {damping: 200}});
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', padding: 90}}>
      <div
        style={{
          fontFamily: INTER,
          fontWeight: 700,
          fontSize: 26,
          letterSpacing: 8,
          color: C.amber,
          opacity: kicker,
          marginBottom: 42,
          transform: `translateY(${interpolate(kicker, [0, 1], [-14, 0])}px)`,
        }}
      >
        THE ASSET NOBODY TALKS ABOUT
      </div>
      <Caption text="You drive past|this building|every day." highlights={['building']} size={96} lineDelay={10} />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// Scene: MARGIN — 79 cents on every dollar (margin bar)
// ---------------------------------------------------------------------------
const SceneMargin: React.FC = () => {
  const frame = useLocal();
  const {fps} = useVideoConfig();
  const enter = spring({frame: frame - 6, fps, config: {damping: 200}});
  const fill = interpolate(frame, [16, 64], [0, 79], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeInOut});
  const count = Math.round(fill);

  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', padding: 80}}>
      <div style={{opacity: enter, transform: `translateY(${interpolate(enter, [0, 1], [30, 0])}px)`, textAlign: 'center'}}>
        <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 30, letterSpacing: 4, color: C.muted, marginBottom: 18}}>
          IT KEEPS
        </div>
        <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 4}}>
          <span style={{fontFamily: ARCHIVO, fontWeight: 900, fontSize: 300, color: C.amber, lineHeight: 0.9, letterSpacing: -8, textShadow: '0 0 60px rgba(255,176,32,0.35)'}}>
            {count}
          </span>
          <span style={{fontFamily: ARCHIVO, fontWeight: 900, fontSize: 120, color: C.amber, lineHeight: 1}}>¢</span>
        </div>
        <div style={{fontFamily: INTER, fontWeight: 600, fontSize: 40, color: C.ink, marginTop: 4}}>
          on every dollar
        </div>
      </div>

      {/* margin bar */}
      <div style={{width: 760, marginTop: 70, opacity: interpolate(frame, [12, 26], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
        <div style={{height: 46, width: '100%', borderRadius: 10, background: C.amberDim, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)'}}>
          <div style={{height: '100%', width: `${fill}%`, background: `linear-gradient(90deg,#FFC24D,${C.amber})`, boxShadow: '0 0 24px rgba(255,176,32,0.5)'}} />
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 16, fontFamily: INTER, fontSize: 24, color: C.muted}}>
          <span style={{color: C.amber, fontWeight: 700}}>KEPT · {count}%</span>
          <span>COSTS · {100 - count}%</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// Scene: LINES — stacked staggered short phrases with ticks
// ---------------------------------------------------------------------------
const SceneLines: React.FC<{text: string}> = ({text}) => {
  const frame = useLocal();
  const {fps} = useVideoConfig();
  const lines = text.split('|');
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'flex-start', padding: '0 100px'}}>
      <div style={{display: 'flex', flexDirection: 'column', gap: 30}}>
        {lines.map((l, i) => {
          const p = spring({frame: frame - (8 + i * 14), fps, config: {damping: 200}});
          const x = interpolate(p, [0, 1], [-60, 0]);
          return (
            <div key={i} style={{display: 'flex', alignItems: 'center', gap: 26, opacity: p, transform: `translateX(${x}px)`}}>
              <div style={{width: 20, height: 20, borderRadius: 5, background: C.amber, boxShadow: '0 0 20px rgba(255,176,32,0.5)', transform: `scale(${p})`}} />
              <span style={{fontFamily: ARCHIVO, fontWeight: 800, fontSize: 82, color: C.ink, letterSpacing: -1}}>{l}</span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// Scene: generic centered TEXT
// ---------------------------------------------------------------------------
const SceneText: React.FC<{text: string; highlights?: string[]; size?: number}> = ({text, highlights, size = 80}) => {
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', padding: 90}}>
      <Caption text={text} highlights={highlights} size={size} lineDelay={6} />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// Scene: RENT — rising staircase of rising rent
// ---------------------------------------------------------------------------
const SceneRent: React.FC = () => {
  const frame = useLocal();
  const {fps} = useVideoConfig();
  const bars = [0.35, 0.5, 0.65, 0.8, 1];
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', padding: 80}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 22, height: 420, marginBottom: 60}}>
        {bars.map((h, i) => {
          const p = spring({frame: frame - (10 + i * 10), fps, config: {damping: 200}});
          return (
            <div
              key={i}
              style={{
                width: 92,
                height: 420 * h * p,
                borderRadius: '10px 10px 0 0',
                background: `linear-gradient(180deg,${C.amber},#B9781A)`,
                boxShadow: '0 0 30px rgba(255,176,32,0.25)',
              }}
            />
          );
        })}
        <div style={{position: 'absolute', right: 120, top: 40, fontFamily: ARCHIVO, fontWeight: 900, fontSize: 60, color: C.amber, opacity: spring({frame: frame - 50, fps, config: {damping: 200}})}}>↗</div>
      </div>
      <Caption text="Rent rises every year.|Automatically." highlights={['Automatically.']} size={72} lineDelay={4} />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// Scene: FILLS — impact word
// ---------------------------------------------------------------------------
const SceneFills: React.FC = () => {
  const frame = useLocal();
  const {fps} = useVideoConfig();
  const p = spring({frame, fps, config: {damping: 12, mass: 0.8, stiffness: 120}});
  const scale = interpolate(p, [0, 1], [0.6, 1]);
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
      <div style={{transform: `scale(${scale})`, opacity: Math.min(1, p * 1.4), fontFamily: ARCHIVO, fontWeight: 900, fontSize: 150, color: C.ink, letterSpacing: -3, textAlign: 'center'}}>
        Storage<br />
        <span style={{color: C.amber, textShadow: '0 0 50px rgba(255,176,32,0.4)'}}>fills.</span>
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// Scene: REVENUE — $4.8B counter
// ---------------------------------------------------------------------------
const SceneRevenue: React.FC = () => {
  const frame = useLocal();
  const {fps} = useVideoConfig();
  const enter = spring({frame: frame - 4, fps, config: {damping: 200}});
  const v = interpolate(frame, [14, 70], [0, 4.8], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeInOut});
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', padding: 70}}>
      <div style={{opacity: enter, transform: `translateY(${interpolate(enter, [0, 1], [26, 0])}px)`, textAlign: 'center'}}>
        <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'center'}}>
          <span style={{fontFamily: ARCHIVO, fontWeight: 900, fontSize: 170, color: C.amber, lineHeight: 1}}>$</span>
          <span style={{fontFamily: ARCHIVO, fontWeight: 900, fontSize: 300, color: C.amber, lineHeight: 0.9, letterSpacing: -6, textShadow: '0 0 60px rgba(255,176,32,0.35)'}}>{v.toFixed(1)}</span>
          <span style={{fontFamily: ARCHIVO, fontWeight: 900, fontSize: 170, color: C.amber, lineHeight: 1}}>B</span>
        </div>
        <div style={{fontFamily: INTER, fontWeight: 600, fontSize: 46, color: C.ink, marginTop: 10}}>in annual revenue</div>
        <div style={{fontFamily: INTER, fontWeight: 500, fontSize: 26, letterSpacing: 3, color: C.muted, marginTop: 18}}>
          U.S. SELF-STORAGE INDUSTRY
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// Scene: MOAT — the payoff
// ---------------------------------------------------------------------------
const SceneMoat: React.FC = () => {
  const frame = useLocal();
  const {fps} = useVideoConfig();
  const p1 = spring({frame: frame - 4, fps, config: {damping: 200}});
  const p2 = spring({frame: frame - 40, fps, config: {damping: 14, stiffness: 90}});
  const underline = interpolate(frame, [58, 82], [0, 100], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeInOut});
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', padding: 80}}>
      <div style={{opacity: p1, transform: `translateY(${interpolate(p1, [0, 1], [24, 0])}px)`, fontFamily: ARCHIVO, fontWeight: 800, fontSize: 84, color: C.ink, textAlign: 'center', marginBottom: 40}}>
        Nobody moves out.
      </div>
      <div style={{opacity: p2, transform: `scale(${interpolate(p2, [0, 1], [0.7, 1])})`, textAlign: 'center'}}>
        <div style={{fontFamily: INTER, fontWeight: 600, fontSize: 34, letterSpacing: 4, color: C.muted}}>THAT IS THE</div>
        <div style={{fontFamily: ARCHIVO, fontWeight: 900, fontSize: 210, color: C.green, letterSpacing: -4, lineHeight: 1, textShadow: '0 0 70px rgba(34,194,117,0.4)'}}>MOAT</div>
        <div style={{height: 10, width: `${underline}%`, margin: '0 auto', borderRadius: 6, background: C.green, boxShadow: '0 0 30px rgba(34,194,117,0.6)'}} />
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// Scene: OUTRO
// ---------------------------------------------------------------------------
const SceneOutro: React.FC = () => {
  const frame = useLocal();
  const {fps} = useVideoConfig();
  const parts = ['No brand.', 'No buzz.', 'Just rent.'];
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
      <div style={{display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'center'}}>
        {parts.map((t, i) => {
          const p = spring({frame: frame - (6 + i * 16), fps, config: {damping: 200}});
          const last = i === parts.length - 1;
          return (
            <span key={i} style={{fontFamily: ARCHIVO, fontWeight: 900, fontSize: last ? 120 : 90, color: last ? C.amber : C.ink, letterSpacing: -2, opacity: p, transform: `translateY(${interpolate(p, [0, 1], [30, 0])}px)`, textShadow: last ? '0 0 50px rgba(255,176,32,0.4)' : 'none'}}>
              {t}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// HUD — progress bar + narration-style waveform + label
// ---------------------------------------------------------------------------
const Hud: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = frame / DURATION_IN_FRAMES;
  const bars = 40;
  return (
    <>
      {/* top label */}
      <div style={{position: 'absolute', top: 70, left: 80, display: 'flex', alignItems: 'center', gap: 14}}>
        <div style={{width: 12, height: 12, borderRadius: 12, background: C.amber, boxShadow: '0 0 14px rgba(255,176,32,0.8)'}} />
        <span style={{fontFamily: INTER, fontWeight: 700, fontSize: 22, letterSpacing: 4, color: C.muted}}>THE STORAGE MOAT</span>
      </div>

      {/* waveform */}
      <div style={{position: 'absolute', bottom: 120, left: 80, right: 80, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        {Array.from({length: bars}).map((_, i) => {
          const seed = Math.sin(i * 12.9898) * 43758.5453;
          const base = 0.25 + (seed - Math.floor(seed)) * 0.75;
          const wobble = 0.5 + 0.5 * Math.sin((frame / 4) + i * 0.6);
          const active = i / bars < progress;
          const h = 8 + 44 * base * (0.4 + 0.6 * wobble);
          return (
            <div key={i} style={{width: 7, height: h, borderRadius: 4, background: active ? C.amber : 'rgba(255,255,255,0.14)', opacity: active ? 0.9 : 0.5}} />
          );
        })}
      </div>

      {/* progress line */}
      <div style={{position: 'absolute', bottom: 90, left: 80, right: 80, height: 4, borderRadius: 4, background: 'rgba(255,255,255,0.1)'}}>
        <div style={{height: '100%', width: `${progress * 100}%`, borderRadius: 4, background: C.amber}} />
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
      return <SceneLines text={s.text!} />;
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

// Which scenes show the building facade more strongly
const facadeFor = (kind: string) => {
  if (kind === 'hook') return 0.55;
  if (kind === 'lines') return 0.32;
  if (kind === 'outro') return 0.4;
  return 0.16;
};

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
export const StorageVideo: React.FC = () => {
  const frame = useCurrentFrame();

  // find current scene for background intensity
  let currentKind = SCENES[0].kind;
  for (let i = 0; i < SCENES.length; i++) {
    if (frame >= STARTS[i] && frame < STARTS[i] + SCENES[i].dur) {
      currentKind = SCENES[i].kind;
      break;
    }
  }

  // global fade in/out
  const globalOpacity = interpolate(
    frame,
    [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  return (
    <AbsoluteFill style={{backgroundColor: C.bg0, opacity: globalOpacity}}>
      <Background facade={facadeFor(currentKind)} />

      {SCENES.map((s, i) => (
        <Sequence key={i} from={STARTS[i]} durationInFrames={s.dur} name={`${i}-${s.kind}`}>
          <SceneTransition>{renderScene(s)}</SceneTransition>
        </Sequence>
      ))}

      <Hud />
    </AbsoluteFill>
  );
};

// per-scene fade so crossovers are smooth
const SceneTransition: React.FC<{children: React.ReactNode}> = ({children}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const opacity = interpolate(
    frame,
    [0, 8, durationInFrames - 8, durationInFrames],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  return <AbsoluteFill style={{opacity}}>{children}</AbsoluteFill>;
};
