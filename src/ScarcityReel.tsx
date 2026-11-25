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
// "The scarcity" reel (ScarcityReel) — fast NEWS reel, Hard Ledger house format.
// TOPIC: Nvidia CEO Jensen Huang, on CNBC, said the AI slowdown isn't about demand — it's a "scarcity of
// capital," the working capital to pay for the build-out — and tech sold off. The bottleneck is MONEY, not chips.
// Thesis: the man selling every AI chip said the problem isn't demand, it's that nobody can find the cash to pay
// for it. If your pension holds a tech index, that one sentence cost you money. The selloff: Nasdaq 100 ~−1.5%,
// Meta ~−5%, Nvidia ~−4%. Huang's exact words: demand for the "neoclouds" is off the charts, but the working
// capital to fuel that growth is missing — "the demand for capital is much greater than the availability of
// capital." Second-order — who's paying: Meta lifted its capex floor to ~$135B this year and created non-voting
// shares to raise more, while Tesla trimmed AI spend from ~$25B to ~$20B — one borrowing to keep up, one stepping
// back. Twist: the chip supplier is normally last to admit a slowdown; Huang said it out loud and called it
// temporary ("that's going to get solved") — but if the fix is more capital, the fix is more debt, and the
// neoclouds buying his chips have the least of it. Open questions: who lends the neoclouds the money? does Meta's
// new share class sell fast enough? is ~$112 oil the same morning the thing that ends the party? Outcome: Nasdaq
// −1.5%, Meta −5%, Brent past $112, the biggest winner of the AI boom saying the money's running short. Binary
// close ("Is 'scarcity of capital' a speed bump, or the first honest word about how this ends? Pick a side
// below."). 10-part structure, NO post-hook pause, mid-reel like+follow ask.
// Card figures: 1.5% / 5% / 4% / $135B / $25B / $20B / $112. Captions match the VO verbatim (except the number
// cards; spoken figures as numerals). Durations/reveals/SFX locked to the VO via a scribe_v1 word-timestamp
// anchor pass (public/scarcity/voiceover.mp3, NO inserted pause); music mixed at 0.17. 47 beats; built at the
// house +10% pacing default. OWN distinct footage under public/scarcity/, NO reuse of any other reel's clips
// — ledger-checked. New STANDALONE reel; thematically adjacent to ConstraintReel ("The constraint", the Lam
// Research SUPPLY-side version of the same AI-selloff week) but a distinct subject/thesis (capital scarcity).
// Card text naming "META"/"NVIDIA"/"TESLA"/etc. is editorial overlay, not footage.
// FOOTAGE is BRAND-FREE, FACE-FREE and LANDMARK-FREE despite naming Nvidia / Jensen Huang / Meta / Tesla / CNBC:
// generic money/capital, servers/cloud, oil, supply-chain and red-chart b-roll. **NO company logo or wordmark;
// NO Jensen Huang / Elon Musk / Zuckerberg or any identifiable face; NO product/chassis that names a maker; NO
// stock TICKER or readable price; NO exchange (NYSE/NASDAQ) or CNBC signage; NO oil-company logo; NO flags; NO
// identifiable landmarks; NO readable foreign text; NO banknote/coin portraits or identifiable currency; NO
// military.**
// **UNVERIFIED / SENSITIVE — names real companies and a named CEO, quotes him, and asserts same-morning market
// moves; rendered as written but MUST be fact-checked before publishing.** Verify: the Jensen Huang "scarcity of
// capital" / "working capital" / "availability of capital" quotes and the CNBC setting; the per-name moves
// (Nasdaq 100 −1.5%, Meta −5%, Nvidia −4% — vary by source and intraday-vs-close); Meta's ~$135B capex floor and
// its new non-voting share class; Tesla trimming AI spend ~$25B→$20B; and ~$112 Brent "the same morning." The
// "scarcity of capital = more debt" framing is editorial analysis.
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 112, kind: 'hook', reveal: [3, 40], text: 'The man selling every AI chip|just said the problem isn’t demand.', kicker: 'The scarcity', highlights: ['demand.'], size: 30, media: {src: 'scarcity/sc00_selloff.mp4', type: 'video', effect: 'in'}},
  // 1
  {dur: 86, kind: 'text', reveal: [2, 28], text: 'It’s that nobody can find|the cash to pay for it.', highlights: ['cash'], size: 34, media: {src: 'scarcity/sc01_cash.jpg', type: 'img', effect: 'panL'}},
  // 2
  {dur: 86, kind: 'text', reveal: [2, 28], text: 'If your pension holds|a tech index,', highlights: ['pension'], size: 36, media: {src: 'scarcity/sc02_pension.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 86, kind: 'text', reveal: [2, 40], text: 'this is the sentence that cost you|money on Thursday.', highlights: ['money'], size: 30, media: {src: 'scarcity/sc03_thursday.jpg', type: 'img', effect: 'panR'}},
  // 4
  {dur: 75, kind: 'text', reveal: [2, 28], text: 'And it came from the one|person who’d know.', highlights: ['know.'], size: 34, media: {src: 'scarcity/sc04_know.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'I’ll show you what he said|and what it moved.', highlights: ['moved.'], size: 34, media: {src: 'scarcity/sc05_moved.jpg', type: 'img', effect: 'panL'}},
  // 6
  {dur: 83, kind: 'text', reveal: [2, 40], text: 'If that’s worth a follow,|you know where the button is.', highlights: ['follow,'], size: 32, media: {src: 'scarcity/sc06_phone.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 86, kind: 'text', reveal: [2, 28], text: 'Now, a tech sell-off|is nothing new.', highlights: [], size: 36, media: {src: 'scarcity/sc07_wobble.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 40, kind: 'text', reveal: [2, 28], enter: 'slideL', text: 'But this one|is different.', highlights: ['different.'], size: 48, media: {src: 'scarcity/sc08_standout.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 67, kind: 'text', reveal: [2], enter: 'slideUp', text: 'The Nasdaq 100 dropped.', highlights: [], size: 40, media: {src: 'scarcity/sc09_drop.jpg', type: 'img', effect: 'panR'}},
  // 10 CARD 1.5%
  {dur: 45, kind: 'stat', stat: {pre: 'NASDAQ 100', value: 1.5, decimals: 1, suffix: '%', post: 'DOWN'}, media: {src: 'scarcity/sc10_nasdaq.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 29, kind: 'text', reveal: [2, 28], text: 'Meta fell.', highlights: ['fell.'], size: 40, media: {src: 'scarcity/sc11_names.jpg', type: 'img', effect: 'in'}},
  // 12 CARD 5%
  {dur: 28, kind: 'stat', stat: {pre: 'META', value: 5, suffix: '%', post: 'DOWN'}, media: {src: 'scarcity/sc12_meta.jpg', type: 'img', effect: 'in'}},
  // 13 CARD 4%
  {dur: 63, kind: 'stat', stat: {pre: 'NVIDIA', value: 4, suffix: '%', post: 'DOWN'}, media: {src: 'scarcity/sc13_nvidia.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 99, kind: 'text', reveal: [2, 40], text: 'The trigger was Jensen Huang,|on CNBC,', highlights: [], size: 32, media: {src: 'scarcity/sc14_studio.jpg', type: 'img', effect: 'panL'}},
  // 15
  {dur: 89, kind: 'text', reveal: [2, 40], text: 'saying the words:|scarcity of capital.', highlights: ['scarcity'], size: 32, media: {src: 'scarcity/sc15_scarcity.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 85, kind: 'text', reveal: [2, 40], text: 'The demand for the neoclouds|is off the charts.', highlights: ['neoclouds'], size: 30, media: {src: 'scarcity/sc16_demand.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 106, kind: 'text', reveal: [2, 40], text: 'What’s missing in the middle|is the working capital.', highlights: ['working'], size: 30, media: {src: 'scarcity/sc17_working.jpg', type: 'img', effect: 'panR'}},
  // 18
  {dur: 80, kind: 'text', reveal: [2, 40], text: 'The demand for capital|is greater than the supply.', highlights: ['greater'], size: 30, media: {src: 'scarcity/sc18_supply.jpg', type: 'img', effect: 'in'}},
  // 19 BLACK
  {dur: 81, kind: 'impact', text: 'Demand, fine.|Money, missing.'},
  // 20
  {dur: 66, kind: 'text', reveal: [2, 28], enter: 'slideUp', text: 'And the problem|doesn’t stop there.', highlights: ['problem'], size: 44, media: {src: 'scarcity/sc20_warning.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 33, kind: 'text', reveal: [2], text: 'Look at who’s paying.', highlights: [], size: 44, media: {src: 'scarcity/sc21_paying.jpg', type: 'img', effect: 'panL'}},
  // 22
  {dur: 88, kind: 'text', reveal: [2, 28], text: 'Meta just lifted its|spending floor to:', highlights: [], size: 34, media: {src: 'scarcity/sc22_floor.jpg', type: 'img', effect: 'in'}},
  // 23 CARD $135B
  {dur: 52, kind: 'stat', stat: {pre: 'META SPEND FLOOR', prefix: '$', value: 135, suffix: 'B', post: 'THIS YEAR'}, media: {src: 'scarcity/sc23_meta135.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 106, kind: 'text', reveal: [2, 40], text: 'and created non-voting shares|to raise more.', highlights: ['shares'], size: 32, media: {src: 'scarcity/sc24_shares.jpg', type: 'img', effect: 'panR'}},
  // 25
  {dur: 104, kind: 'text', reveal: [2, 28], text: 'Tesla went the other way,|cutting AI spend.', highlights: [], size: 34, media: {src: 'scarcity/sc25_cut.jpg', type: 'img', effect: 'in'}},
  // 26 CARD $25B
  {dur: 40, kind: 'stat', stat: {pre: 'TESLA — FROM', prefix: '$', value: 25, suffix: 'B'}, media: {src: 'scarcity/sc26_from.jpg', type: 'img', effect: 'in'}},
  // 27 CARD $20B
  {dur: 28, kind: 'stat', stat: {pre: 'TO', prefix: '$', value: 20, suffix: 'B'}, media: {src: 'scarcity/sc27_to.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 96, kind: 'text', reveal: [2, 40], text: 'One company borrowing to keep up.|One stepping back.', highlights: ['back.'], size: 30, media: {src: 'scarcity/sc28_diverge.jpg', type: 'img', effect: 'panL'}},
  // 29
  {dur: 103, kind: 'text', reveal: [2, 40], text: 'Normally the chip supplier|is last to admit a slowdown.', highlights: [], size: 30, media: {src: 'scarcity/sc29_chip.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 75, kind: 'text', reveal: [2, 40], text: 'Huang said it out loud,|and called it temporary.', highlights: ['temporary.'], size: 32, media: {src: 'scarcity/sc30_loud.jpg', type: 'img', effect: 'panR'}},
  // 31
  {dur: 40, kind: 'text', reveal: [2, 28], text: 'That’s going to|get solved.', highlights: ['solved.'], size: 42, media: {src: 'scarcity/sc31_solved.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 28, kind: 'text', reveal: [2], text: 'Which is the point.', highlights: [], size: 48, media: {src: 'scarcity/sc32_point.jpg', type: 'img', effect: 'in'}},
  // 33 BLACK
  {dur: 50, kind: 'impact', text: 'More capital|means more debt.'},
  // 34
  {dur: 69, kind: 'text', reveal: [2, 40], text: 'And the ones buying his chips,|the neoclouds,', highlights: [], size: 32, media: {src: 'scarcity/sc34_neoclouds.jpg', type: 'img', effect: 'in'}},
  // 35
  {dur: 31, kind: 'text', reveal: [2], text: 'have the least of it.', highlights: ['least'], size: 46, media: {src: 'scarcity/sc35_least.jpg', type: 'img', effect: 'panL'}},
  // 36
  {dur: 68, kind: 'text', reveal: [2, 28], text: 'Who lends the neoclouds|the money?', highlights: ['money?'], size: 38, media: {src: 'scarcity/sc36_lend.jpg', type: 'img', effect: 'in'}},
  // 37
  {dur: 89, kind: 'text', reveal: [2, 28], text: 'Does Meta’s new share class|sell fast enough?', highlights: ['enough?'], size: 34, media: {src: 'scarcity/sc37_sell.jpg', type: 'img', effect: 'panR'}},
  // 38
  {dur: 58, kind: 'text', reveal: [2], text: 'And is oil, the same morning,', highlights: [], size: 36, media: {src: 'scarcity/sc38_oil.jpg', type: 'img', effect: 'in'}},
  // 39 CARD $112
  {dur: 56, kind: 'stat', stat: {pre: 'BRENT CRUDE', prefix: '$', value: 112, post: 'SAME MORNING'}, media: {src: 'scarcity/sc39_brent.jpg', type: 'img', effect: 'in'}},
  // 40
  {dur: 73, kind: 'text', reveal: [2, 28], text: 'the thing that actually|ends the party?', highlights: ['party?'], size: 38, media: {src: 'scarcity/sc40_party.jpg', type: 'img', effect: 'in'}},
  // 41
  {dur: 91, kind: 'text', reveal: [2, 28], text: 'Nasdaq down 1.5%.|Meta down 5%.', highlights: [], size: 40, media: {src: 'scarcity/sc41_recap.jpg', type: 'img', effect: 'panL'}},
  // 42
  {dur: 48, kind: 'text', reveal: [2], text: 'Brent past a hundred and twelve.', highlights: [], size: 34, media: {src: 'scarcity/sc42_brent2.jpg', type: 'img', effect: 'in'}},
  // 43
  {dur: 95, kind: 'text', reveal: [2, 40], text: 'The biggest winner of the boom|saying the money’s short.', highlights: ['short.'], size: 30, media: {src: 'scarcity/sc43_short.jpg', type: 'img', effect: 'panR'}},
  // 44
  {dur: 40, kind: 'text', reveal: [2], text: 'So you tell me.', highlights: ['you'], size: 50, media: {src: 'scarcity/sc44_point2.jpg', type: 'img', effect: 'in'}},
  // 45 RED
  {dur: 132, kind: 'impact', redBg: true, text: 'Is “scarcity of capital” a speed bump,|or the first honest word|about how this ends?'},
  // 46 CTA
  {dur: 46, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Pick a side|below.', highlights: ['side'], size: 48, media: {src: 'scarcity/sc46_fork.mp4', type: 'video', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 684, src: 'media/sfx_whoosh.mp3', vol: 0.33},
  {at: 724, src: 'media/sfx_whoosh.mp3', vol: 0.33},
  {at: 791, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 865, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 893, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1415, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 1496, src: 'media/sfx_whoosh.mp3', vol: 0.33},
  {at: 1683, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1945, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1985, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 2355, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 2720, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 3123, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 3255, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The scarcity</span>
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
export const ScarcityReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('scarcity/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('scarcity/music.mp3')}
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
