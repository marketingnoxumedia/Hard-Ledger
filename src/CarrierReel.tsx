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
// "The carrier" reel (CarrierReel) — Hard Ledger house VISUAL format, tech / space / telecom business news topic.
// TOPIC: SpaceX / Starlink aiming to become a US cellphone carrier. Beyond satellite internet, SpaceX wants to offer
// mobile phone service using Starlink satellites, wireless spectrum and traditional cell towers — reportedly targeting
// at least 80,000 cell sites across the US, negotiating access to cellular infrastructure, and securing an agreement to
// acquire valuable spectrum. It is said to be targeting the first half of 2028 for its own mobile satellite service, a
// direct challenge to AT&T, Verizon and T-Mobile. If it works, a powerful new competitor enters a market dominated by
// three majors — more choice and price competition. The skeptics: a nationwide network could cost hundreds of billions,
// and satellites alone cannot easily match cell towers in crowded cities and indoors. Debate: can Starlink really
// replace traditional carriers, or is Musk taking on more than he expects?
// NOTE ON VOICE: built VERBATIM from a client-supplied script in the influencer "curiosity-gap" format (HOOK / CURIOSITY
// GAP / EARLY CTA / CONTEXT / EVIDENCE / ESCALATION / CONSEQUENCES / CONTROVERSY / AUDIENCE DEBATE), NOT the faceless
// house voice — it names SpaceX / Starlink / Elon Musk / AT&T / Verizon / T-Mobile, uses an EARLY "follow for more" CTA,
// and CLOSES on a "let me know in the comments" debate CTA. Per the saved house preference, captions are <=5-6 words/beat
// with LARGER on-screen type (Anton 42-52). 50 beats. 2 stat cards: TARGETING AT LEAST / 80,000 / CELL SITES, and
// A MARKET RULED BY / 3 / MAJOR COMPANIES (the script's hard figures). 1 red impact at the CONTROVERSY pivot
// ("Aren't / convinced." — the telecom skeptics; reel closes on the comments-CTA media beat, not the red card), no black
// beat. Captions match the VO verbatim (figures as numerals only on the two cards; "2028" kept inline as spoken).
// Durations/reveals/SFX locked to the VO via a scribe_v1 word-timestamp anchor pass (public/carrier/voiceover.mp3).
// Built at the house +10% pacing default; its own driving, cinematic tech/space music mixed at 0.2. OWN distinct footage
// under public/carrier/ (49 stills), NO reuse of any other reel's clips — ledger-checked.
// FOOTAGE is strictly BRAND-FREE and GENERIC — because the reel names SpaceX, Starlink and three real carriers, NONE of
// their assets appear: NO SpaceX / Starlink logo / wordmark, NO AT&T / Verizon / T-Mobile logo / store / livery, NO
// identifiable Falcon / Starship rocket with markings, NO Elon Musk or any identifiable face, NO readable text / signage
// / UI / dial labels, NO national flags, NO identifiable currency notes, NO identifiable brand phone (blank screens
// only), NO identifiable named skyline or landmark. Metaphor-led satellite / network / telecom b-roll only: night sky
// and satellite streaks, a generic unmarked satellite / constellation over Earth, radio dishes and dish arrays, cell
// towers and antenna masts, a blank-screen phone in hand, circuit boards and data centers, abstract radio-wave / signal
// rings and fiber light, a generic dense city skyline and interiors, a handshake and a contract for the deals, gold
// bars / a vault and an abstract graph for the cost (no currency), a calendar / clock for the 2028 date, a mountain /
// scale motif for the challenge. **UNVERIFIED — states specific, checkable but evolving business claims (the ~80,000
// cell-site target; the spectrum-acquisition agreement; the first-half-2028 target; the cost estimate). Rendered
// VERBATIM as supplied, but every figure, date and claim MUST be fact-checked against primary reporting before
// publishing — plans and deals change. This is general information, not investment advice.**
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 112, kind: 'hook', reveal: [3, 40], text: 'Elon Musk wants SpaceX|to take on AT&T,', kicker: 'The carrier', highlights: [], size: 48, media: {src: 'carrier/sx00_satnight.jpg', type: 'img', effect: 'in'}},
  // 1
  {dur: 53, kind: 'text', reveal: [2], text: 'Verizon, and T-Mobile.', highlights: [], size: 52, pos: 'upperRight', media: {src: 'carrier/sx01_celltowers.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 67, kind: 'text', reveal: [2], text: 'And by 2028, Starlink', highlights: ['2028,'], size: 50, pos: 'left', media: {src: 'carrier/sx02_satstreaks.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 64, kind: 'text', reveal: [2], text: 'could become a major competitor', highlights: ['competitor'], size: 46, pos: 'lowerRight', media: {src: 'carrier/sx03_race.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 52, kind: 'text', reveal: [2], text: 'in America’s cellphone market.', highlights: ['cellphone'], size: 50, pos: 'upperLeft', media: {src: 'carrier/sx04_networkmap.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 117, kind: 'text', reveal: [2, 28], text: 'But this isn’t just about|connecting phones to satellites.', highlights: ['satellites.'], size: 44, pos: 'right', media: {src: 'carrier/sx05_dishsky.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 73, kind: 'text', reveal: [2, 28], text: 'Musk is planning something|much bigger:', highlights: ['bigger:'], size: 44, pos: 'lower', media: {src: 'carrier/sx06_vastscale.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 87, kind: 'text', reveal: [2, 28], text: 'building a nationwide|wireless network.', highlights: ['network.'], size: 48, pos: 'upperLeft', media: {src: 'carrier/sx07_networknodes.jpg', type: 'img', effect: 'in'}},
  // 8 FOLLOW
  {dur: 46, kind: 'text', reveal: [2], text: 'Follow for more updates', highlights: ['follow'], size: 50, pos: 'upperRight', media: {src: 'carrier/sx08_followphone.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 114, kind: 'text', reveal: [2, 28], text: 'on technology and the companies|changing the world.', highlights: ['world.'], size: 44, pos: 'lowerLeft', media: {src: 'carrier/sx09_globe.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 86, kind: 'text', reveal: [2, 28], text: 'SpaceX is moving beyond|satellite internet.', highlights: ['internet.'], size: 44, pos: 'right', media: {src: 'carrier/sx10_dishnight.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 67, kind: 'text', reveal: [2, 28], text: 'It wants to offer|mobile phone service', highlights: ['mobile'], size: 44, pos: 'left', media: {src: 'carrier/sx11_phoneperson.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 47, kind: 'text', reveal: [2], text: 'using Starlink satellites,', highlights: ['satellites,'], size: 52, pos: 'lowerRight', media: {src: 'carrier/sx12_constellation.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 31, kind: 'text', reveal: [2], text: 'wireless spectrum,', highlights: ['spectrum,'], size: 52, pos: 'upper', media: {src: 'carrier/sx13_spectrumwave.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 59, kind: 'text', reveal: [2], text: 'and traditional cell towers.', highlights: ['towers.'], size: 50, pos: 'left', media: {src: 'carrier/sx14_celltower2.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 100, kind: 'text', reveal: [2, 28], text: 'According to reports, SpaceX|is targeting at least', highlights: [], size: 44, pos: 'right', media: {src: 'carrier/sx15_data.jpg', type: 'img', effect: 'in'}},
  // 16 CARD
  {dur: 55, kind: 'stat', stat: {pre: 'TARGETING AT LEAST', value: 80000, post: 'CELL SITES'}, media: {src: 'carrier/sx16_towerarray.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 45, kind: 'text', reveal: [2], text: 'across the United States', highlights: [], size: 50, pos: 'lowerLeft', media: {src: 'carrier/sx17_usnetwork.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 47, kind: 'text', reveal: [2], text: 'and has been negotiating', highlights: ['negotiating'], size: 50, pos: 'upperRight', media: {src: 'carrier/sx18_handshake.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 72, kind: 'text', reveal: [2], text: 'access to cellular infrastructure.', highlights: ['infrastructure.'], size: 50, pos: 'left', media: {src: 'carrier/sx19_infra.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 92, kind: 'text', reveal: [2, 28], text: 'The company has also secured|an agreement to acquire', highlights: ['agreement'], size: 44, pos: 'lowerRight', media: {src: 'carrier/sx20_contract.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 59, kind: 'text', reveal: [2], text: 'valuable wireless spectrum,', highlights: ['spectrum,'], size: 52, pos: 'upperLeft', media: {src: 'carrier/sx21_spectrum2.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 49, kind: 'text', reveal: [2], text: 'helping it expand coverage', highlights: ['coverage'], size: 50, pos: 'right', media: {src: 'carrier/sx22_coveragerings.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 61, kind: 'text', reveal: [2], text: 'beyond satellite connections.', highlights: ['connections.'], size: 52, pos: 'lower', media: {src: 'carrier/sx23_satlink.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 47, kind: 'text', reveal: [2], text: 'SpaceX is targeting', highlights: [], size: 52, pos: 'upperRight', media: {src: 'carrier/sx24_antennafield.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 65, kind: 'text', reveal: [2], text: 'the first half of 2028', highlights: ['2028'], size: 46, pos: 'lowerLeft', media: {src: 'carrier/sx25_calendar.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 84, kind: 'text', reveal: [2, 28], text: 'for its own mobile|satellite service.', highlights: ['satellite'], size: 44, pos: 'left', media: {src: 'carrier/sx26_satellite.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 92, kind: 'text', reveal: [2, 28], text: 'Elon Musk believes|the company can build a network', highlights: ['network'], size: 44, pos: 'right', media: {src: 'carrier/sx27_towersrising.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 44, kind: 'text', reveal: [2], text: 'capable of competing', highlights: ['competing'], size: 52, pos: 'lowerRight', media: {src: 'carrier/sx28_arena.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 42, kind: 'text', reveal: [2], text: 'with traditional carriers.', highlights: ['carriers.'], size: 52, pos: 'upperLeft', media: {src: 'carrier/sx29_towerrow.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 38, kind: 'text', reveal: [2], text: 'If successful, this could', highlights: [], size: 50, pos: 'right', media: {src: 'carrier/sx30_sunrise.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 83, kind: 'text', reveal: [2, 28], text: 'introduce a powerful|new competitor', highlights: ['powerful'], size: 48, pos: 'upperRight', media: {src: 'carrier/sx31_energy.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 64, kind: 'text', reveal: [2], text: 'into a market dominated by', highlights: [], size: 46, pos: 'left', media: {src: 'carrier/sx32_market.jpg', type: 'img', effect: 'in'}},
  // 33 CARD
  {dur: 40, kind: 'stat', stat: {pre: 'A MARKET RULED BY', value: 3, post: 'MAJOR COMPANIES'}, media: {src: 'carrier/sx33_threepillars.jpg', type: 'img', effect: 'in'}},
  // 34
  {dur: 59, kind: 'text', reveal: [2], text: 'potentially creating more choices', highlights: ['choices'], size: 50, pos: 'lowerLeft', media: {src: 'carrier/sx34_paths.jpg', type: 'img', effect: 'in'}},
  // 35
  {dur: 72, kind: 'text', reveal: [2, 28], text: 'and price competition|for consumers.', highlights: ['price'], size: 48, pos: 'upper', media: {src: 'carrier/sx35_pricegraph.jpg', type: 'img', effect: 'in'}},
  // 36
  {dur: 48, kind: 'text', reveal: [2], text: 'But the telecom giants', highlights: ['giants'], size: 50, pos: 'right', media: {src: 'carrier/sx36_bigtowers.jpg', type: 'img', effect: 'in'}},
  // 37 RED
  {dur: 26, kind: 'impact', redBg: true, text: 'Aren’t|convinced.'},
  // 38
  {dur: 48, kind: 'text', reveal: [2], text: 'Building a nationwide network', highlights: [], size: 50, pos: 'lowerRight', media: {src: 'carrier/sx38_construction.jpg', type: 'img', effect: 'in'}},
  // 39
  {dur: 38, kind: 'text', reveal: [2], text: 'could cost hundreds', highlights: [], size: 52, pos: 'upperLeft', media: {src: 'carrier/sx39_goldbars.jpg', type: 'img', effect: 'in'}},
  // 40
  {dur: 40, kind: 'text', reveal: [2], text: 'of billions of dollars,', highlights: ['billions'], size: 50, pos: 'left', media: {src: 'carrier/sx40_vault.jpg', type: 'img', effect: 'in'}},
  // 41
  {dur: 64, kind: 'text', reveal: [2], text: 'and satellites alone cannot', highlights: ['alone'], size: 50, pos: 'lowerRight', media: {src: 'carrier/sx41_lonesat.jpg', type: 'img', effect: 'in'}},
  // 42
  {dur: 72, kind: 'text', reveal: [2, 28], text: 'easily match traditional|cell towers', highlights: ['towers'], size: 48, pos: 'upperRight', media: {src: 'carrier/sx42_towervssat.jpg', type: 'img', effect: 'in'}},
  // 43
  {dur: 36, kind: 'text', reveal: [2], text: 'in crowded cities', highlights: ['crowded'], size: 52, pos: 'right', media: {src: 'carrier/sx43_cityskyline.jpg', type: 'img', effect: 'in'}},
  // 44
  {dur: 46, kind: 'text', reveal: [2], text: 'and indoor locations.', highlights: ['indoor'], size: 52, pos: 'lowerLeft', media: {src: 'carrier/sx44_indoor.jpg', type: 'img', effect: 'in'}},
  // 45
  {dur: 64, kind: 'text', reveal: [2], text: 'So, could Starlink actually', highlights: [], size: 50, pos: 'left', media: {src: 'carrier/sx45_satquestion.jpg', type: 'img', effect: 'in'}},
  // 46
  {dur: 76, kind: 'text', reveal: [2, 28], text: 'replace traditional|cellphone providers,', highlights: ['replace'], size: 50, pos: 'upperRight', media: {src: 'carrier/sx46_swap.jpg', type: 'img', effect: 'in'}},
  // 47
  {dur: 53, kind: 'text', reveal: [2], text: 'or is Musk taking on', highlights: [], size: 46, pos: 'lower', media: {src: 'carrier/sx47_mountain.jpg', type: 'img', effect: 'in'}},
  // 48
  {dur: 62, kind: 'text', reveal: [2, 28], text: 'a challenge that’s bigger than|he expects?', highlights: ['bigger'], size: 44, pos: 'right', media: {src: 'carrier/sx48_goliath.jpg', type: 'img', effect: 'in'}},
  // 49 CTA
  {dur: 38, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Let me know|in the comments.', highlights: ['comments'], size: 46, media: {src: 'carrier/sx49_commentsphone.jpg', type: 'img', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 1175, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 2214, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 2433, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 3058, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The carrier</span>
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
export const CarrierReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('carrier/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('carrier/music.mp3')}
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
