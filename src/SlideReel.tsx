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
// "The crypto slide" reel (SlideReel) — fast CRYPTO / MARKETS news reel, Hard Ledger house VISUAL format.
// TOPIC: BITCOIN is stuck below $65,000 and investors are getting nervous. The latest selloff raises the question of
// whether crypto is heading into another major downturn. The twist: even as Bitcoin attempts a small recovery,
// institutional investors keep pulling billions out. CONTEXT: on Monday, November 16, BTC traded ~$64,866, near a
// three-month low after weeks of losses across digital assets. EVIDENCE: U.S. spot Bitcoin ETFs saw ~$1.07B in outflows
// in the week ending November 13 (per SoSoValue) — a third straight week of withdrawals. ESCALATION: stronger-than-
// expected U.S. inflation has raised odds the Federal Reserve hikes rates in December, and higher borrowing costs make
// speculative bets like Bitcoin less attractive. CONSEQUENCES: MSCI plans to remove Bitcoin-treasury companies (including
// Strategy) from its indexes at the end of November, which could choke their access to institutional capital. DEBATE:
// temporary correction, or the start of a deeper crash below $65,000?
// NOTE ON VOICE: built VERBATIM from a client-supplied script in the influencer "curiosity-gap" format, NOT the faceless
// house voice — it uses an EARLY "follow for more" CTA and CLOSES on "What do you think?".
// Per the saved house preference, captions are <=5-6 words/beat with LARGER on-screen type (Anton 42-52). 50 beats. 2 stat
// cards: $64,866 MONDAY (the traded price) and $1.07B IN OUTFLOWS (the weekly ETF outflows); dates (Nov 16 / Nov 13), the
// $65,000 level and "third consecutive week" stay in-caption. 1 red impact at the CONTROVERSY pivot ("Even / lower."), no
// black beat. Captions match the VO verbatim (SoSoValue / MSCI / Strategy / the Fed stay in-caption). Durations/reveals/
// SFX locked to the VO via a scribe_v1 word-timestamp anchor pass (public/slide/voiceover.mp3). Built at the house +10%
// pacing default; its own tense crypto/markets-news music mixed at 0.2. OWN distinct footage under public/slide/ (49
// stills), NO reuse — ledger-checked.
// FOOTAGE is strictly BRAND-FREE and FACE-FREE — NO Bitcoin / crypto logo or the "B" glyph, NO physical crypto coin, NO
// exchange logo (Coinbase / Binance), NO MSCI / Strategy / Federal Reserve logo or seal, NO identifiable real face (all
// human figures are silhouettes / backs / hands), NO readable ticker / price / percentage / chart axis / screen / document
// text in any language, NO national flag, NO identifiable landmark, NO identifiable currency. Metaphor-led bearish-market
// b-roll only: abstract RED falling candlesticks / lines / bars for the selloff and the charts, a glowing question mark for
// the question and the close, storm clouds / a cliff / shattering glass for the downturn and crash, draining water / an
// empty vault / a funnel for the outflows and withdrawals, a rising balloon / thermometer for inflation, a generic
// neoclassical facade for the Fed, chains / a tightening screw / a pressure gauge for tighter policy, dice / a roulette for
// speculation, a chessboard for Strategy, a sunrise / green uptick for the possible recovery, a blank-screen phone for the
// FOLLOW CTA, a red warning light for the red beat.
// **UNVERIFIED AND MARKET-SENSITIVE — cites specific, checkable claims: a ~$64,866 Monday price and a sub-$65,000 level, a
// three-month low, ~$1.07B in U.S. spot-Bitcoin-ETF outflows for the week ending Nov 13 (per SoSoValue) and a third
// straight week of withdrawals, a stronger U.S. inflation print raising December Fed-hike odds, and MSCI's planned removal
// of Bitcoin-treasury firms (including Strategy) from its indexes at end-November. Rendered VERBATIM as supplied, with the
// script's hedges ("could", "generally") preserved. Every figure, date, the SoSoValue/MSCI attributions and the Fed
// expectation MUST be fact-checked against primary sources (SoSoValue, MSCI, exchange/market data, reputable reporting)
// before publishing. Crypto prices move fast — treat as time-sensitive. This is general market information, NOT investment
// advice; the closing line is the client's engagement prompt.**
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 125, kind: 'hook', reveal: [3, 40], text: 'Bitcoin is struggling|to break back above $65,000,', kicker: 'The crypto slide', highlights: ['$65,000,'], size: 48, media: {src: 'slide/sl00_struggling.jpg', type: 'img', effect: 'in'}},
  // 1
  {dur: 40, kind: 'text', reveal: [2], text: 'and the latest selloff', highlights: ['selloff'], size: 50, pos: 'upperRight', media: {src: 'slide/sl01_selloff.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 71, kind: 'text', reveal: [2], text: 'is raising a serious question:', highlights: ['question:'], size: 46, pos: 'left', media: {src: 'slide/sl02_question.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 134, kind: 'text', reveal: [2, 28], text: 'is the crypto market heading|into another major downturn?', highlights: ['major'], size: 44, pos: 'lowerRight', media: {src: 'slide/sl03_downturn.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 32, kind: 'text', reveal: [2], text: 'The surprising part is', highlights: ['surprising'], size: 50, pos: 'upperLeft', media: {src: 'slide/sl04_surprising.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 99, kind: 'text', reveal: [2, 28], text: 'that even as Bitcoin|attempts a small recovery,', highlights: ['recovery,'], size: 44, pos: 'right', media: {src: 'slide/sl05_recovery.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 94, kind: 'text', reveal: [2, 28], text: 'institutional investors are|continuing to pull', highlights: ['institutional'], size: 44, pos: 'lower', media: {src: 'slide/sl06_institutional.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 74, kind: 'text', reveal: [2, 28], text: 'billions of dollars|out of the market.', highlights: ['billions'], size: 44, pos: 'lowerLeft', media: {src: 'slide/sl07_billions.jpg', type: 'img', effect: 'in'}},
  // 8 FOLLOW
  {dur: 111, kind: 'text', reveal: [2], text: 'Follow for more cryptocurrency|and financial market news.', highlights: ['follow'], size: 44, pos: 'upperRight', media: {src: 'slide/sl08_follow.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 43, kind: 'text', reveal: [2], text: 'On Monday, November 16,', highlights: ['November'], size: 50, pos: 'left', media: {src: 'slide/sl09_monday.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 40, kind: 'text', reveal: [2], text: 'Bitcoin traded around', highlights: ['traded'], size: 52, pos: 'right', media: {src: 'slide/sl10_traded.jpg', type: 'img', effect: 'in'}},
  // 11 CARD
  {dur: 83, kind: 'stat', stat: {prefix: '$', value: 64866, post: 'MONDAY'}, media: {src: 'slide/sl11_card64866.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 86, kind: 'text', reveal: [2, 28], text: 'close to its lowest levels|in three months.', highlights: ['lowest'], size: 44, pos: 'upperLeft', media: {src: 'slide/sl12_lowest.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 63, kind: 'text', reveal: [2, 28], text: 'The cryptocurrency|has been under pressure', highlights: ['pressure'], size: 44, pos: 'lowerRight', media: {src: 'slide/sl13_pressure.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 51, kind: 'text', reveal: [2], text: 'after weeks of losses', highlights: ['losses'], size: 50, pos: 'upper', media: {src: 'slide/sl14_losses.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 84, kind: 'text', reveal: [2, 28], text: 'across the broader|digital asset market.', highlights: ['digital'], size: 44, pos: 'left', media: {src: 'slide/sl15_digital.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 115, kind: 'text', reveal: [2, 28], text: 'One major warning sign|is Bitcoin ETFs.', highlights: ['warning'], size: 44, pos: 'right', media: {src: 'slide/sl16_warning.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 48, kind: 'text', reveal: [2], text: 'According to SoSoValue,', highlights: ['SoSoValue,'], size: 52, pos: 'lowerLeft', media: {src: 'slide/sl17_sosovalue.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 59, kind: 'text', reveal: [2], text: 'U.S. spot Bitcoin funds', highlights: ['spot'], size: 50, pos: 'upperRight', media: {src: 'slide/sl18_spot.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 43, kind: 'text', reveal: [2], text: 'recorded approximately', highlights: ['approximately'], size: 52, pos: 'left', media: {src: 'slide/sl19_recorded.jpg', type: 'img', effect: 'in'}},
  // 20 CARD
  {dur: 59, kind: 'stat', stat: {prefix: '$', value: 1.07, decimals: 2, suffix: 'B', post: 'IN OUTFLOWS'}, media: {src: 'slide/sl20_card107.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 96, kind: 'text', reveal: [2, 28], text: 'in outflows during the week|ending November 13.', highlights: ['outflows'], size: 44, pos: 'lowerRight', media: {src: 'slide/sl21_outflows.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 75, kind: 'text', reveal: [2, 28], text: 'That marked their|third consecutive week', highlights: ['third'], size: 44, pos: 'upperLeft', media: {src: 'slide/sl22_third.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 29, kind: 'text', reveal: [2], text: 'of withdrawals.', highlights: ['withdrawals.'], size: 52, pos: 'right', media: {src: 'slide/sl23_withdrawals.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 104, kind: 'text', reveal: [2, 28], text: 'But ETF selling|isn’t the only problem.', highlights: ['problem.'], size: 44, pos: 'lower', media: {src: 'slide/sl24_problem.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 31, kind: 'text', reveal: [2, 28], text: 'Stronger-than-expected|U.S. inflation', highlights: ['inflation'], size: 52, pos: 'upperRight', media: {src: 'slide/sl25_inflation.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 65, kind: 'text', reveal: [2], text: 'has increased expectations', highlights: ['expectations'], size: 52, pos: 'lowerLeft', media: {src: 'slide/sl26_expectations.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 34, kind: 'text', reveal: [2], text: 'that the Federal Reserve', highlights: ['Federal'], size: 50, pos: 'left', media: {src: 'slide/sl27_fed.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 77, kind: 'text', reveal: [2, 28], text: 'could raise interest rates|in December.', highlights: ['rates'], size: 44, pos: 'right', media: {src: 'slide/sl28_rates.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 47, kind: 'text', reveal: [2], text: 'Higher borrowing costs', highlights: ['borrowing'], size: 52, pos: 'lowerRight', media: {src: 'slide/sl29_borrowing.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 62, kind: 'text', reveal: [2, 28], text: 'generally make|speculative investments', highlights: ['speculative'], size: 50, pos: 'upperLeft', media: {src: 'slide/sl30_speculative.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 61, kind: 'text', reveal: [2], text: 'like Bitcoin less attractive.', highlights: ['attractive.'], size: 50, pos: 'right', media: {src: 'slide/sl31_attractive.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 36, kind: 'text', reveal: [2], text: 'There’s also pressure', highlights: ['pressure'], size: 52, pos: 'upperRight', media: {src: 'slide/sl32_alsopressure.jpg', type: 'img', effect: 'in'}},
  // 33
  {dur: 53, kind: 'text', reveal: [2], text: 'from MSCI’s decision', highlights: ['decision'], size: 52, pos: 'left', media: {src: 'slide/sl33_msci.jpg', type: 'img', effect: 'in'}},
  // 34
  {dur: 78, kind: 'text', reveal: [2, 28], text: 'to remove Bitcoin|treasury companies,', highlights: ['treasury'], size: 48, pos: 'lowerLeft', media: {src: 'slide/sl34_treasury.jpg', type: 'img', effect: 'in'}},
  // 35
  {dur: 48, kind: 'text', reveal: [2], text: 'including Strategy,', highlights: ['Strategy,'], size: 52, pos: 'upper', media: {src: 'slide/sl35_strategy.jpg', type: 'img', effect: 'in'}},
  // 36
  {dur: 77, kind: 'text', reveal: [2, 28], text: 'from its indexes|at the end of November.', highlights: ['indexes'], size: 44, pos: 'right', media: {src: 'slide/sl36_indexes.jpg', type: 'img', effect: 'in'}},
  // 37
  {dur: 40, kind: 'text', reveal: [2], text: 'That could make it harder', highlights: ['harder'], size: 46, pos: 'lowerRight', media: {src: 'slide/sl37_harder.jpg', type: 'img', effect: 'in'}},
  // 38
  {dur: 92, kind: 'text', reveal: [2, 28], text: 'for these companies to attract|institutional capital.', highlights: ['capital.'], size: 44, pos: 'upperLeft', media: {src: 'slide/sl38_capital.jpg', type: 'img', effect: 'in'}},
  // 39
  {dur: 42, kind: 'text', reveal: [2], text: 'And here’s the big debate:', highlights: ['debate:'], size: 46, pos: 'left', media: {src: 'slide/sl39_debate.jpg', type: 'img', effect: 'in'}},
  // 40
  {dur: 103, kind: 'text', reveal: [2, 28], text: 'some investors see this|as a temporary correction,', highlights: ['temporary'], size: 44, pos: 'lowerRight', media: {src: 'slide/sl40_temporary.jpg', type: 'img', effect: 'in'}},
  // 41
  {dur: 61, kind: 'text', reveal: [2, 28], text: 'while others believe|the combination', highlights: ['combination'], size: 48, pos: 'upperRight', media: {src: 'slide/sl41_others.jpg', type: 'img', effect: 'in'}},
  // 42
  {dur: 43, kind: 'text', reveal: [2], text: 'of ETF withdrawals,', highlights: ['withdrawals,'], size: 52, pos: 'right', media: {src: 'slide/sl42_etfwithdrawals.jpg', type: 'img', effect: 'in'}},
  // 43
  {dur: 45, kind: 'text', reveal: [2], text: 'tighter monetary policy,', highlights: ['monetary'], size: 52, pos: 'lowerLeft', media: {src: 'slide/sl43_monetary.jpg', type: 'img', effect: 'in'}},
  // 44
  {dur: 47, kind: 'text', reveal: [2], text: 'and weaker market confidence', highlights: ['confidence'], size: 50, pos: 'left', media: {src: 'slide/sl44_confidence.jpg', type: 'img', effect: 'in'}},
  // 45 RED
  {dur: 64, kind: 'impact', redBg: true, text: 'Even|lower.'},
  // 46
  {dur: 89, kind: 'text', reveal: [2, 28], text: 'Is Bitcoin getting ready|for another recovery,', highlights: ['recovery,'], size: 44, pos: 'upperRight', media: {src: 'slide/sl46_recovery2.jpg', type: 'img', effect: 'in'}},
  // 47
  {dur: 110, kind: 'text', reveal: [2, 28], text: 'or could $65,000 become|the level', highlights: ['$65,000'], size: 44, pos: 'lower', media: {src: 'slide/sl47_level.jpg', type: 'img', effect: 'in'}},
  // 48
  {dur: 89, kind: 'text', reveal: [2, 28], text: 'that marks the beginning|of a deeper crypto crash?', highlights: ['deeper'], size: 44, pos: 'right', media: {src: 'slide/sl48_crash.jpg', type: 'img', effect: 'in'}},
  // 49 CTA
  {dur: 38, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'What do you think?', highlights: ['you'], size: 52, media: {src: 'slide/sl49_think.jpg', type: 'img', effect: 'in'}},
];


type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 863, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1495, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 3000, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 3352, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The crypto slide</span>
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
export const SlideReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('slide/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('slide/music.mp3')}
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
