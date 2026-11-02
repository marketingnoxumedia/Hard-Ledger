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
// "The freezer hack" reel (FreezerReel) — Hard Ledger house VISUAL format, cybersecurity / infrastructure news topic.
// TOPIC: a cyber-physical attack on refrigeration. Hackers allegedly turned supermarket freezers into "ovens,"
// pushing temperatures to ~122°F and spoiling food; in October hundreds of French supermarkets reportedly suffered
// refrigeration failures after attackers took control of freezer systems. The Pentagon is investigating whether
// similar failures at U.S. military commissaries in August were a cyberattack — per Fortune, more than half a dozen
// commissaries were affected (incl. Fort Irwin CA, Holloman AFB NM, Naval Station Newport RI); the Defense Criminal
// Investigative Service leads a joint probe, coordinating with French authorities. NO confirmed link or confirmed
// hack yet. Why experts worry: commercial refrigeration often runs on internet-connected controllers with outdated
// firmware / weak protections; attackers could change temperatures remotely, and unlike stolen data, spoiled food
// can't be restored. Stakes: destroyed inventory, disrupted food distribution, financial loss, and supply chains for
// communities and bases. Debate: should internet-connected equipment face stricter cybersecurity rules, and what
// critical system is next?
// NOTE ON VOICE: built VERBATIM from a client-supplied script in the influencer "curiosity-gap" format (HOOK /
// CURIOSITY GAP / EARLY CTA / CONTEXT / EVIDENCE / ESCALATION / CONSEQUENCES / CONTROVERSY / AUDIENCE DEBATE), NOT
// the faceless house voice — it NAMES the Pentagon / Fortune / Fort Irwin / Holloman AFB / Naval Station Newport /
// the Defense Criminal Investigative Service, uses an EARLY "follow for more" CTA, and CLOSES on a "let us know in
// the comments" debate CTA. The red beat lands the "spoiled food can't simply be restored." punch. Per the saved
// house preference, captions are <=5-6 words/beat with LARGER on-screen type (Anton ~42-52). 87 beats. 2 stat cards:
// FREEZERS PUSHED TO 122°F; U.S. COMMISSARIES HIT 6+. 1 red impact mid-tail (closes on the comments-CTA media beat),
// no black beat. Captions match the VO verbatim (figures as numerals only on the two cards). Durations/reveals/SFX
// locked to the VO via a scribe_v1 word-timestamp anchor pass (public/freezer/voiceover.mp3, NO inserted pause); its
// own serious, tense cyber-thriller music mixed at 0.2. Built at the house +10% pacing default. OWN distinct footage
// under public/freezer/ (86 stills), NO reuse of any other reel's clips — ledger-checked.
// FOOTAGE is strictly BRAND-FREE and generic — NO supermarket/retailer or military-unit logos/insignia, NO readable
// signage, NO identifiable named base or landmark, NO identifiable real person or politician, NO readable screens/
// code/text, NO national flags, NO readable currency. Generic refrigeration / server-room / data-center / frost /
// grocery-aisle / control-panel / cyber-abstract b-roll only (brand-free).
// **UNVERIFIED — cites specific claims, figures and institutions (freezers to ~122°F; hundreds of French stores; the
// Pentagon / DCIS probe; Fortune's "more than half a dozen" commissaries incl. Fort Irwin / Holloman AFB / Naval
// Station Newport; coordination with French authorities); the script itself states no confirmed link or confirmed
// hack. Rendered as written but MUST be fact-checked against primary sources before publishing.**
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 51, kind: 'hook', reveal: [3, 40], text: 'Hackers may have found', kicker: 'The freezer hack', highlights: ['hackers'], size: 54, media: {src: 'freezer/fz00_hackers.jpg', type: 'img', effect: 'in'}},
  // 1
  {dur: 73, kind: 'text', reveal: [2, 28], text: 'a terrifying new way|to cause damage.', highlights: ['terrifying'], size: 44, pos: 'upperRight', media: {src: 'freezer/fz01_terrifying.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 41, kind: 'text', reveal: [2], text: 'Instead of stealing data,', highlights: ['stealing'], size: 50, pos: 'left', media: {src: 'freezer/fz02_stealing.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 99, kind: 'text', reveal: [2, 28], text: 'they allegedly turned|supermarket freezers into ovens,', highlights: ['ovens'], size: 44, pos: 'lowerRight', media: {src: 'freezer/fz03_ovens.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 31, kind: 'text', reveal: [2], text: 'pushing temperatures to', highlights: [], size: 52, pos: 'upperLeft', media: {src: 'freezer/fz04_pushing.jpg', type: 'img', effect: 'in'}},
  // 5 CARD
  {dur: 59, kind: 'stat', stat: {pre: 'FREEZERS PUSHED TO', value: 122, suffix: '°F'}, media: {src: 'freezer/fz05_card122.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 47, kind: 'text', reveal: [2], text: 'and spoiling food.', highlights: ['spoiling'], size: 52, pos: 'right', media: {src: 'freezer/fz06_spoiling.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 54, kind: 'text', reveal: [2], text: 'Now the Pentagon is investigating', highlights: ['pentagon'], size: 46, pos: 'lower', media: {src: 'freezer/fz07_pentagon.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 59, kind: 'text', reveal: [2], text: 'whether similar freezer failures', highlights: [], size: 50, pos: 'upperLeft', media: {src: 'freezer/fz08_failures.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 31, kind: 'text', reveal: [2], text: 'at U.S. military bases', highlights: [], size: 50, pos: 'upperRight', media: {src: 'freezer/fz09_bases.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 77, kind: 'text', reveal: [2], text: 'were caused by a cyberattack.', highlights: ['cyberattack'], size: 46, pos: 'lowerLeft', media: {src: 'freezer/fz10_cyberattack.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 39, kind: 'text', reveal: [2], text: 'And the unsettling part?', highlights: ['unsettling'], size: 50, pos: 'right', media: {src: 'freezer/fz11_unsettling.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 51, kind: 'text', reveal: [2], text: 'The targets weren’t computers', highlights: [], size: 50, pos: 'left', media: {src: 'freezer/fz12_computers.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 43, kind: 'text', reveal: [2], text: 'or classified networks.', highlights: [], size: 52, pos: 'lowerRight', media: {src: 'freezer/fz13_networks.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 80, kind: 'text', reveal: [2, 28], text: 'They were the systems|keeping food cold.', highlights: ['cold'], size: 44, pos: 'upper', media: {src: 'freezer/fz14_cold.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 72, kind: 'text', reveal: [2, 28], text: 'Follow for more|cybersecurity stories', highlights: ['follow'], size: 48, media: {src: 'freezer/fz15_follow.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 53, kind: 'text', reveal: [2], text: 'showing how digital attacks', highlights: [], size: 50, pos: 'left', media: {src: 'freezer/fz16_digital.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 60, kind: 'text', reveal: [2], text: 'can affect the real world.', highlights: ['real'], size: 46, pos: 'right', media: {src: 'freezer/fz17_realworld.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 40, kind: 'text', reveal: [2], text: 'In October, hundreds', highlights: [], size: 52, pos: 'lowerLeft', media: {src: 'freezer/fz18_october.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 33, kind: 'text', reveal: [2], text: 'of French supermarkets', highlights: ['french'], size: 52, pos: 'upperRight', media: {src: 'freezer/fz19_supermarkets.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 76, kind: 'text', reveal: [2], text: 'experienced refrigeration failures', highlights: ['failures'], size: 52, pos: 'left', media: {src: 'freezer/fz20_reffailures.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 47, kind: 'text', reveal: [2], text: 'after hackers reportedly', highlights: ['hackers'], size: 52, pos: 'lowerRight', media: {src: 'freezer/fz21_hackers2.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 66, kind: 'text', reveal: [2], text: 'took control of freezer systems', highlights: ['control'], size: 46, pos: 'upperLeft', media: {src: 'freezer/fz22_control.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 52, kind: 'text', reveal: [2], text: 'and raised their temperatures.', highlights: [], size: 50, pos: 'right', media: {src: 'freezer/fz23_raised.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 53, kind: 'text', reveal: [2], text: 'The disruption forced stores', highlights: [], size: 50, pos: 'lower', media: {src: 'freezer/fz24_disruption.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 37, kind: 'text', reveal: [2], text: 'to throw away food', highlights: ['throw'], size: 50, pos: 'upperRight', media: {src: 'freezer/fz25_throwaway.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 56, kind: 'text', reveal: [2], text: 'and raised serious questions', highlights: [], size: 50, pos: 'lowerLeft', media: {src: 'freezer/fz26_questions.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 100, kind: 'text', reveal: [2, 28], text: 'about the security|of everyday infrastructure.', highlights: ['infrastructure'], size: 44, pos: 'left', media: {src: 'freezer/fz27_infrastructure.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 33, kind: 'text', reveal: [2], text: 'Then came reports', highlights: [], size: 52, pos: 'right', media: {src: 'freezer/fz28_reports.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 74, kind: 'text', reveal: [2], text: 'of similar refrigeration problems', highlights: [], size: 50, pos: 'lowerRight', media: {src: 'freezer/fz29_problems.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 75, kind: 'text', reveal: [2, 28], text: 'at U.S. military commissaries|in August.', highlights: ['august'], size: 44, pos: 'upperLeft', media: {src: 'freezer/fz30_august.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 28, kind: 'text', reveal: [2], text: 'According to Fortune,', highlights: ['fortune'], size: 52, pos: 'right', media: {src: 'freezer/fz31_fortune.jpg', type: 'img', effect: 'in'}},
  // 32 CARD
  {dur: 118, kind: 'stat', stat: {pre: 'U.S. COMMISSARIES HIT', value: 6, suffix: '+'}, media: {src: 'freezer/fz32_card6.jpg', type: 'img', effect: 'in'}},
  // 33
  {dur: 50, kind: 'text', reveal: [2], text: 'including locations at', highlights: [], size: 52, pos: 'upperRight', media: {src: 'freezer/fz33_locations.jpg', type: 'img', effect: 'in'}},
  // 34
  {dur: 54, kind: 'text', reveal: [2], text: 'Fort Irwin in California,', highlights: ['irwin'], size: 50, pos: 'left', media: {src: 'freezer/fz34_irwin.jpg', type: 'img', effect: 'in'}},
  // 35
  {dur: 74, kind: 'text', reveal: [2, 28], text: 'Holloman Air Force Base|in New Mexico,', highlights: ['holloman'], size: 44, pos: 'lowerLeft', media: {src: 'freezer/fz35_holloman.jpg', type: 'img', effect: 'in'}},
  // 36
  {dur: 69, kind: 'text', reveal: [2, 28], text: 'and Naval Station Newport|in Rhode Island.', highlights: ['newport'], size: 44, pos: 'upper', media: {src: 'freezer/fz36_newport.jpg', type: 'img', effect: 'in'}},
  // 37
  {dur: 51, kind: 'text', reveal: [2], text: 'Investigators are examining', highlights: [], size: 52, pos: 'right', media: {src: 'freezer/fz37_investigators.jpg', type: 'img', effect: 'in'}},
  // 38
  {dur: 94, kind: 'text', reveal: [2, 28], text: 'whether the failures|were caused by a cyberattack.', highlights: ['cyberattack'], size: 44, pos: 'lowerRight', media: {src: 'freezer/fz38_cyberattack2.jpg', type: 'img', effect: 'in'}},
  // 39
  {dur: 69, kind: 'text', reveal: [2, 28], text: 'The Defense Criminal|Investigative Service', highlights: ['defense'], size: 48, pos: 'upperLeft', media: {src: 'freezer/fz39_dcis.jpg', type: 'img', effect: 'in'}},
  // 40
  {dur: 64, kind: 'text', reveal: [2], text: 'is leading a joint probe,', highlights: ['probe'], size: 46, pos: 'left', media: {src: 'freezer/fz40_probe.jpg', type: 'img', effect: 'in'}},
  // 41
  {dur: 46, kind: 'text', reveal: [2, 28], text: 'and U.S. officials|are coordinating', highlights: [], size: 48, pos: 'lowerRight', media: {src: 'freezer/fz41_officials.jpg', type: 'img', effect: 'in'}},
  // 42
  {dur: 38, kind: 'text', reveal: [2], text: 'with French authorities.', highlights: ['french'], size: 52, pos: 'upperRight', media: {src: 'freezer/fz42_frenchauth.jpg', type: 'img', effect: 'in'}},
  // 43
  {dur: 68, kind: 'text', reveal: [2, 28], text: 'But there is no|confirmed evidence yet', highlights: ['evidence'], size: 44, pos: 'right', media: {src: 'freezer/fz43_evidence.jpg', type: 'img', effect: 'in'}},
  // 44
  {dur: 69, kind: 'text', reveal: [2, 28], text: 'that the two incidents|are connected,', highlights: [], size: 44, pos: 'lowerLeft', media: {src: 'freezer/fz44_connected.jpg', type: 'img', effect: 'in'}},
  // 45
  {dur: 95, kind: 'text', reveal: [2, 28], text: 'or that the U.S.|failures were a hack.', highlights: ['hack'], size: 44, pos: 'left', media: {src: 'freezer/fz45_hack.jpg', type: 'img', effect: 'in'}},
  // 46
  {dur: 60, kind: 'text', reveal: [2], text: 'Here’s why cybersecurity experts', highlights: [], size: 50, pos: 'upperRight', media: {src: 'freezer/fz46_experts.jpg', type: 'img', effect: 'in'}},
  // 47
  {dur: 35, kind: 'text', reveal: [2], text: 'are concerned.', highlights: ['concerned'], size: 52, pos: 'lower', media: {src: 'freezer/fz47_concerned.jpg', type: 'img', effect: 'in'}},
  // 48
  {dur: 51, kind: 'text', reveal: [2], text: 'Commercial refrigeration systems', highlights: [], size: 52, pos: 'right', media: {src: 'freezer/fz48_commercial.jpg', type: 'img', effect: 'in'}},
  // 49
  {dur: 81, kind: 'text', reveal: [2, 28], text: 'often rely on|internet-connected controllers.', highlights: ['internet-connected'], size: 48, pos: 'upperLeft', media: {src: 'freezer/fz49_controllers.jpg', type: 'img', effect: 'in'}},
  // 50
  {dur: 64, kind: 'text', reveal: [2, 28], text: 'Some may be running|outdated firmware', highlights: ['firmware'], size: 44, pos: 'lowerRight', media: {src: 'freezer/fz50_firmware.jpg', type: 'img', effect: 'in'}},
  // 51
  {dur: 60, kind: 'text', reveal: [2, 28], text: 'or have weak|security protections.', highlights: ['weak'], size: 48, pos: 'left', media: {src: 'freezer/fz51_weak.jpg', type: 'img', effect: 'in'}},
  // 52
  {dur: 53, kind: 'text', reveal: [2], text: 'If attackers gain access,', highlights: ['access'], size: 50, pos: 'upperRight', media: {src: 'freezer/fz52_access.jpg', type: 'img', effect: 'in'}},
  // 53
  {dur: 77, kind: 'text', reveal: [2, 28], text: 'they may be able to|change temperatures remotely.', highlights: ['remotely'], size: 44, pos: 'right', media: {src: 'freezer/fz53_remotely.jpg', type: 'img', effect: 'in'}},
  // 54
  {dur: 50, kind: 'text', reveal: [2], text: 'And unlike stolen data,', highlights: [], size: 50, pos: 'lowerLeft', media: {src: 'freezer/fz54_stolendata.jpg', type: 'img', effect: 'in'}},
  // 55 RED
  {dur: 67, kind: 'impact', redBg: true, text: 'spoiled food can’t|simply be restored.'},
  // 56
  {dur: 36, kind: 'text', reveal: [2], text: 'The damage can spread', highlights: ['spread'], size: 50, pos: 'upperLeft', media: {src: 'freezer/fz56_spread.jpg', type: 'img', effect: 'in'}},
  // 57
  {dur: 51, kind: 'text', reveal: [2], text: 'far beyond one store.', highlights: [], size: 50, pos: 'right', media: {src: 'freezer/fz57_store.jpg', type: 'img', effect: 'in'}},
  // 58
  {dur: 36, kind: 'text', reveal: [2], text: 'A refrigeration attack could', highlights: [], size: 50, pos: 'left', media: {src: 'freezer/fz58_attack.jpg', type: 'img', effect: 'in'}},
  // 59
  {dur: 42, kind: 'text', reveal: [2], text: 'destroy inventory,', highlights: ['destroy'], size: 52, pos: 'lowerRight', media: {src: 'freezer/fz59_inventory.jpg', type: 'img', effect: 'in'}},
  // 60
  {dur: 44, kind: 'text', reveal: [2], text: 'disrupt food distribution,', highlights: ['disrupt'], size: 52, pos: 'upperRight', media: {src: 'freezer/fz60_distribution.jpg', type: 'img', effect: 'in'}},
  // 61
  {dur: 46, kind: 'text', reveal: [2], text: 'create financial losses,', highlights: ['losses'], size: 52, pos: 'lower', media: {src: 'freezer/fz61_losses.jpg', type: 'img', effect: 'in'}},
  // 62
  {dur: 52, kind: 'text', reveal: [2], text: 'and threaten the supply chains', highlights: ['threaten'], size: 46, pos: 'left', media: {src: 'freezer/fz62_supplychains.jpg', type: 'img', effect: 'in'}},
  // 63
  {dur: 92, kind: 'text', reveal: [2, 28], text: 'that keep communities|and military bases running.', highlights: [], size: 44, pos: 'right', media: {src: 'freezer/fz63_running.jpg', type: 'img', effect: 'in'}},
  // 64
  {dur: 41, kind: 'text', reveal: [2], text: 'At military commissaries,', highlights: [], size: 52, pos: 'upperLeft', media: {src: 'freezer/fz64_commissaries.jpg', type: 'img', effect: 'in'}},
  // 65
  {dur: 50, kind: 'text', reveal: [2], text: 'those stores also serve', highlights: [], size: 50, pos: 'lowerRight', media: {src: 'freezer/fz65_serve.jpg', type: 'img', effect: 'in'}},
  // 66
  {dur: 52, kind: 'text', reveal: [2], text: 'personnel and families', highlights: ['families'], size: 52, pos: 'upperRight', media: {src: 'freezer/fz66_families.jpg', type: 'img', effect: 'in'}},
  // 67
  {dur: 97, kind: 'text', reveal: [2, 28], text: 'who rely on access|to affordable groceries.', highlights: ['affordable'], size: 44, pos: 'left', media: {src: 'freezer/fz67_groceries.jpg', type: 'img', effect: 'in'}},
  // 68
  {dur: 62, kind: 'text', reveal: [2, 28], text: 'And this raises|a bigger question:', highlights: ['bigger'], size: 44, pos: 'right', media: {src: 'freezer/fz68_question.jpg', type: 'img', effect: 'in'}},
  // 69
  {dur: 45, kind: 'text', reveal: [2], text: 'are governments and businesses', highlights: [], size: 50, pos: 'lowerLeft', media: {src: 'freezer/fz69_governments.jpg', type: 'img', effect: 'in'}},
  // 70
  {dur: 77, kind: 'text', reveal: [2, 28], text: 'protecting the systems|that matter most?', highlights: ['most?'], size: 44, pos: 'upper', media: {src: 'freezer/fz70_matter.jpg', type: 'img', effect: 'in'}},
  // 71
  {dur: 65, kind: 'text', reveal: [2], text: 'Cybersecurity often focuses on', highlights: [], size: 50, pos: 'lowerRight', media: {src: 'freezer/fz71_focuses.jpg', type: 'img', effect: 'in'}},
  // 72
  {dur: 70, kind: 'text', reveal: [2], text: 'data, passwords, and networks.', highlights: ['passwords'], size: 50, pos: 'left', media: {src: 'freezer/fz72_passwords.jpg', type: 'img', effect: 'in'}},
  // 73
  {dur: 33, kind: 'text', reveal: [2], text: 'But what happens when', highlights: [], size: 50, pos: 'upperRight', media: {src: 'freezer/fz73_whathappens.jpg', type: 'img', effect: 'in'}},
  // 74
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'attackers target the|physical controls', highlights: ['physical'], size: 48, pos: 'upperRight', media: {src: 'freezer/fz74_physical.jpg', type: 'img', effect: 'in'}},
  // 75
  {dur: 101, kind: 'text', reveal: [2, 28], text: 'behind food, water,|hospitals, or energy?', highlights: ['energy?'], size: 44, pos: 'left', media: {src: 'freezer/fz75_energy.jpg', type: 'img', effect: 'in'}},
  // 76
  {dur: 95, kind: 'text', reveal: [2, 28], text: 'The threat may not be|about stealing information.', highlights: ['information'], size: 44, pos: 'lowerRight', media: {src: 'freezer/fz76_information.jpg', type: 'img', effect: 'in'}},
  // 77
  {dur: 105, kind: 'text', reveal: [2, 28], text: 'It may be about making|essential services fail.', highlights: ['fail'], size: 44, pos: 'upperLeft', media: {src: 'freezer/fz77_fail.jpg', type: 'img', effect: 'in'}},
  // 78
  {dur: 37, kind: 'text', reveal: [2], text: 'So what do you think?', highlights: [], size: 46, pos: 'right', media: {src: 'freezer/fz78_think.jpg', type: 'img', effect: 'in'}},
  // 79
  {dur: 69, kind: 'text', reveal: [2], text: 'Should internet-connected equipment', highlights: [], size: 52, pos: 'lower', media: {src: 'freezer/fz79_equipment.jpg', type: 'img', effect: 'in'}},
  // 80
  {dur: 49, kind: 'text', reveal: [2], text: 'like refrigeration systems', highlights: [], size: 52, pos: 'upperLeft', media: {src: 'freezer/fz80_refsystems.jpg', type: 'img', effect: 'in'}},
  // 81
  {dur: 74, kind: 'text', reveal: [2], text: 'face stricter cybersecurity rules?', highlights: ['stricter'], size: 50, pos: 'upperRight', media: {src: 'freezer/fz81_stricter.jpg', type: 'img', effect: 'in'}},
  // 82
  {dur: 45, kind: 'text', reveal: [2], text: 'And if hackers can manipulate', highlights: ['hackers'], size: 46, pos: 'lowerLeft', media: {src: 'freezer/fz82_manipulate.jpg', type: 'img', effect: 'in'}},
  // 83
  {dur: 77, kind: 'text', reveal: [2, 28], text: 'something as ordinary|as a freezer,', highlights: ['freezer'], size: 44, pos: 'right', media: {src: 'freezer/fz83_ordinary.jpg', type: 'img', effect: 'in'}},
  // 84
  {dur: 37, kind: 'text', reveal: [2], text: 'what critical system', highlights: [], size: 52, pos: 'left', media: {src: 'freezer/fz84_critical.jpg', type: 'img', effect: 'in'}},
  // 85
  {dur: 58, kind: 'text', reveal: [2, 28], text: 'do you think could|be targeted next?', highlights: ['targeted'], size: 44, pos: 'lowerRight', media: {src: 'freezer/fz85_targeted.jpg', type: 'img', effect: 'in'}},
  // 86 CTA
  {dur: 38, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Let us know|in the comments.', highlights: ['comments'], size: 46, media: {src: 'freezer/fz86_comments.jpg', type: 'img', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 295, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 835, src: 'media/sfx_whoosh.mp3', vol: 0.33},
  {at: 1790, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 3280, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 5155, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The freezer hack</span>
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
export const FreezerReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('freezer/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('freezer/music.mp3')}
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
