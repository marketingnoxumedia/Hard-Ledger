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
// "The counter" reel (CounterReel) — fast NEWS reel, Hard Ledger house format.
// NEW topic: why Apple would launch a $299 smart-home display ("HomeView") into a category that has
// never made money (Amazon's devices division reportedly lost ~$10B in a year; Apple's own HomePod
// died in 3 years). Thesis: the box is the cost of entry, the ANSWER it gives is the business. Apple
// isn't selling a tablet — it's buying a spot on your kitchen counter, and $299 is the rent; the real
// product is Siri / the voice that answers when you ask a question in your kitchen (a loss-leader land
// grab, the same move Amazon made with Alexa). Full QUESTION/STORY/ANSWER/CTA with a ~1.1s post-hook
// pause; close is the supplied CTA QUESTION ("Would you put Siri in your kitchen? Tell me below.").
// 31 beats: 28 media (incl. 4 video + 3 cards: HOMEVIEW $299 / 7-INCH / 6 FACES; HOMEPOD $349 TO $299
// / DEAD IN 3 YEARS; and the valuation/quote beats) / 1 red impact ("Two ninety-nine is the rent.") /
// 2 black. Red card mid-tail (beat 26). Durations / reveals / SFX locked to the VO via a scribe_v1
// word-timestamp anchor pass (public/counter/voiceover.mp3, ~103.7s incl. the post-hook pause).
// Restated-fact number cards land where the VO speaks them.
// NB: OWN distinct footage under public/counter/, NO reuse of any other reel's clips.
// FOOTAGE is strictly BRAND-FREE AND FACE-FREE -- generic kitchen / smart-device / money / abstract
// b-roll, NO company logos or wordmarks (no Apple bitten-apple mark anywhere, no Amazon / Google /
// Bloomberg / Samsung / Sonos), NO recognizable branded products (no iPhone / iPad / HomePod / Mac,
// no Amazon Echo / Echo Show, no Google Nest Hub -- smart speakers/displays are GENERIC and
// unbranded), NO on-screen brand UIs (no iOS / Siri / Alexa / Android), NO identifiable human faces
// (despite the "face recognition" line -- use hands / backs / silhouettes / abstract face-mesh), NO
// banknote portrait faces, NO foreign-language text, NO national flags.
// **SENSITIVE -- this reel asserts specific, very recent, checkable claims about REAL people and
// companies; render as written but CONFIRM ALL before publishing:** that John Ternus is Apple's NEW
// CEO ("six weeks into the job") and that Apple unveiled a "$299 HomeView 7-inch smart display,
// ships November" this week (NOT verified here -- treat as unconfirmed/possibly not yet real); that
// Amazon's devices division "lost ~$10B in a year"; the HomePod price history ($349 -> $299,
// discontinued in ~3 years); the Ternus "no product is a better hub than the iPhone" quote; and the
// Bloomberg "boring on purpose" headline. The "box is the cost / the answer is the business"
// framing is editorial analysis. Do a full fact + legal check before this publishes.
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK (held through ~1.1s post-hook pause)
  {dur: 305, kind: 'hook', reveal: [3, 78, 170], text: 'Why is Apple’s new CEO|launching a $299 version|of a product that lost $10B?', kicker: 'The counter', highlights: ['$299'], size: 38, media: {src: 'counter/c00_kitchen.mp4', type: 'video', effect: 'in'}},
  // 1
  {dur: 95, kind: 'text', reveal: [2, 48], text: 'Tuesday, New York.|Ternus, six weeks in.', highlights: ['ternus,'], size: 44, media: {src: 'counter/c02_stage.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 131, kind: 'text', reveal: [2, 66], enter: 'slideL', text: 'Unveils HomeView:|a 7-inch screen.', highlights: ['homeview:'], size: 42, media: {src: 'counter/c01_display.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 98, kind: 'text', reveal: [2, 50], text: 'Wall or countertop.|It knows six faces.', highlights: ['faces.'], size: 42, media: {src: 'counter/c06_facemesh.jpg', type: 'img', effect: 'in'}},
  // 4 CARD 1
  {dur: 77, kind: 'lines', reveal: [0, 26, 52], text: 'HOMEVIEW|$299 / 7-INCH|6 FACES', highlights: ['$299'], media: {src: 'counter/c03_screen.jpg', type: 'img', effect: 'in'}},
  // 5 BLACK
  {dur: 50, kind: 'text', reveal: [0, 0], text: 'But nobody tells you|this part.', highlights: ['part.'], size: 48},
  // 6
  {dur: 68, kind: 'text', reveal: [2, 34], text: 'This is the|smart-home display.', highlights: ['display.'], size: 44, media: {src: 'counter/c09_smartdisplay.mp4', type: 'video', effect: 'in'}},
  // 7
  {dur: 92, kind: 'text', reveal: [2, 48], text: 'Amazon’s Echo Show.|Google’s Nest Hub.', highlights: ['hub.'], size: 42, media: {src: 'counter/c05_wallmount.jpg', type: 'img', effect: 'in'}},
  // 8 (merged "decade-old category" + "never made money")
  {dur: 160, kind: 'text', reveal: [2, 88], text: 'A decade-old category|that’s never made money.', highlights: ['money.'], size: 42, media: {src: 'counter/c10_oldtech.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 85, kind: 'text', reveal: [2, 2], text: 'Amazon’s devices division', highlights: ['devices'], size: 42, media: {src: 'counter/d20_cart.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 74, kind: 'text', reveal: [2, 38], text: 'lost $10 billion|in a single year.', highlights: ['$10'], size: 44, media: {src: 'counter/c13_burningmoney.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 88, kind: 'text', reveal: [2, 45], text: 'Apple’s own HomePod|launched at $349.', highlights: ['$349.'], size: 42, media: {src: 'counter/c04_speaker.jpg', type: 'img', effect: 'in'}},
  // 13 CARD 2
  {dur: 133, kind: 'lines', reveal: [0, 66], text: 'HOMEPOD $349 TO $299|DEAD IN 3 YEARS', highlights: ['dead'], media: {src: 'counter/c12_unplugged.jpg', type: 'img', effect: 'in'}},
  // 14 BLACK
  {dur: 59, kind: 'text', reveal: [0, 0], text: 'But that’s not|the craziest part.', highlights: ['craziest'], size: 48},
  // 15
  {dur: 111, kind: 'text', reveal: [2, 56], text: 'Ternus: nothing’s|a better hub', highlights: ['hub'], size: 42, media: {src: 'counter/d15_hub.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 89, kind: 'text', reveal: [2, 2], text: 'than the iPhone.', highlights: ['iphone.'], size: 50, media: {src: 'counter/d14_phonehand.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 92, kind: 'text', reveal: [2, 48], enter: 'slideR', text: 'Then he launched|a hub that isn’t.', highlights: ['isn’t.'], size: 44, media: {src: 'counter/d23_keys.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 85, kind: 'text', reveal: [2, 44], text: 'Bloomberg’s headline:|boring on purpose.', highlights: ['boring'], size: 42, media: {src: 'counter/d16_newspaper.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 63, kind: 'text', reveal: [2, 32], text: 'Here’s exactly|how they do it.', highlights: ['exactly'], size: 46, media: {src: 'counter/c08_blueprint.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 105, kind: 'text', reveal: [2, 70], text: 'HomeView isn’t the product.|Siri is.', highlights: ['siri'], size: 42, media: {src: 'counter/d17_waveform.mp4', type: 'video', effect: 'in'}},
  // 21
  {dur: 151, kind: 'text', reveal: [2, 72], text: 'Apple’s behind in AI.|Not about the smartest model.', highlights: ['ai.'], size: 38, media: {src: 'counter/d18_aibrain.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 126, kind: 'text', reveal: [2, 64], text: 'It’s about which one answers|when you ask in the kitchen.', highlights: ['answers'], size: 38, media: {src: 'counter/d19_askingkitchen.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 79, kind: 'text', reveal: [2, 40], text: 'Amazon put Alexa there|with a loss-leader.', highlights: ['loss-leader.'], size: 42, media: {src: 'counter/c07_pricetag.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 128, kind: 'text', reveal: [2, 64], text: 'Apple’s doing the same.|A screen that reads your calendar.', highlights: ['calendar.'], size: 38, media: {src: 'counter/d21_calendarscreen.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 129, kind: 'text', reveal: [2, 66], text: 'Apple isn’t selling a tablet.|It’s buying your counter.', highlights: ['counter.'], size: 40, media: {src: 'counter/d22_counter.jpg', type: 'img', effect: 'in'}},
  // 26 RED impact (mid-tail thesis)
  {dur: 68, kind: 'impact', text: 'Two ninety-nine|is the rent.', redBg: true},
  // 27
  {dur: 63, kind: 'text', reveal: [2, 32], text: 'Nobody ever made|money on the box.', highlights: ['box.'], size: 44, media: {src: 'counter/d24_emptybox.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 86, kind: 'text', reveal: [2, 44], text: 'Everyone’s fighting to own|the voice that comes out.', highlights: ['voice'], size: 40, media: {src: 'counter/d25_mic.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 121, kind: 'text', reveal: [2, 62], text: 'The box is the cost.|The answer is the business.', highlights: ['business.'], size: 40, media: {src: 'counter/d27_soundwaves.mp4', type: 'video', effect: 'in'}},
  // 30 CTA (question close)
  {dur: 100, kind: 'text', reveal: [2, 40], enter: 'zoom', text: 'Would you put Siri|in your kitchen?', highlights: ['siri'], size: 44, media: {src: 'counter/d26_kitchennight.jpg', type: 'img', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 629, src: 'media/sfx_impact.mp3', vol: 0.46}, // HomeView specs card
  {at: 706, src: 'media/sfx_whoosh.mp3', vol: 0.35}, // into black
  {at: 1323, src: 'media/sfx_impact.mp3', vol: 0.48}, // HomePod dead card
  {at: 1456, src: 'media/sfx_whoosh.mp3', vol: 0.35}, // into black
  {at: 2673, src: 'media/sfx_impact.mp3', vol: 0.55}, // red thesis ($299 is the rent)
  {at: 3011, src: 'media/sfx_whoosh.mp3', vol: 0.4}, // CTA
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The counter</span>
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
export const CounterReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('counter/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('counter/music.mp3')}
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
