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
// "One percent" reel (OnePctReel) — fast NEWS reel, Hard Ledger house format.
// A/B TWIN of MortgageReel ("Priced in") on the SAME UK event (the 5-year fix hitting 6% while
// the Bank of England HELD the base rate) but a NEW angle: the PERSONAL COST. Thesis: one
// percent isn't one percent — on a normal £200k/25yr mortgage a 4%->6% move is +£233 a month
// (~£2,800 a year) for the same house, every month for the life of the deal; and the number
// that sets it isn't on Threadneedle Street, it's in the Gulf (lenders price off swap rates,
// swap rates move with the Middle East). Beats: the average 5-yr fix hits 6% (Moneyfacts:
// "disastrous"); the £200k example (4% = £1,056 vs 6% = £1,289 = +£233/mo); the BoE didn't
// move, lenders price off swap rates tied to the Middle East, +0.2% expected, 5,000,000
// households off a fix by 2028; fixed deals under 5% down from 1,500 to 9 vs 389 variable --
// the fix locks you in, the variable rides the base rate, the choice is now a bet on a war.
// Full VERBATIM QUESTION/STORY/ANSWER/CTA with a ~1s post-hook pause; close is a CTA QUESTION
// ("When does your fix end?"). Sped VO (atempo ~1.23, ~5% faster) -- total 2437 frames = ~81s (final CTA
// beat extended for a clean tail). 25 beats: 23 media (incl. 5 video b-roll + 2 cards:
// SAME HOUSE/+£233 A MONTH/£2,800 A YEAR; BASE RATE UNCHANGED/+0.2% EXPECTED/5,000,000 BY 2028
// -- plus a 6.00% fix stat) / 1 red impact ("it's in the Gulf") / 1 black ("but nobody tells
// you this part").
// NB: A/B twin of MortgageReel -- OWN distinct footage under public/onepct/, NO reuse of
// MortgageReel's (public/mortgage/) or any other reel's clips.
// FIGURES/EVENT are editorial (VO + text only); FOOTAGE is strictly BRAND-FREE AND FACE-FREE --
// generic housing / documents / markets / Gulf-oil b-roll, NO Bank of England / Moneyfacts /
// Halifax / Nationwide / Barclays / HSBC / NatWest / Lloyds / Rightmove / Zoopla logos or
// wordmarks, NO Bank of England / Threadneedle Street building or identifiable London landmarks,
// NO banknote or coin portrait faces, NO national flags, NO foreign-language signage, NO faces.
// **TIME-SENSITIVE / UNVERIFIED -- verify before publishing:** attributes a 6.00% 5-yr fix and
// a "disastrous" quote to Moneyfacts, the £200k example figures (4%=£1,056 / 6%=£1,289 / +£233),
// a +0.2% analyst call, 5m households off a fix by 2028, and the fixed/variable deal counts
// (1,500->9 / 389), plus a causal swap-rate/Middle-East link. All author-supplied and rendered
// as written; confirm every figure against primary sources before this publishes.
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  {dur: 149, kind: 'hook', text: 'What does a one percent rise|in your mortgage rate|actually cost you?', kicker: 'One percent', highlights: ['cost'], size: 42, media: {src: 'onepct/op_house.mp4', type: 'video', effect: 'in'}},
  {dur: 195, kind: 'stat', stat: {pre: 'UK 5-YEAR FIX', value: 6.00, decimals: 2, suffix: '%', post: 'HIGHEST SINCE 2023'}, media: {src: 'onepct/op_chart.jpg', type: 'img', effect: 'in'}},
  {dur: 57, kind: 'text', text: "Moneyfacts' word|for it: disastrous.", highlights: ['disastrous.'], size: 48, media: {src: 'onepct/op_doc.jpg', type: 'img', effect: 'in'}},
  {dur: 52, kind: 'text', text: 'But nobody tells you|this part.', highlights: ['part.'], size: 54},
  {dur: 139, kind: 'text', enter: 'slideL', text: 'Take a £200,000 mortgage|over 25 years.', highlights: ['£200,000'], size: 44, media: {src: 'onepct/op_keys.jpg', type: 'img', effect: 'in'}},
  {dur: 164, kind: 'text', text: 'At 4%: £1,056 a month.|At 6%: £1,289.', highlights: ['£1,289.'], size: 44, media: {src: 'onepct/op_calc.mp4', type: 'video', effect: 'in'}},
  {dur: 133, kind: 'lines', text: 'SAME HOUSE|+£233 A MONTH|£2,800 A YEAR', highlights: ['+£233'], reveal: [0, 22, 44], media: {src: 'onepct/op_coins.jpg', type: 'img', effect: 'in'}},
  {dur: 34, kind: 'text', text: 'For the|same house.', highlights: ['house.'], size: 52, media: {src: 'onepct/op_terrace.jpg', type: 'img', effect: 'in'}},
  {dur: 49, kind: 'text', text: "But that's not even|the craziest part.", highlights: ['craziest'], size: 48, media: {src: 'onepct/op_craziest.jpg', type: 'img', effect: 'in'}},
  {dur: 74, kind: 'text', enter: 'slideUp', text: "The Bank of England|didn't move.", highlights: ["didn't"], size: 46, media: {src: 'onepct/op_boe.jpg', type: 'img', effect: 'in'}},
  {dur: 58, kind: 'text', text: 'Lenders price off|swap rates.', highlights: ['swap'], size: 48, media: {src: 'onepct/op_swap.mp4', type: 'video', effect: 'in'}},
  {dur: 87, kind: 'text', enter: 'slideR', text: 'And swap rates move|with the Middle East.', highlights: ['middle'], size: 46, media: {src: 'onepct/op_gulf.mp4', type: 'video', effect: 'in'}},
  {dur: 157, kind: 'text', text: 'One analyst expects|another 0.2%|on top.', highlights: ['0.2%'], size: 46, media: {src: 'onepct/op_analyst.jpg', type: 'img', effect: 'in'}},
  {dur: 136, kind: 'lines', text: 'BASE RATE: UNCHANGED|+0.2% EXPECTED|5,000,000 BY 2028', highlights: ['5,000,000'], reveal: [0, 22, 44], media: {src: 'onepct/op_households.jpg', type: 'img', effect: 'in'}},
  {dur: 49, kind: 'text', text: "Here's exactly|how they do it.", highlights: [], size: 50, media: {src: 'onepct/op_pivot.jpg', type: 'img', effect: 'in'}},
  {dur: 116, kind: 'text', enter: 'slideL', text: 'Fixed deals under 5%:|down from 1,500|to nine.', highlights: ['nine.'], size: 44, media: {src: 'onepct/op_fewoptions.jpg', type: 'img', effect: 'in'}},
  {dur: 127, kind: 'text', text: 'Variable deals under 5%:|still 389.', highlights: ['389.'], size: 46, media: {src: 'onepct/op_variable.jpg', type: 'img', effect: 'in'}},
  {dur: 74, kind: 'text', text: 'The fix|locks you in.', highlights: ['locks'], size: 52, media: {src: 'onepct/op_lock.jpg', type: 'img', effect: 'in'}},
  {dur: 52, kind: 'text', text: 'The variable|rides the base rate.', highlights: ['rides'], size: 48, media: {src: 'onepct/op_wave.mp4', type: 'video', effect: 'in'}},
  {dur: 89, kind: 'text', enter: 'slideUp', text: 'Which one you pick|is now a bet|on a war.', highlights: ['war.'], size: 46, media: {src: 'onepct/op_dice.jpg', type: 'img', effect: 'in'}},
  {dur: 43, kind: 'text', text: "One percent|isn't one percent.", highlights: ['percent.'], size: 50, media: {src: 'onepct/op_onepct.jpg', type: 'img', effect: 'in'}},
  {dur: 201, kind: 'text', enter: 'slideR', text: "It's £233 a month,|every month,|for as long as it runs.", highlights: ['£233'], size: 42, media: {src: 'onepct/op_recurring.jpg', type: 'img', effect: 'in'}},
  {dur: 91, kind: 'text', text: 'The number that sets it|isn’t in|Threadneedle Street.', highlights: ['isn’t'], size: 42, media: {src: 'onepct/op_district.jpg', type: 'img', effect: 'in'}},
  {dur: 33, kind: 'impact', text: "It's in|the Gulf.", highlights: ['gulf.'], redBg: true},
  {dur: 78, kind: 'text', enter: 'zoom', text: 'When does|your fix end?|Tell me below.', highlights: ['below'], size: 46, media: {src: 'onepct/op_cta.jpg', type: 'img', effect: 'in'}},
];

