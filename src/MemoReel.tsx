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
import {loadFont as loadArchivoBlack} from '@remotion/google-fonts/ArchivoBlack';
import {loadFont as loadArchivoNarrow} from '@remotion/google-fonts/ArchivoNarrow';

const {fontFamily: ARCHIVO_BLACK} = loadArchivoBlack();
const {fontFamily: ARCHIVO_NARROW} = loadArchivoNarrow();

const HEAD = ARCHIVO_BLACK;
const BODY = `'${ARCHIVO_NARROW}','Arial Narrow',sans-serif`;

// ---------------------------------------------------------------------------
export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

const HAS_VOICEOVER = true;

const C = {
  bg: '#0C0C0C',
  ink: '#F2F2F2',
  sub: '#B7B2A6',
  red: '#FF2E2E',
  paperBg: '#C9C3B5',
  paperInk: '#161309',
  paperSub: '#5A5446',
};

const SH = '0 2px 6px rgba(0,0,0,0.55), 0 4px 20px rgba(0,0,0,0.35)';

// Procedural film-grain and paper-fibre textures (inline SVG turbulence).
const GRAIN = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";
const PAPER = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.014' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23p)'/%3E%3C/svg%3E\")";

// ---------------------------------------------------------------------------
type Ground = 'paper' | 'dark';
type Treat = 'cutout' | 'silhouette' | 'panel' | 'none';
type MediaCfg = {src: string; type: 'img' | 'video'; from?: number};
type StatCfg = {pre?: string; prefix?: string; value: number; decimals?: number; suffix?: string; post?: string};
type ChartCfg = {a: {label: string; value: number}; b: {label: string; value: number; red?: boolean}; unit?: string; decimals?: number; prefix?: string; suffix?: string};
type SceneDef = {
  dur: number;
  kind: 'hook' | 'lines' | 'text' | 'stat' | 'chart' | 'impact';
  text?: string;
  highlights?: string[];
  reveal?: number[];
  size?: number;
  stat?: StatCfg;
  chart?: ChartCfg;
  ground: Ground;
  treat?: Treat;
  cut?: string;      // RGBA cut-out PNG (for cutout / silhouette)
  media?: MediaCfg;  // framed media (for panel)
};

