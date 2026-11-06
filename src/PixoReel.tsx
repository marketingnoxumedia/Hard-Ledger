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
// "The Nissan PIXO" reel (PixoReel) — Hard Ledger house VISUAL format, automotive / new-car-reveal topic.
// TOPIC: Nissan unveiled the PIXO, a tiny electric city car for Europe that is under 3.8 m long yet WIDER than the
// Nissan Serena minivan, with retro video-game-style pixel lights. Based on Renault's new Twingo E-Tech Electric
// but with its own design. Specs: 3,796 mm long / 1,790 mm wide; 356 L cargo (1,221 L seats down); 27.5 kWh LFP
// battery; ~259 km WLTP range; 50 kW fast + 11 kW AC charging; Google built-in with Gemini, MyNissan app, e-Pedal,
// collision-mitigation braking, lane-keep. Revealed 23 Sep 2026; EU deliveries early 2027; pricing after Dec 2026
// (base Renault Twingo ~EUR 19,490 in France). Currently Europe-only; no Japan plans announced.
// NOTE ON VOICE: built VERBATIM from a client-supplied script in the influencer "curiosity-gap" format (HOOK /
// CURIOSITY GAP / EARLY CTA / CONTEXT / EVIDENCE / ESCALATION / CONSEQUENCES / CONTROVERSY / AUDIENCE DEBATE), NOT
// the faceless house voice — it NAMES Nissan / PIXO / Renault Twingo / Serena / Leaf / Google / Gemini, uses an
// EARLY "follow for more" CTA, and CLOSES on a "let us know in the comments" debate CTA. The red beat poses the
// would-you-rather (a wide body and limited range — a dealbreaker?). Per the saved house preference, captions are
// <=5-6 words/beat with LARGER on-screen type (Anton ~42-52). 75 beats. 4 stat cards: LENGTH 3,796 MM; LFP BATTERY
// 27.5 KWH; WLTP RANGE 259 KM; BASE TWINGO ~EUR 19,490. 1 red impact mid-tail (closes on the comments-CTA media
// beat), no black beat. Captions match the VO verbatim (figures as numerals only on the cards). Durations/reveals/
// SFX locked to the VO via a scribe_v1 word-timestamp anchor pass (public/pixo/voiceover.mp3, NO inserted pause);
// its own upbeat, energetic automotive-reveal music mixed at 0.2. Built at the house +10% pacing default. OWN
// distinct footage under public/pixo/ (74 stills), NO reuse of any other reel's clips — ledger-checked.
// FOOTAGE is strictly BRAND-FREE and generic — it NAMES the PIXO/Nissan/Renault but shows NONE of it: NO Nissan/
// Renault/any car LOGO, BADGE, wordmark, grille or identifiable model; NO license plates; NO dealership signage; NO
// readable infotainment-brand UI (Google/Gemini/MyNissan); NO identifiable faces; generic EV / charging / city /
// interior / tech b-roll only.
// **UNVERIFIED — cites specific figures and specs (under 3.8 m; 3,796 x 1,790 mm; 356 / 1,221 L; 27.5 kWh LFP;
// ~259 km WLTP; 50 kW / 11 kW charging; reveal 23 Sep 2026; EU deliveries early 2027; pricing after Dec 2026; base
// Twingo ~EUR 19,490) and product/brand claims; rendered as written but MUST be fact-checked before publishing.**
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 35, kind: 'hook', reveal: [3, 40], text: 'Nissan just unveiled', kicker: 'The Nissan PIXO', highlights: [], size: 56, media: {src: 'pixo/px00_unveil.jpg', type: 'img', effect: 'in'}},
  // 1
  {dur: 57, kind: 'text', reveal: [2], text: 'a tiny electric car', highlights: [], size: 50, pos: 'upperRight', media: {src: 'pixo/px01_tinycar.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 61, kind: 'text', reveal: [2], text: 'with a surprisingly wide body.', highlights: ['wide'], size: 46, pos: 'left', media: {src: 'pixo/px02_widebody.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 69, kind: 'text', reveal: [2, 28], text: 'It’s less than|3.8 meters long,', highlights: [], size: 44, pos: 'lowerRight', media: {src: 'pixo/px03_length.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 50, kind: 'text', reveal: [2], text: 'but it’s actually wider', highlights: ['wider'], size: 50, pos: 'upperLeft', media: {src: 'pixo/px04_wider.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 63, kind: 'text', reveal: [2], text: 'than the Nissan Serena minivan.', highlights: ['minivan.'], size: 46, pos: 'right', media: {src: 'pixo/px05_minivan.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 39, kind: 'text', reveal: [2], text: 'And its face looks like', highlights: [], size: 46, pos: 'lower', media: {src: 'pixo/px06_face.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 90, kind: 'text', reveal: [2, 28], text: 'something straight out of|a retro video game.', highlights: ['retro'], size: 44, pos: 'upperLeft', media: {src: 'pixo/px07_retro.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 57, kind: 'text', reveal: [2, 28], text: 'This is the new|Nissan PIXO,', highlights: ['PIXO,'], size: 44, pos: 'upperRight', media: {src: 'pixo/px08_pixo.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 61, kind: 'text', reveal: [2], text: 'designed for European cities.', highlights: [], size: 50, pos: 'lowerLeft', media: {src: 'pixo/px09_cities.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 62, kind: 'text', reveal: [2], text: 'But despite its compact size,', highlights: [], size: 46, pos: 'right', media: {src: 'pixo/px10_compact.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 74, kind: 'text', reveal: [2, 28], text: 'it has a surprisingly|practical interior,', highlights: ['practical'], size: 44, pos: 'left', media: {src: 'pixo/px11_interior.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 42, kind: 'text', reveal: [2], text: 'a useful cargo area,', highlights: [], size: 50, pos: 'lowerRight', media: {src: 'pixo/px12_cargo.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 51, kind: 'text', reveal: [2], text: 'and technology that could make it', highlights: [], size: 42, pos: 'upper', media: {src: 'pixo/px13_tech.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 74, kind: 'text', reveal: [2], text: 'a serious urban EV contender.', highlights: ['contender.'], size: 46, pos: 'left', media: {src: 'pixo/px14_contender.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 50, kind: 'text', reveal: [2, 28], text: 'Follow for more|automotive news', highlights: ['follow'], size: 48, media: {src: 'pixo/px15_follow.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 57, kind: 'text', reveal: [2, 28], text: 'and new cars you|don’t want to miss.', highlights: [], size: 44, pos: 'right', media: {src: 'pixo/px16_miss.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 58, kind: 'text', reveal: [2], text: 'Nissan revealed the PIXO', highlights: [], size: 50, pos: 'lowerLeft', media: {src: 'pixo/px17_revealed.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 77, kind: 'text', reveal: [2], text: 'on September 23, 2026.', highlights: [], size: 50, pos: 'upperRight', media: {src: 'pixo/px18_date.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 37, kind: 'text', reveal: [2], text: 'The car is based on', highlights: [], size: 46, pos: 'left', media: {src: 'pixo/px19_basedon.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 93, kind: 'text', reveal: [2, 28], text: 'Renault’s new Twingo|E Tech Electric,', highlights: [], size: 44, pos: 'lowerRight', media: {src: 'pixo/px20_twingo.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 43, kind: 'text', reveal: [2], text: 'but Nissan has given it', highlights: [], size: 46, pos: 'upperLeft', media: {src: 'pixo/px21_given.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 53, kind: 'text', reveal: [2], text: 'its own distinctive design.', highlights: ['distinctive'], size: 50, pos: 'right', media: {src: 'pixo/px22_design.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 32, kind: 'text', reveal: [2], text: 'Rounded bodywork,', highlights: [], size: 52, pos: 'lower', media: {src: 'pixo/px23_rounded.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 62, kind: 'text', reveal: [2], text: 'square pixel inspired lights,', highlights: ['pixel'], size: 50, pos: 'upperRight', media: {src: 'pixo/px24_pixel.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 42, kind: 'text', reveal: [2], text: 'and a friendly front end', highlights: [], size: 46, pos: 'lowerLeft', media: {src: 'pixo/px25_frontend.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 29, kind: 'text', reveal: [2], text: 'make it stand out', highlights: ['out'], size: 50, pos: 'left', media: {src: 'pixo/px26_standout.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 73, kind: 'text', reveal: [2, 28], text: 'from the usual|small electric cars.', highlights: [], size: 44, pos: 'right', media: {src: 'pixo/px27_usual.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 91, kind: 'text', reveal: [2], text: 'The PIXO measures', highlights: [], size: 52, pos: 'lowerRight', media: {src: 'pixo/px28_measures.jpg', type: 'img', effect: 'in'}},
  // 29 CARD
  {dur: 80, kind: 'stat', stat: {pre: 'LENGTH', value: 3796, suffix: ' MM', post: 'UNDER 3.8 M LONG'}, media: {src: 'pixo/px29_cardlen.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 34, kind: 'text', reveal: [2], text: 'and 1,790 millimeters wide.', highlights: ['wide.'], size: 50, pos: 'upperLeft', media: {src: 'pixo/px30_width.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 29, kind: 'text', reveal: [2], text: 'That makes it shorter', highlights: [], size: 50, pos: 'right', media: {src: 'pixo/px31_shorter.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 28, kind: 'text', reveal: [2], text: 'than the Nissan Leaf,', highlights: [], size: 50, pos: 'upperRight', media: {src: 'pixo/px32_leaf.jpg', type: 'img', effect: 'in'}},
  // 33
  {dur: 63, kind: 'text', reveal: [2, 28], text: 'but wider than|the Serena minivan.', highlights: ['wider'], size: 44, pos: 'left', media: {src: 'pixo/px33_widerthan.jpg', type: 'img', effect: 'in'}},
  // 34
  {dur: 72, kind: 'text', reveal: [2], text: 'Its cargo space offers', highlights: [], size: 50, pos: 'lowerLeft', media: {src: 'pixo/px34_cargospace.jpg', type: 'img', effect: 'in'}},
  // 35
  {dur: 18, kind: 'text', reveal: [2], text: '356 liters,', highlights: ['356'], size: 52, pos: 'upper', media: {src: 'pixo/px35_356.jpg', type: 'img', effect: 'in'}},
  // 36
  {dur: 53, kind: 'text', reveal: [2], text: 'and folding down the rear seats', highlights: [], size: 42, pos: 'right', media: {src: 'pixo/px36_foldseats.jpg', type: 'img', effect: 'in'}},
  // 37
  {dur: 88, kind: 'text', reveal: [2, 28], text: 'expands that to|1,221 liters.', highlights: [], size: 48, pos: 'lowerRight', media: {src: 'pixo/px37_1221.jpg', type: 'img', effect: 'in'}},
  // 38
  {dur: 29, kind: 'text', reveal: [2], text: 'And the technology is', highlights: [], size: 50, pos: 'upperLeft', media: {src: 'pixo/px38_techis.jpg', type: 'img', effect: 'in'}},
  // 39
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'surprisingly advanced|for a small city car.', highlights: ['advanced'], size: 44, pos: 'left', media: {src: 'pixo/px39_advanced.jpg', type: 'img', effect: 'in'}},
  // 40
  {dur: 47, kind: 'text', reveal: [2], text: 'It features a', highlights: [], size: 52, pos: 'lowerRight', media: {src: 'pixo/px40_features.jpg', type: 'img', effect: 'in'}},
  // 41 CARD
  {dur: 88, kind: 'stat', stat: {pre: 'LFP BATTERY', value: 27.5, decimals: 1, suffix: ' KWH'}, media: {src: 'pixo/px41_cardbatt.jpg', type: 'img', effect: 'in'}},
  // 42
  {dur: 92, kind: 'text', reveal: [2, 28], text: 'a maximum estimated|driving range of', highlights: [], size: 44, pos: 'upperRight', media: {src: 'pixo/px42_rangeof.jpg', type: 'img', effect: 'in'}},
  // 43 CARD
  {dur: 99, kind: 'stat', stat: {pre: 'WLTP RANGE', value: 259, suffix: ' KM', post: 'ESTIMATED'}, media: {src: 'pixo/px43_cardrange.jpg', type: 'img', effect: 'in'}},
  // 44
  {dur: 48, kind: 'text', reveal: [2], text: 'and support for both', highlights: [], size: 50, pos: 'right', media: {src: 'pixo/px44_support.jpg', type: 'img', effect: 'in'}},
  // 45
  {dur: 70, kind: 'text', reveal: [2], text: '50 kilowatt fast charging', highlights: ['50'], size: 50, pos: 'lowerLeft', media: {src: 'pixo/px45_fastcharge.jpg', type: 'img', effect: 'in'}},
  // 46
  {dur: 54, kind: 'text', reveal: [2, 28], text: 'and 11 kilowatt|standard charging.', highlights: ['11'], size: 48, pos: 'left', media: {src: 'pixo/px46_stdcharge.jpg', type: 'img', effect: 'in'}},
  // 47
  {dur: 53, kind: 'text', reveal: [2], text: 'Inside, the PIXO includes', highlights: [], size: 50, pos: 'upperRight', media: {src: 'pixo/px47_inside.jpg', type: 'img', effect: 'in'}},
  // 48
  {dur: 57, kind: 'text', reveal: [2], text: 'a digital instrument display,', highlights: [], size: 50, pos: 'lower', media: {src: 'pixo/px48_display.jpg', type: 'img', effect: 'in'}},
  // 49
  {dur: 45, kind: 'text', reveal: [2], text: 'a central touchscreen,', highlights: [], size: 52, pos: 'right', media: {src: 'pixo/px49_touchscreen.jpg', type: 'img', effect: 'in'}},
  // 50
  {dur: 76, kind: 'text', reveal: [2, 28], text: 'Google built in|with Gemini voice control,', highlights: ['Gemini'], size: 44, pos: 'upperLeft', media: {src: 'pixo/px50_gemini.jpg', type: 'img', effect: 'in'}},
  // 51
  {dur: 63, kind: 'text', reveal: [2], text: 'and Nissan’s MyNissan app.', highlights: [], size: 50, pos: 'lowerRight', media: {src: 'pixo/px51_app.jpg', type: 'img', effect: 'in'}},
  // 52
  {dur: 57, kind: 'text', reveal: [2, 28], text: 'It also features|e Pedal driving,', highlights: [], size: 44, pos: 'left', media: {src: 'pixo/px52_epedal.jpg', type: 'img', effect: 'in'}},
  // 53
  {dur: 50, kind: 'text', reveal: [2], text: 'collision mitigation braking,', highlights: ['braking,'], size: 52, pos: 'upperRight', media: {src: 'pixo/px53_braking.jpg', type: 'img', effect: 'in'}},
  // 54
  {dur: 50, kind: 'text', reveal: [2], text: 'and lane keeping assistance.', highlights: [], size: 50, pos: 'right', media: {src: 'pixo/px54_lane.jpg', type: 'img', effect: 'in'}},
  // 55
  {dur: 35, kind: 'text', reveal: [2], text: 'Deliveries in Europe', highlights: [], size: 52, pos: 'lowerLeft', media: {src: 'pixo/px55_deliveries.jpg', type: 'img', effect: 'in'}},
  // 56
  {dur: 97, kind: 'text', reveal: [2, 28], text: 'are expected to begin|in early 2027.', highlights: ['2027.'], size: 44, pos: 'upperLeft', media: {src: 'pixo/px56_early2027.jpg', type: 'img', effect: 'in'}},
  // 57
  {dur: 62, kind: 'text', reveal: [2, 28], text: 'But there is|one big question.', highlights: ['question.'], size: 44, pos: 'right', media: {src: 'pixo/px57_question.jpg', type: 'img', effect: 'in'}},
  // 58
  {dur: 74, kind: 'text', reveal: [2, 28], text: 'The PIXO is currently|intended for Europe,', highlights: [], size: 44, pos: 'left', media: {src: 'pixo/px58_europe.jpg', type: 'img', effect: 'in'}},
  // 59
  {dur: 56, kind: 'text', reveal: [2], text: 'and Nissan has not announced', highlights: [], size: 46, pos: 'lowerRight', media: {src: 'pixo/px59_notannounced.jpg', type: 'img', effect: 'in'}},
  // 60
  {dur: 56, kind: 'text', reveal: [2, 28], text: 'plans to bring it|to Japan.', highlights: ['Japan.'], size: 44, pos: 'upperRight', media: {src: 'pixo/px60_japan.jpg', type: 'img', effect: 'in'}},
  // 61
  {dur: 57, kind: 'text', reveal: [2], text: 'Pricing and final specifications', highlights: [], size: 50, pos: 'lower', media: {src: 'pixo/px61_pricing.jpg', type: 'img', effect: 'in'}},
  // 62
  {dur: 105, kind: 'text', reveal: [2, 28], text: 'are also expected|after December 2026.', highlights: [], size: 44, pos: 'left', media: {src: 'pixo/px62_december.jpg', type: 'img', effect: 'in'}},
  // 63
  {dur: 48, kind: 'text', reveal: [2], text: 'The base Renault Twingo', highlights: [], size: 50, pos: 'right', media: {src: 'pixo/px63_basetwingo.jpg', type: 'img', effect: 'in'}},
  // 64
  {dur: 29, kind: 'text', reveal: [2], text: 'starts at around', highlights: [], size: 52, pos: 'upperLeft', media: {src: 'pixo/px64_startsat.jpg', type: 'img', effect: 'in'}},
  // 65 CARD
  {dur: 103, kind: 'stat', stat: {pre: 'BASE TWINGO', prefix: '~€', value: 19490, post: 'IN FRANCE'}, media: {src: 'pixo/px65_cardprice.jpg', type: 'img', effect: 'in'}},
  // 66
  {dur: 46, kind: 'text', reveal: [2], text: 'so the PIXO may land', highlights: [], size: 46, pos: 'lowerRight', media: {src: 'pixo/px66_mayland.jpg', type: 'img', effect: 'in'}},
  // 67
  {dur: 42, kind: 'text', reveal: [2], text: 'in a similar price range.', highlights: ['price'], size: 46, pos: 'upperRight', media: {src: 'pixo/px67_pricerange.jpg', type: 'img', effect: 'in'}},
  // 68
  {dur: 30, kind: 'text', reveal: [2], text: 'So, would you choose', highlights: [], size: 50, pos: 'left', media: {src: 'pixo/px68_wouldyou.jpg', type: 'img', effect: 'in'}},
  // 69
  {dur: 84, kind: 'text', reveal: [2, 28], text: 'a small electric car|like the Nissan PIXO', highlights: [], size: 44, pos: 'right', media: {src: 'pixo/px69_likepixo.jpg', type: 'img', effect: 'in'}},
  // 70
  {dur: 71, kind: 'text', reveal: [2], text: 'for everyday city driving?', highlights: ['city'], size: 50, pos: 'lowerLeft', media: {src: 'pixo/px70_citydriving.jpg', type: 'img', effect: 'in'}},
  // 71 RED
  {dur: 88, kind: 'impact', redBg: true, text: 'a wide body, limited range|— a dealbreaker?'},
  // 72
  {dur: 34, kind: 'text', reveal: [2], text: 'And should Nissan bring', highlights: [], size: 50, pos: 'upper', media: {src: 'pixo/px72_shouldbring.jpg', type: 'img', effect: 'in'}},
  // 73
  {dur: 61, kind: 'text', reveal: [2, 28], text: 'this cute EV|to more markets?', highlights: ['cute'], size: 44, pos: 'lowerRight', media: {src: 'pixo/px73_markets.jpg', type: 'img', effect: 'in'}},
  // 74 CTA
  {dur: 38, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Let us know|in the comments.', highlights: ['comments.'], size: 46, media: {src: 'pixo/px74_comments.jpg', type: 'img', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 885, src: 'media/sfx_whoosh.mp3', vol: 0.33},
  {at: 1682, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 2293, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 2473, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 3814, src: 'media/sfx_chaching.mp3', vol: 0.46},
  {at: 4190, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 4373, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The Nissan PIXO</span>
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
export const PixoReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('pixo/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('pixo/music.mp3')}
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
