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
// "Three cents" reel (CentsReel) — fast NEWS reel, Hard Ledger house format.
// NEW topic: why the world's only trillionaire spent $366M on a midterm he'd said he was done
// with. Thesis: it isn't a donation, it's a PREMIUM — when a company's revenue depends on who
// chairs the committee, $366M (about three cents on every hundred of a >$1T fortune) is the
// cheapest insurance policy in America; the question was never why he spent it, it's why it's so
// cheap. Full QUESTION/STORY/ANSWER/CTA (VERBATIM) with a ~1.1s post-hook pause; close is the
// supplied CTA QUESTION ("Donation or insurance? Tell me below."). 29 beats: 26 media (incl. 1
// video + 4 cards: MAY "DONE ENOUGH" / OCT $366,000,000; $158M TO ONE PAC / > ALL DEM DONORS;
// 2024 $290M / 2026 $366M; $366M ÷ $1T = 0.04%) / 1 red impact ("This isn't a donation. It's a
// premium.") / 2 black. Red card is mid-tail (beat 24); closer resolves on the CTA question.
// Durations / line-reveal frames / SFX cues are LOCKED to the VO via a scribe_v1 word-timestamp
// anchor pass (public/cents/voiceover.mp3, ~101.9s incl. the post-hook pause). Restated-number
// cards land on the beat where the VO speaks the figure.
// NB: OWN distinct footage under public/cents/, NO reuse of any other reel's clips.
// FOOTAGE is strictly BRAND-FREE, FACE-FREE AND FLAG-FREE -- generic money / Congress / space /
// documents b-roll, NO US (or any) national flag, NO identifiable faces (no Musk / Trump / Paxton
// / any politician), NO party mascots or logos (no donkey/elephant, no GOP/DNC), NO company logos
// (no Tesla / SpaceX / X / NASA), NO banknote portrait faces, NO readable campaign signage.
// **SENSITIVE -- VERIFIED core figures, confirm the rest + legal-check before publishing:** the
// donation totals are real Oct 2026 reporting (NYT, corroborated by Reuters/CNBC/CNN/NBC/The Hill/
// Time): ~$366M cycle / $276M since July / $158M to the Senate Leadership Fund / $76M to America
// PAC / $20M to the Congressional Leadership Fund / biggest known donor / ~$290M in 2024 / more via
// non-disclosing groups. HARDER to verify / likely overstated: SpaceX "$2 trillion" valuation (has
// been reported nearer ~$400B), the Paxton $10M line, the "> every Dem rival-PAC donor that
// quarter" comparison, and the Dem-investigation claim. The "three cents on every hundred" math
// rides on the >$1T net-worth figure. The motive framing ("it's insurance to protect contracts")
// is editorial OPINION about a named living person -- run a defamation/fact check before publishing.
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK (held through ~1.1s post-hook pause)
  {dur: 290, kind: 'hook', reveal: [9, 70, 182], text: 'Why would the only|trillionaire spend $366M|on an election he quit?', kicker: 'Three cents', highlights: ['quit?'], size: 40, media: {src: 'cents/b00_wealth.jpg', type: 'img', effect: 'in'}},
  // 1
  {dur: 51, kind: 'text', reveal: [2], text: 'May 2026.', highlights: ['may'], size: 50, media: {src: 'cents/b01_calendar.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 69, kind: 'text', reveal: [2, 28], text: 'Musk says|he’s done enough.', highlights: ['enough.'], size: 44, media: {src: 'cents/b02_podium.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 88, kind: 'text', reveal: [2, 40], text: 'No plans for|big political spending.', highlights: ['no'], size: 42, media: {src: 'cents/b12_jar.jpg', type: 'img', effect: 'in'}},
  // 4 CARD
  {dur: 173, kind: 'lines', reveal: [0, 46], enter: 'slideL', text: 'MAY: “DONE ENOUGH”|OCT: $366,000,000', highlights: ['$366,000,000'], media: {src: 'cents/b05_ballotbox.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 96, kind: 'text', reveal: [2, 65], text: '$276 million|since July.', highlights: ['$276'], size: 44, media: {src: 'cents/b04_cash.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 72, kind: 'text', reveal: [2, 42], text: 'Biggest known donor|in the country.', highlights: ['biggest'], size: 42, media: {src: 'cents/b07_capitoldome.jpg', type: 'img', effect: 'in'}},
  // 7 BLACK
  {dur: 41, kind: 'text', reveal: [0, 0], text: 'Here’s the piece|you’re missing.', highlights: ['missing.'], size: 50},
  // 8
  {dur: 79, kind: 'text', reveal: [2, 44], text: '$158 million|to one group.', highlights: ['$158'], size: 44, media: {src: 'cents/b09_cheque.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 48, kind: 'text', reveal: [2, 15], text: 'The Senate|Leadership Fund.', highlights: ['fund.'], size: 44, media: {src: 'cents/b10_chamber.jpg', type: 'img', effect: 'in'}},
  // 10 CARD
  {dur: 212, kind: 'lines', reveal: [0, 60, 120], text: '$158M TO ONE PAC|MORE THAN EVERY|DEM DONOR COMBINED', highlights: ['$158m'], media: {src: 'cents/b11_scales.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 198, kind: 'text', reveal: [2, 73, 117], text: 'Plus $76M to his PAC,|$20M to the House,|$10M in Texas.', highlights: ['texas.'], size: 40, media: {src: 'cents/b13_envelopes.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 87, kind: 'text', reveal: [2, 47], text: 'And more through groups|that don’t disclose.', highlights: ['disclose.'], size: 42, media: {src: 'cents/b14_redacted.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 54, kind: 'text', reveal: [2, 28], enter: 'slideR', text: 'This is where|it gets interesting.', highlights: ['interesting.'], size: 44, media: {src: 'cents/b15_chips.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 62, kind: 'text', reveal: [2, 30], text: 'More than he spent|electing Trump.', highlights: ['trump.'], size: 44, media: {src: 'cents/b16_rally.jpg', type: 'img', effect: 'in'}},
  // 15 CARD
  {dur: 41, kind: 'lines', reveal: [0, 30], text: '2024: $290M|2026: $366M', highlights: ['2026:'], media: {src: 'cents/b17_twostacks.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 59, kind: 'text', reveal: [2], text: 'And this is a midterm.', highlights: ['midterm.'], size: 46, media: {src: 'cents/b03_capitoldusk.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 172, kind: 'text', reveal: [2, 43, 71], enter: 'slideL', text: 'While Democrats say|they’ll investigate|his contracts.', highlights: ['investigate'], size: 40, media: {src: 'cents/b18_gavel.jpg', type: 'img', effect: 'in'}},
  // 18 BLACK
  {dur: 57, kind: 'text', reveal: [0, 0], text: 'This is the part|that makes it work.', highlights: ['work.'], size: 48},
  // 19
  {dur: 92, kind: 'text', reveal: [2, 29], text: 'Musk is worth|over a trillion dollars.', highlights: ['trillion'], size: 42, media: {src: 'cents/b20_vault.jpg', type: 'img', effect: 'in'}},
  // 20 CARD
  {dur: 128, kind: 'lines', reveal: [0, 30], text: '$366M ÷ $1T|= 0.04%', highlights: ['0.04%'], media: {src: 'cents/b22_calculator.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 95, kind: 'text', reveal: [2, 31], enter: 'slideR', text: 'SpaceX:|a $2 trillion company.', highlights: ['spacex:'], size: 44, media: {src: 'cents/b23_rocket.mp4', type: 'video', effect: 'in'}},
  // 22
  {dur: 105, kind: 'text', reveal: [2, 45], text: 'Its biggest customers:|NASA and the Pentagon.', highlights: ['pentagon.'], size: 40, media: {src: 'cents/b24_defense.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 152, kind: 'text', reveal: [2, 42, 74], text: 'A Congress that revisits|those contracts|costs more.', highlights: ['contracts'], size: 40, media: {src: 'cents/b25_contract.jpg', type: 'img', effect: 'in'}},
  // 24 RED impact (mid-tail thesis)
  {dur: 62, kind: 'impact', text: 'This isn’t a donation.|It’s a premium.', redBg: true},
  // 25
  {dur: 109, kind: 'text', reveal: [2, 62, 86], text: 'When revenue depends|on who chairs|the committee.', highlights: ['committee.'], size: 40, media: {src: 'cents/b27_committee.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 202, kind: 'text', reveal: [2, 117, 142], text: '$366M isn’t generosity.|It’s the cheapest|insurance in America.', highlights: ['insurance'], size: 40, media: {src: 'cents/b28_insurance.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 97, kind: 'text', reveal: [2, 64], text: 'The question was never why.|It’s why it’s so cheap.', highlights: ['cheap.'], size: 42, media: {src: 'cents/b21_pennies.jpg', type: 'img', effect: 'in'}},
  // 28 CTA
  {dur: 74, kind: 'text', reveal: [2, 43], enter: 'zoom', text: 'Donation or insurance?|Tell me below.', highlights: ['insurance?'], size: 44, media: {src: 'cents/b29_scales.jpg', type: 'img', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 498, src: 'media/sfx_impact.mp3', vol: 0.45}, // May/Oct $366M card
  {at: 839, src: 'media/sfx_whoosh.mp3', vol: 0.35}, // into black beat
  {at: 1007, src: 'media/sfx_impact.mp3', vol: 0.48}, // $158M card
  {at: 1620, src: 'media/sfx_impact.mp3', vol: 0.45}, // 2024/2026 card
  {at: 1892, src: 'media/sfx_whoosh.mp3', vol: 0.35}, // into black beat
  {at: 2041, src: 'media/sfx_impact.mp3', vol: 0.48}, // 0.04% card
  {at: 2521, src: 'media/sfx_impact.mp3', vol: 0.55}, // red thesis
  {at: 2991, src: 'media/sfx_whoosh.mp3', vol: 0.4}, // CTA
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>Three cents</span>
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
export const CentsReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('cents/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('cents/music.mp3')}
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
