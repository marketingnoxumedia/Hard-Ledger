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
// "The spiral" reel (SpiralReel) — fast NEWS reel, Hard Ledger house format.
// TOPIC: a UK inflation jump feeding the government's record debt-interest bill, one week before the Budget —
// index-linked debt means the same inflation figure that hits fuel prices also adds billions to what the
// state owes bondholders.
// Thesis: UK inflation just jumped, and the government pays the biggest penalty for it, in cash, this month.
// If you've filled a car lately you know the number; the same number just added billions to the national
// interest bill, which you also pay. Inflation is ~3.5%, up from ~3.1% in a single month; motor fuel ~+29.8%
// on the year (petrol highest since 2022) — and it lands one week before the Chancellor's first Budget. The
// same morning: September debt interest ~£10.9bn (a monthly record), deficit ~£24.5bn, total debt crossing
// ~£3tn for the first time. Because a chunk of UK debt is index-linked, the interest rises with inflation
// automatically — the ONS says the jump added ~£4bn to September's interest alone. The twist: normally a
// Chancellor wants low inflation for voters; this one needs it for the balance sheet — every point of
// inflation is a bill from bondholders, and the same figure sets next year's pension/benefits uprating, so it
// costs twice. Open questions: does the Bank of England hike into a Budget? does the Chancellor have room left
// to spend? Outcome recap: 3.5% / £10.9bn / £3tn / Budget next Wednesday. Binary close ("Is this a fuel-price
// blip, or the moment the debt starts setting policy? Pick a side below."). QUESTION/STORY/ANSWER/CTA with NO
// post-hook pause, mid-reel like+follow ask.
// Number-heavy: card figures 3.5% / 3.1% / 29.8% / £10.9bn / £24.5bn / £3tn / £4bn, plus a 4-line outcome
// recap card. Captions match the VO verbatim (except the number cards; spoken figures as numerals).
// Durations/reveals/SFX locked to the VO via a scribe_v1 word-timestamp anchor pass (public/spiral/voiceover.mp3,
// NO inserted pause); music mixed at 0.17. Built at the house +10% pacing default.
// NB: OWN distinct footage under public/spiral/, NO reuse of ANY other reel's clips (esp. DebtReel (US debt) and
// PensionReel (UK, references the same uprating) — this reel is UK inflation/debt-interest and must look
// entirely its own).
// FOOTAGE is BRAND-FREE, FACE-FREE, FLAG-FREE and LANDMARK-FREE — generic UK money / fuel / markets b-roll: a
// GENERIC fuel pump/nozzle/gauge (NO station brand, NO price board with a currency/brand), currency-neutral
// money (coins edge-on, note edges, piggy banks — NO monarch/banknote portraits), a rising chart/ticker with
// NO readable brand/ticker symbol, a calculator, paperwork, an upward arrow, a balance/scale. **NO bank/fuel/
// brand logos (NO Shell/BP/Esso/Tesco pumps), NO HMRC/DWP/Treasury/Bank-of-England crests or letterhead, NO
// flags (Union Jack / any), NO identifiable UK landmarks or buildings (NOT Parliament / Downing St / the Bank
// / the Treasury), NO identifiable faces, NO foreign text or foreign currency, NO King's-head or any banknote
// portraits, NO military insignia.**
// **UNVERIFIED / SENSITIVE — asserts specific, checkable, politically contested UK macro figures and names
// real institutions; rendered as written but MUST be fact-checked against primary sources (ONS / HM Treasury /
// OBR / Bank of England / the Budget) before publishing:** the ~3.5% (up from ~3.1%) CPI and ~+29.8% motor
// fuel / "highest since 2022"; the ~£10.9bn September debt interest "highest ever", ~£24.5bn deficit, ~£3tn
// total debt "first time"; "index-linked" interest and the ONS ~£4bn attribution; "Budget next Wednesday".
// **FACTUAL ERROR TO FIX: the script names "Healey" as the one with spending room, implying he is Chancellor
// — the UK Chancellor is Rachel REEVES (John Healey is Defence Secretary). Rendered verbatim but almost
// certainly wrong; correct the name before publishing.** The "debt starts setting policy" framing is editorial.
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 81, kind: 'hook', reveal: [3, 36], text: 'UK inflation|just jumped.', kicker: 'The spiral', highlights: ['jumped.'], size: 42, media: {src: 'spiral/sp00_fuelpump.mp4', type: 'video', effect: 'in'}},
  // 1
  {dur: 94, kind: 'text', reveal: [2, 40], text: 'And the government is the one|who pays the biggest penalty for it.', highlights: ['penalty'], size: 32, media: {src: 'spiral/sp01_downarrow.jpg', type: 'img', effect: 'panL'}},
  // 2
  {dur: 44, kind: 'text', reveal: [2, 28], text: 'In cash.|This month.', highlights: ['cash.'], size: 46, media: {src: 'spiral/sp02_cash.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 70, kind: 'text', reveal: [2, 40], text: 'If you’ve filled up a car|in the last month,', highlights: [], size: 34, media: {src: 'spiral/sp03_nozzle.jpg', type: 'img', effect: 'panR'}},
  // 4
  {dur: 45, kind: 'text', reveal: [2, 28], text: 'you already know|the number.', highlights: ['number.'], size: 42, media: {src: 'spiral/sp04_gauge.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 64, kind: 'text', reveal: [2, 40], text: 'What you don’t know is that|the same number', highlights: [], size: 34, media: {src: 'spiral/sp05_counter.jpg', type: 'img', effect: 'panL'}},
  // 6
  {dur: 90, kind: 'text', reveal: [2, 40], text: 'just added billions to|the national interest bill.', highlights: ['billions'], size: 32, media: {src: 'spiral/sp06_billgrow.jpg', type: 'img', effect: 'in'}},
  // 7 BLACK
  {dur: 36, kind: 'impact', text: 'Which you|also pay.'},
  // 8
  {dur: 71, kind: 'text', reveal: [2, 40], text: 'I’ll show you exactly|how one feeds the other.', highlights: ['feeds'], size: 34, media: {src: 'spiral/sp08_gears.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 75, kind: 'text', reveal: [2, 40], text: 'But first, like the video|and make sure to follow.', highlights: ['follow.'], size: 36, media: {src: 'spiral/sp09_phone.jpg', type: 'img', effect: 'panR'}},
  // 10
  {dur: 86, kind: 'text', reveal: [2, 28], text: 'Now, inflation ticking up|is nothing new.', highlights: [], size: 34, media: {src: 'spiral/sp10_pricetags.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 48, kind: 'text', reveal: [2, 28], enter: 'slideL', text: 'But this one|is different.', highlights: ['different.'], size: 48, media: {src: 'spiral/sp11_standout.jpg', type: 'img', effect: 'in'}},
  // 12 CARD 3.5%
  {dur: 58, kind: 'stat', stat: {pre: 'BECAUSE IT’S', value: 3.5, decimals: 1, suffix: '%'}, media: {src: 'spiral/sp12_chartup.jpg', type: 'img', effect: 'in'}},
  // 13 CARD 3.1%
  {dur: 84, kind: 'stat', stat: {pre: 'UP FROM', value: 3.1, decimals: 1, suffix: '%', post: 'IN A SINGLE MONTH'}, media: {src: 'spiral/sp13_percent.jpg', type: 'img', effect: 'in'}},
  // 14 CARD 29.8%
  {dur: 121, kind: 'stat', stat: {pre: 'MOTOR FUEL', value: 29.8, decimals: 1, suffix: '%', post: 'ON THE YEAR'}, media: {src: 'spiral/sp14_fuelprice.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 89, kind: 'text', reveal: [2, 28], text: 'petrol at its highest|since 2022.', highlights: ['2022.'], size: 38, media: {src: 'spiral/sp15_petrolpump.jpg', type: 'img', effect: 'panL'}},
  // 16
  {dur: 60, kind: 'text', reveal: [2, 40], text: 'And because it lands|one week before', highlights: [], size: 36, media: {src: 'spiral/sp16_calendar.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 49, kind: 'text', reveal: [2, 28], text: 'the Chancellor’s|first Budget.', highlights: ['Budget.'], size: 40, media: {src: 'spiral/sp17_redbox.jpg', type: 'img', effect: 'panR'}},
  // 18
  {dur: 74, kind: 'text', reveal: [2, 40], text: 'Look at the other release|from the same morning.', highlights: [], size: 34, media: {src: 'spiral/sp18_release.jpg', type: 'img', effect: 'in'}},
  // 19 CARD £10.9bn
  {dur: 127, kind: 'stat', stat: {pre: 'SEPTEMBER DEBT INTEREST', prefix: '£', value: 10.9, decimals: 1, post: 'BILLION'}, media: {src: 'spiral/sp19_interest.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 66, kind: 'text', reveal: [2, 28], text: 'One month.|The highest ever recorded.', highlights: ['highest'], size: 38, media: {src: 'spiral/sp20_spike.jpg', type: 'img', effect: 'in'}},
  // 21 CARD £24.5bn
  {dur: 100, kind: 'stat', stat: {pre: 'DEFICIT FOR THE MONTH', prefix: '£', value: 24.5, decimals: 1, post: 'BILLION'}, media: {src: 'spiral/sp21_deficit.jpg', type: 'img', effect: 'in'}},
  // 22 CARD £3tn
  {dur: 63, kind: 'stat', stat: {pre: 'TOTAL DEBT', prefix: '£', value: 3, post: 'TRILLION'}, media: {src: 'spiral/sp22_debtpile.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 50, kind: 'text', reveal: [2, 28], text: 'First time it’s|crossed that line.', highlights: ['line.'], size: 40, media: {src: 'spiral/sp23_crossline.jpg', type: 'img', effect: 'panL'}},
  // 24
  {dur: 60, kind: 'text', reveal: [2, 28], text: 'And the problem|doesn’t stop there.', highlights: ['problem'], size: 44, media: {src: 'spiral/sp24_warning.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 98, kind: 'text', reveal: [2, 28], text: 'A chunk of UK debt|is index-linked.', highlights: ['index-linked.'], size: 36, media: {src: 'spiral/sp25_chain.jpg', type: 'img', effect: 'panR'}},
  // 26
  {dur: 102, kind: 'text', reveal: [2, 40], text: 'The interest rises with|inflation, automatically.', highlights: ['automatically.'], size: 34, media: {src: 'spiral/sp26_ratchet.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 112, kind: 'text', reveal: [2, 40], text: 'So that jump to 3.5%|didn’t just hit your fuel.', highlights: ['3.5%'], size: 34, media: {src: 'spiral/sp27_fuelchart.jpg', type: 'img', effect: 'panL'}},
  // 28
  {dur: 54, kind: 'text', reveal: [2], text: 'The ONS says it added about', highlights: [], size: 36, media: {src: 'spiral/sp28_document.jpg', type: 'img', effect: 'in'}},
  // 29 CARD £4bn
  {dur: 115, kind: 'stat', stat: {pre: 'TO SEPTEMBER’S INTEREST · ALONE', prefix: '£', value: 4, post: 'BILLION'}, media: {src: 'spiral/sp29_addbillion.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 102, kind: 'text', reveal: [2, 40], text: 'Normally a Chancellor wants|low inflation for voters.', highlights: [], size: 32, media: {src: 'spiral/sp30_ballot.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 65, kind: 'text', reveal: [2, 28], text: 'This one needs it|for the balance sheet.', highlights: ['balance'], size: 36, media: {src: 'spiral/sp31_scales.jpg', type: 'img', effect: 'panR'}},
  // 32
  {dur: 91, kind: 'text', reveal: [2, 40], text: 'Every point of inflation|is a bill from bondholders.', highlights: ['bondholders.'], size: 32, media: {src: 'spiral/sp32_bond.jpg', type: 'img', effect: 'in'}},
  // 33
  {dur: 96, kind: 'text', reveal: [2, 40], text: 'And the strange part is that|the same inflation figure', highlights: ['strange'], size: 32, media: {src: 'spiral/sp33_magnifier.jpg', type: 'img', effect: 'panL'}},
  // 34
  {dur: 115, kind: 'text', reveal: [2, 40], text: 'sets next year’s pension rise,|the benefits uprating, the lot.', highlights: [], size: 30, media: {src: 'spiral/sp34_envelope.jpg', type: 'img', effect: 'in'}},
  // 35 BLACK
  {dur: 32, kind: 'impact', text: 'It costs|twice.'},
  // 36
  {dur: 81, kind: 'text', reveal: [2, 40], text: 'Does the Bank of England|hike into a Budget?', highlights: ['hike'], size: 34, media: {src: 'spiral/sp36_ratedial.jpg', type: 'img', effect: 'in'}},
  // 37
  {dur: 47, kind: 'text', reveal: [2, 28], text: 'Markets now|think it might.', highlights: ['might.'], size: 42, media: {src: 'spiral/sp37_markets.jpg', type: 'img', effect: 'panR'}},
  // 38
  {dur: 67, kind: 'text', reveal: [2, 40], text: 'Does Healey have|any room left to spend?', highlights: [], size: 36, media: {src: 'spiral/sp38_emptywallet.jpg', type: 'img', effect: 'in'}},
  // 39
  {dur: 56, kind: 'text', reveal: [2, 28], text: 'Less than he had|a week ago.', highlights: ['Less'], size: 42, media: {src: 'spiral/sp39_shrinkstack.jpg', type: 'img', effect: 'panL'}},
  // 40 CARD recap
  {dur: 236, kind: 'lines', reveal: [2, 50, 136, 182], text: '3.5% INFLATION|£10.9BN INTEREST|£3TN OWED|BUDGET WEDNESDAY', highlights: ['3.5%'], media: {src: 'spiral/sp40_recapbg.jpg', type: 'img', effect: 'in'}},
  // 41
  {dur: 26, kind: 'text', reveal: [2], text: 'So you tell me.', highlights: ['you'], size: 50, media: {src: 'spiral/sp41_handpoint.jpg', type: 'img', effect: 'in'}},
  // 42 RED
  {dur: 124, kind: 'impact', redBg: true, text: 'Is this a fuel-price blip,|or the moment the debt|starts setting policy?'},
  // 43 CTA
  {dur: 34, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Pick a side|below.', highlights: ['side'], size: 48, media: {src: 'spiral/sp43_forked-road.mp4', type: 'video', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 487, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 755, src: 'media/sfx_whoosh.mp3', vol: 0.33},
  {at: 803, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 861, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 945, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 1337, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 1530, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 1630, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 2169, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 2753, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 3036, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 3298, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 3422, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The spiral</span>
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
export const SpiralReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('spiral/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('spiral/music.mp3')}
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
