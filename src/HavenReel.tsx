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
// "The haven" reel (HavenReel) — Hard Ledger house VISUAL format, personal-finance topic.
// TOPIC: Bitcoin AND gold are BOTH the worst-performing major assets of 2026 — both the "safe havens" fell
// together, challenging the "digital gold" / "store of value" story. Framed around Charlie Bilello's
// asset-performance rankings (Bitcoin ~−7.3% YTD, gold ~−7.5% YTD — the first time both finished at the bottom
// in the same year).
// NOTE ON VOICE: built VERBATIM from a client-supplied script that is NOT in the usual faceless Hard Ledger
// house voice — it NAMES strategist Charlie Bilello, uses an EARLY "follow for more" CTA, and CLOSES on a "let me
// know in the comments" audience-debate CTA rather than the house binary "Pick a side below." The client's
// standing choice is "build verbatim." So, like HalfReel, the follow/comments CTAs and the named attribution are
// by design; the red beat still poses the would-you-rather ("can either protect your wealth?").
// Thesis (as written): the two assets people turn to for protection are now the worst performers of 2026. Per
// Bilello, both Bitcoin (~−7.3%) and gold (~−7.5%) have gone negative — the first time both sit at the bottom of
// his rankings in the same year. Meanwhile commodities surged and US stocks were positive. The reason: neither
// Bitcoin nor gold pays interest, so when rates rise money prefers assets that pay you to hold it. That
// challenges "Bitcoin is digital gold" and "gold is a store of value" — when both fall together, can either
// reliably protect wealth? CTA: "Bitcoin, gold, or neither? Let me know in the comments."
// 34 beats. 2 stat cards: BITCOIN −7.3% / GOLD −7.5% (percentages). 1 red impact (can either protect your
// wealth?), NO black beat (an editorial "both havens, bottom of the list" line was dropped because it isn't in
// the spoken script — captions stay verbatim to the VO). Captions match the VO verbatim (except the number
// cards; spoken figures as numerals). Durations/reveals/SFX locked to the VO via a scribe_v1 word-timestamp
// anchor pass (public/haven/voiceover.mp3, NO inserted pause); music mixed at 0.17. Built at the house +10%
// pacing default. OWN distinct footage under public/haven/, NO reuse of any other reel's clips — ledger-checked.
// New STANDALONE reel; thematically adjacent to GoldReel ("Store of value") and HedgeReel ("The Fed bet", gold
// falling vs rates) but a distinct hook (Bitcoin AND gold together / the digital-gold myth). Card text is
// editorial overlay, not footage.
// FOOTAGE is BRAND-FREE, FACE-FREE and LANDMARK-FREE despite naming Bitcoin / gold / Charlie Bilello: abstract
// gold, gold bars (no wordmarks), generic/blank "digital" coins, red/green charts, commodities, vaults/shields
// and rate/interest b-roll. **THIS IS A HIGH-BRAND-RISK CRYPTO/GOLD TOPIC — screen HARD: NO Bitcoin "₿" / Ethereum
// or any crypto logo; NO exchange or charting app (Binance/Coinbase/TradingView) screen, ticker or readable
// price; NO gold-bullion wordmark ("999.9", PAMP, Credit Suisse, country/mint names) or coin portrait; NO
// identifiable currency/denomination; NO identifiable face (no Charlie Bilello); NO flags; NO landmarks; NO
// readable foreign text; NO military.** Crypto reads as abstract digital/blank gold coins or data particles; gold
// as abstract bars/nuggets; charts as numberless/ticker-free.
// **UNVERIFIED / SENSITIVE — names a real strategist (Charlie Bilello) and cites his data; rendered as written
// but MUST be fact-checked before publishing.** Verify: Bitcoin ~−7.3% and gold ~−7.5% YTD 2026 and the
// "first time both at the bottom of Bilello's rankings in the same year" claim and its date; and that commodities
// "surged" / US stocks were positive the same period. The "digital gold / store of value can't protect wealth"
// framing is editorial analysis.
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 114, kind: 'hook', reveal: [3, 40], text: 'Bitcoin and gold just hit|a historic first.', kicker: 'The haven', highlights: ['first.'], size: 34, media: {src: 'haven/hv00_fall.mp4', type: 'video', effect: 'in'}},
  // 1
  {dur: 74, kind: 'text', reveal: [2, 40], text: 'And it’s not the record|investors hoped for.', highlights: ['record'], size: 34, media: {src: 'haven/hv01_record.jpg', type: 'img', effect: 'panL'}},
  // 2
  {dur: 70, kind: 'text', reveal: [2, 40], text: 'The two assets people turn to|for protection', highlights: [], size: 32, media: {src: 'haven/hv02_protect.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 118, kind: 'text', reveal: [2, 40], text: 'are now the worst performers|of 2026.', highlights: ['worst'], size: 32, media: {src: 'haven/hv03_worst.jpg', type: 'img', effect: 'panR'}},
  // 4
  {dur: 51, kind: 'text', reveal: [2], text: 'But how did that happen?', highlights: ['happen?'], size: 42, media: {src: 'haven/hv04_how.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 38, kind: 'text', reveal: [2, 28], text: 'Before we break|it down,', highlights: [], size: 38, media: {src: 'haven/hv05_break.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 121, kind: 'text', reveal: [2, 40], text: 'follow for more stories|that change how you see markets.', highlights: ['follow'], size: 28, media: {src: 'haven/hv06_follow.jpg', type: 'img', effect: 'panL'}},
  // 7
  {dur: 65, kind: 'text', reveal: [2, 40], text: 'According to strategist|Charlie Bilello,', highlights: [], size: 32, media: {src: 'haven/hv07_strategist.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 86, kind: 'text', reveal: [2, 40], text: 'both Bitcoin and gold|have gone negative this year.', highlights: ['negative'], size: 30, media: {src: 'haven/hv08_negative.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 103, kind: 'text', reveal: [2, 40], text: 'despite their reputation|as safe alternatives.', highlights: [], size: 32, media: {src: 'haven/hv09_safe.jpg', type: 'img', effect: 'panR'}},
  // 10
  {dur: 46, kind: 'text', reveal: [2, 28], text: 'Here’s how bad|it’s gotten.', highlights: [], size: 36, media: {src: 'haven/hv10_bad.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 51, kind: 'text', reveal: [2], text: 'Bitcoin is down', highlights: [], size: 42, media: {src: 'haven/hv11_btc.jpg', type: 'img', effect: 'in'}},
  // 12 CARD 7.3%
  {dur: 47, kind: 'stat', stat: {pre: 'BITCOIN', prefix: '−', value: 7.3, decimals: 1, suffix: '%', post: 'THIS YEAR'}, media: {src: 'haven/hv12_btccard.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 52, kind: 'text', reveal: [2], text: 'Gold has fallen', highlights: [], size: 42, media: {src: 'haven/hv13_gold.jpg', type: 'img', effect: 'panL'}},
  // 14 CARD 7.5%
  {dur: 42, kind: 'stat', stat: {pre: 'GOLD', prefix: '−', value: 7.5, decimals: 1, suffix: '%', post: 'THIS YEAR'}, media: {src: 'haven/hv14_goldcard.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 64, kind: 'text', reveal: [2, 28], text: 'And by Bilello’s|historical data,', highlights: [], size: 34, media: {src: 'haven/hv15_data.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 79, kind: 'text', reveal: [2, 40], text: 'it’s the first time both|finished at the bottom', highlights: ['first'], size: 30, media: {src: 'haven/hv16_bottom.jpg', type: 'img', effect: 'panR'}},
  // 17
  {dur: 45, kind: 'text', reveal: [2, 28], text: 'of his rankings,|the same year.', highlights: [], size: 34, media: {src: 'haven/hv17_rankings.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 43, kind: 'text', reveal: [2, 28], text: 'But here’s where it|gets interesting.', highlights: ['interesting.'], size: 36, media: {src: 'haven/hv19_twist.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 65, kind: 'text', reveal: [2, 40], text: 'While Bitcoin and gold|struggle,', highlights: [], size: 34, media: {src: 'haven/hv20_struggle.jpg', type: 'img', effect: 'panL'}},
  // 21
  {dur: 59, kind: 'text', reveal: [2, 28], text: 'other investments|did much better.', highlights: ['better.'], size: 36, media: {src: 'haven/hv21_better.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 60, kind: 'text', reveal: [2], text: 'Commodities surged.', highlights: ['surged.'], size: 44, media: {src: 'haven/hv22_commodities.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 71, kind: 'text', reveal: [2, 40], text: 'And U.S. stocks|delivered positive returns.', highlights: ['positive'], size: 32, media: {src: 'haven/hv23_stocks.jpg', type: 'img', effect: 'panR'}},
  // 24
  {dur: 77, kind: 'text', reveal: [2, 40], text: 'And there’s a reason|investors are watching.', highlights: [], size: 32, media: {src: 'haven/hv24_watching.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 97, kind: 'text', reveal: [2, 28], text: 'Neither Bitcoin nor gold|pays interest.', highlights: ['interest.'], size: 34, media: {src: 'haven/hv25_nointerest.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 37, kind: 'text', reveal: [2], text: 'When rates rise,', highlights: [], size: 44, media: {src: 'haven/hv26_rates.jpg', type: 'img', effect: 'panL'}},
  // 27
  {dur: 87, kind: 'text', reveal: [2, 40], text: 'money prefers assets|that pay you to hold it.', highlights: ['pay'], size: 30, media: {src: 'haven/hv27_pay.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 53, kind: 'text', reveal: [2, 28], text: 'This challenges|a popular belief.', highlights: ['belief.'], size: 36, media: {src: 'haven/hv28_belief.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 66, kind: 'text', reveal: [2, 40], text: 'Supporters call Bitcoin|digital gold.', highlights: ['digital'], size: 34, media: {src: 'haven/hv29_digital.jpg', type: 'img', effect: 'panR'}},
  // 30
  {dur: 93, kind: 'text', reveal: [2, 40], text: 'Traditionalists call gold|a store of value.', highlights: ['value.'], size: 32, media: {src: 'haven/hv30_store.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 34, kind: 'text', reveal: [2], text: 'But when both fall together,', highlights: [], size: 36, media: {src: 'haven/hv31_together.jpg', type: 'img', effect: 'in'}},
  // 32 RED
  {dur: 84, kind: 'impact', redBg: true, text: 'Can either one|really protect|your wealth?'},
  // 33
  {dur: 91, kind: 'text', reveal: [2, 40], text: 'To protect your money:|Bitcoin, gold, or neither?', highlights: ['neither?'], size: 32, media: {src: 'haven/hv33_choice.jpg', type: 'img', effect: 'panL'}},
  // 34 CTA
  {dur: 38, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Let me know|in the comments.', highlights: ['comments.'], size: 44, media: {src: 'haven/hv34_comments.jpg', type: 'img', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 937, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1036, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1266, src: 'media/sfx_whoosh.mp3', vol: 0.33},
  {at: 2108, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 2283, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The haven</span>
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
export const HavenReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('haven/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('haven/music.mp3')}
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
