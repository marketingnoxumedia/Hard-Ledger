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
// "The Amazon selloff" reel (AmazonAiReel) — Hard Ledger house VISUAL format, finance/tech-news topic. UNVERIFIED: cites chip stocks / Microsoft / Alphabet / Samsung capex figures.
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
// scribe_v1 word-timestamp anchor pass (public/amzai/voiceover.mp3, NO inserted pause); music mixed at 0.2.
// Built at the house +10% pacing default. OWN distinct footage under public/amzai/, NO reuse of any other reel's
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
  {dur: 55, kind: 'hook', reveal: [3, 40], text: 'Amazon just reported', kicker: 'The Amazon selloff', highlights: [], size: 56, media: {src: 'amzai/az00_report.jpg', type: 'img', effect: 'in'}},
  // 1
  {dur: 30, kind: 'text', reveal: [2], text: 'one of its strongest', highlights: [], size: 50, pos: 'upperRight', media: {src: 'amzai/az01_strongest.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 53, kind: 'text', reveal: [2], text: 'cloud growth rates in years,', highlights: [], size: 46, pos: 'left', media: {src: 'amzai/az02_cloudgrowth.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 65, kind: 'text', reveal: [2], text: 'but its stock is sinking.', highlights: ['sinking.'], size: 46, pos: 'lowerRight', media: {src: 'amzai/az03_sinking.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 53, kind: 'text', reveal: [2], text: 'And the reason has investors', highlights: [], size: 46, pos: 'upperLeft', media: {src: 'amzai/az04_investors.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 69, kind: 'text', reveal: [2], text: 'asking a major question:', highlights: [], size: 50, pos: 'right', media: {src: 'amzai/az05_question.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 125, kind: 'text', reveal: [2, 28], text: 'is the AI boom|becoming too expensive?', highlights: ['expensive?'], size: 44, pos: 'lower', media: {src: 'amzai/az06_expensive.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 72, kind: 'text', reveal: [2, 28], text: 'Amazon Web Services|is growing rapidly,', highlights: ['rapidly,'], size: 44, pos: 'upperLeft', media: {src: 'amzai/az07_aws.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 82, kind: 'text', reveal: [2, 28], text: 'with demand for AI|computing surging.', highlights: ['surging.'], size: 44, pos: 'upperRight', media: {src: 'amzai/az08_surging.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 53, kind: 'text', reveal: [2], text: 'But Amazon is spending', highlights: [], size: 50, pos: 'lowerLeft', media: {src: 'amzai/az09_spending.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 68, kind: 'text', reveal: [2], text: 'hundreds of billions of dollars', highlights: ['billions'], size: 46, pos: 'right', media: {src: 'amzai/az10_billions.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 64, kind: 'text', reveal: [2], text: 'to build the infrastructure behind it.', highlights: [], size: 42, pos: 'left', media: {src: 'amzai/az11_infra.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 56, kind: 'text', reveal: [2], text: 'So why is Wall Street worried', highlights: ['worried'], size: 42, pos: 'lowerRight', media: {src: 'amzai/az12_worried.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 38, kind: 'text', reveal: [2], text: 'when the cloud business', highlights: [], size: 50, pos: 'upper', media: {src: 'amzai/az13_cloudbiz.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 47, kind: 'text', reveal: [2], text: 'is doing so well?', highlights: [], size: 50, pos: 'left', media: {src: 'amzai/az14_sowell.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 66, kind: 'text', reveal: [2, 28], text: 'Follow for more business|and technology news', highlights: ['follow'], size: 44, media: {src: 'amzai/az15_follow.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 56, kind: 'text', reveal: [2], text: 'that explains what is moving', highlights: [], size: 46, pos: 'right', media: {src: 'amzai/az16_moving.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 69, kind: 'text', reveal: [2], text: 'the biggest companies in the world.', highlights: [], size: 42, pos: 'lowerLeft', media: {src: 'amzai/az17_biggest.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 47, kind: 'text', reveal: [2], text: 'Amazon is one of the biggest', highlights: [], size: 42, pos: 'upperRight', media: {src: 'amzai/az18_player.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 48, kind: 'text', reveal: [2], text: 'players in the AI race.', highlights: ['ai'], size: 46, pos: 'left', media: {src: 'amzai/az19_airace.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 56, kind: 'text', reveal: [2], text: 'Through AWS, it provides', highlights: [], size: 50, pos: 'lowerRight', media: {src: 'amzai/az20_provides.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 69, kind: 'text', reveal: [2], text: 'cloud computing power to businesses', highlights: [], size: 46, pos: 'upperLeft', media: {src: 'amzai/az21_cloudpower.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 74, kind: 'text', reveal: [2], text: 'developing and running AI models.', highlights: [], size: 46, pos: 'right', media: {src: 'amzai/az22_models.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 36, kind: 'text', reveal: [2], text: 'To keep up with demand,', highlights: ['demand,'], size: 46, pos: 'lower', media: {src: 'amzai/az23_demand.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 55, kind: 'text', reveal: [2], text: 'Amazon is investing heavily', highlights: ['heavily'], size: 50, pos: 'upperRight', media: {src: 'amzai/az24_heavily.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 50, kind: 'text', reveal: [2], text: 'in data centers, chips,', highlights: [], size: 50, pos: 'lowerLeft', media: {src: 'amzai/az25_datacenters.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 44, kind: 'text', reveal: [2], text: 'and other infrastructure.', highlights: [], size: 52, pos: 'left', media: {src: 'amzai/az26_otherinfra.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 57, kind: 'text', reveal: [2], text: 'Amazon reported third quarter revenue', highlights: [], size: 46, pos: 'right', media: {src: 'amzai/az27_q3rev.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 89, kind: 'text', reveal: [2], text: 'of $201.9 billion.', highlights: [], size: 52, pos: 'lowerRight', media: {src: 'amzai/az28_revnum.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 40, kind: 'text', reveal: [2], text: 'AWS revenue jumped', highlights: [], size: 52, pos: 'upperLeft', media: {src: 'amzai/az29_awsjump.jpg', type: 'img', effect: 'in'}},
  // 30 CARD
  {dur: 111, kind: 'stat', stat: {pre: 'AWS REVENUE', prefix: '+', value: 39, suffix: '%', post: 'TO ~$46 BILLION'}, media: {src: 'amzai/az30_card39.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 89, kind: 'text', reveal: [2, 28], text: 'its fastest growth|in almost five years.', highlights: [], size: 44, pos: 'right', media: {src: 'amzai/az31_fastest.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 54, kind: 'text', reveal: [2], text: 'But Amazon also reported', highlights: [], size: 50, pos: 'upperRight', media: {src: 'amzai/az32_alsoreported.jpg', type: 'img', effect: 'in'}},
  // 33
  {dur: 69, kind: 'text', reveal: [2], text: 'a free cash flow outflow', highlights: ['outflow'], size: 46, pos: 'left', media: {src: 'amzai/az33_fcf.jpg', type: 'img', effect: 'in'}},
  // 34 CARD
  {dur: 66, kind: 'stat', stat: {pre: 'FREE CASH FLOW', prefix: '-$', value: 42.4, decimals: 1, suffix: 'B', post: 'OUTFLOW, 12 MONTHS'}, media: {src: 'amzai/az34_card42.jpg', type: 'img', effect: 'in'}},
  // 35
  {dur: 57, kind: 'text', reveal: [2], text: 'over the past 12 months,', highlights: [], size: 46, pos: 'lowerLeft', media: {src: 'amzai/az35_12months.jpg', type: 'img', effect: 'in'}},
  // 36
  {dur: 62, kind: 'text', reveal: [2], text: 'largely driven by its growing', highlights: [], size: 46, pos: 'upper', media: {src: 'amzai/az36_driven.jpg', type: 'img', effect: 'in'}},
  // 37
  {dur: 67, kind: 'text', reveal: [2], text: 'investment in AI infrastructure.', highlights: ['infrastructure.'], size: 50, pos: 'right', media: {src: 'amzai/az37_investai.jpg', type: 'img', effect: 'in'}},
  // 38
  {dur: 66, kind: 'text', reveal: [2, 28], text: 'And the spending is|not slowing down.', highlights: ['spending'], size: 44, pos: 'lowerRight', media: {src: 'amzai/az38_notslowing.jpg', type: 'img', effect: 'in'}},
  // 39
  {dur: 80, kind: 'text', reveal: [2], text: 'Amazon expects capital expenditures', highlights: [], size: 50, pos: 'upperLeft', media: {src: 'amzai/az39_capex.jpg', type: 'img', effect: 'in'}},
  // 40 CARD
  {dur: 118, kind: 'stat', stat: {pre: 'CAPEX THIS YEAR', prefix: '~$', value: 220, suffix: 'B', post: 'AND RISING'}, media: {src: 'amzai/az40_card220.jpg', type: 'img', effect: 'in'}},
  // 41
  {dur: 60, kind: 'text', reveal: [2], text: 'CEO Andy Jassy has also', highlights: [], size: 46, pos: 'left', media: {src: 'amzai/az41_jassy.jpg', type: 'img', effect: 'in'}},
  // 42
  {dur: 60, kind: 'text', reveal: [2], text: 'indicated that next year’s spending', highlights: [], size: 46, pos: 'lowerRight', media: {src: 'amzai/az42_nextyear.jpg', type: 'img', effect: 'in'}},
  // 43
  {dur: 54, kind: 'text', reveal: [2], text: 'will be meaningfully higher.', highlights: ['higher.'], size: 50, pos: 'upperRight', media: {src: 'amzai/az43_higher.jpg', type: 'img', effect: 'in'}},
  // 44
  {dur: 66, kind: 'text', reveal: [2, 28], text: 'Meanwhile, the company’s|advertising business', highlights: [], size: 48, pos: 'right', media: {src: 'amzai/az44_ads.jpg', type: 'img', effect: 'in'}},
  // 45
  {dur: 94, kind: 'text', reveal: [2, 28], text: 'grew just 12%,|missing expectations.', highlights: ['12%,'], size: 48, pos: 'lowerLeft', media: {src: 'amzai/az45_12pct.jpg', type: 'img', effect: 'in'}},
  // 46
  {dur: 78, kind: 'text', reveal: [2, 28], text: 'That combination is|making investors nervous.', highlights: ['nervous.'], size: 44, pos: 'left', media: {src: 'amzai/az46_nervous.jpg', type: 'img', effect: 'in'}},
  // 47
  {dur: 98, kind: 'text', reveal: [2, 28], text: 'Amazon is building massive|AI infrastructure,', highlights: [], size: 44, pos: 'upperRight', media: {src: 'amzai/az47_massive.jpg', type: 'img', effect: 'in'}},
  // 48
  {dur: 39, kind: 'text', reveal: [2], text: 'but the returns may', highlights: [], size: 50, pos: 'lower', media: {src: 'amzai/az48_returns.jpg', type: 'img', effect: 'in'}},
  // 49
  {dur: 42, kind: 'text', reveal: [2], text: 'take time to arrive.', highlights: ['time'], size: 50, pos: 'right', media: {src: 'amzai/az49_taketime.jpg', type: 'img', effect: 'in'}},
  // 50
  {dur: 54, kind: 'text', reveal: [2], text: 'If spending keeps rising', highlights: [], size: 50, pos: 'upperLeft', media: {src: 'amzai/az50_rising.jpg', type: 'img', effect: 'in'}},
  // 51
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'faster than the cash|the business generates,', highlights: [], size: 44, pos: 'lowerRight', media: {src: 'amzai/az51_cash.jpg', type: 'img', effect: 'in'}},
  // 52
  {dur: 65, kind: 'text', reveal: [2], text: 'investors could become increasingly', highlights: [], size: 50, pos: 'left', media: {src: 'amzai/az52_increasingly.jpg', type: 'img', effect: 'in'}},
  // 53
  {dur: 60, kind: 'text', reveal: [2], text: 'concerned about profitability', highlights: ['profitability'], size: 52, pos: 'upperRight', media: {src: 'amzai/az53_profit.jpg', type: 'img', effect: 'in'}},
  // 54
  {dur: 69, kind: 'text', reveal: [2, 28], text: 'and the value of|these investments.', highlights: [], size: 44, pos: 'right', media: {src: 'amzai/az54_value.jpg', type: 'img', effect: 'in'}},
  // 55
  {dur: 38, kind: 'text', reveal: [2], text: 'But here’s the other side.', highlights: [], size: 46, pos: 'lowerLeft', media: {src: 'amzai/az55_otherside.jpg', type: 'img', effect: 'in'}},
  // 56
  {dur: 60, kind: 'text', reveal: [2], text: 'AWS is growing rapidly,', highlights: ['rapidly,'], size: 50, pos: 'upperLeft', media: {src: 'amzai/az56_awsgrow.jpg', type: 'img', effect: 'in'}},
  // 57
  {dur: 120, kind: 'text', reveal: [2, 28], text: 'and demand for AI computing|remains strong.', highlights: ['strong.'], size: 44, pos: 'right', media: {src: 'amzai/az57_strong.jpg', type: 'img', effect: 'in'}},
  // 58
  {dur: 36, kind: 'text', reveal: [2], text: 'Amazon’s spending could help it', highlights: [], size: 46, pos: 'left', media: {src: 'amzai/az58_couldhelp.jpg', type: 'img', effect: 'in'}},
  // 59
  {dur: 56, kind: 'text', reveal: [2], text: 'secure a leading position', highlights: ['leading'], size: 50, pos: 'lowerRight', media: {src: 'amzai/az59_leading.jpg', type: 'img', effect: 'in'}},
  // 60
  {dur: 32, kind: 'text', reveal: [2], text: 'in the cloud market.', highlights: [], size: 50, pos: 'upperRight', media: {src: 'amzai/az60_cloudmkt.jpg', type: 'img', effect: 'in'}},
  // 61
  {dur: 41, kind: 'text', reveal: [2], text: 'The question is not simply', highlights: [], size: 46, pos: 'lower', media: {src: 'amzai/az61_notsimply.jpg', type: 'img', effect: 'in'}},
  // 62
  {dur: 80, kind: 'text', reveal: [2], text: 'whether AI demand exists,', highlights: [], size: 50, pos: 'left', media: {src: 'amzai/az62_demandexists.jpg', type: 'img', effect: 'in'}},
  // 63
  {dur: 38, kind: 'text', reveal: [2], text: 'but whether the returns', highlights: [], size: 50, pos: 'right', media: {src: 'amzai/az63_butreturns.jpg', type: 'img', effect: 'in'}},
  // 64
  {dur: 76, kind: 'text', reveal: [2], text: 'will justify the enormous cost.', highlights: ['cost.'], size: 46, pos: 'upperLeft', media: {src: 'amzai/az64_cost.jpg', type: 'img', effect: 'in'}},
  // 65
  {dur: 73, kind: 'text', reveal: [2, 28], text: 'So, is Amazon making|the right move', highlights: [], size: 44, pos: 'lowerRight', media: {src: 'amzai/az65_rightmove.jpg', type: 'img', effect: 'in'}},
  // 66
  {dur: 80, kind: 'text', reveal: [2], text: 'by investing aggressively in AI,', highlights: ['aggressively'], size: 46, pos: 'upperRight', media: {src: 'amzai/az66_aggressive.jpg', type: 'img', effect: 'in'}},
  // 67
  {dur: 22, kind: 'text', reveal: [2], text: 'or is the company', highlights: [], size: 50, pos: 'left', media: {src: 'amzai/az67_orcompany.jpg', type: 'img', effect: 'in'}},
  // 68 RED
  {dur: 59, kind: 'impact', redBg: true, text: 'spending too much|too soon?'},
  // 69
  {dur: 82, kind: 'text', reveal: [2, 28], text: 'Would you buy Amazon|after this selloff,', highlights: ['selloff,'], size: 44, pos: 'right', media: {src: 'amzai/az69_buyafter.jpg', type: 'img', effect: 'in'}},
  // 70
  {dur: 29, kind: 'text', reveal: [2], text: 'or wait for proof', highlights: [], size: 50, pos: 'lowerLeft', media: {src: 'amzai/az70_waitproof.jpg', type: 'img', effect: 'in'}},
  // 71
  {dur: 63, kind: 'text', reveal: [2, 28], text: 'that the AI investments|are paying off?', highlights: ['off?'], size: 44, pos: 'upper', media: {src: 'amzai/az71_payingoff.jpg', type: 'img', effect: 'in'}},
  // 72 CTA
  {dur: 38, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Let us know|in the comments.', highlights: ['comments.'], size: 46, media: {src: 'amzai/az72_comments.jpg', type: 'img', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 930, src: 'media/sfx_whoosh.mp3', vol: 0.33},
  {at: 1786, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 2109, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 2507, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 4286, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 4519, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The Amazon selloff</span>
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
export const AmazonAiReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('amzai/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('amzai/music.mp3')}
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
