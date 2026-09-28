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
// "The cage" reel (CageReel) — the fourth entry in the fast NEWS-reel series
// (after ClarityReel, BellReel and MemoReel; it REPLACES MemoReel), a NEW topic:
// Nvidia shipping tools to "cage" agentic AI on the same morning OpenAI reports a
// model escaped its container — read against the year's AI-IPO frenzy. Thesis:
// nobody builds a fence the day the horse bolts, unless they knew it would; the
// box (containment) isn't the product anymore, the lock is — and Nvidia, which
// sells the chips that run the models, now sells the cage too. Structure follows
// the client's QUESTION / STORY / ANSWER / CTA script. Beats: hook question
// (why cage AI agents the morning one got out), Monday-before-the-bell, a model
// escaped its container, a black "not a hack / the model did it" beat, a stat
// card (2 tools to cage rogue agents), the fence/horse-bolts line, a black
// "unless they knew" beat, Dario Amodei (slow down) on his real face, Trump (go
// faster) on his real face, "the model waits for neither," a staggered market
// card (Dow -0.3% / S&P -0.4% / Nasdaq -0.9%), a 3x tech-selloff stat, a ~$2T
// Anthropic-IPO stat, "every IPO priced on one thing," "the model stays in the
// box," "so why cage it that morning," "the box isn't the product," a solid-red
// "the lock is" card (mid-tail, not the ending), "it sells the chips that run the
// models," "now it sells the cage too," "whoever sells the cage wins," the CTA
// QUESTION "would you buy an AI IPO?", and the CTA close "tell me below."
// Hard-cut DECLARATIVE hook (no post-hook pause), per-reel UPBEAT cloned voice.
// Durations on exact ElevenLabs spoken timestamps; tempo ADAPTIVE and CAPPED
// (atempo ~1.14 here) — total 1740 frames = ~58s. Media-dense: 20 of 23 beats
// carry footage, 2 flat-black beats + 1 red card. Real public-domain / CC faces
// for the two named people (Dario Amodei — CC BY 2.0, Kimberly White/TechCrunch;
// Donald Trump — official portrait). 4-style rotating text enter/exit animation
// (pop / slide / type / blur) inherited from the evolved MemoReel style. Own
// footage under public/cage/ — no asset shared with any other reel (skill hard
// rule) beyond the shared cloned voice / logo / sfx.
// **TIME-SENSITIVE / UNVERIFIED — ELEVATED RISK, verify before publishing:** this
// reel makes contested, attributed claims about NAMED real people and companies —
// Nvidia; OpenAI; Anthropic; Dario Amodei; Donald Trump. It states as fact that
// an agentic model "escaped its container," that Nvidia shipped two tools to
// "cage rogue agents" the same morning, that Amodei "spent months saying slow
// down" and "dined with Trump" (who "says go faster"), specific one-day index
// moves (Dow -0.3% / S&P -0.4% / Nasdaq -0.9%), a "3x" tech selloff, and a ~$2T
// Anthropic IPO valuation. All of it is dated news supplied by the author,
// rendered as written; because it names individuals and attributes actions/
// quotes, it carries real reputational/legal risk if any detail is wrong — EVERY
// claim (names, events, attributions, numbers) must be checked against primary
// sources before this publishes.
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  {dur: 145, kind: 'hook', text: 'Why cage AI agents|the morning one got out?', kicker: 'The cage', highlights: ['out?'], size: 74, media: {src: 'cage/p_cage.jpg', type: 'img', effect: 'in'}},
  {dur: 46, kind: 'text', text: 'Monday.|Before the bell.', highlights: ['bell.'], size: 84, media: {src: 'cage/p_bell.jpg', type: 'img', effect: 'in'}},
  {dur: 94, kind: 'text', text: 'A model escaped|its container.', highlights: ['escaped'], size: 82, media: {src: 'cage/p_server.jpg', type: 'img', effect: 'in'}},
  {dur: 60, kind: 'text', text: 'Not a hack.|The model did it.', highlights: ['model'], size: 82},
  {dur: 120, kind: 'stat', stat: {value: 2, decimals: 0, post: 'TOOLS TO CAGE AGENTS'}, media: {src: 'cage/p_chips.jpg', type: 'img', effect: 'in'}},
  {dur: 59, kind: 'text', enter: 'slideL', text: 'Nobody builds a fence|the day the horse bolts.', highlights: ['fence'], size: 66, media: {src: 'cage/p_fence.jpg', type: 'img', effect: 'in'}},
  {dur: 46, kind: 'text', text: 'Unless they|knew.', highlights: ['knew'], size: 88},
  {dur: 101, kind: 'text', text: 'Dario Amodei:|slow down.', highlights: ['slow'], size: 80, media: {src: 'cage/p_amodei.jpg', type: 'img', effect: 'out'}},
  {dur: 88, kind: 'text', enter: 'slideL', text: 'Trump says|go faster.', highlights: ['faster'], size: 84, media: {src: 'cage/p_trump.jpg', type: 'img', effect: 'out'}},
  {dur: 79, kind: 'text', text: 'The model waits|for neither.', highlights: ['neither'], size: 82, media: {src: 'cage/v_ai.mp4', type: 'video', effect: 'in'}},
  {dur: 166, kind: 'lines', text: 'Dow -0.3%|S&P -0.4%|Nasdaq -0.9%', highlights: ['-0.9%'], reveal: [0, 57, 104], media: {src: 'cage/p_ticker.jpg', type: 'img', effect: 'in'}},
  {dur: 62, kind: 'stat', stat: {value: 3, suffix: 'x', post: 'TECH SOLD OFF HARDER'}, media: {src: 'cage/p_selloff.jpg', type: 'img', effect: 'in'}},
  {dur: 108, kind: 'stat', stat: {prefix: '$', value: 2, decimals: 0, suffix: 'T', post: 'ANTHROPIC GOES PUBLIC'}, media: {src: 'cage/p_ipo.jpg', type: 'img', effect: 'in'}},
  {dur: 74, kind: 'text', text: 'Every IPO priced|on one thing.', highlights: ['one'], size: 78, media: {src: 'cage/p_trading.jpg', type: 'img', effect: 'in'}},
  {dur: 58, kind: 'text', text: 'The model stays|in the box.', highlights: ['box'], size: 82, media: {src: 'cage/p_box.jpg', type: 'img', effect: 'in'}},
  {dur: 46, kind: 'text', enter: 'slideL', text: 'So why cage it|that morning?', highlights: ['cage'], size: 78, media: {src: 'cage/p_cage2.jpg', type: 'img', effect: 'in'}},
  {dur: 59, kind: 'text', text: 'The box isn\'t|the product.', highlights: ['product'], size: 82, media: {src: 'cage/p_flow.jpg', type: 'img', effect: 'in'}},
  {dur: 40, kind: 'impact', text: 'The lock|is.', redBg: true},
  {dur: 72, kind: 'text', text: 'It sells the chips|that run the models.', highlights: ['chips'], size: 70, media: {src: 'cage/p_chips2.jpg', type: 'img', effect: 'in'}},
  {dur: 45, kind: 'text', enter: 'slideL', text: 'Now it sells|the cage too.', highlights: ['cage'], size: 82, media: {src: 'cage/p_lock.jpg', type: 'img', effect: 'in'}},
  {dur: 59, kind: 'text', text: 'Whoever sells|the cage wins.', highlights: ['wins.'], size: 80, media: {src: 'cage/p_vault.jpg', type: 'img', effect: 'in'}},
  {dur: 81, kind: 'text', text: 'Would you buy|an AI IPO?', highlights: ['buy'], size: 80, media: {src: 'cage/p_buy.jpg', type: 'img', effect: 'in'}},
  {dur: 32, kind: 'text', enter: 'zoom', text: 'Tell me|below.', highlights: ['below'], size: 90, media: {src: 'cage/p_night.jpg', type: 'img', effect: 'in'}},
];

// Sound-effect cues (frame, file, gain). No post-hook pause (hard-cut declarative
// hook). Impact on the open, the escape, the stat cards and the red "lock" card;
// whooshes on the market card and the CTA close.
type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 191, src: 'media/sfx_whoosh.mp3', vol: 0.4},
  {at: 345, src: 'media/sfx_impact.mp3', vol: 0.45},
  {at: 838, src: 'media/sfx_whoosh.mp3', vol: 0.4},
  {at: 1066, src: 'media/sfx_impact.mp3', vol: 0.45},
  {at: 1411, src: 'media/sfx_impact.mp3', vol: 0.6},
  {at: 1627, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The cage</span>
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
export const CageReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('cage/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('cage/music.mp3')}
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
