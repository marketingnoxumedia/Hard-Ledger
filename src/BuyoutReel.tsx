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
// "The buyout" reel (BuyoutReel) — fast NEWS reel, Hard Ledger house format.
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
// (public/console/voiceover.mp3, NO inserted pause); music mixed at 0.17. 55 beats; built at +21% VO pace
// (the house +10% default plus a further +10% per client request on this reel) — ~111s.
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
  {dur: 90, kind: 'hook', reveal: [3, 60], text: 'The studio that made Mass Effect|didn’t die because its games stopped selling.', kicker: 'The buyout', highlights: [], size: 26, media: {src: 'buyout/bo00_office.mp4', type: 'video', effect: 'in'}},
  // 1
  {dur: 90, kind: 'text', reveal: [2, 28], text: 'It died because|of a loan.', highlights: ['loan.'], size: 48, media: {src: 'buyout/bo01_loandoc.jpg', type: 'img', effect: 'panL'}},
  // 2
  {dur: 90, kind: 'text', reveal: [2, 28], text: 'If you’ve ever played|Baldur’s Gate,', highlights: [], size: 34, media: {src: 'buyout/bo02_pad.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 90, kind: 'text', reveal: [2, 28], text: 'Knights of the|Old Republic,', highlights: [], size: 36, media: {src: 'buyout/bo03_keyboard.jpg', type: 'img', effect: 'panR'}},
  // 4
  {dur: 90, kind: 'text', reveal: [2, 28], text: 'Dragon Age,|any of them,', highlights: [], size: 40, media: {src: 'buyout/bo04_handheld.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 90, kind: 'text', reveal: [2, 28], text: 'this is the company|that made them.', highlights: [], size: 36, media: {src: 'buyout/bo05_devdesk.jpg', type: 'img', effect: 'panL'}},
  // 6
  {dur: 90, kind: 'text', reveal: [2], text: 'Thirty years.', highlights: ['Thirty'], size: 50, media: {src: 'buyout/bo06_cal.jpg', type: 'img', effect: 'in'}},
  // 7 BLACK
  {dur: 90, kind: 'impact', text: 'Gone on|a Tuesday.'},
  // 8
  {dur: 90, kind: 'text', reveal: [2, 28], text: 'I’ll show you exactly|what killed it.', highlights: ['killed'], size: 34, media: {src: 'buyout/bo08_mag.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 90, kind: 'text', reveal: [2, 40], text: 'If that’s worth a follow,|you know where the button is.', highlights: ['follow,'], size: 32, media: {src: 'buyout/bo09_phone.jpg', type: 'img', effect: 'panR'}},
  // 10
  {dur: 90, kind: 'text', reveal: [2, 40], text: 'Now, a publisher closing a studio|is nothing new.', highlights: [], size: 30, media: {src: 'buyout/bo10_closed.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 90, kind: 'text', reveal: [2, 28], enter: 'slideL', text: 'But this one|is different.', highlights: ['different.'], size: 48, media: {src: 'buyout/bo11_standout.jpg', type: 'img', effect: 'in'}},
  // 12 CARD 400
  {dur: 90, kind: 'stat', stat: {pre: 'JOBS ACROSS EA', value: 400}, media: {src: 'buyout/bo12_chairs.jpg', type: 'img', effect: 'in'}},
  // 13 CARD 3%
  {dur: 90, kind: 'stat', stat: {pre: 'ABOUT', value: 3, suffix: '%', post: 'OF THE COMPANY'}, media: {src: 'buyout/bo13_fraction.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 90, kind: 'text', reveal: [2, 40], text: 'Because the next Mass Effect|is cancelled with it.', highlights: ['cancelled'], size: 32, media: {src: 'buyout/bo14_cancelled.jpg', type: 'img', effect: 'panR'}},
  // 15
  {dur: 90, kind: 'text', reveal: [2, 28], text: 'And because it comes|one year after', highlights: [], size: 36, media: {src: 'buyout/bo15_oneyear.jpg', type: 'img', effect: 'in'}},
  // 16 CARD $55B
  {dur: 90, kind: 'stat', stat: {pre: 'EA BOUGHT OUT FOR', prefix: '$', value: 55, suffix: 'B'}, media: {src: 'buyout/bo16_cash.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 90, kind: 'text', reveal: [2, 28], text: 'Look at how|that deal was built.', highlights: [], size: 40, media: {src: 'buyout/bo17_blueprint.jpg', type: 'img', effect: 'panL'}},
  // 18
  {dur: 90, kind: 'text', reveal: [2, 40], text: 'Buyers: Saudi Arabia’s|sovereign fund,', highlights: [], size: 34, media: {src: 'buyout/bo18_vault.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 90, kind: 'text', reveal: [2, 28], text: 'Silver Lake,|Affinity.', highlights: [], size: 44, media: {src: 'buyout/bo19_towers.jpg', type: 'img', effect: 'panR'}},
  // 20
  {dur: 90, kind: 'text', reveal: [2, 28], text: 'Price:|$55 billion.', highlights: [], size: 44, media: {src: 'buyout/bo20_bills.jpg', type: 'img', effect: 'in'}},
  // 21 CARD $20B
  {dur: 90, kind: 'stat', stat: {pre: 'BORROWED TO PAY FOR IT', prefix: '$', value: 20, suffix: 'B'}, media: {src: 'buyout/bo21_debt.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 90, kind: 'text', reveal: [2], text: 'Junk-rated.', highlights: ['Junk-rated.'], size: 56, media: {src: 'buyout/bo22_downgrade.jpg', type: 'img', effect: 'panL'}},
  // 23
  {dur: 90, kind: 'text', reveal: [2, 40], text: 'The debt now sits on|EA’s books, not the buyers’.', highlights: [], size: 30, media: {src: 'buyout/bo23_books.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 90, kind: 'text', reveal: [2, 28], text: 'And the problem|doesn’t stop there.', highlights: ['problem'], size: 44, media: {src: 'buyout/bo24_warning.jpg', type: 'img', effect: 'in'}},
  // 25 CARD $2-2.5B
  {dur: 90, kind: 'lines', reveal: [0, 24], text: '$2–2.5 BILLION|IN CASH A YEAR', highlights: ['$2–2.5'], media: {src: 'buyout/bo25_cashflow.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 90, kind: 'text', reveal: [2, 28], text: 'Junk debt|costs real interest.', highlights: ['interest.'], size: 40, media: {src: 'buyout/bo26_interest.jpg', type: 'img', effect: 'panR'}},
  // 27
  {dur: 90, kind: 'text', reveal: [2, 40], text: 'A big share of that cash now goes|out the door to lenders', highlights: ['lenders'], size: 30, media: {src: 'buyout/bo27_outflow.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 90, kind: 'text', reveal: [2, 28], text: 'before a single game|gets funded.', highlights: [], size: 38, media: {src: 'buyout/bo28_empty.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 90, kind: 'text', reveal: [2, 40], text: 'Normally you’d expect a buyer|to invest in the thing they bought.', highlights: [], size: 28, media: {src: 'buyout/bo29_growth.jpg', type: 'img', effect: 'panL'}},
  // 30
  {dur: 90, kind: 'text', reveal: [2, 28], text: 'A leveraged buyout|works the other way.', highlights: ['way.'], size: 40, media: {src: 'buyout/bo30_reverse.jpg', type: 'img', effect: 'in'}},
  // 31 BLACK
  {dur: 90, kind: 'impact', text: 'The company pays|for its own purchase.'},
  // 32
  {dur: 90, kind: 'text', reveal: [2, 28], text: 'And when the maths|gets tight,', highlights: ['tight,'], size: 42, media: {src: 'buyout/bo32_vice.jpg', type: 'img', effect: 'panR'}},
  // 33
  {dur: 90, kind: 'text', reveal: [2, 40], text: 'the first things cut are the slow,|expensive, single-player studios.', highlights: ['cut'], size: 28, media: {src: 'buyout/bo33_cut.jpg', type: 'img', effect: 'in'}},
  // 34
  {dur: 90, kind: 'text', reveal: [2, 40], text: 'One analyst called BioWare the most|exposed name on the list, a year ago.', highlights: ['exposed'], size: 26, media: {src: 'buyout/bo34_exposed.jpg', type: 'img', effect: 'in'}},
  // 35
  {dur: 90, kind: 'text', reveal: [2], text: 'Is Motive next?', highlights: ['next?'], size: 48, media: {src: 'buyout/bo35_dominoes.jpg', type: 'img', effect: 'panL'}},
  // 36
  {dur: 90, kind: 'text', reveal: [2, 28], text: 'That same analyst|named it.', highlights: [], size: 40, media: {src: 'buyout/bo36_named.jpg', type: 'img', effect: 'in'}},
  // 37
  {dur: 90, kind: 'text', reveal: [2, 28], text: 'Does the next Sims|project survive?', highlights: ['survive?'], size: 36, media: {src: 'buyout/bo37_house.jpg', type: 'img', effect: 'in'}},
  // 38
  {dur: 90, kind: 'text', reveal: [2, 28], text: 'One version was just|cancelled too.', highlights: ['cancelled'], size: 38, media: {src: 'buyout/bo38_cancelled2.jpg', type: 'img', effect: 'panR'}},
  // 39
  {dur: 90, kind: 'text', reveal: [2], text: 'Thirty-plus years.', highlights: ['Thirty-plus'], size: 46, media: {src: 'buyout/bo39_clock.jpg', type: 'img', effect: 'in'}},
  // 40
  {dur: 90, kind: 'text', reveal: [2], text: 'Six franchises.', highlights: ['Six'], size: 50, media: {src: 'buyout/bo40_six.jpg', type: 'img', effect: 'panL'}},
  // 41
  {dur: 90, kind: 'text', reveal: [2, 28], text: 'Fifty people|in Edmonton.', highlights: ['Fifty'], size: 42, media: {src: 'buyout/bo41_crowd.jpg', type: 'img', effect: 'in'}},
  // 42
  {dur: 90, kind: 'text', reveal: [2, 28], text: 'Four hundred|across the company.', highlights: ['Four hundred'], size: 40, media: {src: 'buyout/bo42_dots.jpg', type: 'img', effect: 'in'}},
  // 43
  {dur: 90, kind: 'text', reveal: [2, 40], text: 'And a loan that’s still there|in the morning.', highlights: ['loan'], size: 32, media: {src: 'buyout/bo43_sunrise.jpg', type: 'img', effect: 'panL'}},
  // 44
  {dur: 90, kind: 'text', reveal: [2], text: 'So you tell me.', highlights: ['you'], size: 50, media: {src: 'buyout/bo44_point.jpg', type: 'img', effect: 'in'}},
  // 45 RED
  {dur: 90, kind: 'impact', redBg: true, text: 'Did EA kill BioWare,|or did the buyout?'},
  // 46 CTA
  {dur: 90, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Pick a side|below.', highlights: ['side'], size: 48, media: {src: 'buyout/bo46_fork.mp4', type: 'video', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The buyout</span>
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
export const BuyoutReel: React.FC = () => {
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
