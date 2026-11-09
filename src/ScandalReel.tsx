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
// "The scandal" reel (ScandalReel) — Hard Ledger house VISUAL format, technology / corporate / national-security news topic.
// TOPIC: NVIDIA CEO JENSEN HUANG is facing a major scandal — he has (per the script) admitted an affair while Nvidia
// investigates allegations he may have been targeted by a CHINESE SPY OPERATION. The woman, ALICE HUANG, was a former
// executive at Singapore-based MEGASPEED, a company that buys Nvidia's advanced AI chips; US intelligence reportedly
// believes she was recruited by China's MINISTRY OF STATE SECURITY to gather information and influence access to American
// AI technology. Nvidia's board has launched an independent investigation with outside counsel. The company says it has
// no reason to believe secrets or national-security information were compromised and retains confidence in Huang.
// Debate: personal scandal, or a national-security threat involving one of America's most powerful tech CEOs?
// NOTE ON VOICE: built VERBATIM from a client-supplied script in the influencer "curiosity-gap" format (HOOK / CURIOSITY
// GAP / EARLY CTA / CONTEXT / EVIDENCE / ESCALATION / CONSEQUENCES / CONTROVERSY / AUDIENCE DEBATE), NOT the faceless
// house voice — it names Nvidia / Jensen Huang / Alice Huang / Megaspeed / China's Ministry of State Security / Singapore,
// uses an EARLY "follow for more" CTA, and CLOSES on a "let me know in the comments" debate CTA. Per the saved house
// preference, captions are <=5-6 words/beat with LARGER on-screen type (Anton 42-52). 57 beats. NO stat cards (the script
// states no hard figures — none were invented). 1 red impact at the escalation pivot ("Bigger than / a scandal." — the
// personal-to-national turn; reel closes on the comments-CTA media beat), no black beat. Captions match the VO verbatim.
// Durations/reveals/SFX locked to the VO via a scribe_v1 word-timestamp anchor pass (public/scandal/voiceover.mp3). Built
// at the house +10% pacing default; its own tense, cinematic corporate/espionage music mixed at 0.2. OWN distinct footage
// under public/scandal/ (56 stills), NO reuse of any other reel's clips — ledger-checked.
// FOOTAGE is strictly BRAND-FREE and FACE-FREE — because the reel names real companies and REAL, LIVING NAMED INDIVIDUALS,
// NONE of their assets or likenesses appear: NO Nvidia logo / wordmark / GPU product, NO Megaspeed branding, NO photo or
// likeness of Jensen Huang / Alice Huang / any real person or identifiable face, NO China / US / Singapore flag, NO MSS or
// government building, NO identifiable Singapore / Asia landmark or skyline, NO readable brand name / sign / screen text.
// Metaphor-led corporate / espionage / tech b-roll only: shadowed faceless executive silhouettes and empty boardrooms, a
// broken ring / wilting rose / two shadows for the affair, a magnifier over redacted files and a gavel / scales / law
// books for the investigation, a trench-coat silhouette / surveillance camera / crosshair / chess piece for the spy
// angle, a generic unbranded microchip macro and server racks and an AI/neural abstract for the chips/technology, a
// glowing globe / Asia map for the global-economy and Asia beats, a vault / padlock / shield for secrets and national
// security, a red falling-chart abstract for investor confidence, blank-screen phones for the FOLLOW and comments CTAs.
// **UNVERIFIED AND SENSITIVE — this reel makes grave allegations about REAL, NAMED, LIVING PEOPLE. The espionage and
// investigation claims are reported ALLEGATIONS under active investigation (attributed in the script to reports / US
// intelligence); China calls them "groundless speculation." The flat claim that Jensen Huang ADMITTED AN AFFAIR was,
// at build time, found in only ONE outlet and NOT independently corroborated — rendered verbatim at the client's explicit
// editorial direction. Every claim MUST be re-verified against multiple primary sources, and the defamation / accuracy
// risk reviewed, BEFORE publishing. This is general information, not investment advice and not a statement of fact by the
// builder.**
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 62, kind: 'hook', reveal: [3, 40], text: 'Nvidia CEO|Jensen Huang', kicker: 'The scandal', highlights: [], size: 54, media: {src: 'scandal/sc00_ceo.jpg', type: 'img', effect: 'in'}},
  // 1
  {dur: 68, kind: 'text', reveal: [2, 28], text: 'is facing one of|the biggest scandals', highlights: ['scandals'], size: 44, pos: 'upperRight', media: {src: 'scandal/sc01_biggest.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 29, kind: 'text', reveal: [2], text: 'of his career.', highlights: ['career.'], size: 52, pos: 'left', media: {src: 'scandal/sc02_career.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 56, kind: 'text', reveal: [2, 28], text: 'He has admitted|to an affair,', highlights: ['affair,'], size: 44, pos: 'lowerRight', media: {src: 'scandal/sc03_affair.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'while his company|investigates allegations', highlights: ['investigates'], size: 48, pos: 'upperLeft', media: {src: 'scandal/sc04_investigates.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 40, kind: 'text', reveal: [2, 28], text: 'that he may have|been targeted', highlights: ['targeted'], size: 44, pos: 'right', media: {src: 'scandal/sc05_targeted.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 71, kind: 'text', reveal: [2, 28], text: 'by a Chinese|spy operation.', highlights: ['spy'], size: 48, pos: 'lower', media: {src: 'scandal/sc06_spy.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 35, kind: 'text', reveal: [2, 28], text: 'But here’s what|makes this', highlights: [], size: 48, pos: 'upperLeft', media: {src: 'scandal/sc07_makesthis.jpg', type: 'img', effect: 'in'}},
  // 8 RED
  {dur: 62, kind: 'impact', redBg: true, text: 'Bigger than|a scandal.'},
  // 9
  {dur: 26, kind: 'text', reveal: [2], text: 'the woman involved', highlights: ['woman'], size: 52, pos: 'upperRight', media: {src: 'scandal/sc09_woman.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 46, kind: 'text', reveal: [2], text: 'was reportedly connected', highlights: ['connected'], size: 52, pos: 'lowerLeft', media: {src: 'scandal/sc10_connected.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 82, kind: 'text', reveal: [2, 28], text: 'to a major Nvidia|customer in Asia.', highlights: ['Asia.'], size: 44, pos: 'right', media: {src: 'scandal/sc11_asia.jpg', type: 'img', effect: 'in'}},
  // 12 FOLLOW
  {dur: 38, kind: 'text', reveal: [2], text: 'Follow for|more updates', highlights: ['follow'], size: 50, pos: 'left', media: {src: 'scandal/sc12_follow.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 44, kind: 'text', reveal: [2], text: 'on the technology companies', highlights: [], size: 50, pos: 'lowerRight', media: {src: 'scandal/sc13_tech.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 53, kind: 'text', reveal: [2, 28], text: 'shaping the|global economy.', highlights: ['economy.'], size: 50, pos: 'upper', media: {src: 'scandal/sc14_economy.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 77, kind: 'text', reveal: [2, 28], text: 'The controversy|involves Alice Huang,', highlights: [], size: 48, pos: 'left', media: {src: 'scandal/sc15_alice.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 42, kind: 'text', reveal: [2], text: 'a former executive', highlights: ['executive'], size: 52, pos: 'right', media: {src: 'scandal/sc16_exec.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 56, kind: 'text', reveal: [2, 28], text: 'at Singapore-based|Megaspeed,', highlights: ['Singapore-based'], size: 52, pos: 'lowerLeft', media: {src: 'scandal/sc17_singapore.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 33, kind: 'text', reveal: [2], text: 'a company that buys', highlights: [], size: 50, pos: 'upperRight', media: {src: 'scandal/sc18_buys.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Nvidia’s advanced|AI chips.', highlights: ['chips.'], size: 50, pos: 'left', media: {src: 'scandal/sc19_chips.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 72, kind: 'text', reveal: [2, 28], text: 'US intelligence|reportedly believes', highlights: ['intelligence'], size: 50, pos: 'lowerRight', media: {src: 'scandal/sc20_intel.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 32, kind: 'text', reveal: [2], text: 'she was recruited', highlights: ['recruited'], size: 52, pos: 'upperLeft', media: {src: 'scandal/sc21_recruited.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 80, kind: 'text', reveal: [2, 28], text: 'by China’s Ministry|of State Security', highlights: ['China's'], size: 44, pos: 'right', media: {src: 'scandal/sc22_mss.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 44, kind: 'text', reveal: [2], text: 'to gather information', highlights: ['information'], size: 52, pos: 'lower', media: {src: 'scandal/sc23_info.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 69, kind: 'text', reveal: [2, 28], text: 'and potentially|influence access', highlights: ['influence'], size: 50, pos: 'upperRight', media: {src: 'scandal/sc24_influence.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 67, kind: 'text', reveal: [2, 28], text: 'to American|AI technology.', highlights: ['technology.'], size: 50, pos: 'lowerLeft', media: {src: 'scandal/sc25_aitech.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 55, kind: 'text', reveal: [2, 28], text: 'According to reports,|Jensen Huang', highlights: [], size: 48, pos: 'left', media: {src: 'scandal/sc26_reports.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 57, kind: 'text', reveal: [2, 28], text: 'had a close|personal relationship', highlights: ['relationship'], size: 48, pos: 'right', media: {src: 'scandal/sc27_relationship.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 40, kind: 'text', reveal: [2], text: 'with Alice Huang.', highlights: [], size: 52, pos: 'lowerRight', media: {src: 'scandal/sc28_alice2.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 34, kind: 'text', reveal: [2], text: 'On November 8,', highlights: ['November'], size: 52, pos: 'upperLeft', media: {src: 'scandal/sc29_nov8.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 84, kind: 'text', reveal: [2, 28], text: 'he acknowledged being|unfaithful to his wife', highlights: ['unfaithful'], size: 44, pos: 'right', media: {src: 'scandal/sc30_unfaithful.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 60, kind: 'text', reveal: [2, 28], text: 'in a message to|Nvidia employees', highlights: [], size: 44, pos: 'upperRight', media: {src: 'scandal/sc31_message.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 91, kind: 'text', reveal: [2, 28], text: 'and apologized to his|family and colleagues.', highlights: ['apologized'], size: 44, pos: 'left', media: {src: 'scandal/sc32_apology.jpg', type: 'img', effect: 'in'}},
  // 33
  {dur: 47, kind: 'text', reveal: [2, 28], text: 'Nvidia’s board|has now launched', highlights: ['board'], size: 48, pos: 'lowerLeft', media: {src: 'scandal/sc33_board.jpg', type: 'img', effect: 'in'}},
  // 34
  {dur: 53, kind: 'text', reveal: [2, 28], text: 'an independent|investigation,', highlights: ['independent'], size: 52, pos: 'upper', media: {src: 'scandal/sc34_investigation.jpg', type: 'img', effect: 'in'}},
  // 35
  {dur: 64, kind: 'text', reveal: [2, 28], text: 'involving outside|legal counsel,', highlights: ['legal'], size: 50, pos: 'right', media: {src: 'scandal/sc35_legal.jpg', type: 'img', effect: 'in'}},
  // 36
  {dur: 91, kind: 'text', reveal: [2, 28], text: 'to examine whether|its CEO was targeted', highlights: ['targeted'], size: 44, pos: 'lowerRight', media: {src: 'scandal/sc36_examine.jpg', type: 'img', effect: 'in'}},
  // 37
  {dur: 65, kind: 'text', reveal: [2, 28], text: 'by a foreign|intelligence operation.', highlights: ['foreign'], size: 48, pos: 'upperLeft', media: {src: 'scandal/sc37_foreign.jpg', type: 'img', effect: 'in'}},
  // 38
  {dur: 59, kind: 'text', reveal: [2, 28], text: 'The investigation|could have serious', highlights: [], size: 48, pos: 'left', media: {src: 'scandal/sc38_serious.jpg', type: 'img', effect: 'in'}},
  // 39
  {dur: 66, kind: 'text', reveal: [2, 28], text: 'implications for|Nvidia’s leadership,', highlights: ['leadership,'], size: 50, pos: 'lowerRight', media: {src: 'scandal/sc39_leadership.jpg', type: 'img', effect: 'in'}},
  // 40
  {dur: 45, kind: 'text', reveal: [2], text: 'investor confidence,', highlights: ['investor'], size: 52, pos: 'upperRight', media: {src: 'scandal/sc40_investor.jpg', type: 'img', effect: 'in'}},
  // 41
  {dur: 79, kind: 'text', reveal: [2, 28], text: 'and America’s efforts|to protect', highlights: ['protect'], size: 48, pos: 'right', media: {src: 'scandal/sc41_protect.jpg', type: 'img', effect: 'in'}},
  // 42
  {dur: 61, kind: 'text', reveal: [2], text: 'advanced AI technology', highlights: [], size: 52, pos: 'lowerLeft', media: {src: 'scandal/sc42_aiprotect.jpg', type: 'img', effect: 'in'}},
  // 43
  {dur: 87, kind: 'text', reveal: [2, 28], text: 'from foreign intelligence|operations.', highlights: ['foreign'], size: 50, pos: 'left', media: {src: 'scandal/sc43_foreignops.jpg', type: 'img', effect: 'in'}},
  // 44
  {dur: 67, kind: 'text', reveal: [2, 28], text: 'But Nvidia says|it has no reason', highlights: [], size: 44, pos: 'upperRight', media: {src: 'scandal/sc44_noreason.jpg', type: 'img', effect: 'in'}},
  // 45
  {dur: 46, kind: 'text', reveal: [2, 28], text: 'to believe|company secrets', highlights: ['secrets'], size: 50, pos: 'lower', media: {src: 'scandal/sc45_secrets.jpg', type: 'img', effect: 'in'}},
  // 46
  {dur: 82, kind: 'text', reveal: [2, 28], text: 'or national security|information were compromised.', highlights: ['national'], size: 44, pos: 'right', media: {src: 'scandal/sc46_natsec.jpg', type: 'img', effect: 'in'}},
  // 47
  {dur: 111, kind: 'text', reveal: [2, 28], text: 'The alleged espionage|remains under investigation,', highlights: ['espionage'], size: 44, pos: 'upperLeft', media: {src: 'scandal/sc47_espionage.jpg', type: 'img', effect: 'in'}},
  // 48
  {dur: 69, kind: 'text', reveal: [2, 28], text: 'and the company says|it has confidence', highlights: ['confidence'], size: 44, pos: 'lowerRight', media: {src: 'scandal/sc48_confidence.jpg', type: 'img', effect: 'in'}},
  // 49
  {dur: 48, kind: 'text', reveal: [2], text: 'in Huang’s leadership.', highlights: ['leadership.'], size: 52, pos: 'left', media: {src: 'scandal/sc49_huangleader.jpg', type: 'img', effect: 'in'}},
  // 50
  {dur: 26, kind: 'text', reveal: [2], text: 'So what do you think?', highlights: [], size: 46, pos: 'upperRight', media: {src: 'scandal/sc50_think.jpg', type: 'img', effect: 'in'}},
  // 51
  {dur: 84, kind: 'text', reveal: [2, 28], text: 'Is this primarily|a personal scandal,', highlights: ['personal'], size: 44, pos: 'right', media: {src: 'scandal/sc51_personal.jpg', type: 'img', effect: 'in'}},
  // 52
  {dur: 43, kind: 'text', reveal: [2], text: 'or should the possibility', highlights: [], size: 50, pos: 'lowerLeft', media: {src: 'scandal/sc52_possibility.jpg', type: 'img', effect: 'in'}},
  // 53
  {dur: 67, kind: 'text', reveal: [2, 28], text: 'of a foreign|intelligence operation', highlights: ['foreign'], size: 48, pos: 'upperLeft', media: {src: 'scandal/sc53_foreignop.jpg', type: 'img', effect: 'in'}},
  // 54
  {dur: 129, kind: 'text', reveal: [2, 28], text: 'involving one of America’s|most powerful tech CEOs', highlights: ['powerful'], size: 44, pos: 'right', media: {src: 'scandal/sc54_powerful.jpg', type: 'img', effect: 'in'}},
  // 55
  {dur: 85, kind: 'text', reveal: [2, 28], text: 'raise serious national|security concerns?', highlights: ['security'], size: 48, pos: 'left', media: {src: 'scandal/sc55_security.jpg', type: 'img', effect: 'in'}},
  // 56 CTA
  {dur: 38, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Let me know|in the comments.', highlights: ['comments'], size: 46, media: {src: 'scandal/sc56_comments.jpg', type: 'img', effect: 'in'}},
];


type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 431, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 3419, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The scandal</span>
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
export const ScandalReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('scandal/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('scandal/music.mp3')}
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
