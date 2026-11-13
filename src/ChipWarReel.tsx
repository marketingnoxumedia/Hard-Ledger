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
// "The chip war" reel (ChipWarReel) — fast NEWS reel, Hard Ledger house VISUAL format, technology / AI / chips topic.
// TOPIC: GOOGLE is escalating its AI-chip war against NVIDIA. Nvidia has dominated AI chips for years, but Google is
// making a serious move: not just faster chips, but specialized processors — its TENSOR PROCESSING UNITS (TPUs), developed
// in-house for over a decade and now a major commercial business. On November 9 Google introduced two configurations: the
// TPU 8tx (secure/confidential computing) and the 8i Max (very long-context AI) — aimed at government, finance and
// advanced-AI builders. Bigger ambition: Google is reportedly approaching companies like META about installing TPUs
// directly in their own data centers, not just via Google Cloud — which could take business from Nvidia and give AI firms
// another option. But Nvidia's moat is its CUDA software ecosystem, used by millions of developers; switching
// infrastructure won't happen overnight. Debate: can Google's custom chips seriously challenge Nvidia, or is the software
// advantage too strong?
// NOTE ON VOICE: built VERBATIM from a client-supplied script in the influencer "curiosity-gap" format (HOOK / CURIOSITY
// GAP / EARLY CTA / CONTEXT / EVIDENCE / ESCALATION / CONSEQUENCES / CONTROVERSY / AUDIENCE DEBATE), NOT the faceless
// house voice — it names Nvidia / Google / Meta / TPUs / CUDA / Google Cloud, uses an EARLY "follow for more" CTA, and
// CLOSES on a "let me know in the comments" debate CTA. Per the saved house preference, captions are <=5-6 words/beat with
// LARGER on-screen type (Anton 42-52). 58 beats. NO stat cards (the script states no hard figures; none invented). 1 red
// impact at the CONTROVERSY pivot ("The CUDA / moat." — Nvidia's software advantage; reel closes on the comments-CTA
// media beat), no black beat. Captions match the VO verbatim. Durations/reveals/SFX locked to the VO via a scribe_v1
// word-timestamp anchor pass (public/chipwar/voiceover.mp3). Built at the house +10% pacing default; its own tense
// tech/AI music mixed at 0.2. OWN distinct footage under public/chipwar/ (57 stills), NO reuse of any other reel's clips
// — ledger-checked.
// FOOTAGE is strictly BRAND-FREE — because the reel names real companies, NONE of their assets appear: NO Nvidia / Google
// / Meta logo, wordmark, GPU or product, NO Google Cloud or CUDA branding, NO readable brand / sign / screen text, NO
// identifiable campus or logo on a datacenter. Metaphor-led chip / AI / datacenter b-roll only: generic unbranded
// microchip and processor and wafer macros, circuit boards and silicon, server racks and datacenter aisles and cabling,
// an AI / neural-network glow, two chess kings or a tug-of-war for the Nvidia-vs-Google rivalry, a crown / throne for
// dominance, a racetrack for the AI race, a vault / shield / padlock for secure & confidential computing, a long ribbon /
// data stream for long-context, a globe for the market, an interlocking-bricks / Lego-wall motif for the CUDA software
// moat / switching cost, a handshake for the Meta approach, blank-screen phones for the FOLLOW and comments CTAs.
// **UNVERIFIED — states specific, checkable, fast-moving claims (Google's Nov 9 TPU 8tx and 8i Max configurations and
// their capabilities; the reported Meta approach; the decade-plus TPU history; the CUDA developer base). Rendered VERBATIM
// as supplied, but every product name, figure and claim MUST be fact-checked against primary reporting before publishing —
// chip roadmaps and launch details change fast, and the specific 8tx / 8i Max names could not be verified at build time.
// This is general information, not investment advice.**
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 55, kind: 'hook', reveal: [3, 40], text: 'Nvidia has dominated', kicker: 'The chip war', highlights: ['dominated'], size: 56, media: {src: 'chipwar/cw00_dominated.jpg', type: 'img', effect: 'in'}},
  // 1
  {dur: 68, kind: 'text', reveal: [2, 28], text: 'the AI chip market|for years.', highlights: ['years.'], size: 44, pos: 'upperRight', media: {src: 'chipwar/cw01_market.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 32, kind: 'text', reveal: [2], text: 'But Google is making', highlights: ['Google'], size: 50, pos: 'left', media: {src: 'chipwar/cw02_google.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 85, kind: 'text', reveal: [2, 28], text: 'a serious move|to challenge that dominance,', highlights: ['challenge'], size: 44, pos: 'lowerRight', media: {src: 'chipwar/cw03_challenge.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 83, kind: 'text', reveal: [2, 28], text: 'and it could change|who controls the future', highlights: [], size: 44, pos: 'upperLeft', media: {src: 'chipwar/cw04_future.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 51, kind: 'text', reveal: [2], text: 'of artificial intelligence.', highlights: ['intelligence.'], size: 52, pos: 'right', media: {src: 'chipwar/cw05_ai.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 36, kind: 'text', reveal: [2, 28], text: 'Here’s the|interesting part:', highlights: [], size: 50, pos: 'lower', media: {src: 'chipwar/cw06_interesting.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 92, kind: 'text', reveal: [2, 28], text: 'Google isn’t just|building faster chips.', highlights: ['faster'], size: 44, pos: 'lowerLeft', media: {src: 'chipwar/cw07_faster.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 75, kind: 'text', reveal: [2, 28], text: 'It’s creating|specialized processors', highlights: ['specialized'], size: 50, pos: 'upperRight', media: {src: 'chipwar/cw08_processors.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 66, kind: 'text', reveal: [2], text: 'designed to take on Nvidia', highlights: ['Nvidia'], size: 46, pos: 'left', media: {src: 'chipwar/cw09_takeon.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 76, kind: 'text', reveal: [2, 28], text: 'in different areas|of AI computing.', highlights: [], size: 44, pos: 'right', media: {src: 'chipwar/cw10_computing.jpg', type: 'img', effect: 'in'}},
  // 11 FOLLOW
  {dur: 36, kind: 'text', reveal: [2], text: 'Follow for|more updates', highlights: ['follow'], size: 50, pos: 'upperLeft', media: {src: 'chipwar/cw11_follow.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 48, kind: 'text', reveal: [2, 28], text: 'on the technology|and companies', highlights: [], size: 48, pos: 'lowerRight', media: {src: 'chipwar/cw12_tech.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 52, kind: 'text', reveal: [2], text: 'driving the AI race.', highlights: ['race.'], size: 50, pos: 'upper', media: {src: 'chipwar/cw13_race.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 62, kind: 'text', reveal: [2, 28], text: 'Google has spent|more than a decade', highlights: ['decade'], size: 44, pos: 'left', media: {src: 'chipwar/cw14_decade.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 74, kind: 'text', reveal: [2, 28], text: 'developing its own|AI processors,', highlights: [], size: 48, pos: 'right', media: {src: 'chipwar/cw15_developing.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 69, kind: 'text', reveal: [2, 28], text: 'known as Tensor|Processing Units,', highlights: ['Tensor'], size: 48, pos: 'lowerLeft', media: {src: 'chipwar/cw16_tensor.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 32, kind: 'text', reveal: [2], text: 'or TPUs.', highlights: ['TPUs.'], size: 52, pos: 'upperRight', media: {src: 'chipwar/cw17_tpus.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 82, kind: 'text', reveal: [2, 28], text: 'Originally designed for|Google’s internal services,', highlights: [], size: 44, pos: 'left', media: {src: 'chipwar/cw18_internal.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 45, kind: 'text', reveal: [2, 28], text: 'these chips are|now becoming', highlights: [], size: 48, pos: 'lowerRight', media: {src: 'chipwar/cw19_becoming.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 59, kind: 'text', reveal: [2, 28], text: 'a major|commercial business.', highlights: ['commercial'], size: 50, pos: 'upperLeft', media: {src: 'chipwar/cw20_commercial.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 31, kind: 'text', reveal: [2], text: 'On November 9,', highlights: ['November'], size: 52, pos: 'right', media: {src: 'chipwar/cw21_nov9.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 86, kind: 'text', reveal: [2, 28], text: 'Google introduced two|specialized configurations:', highlights: ['two'], size: 48, pos: 'lower', media: {src: 'chipwar/cw22_two.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 52, kind: 'text', reveal: [2], text: 'the TPU 8tx,', highlights: ['8tx,'], size: 52, pos: 'upperRight', media: {src: 'chipwar/cw23_8tx.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 99, kind: 'text', reveal: [2, 28], text: 'designed for secure|and confidential computing,', highlights: ['confidential'], size: 44, pos: 'lowerLeft', media: {src: 'chipwar/cw24_confidential.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 50, kind: 'text', reveal: [2], text: 'and the 8i Max,', highlights: ['8i'], size: 50, pos: 'left', media: {src: 'chipwar/cw25_8imax.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 51, kind: 'text', reveal: [2], text: 'built for AI applications', highlights: [], size: 50, pos: 'right', media: {src: 'chipwar/cw26_applications.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 42, kind: 'text', reveal: [2], text: 'that need to process', highlights: [], size: 50, pos: 'lowerRight', media: {src: 'chipwar/cw27_process.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 62, kind: 'text', reveal: [2, 28], text: 'much longer amounts|of information.', highlights: ['longer'], size: 48, pos: 'upperLeft', media: {src: 'chipwar/cw28_longer.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 47, kind: 'text', reveal: [2, 28], text: 'These capabilities|could attract', highlights: ['attract'], size: 50, pos: 'right', media: {src: 'chipwar/cw29_attract.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 29, kind: 'text', reveal: [2], text: 'government agencies,', highlights: ['government'], size: 52, pos: 'upperRight', media: {src: 'chipwar/cw30_government.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 39, kind: 'text', reveal: [2], text: 'financial institutions,', highlights: ['financial'], size: 52, pos: 'left', media: {src: 'chipwar/cw31_financial.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 88, kind: 'text', reveal: [2, 28], text: 'and companies developing|advanced AI systems.', highlights: [], size: 44, pos: 'lowerLeft', media: {src: 'chipwar/cw32_advanced.jpg', type: 'img', effect: 'in'}},
  // 33
  {dur: 64, kind: 'text', reveal: [2, 28], text: 'But Google has an|even bigger ambition.', highlights: ['ambition.'], size: 44, pos: 'upper', media: {src: 'chipwar/cw33_ambition.jpg', type: 'img', effect: 'in'}},
  // 34
  {dur: 51, kind: 'text', reveal: [2], text: 'It is reportedly approaching', highlights: ['reportedly'], size: 50, pos: 'right', media: {src: 'chipwar/cw34_approaching.jpg', type: 'img', effect: 'in'}},
  // 35
  {dur: 37, kind: 'text', reveal: [2], text: 'companies like Meta', highlights: ['Meta'], size: 52, pos: 'lowerRight', media: {src: 'chipwar/cw35_meta.jpg', type: 'img', effect: 'in'}},
  // 36
  {dur: 61, kind: 'text', reveal: [2], text: 'about installing its TPUs', highlights: [], size: 50, pos: 'upperLeft', media: {src: 'chipwar/cw36_installing.jpg', type: 'img', effect: 'in'}},
  // 37
  {dur: 83, kind: 'text', reveal: [2, 28], text: 'directly inside|their own data centers,', highlights: [], size: 44, pos: 'left', media: {src: 'chipwar/cw37_datacenters.jpg', type: 'img', effect: 'in'}},
  // 38
  {dur: 62, kind: 'text', reveal: [2], text: 'rather than forcing customers', highlights: [], size: 50, pos: 'lowerRight', media: {src: 'chipwar/cw38_forcing.jpg', type: 'img', effect: 'in'}},
  // 39
  {dur: 45, kind: 'text', reveal: [2], text: 'to use Google Cloud.', highlights: ['Cloud.'], size: 50, pos: 'upperRight', media: {src: 'chipwar/cw39_cloud.jpg', type: 'img', effect: 'in'}},
  // 40
  {dur: 53, kind: 'text', reveal: [2], text: 'If successful, Google could', highlights: [], size: 50, pos: 'right', media: {src: 'chipwar/cw40_successful.jpg', type: 'img', effect: 'in'}},
  // 41
  {dur: 53, kind: 'text', reveal: [2, 28], text: 'take business|away from Nvidia', highlights: [], size: 48, pos: 'lowerLeft', media: {src: 'chipwar/cw41_takebiz.jpg', type: 'img', effect: 'in'}},
  // 42
  {dur: 43, kind: 'text', reveal: [2], text: 'while giving AI companies', highlights: [], size: 50, pos: 'left', media: {src: 'chipwar/cw42_giving.jpg', type: 'img', effect: 'in'}},
  // 43
  {dur: 35, kind: 'text', reveal: [2], text: 'another option for', highlights: ['option'], size: 52, pos: 'upperRight', media: {src: 'chipwar/cw43_option.jpg', type: 'img', effect: 'in'}},
  // 44
  {dur: 54, kind: 'text', reveal: [2, 28], text: 'training and|running their models.', highlights: [], size: 48, pos: 'lower', media: {src: 'chipwar/cw44_training.jpg', type: 'img', effect: 'in'}},
  // 45
  {dur: 58, kind: 'text', reveal: [2], text: 'However, Nvidia still has', highlights: [], size: 50, pos: 'right', media: {src: 'chipwar/cw45_however.jpg', type: 'img', effect: 'in'}},
  // 46
  {dur: 42, kind: 'text', reveal: [2], text: 'a major advantage:', highlights: ['advantage:'], size: 52, pos: 'upperLeft', media: {src: 'chipwar/cw46_advantage.jpg', type: 'img', effect: 'in'}},
  // 47 RED
  {dur: 62, kind: 'impact', redBg: true, text: 'The CUDA|moat.'},
  // 48
  {dur: 86, kind: 'text', reveal: [2, 28], text: 'which millions of developers|already use.', highlights: ['millions'], size: 44, pos: 'lowerRight', media: {src: 'chipwar/cw48_millions.jpg', type: 'img', effect: 'in'}},
  // 49
  {dur: 73, kind: 'text', reveal: [2, 28], text: 'Google’s chips may|offer alternatives,', highlights: ['alternatives,'], size: 48, pos: 'left', media: {src: 'chipwar/cw49_alternatives.jpg', type: 'img', effect: 'in'}},
  // 50
  {dur: 56, kind: 'text', reveal: [2, 28], text: 'but convincing companies|to switch', highlights: ['switch'], size: 48, pos: 'upperRight', media: {src: 'chipwar/cw50_switch.jpg', type: 'img', effect: 'in'}},
  // 51
  {dur: 92, kind: 'text', reveal: [2, 28], text: 'their infrastructure|won’t happen overnight.', highlights: ['overnight.'], size: 48, pos: 'right', media: {src: 'chipwar/cw51_overnight.jpg', type: 'img', effect: 'in'}},
  // 52
  {dur: 26, kind: 'text', reveal: [2], text: 'So what do you think?', highlights: [], size: 46, pos: 'lowerLeft', media: {src: 'chipwar/cw52_think.jpg', type: 'img', effect: 'in'}},
  // 53
  {dur: 53, kind: 'text', reveal: [2, 28], text: 'Can Google’s custom|AI chips', highlights: [], size: 48, pos: 'upperLeft', media: {src: 'chipwar/cw53_custom.jpg', type: 'img', effect: 'in'}},
  // 54
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'seriously challenge|Nvidia’s dominance,', highlights: ['challenge'], size: 50, pos: 'right', media: {src: 'chipwar/cw54_challenge2.jpg', type: 'img', effect: 'in'}},
  // 55
  {dur: 62, kind: 'text', reveal: [2, 28], text: 'or is Nvidia’s|software advantage', highlights: ['software'], size: 48, pos: 'left', media: {src: 'chipwar/cw55_software.jpg', type: 'img', effect: 'in'}},
  // 56
  {dur: 50, kind: 'text', reveal: [2], text: 'too strong to overcome?', highlights: ['overcome?'], size: 50, pos: 'lowerRight', media: {src: 'chipwar/cw56_overcome.jpg', type: 'img', effect: 'in'}},
  // 57 CTA
  {dur: 38, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Let me know|in the comments.', highlights: ['comments'], size: 46, media: {src: 'chipwar/cw57_comments.jpg', type: 'img', effect: 'in'}},
];


type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 2695, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 3325, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The chip war</span>
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
export const ChipWarReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('chipwar/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('chipwar/music.mp3')}
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
