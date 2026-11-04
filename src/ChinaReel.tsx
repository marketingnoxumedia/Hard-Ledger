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
// "The shortage" reel (ChinaReel) — Hard Ledger house VISUAL format, tech / semiconductor / geopolitics news topic.
// TOPIC: China ordered ~$70 BILLION of Nvidia AI chips but may receive only ~1% over the next four months. US export
// restrictions have blocked China's access to Nvidia's most powerful AI processors, so giants like Alibaba, Tencent and
// ByteDance are scrambling for alternatives. Per Bloomberg, Chinese firms ordered ~6 MILLION Nvidia RTX Pro 5500 chips
// at >$11,000 each, but expect only tens of thousands (~1% of orders). The shortage is also commercial: Nvidia favors
// higher-margin chips for customers like OpenAI and Anthropic. Local makers (Huawei, Cambricon) try to fill the gap.
// The twist: US curbs meant to slow China may instead push it to build its own chip industry faster.
// NOTE ON VOICE: built VERBATIM from a client-supplied script in the influencer "curiosity-gap" format (HOOK / CURIOSITY
// GAP / EARLY CTA / CONTEXT / EVIDENCE / ESCALATION / CONSEQUENCES / CONTROVERSY / AUDIENCE DEBATE), NOT the faceless
// house voice — it names Nvidia / Alibaba / Tencent / ByteDance / Huawei / Cambricon / OpenAI / Anthropic / Bloomberg,
// uses an EARLY "follow for more" CTA, and CLOSES on a "let me know in the comments" debate CTA. Per the saved house
// preference, captions are <=5-6 words/beat with LARGER on-screen type (Anton 42-52). 51 beats. 4 stat cards: $70 /
// BILLION; 6 / MILLION CHIPS; $11,000 / EACH; JUST / 1% / OF ORDERS (the script's hard figures). 1 red impact at the
// CONTROVERSY pivot ("Here's the bigger / problem." — the backfire thesis; reel closes on the comments-CTA media beat),
// no black beat. Captions match the VO verbatim (the inline "$70B", "1%", "four months", "RTX Pro 5500" read as spoken).
// Durations/reveals/SFX locked to the VO via a scribe_v1 word-timestamp anchor pass (public/china/voiceover.mp3). Built
// at the house +10% pacing default; its own tense, driving tech/geopolitics music mixed at 0.2. OWN distinct footage
// under public/china/ (50 stills), NO reuse of any other reel's clips — ledger-checked.
// FOOTAGE is strictly BRAND-FREE and GENERIC — because the reel names many real companies AND two nations (China, US),
// NONE of their assets appear: NO Nvidia / Alibaba / Tencent / ByteDance / Huawei / Cambricon / OpenAI / Anthropic /
// Bloomberg logo / wordmark / branded GPU or chip, NO identifiable executive or face, NO CHINESE OR US NATIONAL FLAG,
// NO identifiable landmark or government building (no Capitol / White House / Great Wall / Tiananmen / recognizable
// skyline), NO readable stock ticker / brand name / signage / screen text, NO identifiable currency notes, NO
// identifiable brand phone (blank screens only). Metaphor-led semiconductor / AI / trade b-roll only: unbranded silicon
// wafers and chip macros, circuit boards, server racks and data centers, a neural-network / AI abstract, a GPU-less
// cooling-fan / heatsink macro, shipping containers and cargo cranes and a conveyor for the supply chain, a barrier /
// locked gate / wall for the export curbs, an empty warehouse for the shortage, a factory clean-room for local makers,
// an abstract world-network and racing-light motif for the global AI race, gold / an abstract chart for the money, a
// blank-screen phone. **UNVERIFIED — states specific, checkable but evolving claims (the ~$70B orders; ~6M RTX Pro 5500
// chips at >$11,000; ~1% fill over four months; Nvidia's prioritization). Attributed to Bloomberg in the script.
// Rendered VERBATIM as supplied, but every figure and claim MUST be fact-checked against primary reporting before
// publishing — supply and policy change fast. This is general information, not investment advice.**
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 77, kind: 'hook', reveal: [3, 40], text: 'Chinese tech giants|have ordered around', kicker: 'The shortage', highlights: [], size: 48, media: {src: 'china/cn00_tech.jpg', type: 'img', effect: 'in'}},
  // 1 CARD
  {dur: 50, kind: 'stat', stat: {prefix: '$', value: 70, post: 'BILLION'}, media: {src: 'china/cn01_card70b.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 54, kind: 'text', reveal: [2], text: 'worth of Nvidia chips.', highlights: ['chips.'], size: 50, pos: 'upperRight', media: {src: 'china/cn02_chips.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 47, kind: 'text', reveal: [2], text: 'But here’s the shocking part:', highlights: ['shocking'], size: 46, pos: 'left', media: {src: 'china/cn03_shock.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 75, kind: 'text', reveal: [2], text: 'they may receive just 1%', highlights: ['1%'], size: 46, pos: 'lowerRight', media: {src: 'china/cn04_onepct.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 53, kind: 'text', reveal: [2], text: 'of what they requested', highlights: [], size: 50, pos: 'upperLeft', media: {src: 'china/cn05_requested.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 45, kind: 'text', reveal: [2], text: 'over the next four months.', highlights: ['four'], size: 46, pos: 'right', media: {src: 'china/cn06_months.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 45, kind: 'text', reveal: [2], text: 'So why are companies like', highlights: [], size: 46, pos: 'lower', media: {src: 'china/cn07_companies.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 80, kind: 'text', reveal: [2], text: 'Alibaba, Tencent, and ByteDance', highlights: [], size: 50, pos: 'upperLeft', media: {src: 'china/cn08_giants.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 76, kind: 'text', reveal: [2, 28], text: 'struggling to get|their hands on these chips,', highlights: ['struggling'], size: 44, pos: 'upperRight', media: {src: 'china/cn09_struggle.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 83, kind: 'text', reveal: [2, 28], text: 'even with billions of dollars|ready to spend?', highlights: ['billions'], size: 44, pos: 'lowerLeft', media: {src: 'china/cn10_billions.jpg', type: 'img', effect: 'in'}},
  // 11 FOLLOW
  {dur: 40, kind: 'text', reveal: [2], text: 'Follow for more updates', highlights: ['follow'], size: 50, pos: 'right', media: {src: 'china/cn11_followphone.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 85, kind: 'text', reveal: [2, 28], text: 'on the global AI race|and the companies driving it.', highlights: ['race'], size: 44, pos: 'left', media: {src: 'china/cn12_airace.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 47, kind: 'text', reveal: [2], text: 'China is desperately trying', highlights: ['desperately'], size: 50, pos: 'lowerRight', media: {src: 'china/cn13_china.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 88, kind: 'text', reveal: [2, 28], text: 'to expand its artificial|intelligence industry.', highlights: ['intelligence'], size: 44, pos: 'upper', media: {src: 'china/cn14_ai.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 51, kind: 'text', reveal: [2], text: 'But US export restrictions', highlights: ['restrictions'], size: 50, pos: 'left', media: {src: 'china/cn15_restrictions.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 48, kind: 'text', reveal: [2], text: 'have blocked access', highlights: ['blocked'], size: 52, pos: 'right', media: {src: 'china/cn16_blocked.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 85, kind: 'text', reveal: [2, 28], text: 'to Nvidia’s most powerful|AI processors,', highlights: ['powerful'], size: 44, pos: 'lowerLeft', media: {src: 'china/cn17_processors.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 85, kind: 'text', reveal: [2, 28], text: 'forcing Chinese companies|to look for alternatives.', highlights: ['alternatives.'], size: 44, pos: 'upperRight', media: {src: 'china/cn18_alternatives.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 31, kind: 'text', reveal: [2], text: 'According to Bloomberg,', highlights: [], size: 52, pos: 'left', media: {src: 'china/cn19_news.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 67, kind: 'text', reveal: [2, 28], text: 'Chinese companies have ordered|approximately', highlights: [], size: 48, pos: 'lowerRight', media: {src: 'china/cn20_ordered.jpg', type: 'img', effect: 'in'}},
  // 21 CARD
  {dur: 52, kind: 'stat', stat: {value: 6, post: 'MILLION CHIPS'}, media: {src: 'china/cn21_card6m.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 65, kind: 'text', reveal: [2], text: 'Nvidia RTX Pro 5500 chips,', highlights: [], size: 46, pos: 'upperLeft', media: {src: 'china/cn22_gpu.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 32, kind: 'text', reveal: [2], text: 'each costing more than', highlights: [], size: 50, pos: 'right', media: {src: 'china/cn23_costing.jpg', type: 'img', effect: 'in'}},
  // 24 CARD
  {dur: 46, kind: 'stat', stat: {prefix: '$', value: 11000, post: 'EACH'}, media: {src: 'china/cn24_card11k.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 47, kind: 'text', reveal: [2], text: 'But they expect to receive', highlights: [], size: 46, pos: 'lower', media: {src: 'china/cn25_receive.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 56, kind: 'text', reveal: [2], text: 'only tens of thousands', highlights: ['tens'], size: 50, pos: 'upperRight', media: {src: 'china/cn26_tens.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 40, kind: 'text', reveal: [2], text: 'over the next four months.', highlights: [], size: 46, pos: 'lowerLeft', media: {src: 'china/cn27_months2.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 29, kind: 'text', reveal: [2], text: 'That’s roughly', highlights: [], size: 52, pos: 'left', media: {src: 'china/cn28_roughly.jpg', type: 'img', effect: 'in'}},
  // 29 CARD
  {dur: 62, kind: 'stat', stat: {pre: 'JUST', value: 1, suffix: '%', post: 'OF ORDERS'}, media: {src: 'china/cn29_card1pct.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 91, kind: 'text', reveal: [2, 28], text: 'And the shortage isn’t just|about government restrictions.', highlights: ['shortage'], size: 44, pos: 'right', media: {src: 'china/cn30_govt.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 74, kind: 'text', reveal: [2], text: 'Nvidia is prioritizing production', highlights: ['prioritizing'], size: 50, pos: 'lowerRight', media: {src: 'china/cn31_production.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 35, kind: 'text', reveal: [2], text: 'of more advanced,', highlights: [], size: 52, pos: 'upperLeft', media: {src: 'china/cn32_advanced.jpg', type: 'img', effect: 'in'}},
  // 33
  {dur: 36, kind: 'text', reveal: [2], text: 'higher-margin chips', highlights: ['higher-margin'], size: 52, pos: 'right', media: {src: 'china/cn33_margin.jpg', type: 'img', effect: 'in'}},
  // 34
  {dur: 132, kind: 'text', reveal: [2, 28], text: 'for major AI customers|like OpenAI and Anthropic.', highlights: [], size: 44, pos: 'upperRight', media: {src: 'china/cn34_customers.jpg', type: 'img', effect: 'in'}},
  // 35
  {dur: 36, kind: 'text', reveal: [2], text: 'This could make it harder', highlights: ['harder'], size: 46, pos: 'left', media: {src: 'china/cn35_harder.jpg', type: 'img', effect: 'in'}},
  // 36
  {dur: 72, kind: 'text', reveal: [2, 28], text: 'for Chinese AI companies|to compete', highlights: ['compete'], size: 44, pos: 'lowerLeft', media: {src: 'china/cn36_compete.jpg', type: 'img', effect: 'in'}},
  // 37
  {dur: 57, kind: 'text', reveal: [2], text: 'with American technology leaders.', highlights: ['leaders.'], size: 50, pos: 'upper', media: {src: 'china/cn37_leaders.jpg', type: 'img', effect: 'in'}},
  // 38
  {dur: 55, kind: 'text', reveal: [2], text: 'Meanwhile, local manufacturers', highlights: [], size: 52, pos: 'right', media: {src: 'china/cn38_local.jpg', type: 'img', effect: 'in'}},
  // 39
  {dur: 61, kind: 'text', reveal: [2], text: 'like Huawei and Cambricon', highlights: [], size: 50, pos: 'lowerRight', media: {src: 'china/cn39_makers.jpg', type: 'img', effect: 'in'}},
  // 40
  {dur: 50, kind: 'text', reveal: [2], text: 'are trying to fill the gap.', highlights: ['gap.'], size: 42, pos: 'upperLeft', media: {src: 'china/cn40_gap.jpg', type: 'img', effect: 'in'}},
  // 41 RED
  {dur: 36, kind: 'impact', redBg: true, text: 'Here’s the bigger|problem.'},
  // 42
  {dur: 51, kind: 'text', reveal: [2], text: 'Washington wants to limit', highlights: [], size: 50, pos: 'left', media: {src: 'china/cn42_limit.jpg', type: 'img', effect: 'in'}},
  // 43
  {dur: 102, kind: 'text', reveal: [2, 28], text: 'China’s access to advanced|American technology,', highlights: ['access'], size: 44, pos: 'lowerRight', media: {src: 'china/cn43_access.jpg', type: 'img', effect: 'in'}},
  // 44
  {dur: 81, kind: 'text', reveal: [2, 28], text: 'but those restrictions|could also push', highlights: [], size: 44, pos: 'upperRight', media: {src: 'china/cn44_push.jpg', type: 'img', effect: 'in'}},
  // 45
  {dur: 105, kind: 'text', reveal: [2, 28], text: 'Chinese companies to develop|their own chip industry faster.', highlights: ['faster.'], size: 44, pos: 'right', media: {src: 'china/cn45_ownchips.jpg', type: 'img', effect: 'in'}},
  // 46
  {dur: 32, kind: 'text', reveal: [2], text: 'So what do you think?', highlights: [], size: 46, pos: 'lowerLeft', media: {src: 'china/cn46_think.jpg', type: 'img', effect: 'in'}},
  // 47
  {dur: 109, kind: 'text', reveal: [2, 28], text: 'Are US chip restrictions|slowing China’s AI ambitions,', highlights: ['slowing'], size: 44, pos: 'left', media: {src: 'china/cn47_slowing.jpg', type: 'img', effect: 'in'}},
  // 48
  {dur: 97, kind: 'text', reveal: [2, 28], text: 'or are they giving China|an even bigger reason', highlights: ['bigger'], size: 44, pos: 'upperRight', media: {src: 'china/cn48_reason.jpg', type: 'img', effect: 'in'}},
  // 49
  {dur: 76, kind: 'text', reveal: [2], text: 'to build its own technology?', highlights: ['technology?'], size: 46, pos: 'lower', media: {src: 'china/cn49_buildown.jpg', type: 'img', effect: 'in'}},
  // 50 CTA
  {dur: 40, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Let me know|in the comments.', highlights: ['comments'], size: 46, media: {src: 'china/cn50_commentsphone.jpg', type: 'img', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 77, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1312, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1461, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1679, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 2440, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 3129, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The shortage</span>
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
export const ChinaReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('china/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('china/music.mp3')}
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
