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

// One shared, soft DIRECTIONAL drop shadow for every caption (white and red
// alike) — reads as depth, not a glow, needs no stroke or darkening.
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
// "The rulebook" reel (RulebookReel) — fast NEWS reel, Hard Ledger house format.
// NEW topic: Citroën showed a new 2CV, an EV on sale end-2028 from €15,000 (~£12,700). The
// thesis: it isn't a cheaper CAR, it's a cheaper RULEBOOK. The EU is negotiating a new, looser
// "E-car" vehicle class (simpler safety/equipment rules) so European makers can build something
// China-priced; the 2CV is the first car designed for rules that don't exist yet. Every spec is
// a cost cut — flat glass, unpainted injected tailgate, exposed bumpers, pop-out windows, fabric
// roof, steel wheels, ~1 tonne, small battery. Chinese brands took ~23% of the UK market last
// month on price; Europe can't match Chinese labour/subsidies, so it changes what a car is
// legally required to be. Citroën isn't beating China on the factory floor — it's beating it in
// Brussels, by deleting the parts of a car the law used to insist on. Full VERBATIM QUESTION/
// STORY/ANSWER/CTA with a ~1.1s post-hook pause; close is the supplied CTA QUESTION ("Would you
// buy a car with fewer rules? Tell me below."). Sped VO (atempo ~1.28) — total 2467 frames = ~82s
// (final CTA beat extended for a clean tail). 28 beats: 25 media (incl. video b-roll + 3 cards:
// €15,000/£12,700/ELECTRIC; A NEW EU CLASS/THE E-CAR; EXPOSED BUMPERS/FABRIC ROOF/STEEL WHEELS --
// plus a 1-TONNE stat and a 23% stat) / 1 red impact ("Less car, less cost. Same badge.") / 2
// black ("Here's the piece you're missing." + "This is the part that makes it work.").
// NB: OWN distinct footage under public/rulebook/, NO reuse of any other reel's clips.
// COMPANIES/FIGURES/EVENT are editorial (VO + text only); FOOTAGE is strictly BRAND-FREE AND
// FACE-FREE -- generic auto-industry / policy / cost-cut b-roll, NO Citroën / 2CV / any car
// badge, logo, wordmark, number plate, EU flag or national seal, NO readable brand text, NO
// banknote portrait faces, NO human faces. Own footage public/rulebook/.
// **TIME-SENSITIVE / UNVERIFIED -- verify before publishing:** attributes a new-2CV reveal, an
// on-sale-end-2028 / €15,000 (~£12,700) price, a proposed EU "E-car" regulatory class, specific
// design/spec choices, and a ~23% Chinese-brand UK market share "last month". All author-supplied
// and rendered as written; confirm every figure and the E-car policy claim against primary
// sources before this publishes.
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK (held through ~1.1s post-hook pause)
  {dur: 174, kind: 'hook', reveal: [2, 34, 78], text: 'How do you build|a brand-new car for|£13,000 in 2028?', kicker: 'The rulebook', highlights: ['£13,000'], size: 44, media: {src: 'rulebook/b00_weld.mp4', type: 'video', effect: 'in'}},
  // 1
  {dur: 57, kind: 'text', reveal: [0, 0], text: 'Citroën just showed|the new 2CV.', highlights: ['2cv'], size: 46, media: {src: 'rulebook/b01_cover.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 59, kind: 'text', reveal: [0, 0], enter: 'slideL', text: 'On sale by|the end of 2028.', highlights: ['2028'], size: 46, media: {src: 'rulebook/b02_charge.mp4', type: 'video', effect: 'in'}},
  // 3 CARD price
  {dur: 142, kind: 'lines', text: 'FROM €15,000|£12,700|ELECTRIC', highlights: ['£12,700'], reveal: [0, 22, 66], media: {src: 'rulebook/b03_tag.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 41, kind: 'text', reveal: [0, 0], text: 'An egg crate|in the door.', highlights: ['crate'], size: 50, media: {src: 'rulebook/b04_eggcrate.jpg', type: 'img', effect: 'in'}},
  // 5 BLACK
  {dur: 39, kind: 'text', reveal: [0, 0], text: "Here's the piece|you're missing.", highlights: ['missing.'], size: 52},
  // 6 thesis
  {dur: 82, kind: 'text', reveal: [2, 42], enter: 'slideUp', text: "It isn't a cheaper car.|It's a cheaper rulebook.", highlights: ['rulebook.'], size: 42, media: {src: 'rulebook/b06_rulebook.jpg', type: 'img', effect: 'in'}},
  // 7 CARD E-car class
  {dur: 82, kind: 'lines', text: 'A NEW EU CLASS:|THE E-CAR', highlights: ['e-car'], reveal: [0, 30], media: {src: 'rulebook/b07_chamber.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 70, kind: 'text', text: 'Simpler safety rules.', highlights: ['simpler'], size: 48, media: {src: 'rulebook/b08_checklist.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 121, kind: 'text', reveal: [2, 58], enter: 'slideR', text: 'To build something|China-priced.', highlights: ['chinapriced'], size: 44, media: {src: 'rulebook/b09_factory.mp4', type: 'video', effect: 'in'}},
  // 10
  {dur: 92, kind: 'text', reveal: [2, 40], text: 'The first car designed|for rules that don’t exist yet.', highlights: ['yet.'], size: 40, media: {src: 'rulebook/b10_blank.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 67, kind: 'text', reveal: [0, 0], text: 'And this is where|things get interesting.', highlights: ['interesting.'], size: 44, media: {src: 'rulebook/b11_magnify.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 85, kind: 'text', reveal: [2, 40], enter: 'slideL', text: 'Every design choice|is a line on an invoice.', highlights: ['invoice.'], size: 42, media: {src: 'rulebook/b12_invoice.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 106, kind: 'text', reveal: [2, 44], text: 'Flat windscreens.|Glass bent once is cheaper.', highlights: ['cheaper.'], size: 42, media: {src: 'rulebook/b13_glass.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 72, kind: 'text', reveal: [0, 0], text: 'An unpainted tailgate,|injected in colour.', highlights: ['unpainted'], size: 44, media: {src: 'rulebook/b14_plastic.jpg', type: 'img', effect: 'in'}},
  // 15 CARD design
  {dur: 112, kind: 'lines', text: 'EXPOSED BUMPERS|FABRIC ROOF|STEEL WHEELS', highlights: ['steel', 'wheels'], reveal: [0, 22, 44], media: {src: 'rulebook/b15_wheel.jpg', type: 'img', effect: 'in'}},
  // 16 stat 1 tonne
  {dur: 44, kind: 'stat', stat: {pre: 'TARGET WEIGHT', value: 1, post: 'TONNE'}, media: {src: 'rulebook/b16_scale.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 92, kind: 'text', reveal: [2, 40], enter: 'slideUp', text: 'Small battery.|Light cars don’t need big ones.', highlights: ['battery.'], size: 42, media: {src: 'rulebook/b17_battery.mp4', type: 'video', effect: 'in'}},
  // 18 BLACK
  {dur: 52, kind: 'text', reveal: [0, 0], text: 'This is the part|that makes it work.', highlights: ['work.'], size: 48},
  // 19 stat 23%
  {dur: 138, kind: 'stat', stat: {pre: 'CHINESE BRANDS TOOK', value: 23, suffix: '%', post: 'OF THE UK MARKET', bar: 23}, media: {src: 'rulebook/b19_carpark.mp4', type: 'video', effect: 'in'}},
  // 20
  {dur: 109, kind: 'text', reveal: [2, 40], text: 'Europe can’t match|Chinese labour or subsidies.', highlights: ['match'], size: 42, media: {src: 'rulebook/b20_coins.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 138, kind: 'text', reveal: [2, 52], enter: 'slideR', text: 'So it changes what a car|is legally required to be.', highlights: ['legally'], size: 40, media: {src: 'rulebook/b21_legal.jpg', type: 'img', effect: 'in'}},
  // 22 RED impact
  {dur: 69, kind: 'impact', text: 'Less car, less cost.|Same badge.', highlights: ['badge'], redBg: true},
  // 23
  {dur: 102, kind: 'text', reveal: [2, 46], text: 'The cheapest car in Europe|won’t be engineering.', highlights: ['engineering.'], size: 42, media: {src: 'rulebook/b23_blueprint.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 56, kind: 'text', text: 'It’ll be a regulatory one.', highlights: ['regulatory'], size: 44, media: {src: 'rulebook/b24_stamp.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 72, kind: 'text', reveal: [0, 0], text: 'Citroën isn’t beating|China on the factory floor.', highlights: ['floor.'], size: 40, media: {src: 'rulebook/b25_assembly.mp4', type: 'video', effect: 'in'}},
  // 26
  {dur: 105, kind: 'text', reveal: [2, 50], enter: 'slideL', text: 'It’s beating it in Brussels,|deleting what the law required.', highlights: ['brussels,'], size: 40, media: {src: 'rulebook/b26_redpen.jpg', type: 'img', effect: 'in'}},
  // 27 CTA
  {dur: 89, kind: 'text', reveal: [2, 20, 58], enter: 'zoom', text: 'Would you buy a car|with fewer rules?|Tell me below.', highlights: ['fewer'], size: 40, media: {src: 'rulebook/b27_road.mp4', type: 'video', effect: 'in'}},
];

// Sound-effect cues (frame, file, gain). Impacts punch the open, the price card,
// the thesis, the 1-tonne + 23% stats and the red card; whooshes mark the
// "gets interesting" pivot, the E-car card, the "regulatory" turn and the CTA.
type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 290, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 512, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 594, src: 'media/sfx_whoosh.mp3', vol: 0.4},
  {at: 959, src: 'media/sfx_whoosh.mp3', vol: 0.35},
  {at: 1401, src: 'media/sfx_impact.mp3', vol: 0.45},
  {at: 1589, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 1974, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 2145, src: 'media/sfx_whoosh.mp3', vol: 0.35},
  {at: 2378, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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

// Entrance transition applied to a scene's media + text together, over ~9 frames.
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
// Media background
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
// Kinetic caption — Anton condensed caps, red highlight. Lines reveal via
// lineReveal (exact per-line frames relative to beat start; [0,0,..] = together).
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
// Scenes
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
            <div key={i} style={{opacity: op, fontFamily: HEAD, fontSize: 96, lineHeight: 0.98, letterSpacing: 0.5, textTransform: 'uppercase'}}>
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
  const barW = stat.bar != null ? interpolate(frame, [6, 40], [0, stat.bar], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeInOut}) : 0;
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', padding: 80}}>
      <div style={{textAlign: 'center'}}>
        {stat.pre ? <div style={{fontFamily: BODY, fontWeight: 700, fontSize: 30, letterSpacing: 6, color: C.ink, textTransform: 'uppercase', marginBottom: 8}}>{stat.pre}</div> : null}
        <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'center'}}>
          {stat.prefix ? <span style={{fontFamily: HEAD, fontSize: 170, color: C.red, lineHeight: 1}}>{stat.prefix}</span> : null}
          <span style={{fontFamily: HEAD, fontSize: 300, color: C.red, lineHeight: 0.85, letterSpacing: 2, textShadow: SH}}>{num}</span>
          {stat.suffix ? <span style={{fontFamily: HEAD, fontSize: 170, color: C.red, lineHeight: 1}}>{stat.suffix}</span> : null}
        </div>
        {stat.post ? <div style={{fontFamily: BODY, fontWeight: 600, fontSize: 46, color: C.ink, marginTop: 6, textTransform: 'uppercase', letterSpacing: 1}}>{stat.post}</div> : null}
      </div>
      {stat.bar != null ? (
        <div style={{width: 780, marginTop: 60, opacity: interpolate(frame, [12, 26], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>
          <div style={{height: 40, width: '100%', borderRadius: 4, background: C.track, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)'}}>
            <div style={{height: '100%', width: `${barW}%`, background: C.red, boxShadow: '0 0 30px rgba(255,46,46,0.45)'}} />
          </div>
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

const SceneImpact: React.FC<{text: string; redBg?: boolean}> = ({text, redBg}) => {
  const lines = text.split('|');
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', background: redBg ? 'radial-gradient(125% 90% at 50% 42%, #FF2E2E 0%, #E31E1E 62%, #C21414 100%)' : undefined}}>
      <div style={{position: 'relative', zIndex: 1, textAlign: 'center', fontFamily: HEAD, fontSize: 150, lineHeight: 0.92, letterSpacing: 1, textTransform: 'uppercase'}}>
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The rulebook</span>
      </div>
      <div style={{position: 'absolute', bottom: 90, left: 80, right: 80, height: 3, borderRadius: 3, background: 'rgba(255,255,255,0.08)'}}>
        <div style={{height: '100%', width: `${progress * 100}%`, borderRadius: 3, background: C.sub}} />
      </div>
    </>
  );
};

// Text enter/exit animation modes, rotated across beats so the motion varies.
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
export const RulebookReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('rulebook/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('rulebook/music.mp3')}
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

// Bottom-center brand watermark — 45% opacity, hard edges.
const LogoWatermark: React.FC = () => (
  <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', pointerEvents: 'none'}}>
    <Img
      src={staticFile('media/logo.png')}
      style={{width: 330, height: 'auto', opacity: 0.45, marginBottom: 130, borderRadius: 0}}
    />
  </AbsoluteFill>
);
