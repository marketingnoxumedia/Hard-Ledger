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
// "The ouster" reel (OustReel) — fast TECHNOLOGY / CORPORATE / MARKETS news reel, Hard Ledger house VISUAL format.
// TOPIC: NVIDIA could LOSE JENSEN HUANG — his own board is reportedly weighing REMOVING him as CEO, and Wall Street is
// already reacting. Huang co-founded Nvidia in 1993 and drove its shift from a graphics-chip maker into the center of the
// AI boom. The controversy: reports link him to Alice Huang, a former exec at Singapore-based Megaspeed whom U.S.
// intelligence reportedly suspects of acting as a Chinese intelligence asset; Huang acknowledged being unfaithful to his
// wife. A second report alleges a relationship with Nvidia healthcare exec Kimberly Powell (who reportedly reports to him),
// after which the WSJ said Nvidia's board was preparing to meet to determine his future. Markets reacted: Nvidia shares
// fell ~8% after-hours, raising leadership-continuity questions after 30+ years at the helm. Nvidia says an independent
// probe is underway; the board previously said it had no reason to believe secrets or national security were compromised,
// and China rejected the espionage allegations. Debate: can Nvidia keep its AI momentum without Huang, or is its success
// too tied to one person?
// THIRD reel in the Nvidia / Huang saga — the BOARD-OUSTER + STOCK-DROP + Kimberly-Powell escalation. Distinct STANDALONE
// from ScandalReel (the affair + Alice-Huang / Megaspeed spy story) and PressureReel (the Trump / Congress angle); its own
// folder + footage, no asset shared with either (ledger-checked).
// NOTE ON VOICE: built VERBATIM from a client-supplied script in the influencer "curiosity-gap" format, NOT the faceless
// house voice — it uses an EARLY "follow for more" CTA and CLOSES on the debate question "...tied to one person?".
// Per the saved house preference, captions are <=5-6 words/beat with LARGER on-screen type (Anton 42-52). 63 beats. 1 stat
// card: -8% AFTER HOURS (the one hard figure the script states; the year 1993 and "three decades" stay in-caption). 1 red
// impact at the CONTROVERSY pivot ("Had been / compromised."), no black beat. Captions match the VO verbatim (all names
// stay in-caption). Durations/reveals/SFX locked to the VO via a scribe_v1 word-timestamp anchor pass
// (public/oust/voiceover.mp3). Built at the house +10% pacing default; its own tense corporate/markets music mixed at 0.2.
// OWN distinct footage under public/oust/ (62 stills), NO reuse of any other reel's clips — ledger-checked.
// FOOTAGE is strictly BRAND-FREE and FACE-FREE — NO Jensen Huang / Alice Huang / Kimberly Powell likeness or ANY
// identifiable real face, NO Nvidia / Megaspeed / Wall Street Journal / any company or publication logo or wordmark, NO
// product/chip branding, NO readable ticker / sign / screen / headline text, NO national flag, NO readable currency.
// Metaphor-led corporate / boardroom / markets / espionage b-roll only: an empty boardroom and an empty executive chair for
// the ouster, a lone silhouette at a window / an empty podium for the CEO, a generic glowing AI chip / server racks for the
// company, a RED falling chart for the -8% drop, a gavel / an investigation / a case file for the probe, a shadowed figure
// / surveillance / a keyhole for the espionage, two shadows / a crack for the relationships, a corporate tower for Nvidia, a
// blank-screen phone for the FOLLOW CTA, a question mark and a crossroads for the unknowns.
// **UNVERIFIED AND HIGHLY SENSITIVE — names REAL, LIVING people (Jensen Huang, Alice Huang, Kimberly Powell) and makes
// serious claims: an alleged board move to remove a sitting CEO, two alleged affairs, suspected espionage, and a specific
// ~8% stock move. Rendered VERBATIM as supplied, with the script's hedges ("reportedly", "alleging", "suspect") preserved.
// Every claim, the reported board action, the relationships, the espionage suspicion and the stock figure MUST be
// fact-checked against primary sources (the WSJ report, Nvidia's official statements / SEC filings, live market data)
// before publishing, and the DEFAMATION / accuracy / market-sensitivity risk reviewed by the client. No likeness of any
// person is used. This is general news information, NOT investment advice.**
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 70, kind: 'hook', reveal: [3, 40], text: 'The man who|built Nvidia', kicker: 'The ouster', highlights: [], size: 52, media: {src: 'oust/ou00_builder.jpg', type: 'img', effect: 'in'}},
  // 1
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'into the world’s|AI chip powerhouse', highlights: ['powerhouse'], size: 44, pos: 'upperRight', media: {src: 'oust/ou01_powerhouse.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 70, kind: 'text', reveal: [2], text: 'could be facing', highlights: [], size: 52, pos: 'left', media: {src: 'oust/ou02_facing.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'the biggest crisis|of his career.', highlights: ['crisis'], size: 44, pos: 'lowerRight', media: {src: 'oust/ou03_crisis.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 70, kind: 'text', reveal: [2], text: 'And now, his own board', highlights: ['board'], size: 46, pos: 'upperLeft', media: {src: 'oust/ou04_board.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 70, kind: 'text', reveal: [2], text: 'is reportedly considering', highlights: ['reportedly'], size: 52, pos: 'right', media: {src: 'oust/ou05_considering.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 70, kind: 'text', reveal: [2], text: 'removing him as CEO.', highlights: ['removing'], size: 50, pos: 'lower', media: {src: 'oust/ou06_removing.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 70, kind: 'text', reveal: [2], text: 'But this isn’t just', highlights: [], size: 50, pos: 'lowerLeft', media: {src: 'oust/ou07_notjust.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 70, kind: 'text', reveal: [2], text: 'about personal controversy.', highlights: ['controversy.'], size: 52, pos: 'upperRight', media: {src: 'oust/ou08_personal.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'The allegations have|raised questions', highlights: ['questions'], size: 48, pos: 'left', media: {src: 'oust/ou09_questions.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 70, kind: 'text', reveal: [2], text: 'about corporate leadership,', highlights: ['leadership,'], size: 52, pos: 'right', media: {src: 'oust/ou10_leadership.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 70, kind: 'text', reveal: [2], text: 'national security,', highlights: ['security,'], size: 52, pos: 'upperLeft', media: {src: 'oust/ou11_natsec.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 70, kind: 'text', reveal: [2], text: 'and the future of one', highlights: [], size: 46, pos: 'lowerRight', media: {src: 'oust/ou12_future.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'of the world’s most|valuable technology companies.', highlights: ['valuable'], size: 44, pos: 'upper', media: {src: 'oust/ou13_valuable.jpg', type: 'img', effect: 'in'}},
  // 14 FOLLOW
  {dur: 70, kind: 'text', reveal: [2], text: 'Follow for more breaking|technology and business news.', highlights: ['follow'], size: 44, pos: 'left', media: {src: 'oust/ou14_follow.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 70, kind: 'text', reveal: [2], text: 'Jensen Huang co-founded', highlights: ['Jensen'], size: 52, pos: 'right', media: {src: 'oust/ou15_cofounded.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 70, kind: 'text', reveal: [2], text: 'Nvidia in 1993', highlights: ['1993'], size: 52, pos: 'lowerLeft', media: {src: 'oust/ou16_1993.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 70, kind: 'text', reveal: [2], text: 'and has led the company', highlights: [], size: 46, pos: 'upperRight', media: {src: 'oust/ou17_led.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 70, kind: 'text', reveal: [2], text: 'through its transformation', highlights: ['transformation'], size: 52, pos: 'left', media: {src: 'oust/ou18_transform.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 70, kind: 'text', reveal: [2], text: 'from a graphics-chip maker', highlights: ['graphics-chip'], size: 50, pos: 'lowerRight', media: {src: 'oust/ou19_graphics.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 70, kind: 'text', reveal: [2], text: 'into a central player', highlights: ['central'], size: 50, pos: 'upperLeft', media: {src: 'oust/ou20_central.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'in the artificial|intelligence boom.', highlights: ['boom.'], size: 48, pos: 'right', media: {src: 'oust/ou21_aiboom.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 70, kind: 'text', reveal: [2], text: 'The controversy began', highlights: ['controversy'], size: 52, pos: 'lower', media: {src: 'oust/ou22_began.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 70, kind: 'text', reveal: [2], text: 'after reports linked Huang', highlights: ['linked'], size: 50, pos: 'upperRight', media: {src: 'oust/ou23_linked.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 70, kind: 'text', reveal: [2], text: 'to Alice Huang,', highlights: ['Alice'], size: 52, pos: 'lowerLeft', media: {src: 'oust/ou24_alice.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 70, kind: 'text', reveal: [2], text: 'a former executive', highlights: [], size: 52, pos: 'left', media: {src: 'oust/ou25_exec.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 70, kind: 'text', reveal: [2], text: 'at Singapore-based Megaspeed,', highlights: ['Megaspeed,'], size: 52, pos: 'right', media: {src: 'oust/ou26_megaspeed.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 70, kind: 'text', reveal: [2], text: 'who U.S. intelligence officials', highlights: ['intelligence'], size: 50, pos: 'lowerRight', media: {src: 'oust/ou27_intel.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'reportedly suspect|of acting as', highlights: ['suspect'], size: 48, pos: 'upperLeft', media: {src: 'oust/ou28_suspect.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'a Chinese|intelligence asset.', highlights: ['Chinese'], size: 50, pos: 'right', media: {src: 'oust/ou29_asset.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 70, kind: 'text', reveal: [2], text: 'Huang later acknowledged', highlights: ['acknowledged'], size: 52, pos: 'upperRight', media: {src: 'oust/ou30_acknowledged.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'being unfaithful|to his wife.', highlights: ['unfaithful'], size: 48, pos: 'left', media: {src: 'oust/ou31_unfaithful.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 70, kind: 'text', reveal: [2], text: 'Then came another report', highlights: ['another'], size: 50, pos: 'lowerLeft', media: {src: 'oust/ou32_anotherreport.jpg', type: 'img', effect: 'in'}},
  // 33
  {dur: 70, kind: 'text', reveal: [2], text: 'alleging a relationship', highlights: ['relationship'], size: 52, pos: 'upper', media: {src: 'oust/ou33_relationship.jpg', type: 'img', effect: 'in'}},
  // 34
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'with Nvidia healthcare|executive Kimberly Powell,', highlights: ['Kimberly'], size: 44, pos: 'right', media: {src: 'oust/ou34_kimberly.jpg', type: 'img', effect: 'in'}},
  // 35
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'who reportedly|reports to him.', highlights: ['reports'], size: 48, pos: 'lowerRight', media: {src: 'oust/ou35_reportsto.jpg', type: 'img', effect: 'in'}},
  // 36
  {dur: 70, kind: 'text', reveal: [2], text: 'Following that report,', highlights: [], size: 52, pos: 'upperLeft', media: {src: 'oust/ou36_following.jpg', type: 'img', effect: 'in'}},
  // 37
  {dur: 70, kind: 'text', reveal: [2], text: 'The Wall Street Journal said', highlights: ['Journal'], size: 46, pos: 'left', media: {src: 'oust/ou37_wsj.jpg', type: 'img', effect: 'in'}},
  // 38
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Nvidia’s board|was preparing to meet', highlights: ['preparing'], size: 44, pos: 'lowerRight', media: {src: 'oust/ou38_meet.jpg', type: 'img', effect: 'in'}},
  // 39
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'to determine|Huang’s future.', highlights: ['future.'], size: 50, pos: 'upperRight', media: {src: 'oust/ou39_determine.jpg', type: 'img', effect: 'in'}},
  // 40
  {dur: 70, kind: 'text', reveal: [2], text: 'Investors reacted immediately.', highlights: ['immediately.'], size: 52, pos: 'right', media: {src: 'oust/ou40_investors.jpg', type: 'img', effect: 'in'}},
  // 41
  {dur: 70, kind: 'text', reveal: [2], text: 'Nvidia shares fell', highlights: ['fell'], size: 52, pos: 'lowerLeft', media: {src: 'oust/ou41_sharesfell.jpg', type: 'img', effect: 'in'}},
  // 42 CARD
  {dur: 70, kind: 'stat', stat: {prefix: '-', value: 8, suffix: '%', post: 'AFTER HOURS'}, media: {src: 'oust/ou42_card8.jpg', type: 'img', effect: 'in'}},
  // 43
  {dur: 70, kind: 'text', reveal: [2], text: 'in after-hours trading.', highlights: [], size: 52, pos: 'left', media: {src: 'oust/ou43_afterhours.jpg', type: 'img', effect: 'in'}},
  // 44
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'The company is now|facing questions', highlights: ['questions'], size: 44, pos: 'upperRight', media: {src: 'oust/ou44_facingq.jpg', type: 'img', effect: 'in'}},
  // 45
  {dur: 70, kind: 'text', reveal: [2], text: 'about leadership continuity,', highlights: ['continuity,'], size: 52, pos: 'lower', media: {src: 'oust/ou45_continuity.jpg', type: 'img', effect: 'in'}},
  // 46
  {dur: 70, kind: 'text', reveal: [2], text: 'especially because Huang', highlights: [], size: 52, pos: 'right', media: {src: 'oust/ou46_especially.jpg', type: 'img', effect: 'in'}},
  // 47
  {dur: 70, kind: 'text', reveal: [2], text: 'has been at the helm', highlights: ['helm'], size: 46, pos: 'upperLeft', media: {src: 'oust/ou47_helm.jpg', type: 'img', effect: 'in'}},
  // 48
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'for more than|three decades.', highlights: ['three'], size: 48, pos: 'lowerRight', media: {src: 'oust/ou48_decades.jpg', type: 'img', effect: 'in'}},
  // 49
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Nvidia says an|independent investigation', highlights: ['independent'], size: 48, pos: 'left', media: {src: 'oust/ou49_probe.jpg', type: 'img', effect: 'in'}},
  // 50
  {dur: 70, kind: 'text', reveal: [2], text: 'is underway,', highlights: ['underway,'], size: 52, pos: 'upperRight', media: {src: 'oust/ou50_underway.jpg', type: 'img', effect: 'in'}},
  // 51
  {dur: 70, kind: 'text', reveal: [2], text: 'but the board previously', highlights: [], size: 50, pos: 'right', media: {src: 'oust/ou51_previously.jpg', type: 'img', effect: 'in'}},
  // 52
  {dur: 70, kind: 'text', reveal: [2], text: 'stated it had no reason', highlights: [], size: 46, pos: 'lowerLeft', media: {src: 'oust/ou52_noreason.jpg', type: 'img', effect: 'in'}},
  // 53
  {dur: 70, kind: 'text', reveal: [2], text: 'to believe company secrets', highlights: ['secrets'], size: 50, pos: 'upperLeft', media: {src: 'oust/ou53_secrets.jpg', type: 'img', effect: 'in'}},
  // 54
  {dur: 70, kind: 'text', reveal: [2], text: 'or national security', highlights: ['national'], size: 52, pos: 'right', media: {src: 'oust/ou54_natsec2.jpg', type: 'img', effect: 'in'}},
  // 55 RED
  {dur: 70, kind: 'impact', redBg: true, text: 'Had been|compromised.'},
  // 56
  {dur: 70, kind: 'text', reveal: [2], text: 'China has also rejected', highlights: ['rejected'], size: 50, pos: 'left', media: {src: 'oust/ou56_rejected.jpg', type: 'img', effect: 'in'}},
  // 57
  {dur: 70, kind: 'text', reveal: [2], text: 'the espionage allegations.', highlights: ['espionage'], size: 52, pos: 'lowerRight', media: {src: 'oust/ou57_espionage.jpg', type: 'img', effect: 'in'}},
  // 58
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'If Nvidia loses|Jensen Huang,', highlights: ['loses'], size: 48, pos: 'upperRight', media: {src: 'oust/ou58_loses.jpg', type: 'img', effect: 'in'}},
  // 59
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'could the company|maintain its momentum', highlights: ['momentum'], size: 44, pos: 'left', media: {src: 'oust/ou59_momentum.jpg', type: 'img', effect: 'in'}},
  // 60
  {dur: 70, kind: 'text', reveal: [2], text: 'in the AI race?', highlights: ['race?'], size: 50, pos: 'lowerRight', media: {src: 'oust/ou60_airace.jpg', type: 'img', effect: 'in'}},
  // 61
  {dur: 70, kind: 'text', reveal: [2], text: 'Or has its success', highlights: [], size: 50, pos: 'upperLeft', media: {src: 'oust/ou61_success.jpg', type: 'img', effect: 'in'}},
  // 62 CTA
  {dur: 70, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'become too closely tied|to one person?', highlights: ['person?'], size: 46, media: {src: 'oust/ou62_oneperson.jpg', type: 'img', effect: 'in'}},
];


type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The ouster</span>
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
export const OustReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('oust/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('oust/music.mp3')}
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
