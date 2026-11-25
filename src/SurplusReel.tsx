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
// "The surplus" reel (SurplusReel) — fast NEWS reel, Hard Ledger house VISUAL format, trade / China / global-economy topic.
// TOPIC: CHINA JUST HIT A $1 TRILLION TRADE SURPLUS and why it matters. China generated more than $1 trillion in trade
// surplus in just 10 months — a record that could spark a new economic battle with the US and Europe. The twist: the
// export boom is happening while China's OWN consumers are struggling to spend, so manufacturers lean ever harder on
// foreign customers. Per China's customs data, the surplus reached $1.04 TRILLION between January and October 2026, and
// exports jumped 35.2% in October year-on-year, with semiconductor exports surging on global AI-infrastructure demand.
// The strain: China is shipping more to the US and EU, raising competition and trade-imbalance concerns; more countries
// could answer with TARIFFS and restrictions, making Chinese goods pricier and disrupting supply chains. Debate:
// supporters call it manufacturing dominance; critics call weak domestic consumption + export reliance a dangerous
// imbalance others can't ignore. Is $1T proof of dominance, or a warning the global trade system is unbalanced?
// NOTE ON VOICE: built VERBATIM from a client-supplied script in the influencer "curiosity-gap" format, NOT the faceless
// house voice — it uses an EARLY "follow for more" CTA and CLOSES on a "let me know in the comments" debate CTA. Per the
// saved house preference, captions are <=5-6 words/beat with LARGER on-screen type (Anton 42-52). 56 beats. 2 stat cards:
// $1.04T / TRADE SURPLUS (the customs Jan-Oct 2026 figure) and 35.2% / OCT EXPORTS (October YoY export jump) — the
// script's hard figures; the round "$1 trillion" hook/close figure stays in-caption as the VO states it. 1 red impact at
// the CONTROVERSY pivot ("A dangerous / imbalance." — the critics' core argument; reel closes on the comments-CTA media
// beat), no black beat. Captions match the VO verbatim (the year "2026" stays in-caption). Durations/reveals/SFX locked
// to the VO via a scribe_v1 word-timestamp anchor pass (public/surplus/voiceover.mp3). Built at the house +10% pacing
// default; its own tense trade/geopolitics music mixed at 0.2. OWN distinct footage under public/surplus/ (55 stills), NO
// reuse of any other reel's clips — ledger-checked. ADJACENT to but DISTINCT from ChinaReel ("The shortage", the Nvidia
// AI-chip shortage) and TariffReel — this is China's RECORD TRADE SURPLUS / export-boom story.
// FOOTAGE is strictly BRAND-FREE — NO China / US / EU / any national flag, NO shipping-line or brand logo / livery
// (Cosco / Evergreen / Maersk / OOCL / etc.), NO readable vessel name, NO readable ticker / index / sign / screen /
// Chinese-character brand text, NO identifiable face, NO readable currency denomination. Metaphor-led trade / export /
// economy b-roll only: stacked shipping containers and a container port and gantry cranes and a cargo ship and a cargo
// plane for exports, a red rising export chart and an upward arrow and a world map / globe with trade routes for the
// surplus and the cards, an EV / battery pack / circuit board / server racks for the product mix, an empty mall / a lone
// shopper / an empty cart for weak domestic demand, a factory floor / robotic arm / assembly line for manufacturing, a
// tug-of-war / chess / scales for the US-EU tension and the debate, a customs stamp / a barrier / a port crane for
// tariffs and restrictions, a tangled supply-chain / a broken chain for disruption, blank-screen phones for the FOLLOW
// and comments CTAs.
// **UNVERIFIED — states specific, fast-moving, checkable figures (China's customs $1.04T Jan-Oct 2026 trade surplus; the
// 35.2% October YoY export jump; surging semiconductor exports). Rendered VERBATIM as supplied, but every figure and
// claim MUST be fact-checked against primary sources (China's customs administration / GACC) before publishing — trade
// data and the 2026 dates must be confirmed. This is general information, not investment advice.**
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 103, kind: 'hook', reveal: [3, 40], text: 'China has generated|more than $1 trillion', kicker: 'The surplus', highlights: ['trillion'], size: 48, media: {src: 'surplus/su00_generated.jpg', type: 'img', effect: 'in'}},
  // 1
  {dur: 35, kind: 'text', reveal: [2], text: 'in trade surplus', highlights: ['surplus'], size: 52, pos: 'upperRight', media: {src: 'surplus/su01_surplus.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 43, kind: 'text', reveal: [2], text: 'in just 10 months.', highlights: ['10'], size: 50, pos: 'left', media: {src: 'surplus/su02_months.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 26, kind: 'text', reveal: [2], text: 'And that record', highlights: [], size: 52, pos: 'lowerRight', media: {src: 'surplus/su03_record.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 75, kind: 'text', reveal: [2, 28], text: 'could create a|new economic battle', highlights: ['battle'], size: 44, pos: 'upperLeft', media: {src: 'surplus/su04_battle.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 57, kind: 'text', reveal: [2, 28], text: 'with the United States|and Europe.', highlights: [], size: 44, pos: 'right', media: {src: 'surplus/su05_useurope.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 48, kind: 'text', reveal: [2, 28], text: 'But here’s the|surprising part:', highlights: [], size: 48, pos: 'lower', media: {src: 'surplus/su06_surprising.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 43, kind: 'text', reveal: [2], text: 'China’s export boom', highlights: ['boom'], size: 52, pos: 'lowerLeft', media: {src: 'surplus/su07_boom.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 39, kind: 'text', reveal: [2], text: 'is happening while', highlights: [], size: 52, pos: 'upperRight', media: {src: 'surplus/su08_happening.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 35, kind: 'text', reveal: [2], text: 'its own consumers', highlights: ['consumers'], size: 52, pos: 'left', media: {src: 'surplus/su09_consumers.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 61, kind: 'text', reveal: [2, 28], text: 'are struggling|to spend money.', highlights: ['struggling'], size: 48, pos: 'right', media: {src: 'surplus/su10_struggling.jpg', type: 'img', effect: 'in'}},
  // 11 FOLLOW
  {dur: 38, kind: 'text', reveal: [2], text: 'Follow for|more updates', highlights: ['follow'], size: 50, pos: 'upperLeft', media: {src: 'surplus/su11_follow.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 36, kind: 'text', reveal: [2], text: 'on the global economy', highlights: [], size: 50, pos: 'lowerRight', media: {src: 'surplus/su12_economy.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 26, kind: 'text', reveal: [2], text: 'and the competition', highlights: ['competition'], size: 52, pos: 'upper', media: {src: 'surplus/su13_competition.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 66, kind: 'text', reveal: [2, 28], text: 'between the world’s|biggest powers.', highlights: ['powers.'], size: 48, pos: 'left', media: {src: 'surplus/su14_powers.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 67, kind: 'text', reveal: [2, 28], text: 'China sells|enormous amounts', highlights: ['enormous'], size: 50, pos: 'right', media: {src: 'surplus/su15_enormous.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 39, kind: 'text', reveal: [2], text: 'of products overseas,', highlights: [], size: 52, pos: 'lowerLeft', media: {src: 'surplus/su16_overseas.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 55, kind: 'text', reveal: [2, 28], text: 'from electric vehicles|and batteries', highlights: ['batteries'], size: 48, pos: 'upperRight', media: {src: 'surplus/su17_evs.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 92, kind: 'text', reveal: [2, 28], text: 'to electronics and|AI infrastructure equipment.', highlights: ['AI'], size: 44, pos: 'left', media: {src: 'surplus/su18_ai.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 52, kind: 'text', reveal: [2, 28], text: 'But weak|domestic demand', highlights: ['weak'], size: 50, pos: 'lowerRight', media: {src: 'surplus/su19_weak.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 45, kind: 'text', reveal: [2], text: 'means manufacturers', highlights: [], size: 52, pos: 'upperLeft', media: {src: 'surplus/su20_manufacturers.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 109, kind: 'text', reveal: [2, 28], text: 'increasingly depend|on international customers.', highlights: ['depend'], size: 48, pos: 'right', media: {src: 'surplus/su21_depend.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 59, kind: 'text', reveal: [2, 28], text: 'According to|China’s customs data,', highlights: ['customs'], size: 48, pos: 'lower', media: {src: 'surplus/su22_customs.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 48, kind: 'text', reveal: [2], text: 'its trade surplus reached', highlights: [], size: 50, pos: 'upperRight', media: {src: 'surplus/su23_reached.jpg', type: 'img', effect: 'in'}},
  // 24 CARD
  {dur: 62, kind: 'stat', stat: {prefix: '$', value: 1.04, decimals: 2, suffix: 'T', post: 'TRADE SURPLUS'}, media: {src: 'surplus/su24_card104.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 92, kind: 'text', reveal: [2, 28], text: 'between January|and October 2026.', highlights: ['2026.'], size: 48, pos: 'lowerLeft', media: {src: 'surplus/su25_janoct.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 26, kind: 'text', reveal: [2], text: 'Exports jumped', highlights: ['jumped'], size: 52, pos: 'left', media: {src: 'surplus/su26_jumped.jpg', type: 'img', effect: 'in'}},
  // 27 CARD
  {dur: 70, kind: 'stat', stat: {value: 35.2, decimals: 1, suffix: '%', post: 'OCT EXPORTS'}, media: {src: 'surplus/su27_card352.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 40, kind: 'text', reveal: [2, 28], text: 'in October|compared with last year.', highlights: [], size: 44, pos: 'right', media: {src: 'surplus/su28_lastyear.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 72, kind: 'text', reveal: [2, 28], text: 'Semiconductor exports|also surged,', highlights: ['surged,'], size: 50, pos: 'lowerRight', media: {src: 'surplus/su29_surged.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 48, kind: 'text', reveal: [2], text: 'fueled by global demand', highlights: ['demand'], size: 50, pos: 'upperLeft', media: {src: 'surplus/su30_demand.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 47, kind: 'text', reveal: [2], text: 'for AI infrastructure.', highlights: ['AI'], size: 52, pos: 'right', media: {src: 'surplus/su31_aiinfra.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'But this growth|is creating tension.', highlights: ['tension.'], size: 44, pos: 'upperRight', media: {src: 'surplus/su32_tension.jpg', type: 'img', effect: 'in'}},
  // 33
  {dur: 54, kind: 'text', reveal: [2, 28], text: 'China is exporting|more goods', highlights: [], size: 48, pos: 'left', media: {src: 'surplus/su33_moregoods.jpg', type: 'img', effect: 'in'}},
  // 34
  {dur: 28, kind: 'text', reveal: [2], text: 'to major markets,', highlights: ['major'], size: 52, pos: 'lowerLeft', media: {src: 'surplus/su34_markets.jpg', type: 'img', effect: 'in'}},
  // 35
  {dur: 75, kind: 'text', reveal: [2, 28], text: 'including the United States|and European Union,', highlights: [], size: 44, pos: 'upper', media: {src: 'surplus/su35_useu.jpg', type: 'img', effect: 'in'}},
  // 36
  {dur: 68, kind: 'text', reveal: [2, 28], text: 'raising concerns|about competition', highlights: ['concerns'], size: 50, pos: 'right', media: {src: 'surplus/su36_concerns.jpg', type: 'img', effect: 'in'}},
  // 37
  {dur: 47, kind: 'text', reveal: [2], text: 'and trade imbalances.', highlights: ['imbalances.'], size: 52, pos: 'lowerRight', media: {src: 'surplus/su37_imbalances.jpg', type: 'img', effect: 'in'}},
  // 38
  {dur: 49, kind: 'text', reveal: [2, 28], text: 'More countries|could respond', highlights: [], size: 50, pos: 'upperLeft', media: {src: 'surplus/su38_respond.jpg', type: 'img', effect: 'in'}},
  // 39
  {dur: 55, kind: 'text', reveal: [2, 28], text: 'with tariffs and|trade restrictions,', highlights: ['tariffs'], size: 48, pos: 'left', media: {src: 'surplus/su39_tariffs.jpg', type: 'img', effect: 'in'}},
  // 40
  {dur: 57, kind: 'text', reveal: [2, 28], text: 'potentially making|Chinese products', highlights: [], size: 50, pos: 'lowerRight', media: {src: 'surplus/su40_products.jpg', type: 'img', effect: 'in'}},
  // 41
  {dur: 36, kind: 'text', reveal: [2], text: 'more expensive', highlights: ['expensive'], size: 52, pos: 'upperRight', media: {src: 'surplus/su41_expensive.jpg', type: 'img', effect: 'in'}},
  // 42
  {dur: 75, kind: 'text', reveal: [2, 28], text: 'and disrupting|global supply chains.', highlights: ['disrupting'], size: 48, pos: 'right', media: {src: 'surplus/su42_supplychains.jpg', type: 'img', effect: 'in'}},
  // 43
  {dur: 81, kind: 'text', reveal: [2, 28], text: 'Supporters see|China’s export strength', highlights: ['strength'], size: 48, pos: 'lowerLeft', media: {src: 'surplus/su43_strength.jpg', type: 'img', effect: 'in'}},
  // 44
  {dur: 72, kind: 'text', reveal: [2, 28], text: 'as proof of its|manufacturing power.', highlights: ['power.'], size: 44, pos: 'left', media: {src: 'surplus/su44_power.jpg', type: 'img', effect: 'in'}},
  // 45
  {dur: 33, kind: 'text', reveal: [2], text: 'Critics argue that', highlights: [], size: 52, pos: 'upperRight', media: {src: 'surplus/su45_critics.jpg', type: 'img', effect: 'in'}},
  // 46
  {dur: 48, kind: 'text', reveal: [2], text: 'weak domestic consumption', highlights: ['weak'], size: 52, pos: 'lower', media: {src: 'surplus/su46_weakdom.jpg', type: 'img', effect: 'in'}},
  // 47
  {dur: 56, kind: 'text', reveal: [2, 28], text: 'and heavy reliance|on exports', highlights: ['reliance'], size: 48, pos: 'right', media: {src: 'surplus/su47_reliance.jpg', type: 'img', effect: 'in'}},
  // 48 RED
  {dur: 133, kind: 'impact', redBg: true, text: 'A dangerous|imbalance.'},
  // 49
  {dur: 27, kind: 'text', reveal: [2], text: 'So what do you think?', highlights: [], size: 46, pos: 'upperLeft', media: {src: 'surplus/su49_think.jpg', type: 'img', effect: 'in'}},
  // 50
  {dur: 69, kind: 'text', reveal: [2, 28], text: 'Is China’s $1 trillion|trade surplus', highlights: ['trillion'], size: 44, pos: 'lowerRight', media: {src: 'surplus/su50_onet.jpg', type: 'img', effect: 'in'}},
  // 51
  {dur: 52, kind: 'text', reveal: [2, 28], text: 'proof of|economic dominance,', highlights: ['dominance,'], size: 50, pos: 'left', media: {src: 'surplus/su51_dominance.jpg', type: 'img', effect: 'in'}},
  // 52
  {dur: 36, kind: 'text', reveal: [2], text: 'or a warning sign', highlights: ['warning'], size: 50, pos: 'upperRight', media: {src: 'surplus/su52_warning.jpg', type: 'img', effect: 'in'}},
  // 53
  {dur: 50, kind: 'text', reveal: [2, 28], text: 'that the global|trade system', highlights: [], size: 48, pos: 'right', media: {src: 'surplus/su53_system.jpg', type: 'img', effect: 'in'}},
  // 54
  {dur: 85, kind: 'text', reveal: [2, 28], text: 'is becoming|increasingly unbalanced?', highlights: ['unbalanced?'], size: 50, pos: 'lowerLeft', media: {src: 'surplus/su54_unbalanced.jpg', type: 'img', effect: 'in'}},
  // 55 CTA
  {dur: 38, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Let me know|in the comments.', highlights: ['comments'], size: 46, media: {src: 'surplus/su55_comments.jpg', type: 'img', effect: 'in'}},
];


type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 1297, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1477, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 2658, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 3110, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The surplus</span>
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
export const SurplusReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('surplus/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('surplus/music.mp3')}
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
