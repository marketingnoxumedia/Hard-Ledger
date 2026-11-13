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
  pos?: 'center' | 'upper' | 'lower' | 'left' | 'right' | 'upperLeft' | 'upperRight' | 'lowerLeft' | 'lowerRight';
};

// ---------------------------------------------------------------------------
// "The selloff" reel (SelloffReel) — Hard Ledger house VISUAL format, tech / semiconductor / markets news topic.
// TOPIC: a BROAD CHIP-STOCK SELL-OFF — Qualcomm, Micron and Arm lead a semiconductor slump as investors start to doubt
// the AI boom's pace. On Nov 5, semis extended losses even after the broader US market had rallied the day before.
// Qualcomm fell on disappointing smartphone-chip sales (higher component costs, weaker handset revenue); Arm fell on a
// revenue forecast that missed; Micron's planned $4.5 BILLION Taiwan factory expansion was put on hold amid labor
// disputes. Added fear: stricter regulation + local opposition could slow AI data-center construction, threatening chip/
// memory demand. The semiconductor index fell >3% premarket — pressure spreading beyond the three. The debate: firms
// spend billions on AI infrastructure, but will the returns justify it? Temporary correction, or the chip industry
// growing too fast?
// NOTE ON VOICE: built VERBATIM from a client-supplied script in the influencer "curiosity-gap" format (HOOK / CURIOSITY
// GAP / EARLY CTA / CONTEXT / EVIDENCE / ESCALATION / CONSEQUENCES / CONTROVERSY / AUDIENCE DEBATE), NOT the faceless
// house voice — it names Qualcomm / Micron / Arm / Wall Street, uses an EARLY "follow for more" CTA, and CLOSES on a
// "let me know in the comments" debate CTA. Per the saved house preference, captions are <=5-6 words/beat with LARGER
// on-screen type (Anton 42-52). 50 beats. 2 stat cards: $4.5 / BILLION (Micron Taiwan expansion on hold); 3% (semi
// index premarket drop) — the script's hard figures. 1 red impact at the CONTROVERSY pivot ("The doubt / sets in." — the
// real reason; reel closes on the comments-CTA media beat), no black beat. Captions match the VO verbatim (the inline
// "November 5" reads as spoken). Durations/reveals/SFX locked to the VO via a scribe_v1 word-timestamp anchor pass
// (public/selloff/voiceover.mp3). Built at the house +10% pacing default; its own tense, driving markets/tech music mixed
// at 0.2. OWN distinct footage under public/selloff/ (49 stills), NO reuse of any other reel's clips — ledger-checked.
// FOOTAGE is strictly BRAND-FREE and GENERIC — because the reel names real companies (Qualcomm, Micron, Arm) AND places
// (Wall Street, Taiwan), NONE of their assets appear: NO Qualcomm / Micron / Arm / Nvidia logo / wordmark, NO branded
// chip or wafer with a readable maker name, NO readable stock ticker / brand ticker symbol on any screen, NO identifiable
// trader / executive face, NO TAIWANESE / US / CHINESE national flag, NO identifiable exchange building / landmark, NO
// readable brand name / sign / screen text, NO identifiable currency notes, NO brand phone (blank screens only).
// Metaphor-led semiconductor / markets / AI b-roll only: generic unbranded silicon wafers and chips and circuit boards, a
// red falling candlestick / downtrend chart and a red downward arrow, an abstract trading-floor / markets motif, memory
// modules and server racks and a data-center, a fab / cleanroom and construction cranes for the halted factory, a scale /
// regulator motif, a globe / network for the "AI race", a bear / storm-cloud motif for the slump, a blank-screen phone.
// **UNVERIFIED — states specific, checkable but evolving claims (the Nov 5 sell-off; Qualcomm/Arm earnings-forecast
// misses; Micron's $4.5B Taiwan expansion on hold; the >3% index drop; the data-center-regulation fear). Rendered
// VERBATIM as supplied, but every figure and claim MUST be fact-checked against primary reporting before publishing —
// markets and corporate plans move fast. This is general information, not investment advice.**
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 100, kind: 'hook', reveal: [3, 40], text: 'The companies powering|the AI revolution', kicker: 'The selloff', highlights: [], size: 48, media: {src: 'selloff/so00_power.jpg', type: 'img', effect: 'in'}},
  // 1
  {dur: 72, kind: 'text', reveal: [2, 28], text: 'are suddenly losing|billions in market value.', highlights: ['billions'], size: 44, pos: 'upperRight', media: {src: 'selloff/so01_billions.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 53, kind: 'text', reveal: [2], text: 'Qualcomm, Micron, and Arm', highlights: [], size: 50, pos: 'left', media: {src: 'selloff/so02_trio.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 54, kind: 'text', reveal: [2, 28], text: 'are leading a|major sell-off', highlights: ['sell-off'], size: 48, pos: 'lowerRight', media: {src: 'selloff/so03_selloff.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 75, kind: 'text', reveal: [2, 28], text: 'across the|semiconductor industry.', highlights: ['semiconductor'], size: 50, pos: 'upperLeft', media: {src: 'selloff/so04_semis.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 45, kind: 'text', reveal: [2, 28], text: 'But here’s|the surprising part:', highlights: [], size: 48, pos: 'right', media: {src: 'selloff/so05_surprise.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 79, kind: 'text', reveal: [2, 28], text: 'this isn’t just about|disappointing earnings.', highlights: ['earnings.'], size: 44, pos: 'lower', media: {src: 'selloff/so06_earnings.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 67, kind: 'text', reveal: [2, 28], text: 'Investors are|starting to question', highlights: ['question'], size: 48, pos: 'upperLeft', media: {src: 'selloff/so07_question.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 80, kind: 'text', reveal: [2, 28], text: 'whether the AI boom|can keep growing', highlights: ['growing'], size: 44, pos: 'upperRight', media: {src: 'selloff/so08_boom.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 58, kind: 'text', reveal: [2, 28], text: 'at the pace|they expected.', highlights: ['expected.'], size: 48, pos: 'lowerLeft', media: {src: 'selloff/so09_pace.jpg', type: 'img', effect: 'in'}},
  // 10 FOLLOW
  {dur: 35, kind: 'text', reveal: [2], text: 'Follow for|more updates', highlights: ['follow'], size: 50, pos: 'right', media: {src: 'selloff/so10_follow.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 99, kind: 'text', reveal: [2, 28], text: 'on the technology and money|behind the AI race.', highlights: ['race.'], size: 44, pos: 'left', media: {src: 'selloff/so11_airace.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Chipmakers have been|among the biggest winners', highlights: ['winners'], size: 44, pos: 'lowerRight', media: {src: 'selloff/so12_winners.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 38, kind: 'text', reveal: [2], text: 'of the AI boom.', highlights: [], size: 50, pos: 'upper', media: {src: 'selloff/so13_aiboom.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 37, kind: 'text', reveal: [2], text: 'But on November 5,', highlights: [], size: 50, pos: 'left', media: {src: 'selloff/so14_nov5.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 82, kind: 'text', reveal: [2, 28], text: 'semiconductor stocks|extended their losses,', highlights: ['losses,'], size: 48, pos: 'right', media: {src: 'selloff/so15_losses.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 77, kind: 'text', reveal: [2, 28], text: 'even as the broader|US market had rallied', highlights: ['rallied'], size: 44, pos: 'lowerLeft', media: {src: 'selloff/so16_rallied.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 39, kind: 'text', reveal: [2], text: 'the previous day.', highlights: [], size: 52, pos: 'upperRight', media: {src: 'selloff/so17_prevday.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 50, kind: 'text', reveal: [2], text: 'Qualcomm shares dropped', highlights: ['dropped'], size: 52, pos: 'left', media: {src: 'selloff/so18_qualcomm.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 113, kind: 'text', reveal: [2, 28], text: 'after its smartphone-chip sales|disappointed Wall Street.', highlights: ['disappointed'], size: 44, pos: 'lowerRight', media: {src: 'selloff/so19_smartphone.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 41, kind: 'text', reveal: [2], text: 'Higher component costs', highlights: ['costs'], size: 52, pos: 'upperLeft', media: {src: 'selloff/so20_costs.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 49, kind: 'text', reveal: [2, 28], text: 'and weaker|handset revenue', highlights: ['weaker'], size: 50, pos: 'right', media: {src: 'selloff/so21_handset.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 72, kind: 'text', reveal: [2, 28], text: 'are putting pressure|on its business.', highlights: ['pressure'], size: 44, pos: 'lower', media: {src: 'selloff/so22_pressure.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 47, kind: 'text', reveal: [2], text: 'Arm also fell', highlights: ['fell'], size: 52, pos: 'upperRight', media: {src: 'selloff/so23_arm.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 65, kind: 'text', reveal: [2, 28], text: 'after its latest|revenue forecast', highlights: ['forecast'], size: 48, pos: 'lowerLeft', media: {src: 'selloff/so24_forecast.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 58, kind: 'text', reveal: [2, 28], text: 'failed to|impress investors', highlights: ['failed'], size: 50, pos: 'left', media: {src: 'selloff/so25_failed.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 87, kind: 'text', reveal: [2, 28], text: 'who had expected|stronger growth.', highlights: ['growth.'], size: 48, pos: 'right', media: {src: 'selloff/so26_growth.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 58, kind: 'text', reveal: [2, 28], text: 'Meanwhile,|Micron’s planned', highlights: [], size: 52, pos: 'lowerRight', media: {src: 'selloff/so27_micron.jpg', type: 'img', effect: 'in'}},
  // 28 CARD
  {dur: 58, kind: 'stat', stat: {prefix: '$', value: 4.5, decimals: 1, post: 'BILLION'}, media: {src: 'selloff/so28_card45b.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 62, kind: 'text', reveal: [2], text: 'factory expansion in Taiwan', highlights: ['Taiwan'], size: 50, pos: 'upperLeft', media: {src: 'selloff/so29_taiwan.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 75, kind: 'text', reveal: [2, 28], text: 'was put on hold|amid labor disputes.', highlights: ['hold'], size: 44, pos: 'right', media: {src: 'selloff/so30_onhold.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 41, kind: 'text', reveal: [2, 28], text: 'And there’s|another concern.', highlights: ['concern.'], size: 50, pos: 'upperRight', media: {src: 'selloff/so31_concern.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 72, kind: 'text', reveal: [2, 28], text: 'Investors fear|stricter regulations', highlights: ['regulations'], size: 50, pos: 'left', media: {src: 'selloff/so32_regulations.jpg', type: 'img', effect: 'in'}},
  // 33
  {dur: 38, kind: 'text', reveal: [2], text: 'and local opposition', highlights: ['opposition'], size: 52, pos: 'lowerLeft', media: {src: 'selloff/so33_opposition.jpg', type: 'img', effect: 'in'}},
  // 34
  {dur: 92, kind: 'text', reveal: [2, 28], text: 'could slow the construction|of AI data centers,', highlights: ['data'], size: 44, pos: 'upper', media: {src: 'selloff/so34_datacenters.jpg', type: 'img', effect: 'in'}},
  // 35
  {dur: 47, kind: 'text', reveal: [2, 28], text: 'threatening demand|for the chips', highlights: ['demand'], size: 48, pos: 'right', media: {src: 'selloff/so35_demand.jpg', type: 'img', effect: 'in'}},
  // 36
  {dur: 63, kind: 'text', reveal: [2, 28], text: 'and memory|needed to power them.', highlights: ['memory'], size: 44, pos: 'lowerRight', media: {src: 'selloff/so36_memory.jpg', type: 'img', effect: 'in'}},
  // 37
  {dur: 60, kind: 'text', reveal: [2, 28], text: 'The semiconductor index|fell more than', highlights: ['fell'], size: 44, pos: 'upperLeft', media: {src: 'selloff/so37_index.jpg', type: 'img', effect: 'in'}},
  // 38 CARD
  {dur: 40, kind: 'stat', stat: {value: 3, suffix: '%'}, media: {src: 'selloff/so38_card3pct.jpg', type: 'img', effect: 'in'}},
  // 39
  {dur: 60, kind: 'text', reveal: [2], text: 'in premarket trading,', highlights: [], size: 52, pos: 'left', media: {src: 'selloff/so39_premarket.jpg', type: 'img', effect: 'in'}},
  // 40
  {dur: 92, kind: 'text', reveal: [2, 28], text: 'the pressure is spreading|beyond three companies.', highlights: ['spreading'], size: 44, pos: 'lowerRight', media: {src: 'selloff/so40_spreading.jpg', type: 'img', effect: 'in'}},
  // 41 RED
  {dur: 26, kind: 'impact', redBg: true, text: 'Here’s the|debate.'},
  // 42
  {dur: 64, kind: 'text', reveal: [2, 28], text: 'Companies are|spending billions', highlights: ['billions'], size: 50, pos: 'upperRight', media: {src: 'selloff/so43_spending.jpg', type: 'img', effect: 'in'}},
  // 43
  {dur: 65, kind: 'text', reveal: [2, 28], text: 'to build|AI infrastructure,', highlights: ['infrastructure,'], size: 50, pos: 'right', media: {src: 'selloff/so44_infra.jpg', type: 'img', effect: 'in'}},
  // 44
  {dur: 69, kind: 'text', reveal: [2], text: 'but investors question', highlights: ['question'], size: 52, pos: 'lowerLeft', media: {src: 'selloff/so45_question2.jpg', type: 'img', effect: 'in'}},
  // 45
  {dur: 118, kind: 'text', reveal: [2, 28], text: 'whether the returns|justify it.', highlights: ['returns'], size: 48, pos: 'left', media: {src: 'selloff/so46_returns.jpg', type: 'img', effect: 'in'}},
  // 46
  {dur: 117, kind: 'text', reveal: [2, 28], text: 'So is this|a temporary correction,', highlights: ['correction,'], size: 44, pos: 'upperRight', media: {src: 'selloff/so47_correction.jpg', type: 'img', effect: 'in'}},
  // 47
  {dur: 121, kind: 'text', reveal: [2, 28], text: 'or is the|chip industry', highlights: [], size: 48, pos: 'lower', media: {src: 'selloff/so48_industry.jpg', type: 'img', effect: 'in'}},
  // 48
  {dur: 45, kind: 'text', reveal: [2], text: 'growing too fast?', highlights: ['fast?'], size: 52, pos: 'right', media: {src: 'selloff/so49_toofast.jpg', type: 'img', effect: 'in'}},
  // 49 CTA
  {dur: 46, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Let me know|in the comments.', highlights: ['comments'], size: 46, media: {src: 'selloff/so50_comments.jpg', type: 'img', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 1800, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 2408, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 2600, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 3225, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
const Caption: React.FC<{text: string; highlights?: string[]; size?: number; align?: 'center' | 'flex-start' | 'flex-end'; typewriter?: boolean; lineSync?: boolean; lineReveal?: number[]}> = ({text, highlights = [], size = 112, align = 'center', typewriter = false, lineSync = false, lineReveal}) => {
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
        <div key={li} style={{display: 'flex', flexWrap: 'wrap', justifyContent: align === 'center' ? 'center' : align === 'flex-end' ? 'flex-end' : 'flex-start', gap: '0 18px', opacity: lineOp[li]}}>
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

const POS: Record<string, {jc: 'center' | 'flex-start' | 'flex-end'; ai: 'center' | 'flex-start' | 'flex-end'; al: 'center' | 'flex-start' | 'flex-end'; pt: number; pb: number}> = {
  center:     {jc: 'center',     ai: 'center',     al: 'center',     pt: 84,  pb: 84},
  upper:      {jc: 'flex-start', ai: 'center',     al: 'center',     pt: 300, pb: 84},
  lower:      {jc: 'flex-end',   ai: 'center',     al: 'center',     pt: 84,  pb: 360},
  left:       {jc: 'center',     ai: 'flex-start', al: 'flex-start', pt: 84,  pb: 84},
  right:      {jc: 'center',     ai: 'flex-end',   al: 'flex-end',   pt: 84,  pb: 84},
  upperLeft:  {jc: 'flex-start', ai: 'flex-start', al: 'flex-start', pt: 300, pb: 84},
  upperRight: {jc: 'flex-start', ai: 'flex-end',   al: 'flex-end',   pt: 190, pb: 84},
  lowerLeft:  {jc: 'flex-end',   ai: 'flex-start', al: 'flex-start', pt: 84,  pb: 320},
  lowerRight: {jc: 'flex-end',   ai: 'flex-end',   al: 'flex-end',   pt: 84,  pb: 320},
};
const SceneText: React.FC<{text: string; highlights?: string[]; size?: number; reveal?: number[]; pos?: string}> = ({text, highlights, size = 100, reveal, pos = 'center'}) => {
  const p = POS[pos] || POS.center;
  const sidey = pos !== 'center' && pos !== 'upper' && pos !== 'lower';
  return (
    <AbsoluteFill style={{justifyContent: p.jc, alignItems: p.ai, paddingLeft: 80, paddingRight: 80, paddingTop: p.pt, paddingBottom: p.pb}}>
      <div style={{maxWidth: sidey ? 740 : '100%'}}>
        <Caption text={text} highlights={highlights} size={size} align={p.al} typewriter={false} lineSync lineReveal={reveal} />
      </div>
    </AbsoluteFill>
  );
};

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
          {stat.suffix ? <span style={{fontFamily: HEAD, fontSize: 120, color: C.red, lineHeight: 1, marginLeft: stat.suffix && stat.suffix.trim().length > 1 ? 18 : 3}}>{stat.suffix.trim()}</span> : null}
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The selloff</span>
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
      return <SceneText text={s.text!} highlights={s.highlights} size={s.size} reveal={s.reveal} pos={s.pos} />;
    case 'stat':
      return <SceneStat stat={s.stat!} />;
    case 'impact':
      return <SceneImpact text={s.text!} redBg={s.redBg} />;
    default:
      return null;
  }
};

// ---------------------------------------------------------------------------
export const SelloffReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('selloff/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('selloff/music.mp3')}
        volume={(f) => interpolate(f, [0, 20, DURATION_IN_FRAMES - 55, DURATION_IN_FRAMES], [0, 0.2, 0.2, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}
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
