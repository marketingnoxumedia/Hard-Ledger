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
// "The survivor" reel (SurvivorReel) — Hard Ledger house VISUAL format, tech/markets topic.
// TOPIC: Elon Musk / SpaceX closed a ~$40B debt deal to buy Nvidia GPUs for AI, while Musk warned that 200+
// "neocloud" companies could consolidate down to a handful of survivors. The irony: SpaceX borrows big to
// expand AI while warning others could collapse — its edge is Starlink/launch revenue, not pure AI-compute
// dependence.
// NOTE ON VOICE: built VERBATIM from a client-supplied script in the influencer "curiosity-gap" format (like
// HalfReel / HavenReel), NOT the faceless house voice — it NAMES Elon Musk / SpaceX / Starlink / Nvidia, uses an
// EARLY "follow for more" CTA, and CLOSES on a "let me know in the comments" audience-debate CTA rather than the
// house binary. The client's standing choice is "build verbatim." The red beat still poses the would-you-rather.
// Thesis (as written): Musk secured ~$40B for SpaceX's AI push and thinks 200+ AI firms are in trouble. SpaceX
// isn't just rockets — with Starlink, launches and growing AI operations it's a major AI-infrastructure player.
// The ~$40B debt deal finances Nvidia GPUs (essential to train/run AI). Musk warns 200+ neoclouds could face
// massive consolidation, only a few surviving — because AI data centers cost billions and firms relying only on
// AI-compute demand could struggle to secure financing as lenders turn cautious. The twist: SpaceX takes on huge
// financing to expand AI while warning others collapse, arguing its Starlink/launch revenue is the edge. CTA:
// "Is Musk positioning to dominate AI, or is the race getting dangerously expensive? Let me know in the comments."
// 33 beats. 2 stat cards: SPACEX DEBT DEAL $40B / NEOCLOUD COMPANIES 200. 1 red impact (the would-you-rather),
// no black beat. Captions match the VO verbatim (except the number cards; spoken figures as numerals).
// Durations/reveals/SFX locked to the VO via a scribe_v1 word-timestamp anchor pass
// (public/survivor/voiceover.mp3, NO inserted pause); music mixed at 0.17. Built at the house +10% pacing
// default. OWN distinct footage under public/survivor/, NO reuse of any other reel's clips — ledger-checked.
// New STANDALONE reel; thematically adjacent to the existing SpaceX reels — `SpacexReel` ("The belief", IPO TAM)
// and `LandlordReel` ("The landlord", SpaceX as an AI-compute landlord with 1M+ Nvidia GPUs) — and to
// `ScarcityReel` (the neocloud / AI-capital-crunch angle). Distinct hook: the $40B debt deal + Musk's
// 200-neocloud "only a few survive" warning. Card text is editorial overlay, not footage.
// FOOTAGE is BRAND-FREE, FACE-FREE and LANDMARK-FREE despite naming Musk / SpaceX / Starlink / Nvidia: generic
// AI/data-center, GPU/chip, money/debt, satellites/space, consolidation and finance b-roll. **Screen HARD: NO
// Elon Musk or any identifiable face; NO SpaceX / Starlink / Nvidia / Tesla logo or wordmark; NO identifiable
// SpaceX rocket (Falcon/Starship livery) — use GENERIC rockets or abstract space only; NO Starlink dish/satellite
// branding; NO Nvidia-branded GPU/box; NO stock TICKER or readable price; NO exchange signage; NO flags; NO
// identifiable landmarks; NO readable foreign text; NO banknote/coin portraits or identifiable currency; NO
// military.**
// **UNVERIFIED / SENSITIVE — names real people/companies (Elon Musk, SpaceX, Starlink, Nvidia) and asserts a
// specific debt deal + a market warning; rendered as written but MUST be fact-checked before publishing.**
// Verify: the ~$40B SpaceX debt deal to buy Nvidia GPUs; Musk's "200+ neoclouds could consolidate, only a few
// survive" warning and where/when he said it; and the "SpaceX's edge is Starlink/launch revenue" framing. The
// survival / "dangerously expensive" framing is editorial analysis.
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 136, kind: 'hook', reveal: [3, 40], text: 'Elon Musk just secured billions|for SpaceX’s AI bet.', kicker: 'The survivor', highlights: ['billions'], size: 32, media: {src: 'survivor/sv00_rocket.mp4', type: 'video', effect: 'in'}},
  // 1
  {dur: 124, kind: 'text', reveal: [2, 40], text: 'And he thinks hundreds of AI firms|could be in serious trouble.', highlights: ['trouble.'], size: 30, media: {src: 'survivor/sv01_trouble.jpg', type: 'img', effect: 'panL'}},
  // 2
  {dur: 35, kind: 'text', reveal: [2], text: 'But here’s what’s interesting:', highlights: [], size: 38, media: {src: 'survivor/sv02_interesting.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 95, kind: 'text', reveal: [2, 40], text: 'while Musk borrows billions|to buy AI chips,', highlights: [], size: 32, media: {src: 'survivor/sv03_chips.jpg', type: 'img', effect: 'panR'}},
  // 4
  {dur: 110, kind: 'text', reveal: [2, 40], text: 'he’s warning most of the industry|might not survive.', highlights: ['survive.'], size: 30, media: {src: 'survivor/sv04_survive.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 100, kind: 'text', reveal: [2, 28], text: 'So what’s really happening|behind the AI boom?', highlights: ['boom?'], size: 32, media: {src: 'survivor/sv05_behind.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 76, kind: 'text', reveal: [2, 40], text: 'Follow for more tech|and business stories.', highlights: ['follow'], size: 32, media: {src: 'survivor/sv06_follow.jpg', type: 'img', effect: 'panL'}},
  // 7
  {dur: 79, kind: 'text', reveal: [2, 28], text: 'SpaceX isn’t just|about rockets anymore.', highlights: ['rockets'], size: 34, media: {src: 'survivor/sv07_rockets.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 102, kind: 'text', reveal: [2, 40], text: 'With Starlink, launches,|and growing AI operations,', highlights: [], size: 30, media: {src: 'survivor/sv08_starlink.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 113, kind: 'text', reveal: [2, 40], text: 'it’s a major player in|AI computing infrastructure.', highlights: ['infrastructure.'], size: 30, media: {src: 'survivor/sv09_infra.jpg', type: 'img', effect: 'panR'}},
  // 10
  {dur: 72, kind: 'text', reveal: [2], text: 'Musk says SpaceX closed', highlights: [], size: 38, media: {src: 'survivor/sv10_deal.jpg', type: 'img', effect: 'in'}},
  // 11 CARD $40B
  {dur: 63, kind: 'stat', stat: {pre: 'SPACEX DEBT DEAL', prefix: '$', value: 40, suffix: 'B', post: 'FOR AI CHIPS'}, media: {src: 'survivor/sv11_money.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 81, kind: 'text', reveal: [2, 28], text: 'to buy Nvidia’s|most powerful GPUs.', highlights: ['GPUs.'], size: 34, media: {src: 'survivor/sv12_gpu.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 84, kind: 'text', reveal: [2, 40], text: 'These chips train|and run advanced AI.', highlights: [], size: 32, media: {src: 'survivor/sv13_train.jpg', type: 'img', effect: 'panL'}},
  // 14
  {dur: 92, kind: 'text', reveal: [2, 28], text: 'But the financial landscape|is changing fast.', highlights: ['fast.'], size: 34, media: {src: 'survivor/sv14_landscape.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 48, kind: 'text', reveal: [2], text: 'Musk warned that more than', highlights: [], size: 38, media: {src: 'survivor/sv15_warn.jpg', type: 'img', effect: 'in'}},
  // 16 CARD 200
  {dur: 65, kind: 'stat', stat: {pre: 'NEOCLOUD COMPANIES', value: 200, post: 'COULD CONSOLIDATE'}, media: {src: 'survivor/sv16_crowd.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 76, kind: 'text', reveal: [2], text: 'could face massive consolidation.', highlights: ['consolidation.'], size: 32, media: {src: 'survivor/sv17_merge.jpg', type: 'img', effect: 'panR'}},
  // 18
  {dur: 74, kind: 'text', reveal: [2, 28], text: 'Only a small number|surviving.', highlights: ['surviving.'], size: 38, media: {src: 'survivor/sv18_survive2.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 33, kind: 'text', reveal: [2], text: 'Here’s why that matters.', highlights: [], size: 40, media: {src: 'survivor/sv19_matters.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 83, kind: 'text', reveal: [2, 28], text: 'Building AI data centers|costs billions.', highlights: ['billions.'], size: 34, media: {src: 'survivor/sv20_datacenter.jpg', type: 'img', effect: 'panL'}},
  // 21
  {dur: 75, kind: 'text', reveal: [2, 40], text: 'And you need revenue|to cover it.', highlights: [], size: 34, media: {src: 'survivor/sv21_revenue.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 89, kind: 'text', reveal: [2, 40], text: 'Firms relying only|on AI demand', highlights: [], size: 32, media: {src: 'survivor/sv22_reliant.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 60, kind: 'text', reveal: [2, 28], text: 'could struggle to|secure financing,', highlights: ['financing,'], size: 34, media: {src: 'survivor/sv23_financing.jpg', type: 'img', effect: 'panR'}},
  // 24
  {dur: 60, kind: 'text', reveal: [2, 28], text: 'as lenders get|more cautious.', highlights: ['cautious.'], size: 36, media: {src: 'survivor/sv24_cautious.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 30, kind: 'text', reveal: [2], text: 'And here’s the twist.', highlights: ['twist.'], size: 42, media: {src: 'survivor/sv25_twist.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 85, kind: 'text', reveal: [2, 40], text: 'SpaceX borrows big|to expand AI,', highlights: [], size: 34, media: {src: 'survivor/sv26_borrow.jpg', type: 'img', effect: 'panL'}},
  // 27
  {dur: 61, kind: 'text', reveal: [2, 28], text: 'while warning others|could collapse.', highlights: ['collapse.'], size: 34, media: {src: 'survivor/sv27_collapse.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 94, kind: 'text', reveal: [2, 40], text: 'Its edge: revenue from|Starlink and launches,', highlights: ['edge:'], size: 32, media: {src: 'survivor/sv28_edge.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 67, kind: 'text', reveal: [2], text: 'not AI data centers alone.', highlights: ['alone.'], size: 36, media: {src: 'survivor/sv29_alone.jpg', type: 'img', effect: 'panR'}},
  // 30
  {dur: 104, kind: 'text', reveal: [2, 40], text: 'So, is Musk positioning SpaceX|to dominate AI,', highlights: [], size: 30, media: {src: 'survivor/sv30_dominate.jpg', type: 'img', effect: 'in'}},
  // 31 RED
  {dur: 100, kind: 'impact', redBg: true, text: 'or is the AI race|getting dangerously|expensive?'},
  // 32 CTA
  {dur: 39, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Let me know|in the comments.', highlights: ['comments.'], size: 44, media: {src: 'survivor/sv32_comments.jpg', type: 'img', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 1042, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1410, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 2025, src: 'media/sfx_whoosh.mp3', vol: 0.33},
  {at: 2466, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 2566, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The survivor</span>
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
export const SurvivorReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('survivor/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('survivor/music.mp3')}
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
