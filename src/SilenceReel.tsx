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

// One shared, soft DIRECTIONAL drop shadow for every caption (white and red
// alike) — reads as depth, not a glow, needs no stroke or darkening.
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
  media?: MediaCfg;
  enter?: 'slideL' | 'slideR' | 'slideUp' | 'zoom';
};

// ---------------------------------------------------------------------------
// "The silence" reel (SilenceReel) — fast NEWS-reel series. NEW topic: why the US is offering
// Russia help with a disease it already knows how to cure. Thesis: the threat isn't the
// bacteria, it's the information -- antibiotics fix plague, but nothing fixes a government that
// won't say what happened. Beats: a lab technician dies at the Anti-Plague Institute in Irkutsk
// (5 Oct, ~200 observed); pneumonic plague is bacterial and treatable (CDC stockpile, WHO rates
// risk low) -- on paper a contained local incident; yet the State Department sends Moscow a
// formal request, Trump offers help, a Putin call is scheduled; what Washington can't treat is
// the silence (no cause of death, no lab records, nothing to the WHO). Close is a CTA QUESTION.
// Full VERBATIM of the client's QUESTION / STORY / ANSWER / CTA script, nothing dropped, with 3
// summary cards (IRKUTSK / 5 OCTOBER / ~200 OBSERVED; TREATABLE / WHO: LOW RISK; FORMAL REQUEST
// SENT / PUTIN CALL SCHEDULED), each landing as its facts are spoken. Short post-hook pause
// after the opening question. Sped VO (atempo ~1.25, client: "read faster") -- total 2156
// frames = ~72s. 4-mode
// rotating text animation. 24 beats: 21 media (incl. 4 video b-roll + 3 summary cards over
// brand-safe media), 1 solid-red impact ("silence" turn) and 2 black (the "makes it work" and
// "what isn't in the statement" reflection lines).
// NB: NEW topic -- not a duplicate of any existing reel; own distinct footage under public/silence/.
// NAMES/figures/events are editorial (VO + text only); FOOTAGE is strictly BRAND-FREE AND
// FACE-FREE -- generic lab/medical/diplomatic b-roll, NO Trump/Putin likenesses, NO national
// flags, NO CDC/WHO/State-Dept seals, NO brand logos / wordmarks / foreign-language signage /
// identifiable faces. Own footage public/silence/.
// **TIME-SENSITIVE / UNVERIFIED -- verify before publishing:** cites a specific breaking event
// and figures (Irkutsk lab death 5 Oct, ~200 under observation; CDC/WHO assessments; a formal
// US diplomatic request and a scheduled Trump-Putin call). All supplied by the author and
// rendered as written; confirm every claim against primary sources before this publishes.
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  {dur: 236, kind: 'hook', text: 'Why is America offering|to help Russia with a disease|it already knows how to cure?', kicker: 'The silence', highlights: ['cure?'], size: 44, media: {src: 'silence/s_bacteria.mp4', type: 'video', effect: 'in'}},
  {dur: 155, kind: 'text', text: 'Fifth of October.|A lab technician dies|at the Anti-Plague Institute.', highlights: ['dies'], size: 46, media: {src: 'silence/s_institute.jpg', type: 'img', effect: 'in'}},
  {dur: 40, kind: 'text', enter: 'slideL', text: 'Suspected|pneumonic plague.', highlights: ['plague.'], size: 54, media: {src: 'silence/s_micro.mp4', type: 'video', effect: 'in'}},
  {dur: 66, kind: 'lines', text: 'IRKUTSK|5 OCTOBER|~200 OBSERVED', highlights: ['~200'], reveal: [0, 20, 40], media: {src: 'silence/s_map.jpg', type: 'img', effect: 'in'}},
  {dur: 100, kind: 'text', text: "Russia says it's|under control,|and little else.", highlights: ['else.'], size: 48, media: {src: 'silence/s_podium.jpg', type: 'img', effect: 'in'}},
  {dur: 26, kind: 'text', text: "Here's the piece|you're missing.", highlights: ['missing.'], size: 50, media: {src: 'silence/s_magnify.jpg', type: 'img', effect: 'in'}},
  {dur: 95, kind: 'text', enter: 'slideUp', text: 'Pneumonic plague|is bacterial.|Antibiotics treat it.', highlights: ['bacterial.'], size: 46, media: {src: 'silence/s_pills.jpg', type: 'img', effect: 'in'}},
  {dur: 57, kind: 'text', text: 'The CDC has|the stockpile.', highlights: ['stockpile.'], size: 50, media: {src: 'silence/s_stockpile.jpg', type: 'img', effect: 'in'}},
  {dur: 78, kind: 'text', text: 'The WHO rates the|public risk as low.', highlights: ['low.'], size: 48, media: {src: 'silence/s_riskgauge.jpg', type: 'img', effect: 'in'}},
  {dur: 84, kind: 'lines', text: 'TREATABLE|WHO: LOW RISK', highlights: ['treatable'], reveal: [0, 34], media: {src: 'silence/s_doc.jpg', type: 'img', effect: 'in'}},
  {dur: 67, kind: 'text', text: 'And this is where|things get interesting.', highlights: ['interesting.'], size: 48, media: {src: 'silence/s_pivot.jpg', type: 'img', effect: 'in'}},
  {dur: 130, kind: 'text', enter: 'slideL', text: 'The State Department|sends Moscow a formal|diplomatic request anyway.', highlights: ['anyway.'], size: 44, media: {src: 'silence/s_letter.jpg', type: 'img', effect: 'in'}},
  {dur: 22, kind: 'text', text: 'Trump offers help.', highlights: ['help.'], size: 52, media: {src: 'silence/s_phone.jpg', type: 'img', effect: 'in'}},
  {dur: 66, kind: 'lines', text: 'FORMAL REQUEST SENT|PUTIN CALL SCHEDULED', highlights: ['scheduled'], reveal: [0, 34], media: {src: 'silence/s_diplo.jpg', type: 'img', effect: 'in'}},
  {dur: 86, kind: 'text', text: 'The US is escalating|over something|it says it can handle.', highlights: ['escalating'], size: 46, media: {src: 'silence/s_table.jpg', type: 'img', effect: 'in'}},
  {dur: 88, kind: 'text', text: 'This is the part|that makes it work.', highlights: ['work.'], size: 54},
  {dur: 72, kind: 'impact', text: 'What Washington|can\'t treat is|silence.', highlights: ['silence.'], redBg: true},
  {dur: 160, kind: 'text', enter: 'slideR', text: 'No confirmed cause of death.|No lab records.|Nothing to the WHO.', highlights: ['who.'], size: 44, media: {src: 'silence/s_records.jpg', type: 'img', effect: 'in'}},
  {dur: 43, kind: 'text', text: "The threat isn't|what's in the sample.", highlights: ['sample.'], size: 48, media: {src: 'silence/s_vial.mp4', type: 'video', effect: 'in'}},
  {dur: 43, kind: 'text', text: "It's what isn't|in the statement.", highlights: ['statement.'], size: 52},
  {dur: 90, kind: 'text', enter: 'slideL', text: "The threat isn't the bacteria.|It's the information.", highlights: ['information.'], size: 46, media: {src: 'silence/s_data.mp4', type: 'video', effect: 'in'}},
  {dur: 148, kind: 'text', text: 'Antibiotics fix plague.|Nothing fixes a government|that won\'t say what happened.', highlights: ['happened.'], size: 44, media: {src: 'silence/s_door.jpg', type: 'img', effect: 'in'}},
  {dur: 102, kind: 'text', text: "That's the help|America is offering,|and the help Russia isn't taking.", highlights: ['taking.'], size: 44, media: {src: 'silence/s_handshake.jpg', type: 'img', effect: 'in'}},
  {dur: 93, kind: 'text', enter: 'zoom', text: 'Should the US be asking,|or demanding?|Tell me below.', highlights: ['below.'], size: 46, media: {src: 'silence/s_gavel.jpg', type: 'img', effect: 'in'}},
];

