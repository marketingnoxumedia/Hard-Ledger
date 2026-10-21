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
// "The pension" reel (PensionReel) — fast NEWS reel, Hard Ledger house format.
// TOPIC: the UK's record state-pension rise (triple lock) colliding with the FROZEN personal tax allowance —
// so the full new state pension now crosses the income-tax threshold and gets taxed for the first time.
// Thesis: the UK just confirmed the biggest state pension in history, and for the first time the government
// will tax it. Someone on the full state pension and nothing else has never paid income tax on it; from
// April, that ends. The pension rises ~3.9% (the triple lock) = ~£488/yr, landing the full new state pension
// at ~£13,036. But the personal allowance (tax-free amount) is ~£12,570, frozen since 2021 — so the pension
// is now ~£466 over the line, taxed at 20% = ~£93/yr, meaning pensioners with no other income owe HMRC for
// the first time. The institutional twist: the allowance used to rise with the pension; the freeze holds the
// line still while the triple lock pushes the pension up — a collision that was always coming. Open
// questions: does the Chancellor fix it in the Budget? does the freeze run to 2030? Outcome: April 2027,
// ~£250.70/week — the richest state pension ever paid, the first with a tax bill attached. Binary close
// ("Is a £488 raise with £93 clawed back still a win, or is the triple lock quietly broken? Pick a side
// below."). QUESTION/STORY/ANSWER/CTA with NO post-hook pause (claim flows straight into the personal beat),
// mid-reel like+follow ask.
// Number-heavy: card figures 3.9% / £488 / £13,036 / £12,570 / £466 / £93 / £250.70, plus a pension-vs-
// allowance comparison card. Captions match the VO verbatim (except the number cards; spoken figures as
// numerals). Durations/reveals/SFX locked to the VO via a scribe_v1 word-timestamp anchor pass
// (public/pension/voiceover.mp3, NO inserted pause); music mixed at 0.17.
// NB: OWN distinct footage under public/pension/, NO reuse of ANY other reel's clips (esp. RaiseReel, whose
// US-COLA topic is adjacent — this reel is UK state pension / fiscal drag and must look entirely its own).
// FOOTAGE is BRAND-FREE, FACE-FREE, FLAG-FREE and LANDMARK-FREE — generic UK civic / money / admin b-roll:
// coins and notes shown edge-on or as backs (NO banknote portraits), a blank tax form / letter, a calendar,
// a frozen/ice motif, scales/balance, an upward arrow, a calculator, a kettle/home-cost cue, an empty
// armchair, HMRC-style paperwork with NO real letterhead/crest. **NO bank/brand logos, NO HMRC/DWP/Treasury
// crests or letterhead, NO flags (Union Jack / any), NO identifiable UK landmarks or buildings, NO
// identifiable faces (pensioners shown via hands/backs/objects only), NO foreign text, NO King's-head or any
// banknote portraits, NO military insignia.**
// **UNVERIFIED / SENSITIVE — asserts specific, checkable, and politically contested figures about UK state
// pension, the triple lock, the frozen personal allowance and HMRC; rendered as written but MUST be
// fact-checked against primary sources (DWP / HMRC / Budget) before publishing:** "biggest state pension in
// history" and "for the first time the government will tax it"; the ~3.9% rise, ~£488/yr, ~£13,036 full new
// state pension, ~£12,570 personal allowance "frozen since 2021", ~£466 over the threshold, 20% / ~£93/yr;
// "owe HMRC for the first time"; the freeze running "to 2030"; and "April 2027 / £250.70 a week". The
// "triple lock quietly broken" framing is editorial analysis.
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 130, kind: 'hook', reveal: [3, 34, 66], text: 'The UK just confirmed|the biggest state pension|in history.', kicker: 'The pension', highlights: ['biggest'], size: 34, media: {src: 'pension/pe00_coins.mp4', type: 'video', effect: 'in'}},
  // 1
  {dur: 80, kind: 'text', reveal: [2, 40], text: 'And for the first time,|the government will tax it.', highlights: ['tax'], size: 38, media: {src: 'pension/pe01_taxform.jpg', type: 'img', effect: 'panL'}},
  // 2
  {dur: 102, kind: 'text', reveal: [2, 40], text: 'If you, or your parents,|live on the full state pension', highlights: [], size: 34, media: {src: 'pension/pe02_hands.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 108, kind: 'text', reveal: [2, 40], text: 'and nothing else, you’ve never|paid income tax on it.', highlights: ['never'], size: 34, media: {src: 'pension/pe03_purse.jpg', type: 'img', effect: 'panR'}},
  // 4
  {dur: 71, kind: 'text', reveal: [2, 28], text: 'From April,|that ends.', highlights: ['ends.'], size: 46, media: {src: 'pension/pe04_calendar-april.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 66, kind: 'text', reveal: [2, 40], text: 'I’ll show you exactly|how the maths flips.', highlights: ['flips.'], size: 38, media: {src: 'pension/pe05_calculator.jpg', type: 'img', effect: 'panL'}},
  // 6
  {dur: 83, kind: 'text', reveal: [2, 40], text: 'But first, like the video|and make sure to follow.', highlights: ['follow.'], size: 36, media: {src: 'pension/pe06_phone.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 71, kind: 'text', reveal: [2, 28], text: 'Now, the pension goes up|every April.', highlights: [], size: 36, media: {src: 'pension/pe07_coins-rising.jpg', type: 'img', effect: 'panL'}},
  // 8
  {dur: 40, kind: 'text', reveal: [2, 28], text: 'That’s the|triple lock.', highlights: ['lock.'], size: 48, media: {src: 'pension/pe08_padlock.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 40, kind: 'text', reveal: [2, 28], enter: 'slideL', text: 'But this year|is different.', highlights: ['different.'], size: 46, media: {src: 'pension/pe09_diary.jpg', type: 'img', effect: 'in'}},
  // 10 CARD 3.9%
  {dur: 108, kind: 'stat', stat: {pre: 'BECAUSE IT RISES', value: 3.9, decimals: 1, suffix: '%'}, media: {src: 'pension/pe10_chart-up.jpg', type: 'img', effect: 'in'}},
  // 11 CARD £488
  {dur: 79, kind: 'stat', stat: {pre: 'THAT’S', prefix: '£', value: 488, post: 'A YEAR'}, media: {src: 'pension/pe11_coins-stack.jpg', type: 'img', effect: 'in'}},
  // 12 CARD £13,036
  {dur: 148, kind: 'stat', stat: {pre: 'FULL NEW STATE PENSION', prefix: '£', value: 13036}, media: {src: 'pension/pe12_notes-fan.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 32, kind: 'text', reveal: [2, 28], enter: 'slideUp', text: 'Look at|the other number.', highlights: ['number.'], size: 44, media: {src: 'pension/pe13_magnifier.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 148, kind: 'text', reveal: [2, 40], text: 'The personal allowance.|The amount you can earn tax-free.', highlights: ['tax-free.'], size: 32, media: {src: 'pension/pe14_allowance-form.jpg', type: 'img', effect: 'panL'}},
  // 15 CARD £12,570
  {dur: 90, kind: 'stat', stat: {pre: 'PERSONAL ALLOWANCE · TAX-FREE', prefix: '£', value: 12570}, media: {src: 'pension/pe15_threshold.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 57, kind: 'text', reveal: [2], text: 'Frozen since 2021.', highlights: ['Frozen'], size: 46, media: {src: 'pension/pe16_frost.jpg', type: 'img', effect: 'panR'}},
  // 17 CARD compare
  {dur: 160, kind: 'lines', reveal: [0, 24], text: 'PENSION   £13,036|ALLOWANCE   £12,570', highlights: ['£13,036'], media: {src: 'pension/pe17_scales.jpg', type: 'img', effect: 'in'}},
  // 18 CARD £466
  {dur: 136, kind: 'stat', stat: {pre: 'NOW', prefix: '£', value: 466, post: 'OVER THE LINE'}, media: {src: 'pension/pe18_line-cross.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 58, kind: 'text', reveal: [2, 28], text: 'And the problem|doesn’t stop there.', highlights: ['problem'], size: 44, media: {src: 'pension/pe19_warning.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 104, kind: 'text', reveal: [2, 40], text: 'That £466|gets taxed at 20%.', highlights: ['20%.'], size: 40, media: {src: 'pension/pe20_percent.jpg', type: 'img', effect: 'panL'}},
  // 21 CARD £93
  {dur: 59, kind: 'stat', stat: {pre: 'TAXED · ABOUT', prefix: '£', value: 93, post: 'A YEAR'}, media: {src: 'pension/pe21_coins-removed.jpg', type: 'img', effect: 'in'}},
  // 22 BLACK
  {dur: 28, kind: 'impact', text: 'Small.'},
  // 23
  {dur: 88, kind: 'text', reveal: [2, 40], text: 'But it means pensioners|with no other income', highlights: [], size: 34, media: {src: 'pension/pe23_armchair.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 85, kind: 'text', reveal: [2, 28], text: 'now owe HMRC|for the first time.', highlights: ['HMRC'], size: 40, media: {src: 'pension/pe24_envelope.jpg', type: 'img', effect: 'panR'}},
  // 25
  {dur: 107, kind: 'text', reveal: [2, 40], text: 'Paperwork, tax codes, letters,|for £93.', highlights: ['£93.'], size: 36, media: {src: 'pension/pe25_paperwork.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 91, kind: 'text', reveal: [2, 40], text: 'Normally you’d expect the allowance|to rise with the pension.', highlights: [], size: 32, media: {src: 'pension/pe26_two-lines.jpg', type: 'img', effect: 'panL'}},
  // 27
  {dur: 53, kind: 'text', reveal: [2], text: 'It did, for decades.', highlights: ['decades.'], size: 46, media: {src: 'pension/pe27_clock.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 103, kind: 'text', reveal: [2, 40], text: 'Then it was frozen,|and the freeze keeps rolling.', highlights: ['frozen,'], size: 36, media: {src: 'pension/pe28_ice.jpg', type: 'img', effect: 'panR'}},
  // 29
  {dur: 61, kind: 'text', reveal: [2, 28], text: 'The triple lock|pushes the pension up.', highlights: ['up.'], size: 40, media: {src: 'pension/pe29_arrow-up.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 68, kind: 'text', reveal: [2, 28], text: 'The freeze|holds the line still.', highlights: ['still.'], size: 42, media: {src: 'pension/pe30_flatline.jpg', type: 'img', effect: 'panL'}},
  // 31
  {dur: 62, kind: 'text', reveal: [2, 40], text: 'The collision was always|going to happen.', highlights: ['collision'], size: 36, media: {src: 'pension/pe31_collision.jpg', type: 'img', effect: 'in'}},
  // 32 BLACK
  {dur: 35, kind: 'impact', text: 'It’s|happening now.'},
  // 33
  {dur: 58, kind: 'text', reveal: [2, 40], text: 'Does the Chancellor fix it|in the Budget?', highlights: ['budget?'], size: 36, media: {src: 'pension/pe33_redbox.jpg', type: 'img', effect: 'in'}},
  // 34
  {dur: 29, kind: 'text', reveal: [2], text: 'Nobody’s said.', highlights: ['nobody’s'], size: 50, media: {src: 'pension/pe34_podium.jpg', type: 'img', effect: 'panR'}},
  // 35
  {dur: 94, kind: 'text', reveal: [2, 40], text: 'Does the freeze run to 2030|as planned?', highlights: ['2030'], size: 36, media: {src: 'pension/pe35_timeline.jpg', type: 'img', effect: 'in'}},
  // 36
  {dur: 39, kind: 'text', reveal: [2], text: 'That’s the current plan.', highlights: ['plan.'], size: 44, media: {src: 'pension/pe36_document.jpg', type: 'img', effect: 'panL'}},
  // 37
  {dur: 52, kind: 'text', reveal: [2], text: 'April 2027.', highlights: ['2027.'], size: 50, media: {src: 'pension/pe37_calendar-2027.jpg', type: 'img', effect: 'in'}},
  // 38 CARD £250.70
  {dur: 65, kind: 'stat', stat: {pre: 'APRIL 2027', prefix: '£', value: 250.70, decimals: 2, post: 'A WEEK'}, media: {src: 'pension/pe38_notes-week.jpg', type: 'img', effect: 'in'}},
  // 39
  {dur: 71, kind: 'text', reveal: [2, 28], text: 'The richest state pension|ever paid,', highlights: ['richest'], size: 38, media: {src: 'pension/pe39_notes-fan2.jpg', type: 'img', effect: 'panR'}},
  // 40
  {dur: 101, kind: 'text', reveal: [2, 40], text: 'and the first one that comes|with a tax bill attached.', highlights: ['bill'], size: 34, media: {src: 'pension/pe40_taxbill.jpg', type: 'img', effect: 'in'}},
  // 41
  {dur: 40, kind: 'text', reveal: [2], text: 'So you tell me.', highlights: ['you'], size: 50, media: {src: 'pension/pe41_hand-point.jpg', type: 'img', effect: 'in'}},
  // 42
  {dur: 187, kind: 'text', reveal: [2, 36, 70], text: 'Is a £488 raise|with £93 clawed back|still a win,', highlights: ['win,'], size: 34, media: {src: 'pension/pe42_tug.jpg', type: 'img', effect: 'panL'}},
  // 43 RED
  {dur: 62, kind: 'impact', redBg: true, text: 'or is the triple lock|quietly broken?'},
  // 44 CTA
  {dur: 26, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Pick a side|below.', highlights: ['side'], size: 48, media: {src: 'pension/pe44_forked-road.mp4', type: 'video', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 751, src: 'media/sfx_whoosh.mp3', vol: 0.33},
  {at: 791, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 899, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 978, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 1126, src: 'media/sfx_whoosh.mp3', vol: 0.33},
  {at: 1307, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 1454, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 1613, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 1911, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 1970, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 2716, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 3022, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 3486, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 3548, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The pension</span>
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
export const PensionReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('pension/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('pension/music.mp3')}
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
