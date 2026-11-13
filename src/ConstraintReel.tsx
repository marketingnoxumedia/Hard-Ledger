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
// "The constraint" reel (ConstraintReel) — fast NEWS reel, Hard Ledger house format.
// TOPIC: chip-equipment maker Lam Research guided $8.6B for the quarter with one line about "near-term supply
// chain constraints," and the whole semiconductor sector sold off. The constraint is at the TOP of the chain.
// Thesis: the chip stocks fell ~4% in a morning not because demand fell but because one company (Lam) said it
// couldn't build fast enough. If you own Nvidia/AMD/Micron or an index fund, you took the hit. Lam makes the
// equipment TSMC and Samsung use to make chips; its $8.6B guidance "would have been a bit higher if not for
// near-term supply chain constraints." The selloff: Lam ~−10%, Applied Materials ~−6%, Intel ~−5%, Marvell
// ~−4%, Nvidia/Qualcomm/Broadcom all down, the sector index ~−4% — one sentence from one CFO. Second-order:
// every AI data centre needs chips, every chip a fab, every fab Lam's machines; if Lam can't get its own parts
// the delay runs downhill — the constraint isn't at the bottom of the supply chain, it's at the top. Twist: a
// demand problem shows up as cancelled orders; this is the opposite — demand is fine, Lam just can't ship fast
// enough, which is worse for the AI timeline because you can fix demand with price but you can't fix a missing
// component with money. Open questions: what's the constraint (not said)? how long is "near-term" (not said)?
// does it show up in Nvidia's numbers next month? Outcome: $8.6B guided, −10% Lam, −4% sector, oil up the same
// morning. Binary close ("Is this a supply blip, or the first sign the AI build-out has hit a physical wall?
// Pick a side below."). 10-part structure, NO post-hook pause, mid-reel like+follow ask.
// Card figures: $8.6B / 10% / 6% / 5% / 4% / 4% / $8.6B. Captions match the VO verbatim (except the number
// cards; spoken figures as numerals). Durations/reveals/SFX locked to the VO via a scribe_v1 word-timestamp
// anchor pass (public/constraint/voiceover.mp3, NO inserted pause); music mixed at 0.17. 47 beats; built at the
// house +10% pacing default. OWN distinct footage under public/constraint/, NO reuse of any other reel's clips
// — ledger-checked. New standalone reel, distinct from the existing MicronReel ("The cycle", a Micron-earnings
// reaction). Card text naming "LAM"/"INTEL"/"MARVELL"/etc. is editorial overlay, not footage.
// FOOTAGE is BRAND-FREE, FACE-FREE and LANDMARK-FREE despite naming Lam Research / Nvidia / AMD / Micron / TSMC
// / Samsung / Applied Materials / Intel / Marvell / Qualcomm / Broadcom / ASML: generic wafers, cleanrooms,
// semiconductor equipment, server racks, supply-chain and red-chart b-roll. **NO chipmaker/tech company logo or
// wordmark; NO readable chip part-number that names a maker; NO stock TICKER or readable price; NO exchange
// (NYSE/NASDAQ) signage; NO oil-company logo; NO flags; NO identifiable landmarks; NO readable foreign text; NO
// identifiable faces (cleanroom hoods/hands/objects only); NO banknote/coin portraits or identifiable currency;
// NO military.**
// **UNVERIFIED / SENSITIVE — names real companies; rendered as written but MUST be fact-checked before
// publishing.** Core facts CHECK OUT (Oct 2026): Lam's $8.6B (±$400M) December-quarter guidance, CFO Doug
// Bettinger's "would have been higher… near-term supply chain constraints" line, and the resulting chip selloff
// (Lam/Applied Materials/the sector down) — Yahoo Finance, 24/7 Wall St, Benzinga. Still verify: the EXACT
// per-stock percentages (Lam −10%, AMAT −6%, Intel −5%, Marvell −4%, sector −4%) vary by source and timeframe
// (intraday-morning vs close — some reports had Intel −7%, Marvell/AMD −8%, sector −6.7%); and "oil up the same
// morning." The "constraint is at the top / you can't fix a missing component with money" framing is editorial.
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 87, kind: 'hook', reveal: [3, 40], text: 'The chip stocks just lost|4% in a morning.', kicker: 'The constraint', highlights: ['4%'], size: 34, media: {src: 'constraint/ct00_selloff.mp4', type: 'video', effect: 'in'}},
  // 1
  {dur: 45, kind: 'text', reveal: [2, 28], text: 'Not because|demand fell.', highlights: ['demand'], size: 44, media: {src: 'constraint/ct01_demand.jpg', type: 'img', effect: 'panL'}},
  // 2
  {dur: 103, kind: 'text', reveal: [2, 40], text: 'Because one company said|it couldn’t build fast enough.', highlights: ['couldn’t'], size: 32, media: {src: 'constraint/ct02_build.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 132, kind: 'text', reveal: [2, 40], text: 'If you own Nvidia, AMD, Micron,|or just an index fund,', highlights: [], size: 30, media: {src: 'constraint/ct03_index.jpg', type: 'img', effect: 'panR'}},
  // 4
  {dur: 26, kind: 'text', reveal: [2], text: 'you took that hit.', highlights: ['hit.'], size: 46, media: {src: 'constraint/ct04_hit.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 132, kind: 'text', reveal: [2, 40], text: 'And the reason is a company|most people have never heard of.', highlights: ['never'], size: 30, media: {src: 'constraint/ct05_unknown.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 67, kind: 'text', reveal: [2, 28], text: 'I’ll show you exactly|where the chain snapped.', highlights: ['snapped.'], size: 34, media: {src: 'constraint/ct06_chain.jpg', type: 'img', effect: 'panL'}},
  // 7
  {dur: 98, kind: 'text', reveal: [2, 40], text: 'If that’s worth a follow,|you know where the button is.', highlights: ['follow,'], size: 32, media: {src: 'constraint/ct07_phone.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 69, kind: 'text', reveal: [2, 28], text: 'Now, chip stocks wobbling|is nothing new.', highlights: [], size: 32, media: {src: 'constraint/ct08_wobble.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 34, kind: 'text', reveal: [2, 28], enter: 'slideL', text: 'But this one|is different.', highlights: ['different.'], size: 48, media: {src: 'constraint/ct09_standout.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 62, kind: 'text', reveal: [2, 28], text: 'Because it’s|Lam Research.', highlights: ['Lam Research.'], size: 42, media: {src: 'constraint/ct10_equipment.jpg', type: 'img', effect: 'panR'}},
  // 11
  {dur: 131, kind: 'text', reveal: [2, 40], text: 'Lam makes the equipment that|TSMC and Samsung use to make the chips.', highlights: [], size: 28, media: {src: 'constraint/ct11_wafer.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 50, kind: 'text', reveal: [2], text: 'And because its guidance,', highlights: [], size: 38, media: {src: 'constraint/ct12_guidance.jpg', type: 'img', effect: 'in'}},
  // 13 CARD $8.6B
  {dur: 84, kind: 'stat', stat: {pre: 'GUIDANCE', prefix: '$', value: 8.6, decimals: 1, suffix: 'B', post: 'FOR THE QUARTER'}, media: {src: 'constraint/ct13_money.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 40, kind: 'text', reveal: [2], text: 'came with one line:', highlights: [], size: 40, media: {src: 'constraint/ct14_oneline.jpg', type: 'img', effect: 'panL'}},
  // 15
  {dur: 132, kind: 'text', reveal: [2, 40], text: 'would have been higher if not for|near-term supply chain constraints.', highlights: ['constraints.'], size: 28, media: {src: 'constraint/ct15_constraint.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 36, kind: 'text', reveal: [2], enter: 'slideUp', text: 'Look at what happened next.', highlights: [], size: 44, media: {src: 'constraint/ct16_next.jpg', type: 'img', effect: 'in'}},
  // 17 CARD 10%
  {dur: 46, kind: 'stat', stat: {pre: 'LAM', value: 10, suffix: '%', post: 'DOWN'}, media: {src: 'constraint/ct17_lam.jpg', type: 'img', effect: 'in'}},
  // 18 CARD 6%
  {dur: 97, kind: 'stat', stat: {pre: 'APPLIED MATERIALS', value: 6, suffix: '%', post: 'DOWN'}, media: {src: 'constraint/ct18_amat.jpg', type: 'img', effect: 'in'}},
  // 19 CARD 5%
  {dur: 42, kind: 'stat', stat: {pre: 'INTEL', value: 5, suffix: '%', post: 'DOWN'}, media: {src: 'constraint/ct19_intel.jpg', type: 'img', effect: 'in'}},
  // 20 CARD 4%
  {dur: 37, kind: 'stat', stat: {pre: 'MARVELL', value: 4, suffix: '%', post: 'DOWN'}, media: {src: 'constraint/ct20_marvell.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 75, kind: 'text', reveal: [2, 40], text: 'Nvidia, Qualcomm, Broadcom:|all down.', highlights: ['all down.'], size: 34, media: {src: 'constraint/ct21_alldown.jpg', type: 'img', effect: 'panR'}},
  // 22 CARD 4%
  {dur: 80, kind: 'stat', stat: {pre: 'THE WHOLE SECTOR', value: 4, suffix: '%', post: 'DOWN'}, media: {src: 'constraint/ct22_sector.jpg', type: 'img', effect: 'in'}},
  // 23 BLACK
  {dur: 60, kind: 'impact', text: 'One sentence|from one CFO.'},
  // 24
  {dur: 59, kind: 'text', reveal: [2, 28], text: 'And the problem|doesn’t stop there.', highlights: ['problem'], size: 44, media: {src: 'constraint/ct24_warning.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 83, kind: 'text', reveal: [2, 28], text: 'Every AI data centre|needs chips.', highlights: [], size: 40, media: {src: 'constraint/ct25_datacenter.jpg', type: 'img', effect: 'panL'}},
  // 26
  {dur: 59, kind: 'text', reveal: [2, 28], text: 'Every chip|needs a fab.', highlights: [], size: 44, media: {src: 'constraint/ct26_fab.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Every fab needs|Lam’s machines.', highlights: ['machines.'], size: 42, media: {src: 'constraint/ct27_machines.jpg', type: 'img', effect: 'panR'}},
  // 28
  {dur: 143, kind: 'text', reveal: [2, 40], text: 'If Lam can’t get its own parts,|the delay runs downhill through every layer.', highlights: ['downhill'], size: 26, media: {src: 'constraint/ct28_downhill.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 72, kind: 'text', reveal: [2, 40], text: 'The constraint isn’t at the|bottom of the supply chain.', highlights: [], size: 30, media: {src: 'constraint/ct29_pyramid.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 34, kind: 'text', reveal: [2], text: 'It’s at the top.', highlights: ['top.'], size: 50, media: {src: 'constraint/ct30_top.jpg', type: 'img', effect: 'panL'}},
  // 31
  {dur: 114, kind: 'text', reveal: [2, 40], text: 'Normally you’d expect a demand problem|to show up as cancelled orders.', highlights: ['cancelled'], size: 28, media: {src: 'constraint/ct31_cancelled.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 30, kind: 'text', reveal: [2], text: 'This is the opposite.', highlights: ['opposite.'], size: 48, media: {src: 'constraint/ct32_opposite.jpg', type: 'img', effect: 'in'}},
  // 33
  {dur: 92, kind: 'text', reveal: [2, 40], text: 'Demand is fine.|Lam just can’t ship fast enough.', highlights: ['can’t ship'], size: 32, media: {src: 'constraint/ct33_ship.jpg', type: 'img', effect: 'panR'}},
  // 34
  {dur: 100, kind: 'text', reveal: [2, 40], text: 'And the strange part is|that’s worse for the AI timeline,', highlights: ['worse'], size: 30, media: {src: 'constraint/ct34_timeline.jpg', type: 'img', effect: 'in'}},
  // 35
  {dur: 83, kind: 'text', reveal: [2, 28], text: 'because you can fix|demand with price.', highlights: ['price.'], size: 38, media: {src: 'constraint/ct35_price.jpg', type: 'img', effect: 'in'}},
  // 36 BLACK
  {dur: 71, kind: 'impact', text: 'You can’t fix a missing|component with money.'},
  // 37
  {dur: 53, kind: 'text', reveal: [2, 28], text: 'What’s the constraint?|Lam didn’t say.', highlights: ['didn’t say.'], size: 36, media: {src: 'constraint/ct37_question.jpg', type: 'img', effect: 'panL'}},
  // 38
  {dur: 78, kind: 'text', reveal: [2, 28], text: 'How long is “near-term”?|Also not said.', highlights: [], size: 36, media: {src: 'constraint/ct38_howlong.jpg', type: 'img', effect: 'in'}},
  // 39
  {dur: 78, kind: 'text', reveal: [2, 40], text: 'Does this show up in Nvidia’s|numbers next month?', highlights: [], size: 32, media: {src: 'constraint/ct39_watch.jpg', type: 'img', effect: 'panR'}},
  // 40
  {dur: 33, kind: 'text', reveal: [2], text: 'That’s the one to watch.', highlights: ['watch.'], size: 44, media: {src: 'constraint/ct40_onetowatch.jpg', type: 'img', effect: 'in'}},
  // 41 CARD $8.6B
  {dur: 76, kind: 'stat', stat: {pre: 'GUIDED', prefix: '$', value: 8.6, decimals: 1, suffix: 'B'}, media: {src: 'constraint/ct41_guided.jpg', type: 'img', effect: 'in'}},
  // 42
  {dur: 96, kind: 'text', reveal: [2, 28], text: '10% off Lam.|4% off the sector.', highlights: [], size: 40, media: {src: 'constraint/ct42_recap.jpg', type: 'img', effect: 'panL'}},
  // 43
  {dur: 78, kind: 'text', reveal: [2, 40], text: 'Oil up the same morning,|which doesn’t help anyone.', highlights: ['Oil up'], size: 32, media: {src: 'constraint/ct43_oil.jpg', type: 'img', effect: 'in'}},
  // 44
  {dur: 27, kind: 'text', reveal: [2], text: 'So you tell me.', highlights: ['you'], size: 50, media: {src: 'constraint/ct44_point.jpg', type: 'img', effect: 'in'}},
  // 45 RED
  {dur: 150, kind: 'impact', redBg: true, text: 'Is this a supply blip,|or the first sign the AI build-out|has hit a physical wall?'},
  // 46 CTA
  {dur: 38, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Pick a side|below.', highlights: ['side'], size: 48, media: {src: 'constraint/ct46_fork.mp4', type: 'video', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 759, src: 'media/sfx_whoosh.mp3', vol: 0.33},
  {at: 1036, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1292, src: 'media/sfx_whoosh.mp3', vol: 0.33},
  {at: 1328, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1374, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1471, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1513, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1625, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1705, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 2704, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 3017, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 3294, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 3444, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The constraint</span>
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
export const ConstraintReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('constraint/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('constraint/music.mp3')}
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
