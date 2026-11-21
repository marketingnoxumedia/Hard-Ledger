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
// "The crypto meltdown" reel (MeltdownReel) — Hard Ledger house VISUAL format, crypto / markets breaking-news topic.
// TOPIC: A Binance security breach triggered a crypto market meltdown. Bitcoin and Ether plunged and ~$1.57B in
// leveraged crypto bets were liquidated. Per CoinDesk (Oct 30), BTC fell to ~$76,400 after Binance disclosed a
// breach estimated to affect ~$6.3B in assets; ETH briefly hit ~$2,170. Futures liquidations surged to ~$1.57B
// (BTC+ETH over half; Binance ~half of forced closures). The leverage cascade: forced liquidations add selling
// pressure, pushing prices lower and triggering more liquidations. Binance froze ~$3B in assets and paused
// withdrawals during checks; analytics firms linked the attack to North-Korea-affiliated hackers; traders moved to
// defensive options. Debate: a Binance crisis, or proof that leverage makes crypto markets fragile?
// NOTE ON VOICE: built VERBATIM from a client-supplied script in the influencer "curiosity-gap" format (HOOK /
// CURIOSITY GAP / EARLY CTA / CONTEXT / EVIDENCE / ESCALATION / CONSEQUENCES / CONTROVERSY / AUDIENCE DEBATE), NOT
// the faceless house voice — it NAMES Binance / Bitcoin / Ether / CoinDesk / North Korea, uses an EARLY "follow for
// more" CTA, and CLOSES on a "let us know in the comments" debate CTA. The red beat poses the would-you-rather
// (a warning sign for the entire crypto market?). Per the saved house preference, captions are <=5-6 words/beat
// with LARGER on-screen type (Anton ~42-52). 75 beats. 4 stat cards: LIQUIDATED $1.57B; BITCOIN FELL TO ~$76,400;
// BINANCE BREACH ~$6.3B; ASSETS FROZEN ~$3B. 1 red impact mid-tail (closes on the comments-CTA media beat), no
// black beat. Captions match the VO verbatim (figures as numerals only on the cards). Durations/reveals/SFX locked
// to the VO via a scribe_v1 word-timestamp anchor pass (public/melt/voiceover.mp3, NO inserted pause); its own
// tense, urgent crypto-crisis music mixed at 0.2. Built at the house +10% pacing default. OWN distinct footage
// under public/melt/ (74 stills), NO reuse of any other reel's clips (incl. the PolymarketReel crypto-breach reel)
// — ledger-checked.
// FOOTAGE is strictly BRAND-FREE and generic — it NAMES Binance/Bitcoin/Ether but shows NONE of it: NO Binance or
// any exchange LOGO/UI, NO Bitcoin/Ether/crypto coin logo or symbol, NO trading-screen tickers/prices/charts with
// readable figures, NO flags (esp. North Korea), NO identifiable faces or landmarks, NO readable foreign text.
// **UNVERIFIED / SENSITIVE — reports an active market event and names real entities (Binance, CoinDesk, North
// Korea) and contested figures (~$1.57B liquidations; BTC ~$76,400; breach ~$6.3B; ETH ~$2,170; ~$3B frozen;
// attribution to North-Korea-affiliated hackers); rendered as written but MUST be fact-checked against primary
// reporting before publishing, and the situation is fast-moving.**
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 50, kind: 'hook', reveal: [3, 40], text: 'A massive crypto hack', kicker: 'The crypto meltdown', highlights: [], size: 54, media: {src: 'melt/mt00_hack.jpg', type: 'img', effect: 'in'}},
  // 1
  {dur: 71, kind: 'text', reveal: [2, 28], text: 'just sent the market|into a meltdown.', highlights: ['meltdown.'], size: 44, pos: 'upperRight', media: {src: 'melt/mt01_meltdown.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 34, kind: 'text', reveal: [2], text: 'Bitcoin plunged,', highlights: ['plunged,'], size: 52, pos: 'left', media: {src: 'melt/mt02_btcplunge.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 35, kind: 'text', reveal: [2], text: 'Ether followed,', highlights: [], size: 52, pos: 'lowerRight', media: {src: 'melt/mt03_ether.jpg', type: 'img', effect: 'in'}},
  // 4 CARD
  {dur: 117, kind: 'stat', stat: {pre: 'LIQUIDATED', prefix: '$', value: 1.57, decimals: 2, suffix: 'B', post: 'IN LEVERAGED BETS'}, media: {src: 'melt/mt04_card157.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 24, kind: 'text', reveal: [2], text: 'were wiped out.', highlights: ['wiped'], size: 52, pos: 'upperLeft', media: {src: 'melt/mt05_wipedout.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 28, kind: 'text', reveal: [2], text: 'But here’s the twist:', highlights: ['twist:'], size: 50, pos: 'right', media: {src: 'melt/mt06_twist.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 53, kind: 'text', reveal: [2, 28], text: 'this wasn’t just|a market selloff.', highlights: [], size: 44, pos: 'lower', media: {src: 'melt/mt07_selloff.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 53, kind: 'text', reveal: [2], text: 'A major exchange breach', highlights: ['breach'], size: 50, pos: 'upperLeft', media: {src: 'melt/mt08_exchbreach.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 53, kind: 'text', reveal: [2], text: 'triggered a chain reaction,', highlights: ['chain'], size: 50, pos: 'upperRight', media: {src: 'melt/mt09_chain.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 64, kind: 'text', reveal: [2, 28], text: 'forcing traders out|of their positions.', highlights: [], size: 44, pos: 'lowerLeft', media: {src: 'melt/mt10_forcing.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 61, kind: 'text', reveal: [2], text: 'And even as prices dropped,', highlights: ['dropped,'], size: 46, pos: 'right', media: {src: 'melt/mt11_dropped.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 77, kind: 'text', reveal: [2, 28], text: 'some traders betting|against the market', highlights: [], size: 44, pos: 'left', media: {src: 'melt/mt12_betting.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 59, kind: 'text', reveal: [2, 28], text: 'started getting caught|in the rebound.', highlights: ['rebound.'], size: 44, pos: 'lowerRight', media: {src: 'melt/mt13_rebound.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 66, kind: 'text', reveal: [2, 28], text: 'Follow for more|breaking crypto news', highlights: ['follow'], size: 44, media: {src: 'melt/mt14_follow.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 75, kind: 'text', reveal: [2], text: 'and market stories that matter.', highlights: [], size: 46, pos: 'upper', media: {src: 'melt/mt15_stories.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 31, kind: 'text', reveal: [2], text: 'On October 30,', highlights: [], size: 52, pos: 'left', media: {src: 'melt/mt16_oct30.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 34, kind: 'text', reveal: [2], text: 'CoinDesk reported that', highlights: [], size: 52, pos: 'right', media: {src: 'melt/mt17_coindesk.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 46, kind: 'text', reveal: [2], text: 'Bitcoin fell to around', highlights: [], size: 50, pos: 'lowerLeft', media: {src: 'melt/mt18_btcfell.jpg', type: 'img', effect: 'in'}},
  // 19 CARD
  {dur: 67, kind: 'stat', stat: {pre: 'BITCOIN FELL TO', prefix: '~$', value: 76400}, media: {src: 'melt/mt19_cardbtc.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 43, kind: 'text', reveal: [2], text: 'after Binance disclosed', highlights: ['Binance'], size: 52, pos: 'upperRight', media: {src: 'melt/mt20_binance.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 32, kind: 'text', reveal: [2], text: 'a security breach', highlights: [], size: 52, pos: 'left', media: {src: 'melt/mt21_secbreach.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 70, kind: 'text', reveal: [2], text: 'estimated to have affected', highlights: [], size: 50, pos: 'lowerRight', media: {src: 'melt/mt22_affected.jpg', type: 'img', effect: 'in'}},
  // 23 CARD
  {dur: 66, kind: 'stat', stat: {pre: 'BINANCE BREACH', prefix: '~$', value: 6.3, decimals: 1, suffix: 'B', post: 'IN ASSETS'}, media: {src: 'melt/mt23_card63.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 36, kind: 'text', reveal: [2], text: 'Ether also dropped,', highlights: [], size: 52, pos: 'upperLeft', media: {src: 'melt/mt24_etherdrop.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 86, kind: 'text', reveal: [2, 28], text: 'briefly reaching|around $2,170.', highlights: [], size: 50, pos: 'right', media: {src: 'melt/mt25_eth2170.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 74, kind: 'text', reveal: [2, 28], text: 'The fallout hit|leveraged traders hard.', highlights: ['hard.'], size: 44, pos: 'lower', media: {src: 'melt/mt26_fallout.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 67, kind: 'text', reveal: [2], text: 'Crypto futures liquidations surged', highlights: ['liquidations'], size: 50, pos: 'upperRight', media: {src: 'melt/mt27_futures.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 74, kind: 'text', reveal: [2], text: 'to approximately $1.57 billion,', highlights: [], size: 50, pos: 'lowerLeft', media: {src: 'melt/mt28_157again.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 45, kind: 'text', reveal: [2], text: 'with Bitcoin and Ether', highlights: [], size: 50, pos: 'left', media: {src: 'melt/mt29_btceth.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 77, kind: 'text', reveal: [2, 28], text: 'accounting for more|than half of the total.', highlights: ['half'], size: 44, pos: 'right', media: {src: 'melt/mt30_half.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 48, kind: 'text', reveal: [2], text: 'Binance recorded nearly half', highlights: ['Binance'], size: 50, pos: 'lowerRight', media: {src: 'melt/mt31_binancehalf.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 47, kind: 'text', reveal: [2, 28], text: 'of the market’s|forced closures,', highlights: [], size: 48, pos: 'upperLeft', media: {src: 'melt/mt32_closures.jpg', type: 'img', effect: 'in'}},
  // 33
  {dur: 67, kind: 'text', reveal: [2], text: 'while trading volume surged', highlights: ['surged'], size: 50, pos: 'right', media: {src: 'melt/mt33_volume.jpg', type: 'img', effect: 'in'}},
  // 34
  {dur: 89, kind: 'text', reveal: [2, 28], text: 'as positions were|rapidly unwound.', highlights: ['unwound.'], size: 48, pos: 'upperRight', media: {src: 'melt/mt34_unwound.jpg', type: 'img', effect: 'in'}},
  // 35
  {dur: 35, kind: 'text', reveal: [2], text: 'Here’s why the damage', highlights: [], size: 50, pos: 'left', media: {src: 'melt/mt35_damage.jpg', type: 'img', effect: 'in'}},
  // 36
  {dur: 44, kind: 'text', reveal: [2], text: 'spread so quickly.', highlights: ['quickly.'], size: 52, pos: 'lowerLeft', media: {src: 'melt/mt36_quickly.jpg', type: 'img', effect: 'in'}},
  // 37
  {dur: 51, kind: 'text', reveal: [2], text: 'Traders using leverage', highlights: ['leverage'], size: 52, pos: 'upper', media: {src: 'melt/mt37_leverage.jpg', type: 'img', effect: 'in'}},
  // 38
  {dur: 76, kind: 'text', reveal: [2, 28], text: 'borrow exposure to|make larger bets.', highlights: [], size: 44, pos: 'right', media: {src: 'melt/mt38_borrow.jpg', type: 'img', effect: 'in'}},
  // 39
  {dur: 51, kind: 'text', reveal: [2, 28], text: 'When prices move|against them,', highlights: [], size: 48, pos: 'lowerRight', media: {src: 'melt/mt39_against.jpg', type: 'img', effect: 'in'}},
  // 40
  {dur: 59, kind: 'text', reveal: [2], text: 'exchanges can automatically', highlights: [], size: 52, pos: 'upperLeft', media: {src: 'melt/mt40_autoclose.jpg', type: 'img', effect: 'in'}},
  // 41
  {dur: 46, kind: 'text', reveal: [2], text: 'close those positions.', highlights: ['close'], size: 52, pos: 'left', media: {src: 'melt/mt41_closepos.jpg', type: 'img', effect: 'in'}},
  // 42
  {dur: 42, kind: 'text', reveal: [2], text: 'Those forced exits can add', highlights: [], size: 46, pos: 'lowerRight', media: {src: 'melt/mt42_exits.jpg', type: 'img', effect: 'in'}},
  // 43
  {dur: 55, kind: 'text', reveal: [2], text: 'even more selling pressure,', highlights: ['pressure,'], size: 50, pos: 'upperRight', media: {src: 'melt/mt43_pressure.jpg', type: 'img', effect: 'in'}},
  // 44
  {dur: 41, kind: 'text', reveal: [2], text: 'pushing prices lower', highlights: ['lower'], size: 52, pos: 'right', media: {src: 'melt/mt44_pushing.jpg', type: 'img', effect: 'in'}},
  // 45
  {dur: 88, kind: 'text', reveal: [2, 28], text: 'and triggering another|wave of liquidations.', highlights: ['liquidations.'], size: 44, pos: 'lowerLeft', media: {src: 'melt/mt45_wave.jpg', type: 'img', effect: 'in'}},
  // 46
  {dur: 31, kind: 'text', reveal: [2], text: 'Binance said around', highlights: ['Binance'], size: 52, pos: 'left', media: {src: 'melt/mt46_binancesaid.jpg', type: 'img', effect: 'in'}},
  // 47 CARD
  {dur: 93, kind: 'stat', stat: {pre: 'ASSETS FROZEN', prefix: '~$', value: 3, suffix: 'B'}, media: {src: 'melt/mt47_card3b.jpg', type: 'img', effect: 'in'}},
  // 48
  {dur: 70, kind: 'text', reveal: [2], text: 'while withdrawals remained paused', highlights: ['paused'], size: 50, pos: 'upperRight', media: {src: 'melt/mt48_paused.jpg', type: 'img', effect: 'in'}},
  // 49
  {dur: 44, kind: 'text', reveal: [2], text: 'during security checks.', highlights: [], size: 52, pos: 'lower', media: {src: 'melt/mt49_checks.jpg', type: 'img', effect: 'in'}},
  // 50
  {dur: 44, kind: 'text', reveal: [2], text: 'Blockchain analytics firms', highlights: [], size: 52, pos: 'right', media: {src: 'melt/mt50_analytics.jpg', type: 'img', effect: 'in'}},
  // 51
  {dur: 47, kind: 'text', reveal: [2], text: 'linked the attack to', highlights: [], size: 50, pos: 'upperLeft', media: {src: 'melt/mt51_linked.jpg', type: 'img', effect: 'in'}},
  // 52
  {dur: 86, kind: 'text', reveal: [2], text: 'North Korea affiliated hackers.', highlights: ['hackers.'], size: 50, pos: 'lowerRight', media: {src: 'melt/mt52_northkorea.jpg', type: 'img', effect: 'in'}},
  // 53
  {dur: 58, kind: 'text', reveal: [2], text: 'Meanwhile, traders moved toward', highlights: [], size: 50, pos: 'left', media: {src: 'melt/mt53_movedtoward.jpg', type: 'img', effect: 'in'}},
  // 54
  {dur: 61, kind: 'text', reveal: [2], text: 'defensive options positions,', highlights: ['defensive'], size: 52, pos: 'upperRight', media: {src: 'melt/mt54_defensive.jpg', type: 'img', effect: 'in'}},
  // 55
  {dur: 57, kind: 'text', reveal: [2], text: 'signaling growing concern', highlights: [], size: 52, pos: 'right', media: {src: 'melt/mt55_concern.jpg', type: 'img', effect: 'in'}},
  // 56
  {dur: 63, kind: 'text', reveal: [2, 28], text: 'that the volatility|could continue.', highlights: ['volatility'], size: 48, pos: 'lowerLeft', media: {src: 'melt/mt56_volatility.jpg', type: 'img', effect: 'in'}},
  // 57
  {dur: 52, kind: 'text', reveal: [2], text: 'But the market’s reaction', highlights: [], size: 50, pos: 'upperLeft', media: {src: 'melt/mt57_reaction.jpg', type: 'img', effect: 'in'}},
  // 58
  {dur: 58, kind: 'text', reveal: [2], text: 'raises a bigger question.', highlights: ['question.'], size: 50, pos: 'right', media: {src: 'melt/mt58_question.jpg', type: 'img', effect: 'in'}},
  // 59
  {dur: 84, kind: 'text', reveal: [2, 28], text: 'Is this mainly a|Binance security crisis,', highlights: ['Binance'], size: 44, pos: 'left', media: {src: 'melt/mt59_crisis.jpg', type: 'img', effect: 'in'}},
  // 60
  {dur: 40, kind: 'text', reveal: [2], text: 'or is it exposing', highlights: [], size: 50, pos: 'lowerRight', media: {src: 'melt/mt60_exposing.jpg', type: 'img', effect: 'in'}},
  // 61
  {dur: 80, kind: 'text', reveal: [2], text: 'how fragile crypto markets become', highlights: ['fragile'], size: 46, pos: 'upperRight', media: {src: 'melt/mt61_fragile.jpg', type: 'img', effect: 'in'}},
  // 62
  {dur: 89, kind: 'text', reveal: [2, 28], text: 'when so much trading|depends on leverage?', highlights: ['depends'], size: 44, pos: 'lower', media: {src: 'melt/mt62_depends.jpg', type: 'img', effect: 'in'}},
  // 63
  {dur: 31, kind: 'text', reveal: [2], text: 'Even a sharp rebound', highlights: [], size: 50, pos: 'left', media: {src: 'melt/mt63_sharprebound.jpg', type: 'img', effect: 'in'}},
  // 64
  {dur: 30, kind: 'text', reveal: [2], text: 'can be dangerous', highlights: ['dangerous'], size: 52, pos: 'right', media: {src: 'melt/mt64_dangerous.jpg', type: 'img', effect: 'in'}},
  // 65
  {dur: 29, kind: 'text', reveal: [2], text: 'when traders are forced', highlights: [], size: 50, pos: 'upperLeft', media: {src: 'melt/mt65_forced.jpg', type: 'img', effect: 'in'}},
  // 66
  {dur: 71, kind: 'text', reveal: [2, 28], text: 'to close positions|on both sides.', highlights: ['both'], size: 44, pos: 'lowerRight', media: {src: 'melt/mt66_bothsides.jpg', type: 'img', effect: 'in'}},
  // 67
  {dur: 35, kind: 'text', reveal: [2], text: 'So what do you think?', highlights: [], size: 46, pos: 'upperRight', media: {src: 'melt/mt67_think.jpg', type: 'img', effect: 'in'}},
  // 68
  {dur: 53, kind: 'text', reveal: [2], text: 'Is this a temporary panic', highlights: ['panic'], size: 46, pos: 'left', media: {src: 'melt/mt68_panic.jpg', type: 'img', effect: 'in'}},
  // 69
  {dur: 61, kind: 'text', reveal: [2, 28], text: 'after a major|exchange breach,', highlights: ['breach,'], size: 48, pos: 'right', media: {src: 'melt/mt69_majorbreach.jpg', type: 'img', effect: 'in'}},
  // 70 RED
  {dur: 75, kind: 'impact', redBg: true, text: 'a warning sign for|the entire crypto market?'},
  // 71
  {dur: 40, kind: 'text', reveal: [2], text: 'And would you still trust', highlights: ['trust'], size: 46, pos: 'lowerLeft', media: {src: 'melt/mt71_trust.jpg', type: 'img', effect: 'in'}},
  // 72
  {dur: 48, kind: 'text', reveal: [2], text: 'a centralized exchange', highlights: [], size: 52, pos: 'upper', media: {src: 'melt/mt72_centralized.jpg', type: 'img', effect: 'in'}},
  // 73
  {dur: 47, kind: 'text', reveal: [2], text: 'after an incident like this?', highlights: ['incident'], size: 46, pos: 'lowerRight', media: {src: 'melt/mt73_incident.jpg', type: 'img', effect: 'in'}},
  // 74 CTA
  {dur: 42, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Let us know|in the comments.', highlights: ['comments.'], size: 46, media: {src: 'melt/mt74_comments.jpg', type: 'img', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 190, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 845, src: 'media/sfx_whoosh.mp3', vol: 0.33},
  {at: 1031, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1243, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 2638, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 3974, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 4184, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The crypto meltdown</span>
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
export const MeltdownReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('melt/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('melt/music.mp3')}
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
