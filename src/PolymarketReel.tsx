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
// "The Polymarket breach" reel (PolymarketReel) — Hard Ledger house VISUAL format, finance/tech-news topic. UNVERIFIED: cites chip stocks / Microsoft / Alphabet / Samsung capex figures.
// TOPIC: Russia and Ukraine agreed a rare LOCAL CEASEFIRE — a humanitarian window — that could let ~2,000 civilians
// trapped in the frontline city of Oleshky (on the Dnipro in southern Ukraine) escape; residents are reportedly cut
// off from food, medicine, power and water. Per the Financial Times, the US-backed deal has Russian forces clear
// mines from exit roads, with buses to evacuate and aid for those who stay. The complication: Pres. Zelenskyy
// warned evacuees could be routed through Crimea or Russia first, fearing Moscow shapes the war's narrative. Both
// sides accuse the other of obstructing aid; peace talks are expected to resume in Abu Dhabi — but a temporary
// pause is not the war ending. Debate: allow evacuations under international monitoring despite mutual distrust? can
// a local ceasefire be a stepping stone to wider peace?
// NOTE ON VOICE: built VERBATIM from a client-supplied script in the influencer "curiosity-gap" format (like the
// other news reels), NOT the faceless house voice — it NAMES Russia / Ukraine / Oleshky / Zelenskyy / Financial
// Times, uses an EARLY "follow for more" CTA, and CLOSES on a "share your thoughts in the comments" debate CTA. The
// client's standing choice is "build verbatim." The red beat poses the would-you-rather (stepping stone to peace?).
// 39 beats. 1 stat card: AROUND 2,000 CIVILIANS TRAPPED. 1 red impact, no black beat. Captions match the VO
// verbatim (except the number card; spoken figures as numerals). Durations/reveals/SFX locked to the VO via a
// scribe_v1 word-timestamp anchor pass (public/poly/voiceover.mp3, NO inserted pause); music mixed at 0.2.
// Built at the house +10% pacing default. OWN distinct footage under public/poly/, NO reuse of any other reel's
// clips — ledger-checked.
// New STANDALONE reel; a world-news story (a departure from the finance/gaming/science reels). Card text is
// editorial overlay, not footage.
// FOOTAGE is strictly BRAND-FREE, FLAG-FREE, MILITARY-FREE and generic — it NAMES a real war but shows NONE of it:
// generic humanitarian / evacuation / darkened-home / river / road / diplomacy / peace b-roll only. **Screen HARD:
// NO flag of ANY nation (esp. Russia/Ukraine); NO military of any kind — no soldiers, uniforms, tanks, weapons,
// missiles, military drones or vehicles; NO identifiable real person (NO Zelenskyy / Putin / any politician or
// soldier); NO Financial Times logo/masthead; NO real/identifiable war or conflict footage, ruins of a nameable
// place, or identifiable landmark; NO readable Cyrillic / Ukrainian / Russian or other foreign text; NO map with
// country labels; NO other brand logos; NO identifiable faces.**
// **UNVERIFIED / HIGHLY SENSITIVE — reports on an ACTIVE WAR and names real people/entities (Russia, Ukraine,
// Oleshky, President Zelenskyy, Financial Times) and contested claims (a US-backed local ceasefire; ~2,000 trapped
// civilians; mine-clearing; evacuation routing via Crimea/Russia; Abu Dhabi talks); rendered as written but MUST be
// fact-checked against primary reporting before publishing, and the situation is fast-moving/perishable.** The
// framing is a balanced news summary; the reel notes both sides' accusations and that a pause is not the war ending.
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 70, kind: 'hook', reveal: [3, 40], text: 'A major crypto|prediction market', kicker: 'The Polymarket breach', highlights: [], size: 52, media: {src: 'poly/pm00_market.jpg', type: 'img', effect: 'in'}},
  // 1
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'just froze trading|after a security breach,', highlights: ['breach,'], size: 44, pos: 'upperRight', media: {src: 'poly/pm01_frozen.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 70, kind: 'text', reveal: [2], text: 'and some users say money', highlights: [], size: 46, pos: 'left', media: {src: 'poly/pm02_users.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 70, kind: 'text', reveal: [2], text: 'disappeared from their accounts.', highlights: ['disappeared'], size: 50, pos: 'lowerRight', media: {src: 'poly/pm03_gone.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 70, kind: 'text', reveal: [2], text: 'But here’s the twist:', highlights: [], size: 50, pos: 'upperLeft', media: {src: 'poly/pm04_twist.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 70, kind: 'text', reveal: [2], text: 'the attack may not have started', highlights: ['attack'], size: 42, pos: 'right', media: {src: 'poly/pm05_attack.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 70, kind: 'text', reveal: [2], text: 'with Polymarket itself.', highlights: [], size: 52, pos: 'lower', media: {src: 'poly/pm06_notpoly.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Polymarket says a|third party was compromised,', highlights: ['compromised,'], size: 44, pos: 'upperLeft', media: {src: 'poly/pm07_thirdparty.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 70, kind: 'text', reveal: [2], text: 'and the company has promised', highlights: [], size: 46, pos: 'upperRight', media: {src: 'poly/pm08_promised.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 70, kind: 'text', reveal: [2], text: 'to reimburse affected traders.', highlights: ['reimburse'], size: 50, pos: 'lowerLeft', media: {src: 'poly/pm09_reimburse.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 70, kind: 'text', reveal: [2], text: 'But how could a breach', highlights: [], size: 46, pos: 'right', media: {src: 'poly/pm10_how.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 70, kind: 'text', reveal: [2], text: 'at an outside provider', highlights: ['outside'], size: 50, pos: 'left', media: {src: 'poly/pm11_provider.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 70, kind: 'text', reveal: [2], text: 'put users’ funds at risk?', highlights: ['risk?'], size: 46, pos: 'lowerRight', media: {src: 'poly/pm12_risk.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Follow for more crypto|and technology news', highlights: ['follow'], size: 44, media: {src: 'poly/pm13_follow.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 70, kind: 'text', reveal: [2], text: 'that could affect your money.', highlights: ['money.'], size: 46, pos: 'upper', media: {src: 'poly/pm14_yourmoney.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Polymarket is a|prediction market', highlights: [], size: 48, pos: 'left', media: {src: 'poly/pm15_predmarket.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 70, kind: 'text', reveal: [2], text: 'where users trade on the', highlights: [], size: 46, pos: 'right', media: {src: 'poly/pm16_trade.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 70, kind: 'text', reveal: [2], text: 'outcomes of real world events,', highlights: ['outcomes'], size: 46, pos: 'lowerLeft', media: {src: 'poly/pm17_events.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'from elections and sports|to financial news.', highlights: [], size: 44, pos: 'upperRight', media: {src: 'poly/pm18_elections.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Its international platform|uses cryptocurrency,', highlights: ['cryptocurrency,'], size: 48, pos: 'left', media: {src: 'poly/pm19_crypto.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 70, kind: 'text', reveal: [2], text: 'and users can buy and sell', highlights: [], size: 42, pos: 'lowerRight', media: {src: 'poly/pm20_buysell.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 70, kind: 'text', reveal: [2], text: 'positions based on what', highlights: [], size: 50, pos: 'upperLeft', media: {src: 'poly/pm21_positions.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 70, kind: 'text', reveal: [2], text: 'they think will happen.', highlights: [], size: 50, pos: 'right', media: {src: 'poly/pm22_think.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'On October 29,|Polymarket confirmed that', highlights: ['confirmed'], size: 44, pos: 'lower', media: {src: 'poly/pm23_date.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 70, kind: 'text', reveal: [2], text: 'one of its third party', highlights: [], size: 46, pos: 'upperRight', media: {src: 'poly/pm24_oneof.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 70, kind: 'text', reveal: [2], text: 'providers had been compromised.', highlights: ['compromised.'], size: 50, pos: 'lowerLeft', media: {src: 'poly/pm25_provcomp.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'The company temporarily|halted trading', highlights: ['halted'], size: 48, pos: 'left', media: {src: 'poly/pm26_halted.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 70, kind: 'text', reveal: [2], text: 'on its international platform,', highlights: [], size: 50, pos: 'right', media: {src: 'poly/pm27_intl.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'referred the incident|to law enforcement,', highlights: ['enforcement,'], size: 44, pos: 'lowerRight', media: {src: 'poly/pm28_law.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 70, kind: 'text', reveal: [2], text: 'and said anyone affected', highlights: [], size: 50, pos: 'upperLeft', media: {src: 'poly/pm29_affected.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 70, kind: 'text', reveal: [2], text: 'would be made whole.', highlights: ['whole.'], size: 50, pos: 'right', media: {src: 'poly/pm30_wholemade.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Reports suggest the damage|could be significant.', highlights: ['significant.'], size: 44, pos: 'upperRight', media: {src: 'poly/pm31_damage.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 70, kind: 'text', reveal: [2], text: 'Blockchain analytics firms estimated', highlights: [], size: 50, pos: 'left', media: {src: 'poly/pm32_analytics.jpg', type: 'img', effect: 'in'}},
  // 33 CARD
  {dur: 70, kind: 'stat', stat: {pre: 'ESTIMATED', value: 700, post: 'USERS AFFECTED'}, media: {src: 'poly/pm33_700.jpg', type: 'img', effect: 'in'}},
  // 34
  {dur: 70, kind: 'text', reveal: [2], text: 'may have been affected,', highlights: [], size: 50, pos: 'lowerLeft', media: {src: 'poly/pm34_mayaffect.jpg', type: 'img', effect: 'in'}},
  // 35 CARD
  {dur: 70, kind: 'stat', stat: {pre: 'ROUGHLY', prefix: '$', value: 2.7, decimals: 1, post: 'MILLION WITHDRAWN'}, media: {src: 'poly/pm35_27m.jpg', type: 'img', effect: 'in'}},
  // 36
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Polymarket has not|publicly confirmed', highlights: [], size: 48, pos: 'upper', media: {src: 'poly/pm36_notconfirm.jpg', type: 'img', effect: 'in'}},
  // 37
  {dur: 70, kind: 'text', reveal: [2], text: 'the total losses or the', highlights: ['losses'], size: 46, pos: 'right', media: {src: 'poly/pm37_losses.jpg', type: 'img', effect: 'in'}},
  // 38
  {dur: 70, kind: 'text', reveal: [2], text: 'number of affected accounts.', highlights: [], size: 50, pos: 'lowerRight', media: {src: 'poly/pm38_accounts.jpg', type: 'img', effect: 'in'}},
  // 39
  {dur: 70, kind: 'text', reveal: [2], text: 'The incident raises a serious', highlights: [], size: 46, pos: 'upperLeft', media: {src: 'poly/pm39_raises.jpg', type: 'img', effect: 'in'}},
  // 40
  {dur: 70, kind: 'text', reveal: [2], text: 'question about security.', highlights: ['security.'], size: 52, pos: 'left', media: {src: 'poly/pm40_security.jpg', type: 'img', effect: 'in'}},
  // 41
  {dur: 70, kind: 'text', reveal: [2], text: 'Even if a platform’s own systems', highlights: [], size: 42, pos: 'lowerRight', media: {src: 'poly/pm41_systems.jpg', type: 'img', effect: 'in'}},
  // 42
  {dur: 70, kind: 'text', reveal: [2], text: 'are not directly breached,', highlights: ['breached,'], size: 50, pos: 'upperRight', media: {src: 'poly/pm42_breached.jpg', type: 'img', effect: 'in'}},
  // 43
  {dur: 70, kind: 'text', reveal: [2], text: 'an outside service connected', highlights: ['outside'], size: 50, pos: 'right', media: {src: 'poly/pm43_connected.jpg', type: 'img', effect: 'in'}},
  // 44
  {dur: 70, kind: 'text', reveal: [2], text: 'to its website could still', highlights: [], size: 46, pos: 'lowerLeft', media: {src: 'poly/pm44_website.jpg', type: 'img', effect: 'in'}},
  // 45 RED
  {dur: 70, kind: 'impact', redBg: true, text: 'create a path|for attackers.'},
  // 46
  {dur: 70, kind: 'text', reveal: [2], text: 'For users, that means trusting', highlights: ['trusting'], size: 46, pos: 'left', media: {src: 'poly/pm46_trust.jpg', type: 'img', effect: 'in'}},
  // 47
  {dur: 70, kind: 'text', reveal: [2], text: 'a platform may also involve', highlights: [], size: 46, pos: 'upperRight', media: {src: 'poly/pm47_involve.jpg', type: 'img', effect: 'in'}},
  // 48
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'trusting the companies|behind its technology.', highlights: [], size: 44, pos: 'lower', media: {src: 'poly/pm48_companies.jpg', type: 'img', effect: 'in'}},
  // 49
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'There is an important|distinction here.', highlights: ['distinction'], size: 44, pos: 'right', media: {src: 'poly/pm49_distinction.jpg', type: 'img', effect: 'in'}},
  // 50
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Polymarket says the|compromised provider', highlights: [], size: 48, pos: 'upperLeft', media: {src: 'poly/pm50_provresp.jpg', type: 'img', effect: 'in'}},
  // 51
  {dur: 70, kind: 'text', reveal: [2], text: 'was responsible, and reports', highlights: ['responsible,'], size: 50, pos: 'lowerRight', media: {src: 'poly/pm51_responsible.jpg', type: 'img', effect: 'in'}},
  // 52
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'have identified the company|as DebugBear.', highlights: ['debugbear.'], size: 44, pos: 'left', media: {src: 'poly/pm52_debugbear.jpg', type: 'img', effect: 'in'}},
  // 53
  {dur: 70, kind: 'text', reveal: [2], text: 'But the full technical cause', highlights: [], size: 46, pos: 'upperRight', media: {src: 'poly/pm53_cause.jpg', type: 'img', effect: 'in'}},
  // 54
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'has not been|publicly established.', highlights: [], size: 48, pos: 'right', media: {src: 'poly/pm54_established.jpg', type: 'img', effect: 'in'}},
  // 55
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'The incident also follows|another third party', highlights: [], size: 44, pos: 'lowerLeft', media: {src: 'poly/pm55_follows.jpg', type: 'img', effect: 'in'}},
  // 56
  {dur: 70, kind: 'text', reveal: [2], text: 'security breach earlier this year,', highlights: ['breach'], size: 46, pos: 'upperLeft', media: {src: 'poly/pm56_earlier.jpg', type: 'img', effect: 'in'}},
  // 57
  {dur: 70, kind: 'text', reveal: [2], text: 'putting renewed attention', highlights: ['attention'], size: 52, pos: 'right', media: {src: 'poly/pm57_attention.jpg', type: 'img', effect: 'in'}},
  // 58
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'on the platform’s|security practices.', highlights: [], size: 48, pos: 'left', media: {src: 'poly/pm58_practices.jpg', type: 'img', effect: 'in'}},
  // 59
  {dur: 70, kind: 'text', reveal: [2], text: 'So, if a crypto platform', highlights: [], size: 46, pos: 'lowerRight', media: {src: 'poly/pm59_ifcrypto.jpg', type: 'img', effect: 'in'}},
  // 60
  {dur: 70, kind: 'text', reveal: [2], text: 'relies on outside providers,', highlights: ['outside'], size: 50, pos: 'upperRight', media: {src: 'poly/pm60_relies.jpg', type: 'img', effect: 'in'}},
  // 61
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'how much responsibility|should it take', highlights: ['responsibility'], size: 44, pos: 'lower', media: {src: 'poly/pm61_responsibility.jpg', type: 'img', effect: 'in'}},
  // 62
  {dur: 70, kind: 'text', reveal: [2], text: 'when users lose money?', highlights: ['lose'], size: 50, pos: 'left', media: {src: 'poly/pm62_losemoney.jpg', type: 'img', effect: 'in'}},
  // 63
  {dur: 70, kind: 'text', reveal: [2], text: 'And would you still trust', highlights: [], size: 46, pos: 'right', media: {src: 'poly/pm63_stilltrust.jpg', type: 'img', effect: 'in'}},
  // 64
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Polymarket after a breach|like this?', highlights: ['breach'], size: 44, pos: 'upperRight', media: {src: 'poly/pm64_afterbreach.jpg', type: 'img', effect: 'in'}},
  // 65 CTA
  {dur: 70, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Let us know|in the comments.', highlights: ['comments.'], size: 46, media: {src: 'poly/pm65_comments.jpg', type: 'img', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 845, src: 'media/sfx_whoosh.mp3', vol: 0.33},
  {at: 1799, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 2125, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 2331, src: 'media/sfx_whoosh.mp3', vol: 0.33},
  {at: 2457, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 4400, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 4448, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The Polymarket breach</span>
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
export const PolymarketReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('poly/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('poly/music.mp3')}
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
