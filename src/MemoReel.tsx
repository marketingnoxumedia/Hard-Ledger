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
  bg: '#0A0A0A',
  ink: '#F4F4F4',
  sub: '#C8C3B8',
  red: '#FF2E2E',
};

// Procedural film-grain (inline SVG turbulence, desaturated in use).
const GRAIN = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

// ---------------------------------------------------------------------------
type MediaCfg = {src: string; type: 'img' | 'video'; from?: number};
type StatCfg = {prefix?: string; value: number; decimals?: number; suffix?: string; post?: string};
type ChartCfg = {a: {label: string; value: number}; b: {label: string; value: number; red?: boolean}; unit?: string; decimals?: number; prefix?: string; suffix?: string};
type SceneDef = {
  dur: number;
  kind: 'text' | 'lines' | 'stat' | 'chart' | 'impact';
  text?: string;
  highlights?: string[];
  reveal?: number[];
  stat?: StatCfg;
  chart?: ChartCfg;
  media?: MediaCfg;
};

// ---------------------------------------------------------------------------
// "One memo" reel (MemoReel) — restyled to the reference video's look: FULL-BLEED
// high-contrast duotone footage with ENORMOUS centered kinetic type over it
// (POWDER / HEATED / TERBIUM style), halftone/photocopy grime + film grain, snappy
// scale-pops. Hard Ledger's one red focal word is kept. Script, upbeat cloned VO,
// music and every beat timing are UNCHANGED from the named-people cut. ~57.5s.
// SAME elevated-risk flag: names real people (Dario & Daniela Amodei, Michael
// Kratsios, Trump) and attributes reporting to Axios / Truth Social — verify every
// claim against primary sources before publishing.
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  {dur: 70, kind: 'text', text: 'Washington doesn\'t|need to regulate.', highlights: ['regulate'], media: {src: 'memo/p_washington.jpg', type: 'img'}},
  {dur: 77, kind: 'text', text: 'It just needs|one memo.', highlights: ['memo'], media: {src: 'memo/p_memo.jpg', type: 'img'}},
  {dur: 87, kind: 'lines', text: 'Every fund.|Every pension.|Every index.', highlights: ['index'], reveal: [0, 27, 54], media: {src: 'memo/v_index.mp4', type: 'video'}},
  {dur: 69, kind: 'text', text: 'The biggest listing|in years.', highlights: ['biggest'], media: {src: 'memo/p_listing.jpg', type: 'img'}},
  {dur: 45, kind: 'stat', stat: {prefix: '$', value: 2, decimals: 0, suffix: 'T', post: 'ON THE TABLE'}, media: {src: 'memo/p_money.jpg', type: 'img'}},
  {dur: 78, kind: 'text', text: 'October|to November.', highlights: ['november'], media: {src: 'memo/p_calendar.jpg', type: 'img'}},
  {dur: 80, kind: 'text', text: 'September 23.|UN Security Council.', highlights: ['council'], media: {src: 'memo/p_un.jpg', type: 'img'}},
  {dur: 146, kind: 'text', text: 'Dario Amodei:|AI risks humanity.', highlights: ['humanity'], media: {src: 'memo/v_ai.mp4', type: 'video'}},
  {dur: 43, kind: 'text', text: 'And offers|to slow down.', highlights: ['slow'], media: {src: 'memo/p_slow.jpg', type: 'img'}},
  {dur: 136, kind: 'text', text: 'Michael Kratsios:|globalist scheme.', highlights: ['globalist'], media: {src: 'memo/p_globe.jpg', type: 'img'}},
  {dur: 72, kind: 'text', text: 'Axios reports|a memo.', highlights: ['memo'], media: {src: 'memo/v_print.mp4', type: 'video'}},
  {dur: 89, kind: 'text', text: 'The face of|AI doomerism.', highlights: ['doomerism'], media: {src: 'memo/p_face.jpg', type: 'img'}},
  {dur: 92, kind: 'text', text: 'First Truth Social.|Now on paper.', highlights: ['paper'], media: {src: 'memo/p_social.jpg', type: 'img'}},
  {dur: 49, kind: 'text', text: 'Reported.|Not published.', highlights: ['not']},
  {dur: 65, kind: 'text', text: 'Daniela Amodei|denies ties.', highlights: ['denies'], media: {src: 'memo/p_press.jpg', type: 'img'}},
  {dur: 67, kind: 'text', text: 'No policy changed.|The listing\'s still on.', highlights: ['on'], media: {src: 'memo/p_greenlight.jpg', type: 'img'}},
  {dur: 137, kind: 'chart', chart: {a: {label: 'ARAMCO', value: 1.7}, b: {label: 'ANTHROPIC', value: 2, red: true}, prefix: '$', suffix: 'T', decimals: 1, unit: 'BIGGEST IPO EVER'}},
  {dur: 98, kind: 'impact', text: 'The pitch|is the risk.'},
  {dur: 57, kind: 'text', text: 'The banks get paid|either way.', highlights: ['banks'], media: {src: 'memo/p_bank.jpg', type: 'img'}},
  {dur: 134, kind: 'text', text: 'Would you buy|the biggest IPO ever?', highlights: ['buy'], media: {src: 'memo/p_buy.jpg', type: 'img'}},
  {dur: 34, kind: 'text', text: 'Tell me|below.', highlights: ['below'], media: {src: 'memo/p_dawn.jpg', type: 'img'}},
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
// Full-bleed treated footage + grime (halftone + grain + vignette + scrim).
// ---------------------------------------------------------------------------
const FullBleedMedia: React.FC<{cfg?: MediaCfg}> = ({cfg}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const stepped = Math.round(frame / 2.5) * 2.5; // ~12fps choppy move
  const p = interpolate(stepped, [0, durationInFrames], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const scale = interpolate(p, [0, 1], [1.06, 1.16]); // punchy, always tight
  const op = interpolate(frame, [0, 4, durationInFrames - 4, durationInFrames], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const mstyle: React.CSSProperties = {width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1) contrast(1.5) brightness(0.82)'};
  return (
    <AbsoluteFill style={{opacity: op, backgroundColor: '#000'}}>
      {cfg ? (
        <AbsoluteFill style={{transform: `scale(${scale})`, transformOrigin: 'center'}}>
          {cfg.type === 'img' ? <Img src={staticFile(cfg.src)} style={mstyle} /> : <OffthreadVideo src={staticFile(cfg.src)} startFrom={cfg.from ?? 0} muted style={mstyle} />}
        </AbsoluteFill>
      ) : (
        <AbsoluteFill style={{background: 'radial-gradient(120% 90% at 50% 42%, #1a1a1a 0%, #060606 100%)'}} />
      )}
    </AbsoluteFill>
  );
};

const Grime: React.FC = () => {
  const frame = useCurrentFrame();
  const gx = (frame * 11) % 160;
  const gy = (frame * 7) % 160;
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {/* darken for centered-text legibility + drama */}
      <AbsoluteFill style={{background: 'radial-gradient(130% 105% at 50% 52%, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 62%, rgba(0,0,0,0.82) 100%)'}} />
      {/* halftone dot screen (photocopy) */}
      <AbsoluteFill style={{backgroundImage: 'radial-gradient(rgba(0,0,0,0.6) 0.9px, transparent 1.3px)', backgroundSize: '5px 5px', opacity: 0.28, mixBlendMode: 'multiply'}} />
      {/* film grain */}
      <AbsoluteFill style={{backgroundImage: GRAIN, backgroundSize: '160px 160px', backgroundPosition: `${gx}px ${gy}px`, opacity: 0.16, mixBlendMode: 'overlay'}} />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// ENORMOUS centered kinetic caption. The line with the red focal word is set
// huge (sized to fill the width); the other line is a small tracked annotation
// above it. Whole big line pops in with a snappy overshoot.
// ---------------------------------------------------------------------------
// Size the big line so its LONGEST WORD fits the width (words can't wrap), else
// huge single words clip the frame edges.
const bigSizeFor = (line: string) => {
  const maxWord = Math.max(...line.split(' ').map((w) => w.length));
  return Math.min(168, Math.max(78, Math.floor(940 / (maxWord * 0.72))));
};

const HugeCaption: React.FC<{text: string; highlights?: string[]}> = ({text, highlights = []}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const lines = text.split('|');
  const hset = highlights.map((h) => h.toLowerCase());
  const isHi = (w: string) => hset.includes(norm(w));
  const bigIdx = Math.max(0, lines.findIndex((l) => l.split(' ').some(isHi)));
  const pop = spring({frame: frame - 1, fps, config: {damping: 12, mass: 0.7, stiffness: 150}});
  const annoOp = interpolate(frame, [3, 13], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const bigLine = lines[bigIdx];
  const size = bigSizeFor(bigLine);
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', padding: '0 60px', transform: 'translateY(6%)'}}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, width: '100%'}}>
        {lines.map((line, li) => {
          if (li === bigIdx) {
            return (
              <div key={li} style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0 24px', transform: `scale(${interpolate(pop, [0, 1], [0.82, 1])})`, opacity: Math.min(1, pop * 1.6)}}>
                {line.split(' ').map((word, k) => (
                  <span key={k} style={{fontFamily: HEAD, fontSize: size, lineHeight: 0.84, letterSpacing: -2, textTransform: 'uppercase', color: isHi(word) ? C.red : C.ink, textShadow: '0 3px 18px rgba(0,0,0,0.7)'}}>
                    {word}
                  </span>
                ))}
              </div>
            );
          }
          return (
            <div key={li} style={{fontFamily: BODY, fontWeight: 700, fontSize: 36, letterSpacing: 8, textTransform: 'uppercase', color: C.sub, opacity: annoOp, textShadow: '0 2px 10px rgba(0,0,0,0.7)'}}>
              {line}
            </div>
          );
        })}
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
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', padding: '0 60px', transform: 'translateY(4%)'}}>
      <div style={{display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center'}}>
        {lines.map((l, i) => {
          const appearAt = reveal ? reveal[i] : 6 + i * 12;
          const pop = spring({frame: frame - appearAt, fps, config: {damping: 12, mass: 0.7, stiffness: 150}});
          return (
            <div key={i} style={{opacity: Math.min(1, pop * 1.6), transform: `scale(${interpolate(pop, [0, 1], [0.82, 1])})`, fontFamily: HEAD, fontSize: 118, lineHeight: 0.9, letterSpacing: -2, textTransform: 'uppercase', textAlign: 'center'}}>
              {l.split(' ').map((w, wi) => (
                <span key={wi} style={{color: hset.includes(norm(w)) ? C.red : C.ink, textShadow: '0 3px 18px rgba(0,0,0,0.7)'}}>
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
  const pop = spring({frame: frame - 1, fps, config: {damping: 12, mass: 0.7, stiffness: 150}});
  const t = interpolate(frame, [4, 32], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeInOut});
  const shown = stat.value * t;
  const num = stat.decimals ? shown.toFixed(stat.decimals) : Math.round(shown).toLocaleString('en-US');
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', transform: 'translateY(2%)'}}>
      <div style={{transform: `scale(${interpolate(pop, [0, 1], [0.8, 1])})`, opacity: Math.min(1, pop * 1.6), textAlign: 'center'}}>
        <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'center'}}>
          {stat.prefix ? <span style={{fontFamily: HEAD, fontSize: 250, color: C.red, lineHeight: 0.8}}>{stat.prefix}</span> : null}
          <span style={{fontFamily: HEAD, fontSize: 440, color: C.red, lineHeight: 0.74, letterSpacing: -8, textShadow: '0 6px 30px rgba(0,0,0,0.7)'}}>{num}</span>
          {stat.suffix ? <span style={{fontFamily: HEAD, fontSize: 250, color: C.red, lineHeight: 0.8}}>{stat.suffix}</span> : null}
        </div>
        {stat.post ? <div style={{fontFamily: BODY, fontWeight: 700, fontSize: 48, color: C.ink, marginTop: 10, textTransform: 'uppercase', letterSpacing: 6, textShadow: '0 2px 10px rgba(0,0,0,0.7)'}}>{stat.post}</div> : null}
      </div>
    </AbsoluteFill>
  );
};

const SceneChart: React.FC<{chart: ChartCfg}> = ({chart}) => {
  const frame = useLocal();
  const {fps} = useVideoConfig();
  const enter = spring({frame: frame - 2, fps, config: {damping: 22, mass: 0.4, stiffness: 220}});
  const t = interpolate(frame, [6, 42], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeInOut});
  const maxVal = Math.max(chart.a.value, chart.b.value);
  const H = 820;
  const dec = chart.decimals ?? 0;
  const fmt = (v: number) => (chart.prefix ?? '') + (dec ? v.toFixed(dec) : Math.round(v).toString()) + (chart.suffix ?? '');
  const Bar: React.FC<{d: {label: string; value: number; red?: boolean}}> = ({d}) => (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: 250}}>
      <div style={{fontFamily: HEAD, fontSize: 100, color: d.red ? C.red : C.ink, lineHeight: 1, marginBottom: 14, letterSpacing: -3, textShadow: '0 3px 18px rgba(0,0,0,0.7)'}}>{fmt(d.value * t)}</div>
      <div style={{width: 196, height: H, display: 'flex', alignItems: 'flex-end'}}>
        <div style={{width: '100%', height: Math.max(4, (d.value / maxVal) * H * t), background: d.red ? C.red : '#EDE9DF', boxShadow: d.red ? '0 0 46px rgba(255,46,46,0.45)' : 'none'}} />
      </div>
      <div style={{fontFamily: BODY, fontWeight: 700, fontSize: 34, letterSpacing: 4, color: C.sub, textTransform: 'uppercase', marginTop: 20}}>{d.label}</div>
    </div>
  );
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
      <div style={{opacity: enter, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        {chart.unit ? <div style={{fontFamily: BODY, fontWeight: 700, fontSize: 34, letterSpacing: 6, color: C.sub, textTransform: 'uppercase', marginBottom: 30}}>{chart.unit}</div> : null}
        <div style={{display: 'flex', gap: 70, alignItems: 'flex-end'}}>
          <Bar d={chart.a} />
          <Bar d={chart.b} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneImpact: React.FC<{text: string}> = ({text}) => {
  const frame = useLocal();
  const {fps} = useVideoConfig();
  const lines = text.split('|');
  const pop = spring({frame, fps, config: {damping: 12, mass: 0.8, stiffness: 130}});
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
      <div style={{transform: `scale(${interpolate(pop, [0, 1], [0.78, 1])})`, opacity: Math.min(1, pop * 1.5), textAlign: 'center'}}>
        {lines.map((l, i) => (
          <div key={i} style={{fontFamily: HEAD, fontSize: 168, lineHeight: 0.84, letterSpacing: -3, textTransform: 'uppercase', color: i === lines.length - 1 ? C.red : C.ink, textShadow: '0 4px 22px rgba(0,0,0,0.7)'}}>
            {l}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

const renderType = (s: SceneDef) => {
  switch (s.kind) {
    case 'text':
      return <HugeCaption text={s.text!} highlights={s.highlights} />;
    case 'lines':
      return <SceneLines text={s.text!} highlights={s.highlights} reveal={s.reveal} />;
    case 'stat':
      return <SceneStat stat={s.stat!} />;
    case 'chart':
      return <SceneChart chart={s.chart!} />;
    case 'impact':
      return <SceneImpact text={s.text!} />;
    default:
      return null;
  }
};

const Scene: React.FC<{s: SceneDef}> = ({s}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const op = interpolate(frame, [0, 2, durationInFrames - 2, durationInFrames], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{opacity: op}}>
      <FullBleedMedia cfg={s.media} />
      <Grime />
      {renderType(s)}
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
const Hud: React.FC = () => (
  <div style={{position: 'absolute', top: 74, left: 80, display: 'flex', alignItems: 'center', gap: 12}}>
    <div style={{width: 22, height: 22, background: C.red}} />
    <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 26, letterSpacing: 6, color: C.ink, textTransform: 'uppercase', textShadow: '0 2px 10px rgba(0,0,0,0.7)'}}>One memo</span>
  </div>
);

const LogoWatermark: React.FC = () => (
  <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', pointerEvents: 'none'}}>
    <Img src={staticFile('media/logo.png')} style={{width: 250, height: 'auto', opacity: 0.4, marginBottom: 96, filter: 'grayscale(0.4)'}} />
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
            <Scene s={s} />
          </Sequence>
        ))}
        <Hud />
        <LogoWatermark />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