// ---------------------------------------------------------------------------
// "One memo" reel (MemoReel) — restyled as a gritty COLLAGE in the manner of the
// client's reference video: a light cracked-paper ground with subjects CUT OUT
// (backgrounds removed via rembg) and pasted as objects or pure-black
// SILHOUETTES, framed photo/video PANELS for scenes that don't isolate, heavy
// editorial type, film grain — with Hard Ledger's one red focal word kept. The
// script, upbeat cloned VO, music and every beat timing are UNCHANGED from the
// named-people cut. ~57.5s. SAME elevated-risk flag: it names real people (Dario
// & Daniela Amodei, Michael Kratsios, Trump) and attributes reporting to Axios /
// Truth Social — every claim must be primary-source verified before publishing.
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  {dur: 70, kind: 'hook', text: 'Washington doesn\'t|need to regulate.', highlights: ['regulate'], size: 78, ground: 'paper', treat: 'panel', media: {src: 'memo/p_washington.jpg', type: 'img'}},
  {dur: 77, kind: 'text', text: 'It just needs|one memo.', highlights: ['memo'], size: 82, ground: 'paper', treat: 'panel', media: {src: 'memo/p_memo.jpg', type: 'img'}},
  {dur: 87, kind: 'lines', text: 'Every fund.|Every pension.|Every index.', highlights: ['index'], reveal: [0, 27, 54], ground: 'paper', treat: 'panel', media: {src: 'memo/v_index.mp4', type: 'video'}},
  {dur: 69, kind: 'text', text: 'The biggest listing|in years.', highlights: ['biggest'], size: 80, ground: 'paper', treat: 'panel', media: {src: 'memo/p_listing.jpg', type: 'img'}},
  {dur: 45, kind: 'stat', stat: {prefix: '$', value: 2, decimals: 0, suffix: 'T', post: 'ON THE TABLE'}, ground: 'dark', treat: 'cutout', cut: 'memo/cut/p_money.png'},
  {dur: 78, kind: 'text', text: 'October|to November.', highlights: ['november'], size: 84, ground: 'dark', treat: 'cutout', cut: 'memo/cut/p_calendar.png'},
  {dur: 80, kind: 'text', text: 'September 23.|UN Security Council.', highlights: ['council'], size: 72, ground: 'paper', treat: 'panel', media: {src: 'memo/p_un.jpg', type: 'img'}},
  {dur: 146, kind: 'text', text: 'Dario Amodei:|AI risks humanity.', highlights: ['humanity'], size: 74, ground: 'paper', treat: 'panel', media: {src: 'memo/v_ai.mp4', type: 'video'}},
  {dur: 43, kind: 'text', text: 'And offers|to slow down.', highlights: ['slow'], size: 84, ground: 'paper', treat: 'silhouette', cut: 'memo/cut/p_slow.png'},
  {dur: 136, kind: 'text', text: 'Michael Kratsios:|globalist scheme.', highlights: ['globalist'], size: 70, ground: 'paper', treat: 'cutout', cut: 'memo/cut/p_globe.png'},
  {dur: 72, kind: 'text', text: 'Axios reports|a memo.', highlights: ['memo'], size: 82, ground: 'paper', treat: 'panel', media: {src: 'memo/v_print.mp4', type: 'video'}},
  {dur: 89, kind: 'text', text: 'The face of|AI doomerism.', highlights: ['doomerism'], size: 80, ground: 'paper', treat: 'panel', media: {src: 'memo/p_face.jpg', type: 'img'}},
  {dur: 92, kind: 'text', text: 'First Truth Social.|Now on paper.', highlights: ['paper'], size: 78, ground: 'paper', treat: 'cutout', cut: 'memo/cut/p_social.png'},
  {dur: 49, kind: 'text', text: 'Reported.|Not published.', highlights: ['not'], size: 84, ground: 'paper', treat: 'none'},
  {dur: 65, kind: 'text', text: 'Daniela Amodei|denies ties.', highlights: ['denies'], size: 80, ground: 'paper', treat: 'panel', media: {src: 'memo/p_press.jpg', type: 'img'}},
  {dur: 67, kind: 'text', text: 'No policy changed.|The listing\'s still on.', highlights: ['on'], size: 76, ground: 'dark', treat: 'panel', media: {src: 'memo/p_greenlight.jpg', type: 'img'}},
  {dur: 137, kind: 'chart', chart: {a: {label: 'ARAMCO', value: 1.7}, b: {label: 'ANTHROPIC', value: 2, red: true}, prefix: '$', suffix: 'T', decimals: 1, unit: 'BIGGEST IPO EVER'}, ground: 'dark', treat: 'none'},
  {dur: 98, kind: 'impact', text: 'The pitch|is the risk.', ground: 'dark', treat: 'none'},
  {dur: 57, kind: 'text', text: 'The banks get paid|either way.', highlights: ['banks'], size: 78, ground: 'paper', treat: 'panel', media: {src: 'memo/p_bank.jpg', type: 'img'}},
  {dur: 134, kind: 'text', text: 'Would you buy|the biggest IPO ever?', highlights: ['buy'], size: 74, ground: 'paper', treat: 'cutout', cut: 'memo/cut/p_buy.png'},
  {dur: 34, kind: 'text', text: 'Tell me|below.', highlights: ['below'], size: 88, ground: 'dark', treat: 'panel', media: {src: 'memo/p_dawn.jpg', type: 'img'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 147, src: 'media/sfx_whoosh.mp3', vol: 0.4},
  {at: 303, src: 'media/sfx_impact.mp3', vol: 0.45},
  {at: 1265, src: 'media/sfx_whoosh.mp3', vol: 0.4},
  {at: 1402, src: 'media/sfx_impact.mp3', vol: 0.6},
  {at: 1691, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
const norm = (w: string) => w.replace(/[.,—…:-]/g, '').toLowerCase();

// ---------------------------------------------------------------------------
// Grounds & textures
// ---------------------------------------------------------------------------
const PaperGround: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: C.paperBg}}>
    <AbsoluteFill style={{backgroundImage: PAPER, backgroundSize: '600px 600px', mixBlendMode: 'multiply', opacity: 0.5, filter: 'grayscale(1) contrast(1.1)'}} />
    <AbsoluteFill style={{background: 'radial-gradient(125% 95% at 50% 42%, transparent 48%, rgba(70,64,50,0.42) 100%)'}} />
  </AbsoluteFill>
);
const DarkGround: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: C.bg}}>
    <AbsoluteFill style={{background: 'radial-gradient(120% 90% at 50% 40%, rgba(40,40,40,0.5) 0%, #060606 100%)'}} />
  </AbsoluteFill>
);

