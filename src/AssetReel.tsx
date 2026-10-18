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
};

// ---------------------------------------------------------------------------
// "The assets" reel (AssetReel) — fast NEWS reel, Hard Ledger house format.
// TOPIC: the age wealth gap — why the oldest Americans got ~38% richer in three years while the youngest
// lost ~23%, in the same economy.
// Thesis: the Federal Reserve's Survey of Consumer Finances shows median net worth for households headed
// by someone 75+ up ~38% since 2022 (after inflation), while under-35s fell ~23%; the whole country's
// median rose only ~2% and every other age band moved <6% either way — the gap is entirely at the two
// ends. The oldest household now holds ~15x the wealth of the youngest, up from ~9x three years ago. It
// isn't income, it's WHAT YOU OWN: older households hold homes and portfolios (both rose); younger
// households are less likely to own a home (~35%) and a bigger share of what they own is a car (which
// fell). Same economy, opposite results, because the assets moved in opposite directions. The oldest
// group didn't do anything different — the things they already owned appreciated. The youngest had the
// biggest jump on record during the pandemic (stimulus + paused loans) and then it reversed; add the
// worst graduate job market on record and housing at its least affordable in ~40 years and the ladder's
// first rung is gone. Mechanic/payoff: the economy didn't pay PEOPLE for three years, it paid ASSETS — own
// the house and the shares and you got paid for sitting still; if your biggest asset had wheels, you got
// charged. The wealth gap isn't old vs young, it's whoever got in before the price went up vs everyone
// else. Full QUESTION/STORY/ANSWER/CTA with a ~1.1s post-hook pause; close is the CTA as the house
// rhetorical question ("What's your biggest asset: the car or the house?"). 40 beats: 37 media (incl. 4
// cards: 75+ +38% / UNDER 35 −23% / SINCE 2022 REAL; ALL FAMILIES +2% / OLDEST ÷ YOUNGEST 9× → 15×;
// HOUSES ↑ STOCKS ↑ CARS ↓; PANDEMIC +140% / THEN −23% / HOUSING 40-YR LOW) / 1 red impact ("It paid
// assets.") mid-tail / 2 black. Captions match the VO verbatim (except the stylized number cards; spoken
// figures rendered as numerals). Durations / reveals / SFX locked to the VO via a scribe_v1 word-timestamp
// anchor pass (public/asset/voiceover.mp3, ~109s incl. the pause).
// NB: OWN distinct footage under public/asset/, NO reuse of any other reel's clips.
// FOOTAGE is BRAND-FREE and FACE-FREE — generic finance / housing / generational b-roll: suburban homes,
// rooftops, for-sale / sold signs, apartment blocks, keys & deeds, stock tickers / charts, gold, coins,
// ladders, cars in driveways / used lots, odometers, receipts, calendars, government-style columns,
// retirement porches, empty armchairs. NO company/bank logos, NO readable signage, NO identifiable faces,
// NO foreign text, NO national flags, NO banknote portraits / foreign currency.
// **UNVERIFIED — asserts specific, checkable figures from the Fed Survey of Consumer Finances; render as
// written but FACT-CHECK before publishing:** the ~+38% (75+) / ~−23% (under-35) 2022→2025 real changes;
// the ~+2% national median and "<6% for every other age band"; the ~9× → ~15× oldest/youngest ratio; the
// ~35% under-35 homeownership; "houses & stocks up, cars down"; the pandemic ~+140% then ~−23% swing; and
// "housing least affordable in ~40 years / worst graduate job market on record." The "it paid assets, not
// people / got in before the price went up" framing is editorial analysis.
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK (held through ~1.1s post-hook pause)
  {dur: 278, kind: 'hook', reveal: [3, 68, 135, 205], text: 'How do the oldest Americans|get 38% richer in three years|while the youngest lose 23%,|in the same economy?', kicker: 'The assets', highlights: ['38%', '23%'], size: 30, media: {src: 'asset/as00_rooftops.mp4', type: 'video', effect: 'in'}},
  // 1
  {dur: 89, kind: 'text', reveal: [2, 46], text: 'The Federal Reserve’s Survey|of Consumer Finances,', highlights: [], size: 36, media: {src: 'asset/as01_columns.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 56, kind: 'text', reveal: [2, 28], text: 'the gold standard|for household wealth,', highlights: ['gold'], size: 40, media: {src: 'asset/as02_goldbars.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 29, kind: 'text', reveal: [2], text: 'is out this month.', highlights: [], size: 44, media: {src: 'asset/as03_report.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 101, kind: 'text', reveal: [2, 52], text: 'Households headed by someone|75 or older:', highlights: ['75'], size: 36, media: {src: 'asset/as04_retirementporch.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 109, kind: 'text', reveal: [2, 56], text: 'median net worth up 38%|since 2022,', highlights: ['38%'], size: 38, media: {src: 'asset/as05_upchart.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 32, kind: 'text', reveal: [2], text: 'after inflation.', highlights: [], size: 48, media: {src: 'asset/as06_receipt.jpg', type: 'img', effect: 'in'}},
  // 7 CARD 1
  {dur: 67, kind: 'lines', reveal: [0, 24, 46], text: '75+: +38%|UNDER 35: −23%|SINCE 2022, REAL', highlights: ['−23%'], media: {src: 'asset/as07_tickerboard.jpg', type: 'img', effect: 'in'}},
  // 8 BLACK
  {dur: 76, kind: 'text', reveal: [0, 0], text: 'But there’s one thing|most people overlook.', highlights: ['overlook.'], size: 46},
  // 9
  {dur: 99, kind: 'text', reveal: [2, 50], text: 'The whole country’s median|only rose 2%.', highlights: ['2%'], size: 38, media: {src: 'asset/as09_flatline.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 125, kind: 'text', reveal: [2, 64], text: 'Every other age group moved|less than 6% either way.', highlights: ['6%'], size: 34, media: {src: 'asset/as10_barchart.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 77, kind: 'text', reveal: [2, 40], text: 'The gap is entirely|at the two ends.', highlights: ['gap'], size: 42, media: {src: 'asset/as11_canyon.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 134, kind: 'text', reveal: [2, 50, 96], text: 'The oldest household now has|15 times the wealth|of the youngest.', highlights: ['15'], size: 38, media: {src: 'asset/as12_mansion.jpg', type: 'img', effect: 'in'}},
  // 13 CARD 2
  {dur: 61, kind: 'lines', reveal: [0, 24, 46], text: 'ALL FAMILIES: +2%|OLDEST ÷ YOUNGEST|9× → 15×', highlights: ['15×'], media: {src: 'asset/as13_scale.jpg', type: 'img', effect: 'in'}},
  // 14 BLACK
  {dur: 83, kind: 'text', reveal: [0, 0], text: 'And this is where|things get interesting.', highlights: ['interesting.'], size: 46},
  // 15
  {dur: 34, kind: 'text', reveal: [2], text: 'It isn’t income.', highlights: ['income.'], size: 48, media: {src: 'asset/as15_paystub.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 26, kind: 'text', reveal: [2], text: 'It’s what you own.', highlights: ['own.'], size: 48, media: {src: 'asset/as16_keysdeed.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 77, kind: 'text', reveal: [2, 40], text: 'Older households hold|homes and portfolios.', highlights: [], size: 40, media: {src: 'asset/as17_suburbhome.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 26, kind: 'text', reveal: [2], text: 'Both went up.', highlights: ['up.'], size: 54, media: {src: 'asset/as18_risingarrow.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 72, kind: 'text', reveal: [2, 38], text: 'Younger households are|less likely to own a home,', highlights: [], size: 36, media: {src: 'asset/as19_apartments.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 59, kind: 'text', reveal: [2], text: 'down to 35%,', highlights: ['35%'], size: 50, media: {src: 'asset/as20_forrent.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 99, kind: 'text', reveal: [2, 52], text: 'and a bigger share of what they own|is sitting in the driveway.', highlights: ['driveway.'], size: 32, media: {src: 'asset/as21_driveway.mp4', type: 'video', effect: 'in'}},
  // 22
  {dur: 40, kind: 'text', reveal: [2], text: 'Cars went down.', highlights: ['down.'], size: 50, media: {src: 'asset/as22_usedlot.jpg', type: 'img', effect: 'in'}},
  // 23 CARD 3
  {dur: 46, kind: 'lines', reveal: [0, 16, 32], text: 'HOUSES ↑|STOCKS ↑|CARS ↓', highlights: ['↓'], media: {src: 'asset/as23_arrows.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 79, kind: 'text', reveal: [2, 42], text: 'because the assets moved|in opposite directions.', highlights: ['opposite'], size: 36, media: {src: 'asset/as24_seesaw.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 77, kind: 'text', reveal: [2, 40], text: 'Now let me show|how to actually do this.', highlights: ['actually'], size: 42, media: {src: 'asset/as25_notebook.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 68, kind: 'text', reveal: [2, 36], text: 'The oldest group didn’t do|anything different.', highlights: ['different.'], size: 38, media: {src: 'asset/as26_armchair.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 137, kind: 'text', reveal: [2, 50, 96], text: 'Their wealth grew because|the things they already owned|appreciated.', highlights: ['appreciated.'], size: 36, media: {src: 'asset/as27_housevalue.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 100, kind: 'text', reveal: [2, 38, 70], text: 'The youngest group had the|biggest jump on record|during the pandemic,', highlights: ['biggest'], size: 34, media: {src: 'asset/as28_tradingscreen.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 92, kind: 'text', reveal: [2, 48], text: 'stimulus and paused loans,|and then it reversed.', highlights: ['reversed.'], size: 36, media: {src: 'asset/as29_fallingchart.jpg', type: 'img', effect: 'in'}},
  // 30 CARD 4
  {dur: 97, kind: 'lines', reveal: [0, 24, 46], text: 'PANDEMIC: +140%|THEN: −23%|HOUSING: 40-YR LOW', highlights: ['−23%'], media: {src: 'asset/as30_volatile.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 116, kind: 'text', reveal: [2, 60], text: 'housing at its least affordable|in 40 years,', highlights: ['40'], size: 34, media: {src: 'asset/as31_forsalerow.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 55, kind: 'text', reveal: [2, 28], text: 'and the ladder’s first rung|is gone.', highlights: ['gone.'], size: 40, media: {src: 'asset/as32_ladder.jpg', type: 'img', effect: 'in'}},
  // 33
  {dur: 71, kind: 'text', reveal: [2, 38], text: 'The economy didn’t pay people|for three years.', highlights: [], size: 36, media: {src: 'asset/as33_emptywallet.jpg', type: 'img', effect: 'in'}},
  // 34 RED impact (thesis)
  {dur: 34, kind: 'impact', text: 'It paid|assets.', redBg: true},
  // 35
  {dur: 110, kind: 'text', reveal: [2, 50, 92], text: 'If you owned the house|and the shares, you got paid|for sitting still.', highlights: ['paid'], size: 34, media: {src: 'asset/as35_houseandshares.jpg', type: 'img', effect: 'in'}},
  // 36
  {dur: 91, kind: 'text', reveal: [2, 48], text: 'If your biggest asset had wheels,|you got charged.', highlights: ['charged.'], size: 34, media: {src: 'asset/as36_carbill.jpg', type: 'img', effect: 'in'}},
  // 37
  {dur: 64, kind: 'text', reveal: [2, 32], text: 'The wealth gap isn’t|old versus young.', highlights: [], size: 40, media: {src: 'asset/as37_twohouses.jpg', type: 'img', effect: 'in'}},
  // 38
  {dur: 98, kind: 'text', reveal: [2, 42, 78], text: 'It’s whoever got in|before the price went up,|versus everyone else.', highlights: ['before'], size: 32, media: {src: 'asset/as38_soldsign.jpg', type: 'img', effect: 'in'}},
  // 39 CTA (question close)
  {dur: 72, kind: 'text', reveal: [2, 40], enter: 'zoom', text: 'What’s your biggest asset:|the car or the house?', highlights: ['house?'], size: 38, media: {src: 'asset/as39_duskhome.mp4', type: 'video', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 278, src: 'media/sfx_whoosh.mp3', vol: 0.35}, // hook -> survey
  {at: 695, src: 'media/sfx_impact.mp3', vol: 0.46}, // CARD 1
  {at: 762, src: 'media/sfx_whoosh.mp3', vol: 0.35}, // into black
  {at: 1274, src: 'media/sfx_impact.mp3', vol: 0.46}, // CARD 2
  {at: 1334, src: 'media/sfx_whoosh.mp3', vol: 0.35}, // into black
  {at: 1850, src: 'media/sfx_impact.mp3', vol: 0.46}, // CARD 3
  {at: 2451, src: 'media/sfx_impact.mp3', vol: 0.46}, // CARD 4
  {at: 2791, src: 'media/sfx_impact.mp3', vol: 0.55}, // red thesis (it paid assets)
  {at: 2824, src: 'media/sfx_chaching.mp3', vol: 0.4}, // "you got paid for sitting still"
  {at: 3188, src: 'media/sfx_whoosh.mp3', vol: 0.4}, // close
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
const Caption: React.FC<{text: string; highlights?: string[]; size?: number; align?: 'center' | 'flex-start'; typewriter?: boolean; lineSync?: boolean; lineReveal?: number[]}> = ({text, highlights = [], size = 112, align = 'center', typewriter = false, lineSync = false, lineReveal}) => {
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
        <div key={li} style={{display: 'flex', flexWrap: 'wrap', justifyContent: align === 'center' ? 'center' : 'flex-start', gap: '0 18px', opacity: lineOp[li]}}>
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

const SceneText: React.FC<{text: string; highlights?: string[]; size?: number; reveal?: number[]}> = ({text, highlights, size = 100, reveal}) => (
  <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', padding: 84}}>
    <Caption text={text} highlights={highlights} size={size} typewriter={false} lineSync lineReveal={reveal} />
  </AbsoluteFill>
);

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
          {stat.suffix ? <span style={{fontFamily: HEAD, fontSize: 120, color: C.red, lineHeight: 1}}>{stat.suffix}</span> : null}
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The assets</span>
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
      return <SceneText text={s.text!} highlights={s.highlights} size={s.size} reveal={s.reveal} />;
    case 'stat':
      return <SceneStat stat={s.stat!} />;
    case 'impact':
      return <SceneImpact text={s.text!} redBg={s.redBg} />;
    default:
      return null;
  }
};

// ---------------------------------------------------------------------------
export const AssetReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('asset/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('asset/music.mp3')}
        volume={(f) => interpolate(f, [0, 20, DURATION_IN_FRAMES - 55, DURATION_IN_FRAMES], [0, 0.17, 0.17, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}
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
