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
// "The number" reel (DebtReel) — fast NEWS reel, Hard Ledger house format.
// TOPIC: the US just quietly hit "the most expensive number in its history" — the debt/deficit squeeze,
// and how it reaches your mortgage.
// Thesis: a single-year deficit of ~$2 TRILLION — ~12% bigger than last year — while total debt just
// crossed ~$40 TRILLION, roughly the size of the whole economy, a level last seen paying for World War
// Two. The fastest-growing line item isn't roads or defence, it's INTEREST: ~$1.36T in one year just to
// service what's already owed, a record. The one thing meant to help — tariffs — went backwards: the
// Supreme Court struck most of them down and the government had to refund ~$145B, so the windfall became a
// bill. Washington's only answer is that growth will fix it, with no maths shown for how; economists don't
// agree whether growth can outrun a ~6% deficit or where the tipping point is. What's not in dispute: more
// borrowing -> more bonds -> higher yields, and the 30-year mortgage just hit ~7.40% (a decade ago: 3%).
// Close is a binary question + comment ask ("Is the US still the safest borrower on earth, or is this the
// start of something? Pick a side below."). QUESTION/STORY/ANSWER/CTA with NO post-hook pause (the claim
// flows straight into the personal beat), and a mid-reel like+follow ask.
// 45 beats: 42 media (incl. 7 count-up STAT cards: $2T single-year deficit; +12% vs last year; $40T total
// debt; $1.36T interest in one year; $145B tariff refund; 30-YEAR MORTGAGE 7.40%; A DECADE AGO 3%) /
// 1 red impact ("Or is this the start|of something?") / 2 black ("Interest." / "Honestly..."). Captions
// match the VO verbatim (except the stat cards; spoken figures as numerals). Durations/reveals/SFX locked
// to the VO via a scribe_v1 word-timestamp anchor pass (public/debt/voiceover.mp3).
// NB: OWN distinct footage under public/debt/, NO reuse of any other reel's clips.
// FOOTAGE is BRAND-FREE, FACE-FREE and FLAG-FREE — generic economy / finance / civic b-roll: an unmarked
// domed civic building, city skylines, cash and coins (US bills edge-on/backs/bundles — NO banknote
// portraits), ledgers and bills, an hourglass, roads, vintage archive scale, a courthouse, bonds/charts,
// a house + mortgage papers. NO company LOGOS/wordmarks, NO identifiable faces/politicians, NO banknote
// portraits, NO FLAGS, NO military/propaganda, NO foreign text or foreign currency.
// **UNVERIFIED — asserts specific, checkable macro figures and attributes actions to US institutions
// (Congress/Treasury/Supreme Court); render as written but FACT-CHECK against primary sources before
// publishing:** the ~$2T single-year deficit and "+12% vs last year"; the ~$40T total debt and
// "size of the entire economy / last seen in WWII"; the ~$1.36T annual interest "record"; the Supreme
// Court striking down tariffs and the ~$145B refund; the ~6% deficit and "growth will fix it" framing; and
// the ~7.40% 30-year mortgage vs 3% a decade ago. The "most expensive number" / "start of something"
// thesis is editorial analysis.
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK a
  {dur: 92, kind: 'hook', reveal: [3, 44], text: 'We may have just watched|the US quietly hit', kicker: 'The number', highlights: [], size: 42, media: {src: 'debt/db00_dome.mp4', type: 'video', effect: 'in'}},
  // 1 HOOK b
  {dur: 78, kind: 'text', reveal: [2, 40], text: 'the most expensive|number in its history.', highlights: ['number'], size: 42, media: {src: 'debt/db37_bignumber.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 64, kind: 'text', reveal: [2, 28], text: 'And almost|nobody noticed.', highlights: ['nobody'], size: 48, media: {src: 'debt/db01_overlooked.jpg', type: 'img', effect: 'in'}},
  // 3 make it personal a
  {dur: 50, kind: 'text', reveal: [2, 28], text: 'If this were|your household,', highlights: [], size: 48, media: {src: 'debt/db02_bills.jpg', type: 'img', effect: 'panL'}},
  // 4 make it personal b
  {dur: 98, kind: 'text', reveal: [2, 40], text: 'you’d be spending more on|interest than on anything else.', highlights: ['interest'], size: 36, media: {src: 'debt/db38_spend.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 35, kind: 'text', reveal: [2], text: 'You wouldn’t sleep.', highlights: ['sleep.'], size: 54, media: {src: 'debt/db03_awake.jpg', type: 'img', effect: 'in'}},
  // 6 promise a
  {dur: 50, kind: 'text', reveal: [2, 28], text: 'I’ll walk you|through exactly', highlights: [], size: 44, media: {src: 'debt/db04_house.jpg', type: 'img', effect: 'panR'}},
  // 7 promise b
  {dur: 47, kind: 'text', reveal: [2, 28], enter: 'slideUp', text: 'how it reaches|your mortgage.', highlights: ['mortgage.'], size: 44, media: {src: 'debt/db39_mortgagedoc.jpg', type: 'img', effect: 'in'}},
  // 8 ask
  {dur: 98, kind: 'text', reveal: [2, 40], text: 'But first, like the video|and make sure to follow.', highlights: ['follow.'], size: 36, media: {src: 'debt/db05_hourglass.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 104, kind: 'text', reveal: [2, 40], text: 'Now, America running|a deficit is nothing new.', highlights: ['deficit'], size: 38, media: {src: 'debt/db06_ledger.jpg', type: 'img', effect: 'panL'}},
  // 10
  {dur: 53, kind: 'text', reveal: [2, 28], enter: 'slideL', text: 'But this one|is different.', highlights: ['different.'], size: 50, media: {src: 'debt/db07_redchart.jpg', type: 'img', effect: 'in'}},
  // 11 STAT $2T
  {dur: 93, kind: 'stat', stat: {pre: 'A SINGLE-YEAR DEFICIT OF', prefix: '$', value: 2, suffix: 'T'}, media: {src: 'debt/db08_cash.jpg', type: 'img', effect: 'in'}},
  // 12 STAT +12%
  {dur: 77, kind: 'stat', stat: {pre: 'BIGGER THAN LAST YEAR', prefix: '+', value: 12, suffix: '%'}, media: {src: 'debt/db09_risingchart.jpg', type: 'img', effect: 'in'}},
  // 13 STAT $40T
  {dur: 107, kind: 'stat', stat: {pre: 'TOTAL DEBT JUST CROSSED', prefix: '$', value: 40, suffix: 'T'}, media: {src: 'debt/db10_debtpile.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 103, kind: 'text', reveal: [2, 40], text: 'That’s debt the size|of the entire economy,', highlights: ['entire'], size: 36, media: {src: 'debt/db11_skyline.jpg', type: 'img', effect: 'panR'}},
  // 15
  {dur: 97, kind: 'text', reveal: [2, 40], text: 'a level last seen|paying for World War Two.', highlights: ['world', 'war', 'two.'], size: 36, media: {src: 'debt/db12_vintage.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 40, kind: 'text', reveal: [2, 28], enter: 'slideUp', text: 'Look at where|the money goes.', highlights: ['goes.'], size: 46, media: {src: 'debt/db13_moneyflow.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 49, kind: 'text', reveal: [2, 28], text: 'Not roads.|Not defence.', highlights: [], size: 50, media: {src: 'debt/db14_road.jpg', type: 'img', effect: 'panL'}},
  // 18 BLACK
  {dur: 34, kind: 'impact', text: 'Interest.'},
  // 19 STAT $1.36T
  {dur: 73, kind: 'stat', stat: {pre: 'INTEREST, IN ONE YEAR', prefix: '$', value: 1.36, decimals: 2, suffix: 'T'}, media: {src: 'debt/db16_interestbill.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Just to service|what’s already owed.', highlights: ['owed.'], size: 42, media: {src: 'debt/db17_record.jpg', type: 'img', effect: 'panR'}},
  // 21 punch
  {dur: 32, kind: 'text', reveal: [2], enter: 'zoom', text: 'A record.', highlights: ['record.'], size: 64, media: {src: 'debt/db40_record.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 62, kind: 'text', reveal: [2, 28], text: 'And the problem|doesn’t stop there.', highlights: ['problem'], size: 44, media: {src: 'debt/db18_dashboard.jpg', type: 'img', effect: 'in'}},
  // 23 tariffs a
  {dur: 53, kind: 'text', reveal: [2, 28], text: 'The one thing|meant to help,', highlights: [], size: 42, media: {src: 'debt/db19_containers.jpg', type: 'img', effect: 'in'}},
  // 24 tariffs b
  {dur: 52, kind: 'text', reveal: [2, 28], enter: 'slideR', text: 'Tariffs,|went backwards.', highlights: ['tariffs,'], size: 46, media: {src: 'debt/db41_reverse.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 73, kind: 'text', reveal: [2, 40], text: 'The Supreme Court|struck most of them down.', highlights: ['struck'], size: 36, media: {src: 'debt/db20_courthouse.jpg', type: 'img', effect: 'panL'}},
  // 26 STAT $145B
  {dur: 116, kind: 'stat', stat: {pre: 'THE GOVERNMENT HAD TO REFUND', prefix: '$', value: 145, suffix: 'B'}, media: {src: 'debt/db21_refund.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 65, kind: 'text', reveal: [2, 28], text: 'The windfall|became a bill.', highlights: ['bill.'], size: 46, media: {src: 'debt/db22_invoice.jpg', type: 'img', effect: 'panR'}},
  // 28 plan a
  {dur: 50, kind: 'text', reveal: [2, 28], text: 'Normally you’d|expect a plan.', highlights: ['plan.'], size: 42, media: {src: 'debt/db23_plan.jpg', type: 'img', effect: 'in'}},
  // 29 plan b
  {dur: 58, kind: 'text', reveal: [2, 28], enter: 'slideL', text: 'Cuts, taxes,|something.', highlights: ['cuts,'], size: 44, media: {src: 'debt/db42_cuts.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 91, kind: 'text', reveal: [2, 40], text: 'Washington’s answer is|that growth will fix it.', highlights: ['growth'], size: 36, media: {src: 'debt/db24_podium.jpg', type: 'img', effect: 'in'}},
  // 31 maths a
  {dur: 95, kind: 'text', reveal: [2, 40], text: 'And the strange part is|that nobody has shown the maths', highlights: ['maths'], size: 32, media: {src: 'debt/db25_chalkboard.jpg', type: 'img', effect: 'panR'}},
  // 32 maths b punch
  {dur: 30, kind: 'text', reveal: [2], enter: 'zoom', text: 'for how.', highlights: [], size: 58, media: {src: 'debt/db43_question.jpg', type: 'img', effect: 'in'}},
  // 33
  {dur: 100, kind: 'text', reveal: [2, 28], text: 'Can growth outrun|a 6% deficit?', highlights: ['6%'], size: 40, media: {src: 'debt/db26_race.jpg', type: 'img', effect: 'in'}},
  // 34
  {dur: 47, kind: 'text', reveal: [2, 28], text: 'Is there|a tipping point?', highlights: ['tipping'], size: 46, media: {src: 'debt/db31_oldnew.jpg', type: 'img', effect: 'in'}},
  // 35 BLACK
  {dur: 75, kind: 'impact', text: 'Honestly, the economists|don’t agree either.'},
  // 36 yields a
  {dur: 83, kind: 'text', reveal: [2, 40], text: 'What we do know:|more borrowing, more bonds,', highlights: [], size: 36, media: {src: 'debt/db29_bonds.jpg', type: 'img', effect: 'in'}},
  // 37 yields b punch
  {dur: 53, kind: 'text', reveal: [2], enter: 'zoom', text: 'higher yields.', highlights: ['yields.'], size: 56, media: {src: 'debt/db44_yields.jpg', type: 'img', effect: 'in'}},
  // 38 STAT 7.40%
  {dur: 100, kind: 'stat', stat: {pre: 'THE 30-YEAR MORTGAGE JUST HIT', value: 7.40, decimals: 2, suffix: '%'}, media: {src: 'debt/db30_mortgagehouse.jpg', type: 'img', effect: 'in'}},
  // 39 STAT 3%
  {dur: 86, kind: 'stat', stat: {pre: 'A DECADE AGO IT WAS', value: 3, suffix: '%'}, media: {src: 'debt/db36_decade.jpg', type: 'img', effect: 'in'}},
  // 40
  {dur: 28, kind: 'text', reveal: [2], text: 'So you tell me.', highlights: ['you'], size: 54, media: {src: 'debt/db32_pointing.jpg', type: 'img', effect: 'panL'}},
  // 41 close a
  {dur: 45, kind: 'text', reveal: [2, 28], text: 'Is the US|still the', highlights: [], size: 48, media: {src: 'debt/db33_vault.jpg', type: 'img', effect: 'in'}},
  // 42 close b
  {dur: 54, kind: 'text', reveal: [2, 28], enter: 'slideUp', text: 'safest borrower|on earth,', highlights: ['safest'], size: 44, media: {src: 'debt/db45_globe.jpg', type: 'img', effect: 'in'}},
  // 43 RED impact
  {dur: 64, kind: 'impact', redBg: true, text: 'Or is this the start|of something?'},
  // 44 CTA
  {dur: 44, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Pick a side|below.', highlights: ['side'], size: 50, media: {src: 'debt/db34_choice.jpg', type: 'img', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 612, src: 'media/sfx_whoosh.mp3', vol: 0.33},
  {at: 769, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 862, src: 'media/sfx_impact.mp3', vol: 0.42},
  {at: 939, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1246, src: 'media/sfx_whoosh.mp3', vol: 0.33},
  {at: 1335, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 1369, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1512, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1659, src: 'media/sfx_whoosh.mp3', vol: 0.33},
  {at: 1784, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 2436, src: 'media/sfx_impact.mp3', vol: 0.44},
  {at: 2647, src: 'media/sfx_impact.mp3', vol: 0.52},
  {at: 2747, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 2960, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 3024, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The number</span>
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
export const DebtReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('debt/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('debt/music.mp3')}
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
