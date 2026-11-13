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
// "The reinvention" reel (ReinventReel) — fast CAREERS / TECHNOLOGY / BUSINESS news reel, Hard Ledger house VISUAL format.
// TOPIC: TONY ROBBINS' warning to workers — REINVENT YOURSELF BEFORE AI DOES IT FOR YOU. Don't wait until you're replaced.
// His advice (per a Yahoo Finance interview): honestly assess whether your job is becoming obsolete or whether learning AI
// makes you more valuable; if AI can do most of your work, start RETRAINING NOW; if AI makes you more productive, learn to
// use it. He warns AI-driven job disruption could get much bigger over the next 24 months, points to software engineering
// (adapt toward AI engineering and cybersecurity), skilled trades (electricians) and healthcare (nursing). Not just
// motivational: Gartner projects AI could CREATE 10.6M jobs while ELIMINATING 8.9M worldwide by 2030, with millions more
// roles transformed. The bigger question: who pays for the transition — Robbins argues companies and governments may need
// to help workers retrain rather than simply lay them off. Debate: work alongside AI, or build an entirely new career?
// NOTE ON VOICE: built VERBATIM from a client-supplied script in the influencer "curiosity-gap" format, NOT the faceless
// house voice (this script is intentionally ADVICE-led, unlike the house no-advice voice — rendered as supplied). It uses
// an EARLY "follow for more" CTA and CLOSES on the debate question "...an entirely new career?".
// Per the saved house preference, captions are <=5-6 words/beat with LARGER on-screen type (Anton 42-52). 56 beats. 3 stat
// cards: 24 MONTHS, 10.6M JOBS CREATED, 8.9M JOBS ELIMINATED (the Gartner pair is the bull/bear contrast; the year 2030
// stays in-caption). 1 red impact at the CONTROVERSY pivot ("Who should / pay for this?"), no black beat. Captions match
// the VO verbatim (all names stay in-caption). Durations/reveals/SFX locked to the VO via a scribe_v1 word-timestamp anchor
// pass (public/reinvent/voiceover.mp3). Built at the house +10% pacing default; its own motivational-but-tense
// careers/tech music mixed at 0.2. OWN distinct footage under public/reinvent/ (55 stills), NO reuse — ledger-checked.
// FOOTAGE is strictly BRAND-FREE and FACE-FREE — NO Tony Robbins likeness or ANY identifiable real face, NO Yahoo Finance /
// Gartner / any company logo or wordmark, NO readable sign / screen / headline text, NO national flag, NO readable
// currency. Metaphor-led work / AI / learning b-roll only: a worker at a crossroads / a fork in the road, human hands and a
// robot/mechanical hand for human-vs-AI, books / a classroom / a lecture hall for retraining, generic over-the-shoulder
// code on a screen (no readable text) and a keyboard for software, an electrician's tools / an open electrical panel / a
// hard hat for trades, a stethoscope / scrubs / gloved hands for healthcare (no faces), a balance scale for jobs
// created-vs-eliminated, a clock / calendar for 24 months and 2030, an empty desk / a packed box for layoffs, a sunrise /
// an open door / a new path for the new-career close, a blank-screen phone for the FOLLOW CTA.
// **UNVERIFIED — attributes specific claims and advice to a REAL, LIVING person (Tony Robbins) via a Yahoo Finance
// interview, and cites a specific Gartner projection (10.6M jobs created / 8.9M eliminated worldwide by 2030) and a "24
// months" timeframe. Rendered VERBATIM as supplied. The quotes/attribution, the Gartner figures and the timeframe MUST be
// fact-checked against primary sources (the actual Yahoo Finance interview, Gartner's published research) before
// publishing. This is general career/business information, NOT financial, career, or professional advice.**
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 95, kind: 'hook', reveal: [3, 40], text: 'Worried that artificial intelligence|could take your job?', kicker: 'The reinvention', highlights: [], size: 48, media: {src: 'reinvent/rv00_worried.jpg', type: 'img', effect: 'in'}},
  // 1
  {dur: 39, kind: 'text', reveal: [2], text: 'Tony Robbins says', highlights: ['Robbins'], size: 52, pos: 'upperRight', media: {src: 'reinvent/rv01_robbins.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 57, kind: 'text', reveal: [2], text: 'waiting until you’re replaced', highlights: ['replaced'], size: 50, pos: 'left', media: {src: 'reinvent/rv02_replaced.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 64, kind: 'text', reveal: [2], text: 'could be your biggest mistake.', highlights: ['mistake.'], size: 46, pos: 'lowerRight', media: {src: 'reinvent/rv03_mistake.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 65, kind: 'text', reveal: [2], text: 'His advice isn’t to fight AI', highlights: ['fight'], size: 42, pos: 'upperLeft', media: {src: 'reinvent/rv04_fight.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 47, kind: 'text', reveal: [2], text: 'or hope it disappears.', highlights: ['disappears.'], size: 50, pos: 'right', media: {src: 'reinvent/rv05_disappears.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 31, kind: 'text', reveal: [2], text: 'It’s to figure out', highlights: [], size: 50, pos: 'lower', media: {src: 'reinvent/rv06_figureout.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'whether your job|is becoming obsolete,', highlights: ['obsolete,'], size: 44, pos: 'lowerLeft', media: {src: 'reinvent/rv07_obsolete.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 47, kind: 'text', reveal: [2], text: 'or whether learning AI', highlights: ['learning'], size: 50, pos: 'upperRight', media: {src: 'reinvent/rv08_learning.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 78, kind: 'text', reveal: [2, 28], text: 'could actually make you|more valuable.', highlights: ['valuable.'], size: 44, pos: 'left', media: {src: 'reinvent/rv09_valuable.jpg', type: 'img', effect: 'in'}},
  // 10 FOLLOW
  {dur: 120, kind: 'text', reveal: [2], text: 'Follow for more business,|technology, and career news.', highlights: ['follow'], size: 44, pos: 'right', media: {src: 'reinvent/rv10_follow.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 64, kind: 'text', reveal: [2, 28], text: 'In an interview|with Yahoo Finance,', highlights: ['Yahoo'], size: 44, pos: 'upperLeft', media: {src: 'reinvent/rv11_yahoo.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 31, kind: 'text', reveal: [2], text: 'Robbins warned that', highlights: [], size: 52, pos: 'lowerRight', media: {src: 'reinvent/rv12_warned.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 57, kind: 'text', reveal: [2], text: 'AI-driven job disruption', highlights: ['disruption'], size: 52, pos: 'upper', media: {src: 'reinvent/rv13_disruption.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 64, kind: 'text', reveal: [2, 28], text: 'could become|a much bigger issue', highlights: ['bigger'], size: 44, pos: 'left', media: {src: 'reinvent/rv14_bigger.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 26, kind: 'text', reveal: [2], text: 'over the next', highlights: [], size: 52, pos: 'right', media: {src: 'reinvent/rv15_overnext.jpg', type: 'img', effect: 'in'}},
  // 16 CARD
  {dur: 40, kind: 'stat', stat: {value: 24, post: 'MONTHS'}, media: {src: 'reinvent/rv16_card24.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 27, kind: 'text', reveal: [2], text: 'He says workers need', highlights: ['workers'], size: 50, pos: 'lowerLeft', media: {src: 'reinvent/rv17_workers.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 45, kind: 'text', reveal: [2], text: 'to take an honest look', highlights: ['honest'], size: 46, pos: 'upperRight', media: {src: 'reinvent/rv18_honest.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 31, kind: 'text', reveal: [2], text: 'at their careers.', highlights: [], size: 52, pos: 'left', media: {src: 'reinvent/rv19_careers.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 46, kind: 'text', reveal: [2], text: 'If AI can perform', highlights: [], size: 50, pos: 'lowerRight', media: {src: 'reinvent/rv20_perform.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 38, kind: 'text', reveal: [2], text: 'most of their work,', highlights: [], size: 50, pos: 'upperLeft', media: {src: 'reinvent/rv21_mostwork.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 56, kind: 'text', reveal: [2], text: 'they should start retraining now.', highlights: ['retraining'], size: 46, pos: 'right', media: {src: 'reinvent/rv22_retrain.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 36, kind: 'text', reveal: [2], text: 'But if AI can make them', highlights: [], size: 42, pos: 'lower', media: {src: 'reinvent/rv23_makethem.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 33, kind: 'text', reveal: [2], text: 'more productive,', highlights: ['productive,'], size: 52, pos: 'upperRight', media: {src: 'reinvent/rv24_productive.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 29, kind: 'text', reveal: [2], text: 'learning to use it', highlights: [], size: 50, pos: 'lowerLeft', media: {src: 'reinvent/rv25_usingit.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 54, kind: 'text', reveal: [2], text: 'could create new opportunities.', highlights: ['opportunities.'], size: 50, pos: 'left', media: {src: 'reinvent/rv26_opportunities.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 64, kind: 'text', reveal: [2, 28], text: 'Robbins pointed to|software engineering', highlights: ['software'], size: 48, pos: 'right', media: {src: 'reinvent/rv27_software.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 28, kind: 'text', reveal: [2], text: 'as an example,', highlights: [], size: 52, pos: 'lowerRight', media: {src: 'reinvent/rv28_example.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 45, kind: 'text', reveal: [2], text: 'arguing that developers', highlights: ['developers'], size: 52, pos: 'upperLeft', media: {src: 'reinvent/rv29_developers.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 41, kind: 'text', reveal: [2], text: 'need to adapt toward', highlights: ['adapt'], size: 50, pos: 'right', media: {src: 'reinvent/rv30_adapt.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'AI engineering|and cybersecurity.', highlights: ['cybersecurity.'], size: 50, pos: 'upperRight', media: {src: 'reinvent/rv31_cybersecurity.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 73, kind: 'text', reveal: [2, 28], text: 'He also highlighted|skilled trades,', highlights: ['skilled'], size: 48, pos: 'left', media: {src: 'reinvent/rv32_trades.jpg', type: 'img', effect: 'in'}},
  // 33
  {dur: 41, kind: 'text', reveal: [2], text: 'including electricians,', highlights: ['electricians,'], size: 52, pos: 'lowerLeft', media: {src: 'reinvent/rv33_electricians.jpg', type: 'img', effect: 'in'}},
  // 34
  {dur: 41, kind: 'text', reveal: [2], text: 'and healthcare careers', highlights: ['healthcare'], size: 52, pos: 'upper', media: {src: 'reinvent/rv34_healthcare.jpg', type: 'img', effect: 'in'}},
  // 35
  {dur: 32, kind: 'text', reveal: [2], text: 'such as nursing.', highlights: ['nursing.'], size: 52, pos: 'right', media: {src: 'reinvent/rv35_nursing.jpg', type: 'img', effect: 'in'}},
  // 36
  {dur: 100, kind: 'text', reveal: [2, 28], text: 'And this isn’t just|motivational advice.', highlights: ['motivational'], size: 44, pos: 'lowerRight', media: {src: 'reinvent/rv36_motivational.jpg', type: 'img', effect: 'in'}},
  // 37
  {dur: 55, kind: 'text', reveal: [2], text: 'Gartner recently projected', highlights: ['Gartner'], size: 52, pos: 'upperLeft', media: {src: 'reinvent/rv37_gartner.jpg', type: 'img', effect: 'in'}},
  // 38
  {dur: 36, kind: 'text', reveal: [2], text: 'that AI could create', highlights: [], size: 50, pos: 'left', media: {src: 'reinvent/rv38_couldcreate.jpg', type: 'img', effect: 'in'}},
  // 39 CARD
  {dur: 66, kind: 'stat', stat: {value: 10.6, decimals: 1, suffix: 'M', post: 'JOBS CREATED'}, media: {src: 'reinvent/rv39_card106.jpg', type: 'img', effect: 'in'}},
  // 40
  {dur: 26, kind: 'text', reveal: [2], text: 'while eliminating', highlights: ['eliminating'], size: 52, pos: 'lowerRight', media: {src: 'reinvent/rv40_eliminating.jpg', type: 'img', effect: 'in'}},
  // 41 CARD
  {dur: 40, kind: 'stat', stat: {value: 8.9, decimals: 1, suffix: 'M', post: 'JOBS ELIMINATED'}, media: {src: 'reinvent/rv41_card89.jpg', type: 'img', effect: 'in'}},
  // 42
  {dur: 54, kind: 'text', reveal: [2], text: 'worldwide by 2030.', highlights: ['2030.'], size: 52, pos: 'upperRight', media: {src: 'reinvent/rv42_by2030.jpg', type: 'img', effect: 'in'}},
  // 43
  {dur: 42, kind: 'text', reveal: [2], text: 'Millions more workers', highlights: ['Millions'], size: 52, pos: 'right', media: {src: 'reinvent/rv43_millions.jpg', type: 'img', effect: 'in'}},
  // 44
  {dur: 81, kind: 'text', reveal: [2, 28], text: 'may see their|existing roles transformed.', highlights: ['transformed.'], size: 44, pos: 'lowerLeft', media: {src: 'reinvent/rv44_transformed.jpg', type: 'img', effect: 'in'}},
  // 45
  {dur: 40, kind: 'text', reveal: [2], text: 'But there’s a bigger question:', highlights: ['question:'], size: 46, pos: 'left', media: {src: 'reinvent/rv45_question.jpg', type: 'img', effect: 'in'}},
  // 46 RED
  {dur: 57, kind: 'impact', redBg: true, text: 'Who should|pay for this?'},
  // 47
  {dur: 43, kind: 'text', reveal: [2], text: 'Robbins argues companies', highlights: ['companies'], size: 52, pos: 'upperRight', media: {src: 'reinvent/rv47_companies.jpg', type: 'img', effect: 'in'}},
  // 48
  {dur: 39, kind: 'text', reveal: [2], text: 'and governments may need', highlights: ['governments'], size: 50, pos: 'lower', media: {src: 'reinvent/rv48_governments.jpg', type: 'img', effect: 'in'}},
  // 49
  {dur: 61, kind: 'text', reveal: [2], text: 'to help workers retrain', highlights: ['retrain'], size: 50, pos: 'right', media: {src: 'reinvent/rv49_helpretrain.jpg', type: 'img', effect: 'in'}},
  // 50
  {dur: 62, kind: 'text', reveal: [2, 28], text: 'instead of simply|laying them off.', highlights: ['laying'], size: 44, pos: 'upperLeft', media: {src: 'reinvent/rv50_layoff.jpg', type: 'img', effect: 'in'}},
  // 51
  {dur: 78, kind: 'text', reveal: [2, 28], text: 'If AI changed|your industry tomorrow,', highlights: ['tomorrow,'], size: 44, pos: 'lowerRight', media: {src: 'reinvent/rv51_tomorrow.jpg', type: 'img', effect: 'in'}},
  // 52
  {dur: 31, kind: 'text', reveal: [2], text: 'would you learn to work', highlights: [], size: 46, pos: 'left', media: {src: 'reinvent/rv52_learntowork.jpg', type: 'img', effect: 'in'}},
  // 53
  {dur: 26, kind: 'text', reveal: [2], text: 'alongside it,', highlights: ['alongside'], size: 52, pos: 'upperRight', media: {src: 'reinvent/rv53_alongside.jpg', type: 'img', effect: 'in'}},
  // 54
  {dur: 26, kind: 'text', reveal: [2], text: 'or start building', highlights: [], size: 52, pos: 'right', media: {src: 'reinvent/rv54_building.jpg', type: 'img', effect: 'in'}},
  // 55 CTA
  {dur: 35, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'an entirely new career?', highlights: ['career?'], size: 52, media: {src: 'reinvent/rv55_newcareer.jpg', type: 'img', effect: 'in'}},
];


type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 955, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 2016, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 2108, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 2365, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 2788, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The reinvention</span>
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
export const ReinventReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('reinvent/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('reinvent/music.mp3')}
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
