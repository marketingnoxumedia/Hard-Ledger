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
// "The relaunch" reel (ForeverReel) — Hard Ledger house VISUAL format, gaming / video-game news topic.
// TOPIC: a major relaunch of a classic MMO, told verbatim from a client-supplied gaming-news script about
// "World of Warcraft: Forever" — a reimagined, evolving version of the original world said to launch globally
// Nov 4, leveling 1-60 across the original continents, with 1,000+ new quests, new destinations, a new playable
// winged race (the "Skyborne" — Horde "Windshapers" / Alliance "High-Order Skyborne"), Classic/Enhanced presets,
// HD/standard models, multiple rulesets (Normal/PvP/Roleplay/Roleplay-PvP), a later Hardcore mode, and raids
// unlocking Dec 9, pitched as an ongoing ("Forever") world rather than a temporary season. Catch: access needs an
// active subscription / game time — not free-to-play. Debate: a needed fresh start vs. staying with Classic.
// NOTE ON VOICE: built VERBATIM from a client-supplied script in the influencer "curiosity-gap" format (HOOK /
// CURIOSITY GAP / EARLY CTA / CONTEXT / EVIDENCE / ESCALATION / CONSEQUENCES / CONTROVERSY / AUDIENCE DEBATE), NOT
// the faceless house voice — it names the real company/product (Blizzard / World of Warcraft) and many proper nouns,
// uses an EARLY "follow for more" CTA, and CLOSES on a "let us know in the comments" debate CTA. Per the saved house
// preference, captions are <=5-6 words/beat with LARGER on-screen type (Anton ~42-52). 94 beats. 3 stat cards:
// LAUNCHES GLOBALLY / NOV 4; MORE THAN / 1,000+ / NEW QUESTS; RAIDS UNLOCK / DEC 9 (the script's hard figures). 1 red
// impact mid-tail ("it isn't / free-to-play." — the CONTROVERSY catch; reel closes on the comments-CTA media beat),
// no black beat. Captions match the VO verbatim (figures as numerals only on the three cards; "1 to 60" / "1 to 12"
// kept inline). Durations/reveals/SFX locked to the VO via a scribe_v1 word-timestamp anchor pass
// (public/forever/voiceover.mp3). Built at the house +10% pacing default; its own epic, driving fantasy/gaming music
// mixed at 0.2. OWN distinct footage under public/forever/ (93 stills), NO reuse of any other reel's clips — ledger-checked.
// FOOTAGE is strictly BRAND-FREE and GENERIC — because the reel names a real game/company, NONE of its actual assets
// appear: NO World of Warcraft / Blizzard logos, screenshots, UI, maps, zone art, or recognizable characters, NO
// Horde/Alliance crests or faction insignia, NO readable game text or wordmarks, NO identifiable faces, NO real
// brand peripherals/logos. Instead: metaphor-led GENERIC epic-fantasy and gaming b-roll — misty mountains, castles
// and ruins, forests and torchlit caverns (raids/dungeons), swords/armor/shields, glowing runes and portals, a
// winged silhouette / feathers for the "Skyborne", plain banners (no insignia), dice/RPG, and a brand-free gaming
// setup (unbranded keyboard/headset/monitor showing abstract glow, never game footage).
// **UNVERIFIED — reports many SPECIFIC, unconfirmed product claims (the "World of Warcraft: Forever" product itself;
// a Nov 4 global launch and Dec 9 raid unlock; "1,000+" quests; the Skyborne race and Windshaper / High-Order names;
// zones Mount Hyjal, Shen'dralas, Riverglades, Zephras Isle; "Warcraft III: Reforged: Forsaken Kingdom"; Molten Core;
// subscription-only access). Several names do not match publicly known World of Warcraft. Rendered VERBATIM as
// supplied, but every figure, date, name and the existence of the product MUST be fact-checked against Blizzard's
// official announcement before publishing.**
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 70, kind: 'hook', reveal: [3, 40], text: 'World of Warcraft', kicker: 'The relaunch', highlights: [], size: 56, media: {src: 'forever/fv00_wow.jpg', type: 'img', effect: 'in'}},
  // 1
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'is getting a|whole new chapter,', highlights: ['new'], size: 44, pos: 'upperRight', media: {src: 'forever/fv01_chapter.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 70, kind: 'text', reveal: [2], text: 'and Blizzard says', highlights: [], size: 52, pos: 'left', media: {src: 'forever/fv02_blizzard.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'this one is built|to last forever.', highlights: ['forever'], size: 44, pos: 'lowerRight', media: {src: 'forever/fv03_forever.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 70, kind: 'text', reveal: [2], text: 'It launches globally', highlights: [], size: 52, pos: 'upperLeft', media: {src: 'forever/fv04_launches.jpg', type: 'img', effect: 'in'}},
  // 5 CARD
  {dur: 70, kind: 'stat', stat: {pre: 'LAUNCHES GLOBALLY', prefix: 'NOV ', value: 4}, media: {src: 'forever/fv05_cardnov4.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'bringing a|reimagined Azeroth,', highlights: ['reimagined'], size: 50, pos: 'right', media: {src: 'forever/fv06_azeroth.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 70, kind: 'text', reveal: [2], text: 'new adventures,', highlights: [], size: 52, pos: 'lower', media: {src: 'forever/fv07_adventures.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'and a brand-new|playable race.', highlights: ['race'], size: 48, pos: 'upperLeft', media: {src: 'forever/fv08_race.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'But this isn’t|just another', highlights: [], size: 48, pos: 'upperRight', media: {src: 'forever/fv09_another.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Classic update|or limited season.', highlights: ['limited'], size: 48, pos: 'lowerLeft', media: {src: 'forever/fv10_limited.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 70, kind: 'text', reveal: [2], text: 'Blizzard is promising', highlights: [], size: 52, pos: 'right', media: {src: 'forever/fv11_promising.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 70, kind: 'text', reveal: [2], text: 'an evolving version', highlights: ['evolving'], size: 52, pos: 'left', media: {src: 'forever/fv12_evolving.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 70, kind: 'text', reveal: [2], text: 'of the original world,', highlights: [], size: 50, pos: 'lowerRight', media: {src: 'forever/fv13_world.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'with new content|planned for years.', highlights: ['years'], size: 44, pos: 'upper', media: {src: 'forever/fv14_years.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'So what exactly|is changing?', highlights: ['changing?'], size: 48, pos: 'left', media: {src: 'forever/fv15_changing.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Follow for more|gaming news', highlights: ['follow'], size: 48, media: {src: 'forever/fv16_follow.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'and updates on|the biggest releases.', highlights: ['biggest'], size: 44, pos: 'right', media: {src: 'forever/fv17_releases.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 70, kind: 'text', reveal: [2], text: 'Blizzard’s new experience', highlights: [], size: 52, pos: 'lowerLeft', media: {src: 'forever/fv18_experience.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'is called|World of Warcraft: Forever.', highlights: ['forever'], size: 44, pos: 'upperRight', media: {src: 'forever/fv19_called.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'It takes place|after the events', highlights: [], size: 44, pos: 'left', media: {src: 'forever/fv20_takesplace.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'of Warcraft III:|Reforged,', highlights: [], size: 50, pos: 'lowerRight', media: {src: 'forever/fv21_reforged.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 70, kind: 'text', reveal: [2], text: 'Forsaken Kingdom,', highlights: [], size: 52, pos: 'upperLeft', media: {src: 'forever/fv22_forsaken.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 70, kind: 'text', reveal: [2], text: 'and before Molten Core.', highlights: ['molten'], size: 50, pos: 'right', media: {src: 'forever/fv23_molten.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 70, kind: 'text', reveal: [2], text: 'Players will journey', highlights: [], size: 52, pos: 'lower', media: {src: 'forever/fv24_journey.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'across the|original continents', highlights: [], size: 50, pos: 'upperRight', media: {src: 'forever/fv25_continents.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'of Eastern Kingdoms|and Kalimdor,', highlights: [], size: 48, pos: 'lowerLeft', media: {src: 'forever/fv26_kalimdor.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 70, kind: 'text', reveal: [2], text: 'leveling from 1 to 60', highlights: [], size: 46, pos: 'left', media: {src: 'forever/fv27_leveling.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'while discovering|new stories', highlights: ['new'], size: 50, pos: 'right', media: {src: 'forever/fv28_stories.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'and revisiting|familiar locations.', highlights: ['familiar'], size: 50, pos: 'lowerRight', media: {src: 'forever/fv29_familiar.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 70, kind: 'text', reveal: [2], text: 'The launch includes', highlights: [], size: 52, pos: 'upperLeft', media: {src: 'forever/fv30_includes.jpg', type: 'img', effect: 'in'}},
  // 31 CARD
  {dur: 70, kind: 'stat', stat: {pre: 'MORE THAN', value: 1000, suffix: '+', post: 'NEW QUESTS'}, media: {src: 'forever/fv31_cardquests.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'and several|new destinations,', highlights: ['destinations'], size: 50, pos: 'right', media: {src: 'forever/fv32_destinations.jpg', type: 'img', effect: 'in'}},
  // 33
  {dur: 70, kind: 'text', reveal: [2], text: 'including Mount Hyjal,', highlights: [], size: 52, pos: 'upperRight', media: {src: 'forever/fv33_hyjal.jpg', type: 'img', effect: 'in'}},
  // 34
  {dur: 70, kind: 'text', reveal: [2], text: 'Shen’dralas, Riverglades,', highlights: [], size: 52, pos: 'left', media: {src: 'forever/fv34_riverglades.jpg', type: 'img', effect: 'in'}},
  // 35
  {dur: 70, kind: 'text', reveal: [2], text: 'and Zephras Isle.', highlights: [], size: 52, pos: 'lowerLeft', media: {src: 'forever/fv35_zephras.jpg', type: 'img', effect: 'in'}},
  // 36
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'And there’s a|major addition', highlights: ['major'], size: 48, pos: 'upper', media: {src: 'forever/fv36_addition.jpg', type: 'img', effect: 'in'}},
  // 37
  {dur: 70, kind: 'text', reveal: [2], text: 'to character creation:', highlights: [], size: 52, pos: 'right', media: {src: 'forever/fv37_creation.jpg', type: 'img', effect: 'in'}},
  // 38
  {dur: 70, kind: 'text', reveal: [2], text: 'the Skyborne,', highlights: ['skyborne'], size: 52, pos: 'lowerRight', media: {src: 'forever/fv38_skyborne.jpg', type: 'img', effect: 'in'}},
  // 39
  {dur: 70, kind: 'text', reveal: [2], text: 'a new playable race', highlights: ['race'], size: 50, pos: 'upperLeft', media: {src: 'forever/fv39_newrace.jpg', type: 'img', effect: 'in'}},
  // 40
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'with its own|level 1 to 12', highlights: [], size: 44, pos: 'left', media: {src: 'forever/fv40_level12.jpg', type: 'img', effect: 'in'}},
  // 41
  {dur: 70, kind: 'text', reveal: [2], text: 'starting experience.', highlights: [], size: 52, pos: 'lowerRight', media: {src: 'forever/fv41_starting.jpg', type: 'img', effect: 'in'}},
  // 42
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Skyborne players|can choose', highlights: ['skyborne'], size: 50, pos: 'upperRight', media: {src: 'forever/fv42_choose.jpg', type: 'img', effect: 'in'}},
  // 43
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'to join the Horde|as Windshapers', highlights: ['horde'], size: 44, pos: 'right', media: {src: 'forever/fv43_horde.jpg', type: 'img', effect: 'in'}},
  // 44
  {dur: 70, kind: 'text', reveal: [2], text: 'or the Alliance', highlights: ['alliance'], size: 52, pos: 'lowerLeft', media: {src: 'forever/fv44_alliance.jpg', type: 'img', effect: 'in'}},
  // 45
  {dur: 70, kind: 'text', reveal: [2], text: 'as High-Order Skyborne,', highlights: [], size: 52, pos: 'left', media: {src: 'forever/fv45_highorder.jpg', type: 'img', effect: 'in'}},
  // 46
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'with different|class options.', highlights: ['class'], size: 50, pos: 'upperRight', media: {src: 'forever/fv46_class.jpg', type: 'img', effect: 'in'}},
  // 47
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Blizzard is also|giving players', highlights: [], size: 48, pos: 'lower', media: {src: 'forever/fv47_giving.jpg', type: 'img', effect: 'in'}},
  // 48
  {dur: 70, kind: 'text', reveal: [2], text: 'more control over', highlights: ['control'], size: 52, pos: 'right', media: {src: 'forever/fv48_control.jpg', type: 'img', effect: 'in'}},
  // 49
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'how the game|looks and feels.', highlights: [], size: 44, pos: 'upperLeft', media: {src: 'forever/fv49_looksfeels.jpg', type: 'img', effect: 'in'}},
  // 50
  {dur: 70, kind: 'text', reveal: [2], text: 'You can choose between', highlights: [], size: 50, pos: 'lowerRight', media: {src: 'forever/fv50_choose2.jpg', type: 'img', effect: 'in'}},
  // 51
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Classic and Enhanced|presets,', highlights: ['enhanced'], size: 50, pos: 'left', media: {src: 'forever/fv51_presets.jpg', type: 'img', effect: 'in'}},
  // 52
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'plus high-definition|or standard models.', highlights: [], size: 48, pos: 'upperRight', media: {src: 'forever/fv52_models.jpg', type: 'img', effect: 'in'}},
  // 53
  {dur: 70, kind: 'text', reveal: [2], text: 'The game also introduces', highlights: [], size: 50, pos: 'right', media: {src: 'forever/fv53_introduces.jpg', type: 'img', effect: 'in'}},
  // 54
  {dur: 70, kind: 'text', reveal: [2], text: 'different rulesets,', highlights: ['rulesets'], size: 52, pos: 'lowerLeft', media: {src: 'forever/fv54_rulesets.jpg', type: 'img', effect: 'in'}},
  // 55
  {dur: 70, kind: 'text', reveal: [2], text: 'including Normal, PvP,', highlights: [], size: 52, pos: 'upperLeft', media: {src: 'forever/fv55_normalpvp.jpg', type: 'img', effect: 'in'}},
  // 56
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Roleplay,|and Roleplay PvP.', highlights: ['roleplay'], size: 50, pos: 'right', media: {src: 'forever/fv56_roleplay.jpg', type: 'img', effect: 'in'}},
  // 57
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'For players who want|a tougher challenge,', highlights: ['tougher'], size: 44, pos: 'left', media: {src: 'forever/fv57_challenge.jpg', type: 'img', effect: 'in'}},
  // 58
  {dur: 70, kind: 'text', reveal: [2], text: 'Hardcore mode is planned', highlights: ['hardcore'], size: 50, pos: 'lowerRight', media: {src: 'forever/fv58_hardcore.jpg', type: 'img', effect: 'in'}},
  // 59
  {dur: 70, kind: 'text', reveal: [2], text: 'to arrive after launch.', highlights: [], size: 50, pos: 'upperRight', media: {src: 'forever/fv59_afterlaunch.jpg', type: 'img', effect: 'in'}},
  // 60
  {dur: 70, kind: 'text', reveal: [2], text: 'And this is where', highlights: [], size: 50, pos: 'lower', media: {src: 'forever/fv60_thisiswhere.jpg', type: 'img', effect: 'in'}},
  // 61
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'the Forever promise|gets interesting.', highlights: ['forever'], size: 48, pos: 'left', media: {src: 'forever/fv61_promise.jpg', type: 'img', effect: 'in'}},
  // 62
  {dur: 70, kind: 'text', reveal: [2], text: 'Blizzard says new raids', highlights: ['raids'], size: 50, pos: 'right', media: {src: 'forever/fv62_raids.jpg', type: 'img', effect: 'in'}},
  // 63
  {dur: 70, kind: 'text', reveal: [2], text: 'will begin unlocking', highlights: [], size: 52, pos: 'upperLeft', media: {src: 'forever/fv63_unlocking.jpg', type: 'img', effect: 'in'}},
  // 64 CARD
  {dur: 70, kind: 'stat', stat: {pre: 'RAIDS UNLOCK', prefix: 'DEC ', value: 9}, media: {src: 'forever/fv64_carddec9.jpg', type: 'img', effect: 'in'}},
  // 65
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'followed by|more dungeons,', highlights: ['dungeons'], size: 50, pos: 'lowerRight', media: {src: 'forever/fv65_dungeons.jpg', type: 'img', effect: 'in'}},
  // 66
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'PvP updates,|world content,', highlights: [], size: 50, pos: 'upperRight', media: {src: 'forever/fv66_worldcontent.jpg', type: 'img', effect: 'in'}},
  // 67
  {dur: 70, kind: 'text', reveal: [2], text: 'and additional quests', highlights: [], size: 52, pos: 'left', media: {src: 'forever/fv67_addquests.jpg', type: 'img', effect: 'in'}},
  // 68
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'throughout the|1 to 60 journey.', highlights: [], size: 44, pos: 'right', media: {src: 'forever/fv68_journey2.jpg', type: 'img', effect: 'in'}},
  // 69
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'The goal is to|keep expanding', highlights: ['expanding'], size: 44, pos: 'lowerLeft', media: {src: 'forever/fv69_expanding.jpg', type: 'img', effect: 'in'}},
  // 70
  {dur: 70, kind: 'text', reveal: [2], text: 'this version of Azeroth,', highlights: ['azeroth'], size: 50, pos: 'upper', media: {src: 'forever/fv70_version.jpg', type: 'img', effect: 'in'}},
  // 71
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'rather than a|temporary season', highlights: ['temporary'], size: 48, pos: 'lowerRight', media: {src: 'forever/fv71_temporary.jpg', type: 'img', effect: 'in'}},
  // 72
  {dur: 70, kind: 'text', reveal: [2], text: 'or a short-lived mode.', highlights: [], size: 50, pos: 'left', media: {src: 'forever/fv72_shortlived.jpg', type: 'img', effect: 'in'}},
  // 73
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'But there’s one|important detail:', highlights: [], size: 48, pos: 'upperRight', media: {src: 'forever/fv73_detail.jpg', type: 'img', effect: 'in'}},
  // 74
  {dur: 70, kind: 'text', reveal: [2], text: 'access is included', highlights: ['included'], size: 52, pos: 'right', media: {src: 'forever/fv74_included.jpg', type: 'img', effect: 'in'}},
  // 75
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'with an active|subscription', highlights: ['subscription'], size: 50, pos: 'lowerLeft', media: {src: 'forever/fv75_subscription.jpg', type: 'img', effect: 'in'}},
  // 76
  {dur: 70, kind: 'text', reveal: [2], text: 'or game time.', highlights: [], size: 52, pos: 'left', media: {src: 'forever/fv76_gametime.jpg', type: 'img', effect: 'in'}},
  // 77
  {dur: 70, kind: 'text', reveal: [2], text: 'So while the launch', highlights: [], size: 50, pos: 'upperRight', media: {src: 'forever/fv77_sowhile.jpg', type: 'img', effect: 'in'}},
  // 78
  {dur: 70, kind: 'text', reveal: [2], text: 'is a major opportunity', highlights: ['opportunity'], size: 50, pos: 'lowerRight', media: {src: 'forever/fv78_opportunity.jpg', type: 'img', effect: 'in'}},
  // 79
  {dur: 70, kind: 'text', reveal: [2], text: 'for returning players,', highlights: [], size: 52, pos: 'upperLeft', media: {src: 'forever/fv79_returning.jpg', type: 'img', effect: 'in'}},
  // 80 RED
  {dur: 70, kind: 'impact', redBg: true, text: 'it isn’t|free-to-play.'},
  // 81
  {dur: 70, kind: 'text', reveal: [2], text: 'And the big question', highlights: [], size: 50, pos: 'right', media: {src: 'forever/fv81_bigquestion.jpg', type: 'img', effect: 'in'}},
  // 82
  {dur: 70, kind: 'text', reveal: [2], text: 'is whether Blizzard', highlights: [], size: 52, pos: 'lower', media: {src: 'forever/fv82_whether.jpg', type: 'img', effect: 'in'}},
  // 83
  {dur: 70, kind: 'text', reveal: [2], text: 'can keep the world fresh', highlights: ['fresh'], size: 46, pos: 'left', media: {src: 'forever/fv83_fresh.jpg', type: 'img', effect: 'in'}},
  // 84
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'without losing|the classic feel', highlights: ['classic'], size: 48, pos: 'upperRight', media: {src: 'forever/fv84_classicfeel.jpg', type: 'img', effect: 'in'}},
  // 85
  {dur: 70, kind: 'text', reveal: [2], text: 'that made it popular.', highlights: ['popular'], size: 50, pos: 'lowerLeft', media: {src: 'forever/fv85_popular.jpg', type: 'img', effect: 'in'}},
  // 86
  {dur: 70, kind: 'text', reveal: [2], text: 'So what do you think?', highlights: [], size: 46, pos: 'right', media: {src: 'forever/fv86_think.jpg', type: 'img', effect: 'in'}},
  // 87
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Is World of Warcraft:|Forever', highlights: [], size: 48, pos: 'upperLeft', media: {src: 'forever/fv87_isforever.jpg', type: 'img', effect: 'in'}},
  // 88
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'the fresh start|Azeroth needs,', highlights: ['fresh'], size: 48, pos: 'lowerRight', media: {src: 'forever/fv88_freshstart.jpg', type: 'img', effect: 'in'}},
  // 89
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'or would you|rather Blizzard', highlights: [], size: 48, pos: 'left', media: {src: 'forever/fv89_rather.jpg', type: 'img', effect: 'in'}},
  // 90
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'keep focusing on|Classic and modern?', highlights: ['classic'], size: 44, pos: 'right', media: {src: 'forever/fv90_focusing.jpg', type: 'img', effect: 'in'}},
  // 91
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'And which new|zone or race', highlights: [], size: 44, pos: 'upperRight', media: {src: 'forever/fv91_zonerace.jpg', type: 'img', effect: 'in'}},
  // 92
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'are you most excited|to try?', highlights: ['excited'], size: 44, pos: 'lower', media: {src: 'forever/fv92_excited.jpg', type: 'img', effect: 'in'}},
  // 93 CTA
  {dur: 70, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Let us know|in the comments.', highlights: ['comments'], size: 46, media: {src: 'forever/fv93_comments.jpg', type: 'img', effect: 'in'}},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The relaunch</span>
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
export const ForeverReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('forever/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('forever/music.mp3')}
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
