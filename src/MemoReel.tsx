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
  muted: '#7C776C',
  red: '#FF2E2E',
  paperBg: '#C7C1B4',
  paperInk: '#16140E',
  paperSub: '#4A463C',
};

// Legibility shadow for text sitting on treated footage.
const SH = '0 2px 6px rgba(0,0,0,0.6), 0 4px 22px rgba(0,0,0,0.4)';

// Procedural film-grain and paper-fibre textures (inline SVG turbulence) — the
// core of the "leaked dossier" treatment that mimics the reference video.
const GRAIN = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";
const PAPER = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.012' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23p)'/%3E%3C/svg%3E\")";

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
type ChartCfg = {
  a: {label: string; value: number};
  b: {label: string; value: number; red?: boolean};
  unit?: string;
  decimals?: number;
  prefix?: string;
  suffix?: string;
};
type SceneDef = {
  dur: number;
  kind: 'hook' | 'lines' | 'text' | 'stat' | 'chart' | 'impact' | 'outro';
  text?: string;
  kicker?: string;
  highlights?: string[];
  reveal?: number[];
  size?: number;
  stat?: StatCfg;
  chart?: ChartCfg;
  redBg?: boolean;
  paper?: boolean;
  media?: MediaCfg;
  enter?: 'slideL' | 'slideR' | 'slideUp' | 'zoom';
};

// ---------------------------------------------------------------------------
// "One memo" reel (MemoReel) — RESTYLED to the gritty monochrome "leaked
// dossier" look of the client's reference video (the "China doesn't need to
// shoot down the jet" promo), while KEEPING Hard Ledger's one-red-focal-word
// accent. The script, upbeat cloned VO, music and every beat timing are
// UNCHANGED from the named-people cut — only the visual system is new:
//   • Duotone footage — grayscale + high contrast, heavy film grain, vignette;
//     one flat PAPER beat (light mottled stock, dark ink) for editorial rhythm.
//   • Editorial LEFT-aligned typography (Archivo Black) with a big-word / small-
//     annotation hierarchy: the line carrying the red focal word is set large,
//     the other line becomes a small tracked annotation above/below it.
//   • Mono data cards — a huge editorial count-up number for the $2T stat and a
//     white/red two-bar chart (Aramco $1.7T vs Anthropic $2T).
//   • The mid-reel thesis ("The pitch / is the risk") is a black editorial beat
//     with the red on the payoff line, not a red card.
//   • A subtly stepped (~12fps) Ken Burns move for the reference's choppy feel.
// Same news content and the SAME elevated-risk flag applies: it names real people
// (Dario & Daniela Amodei, Michael Kratsios, Trump) and attributes reporting to
// Axios / Truth Social; every claim must be primary-source verified before this
// publishes. ~57.5s.
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  {dur: 70, kind: 'hook', text: 'Washington doesn\'t|need to regulate.', kicker: 'One memo', highlights: ['regulate'], size: 78, media: {src: 'memo/p_washington.jpg', type: 'img', effect: 'in'}},
  {dur: 77, kind: 'text', text: 'It just needs|one memo.', highlights: ['memo'], size: 82, media: {src: 'memo/p_memo.jpg', type: 'img', effect: 'in'}},
  {dur: 87, kind: 'lines', text: 'Every fund.|Every pension.|Every index.', highlights: ['index'], reveal: [0, 27, 54], media: {src: 'memo/v_index.mp4', type: 'video', effect: 'in'}},
  {dur: 69, kind: 'text', text: 'The biggest listing|in years.', highlights: ['biggest'], size: 80, media: {src: 'memo/p_listing.jpg', type: 'img', effect: 'in'}},
  {dur: 45, kind: 'stat', stat: {prefix: '$', value: 2, decimals: 0, suffix: 'T', post: 'ON THE TABLE'}, media: {src: 'memo/p_money.jpg', type: 'img', effect: 'in'}},
  {dur: 78, kind: 'text', enter: 'slideL', text: 'October|to November.', highlights: ['november'], size: 84, media: {src: 'memo/p_calendar.jpg', type: 'img', effect: 'in'}},
  {dur: 80, kind: 'text', text: 'September 23.|UN Security Council.', highlights: ['council'], size: 72, media: {src: 'memo/p_un.jpg', type: 'img', effect: 'in'}},
  {dur: 146, kind: 'text', text: 'Dario Amodei:|AI risks humanity.', highlights: ['humanity'], size: 74, media: {src: 'memo/v_ai.mp4', type: 'video', effect: 'in'}},
  {dur: 43, kind: 'text', text: 'And offers|to slow down.', highlights: ['slow'], size: 84, media: {src: 'memo/p_slow.jpg', type: 'img', effect: 'in'}},
  {dur: 136, kind: 'text', enter: 'slideL', text: 'Michael Kratsios:|globalist scheme.', highlights: ['globalist'], size: 70, media: {src: 'memo/p_globe.jpg', type: 'img', effect: 'in'}},
  {dur: 72, kind: 'text', text: 'Axios reports|a memo.', highlights: ['memo'], size: 82, media: {src: 'memo/v_print.mp4', type: 'video', effect: 'in'}},
  {dur: 89, kind: 'text', text: 'The face of|AI doomerism.', highlights: ['doomerism'], size: 80, media: {src: 'memo/p_face.jpg', type: 'img', effect: 'in'}},
  {dur: 92, kind: 'text', enter: 'slideL', text: 'First Truth Social.|Now on paper.', highlights: ['paper'], size: 78, media: {src: 'memo/p_social.jpg', type: 'img', effect: 'in'}},
  {dur: 49, kind: 'text', paper: true, text: 'Reported.|Not published.', highlights: ['not'], size: 84},
  {dur: 65, kind: 'text', text: 'Daniela Amodei|denies ties.', highlights: ['denies'], size: 80, media: {src: 'memo/p_press.jpg', type: 'img', effect: 'in'}},
  {dur: 67, kind: 'text', text: 'No policy changed.|The listing\'s still on.', highlights: ['on'], size: 76, media: {src: 'memo/p_greenlight.jpg', type: 'img', effect: 'in'}},
  {dur: 137, kind: 'chart', chart: {a: {label: 'ARAMCO', value: 1.7}, b: {label: 'ANTHROPIC', value: 2, red: true}, prefix: '$', suffix: 'T', decimals: 1, unit: 'BIGGEST IPO EVER'}, media: {src: 'memo/p_floor.jpg', type: 'img', effect: 'in'}},
  {dur: 98, kind: 'impact', text: 'The pitch|is the risk.', redBg: true},
  {dur: 57, kind: 'text', text: 'The banks get paid|either way.', highlights: ['banks'], size: 78, media: {src: 'memo/p_bank.jpg', type: 'img', effect: 'in'}},
  {dur: 134, kind: 'text', text: 'Would you buy|the biggest IPO ever?', highlights: ['buy'], size: 74, media: {src: 'memo/p_buy.jpg', type: 'img', effect: 'in'}},
  {dur: 34, kind: 'text', enter: 'zoom', text: 'Tell me|below.', highlights: ['below'], size: 88, media: {src: 'memo/p_dawn.jpg', type: 'img', effect: 'in'}},
];

