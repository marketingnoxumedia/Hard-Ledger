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
// "The comeback" reel (ComebackReel) — fast TECH / MARKETS news reel, Hard Ledger house VISUAL format.
// TOPIC: JENSEN HUANG may be eyeing a comeback at NVIDIA. Days after resigning as CEO, the man behind the AI-chip
// revolution is reportedly weighing a return, and ELON MUSK is publicly backing him (saying he'll sign a petition to
// bring Jensen back). The problem: Nvidia's board may not reverse its decision, and Washington wants a different kind of
// leadership change. CONTEXT: Huang stepped down on November 12 after reports of extramarital affairs, including one
// involving a former executive at a Singapore-based company U.S. officials suspect of links to Chinese intelligence.
// EVIDENCE (per the Financial Times): Huang has discussed returning; supporters are organizing a campaign to persuade the
// board and even the White House. ESCALATION: Treasury Secretary Scott Bessent wants a dramatic shake-up, and the board
// has reportedly explored other candidates, including Arm CEO Rene Haas. CONSEQUENCES: Nvidia shares fell more than 12%
// last week, billions in value at stake, and the coming earnings report is the first under interim CEO Colette Kress. The
// biggest obstacle: Musk can't reinstate Huang — the board decides, weighing his importance against the investigations and
// national-security concerns. DEBATE: bring back the founder, or pick a new leader — what would you do?
// NOTE ON VOICE: built VERBATIM from a client-supplied script in the influencer "curiosity-gap" format, NOT the faceless
// house voice — it uses an EARLY "follow for more" CTA and CLOSES on "What would you do if you were on the board?".
// Per the saved house preference, captions are <=5-6 words/beat with LARGER on-screen type (Anton 42-52). 48 beats. 1 stat
// card: DOWN 12% LAST WEEK (the share drop; "November 12" and "billions" stay in-caption). 1 red impact at the CONTROVERSY
// pivot ("The board / decides."), no black beat. Captions match the VO verbatim (all names stay in-caption). Durations/
// reveals/SFX locked to the VO via a scribe_v1 word-timestamp anchor pass (public/comeback/voiceover.mp3). Built at the
// house +10% pacing default; its own tense tech/markets-news music mixed at 0.2. OWN distinct footage under
// public/comeback/ (47 stills), NO reuse — ledger-checked.
// FOOTAGE is strictly BRAND-FREE and FACE-FREE — NO Nvidia / Tesla / X / SpaceX / Arm / any company logo, NO Jensen Huang /
// Elon Musk / Scott Bessent / Rene Haas / Colette Kress or ANY identifiable real face (all human figures are silhouettes /
// backs / hands only), NO readable ticker / price / sign / screen / newspaper / document text, NO national flag or
// government seal, NO identifiable landmark (real White House / Capitol / Treasury / Marina Bay), NO identifiable currency.
// Metaphor-led tech / boardroom / politics / markets b-roll only: a silhouette returning through a doorway for the
// comeback, a generic glowing GPU / neural net for Nvidia and the AI-chip revolution, an empty executive chair for the
// resignation, a rocket / EV cable for Musk, generic stone colonnades for Washington and the White House, a chess king /
// podium for leadership, tangled thread for the affair, a shadowy figure / green code for the intelligence angle, blurred
// newsprint for the Financial Times, crowd-silhouette hands for the campaign, handshakes / a pen on a blank page for the
// backing and petition, a brass scale / padlock / locked gate for the board's weighing, a falling red chart for the 12%
// drop, a vast skyline / data center for the "AI empire", a gavel for the closing call, a blank-screen phone for FOLLOW,
// a red warning light for the red beat.
// **UNVERIFIED, SENSITIVE AND MARKET-SENSITIVE — names REAL people (Jensen Huang, Elon Musk, Treasury Secretary Scott
// Bessent, Arm CEO Rene Haas, interim CEO Colette Kress) and makes serious, checkable claims: a resignation over alleged
// extramarital affairs, an alleged tie to a Singapore company suspected of Chinese-intelligence links, a Musk-backed
// petition, a Bessent call for a shake-up, board succession talks, and a >12% weekly share drop. Rendered VERBATIM as
// supplied, with the script's hedges ("reportedly", "may", "could") preserved. Every claim — the affair/espionage
// allegations especially — MUST be fact-checked against primary sources (Financial Times and other reputable reporting,
// company statements, live market data) before publishing; the allegations concern real, named individuals and are
// defamation-sensitive. This is general news framing, NOT investment advice; the closing line is the client's engagement
// prompt.**
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 76, kind: 'hook', reveal: [3, 40], text: 'Jensen Huang could be|making a comeback', kicker: 'The comeback', highlights: ['comeback'], size: 48, media: {src: 'comeback/cb00_comeback.jpg', type: 'img', effect: 'in'}},
  // 1
  {dur: 27, kind: 'text', reveal: [2], text: 'at Nvidia.', highlights: ['Nvidia.'], size: 52, pos: 'upperRight', media: {src: 'comeback/cb01_nvidia.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 92, kind: 'text', reveal: [2, 28], text: 'Just days after|resigning as CEO,', highlights: ['resigning'], size: 44, pos: 'left', media: {src: 'comeback/cb02_resigning.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 76, kind: 'text', reveal: [2, 28], text: 'the man behind|the AI chip revolution', highlights: ['revolution'], size: 44, pos: 'lowerRight', media: {src: 'comeback/cb03_revolution.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 74, kind: 'text', reveal: [2, 28], text: 'is reportedly|considering returning.', highlights: ['returning.'], size: 50, pos: 'upperLeft', media: {src: 'comeback/cb04_returning.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 65, kind: 'text', reveal: [2, 28], text: 'And Elon Musk|wants him back.', highlights: ['back.'], size: 44, pos: 'right', media: {src: 'comeback/cb05_musk.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 33, kind: 'text', reveal: [2], text: 'But here’s the problem:', highlights: ['problem:'], size: 50, pos: 'lower', media: {src: 'comeback/cb06_problem.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 100, kind: 'text', reveal: [2, 28], text: 'Nvidia’s board may not be|ready to reverse its decision,', highlights: ['reverse'], size: 44, pos: 'lowerLeft', media: {src: 'comeback/cb07_reverse.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 42, kind: 'text', reveal: [2], text: 'and Washington is pushing', highlights: ['Washington'], size: 50, pos: 'upperRight', media: {src: 'comeback/cb08_washington.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 90, kind: 'text', reveal: [2, 28], text: 'for a very different|kind of leadership change.', highlights: ['leadership'], size: 44, pos: 'left', media: {src: 'comeback/cb09_leadership.jpg', type: 'img', effect: 'in'}},
  // 10 FOLLOW
  {dur: 104, kind: 'text', reveal: [2], text: 'Follow for more technology|and stock market news.', highlights: ['follow'], size: 44, pos: 'right', media: {src: 'comeback/cb10_follow.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 77, kind: 'text', reveal: [2, 28], text: 'Huang stepped down|on November 12', highlights: ['November'], size: 44, pos: 'upperLeft', media: {src: 'comeback/cb11_steppeddown.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'following reports|of extramarital affairs,', highlights: ['affairs,'], size: 48, pos: 'lowerRight', media: {src: 'comeback/cb12_affairs.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 83, kind: 'text', reveal: [2, 28], text: 'including one involving|a former executive', highlights: ['executive'], size: 44, pos: 'upper', media: {src: 'comeback/cb13_executive.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 45, kind: 'text', reveal: [2], text: 'at a Singapore-based company', highlights: ['Singapore-based'], size: 50, pos: 'left', media: {src: 'comeback/cb14_singapore.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 56, kind: 'text', reveal: [2], text: 'suspected by U.S. officials', highlights: ['suspected'], size: 50, pos: 'right', media: {src: 'comeback/cb15_suspected.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 96, kind: 'text', reveal: [2, 28], text: 'of having links|to Chinese intelligence.', highlights: ['intelligence.'], size: 44, pos: 'lowerLeft', media: {src: 'comeback/cb16_intelligence.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 55, kind: 'text', reveal: [2, 28], text: 'According to|the Financial Times,', highlights: ['Financial'], size: 48, pos: 'upperRight', media: {src: 'comeback/cb17_ft.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 103, kind: 'text', reveal: [2, 28], text: 'Huang has discussed returning|with people close to him.', highlights: ['returning'], size: 44, pos: 'left', media: {src: 'comeback/cb18_discussed.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 100, kind: 'text', reveal: [2, 28], text: 'His supporters are reportedly|organizing a campaign', highlights: ['campaign'], size: 44, pos: 'lowerRight', media: {src: 'comeback/cb19_campaign.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 57, kind: 'text', reveal: [2], text: 'to persuade Nvidia’s board', highlights: ['persuade'], size: 50, pos: 'upperLeft', media: {src: 'comeback/cb20_persuade.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 36, kind: 'text', reveal: [2], text: 'and even the White House', highlights: ['White', 'House'], size: 46, pos: 'right', media: {src: 'comeback/cb21_whitehouse.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 48, kind: 'text', reveal: [2], text: 'to support his comeback.', highlights: ['comeback.'], size: 50, pos: 'lower', media: {src: 'comeback/cb22_support.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 89, kind: 'text', reveal: [2, 28], text: 'Elon Musk has also|publicly backed the effort,', highlights: ['backed'], size: 44, pos: 'upperRight', media: {src: 'comeback/cb23_backed.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 61, kind: 'text', reveal: [2, 28], text: 'saying he is|signing a petition', highlights: ['petition'], size: 44, pos: 'lowerLeft', media: {src: 'comeback/cb24_petition.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 46, kind: 'text', reveal: [2], text: 'to bring Jensen back.', highlights: ['Jensen'], size: 50, pos: 'left', media: {src: 'comeback/cb25_bringback.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 51, kind: 'text', reveal: [2], text: 'But not everyone agrees.', highlights: ['everyone'], size: 50, pos: 'right', media: {src: 'comeback/cb26_notagree.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 59, kind: 'text', reveal: [2, 28], text: 'Treasury Secretary|Scott Bessent', highlights: ['Bessent'], size: 50, pos: 'lowerRight', media: {src: 'comeback/cb27_bessent.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 94, kind: 'text', reveal: [2, 28], text: 'has called for a|dramatic leadership shake-up,', highlights: ['shake-up,'], size: 44, pos: 'upperLeft', media: {src: 'comeback/cb28_shakeup.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 91, kind: 'text', reveal: [2, 28], text: 'while Nvidia’s board|has reportedly explored', highlights: ['explored'], size: 44, pos: 'right', media: {src: 'comeback/cb29_explored.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 49, kind: 'text', reveal: [2], text: 'other candidates, including', highlights: ['candidates,'], size: 52, pos: 'upperRight', media: {src: 'comeback/cb30_candidates.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 80, kind: 'text', reveal: [2], text: 'Arm CEO Rene Haas.', highlights: ['Haas.'], size: 50, pos: 'left', media: {src: 'comeback/cb31_haas.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 63, kind: 'text', reveal: [2], text: 'Investors are watching closely.', highlights: ['watching'], size: 50, pos: 'lowerLeft', media: {src: 'comeback/cb32_watching.jpg', type: 'img', effect: 'in'}},
  // 33 CARD
  {dur: 106, kind: 'stat', stat: {pre: 'DOWN', value: 12, suffix: '%', post: 'LAST WEEK'}, media: {src: 'comeback/cb33_card12.jpg', type: 'img', effect: 'in'}},
  // 34
  {dur: 111, kind: 'text', reveal: [2, 28], text: 'and the company has billions|in market value at stake.', highlights: ['billions'], size: 44, pos: 'upper', media: {src: 'comeback/cb34_billions.jpg', type: 'img', effect: 'in'}},
  // 35
  {dur: 47, kind: 'text', reveal: [2], text: 'Its upcoming earnings report', highlights: ['earnings'], size: 50, pos: 'right', media: {src: 'comeback/cb35_earnings.jpg', type: 'img', effect: 'in'}},
  // 36
  {dur: 48, kind: 'text', reveal: [2], text: 'will also be the first', highlights: ['first'], size: 46, pos: 'lowerRight', media: {src: 'comeback/cb36_first.jpg', type: 'img', effect: 'in'}},
  // 37
  {dur: 85, kind: 'text', reveal: [2, 28], text: 'under interim CEO|Colette Kress.', highlights: ['Colette'], size: 48, pos: 'upperLeft', media: {src: 'comeback/cb37_kress.jpg', type: 'img', effect: 'in'}},
  // 38
  {dur: 49, kind: 'text', reveal: [2, 28], text: 'And here’s|the biggest obstacle:', highlights: ['biggest'], size: 48, pos: 'left', media: {src: 'comeback/cb38_obstacle.jpg', type: 'img', effect: 'in'}},
  // 39
  {dur: 96, kind: 'text', reveal: [2, 28], text: 'Musk cannot|reinstate Huang himself.', highlights: ['cannot'], size: 48, pos: 'lowerRight', media: {src: 'comeback/cb39_cannot.jpg', type: 'img', effect: 'in'}},
  // 40 RED
  {dur: 75, kind: 'impact', redBg: true, text: 'The board|decides.'},
  // 41
  {dur: 88, kind: 'text', reveal: [2, 28], text: 'which must weigh|Huang’s importance', highlights: ['weigh'], size: 48, pos: 'upperRight', media: {src: 'comeback/cb41_weigh.jpg', type: 'img', effect: 'in'}},
  // 42
  {dur: 72, kind: 'text', reveal: [2], text: 'against the ongoing investigations', highlights: ['investigations'], size: 50, pos: 'right', media: {src: 'comeback/cb42_investigations.jpg', type: 'img', effect: 'in'}},
  // 43
  {dur: 59, kind: 'text', reveal: [2], text: 'and national security concerns.', highlights: ['security'], size: 50, pos: 'lowerLeft', media: {src: 'comeback/cb43_security.jpg', type: 'img', effect: 'in'}},
  // 44
  {dur: 36, kind: 'text', reveal: [2], text: 'Should Nvidia bring back', highlights: ['back'], size: 50, pos: 'left', media: {src: 'comeback/cb44_bringbackfounder.jpg', type: 'img', effect: 'in'}},
  // 45
  {dur: 67, kind: 'text', reveal: [2, 28], text: 'the founder who built|its AI empire,', highlights: ['empire,'], size: 44, pos: 'upperRight', media: {src: 'comeback/cb45_empire.jpg', type: 'img', effect: 'in'}},
  // 46
  {dur: 67, kind: 'text', reveal: [2, 28], text: 'or is it time|for a completely new leader?', highlights: ['new'], size: 44, pos: 'lower', media: {src: 'comeback/cb46_newleader.jpg', type: 'img', effect: 'in'}},
  // 47 CTA
  {dur: 54, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'What would you do|if you were on the board?', highlights: ['you'], size: 46, media: {src: 'comeback/cb47_yourcall.jpg', type: 'img', effect: 'in'}},
];


type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 2288, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 2830, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 3294, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The comeback</span>
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
export const ComebackReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('comeback/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('comeback/music.mp3')}
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