const Grain: React.FC = () => {
  const frame = useCurrentFrame();
  const gx = (frame * 11) % 160;
  const gy = (frame * 7) % 160;
  return <AbsoluteFill style={{backgroundImage: GRAIN, backgroundSize: '160px 160px', backgroundPosition: `${gx}px ${gy}px`, opacity: 0.14, mixBlendMode: 'overlay', pointerEvents: 'none'}} />;
};

// Register ticks in the corners — editorial furniture (paper beats).
const RegisterMarks: React.FC<{color: string}> = ({color}) => {
  const mark: React.CSSProperties = {position: 'absolute', width: 26, height: 26, opacity: 0.5};
  const bar = (o: React.CSSProperties): React.CSSProperties => ({position: 'absolute', background: color, ...o});
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <div style={{...mark, top: 56, right: 60}}>
        <div style={bar({top: 12, left: 0, width: 26, height: 2})} />
        <div style={bar({top: 0, left: 12, width: 2, height: 26})} />
      </div>
      <div style={{...mark, bottom: 150, left: 60}}>
        <div style={bar({top: 12, left: 0, width: 26, height: 2})} />
        <div style={bar({top: 0, left: 12, width: 2, height: 26})} />
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// Cut-out / silhouette / panel media in the UPPER zone
// ---------------------------------------------------------------------------
const MEDIA_ZONE: React.CSSProperties = {position: 'absolute', top: 150, left: 74, right: 74, height: 900, display: 'flex', justifyContent: 'center', alignItems: 'center'};

const CollageMedia: React.FC<{s: SceneDef}> = ({s}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const stepped = Math.round(frame / 2.5) * 2.5;
  const p = interpolate(stepped, [0, durationInFrames], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const intro = spring({frame: frame - 1, fps: FPS, config: {damping: 26, mass: 0.5, stiffness: 210}});
  const op = interpolate(frame, [0, 6, durationInFrames - 5, durationInFrames], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  if (s.treat === 'cutout' || s.treat === 'silhouette') {
    const sil = s.treat === 'silhouette';
    const scale = interpolate(p, [0, 1], [1, 1.05]) * interpolate(intro, [0, 1], [0.9, 1]);
    const filt = sil
      ? 'brightness(0) drop-shadow(0 22px 26px rgba(0,0,0,0.4))'
      : 'grayscale(1) contrast(1.15) brightness(0.98) drop-shadow(0 24px 30px rgba(0,0,0,0.45))';
    return (
      <div style={{...MEDIA_ZONE, opacity: op}}>
        <Img src={staticFile(s.cut!)} style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', filter: filt, transform: `scale(${scale}) translateY(${interpolate(intro, [0, 1], [30, 0])}px)`}} />
      </div>
    );
  }
  if (s.treat === 'panel' && s.media) {
    const scale = interpolate(p, [0, 1], [1, 1.08]);
    const isImg = s.media.type === 'img';
    const mstyle: React.CSSProperties = {width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1) contrast(1.3) brightness(0.9)', transform: `scale(${scale})`};
    const w = 812;
    const h = 812;
    return (
      <div style={{...MEDIA_ZONE, opacity: op}}>
        <div style={{width: w, height: h, transform: `translateY(${interpolate(intro, [0, 1], [24, 0])}px)`, boxShadow: '0 26px 54px rgba(0,0,0,0.45)', border: '5px solid #14120B', outline: '1px solid rgba(0,0,0,0.4)', background: '#000', overflow: 'hidden'}}>
          {isImg ? <Img src={staticFile(s.media.src)} style={mstyle} /> : <OffthreadVideo src={staticFile(s.media.src)} startFrom={s.media.from ?? 0} muted style={mstyle} />}
        </div>
      </div>
    );
  }
  return null;
};

// ---------------------------------------------------------------------------
// Editorial type in the LOWER zone
// ---------------------------------------------------------------------------
const TYPE_ZONE: React.CSSProperties = {position: 'absolute', left: 80, right: 78, bottom: 216, display: 'flex', flexDirection: 'column', alignItems: 'flex-start'};

const Rule: React.FC<{light: boolean}> = ({light}) => {
  const frame = useLocal();
  const w = interpolate(frame, [2, 16], [0, 220], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeInOut});
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22}}>
      <div style={{width: 20, height: 20, background: C.red}} />
      <div style={{width: w, height: 3, background: light ? C.ink : C.paperInk}} />
    </div>
  );
};

