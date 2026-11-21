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
// "The half" reel (HalfReel) — Hard Ledger house VISUAL format, personal-finance topic.
// TOPIC: Michael Burry's advice to buy only HALF the house you can afford — leave yourself room to breathe,
// because a bank approving a big mortgage doesn't make it the smart move. Framed around the US housing
// affordability gap (~$110k needed to afford a typical home vs ~$88k the typical household earns).
// NOTE ON VOICE: this reel is built VERBATIM from a client-supplied script that is NOT in the usual faceless
// Hard Ledger house voice — it NAMES Michael Burry, relays his advice (imperatives), uses first person ("I'll
// show you" was trimmed in edit), and CLOSES on a "let me know in the comments" CTA rather than the house binary
// "Pick a side below." The client chose "build verbatim" (asked explicitly). So, unlike every other reel here,
// the close is a comments-CTA and the copy carries advice language by design. The red beat still poses the
// would-you-rather choice; the final beat is the comments ask.
// Thesis (as written): Burry — famous for calling the 2008 crash — says buy only half the house you can afford.
// The affordability gap: a buyer needed ~$110k/yr to afford a typical American home while the typical household
// earned ~$88k — a ~$22k gap, worsened by mortgage rates. A smaller mortgage leaves room to save, invest and
// absorb the unexpected; the goal is to own a house without it owning you. CTA: "would you rather the dream
// house and a stretched budget, or something smaller with room to breathe? Let me know in the comments."
// 32 beats (shorter, calmer script than the news reels). 3 stat cards: $110,000 / $88,000 / $22,000 (money, so
// the thousands-comma is WANTED — these render $110,000 etc). 1 red impact (the would-you-rather), 1 black
// ("Own the house. Don't let it own you."). Captions match the VO verbatim (except the number cards; spoken
// figures as numerals). Durations/reveals/SFX locked to the VO via a scribe_v1 word-timestamp anchor pass
// (public/half/voiceover.mp3, NO inserted pause); music mixed at 0.17. Built at the house +10% pacing default.
// OWN distinct footage under public/half/, NO reuse of any other reel's clips — ledger-checked. New STANDALONE
// reel; thematically adjacent to RatioReel ("The goalpost moved", the home-affordability mechanism) but a
// distinct hook (Burry's "buy half" rule). Card/overlay text is editorial, not footage.
// FOOTAGE is BRAND-FREE, FACE-FREE and LANDMARK-FREE despite naming Michael Burry: generic houses, keys, charts,
// mortgage/budget, piggy-bank/savings and money-abstract b-roll. **NO Michael Burry or any identifiable face; NO
// company/bank/realtor logo or wordmark; NO readable realtor-agency sign or phone number; NO stock TICKER or
// readable price; NO flags; NO identifiable landmarks; NO readable foreign text; NO banknote/coin portraits or
// identifiable currency; NO military.**
// **UNVERIFIED / SENSITIVE — attributes specific advice and a 2008-crash claim to a NAMED real person (Michael
// Burry) and cites affordability figures; rendered as written but MUST be fact-checked before publishing.**
// Verify: that Burry actually gave this "buy half the house" advice / the "list of life lessons for a
// 26-year-old" framing; the ~$110k-to-afford vs ~$88k-earned gap (~$22k) and its source/date; and the mortgage-
// rate claim. "Own a house without it owning you" and the save/invest framing is editorial analysis.
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 128, kind: 'hook', reveal: [3, 40], text: 'Michael Burry just gave young people|advice about buying a house.', kicker: 'The half', highlights: ['burry'], size: 30, media: {src: 'half/hf00_house.mp4', type: 'video', effect: 'in'}},
  // 1
  {dur: 71, kind: 'text', reveal: [2, 40], text: 'It might change how you think|about homeownership.', highlights: ['homeownership.'], size: 32, media: {src: 'half/hf01_think.jpg', type: 'img', effect: 'panL'}},
  // 2
  {dur: 82, kind: 'text', reveal: [2, 40], text: 'The investor who called|the 2008 housing crash', highlights: ['2008'], size: 32, media: {src: 'half/hf02_crash.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 124, kind: 'text', reveal: [2, 40], text: 'says buy only half the house|you can actually afford.', highlights: ['half'], size: 30, media: {src: 'half/hf03_half.jpg', type: 'img', effect: 'panR'}},
  // 4
  {dur: 29, kind: 'text', reveal: [2], text: 'But why?', highlights: ['why?'], size: 54, media: {src: 'half/hf04_why.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 101, kind: 'text', reveal: [2, 40], text: 'He shared a list of life lessons|for a 26-year-old.', highlights: [], size: 32, media: {src: 'half/hf05_list.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 80, kind: 'text', reveal: [2, 28], text: 'One of his biggest rules|was surprisingly simple.', highlights: ['simple.'], size: 34, media: {src: 'half/hf06_simple.jpg', type: 'img', effect: 'panL'}},
  // 7
  {dur: 81, kind: 'text', reveal: [2, 40], text: 'Don’t stretch yourself|just to own a bigger home.', highlights: ['stretch'], size: 32, media: {src: 'half/hf07_stretch.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 48, kind: 'text', reveal: [2], text: 'Here’s why that matters.', highlights: [], size: 42, media: {src: 'half/hf08_why2.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 47, kind: 'text', reveal: [2, 28], text: 'By the figures|in the report,', highlights: [], size: 36, media: {src: 'half/hf09_report.jpg', type: 'img', effect: 'panR'}},
  // 10
  {dur: 59, kind: 'text', reveal: [2], text: 'a buyer needed to earn', highlights: [], size: 40, media: {src: 'half/hf10_earn.jpg', type: 'img', effect: 'in'}},
  // 11 CARD $110K
  {dur: 85, kind: 'stat', stat: {pre: 'NEEDED TO AFFORD A HOME', prefix: '$', value: 110000, post: 'A YEAR'}, media: {src: 'half/hf11_money110.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 56, kind: 'text', reveal: [2, 28], text: 'to afford a typical|American home.', highlights: [], size: 36, media: {src: 'half/hf12_home.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 47, kind: 'text', reveal: [2], text: 'The typical household earned', highlights: [], size: 38, media: {src: 'half/hf13_household.jpg', type: 'img', effect: 'panL'}},
  // 14 CARD $88K
  {dur: 37, kind: 'stat', stat: {pre: 'TYPICAL HOUSEHOLD EARNED', prefix: '$', value: 88000, post: 'A YEAR'}, media: {src: 'half/hf14_money88.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 46, kind: 'text', reveal: [2], text: 'That’s a gap of roughly', highlights: [], size: 40, media: {src: 'half/hf15_gap.jpg', type: 'img', effect: 'in'}},
  // 16 CARD $22K
  {dur: 56, kind: 'stat', stat: {pre: 'THE GAP', prefix: '$', value: 22000}, media: {src: 'half/hf16_money22.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 97, kind: 'text', reveal: [2, 40], text: 'And mortgage rates are pushing|monthly payments higher.', highlights: ['higher.'], size: 30, media: {src: 'half/hf17_rates.jpg', type: 'img', effect: 'panR'}},
  // 18
  {dur: 64, kind: 'text', reveal: [2, 28], text: 'Even decent incomes|can’t keep up.', highlights: ['keep'], size: 36, media: {src: 'half/hf18_struggle.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 43, kind: 'text', reveal: [2], text: 'Burry’s idea is simple:', highlights: [], size: 40, media: {src: 'half/hf19_idea.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 40, kind: 'text', reveal: [2, 28], text: 'leave yourself room|to breathe.', highlights: ['breathe.'], size: 42, media: {src: 'half/hf20_breathe.jpg', type: 'img', effect: 'panL'}},
  // 21
  {dur: 55, kind: 'text', reveal: [2, 40], text: 'A bank approving|a big mortgage', highlights: [], size: 34, media: {src: 'half/hf21_bank.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 52, kind: 'text', reveal: [2, 28], text: 'doesn’t make it|the smart move.', highlights: ['smart'], size: 38, media: {src: 'half/hf22_smart.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 106, kind: 'text', reveal: [2, 40], text: 'A smaller mortgage leaves more|to save and invest,', highlights: ['save'], size: 30, media: {src: 'half/hf23_save.jpg', type: 'img', effect: 'panR'}},
  // 24
  {dur: 52, kind: 'text', reveal: [2, 28], text: 'and to handle|the unexpected.', highlights: ['unexpected.'], size: 38, media: {src: 'half/hf24_unexpected.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 64, kind: 'text', reveal: [2, 28], text: 'The goal isn’t just|to own a house.', highlights: ['house.'], size: 36, media: {src: 'half/hf25_goal.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 78, kind: 'text', reveal: [2, 28], text: 'It’s to own one,|not be owned by it.', highlights: ['owned'], size: 34, media: {src: 'half/hf26_own.jpg', type: 'img', effect: 'panL'}},
  // 27 BLACK
  {dur: 76, kind: 'impact', text: 'Own the house.|Don’t let it own you.'},
  // 28
  {dur: 44, kind: 'text', reveal: [2], text: 'So, would you rather:', highlights: [], size: 40, media: {src: 'half/hf28_choice.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 75, kind: 'text', reveal: [2, 40], text: 'the dream house,|and a stretched budget,', highlights: ['stretched'], size: 32, media: {src: 'half/hf29_dream.jpg', type: 'img', effect: 'in'}},
  // 30 RED
  {dur: 68, kind: 'impact', redBg: true, text: 'or something smaller,|with room to breathe?'},
  // 31 CTA
  {dur: 38, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Let me know|in the comments.', highlights: ['comments.'], size: 44, media: {src: 'half/hf31_comments.jpg', type: 'img', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 850, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1038, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1121, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1177, src: 'media/sfx_whoosh.mp3', vol: 0.33},
  {at: 1828, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 2023, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 2091, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The half</span>
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
export const HalfReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('half/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('half/music.mp3')}
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
