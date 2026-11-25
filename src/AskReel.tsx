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
// "The ask" reel (AskReel) — fast NEWS reel, Hard Ledger house format.
// TOPIC: why America's highest-paid airline CEO is calling for an inheritance tax of nearly 100%.
// Thesis: Scott Kirby (United) was paid ~$32.3M last year, the most of any US airline boss; in the NYT he
// calls inequality a danger and wants a national wealth tax and inheritance taxes near 100% ("I would pay
// them"). But the two taxes he picked are telling: a WEALTH tax hits what you HOLD, an INHERITANCE tax
// hits what you LEAVE — neither touches what you EARN this year, so a $32M salary is untouched; the only
// way to dodge both is to SPEND while alive. United's growth strategy is premium (Polaris, first-class
// suites, caviar) — the customer who spends down a fortune rather than passing it on is its best customer,
// so a regime that punishes saving/inheriting rewards buying a lie-flat seat. Payoff: he may mean every
// word, but the taxes a man on $32M volunteered for are the two that don't touch the $32M and nudge the
// rich toward what his airline sells; sincere and self-interested aren't opposites — in business they
// travel together, in first class. Also: he was fired by American (promised the top job in 2016, then let
// go), took ~$13M severance, phoned a United board member the same day, and spent a decade building the
// rival. Full QUESTION/STORY/ANSWER/CTA with a ~1.1s post-hook pause; close is the CTA question + comment
// ask ("Would you trust a CEO who asks to be taxed? Tell me below."). 41 beats: 38 media (incl. 4 cards:
// KIRBY PAY $32.3M / WANTS WEALTH + ~100% INHERITANCE; FIRED BY AMERICAN 2016 / $13M SEVERANCE / NOW RUNS
// THE RIVAL; WEALTH TAX ASSETS / INHERITANCE ESTATES / SALARY UNTOUCHED; SPEND IT DON'T LEAVE IT ->
// PREMIUM CABINS) / 1 red impact ("In first class.") / 2 black. Captions match the VO verbatim (except the
// stylized cards; spoken figures as numerals). Durations/reveals/SFX locked to the VO via a scribe_v1
// word-timestamp anchor pass (public/ask/voiceover.mp3).
// NB: OWN distinct footage under public/ask/, NO reuse of any other reel's clips.
// FOOTAGE is BRAND-FREE and FACE-FREE — generic travel / luxury / finance / legal b-roll: unmarked jets /
// cabins / lie-flat seats / caviar / champagne, money, mansions/estates, wills, tax forms, boardrooms, a
// gavel, a safe, luxury goods, scales. NO airline LOGOS or LIVERIES (no tail-logo planes), NO identifiable
// faces/politicians, NO newspaper masthead, NO "Polaris"/brand wordmarks, NO flags, NO foreign text.
// **UNVERIFIED / SENSITIVE — names a real living executive (Scott Kirby) and attributes views/figures to
// him and to United/American; render as written but FACT-CHECK before publishing:** the ~$32.3M pay and
// "highest-paid US airline boss"; the NYT wealth-tax / ~100% inheritance-tax remarks and "I would pay
// them"; the 2016 American firing, ~$13M severance, "phoned a United board member the same day" and
// decade-building-the-rival narrative; and the premium-cabin / "best customer" framing, which is editorial
// analysis.
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK (held through ~1.1s post-hook pause)
  {dur: 229, kind: 'hook', reveal: [3, 50, 98, 145], text: 'Why is America’s|highest-paid airline CEO|calling for an inheritance tax|of nearly 100%?', kicker: 'The ask', highlights: ['100%?'], size: 31, media: {src: 'ask/ak00_jet.mp4', type: 'video', effect: 'in'}},
  // 1
  {dur: 54, kind: 'text', reveal: [2, 26], text: 'Scott Kirby,|United Airlines.', highlights: ['Kirby,'], size: 44, media: {src: 'ask/ak01_office.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 112, kind: 'text', reveal: [2, 40], text: 'Total pay last year:|32.3 million dollars.', highlights: ['32.3'], size: 38, media: {src: 'ask/ak02_money.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 79, kind: 'text', reveal: [2, 40], text: 'More than any|airline boss in America.', highlights: ['any'], size: 38, media: {src: 'ask/ak03_lectern.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 53, kind: 'text', reveal: [2, 30], text: 'This weekend,|in the New York Times,', highlights: [], size: 38, media: {src: 'ask/ak04_newspaper.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 88, kind: 'text', reveal: [2, 40], text: 'he says inequality is|a danger to society.', highlights: ['danger'], size: 36, media: {src: 'ask/ak05_inequality.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 57, kind: 'text', reveal: [2, 26], text: 'He wants a|national wealth tax', highlights: ['wealth'], size: 40, media: {src: 'ask/ak06_taxform.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 136, kind: 'text', reveal: [2, 40], text: 'and inheritance taxes that|get close to 100%.', highlights: ['100%.'], size: 34, media: {src: 'ask/ak07_will.jpg', type: 'img', effect: 'in'}},
  // 8 CARD 1
  {dur: 53, kind: 'lines', reveal: [0, 16, 32, 48], text: 'KIRBY 2025 PAY:|$32.3M|WANTS: WEALTH TAX|+ ~100% INHERITANCE', highlights: ['$32.3M'], media: {src: 'ask/ak08_gavel.jpg', type: 'img', effect: 'in'}},
  // 9 BLACK
  {dur: 65, kind: 'text', reveal: [0, 0], text: 'But there’s one thing|most people overlook.', highlights: ['overlook.'], size: 46},
  // 10
  {dur: 53, kind: 'text', reveal: [2, 40], text: 'He’s been fired|for his trouble before.', highlights: ['fired'], size: 38, media: {src: 'ask/ak10_firedbox.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 100, kind: 'text', reveal: [2, 42], text: 'American Airlines promised him|the top job in 2016,', highlights: ['2016,'], size: 32, media: {src: 'ask/ak11_handshake.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 30, kind: 'text', reveal: [2], text: 'then let him go.', highlights: ['go.'], size: 48, media: {src: 'ask/ak12_exitdoor.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 48, kind: 'text', reveal: [2, 26], text: 'He calls it|a betrayal.', highlights: ['betrayal.'], size: 44, media: {src: 'ask/ak13_torn.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 74, kind: 'text', reveal: [2, 40], text: 'He took about 13 million|in severance,', highlights: ['13'], size: 36, media: {src: 'ask/ak14_cheque.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 64, kind: 'text', reveal: [2, 42], text: 'phoned a United board member|the same day,', highlights: ['same'], size: 34, media: {src: 'ask/ak15_phone.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 70, kind: 'text', reveal: [2, 40], text: 'and spent a decade|building the rival.', highlights: ['rival.'], size: 38, media: {src: 'ask/ak16_building.jpg', type: 'img', effect: 'in'}},
  // 17 CARD 2
  {dur: 123, kind: 'lines', reveal: [0, 16, 32, 48], text: 'FIRED BY AMERICAN:|2016|$13M SEVERANCE|NOW RUNS THE RIVAL', highlights: ['rival'], media: {src: 'ask/ak17_boardroom.jpg', type: 'img', effect: 'in'}},
  // 18 BLACK
  {dur: 55, kind: 'text', reveal: [0, 0], text: 'And this is where|things get interesting.', highlights: ['interesting.'], size: 46},
  // 19
  {dur: 86, kind: 'text', reveal: [2, 42], text: 'Look at what the two taxes|he picked actually hit.', highlights: ['two'], size: 34, media: {src: 'ask/ak19_twodocs.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 73, kind: 'text', reveal: [2, 30], text: 'A wealth tax hits|what you hold.', highlights: ['hold.'], size: 40, media: {src: 'ask/ak20_mansion.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 84, kind: 'text', reveal: [2, 40], text: 'An inheritance tax hits|what you leave behind.', highlights: ['leave'], size: 36, media: {src: 'ask/ak21_estate.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 96, kind: 'text', reveal: [2, 40], text: 'Neither touches|what you earn this year.', highlights: ['earn'], size: 38, media: {src: 'ask/ak22_paycheck.jpg', type: 'img', effect: 'in'}},
  // 23 CARD 3
  {dur: 63, kind: 'lines', reveal: [0, 16, 32, 48], text: 'WEALTH TAX: ASSETS|INHERITANCE TAX:|ESTATES|SALARY: UNTOUCHED', highlights: ['untouched'], media: {src: 'ask/ak23_ledger.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 121, kind: 'text', reveal: [2, 42, 82], text: 'The only way to dodge both|is to spend the money|while you’re alive.', highlights: ['spend'], size: 32, media: {src: 'ask/ak24_luxuryspend.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 52, kind: 'text', reveal: [2, 40], text: 'Now let me show|how to actually do this.', highlights: ['actually'], size: 42, media: {src: 'ask/ak25_diagram.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 68, kind: 'text', reveal: [2, 30], text: 'United’s growth|strategy is premium.', highlights: ['premium.'], size: 40, media: {src: 'ask/ak26_cabin.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 86, kind: 'text', reveal: [2, 40], text: 'Polaris business class.|First-class suites.', highlights: ['First-class'], size: 36, media: {src: 'ask/ak27_lieflat.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 53, kind: 'text', reveal: [2], text: 'Caviar on long-haul.', highlights: ['Caviar'], size: 46, media: {src: 'ask/ak28_caviar.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 109, kind: 'text', reveal: [2, 42, 82], text: 'The customer who spends down|a fortune rather than|passing it on', highlights: ['spends'], size: 32, media: {src: 'ask/ak29_luxurygoods.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 63, kind: 'text', reveal: [2], text: 'is United’s best customer.', highlights: ['best'], size: 40, media: {src: 'ask/ak30_seat.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 87, kind: 'text', reveal: [2, 42], text: 'A tax regime that punishes|saving and inheriting,', highlights: ['punishes'], size: 34, media: {src: 'ask/ak31_piggybank.jpg', type: 'img', effect: 'in'}},
  // 32 CARD 4
  {dur: 120, kind: 'lines', reveal: [0, 22, 44], text: 'SPEND IT,|DON’T LEAVE IT|→ PREMIUM CABINS', highlights: ['cabins'], media: {src: 'ask/ak32_firstclass.jpg', type: 'img', effect: 'in'}},
  // 33
  {dur: 68, kind: 'text', reveal: [2, 30], text: 'Kirby may well|mean every word.', highlights: [], size: 40, media: {src: 'ask/ak33_speech.jpg', type: 'img', effect: 'in'}},
  // 34
  {dur: 165, kind: 'text', reveal: [2, 42, 82], text: 'But notice which taxes|a man with 32 million a year|chose to volunteer for:', highlights: ['volunteer'], size: 30, media: {src: 'ask/ak34_signature.jpg', type: 'img', effect: 'in'}},
  // 35
  {dur: 67, kind: 'text', reveal: [2, 40], text: 'the two that don’t touch|the 32 million,', highlights: ['touch'], size: 38, media: {src: 'ask/ak35_safe.jpg', type: 'img', effect: 'in'}},
  // 36
  {dur: 136, kind: 'text', reveal: [2, 42, 82], text: 'and that nudge the rich|towards exactly|what his airline sells.', highlights: ['sells.'], size: 34, media: {src: 'ask/ak36_boardingpass.jpg', type: 'img', effect: 'in'}},
  // 37
  {dur: 94, kind: 'text', reveal: [2, 40], text: 'Sincere and self-interested|aren’t opposites.', highlights: ['opposites.'], size: 36, media: {src: 'ask/ak37_scales.jpg', type: 'img', effect: 'in'}},
  // 38
  {dur: 88, kind: 'text', reveal: [2, 40], text: 'In business, they|usually travel together.', highlights: ['together.'], size: 38, media: {src: 'ask/ak38_briefcase.jpg', type: 'img', effect: 'in'}},
  // 39 RED impact (thesis)
  {dur: 40, kind: 'impact', text: 'In first|class.', redBg: true},
  // 40 CTA (question close + comment ask)
  {dur: 109, kind: 'text', reveal: [2, 42, 84], enter: 'zoom', text: 'Would you trust a CEO|who asks to be taxed?|Tell me below.', highlights: ['taxed?'], size: 34, media: {src: 'ask/ak40_toast.mp4', type: 'video', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 229, src: 'media/sfx_whoosh.mp3', vol: 0.35},
  {at: 807, src: 'media/sfx_impact.mp3', vol: 0.46}, // CARD 1
  {at: 860, src: 'media/sfx_whoosh.mp3', vol: 0.35}, // into black
  {at: 1365, src: 'media/sfx_impact.mp3', vol: 0.46}, // CARD 2
  {at: 1488, src: 'media/sfx_whoosh.mp3', vol: 0.35}, // into black
  {at: 1882, src: 'media/sfx_impact.mp3', vol: 0.46}, // CARD 3
  {at: 2584, src: 'media/sfx_impact.mp3', vol: 0.46}, // CARD 4
  {at: 3322, src: 'media/sfx_impact.mp3', vol: 0.55}, // red thesis
  {at: 3361, src: 'media/sfx_whoosh.mp3', vol: 0.4}, // close
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The ask</span>
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
export const AskReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('ask/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('ask/music.mp3')}
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
