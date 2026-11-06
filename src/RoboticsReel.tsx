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
// "The block" reel (RoboticsReel) — Hard Ledger house VISUAL format, tech / robotics / geopolitics news topic.
// TOPIC: China BLOCKED SoftBank's $5.4 BILLION takeover of ABB's robotics business. SoftBank (CEO Masayoshi Son) agreed
// in Oct 2025 to buy ABB's robotics division to expand into "physical AI" (AI controlling real-world machines/robots).
// But China is ~30% of ABB's robotics business, and Chinese regulators feared robotics DATA, manufacturing know-how and
// IP could move overseas — a concern sharpened by the risk that data from these robots could be used to train AI models,
// including OpenAI's (a major SoftBank investment). The block threatens SoftBank's plan to fuse robotics hardware with AI
// software. Framed as national security + tech competition: China protecting home-grown tech vs. foreign investors
// wanting access to a huge robotics market. Debate: protection, or geopolitics killing deals?
// NOTE ON VOICE: built VERBATIM from a client-supplied script in the influencer "curiosity-gap" format (HOOK / CURIOSITY
// GAP / EARLY CTA / CONTEXT / EVIDENCE / ESCALATION / CONSEQUENCES / CONTROVERSY / AUDIENCE DEBATE), NOT the faceless
// house voice — it names SoftBank / ABB / OpenAI / Masayoshi Son, uses an EARLY "follow for more" CTA, and CLOSES on a
// "let me know in the comments" debate CTA. Per the saved house preference, captions are <=5-6 words/beat with LARGER
// on-screen type (Anton 42-52). 50 beats. 2 stat cards: $5.4 / BILLION; 30% (China share of ABB robotics) — the
// script's hard figures. 1 red impact at the CONTROVERSY pivot ("National / security." — the real reason; reel closes on
// the comments-CTA media beat), no black beat. Captions match the VO verbatim (the inline "October 2025" reads as
// spoken). Durations/reveals/SFX locked to the VO via a scribe_v1 word-timestamp anchor pass (public/robotics/
// voiceover.mp3). Built at the house +10% pacing default; its own tense, driving tech/geopolitics music mixed at 0.2.
// OWN distinct footage under public/robotics/ (49 stills), NO reuse of any other reel's clips — ledger-checked.
// FOOTAGE is strictly BRAND-FREE and GENERIC — because the reel names real companies AND nations (China, Japan,
// Switzerland), NONE of their assets appear: NO SoftBank / ABB / OpenAI logo / wordmark, NO ABB-branded (orange)
// industrial robot or any branded robot/product, NO Masayoshi Son or any identifiable face, NO CHINESE / JAPANESE /
// SWISS national flag, NO identifiable landmark or government building, NO readable brand name / sign / screen text, NO
// identifiable currency notes, NO brand phone (blank screens only). Metaphor-led robotics / AI / trade b-roll only:
// generic unbranded industrial robot arms and automation lines, a humanoid / android robot, a robot hand, circuit
// boards and servers and a data-center, a glowing AI / neural-network abstract, abstract data streams and a world
// network for the "global AI race", a barrier / locked gate / a broken or halted handshake for the blocked deal, a
// shield / padlock / border wall for national security and protecting data, a gavel / regulator motif, a factory floor,
// a blank-screen phone. **UNVERIFIED — states specific, checkable but evolving claims (the $5.4B deal and its Oct 2025
// signing; ~30% China share; the regulators' data/IP concerns; the OpenAI-training angle). Rendered VERBATIM as
// supplied, but every figure and claim MUST be fact-checked against primary reporting before publishing — deals and
// regulatory decisions change. This is general information, not investment advice.**
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 72, kind: 'hook', reveal: [3, 40], text: 'China just blocked|SoftBank’s takeover', kicker: 'The block', highlights: [], size: 52, media: {src: 'robotics/rb00_block.jpg', type: 'img', effect: 'in'}},
  // 1 CARD
  {dur: 70, kind: 'stat', stat: {prefix: '$', value: 5.4, decimals: 1, post: 'BILLION'}, media: {src: 'robotics/rb01_card54b.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 81, kind: 'text', reveal: [2, 28], text: 'of ABB’s robotics|business in China.', highlights: ['robotics'], size: 44, pos: 'upperRight', media: {src: 'robotics/rb02_robotics.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 50, kind: 'text', reveal: [2, 28], text: 'And this could be|a major setback', highlights: ['setback'], size: 44, pos: 'left', media: {src: 'robotics/rb03_setback.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 100, kind: 'text', reveal: [2, 28], text: 'for one of the biggest|AI ambitions in the world.', highlights: ['ambitions'], size: 44, pos: 'lowerRight', media: {src: 'robotics/rb04_ambitions.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 48, kind: 'text', reveal: [2, 28], text: 'But why would China|stop a deal', highlights: [], size: 44, pos: 'upperLeft', media: {src: 'robotics/rb05_stop.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 60, kind: 'text', reveal: [2], text: 'involving a Japanese investor', highlights: [], size: 50, pos: 'right', media: {src: 'robotics/rb06_investor.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 61, kind: 'text', reveal: [2], text: 'and a Swiss robotics company?', highlights: ['Swiss'], size: 46, pos: 'lower', media: {src: 'robotics/rb07_swiss.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 78, kind: 'text', reveal: [2, 28], text: 'The answer involves something|more valuable than robots:', highlights: ['valuable'], size: 44, pos: 'upperLeft', media: {src: 'robotics/rb08_valuable.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 39, kind: 'text', reveal: [2], text: 'data and technology.', highlights: ['data'], size: 52, pos: 'upperRight', media: {src: 'robotics/rb09_data.jpg', type: 'img', effect: 'in'}},
  // 10 FOLLOW
  {dur: 43, kind: 'text', reveal: [2], text: 'Follow for more updates', highlights: ['follow'], size: 50, pos: 'lowerLeft', media: {src: 'robotics/rb10_follow.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 50, kind: 'text', reveal: [2], text: 'on the global AI race.', highlights: ['race.'], size: 46, pos: 'right', media: {src: 'robotics/rb11_airace.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 106, kind: 'text', reveal: [2, 28], text: 'SoftBank agreed to buy|ABB’s robotics division', highlights: [], size: 44, pos: 'left', media: {src: 'robotics/rb12_buy.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 73, kind: 'text', reveal: [2], text: 'in October 2025.', highlights: ['2025.'], size: 52, pos: 'lowerRight', media: {src: 'robotics/rb13_date.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 75, kind: 'text', reveal: [2], text: 'CEO Masayoshi Son wanted', highlights: [], size: 50, pos: 'upper', media: {src: 'robotics/rb14_ceo.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 42, kind: 'text', reveal: [2], text: 'to use the acquisition', highlights: ['acquisition'], size: 50, pos: 'left', media: {src: 'robotics/rb15_acquisition.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 70, kind: 'text', reveal: [2], text: 'to expand into physical AI,', highlights: ['physical'], size: 46, pos: 'right', media: {src: 'robotics/rb16_physicalai.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 99, kind: 'text', reveal: [2, 28], text: 'where artificial intelligence|controls machines and robots', highlights: ['controls'], size: 44, pos: 'lowerLeft', media: {src: 'robotics/rb17_controls.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 31, kind: 'text', reveal: [2], text: 'in the real world.', highlights: [], size: 50, pos: 'upperRight', media: {src: 'robotics/rb18_realworld.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 61, kind: 'text', reveal: [2], text: 'But China is a crucial market', highlights: ['crucial'], size: 42, pos: 'left', media: {src: 'robotics/rb19_crucial.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 65, kind: 'text', reveal: [2], text: 'for ABB’s robotics business,', highlights: [], size: 50, pos: 'lowerRight', media: {src: 'robotics/rb20_business.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 36, kind: 'text', reveal: [2], text: 'accounting for around', highlights: [], size: 52, pos: 'upperLeft', media: {src: 'robotics/rb21_accounting.jpg', type: 'img', effect: 'in'}},
  // 22 CARD
  {dur: 40, kind: 'stat', stat: {value: 30, suffix: '%'}, media: {src: 'robotics/rb22_card30.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 42, kind: 'text', reveal: [2], text: 'of its robotics operations.', highlights: ['operations.'], size: 50, pos: 'right', media: {src: 'robotics/rb23_operations.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 33, kind: 'text', reveal: [2], text: 'According to reports,', highlights: [], size: 52, pos: 'lower', media: {src: 'robotics/rb24_reports.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 62, kind: 'text', reveal: [2], text: 'Chinese regulators were concerned', highlights: ['concerned'], size: 50, pos: 'upperRight', media: {src: 'robotics/rb25_regulators.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 38, kind: 'text', reveal: [2], text: 'that robotics data,', highlights: ['data,'], size: 52, pos: 'lowerLeft', media: {src: 'robotics/rb26_robodata.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 41, kind: 'text', reveal: [2], text: 'manufacturing capabilities,', highlights: [], size: 52, pos: 'left', media: {src: 'robotics/rb27_manufacturing.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 98, kind: 'text', reveal: [2, 28], text: 'and intellectual property|could move overseas.', highlights: ['overseas.'], size: 44, pos: 'right', media: {src: 'robotics/rb28_overseas.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 40, kind: 'text', reveal: [2], text: 'One major concern was', highlights: [], size: 50, pos: 'lowerRight', media: {src: 'robotics/rb29_concern.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 67, kind: 'text', reveal: [2, 28], text: 'that data collected|by these robots', highlights: ['data'], size: 44, pos: 'upperLeft', media: {src: 'robotics/rb30_collected.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 74, kind: 'text', reveal: [2, 28], text: 'could potentially be|transferred abroad', highlights: ['abroad'], size: 48, pos: 'right', media: {src: 'robotics/rb31_abroad.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 60, kind: 'text', reveal: [2, 28], text: 'and used to train|AI models,', highlights: ['train'], size: 44, pos: 'upperRight', media: {src: 'robotics/rb32_train.jpg', type: 'img', effect: 'in'}},
  // 33
  {dur: 79, kind: 'text', reveal: [2, 28], text: 'including those developed|by OpenAI,', highlights: ['OpenAI,'], size: 48, pos: 'left', media: {src: 'robotics/rb33_openai.jpg', type: 'img', effect: 'in'}},
  // 34
  {dur: 85, kind: 'text', reveal: [2, 28], text: 'where SoftBank|is a major investor.', highlights: ['investor.'], size: 44, pos: 'lowerLeft', media: {src: 'robotics/rb34_investor2.jpg', type: 'img', effect: 'in'}},
  // 35
  {dur: 72, kind: 'text', reveal: [2, 28], text: 'The decision threatens|SoftBank’s plans', highlights: ['threatens'], size: 48, pos: 'upper', media: {src: 'robotics/rb35_threatens.jpg', type: 'img', effect: 'in'}},
  // 36
  {dur: 95, kind: 'text', reveal: [2, 28], text: 'to combine robotics hardware|with AI software', highlights: [], size: 44, pos: 'right', media: {src: 'robotics/rb36_combine.jpg', type: 'img', effect: 'in'}},
  // 37
  {dur: 91, kind: 'text', reveal: [2, 28], text: 'and build a major position|in physical AI.', highlights: ['position'], size: 44, pos: 'lowerRight', media: {src: 'robotics/rb37_position.jpg', type: 'img', effect: 'in'}},
  // 38
  {dur: 39, kind: 'text', reveal: [2], text: 'This is also about', highlights: [], size: 50, pos: 'upperLeft', media: {src: 'robotics/rb38_alsoabout.jpg', type: 'img', effect: 'in'}},
  // 39 RED
  {dur: 40, kind: 'impact', redBg: true, text: 'National|security.'},
  // 40
  {dur: 55, kind: 'text', reveal: [2], text: 'and technological competition.', highlights: ['competition.'], size: 52, pos: 'left', media: {src: 'robotics/rb40_competition.jpg', type: 'img', effect: 'in'}},
  // 41
  {dur: 78, kind: 'text', reveal: [2, 28], text: 'China wants to protect|technology and data', highlights: ['protect'], size: 44, pos: 'lowerRight', media: {src: 'robotics/rb41_protect.jpg', type: 'img', effect: 'in'}},
  // 42
  {dur: 49, kind: 'text', reveal: [2], text: 'developed within its borders,', highlights: ['borders,'], size: 50, pos: 'upperRight', media: {src: 'robotics/rb42_borders.jpg', type: 'img', effect: 'in'}},
  // 43
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'while foreign investors|want access', highlights: ['access'], size: 48, pos: 'right', media: {src: 'robotics/rb43_access.jpg', type: 'img', effect: 'in'}},
  // 44
  {dur: 88, kind: 'text', reveal: [2, 28], text: 'to one of the world’s|biggest robotics markets.', highlights: ['biggest'], size: 44, pos: 'lowerLeft', media: {src: 'robotics/rb44_markets.jpg', type: 'img', effect: 'in'}},
  // 45
  {dur: 31, kind: 'text', reveal: [2], text: 'So what do you think?', highlights: [], size: 46, pos: 'left', media: {src: 'robotics/rb45_think.jpg', type: 'img', effect: 'in'}},
  // 46
  {dur: 98, kind: 'text', reveal: [2, 28], text: 'Is China right to protect|its robotics technology,', highlights: ['protect'], size: 44, pos: 'upperRight', media: {src: 'robotics/rb46_rightprotect.jpg', type: 'img', effect: 'in'}},
  // 47
  {dur: 90, kind: 'text', reveal: [2, 28], text: 'or is this another example|of geopolitics', highlights: ['geopolitics'], size: 44, pos: 'lower', media: {src: 'robotics/rb47_geopolitics.jpg', type: 'img', effect: 'in'}},
  // 48
  {dur: 58, kind: 'text', reveal: [2], text: 'blocking major business deals?', highlights: ['blocking'], size: 50, pos: 'right', media: {src: 'robotics/rb48_blocking.jpg', type: 'img', effect: 'in'}},
  // 49 CTA
  {dur: 38, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Let me know|in the comments.', highlights: ['comments'], size: 46, media: {src: 'robotics/rb49_comments.jpg', type: 'img', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 72, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1410, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 2466, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 3123, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The block</span>
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
export const RoboticsReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('robotics/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('robotics/music.mp3')}
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
