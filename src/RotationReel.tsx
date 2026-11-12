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
// "The rotation" reel (RotationReel) — fast MARKETS / TECHNOLOGY news reel, Hard Ledger house VISUAL format.
// TOPIC: NVIDIA's leadership CRISIS is sending investors toward AMD and BROADCOM. As reports say Nvidia's board was
// preparing to remove CEO Jensen Huang over allegations of two extramarital affairs, rivals rallied: per Bloomberg, Nvidia
// shares dropped ~9% after-hours while AMD and Broadcom each gained more than 3%. The thesis is ROTATION / who-profits-next:
// AMD is Nvidia's closest rival in AI accelerators; Broadcom designs custom AI chips and networking for big cloud players;
// Alphabet is expanding its own TPU chip business. If customers reduce dependence on Nvidia, these competitors could
// capture more business and gradually reshape the AI-hardware market. THE CATCH (kept in the script): Nvidia's software
// ecosystem, hardware performance and customer relationships are hard to replace; switching suppliers is costly and slow; a
// leadership crisis does not automatically mean customers abandon Nvidia. Debate: a real opening for AMD/Broadcom, or will
// Nvidia stay too powerful to challenge?
// FOURTH reel touching the Nvidia / Huang crisis, but a DISTINCT thesis — the COMPETITOR-ROTATION / beneficiaries angle
// (AMD, Broadcom, Alphabet-TPU), not the ouster itself. Distinct STANDALONE from ScandalReel / PressureReel / OustReel (the
// Huang-crisis reels) and from AmdReel / ChipWarReel (the chip-rivalry reels); its own folder + footage, no asset shared
// with any of them (ledger-checked).
// NOTE ON VOICE: built VERBATIM from a client-supplied script in the influencer "curiosity-gap" format, NOT the faceless
// house voice — it uses an EARLY "follow for more" CTA and CLOSES on the debate question "Which company would you bet on?".
// Per the saved house preference, captions are <=5-6 words/beat with LARGER on-screen type (Anton 42-52). 60 beats. 2 stat
// cards: -9% NVIDIA AFTER HOURS and +3% AMD & BROADCOM EACH (per Bloomberg). 1 red impact at the CONTROVERSY pivot ("But
// there's / a catch."), no black beat. Captions match the VO verbatim (all names stay in-caption). Durations/reveals/SFX
// locked to the VO via a scribe_v1 word-timestamp anchor pass (public/rotation/voiceover.mp3). Built at the house +10%
// pacing default; its own tense markets/tech-news music mixed at 0.2. OWN distinct footage under public/rotation/ (59
// stills), NO reuse of any other reel's clips — ledger-checked.
// FOOTAGE is strictly BRAND-FREE and FACE-FREE — NO Nvidia / AMD / Broadcom / Alphabet / Google / Bloomberg or ANY company
// logo or wordmark, NO Jensen Huang likeness or ANY identifiable real face, NO product/chip branding, NO readable ticker /
// price / sign / screen / headline text, NO national flag, NO readable currency. Metaphor-led markets / semiconductor
// b-roll only: money/capital flowing from one pool toward others for the rotation, green rising vs red falling charts,
// generic chips / wafers / server racks, racers overtaking / a changing of the lead for the rivalry, a crossroads / a
// switch being thrown for switching suppliers, a fortress / a moat for Nvidia's hard-to-replace position, a balance scale
// and a question mark for the debate, a blank-screen phone for the FOLLOW CTA.
// **UNVERIFIED AND MARKET-SENSITIVE — names REAL public companies (Nvidia, AMD, Broadcom, Alphabet) and a REAL person
// (Jensen Huang), and cites specific moves (a reported board move to remove a CEO over alleged affairs; ~-9% Nvidia and
// +3% AMD/Broadcom per Bloomberg). Rendered VERBATIM as supplied, with the script's hedges ("reports claimed", "could")
// preserved. Every figure, the stock moves and the leadership claims MUST be fact-checked against primary sources
// (Bloomberg, company statements / SEC filings, live market data) before publishing, and the DEFAMATION / accuracy /
// market-sensitivity risk reviewed. No likeness of any person is used. This is general market information, NOT investment
// advice; the closing "which would you bet on" line is the client's engagement prompt, not a recommendation.**
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 81, kind: 'hook', reveal: [3, 40], text: 'Nvidia is facing|a leadership crisis,', kicker: 'The rotation', highlights: [], size: 48, media: {src: 'rotation/rt00_crisis.jpg', type: 'img', effect: 'in'}},
  // 1
  {dur: 55, kind: 'text', reveal: [2, 28], text: 'and two of its|biggest competitors', highlights: ['competitors'], size: 44, pos: 'upperRight', media: {src: 'rotation/rt01_competitors.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 38, kind: 'text', reveal: [2], text: 'are already benefiting.', highlights: ['benefiting.'], size: 52, pos: 'left', media: {src: 'rotation/rt02_benefiting.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 56, kind: 'text', reveal: [2, 28], text: 'AMD and Broadcom|shares jumped', highlights: ['jumped'], size: 48, pos: 'lowerRight', media: {src: 'rotation/rt03_jumped.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 45, kind: 'text', reveal: [2], text: 'as investors started looking', highlights: ['looking'], size: 50, pos: 'upperLeft', media: {src: 'rotation/rt04_looking.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 71, kind: 'text', reveal: [2, 28], text: 'for alternatives|to the AI chip giant.', highlights: ['alternatives'], size: 44, pos: 'right', media: {src: 'rotation/rt05_alternatives.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 52, kind: 'text', reveal: [2, 28], text: 'But this could be|about more', highlights: [], size: 44, pos: 'lower', media: {src: 'rotation/rt06_more.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 82, kind: 'text', reveal: [2, 28], text: 'than a temporary|stock market reaction.', highlights: ['temporary'], size: 44, pos: 'lowerLeft', media: {src: 'rotation/rt07_temporary.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 45, kind: 'text', reveal: [2], text: 'It could signal a shift', highlights: ['shift'], size: 46, pos: 'upperRight', media: {src: 'rotation/rt08_shift.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 31, kind: 'text', reveal: [2], text: 'in who gets to profit', highlights: ['profit'], size: 46, pos: 'left', media: {src: 'rotation/rt09_profit.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 76, kind: 'text', reveal: [2, 28], text: 'from the next phase|of the AI boom.', highlights: ['boom.'], size: 44, pos: 'right', media: {src: 'rotation/rt10_nextphase.jpg', type: 'img', effect: 'in'}},
  // 11 FOLLOW
  {dur: 111, kind: 'text', reveal: [2], text: 'Follow for more technology|and stock market news.', highlights: ['follow'], size: 44, pos: 'upperLeft', media: {src: 'rotation/rt11_follow.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 32, kind: 'text', reveal: [2], text: 'The turmoil began', highlights: ['turmoil'], size: 52, pos: 'lowerRight', media: {src: 'rotation/rt12_turmoil.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 32, kind: 'text', reveal: [2], text: 'after reports claimed', highlights: ['claimed'], size: 52, pos: 'upper', media: {src: 'rotation/rt13_claimed.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 51, kind: 'text', reveal: [2], text: 'Nvidia’s board was preparing', highlights: ['preparing'], size: 50, pos: 'left', media: {src: 'rotation/rt14_board.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 86, kind: 'text', reveal: [2], text: 'to remove CEO Jensen Huang', highlights: ['remove'], size: 46, pos: 'right', media: {src: 'rotation/rt15_remove.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 39, kind: 'text', reveal: [2], text: 'following allegations', highlights: ['allegations'], size: 52, pos: 'lowerLeft', media: {src: 'rotation/rt16_allegations.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 89, kind: 'text', reveal: [2, 28], text: 'involving two|extramarital affairs.', highlights: ['extramarital'], size: 50, pos: 'upperRight', media: {src: 'rotation/rt17_affairs.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 66, kind: 'text', reveal: [2, 28], text: 'The reports have|created uncertainty', highlights: ['uncertainty'], size: 48, pos: 'left', media: {src: 'rotation/rt18_uncertainty.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 31, kind: 'text', reveal: [2], text: 'around the leadership', highlights: [], size: 52, pos: 'lowerRight', media: {src: 'rotation/rt19_leadership.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 40, kind: 'text', reveal: [2], text: 'of one of the world’s most', highlights: [], size: 42, pos: 'upperLeft', media: {src: 'rotation/rt20_worldsmost.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 75, kind: 'text', reveal: [2], text: 'influential technology companies.', highlights: ['influential'], size: 52, pos: 'right', media: {src: 'rotation/rt21_influential.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 35, kind: 'text', reveal: [2], text: 'According to Bloomberg,', highlights: ['Bloomberg,'], size: 52, pos: 'lower', media: {src: 'rotation/rt22_bloomberg.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 35, kind: 'text', reveal: [2], text: 'Nvidia shares dropped', highlights: ['dropped'], size: 52, pos: 'upperRight', media: {src: 'rotation/rt23_dropped.jpg', type: 'img', effect: 'in'}},
  // 24 CARD
  {dur: 44, kind: 'stat', stat: {pre: 'NVIDIA', prefix: '-', value: 9, suffix: '%', post: 'AFTER HOURS'}, media: {src: 'rotation/rt24_card9.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 47, kind: 'text', reveal: [2], text: 'in after-hours trading,', highlights: [], size: 52, pos: 'lowerLeft', media: {src: 'rotation/rt25_afterhours.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 55, kind: 'text', reveal: [2], text: 'while AMD and Broadcom', highlights: ['AMD'], size: 50, pos: 'left', media: {src: 'rotation/rt26_amdbroadcom.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 26, kind: 'text', reveal: [2], text: 'each gained', highlights: [], size: 52, pos: 'right', media: {src: 'rotation/rt27_gained.jpg', type: 'img', effect: 'in'}},
  // 28 CARD
  {dur: 45, kind: 'stat', stat: {pre: 'AMD & BROADCOM', prefix: '+', value: 3, suffix: '%', post: 'EACH'}, media: {src: 'rotation/rt28_card3.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 61, kind: 'text', reveal: [2, 28], text: 'AMD is Nvidia’s|closest rival', highlights: ['closest'], size: 48, pos: 'lowerRight', media: {src: 'rotation/rt29_rival.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 43, kind: 'text', reveal: [2], text: 'in AI accelerators,', highlights: ['accelerators,'], size: 52, pos: 'upperLeft', media: {src: 'rotation/rt30_accelerators.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 45, kind: 'text', reveal: [2], text: 'while Broadcom designs', highlights: ['Broadcom'], size: 52, pos: 'right', media: {src: 'rotation/rt31_designs.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 37, kind: 'text', reveal: [2], text: 'custom AI chips', highlights: ['custom'], size: 52, pos: 'upperRight', media: {src: 'rotation/rt32_customchips.jpg', type: 'img', effect: 'in'}},
  // 33
  {dur: 48, kind: 'text', reveal: [2], text: 'and networking technology', highlights: ['networking'], size: 52, pos: 'left', media: {src: 'rotation/rt33_networking.jpg', type: 'img', effect: 'in'}},
  // 34
  {dur: 46, kind: 'text', reveal: [2], text: 'for major cloud companies.', highlights: ['cloud'], size: 50, pos: 'lowerLeft', media: {src: 'rotation/rt34_cloud.jpg', type: 'img', effect: 'in'}},
  // 35
  {dur: 66, kind: 'text', reveal: [2], text: 'Alphabet is also expanding', highlights: ['Alphabet'], size: 50, pos: 'upper', media: {src: 'rotation/rt35_alphabet.jpg', type: 'img', effect: 'in'}},
  // 36
  {dur: 66, kind: 'text', reveal: [2], text: 'its own AI chip business', highlights: [], size: 46, pos: 'right', media: {src: 'rotation/rt36_chipbusiness.jpg', type: 'img', effect: 'in'}},
  // 37
  {dur: 67, kind: 'text', reveal: [2, 28], text: 'through its Tensor|Processing Units.', highlights: ['Tensor'], size: 48, pos: 'lowerRight', media: {src: 'rotation/rt37_tpu.jpg', type: 'img', effect: 'in'}},
  // 38
  {dur: 50, kind: 'text', reveal: [2], text: 'If customers begin reducing', highlights: ['reducing'], size: 50, pos: 'upperLeft', media: {src: 'rotation/rt38_reducing.jpg', type: 'img', effect: 'in'}},
  // 39
  {dur: 60, kind: 'text', reveal: [2], text: 'their dependence on Nvidia,', highlights: ['dependence'], size: 50, pos: 'left', media: {src: 'rotation/rt39_dependence.jpg', type: 'img', effect: 'in'}},
  // 40
  {dur: 35, kind: 'text', reveal: [2], text: 'these competitors could', highlights: [], size: 52, pos: 'lowerRight', media: {src: 'rotation/rt40_couldcapture.jpg', type: 'img', effect: 'in'}},
  // 41
  {dur: 41, kind: 'text', reveal: [2], text: 'capture more business.', highlights: ['capture'], size: 52, pos: 'upperRight', media: {src: 'rotation/rt41_business.jpg', type: 'img', effect: 'in'}},
  // 42
  {dur: 57, kind: 'text', reveal: [2], text: 'That could gradually reshape', highlights: ['reshape'], size: 50, pos: 'right', media: {src: 'rotation/rt42_reshape.jpg', type: 'img', effect: 'in'}},
  // 43
  {dur: 50, kind: 'text', reveal: [2], text: 'the AI hardware market.', highlights: ['hardware'], size: 50, pos: 'lowerLeft', media: {src: 'rotation/rt43_market.jpg', type: 'img', effect: 'in'}},
  // 44 RED
  {dur: 38, kind: 'impact', redBg: true, text: 'But there’s|a catch.'},
  // 45
  {dur: 51, kind: 'text', reveal: [2], text: 'Nvidia’s software ecosystem,', highlights: ['ecosystem,'], size: 52, pos: 'left', media: {src: 'rotation/rt45_ecosystem.jpg', type: 'img', effect: 'in'}},
  // 46
  {dur: 35, kind: 'text', reveal: [2], text: 'hardware performance,', highlights: ['performance,'], size: 52, pos: 'upperRight', media: {src: 'rotation/rt46_performance.jpg', type: 'img', effect: 'in'}},
  // 47
  {dur: 48, kind: 'text', reveal: [2], text: 'and customer relationships', highlights: [], size: 52, pos: 'lower', media: {src: 'rotation/rt47_relationships.jpg', type: 'img', effect: 'in'}},
  // 48
  {dur: 58, kind: 'text', reveal: [2], text: 'are difficult to replace.', highlights: ['difficult'], size: 50, pos: 'right', media: {src: 'rotation/rt48_replace.jpg', type: 'img', effect: 'in'}},
  // 49
  {dur: 57, kind: 'text', reveal: [2, 28], text: 'Switching suppliers|is expensive', highlights: ['expensive'], size: 50, pos: 'upperLeft', media: {src: 'rotation/rt49_switching.jpg', type: 'img', effect: 'in'}},
  // 50
  {dur: 30, kind: 'text', reveal: [2], text: 'and takes time.', highlights: ['time.'], size: 52, pos: 'lowerRight', media: {src: 'rotation/rt50_time.jpg', type: 'img', effect: 'in'}},
  // 51
  {dur: 42, kind: 'text', reveal: [2], text: 'A leadership crisis', highlights: ['crisis'], size: 52, pos: 'left', media: {src: 'rotation/rt51_leadershipcrisis.jpg', type: 'img', effect: 'in'}},
  // 52
  {dur: 45, kind: 'text', reveal: [2], text: 'does not automatically mean', highlights: [], size: 50, pos: 'upperRight', media: {src: 'rotation/rt52_notautomatic.jpg', type: 'img', effect: 'in'}},
  // 53
  {dur: 72, kind: 'text', reveal: [2, 28], text: 'customers will|abandon Nvidia.', highlights: ['abandon'], size: 50, pos: 'right', media: {src: 'rotation/rt53_abandon.jpg', type: 'img', effect: 'in'}},
  // 54
  {dur: 46, kind: 'text', reveal: [2], text: 'Is this the beginning', highlights: [], size: 50, pos: 'lowerLeft', media: {src: 'rotation/rt54_beginning.jpg', type: 'img', effect: 'in'}},
  // 55
  {dur: 38, kind: 'text', reveal: [2], text: 'of a new opportunity', highlights: ['opportunity'], size: 50, pos: 'upperLeft', media: {src: 'rotation/rt55_opportunity.jpg', type: 'img', effect: 'in'}},
  // 56
  {dur: 51, kind: 'text', reveal: [2], text: 'for AMD and Broadcom,', highlights: [], size: 50, pos: 'right', media: {src: 'rotation/rt56_foramd.jpg', type: 'img', effect: 'in'}},
  // 57
  {dur: 45, kind: 'text', reveal: [2], text: 'or will Nvidia remain', highlights: [], size: 50, pos: 'left', media: {src: 'rotation/rt57_remain.jpg', type: 'img', effect: 'in'}},
  // 58
  {dur: 55, kind: 'text', reveal: [2], text: 'too powerful to challenge?', highlights: ['challenge?'], size: 50, pos: 'lowerRight', media: {src: 'rotation/rt58_challenge.jpg', type: 'img', effect: 'in'}},
  // 59 CTA
  {dur: 42, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Which company|would you bet on?', highlights: ['bet'], size: 46, media: {src: 'rotation/rt59_beton.jpg', type: 'img', effect: 'in'}},
];


type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 1354, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1526, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 2343, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 3054, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The rotation</span>
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
export const RotationReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('rotation/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('rotation/music.mp3')}
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
