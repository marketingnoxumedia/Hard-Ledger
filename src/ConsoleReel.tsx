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
// "The console" reel (ConsoleReel) — fast NEWS reel, Hard Ledger house format.
// TOPIC: the next Xbox ("Helix") could cost $1,200-$1,800 to build, and Microsoft is reportedly building
// buy-now-pay-later financing into its own store — console prices have outrun the paycheque.
// Thesis: the next Xbox could cost more than a used car, and Microsoft already knows you can't afford it,
// because it's building the financing. A Series X was $499 at launch; the next, per Microsoft's own internal
// numbers, could be ~3x that. It's codenamed Helix, targeted for Christmas 2028; the internal projection is
// $1,200-$1,800 BEFORE any subsidy (i.e. the build-and-ship cost). The ladder: Series X $499 at launch, up to
// $150 more after this year's rise; Sony's next machine reportedly >$680 per console in memory+storage ALONE
// (before chip, case, controller). Microsoft has started offering BNPL on consoles through its own store —
// when the maker adds instalments to a games machine, the price has outrun the paycheque. The twist: normally
// the console is the loss-leader and games carry it; here the hardware can't be subsidised enough to hide the
// cost, so Game Pass is being rebuilt a la carte (pay for cloud, pay for multiplayer) — the console gets
// dearer and the subscription gets sliced. Open questions: does Microsoft eat part of the cost (Fortune: only
// if it chooses to)? does the chip shortage ease by 2028 (nobody's promising)? Outcome: a handheld in 2027,
// Helix in 2028, $1,200-$1,800, and one analyst's line: "north of a grand is the floor." Binary close ("Would
// you pay $1,800 for a console, or is this the generation you switch to PC? Pick a side below."). QUESTION/
// STORY/ANSWER/CTA, NO post-hook pause, mid-reel like+follow ask.
// Number-heavy: card figures $499 / 2028 / $1,200 / $1,800 / $150 / $680. Captions match the VO verbatim
// (except the number cards; spoken figures as numerals; USD is the native currency here, not foreign).
// Durations/reveals/SFX locked to the VO via a scribe_v1 word-timestamp anchor pass
// (public/console/voiceover.mp3, NO inserted pause); music mixed at 0.17. Built at the house +10% pacing default.
// NB: A/B TWIN of the existing BillReel ("The bill": PS6 memory costs more than a whole PS5) — SAME console-
// pricing/memory-squeeze thesis, Xbox angle. OWN distinct footage under public/console/, NO reuse of ANY other
// reel's clips, ESPECIALLY NOT BillReel's (bill/) chip/console/datacenter footage — ledger-checked.
// FOOTAGE is BRAND-FREE, FACE-FREE and LANDMARK-FREE — generic gaming / retail / money / financing b-roll: an
// UNBRANDED/retro game controller or joystick (NO Xbox/PlayStation/Nintendo controller shapes or logos), a
// generic TV/screen, price tags, a credit card / instalment / POS terminal, an empty wallet, coins, a receipt,
// a "SOLD OUT" tag, a ladder/steps (the price ladder), a handheld-ish generic device, a subscription/sliced
// motif. **NO Xbox / PlayStation / Nintendo / Microsoft / Sony / Game Pass / PS Plus logos, wordmarks, console
// or controller designs or product shots; NO store/brand logos; NO banknote portraits (US bills shown as backs/
// edges only); NO identifiable faces; NO flags; NO identifiable landmarks; NO military.**
// **UNVERIFIED / SENSITIVE / SPECULATIVE — the whole premise is leaks and internal projections about UNANNOUNCED
// hardware and names real companies (Microsoft, Xbox, Sony/PlayStation); rendered as written but MUST be
// fact-checked / clearly framed as rumour before publishing:** the "Helix" codename and Christmas 2028 target;
// the $1,200-$1,800 internal projection and "before any subsidy"; "3x" the $499 Series X; the $150 rise; Sony
// ">$680 memory+storage per console"; "Microsoft BNPL on consoles"; "Game Pass rebuilt a la carte"; the Fortune
// attribution; "handheld in 2027"; and the "north of a grand is the floor" analyst quote. The "building the
// financing / outrun the paycheque" framing is editorial analysis.
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 100, kind: 'hook', reveal: [3, 40], text: 'The next Xbox could cost|more than a used car.', kicker: 'The console', highlights: ['car.'], size: 36, media: {src: 'console/cn00_controller.mp4', type: 'video', effect: 'in'}},
  // 1
  {dur: 81, kind: 'text', reveal: [2, 40], text: 'And Microsoft already knows|you can’t afford it,', highlights: [], size: 34, media: {src: 'console/cn01_emptywallet.jpg', type: 'img', effect: 'panL'}},
  // 2
  {dur: 72, kind: 'text', reveal: [2, 28], text: 'because it’s building|the financing.', highlights: ['financing.'], size: 42, media: {src: 'console/cn02_creditcard.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 86, kind: 'text', reveal: [2, 40], text: 'If you bought a Series X|at launch, you paid', highlights: [], size: 34, media: {src: 'console/cn03_consolebox.jpg', type: 'img', effect: 'panR'}},
  // 4 CARD $499
  {dur: 69, kind: 'stat', stat: {pre: 'SERIES X AT LAUNCH', prefix: '$', value: 499}, media: {src: 'console/cn04_pricetag.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 102, kind: 'text', reveal: [2, 40], text: 'The next one, according to Microsoft’s|own internal numbers,', highlights: [], size: 28, media: {src: 'console/cn05_documents.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 55, kind: 'text', reveal: [2], text: 'could be three times that.', highlights: ['three'], size: 42, media: {src: 'console/cn06_stack.jpg', type: 'img', effect: 'panL'}},
  // 7
  {dur: 93, kind: 'text', reveal: [2, 40], text: 'I’ll show you exactly how|a games console got to that price.', highlights: ['price.'], size: 32, media: {src: 'console/cn07_teardown.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 87, kind: 'text', reveal: [2, 40], text: 'But first, like the video|and make sure to follow.', highlights: ['follow.'], size: 36, media: {src: 'console/cn08_phone.jpg', type: 'img', effect: 'panR'}},
  // 9
  {dur: 82, kind: 'text', reveal: [2, 28], text: 'Now, console prices creeping up|is nothing new.', highlights: [], size: 32, media: {src: 'console/cn09_pricecreep.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 68, kind: 'text', reveal: [2, 28], enter: 'slideL', text: 'But this one|is different.', highlights: ['different.'], size: 48, media: {src: 'console/cn10_standout.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 49, kind: 'text', reveal: [2, 28], text: 'Because it’s codenamed Helix,', highlights: ['Helix,'], size: 38, media: {src: 'console/cn11_blueprint.jpg', type: 'img', effect: 'panL'}},
  // 12 CARD 2028
  {dur: 79, kind: 'lines', reveal: [0, 22], text: 'TARGETED FOR|CHRISTMAS 2028', highlights: ['2028'], media: {src: 'console/cn12_calendar.jpg', type: 'img', effect: 'in'}},
  // 13 CARD $1200
  {dur: 81, kind: 'stat', stat: {pre: 'INTERNAL PROJECTION', prefix: '$', value: 1200}, media: {src: 'console/cn13_cash.jpg', type: 'img', effect: 'in'}},
  // 14 CARD $1800
  {dur: 56, kind: 'stat', stat: {pre: 'TO', prefix: '$', value: 1800}, media: {src: 'console/cn14_cashstack.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 86, kind: 'text', reveal: [2, 40], text: 'And because that’s the number|before any subsidy,', highlights: ['subsidy,'], size: 32, media: {src: 'console/cn15_nodiscount.jpg', type: 'img', effect: 'panR'}},
  // 16
  {dur: 81, kind: 'text', reveal: [2, 40], text: 'which means that’s what it|costs to build and ship.', highlights: ['ship.'], size: 32, media: {src: 'console/cn16_assembly.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 31, kind: 'text', reveal: [2], enter: 'slideUp', text: 'Look at the ladder.', highlights: ['ladder.'], size: 48, media: {src: 'console/cn17_ladder.jpg', type: 'img', effect: 'in'}},
  // 18 CARD $499b
  {dur: 101, kind: 'stat', stat: {pre: 'SERIES X AT LAUNCH', prefix: '$', value: 499}, media: {src: 'console/cn18_pricetag2.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 39, kind: 'text', reveal: [2, 28], text: 'After this year’s rise:', highlights: [], size: 40, media: {src: 'console/cn19_rise.jpg', type: 'img', effect: 'panL'}},
  // 20 CARD $150
  {dur: 72, kind: 'stat', stat: {pre: 'UP TO', prefix: '$', value: 150, post: 'MORE'}, media: {src: 'console/cn20_coins.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 121, kind: 'text', reveal: [2, 40], text: 'Then Sony’s next machine:|memory and storage alone,', highlights: [], size: 32, media: {src: 'console/cn21_memory.jpg', type: 'img', effect: 'in'}},
  // 22 CARD $680
  {dur: 101, kind: 'stat', stat: {pre: 'MEMORY + STORAGE ALONE · OVER', prefix: '$', value: 680, post: 'PER CONSOLE'}, media: {src: 'console/cn22_ram.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 81, kind: 'text', reveal: [2, 40, 80], text: 'Before the chip.|Before the case.|Before the controller.', highlights: [], size: 36, media: {src: 'console/cn23_components.jpg', type: 'img', effect: 'panR'}},
  // 24
  {dur: 63, kind: 'text', reveal: [2, 28], text: 'And the problem|doesn’t stop there.', highlights: ['problem'], size: 44, media: {src: 'console/cn24_warning.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 146, kind: 'text', reveal: [2, 40], text: 'Microsoft has started offering|buy now, pay later on consoles', highlights: ['pay later'], size: 30, media: {src: 'console/cn25_bnpl.jpg', type: 'img', effect: 'panL'}},
  // 26
  {dur: 40, kind: 'text', reveal: [2, 28], text: 'through its|own store.', highlights: ['store.'], size: 42, media: {src: 'console/cn26_checkout.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 104, kind: 'text', reveal: [2, 40], text: 'When the manufacturer adds|instalments to a games machine,', highlights: ['instalments'], size: 30, media: {src: 'console/cn27_instalments.jpg', type: 'img', effect: 'panR'}},
  // 28
  {dur: 91, kind: 'text', reveal: [2, 40], text: 'it’s telling you the price|has outrun the paycheque.', highlights: ['paycheque.'], size: 32, media: {src: 'console/cn28_paycheque.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 87, kind: 'text', reveal: [2, 40], text: 'Normally you’d expect the console|to be the loss leader', highlights: ['loss leader'], size: 30, media: {src: 'console/cn29_lossleader.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 41, kind: 'text', reveal: [2, 28], text: 'and the games|to carry it.', highlights: [], size: 42, media: {src: 'console/cn30_games.jpg', type: 'img', effect: 'panL'}},
  // 31
  {dur: 117, kind: 'text', reveal: [2, 40], text: 'Here the hardware can’t be|subsidised enough to hide the cost.', highlights: ['cost.'], size: 30, media: {src: 'console/cn31_hardware.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 62, kind: 'text', reveal: [2, 28], text: 'So Game Pass|is being rebuilt too:', highlights: ['rebuilt'], size: 38, media: {src: 'console/cn32_subscription.jpg', type: 'img', effect: 'panR'}},
  // 33
  {dur: 80, kind: 'text', reveal: [2, 40], text: 'pay for cloud, pay for multiplayer,|à la carte.', highlights: ['à la carte.'], size: 34, media: {src: 'console/cn33_alacarte.jpg', type: 'img', effect: 'in'}},
  // 34
  {dur: 113, kind: 'text', reveal: [2, 40], text: 'The console gets dearer|and the subscription gets sliced.', highlights: ['sliced.'], size: 32, media: {src: 'console/cn34_sliced.jpg', type: 'img', effect: 'in'}},
  // 35
  {dur: 78, kind: 'text', reveal: [2, 40], text: 'Does Microsoft eat|part of the cost?', highlights: ['cost?'], size: 38, media: {src: 'console/cn35_question.jpg', type: 'img', effect: 'panL'}},
  // 36
  {dur: 78, kind: 'text', reveal: [2, 40], text: 'Fortune says only|if it chooses to.', highlights: ['chooses'], size: 38, media: {src: 'console/cn36_choice.jpg', type: 'img', effect: 'in'}},
  // 37
  {dur: 83, kind: 'text', reveal: [2, 40], text: 'Does the chip shortage|ease by 2028?', highlights: ['2028?'], size: 36, media: {src: 'console/cn37_chipshortage.jpg', type: 'img', effect: 'panR'}},
  // 38 BLACK
  {dur: 40, kind: 'impact', text: 'Nobody’s|promising that.'},
  // 39
  {dur: 62, kind: 'text', reveal: [2], text: 'A handheld in 2027.', highlights: ['2027.'], size: 46, media: {src: 'console/cn39_handheld.jpg', type: 'img', effect: 'in'}},
  // 40
  {dur: 51, kind: 'text', reveal: [2], text: 'Helix in 2028.', highlights: ['2028.'], size: 50, media: {src: 'console/cn40_helix.jpg', type: 'img', effect: 'panL'}},
  // 41 CARD recap
  {dur: 76, kind: 'lines', reveal: [0, 24], text: 'HELIX · 2028|$1,200 – $1,800', highlights: ['$1,200'], media: {src: 'console/cn41_recapbg.jpg', type: 'img', effect: 'in'}},
  // 42
  {dur: 86, kind: 'text', reveal: [2, 40], text: 'And one analyst’s line|from earlier this year:', highlights: [], size: 34, media: {src: 'console/cn42_analyst.jpg', type: 'img', effect: 'in'}},
  // 43 BLACK
  {dur: 73, kind: 'impact', text: '“North of a grand|is the floor.”'},
  // 44
  {dur: 31, kind: 'text', reveal: [2], text: 'So you tell me.', highlights: ['you'], size: 50, media: {src: 'console/cn44_handpoint.jpg', type: 'img', effect: 'in'}},
  // 45 RED
  {dur: 160, kind: 'impact', redBg: true, text: 'Would you pay $1,800|for a console, or is this|the generation you switch to PC?'},
  // 46 CTA
  {dur: 38, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Pick a side|below.', highlights: ['side'], size: 48, media: {src: 'console/cn46_forked-road.mp4', type: 'video', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 339, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 827, src: 'media/sfx_whoosh.mp3', vol: 0.33},
  {at: 944, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1023, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 1104, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 1328, src: 'media/sfx_whoosh.mp3', vol: 0.33},
  {at: 1359, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1499, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1692, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 3057, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 3159, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 3285, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 3466, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 3636, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The console</span>
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
export const ConsoleReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('console/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('console/music.mp3')}
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
