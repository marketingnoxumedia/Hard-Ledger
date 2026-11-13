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
// "The tribute" reel (McGuinnReel) — a respectful OBITUARY / TRIBUTE news reel, entertainment / country-music topic,
// Hard Ledger house VISUAL format. TOPIC: COUNTRY MUSIC loses singer-songwriter MARK McGUINN at 58, and the story behind
// his unexpected hit. Born in Greensboro, North Carolina, he first pursued pro soccer; after a knee injury he moved to
// Nashville in 1994 to write songs. His 2001 breakthrough "Mrs. Steven Rudy" hit No. 6 on Billboard's country chart and
// No. 44 on the all-genre Hot 100. He was more than a one-hit act: he co-wrote "Unusually Unusual" (recorded by Lonestar)
// and "You and Me and Time" (recorded by George Jones). He later stepped back to focus on family; a second album, "One
// Man's Crazy," arrived in 2006, but the early hit defined his place. His death was reported in November; his obituary says
// he passed on October 26 in Greensboro, cause not publicly disclosed. Close invites viewers to remember the song and name
// a 2000s country artist who deserves more recognition.
// TONE: this is an OBITUARY — warm, somber and respectful, NOT clickbait. The single red beat is deliberately
// TRIBUTE-POSITIVE ("More than / one hit." — his legacy beyond one song), NOT a sensational take on his death.
// NOTE ON VOICE: built VERBATIM from a client-supplied script in the influencer "curiosity-gap" format, NOT the faceless
// house voice — it uses an EARLY "follow for more" CTA and CLOSES on the debate questions ("...more recognition today?").
// Per the saved house preference, captions are <=5-6 words/beat with LARGER on-screen type (Anton 42-52). 54 beats. 3 stat
// cards: AT JUST 58 YEARS OLD, REACHED No. 6 BILLBOARD COUNTRY, AND No. 44 HOT 100 (the years 1994 / 2001 / 2006 and the
// date Oct 26 stay in-caption). 1 red impact at the legacy pivot ("More than / one hit."), no black beat. Captions match the
// VO verbatim (all names, song titles and places stay in-caption). Durations/reveals/SFX locked to the VO via a scribe_v1
// word-timestamp anchor pass (public/mcguinn/voiceover.mp3). Built at the house +10% pacing default; its own warm, somber,
// reflective country/acoustic music bed mixed at 0.2. OWN distinct footage under public/mcguinn/ (53 stills), NO reuse —
// ledger-checked.
// FOOTAGE is strictly BRAND-FREE and FACE-FREE — NO Mark McGuinn / Lonestar / George Jones likeness or ANY identifiable
// real face, NO Billboard / record-label logo, NO album art / song-title / chart text, NO readable sign / screen text, NO
// national flag, NO readable currency. Metaphor-led country-music / songwriting / memorial b-roll only: an acoustic guitar
// and a lone microphone on a dim stage, warm stage lights and an empty spotlit stage, a vinyl record and sheet music / a
// pen writing lyrics, a soccer ball and cleats on grass and a wrapped knee for the soccer/injury beats, a Nashville-style
// warm-neon street (NO readable signs) and a guitar case, a rising chart line for the chart beats, two guitars / a
// songwriter's desk for the co-writes, a quiet family home / a porch at dusk for stepping back, a dim calendar for the
// dates, a single candle / a lit match / flowers / an empty chair / a sunset for the memorial and close, a blank-screen
// phone for the FOLLOW CTA.
// **SENSITIVE (a real person's death) AND UNVERIFIED — this is an obituary for a REAL, named individual (Mark McGuinn) with
// specific biographical and chart claims (age 58, Greensboro NC, Nashville 1994, "Mrs. Steven Rudy" 2001 — No. 6 country /
// No. 44 Hot 100, co-writes for Lonestar and George Jones, "One Man's Crazy" 2006, died October 26). Rendered VERBATIM and
// respectfully as supplied, but the death, the date, the ages and every chart/credit claim MUST be fact-checked against
// primary sources (the published obituary, Billboard chart archives, reputable reporting) before publishing. No likeness is
// used. Handle with appropriate sensitivity for the family.**
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 42, kind: 'hook', reveal: [3, 40], text: 'Country music|has lost', kicker: 'The tribute', highlights: [], size: 54, media: {src: 'mcguinn/mg00_haslost.jpg', type: 'img', effect: 'in'}},
  // 1
  {dur: 73, kind: 'text', reveal: [2, 28], text: 'a singer-songwriter|whose biggest hit', highlights: ['biggest'], size: 48, pos: 'upperRight', media: {src: 'mcguinn/mg01_songwriter.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'became one of the|memorable songs', highlights: ['memorable'], size: 44, pos: 'left', media: {src: 'mcguinn/mg02_memorable.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 48, kind: 'text', reveal: [2], text: 'of the early 2000s.', highlights: ['2000s.'], size: 50, pos: 'lowerRight', media: {src: 'mcguinn/mg03_early2000s.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 52, kind: 'text', reveal: [2], text: 'Mark McGuinn has died', highlights: ['McGuinn'], size: 50, pos: 'upperLeft', media: {src: 'mcguinn/mg04_died.jpg', type: 'img', effect: 'in'}},
  // 5 CARD
  {dur: 46, kind: 'stat', stat: {pre: 'AT JUST', value: 58, post: 'YEARS OLD'}, media: {src: 'mcguinn/mg05_card58.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 58, kind: 'text', reveal: [2, 28], text: 'But what makes|his story unusual', highlights: ['unusual'], size: 44, pos: 'right', media: {src: 'mcguinn/mg06_unusual.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 38, kind: 'text', reveal: [2], text: 'is that his breakthrough', highlights: ['breakthrough'], size: 50, pos: 'lower', media: {src: 'mcguinn/mg07_breakthrough.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 53, kind: 'text', reveal: [2], text: 'almost happened by accident,', highlights: ['accident,'], size: 50, pos: 'lowerLeft', media: {src: 'mcguinn/mg08_accident.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 27, kind: 'text', reveal: [2], text: 'and his influence', highlights: ['influence'], size: 52, pos: 'upperRight', media: {src: 'mcguinn/mg09_influence.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 86, kind: 'text', reveal: [2, 28], text: 'went far beyond|his own recordings.', highlights: ['beyond'], size: 44, pos: 'left', media: {src: 'mcguinn/mg10_recordings.jpg', type: 'img', effect: 'in'}},
  // 11 FOLLOW
  {dur: 74, kind: 'text', reveal: [2], text: 'Follow for more entertainment|and music news.', highlights: ['follow'], size: 44, pos: 'right', media: {src: 'mcguinn/mg11_follow.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 59, kind: 'text', reveal: [2, 28], text: 'McGuinn was born|in Greensboro,', highlights: ['Greensboro,'], size: 48, pos: 'upperLeft', media: {src: 'mcguinn/mg12_greensboro.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 29, kind: 'text', reveal: [2], text: 'North Carolina,', highlights: [], size: 52, pos: 'lowerRight', media: {src: 'mcguinn/mg13_ncarolina.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 34, kind: 'text', reveal: [2], text: 'and originally pursued', highlights: ['originally'], size: 52, pos: 'upper', media: {src: 'mcguinn/mg14_pursued.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 40, kind: 'text', reveal: [2], text: 'professional soccer.', highlights: ['soccer.'], size: 52, pos: 'left', media: {src: 'mcguinn/mg15_soccer.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 37, kind: 'text', reveal: [2], text: 'After a knee injury', highlights: ['knee'], size: 50, pos: 'right', media: {src: 'mcguinn/mg16_knee.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 30, kind: 'text', reveal: [2], text: 'ended that dream,', highlights: ['dream,'], size: 52, pos: 'lowerLeft', media: {src: 'mcguinn/mg17_dream.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 32, kind: 'text', reveal: [2], text: 'he moved to Nashville', highlights: ['Nashville'], size: 50, pos: 'upperRight', media: {src: 'mcguinn/mg18_nashville.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 41, kind: 'text', reveal: [2], text: 'in 1994', highlights: ['1994'], size: 52, pos: 'left', media: {src: 'mcguinn/mg19_1994.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 42, kind: 'text', reveal: [2], text: 'to focus on songwriting.', highlights: ['songwriting.'], size: 50, pos: 'lowerRight', media: {src: 'mcguinn/mg20_songwriting.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 70, kind: 'text', reveal: [2], text: 'His breakthrough came in 2001', highlights: ['2001'], size: 46, pos: 'upperLeft', media: {src: 'mcguinn/mg21_2001.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 46, kind: 'text', reveal: [2], text: 'with Mrs. Steven Rudy.', highlights: ['Rudy.'], size: 50, pos: 'right', media: {src: 'mcguinn/mg22_rudy.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 26, kind: 'text', reveal: [2], text: 'The song reached', highlights: [], size: 52, pos: 'lower', media: {src: 'mcguinn/mg23_reached.jpg', type: 'img', effect: 'in'}},
  // 24 CARD
  {dur: 40, kind: 'stat', stat: {pre: 'REACHED No.', value: 6, post: 'BILLBOARD COUNTRY'}, media: {src: 'mcguinn/mg24_card6.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 26, kind: 'text', reveal: [2], text: 'on Billboard’s country chart', highlights: ['Billboard’s'], size: 50, pos: 'upperRight', media: {src: 'mcguinn/mg25_billboard.jpg', type: 'img', effect: 'in'}},
  // 26 CARD
  {dur: 39, kind: 'stat', stat: {pre: 'AND No.', value: 44, post: 'HOT 100'}, media: {src: 'mcguinn/mg26_card44.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 56, kind: 'text', reveal: [2], text: 'on the all-genre Hot 100.', highlights: ['Hot'], size: 46, pos: 'lowerLeft', media: {src: 'mcguinn/mg27_hot100.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 41, kind: 'text', reveal: [2], text: 'But McGuinn wasn’t just', highlights: [], size: 50, pos: 'left', media: {src: 'mcguinn/mg28_wasntjust.jpg', type: 'img', effect: 'in'}},
  // 29 RED
  {dur: 38, kind: 'impact', redBg: true, text: 'More than|one hit.'},
  // 30
  {dur: 66, kind: 'text', reveal: [2, 28], text: 'He co-wrote|Unusually Unusual,', highlights: ['co-wrote'], size: 50, pos: 'right', media: {src: 'mcguinn/mg30_cowrote.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 54, kind: 'text', reveal: [2], text: 'recorded by Lonestar,', highlights: ['Lonestar,'], size: 52, pos: 'lowerRight', media: {src: 'mcguinn/mg31_lonestar.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 72, kind: 'text', reveal: [2], text: 'and You and Me and Time,', highlights: [], size: 42, pos: 'upperLeft', media: {src: 'mcguinn/mg32_youandme.jpg', type: 'img', effect: 'in'}},
  // 33
  {dur: 54, kind: 'text', reveal: [2], text: 'recorded by country legend', highlights: ['legend'], size: 50, pos: 'right', media: {src: 'mcguinn/mg33_legend.jpg', type: 'img', effect: 'in'}},
  // 34
  {dur: 34, kind: 'text', reveal: [2], text: 'George Jones.', highlights: ['Jones.'], size: 52, pos: 'upperRight', media: {src: 'mcguinn/mg34_georgejones.jpg', type: 'img', effect: 'in'}},
  // 35
  {dur: 47, kind: 'text', reveal: [2], text: 'He eventually stepped away', highlights: ['stepped'], size: 50, pos: 'left', media: {src: 'mcguinn/mg35_steppedaway.jpg', type: 'img', effect: 'in'}},
  // 36
  {dur: 39, kind: 'text', reveal: [2], text: 'from the national spotlight', highlights: ['spotlight'], size: 50, pos: 'lowerLeft', media: {src: 'mcguinn/mg36_spotlight.jpg', type: 'img', effect: 'in'}},
  // 37
  {dur: 46, kind: 'text', reveal: [2], text: 'to focus on his family.', highlights: ['family.'], size: 46, pos: 'upper', media: {src: 'mcguinn/mg37_family.jpg', type: 'img', effect: 'in'}},
  // 38
  {dur: 30, kind: 'text', reveal: [2], text: 'His second album,', highlights: [], size: 52, pos: 'right', media: {src: 'mcguinn/mg38_secondalbum.jpg', type: 'img', effect: 'in'}},
  // 39
  {dur: 96, kind: 'text', reveal: [2, 28], text: 'One Man’s Crazy,|arrived in 2006,', highlights: ['2006,'], size: 44, pos: 'lowerRight', media: {src: 'mcguinn/mg39_2006.jpg', type: 'img', effect: 'in'}},
  // 40
  {dur: 26, kind: 'text', reveal: [2], text: 'but his early hit', highlights: [], size: 50, pos: 'upperLeft', media: {src: 'mcguinn/mg40_earlyhit.jpg', type: 'img', effect: 'in'}},
  // 41
  {dur: 58, kind: 'text', reveal: [2], text: 'continued to define his place', highlights: ['define'], size: 46, pos: 'left', media: {src: 'mcguinn/mg41_define.jpg', type: 'img', effect: 'in'}},
  // 42
  {dur: 41, kind: 'text', reveal: [2], text: 'in country music.', highlights: [], size: 52, pos: 'lowerRight', media: {src: 'mcguinn/mg42_countrymusic.jpg', type: 'img', effect: 'in'}},
  // 43
  {dur: 62, kind: 'text', reveal: [2, 28], text: 'His death was reported|in November,', highlights: ['November,'], size: 44, pos: 'upperRight', media: {src: 'mcguinn/mg43_november.jpg', type: 'img', effect: 'in'}},
  // 44
  {dur: 46, kind: 'text', reveal: [2], text: 'but his obituary says', highlights: ['obituary'], size: 50, pos: 'right', media: {src: 'mcguinn/mg44_obituary.jpg', type: 'img', effect: 'in'}},
  // 45
  {dur: 51, kind: 'text', reveal: [2], text: 'he actually passed away', highlights: ['passed'], size: 50, pos: 'lowerLeft', media: {src: 'mcguinn/mg45_passed.jpg', type: 'img', effect: 'in'}},
  // 46
  {dur: 76, kind: 'text', reveal: [2, 28], text: 'on October 26|in Greensboro.', highlights: ['October'], size: 48, pos: 'left', media: {src: 'mcguinn/mg46_october26.jpg', type: 'img', effect: 'in'}},
  // 47
  {dur: 28, kind: 'text', reveal: [2], text: 'His family has not', highlights: [], size: 50, pos: 'upperRight', media: {src: 'mcguinn/mg47_familynot.jpg', type: 'img', effect: 'in'}},
  // 48
  {dur: 76, kind: 'text', reveal: [2, 28], text: 'publicly disclosed|the cause of death.', highlights: ['cause'], size: 44, pos: 'lower', media: {src: 'mcguinn/mg48_cause.jpg', type: 'img', effect: 'in'}},
  // 49
  {dur: 53, kind: 'text', reveal: [2, 28], text: 'Do you remember|Mrs. Steven Rudy?', highlights: ['remember'], size: 44, pos: 'right', media: {src: 'mcguinn/mg49_remember.jpg', type: 'img', effect: 'in'}},
  // 50
  {dur: 39, kind: 'text', reveal: [2], text: 'And which country artist', highlights: ['artist'], size: 50, pos: 'upperLeft', media: {src: 'mcguinn/mg50_artist.jpg', type: 'img', effect: 'in'}},
  // 51
  {dur: 27, kind: 'text', reveal: [2], text: 'from the 2000s', highlights: [], size: 52, pos: 'lowerRight', media: {src: 'mcguinn/mg51_from2000s.jpg', type: 'img', effect: 'in'}},
  // 52
  {dur: 31, kind: 'text', reveal: [2], text: 'do you think deserves', highlights: ['deserves'], size: 50, pos: 'left', media: {src: 'mcguinn/mg52_deserves.jpg', type: 'img', effect: 'in'}},
  // 53 CTA
  {dur: 41, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'more recognition today?', highlights: ['recognition'], size: 54, media: {src: 'mcguinn/mg53_recognition.jpg', type: 'img', effect: 'in'}},
];


type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 285, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1153, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1219, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1355, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 2545, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The tribute</span>
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
export const McGuinnReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('mcguinn/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('mcguinn/music.mp3')}
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
