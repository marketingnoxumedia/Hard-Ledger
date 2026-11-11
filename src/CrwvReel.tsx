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
// "The burn" reel (CrwvReel) — fast MARKETS / TECHNOLOGY news reel, Hard Ledger house VISUAL format.
// TOPIC: CoreWeave (CRWV) stock JUMPS ~13% premarket — BUT a nearly $47B DEBT problem sits behind the AI boom. The
// AI-cloud provider (rents Nvidia-based infrastructure to AI developers) posted Q3: revenue $3.66B (+168% YoY, beating
// estimates), contracted revenue backlog $132.5B, and raised 2026 revenue guidance to $13B-$13.3B. The other side: a
// $709M net loss, $846M interest expense for the quarter, and $37B-$39B of planned 2025 data-center capex. Management
// says demand is ~10x available capacity and expects ~$9B of customer prepayments/deposits over the next three months to
// help fund the build-out. Debate: can CoreWeave convert enormous demand into sustainable profit before borrowing costs
// become a bigger problem — biggest AI opportunity, or debt too dangerous? Would you buy CRWV here?
// NOTE ON VOICE: built VERBATIM from a client-supplied script in the influencer "curiosity-gap" format, NOT the faceless
// house voice — it uses an EARLY "follow for more" CTA and CLOSES on "Would you buy CRWV at these levels?".
// Per the saved house preference, captions are <=5-6 words/beat with LARGER on-screen type (Anton 42-52). 49 beats. 5 stat
// cards: +13% IN PREMARKET, NEARLY $47B IN DEBT, $3.66B Q3 REVENUE, $132.5B REVENUE BACKLOG, $709M NET LOSS (the figures
// that carry the bull/bear split; the rest — 168%, $13-13.3B guide, $846M interest, $37-39B capex, 10x demand, $9B
// prepayments — stay in-caption as the VO states them). 1 red impact at the CONTROVERSY pivot ("become a / bigger
// problem."), no black beat. Captions match the VO verbatim. Durations/reveals/SFX locked to the VO via a scribe_v1
// word-timestamp anchor pass (public/crwv/voiceover.mp3). Built at the house +10% pacing default; its own tense
// markets/tech-news music mixed at 0.2. OWN distinct footage under public/crwv/ (48 stills), NO reuse of any other reel's
// clips — ledger-checked.
// FOOTAGE is strictly BRAND-FREE — NO CoreWeave / Nvidia / any company logo or wordmark, NO ticker / trading-app / earnings
// screenshots, NO readable sign / screen / brand text, NO national flag, NO readable real currency, NO identifiable real
// face. Metaphor-led AI-datacenter / markets b-roll only: server racks and blinking data-center aisles, fiber and cabling,
// GPU/circuit-board macros, cooling and power infrastructure, abstract green up-candles / rising and falling line charts on
// generic screens (no readable tickers), a heavy chain / weight / anchor for the debt, a burning fuse / candle for the
// cash burn, coins and a scale for the loss-vs-backlog split, a construction crane / rising data-center shell for capex, a
// surging crowd / arrow-up motif for demand, a question mark and a fork in the road for the unknowns, a blank-screen phone
// for the FOLLOW CTA.
// **UNVERIFIED AND MARKET-SENSITIVE — names a REAL public company (CoreWeave / CRWV) and cites specific financials (a ~13%
// move, ~$47B debt, $3.66B revenue, +168%, $132.5B backlog, $13-13.3B guide, $709M net loss, $846M interest, $37-39B
// capex, ~10x demand, ~$9B prepayments). Rendered VERBATIM as supplied, but every figure, the stock move and the earnings
// claims MUST be fact-checked against CoreWeave's official Q3 release / SEC filings and live market data before publishing.
// This is general market information, NOT investment advice; the closing "would you buy" line is the client's engagement
// prompt, not a recommendation.**
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 49, kind: 'hook', reveal: [3, 40], text: 'CoreWeave stock|is surging', kicker: 'The burn', highlights: [], size: 54, media: {src: 'crwv/cw00_surge.jpg', type: 'img', effect: 'in'}},
  // 1 CARD
  {dur: 88, kind: 'stat', stat: {prefix: '+', value: 13, suffix: '%', post: 'IN PREMARKET'}, media: {src: 'crwv/cw01_premkt.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 51, kind: 'text', reveal: [2], text: 'But behind this AI boom', highlights: ['boom'], size: 46, pos: 'upperRight', media: {src: 'crwv/cw02_boom.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 28, kind: 'text', reveal: [2], text: 'is a company carrying', highlights: [], size: 50, pos: 'left', media: {src: 'crwv/cw03_carrying.jpg', type: 'img', effect: 'in'}},
  // 4 CARD
  {dur: 96, kind: 'stat', stat: {pre: 'NEARLY', prefix: '$', value: 47, suffix: 'B', post: 'IN DEBT'}, media: {src: 'crwv/cw04_debt.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 50, kind: 'text', reveal: [2], text: 'So why are investors', highlights: ['why'], size: 50, pos: 'lowerRight', media: {src: 'crwv/cw05_why.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 63, kind: 'text', reveal: [2], text: 'suddenly buying back into a stock', highlights: ['buying'], size: 42, pos: 'upperLeft', media: {src: 'crwv/cw06_buying.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 82, kind: 'text', reveal: [2, 28], text: 'that recently suffered|a brutal selloff?', highlights: ['selloff?'], size: 44, pos: 'right', media: {src: 'crwv/cw07_selloff.jpg', type: 'img', effect: 'in'}},
  // 8 FOLLOW
  {dur: 109, kind: 'text', reveal: [2], text: 'Follow for more stock market|and technology news.', highlights: ['follow'], size: 44, pos: 'lower', media: {src: 'crwv/cw08_follow.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 46, kind: 'text', reveal: [2, 28], text: 'CoreWeave,|a cloud computing company', highlights: ['cloud'], size: 48, pos: 'lowerLeft', media: {src: 'crwv/cw09_cloud.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 33, kind: 'text', reveal: [2], text: 'that rents powerful', highlights: ['powerful'], size: 52, pos: 'upperRight', media: {src: 'crwv/cw10_rents.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 45, kind: 'text', reveal: [2], text: 'Nvidia-based infrastructure', highlights: ['Nvidia-based'], size: 52, pos: 'left', media: {src: 'crwv/cw11_infra.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 40, kind: 'text', reveal: [2], text: 'to AI developers,', highlights: ['AI'], size: 52, pos: 'right', media: {src: 'crwv/cw12_devs.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 84, kind: 'text', reveal: [2, 28], text: 'just reported its|third-quarter results.', highlights: ['third-quarter'], size: 48, pos: 'upperLeft', media: {src: 'crwv/cw13_results.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 28, kind: 'text', reveal: [2], text: 'Revenue reached', highlights: ['Revenue'], size: 52, pos: 'lowerRight', media: {src: 'crwv/cw14_revenue.jpg', type: 'img', effect: 'in'}},
  // 15 CARD
  {dur: 79, kind: 'stat', stat: {prefix: '$', value: 3.66, decimals: 2, suffix: 'B', post: 'Q3 REVENUE'}, media: {src: 'crwv/cw15_rev366.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 94, kind: 'text', reveal: [2, 28], text: 'up 168%|from a year earlier,', highlights: ['168%'], size: 44, pos: 'upper', media: {src: 'crwv/cw16_168.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 58, kind: 'text', reveal: [2], text: 'beating analyst expectations.', highlights: ['beating'], size: 52, pos: 'left', media: {src: 'crwv/cw17_beat.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 32, kind: 'text', reveal: [2], text: 'Even more striking,', highlights: ['striking,'], size: 52, pos: 'right', media: {src: 'crwv/cw18_striking.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 57, kind: 'text', reveal: [2, 28], text: 'its contracted|revenue backlog', highlights: ['backlog'], size: 50, pos: 'lowerLeft', media: {src: 'crwv/cw19_backlog.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 26, kind: 'text', reveal: [2], text: 'climbed to', highlights: [], size: 52, pos: 'upperRight', media: {src: 'crwv/cw20_climbed.jpg', type: 'img', effect: 'in'}},
  // 21 CARD
  {dur: 72, kind: 'stat', stat: {prefix: '$', value: 132.5, decimals: 1, suffix: 'B', post: 'REVENUE BACKLOG'}, media: {src: 'crwv/cw21_card132.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 40, kind: 'text', reveal: [2], text: 'The company also raised', highlights: ['raised'], size: 50, pos: 'left', media: {src: 'crwv/cw22_raised.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 61, kind: 'text', reveal: [2], text: 'its 2026 revenue forecast', highlights: ['2026'], size: 50, pos: 'lowerRight', media: {src: 'crwv/cw23_forecast.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 94, kind: 'text', reveal: [2, 28], text: 'to between $13 billion|and $13.3 billion.', highlights: ['$13.3'], size: 44, pos: 'upperLeft', media: {src: 'crwv/cw24_guide.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 45, kind: 'text', reveal: [2, 28], text: 'But there’s another side|to the numbers.', highlights: ['another'], size: 44, pos: 'right', media: {src: 'crwv/cw25_otherside.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 35, kind: 'text', reveal: [2], text: 'CoreWeave reported', highlights: [], size: 52, pos: 'lower', media: {src: 'crwv/cw26_reported.jpg', type: 'img', effect: 'in'}},
  // 27 CARD
  {dur: 88, kind: 'stat', stat: {prefix: '$', value: 709, suffix: 'M', post: 'NET LOSS'}, media: {src: 'crwv/cw27_card709.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 116, kind: 'text', reveal: [2, 28], text: 'while interest expenses|reached $846 million', highlights: ['$846'], size: 44, pos: 'upperRight', media: {src: 'crwv/cw28_interest.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 26, kind: 'text', reveal: [2], text: 'for the quarter.', highlights: [], size: 52, pos: 'lowerLeft', media: {src: 'crwv/cw29_quarter.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 43, kind: 'text', reveal: [2], text: 'And it expects to spend', highlights: ['spend'], size: 46, pos: 'left', media: {src: 'crwv/cw30_spend.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 129, kind: 'text', reveal: [2, 28], text: 'between $37 billion|and $39 billion this year', highlights: ['$39'], size: 44, pos: 'right', media: {src: 'crwv/cw31_capex.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 81, kind: 'text', reveal: [2, 28], text: 'expanding its data center|infrastructure.', highlights: ['infrastructure.'], size: 48, pos: 'lowerRight', media: {src: 'crwv/cw32_datacenter.jpg', type: 'img', effect: 'in'}},
  // 33
  {dur: 50, kind: 'text', reveal: [2], text: 'Management says demand', highlights: ['demand'], size: 52, pos: 'upperLeft', media: {src: 'crwv/cw33_demand.jpg', type: 'img', effect: 'in'}},
  // 34
  {dur: 106, kind: 'text', reveal: [2, 28], text: 'is roughly ten times|its available capacity.', highlights: ['ten'], size: 44, pos: 'right', media: {src: 'crwv/cw34_tenx.jpg', type: 'img', effect: 'in'}},
  // 35
  {dur: 96, kind: 'text', reveal: [2, 28], text: 'It also expects|around $9 billion', highlights: ['$9'], size: 44, pos: 'upperRight', media: {src: 'crwv/cw35_nineb.jpg', type: 'img', effect: 'in'}},
  // 36
  {dur: 62, kind: 'text', reveal: [2, 28], text: 'in customer prepayments|and deposits', highlights: ['prepayments'], size: 48, pos: 'left', media: {src: 'crwv/cw36_prepay.jpg', type: 'img', effect: 'in'}},
  // 37
  {dur: 32, kind: 'text', reveal: [2], text: 'over the next three months', highlights: [], size: 46, pos: 'lowerLeft', media: {src: 'crwv/cw37_months.jpg', type: 'img', effect: 'in'}},
  // 38
  {dur: 51, kind: 'text', reveal: [2], text: 'to help fund expansion.', highlights: ['expansion.'], size: 50, pos: 'upper', media: {src: 'crwv/cw38_fund.jpg', type: 'img', effect: 'in'}},
  // 39
  {dur: 34, kind: 'text', reveal: [2], text: 'The question is whether', highlights: [], size: 50, pos: 'right', media: {src: 'crwv/cw39_question.jpg', type: 'img', effect: 'in'}},
  // 40
  {dur: 94, kind: 'text', reveal: [2, 28], text: 'CoreWeave can turn|this enormous demand', highlights: ['enormous'], size: 44, pos: 'lowerRight', media: {src: 'crwv/cw40_enormous.jpg', type: 'img', effect: 'in'}},
  // 41
  {dur: 47, kind: 'text', reveal: [2], text: 'into sustainable profits', highlights: ['sustainable'], size: 52, pos: 'upperLeft', media: {src: 'crwv/cw41_profits.jpg', type: 'img', effect: 'in'}},
  // 42
  {dur: 56, kind: 'text', reveal: [2], text: 'before its borrowing costs', highlights: ['borrowing'], size: 50, pos: 'left', media: {src: 'crwv/cw42_borrowing.jpg', type: 'img', effect: 'in'}},
  // 43 RED
  {dur: 57, kind: 'impact', redBg: true, text: 'become a|bigger problem.'},
  // 44
  {dur: 28, kind: 'text', reveal: [2], text: 'Is CoreWeave one of', highlights: [], size: 50, pos: 'lowerRight', media: {src: 'crwv/cw44_isone.jpg', type: 'img', effect: 'in'}},
  // 45
  {dur: 37, kind: 'text', reveal: [2], text: 'the biggest opportunities', highlights: ['biggest'], size: 52, pos: 'upperRight', media: {src: 'crwv/cw45_biggest.jpg', type: 'img', effect: 'in'}},
  // 46
  {dur: 31, kind: 'text', reveal: [2], text: 'in the AI boom,', highlights: [], size: 50, pos: 'right', media: {src: 'crwv/cw46_aiboom.jpg', type: 'img', effect: 'in'}},
  // 47
  {dur: 91, kind: 'text', reveal: [2, 28], text: 'or is its debt|becoming too dangerous?', highlights: ['dangerous?'], size: 44, pos: 'lowerLeft', media: {src: 'crwv/cw47_dangerous.jpg', type: 'img', effect: 'in'}},
  // 48 CTA
  {dur: 87, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Would you buy CRWV|at these levels?', highlights: ['CRWV'], size: 46, media: {src: 'crwv/cw48_crwv.jpg', type: 'img', effect: 'in'}},
];


type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 49, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 216, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 892, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1238, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1585, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 2696, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 2940, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The burn</span>
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
export const CrwvReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('crwv/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('crwv/music.mp3')}
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
