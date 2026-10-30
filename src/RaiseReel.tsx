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
// "The raise" reel (RaiseReel) — fast NEWS reel, Hard Ledger house format.
// TOPIC: the ~2026 US cost-of-living adjustment (COLA) — "twenty million Americans just got the biggest pay
// raise in four years, and almost none of them will feel it." Social Security / VA / military-retiree COLA.
// Thesis: the raise is ~3.6% (vs ~2.8% last year, ~2.5% the year before — the biggest jump since the 2022
// inflation spike). In dollars: a retiree on ~$2,500/mo gets ~+$90, a veteran on ~$1,500 VA gets ~+$54, the
// average Social Security cheque ~+$75. The twist: the COLA isn't a reward, it's a thermometer — it's set
// by how much prices already rose, so a bigger raise just means prices rose faster; the cheque is catching
// up to the bill, designed to leave you exactly where you were. If your rent/groceries/insurance rose
// faster than 3.6%, the raise is a cut. It lands in January (notices late November) and disappears into the
// same prices that created it. Binary close ("Is a 3.6% raise good news, or a receipt for a bad year? Pick
// a side below."). QUESTION/STORY/ANSWER/CTA with NO post-hook pause (the claim flows straight into the
// personal beat), and a mid-reel like+follow ask.
// 38 beats: 35 media (incl. 5 number cards: 3.6% this year; 2.8% last year / 2.5% the year before; retiree
// $2,500/mo -> +$90; veteran $1,500 VA -> +$54; avg SS cheque +$75) / 1 red impact ("or a receipt|for a bad
// year?") / 2 black ("It's a|thermometer." / "Prices rose|faster."). Captions match the VO verbatim (except
// the number cards; spoken figures as numerals). Durations/reveals/SFX locked to the VO via a scribe_v1
// word-timestamp anchor pass (public/raise/voiceover.mp3, NO inserted pause); music mixed at 0.17.
// NB: OWN distinct footage under public/raise/, NO reuse of any other reel's clips.
// FOOTAGE is FACE-FREE, FLAG-FREE and SEAL-FREE — generic benefits / seniors / money / prices b-roll shown
// without faces (hands, backs, objects): a crowd, cash and cheques (US bills edge-on/backs/bundles — NO
// banknote portraits), a benefits envelope, dog tags / a folded cap (NO flag or unit insignia), a calendar,
// price tags, a grocery receipt, a thermometer, a treadmill, a mailbox, a forked road. NO US government
// SEALS or logos (Social Security Administration / VA / IRS / Treasury), NO company logos, NO identifiable
// faces, NO flags, NO military insignia, NO banknote portraits, NO foreign text or currency.
// **UNVERIFIED — asserts specific, checkable figures about the US COLA; render as written but FACT-CHECK
// against primary sources (SSA/VA) before publishing:** the "~20 million" affected and "biggest raise in
// four years"; the ~3.6% / ~2.8% / ~2.5% COLA rates and "biggest jump since the 2022 spike"; the
// $2,500->+$90, $1,500->+$54 and avg-cheque ~+$75 dollar examples; and the January-lands / late-November-
// notices timing. The "thermometer / receipt for a bad year" framing is editorial analysis.
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK a (no post-hook pause)
  {dur: 115, kind: 'hook', reveal: [3, 40], text: 'Twenty million Americans|got the biggest pay raise', kicker: 'The raise', highlights: [], size: 36, media: {src: 'raise/ra00_crowd.mp4', type: 'video', effect: 'in'}},
  // 1 HOOK b
  {dur: 40, kind: 'text', reveal: [2], text: 'in four years.', highlights: ['four'], size: 52, media: {src: 'raise/ra01_raise.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 72, kind: 'text', reveal: [2, 28], text: 'And almost none of them|will feel it.', highlights: ['feel'], size: 42, media: {src: 'raise/ra02_emptyhands.jpg', type: 'img', effect: 'panL'}},
  // 3 make it personal
  {dur: 80, kind: 'text', reveal: [2, 40], text: 'If you’re a military retiree,|a disabled veteran,', highlights: [], size: 34, media: {src: 'raise/ra03_boots.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 100, kind: 'text', reveal: [2, 40], text: 'or on Social Security,|this is your money.', highlights: ['money.'], size: 36, media: {src: 'raise/ra04_card.jpg', type: 'img', effect: 'panR'}},
  // 5
  {dur: 74, kind: 'text', reveal: [2, 40], text: 'And by the time it lands,|it’s already spent.', highlights: ['spent.'], size: 36, media: {src: 'raise/ra05_wallet.jpg', type: 'img', effect: 'in'}},
  // 6 promise
  {dur: 47, kind: 'text', reveal: [2, 28], text: 'I’ll show you exactly|where it goes.', highlights: ['goes.'], size: 40, media: {src: 'raise/ra06_breakdown.jpg', type: 'img', effect: 'panL'}},
  // 7 ask
  {dur: 83, kind: 'text', reveal: [2, 40], text: 'But first, like the video|and make sure to follow.', highlights: ['follow.'], size: 36, media: {src: 'raise/ra07_phone.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 126, kind: 'text', reveal: [2, 40], text: 'Now, a cost-of-living bump|every January is nothing new.', highlights: [], size: 34, media: {src: 'raise/ra08_thermostat.jpg', type: 'img', effect: 'panL'}},
  // 9
  {dur: 42, kind: 'text', reveal: [2, 28], enter: 'slideL', text: 'But this one|is different.', highlights: ['different.'], size: 48, media: {src: 'raise/ra09_standout.jpg', type: 'img', effect: 'in'}},
  // 10 CARD 3.6%
  {dur: 65, kind: 'stat', stat: {pre: 'THIS YEAR’S RAISE', value: 3.6, decimals: 1, suffix: '%'}, media: {src: 'raise/ra10_percent.jpg', type: 'img', effect: 'in'}},
  // 11 CARD 2.8% / 2.5%
  {dur: 133, kind: 'lines', reveal: [0, 22], text: 'LAST YEAR: 2.8%|YEAR BEFORE: 2.5%', highlights: ['2.5%'], media: {src: 'raise/ra11_bars.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 148, kind: 'text', reveal: [2, 40], text: 'And because it’s the biggest jump|since the inflation spike of 2022.', highlights: ['2022.'], size: 30, media: {src: 'raise/ra12_spike.jpg', type: 'img', effect: 'panR'}},
  // 13
  {dur: 60, kind: 'text', reveal: [2, 28], enter: 'slideUp', text: 'Look at|the actual numbers.', highlights: ['numbers.'], size: 46, media: {src: 'raise/ra13_ledger.jpg', type: 'img', effect: 'in'}},
  // 14 CARD retiree
  {dur: 168, kind: 'lines', reveal: [0, 22], text: 'RETIREE ON $2,500/MO|GETS ABOUT +$90', highlights: ['+$90'], media: {src: 'raise/ra14_hands.jpg', type: 'img', effect: 'in'}},
  // 15 CARD veteran
  {dur: 123, kind: 'lines', reveal: [0, 22], text: 'VETERAN ON $1,500 VA|GETS ABOUT +$54', highlights: ['+$54'], media: {src: 'raise/ra15_veteran.jpg', type: 'img', effect: 'in'}},
  // 16 CARD avg cheque
  {dur: 102, kind: 'stat', stat: {pre: 'AVG SOCIAL SECURITY CHEQUE', prefix: '+$', value: 75}, media: {src: 'raise/ra16_cheque.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 62, kind: 'text', reveal: [2, 28], text: 'And the problem|doesn’t stop there.', highlights: ['problem'], size: 44, media: {src: 'raise/ra17_warning.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 71, kind: 'text', reveal: [2, 28], text: 'That 3.6%|isn’t a reward.', highlights: ['reward.'], size: 42, media: {src: 'raise/ra18_trophy.jpg', type: 'img', effect: 'panL'}},
  // 19 BLACK
  {dur: 32, kind: 'impact', text: 'It’s a|thermometer.'},
  // 20
  {dur: 92, kind: 'text', reveal: [2, 40], text: 'The raise is set by|how much prices went up.', highlights: ['prices'], size: 34, media: {src: 'raise/ra20_pricetags.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 67, kind: 'text', reveal: [2, 28], text: 'So a bigger raise|means one thing:', highlights: [], size: 40, media: {src: 'raise/ra21_arrow.jpg', type: 'img', effect: 'panR'}},
  // 22 BLACK
  {dur: 56, kind: 'impact', text: 'Prices rose|faster.'},
  // 23
  {dur: 77, kind: 'text', reveal: [2, 40], enter: 'slideR', text: 'The cheque is just|catching up to the bill.', highlights: ['bill.'], size: 36, media: {src: 'raise/ra23_bills.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 86, kind: 'text', reveal: [2, 40], text: 'Normally you’d expect a raise|to leave you ahead.', highlights: ['ahead.'], size: 34, media: {src: 'raise/ra24_finish.jpg', type: 'img', effect: 'panL'}},
  // 25
  {dur: 122, kind: 'text', reveal: [2, 40, 80], text: 'But this one is designed|to leave you exactly|where you were.', highlights: ['exactly'], size: 32, media: {src: 'raise/ra25_treadmill.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 31, kind: 'text', reveal: [2, 28], text: 'That’s the whole|point of it.', highlights: ['point'], size: 44, media: {src: 'raise/ra26_bullseye.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 100, kind: 'text', reveal: [2, 40], text: 'And the strange part is that|nobody announces it that way.', highlights: ['nobody'], size: 32, media: {src: 'raise/ra27_fineprint.jpg', type: 'img', effect: 'panR'}},
  // 28
  {dur: 107, kind: 'text', reveal: [2, 28], text: 'Does your rent go up|3.6%, or more?', highlights: ['3.6%,'], size: 38, media: {src: 'raise/ra28_apartment.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 47, kind: 'text', reveal: [2, 28], text: 'Your groceries?|Your insurance?', highlights: [], size: 44, media: {src: 'raise/ra29_cart.jpg', type: 'img', effect: 'panL'}},
  // 30
  {dur: 75, kind: 'text', reveal: [2, 40], text: 'Because if they went up faster,|the raise is a cut.', highlights: ['cut.'], size: 34, media: {src: 'raise/ra30_scissors.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 34, kind: 'text', reveal: [2, 28], enter: 'slideUp', text: 'It lands|in January.', highlights: ['January.'], size: 46, media: {src: 'raise/ra31_january.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 55, kind: 'text', reveal: [2, 28], text: 'Notices go out|in late November.', highlights: ['November.'], size: 40, media: {src: 'raise/ra32_mailbox.jpg', type: 'img', effect: 'panR'}},
  // 33
  {dur: 132, kind: 'text', reveal: [2, 40, 80], text: 'And the raise disappears|into the same prices|that created it.', highlights: ['disappears'], size: 32, media: {src: 'raise/ra33_coins.jpg', type: 'img', effect: 'in'}},
  // 34
  {dur: 24, kind: 'text', reveal: [2], text: 'So you tell me.', highlights: ['you'], size: 50, media: {src: 'raise/ra34_point.jpg', type: 'img', effect: 'panL'}},
  // 35
  {dur: 76, kind: 'text', reveal: [2, 28], text: 'Is a 3.6% raise|good news,', highlights: ['good'], size: 42, media: {src: 'raise/ra35_question.jpg', type: 'img', effect: 'in'}},
  // 36 RED impact
  {dur: 45, kind: 'impact', redBg: true, text: 'or a receipt|for a bad year?'},
  // 37 CTA
  {dur: 36, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Pick a side|below.', highlights: ['side'], size: 48, media: {src: 'raise/ra37_fork.mp4', type: 'video', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 737, src: 'media/sfx_whoosh.mp3', vol: 0.33},
  {at: 779, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 844, src: 'media/sfx_impact.mp3', vol: 0.44},
  {at: 1125, src: 'media/sfx_whoosh.mp3', vol: 0.33},
  {at: 1185, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1353, src: 'media/sfx_impact.mp3', vol: 0.44},
  {at: 1476, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1711, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 1902, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 1958, src: 'media/sfx_whoosh.mp3', vol: 0.33},
  {at: 2603, src: 'media/sfx_whoosh.mp3', vol: 0.33},
  {at: 2924, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 2969, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The raise</span>
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
export const RaiseReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('raise/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('raise/music.mp3')}
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
