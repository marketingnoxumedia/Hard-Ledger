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
// "The slide" reel (CrudeReel) — fast NEWS reel, Hard Ledger house VISUAL format, oil / geopolitics / markets topic.
// TOPIC: OIL PRICES are FALLING after President DONALD TRUMP signaled the US may avoid further attacks on IRAN — but the
// Middle East conflict is far from over. The twist: even as prices drop, ships are still being attacked near the STRAIT
// OF HORMUZ, one of the world's most important oil routes. The US and Iran have been locked in months of conflict,
// disrupting shipments and pushing energy prices up; now hopes of a possible peace deal are moving markets. Trump told CNN
// further strikes were highly unlikely if negotiations progress; BRENT crude fell to ~$98 a barrel and US oil to ~$90,
// after Brent plunged ~16% the previous week. But Washington and Tehran both report ship attacks near Hormuz. If talks
// succeed, shipments could recover and ease fuel-price and inflation pressure — yet no final deal is reached, and analysts
// warn prices are falling on HOPES of diplomacy, not proof the conflict has ended. Debate: a lasting decline, or another
// escalation away from soaring energy costs?
// NOTE ON VOICE: built VERBATIM from a client-supplied script in the influencer "curiosity-gap" format (HOOK / CURIOSITY
// GAP / EARLY CTA / CONTEXT / EVIDENCE / ESCALATION / CONSEQUENCES / CONTROVERSY / AUDIENCE DEBATE), NOT the faceless
// house voice — it names Trump / the US / Iran / CNN / Brent / US oil / Washington / Tehran / the Strait of Hormuz, uses
// an EARLY "follow for more" CTA, and CLOSES on a "let me know in the comments" debate CTA. Per the saved house
// preference, captions are <=5-6 words/beat with LARGER on-screen type (Anton 42-52). 55 beats. 3 stat cards: $98 / A
// BARREL (Brent); $90 / US CRUDE; DOWN 16% / LAST WEEK (Brent's prior-week plunge) — the script's hard figures. 1 red
// impact at the CONTROVERSY pivot ("Hopes, not / proof." — analysts' caveat; reel closes on the comments-CTA media beat),
// no black beat. Captions match the VO verbatim. Durations/reveals/SFX locked to the VO via a scribe_v1 word-timestamp
// anchor pass (public/crude/voiceover.mp3). Built at the house +10% pacing default; its own tense markets/geopolitics
// music mixed at 0.2. OWN distinct footage under public/crude/ (54 stills), NO reuse of any other reel's clips — ledger-
// checked. ADJACENT to but DISTINCT from StraitReel (same Iran/Hormuz oil war, different event: a price slide on
// de-escalation hopes vs. the diplomatic-offer ordering standoff).
// FOOTAGE is strictly BRAND-FREE and FACE-FREE — because the reel names real companies, a real official and nations,
// NONE of their assets or likenesses appear: NO photo or likeness of Donald Trump / any real person or identifiable face,
// NO US / Iran flag, NO CNN logo or news chyron, NO named or identifiable tanker / warship (no hull numbers, no livery),
// NO readable brand / sign / screen / Arabic / Farsi text. Metaphor-led oil / energy / geopolitics b-roll only: pump jacks
// and nodding-donkey silhouettes, an offshore rig / refinery at dusk, crude-oil black liquid and oil drums, a generic
// (unbranded) fuel-pump nozzle, a falling red price chart and a downward arrow for the slide and the cards, distant
// tankers / cargo ships at sea and a narrow unlabeled strait / chokepoint for Hormuz, a glowing globe / world map, an
// empty podium microphone for the Trump statement, a handshake / a dove / an olive branch for the peace talks, storm
// clouds / a naval silhouette for tensions, a grocery-and-fuel receipt for inflation, a seesaw / scales for the balance.
// **UNVERIFIED — states specific, fast-moving, checkable claims (Trump's reported CNN remarks; Brent ~$98 and US oil ~$90;
// Brent's ~16% prior-week plunge; reported ship attacks near Hormuz). Rendered VERBATIM as supplied, but every figure,
// price and attributed quote MUST be fact-checked against primary reporting before publishing — oil prices and a live
// geopolitical conflict move hour to hour. This is general information, not investment advice.**
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 56, kind: 'hook', reveal: [3, 40], text: 'Oil prices|are falling', kicker: 'The slide', highlights: [], size: 54, media: {src: 'crude/cr00_falling.jpg', type: 'img', effect: 'in'}},
  // 1
  {dur: 43, kind: 'text', reveal: [2, 28], text: 'after President|Donald Trump', highlights: ['Trump'], size: 50, pos: 'left', media: {src: 'crude/cr01_trump.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 69, kind: 'text', reveal: [2], text: 'suggested the United States', highlights: [], size: 50, pos: 'lowerRight', media: {src: 'crude/cr02_us.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 96, kind: 'text', reveal: [2, 28], text: 'may avoid further|attacks on Iran.', highlights: ['Iran.'], size: 44, pos: 'upperLeft', media: {src: 'crude/cr03_iran.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 51, kind: 'text', reveal: [2, 28], text: 'But the Middle East|conflict', highlights: [], size: 48, pos: 'right', media: {src: 'crude/cr04_conflict.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 44, kind: 'text', reveal: [2], text: 'is far from over.', highlights: ['over.'], size: 50, pos: 'lower', media: {src: 'crude/cr05_over.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 37, kind: 'text', reveal: [2], text: 'And here’s the twist.', highlights: ['twist.'], size: 50, pos: 'upperRight', media: {src: 'crude/cr06_twist.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 64, kind: 'text', reveal: [2], text: 'Even as oil prices drop,', highlights: ['drop,'], size: 46, pos: 'lowerLeft', media: {src: 'crude/cr07_drop.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 67, kind: 'text', reveal: [2, 28], text: 'ships are still|being attacked', highlights: ['attacked'], size: 48, pos: 'left', media: {src: 'crude/cr08_ships.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 38, kind: 'text', reveal: [2], text: 'near one of the world’s', highlights: [], size: 46, pos: 'right', media: {src: 'crude/cr09_worlds.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 72, kind: 'text', reveal: [2, 28], text: 'most important|oil routes.', highlights: ['routes.'], size: 50, pos: 'upperRight', media: {src: 'crude/cr10_routes.jpg', type: 'img', effect: 'in'}},
  // 11 FOLLOW
  {dur: 50, kind: 'text', reveal: [2], text: 'Follow for|more updates', highlights: ['follow'], size: 50, pos: 'lowerLeft', media: {src: 'crude/cr11_follow.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 35, kind: 'text', reveal: [2], text: 'on the global economy', highlights: [], size: 50, pos: 'upperLeft', media: {src: 'crude/cr12_economy.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 56, kind: 'text', reveal: [2, 28], text: 'and major|world events.', highlights: [], size: 50, pos: 'right', media: {src: 'crude/cr13_events.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 45, kind: 'text', reveal: [2, 28], text: 'The United States|and Iran', highlights: [], size: 48, pos: 'left', media: {src: 'crude/cr14_usiran.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'have been locked in|months of conflict,', highlights: ['conflict,'], size: 44, pos: 'lowerRight', media: {src: 'crude/cr15_locked.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 45, kind: 'text', reveal: [2], text: 'disrupting oil shipments', highlights: ['disrupting'], size: 52, pos: 'upper', media: {src: 'crude/cr16_shipments.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 72, kind: 'text', reveal: [2, 28], text: 'and pushing|energy prices higher.', highlights: ['higher.'], size: 48, pos: 'right', media: {src: 'crude/cr17_higher.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 42, kind: 'text', reveal: [2, 28], text: 'Now, hopes of|a possible', highlights: ['hopes'], size: 48, pos: 'lowerLeft', media: {src: 'crude/cr18_hopes.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 26, kind: 'text', reveal: [2], text: 'peace agreement', highlights: ['peace'], size: 52, pos: 'upperRight', media: {src: 'crude/cr19_peace.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 66, kind: 'text', reveal: [2, 28], text: 'are changing|market expectations.', highlights: [], size: 50, pos: 'left', media: {src: 'crude/cr20_market.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 31, kind: 'text', reveal: [2], text: 'Trump told CNN', highlights: ['CNN'], size: 52, pos: 'lowerRight', media: {src: 'crude/cr21_cnn.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 48, kind: 'text', reveal: [2, 28], text: 'that additional strikes|on Iran', highlights: [], size: 48, pos: 'right', media: {src: 'crude/cr22_strikes.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 42, kind: 'text', reveal: [2], text: 'were highly unlikely', highlights: ['unlikely'], size: 52, pos: 'upperLeft', media: {src: 'crude/cr23_unlikely.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 76, kind: 'text', reveal: [2, 28], text: 'if negotiations|made progress.', highlights: ['negotiations'], size: 50, pos: 'lower', media: {src: 'crude/cr24_negotiations.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 34, kind: 'text', reveal: [2], text: 'Following his comments,', highlights: [], size: 52, pos: 'left', media: {src: 'crude/cr25_comments.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 47, kind: 'text', reveal: [2, 28], text: 'Brent crude|fell to around', highlights: ['Brent'], size: 48, pos: 'right', media: {src: 'crude/cr26_brent.jpg', type: 'img', effect: 'in'}},
  // 27 CARD
  {dur: 56, kind: 'stat', stat: {prefix: '$', value: 98, post: 'A BARREL'}, media: {src: 'crude/cr27_card98.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 46, kind: 'text', reveal: [2, 28], text: 'while US oil|traded near', highlights: [], size: 48, pos: 'upperRight', media: {src: 'crude/cr28_usoil.jpg', type: 'img', effect: 'in'}},
  // 29 CARD
  {dur: 40, kind: 'stat', stat: {prefix: '$', value: 90, post: 'US CRUDE'}, media: {src: 'crude/cr29_card90.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 45, kind: 'text', reveal: [2, 28], text: 'Brent had|already plunged', highlights: [], size: 50, pos: 'lowerLeft', media: {src: 'crude/cr30_plunged.jpg', type: 'img', effect: 'in'}},
  // 31 CARD
  {dur: 40, kind: 'stat', stat: {pre: 'DOWN', value: 16, suffix: '%', post: 'LAST WEEK'}, media: {src: 'crude/cr31_card16.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 31, kind: 'text', reveal: [2], text: 'the previous week.', highlights: [], size: 52, pos: 'left', media: {src: 'crude/cr32_prevweek.jpg', type: 'img', effect: 'in'}},
  // 33
  {dur: 37, kind: 'text', reveal: [2], text: 'But tensions remain.', highlights: ['tensions'], size: 52, pos: 'lowerRight', media: {src: 'crude/cr33_tensions.jpg', type: 'img', effect: 'in'}},
  // 34
  {dur: 50, kind: 'text', reveal: [2, 28], text: 'Both Washington|and Tehran', highlights: [], size: 50, pos: 'upperLeft', media: {src: 'crude/cr34_washtehran.jpg', type: 'img', effect: 'in'}},
  // 35
  {dur: 50, kind: 'text', reveal: [2], text: 'reported attacks on ships', highlights: ['attacks'], size: 50, pos: 'right', media: {src: 'crude/cr35_shipattacks.jpg', type: 'img', effect: 'in'}},
  // 36
  {dur: 43, kind: 'text', reveal: [2, 28], text: 'near the Strait|of Hormuz,', highlights: ['Hormuz,'], size: 48, pos: 'upperRight', media: {src: 'crude/cr36_hormuz.jpg', type: 'img', effect: 'in'}},
  // 37
  {dur: 35, kind: 'text', reveal: [2], text: 'a critical passage', highlights: ['critical'], size: 52, pos: 'left', media: {src: 'crude/cr37_passage.jpg', type: 'img', effect: 'in'}},
  // 38
  {dur: 59, kind: 'text', reveal: [2, 28], text: 'for global|oil supplies.', highlights: ['supplies.'], size: 50, pos: 'lowerLeft', media: {src: 'crude/cr38_supplies.jpg', type: 'img', effect: 'in'}},
  // 39
  {dur: 51, kind: 'text', reveal: [2], text: 'If negotiations succeed,', highlights: ['succeed,'], size: 52, pos: 'right', media: {src: 'crude/cr39_succeed.jpg', type: 'img', effect: 'in'}},
  // 40
  {dur: 45, kind: 'text', reveal: [2, 28], text: 'oil shipments|could recover,', highlights: ['recover,'], size: 50, pos: 'lower', media: {src: 'crude/cr40_recover.jpg', type: 'img', effect: 'in'}},
  // 41
  {dur: 47, kind: 'text', reveal: [2], text: 'potentially easing pressure', highlights: ['easing'], size: 52, pos: 'upperRight', media: {src: 'crude/cr41_easing.jpg', type: 'img', effect: 'in'}},
  // 42
  {dur: 87, kind: 'text', reveal: [2, 28], text: 'on fuel prices|and inflation worldwide.', highlights: ['inflation'], size: 44, pos: 'left', media: {src: 'crude/cr42_inflation.jpg', type: 'img', effect: 'in'}},
  // 43
  {dur: 42, kind: 'text', reveal: [2], text: 'However, no final', highlights: [], size: 52, pos: 'lowerRight', media: {src: 'crude/cr43_nofinal.jpg', type: 'img', effect: 'in'}},
  // 44
  {dur: 51, kind: 'text', reveal: [2, 28], text: 'peace agreement|has been reached.', highlights: [], size: 48, pos: 'right', media: {src: 'crude/cr44_notreached.jpg', type: 'img', effect: 'in'}},
  // 45
  {dur: 65, kind: 'text', reveal: [2, 28], text: 'Analysts warn|that oil prices', highlights: ['Analysts'], size: 48, pos: 'upperLeft', media: {src: 'crude/cr45_analysts.jpg', type: 'img', effect: 'in'}},
  // 46
  {dur: 38, kind: 'text', reveal: [2], text: 'are falling largely', highlights: [], size: 52, pos: 'lowerLeft', media: {src: 'crude/cr46_largely.jpg', type: 'img', effect: 'in'}},
  // 47 RED
  {dur: 73, kind: 'impact', redBg: true, text: 'Hopes, not|proof.'},
  // 48
  {dur: 48, kind: 'text', reveal: [2, 28], text: 'that the conflict|has ended.', highlights: ['ended.'], size: 48, pos: 'upperRight', media: {src: 'crude/cr48_ended.jpg', type: 'img', effect: 'in'}},
  // 49
  {dur: 29, kind: 'text', reveal: [2], text: 'So what do you think?', highlights: [], size: 46, pos: 'left', media: {src: 'crude/cr49_think.jpg', type: 'img', effect: 'in'}},
  // 50
  {dur: 34, kind: 'text', reveal: [2], text: 'Is this the beginning', highlights: [], size: 50, pos: 'right', media: {src: 'crude/cr50_beginning.jpg', type: 'img', effect: 'in'}},
  // 51
  {dur: 69, kind: 'text', reveal: [2, 28], text: 'of a lasting decline|in oil prices,', highlights: ['lasting'], size: 44, pos: 'lowerRight', media: {src: 'crude/cr51_lasting.jpg', type: 'img', effect: 'in'}},
  // 52
  {dur: 40, kind: 'text', reveal: [2], text: 'or could another escalation', highlights: ['escalation'], size: 50, pos: 'upperLeft', media: {src: 'crude/cr52_escalation.jpg', type: 'img', effect: 'in'}},
  // 53
  {dur: 62, kind: 'text', reveal: [2, 28], text: 'send energy costs|soaring again?', highlights: ['soaring'], size: 48, pos: 'left', media: {src: 'crude/cr53_soaring.jpg', type: 'img', effect: 'in'}},
  // 54 CTA
  {dur: 38, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Let me know|in the comments.', highlights: ['comments'], size: 46, media: {src: 'crude/cr54_comments.jpg', type: 'img', effect: 'in'}},
];


type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 1422, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1524, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1609, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 2380, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 2735, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The slide</span>
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
export const CrudeReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('crude/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('crude/music.mp3')}
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