// Sound-effect cues (frame, file, gain).
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

// Entrance transition applied to a scene's media + text together, over ~8 frames.
const enterTransform = (frame: number, enter?: string) => {
  if (!enter) return {tx: 0, ty: 0, sc: 1, op: 1};
  const t = interpolate(frame, [0, 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeInOut});
  let tx = 0;
  let ty = 0;
  let sc = 1;
  if (enter === 'slideL') tx = (1 - t) * 70;
  if (enter === 'slideR') tx = -(1 - t) * 70;
  if (enter === 'slideUp') ty = (1 - t) * 70;
  if (enter === 'zoom') sc = 1 + (1 - t) * 0.4;
  const op = interpolate(frame, [0, 5], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return {tx, ty, sc, op};
};

// ---------------------------------------------------------------------------
// Duotone media background — grayscale + contrast, subtle stepped (~12fps) Ken
// Burns move for the reference's choppy feel.
// ---------------------------------------------------------------------------
const MediaBackground: React.FC<{cfg: MediaCfg; enter?: string}> = ({cfg, enter}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const stepped = Math.round(frame / 2.5) * 2.5; // ~12fps stutter on the slow move
  const p = interpolate(stepped, [0, durationInFrames], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const isImg = cfg.type === 'img';
  const range = isImg ? 0.22 : 0.13;
  const effect = cfg.effect ?? 'in';
  const scale = effect === 'out' ? interpolate(p, [0, 1], [1 + range, 1]) : interpolate(p, [0, 1], [1, 1 + range]);
  let tx = 0;
  if (effect === 'panL') tx = interpolate(p, [0, 1], [3, -3]);
  if (effect === 'panR') tx = interpolate(p, [0, 1], [-3, 3]);
  const e = enterTransform(frame, enter);
  const opacity = interpolate(frame, [0, 5, durationInFrames - 5, durationInFrames], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) * e.op;
  const src = staticFile(cfg.src);
  const mediaStyle: React.CSSProperties = {width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1) contrast(1.32) brightness(0.9)'};
  return (
    <AbsoluteFill style={{opacity, backgroundColor: '#000'}}>
      <AbsoluteFill style={{transform: `scale(${scale * e.sc}) translate(${tx + e.tx}%, ${e.ty}%)`, transformOrigin: 'center'}}>
        {isImg ? <Img src={src} style={mediaStyle} /> : <OffthreadVideo src={src} startFrom={cfg.from ?? 0} muted style={mediaStyle} />}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Flat paper beat — light mottled stock, for editorial rhythm.
const PaperBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const opacity = interpolate(frame, [0, 4, durationInFrames - 4, durationInFrames], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{opacity, backgroundColor: C.paperBg}}>
      <AbsoluteFill style={{backgroundImage: PAPER, backgroundSize: '600px 600px', mixBlendMode: 'multiply', opacity: 0.5}} />
      <AbsoluteFill style={{background: 'radial-gradient(120% 90% at 50% 45%, transparent 45%, rgba(80,74,60,0.4) 100%)'}} />
    </AbsoluteFill>
  );
};

// Localized bottom scrim so lower-left text reads over bright footage (the
// reference does the same — text sits in a darkened lower band; the upper frame
// stays at full brightness). Not used on paper beats (dark ink on light stock).
const Scrim: React.FC = () => (
  <AbsoluteFill style={{background: 'linear-gradient(to top, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.36) 24%, rgba(0,0,0,0) 52%)'}} />
);

// Global treatment: moving film grain + vignette over everything (below text).
const Treatment: React.FC = () => {
  const frame = useCurrentFrame();
  const gx = (frame * 11) % 160;
  const gy = (frame * 7) % 160;
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <AbsoluteFill style={{background: 'radial-gradient(115% 80% at 50% 42%, transparent 40%, rgba(0,0,0,0.6) 100%)'}} />
      <AbsoluteFill style={{backgroundImage: GRAIN, backgroundSize: '160px 160px', backgroundPosition: `${gx}px ${gy}px`, opacity: 0.15, mixBlendMode: 'overlay'}} />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// Editorial caption — left-aligned, big focal line + small annotation line(s).
// The line carrying the red focal word is set large; the other line(s) become a
// small tracked annotation. `dark` = dark ink on a paper beat.
// ---------------------------------------------------------------------------
const EditorialCaption: React.FC<{text: string; highlights?: string[]; size?: number; dark?: boolean}> = ({text, highlights = [], size = 84, dark = false}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const lines = text.split('|');
  const hset = highlights.map((h) => h.toLowerCase());
  const isHi = (w: string) => hset.includes(norm(w));
  const bigIdx = Math.max(0, lines.findIndex((l) => l.split(' ').some(isHi)));
  const inkColor = dark ? C.paperInk : C.ink;
  const subColor = dark ? C.paperSub : C.sub;
  let wIndex = 0;
  return (
    <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'flex-start', padding: '0 78px 300px 80px'}}>
      {!dark ? <Scrim /> : null}
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12, maxWidth: 940}}>
        {lines.map((line, li) => {
          if (li === bigIdx) {
            return (
              <div key={li} style={{display: 'flex', flexWrap: 'wrap', gap: '0 20px'}}>
                {line.split(' ').map((word, k) => {
                  const appear = wIndex * 1.4;
                  wIndex++;
                  const pv = spring({frame: frame - appear, fps, config: {damping: 24, mass: 0.4, stiffness: 240}});
                  const y = interpolate(pv, [0, 1], [30, 0]);
                  return (
                    <span key={k} style={{display: 'inline-block', fontFamily: HEAD, fontSize: size, lineHeight: 0.9, letterSpacing: -1, textTransform: 'uppercase', color: isHi(word) ? C.red : inkColor, opacity: pv, transform: `translateY(${y}px)`, textShadow: dark ? 'none' : SH}}>
                      {word}
                    </span>
                  );
                })}
              </div>
            );
          }
          const af = interpolate(frame, [2, 12], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          return (
            <div key={li} style={{fontFamily: BODY, fontWeight: 700, fontSize: 33, letterSpacing: 4, textTransform: 'uppercase', color: subColor, opacity: af, transform: `translateY(${interpolate(af, [0, 1], [10, 0])}px)`, textShadow: dark ? 'none' : SH}}>
              {line}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const SceneText: React.FC<{text: string; highlights?: string[]; size?: number; dark?: boolean}> = ({text, highlights, size = 84, dark}) => (
  <EditorialCaption text={text} highlights={highlights} size={size} dark={dark} />
);
const SceneHook = SceneText;

const SceneLines: React.FC<{text: string; highlights?: string[]; reveal?: number[]}> = ({text, highlights = [], reveal}) => {
  const frame = useLocal();
  const {fps} = useVideoConfig();
  const lines = text.split('|');
  const hset = highlights.map((h) => h.toLowerCase());
  return (
    <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'flex-start', padding: '0 78px 300px 80px'}}>
      <Scrim />
      <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
        {lines.map((l, i) => {
          const appearAt = reveal ? reveal[i] : 6 + i * 12;
          const pv = spring({frame: frame - appearAt, fps, config: {damping: 24, mass: 0.4, stiffness: 240}});
          const x = interpolate(pv, [0, 1], [-40, 0]);
          return (
            <div key={i} style={{opacity: pv, transform: `translateX(${x}px)`, fontFamily: HEAD, fontSize: 92, lineHeight: 0.92, letterSpacing: -1, textTransform: 'uppercase'}}>
              {l.split(' ').map((w, wi) => (
                <span key={wi} style={{color: hset.includes(norm(w)) ? C.red : C.ink, textShadow: SH}}>
                  {w}
                  {wi < l.split(' ').length - 1 ? ' ' : ''}
                </span>
              ))}
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
  const enter = spring({frame: frame - 2, fps, config: {damping: 24, mass: 0.4, stiffness: 240}});
  const t = interpolate(frame, [4, 34], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeInOut});
  const shown = stat.value * t;
  const num = stat.decimals ? shown.toFixed(stat.decimals) : Math.round(shown).toLocaleString('en-US');
  return (
    <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'flex-start', padding: '0 78px 290px 80px'}}>
      <Scrim />
      <div style={{opacity: enter, transform: `translateY(${interpolate(enter, [0, 1], [28, 0])}px)`, textAlign: 'left'}}>
        {stat.pre ? <div style={{fontFamily: BODY, fontWeight: 700, fontSize: 33, letterSpacing: 4, color: C.sub, textTransform: 'uppercase', marginBottom: 6}}>{stat.pre}</div> : null}
        <div style={{display: 'flex', alignItems: 'baseline'}}>
          {stat.prefix ? <span style={{fontFamily: HEAD, fontSize: 190, color: C.red, lineHeight: 0.85}}>{stat.prefix}</span> : null}
          <span style={{fontFamily: HEAD, fontSize: 300, color: C.red, lineHeight: 0.8, letterSpacing: -4, textShadow: SH}}>{num}</span>
          {stat.suffix ? <span style={{fontFamily: HEAD, fontSize: 190, color: C.red, lineHeight: 0.85}}>{stat.suffix}</span> : null}
        </div>
        {stat.post ? <div style={{fontFamily: BODY, fontWeight: 700, fontSize: 40, color: C.ink, marginTop: 8, textTransform: 'uppercase', letterSpacing: 3}}>{stat.post}</div> : null}
      </div>
    </AbsoluteFill>
  );
};

// Two-bar comparison chart — mono editorial (white/gray vs red), values above.
const SceneChart: React.FC<{chart: ChartCfg}> = ({chart}) => {
  const frame = useLocal();
  const {fps} = useVideoConfig();
  const enter = spring({frame: frame - 2, fps, config: {damping: 24, mass: 0.4, stiffness: 240}});
  const t = interpolate(frame, [6, 42], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeInOut});
  const maxVal = Math.max(chart.a.value, chart.b.value);
  const H = 820;
  const dec = chart.decimals ?? 0;
  const fmt = (v: number) => (chart.prefix ?? '') + (dec ? v.toFixed(dec) : Math.round(v).toString()) + (chart.suffix ?? '');
  const Bar: React.FC<{d: {label: string; value: number; red?: boolean}}> = ({d}) => {
    const h = (d.value / maxVal) * H * t;
    const shown = d.value * t;
    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: 250}}>
        <div style={{fontFamily: HEAD, fontSize: 86, color: d.red ? C.red : C.ink, lineHeight: 1, marginBottom: 12, letterSpacing: -2, textShadow: SH}}>{fmt(shown)}</div>
        <div style={{width: 190, height: H, display: 'flex', alignItems: 'flex-end'}}>
          <div style={{width: '100%', height: Math.max(4, h), background: d.red ? C.red : '#E8E4DA', boxShadow: d.red ? '0 0 40px rgba(255,46,46,0.4)' : 'none'}} />
        </div>
        <div style={{fontFamily: BODY, fontWeight: 700, fontSize: 32, letterSpacing: 3, color: C.sub, textTransform: 'uppercase', marginTop: 18}}>{d.label}</div>
      </div>
    );
  };
  return (
    <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'flex-start', padding: '0 78px 210px 80px'}}>
      <Scrim />
      <div style={{opacity: enter}}>
        {chart.unit ? <div style={{fontFamily: BODY, fontWeight: 700, fontSize: 32, letterSpacing: 5, color: C.sub, textTransform: 'uppercase', marginBottom: 26}}>{chart.unit}</div> : null}
        <div style={{display: 'flex', gap: 60, alignItems: 'flex-end'}}>
          <Bar d={chart.a} />
          <Bar d={chart.b} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Mid-reel thesis — black editorial beat, red on the payoff line (no red card).
const SceneImpact: React.FC<{text: string}> = ({text}) => {
  const frame = useLocal();
  const {fps} = useVideoConfig();
  const lines = text.split('|');
  return (
    <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'flex-start', padding: '0 78px 300px 80px', backgroundColor: '#000'}}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
        {lines.map((l, i) => {
          const s = spring({frame: frame - i * 5, fps, config: {damping: 20, mass: 0.6, stiffness: 150}});
          return (
            <div key={i} style={{fontFamily: HEAD, fontSize: 132, lineHeight: 0.88, letterSpacing: -2, textTransform: 'uppercase', color: i === lines.length - 1 ? C.red : C.ink, opacity: s, transform: `translateY(${interpolate(s, [0, 1], [40, 0])}px)`, textShadow: SH}}>
              {l}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const SceneOutro: React.FC = () => null;

// ---------------------------------------------------------------------------
const Hud: React.FC = () => (
  <div style={{position: 'absolute', top: 74, left: 80, display: 'flex', alignItems: 'center', gap: 12}}>
    <div style={{width: 22, height: 22, background: C.red}} />
    <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 26, letterSpacing: 6, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>One memo</span>
  </div>
);

const renderScene = (s: SceneDef) => {
  const dark = !!s.paper;
  switch (s.kind) {
    case 'hook':
      return <SceneHook text={s.text!} highlights={s.highlights} size={s.size} dark={dark} />;
    case 'lines':
      return <SceneLines text={s.text!} highlights={s.highlights} reveal={s.reveal} />;
    case 'text':
      return <SceneText text={s.text!} highlights={s.highlights} size={s.size} dark={dark} />;
    case 'stat':
      return <SceneStat stat={s.stat!} />;
    case 'chart':
      return <SceneChart chart={s.chart!} />;
    case 'impact':
      return <SceneImpact text={s.text!} />;
    case 'outro':
      return <SceneOutro />;
    default:
      return null;
  }
};

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
        {SCENES.map((s, i) =>
          s.media ? (
            <Sequence key={`m${i}`} from={STARTS[i]} durationInFrames={s.dur} name={`bg-${i}-${s.kind}`}>
              <MediaBackground cfg={s.media} enter={s.enter} />
            </Sequence>
          ) : s.paper ? (
            <Sequence key={`m${i}`} from={STARTS[i]} durationInFrames={s.dur} name={`paper-${i}`}>
              <PaperBackground />
            </Sequence>
          ) : null,
        )}
        <Treatment />
        {SCENES.map((s, i) => {
          const TLEAD = 3;
          const tf = Math.max(0, STARTS[i] - TLEAD);
          return (
            <Sequence key={i} from={tf} durationInFrames={STARTS[i] + s.dur - tf} name={`${i}-${s.kind}`}>
              <SceneTransition enter={s.enter}>{renderScene(s)}</SceneTransition>
            </Sequence>
          );
        })}
        <Hud />
        <LogoWatermark />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Bottom-center brand watermark, desaturated for the mono look.
const LogoWatermark: React.FC = () => (
  <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', pointerEvents: 'none'}}>
    <Img
      src={staticFile('media/logo.png')}
      style={{width: 300, height: 'auto', opacity: 0.4, marginBottom: 110, borderRadius: 0, filter: 'grayscale(0.35) brightness(1.05)'}}
    />
  </AbsoluteFill>
);

const SceneTransition: React.FC<{children: React.ReactNode; enter?: string}> = ({children, enter}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const e = enterTransform(frame, enter);
  const opacity = interpolate(frame, [0, 2, durationInFrames - 3, durationInFrames], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) * e.op;
  return (
    <AbsoluteFill style={{opacity, transform: `translate(${e.tx}%, ${e.ty}%) scale(${e.sc})`, transformOrigin: 'center'}}>
      {children}
    </AbsoluteFill>
  );
};
