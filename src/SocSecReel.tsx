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
// "The 2032 shortfall" reel (SocSecReel) — Hard Ledger house VISUAL format, personal-finance / policy news topic.
// TOPIC: U.S. Social Security's projected trust-fund shortfall. Per the latest trustees' projections the retirement
// trust fund could run out of reserves in Q4 2032; absent Congressional action, automatic benefit reductions of
// ~22% could follow once the fund is depleted. The CBO is more pessimistic (fund running out earlier in 2032, cuts
// ~26%); the Committee for a Responsible Federal Budget estimates a ~24% cut could mean an ~$500 average monthly
// loss. Drivers: payroll-tax structure + demographic change (lower birth rates, reduced immigration). Stakes:
// retirees' spending (groceries, housing, healthcare), plus broader borrowing costs / financial markets. Fix
// options: raise payroll taxes, lift the income cap on wages subject to SS tax, change benefits, or a mix — each
// with political cost, and lawmakers face elections. Debate: raise taxes on higher earners, or adjust benefits?
// NOTE ON VOICE: built VERBATIM from a client-supplied script in the influencer "curiosity-gap" format (HOOK /
// CURIOSITY GAP / EARLY CTA / CONTEXT / EVIDENCE / ESCALATION / CONSEQUENCES / CONTROVERSY / AUDIENCE DEBATE), NOT
// the faceless house voice — it NAMES the Social Security trustees / Congressional Budget Office / Committee for a
// Responsible Federal Budget / Congress, uses an EARLY "follow for more" CTA, and CLOSES on a "let us know in the
// comments" debate CTA. The red beat lands the "easier said than done." punch. Per the saved house preference,
// captions are <=5-6 words/beat with LARGER on-screen type (Anton ~42-52). 89 beats. 3 stat cards: THE POTENTIAL
// CUT ~22%; CBO PROJECTS CUTS ~26%; AVG MONTHLY LOSS ~$500 (AT A ~24% CUT). 1 red impact mid-tail (closes on the
// comments-CTA media beat), no black beat. Captions match the VO verbatim (figures as numerals only on the three
// cards — years and spelled-out percentages stay as words in the captions, never number cards). Durations/reveals/
// SFX locked to the VO via a scribe_v1 word-timestamp anchor pass (public/socsec/voiceover.mp3, NO inserted pause);
// its own serious, tense policy-news music mixed at 0.2. Built at the house +10% pacing default. OWN distinct
// footage under public/socsec/ (88 stills), NO reuse of any other reel's clips — ledger-checked.
// FOOTAGE is strictly BRAND-FREE and generic — NO Social Security Administration logo/wordmark, NO readable checks
// or government documents, NO identifiable politician or real person, NO Capitol/named-landmark if identifiable, NO
// readable signage, NO identifiable faces, NO readable currency. Generic retirement / money / payroll / elderly-
// hands / Capitol-silhouette / household-spending b-roll only.
// **UNVERIFIED — cites specific figures and institutions (trustees' Q4-2032 depletion & ~22% cut; CBO ~26% / earlier
// 2032; CRFB ~24% cut / ~$500 avg monthly loss); rendered as written but MUST be fact-checked against primary
// sources before publishing.**
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 40, kind: 'hook', reveal: [3, 40], text: 'Millions of Americans', kicker: 'The 2032 shortfall', highlights: [], size: 56, media: {src: 'socsec/ss00_millions.jpg', type: 'img', effect: 'in'}},
  // 1
  {dur: 78, kind: 'text', reveal: [2, 28], text: 'could see their|Social Security checks shrink', highlights: ['shrink'], size: 44, pos: 'upperRight', media: {src: 'socsec/ss01_shrink.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 35, kind: 'text', reveal: [2], text: 'in just six years.', highlights: ['six'], size: 50, pos: 'left', media: {src: 'socsec/ss02_sixyears.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 31, kind: 'text', reveal: [2], text: 'And the potential cut?', highlights: [], size: 50, pos: 'lowerRight', media: {src: 'socsec/ss03_cut.jpg', type: 'img', effect: 'in'}},
  // 4 CARD
  {dur: 41, kind: 'stat', stat: {pre: 'THE POTENTIAL CUT', prefix: '~', value: 22, suffix: '%'}, media: {src: 'socsec/ss04_card22.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 89, kind: 'text', reveal: [2, 28], text: 'But this doesn’t mean|Social Security is disappearing.', highlights: ['disappearing.'], size: 44, pos: 'upperLeft', media: {src: 'socsec/ss05_disappearing.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 58, kind: 'text', reveal: [2, 28], text: 'The money could still|keep coming in.', highlights: [], size: 44, pos: 'right', media: {src: 'socsec/ss06_coming.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 44, kind: 'text', reveal: [2], text: 'The real problem is whether', highlights: ['problem'], size: 46, pos: 'lower', media: {src: 'socsec/ss07_problem.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 29, kind: 'text', reveal: [2], text: 'there will be enough', highlights: [], size: 50, pos: 'upperLeft', media: {src: 'socsec/ss08_enough.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 75, kind: 'text', reveal: [2], text: 'to pay everyone the full amount', highlights: [], size: 42, pos: 'upperRight', media: {src: 'socsec/ss09_fullamount.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 29, kind: 'text', reveal: [2], text: 'they were promised.', highlights: ['promised.'], size: 52, pos: 'lowerLeft', media: {src: 'socsec/ss10_promised.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 46, kind: 'text', reveal: [2], text: 'Follow for more financial news', highlights: ['follow'], size: 46, media: {src: 'socsec/ss11_follow.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 36, kind: 'text', reveal: [2], text: 'that could affect your money', highlights: [], size: 46, pos: 'right', media: {src: 'socsec/ss12_money.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 25, kind: 'text', reveal: [2], text: 'and your future.', highlights: [], size: 52, pos: 'left', media: {src: 'socsec/ss13_future.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 57, kind: 'text', reveal: [2], text: 'According to the latest', highlights: [], size: 50, pos: 'lowerRight', media: {src: 'socsec/ss14_latest.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 40, kind: 'text', reveal: [2], text: 'Social Security trustees’ projections,', highlights: ['trustees'], size: 50, pos: 'upper', media: {src: 'socsec/ss15_trustees.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 52, kind: 'text', reveal: [2], text: 'the retirement trust fund', highlights: [], size: 50, pos: 'left', media: {src: 'socsec/ss16_trustfund.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 40, kind: 'text', reveal: [2], text: 'could run out of its reserves', highlights: ['reserves'], size: 42, pos: 'right', media: {src: 'socsec/ss17_reserves.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 74, kind: 'text', reveal: [2, 28], text: 'in the fourth quarter|of 2032.', highlights: ['2032.'], size: 44, pos: 'lowerLeft', media: {src: 'socsec/ss18_2032.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 37, kind: 'text', reveal: [2], text: 'That fund helps pay', highlights: [], size: 50, pos: 'upperRight', media: {src: 'socsec/ss19_helpspay.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 98, kind: 'text', reveal: [2, 28], text: 'retirement benefits to|millions of Americans.', highlights: [], size: 44, pos: 'left', media: {src: 'socsec/ss20_benefits.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 36, kind: 'text', reveal: [2], text: 'And if Congress does not', highlights: [], size: 46, pos: 'lowerRight', media: {src: 'socsec/ss21_congress.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 44, kind: 'text', reveal: [2], text: 'step in before then,', highlights: [], size: 50, pos: 'upperLeft', media: {src: 'socsec/ss22_stepin.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 84, kind: 'text', reveal: [2, 28], text: 'automatic benefit reductions|could kick in.', highlights: ['kick'], size: 44, pos: 'right', media: {src: 'socsec/ss23_kickin.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 48, kind: 'text', reveal: [2], text: 'The trustees estimate that', highlights: [], size: 50, pos: 'lower', media: {src: 'socsec/ss24_estimate.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 40, kind: 'text', reveal: [2], text: 'benefits could be reduced', highlights: [], size: 50, pos: 'upperRight', media: {src: 'socsec/ss25_reduced.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 59, kind: 'text', reveal: [2], text: 'by 22 percent', highlights: ['22'], size: 52, pos: 'lowerLeft', media: {src: 'socsec/ss26_22pct.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 69, kind: 'text', reveal: [2, 28], text: 'once the retirement|trust fund is depleted.', highlights: ['depleted.'], size: 44, pos: 'left', media: {src: 'socsec/ss27_depleted.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 46, kind: 'text', reveal: [2], text: 'The Congressional Budget Office', highlights: ['Congressional'], size: 50, pos: 'right', media: {src: 'socsec/ss28_cbo.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 67, kind: 'text', reveal: [2, 28], text: 'has an even more|pessimistic outlook,', highlights: ['pessimistic'], size: 44, pos: 'lowerRight', media: {src: 'socsec/ss29_pessimistic.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 39, kind: 'text', reveal: [2], text: 'projecting the fund could', highlights: [], size: 50, pos: 'upperLeft', media: {src: 'socsec/ss30_projecting.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 65, kind: 'text', reveal: [2], text: 'run out earlier in 2032,', highlights: [], size: 46, pos: 'right', media: {src: 'socsec/ss31_earlier.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 26, kind: 'text', reveal: [2], text: 'with cuts reaching', highlights: [], size: 52, pos: 'upperRight', media: {src: 'socsec/ss32_cutsreaching.jpg', type: 'img', effect: 'in'}},
  // 33 CARD
  {dur: 40, kind: 'stat', stat: {pre: 'CBO PROJECTS CUTS', prefix: '~', value: 26, suffix: '%'}, media: {src: 'socsec/ss33_card26.jpg', type: 'img', effect: 'in'}},
  // 34
  {dur: 20, kind: 'text', reveal: [2], text: 'And according to the', highlights: [], size: 50, pos: 'left', media: {src: 'socsec/ss34_accordingto.jpg', type: 'img', effect: 'in'}},
  // 35
  {dur: 68, kind: 'text', reveal: [2, 28], text: 'Committee for a|Responsible Federal Budget,', highlights: [], size: 44, pos: 'lowerLeft', media: {src: 'socsec/ss35_crfb.jpg', type: 'img', effect: 'in'}},
  // 36
  {dur: 102, kind: 'text', reveal: [2, 28], text: 'a benefit reduction|of around 24 percent', highlights: ['24'], size: 44, pos: 'upper', media: {src: 'socsec/ss36_24pct.jpg', type: 'img', effect: 'in'}},
  // 37
  {dur: 101, kind: 'text', reveal: [2, 28], text: 'could mean an|average monthly loss', highlights: [], size: 44, pos: 'right', media: {src: 'socsec/ss37_monthlyloss.jpg', type: 'img', effect: 'in'}},
  // 38 CARD
  {dur: 47, kind: 'stat', stat: {pre: 'AVG MONTHLY LOSS', prefix: '~$', value: 500, post: 'AT A ~24% CUT'}, media: {src: 'socsec/ss38_card500.jpg', type: 'img', effect: 'in'}},
  // 39
  {dur: 38, kind: 'text', reveal: [2], text: 'Here’s why the problem', highlights: [], size: 50, pos: 'lowerRight', media: {src: 'socsec/ss39_heres.jpg', type: 'img', effect: 'in'}},
  // 40
  {dur: 74, kind: 'text', reveal: [2], text: 'is getting harder to ignore.', highlights: ['ignore.'], size: 46, pos: 'upperLeft', media: {src: 'socsec/ss40_ignore.jpg', type: 'img', effect: 'in'}},
  // 41
  {dur: 40, kind: 'text', reveal: [2], text: 'Social Security depends on', highlights: [], size: 50, pos: 'left', media: {src: 'socsec/ss41_dependson.jpg', type: 'img', effect: 'in'}},
  // 42
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'payroll taxes from|current workers', highlights: ['payroll'], size: 48, pos: 'lowerRight', media: {src: 'socsec/ss42_payroll.jpg', type: 'img', effect: 'in'}},
  // 43
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'to help pay|benefits to retirees.', highlights: [], size: 44, pos: 'upperRight', media: {src: 'socsec/ss43_retirees.jpg', type: 'img', effect: 'in'}},
  // 44
  {dur: 54, kind: 'text', reveal: [2], text: 'But demographic changes,', highlights: ['demographic'], size: 52, pos: 'right', media: {src: 'socsec/ss44_demographic.jpg', type: 'img', effect: 'in'}},
  // 45
  {dur: 49, kind: 'text', reveal: [2], text: 'including lower birth rates', highlights: [], size: 50, pos: 'lowerLeft', media: {src: 'socsec/ss45_birthrates.jpg', type: 'img', effect: 'in'}},
  // 46
  {dur: 39, kind: 'text', reveal: [2], text: 'and reduced immigration,', highlights: [], size: 52, pos: 'left', media: {src: 'socsec/ss46_immigration.jpg', type: 'img', effect: 'in'}},
  // 47
  {dur: 65, kind: 'text', reveal: [2, 28], text: 'are putting pressure|on the system.', highlights: ['pressure'], size: 44, pos: 'upperRight', media: {src: 'socsec/ss47_pressure.jpg', type: 'img', effect: 'in'}},
  // 48
  {dur: 56, kind: 'text', reveal: [2, 28], text: 'And the longer|lawmakers wait,', highlights: [], size: 48, pos: 'lower', media: {src: 'socsec/ss48_wait.jpg', type: 'img', effect: 'in'}},
  // 49
  {dur: 58, kind: 'text', reveal: [2, 28], text: 'the fewer options|they may have', highlights: [], size: 44, pos: 'right', media: {src: 'socsec/ss49_feweroptions.jpg', type: 'img', effect: 'in'}},
  // 50
  {dur: 32, kind: 'text', reveal: [2], text: 'to fix the shortfall.', highlights: ['shortfall.'], size: 50, pos: 'upperLeft', media: {src: 'socsec/ss50_shortfall.jpg', type: 'img', effect: 'in'}},
  // 51
  {dur: 32, kind: 'text', reveal: [2], text: 'The impact could go', highlights: [], size: 50, pos: 'lowerRight', media: {src: 'socsec/ss51_impact.jpg', type: 'img', effect: 'in'}},
  // 52
  {dur: 100, kind: 'text', reveal: [2, 28], text: 'far beyond retirees’|monthly checks.', highlights: [], size: 48, pos: 'left', media: {src: 'socsec/ss52_monthlychecks.jpg', type: 'img', effect: 'in'}},
  // 53
  {dur: 45, kind: 'text', reveal: [2], text: 'Social Security benefits support', highlights: [], size: 50, pos: 'upperRight', media: {src: 'socsec/ss53_support.jpg', type: 'img', effect: 'in'}},
  // 54
  {dur: 62, kind: 'text', reveal: [2, 28], text: 'household spending|across the country.', highlights: [], size: 48, pos: 'right', media: {src: 'socsec/ss54_household.jpg', type: 'img', effect: 'in'}},
  // 55
  {dur: 43, kind: 'text', reveal: [2], text: 'If payments are reduced,', highlights: ['reduced,'], size: 50, pos: 'lowerLeft', media: {src: 'socsec/ss55_payments.jpg', type: 'img', effect: 'in'}},
  // 56
  {dur: 53, kind: 'text', reveal: [2], text: 'retirees may have less money', highlights: [], size: 46, pos: 'upperLeft', media: {src: 'socsec/ss56_lessmoney.jpg', type: 'img', effect: 'in'}},
  // 57
  {dur: 60, kind: 'text', reveal: [2, 28], text: 'for groceries, housing,|healthcare,', highlights: [], size: 50, pos: 'right', media: {src: 'socsec/ss57_groceries.jpg', type: 'img', effect: 'in'}},
  // 58
  {dur: 47, kind: 'text', reveal: [2], text: 'and everyday expenses.', highlights: [], size: 52, pos: 'left', media: {src: 'socsec/ss58_expenses.jpg', type: 'img', effect: 'in'}},
  // 59
  {dur: 40, kind: 'text', reveal: [2], text: 'And experts warn that', highlights: [], size: 50, pos: 'lowerRight', media: {src: 'socsec/ss59_expertswarn.jpg', type: 'img', effect: 'in'}},
  // 60
  {dur: 88, kind: 'text', reveal: [2], text: 'delaying reform could also', highlights: ['delaying'], size: 50, pos: 'upperRight', media: {src: 'socsec/ss60_delaying.jpg', type: 'img', effect: 'in'}},
  // 61
  {dur: 35, kind: 'text', reveal: [2, 28], text: 'put pressure on|the broader economy,', highlights: [], size: 44, pos: 'lower', media: {src: 'socsec/ss61_economy.jpg', type: 'img', effect: 'in'}},
  // 62
  {dur: 60, kind: 'text', reveal: [2], text: 'potentially affecting borrowing costs', highlights: [], size: 50, pos: 'left', media: {src: 'socsec/ss62_borrowing.jpg', type: 'img', effect: 'in'}},
  // 63
  {dur: 36, kind: 'text', reveal: [2], text: 'and financial markets.', highlights: ['markets.'], size: 52, pos: 'right', media: {src: 'socsec/ss63_markets.jpg', type: 'img', effect: 'in'}},
  // 64
  {dur: 80, kind: 'text', reveal: [2, 28], text: 'So what can Congress|actually do?', highlights: [], size: 44, pos: 'upperLeft', media: {src: 'socsec/ss64_whatcan.jpg', type: 'img', effect: 'in'}},
  // 65
  {dur: 54, kind: 'text', reveal: [2], text: 'Possible solutions include', highlights: [], size: 52, pos: 'lowerRight', media: {src: 'socsec/ss65_solutions.jpg', type: 'img', effect: 'in'}},
  // 66
  {dur: 51, kind: 'text', reveal: [2], text: 'raising payroll taxes,', highlights: ['taxes,'], size: 52, pos: 'upperRight', media: {src: 'socsec/ss66_raisingtaxes.jpg', type: 'img', effect: 'in'}},
  // 67
  {dur: 47, kind: 'text', reveal: [2], text: 'increasing the income cap', highlights: [], size: 50, pos: 'left', media: {src: 'socsec/ss67_incomecap.jpg', type: 'img', effect: 'in'}},
  // 68
  {dur: 85, kind: 'text', reveal: [2, 28], text: 'on wages subject to|Social Security taxes,', highlights: [], size: 44, pos: 'right', media: {src: 'socsec/ss68_wages.jpg', type: 'img', effect: 'in'}},
  // 69
  {dur: 35, kind: 'text', reveal: [2], text: 'changing benefits,', highlights: [], size: 52, pos: 'lowerLeft', media: {src: 'socsec/ss69_changing.jpg', type: 'img', effect: 'in'}},
  // 70
  {dur: 66, kind: 'text', reveal: [2], text: 'or combining several approaches.', highlights: [], size: 50, pos: 'upper', media: {src: 'socsec/ss70_combining.jpg', type: 'img', effect: 'in'}},
  // 71
  {dur: 41, kind: 'text', reveal: [2], text: 'But every option comes', highlights: [], size: 50, pos: 'lowerRight', media: {src: 'socsec/ss71_everyoption.jpg', type: 'img', effect: 'in'}},
  // 72
  {dur: 49, kind: 'text', reveal: [2], text: 'with political consequences.', highlights: ['political'], size: 52, pos: 'left', media: {src: 'socsec/ss72_consequences.jpg', type: 'img', effect: 'in'}},
  // 73
  {dur: 51, kind: 'text', reveal: [2], text: 'Raise taxes, and workers', highlights: [], size: 50, pos: 'upperRight', media: {src: 'socsec/ss73_raiseworkers.jpg', type: 'img', effect: 'in'}},
  // 74
  {dur: 45, kind: 'text', reveal: [2], text: 'and employers could pay more.', highlights: ['more.'], size: 46, pos: 'upperRight', media: {src: 'socsec/ss74_paymore.jpg', type: 'img', effect: 'in'}},
  // 75
  {dur: 46, kind: 'text', reveal: [2], text: 'Cut benefits, and retirees', highlights: [], size: 50, pos: 'left', media: {src: 'socsec/ss75_cutbenefits.jpg', type: 'img', effect: 'in'}},
  // 76
  {dur: 51, kind: 'text', reveal: [2, 28], text: 'could lose income|they depend on.', highlights: ['depend'], size: 44, pos: 'lowerRight', media: {src: 'socsec/ss76_dependon.jpg', type: 'img', effect: 'in'}},
  // 77
  {dur: 69, kind: 'text', reveal: [2, 28], text: 'And with lawmakers|facing elections,', highlights: ['elections,'], size: 48, pos: 'upperLeft', media: {src: 'socsec/ss77_elections.jpg', type: 'img', effect: 'in'}},
  // 78
  {dur: 39, kind: 'text', reveal: [2], text: 'reaching an agreement is', highlights: [], size: 50, pos: 'right', media: {src: 'socsec/ss78_agreement.jpg', type: 'img', effect: 'in'}},
  // 79 RED
  {dur: 48, kind: 'impact', redBg: true, text: 'easier said|than done.'},
  // 80
  {dur: 37, kind: 'text', reveal: [2], text: 'So what do you think?', highlights: [], size: 46, pos: 'lower', media: {src: 'socsec/ss80_think.jpg', type: 'img', effect: 'in'}},
  // 81
  {dur: 59, kind: 'text', reveal: [2], text: 'Should Congress raise taxes', highlights: ['taxes'], size: 50, pos: 'upperLeft', media: {src: 'socsec/ss81_raisetaxes.jpg', type: 'img', effect: 'in'}},
  // 82
  {dur: 83, kind: 'text', reveal: [2, 28], text: 'on higher earners to protect|Social Security,', highlights: [], size: 44, pos: 'upperRight', media: {src: 'socsec/ss82_higherearners.jpg', type: 'img', effect: 'in'}},
  // 83
  {dur: 59, kind: 'text', reveal: [2], text: 'or should benefits be adjusted', highlights: [], size: 46, pos: 'lowerLeft', media: {src: 'socsec/ss83_adjusted.jpg', type: 'img', effect: 'in'}},
  // 84
  {dur: 51, kind: 'text', reveal: [2], text: 'to keep the program funded?', highlights: ['program'], size: 46, pos: 'right', media: {src: 'socsec/ss84_funded.jpg', type: 'img', effect: 'in'}},
  // 85
  {dur: 42, kind: 'text', reveal: [2], text: 'And if you’re counting on', highlights: [], size: 46, pos: 'left', media: {src: 'socsec/ss85_counting.jpg', type: 'img', effect: 'in'}},
  // 86
  {dur: 36, kind: 'text', reveal: [2], text: 'Social Security for retirement,', highlights: [], size: 50, pos: 'lowerRight', media: {src: 'socsec/ss86_retirement.jpg', type: 'img', effect: 'in'}},
  // 87
  {dur: 57, kind: 'text', reveal: [2], text: 'are you worried about 2032?', highlights: ['worried'], size: 46, pos: 'upper', media: {src: 'socsec/ss87_worried.jpg', type: 'img', effect: 'in'}},
  // 88 CTA
  {dur: 38, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Let us know|in the comments.', highlights: ['comments.'], size: 46, media: {src: 'socsec/ss88_comments.jpg', type: 'img', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 184, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 549, src: 'media/sfx_whoosh.mp3', vol: 0.33},
  {at: 1677, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 2008, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 4210, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 4682, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The 2032 shortfall</span>
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
export const SocSecReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('socsec/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('socsec/music.mp3')}
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
