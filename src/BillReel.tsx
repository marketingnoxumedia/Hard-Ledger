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
// "The bill" reel (BillReel) — fast NEWS reel, Hard Ledger house format.
// TOPIC: why the memory in a PlayStation 6 reportedly costs more than an entire PlayStation 5 — the AI
// memory squeeze. Thesis (per leaker KeplerL2): the RAM + storage in Sony's next console now cost ~$680+
// per unit, more than a new PS5 ($649). The memory that cost ~$3/GB when the console was designed is now
// ~$20-23/GB; the APU ("the brain") is only ~$150, so the memory costs ~4x the processor. Reported bill of
// materials ~$1,000 (was ~$760 in March); Sony won't sell at a loss, its CEO cites component shortages and
// no launch date, it's skipping CES, and reportedly weighing cutting memory 30GB->20GB. Mechanic: the same
// chips feed AI servers — Micron et al. sell to the highest bidder, Nvidia's customers pay most, retail
// memory is ~5x a year ago; Sony isn't bidding against Microsoft, it's bidding against OpenAI (a $100B
// guarantee behind it). Payoff: the PS6 isn't dear because Sony got greedy — the AI boom bought the memory
// first; every console/phone/laptop is now in a bidding war with a data centre that has more money. The
// $1,000 PlayStation is the AI bill, delivered to your living room. Full QUESTION/STORY/ANSWER/CTA with a
// ~1.1s post-hook pause; close is the CTA question + comment ask ("Would you pay $1,000 for a PlayStation?
// Tell me below."). 38 beats: 35 media (incl. 4 cards: PS6 RAM+STORAGE $680+ / PS5 $649; GDDR7 $3/GB ->
// $20-23/GB & APU ~$150; BOM $760 -> $1,000 / NO LAUNCH DATE / CES SKIPPED; RETAIL DDR5 5x IN A YEAR /
// SONY vs DATA CENTRES) / 1 red impact ("Delivered to your living room.") / 2 black. Captions match the VO
// verbatim (except the stylized cards; spoken figures rendered as numerals). Durations/reveals/SFX locked
// to the VO via a scribe_v1 word-timestamp anchor pass (public/bill/voiceover.mp3).
// NB: OWN distinct footage under public/bill/, NO reuse of any other reel's clips. A near-twin of
// PlaystationReel ("The exchange", the used-market angle) — this is the SEPARATE AI-bidding / bill-of-
// materials angle, its own folder + footage.
// FOOTAGE is BRAND-FREE and FACE-FREE — generic semiconductor / electronics / data-centre / finance b-roll:
// circuit boards, RAM modules, memory chips, silicon wafers, CPU/GPU PCBs, server racks, data centres, a
// chip fab, empty shelves, an empty expo hall, an auction gavel, cash/vault, generic devices, a living
// room with a TV. NO PlayStation/Sony/Xbox/Microsoft consoles or logos, NO Nvidia/AMD/Intel/Micron/Samsung
// chip or GPU markings, NO OpenAI/CES signage, NO readable brand on any chip/board/device/screen, NO faces,
// NO flags, NO foreign text.
// **UNVERIFIED — asserts specific, checkable reported figures (a leaker's numbers, Sony statements, memory
// prices); render as written but FACT-CHECK before publishing:** the ~$680+ RAM+storage / $649 PS5; the
// ~$3 -> ~$20-23/GB and ~$150 APU; the ~$1,000 (was $760) BOM; "won't sell at a loss / no launch date /
// skipping CES / cutting 30GB to 20GB"; "retail memory 5x in a year"; and the Microsoft/OpenAI/$100B
// framing. The "AI bill delivered to your living room" thesis is editorial analysis.
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK (held through ~1.1s post-hook pause)
  {dur: 222, kind: 'hook', reveal: [3, 55, 110], text: 'How can the memory|in a PlayStation 6 cost more|than an entire PlayStation 5?', kicker: 'The bill', highlights: ['more'], size: 34, media: {src: 'bill/bl00_board.mp4', type: 'video', effect: 'in'}},
  // 1
  {dur: 94, kind: 'text', reveal: [2, 40], text: 'Last week,|hardware leaker KeplerL2,', highlights: ['KeplerL2,'], size: 38, media: {src: 'bill/bl01_leak.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 38, kind: 'text', reveal: [2, 26], text: 'who’s been|right before:', highlights: ['right'], size: 46, media: {src: 'bill/bl02_verified.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 99, kind: 'text', reveal: [2, 40], text: 'the RAM and storage|in Sony’s next console', highlights: ['RAM'], size: 38, media: {src: 'bill/bl03_ram.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 106, kind: 'text', reveal: [2, 40], text: 'now cost over|680 dollars per unit.', highlights: ['680'], size: 40, media: {src: 'bill/bl04_chipstack.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 37, kind: 'text', reveal: [2], text: 'Just those two parts.', highlights: ['two'], size: 48, media: {src: 'bill/bl05_twoparts.jpg', type: 'img', effect: 'in'}},
  // 6 CARD 1
  {dur: 136, kind: 'lines', reveal: [0, 18, 34, 50], text: 'PS6 RAM + STORAGE:|$680+|PS5 RETAIL: $649|(REPORTED)', highlights: ['$680+'], media: {src: 'bill/bl06_controller.jpg', type: 'img', effect: 'in'}},
  // 7 BLACK
  {dur: 58, kind: 'text', reveal: [0, 0], text: 'But there’s one thing|most people overlook.', highlights: ['overlook.'], size: 46},
  // 8
  {dur: 62, kind: 'text', reveal: [2, 26], text: 'When Sony designed|the console,', highlights: [], size: 42, media: {src: 'bill/bl08_design.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 101, kind: 'text', reveal: [2, 40], text: 'that memory cost about|3 dollars a gigabyte.', highlights: ['3'], size: 38, media: {src: 'bill/bl09_wafer.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 61, kind: 'text', reveal: [2, 30], text: 'It’s now around|20 to 23.', highlights: ['20'], size: 44, media: {src: 'bill/bl10_pricechart.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 79, kind: 'text', reveal: [2, 40], text: 'The processor, the part|you’d think is expensive,', highlights: ['processor,'], size: 34, media: {src: 'bill/bl11_cpu.jpg', type: 'img', effect: 'in'}},
  // 12 CARD 2
  {dur: 59, kind: 'lines', reveal: [0, 22, 44], text: 'GDDR7:|$3/GB → $20–23/GB|APU: ~$150', highlights: ['$20–23/GB'], media: {src: 'bill/bl12_die.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 78, kind: 'text', reveal: [2, 30], text: 'The memory costs|4 times the brain.', highlights: ['4'], size: 42, media: {src: 'bill/bl13_compare.jpg', type: 'img', effect: 'in'}},
  // 14 BLACK
  {dur: 61, kind: 'text', reveal: [0, 0], text: 'And this is where|things get interesting.', highlights: ['interesting.'], size: 46},
  // 15
  {dur: 113, kind: 'text', reveal: [2, 40, 82], text: 'Total bill of materials,|reportedly around|a thousand dollars.', highlights: ['thousand'], size: 34, media: {src: 'bill/bl15_bom.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 58, kind: 'text', reveal: [2], text: 'In March it was 760.', highlights: ['760.'], size: 44, media: {src: 'bill/bl16_marchprice.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 82, kind: 'text', reveal: [2, 40], text: 'Sony has said it won’t|sell the PS6 at a loss.', highlights: ['loss.'], size: 36, media: {src: 'bill/bl17_ledger.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 75, kind: 'text', reveal: [2, 40], text: 'Its CEO says there’s|no launch date,', highlights: ['no'], size: 38, media: {src: 'bill/bl18_podium.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 61, kind: 'text', reveal: [2, 26], text: 'because of|component shortages.', highlights: ['shortages.'], size: 42, media: {src: 'bill/bl19_shortage.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 79, kind: 'text', reveal: [2, 30], text: 'Sony’s skipping|CES in January.', highlights: ['CES'], size: 42, media: {src: 'bill/bl20_expo.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 170, kind: 'text', reveal: [2, 42, 82], text: 'And there are reports it’s|looking at cutting the memory|from 30 gigabytes to 20,', highlights: ['cutting'], size: 30, media: {src: 'bill/bl21_memorymod.jpg', type: 'img', effect: 'in'}},
  // 22 CARD 3
  {dur: 45, kind: 'lines', reveal: [0, 22, 44], text: 'BOM: $760 → $1,000|NO LAUNCH DATE|CES: SKIPPED', highlights: ['$1,000'], media: {src: 'bill/bl22_motherboard.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 72, kind: 'text', reveal: [2, 40], text: 'Now let me show|how to actually do this.', highlights: ['actually'], size: 42, media: {src: 'bill/bl23_diagram.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 102, kind: 'text', reveal: [2, 30], text: 'The same chips|go into AI servers.', highlights: ['AI'], size: 40, media: {src: 'bill/bl24_server.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 110, kind: 'text', reveal: [2, 42, 82], text: 'Micron and the other memory|makers sell to whoever|pays most,', highlights: ['most,'], size: 32, media: {src: 'bill/bl25_fab.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 75, kind: 'text', reveal: [2, 30], text: 'and Nvidia’s customers|pay most.', highlights: ['most.'], size: 40, media: {src: 'bill/bl26_gpu.jpg', type: 'img', effect: 'in'}},
  // 27 CARD 4
  {dur: 142, kind: 'lines', reveal: [0, 22, 44], text: 'RETAIL DDR5:|5× IN A YEAR|SONY vs DATA CENTRES', highlights: ['5×'], media: {src: 'bill/bl27_datacenter.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 100, kind: 'text', reveal: [2, 40], text: 'Sony isn’t bidding|against Microsoft for RAM.', highlights: ['Microsoft'], size: 36, media: {src: 'bill/bl28_auction.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 53, kind: 'text', reveal: [2, 26], text: 'It’s bidding|against OpenAI.', highlights: ['OpenAI.'], size: 44, media: {src: 'bill/bl29_bid.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 127, kind: 'text', reveal: [2, 40, 82], text: 'And OpenAI has a|100-billion-dollar guarantee|behind it.', highlights: ['100-billion-dollar'], size: 30, media: {src: 'bill/bl30_money.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 108, kind: 'text', reveal: [2, 42, 84], text: 'The PlayStation 6 isn’t|expensive because|Sony got greedy.', highlights: ['greedy.'], size: 36, media: {src: 'bill/bl31_boardroom.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 124, kind: 'text', reveal: [2, 42, 84], text: 'It’s expensive because|the AI boom bought|the memory first.', highlights: ['AI'], size: 36, media: {src: 'bill/bl32_aiservers.jpg', type: 'img', effect: 'in'}},
  // 33
  {dur: 166, kind: 'text', reveal: [2, 42, 84], text: 'Every console, every phone,|every laptop is now in a|bidding war with a data centre,', highlights: ['bidding'], size: 30, media: {src: 'bill/bl33_devices.jpg', type: 'img', effect: 'in'}},
  // 34
  {dur: 74, kind: 'text', reveal: [2, 30], text: 'and the data centre|has more money.', highlights: ['money.'], size: 40, media: {src: 'bill/bl34_bigdc.jpg', type: 'img', effect: 'in'}},
  // 35
  {dur: 88, kind: 'text', reveal: [2, 48], text: 'The thousand-dollar PlayStation|is the AI bill,', highlights: ['bill,'], size: 34, media: {src: 'bill/bl35_livingroom.jpg', type: 'img', effect: 'in'}},
  // 36 RED impact (thesis)
  {dur: 51, kind: 'impact', text: 'Delivered to|your living room.', redBg: true},
  // 37 CTA (question close + comment ask)
  {dur: 106, kind: 'text', reveal: [2, 42, 84], enter: 'zoom', text: 'Would you pay $1,000|for a PlayStation?|Tell me below.', highlights: ['$1,000'], size: 36, media: {src: 'bill/bl37_duskliving.mp4', type: 'video', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 222, src: 'media/sfx_whoosh.mp3', vol: 0.35},
  {at: 595, src: 'media/sfx_impact.mp3', vol: 0.46}, // CARD 1
  {at: 731, src: 'media/sfx_whoosh.mp3', vol: 0.35}, // into black
  {at: 1093, src: 'media/sfx_impact.mp3', vol: 0.46}, // CARD 2
  {at: 1230, src: 'media/sfx_whoosh.mp3', vol: 0.35}, // into black
  {at: 1928, src: 'media/sfx_impact.mp3', vol: 0.46}, // CARD 3
  {at: 2332, src: 'media/sfx_impact.mp3', vol: 0.46}, // CARD 4
  {at: 3314, src: 'media/sfx_impact.mp3', vol: 0.55}, // red thesis
  {at: 3365, src: 'media/sfx_whoosh.mp3', vol: 0.4}, // close
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The bill</span>
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
export const BillReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('bill/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('bill/music.mp3')}
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
