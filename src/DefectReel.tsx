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
// "The defection" reel (DefectReel) — Hard Ledger house VISUAL format, U.S. politics / elections news topic.
// TOPIC: a cross-party endorsement in a pivotal U.S. Senate race. Rep. Haley Stevens (a moderate Michigan Democrat
// who narrowly lost the Democratic Senate primary to progressive Abdul El-Sayed) endorsed REPUBLICAN Mike Rogers two
// days before Election Day, after having initially backed El-Sayed. The feud escalated over Israel remarks, outside
// advertising she called antisemitic, and sharply different views; El-Sayed accused her of reopening a settled
// primary. Reaction: Senate Democratic leader Chuck Schumer called it a "despicable betrayal," the Michigan
// Democratic Party said she was no longer a member, and her chief of staff and several aides resigned. Stakes:
// Michigan is pivotal in the fight for Senate control; the move could energize Rogers, deepen Democratic divisions,
// or be a last-minute distraction. Debate framed BOTH WAYS: a principled break vs. political retaliation after losing
// the primary.
// NOTE ON VOICE: built VERBATIM from a client-supplied script in the influencer "curiosity-gap" format (HOOK /
// CURIOSITY GAP / EARLY CTA / CONTEXT / EVIDENCE / ESCALATION / CONSEQUENCES / CONTROVERSY / AUDIENCE DEBATE), NOT
// the faceless house voice — it NAMES real figures (Haley Stevens / Mike Rogers / Abdul El-Sayed / Chuck Schumer /
// the Michigan Democratic Party), uses an EARLY "follow for more" CTA, and CLOSES on a "let us know in the comments"
// debate CTA. The red beat lands the quoted "a despicable betrayal." punch (attributed in the VO to Schumer). Per
// the saved house preference, captions are <=5-6 words/beat with LARGER on-screen type (Anton ~42-52). 93 beats
// (the longest to date). 1 stat card: ENDORSED ROGERS / 2 DAYS / BEFORE ELECTION DAY (the script's only hard figure).
// 1 red impact mid-tail (closes on the comments-CTA media beat), no black beat. Captions match the VO verbatim
// (figures as numerals only on the single card). Durations/reveals/SFX locked to the VO via a scribe_v1 word-
// timestamp anchor pass (public/defect/voiceover.mp3). Built at the house +10% pacing default; its own tense,
// newsy political-drama music mixed at 0.2. OWN distinct footage under public/defect/ (92 stills), NO reuse of any
// other reel's clips — ledger-checked.
// FOOTAGE is strictly BRAND-FREE, GENERIC and NON-PARTISAN — NO identifiable real politician or person (NO Stevens /
// Rogers / El-Sayed / Schumer), NO party logos or mascots (no donkey/elephant, no DNC/RNC), NO campaign signs with
// real names, NO national flags, NO identifiable named landmark (generic "capitol-style" / legislative / government
// b-roll only, NOT the real U.S. Capitol), NO readable signage, NO identifiable faces, and deliberately NEUTRAL,
// non-inflammatory imagery for the Israel / antisemitism / Medicare policy beats (generic diplomacy / globe /
// healthcare / controversy abstracts — no flags, religious symbols or conflict imagery).
// **UNVERIFIED and POLITICALLY SENSITIVE — names real, living political figures and reports specific recent claims
// and quotes (the two-days-before endorsement; Schumer\'s "despicable betrayal"; the Michigan party expulsion; staff
// resignations; the El-Sayed primary history and policy positions). Rendered verbatim as supplied, both-sides framed,
// but MUST be fact-checked against primary sources and legal/edit-reviewed before publishing.**
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 72, kind: 'hook', reveal: [3, 40], text: 'A Democrat just|crossed party lines', kicker: 'The defection', highlights: ['crossed'], size: 48, media: {src: 'defect/df00_crossed.jpg', type: 'img', effect: 'in'}},
  // 1
  {dur: 25, kind: 'text', reveal: [2], text: 'in one of the most', highlights: [], size: 46, pos: 'upperRight', media: {src: 'defect/df01_most.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 69, kind: 'text', reveal: [2, 28], text: 'important Senate races|in the country.', highlights: ['senate'], size: 44, pos: 'left', media: {src: 'defect/df02_races.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 87, kind: 'text', reveal: [2, 28], text: 'And her own|party is furious.', highlights: ['furious'], size: 44, pos: 'lowerRight', media: {src: 'defect/df03_furious.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 62, kind: 'text', reveal: [2], text: 'Rep. Haley Stevens has endorsed', highlights: ['stevens'], size: 46, pos: 'upperLeft', media: {src: 'defect/df04_stevens.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 52, kind: 'text', reveal: [2], text: 'Republican Mike Rogers,', highlights: ['rogers'], size: 52, pos: 'right', media: {src: 'defect/df05_rogers.jpg', type: 'img', effect: 'in'}},
  // 6 CARD
  {dur: 56, kind: 'stat', stat: {pre: 'ENDORSED ROGERS', value: 2, suffix: ' DAYS', post: 'BEFORE ELECTION DAY'}, media: {src: 'defect/df06_card2.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 86, kind: 'text', reveal: [2, 28], text: 'But this wasn’t|a sudden disagreement', highlights: ['sudden'], size: 44, pos: 'lower', media: {src: 'defect/df07_sudden.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 43, kind: 'text', reveal: [2], text: 'over one policy.', highlights: [], size: 52, pos: 'upperLeft', media: {src: 'defect/df08_policy.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 78, kind: 'text', reveal: [2, 28], text: 'Stevens had previously|criticized Rogers,', highlights: ['criticized'], size: 48, pos: 'upperRight', media: {src: 'defect/df09_criticized.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 55, kind: 'text', reveal: [2, 28], text: 'supported the|Democratic nominee,', highlights: [], size: 50, pos: 'lowerLeft', media: {src: 'defect/df10_nominee.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 63, kind: 'text', reveal: [2], text: 'and even reassured allies', highlights: [], size: 50, pos: 'right', media: {src: 'defect/df11_allies.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 58, kind: 'text', reveal: [2, 28], text: 'she would vote|for her own party.', highlights: ['own'], size: 44, pos: 'left', media: {src: 'defect/df12_ownparty.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 42, kind: 'text', reveal: [2], text: 'So what changed?', highlights: ['changed?'], size: 52, pos: 'lowerRight', media: {src: 'defect/df13_changed.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 53, kind: 'text', reveal: [2], text: 'And could this stunning move', highlights: ['stunning'], size: 46, pos: 'upper', media: {src: 'defect/df14_stunning.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 83, kind: 'text', reveal: [2, 28], text: 'affect who controls|the U.S. Senate?', highlights: ['senate?'], size: 44, pos: 'left', media: {src: 'defect/df15_controls.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 55, kind: 'text', reveal: [2, 28], text: 'Follow for more|political stories', highlights: ['follow'], size: 48, media: {src: 'defect/df16_follow.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 35, kind: 'text', reveal: [2], text: 'and election developments', highlights: [], size: 52, pos: 'right', media: {src: 'defect/df17_developments.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 26, kind: 'text', reveal: [2], text: 'you need to know.', highlights: [], size: 50, pos: 'lowerLeft', media: {src: 'defect/df18_know.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 63, kind: 'text', reveal: [2, 28], text: 'Stevens is a|moderate Democrat', highlights: ['moderate'], size: 48, pos: 'upperRight', media: {src: 'defect/df19_moderate.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 61, kind: 'text', reveal: [2, 28], text: 'from Michigan who|narrowly lost', highlights: ['michigan'], size: 48, pos: 'left', media: {src: 'defect/df20_michigan.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 44, kind: 'text', reveal: [2], text: 'the Democratic Senate primary', highlights: [], size: 50, pos: 'lowerRight', media: {src: 'defect/df21_primary.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 94, kind: 'text', reveal: [2, 28], text: 'to progressive candidate|Abdul El-Sayed.', highlights: ['progressive'], size: 48, pos: 'upperLeft', media: {src: 'defect/df22_elsayed.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 36, kind: 'text', reveal: [2], text: 'After the primary,', highlights: [], size: 52, pos: 'right', media: {src: 'defect/df23_afterprimary.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 71, kind: 'text', reveal: [2], text: 'she initially endorsed El-Sayed,', highlights: ['endorsed'], size: 50, pos: 'lower', media: {src: 'defect/df24_endorsed.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 80, kind: 'text', reveal: [2, 28], text: 'promising to support|the party’s nominee.', highlights: ['nominee'], size: 44, pos: 'upperRight', media: {src: 'defect/df25_promising.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 65, kind: 'text', reveal: [2, 28], text: 'But their relationship|remained tense,', highlights: ['tense'], size: 48, pos: 'lowerLeft', media: {src: 'defect/df26_tense.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 55, kind: 'text', reveal: [2], text: 'especially over Israel,', highlights: [], size: 52, pos: 'left', media: {src: 'defect/df27_israel.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 59, kind: 'text', reveal: [2], text: 'outside campaign advertising,', highlights: [], size: 52, pos: 'right', media: {src: 'defect/df28_advertising.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 84, kind: 'text', reveal: [2, 28], text: 'and their sharply|different political views.', highlights: ['different'], size: 44, pos: 'lowerRight', media: {src: 'defect/df29_views.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 53, kind: 'text', reveal: [2], text: 'The conflict escalated when', highlights: ['escalated'], size: 50, pos: 'upperLeft', media: {src: 'defect/df30_escalated.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 50, kind: 'text', reveal: [2], text: 'Stevens demanded that El-Sayed', highlights: ['demanded'], size: 50, pos: 'right', media: {src: 'defect/df31_demanded.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 62, kind: 'text', reveal: [2, 28], text: 'apologize for|remarks about Israel', highlights: [], size: 48, pos: 'upperRight', media: {src: 'defect/df32_apologize.jpg', type: 'img', effect: 'in'}},
  // 33
  {dur: 78, kind: 'text', reveal: [2, 28], text: 'and condemn an|outside group’s advertisement', highlights: [], size: 44, pos: 'left', media: {src: 'defect/df33_condemn.jpg', type: 'img', effect: 'in'}},
  // 34
  {dur: 87, kind: 'text', reveal: [2], text: 'she described as antisemitic.', highlights: [], size: 50, pos: 'lowerLeft', media: {src: 'defect/df34_antisemitic.jpg', type: 'img', effect: 'in'}},
  // 35
  {dur: 26, kind: 'text', reveal: [2], text: 'El-Sayed accused her', highlights: [], size: 52, pos: 'upper', media: {src: 'defect/df35_accused.jpg', type: 'img', effect: 'in'}},
  // 36
  {dur: 122, kind: 'text', reveal: [2, 28], text: 'of reopening a primary|that had already ended.', highlights: ['reopening'], size: 44, pos: 'right', media: {src: 'defect/df36_reopening.jpg', type: 'img', effect: 'in'}},
  // 37
  {dur: 41, kind: 'text', reveal: [2], text: 'Then, on Sunday,', highlights: ['sunday'], size: 52, pos: 'lowerRight', media: {src: 'defect/df37_sunday.jpg', type: 'img', effect: 'in'}},
  // 38
  {dur: 94, kind: 'text', reveal: [2, 28], text: 'Stevens appeared alongside|Republican Mike Rogers', highlights: ['rogers'], size: 44, pos: 'upperLeft', media: {src: 'defect/df38_alongside.jpg', type: 'img', effect: 'in'}},
  // 39
  {dur: 87, kind: 'text', reveal: [2, 28], text: 'and announced she was|backing him instead.', highlights: ['backing'], size: 44, pos: 'left', media: {src: 'defect/df39_backing.jpg', type: 'img', effect: 'in'}},
  // 40
  {dur: 42, kind: 'text', reveal: [2], text: 'Just days earlier,', highlights: [], size: 52, pos: 'lowerRight', media: {src: 'defect/df40_daysearlier.jpg', type: 'img', effect: 'in'}},
  // 41
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'she had reportedly|told allies', highlights: [], size: 48, pos: 'upperRight', media: {src: 'defect/df41_toldallies.jpg', type: 'img', effect: 'in'}},
  // 42
  {dur: 71, kind: 'text', reveal: [2, 28], text: 'she was still|supporting El-Sayed.', highlights: ['still'], size: 48, pos: 'right', media: {src: 'defect/df42_stillsupporting.jpg', type: 'img', effect: 'in'}},
  // 43
  {dur: 52, kind: 'text', reveal: [2], text: 'The reaction was immediate.', highlights: ['immediate'], size: 50, pos: 'lowerLeft', media: {src: 'defect/df43_immediate.jpg', type: 'img', effect: 'in'}},
  // 44
  {dur: 62, kind: 'text', reveal: [2, 28], text: 'Senate Democratic leader|Chuck Schumer', highlights: ['schumer'], size: 48, pos: 'left', media: {src: 'defect/df44_schumer.jpg', type: 'img', effect: 'in'}},
  // 45
  {dur: 25, kind: 'text', reveal: [2], text: 'called the move', highlights: [], size: 52, pos: 'upperRight', media: {src: 'defect/df45_calledthemove.jpg', type: 'img', effect: 'in'}},
  // 46 RED
  {dur: 57, kind: 'impact', redBg: true, text: 'a despicable|betrayal.'},
  // 47
  {dur: 54, kind: 'text', reveal: [2, 28], text: 'The Michigan|Democratic Party said', highlights: [], size: 48, pos: 'lower', media: {src: 'defect/df47_midemparty.jpg', type: 'img', effect: 'in'}},
  // 48
  {dur: 53, kind: 'text', reveal: [2, 28], text: 'Stevens was|no longer a member', highlights: ['longer'], size: 44, pos: 'right', media: {src: 'defect/df48_nolonger.jpg', type: 'img', effect: 'in'}},
  // 49
  {dur: 51, kind: 'text', reveal: [2, 28], text: 'and would not|be welcome back.', highlights: ['welcome'], size: 44, pos: 'upperLeft', media: {src: 'defect/df49_welcome.jpg', type: 'img', effect: 'in'}},
  // 50
  {dur: 53, kind: 'text', reveal: [2], text: 'And the backlash didn’t stop', highlights: ['backlash'], size: 46, pos: 'lowerRight', media: {src: 'defect/df50_backlash.jpg', type: 'img', effect: 'in'}},
  // 51
  {dur: 53, kind: 'text', reveal: [2], text: 'with party leaders.', highlights: [], size: 52, pos: 'left', media: {src: 'defect/df51_leaders.jpg', type: 'img', effect: 'in'}},
  // 52
  {dur: 23, kind: 'text', reveal: [2], text: 'Stevens’ chief of staff', highlights: ['chief'], size: 50, pos: 'upperRight', media: {src: 'defect/df52_chief.jpg', type: 'img', effect: 'in'}},
  // 53
  {dur: 63, kind: 'text', reveal: [2], text: 'and several other aides resigned,', highlights: ['resigned'], size: 46, pos: 'right', media: {src: 'defect/df53_resigned.jpg', type: 'img', effect: 'in'}},
  // 54
  {dur: 37, kind: 'text', reveal: [2], text: 'saying they were shocked', highlights: ['shocked'], size: 50, pos: 'lowerLeft', media: {src: 'defect/df54_shocked.jpg', type: 'img', effect: 'in'}},
  // 55
  {dur: 65, kind: 'text', reveal: [2, 28], text: 'and heartbroken|by her decision.', highlights: ['heartbroken'], size: 48, pos: 'upperLeft', media: {src: 'defect/df55_heartbroken.jpg', type: 'img', effect: 'in'}},
  // 56
  {dur: 47, kind: 'text', reveal: [2], text: 'The timing could hardly', highlights: [], size: 50, pos: 'right', media: {src: 'defect/df56_timing.jpg', type: 'img', effect: 'in'}},
  // 57
  {dur: 78, kind: 'text', reveal: [2], text: 'be more consequential.', highlights: ['consequential'], size: 52, pos: 'left', media: {src: 'defect/df57_consequential.jpg', type: 'img', effect: 'in'}},
  // 58
  {dur: 57, kind: 'text', reveal: [2, 28], text: 'Michigan’s Senate race|is considered pivotal', highlights: ['pivotal'], size: 44, pos: 'lowerRight', media: {src: 'defect/df58_pivotal.jpg', type: 'img', effect: 'in'}},
  // 59
  {dur: 58, kind: 'text', reveal: [2, 28], text: 'in the battle for|control of the chamber.', highlights: ['control'], size: 44, pos: 'upperRight', media: {src: 'defect/df59_chamber.jpg', type: 'img', effect: 'in'}},
  // 60
  {dur: 55, kind: 'text', reveal: [2], text: 'Democrats need to win', highlights: [], size: 50, pos: 'lower', media: {src: 'defect/df60_needtowin.jpg', type: 'img', effect: 'in'}},
  // 61
  {dur: 49, kind: 'text', reveal: [2], text: 'key races like this one', highlights: [], size: 46, pos: 'left', media: {src: 'defect/df61_keyraces.jpg', type: 'img', effect: 'in'}},
  // 62
  {dur: 66, kind: 'text', reveal: [2], text: 'to have a realistic chance', highlights: [], size: 46, pos: 'right', media: {src: 'defect/df62_chance.jpg', type: 'img', effect: 'in'}},
  // 63
  {dur: 62, kind: 'text', reveal: [2], text: 'of taking back the Senate.', highlights: ['senate.'], size: 46, pos: 'upperLeft', media: {src: 'defect/df63_takingback.jpg', type: 'img', effect: 'in'}},
  // 64
  {dur: 29, kind: 'text', reveal: [2], text: 'Stevens’ endorsement could', highlights: [], size: 52, pos: 'lowerRight', media: {src: 'defect/df64_endorsementcould.jpg', type: 'img', effect: 'in'}},
  // 65
  {dur: 61, kind: 'text', reveal: [2], text: 'energize Rogers’ supporters,', highlights: ['energize'], size: 52, pos: 'upperRight', media: {src: 'defect/df65_energize.jpg', type: 'img', effect: 'in'}},
  // 66
  {dur: 55, kind: 'text', reveal: [2], text: 'deepen Democratic divisions,', highlights: ['divisions'], size: 52, pos: 'left', media: {src: 'defect/df66_divisions.jpg', type: 'img', effect: 'in'}},
  // 67
  {dur: 88, kind: 'text', reveal: [2, 28], text: 'or simply become|a last-minute distraction', highlights: ['distraction'], size: 44, pos: 'right', media: {src: 'defect/df67_distraction.jpg', type: 'img', effect: 'in'}},
  // 68
  {dur: 58, kind: 'text', reveal: [2], text: 'in a race already defined', highlights: [], size: 46, pos: 'lowerLeft', media: {src: 'defect/df68_defined.jpg', type: 'img', effect: 'in'}},
  // 69
  {dur: 59, kind: 'text', reveal: [2], text: 'by fierce disagreements.', highlights: ['fierce'], size: 52, pos: 'upper', media: {src: 'defect/df69_fierce.jpg', type: 'img', effect: 'in'}},
  // 70
  {dur: 50, kind: 'text', reveal: [2], text: 'But here’s the deeper divide.', highlights: ['divide'], size: 46, pos: 'lowerRight', media: {src: 'defect/df70_divide.jpg', type: 'img', effect: 'in'}},
  // 71
  {dur: 79, kind: 'text', reveal: [2, 28], text: 'Stevens represents a|more moderate wing', highlights: ['moderate'], size: 44, pos: 'left', media: {src: 'defect/df71_wing.jpg', type: 'img', effect: 'in'}},
  // 72
  {dur: 71, kind: 'text', reveal: [2], text: 'of the Democratic Party,', highlights: [], size: 50, pos: 'upperRight', media: {src: 'defect/df72_demparty.jpg', type: 'img', effect: 'in'}},
  // 73
  {dur: 30, kind: 'text', reveal: [2], text: 'while El-Sayed has campaigned', highlights: [], size: 50, pos: 'upperRight', media: {src: 'defect/df73_campaigned.jpg', type: 'img', effect: 'in'}},
  // 74
  {dur: 56, kind: 'text', reveal: [2], text: 'on progressive policies,', highlights: ['progressive'], size: 52, pos: 'left', media: {src: 'defect/df74_policies.jpg', type: 'img', effect: 'in'}},
  // 75
  {dur: 40, kind: 'text', reveal: [2], text: 'including Medicare for All', highlights: ['medicare'], size: 50, pos: 'lowerRight', media: {src: 'defect/df75_medicare.jpg', type: 'img', effect: 'in'}},
  // 76
  {dur: 98, kind: 'text', reveal: [2, 28], text: 'and ending unconditional|U.S. aid to Israel.', highlights: ['unconditional'], size: 44, pos: 'upperLeft', media: {src: 'defect/df76_aid.jpg', type: 'img', effect: 'in'}},
  // 77
  {dur: 50, kind: 'text', reveal: [2], text: 'Some see Stevens’ move', highlights: [], size: 50, pos: 'right', media: {src: 'defect/df77_somesee.jpg', type: 'img', effect: 'in'}},
  // 78
  {dur: 37, kind: 'text', reveal: [2], text: 'as a principled break', highlights: ['principled'], size: 50, pos: 'lower', media: {src: 'defect/df78_principled.jpg', type: 'img', effect: 'in'}},
  // 79
  {dur: 79, kind: 'text', reveal: [2, 28], text: 'with a candidate she|can no longer support.', highlights: [], size: 44, pos: 'upperLeft', media: {src: 'defect/df79_support.jpg', type: 'img', effect: 'in'}},
  // 80
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Others see it as|political retaliation', highlights: ['retaliation'], size: 44, pos: 'upperRight', media: {src: 'defect/df80_retaliation.jpg', type: 'img', effect: 'in'}},
  // 81
  {dur: 51, kind: 'text', reveal: [2], text: 'after losing the primary.', highlights: [], size: 50, pos: 'lowerLeft', media: {src: 'defect/df81_losing.jpg', type: 'img', effect: 'in'}},
  // 82
  {dur: 48, kind: 'text', reveal: [2], text: 'And with Election Day so close,', highlights: ['close'], size: 42, pos: 'right', media: {src: 'defect/df82_close.jpg', type: 'img', effect: 'in'}},
  // 83
  {dur: 42, kind: 'text', reveal: [2], text: 'there may be little time', highlights: [], size: 46, pos: 'left', media: {src: 'defect/df83_littletime.jpg', type: 'img', effect: 'in'}},
  // 84
  {dur: 80, kind: 'text', reveal: [2, 28], text: 'for Democrats to|repair the damage.', highlights: ['repair'], size: 44, pos: 'lowerRight', media: {src: 'defect/df84_repair.jpg', type: 'img', effect: 'in'}},
  // 85
  {dur: 33, kind: 'text', reveal: [2], text: 'So what do you think?', highlights: [], size: 46, pos: 'upper', media: {src: 'defect/df85_think.jpg', type: 'img', effect: 'in'}},
  // 86
  {dur: 80, kind: 'text', reveal: [2, 28], text: 'Was Haley Stevens|standing by her principles,', highlights: ['principles'], size: 44, pos: 'left', media: {src: 'defect/df86_principles.jpg', type: 'img', effect: 'in'}},
  // 87
  {dur: 67, kind: 'text', reveal: [2, 28], text: 'or did she betray|her own party', highlights: ['betray'], size: 44, pos: 'right', media: {src: 'defect/df87_betray.jpg', type: 'img', effect: 'in'}},
  // 88
  {dur: 59, kind: 'text', reveal: [2], text: 'at the worst possible moment?', highlights: ['worst'], size: 46, pos: 'lowerLeft', media: {src: 'defect/df88_worst.jpg', type: 'img', effect: 'in'}},
  // 89
  {dur: 51, kind: 'text', reveal: [2], text: 'And can Democrats overcome', highlights: [], size: 50, pos: 'upperRight', media: {src: 'defect/df89_overcome.jpg', type: 'img', effect: 'in'}},
  // 90
  {dur: 35, kind: 'text', reveal: [2], text: 'this internal fight', highlights: ['internal'], size: 52, pos: 'left', media: {src: 'defect/df90_internal.jpg', type: 'img', effect: 'in'}},
  // 91
  {dur: 59, kind: 'text', reveal: [2, 28], text: 'to win Michigan’s|Senate seat?', highlights: ['seat?'], size: 48, pos: 'lowerRight', media: {src: 'defect/df91_seat.jpg', type: 'img', effect: 'in'}},
  // 92 CTA
  {dur: 40, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Let us know|in the comments.', highlights: ['comments'], size: 46, media: {src: 'defect/df92_comments.jpg', type: 'img', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 367, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 984, src: 'media/sfx_whoosh.mp3', vol: 0.33},
  {at: 2834, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 5430, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The defection</span>
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
export const DefectReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('defect/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('defect/music.mp3')}
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
