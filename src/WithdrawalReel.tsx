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
// "The withdrawal" reel (WithdrawalReel) — fast NEWS reel, Hard Ledger house format.
// TOPIC: Tesla Q3 2026 — flat revenue but profit down 43% and R&D up 69%; the car business is funding a bet on
// robots, robotaxis and AI. "The cars are the bank. Everything else is the withdrawal."
// Thesis: if you hold Tesla you don't own a car company any more — you own a bet on robots/robotaxis paid for
// by the cars. Revenue $28.05B (flat), net profit $787M (down 43%), R&D $2.76B (up 69%); operating income was
// just $718M, so R&D was ~4x operating profit in one quarter. Deliveries 486,532 (down 2%) — cars flat,
// spending vertical. Capex guided over $25B this year ($13B nine months in): robotaxi fleet, Optimus, AI
// compute, a chip fab, solar; the CFO says capex keeps rising for years. The twist: a flat-sales company would
// normally cut back; Tesla does the opposite because the cars still make money — auto margin climbed to 18.1%
// (best in over a year). Open questions: does FSD carry it (subs 1.74M, up 67%)? does the SpaceX merger come
// back? Outcome: flat revenue, profit -43%, R&D +69%, $45B cash, stock -3%. Binary close ("Is this a car
// company funding its next act, or funding someone else's? Pick a side below."). 10-part structure, NO
// post-hook pause, mid-reel like+follow ask.
// Card figures: $28.05B / $787M / 43% / $2.76B / 69% / $718M / 486,532 / $25B / $13B / 18.1% / 1.74M. Captions
// match the VO verbatim (except the number cards; spoken figures as numerals). Durations/reveals/SFX locked to
// the VO via a scribe_v1 word-timestamp anchor pass (public/withdrawal/voiceover.mp3, NO inserted pause); music
// mixed at 0.17. 47 beats; built at +21% VO pace (the house +10% default plus a further +10% per client
// request on this reel) — ~125s. OWN distinct footage under
// public/withdrawal/, NO reuse of any other reel's clips — ledger-checked. New standalone reel, distinct
// quarter/thesis from the existing TeslaReel ("The bar", an earlier quarter where the stock ROSE on a beat).
// FOOTAGE is BRAND-FREE, FACE-FREE and LANDMARK-FREE despite naming Tesla / Elon Musk / SpaceX / Optimus / FSD /
// robotaxi: generic cars-without-badges, charging, robot ARMS (never a humanoid robot), lab/R&D, server racks,
// money, charts b-roll. **NO Tesla logo or vehicle (Model 3/Y/S/X/Cybertruck) or identifiable car badge; NO
// Elon Musk or any identifiable face; NO SpaceX rocket/logo; NO Optimus/humanoid robot; NO FSD/Autopilot UI; NO
// company/bank logo or wordmark; NO stock TICKER or readable "TSLA"/price; NO exchange signage; NO flags; NO
// identifiable landmarks; NO readable foreign text; NO banknote/coin portraits or identifiable currency; NO
// military.** (Card text naming "TESLA"/"R&D"/"FSD" is editorial overlay, not footage.)
// **UNVERIFIED / SENSITIVE — names a real company and its CEO; rendered as written but MUST be fact-checked
// before publishing.** Core numbers CHECK OUT (Oct 2026): revenue $28.05B flat, net profit $787M (EPS $0.22,
// ~-43%), operating income $718M, R&D $2.76B (+69%), deliveries 486,532 (-2%), FSD subs +67% (Electrek, 10-Q,
// SEC 8-K). Still verify: the >$25B capex guide / $13B nine-month, the 18.1% auto margin, the $45B cash, the
// -3% stock move, and the two quotes (the CFO "capex keeps rising", Musk on the SpaceX merger). "The cars are
// the bank / everything else is the withdrawal" framing is editorial analysis.
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 179, kind: 'hook', reveal: [3, 40], text: 'Tesla just posted the same revenue as last year,|and 43% less profit.', kicker: 'The withdrawal', highlights: [], size: 28, media: {src: 'withdrawal/wd00_flat.mp4', type: 'video', effect: 'in'}},
  // 1
  {dur: 68, kind: 'text', reveal: [2, 28], text: 'And the company says|that’s the plan.', highlights: ['plan.'], size: 42, media: {src: 'withdrawal/wd01_plan.jpg', type: 'img', effect: 'panL'}},
  // 2
  {dur: 98, kind: 'text', reveal: [2, 40], text: 'If you hold Tesla stock, you don’t|own a car company any more.', highlights: [], size: 30, media: {src: 'withdrawal/wd02_charging.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 80, kind: 'text', reveal: [2, 28], text: 'You own a bet on|robots and robotaxis,', highlights: ['bet'], size: 36, media: {src: 'withdrawal/wd03_robot.jpg', type: 'img', effect: 'panR'}},
  // 4
  {dur: 58, kind: 'text', reveal: [2, 28], text: 'paid for by|the car company.', highlights: [], size: 40, media: {src: 'withdrawal/wd04_pay.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 24, kind: 'text', reveal: [2], enter: 'slideUp', text: 'Look at the receipts.', highlights: ['receipts.'], size: 48, media: {src: 'withdrawal/wd05_receipts.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 95, kind: 'text', reveal: [2, 28], text: 'I’ll show you exactly|where the money went.', highlights: [], size: 36, media: {src: 'withdrawal/wd06_money.jpg', type: 'img', effect: 'panL'}},
  // 7
  {dur: 86, kind: 'text', reveal: [2, 40], text: 'If that’s worth a follow,|you know where the button is.', highlights: ['follow,'], size: 32, media: {src: 'withdrawal/wd07_phone.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 77, kind: 'text', reveal: [2, 28], text: 'Now, Tesla spending big|is nothing new.', highlights: [], size: 34, media: {src: 'withdrawal/wd08_spend.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 44, kind: 'text', reveal: [2, 28], enter: 'slideL', text: 'But this quarter|is different.', highlights: ['different.'], size: 48, media: {src: 'withdrawal/wd09_standout.jpg', type: 'img', effect: 'in'}},
  // 10 CARD $28.05B
  {dur: 131, kind: 'stat', stat: {pre: 'REVENUE', prefix: '$', value: 28.05, decimals: 2, suffix: 'B', post: 'FLAT'}, media: {src: 'withdrawal/wd10_revenue.jpg', type: 'img', effect: 'in'}},
  // 11 CARD $787M
  {dur: 137, kind: 'stat', stat: {pre: 'NET PROFIT', prefix: '$', value: 787, suffix: 'M'}, media: {src: 'withdrawal/wd11_profit.jpg', type: 'img', effect: 'in'}},
  // 12 CARD 43%
  {dur: 39, kind: 'stat', stat: {pre: 'DOWN', value: 43, suffix: '%'}, media: {src: 'withdrawal/wd12_down.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 51, kind: 'text', reveal: [2, 40], text: 'And because research|spending alone was', highlights: [], size: 34, media: {src: 'withdrawal/wd13_lab.jpg', type: 'img', effect: 'panR'}},
  // 14 CARD $2.76B
  {dur: 64, kind: 'stat', stat: {pre: 'R&D', prefix: '$', value: 2.76, decimals: 2, suffix: 'B'}, media: {src: 'withdrawal/wd14_rd.jpg', type: 'img', effect: 'in'}},
  // 15 CARD 69%
  {dur: 50, kind: 'stat', stat: {pre: 'UP', value: 69, suffix: '%'}, media: {src: 'withdrawal/wd15_up.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 61, kind: 'text', reveal: [2, 28], enter: 'slideUp', text: 'Look at those two numbers|next to each other.', highlights: [], size: 34, media: {src: 'withdrawal/wd16_compare.jpg', type: 'img', effect: 'in'}},
  // 17 CARD $718M
  {dur: 146, kind: 'stat', stat: {pre: 'OPERATING INCOME', prefix: '$', value: 718, suffix: 'M'}, media: {src: 'withdrawal/wd17_opinc.jpg', type: 'img', effect: 'in'}},
  // 18 CARD $2.76B
  {dur: 66, kind: 'stat', stat: {pre: 'R&D', prefix: '$', value: 2.76, decimals: 2, suffix: 'B'}, media: {src: 'withdrawal/wd18_rd2.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 115, kind: 'text', reveal: [2, 40], text: 'Tesla spent nearly four times|its operating profit on research.', highlights: ['four times'], size: 30, media: {src: 'withdrawal/wd19_fourx.jpg', type: 'img', effect: 'in'}},
  // 20 BLACK
  {dur: 24, kind: 'impact', text: 'In one|quarter.'},
  // 21 CARD 486532
  {dur: 125, kind: 'stat', stat: {pre: 'DELIVERIES', value: 486532, post: 'DOWN 2%'}, media: {src: 'withdrawal/wd21_deliveries.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 60, kind: 'text', reveal: [2, 28], text: 'Down 2%.|Cars flat.', highlights: ['flat.'], size: 44, media: {src: 'withdrawal/wd22_flatcars.jpg', type: 'img', effect: 'panL'}},
  // 23
  {dur: 34, kind: 'text', reveal: [2], text: 'Spending vertical.', highlights: ['vertical.'], size: 48, media: {src: 'withdrawal/wd23_vertical.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 52, kind: 'text', reveal: [2, 28], text: 'And the problem|doesn’t stop there.', highlights: ['problem'], size: 44, media: {src: 'withdrawal/wd24_warning.jpg', type: 'img', effect: 'panR'}},
  // 25 CARD $25B
  {dur: 136, kind: 'stat', stat: {pre: 'CAPEX GUIDED OVER', prefix: '$', value: 25, suffix: 'B'}, media: {src: 'withdrawal/wd25_capex.jpg', type: 'img', effect: 'in'}},
  // 26 CARD $13B
  {dur: 91, kind: 'stat', stat: {pre: 'NINE MONTHS IN', prefix: '$', value: 13, suffix: 'B'}, media: {src: 'withdrawal/wd26_ninemo.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 73, kind: 'text', reveal: [2, 28], text: 'Robotaxi fleet,|Optimus production,', highlights: [], size: 36, media: {src: 'withdrawal/wd27_robotaxi.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 110, kind: 'text', reveal: [2, 28], text: 'AI compute, a chip fab, solar.', highlights: [], size: 34, media: {src: 'withdrawal/wd28_aicompute.jpg', type: 'img', effect: 'panL'}},
  // 29
  {dur: 62, kind: 'text', reveal: [2, 40], text: 'The CFO’s words:|capex keeps rising for years.', highlights: ['rising'], size: 32, media: {src: 'withdrawal/wd29_rising.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 95, kind: 'text', reveal: [2, 40], text: 'Normally you’d expect a company|with flat sales to cut back.', highlights: [], size: 30, media: {src: 'withdrawal/wd30_cutback.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 77, kind: 'text', reveal: [2, 28], text: 'Tesla is doing the opposite,|and it can,', highlights: ['opposite,'], size: 36, media: {src: 'withdrawal/wd31_opposite.jpg', type: 'img', effect: 'panR'}},
  // 32
  {dur: 71, kind: 'text', reveal: [2, 28], text: 'because the cars|still make money.', highlights: ['money.'], size: 40, media: {src: 'withdrawal/wd32_carmoney.jpg', type: 'img', effect: 'in'}},
  // 33
  {dur: 53, kind: 'text', reveal: [2, 28], text: 'Automotive margin|climbed to', highlights: [], size: 40, media: {src: 'withdrawal/wd33_gauge.jpg', type: 'img', effect: 'in'}},
  // 34 CARD 18.1%
  {dur: 108, kind: 'stat', stat: {pre: 'AUTO MARGIN', value: 18.1, decimals: 1, suffix: '%', post: 'BEST IN A YEAR'}, media: {src: 'withdrawal/wd34_margin.jpg', type: 'img', effect: 'in'}},
  // 35 BLACK
  {dur: 58, kind: 'impact', text: 'The cars|are the bank.'},
  // 36
  {dur: 52, kind: 'text', reveal: [2, 28], text: 'Everything else|is the withdrawal.', highlights: ['withdrawal.'], size: 42, media: {src: 'withdrawal/wd36_withdrawal.jpg', type: 'img', effect: 'panL'}},
  // 37
  {dur: 37, kind: 'text', reveal: [2], text: 'Does FSD carry it?', highlights: ['carry it?'], size: 46, media: {src: 'withdrawal/wd37_wheel.jpg', type: 'img', effect: 'in'}},
  // 38 CARD 1.74M
  {dur: 140, kind: 'stat', stat: {pre: 'FSD SUBSCRIPTIONS', value: 1.74, decimals: 2, suffix: 'M', post: 'UP 67%'}, media: {src: 'withdrawal/wd38_subs.jpg', type: 'img', effect: 'in'}},
  // 39
  {dur: 69, kind: 'text', reveal: [2, 28], text: 'Does the SpaceX|merger come back?', highlights: [], size: 38, media: {src: 'withdrawal/wd39_merger.jpg', type: 'img', effect: 'panR'}},
  // 40
  {dur: 68, kind: 'text', reveal: [2, 40], text: 'Musk says he’s said|what he needs to say.', highlights: [], size: 34, media: {src: 'withdrawal/wd40_mic.jpg', type: 'img', effect: 'in'}},
  // 41
  {dur: 104, kind: 'text', reveal: [2, 28], text: 'Flat revenue.|Profit down 43%.', highlights: ['43%.'], size: 38, media: {src: 'withdrawal/wd41_recap1.jpg', type: 'img', effect: 'in'}},
  // 42
  {dur: 118, kind: 'text', reveal: [2, 40], text: 'R&D up 69%.|$45 billion in cash.', highlights: ['$45 billion'], size: 34, media: {src: 'withdrawal/wd42_recap2.jpg', type: 'img', effect: 'panL'}},
  // 43
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Stock down 3%|on the day.', highlights: ['down 3%'], size: 42, media: {src: 'withdrawal/wd43_stockdown.jpg', type: 'img', effect: 'in'}},
  // 44
  {dur: 30, kind: 'text', reveal: [2], text: 'So you tell me.', highlights: ['you'], size: 50, media: {src: 'withdrawal/wd44_point.jpg', type: 'img', effect: 'in'}},
  // 45 RED
  {dur: 132, kind: 'impact', redBg: true, text: 'Is this a car company|funding its next act,|or funding someone else’s?'},
  // 46 CTA
  {dur: 38, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Pick a side|below.', highlights: ['side'], size: 48, media: {src: 'withdrawal/wd46_fork.mp4', type: 'video', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 765, src: 'media/sfx_whoosh.mp3', vol: 0.33},
  {at: 809, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 940, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1077, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1167, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1231, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1281, src: 'media/sfx_whoosh.mp3', vol: 0.33},
  {at: 1342, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1488, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1669, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 1693, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1964, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 2100, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 2732, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 2840, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 2987, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 3586, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 3718, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The withdrawal</span>
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
export const WithdrawalReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('withdrawal/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('withdrawal/music.mp3')}
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
