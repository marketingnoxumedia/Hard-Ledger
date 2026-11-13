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
// "The tropics" reel (StormReel) — Hard Ledger house VISUAL format, U.S. weather / tropical-forecast news topic.
// TOPIC: a late-season Atlantic tropical disturbance being watched near the Bahamas. A non-tropical area of low
// pressure could form along a weakening frontal boundary a few hundred miles NE of the Bahamas and MIGHT acquire
// subtropical characteristics while drifting over the western Atlantic. As of Nov 2 the National Hurricane Center
// gives it a near-zero chance in 48 hours and a 20% chance over 7 days, with the system expected to move E/NE into
// less-favorable conditions. Context: the Atlantic season officially ends Nov 30; late-season systems can still form.
// Measured framing: NOT a named storm, no confirmed direct threat, but forecasts change — follow official updates,
// not viral storm maps. Debate: stay on alert vs. over-coverage making every disturbance sound dangerous.
// NOTE ON VOICE: built VERBATIM from a client-supplied script in the influencer "curiosity-gap" format (HOOK /
// CURIOSITY GAP / EARLY CTA / CONTEXT / EVIDENCE / ESCALATION / CONSEQUENCES / CONTROVERSY / AUDIENCE DEBATE), NOT
// the faceless house voice — it names ONE institution (the National Hurricane Center), uses an EARLY "follow for
// more" CTA, and CLOSES on a "let us know in the comments" debate CTA. Per the saved house preference, captions are
// <=5-6 words/beat with LARGER on-screen type (Anton ~42-52). 91 beats. 2 stat cards: 7-DAY ODDS / 20% / CHANCE TO
// DEVELOP, and ATLANTIC SEASON ENDS / NOV 30 (the script's hard figures). 1 red impact mid-tail ("the risk is not
// over." — the CONTROVERSY thesis; reel closes on the comments-CTA media beat, not the red card), no black beat.
// Captions match the VO verbatim (figures as numerals only on the two cards; "48 hours" kept inline). Durations/
// reveals/SFX locked to the VO via a scribe_v1 word-timestamp anchor pass (public/storm/voiceover.mp3). Built at the
// house +10% pacing default; its own tense, atmospheric weather-news music mixed at 0.2. OWN distinct footage under
// public/storm/ (90 stills), NO reuse of any other reel's clips — ledger-checked.
// FOOTAGE is strictly BRAND-FREE and GENERIC — NO real NHC / NOAA / weather-service logos, graphics or storm-cone
// maps, NO readable maps / charts / screens / station bugs / chyrons, NO identifiable named landmark or skyline, NO
// identifiable faces, NO national flags, NO brand wordmarks. Metaphor-led meteorological b-roll only: open ocean and
// swell, storm clouds and lightning, palms in wind, rain on glass, radar-abstract textures, satellite-style cloud
// swirls (generic, not a real labeled product), empty coastlines and piers, barometers/instruments with no readable
// brand. Hurricane imagery is kept measured to match the script's "don't over-hype a low-odds disturbance" framing.
// **UNVERIFIED — reports a specific, time-stamped live forecast (the Nov 2 NHC odds: near-zero in 48 hrs, 20% in 7
// days; the system's expected E/NE track; the Nov 30 season end). Rendered verbatim as supplied, but the figures,
// dates and characterization MUST be fact-checked against the current NHC advisory before publishing — a live
// tropical forecast changes by the hour.**
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 48, kind: 'hook', reveal: [3, 40], text: 'Hurricane season|is almost over,', kicker: 'The tropics', highlights: ['over'], size: 52, media: {src: 'storm/st00_over.jpg', type: 'img', effect: 'in'}},
  // 1
  {dur: 64, kind: 'text', reveal: [2, 28], text: 'but the Atlantic|isn’t done yet.', highlights: ['atlantic'], size: 44, pos: 'upperRight', media: {src: 'storm/st01_atlantic.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 51, kind: 'text', reveal: [2, 28], text: 'A new disturbance|is being watched', highlights: ['disturbance'], size: 44, pos: 'left', media: {src: 'storm/st02_disturbance.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 34, kind: 'text', reveal: [2], text: 'near the Bahamas,', highlights: ['bahamas'], size: 52, pos: 'lowerRight', media: {src: 'storm/st03_bahamas.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 39, kind: 'text', reveal: [2], text: 'and forecasters say', highlights: [], size: 52, pos: 'upperLeft', media: {src: 'storm/st04_forecasters.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 23, kind: 'text', reveal: [2], text: 'it could develop', highlights: ['develop'], size: 52, pos: 'right', media: {src: 'storm/st05_develop.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 58, kind: 'text', reveal: [2, 28], text: 'into a|subtropical system', highlights: ['subtropical'], size: 50, pos: 'lower', media: {src: 'storm/st06_subtropical.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 35, kind: 'text', reveal: [2], text: 'later this week.', highlights: [], size: 52, pos: 'upperLeft', media: {src: 'storm/st07_week.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 39, kind: 'text', reveal: [2], text: 'But before anyone', highlights: [], size: 52, pos: 'upperRight', media: {src: 'storm/st08_before.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 59, kind: 'text', reveal: [2, 28], text: 'starts calling it|the next hurricane,', highlights: ['hurricane'], size: 44, pos: 'lowerLeft', media: {src: 'storm/st09_next.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 47, kind: 'text', reveal: [2, 28], text: 'there’s an|important detail:', highlights: ['detail'], size: 50, pos: 'right', media: {src: 'storm/st10_detail.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 73, kind: 'text', reveal: [2, 28], text: 'the system’s odds|of developing', highlights: [], size: 48, pos: 'left', media: {src: 'storm/st11_odds.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 49, kind: 'text', reveal: [2], text: 'are still low.', highlights: ['low'], size: 52, pos: 'lowerRight', media: {src: 'storm/st12_low.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 96, kind: 'text', reveal: [2, 28], text: 'So what exactly|are forecasters watching,', highlights: ['watching'], size: 44, pos: 'upper', media: {src: 'storm/st13_watching.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 30, kind: 'text', reveal: [2], text: 'and could it affect', highlights: [], size: 50, pos: 'left', media: {src: 'storm/st14_affect.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 80, kind: 'text', reveal: [2, 28], text: 'the Bahamas|or the U.S.?', highlights: ['bahamas'], size: 48, pos: 'right', media: {src: 'storm/st15_us.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Follow for more|weather updates', highlights: ['follow'], size: 48, media: {src: 'storm/st16_follow.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 50, kind: 'text', reveal: [2], text: 'and stories that matter', highlights: [], size: 50, pos: 'lowerLeft', media: {src: 'storm/st17_stories.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 41, kind: 'text', reveal: [2], text: 'to coastal communities.', highlights: ['coastal'], size: 52, pos: 'upperRight', media: {src: 'storm/st18_coastal.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 54, kind: 'text', reveal: [2, 28], text: 'The National|Hurricane Center says', highlights: [], size: 48, pos: 'left', media: {src: 'storm/st19_nhc.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 48, kind: 'text', reveal: [2, 28], text: 'an area of|low pressure', highlights: ['pressure'], size: 48, pos: 'lowerRight', media: {src: 'storm/st20_pressure.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 28, kind: 'text', reveal: [2], text: 'could form along', highlights: [], size: 52, pos: 'upperLeft', media: {src: 'storm/st21_form.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 51, kind: 'text', reveal: [2, 28], text: 'a weakening|frontal boundary', highlights: ['weakening'], size: 50, pos: 'right', media: {src: 'storm/st22_boundary.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 34, kind: 'text', reveal: [2], text: 'a few hundred miles', highlights: [], size: 50, pos: 'lower', media: {src: 'storm/st23_miles.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 47, kind: 'text', reveal: [2, 28], text: 'northeast of|the Bahamas.', highlights: ['northeast'], size: 50, pos: 'upperRight', media: {src: 'storm/st24_northeast.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 25, kind: 'text', reveal: [2], text: 'If it develops,', highlights: [], size: 52, pos: 'lowerLeft', media: {src: 'storm/st25_ifdevelops.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 41, kind: 'text', reveal: [2], text: 'it may gradually acquire', highlights: [], size: 50, pos: 'left', media: {src: 'storm/st26_acquire.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 45, kind: 'text', reveal: [2, 28], text: 'subtropical|characteristics', highlights: ['subtropical'], size: 52, pos: 'right', media: {src: 'storm/st27_characteristics.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 29, kind: 'text', reveal: [2], text: 'while drifting over', highlights: [], size: 52, pos: 'lowerRight', media: {src: 'storm/st28_drifting.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 37, kind: 'text', reveal: [2], text: 'the western Atlantic.', highlights: ['atlantic'], size: 52, pos: 'upperLeft', media: {src: 'storm/st29_westatlantic.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 48, kind: 'text', reveal: [2], text: 'As of November 2,', highlights: [], size: 50, pos: 'right', media: {src: 'storm/st30_nov2.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 50, kind: 'text', reveal: [2, 28], text: 'the National|Hurricane Center', highlights: [], size: 50, pos: 'upperRight', media: {src: 'storm/st31_nhc2.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 71, kind: 'text', reveal: [2, 28], text: 'gives the system|a near-zero chance', highlights: ['near-zero'], size: 44, pos: 'left', media: {src: 'storm/st32_nearzero.jpg', type: 'img', effect: 'in'}},
  // 33
  {dur: 83, kind: 'text', reveal: [2, 28], text: 'of developing|within 48 hours,', highlights: [], size: 48, pos: 'lowerLeft', media: {src: 'storm/st33_48hours.jpg', type: 'img', effect: 'in'}},
  // 34 CARD
  {dur: 68, kind: 'stat', stat: {pre: '7-DAY ODDS', value: 20, suffix: '%', post: 'CHANCE TO DEVELOP'}, media: {src: 'storm/st34_card20.jpg', type: 'img', effect: 'in'}},
  // 35
  {dur: 47, kind: 'text', reveal: [2], text: 'Forecasters expect it', highlights: [], size: 52, pos: 'upper', media: {src: 'storm/st35_expect.jpg', type: 'img', effect: 'in'}},
  // 36
  {dur: 59, kind: 'text', reveal: [2, 28], text: 'to move east|or northeast', highlights: [], size: 48, pos: 'right', media: {src: 'storm/st36_moveeast.jpg', type: 'img', effect: 'in'}},
  // 37
  {dur: 24, kind: 'text', reveal: [2], text: 'later in the week,', highlights: [], size: 50, pos: 'lowerRight', media: {src: 'storm/st37_laterweek.jpg', type: 'img', effect: 'in'}},
  // 38
  {dur: 56, kind: 'text', reveal: [2], text: 'toward conditions', highlights: [], size: 52, pos: 'upperLeft', media: {src: 'storm/st38_conditions.jpg', type: 'img', effect: 'in'}},
  // 39
  {dur: 59, kind: 'text', reveal: [2, 28], text: 'less favorable|for development.', highlights: ['favorable'], size: 50, pos: 'left', media: {src: 'storm/st39_favorable.jpg', type: 'img', effect: 'in'}},
  // 40
  {dur: 25, kind: 'text', reveal: [2], text: 'And this is happening', highlights: [], size: 50, pos: 'lowerRight', media: {src: 'storm/st40_happening.jpg', type: 'img', effect: 'in'}},
  // 41
  {dur: 40, kind: 'text', reveal: [2], text: 'during the final month', highlights: ['final'], size: 50, pos: 'upperRight', media: {src: 'storm/st41_finalmonth.jpg', type: 'img', effect: 'in'}},
  // 42
  {dur: 50, kind: 'text', reveal: [2, 28], text: 'of the Atlantic|hurricane season,', highlights: [], size: 48, pos: 'right', media: {src: 'storm/st42_season.jpg', type: 'img', effect: 'in'}},
  // 43 CARD
  {dur: 59, kind: 'stat', stat: {pre: 'ATLANTIC SEASON ENDS', prefix: 'NOV ', value: 30}, media: {src: 'storm/st43_card30.jpg', type: 'img', effect: 'in'}},
  // 44
  {dur: 38, kind: 'text', reveal: [2], text: 'Late-season systems', highlights: ['late-season'], size: 52, pos: 'lowerLeft', media: {src: 'storm/st44_lateseason.jpg', type: 'img', effect: 'in'}},
  // 45
  {dur: 37, kind: 'text', reveal: [2], text: 'can still form,', highlights: ['still'], size: 52, pos: 'left', media: {src: 'storm/st45_stillform.jpg', type: 'img', effect: 'in'}},
  // 46
  {dur: 46, kind: 'text', reveal: [2], text: 'especially over', highlights: [], size: 52, pos: 'upperRight', media: {src: 'storm/st46_especially.jpg', type: 'img', effect: 'in'}},
  // 47
  {dur: 41, kind: 'text', reveal: [2, 28], text: 'the western Atlantic|and Caribbean.', highlights: ['caribbean'], size: 48, pos: 'lower', media: {src: 'storm/st47_caribbean.jpg', type: 'img', effect: 'in'}},
  // 48
  {dur: 82, kind: 'text', reveal: [2, 28], text: 'That means even as|the season winds down,', highlights: [], size: 44, pos: 'right', media: {src: 'storm/st48_windsdown.jpg', type: 'img', effect: 'in'}},
  // 49
  {dur: 65, kind: 'text', reveal: [2, 28], text: 'meteorologists|continue watching', highlights: ['watching'], size: 52, pos: 'upperLeft', media: {src: 'storm/st49_meteorologists.jpg', type: 'img', effect: 'in'}},
  // 50
  {dur: 45, kind: 'text', reveal: [2], text: 'changes in pressure,', highlights: ['pressure'], size: 52, pos: 'lowerRight', media: {src: 'storm/st50_changes.jpg', type: 'img', effect: 'in'}},
  // 51
  {dur: 28, kind: 'text', reveal: [2], text: 'thunderstorms,', highlights: ['thunderstorms'], size: 52, pos: 'left', media: {src: 'storm/st51_thunderstorms.jpg', type: 'img', effect: 'in'}},
  // 52
  {dur: 52, kind: 'text', reveal: [2], text: 'and ocean conditions.', highlights: ['ocean'], size: 52, pos: 'upperRight', media: {src: 'storm/st52_ocean.jpg', type: 'img', effect: 'in'}},
  // 53
  {dur: 37, kind: 'text', reveal: [2, 28], text: 'For now,|the disturbance', highlights: [], size: 50, pos: 'right', media: {src: 'storm/st53_fornow.jpg', type: 'img', effect: 'in'}},
  // 54
  {dur: 50, kind: 'text', reveal: [2], text: 'is not a named storm,', highlights: ['named'], size: 46, pos: 'lowerLeft', media: {src: 'storm/st54_named.jpg', type: 'img', effect: 'in'}},
  // 55
  {dur: 46, kind: 'text', reveal: [2], text: 'and the current forecast', highlights: [], size: 50, pos: 'upperLeft', media: {src: 'storm/st55_currentforecast.jpg', type: 'img', effect: 'in'}},
  // 56
  {dur: 32, kind: 'text', reveal: [2], text: 'does not indicate', highlights: [], size: 52, pos: 'right', media: {src: 'storm/st56_notindicate.jpg', type: 'img', effect: 'in'}},
  // 57
  {dur: 40, kind: 'text', reveal: [2, 28], text: 'a confirmed|direct threat', highlights: ['threat'], size: 50, pos: 'left', media: {src: 'storm/st57_threat.jpg', type: 'img', effect: 'in'}},
  // 58
  {dur: 77, kind: 'text', reveal: [2, 28], text: 'to the Bahamas|or the U.S. mainland.', highlights: [], size: 44, pos: 'lowerRight', media: {src: 'storm/st58_mainland.jpg', type: 'img', effect: 'in'}},
  // 59
  {dur: 48, kind: 'text', reveal: [2], text: 'But forecasts can change', highlights: ['change'], size: 50, pos: 'upperRight', media: {src: 'storm/st59_canchange.jpg', type: 'img', effect: 'in'}},
  // 60
  {dur: 46, kind: 'text', reveal: [2], text: 'as the system develops.', highlights: [], size: 50, pos: 'lower', media: {src: 'storm/st60_asdevelops.jpg', type: 'img', effect: 'in'}},
  // 61
  {dur: 31, kind: 'text', reveal: [2], text: 'Coastal residents', highlights: [], size: 52, pos: 'left', media: {src: 'storm/st61_residents.jpg', type: 'img', effect: 'in'}},
  // 62
  {dur: 34, kind: 'text', reveal: [2], text: 'should keep checking', highlights: [], size: 52, pos: 'right', media: {src: 'storm/st62_checking.jpg', type: 'img', effect: 'in'}},
  // 63
  {dur: 36, kind: 'text', reveal: [2], text: 'official updates', highlights: ['official'], size: 52, pos: 'upperLeft', media: {src: 'storm/st63_official.jpg', type: 'img', effect: 'in'}},
  // 64
  {dur: 46, kind: 'text', reveal: [2], text: 'rather than relying on', highlights: [], size: 50, pos: 'lowerRight', media: {src: 'storm/st64_relying.jpg', type: 'img', effect: 'in'}},
  // 65
  {dur: 32, kind: 'text', reveal: [2], text: 'viral storm maps', highlights: ['viral'], size: 52, pos: 'upperRight', media: {src: 'storm/st65_viral.jpg', type: 'img', effect: 'in'}},
  // 66
  {dur: 56, kind: 'text', reveal: [2], text: 'or unverified predictions.', highlights: ['unverified'], size: 52, pos: 'left', media: {src: 'storm/st66_unverified.jpg', type: 'img', effect: 'in'}},
  // 67
  {dur: 35, kind: 'text', reveal: [2], text: 'Here’s the bigger point:', highlights: [], size: 50, pos: 'right', media: {src: 'storm/st67_biggerpoint.jpg', type: 'img', effect: 'in'}},
  // 68
  {dur: 48, kind: 'text', reveal: [2, 28], text: 'a quiet|hurricane season', highlights: ['quiet'], size: 50, pos: 'lowerLeft', media: {src: 'storm/st68_quiet.jpg', type: 'img', effect: 'in'}},
  // 69 RED
  {dur: 58, kind: 'impact', redBg: true, text: 'doesn’t mean|the risk is over.'},
  // 70
  {dur: 25, kind: 'text', reveal: [2], text: 'Even a system', highlights: [], size: 52, pos: 'upper', media: {src: 'storm/st70_evensystem.jpg', type: 'img', effect: 'in'}},
  // 71
  {dur: 52, kind: 'text', reveal: [2, 28], text: 'with low odds|of developing', highlights: ['low'], size: 48, pos: 'lowerRight', media: {src: 'storm/st71_lowodds.jpg', type: 'img', effect: 'in'}},
  // 72
  {dur: 33, kind: 'text', reveal: [2], text: 'deserves attention,', highlights: ['attention'], size: 52, pos: 'left', media: {src: 'storm/st72_attention.jpg', type: 'img', effect: 'in'}},
  // 73
  {dur: 32, kind: 'text', reveal: [2, 28], text: 'especially when|it’s near', highlights: [], size: 50, pos: 'upperRight', media: {src: 'storm/st73_near.jpg', type: 'img', effect: 'in'}},
  // 74
  {dur: 28, kind: 'text', reveal: [2], text: 'populated islands', highlights: ['populated'], size: 52, pos: 'right', media: {src: 'storm/st74_islands.jpg', type: 'img', effect: 'in'}},
  // 75
  {dur: 35, kind: 'text', reveal: [2], text: 'and coastal regions.', highlights: [], size: 52, pos: 'lowerLeft', media: {src: 'storm/st75_regions.jpg', type: 'img', effect: 'in'}},
  // 76
  {dur: 49, kind: 'text', reveal: [2], text: 'But there’s also a danger', highlights: ['danger'], size: 46, pos: 'left', media: {src: 'storm/st76_danger.jpg', type: 'img', effect: 'in'}},
  // 77
  {dur: 61, kind: 'text', reveal: [2, 28], text: 'in treating|every disturbance', highlights: [], size: 50, pos: 'upperRight', media: {src: 'storm/st77_treating.jpg', type: 'img', effect: 'in'}},
  // 78
  {dur: 59, kind: 'text', reveal: [2, 28], text: 'like an|imminent hurricane.', highlights: ['imminent'], size: 50, pos: 'lowerRight', media: {src: 'storm/st78_imminent.jpg', type: 'img', effect: 'in'}},
  // 79
  {dur: 39, kind: 'text', reveal: [2], text: 'The key is following', highlights: [], size: 50, pos: 'upperLeft', media: {src: 'storm/st79_key.jpg', type: 'img', effect: 'in'}},
  // 80
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'the forecast|as it evolves.', highlights: ['evolves'], size: 48, pos: 'right', media: {src: 'storm/st80_evolves.jpg', type: 'img', effect: 'in'}},
  // 81
  {dur: 20, kind: 'text', reveal: [2], text: 'Do you think people', highlights: [], size: 50, pos: 'lower', media: {src: 'storm/st81_doyouthink.jpg', type: 'img', effect: 'in'}},
  // 82
  {dur: 36, kind: 'text', reveal: [2], text: 'should stay on alert', highlights: ['alert'], size: 50, pos: 'left', media: {src: 'storm/st82_alert.jpg', type: 'img', effect: 'in'}},
  // 83
  {dur: 97, kind: 'text', reveal: [2, 28], text: 'until hurricane season|officially ends,', highlights: [], size: 48, pos: 'upperRight', media: {src: 'storm/st83_officiallyends.jpg', type: 'img', effect: 'in'}},
  // 84
  {dur: 49, kind: 'text', reveal: [2, 28], text: 'or does the|constant coverage', highlights: ['coverage'], size: 48, pos: 'lowerLeft', media: {src: 'storm/st84_coverage.jpg', type: 'img', effect: 'in'}},
  // 85
  {dur: 47, kind: 'text', reveal: [2], text: 'make every disturbance', highlights: [], size: 52, pos: 'right', media: {src: 'storm/st85_makeevery.jpg', type: 'img', effect: 'in'}},
  // 86
  {dur: 67, kind: 'text', reveal: [2, 28], text: 'sound more dangerous|than it is?', highlights: ['dangerous'], size: 44, pos: 'upperLeft', media: {src: 'storm/st86_dangerous.jpg', type: 'img', effect: 'in'}},
  // 87
  {dur: 48, kind: 'text', reveal: [2, 28], text: 'And if you live|in the Bahamas', highlights: [], size: 44, pos: 'lowerRight', media: {src: 'storm/st87_ifyoulive.jpg', type: 'img', effect: 'in'}},
  // 88
  {dur: 47, kind: 'text', reveal: [2], text: 'or along the Gulf Coast,', highlights: ['gulf'], size: 46, pos: 'left', media: {src: 'storm/st88_gulf.jpg', type: 'img', effect: 'in'}},
  // 89
  {dur: 69, kind: 'text', reveal: [2, 28], text: 'are you still keeping an eye|on the tropics?', highlights: ['tropics?'], size: 44, pos: 'right', media: {src: 'storm/st89_tropics.jpg', type: 'img', effect: 'in'}},
  // 90 CTA
  {dur: 39, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Let us know|in the comments.', highlights: ['comments'], size: 46, media: {src: 'storm/st90_comments.jpg', type: 'img', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 825, src: 'media/sfx_whoosh.mp3', vol: 0.33},
  {at: 1677, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 2105, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 3292, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 4313, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The tropics</span>
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
export const StormReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('storm/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('storm/music.mp3')}
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
