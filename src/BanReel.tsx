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
// "The ban" reel (BanReel) — fast TECH / AUTOS / REGULATION news reel, Hard Ledger house VISUAL format.
// TOPIC: WAYMO (Google / Alphabet's self-driving business) has temporarily pulled its ROBOTAXIS off FREEWAYS across the US
// after CALIFORNIA regulators (the DMV) ordered it to stop operating and testing driverless vehicles on state freeways.
// EVIDENCE: the DMV cited an incident where three Waymo vehicles entered an active construction zone on Highway 101 near
// Burlingame, plus a Waymo car trying to pass Highway Patrol cars during a traffic break on Interstate 280. ESCALATION:
// Waymo suspended commercial freeway rides across ALL its markets, including cities outside California. CONSEQUENCES:
// customers can still ride on surface streets, freeway rides are off the table, and Waymo says it is evaluating and working
// with regulators to restore freeway operations. CONTROVERSY: the DMV calls the vehicles an imminent hazard to public
// safety over recurring construction-zone incidents, and it isn't the first time Waymo has faced construction-handling
// restrictions; the latest incidents reportedly had no injuries or collisions, but regulators want proof the problems are
// fixed first. DEBATE: are self-driving taxis ready to share the highway, or does autonomous tech still have a long way to
// go?
// NOTE ON VOICE: built from a client-supplied script in the influencer "curiosity-gap" format, NOT the faceless house
// voice — EARLY "follow for more" CTA, CLOSES on an "are robotaxis ready?" debate question.
// Per the saved house preference, captions are <=5-6 words/beat with LARGER on-screen type (Anton 42-52). 44 beats. 3 stat
// cards: 3 WAYMO VEHICLES, HIGHWAY 101 (near Burlingame), 0 INJURIES OR COLLISIONS (I-280, the markets, dates stay
// in-caption). 1 red impact at the CONTROVERSY pivot ("An imminent / hazard."), no black beat.
// FOOTAGE — TOPICAL but STRICTLY BRAND-FREE, because the reel is about specific real companies/vehicles so NONE appear:
// NO Waymo robotaxi, NO Jaguar I-Pace or any Waymo vehicle, NO Google / Alphabet / Waymo logo, NO California Highway Patrol
// / DMV badge, name or real officer, NO readable brand / plate / agency / sign / screen text, NO identifiable real face.
// Generic, royalty-free autonomy / road b-roll only: a generic self-driving / sensor car and a spinning roof LIDAR, an
// empty autonomous steering wheel / dashboard sensor UI, freeway traffic & night-highway aerials, ROAD-CONSTRUCTION zones
// (orange cones / barrels / "road work" with hi-vis workers from behind), generic patrol / emergency lights (no agency),
// surface-street vs freeway, a government / regulator building, a gavel / safety-inspector / stop-hand, a blank-screen
// phone for the FOLLOW CTA, a red beat for the red card. Mix of short videos + photos. OWN distinct footage under
// public/ban/, NO reuse — ledger-checked.
// **UNVERIFIED — names real entities (Waymo, Google, Alphabet, the California DMV, California Highway Patrol) and cites
// specific, checkable claims: a US-wide freeway suspension after a CA order, a 3-vehicle construction-zone incident on
// Highway 101 near Burlingame, an I-280 traffic-break incident, no injuries/collisions, and the "imminent hazard" finding.
// Rendered as supplied. Every figure, location, and the regulator attribution MUST be fact-checked against primary
// reporting before publishing — an evolving regulatory story. General tech/business news, NOT investment advice; the
// closing line is the client's engagement prompt.**
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 86, kind: 'hook', reveal: [3, 40], text: 'Imagine getting into|a self-driving taxi,', kicker: 'The ban', highlights: ['self-driving'], size: 48, media: {src: 'ban/bn00_taxi.mp4', type: 'video', effect: 'in'}},
  // 1
  {dur: 99, kind: 'text', reveal: [2, 28], text: 'trusting it to take you|safely to your destination,', highlights: ['safely'], size: 44, pos: 'upperRight', media: {src: 'ban/bn44_trust.mp4', type: 'video', effect: 'in'}},
  // 2
  {dur: 52, kind: 'text', reveal: [2], text: 'and then watching it drive', highlights: ['watching'], size: 46, pos: 'left', media: {src: 'ban/bn45_drive.mp4', type: 'video', effect: 'in'}},
  // 3
  {dur: 162, kind: 'text', reveal: [2, 28], text: 'straight into an active|construction zone.', highlights: ['construction'], size: 44, pos: 'lowerRight', media: {src: 'ban/bn00_zone.mp4', type: 'video', effect: 'in'}},
  // 4
  {dur: 71, kind: 'text', reveal: [2, 28], text: 'putting Waymo under pressure|right now.', highlights: ['pressure'], size: 44, pos: 'upperLeft', media: {src: 'ban/bn01_pressure.mp4', type: 'video', effect: 'in'}},
  // 5
  {dur: 60, kind: 'text', reveal: [2, 28], text: 'And what’s even|more surprising', highlights: ['surprising'], size: 48, pos: 'right', media: {src: 'ban/bn02_surprising.mp4', type: 'video', effect: 'in'}},
  // 6
  {dur: 82, kind: 'text', reveal: [2, 28], text: 'California didn’t just|tell the company', highlights: ['tell'], size: 44, pos: 'lower', media: {src: 'ban/bn03_fix.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 44, kind: 'text', reveal: [2], text: 'to fix the problem.', highlights: ['fix'], size: 50, pos: 'lowerLeft', media: {src: 'ban/bn46_fixproblem.mp4', type: 'video', effect: 'in'}},
  // 8
  {dur: 76, kind: 'text', reveal: [2, 28], text: 'It ordered Waymo’s|driverless vehicles', highlights: ['driverless'], size: 48, pos: 'upperRight', media: {src: 'ban/bn04_off.mp4', type: 'video', effect: 'in'}},
  // 9
  {dur: 45, kind: 'text', reveal: [2], text: 'off the state’s freeways.', highlights: ['freeways.'], size: 50, pos: 'left', media: {src: 'ban/bn47_statefreeway.mp4', type: 'video', effect: 'in'}},
  // 10
  {dur: 117, kind: 'text', reveal: [2, 28], text: 'now spreading|beyond California.', highlights: ['spreading'], size: 50, pos: 'right', media: {src: 'ban/bn05_spreading.jpg', type: 'img', effect: 'in'}},
  // 11 FOLLOW
  {dur: 153, kind: 'text', reveal: [2], text: 'Follow for more stories|about the technology', highlights: ['follow'], size: 44, pos: 'upperLeft', media: {src: 'ban/bn06_follow.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 118, kind: 'text', reveal: [2, 28], text: 'parent company Alphabet’s|autonomous-driving business,', highlights: ['autonomous-driving'], size: 48, pos: 'lowerRight', media: {src: 'ban/bn07_alphabet.mp4', type: 'video', effect: 'in'}},
  // 13
  {dur: 102, kind: 'text', reveal: [2, 28], text: 'has temporarily restricted|its robotaxis', highlights: ['restricted'], size: 48, pos: 'upper', media: {src: 'ban/bn08_restricted.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 100, kind: 'text', reveal: [2, 28], text: 'on freeways across|the United States.', highlights: ['freeways'], size: 44, pos: 'left', media: {src: 'ban/bn09_usfreeways.mp4', type: 'video', effect: 'in'}},
  // 15
  {dur: 163, kind: 'text', reveal: [2, 28], text: 'California regulators ordered|the company to stop', highlights: ['stop'], size: 44, pos: 'right', media: {src: 'ban/bn10_stop.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 118, kind: 'text', reveal: [2, 28], text: 'its driverless vehicles|on state freeways.', highlights: ['driverless'], size: 44, pos: 'lowerLeft', media: {src: 'ban/bn11_testing.mp4', type: 'video', effect: 'in'}},
  // 17
  {dur: 30, kind: 'text', reveal: [2], text: 'So what went wrong?', highlights: ['wrong?'], size: 50, pos: 'upperRight', media: {src: 'ban/bn12_wrong.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 88, kind: 'text', reveal: [2, 28], text: 'The California DMV|pointed to an incident', highlights: ['DMV'], size: 44, pos: 'left', media: {src: 'ban/bn13_dmv.jpg', type: 'img', effect: 'in'}},
  // 19 CARD
  {dur: 53, kind: 'stat', stat: {value: 3, post: 'WAYMO VEHICLES'}, media: {src: 'ban/bn14_card3.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 66, kind: 'text', reveal: [2, 28], text: 'entered an active|construction zone', highlights: ['construction'], size: 48, pos: 'lowerRight', media: {src: 'ban/bn15_entered.mp4', type: 'video', effect: 'in'}},
  // 21 CARD
  {dur: 42, kind: 'stat', stat: {pre: 'HIGHWAY', value: 101, post: 'NEAR BURLINGAME'}, media: {src: 'ban/bn16_card101.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 138, kind: 'text', reveal: [2, 28], text: 'and other vehicles|at risk.', highlights: ['risk.'], size: 48, pos: 'upperLeft', media: {src: 'ban/bn17_risk.mp4', type: 'video', effect: 'in'}},
  // 23
  {dur: 85, kind: 'text', reveal: [2, 28], text: 'Another incident involved|a Waymo vehicle', highlights: ['Another'], size: 44, pos: 'right', media: {src: 'ban/bn18_another.mp4', type: 'video', effect: 'in'}},
  // 24
  {dur: 107, kind: 'text', reveal: [2, 28], text: 'attempting to pass|California Highway Patrol cars', highlights: ['pass'], size: 44, pos: 'lower', media: {src: 'ban/bn19_pass.mp4', type: 'video', effect: 'in'}},
  // 25
  {dur: 96, kind: 'text', reveal: [2, 28], text: 'a traffic break|on Interstate 280.', highlights: ['280.'], size: 44, pos: 'upperRight', media: {src: 'ban/bn20_i280.mp4', type: 'video', effect: 'in'}},
  // 26
  {dur: 78, kind: 'text', reveal: [2, 28], text: 'And this wasn’t|just a local restriction.', highlights: ['local'], size: 44, pos: 'lowerLeft', media: {src: 'ban/bn21_local.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 137, kind: 'text', reveal: [2, 28], text: 'temporarily suspending|commercial freeway rides', highlights: ['suspending'], size: 48, pos: 'left', media: {src: 'ban/bn22_suspended.mp4', type: 'video', effect: 'in'}},
  // 28
  {dur: 99, kind: 'text', reveal: [2], text: 'across all the markets', highlights: ['markets'], size: 50, pos: 'right', media: {src: 'ban/bn23_markets.mp4', type: 'video', effect: 'in'}},
  // 29
  {dur: 85, kind: 'text', reveal: [2, 28], text: 'including cities|outside California.', highlights: ['outside'], size: 50, pos: 'lowerRight', media: {src: 'ban/bn24_outside.mp4', type: 'video', effect: 'in'}},
  // 30
  {dur: 110, kind: 'text', reveal: [2, 28], text: 'still use Waymo|on surface streets,', highlights: ['surface'], size: 44, pos: 'upperLeft', media: {src: 'ban/bn25_surface.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 110, kind: 'text', reveal: [2, 28], text: 'temporarily off|the table.', highlights: ['off'], size: 50, pos: 'right', media: {src: 'ban/bn26_offtable.mp4', type: 'video', effect: 'in'}},
  // 32
  {dur: 90, kind: 'text', reveal: [2, 28], text: 'The company says|it is evaluating', highlights: ['evaluating'], size: 44, pos: 'upperRight', media: {src: 'ban/bn27_evaluating.mp4', type: 'video', effect: 'in'}},
  // 33
  {dur: 108, kind: 'text', reveal: [2, 28], text: 'working with regulators|to restore freeway operations.', highlights: ['regulators'], size: 44, pos: 'left', media: {src: 'ban/bn28_restore.jpg', type: 'img', effect: 'in'}},
  // 34
  {dur: 33, kind: 'text', reveal: [2], text: 'Here’s the bigger problem:', highlights: ['problem:'], size: 50, pos: 'lowerLeft', media: {src: 'ban/bn29_problem.jpg', type: 'img', effect: 'in'}},
  // 35
  {dur: 57, kind: 'text', reveal: [2, 28], text: 'the DMV says|these vehicles', highlights: ['DMV'], size: 48, pos: 'upper', media: {src: 'ban/bn30_dmvsays.jpg', type: 'img', effect: 'in'}},
  // 36 RED
  {dur: 57, kind: 'impact', redBg: true, text: 'An imminent|hazard.'},
  // 37
  {dur: 35, kind: 'text', reveal: [2], text: 'to public safety,', highlights: ['safety,'], size: 52, pos: 'right', media: {src: 'ban/bn32_safety.mp4', type: 'video', effect: 'in'}},
  // 38
  {dur: 94, kind: 'text', reveal: [2, 28], text: 'because of recurring|construction-zone incidents.', highlights: ['recurring'], size: 48, pos: 'lowerRight', media: {src: 'ban/bn33_recurring.jpg', type: 'img', effect: 'in'}},
  // 39
  {dur: 42, kind: 'text', reveal: [2, 28], text: 'And this isn’t|the first time', highlights: ['first'], size: 44, pos: 'upperLeft', media: {src: 'ban/bn34_firsttime.jpg', type: 'img', effect: 'in'}},
  // 40
  {dur: 58, kind: 'text', reveal: [2, 28], text: 'Waymo has faced|restrictions', highlights: ['restrictions'], size: 50, pos: 'left', media: {src: 'ban/bn35_restrictions.jpg', type: 'img', effect: 'in'}},
  // 41
  {dur: 94, kind: 'text', reveal: [2, 28], text: 'over how its cars|handle road construction.', highlights: ['construction.'], size: 44, pos: 'lowerRight', media: {src: 'ban/bn48_handle.mp4', type: 'video', effect: 'in'}},
  // 42
  {dur: 77, kind: 'text', reveal: [2, 28], text: 'The latest incidents|reportedly involved', highlights: ['latest'], size: 48, pos: 'upperRight', media: {src: 'ban/bn36_latest.mp4', type: 'video', effect: 'in'}},
  // 43 CARD
  {dur: 58, kind: 'stat', stat: {value: 0, post: 'INJURIES OR COLLISIONS'}, media: {src: 'ban/bn37_card0.jpg', type: 'img', effect: 'in'}},
  // 44
  {dur: 70, kind: 'text', reveal: [2], text: 'but regulators want proof', highlights: ['proof'], size: 50, pos: 'right', media: {src: 'ban/bn38_proof.jpg', type: 'img', effect: 'in'}},
  // 45
  {dur: 69, kind: 'text', reveal: [2, 28], text: 'the company has fixed|the underlying problems', highlights: ['fixed'], size: 44, pos: 'lowerLeft', media: {src: 'ban/bn39_fixed.jpg', type: 'img', effect: 'in'}},
  // 46
  {dur: 121, kind: 'text', reveal: [2, 28], text: 'before allowing driverless|freeway operations again.', highlights: ['driverless'], size: 44, pos: 'left', media: {src: 'ban/bn40_return.mp4', type: 'video', effect: 'in'}},
  // 47
  {dur: 41, kind: 'text', reveal: [2], text: 'So what do you think?', highlights: ['think?'], size: 46, pos: 'upperRight', media: {src: 'ban/bn41_think.jpg', type: 'img', effect: 'in'}},
  // 48
  {dur: 109, kind: 'text', reveal: [2, 28], text: 'Are self-driving taxis ready|to share the highway', highlights: ['ready'], size: 44, pos: 'lower', media: {src: 'ban/bn42_ready.mp4', type: 'video', effect: 'in'}},
  // 49 CTA
  {dur: 147, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'still has a long|way to go?', highlights: ['go?'], size: 46, media: {src: 'ban/bn43_longway.mp4', type: 'video', effect: 'in'}},
];


type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 1766, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1885, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 3260, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 3717, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 4185, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The ban</span>
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
export const BanReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('ban/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('ban/music.mp3')}
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
