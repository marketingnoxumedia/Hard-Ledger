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
// "The backlash" reel (BacklashReel) — Hard Ledger house VISUAL format, tech / energy / politics news topic.
// TOPIC: a COMMUNITY BACKLASH against AI DATA CENTERS is becoming the AI boom's new obstacle — not a chip shortage. The
// flashpoint is GEORGIA (Atlanta leads US data-center construction), where the fight over ELECTRICITY BILLS vs Big Tech is
// turning political. Data centers need enormous electricity and water; locals worry they can't afford the expansion. Case
// in point: OpenAI's proposed $20 BILLION data center near SAVANNAH, which could need ~3,200 MEGAWATTS — about three
// nuclear reactors' output. Georgia regulators are examining whether the power deal protects ordinary customers from extra
// costs, and voters elected a NEW GOVERNOR who ran partly on tougher data-center oversight. If Georgia tightens rules or
// delays projects, it could slow billions in AI infrastructure and push builders elsewhere. Debate: supporters say data
// centers bring investment and growth; critics say residents shouldn't eat higher power bills, more water use and
// environmental costs just so tech can expand. Should communities be able to stop AI data centers, even if it slows the AI
// race?
// NOTE ON VOICE: built VERBATIM from a client-supplied script in the influencer "curiosity-gap" format (HOOK / CURIOSITY
// GAP / EARLY CTA / CONTEXT / EVIDENCE / ESCALATION / CONSEQUENCES / CONTROVERSY / AUDIENCE DEBATE), NOT the faceless
// house voice — it names Georgia / Atlanta / Savannah / OpenAI / Big Tech, uses an EARLY "follow for more" CTA, and
// CLOSES on a "let me know in the comments" debate CTA. Per the saved house preference, captions are <=5-6 words/beat with
// LARGER on-screen type (Anton 42-52). 52 beats. 3 stat cards: $20 / BILLION (OpenAI's Savannah project); 3,200 /
// MEGAWATTS (its power need); 3 / NUCLEAR REACTORS (the equivalent) — the script's hard figures. 1 red impact at the
// CONTROVERSY pivot ("Higher / bills." — the residents' core cost concern; reel closes on the comments-CTA media beat),
// no black beat. Captions match the VO verbatim. Durations/reveals/SFX locked to the VO via a scribe_v1 word-timestamp
// anchor pass (public/backlash/voiceover.mp3). Built at the house +10% pacing default; its own tense, charged tech/energy/
// politics music mixed at 0.2. OWN distinct footage under public/backlash/ (51 stills), NO reuse of any other reel's
// clips — ledger-checked.
// FOOTAGE is strictly BRAND-FREE — because the reel names real companies, places and officials, NONE of their assets
// appear: NO OpenAI logo / wordmark, NO Georgia / US flag, NO identifiable Atlanta / Savannah skyline or landmark, NO real
// governor / politician or any identifiable face, NO readable brand name / sign / screen text, NO identifiable currency.
// Metaphor-led data-center / power / water / politics b-roll only: generic unbranded server halls and data-center
// corridors and racks, high-voltage power lines and transmission towers and a substation, nuclear cooling towers / a
// reactor-dome silhouette for the "three reactors" comparison, water (a reservoir / cooling / a dripping tap) and an
// electricity meter / a power bill for the cost beats, construction cranes for the build-out, a US / state map for
// Georgia, a gavel / regulator motif, a ballot box / voting / a podium for the new governor, a raised-hand crowd /
// protest placards (blank, no readable text) or silhouettes for the community backlash, a smokestack / environmental
// motif, a scale weighing growth vs cost, a crossroads, a blank-screen phone. **UNVERIFIED — states specific, checkable
// but evolving claims (Atlanta leading US data-center construction; OpenAI's ~$20B Savannah project and ~3,200 MW need;
// the three-reactor comparison; the regulator review and the newly elected governor's oversight stance). Rendered
// VERBATIM as supplied, but every figure and claim MUST be fact-checked against primary reporting before publishing —
// projects, filings and election outcomes change fast. This is general information, not investment advice.**
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 75, kind: 'hook', reveal: [3, 40], text: 'America’s AI boom|is running into', kicker: 'The backlash', highlights: [], size: 48, media: {src: 'backlash/bk00_obstacle.jpg', type: 'img', effect: 'in'}},
  // 1
  {dur: 29, kind: 'text', reveal: [2], text: 'a new obstacle,', highlights: ['obstacle,'], size: 52, pos: 'upperRight', media: {src: 'backlash/bk01_newobstacle.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 60, kind: 'text', reveal: [2, 28], text: 'and it isn’t|a shortage of chips.', highlights: ['chips.'], size: 44, pos: 'left', media: {src: 'backlash/bk02_notchips.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 48, kind: 'text', reveal: [2], text: 'It’s a growing backlash', highlights: ['backlash'], size: 50, pos: 'lowerRight', media: {src: 'backlash/bk03_backlash.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 40, kind: 'text', reveal: [2], text: 'from people who don’t want', highlights: [], size: 46, pos: 'upperLeft', media: {src: 'backlash/bk04_people.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 84, kind: 'text', reveal: [2, 28], text: 'massive data centers|built in their communities.', highlights: ['communities.'], size: 44, pos: 'right', media: {src: 'backlash/bk05_communities.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 73, kind: 'text', reveal: [2, 28], text: 'And one state could become|a major turning point:', highlights: ['turning'], size: 44, pos: 'lower', media: {src: 'backlash/bk06_turningpoint.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 26, kind: 'text', reveal: [2], text: 'Georgia,', highlights: ['Georgia,'], size: 52, pos: 'upperLeft', media: {src: 'backlash/bk07_georgia.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 72, kind: 'text', reveal: [2, 28], text: 'where the fight over|electricity bills and Big Tech', highlights: ['fight'], size: 44, pos: 'upperRight', media: {src: 'backlash/bk08_fight.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 80, kind: 'text', reveal: [2, 28], text: 'is becoming|increasingly political.', highlights: ['political.'], size: 50, pos: 'lowerLeft', media: {src: 'backlash/bk09_political.jpg', type: 'img', effect: 'in'}},
  // 10 FOLLOW
  {dur: 51, kind: 'text', reveal: [2], text: 'Follow for|more updates', highlights: ['follow'], size: 50, pos: 'right', media: {src: 'backlash/bk10_follow.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 124, kind: 'text', reveal: [2, 28], text: 'on the technology and money|shaping the global economy.', highlights: [], size: 44, pos: 'left', media: {src: 'backlash/bk11_economy.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 67, kind: 'text', reveal: [2, 28], text: 'Georgia has become|one of America’s biggest', highlights: [], size: 44, pos: 'lowerRight', media: {src: 'backlash/bk12_biggest.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 50, kind: 'text', reveal: [2], text: 'data center hotspots,', highlights: ['hotspots,'], size: 52, pos: 'upper', media: {src: 'backlash/bk13_hotspots.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 94, kind: 'text', reveal: [2, 28], text: 'with Atlanta leading|the country in construction.', highlights: ['leading'], size: 44, pos: 'left', media: {src: 'backlash/bk14_atlanta.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 59, kind: 'text', reveal: [2], text: 'But these facilities require', highlights: [], size: 50, pos: 'right', media: {src: 'backlash/bk15_require.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 119, kind: 'text', reveal: [2, 28], text: 'enormous amounts of|electricity and water', highlights: ['enormous'], size: 44, pos: 'lowerLeft', media: {src: 'backlash/bk16_electricwater.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 55, kind: 'text', reveal: [2], text: 'raising concerns about whether', highlights: ['concerns'], size: 50, pos: 'upperRight', media: {src: 'backlash/bk17_concerns.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 92, kind: 'text', reveal: [2, 28], text: 'local communities|can afford the expansion.', highlights: ['afford'], size: 44, pos: 'left', media: {src: 'backlash/bk18_afford.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 86, kind: 'text', reveal: [2, 28], text: 'One example is|OpenAI’s proposed', highlights: [], size: 48, pos: 'lowerRight', media: {src: 'backlash/bk19_openai.jpg', type: 'img', effect: 'in'}},
  // 20 CARD
  {dur: 47, kind: 'stat', stat: {prefix: '$', value: 20, post: 'BILLION'}, media: {src: 'backlash/bk20_card20b.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 63, kind: 'text', reveal: [2, 28], text: 'data center project|near Savannah.', highlights: ['Savannah.'], size: 48, pos: 'upperLeft', media: {src: 'backlash/bk21_savannah.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 78, kind: 'text', reveal: [2, 28], text: 'The facility could require|approximately', highlights: [], size: 48, pos: 'right', media: {src: 'backlash/bk22_require2.jpg', type: 'img', effect: 'in'}},
  // 23 CARD
  {dur: 108, kind: 'stat', stat: {value: 3200, post: 'MEGAWATTS'}, media: {src: 'backlash/bk23_card3200.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 59, kind: 'text', reveal: [2], text: 'roughly equivalent to', highlights: [], size: 52, pos: 'lower', media: {src: 'backlash/bk24_equivalent.jpg', type: 'img', effect: 'in'}},
  // 25 CARD
  {dur: 56, kind: 'stat', stat: {value: 3, post: 'NUCLEAR REACTORS'}, media: {src: 'backlash/bk25_card3.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 68, kind: 'text', reveal: [2, 28], text: 'Georgia regulators|are now examining', highlights: ['regulators'], size: 48, pos: 'upperRight', media: {src: 'backlash/bk26_regulators.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 53, kind: 'text', reveal: [2], text: 'whether the power agreement', highlights: ['power'], size: 50, pos: 'lowerLeft', media: {src: 'backlash/bk27_agreement.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 89, kind: 'text', reveal: [2, 28], text: 'adequately protects|ordinary customers', highlights: ['protects'], size: 50, pos: 'left', media: {src: 'backlash/bk28_protects.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 38, kind: 'text', reveal: [2], text: 'from additional costs.', highlights: ['costs.'], size: 52, pos: 'right', media: {src: 'backlash/bk29_costs.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 72, kind: 'text', reveal: [2, 28], text: 'The political pressure|is growing too.', highlights: ['pressure'], size: 44, pos: 'lowerRight', media: {src: 'backlash/bk30_pressure.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 76, kind: 'text', reveal: [2, 28], text: 'Georgia voters have elected|a new governor', highlights: ['elected'], size: 44, pos: 'upperLeft', media: {src: 'backlash/bk31_elected.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 47, kind: 'text', reveal: [2], text: 'who campaigned partly on', highlights: [], size: 50, pos: 'right', media: {src: 'backlash/bk32_campaigned.jpg', type: 'img', effect: 'in'}},
  // 33
  {dur: 82, kind: 'text', reveal: [2, 28], text: 'stronger oversight of|data center development.', highlights: ['oversight'], size: 44, pos: 'upperRight', media: {src: 'backlash/bk33_oversight.jpg', type: 'img', effect: 'in'}},
  // 34
  {dur: 71, kind: 'text', reveal: [2, 28], text: 'If Georgia introduces|stricter rules', highlights: ['stricter'], size: 48, pos: 'left', media: {src: 'backlash/bk34_stricter.jpg', type: 'img', effect: 'in'}},
  // 35
  {dur: 48, kind: 'text', reveal: [2], text: 'or delays projects,', highlights: ['delays'], size: 52, pos: 'lowerLeft', media: {src: 'backlash/bk35_delays.jpg', type: 'img', effect: 'in'}},
  // 36
  {dur: 117, kind: 'text', reveal: [2, 28], text: 'it could slow billions|in AI infrastructure', highlights: ['billions'], size: 44, pos: 'upper', media: {src: 'backlash/bk36_slow.jpg', type: 'img', effect: 'in'}},
  // 37
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'and force companies|to reconsider', highlights: ['reconsider'], size: 48, pos: 'right', media: {src: 'backlash/bk37_reconsider.jpg', type: 'img', effect: 'in'}},
  // 38
  {dur: 39, kind: 'text', reveal: [2], text: 'where they build.', highlights: [], size: 52, pos: 'lowerRight', media: {src: 'backlash/bk38_wherebuild.jpg', type: 'img', effect: 'in'}},
  // 39
  {dur: 72, kind: 'text', reveal: [2, 28], text: 'Supporters argue|data centers bring', highlights: [], size: 48, pos: 'upperLeft', media: {src: 'backlash/bk39_supporters.jpg', type: 'img', effect: 'in'}},
  // 40
  {dur: 65, kind: 'text', reveal: [2, 28], text: 'investment and|economic growth.', highlights: ['growth.'], size: 50, pos: 'left', media: {src: 'backlash/bk40_growth.jpg', type: 'img', effect: 'in'}},
  // 41
  {dur: 60, kind: 'text', reveal: [2, 28], text: 'Critics say residents|shouldn’t face', highlights: ['Critics'], size: 48, pos: 'lowerRight', media: {src: 'backlash/bk41_critics.jpg', type: 'img', effect: 'in'}},
  // 42 RED
  {dur: 45, kind: 'impact', redBg: true, text: 'Higher|bills.'},
  // 43
  {dur: 49, kind: 'text', reveal: [2], text: 'increased water consumption,', highlights: ['water'], size: 52, pos: 'upperRight', media: {src: 'backlash/bk43_water.jpg', type: 'img', effect: 'in'}},
  // 44
  {dur: 46, kind: 'text', reveal: [2], text: 'and environmental costs', highlights: ['environmental'], size: 52, pos: 'right', media: {src: 'backlash/bk44_environmental.jpg', type: 'img', effect: 'in'}},
  // 45
  {dur: 93, kind: 'text', reveal: [2, 28], text: 'just so technology|companies can expand.', highlights: ['expand.'], size: 44, pos: 'lowerLeft', media: {src: 'backlash/bk45_expand.jpg', type: 'img', effect: 'in'}},
  // 46
  {dur: 33, kind: 'text', reveal: [2], text: 'So what do you think?', highlights: [], size: 46, pos: 'left', media: {src: 'backlash/bk46_think.jpg', type: 'img', effect: 'in'}},
  // 47
  {dur: 42, kind: 'text', reveal: [2, 28], text: 'Should communities|have the power', highlights: ['power'], size: 48, pos: 'upperRight', media: {src: 'backlash/bk47_shouldcommunities.jpg', type: 'img', effect: 'in'}},
  // 48
  {dur: 58, kind: 'text', reveal: [2], text: 'to stop AI data centers,', highlights: ['stop'], size: 46, pos: 'lower', media: {src: 'backlash/bk48_stop.jpg', type: 'img', effect: 'in'}},
  // 49
  {dur: 54, kind: 'text', reveal: [2], text: 'even if it means slowing', highlights: ['slowing'], size: 46, pos: 'right', media: {src: 'backlash/bk49_slowing.jpg', type: 'img', effect: 'in'}},
  // 50
  {dur: 80, kind: 'text', reveal: [2, 28], text: 'America’s race|for artificial intelligence?', highlights: ['intelligence?'], size: 48, pos: 'upperLeft', media: {src: 'backlash/bk50_airace.jpg', type: 'img', effect: 'in'}},
  // 51 CTA
  {dur: 61, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Let me know|in the comments.', highlights: ['comments'], size: 46, media: {src: 'backlash/bk51_comments.jpg', type: 'img', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 1384, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1572, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1739, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 2862, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 3362, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The backlash</span>
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
export const BacklashReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('backlash/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('backlash/music.mp3')}
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
