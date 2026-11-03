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
// "The light" reel (LightReel) — Hard Ledger house VISUAL format, AI / semiconductors / business-deal news topic.
// TOPIC: a $115B optical-networking acquisition for the AI buildout. Marvell Technology has agreed to acquire
// Lumentum in an all-stock deal valued at ~$115 billion (incl. debt); per Bloomberg, the two CEOs (Matt Murphy /
// Michael Hurlston) called Nvidia's Jensen Huang before announcing and he responded positively. Marvell holders ~67%
// of the combined company, Lumentum ~33%. Lumentum makes lasers / optical components; Marvell makes chips +
// connectivity; Nvidia already has ~$2B invested in each. Thesis: the next AI bottleneck is moving data BETWEEN
// chips — copper is hitting bandwidth/distance/power limits, so optical (light) interconnect becomes essential. The
// deal is big and risky (closes H1 2028, pending approvals; Marvell shares fell on the news). Debate: a stronger AI
// supply chain vs. an industry too dependent on a few giant deals.
// NOTE ON VOICE: built VERBATIM from a client-supplied script in the influencer "curiosity-gap" format (HOOK /
// CURIOSITY GAP / EARLY CTA / CONTEXT / EVIDENCE / ESCALATION / CONSEQUENCES / CONTROVERSY / AUDIENCE DEBATE), NOT
// the faceless house voice — it names real companies/people (Nvidia / Marvell / Lumentum / Bloomberg / Jensen Huang /
// Matt Murphy / Michael Hurlston), uses an EARLY "follow for more" CTA, and CLOSES on a "let us know in the comments"
// debate CTA. Per the saved house preference, captions are <=5-6 words/beat with LARGER on-screen type (Anton 40-52).
// 49 beats — TRIMMED to ~1:54 at the client's request from the original 88-beat / 3:25 cut: seven whole sentences
// were cut at clean sentence boundaries (the formal deal restatement; the Bloomberg phone-call recounting with the
// CEO names; the Nvidia $2B-in-each stakes; the "what each company makes" detail; the combining-expertise / next-gen
// elaboration; the merger-position/ecosystem line; and the detailed investor-reaction beats), so every kept beat
// retains its exact original VO timing. 2 stat cards: TO A / $115B / DEAL, and MARVELL SHAREHOLDERS / 67% / OF THE
// COMBINED CO. (the hero figures). 1 red impact mid-tail ("Here's why / this matters." — the ESCALATION hinge; reel
// closes on the comments-CTA media beat), no black beat. Captions match the VO verbatim — the two hero figures are
// stat cards; the one remaining inline finance figure (2028) is a clean inline numeral per the finance-caption
// convention. Durations/reveals/SFX locked to the VO via a scribe_v1 word-timestamp anchor pass
// (public/light/voiceover.mp3), re-spliced for the trim. Built at the house +10% pacing default; its own tense,
// driving tech/finance music bed (3:25 bed covers the trimmed reel via the fade envelope). OWN distinct footage under
// public/light/ (48 stills used in the trimmed cut, drawn from the 87 sourced), NO reuse of any other reel's clips — ledger-checked.
// FOOTAGE is strictly BRAND-FREE and GENERIC — because the reel names real companies and executives, NONE of their
// assets appear: NO Nvidia / Marvell / Lumentum / Bloomberg logos, products, chips, or branding, NO identifiable
// faces (no Huang / Murphy / Hurlston), NO readable tickers / stock charts / headlines / screens / wordmarks, NO
// national flags, NO currency. Metaphor-led tech/AI b-roll only: generic data-center aisles and server racks, glowing
// fiber-optic strands and light through fibre, abstract circuit-board / chip macros (no brand), network cabling,
// lasers and beams, cool blue data-hall light, abstract market/arrow motifs (no tickers), a handshake for the deal.
// **UNVERIFIED — this reel reports a specific, recent corporate transaction and named quotes/figures (the ~$115B
// all-stock value; the 67/33 ownership split; the Bloomberg-sourced Huang phone call and his positive response;
// Nvidia's ~$2B-in-each stakes; the H1-2028 close; the share-price drop). Unlike a fabricated topic this is a real,
// checkable story, but it is rendered VERBATIM as supplied and every figure, name, date and quote MUST still be
// fact-checked against primary sources (the companies' releases / Bloomberg) before publishing.**
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 39, kind: 'hook', reveal: [3, 40], text: 'Nvidia’s Jensen Huang', kicker: 'The light', highlights: ['huang'], size: 56, media: {src: 'light/lt00_nvidia.jpg', type: 'img', effect: 'in'}},
  // 1
  {dur: 37, kind: 'text', reveal: [2], text: 'just gave his blessing', highlights: ['blessing'], size: 50, pos: 'upperRight', media: {src: 'light/lt01_blessing.jpg', type: 'img', effect: 'in'}},
  // 2 CARD
  {dur: 89, kind: 'stat', stat: {pre: 'TO A', prefix: '$', value: 115, suffix: 'B', post: 'DEAL'}, media: {src: 'light/lt02_card115.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 80, kind: 'text', reveal: [2, 28], text: 'that could reshape|the AI chip industry.', highlights: ['chip'], size: 42, pos: 'left', media: {src: 'light/lt03_reshape.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 71, kind: 'text', reveal: [2, 28], text: 'And this isn’t about|buying more GPUs.', highlights: ['gpus'], size: 42, pos: 'lowerRight', media: {src: 'light/lt04_gpus.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 36, kind: 'text', reveal: [2], text: 'It’s about something', highlights: [], size: 52, pos: 'upperLeft', media: {src: 'light/lt05_something.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 91, kind: 'text', reveal: [2, 28], text: 'AI data centers|desperately need:', highlights: [], size: 48, pos: 'right', media: {src: 'light/lt06_need.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 22, kind: 'text', reveal: [2], text: 'light.', highlights: ['light'], size: 52, pos: 'lower', media: {src: 'light/lt07_light.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 65, kind: 'text', reveal: [2, 28], text: 'Marvell is|acquiring Lumentum,', highlights: ['lumentum'], size: 50, pos: 'upperLeft', media: {src: 'light/lt08_acquiring.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'a company that makes|optical technology', highlights: ['optical'], size: 44, pos: 'upperRight', media: {src: 'light/lt09_optical.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 86, kind: 'text', reveal: [2, 28], text: 'used to move data|at incredible speeds.', highlights: ['incredible'], size: 42, pos: 'lowerLeft', media: {src: 'light/lt10_speeds.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 87, kind: 'text', reveal: [2, 28], text: 'But why would|Nvidia’s CEO care', highlights: [], size: 44, pos: 'right', media: {src: 'light/lt11_care.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 96, kind: 'text', reveal: [2, 28], text: 'so much about a deal|between two other companies?', highlights: ['companies?'], size: 42, pos: 'left', media: {src: 'light/lt12_companies.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 58, kind: 'text', reveal: [2, 28], text: 'Because the next|AI bottleneck', highlights: ['bottleneck'], size: 48, pos: 'lowerRight', media: {src: 'light/lt13_bottleneck.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 57, kind: 'text', reveal: [2, 28], text: 'may not be|computing power.', highlights: ['computing'], size: 48, pos: 'upper', media: {src: 'light/lt14_computing.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 61, kind: 'text', reveal: [2, 28], text: 'It may be getting|all those chips', highlights: [], size: 42, pos: 'left', media: {src: 'light/lt15_chips.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 42, kind: 'text', reveal: [2, 28], text: 'to communicate|with each other.', highlights: ['communicate'], size: 48, pos: 'right', media: {src: 'light/lt16_communicate.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 42, kind: 'text', reveal: [2], text: 'Follow for more AI,', highlights: ['follow'], size: 50, media: {src: 'light/lt17_follow.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 61, kind: 'text', reveal: [2, 28], text: 'technology, and|business stories', highlights: [], size: 50, pos: 'lowerLeft', media: {src: 'light/lt18_business.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 44, kind: 'text', reveal: [2], text: 'shaping the future.', highlights: ['future'], size: 52, pos: 'upperRight', media: {src: 'light/lt19_future.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 91, kind: 'text', reveal: [2, 28], text: 'Marvell shareholders|are expected to own', highlights: [], size: 44, pos: 'left', media: {src: 'light/lt29_own.jpg', type: 'img', effect: 'in'}},
  // 31 CARD
  {dur: 51, kind: 'stat', stat: {pre: 'MARVELL SHAREHOLDERS', value: 67, suffix: '%', post: 'OF THE COMBINED CO.'}, media: {src: 'light/lt30_card67.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 126, kind: 'text', reveal: [2, 28], text: 'while Lumentum shareholders|would hold roughly 33 percent.', highlights: [], size: 42, pos: 'lowerRight', media: {src: 'light/lt31_33.jpg', type: 'img', effect: 'in'}},
  // 42 RED
  {dur: 38, kind: 'impact', redBg: true, text: 'Here’s why|this matters.'},
  // 45
  {dur: 56, kind: 'text', reveal: [2, 28], text: 'Copper cables|are increasingly', highlights: ['copper'], size: 50, pos: 'upperLeft', media: {src: 'light/lt44_copper.jpg', type: 'img', effect: 'in'}},
  // 46
  {dur: 35, kind: 'text', reveal: [2], text: 'running into limits', highlights: ['limits'], size: 52, pos: 'right', media: {src: 'light/lt45_limits.jpg', type: 'img', effect: 'in'}},
  // 47
  {dur: 96, kind: 'text', reveal: [2, 28], text: 'around bandwidth, distance,|and power consumption.', highlights: ['power'], size: 44, pos: 'lower', media: {src: 'light/lt46_power.jpg', type: 'img', effect: 'in'}},
  // 48
  {dur: 50, kind: 'text', reveal: [2, 28], text: 'Optical connections|use light', highlights: ['light'], size: 50, pos: 'upperRight', media: {src: 'light/lt47_light2.jpg', type: 'img', effect: 'in'}},
  // 49
  {dur: 50, kind: 'text', reveal: [2, 28], text: 'instead of|electrical signals', highlights: [], size: 50, pos: 'lowerLeft', media: {src: 'light/lt48_signals.jpg', type: 'img', effect: 'in'}},
  // 50
  {dur: 89, kind: 'text', reveal: [2, 28], text: 'to move data faster|and more efficiently.', highlights: ['faster'], size: 42, pos: 'left', media: {src: 'light/lt49_faster.jpg', type: 'img', effect: 'in'}},
  // 61
  {dur: 100, kind: 'text', reveal: [2, 28], text: 'But the deal is also|massive and risky.', highlights: ['risky'], size: 42, pos: 'right', media: {src: 'light/lt60_risky.jpg', type: 'img', effect: 'in'}},
  // 62
  {dur: 107, kind: 'text', reveal: [2, 28], text: 'It is expected to close|in the first half of 2028,', highlights: ['2028'], size: 42, pos: 'lowerRight', media: {src: 'light/lt61_2028.jpg', type: 'img', effect: 'in'}},
  // 63
  {dur: 92, kind: 'text', reveal: [2, 28], text: 'subject to shareholder|and regulatory approval.', highlights: ['regulatory'], size: 44, pos: 'upperLeft', media: {src: 'light/lt62_approval.jpg', type: 'img', effect: 'in'}},
  // 72
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'And this raises|a bigger question:', highlights: [], size: 44, pos: 'right', media: {src: 'light/lt71_question.jpg', type: 'img', effect: 'in'}},
  // 73
  {dur: 108, kind: 'text', reveal: [2, 28], text: 'is Nvidia helping build|a stronger AI supply chain,', highlights: ['supply'], size: 42, pos: 'upperRight', media: {src: 'light/lt72_supplychain.jpg', type: 'img', effect: 'in'}},
  // 74
  {dur: 89, kind: 'text', reveal: [2, 28], text: 'or is the industry|becoming too dependent', highlights: ['dependent'], size: 42, pos: 'left', media: {src: 'light/lt73_dependent.jpg', type: 'img', effect: 'in'}},
  // 75
  {dur: 73, kind: 'text', reveal: [2, 28], text: 'on a handful|of enormous deals?', highlights: ['enormous'], size: 44, pos: 'lowerLeft', media: {src: 'light/lt74_enormous.jpg', type: 'img', effect: 'in'}},
  // 76
  {dur: 71, kind: 'text', reveal: [2, 28], text: 'The AI boom is|no longer just about', highlights: [], size: 42, pos: 'upper', media: {src: 'light/lt75_boom.jpg', type: 'img', effect: 'in'}},
  // 77
  {dur: 65, kind: 'text', reveal: [2, 28], text: 'who makes the|fastest processor.', highlights: ['fastest'], size: 48, pos: 'right', media: {src: 'light/lt76_fastest.jpg', type: 'img', effect: 'in'}},
  // 78
  {dur: 54, kind: 'text', reveal: [2, 28], text: 'It’s also about|who controls', highlights: ['controls'], size: 48, pos: 'lowerRight', media: {src: 'light/lt77_controls.jpg', type: 'img', effect: 'in'}},
  // 79
  {dur: 100, kind: 'text', reveal: [2, 28], text: 'the networks, optics,|power, and infrastructure', highlights: ['optics'], size: 44, pos: 'upperLeft', media: {src: 'light/lt78_optics.jpg', type: 'img', effect: 'in'}},
  // 80
  {dur: 51, kind: 'text', reveal: [2, 28], text: 'that connect|the entire system.', highlights: ['system'], size: 48, pos: 'left', media: {src: 'light/lt79_system.jpg', type: 'img', effect: 'in'}},
  // 81
  {dur: 36, kind: 'text', reveal: [2], text: 'So what do you think?', highlights: [], size: 46, pos: 'lowerRight', media: {src: 'light/lt80_think.jpg', type: 'img', effect: 'in'}},
  // 82
  {dur: 132, kind: 'text', reveal: [2, 28], text: 'Is Marvell’s $115 billion|acquisition of Lumentum', highlights: [], size: 42, pos: 'upperRight', media: {src: 'light/lt81_acq.jpg', type: 'img', effect: 'in'}},
  // 83
  {dur: 88, kind: 'text', reveal: [2, 28], text: 'a smart bet|on the future of AI,', highlights: ['smart'], size: 42, pos: 'right', media: {src: 'light/lt82_smart.jpg', type: 'img', effect: 'in'}},
  // 84
  {dur: 100, kind: 'text', reveal: [2, 28], text: 'or is the industry|spending too much, too fast?', highlights: ['fast?'], size: 42, pos: 'lowerLeft', media: {src: 'light/lt83_toofast.jpg', type: 'img', effect: 'in'}},
  // 85
  {dur: 52, kind: 'text', reveal: [2, 28], text: 'And do you think|optical connections', highlights: ['optical'], size: 44, pos: 'left', media: {src: 'light/lt84_opticalconn.jpg', type: 'img', effect: 'in'}},
  // 86
  {dur: 93, kind: 'text', reveal: [2, 28], text: 'will become just as important|as AI chips themselves?', highlights: ['chips'], size: 42, pos: 'upperRight', media: {src: 'light/lt85_asimportant.jpg', type: 'img', effect: 'in'}},
  // 87 CTA
  {dur: 39, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Let us know|in the comments.', highlights: ['comments'], size: 46, media: {src: 'light/lt86_comments.jpg', type: 'img', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 76, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1087, src: 'media/sfx_whoosh.mp3', vol: 0.33},
  {at: 1325, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1502, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 3397, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The light</span>
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
export const LightReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('light/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('light/music.mp3')}
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