// Sound-effect cues (frame, file, gain). Impacts punch the open, the -26% and 64%->22% and
// real-yield cards, and the red "craziest part" turn; whooshes mark the "here's exactly"
// turn, the "never an inflation hedge" thesis and the CTA close. Frames align to the 21-beat
// BEAT_STARTS.
type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 431, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 853, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 937, src: 'media/sfx_whoosh.mp3', vol: 0.4},
  {at: 1156, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 1396, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 1714, src: 'media/sfx_whoosh.mp3', vol: 0.4},
  {at: 2054, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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

// Entrance transition applied to a scene's media + text together, over ~9 frames.
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
// Media background
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
// Kinetic caption — Anton condensed caps, word-by-word, red highlight
// ---------------------------------------------------------------------------
const Caption: React.FC<{text: string; highlights?: string[]; size?: number; align?: 'center' | 'flex-start'; typewriter?: boolean}> = ({text, highlights = [], size = 112, align = 'center', typewriter = false}) => {
  const frame = useCurrentFrame();
  const lines = text.split('|');
  const hset = highlights.map((h) => h.toLowerCase());
  const isHi = (w: string) => hset.includes(w.replace(/[.,—…-]/g, '').toLowerCase()) || hset.includes(w.toLowerCase());
  let wordIndex = 0;
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 2, alignItems: align, width: '100%'}}>
      {lines.map((line, li) => (
        <div key={li} style={{display: 'flex', flexWrap: 'wrap', justifyContent: align === 'center' ? 'center' : 'flex-start', gap: '0 18px'}}>
          {line.split(' ').map((word, wi) => {
            const gi = wordIndex++;
            // typewriter mode reveals word-by-word; other modes render static and
            // let the scene-level TextAnim wrapper handle enter/exit.
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
// Scenes
// ---------------------------------------------------------------------------
const SceneHook: React.FC<{text: string; kicker?: string; highlights?: string[]; size?: number; mode?: string}> = ({text, kicker, highlights, size = 92, mode}) => (
  <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', padding: 84}}>
    {kicker ? <div style={{marginBottom: 44}}><Kicker>{kicker}</Kicker></div> : null}
    <Caption text={text} highlights={highlights} size={size} typewriter={mode === 'type'} />
  </AbsoluteFill>
);

const SceneText: React.FC<{text: string; highlights?: string[]; size?: number; mode?: string}> = ({text, highlights, size = 100, mode}) => (
  <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', padding: 84}}>
    <Caption text={text} highlights={highlights} size={size} typewriter={mode === 'type'} />
  </AbsoluteFill>
);

const SceneLines: React.FC<{text: string; highlights?: string[]; reveal?: number[]; mode?: string}> = ({text, highlights = [], reveal, mode}) => {
  const frame = useLocal();
  const lines = text.split('|');
  const hset = highlights.map((h) => h.toLowerCase());
  const typewriter = mode === 'type';
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'flex-start', padding: '0 96px'}}>
      <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
        {lines.map((l, i) => {
          // typewriter reveals line-by-line; other modes are static (the TextAnim
          // wrapper animates the whole block in/out).
          const op = typewriter ? interpolate(frame, [3 + i * 8, 9 + i * 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) : 1;
          return (
            <div key={i} style={{opacity: op, fontFamily: HEAD, fontSize: 96, lineHeight: 0.98, letterSpacing: 0.5, textTransform: 'uppercase'}}>
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
  const barW = stat.bar != null ? interpolate(frame, [6, 40], [0, stat.bar], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeInOut}) : 0;
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', padding: 80}}>
      <div style={{textAlign: 'center'}}>
        {stat.pre ? <div style={{fontFamily: BODY, fontWeight: 700, fontSize: 30, letterSpacing: 6, color: C.ink, textTransform: 'uppercase', marginBottom: 8}}>{stat.pre}</div> : null}
        <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'center'}}>
          {stat.prefix ? <span style={{fontFamily: HEAD, fontSize: 170, color: C.red, lineHeight: 1}}>{stat.prefix}</span> : null}
          <span style={{fontFamily: HEAD, fontSize: 300, color: C.red, lineHeight: 0.85, letterSpacing: 2, textShadow: SH}}>{num}</span>
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

// Two-bar comparison chart — bars grow from the baseline; the taller bar is red
// and glows; values count up above each bar. (Kept from the series' chart kind;
// not used in this reel but available.)
const SceneChart: React.FC<{chart: ChartCfg}> = ({chart}) => {
  const frame = useLocal();
  const t = interpolate(frame, [6, 44], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeInOut});
  const maxVal = Math.max(chart.a.value, chart.b.value);
  const H = 900;
  const dec = chart.decimals ?? 0;
  const fmt = (v: number) => (chart.prefix ?? '') + (dec ? v.toFixed(dec) : Math.round(v).toString()) + (chart.suffix ?? '');
  const Bar: React.FC<{d: {label: string; value: number; red?: boolean}}> = ({d}) => {
    const h = (d.value / maxVal) * H * t;
    const shown = d.value * t;
    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: 260}}>
        <div style={{fontFamily: HEAD, fontSize: 92, color: d.red ? C.red : C.ink, lineHeight: 1, marginBottom: 10, textShadow: SH}}>{fmt(shown)}</div>
        <div style={{width: 200, height: H, display: 'flex', alignItems: 'flex-end'}}>
          <div
            style={{
              width: '100%',
              height: Math.max(4, h),
              borderRadius: 6,
              background: d.red ? C.red : '#4A4A50',
              border: d.red ? 'none' : '1px solid rgba(255,255,255,0.28)',
              boxShadow: d.red ? '0 0 46px rgba(255,46,46,0.5)' : 'none',
            }}
          />
        </div>
        <div style={{fontFamily: BODY, fontWeight: 700, fontSize: 34, letterSpacing: 4, color: C.ink, textTransform: 'uppercase', marginTop: 20, textShadow: SH}}>{d.label}</div>
      </div>
    );
  };
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div style={{display: 'flex', gap: 70, alignItems: 'flex-end'}}>
          <Bar d={chart.a} />
          <Bar d={chart.b} />
        </div>
        {chart.unit ? <div style={{fontFamily: BODY, fontWeight: 700, fontSize: 28, letterSpacing: 6, color: C.sub, textTransform: 'uppercase', marginTop: 30}}>{chart.unit}</div> : null}
      </div>
    </AbsoluteFill>
  );
};

const SceneImpact: React.FC<{text: string; redBg?: boolean}> = ({text, redBg}) => {
  const lines = text.split('|');
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', background: redBg ? 'radial-gradient(125% 90% at 50% 42%, #FF2E2E 0%, #E31E1E 62%, #C21414 100%)' : undefined}}>
      <div style={{position: 'relative', zIndex: 1, textAlign: 'center', fontFamily: HEAD, fontSize: 150, lineHeight: 0.92, letterSpacing: 1, textTransform: 'uppercase'}}>
        {lines.map((l, i) => (
          <div key={i} style={{color: redBg ? (i === 0 ? '#0A0A0A' : C.ink) : (i === lines.length - 1 ? C.red : C.ink), textShadow: redBg ? 'none' : SH}}>
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
    {t: 'The box was', red: false},
    {t: 'the product.', red: false},
    {t: 'Now the lock.', red: true},
  ];
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
      <div style={{display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center'}}>
        {parts.map((p, i) => {
          const s = spring({frame: frame - (6 + i * 14), fps, config: {damping: 200}});
          return (
            <span key={i} style={{fontFamily: HEAD, fontSize: p.red ? 150 : 116, textTransform: 'uppercase', letterSpacing: 1, color: C.ink, opacity: s, transform: `translateY(${interpolate(s, [0, 1], [34, 0])}px)`}}>
              {p.red ? (<>Now the <span style={{color: C.red, textShadow: SH}}>lock.</span></>) : p.t}
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
  return (
    <>
      <div style={{position: 'absolute', top: 70, left: 80, display: 'flex', alignItems: 'center', gap: 14}}>
        <div style={{width: 11, height: 11, borderRadius: 11, background: C.sub}} />
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The silence</span>
      </div>
      <div style={{position: 'absolute', bottom: 90, left: 80, right: 80, height: 3, borderRadius: 3, background: 'rgba(255,255,255,0.08)'}}>
        <div style={{height: '100%', width: `${progress * 100}%`, borderRadius: 3, background: C.sub}} />
      </div>
    </>
  );
};

// Text enter/exit animation modes, rotated across beats so the motion varies.
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
      return <SceneHook text={s.text!} kicker={s.kicker} highlights={s.highlights} size={s.size} mode={mode} />;
    case 'lines':
      return <SceneLines text={s.text!} highlights={s.highlights} reveal={s.reveal} mode={mode} />;
    case 'text':
      return <SceneText text={s.text!} highlights={s.highlights} size={s.size} mode={mode} />;
    case 'stat':
      return <SceneStat stat={s.stat!} />;
    case 'chart':
      return <SceneChart chart={s.chart!} />;
    case 'impact':
      return <SceneImpact text={s.text!} redBg={s.redBg} />;
    case 'outro':
      return <SceneOutro />;
    default:
      return null;
  }
};

// ---------------------------------------------------------------------------
export const SilenceReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('silence/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('silence/music.mp3')}
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

// Bottom-center brand watermark — 45% opacity, hard edges (drop the client's
// exact export at public/media/logo.png to replace).
const LogoWatermark: React.FC = () => (
  <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', pointerEvents: 'none'}}>
    <Img
      src={staticFile('media/logo.png')}
      style={{width: 330, height: 'auto', opacity: 0.45, marginBottom: 130, borderRadius: 0}}
    />
  </AbsoluteFill>
);
