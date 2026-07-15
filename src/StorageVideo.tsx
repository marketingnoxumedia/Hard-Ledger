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
};

// ---------------------------------------------------------------------------
// Timeline — narration public/voiceover.mp3 (~79.7s). Total 2398 frames = 79.93s
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  {dur: 96, kind: 'hook', text: "There's a business|on the edge of your town.", kicker: 'The asset nobody talks about', highlights: ['business'], size: 92, media: {src: 'media/clip_industrial.mp4', type: 'video', from: 0, effect: 'in', scrim: 0.55}},
  {dur: 108, kind: 'lines', text: 'No employees.|No product.|No customers|who ever leave.', highlights: ['leave'], reveal: [0, 22, 44, 68], media: {src: 'media/clip_yard.mp4', type: 'video', from: 0, effect: 'panL', scrim: 0.58}},
  {dur: 108, kind: 'stat', stat: {pre: 'Last year it made', prefix: '$', value: 4.8, decimals: 1, suffix: 'B'}, media: {src: 'media/p_cash_briefcase.jpeg', type: 'img', effect: 'in', scrim: 0.64}},
  {dur: 96, kind: 'text', text: 'Public Storage rents|simple, unstaffed|metal units.', highlights: ['unstaffed'], size: 90, media: {src: 'media/clip_warehouse.mp4', type: 'video', from: 0, effect: 'in', scrim: 0.58}},
  {dur: 84, kind: 'lines', text: 'Low labour.|Low upkeep.|Rent due monthly.', highlights: ['monthly'], reveal: [0, 22, 44], media: {src: 'media/clip_yard.mp4', type: 'video', from: 120, effect: 'panR', scrim: 0.58}},
  {dur: 108, kind: 'text', text: 'A unit rented and forgotten|is close to pure margin.', highlights: ['margin'], size: 84, media: {src: 'media/p_cash_bills.jpeg', type: 'img', effect: 'in', scrim: 0.64}},
  {dur: 100, kind: 'text', text: 'Once a facility is built,|it runs on almost nothing.', highlights: ['nothing'], size: 86, media: {src: 'media/clip_warehouse.mp4', type: 'video', from: 90, effect: 'out', scrim: 0.58}},
  {dur: 108, kind: 'lines', text: 'No inventory.|Minimal staff.|Automatic rent increases.', highlights: ['automatic'], reveal: [0, 24, 48], media: {src: 'media/clip_industrial.mp4', type: 'video', from: 120, effect: 'panL', scrim: 0.58}},
  {dur: 66, kind: 'text', text: 'And customers|who rarely leave.', highlights: ['rarely'], size: 94, media: {src: 'media/clip_yard.mp4', type: 'video', from: 60, effect: 'in', scrim: 0.58}},
  {dur: 108, kind: 'text', text: 'The moat is unglamorous —|and that is why it holds.', highlights: ['moat'], size: 86, media: {src: 'media/clip_warehouse.mp4', type: 'video', from: 30, effect: 'in', scrim: 0.58}},
  {dur: 96, kind: 'text', text: 'Moving them out costs|a weekend and a truck.', highlights: ['truck'], size: 90, media: {src: 'media/p_truck_night.jpeg', type: 'img', effect: 'panR', scrim: 0.48}},
  {dur: 126, kind: 'text', text: 'A small annual rent increase|is easier to accept|than to fight.', highlights: ['fight'], size: 82, media: {src: 'media/clip_truck.mp4', type: 'video', from: 0, effect: 'in', scrim: 0.58}},
  {dur: 78, kind: 'text', text: 'Occupancy holds|through downturns.', highlights: ['downturns'], size: 92, media: {src: 'media/clip_industrial.mp4', type: 'video', from: 60, effect: 'out', scrim: 0.58}},
  {dur: 72, kind: 'text', text: 'Moves. Divorces.|Downsizing.', highlights: ['downsizing'], size: 94, media: {src: 'media/clip_truck.mp4', type: 'video', from: 90, effect: 'in', scrim: 0.58}},
  {dur: 78, kind: 'text', text: 'The exact things|recessions produce.', highlights: ['recessions'], size: 90, media: {src: 'media/clip_industrial.mp4', type: 'video', from: 100, effect: 'in', scrim: 0.58}},
  {dur: 54, kind: 'text', text: 'This is a REIT.', highlights: ['reit'], size: 112},
  {dur: 96, kind: 'stat', stat: {prefix: '$', value: 4.8, decimals: 1, suffix: 'B', post: 'in annual revenue'}, media: {src: 'media/p_cash_briefcase.jpeg', type: 'img', effect: 'out', scrim: 0.64}},
  {dur: 90, kind: 'text', text: 'A fortress balance sheet.|Built on sheds.', highlights: ['sheds'], size: 90, media: {src: 'media/clip_warehouse.mp4', type: 'video', from: 60, effect: 'in', scrim: 0.58}},
  {dur: 90, kind: 'stat', stat: {pre: 'Operating margins', value: 79, suffix: '%', bar: 79}},
  {dur: 66, kind: 'stat', stat: {pre: 'Same-store', value: 78, suffix: '%'}},
  {dur: 72, kind: 'stat', stat: {pre: 'Net margin', value: 37, suffix: '%'}},
  {dur: 114, kind: 'text', text: 'Once the building is up,|there is almost nothing|on the cost side.', highlights: ['nothing'], size: 82, media: {src: 'media/clip_yard.mp4', type: 'video', from: 30, effect: 'out', scrim: 0.58}},
  {dur: 60, kind: 'impact', text: 'Boring is|beautiful.', redBg: true},
  {dur: 132, kind: 'text', text: 'A shed you forget|you are paying for —|one of the most profitable|in the country.', highlights: ['profitable'], size: 76, media: {src: 'media/clip_industrial.mp4', type: 'video', from: 30, effect: 'in', scrim: 0.58}},
  {dur: 84, kind: 'outro'},
  {dur: 108, kind: 'text', text: 'The absence of a story|is part of why|the margins survive.', highlights: ['survive'], size: 82},
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
// Media background
// ---------------------------------------------------------------------------
const MediaBackground: React.FC<{cfg: MediaCfg}> = ({cfg}) => {
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
  const opacity = interpolate(frame, [0, 5, durationInFrames - 5, durationInFrames], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const src = staticFile(cfg.src);
  const mediaStyle: React.CSSProperties = {width: '100%', height: '100%', objectFit: 'cover'};
  return (
    <AbsoluteFill style={{opacity}}>
      <AbsoluteFill style={{transform: `scale(${scale}) translateX(${tx}%)`, transformOrigin: 'center'}}>
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
// Kinetic caption — Anton condensed caps, word-by-word, red highlight
// ---------------------------------------------------------------------------
const Caption: React.FC<{text: string; highlights?: string[]; size?: number; align?: 'center' | 'flex-start'; lineDelay?: number}> = ({text, highlights = [], size = 112, align = 'center', lineDelay = 0}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const lines = text.split('|');
  const hset = highlights.map((h) => h.toLowerCase());
  const isHi = (w: string) => hset.includes(w.replace(/[.,—-]/g, '').toLowerCase());
  let wordIndex = 0;
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 2, alignItems: align, width: '100%'}}>
      {lines.map((line, li) => (
        <div key={li} style={{display: 'flex', flexWrap: 'wrap', justifyContent: align === 'center' ? 'center' : 'flex-start', gap: '0 18px'}}>
          {line.split(' ').map((word, wi) => {
            const appear = lineDelay + wordIndex * 2;
            wordIndex++;
            const p = spring({frame: frame - appear, fps, config: {damping: 200, mass: 0.6}});
            const y = interpolate(p, [0, 1], [38, 0]);
            const hi = isHi(word);
            return (
              <span key={wi} style={{display: 'inline-block', fontFamily: HEAD, fontSize: size, lineHeight: 0.98, letterSpacing: 0.5, textTransform: 'uppercase', color: hi ? C.red : C.ink, opacity: p, transform: `translateY(${y}px)`, textShadow: hi ? '0 0 40px rgba(255,46,46,0.35)' : 'none'}}>
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
// Scenes
// ---------------------------------------------------------------------------
const SceneHook: React.FC<{text: string; kicker?: string; highlights?: string[]; size?: number}> = ({text, kicker, highlights, size = 92}) => (
  <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', padding: 84}}>
    {kicker ? <div style={{marginBottom: 44}}><Kicker>{kicker}</Kicker></div> : null}
    <Caption text={text} highlights={highlights} size={size} lineDelay={10} />
  </AbsoluteFill>
);

const SceneText: React.FC<{text: string; highlights?: string[]; size?: number}> = ({text, highlights, size = 100}) => (
  <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', padding: 84}}>
    <Caption text={text} highlights={highlights} size={size} lineDelay={6} />
  </AbsoluteFill>
);

const SceneLines: React.FC<{text: string; highlights?: string[]; reveal?: number[]}> = ({text, highlights = [], reveal}) => {
  const frame = useLocal();
  const {fps} = useVideoConfig();
  const lines = text.split('|');
  const hset = highlights.map((h) => h.toLowerCase());
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'flex-start', padding: '0 96px'}}>
      <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
        {lines.map((l, i) => {
          const appearAt = reveal ? reveal[i] : 8 + i * 14;
          const pv = spring({frame: frame - appearAt, fps, config: {damping: 200}});
          const x = interpolate(pv, [0, 1], [-60, 0]);
          return (
            <div key={i} style={{opacity: pv, transform: `translateX(${x}px)`, fontFamily: HEAD, fontSize: 96, lineHeight: 0.98, letterSpacing: 0.5, textTransform: 'uppercase'}}>
              {l.split(' ').map((w, wi) => {
                const hi = hset.includes(w.replace(/[.,—-]/g, '').toLowerCase());
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

const SceneStat: React.FC<{stat: StatCfg}> = ({stat}) => {
  const frame = useLocal();
  const {fps} = useVideoConfig();
  const enter = spring({frame: frame - 4, fps, config: {damping: 200}});
  const t = interpolate(frame, [8, 46], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeInOut});
  const shown = stat.value * t;
  const num = stat.decimals ? shown.toFixed(stat.decimals) : String(Math.round(shown));
  const barW = stat.bar != null ? interpolate(frame, [10, 50], [0, stat.bar], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeInOut}) : 0;
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', padding: 80}}>
      <div style={{opacity: enter, transform: `translateY(${interpolate(enter, [0, 1], [26, 0])}px)`, textAlign: 'center'}}>
        {stat.pre ? <div style={{fontFamily: BODY, fontWeight: 700, fontSize: 30, letterSpacing: 6, color: C.ink, textTransform: 'uppercase', marginBottom: 8}}>{stat.pre}</div> : null}
        <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'center'}}>
          {stat.prefix ? <span style={{fontFamily: HEAD, fontSize: 170, color: C.red, lineHeight: 1}}>{stat.prefix}</span> : null}
          <span style={{fontFamily: HEAD, fontSize: 300, color: C.red, lineHeight: 0.85, letterSpacing: 2, textShadow: '0 0 70px rgba(255,46,46,0.35)'}}>{num}</span>
          {stat.suffix ? <span style={{fontFamily: HEAD, fontSize: 170, color: C.red, lineHeight: 1}}>{stat.suffix}</span> : null}
        </div>
        {stat.post ? <div style={{fontFamily: BODY, fontWeight: 600, fontSize: 46, color: C.ink, marginTop: 6, textTransform: 'uppercase', letterSpacing: 1}}>{stat.post}</div> : null}
      </div>
      {stat.bar != null ? (
        <div style={{width: 780, marginTop: 60, opacity: interpolate(frame, [12, 26], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
          <div style={{height: 40, width: '100%', borderRadius: 4, background: C.track, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)'}}>
            <div style={{height: '100%', width: `${barW}%`, background: C.red, boxShadow: '0 0 30px rgba(255,46,46,0.45)'}} />
          </div>
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

const SceneImpact: React.FC<{text: string; redBg?: boolean}> = ({text, redBg}) => {
  const frame = useLocal();
  const {fps} = useVideoConfig();
  const p = spring({frame, fps, config: {damping: 13, mass: 0.8, stiffness: 120}});
  const scale = interpolate(p, [0, 1], [0.66, 1]);
  const lines = text.split('|');
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
      {redBg ? <AbsoluteFill style={{background: 'radial-gradient(125% 90% at 50% 42%, #FF2E2E 0%, #E31E1E 62%, #C21414 100%)'}} /> : null}
      <div style={{transform: `scale(${scale})`, opacity: Math.min(1, p * 1.4), textAlign: 'center', fontFamily: HEAD, fontSize: 150, lineHeight: 0.92, letterSpacing: 1, textTransform: 'uppercase'}}>
        {lines.map((l, i) => (
          <div key={i} style={{color: redBg ? (i === 0 ? '#0A0A0A' : C.ink) : (i === lines.length - 1 ? C.red : C.ink), textShadow: redBg ? 'none' : i === lines.length - 1 ? '0 0 60px rgba(255,46,46,0.4)' : 'none'}}>
            {l}
          </div>
        ))}
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
          const s = spring({frame: frame - (6 + i * 14), fps, config: {damping: 200}});
          return (
            <span key={i} style={{fontFamily: HEAD, fontSize: p.red ? 150 : 116, textTransform: 'uppercase', letterSpacing: 1, color: C.ink, opacity: s, transform: `translateY(${interpolate(s, [0, 1], [34, 0])}px)`}}>
              {p.red ? (<>Just <span style={{color: C.red, textShadow: '0 0 60px rgba(255,46,46,0.4)'}}>rent.</span></>) : p.t}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

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
          return <div key={i} style={{width: 6, height: h, borderRadius: 3, background: active ? C.sub : 'rgba(255,255,255,0.1)', opacity: active ? 0.85 : 0.5}} />;
        })}
      </div>
      <div style={{position: 'absolute', bottom: 90, left: 80, right: 80, height: 3, borderRadius: 3, background: 'rgba(255,255,255,0.08)'}}>
        <div style={{height: '100%', width: `${progress * 100}%`, borderRadius: 3, background: C.sub}} />
      </div>
    </>
  );
};

const renderScene = (s: SceneDef) => {
  switch (s.kind) {
    case 'hook':
      return <SceneHook text={s.text!} kicker={s.kicker} highlights={s.highlights} size={s.size} />;
    case 'lines':
      return <SceneLines text={s.text!} highlights={s.highlights} reveal={s.reveal} />;
    case 'text':
      return <SceneText text={s.text!} highlights={s.highlights} size={s.size} />;
    case 'stat':
      return <SceneStat stat={s.stat!} />;
    case 'impact':
      return <SceneImpact text={s.text!} redBg={s.redBg} />;
    case 'outro':
      return <SceneOutro />;
    default:
      return null;
  }
};

// ---------------------------------------------------------------------------
export const StorageVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('media/music.mp3')}
        volume={(f) => interpolate(f, [0, 20, DURATION_IN_FRAMES - 55, DURATION_IN_FRAMES], [0, 0.16, 0.16, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}
      />
      <AbsoluteFill style={{opacity: globalOpacity}}>
        {SCENES.map((s, i) =>
          s.media ? (
            <Sequence key={`m${i}`} from={STARTS[i]} durationInFrames={s.dur} name={`bg-${i}-${s.kind}`}>
              <MediaBackground cfg={s.media} />
            </Sequence>
          ) : null,
        )}
        <Treatment />
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
  const opacity = interpolate(frame, [0, 4, durationInFrames - 4, durationInFrames], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{opacity, textShadow: '0 2px 22px rgba(0,0,0,0.6), 0 2px 5px rgba(0,0,0,0.72)'}}>{children}</AbsoluteFill>;
};