const EditorialCaption: React.FC<{text: string; highlights?: string[]; size?: number; light: boolean}> = ({text, highlights = [], size = 84, light}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const lines = text.split('|');
  const hset = highlights.map((h) => h.toLowerCase());
  const isHi = (w: string) => hset.includes(norm(w));
  const bigIdx = Math.max(0, lines.findIndex((l) => l.split(' ').some(isHi)));
  const inkColor = light ? C.ink : C.paperInk;
  const subColor = light ? C.sub : C.paperSub;
  let wIndex = 0;
  return (
    <div style={TYPE_ZONE}>
      <Rule light={light} />
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12, maxWidth: 946}}>
        {lines.map((line, li) => {
          if (li === bigIdx) {
            return (
              <div key={li} style={{display: 'flex', flexWrap: 'wrap', gap: '0 20px'}}>
                {line.split(' ').map((word, k) => {
                  const appear = wIndex * 1.4;
                  wIndex++;
                  const pv = spring({frame: frame - appear, fps, config: {damping: 24, mass: 0.4, stiffness: 240}});
                  return (
                    <span key={k} style={{display: 'inline-block', fontFamily: HEAD, fontSize: size, lineHeight: 0.9, letterSpacing: -1, textTransform: 'uppercase', color: isHi(word) ? C.red : inkColor, opacity: pv, transform: `translateY(${interpolate(pv, [0, 1], [30, 0])}px)`, textShadow: light ? SH : 'none'}}>
                      {word}
                    </span>
                  );
                })}
              </div>
            );
          }
          const af = interpolate(frame, [2, 12], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          return (
            <div key={li} style={{fontFamily: BODY, fontWeight: 700, fontSize: 33, letterSpacing: 4, textTransform: 'uppercase', color: subColor, opacity: af, textShadow: light ? SH : 'none'}}>
              {line}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const SceneLines: React.FC<{text: string; highlights?: string[]; reveal?: number[]; light: boolean}> = ({text, highlights = [], reveal, light}) => {
  const frame = useLocal();
  const {fps} = useVideoConfig();
  const lines = text.split('|');
  const hset = highlights.map((h) => h.toLowerCase());
  const inkColor = light ? C.ink : C.paperInk;
  return (
    <div style={TYPE_ZONE}>
      <Rule light={light} />
      <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
        {lines.map((l, i) => {
          const appearAt = reveal ? reveal[i] : 6 + i * 12;
          const pv = spring({frame: frame - appearAt, fps, config: {damping: 24, mass: 0.4, stiffness: 240}});
          return (
            <div key={i} style={{opacity: pv, transform: `translateX(${interpolate(pv, [0, 1], [-36, 0])}px)`, fontFamily: HEAD, fontSize: 84, lineHeight: 0.94, letterSpacing: -1, textTransform: 'uppercase'}}>
              {l.split(' ').map((w, wi) => (
                <span key={wi} style={{color: hset.includes(norm(w)) ? C.red : inkColor, textShadow: light ? SH : 'none'}}>
                  {w}
                  {wi < l.split(' ').length - 1 ? ' ' : ''}
                </span>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const SceneStat: React.FC<{stat: StatCfg; light: boolean}> = ({stat, light}) => {
  const frame = useLocal();
  const {fps} = useVideoConfig();
  const enter = spring({frame: frame - 2, fps, config: {damping: 24, mass: 0.4, stiffness: 240}});
  const t = interpolate(frame, [4, 34], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeInOut});
  const shown = stat.value * t;
  const num = stat.decimals ? shown.toFixed(stat.decimals) : Math.round(shown).toLocaleString('en-US');
  const inkColor = light ? C.ink : C.paperInk;
  const subColor = light ? C.sub : C.paperSub;
  return (
    <div style={TYPE_ZONE}>
      <Rule light={light} />
      <div style={{opacity: enter}}>
        <div style={{display: 'flex', alignItems: 'baseline'}}>
          {stat.prefix ? <span style={{fontFamily: HEAD, fontSize: 180, color: C.red, lineHeight: 0.8}}>{stat.prefix}</span> : null}
          <span style={{fontFamily: HEAD, fontSize: 280, color: C.red, lineHeight: 0.78, letterSpacing: -4, textShadow: light ? SH : 'none'}}>{num}</span>
          {stat.suffix ? <span style={{fontFamily: HEAD, fontSize: 180, color: C.red, lineHeight: 0.8}}>{stat.suffix}</span> : null}
        </div>
        {stat.post ? <div style={{fontFamily: BODY, fontWeight: 700, fontSize: 38, color: inkColor, marginTop: 8, textTransform: 'uppercase', letterSpacing: 3, textShadow: light ? SH : 'none'}}>{stat.post}</div> : null}
      </div>
    </div>
  );
};

const SceneChart: React.FC<{chart: ChartCfg; light: boolean}> = ({chart, light}) => {
  const frame = useLocal();
  const {fps} = useVideoConfig();
  const enter = spring({frame: frame - 2, fps, config: {damping: 24, mass: 0.4, stiffness: 240}});
  const t = interpolate(frame, [6, 42], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeInOut});
  const maxVal = Math.max(chart.a.value, chart.b.value);
  const H = 760;
  const dec = chart.decimals ?? 0;
  const fmt = (v: number) => (chart.prefix ?? '') + (dec ? v.toFixed(dec) : Math.round(v).toString()) + (chart.suffix ?? '');
  const inkColor = light ? C.ink : C.paperInk;
  const subColor = light ? C.sub : C.paperSub;
  const barBase = light ? '#E8E4DA' : '#2A2A2A';
  const Bar: React.FC<{d: {label: string; value: number; red?: boolean}}> = ({d}) => (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: 250}}>
      <div style={{fontFamily: HEAD, fontSize: 84, color: d.red ? C.red : inkColor, lineHeight: 1, marginBottom: 12, letterSpacing: -2, textShadow: light ? SH : 'none'}}>{fmt(d.value * t)}</div>
      <div style={{width: 188, height: H, display: 'flex', alignItems: 'flex-end'}}>
        <div style={{width: '100%', height: Math.max(4, (d.value / maxVal) * H * t), background: d.red ? C.red : barBase, boxShadow: d.red ? '0 0 40px rgba(255,46,46,0.4)' : 'none'}} />
      </div>
      <div style={{fontFamily: BODY, fontWeight: 700, fontSize: 30, letterSpacing: 3, color: subColor, textTransform: 'uppercase', marginTop: 16}}>{d.label}</div>
    </div>
  );
  return (
    <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'flex-start', padding: '0 78px 190px 80px'}}>
      <div style={{opacity: enter}}>
        {chart.unit ? <div style={{fontFamily: BODY, fontWeight: 700, fontSize: 32, letterSpacing: 5, color: subColor, textTransform: 'uppercase', marginBottom: 24}}>{chart.unit}</div> : null}
        <div style={{display: 'flex', gap: 60, alignItems: 'flex-end'}}>
          <Bar d={chart.a} />
          <Bar d={chart.b} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneImpact: React.FC<{text: string; light: boolean}> = ({text, light}) => {
  const frame = useLocal();
  const {fps} = useVideoConfig();
  const lines = text.split('|');
  const inkColor = light ? C.ink : C.paperInk;
  return (
    <div style={{...TYPE_ZONE, bottom: 300}}>
      {lines.map((l, i) => {
        const s = spring({frame: frame - i * 5, fps, config: {damping: 20, mass: 0.6, stiffness: 150}});
        return (
          <div key={i} style={{fontFamily: HEAD, fontSize: 132, lineHeight: 0.88, letterSpacing: -2, textTransform: 'uppercase', color: i === lines.length - 1 ? C.red : inkColor, opacity: s, transform: `translateY(${interpolate(s, [0, 1], [40, 0])}px)`, textShadow: light ? SH : 'none'}}>
            {l}
          </div>
        );
      })}
    </div>
  );
};

const renderType = (s: SceneDef, light: boolean) => {
  switch (s.kind) {
    case 'hook':
    case 'text':
      return <EditorialCaption text={s.text!} highlights={s.highlights} size={s.size} light={light} />;
    case 'lines':
      return <SceneLines text={s.text!} highlights={s.highlights} reveal={s.reveal} light={light} />;
    case 'stat':
      return <SceneStat stat={s.stat!} light={light} />;
    case 'chart':
      return <SceneChart chart={s.chart!} light={light} />;
    case 'impact':
      return <SceneImpact text={s.text!} light={light} />;
    default:
      return null;
  }
};

const CollageScene: React.FC<{s: SceneDef}> = ({s}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const light = s.ground === 'dark';
  const op = interpolate(frame, [0, 3, durationInFrames - 3, durationInFrames], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{opacity: op}}>
      {s.ground === 'paper' ? <PaperGround /> : <DarkGround />}
      <CollageMedia s={s} />
      {s.ground === 'paper' ? <RegisterMarks color={C.paperInk} /> : null}
      {renderType(s, light)}
      <Grain />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
const Hud: React.FC = () => {
  const frame = useCurrentFrame();
  // resolve ground under the HUD for contrast
  let idx = 0;
  for (let i = 0; i < SCENES.length; i++) if (frame >= STARTS[i]) idx = i;
  const light = SCENES[idx].ground === 'dark';
  return (
    <div style={{position: 'absolute', top: 74, left: 80, display: 'flex', alignItems: 'center', gap: 12}}>
      <div style={{width: 22, height: 22, background: C.red}} />
      <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 26, letterSpacing: 6, color: light ? C.ink : C.paperInk, textTransform: 'uppercase'}}>One memo</span>
    </div>
  );
};

const LogoWatermark: React.FC = () => (
  <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', pointerEvents: 'none'}}>
    <Img src={staticFile('media/logo.png')} style={{width: 260, height: 'auto', opacity: 0.42, marginBottom: 90, filter: 'grayscale(0.4)'}} />
  </AbsoluteFill>
);

// ---------------------------------------------------------------------------
export const MemoReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('memo/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('memo/music.mp3')}
        volume={(f) => interpolate(f, [0, 20, DURATION_IN_FRAMES - 55, DURATION_IN_FRAMES], [0, 0.17, 0.17, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}
      />
      {SFX.map((s, i) => (
        <Sequence key={`sfx${i}`} from={s.at} durationInFrames={60} name={`sfx-${i}`}>
          <Audio src={staticFile(s.src)} volume={s.vol} />
        </Sequence>
      ))}
      <AbsoluteFill style={{opacity: globalOpacity}}>
        {SCENES.map((s, i) => (
          <Sequence key={i} from={STARTS[i]} durationInFrames={s.dur} name={`${i}-${s.kind}`}>
            <CollageScene s={s} />
          </Sequence>
        ))}
        <Hud />
        <LogoWatermark />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