// Sound-effect cues (frame, file, gain). Impacts punch the open, the "but nobody" turn, the
// £233 card, the "craziest part" turn, the Middle-East twist, the 5m-households card, the "bet
// on a war" beat and the red Gulf card; whooshes mark the "here's exactly how" pivot and the CTA.
// Frames align to the 25-beat BEAT STARTS.
type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 401, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 756, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 923, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 1104, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 1348, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 1484, src: 'media/sfx_whoosh.mp3', vol: 0.4},
  {at: 1902, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 2326, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 2359, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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

// Two-bar comparison chart — kept from the series' chart kind; not used in this reel.
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
    {t: 'Not', red: false},
    {t: 'Threadneedle Street.', red: false},
    {t: 'The Gulf.', red: true},
  ];
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
      <div style={{display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center'}}>
        {parts.map((p, i) => {
          const s = spring({frame: frame - (6 + i * 14), fps, config: {damping: 200}});
          return (
            <span key={i} style={{fontFamily: HEAD, fontSize: p.red ? 150 : 116, textTransform: 'uppercase', letterSpacing: 1, color: C.ink, opacity: s, transform: `translateY(${interpolate(s, [0, 1], [34, 0])}px)`}}>
              {p.red ? (<span style={{color: C.red, textShadow: SH}}>The Gulf.</span>) : p.t}
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>One percent</span>
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
export const OnePctReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('onepct/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('onepct/music.mp3')}
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

// Bottom-center brand watermark — 45% opacity, hard edges.
const LogoWatermark: React.FC = () => (
  <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', pointerEvents: 'none'}}>
    <Img
      src={staticFile('media/logo.png')}
      style={{width: 330, height: 'auto', opacity: 0.45, marginBottom: 130, borderRadius: 0}}
    />
  </AbsoluteFill>
);
