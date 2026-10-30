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
// "The Miami boom" reel (MiamiReel) — Hard Ledger house VISUAL format, real-estate / markets news topic.
// TOPIC: Miami's luxury real-estate boom and a billionaire vote of confidence. Ken Griffin (founder of Citadel) is
// expanding in Miami — closed ~30 acres in Wynwood for $1.1B and pledged $3B to Carnegie Mellon (incl. $2B for a
// planned Miami campus). Tyko Capital is financing Faena Residences Miami with an $817M construction loan — two
// 68-story towers, 434 luxury condos on the Miami River; sales already topped $500M incl. a $30M penthouse;
// reportedly Florida's largest construction loan ever (surpassing a $772M West Palm Beach deal). Tyko also backed a
// $570M Miami Beach condo loan. Private credit is stepping in where banks are cautious. Upside: jobs, education, a
// stronger business ecosystem. Downside: $1-5M buyers priced out; housing less affordable; Florida's pandemic
// migration boom has slowed. Debate: next global city, or over-betting on luxury demand?
// NOTE ON VOICE: built VERBATIM from a client-supplied script in the influencer "curiosity-gap" format (HOOK /
// CURIOSITY GAP / EARLY CTA / CONTEXT / EVIDENCE / ESCALATION / CONSEQUENCES / CONTROVERSY / AUDIENCE DEBATE), NOT
// the faceless house voice — it NAMES Ken Griffin / Citadel / Carnegie Mellon / Tyko Capital / Faena / Wynwood /
// West Palm Beach, uses an EARLY "follow for more" CTA, and CLOSES on a "let us know in the comments" debate CTA.
// The red beat poses the would-you-rather (betting too much on luxury demand?). Per the saved house preference,
// captions are <=5-6 words/beat with LARGER on-screen type (Anton ~42-52). 90 beats. 4 stat cards: GRIFFIN WYNWOOD
// $1.1B; PLEDGED TO CMU $3B; FAENA CONSTRUCTION LOAN $817M; TWO 68-STORY TOWERS 434 UNITS. 1 red impact mid-tail
// (closes on the comments-CTA media beat), no black beat. Captions match the VO verbatim (figures as numerals only
// on the cards). Durations/reveals/SFX locked to the VO via a scribe_v1 word-timestamp anchor pass
// (public/miami/voiceover.mp3, NO inserted pause); its own confident, upbeat business/real-estate music mixed at
// 0.2. Built at the house +10% pacing default. OWN distinct footage under public/miami/ (89 stills), NO reuse of
// any other reel's clips (incl. the CondoReel Miami branded-residences reel) — ledger-checked.
// FOOTAGE is strictly BRAND-FREE and generic — it NAMES Griffin/Citadel/Faena/CMU but shows NONE of it: NO company
// LOGO/wordmark, NO identifiable real person (NO Ken Griffin), NO identifiable building/development or its branding,
// NO Faena/Citadel/CMU marks, NO readable signage, NO identifiable faces, NO readable foreign text. Generic Miami /
// luxury-real-estate / skyline / construction / money b-roll only (no recognizable named landmark).
// **UNVERIFIED — names real people/entities (Ken Griffin, Citadel, Carnegie Mellon, Tyko Capital, Faena) and cites
// specific figures ($1.1B Wynwood; $3B CMU incl. $2B; $817M Faena loan; two 68-story towers / 434 units; $500M+
// sales; $30M penthouse; $772M WPB; $570M Miami Beach); rendered as written but MUST be fact-checked against
// primary sources before publishing.**
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 70, kind: 'hook', reveal: [3, 40], text: 'Miami’s real estate market', kicker: 'The Miami boom', highlights: [], size: 54, media: {src: 'miami/mi00_market.jpg', type: 'img', effect: 'in'}},
  // 1
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'is getting a|billionaire-sized vote of confidence.', highlights: ['billionaire-sized'], size: 44, pos: 'upperRight', media: {src: 'miami/mi01_vote.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 70, kind: 'text', reveal: [2], text: 'Ken Griffin is pouring', highlights: ['Griffin'], size: 50, pos: 'left', media: {src: 'miami/mi02_griffin.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 70, kind: 'text', reveal: [2], text: 'billions into the city,', highlights: ['billions'], size: 50, pos: 'lowerRight', media: {src: 'miami/mi03_billions.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 70, kind: 'text', reveal: [2], text: 'while a private lender', highlights: [], size: 50, pos: 'upperLeft', media: {src: 'miami/mi04_lender.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 70, kind: 'text', reveal: [2], text: 'just handed developers', highlights: [], size: 52, pos: 'right', media: {src: 'miami/mi05_developers.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'an $817 million|construction loan', highlights: [], size: 48, pos: 'lower', media: {src: 'miami/mi06_817loan.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 70, kind: 'text', reveal: [2], text: 'for a luxury condo project.', highlights: ['luxury'], size: 46, pos: 'upperLeft', media: {src: 'miami/mi07_luxury.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 70, kind: 'text', reveal: [2], text: 'And this isn’t just about', highlights: [], size: 46, pos: 'upperRight', media: {src: 'miami/mi08_notjust.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 70, kind: 'text', reveal: [2], text: 'building expensive apartments.', highlights: ['expensive'], size: 52, pos: 'lowerLeft', media: {src: 'miami/mi09_apartments.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'These deals could help|reshape Miami', highlights: ['reshape'], size: 44, pos: 'right', media: {src: 'miami/mi10_reshape.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 70, kind: 'text', reveal: [2], text: 'into a major hub for', highlights: [], size: 46, pos: 'left', media: {src: 'miami/mi11_hub.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'finance, education,|and wealthy buyers.', highlights: [], size: 48, pos: 'lowerRight', media: {src: 'miami/mi12_wealthy.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 70, kind: 'text', reveal: [2], text: 'But there’s one big question:', highlights: ['question:'], size: 46, pos: 'upper', media: {src: 'miami/mi13_question.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'is the city’s luxury boom|built to last?', highlights: ['boom'], size: 44, pos: 'left', media: {src: 'miami/mi14_boom.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Follow for more business|and real estate stories', highlights: ['follow'], size: 44, media: {src: 'miami/mi15_follow.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 70, kind: 'text', reveal: [2], text: 'changing the world.', highlights: [], size: 52, pos: 'right', media: {src: 'miami/mi16_world.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 70, kind: 'text', reveal: [2], text: 'Billionaire Ken Griffin,', highlights: ['Griffin,'], size: 52, pos: 'lowerLeft', media: {src: 'miami/mi17_billionaire.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 70, kind: 'text', reveal: [2], text: 'founder of Citadel,', highlights: [], size: 52, pos: 'upperRight', media: {src: 'miami/mi18_citadel.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'has been expanding|his footprint in Miami.', highlights: [], size: 44, pos: 'left', media: {src: 'miami/mi19_footprint.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 70, kind: 'text', reveal: [2], text: 'He recently closed on', highlights: [], size: 50, pos: 'lowerRight', media: {src: 'miami/mi20_closed.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 70, kind: 'text', reveal: [2], text: 'roughly 30 acres in Wynwood', highlights: ['Wynwood'], size: 46, pos: 'upperLeft', media: {src: 'miami/mi21_wynwood.jpg', type: 'img', effect: 'in'}},
  // 22 CARD
  {dur: 70, kind: 'stat', stat: {pre: 'GRIFFIN, WYNWOOD', prefix: '$', value: 1.1, decimals: 1, suffix: 'B', post: '~30 ACRES'}, media: {src: 'miami/mi22_card11b.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 70, kind: 'text', reveal: [2], text: 'while also pledging', highlights: [], size: 52, pos: 'right', media: {src: 'miami/mi23_pledging.jpg', type: 'img', effect: 'in'}},
  // 24 CARD
  {dur: 70, kind: 'stat', stat: {pre: 'PLEDGED TO CMU', prefix: '$', value: 3, suffix: 'B', post: 'INCL. $2B MIAMI CAMPUS'}, media: {src: 'miami/mi24_card3b.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 70, kind: 'text', reveal: [2], text: 'including $2 billion', highlights: [], size: 52, pos: 'lower', media: {src: 'miami/mi26_2billion.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 70, kind: 'text', reveal: [2], text: 'for a planned Miami campus.', highlights: ['campus.'], size: 46, pos: 'upperRight', media: {src: 'miami/mi27_campus.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 70, kind: 'text', reveal: [2], text: 'The move is part of', highlights: [], size: 46, pos: 'lowerLeft', media: {src: 'miami/mi28_part.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 70, kind: 'text', reveal: [2], text: 'a broader effort to make', highlights: [], size: 46, pos: 'left', media: {src: 'miami/mi29_effort.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 70, kind: 'text', reveal: [2], text: 'Miami more attractive to', highlights: [], size: 50, pos: 'right', media: {src: 'miami/mi30_attractive.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'businesses, talent,|and major investors.', highlights: ['investors.'], size: 48, pos: 'lowerRight', media: {src: 'miami/mi31_investors.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 70, kind: 'text', reveal: [2], text: 'Meanwhile, Tyko Capital', highlights: ['Tyko'], size: 52, pos: 'upperLeft', media: {src: 'miami/mi32_tyko.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'is financing a massive|new development:', highlights: [], size: 44, pos: 'right', media: {src: 'miami/mi33_financing.jpg', type: 'img', effect: 'in'}},
  // 33 CARD
  {dur: 70, kind: 'stat', stat: {pre: 'FAENA CONSTRUCTION LOAN', prefix: '$', value: 817, suffix: 'M', post: 'LARGEST IN FLORIDA'}, media: {src: 'miami/mi34_card817.jpg', type: 'img', effect: 'in'}},
  // 34
  {dur: 70, kind: 'text', reveal: [2], text: 'for Faena Residences Miami.', highlights: ['Faena'], size: 50, pos: 'upperRight', media: {src: 'miami/mi35_faena.jpg', type: 'img', effect: 'in'}},
  // 35
  {dur: 70, kind: 'text', reveal: [2], text: 'The project will feature', highlights: [], size: 50, pos: 'left', media: {src: 'miami/mi36_feature.jpg', type: 'img', effect: 'in'}},
  // 36
  {dur: 70, kind: 'text', reveal: [2], text: 'two 68 story towers', highlights: [], size: 50, pos: 'lowerLeft', media: {src: 'miami/mi37_towers.jpg', type: 'img', effect: 'in'}},
  // 37 CARD
  {dur: 70, kind: 'stat', stat: {pre: 'TWO 68-STORY TOWERS', value: 434, suffix: ' UNITS', post: 'ALONG THE MIAMI RIVER'}, media: {src: 'miami/mi38_card434.jpg', type: 'img', effect: 'in'}},
  // 38
  {dur: 70, kind: 'text', reveal: [2], text: 'along the Miami River.', highlights: ['River.'], size: 50, pos: 'upper', media: {src: 'miami/mi39_river.jpg', type: 'img', effect: 'in'}},
  // 39
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Developers say sales|have already topped', highlights: [], size: 44, pos: 'right', media: {src: 'miami/mi40_sales.jpg', type: 'img', effect: 'in'}},
  // 40
  {dur: 70, kind: 'text', reveal: [2], text: '$500 million,', highlights: [], size: 52, pos: 'lowerRight', media: {src: 'miami/mi41_500m.jpg', type: 'img', effect: 'in'}},
  // 41
  {dur: 70, kind: 'text', reveal: [2], text: 'including a $30 million penthouse.', highlights: ['penthouse.'], size: 46, pos: 'upperLeft', media: {src: 'miami/mi42_penthouse.jpg', type: 'img', effect: 'in'}},
  // 42
  {dur: 70, kind: 'text', reveal: [2], text: 'It’s reportedly the largest', highlights: ['largest'], size: 50, pos: 'left', media: {src: 'miami/mi43_largest.jpg', type: 'img', effect: 'in'}},
  // 43
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'construction loan ever|recorded in Florida,', highlights: ['Florida,'], size: 44, pos: 'lowerRight', media: {src: 'miami/mi44_florida.jpg', type: 'img', effect: 'in'}},
  // 44
  {dur: 70, kind: 'text', reveal: [2], text: 'surpassing the $772 million', highlights: [], size: 50, pos: 'upperRight', media: {src: 'miami/mi45_772m.jpg', type: 'img', effect: 'in'}},
  // 45
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'financing deal for two|office towers', highlights: [], size: 44, pos: 'right', media: {src: 'miami/mi46_offices.jpg', type: 'img', effect: 'in'}},
  // 46
  {dur: 70, kind: 'text', reveal: [2], text: 'in West Palm Beach.', highlights: [], size: 50, pos: 'lowerLeft', media: {src: 'miami/mi47_wpb.jpg', type: 'img', effect: 'in'}},
  // 47
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'And the money|isn’t stopping there.', highlights: [], size: 44, pos: 'left', media: {src: 'miami/mi48_notstopping.jpg', type: 'img', effect: 'in'}},
  // 48
  {dur: 70, kind: 'text', reveal: [2], text: 'Tyko has also backed', highlights: [], size: 50, pos: 'upperRight', media: {src: 'miami/mi49_alsobacked.jpg', type: 'img', effect: 'in'}},
  // 49
  {dur: 70, kind: 'text', reveal: [2], text: 'other major South Florida projects,', highlights: [], size: 46, pos: 'lower', media: {src: 'miami/mi50_sflprojects.jpg', type: 'img', effect: 'in'}},
  // 50
  {dur: 70, kind: 'text', reveal: [2], text: 'including a $570 million', highlights: [], size: 50, pos: 'right', media: {src: 'miami/mi51_570m.jpg', type: 'img', effect: 'in'}},
  // 51
  {dur: 70, kind: 'text', reveal: [2], text: 'construction loan for a planned', highlights: [], size: 46, pos: 'upperLeft', media: {src: 'miami/mi52_planned.jpg', type: 'img', effect: 'in'}},
  // 52
  {dur: 70, kind: 'text', reveal: [2], text: 'Miami Beach condo development.', highlights: ['condo'], size: 50, pos: 'lowerRight', media: {src: 'miami/mi53_miamibeach.jpg', type: 'img', effect: 'in'}},
  // 53
  {dur: 70, kind: 'text', reveal: [2], text: 'Private credit lenders', highlights: ['Private'], size: 52, pos: 'left', media: {src: 'miami/mi54_privatecredit.jpg', type: 'img', effect: 'in'}},
  // 54
  {dur: 70, kind: 'text', reveal: [2], text: 'are stepping into deals', highlights: [], size: 50, pos: 'upperRight', media: {src: 'miami/mi55_stepping.jpg', type: 'img', effect: 'in'}},
  // 55
  {dur: 70, kind: 'text', reveal: [2], text: 'that traditional banks', highlights: [], size: 52, pos: 'right', media: {src: 'miami/mi56_banks.jpg', type: 'img', effect: 'in'}},
  // 56
  {dur: 70, kind: 'text', reveal: [2], text: 'may be more cautious about,', highlights: ['cautious'], size: 46, pos: 'lowerLeft', media: {src: 'miami/mi57_cautious.jpg', type: 'img', effect: 'in'}},
  // 57
  {dur: 70, kind: 'text', reveal: [2], text: 'helping developers push forward', highlights: [], size: 50, pos: 'upperLeft', media: {src: 'miami/mi58_pushforward.jpg', type: 'img', effect: 'in'}},
  // 58
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'with some of the region’s|biggest projects.', highlights: ['biggest'], size: 44, pos: 'right', media: {src: 'miami/mi59_biggest.jpg', type: 'img', effect: 'in'}},
  // 59
  {dur: 70, kind: 'text', reveal: [2], text: 'For Miami, these investments', highlights: [], size: 50, pos: 'left', media: {src: 'miami/mi60_investments.jpg', type: 'img', effect: 'in'}},
  // 60
  {dur: 70, kind: 'text', reveal: [2], text: 'could mean more jobs,', highlights: ['jobs,'], size: 50, pos: 'lowerRight', media: {src: 'miami/mi61_jobs.jpg', type: 'img', effect: 'in'}},
  // 61
  {dur: 70, kind: 'text', reveal: [2], text: 'new educational opportunities,', highlights: [], size: 52, pos: 'upperRight', media: {src: 'miami/mi62_education.jpg', type: 'img', effect: 'in'}},
  // 62
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'and a stronger|business ecosystem.', highlights: [], size: 48, pos: 'lower', media: {src: 'miami/mi63_ecosystem.jpg', type: 'img', effect: 'in'}},
  // 63
  {dur: 70, kind: 'text', reveal: [2], text: 'But there’s a downside.', highlights: ['downside.'], size: 50, pos: 'left', media: {src: 'miami/mi64_downside.jpg', type: 'img', effect: 'in'}},
  // 64
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Luxury developments are|targeting wealthy buyers,', highlights: ['wealthy'], size: 44, pos: 'right', media: {src: 'miami/mi65_targeting.jpg', type: 'img', effect: 'in'}},
  // 65
  {dur: 70, kind: 'text', reveal: [2], text: 'while people shopping for homes', highlights: [], size: 46, pos: 'upperLeft', media: {src: 'miami/mi66_shopping.jpg', type: 'img', effect: 'in'}},
  // 66
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'in the one to five|million dollar range', highlights: [], size: 44, pos: 'lowerRight', media: {src: 'miami/mi67_range.jpg', type: 'img', effect: 'in'}},
  // 67
  {dur: 70, kind: 'text', reveal: [2], text: 'are reportedly being priced out', highlights: ['priced'], size: 46, pos: 'upperRight', media: {src: 'miami/mi68_pricedout.jpg', type: 'img', effect: 'in'}},
  // 68
  {dur: 70, kind: 'text', reveal: [2], text: 'of some neighborhoods.', highlights: [], size: 52, pos: 'left', media: {src: 'miami/mi69_neighborhoods.jpg', type: 'img', effect: 'in'}},
  // 69
  {dur: 70, kind: 'text', reveal: [2], text: 'The city could be attracting', highlights: [], size: 46, pos: 'right', media: {src: 'miami/mi70_attracting.jpg', type: 'img', effect: 'in'}},
  // 70
  {dur: 70, kind: 'text', reveal: [2], text: 'more capital while making', highlights: [], size: 50, pos: 'lowerLeft', media: {src: 'miami/mi71_capital.jpg', type: 'img', effect: 'in'}},
  // 71
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'housing less affordable|for many residents.', highlights: ['affordable'], size: 44, pos: 'upper', media: {src: 'miami/mi72_residents.jpg', type: 'img', effect: 'in'}},
  // 72
  {dur: 70, kind: 'text', reveal: [2], text: 'And here’s the risk:', highlights: ['risk:'], size: 50, pos: 'lowerRight', media: {src: 'miami/mi73_risk.jpg', type: 'img', effect: 'in'}},
  // 73
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Florida’s pandemic era|migration boom has slowed.', highlights: ['slowed.'], size: 44, pos: 'left', media: {src: 'miami/mi74_slowed.jpg', type: 'img', effect: 'in'}},
  // 74
  {dur: 70, kind: 'text', reveal: [2], text: 'So the real question is', highlights: [], size: 46, pos: 'upperRight', media: {src: 'miami/mi75_realquestion.jpg', type: 'img', effect: 'in'}},
  // 75
  {dur: 70, kind: 'text', reveal: [2], text: 'whether Miami can keep', highlights: [], size: 50, pos: 'upperRight', media: {src: 'miami/mi76_cankeep.jpg', type: 'img', effect: 'in'}},
  // 76
  {dur: 70, kind: 'text', reveal: [2], text: 'attracting enough wealthy buyers', highlights: [], size: 50, pos: 'left', media: {src: 'miami/mi77_enoughbuyers.jpg', type: 'img', effect: 'in'}},
  // 77
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'to support all these|expensive developments.', highlights: [], size: 44, pos: 'lowerRight', media: {src: 'miami/mi78_support.jpg', type: 'img', effect: 'in'}},
  // 78
  {dur: 70, kind: 'text', reveal: [2], text: 'Are billionaires building', highlights: [], size: 52, pos: 'upperLeft', media: {src: 'miami/mi79_building.jpg', type: 'img', effect: 'in'}},
  // 79
  {dur: 70, kind: 'text', reveal: [2], text: 'the next major global city,', highlights: ['global'], size: 46, pos: 'right', media: {src: 'miami/mi80_globalcity.jpg', type: 'img', effect: 'in'}},
  // 80 RED
  {dur: 70, kind: 'impact', redBg: true, text: 'or betting too much|on luxury demand?'},
  // 81
  {dur: 70, kind: 'text', reveal: [2], text: 'What do you think?', highlights: [], size: 50, pos: 'lower', media: {src: 'miami/mi82_think.jpg', type: 'img', effect: 'in'}},
  // 82
  {dur: 70, kind: 'text', reveal: [2], text: 'Is Miami becoming the next', highlights: [], size: 46, pos: 'upperLeft', media: {src: 'miami/mi83_becoming.jpg', type: 'img', effect: 'in'}},
  // 83
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'major financial and|real estate powerhouse,', highlights: ['powerhouse,'], size: 44, pos: 'upperRight', media: {src: 'miami/mi84_powerhouse.jpg', type: 'img', effect: 'in'}},
  // 84
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'or is this luxury boom|going too far?', highlights: ['boom'], size: 44, pos: 'lowerLeft', media: {src: 'miami/mi85_toofar.jpg', type: 'img', effect: 'in'}},
  // 85
  {dur: 70, kind: 'text', reveal: [2], text: 'And should cities prioritize', highlights: [], size: 50, pos: 'right', media: {src: 'miami/mi86_prioritize.jpg', type: 'img', effect: 'in'}},
  // 86
  {dur: 70, kind: 'text', reveal: [2], text: 'attracting billionaire investment,', highlights: ['billionaire'], size: 52, pos: 'left', media: {src: 'miami/mi87_attractbill.jpg', type: 'img', effect: 'in'}},
  // 87
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'even if housing becomes|less affordable?', highlights: ['housing'], size: 44, pos: 'lowerRight', media: {src: 'miami/mi88_housing.jpg', type: 'img', effect: 'in'}},
  // 88 CTA
  {dur: 70, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Let us know|in the comments.', highlights: ['comments.'], size: 46, media: {src: 'miami/mi89_comments.jpg', type: 'img', effect: 'in'}},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The Miami boom</span>
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
export const MiamiReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('miami/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('miami/music.mp3')}
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
