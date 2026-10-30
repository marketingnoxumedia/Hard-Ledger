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
// "The Intel selloff" reel (IntelReel) — Hard Ledger house VISUAL format, finance/tech-news topic.
// TOPIC: Intel's stock plunged as much as 26% (briefly on track for its worst trading day since 1974) even though
// it BEAT Q3 earnings — the selloff was driven by a weak Q4 forecast and PC-market weakness, not the quarter just
// reported. Q3 revenue ~$16.5B, adj EPS 52c (both slightly above); data-center revenue +78% to $7.3B; but Q4
// guided to $15-16B vs ~$17.1B expected. PC shipments seen -12% this year and -10% in 2027 as memory prices rise;
// an Israel plant incident is expected to cut ~$300M off Q4 revenue; Intel warned of no positive cash flow this
// year. Bulls note the data-center business is strong but supply-constrained while PC keeps struggling.
// NOTE ON VOICE: built VERBATIM from a client-supplied script in the influencer "curiosity-gap" format (HOOK /
// CURIOSITY GAP / EARLY CTA / CONTEXT / EVIDENCE / ESCALATION / CONSEQUENCES / CONTROVERSY / AUDIENCE DEBATE), NOT
// the faceless house voice — it NAMES Intel (and Wall Street / an Israel facility), uses an EARLY "follow for
// more" CTA, and CLOSES on a "let us know in the comments" debate CTA. The red beat poses the would-you-rather
// (a temporary setback or a deeper problem?). Per the saved house preference, captions are <=5-6 words/beat with
// LARGER on-screen type (Anton ~42-52). 80 beats. 4 stat cards: SHARES -26%; DATA CENTER +78% (to $7.3B); PC
// SHIPMENTS -12% (this year, -10% in 2027); ISRAEL INCIDENT -$300M (off Q4). 1 red impact mid-tail (closes on the
// comments-CTA media beat), no black beat. Captions match the VO verbatim (figures as numerals only on the cards).
// Durations/reveals/SFX locked to the VO via a scribe_v1 word-timestamp anchor pass (public/intel/voiceover.mp3,
// NO inserted pause); its own driving/tense finance-news music mixed at 0.2. Built at the house +10% pacing
// default. OWN distinct footage under public/intel/ (79 stills), NO reuse of any other reel's clips — ledger-checked.
// FOOTAGE is strictly BRAND-FREE, FACE-FREE and generic — it NAMES Intel but shows NONE of it: NO Intel/AMD/Nvidia
// or any chipmaker logo/wordmark/product, NO readable chip part numbers, NO stock tickers / prices / currency, NO
// flags, NO identifiable faces or landmarks, NO readable foreign text.
// **UNVERIFIED — cites specific figures (shares -26%; worst day since 1974; Q3 rev ~$16.5B; adj EPS 52c; data
// center +78% to $7.3B; Q4 guide $15-16B vs ~$17.1B; PC shipments -12% in 2025 and -10% in 2027; Israel incident
// ~$300M; no positive cash flow this year); rendered as written but MUST be fact-checked before publishing.**
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 64, kind: 'hook', reveal: [3, 40], text: 'Intel just suffered a brutal', kicker: 'The Intel selloff', highlights: [], size: 50, media: {src: 'intel/in00_selloff.jpg', type: 'img', effect: 'in'}},
  // 1
  {dur: 38, kind: 'text', reveal: [2], text: 'stock market selloff,', highlights: ['selloff,'], size: 52, pos: 'upperRight', media: {src: 'intel/in01_market.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 42, kind: 'text', reveal: [2], text: 'with shares plunging', highlights: [], size: 52, pos: 'left', media: {src: 'intel/in02_plunging.jpg', type: 'img', effect: 'in'}},
  // 3 CARD
  {dur: 56, kind: 'stat', stat: {pre: 'SHARES PLUNGED', prefix: '-', value: 26, suffix: '%'}, media: {src: 'intel/in03_card26.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 32, kind: 'text', reveal: [2], text: 'The drop briefly put', highlights: [], size: 50, pos: 'lowerRight', media: {src: 'intel/in04_drop.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 30, kind: 'text', reveal: [2], text: 'the company on track', highlights: [], size: 50, pos: 'upperLeft', media: {src: 'intel/in05_ontrack.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 86, kind: 'text', reveal: [2, 28], text: 'for its worst trading|day since 1974.', highlights: ['worst'], size: 44, pos: 'right', media: {src: 'intel/in06_1974.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 31, kind: 'text', reveal: [2], text: 'And the shocking part?', highlights: ['shocking'], size: 50, pos: 'lower', media: {src: 'intel/in07_shocking.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 100, kind: 'text', reveal: [2, 28], text: 'Intel actually beat|earnings expectations.', highlights: ['beat'], size: 48, pos: 'upperLeft', media: {src: 'intel/in08_beat.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 37, kind: 'text', reveal: [2], text: 'So why are investors', highlights: [], size: 50, pos: 'upperRight', media: {src: 'intel/in09_investors.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 37, kind: 'text', reveal: [2], text: 'running for the exits?', highlights: [], size: 50, pos: 'lowerLeft', media: {src: 'intel/in10_exits.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 77, kind: 'text', reveal: [2, 28], text: 'The answer is in|Intel’s forecast,', highlights: ['forecast,'], size: 44, pos: 'right', media: {src: 'intel/in11_forecast.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 65, kind: 'text', reveal: [2, 28], text: 'and it reveals|a serious problem', highlights: ['problem'], size: 44, pos: 'left', media: {src: 'intel/in12_problem.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 41, kind: 'text', reveal: [2], text: 'that could affect the entire', highlights: [], size: 46, pos: 'lowerRight', media: {src: 'intel/in13_entire.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 73, kind: 'text', reveal: [2], text: 'PC and semiconductor industry.', highlights: ['semiconductor'], size: 50, pos: 'upper', media: {src: 'intel/in14_semi.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Follow for more business|and technology news', highlights: ['follow'], size: 44, media: {src: 'intel/in15_follow.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 37, kind: 'text', reveal: [2], text: 'that explains what is moving', highlights: [], size: 46, pos: 'left', media: {src: 'intel/in16_moving.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 58, kind: 'text', reveal: [2, 28], text: 'the biggest companies|in the world.', highlights: [], size: 44, pos: 'right', media: {src: 'intel/in17_biggest.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 43, kind: 'text', reveal: [2], text: 'Intel has spent years', highlights: [], size: 50, pos: 'lowerLeft', media: {src: 'intel/in18_years.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 57, kind: 'text', reveal: [2, 28], text: 'trying to rebuild|its position', highlights: [], size: 48, pos: 'upperRight', media: {src: 'intel/in19_rebuild.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 39, kind: 'text', reveal: [2], text: 'in the chip industry.', highlights: ['chip'], size: 50, pos: 'left', media: {src: 'intel/in20_chipind.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 37, kind: 'text', reveal: [2], text: 'While AI data centers', highlights: [], size: 50, pos: 'lowerRight', media: {src: 'intel/in21_datacenters.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 26, kind: 'text', reveal: [2], text: 'are driving demand', highlights: [], size: 52, pos: 'upperLeft', media: {src: 'intel/in22_demand.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 41, kind: 'text', reveal: [2], text: 'for powerful processors,', highlights: [], size: 52, pos: 'right', media: {src: 'intel/in23_processors.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 53, kind: 'text', reveal: [2], text: 'Intel still depends heavily', highlights: ['heavily'], size: 50, pos: 'lower', media: {src: 'intel/in24_depends.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 51, kind: 'text', reveal: [2], text: 'on the traditional PC market.', highlights: ['PC'], size: 46, pos: 'upperRight', media: {src: 'intel/in25_pcmarket.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 30, kind: 'text', reveal: [2], text: 'And that market is now', highlights: [], size: 46, pos: 'lowerLeft', media: {src: 'intel/in26_marketnow.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 95, kind: 'text', reveal: [2, 28], text: 'facing rising costs|and weakening demand.', highlights: ['weakening'], size: 44, pos: 'left', media: {src: 'intel/in27_weakening.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 52, kind: 'text', reveal: [2], text: 'Intel reported third quarter revenue', highlights: [], size: 46, pos: 'right', media: {src: 'intel/in28_q3rev.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 64, kind: 'text', reveal: [2], text: 'of about $16.5 billion,', highlights: [], size: 50, pos: 'lowerRight', media: {src: 'intel/in29_165.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 50, kind: 'text', reveal: [2], text: 'and adjusted earnings of', highlights: [], size: 50, pos: 'upperLeft', media: {src: 'intel/in30_earnings.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 27, kind: 'text', reveal: [2], text: '52 cents per share,', highlights: [], size: 50, pos: 'right', media: {src: 'intel/in31_52c.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 70, kind: 'text', reveal: [2], text: 'both slightly above expectations.', highlights: ['above'], size: 50, pos: 'upperRight', media: {src: 'intel/in32_above.jpg', type: 'img', effect: 'in'}},
  // 33
  {dur: 74, kind: 'text', reveal: [2, 28], text: 'Its data center revenue|also surged,', highlights: [], size: 44, pos: 'left', media: {src: 'intel/in33_datacenterrev.jpg', type: 'img', effect: 'in'}},
  // 34 CARD
  {dur: 61, kind: 'stat', stat: {pre: 'DATA CENTER REVENUE', prefix: '+', value: 78, suffix: '%', post: 'TO $7.3 BILLION'}, media: {src: 'intel/in34_card78.jpg', type: 'img', effect: 'in'}},
  // 35
  {dur: 37, kind: 'text', reveal: [2], text: 'But the company forecast', highlights: [], size: 50, pos: 'lowerLeft', media: {src: 'intel/in35_forecast2.jpg', type: 'img', effect: 'in'}},
  // 36
  {dur: 29, kind: 'text', reveal: [2], text: 'fourth quarter revenue', highlights: [], size: 52, pos: 'upper', media: {src: 'intel/in36_q4rev.jpg', type: 'img', effect: 'in'}},
  // 37
  {dur: 83, kind: 'text', reveal: [2, 28], text: 'between $15 billion|and $16 billion,', highlights: ['$15'], size: 44, pos: 'right', media: {src: 'intel/in37_1516.jpg', type: 'img', effect: 'in'}},
  // 38
  {dur: 34, kind: 'text', reveal: [2], text: 'well below Wall Street’s', highlights: [], size: 50, pos: 'lowerRight', media: {src: 'intel/in38_wallst.jpg', type: 'img', effect: 'in'}},
  // 39
  {dur: 113, kind: 'text', reveal: [2, 28], text: 'expectations of around|$17.1 billion.', highlights: [], size: 48, pos: 'upperLeft', media: {src: 'intel/in39_171.jpg', type: 'img', effect: 'in'}},
  // 40
  {dur: 31, kind: 'text', reveal: [2], text: 'The PC market is becoming', highlights: [], size: 46, pos: 'left', media: {src: 'intel/in40_pcbecoming.jpg', type: 'img', effect: 'in'}},
  // 41
  {dur: 34, kind: 'text', reveal: [2], text: 'a major problem.', highlights: ['problem.'], size: 52, pos: 'lowerRight', media: {src: 'intel/in41_major.jpg', type: 'img', effect: 'in'}},
  // 42
  {dur: 43, kind: 'text', reveal: [2], text: 'Memory prices are rising', highlights: ['rising'], size: 50, pos: 'upperRight', media: {src: 'intel/in42_memory.jpg', type: 'img', effect: 'in'}},
  // 43
  {dur: 70, kind: 'text', reveal: [2], text: 'as manufacturers prioritize chips', highlights: [], size: 50, pos: 'right', media: {src: 'intel/in43_prioritize.jpg', type: 'img', effect: 'in'}},
  // 44
  {dur: 54, kind: 'text', reveal: [2], text: 'used in AI data centers.', highlights: [], size: 46, pos: 'lowerLeft', media: {src: 'intel/in44_aidata.jpg', type: 'img', effect: 'in'}},
  // 45
  {dur: 69, kind: 'text', reveal: [2, 28], text: 'That makes laptops|and desktops more expensive,', highlights: ['expensive,'], size: 44, pos: 'left', media: {src: 'intel/in45_expensive.jpg', type: 'img', effect: 'in'}},
  // 46
  {dur: 63, kind: 'text', reveal: [2, 28], text: 'putting pressure on|consumer demand.', highlights: ['pressure'], size: 48, pos: 'upperRight', media: {src: 'intel/in46_pressure.jpg', type: 'img', effect: 'in'}},
  // 47
  {dur: 76, kind: 'text', reveal: [2, 28], text: 'Intel expects PC shipments|to fall about', highlights: [], size: 44, pos: 'lower', media: {src: 'intel/in47_shipments.jpg', type: 'img', effect: 'in'}},
  // 48 CARD
  {dur: 108, kind: 'stat', stat: {pre: 'PC SHIPMENTS', prefix: '-', value: 12, suffix: '%', post: 'THIS YEAR, -10% IN 2027'}, media: {src: 'intel/in48_card12.jpg', type: 'img', effect: 'in'}},
  // 49
  {dur: 73, kind: 'text', reveal: [2, 28], text: 'And Intel is facing|another setback.', highlights: ['setback.'], size: 44, pos: 'right', media: {src: 'intel/in49_setback.jpg', type: 'img', effect: 'in'}},
  // 50
  {dur: 23, kind: 'text', reveal: [2], text: 'An incident at its', highlights: [], size: 50, pos: 'upperLeft', media: {src: 'intel/in50_incident.jpg', type: 'img', effect: 'in'}},
  // 51
  {dur: 62, kind: 'text', reveal: [2], text: 'manufacturing facility in Israel', highlights: ['Israel'], size: 50, pos: 'lowerRight', media: {src: 'intel/in51_israel.jpg', type: 'img', effect: 'in'}},
  // 52
  {dur: 47, kind: 'text', reveal: [2], text: 'is expected to reduce', highlights: [], size: 50, pos: 'left', media: {src: 'intel/in52_reduce.jpg', type: 'img', effect: 'in'}},
  // 53
  {dur: 50, kind: 'text', reveal: [2], text: 'fourth quarter revenue by', highlights: [], size: 50, pos: 'upperRight', media: {src: 'intel/in53_q4by.jpg', type: 'img', effect: 'in'}},
  // 54 CARD
  {dur: 47, kind: 'stat', stat: {pre: 'ISRAEL PLANT INCIDENT', prefix: '-$', value: 300, suffix: 'M', post: 'OFF Q4 REVENUE'}, media: {src: 'intel/in54_card300.jpg', type: 'img', effect: 'in'}},
  // 55
  {dur: 46, kind: 'text', reveal: [2], text: 'The company also warned', highlights: [], size: 50, pos: 'right', media: {src: 'intel/in55_warned.jpg', type: 'img', effect: 'in'}},
  // 56
  {dur: 39, kind: 'text', reveal: [2], text: 'it will not generate', highlights: [], size: 50, pos: 'lowerLeft', media: {src: 'intel/in56_notgen.jpg', type: 'img', effect: 'in'}},
  // 57
  {dur: 47, kind: 'text', reveal: [2], text: 'positive cash flow this year,', highlights: ['cash'], size: 46, pos: 'upperLeft', media: {src: 'intel/in57_cashflow.jpg', type: 'img', effect: 'in'}},
  // 58
  {dur: 43, kind: 'text', reveal: [2], text: 'raising more questions about', highlights: [], size: 50, pos: 'right', media: {src: 'intel/in58_questions.jpg', type: 'img', effect: 'in'}},
  // 59
  {dur: 73, kind: 'text', reveal: [2, 28], text: 'how quickly its turnaround|can succeed.', highlights: ['turnaround'], size: 44, pos: 'left', media: {src: 'intel/in59_turnaround.jpg', type: 'img', effect: 'in'}},
  // 60
  {dur: 85, kind: 'text', reveal: [2, 28], text: 'But there is still|a reason for optimism.', highlights: ['optimism.'], size: 44, pos: 'lowerRight', media: {src: 'intel/in60_optimism.jpg', type: 'img', effect: 'in'}},
  // 61
  {dur: 25, kind: 'text', reveal: [2], text: 'Intel’s data center business', highlights: [], size: 50, pos: 'upperRight', media: {src: 'intel/in61_dcbiz.jpg', type: 'img', effect: 'in'}},
  // 62
  {dur: 45, kind: 'text', reveal: [2], text: 'is growing rapidly,', highlights: ['rapidly,'], size: 52, pos: 'lower', media: {src: 'intel/in62_rapidly.jpg', type: 'img', effect: 'in'}},
  // 63
  {dur: 94, kind: 'text', reveal: [2, 28], text: 'and demand for server|processors remains strong.', highlights: ['strong.'], size: 44, pos: 'left', media: {src: 'intel/in63_strong.jpg', type: 'img', effect: 'in'}},
  // 64
  {dur: 45, kind: 'text', reveal: [2], text: 'The problem is that Intel', highlights: [], size: 46, pos: 'right', media: {src: 'intel/in64_problemis.jpg', type: 'img', effect: 'in'}},
  // 65
  {dur: 58, kind: 'text', reveal: [2], text: 'cannot produce enough chips', highlights: ['cannot'], size: 50, pos: 'upperLeft', media: {src: 'intel/in65_cannot.jpg', type: 'img', effect: 'in'}},
  // 66
  {dur: 31, kind: 'text', reveal: [2], text: 'to meet that demand,', highlights: [], size: 50, pos: 'lowerRight', media: {src: 'intel/in66_meetdemand.jpg', type: 'img', effect: 'in'}},
  // 67
  {dur: 42, kind: 'text', reveal: [2], text: 'while its PC business', highlights: [], size: 50, pos: 'upperRight', media: {src: 'intel/in67_pcbiz.jpg', type: 'img', effect: 'in'}},
  // 68
  {dur: 49, kind: 'text', reveal: [2], text: 'continues to struggle.', highlights: ['struggle.'], size: 52, pos: 'left', media: {src: 'intel/in68_struggle.jpg', type: 'img', effect: 'in'}},
  // 69
  {dur: 53, kind: 'text', reveal: [2], text: 'Investors now have to decide', highlights: [], size: 46, pos: 'right', media: {src: 'intel/in69_decide.jpg', type: 'img', effect: 'in'}},
  // 70
  {dur: 18, kind: 'text', reveal: [2], text: 'whether this is', highlights: [], size: 52, pos: 'lowerLeft', media: {src: 'intel/in70_whether.jpg', type: 'img', effect: 'in'}},
  // 71 RED
  {dur: 85, kind: 'impact', redBg: true, text: 'a temporary setback|or a deeper problem?'},
  // 72
  {dur: 63, kind: 'text', reveal: [2, 28], text: 'So, is Intel’s|massive selloff', highlights: ['selloff'], size: 48, pos: 'upper', media: {src: 'intel/in72_massive.jpg', type: 'img', effect: 'in'}},
  // 73
  {dur: 39, kind: 'text', reveal: [2], text: 'a buying opportunity,', highlights: ['opportunity,'], size: 52, pos: 'lowerRight', media: {src: 'intel/in73_opportunity.jpg', type: 'img', effect: 'in'}},
  // 74
  {dur: 34, kind: 'text', reveal: [2], text: 'or is the company', highlights: [], size: 50, pos: 'left', media: {src: 'intel/in74_orcompany.jpg', type: 'img', effect: 'in'}},
  // 75
  {dur: 81, kind: 'text', reveal: [2, 28], text: 'still too far behind|its competitors?', highlights: ['behind'], size: 44, pos: 'upperRight', media: {src: 'intel/in75_behind.jpg', type: 'img', effect: 'in'}},
  // 76
  {dur: 60, kind: 'text', reveal: [2, 28], text: 'Do you believe Intel|can turn things around,', highlights: ['turn'], size: 44, pos: 'upperRight', media: {src: 'intel/in76_turnaround2.jpg', type: 'img', effect: 'in'}},
  // 77
  {dur: 35, kind: 'text', reveal: [2], text: 'or is this the beginning', highlights: [], size: 46, pos: 'left', media: {src: 'intel/in77_beginning.jpg', type: 'img', effect: 'in'}},
  // 78
  {dur: 49, kind: 'text', reveal: [2], text: 'of a much bigger decline?', highlights: ['bigger'], size: 46, pos: 'lowerRight', media: {src: 'intel/in78_decline.jpg', type: 'img', effect: 'in'}},
  // 79 CTA
  {dur: 38, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Let us know|in the comments.', highlights: ['comments.'], size: 46, media: {src: 'intel/in79_comments.jpg', type: 'img', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 144, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 809, src: 'media/sfx_whoosh.mp3', vol: 0.33},
  {at: 1783, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 2580, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 2943, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 3783, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 4229, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The Intel selloff</span>
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
export const IntelReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('intel/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('intel/music.mp3')}
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
