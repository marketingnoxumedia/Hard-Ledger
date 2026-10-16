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
// "The escape route" reel (EscapeReel) — fast NEWS reel, Hard Ledger house format.
// NEW topic: how Marvell Technology — a chip company that never sold a GPU — is up ~214% in 2026,
// ~10x Nvidia. Thesis: Marvell isn't an AI-chip company, it's the ESCAPE ROUTE from Nvidia. Every
// hyperscaler pays Nvidia a >70% margin on every GPU (the "Nvidia tax"); the way out is to design
// your own custom silicon — Amazon's Trainium, Microsoft's Maia — but you can't build it alone, so
// the money that used to go to Nvidia goes to the contractor who can: Marvell (20+ custom-chip design
// wins across Amazon, Google, Microsoft, Meta). The catch: four customers — lose one design and the
// escape route becomes a cliff. Full QUESTION/STORY/ANSWER/CTA with a ~1.1s post-hook pause; close is
// the supplied CTA QUESTION ("Nvidia, or the companies trying to leave it? Tell me below."). 33 beats:
// 30 media (incl. video + 3 cards: MRVL +214% / NVDA +22% / AVGO +3%; 20+ DESIGN WINS AMAZON/GOOGLE/
// MICROSOFT/META; MARKET $75B TO $94B / REVENUE $18B) / 1 red impact ("The Nvidia tax.") / 2 black.
// Red card mid-tail (beat 22). Durations / reveals / SFX locked to the VO via a scribe_v1
// word-timestamp anchor pass (public/escape/voiceover.mp3, ~104.0s incl. the post-hook pause).
// Restated-fact number cards land where the VO speaks them.
// NB: OWN distinct footage under public/escape/, NO reuse of any other reel's clips.
// FOOTAGE is strictly BRAND-FREE AND FACE-FREE -- generic semiconductor / data-center / finance /
// money b-roll, NO company logos, wordmarks or HQ signage (no Nvidia / Marvell / Broadcom / AMD /
// Intel / TSMC / Samsung / Apple / Microsoft / Amazon / Google / Meta / ASML marks), NO branded
// graphics cards (no GeForce / Radeon / ROG), NO readable real stock tickers on screens, NO
// banknote portrait faces, NO foreign-language text, NO national flags, NO identifiable human faces
// (hands / gloves / silhouettes / backs only).
// **SENSITIVE -- verify every figure before publishing (named public companies + financials):** the
// ~214% YTD (vs Nvidia ~22%, Broadcom ~3%), the Barron's "Maia 300 is the next leg up" piece, "20+
// design wins across Amazon/Google/Microsoft/Meta", the investor-day TAM raise ($75B -> $94B for
// 2028) and ~$18B revenue outlook, ~60x forward earnings / "~2x a valuation model" / "-16% off the
// June high", and the ">70% Nvidia GPU margin" are all stated as reported and must be confirmed
// independently. The "escape route / four-customer concentration" framing is editorial analysis.
// This reel names Nvidia as the foil like CageReel / PaperReel / the SpaceX-GPU reel — different
// subject (Marvell) and thesis, but schedule it APART from those for the same audience.
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK (held through ~1.1s post-hook pause)
  {dur: 266, kind: 'hook', reveal: [3, 70, 150], text: 'How is a chip company|that’s never sold a GPU|up 214%, 10x Nvidia?', kicker: 'The escape route', highlights: ['214%'], size: 40, media: {src: 'escape/a00_wafer.mp4', type: 'video', effect: 'in'}},
  // 1 reveal subject
  {dur: 44, kind: 'text', reveal: [2, 20], text: 'Marvell|Technology.', highlights: ['marvell'], size: 60, media: {src: 'escape/a01_die.jpg', type: 'img', effect: 'in'}},
  // 2 CARD 1
  {dur: 167, kind: 'lines', reveal: [0, 56, 112], text: 'MRVL +214%|NVDA +22%|AVGO +3%', highlights: ['+214%'], media: {src: 'escape/a02_chartup.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 118, kind: 'text', reveal: [2, 60], text: 'This week, Barron’s says|Microsoft’s new AI chip', highlights: ['barron’s'], size: 42, media: {src: 'escape/a04_board.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 86, kind: 'text', reveal: [2, 44], text: 'the Maia 300|is the next leg up.', highlights: ['up.'], size: 44, media: {src: 'escape/a05_fab.mp4', type: 'video', effect: 'in'}},
  // 5 BLACK
  {dur: 52, kind: 'text', reveal: [0, 0], text: 'But nobody tells you|this part.', highlights: ['part.'], size: 48},
  // 6
  {dur: 91, kind: 'text', reveal: [2, 46], text: 'Marvell doesn’t make|the chips Microsoft buys.', highlights: ['buys.'], size: 42, media: {src: 'escape/a06_pcb.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 105, kind: 'text', reveal: [2, 54], enter: 'slideL', text: 'It makes the chips they build|so they can stop buying.', highlights: ['buying.'], size: 40, media: {src: 'escape/a07_robotarm.mp4', type: 'video', effect: 'in'}},
  // 8
  {dur: 94, kind: 'text', reveal: [2, 48], text: 'Amazon’s Trainium.|Microsoft’s Maia.', highlights: ['maia.'], size: 46, media: {src: 'escape/a08_wafertweezers.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 75, kind: 'text', reveal: [2, 38], text: 'Custom silicon, designed|by the cloud giants.', highlights: ['silicon,'], size: 42, media: {src: 'escape/a09_datacenter.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 84, kind: 'text', reveal: [2, 42], text: 'Engineered and built|through Marvell.', highlights: ['marvell.'], size: 44, media: {src: 'escape/a10_gold.jpg', type: 'img', effect: 'in'}},
  // 11 CARD 2
  {dur: 134, kind: 'lines', reveal: [0, 45, 90], text: '20+ DESIGN WINS|AMAZON / GOOGLE|MICROSOFT / META', highlights: ['20+'], media: {src: 'escape/a11_serverhall.mp4', type: 'video', effect: 'in'}},
  // 12 BLACK
  {dur: 50, kind: 'text', reveal: [0, 0], text: 'But that’s not even|the craziest part.', highlights: ['craziest'], size: 48},
  // 13
  {dur: 90, kind: 'text', reveal: [2, 46], text: 'At its investor day,|Marvell raised the number.', highlights: ['raised'], size: 42, media: {src: 'escape/b13_stage.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 83, kind: 'text', reveal: [2, 42], enter: 'slideR', text: 'Its 2028 data-center|market estimate.', highlights: ['2028'], size: 42, media: {src: 'escape/a12_cleanroom.jpg', type: 'img', effect: 'in'}},
  // 15 CARD 3
  {dur: 149, kind: 'lines', reveal: [0, 78], text: 'MARKET: $75B TO $94B|REVENUE: $18B', highlights: ['$94B'], media: {src: 'escape/b14_barchart.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 87, kind: 'text', reveal: [2, 42], text: '60x forward|earnings.', highlights: ['60x'], size: 50, media: {src: 'escape/b16_pescreen.mp4', type: 'video', effect: 'in'}},
  // 17
  {dur: 110, kind: 'text', reveal: [2, 56], text: 'Double what a model|says it’s worth.', highlights: ['double'], size: 42, media: {src: 'escape/a03_markets.mp4', type: 'video', effect: 'in'}},
  // 18
  {dur: 134, kind: 'text', reveal: [2, 72], text: 'Priced for perfection,|16% off its June high.', highlights: ['16%'], size: 40, media: {src: 'escape/b17_downchart.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 59, kind: 'text', reveal: [2, 30], text: 'Here’s exactly|how they do it.', highlights: ['exactly'], size: 46, media: {src: 'escape/b18_hands_bench.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 89, kind: 'text', reveal: [2, 46], text: 'Every hyperscaler pays|Nvidia a margin.', highlights: ['margin.'], size: 42, media: {src: 'escape/b19_heatsink.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 100, kind: 'text', reveal: [2, 50], enter: 'slideL', text: 'Over 70%|on every GPU.', highlights: ['70%'], size: 48, media: {src: 'escape/b26_circuitmacro.jpg', type: 'img', effect: 'in'}},
  // 22 RED impact (mid-tail thesis)
  {dur: 39, kind: 'impact', text: 'The Nvidia|tax.', redBg: true},
  // 23
  {dur: 67, kind: 'text', reveal: [2, 34], text: 'Build your own chip|and the tax disappears.', highlights: ['disappears.'], size: 42, media: {src: 'escape/b20_etch.mp4', type: 'video', effect: 'in'}},
  // 24
  {dur: 41, kind: 'text', reveal: [2, 20], text: 'But you can’t|build it alone.', highlights: ['alone.'], size: 46, media: {src: 'escape/b21_loneworker.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 123, kind: 'text', reveal: [2, 64], text: 'The money that went to Nvidia|goes to the contractor who can.', highlights: ['contractor'], size: 40, media: {src: 'escape/b22_moneyflow.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 82, kind: 'text', reveal: [2, 42], text: 'That’s Marvell.|It isn’t an AI chip company.', highlights: ['marvell.'], size: 42, media: {src: 'escape/c00_chipglow.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 74, kind: 'text', reveal: [2, 38], enter: 'zoom', text: 'It’s the escape route|from Nvidia.', highlights: ['escape'], size: 46, media: {src: 'escape/b23_corridor.mp4', type: 'video', effect: 'in'}},
  // 28
  {dur: 100, kind: 'text', reveal: [2, 50], text: 'Every dollar Microsoft saves|on every GPU', highlights: ['saves'], size: 42, media: {src: 'escape/b15_cash.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 83, kind: 'text', reveal: [2, 42], text: 'is a dollar it spends|to get there.', highlights: ['there.'], size: 44, media: {src: 'escape/c01_path.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 50, kind: 'text', reveal: [2, 24], text: 'The catch:|four customers.', highlights: ['four'], size: 46, media: {src: 'escape/c02_pillars.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 92, kind: 'text', reveal: [2, 48], text: 'Lose one design,|and the route becomes a cliff.', highlights: ['cliff.'], size: 42, media: {src: 'escape/b24_cliff.jpg', type: 'img', effect: 'in'}},
  // 32 CTA (question close)
  {dur: 103, kind: 'text', reveal: [2, 40], enter: 'zoom', text: 'Nvidia, or the companies|trying to leave it?', highlights: ['leave'], size: 42, media: {src: 'escape/b25_fork.jpg', type: 'img', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 310, src: 'media/sfx_impact.mp3', vol: 0.46}, // MRVL/NVDA/AVGO card
  {at: 681, src: 'media/sfx_whoosh.mp3', vol: 0.35}, // into black
  {at: 1182, src: 'media/sfx_impact.mp3', vol: 0.48}, // 20+ design wins card
  {at: 1316, src: 'media/sfx_whoosh.mp3', vol: 0.35}, // into black
  {at: 1539, src: 'media/sfx_impact.mp3', vol: 0.48}, // TAM/revenue card
  {at: 2267, src: 'media/sfx_impact.mp3', vol: 0.55}, // red thesis (Nvidia tax)
  {at: 3018, src: 'media/sfx_whoosh.mp3', vol: 0.4}, // CTA
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The escape route</span>
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
export const EscapeReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('escape/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('escape/music.mp3')}
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
