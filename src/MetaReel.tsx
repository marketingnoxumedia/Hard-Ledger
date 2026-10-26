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
// "The gamble" reel (MetaReel) — Hard Ledger house VISUAL format, tech/markets topic.
// TOPIC: Meta announced (Oct 26) a ~$35B stock offering — ~$22.5B Class A common + ~$12.5B preferred — to fund its
// AI build-out, plus a separate ~$60B stock-sale program planned for the future. Meta's 2026 capex is guided to
// ~$135B–$145B. The tension: huge equity raises can dilute shareholders and the infrastructure spend creates
// pressure to turn AI demand into profit; Meta says its AI is already lifting engagement, ad performance and
// monetization — and the $60B program is only planned, not guaranteed.
// NOTE ON VOICE: built VERBATIM from a client-supplied script in the influencer "curiosity-gap" format (like
// HalfReel / HavenReel / SurvivorReel), NOT the faceless house voice — it NAMES Meta / Mark Zuckerberg / Facebook /
// Instagram / WhatsApp, uses an EARLY "follow for more" CTA, and CLOSES on a "let me know what you think in the
// comments" audience-debate CTA rather than the house binary. The client's standing choice is "build verbatim."
// The red beat poses the would-you-rather (right move vs huge financial gamble).
// 37 beats. 5 stat cards: $35B (two public offerings) / $22.5B (Class A) / $12.5B (preferred) / $60B (future plan) /
// $135B (2026 capex, up to $145B). 1 red impact (the gamble), no black beat. Captions match the VO verbatim
// (except the number cards; spoken figures as numerals). Durations/reveals/SFX locked to the VO via a scribe_v1
// word-timestamp anchor pass (public/meta/voiceover.mp3, NO inserted pause); music mixed at 0.17. Built at the
// house +10% pacing default. OWN distinct footage under public/meta/, NO reuse of any other reel's clips —
// ledger-checked.
// New STANDALONE reel; thematically adjacent to the AI-capex cluster (`ScarcityReel`, `WarehouseReel`,
// `SurvivorReel`) but a DISTINCT story: a specific company (Meta), a specific equity raise and capex guide, and
// the dilution / return-on-AI-spend question. Card text is editorial overlay, not footage.
// FOOTAGE is BRAND-FREE, FACE-FREE and LANDMARK-FREE despite naming Meta / Zuckerberg / Facebook / Instagram /
// WhatsApp: generic big-tech, data-center, money/finance, infrastructure and markets b-roll. **Screen HARD: NO
// Mark Zuckerberg or any identifiable face; NO Meta / Facebook / Instagram / WhatsApp / Threads logo, wordmark,
// app icon or recognizable UI; NO other brand logos or wordmarks; NO stock TICKER, exchange board or readable
// price/chart; NO exchange signage; NO flags; NO identifiable landmarks or recognizable corporate HQ; NO readable
// foreign text; NO banknote/coin portraits or identifiable currency; NO military.**
// **UNVERIFIED / SENSITIVE — names a real company/person (Meta, Mark Zuckerberg) and asserts specific financials
// (a ~$35B offering split $22.5B/$12.5B, a planned ~$60B program, ~$135B–$145B 2026 capex, an Oct 26 date);
// rendered as written but MUST be fact-checked before publishing.** The dilution / "profitable business" framing
// is editorial analysis.
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 111, kind: 'hook', reveal: [3, 40], text: 'Meta just announced|a $35 billion stock offering.', kicker: 'The gamble', highlights: ['$35'], size: 32, media: {src: 'meta/mt00_tech.mp4', type: 'video', effect: 'in'}},
  // 1
  {dur: 123, kind: 'text', reveal: [2, 40], text: 'to fund its AI ambitions —|and that’s only part of the plan.', highlights: ['plan.'], size: 30, media: {src: 'meta/mt01_plan.jpg', type: 'img', effect: 'panL'}},
  // 2
  {dur: 91, kind: 'text', reveal: [2, 40], text: 'The company behind Facebook,|Instagram, and WhatsApp', highlights: [], size: 32, media: {src: 'meta/mt02_apps.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 72, kind: 'text', reveal: [2, 28], text: 'wants to raise|even more money.', highlights: ['money.'], size: 36, media: {src: 'meta/mt03_raise.jpg', type: 'img', effect: 'panR'}},
  // 4
  {dur: 112, kind: 'text', reveal: [2, 40], text: 'But why does one of the world’s|biggest tech companies', highlights: [], size: 30, media: {src: 'meta/mt04_giant.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 100, kind: 'text', reveal: [2, 40], text: 'need so much cash|to win the AI race?', highlights: ['race?'], size: 32, media: {src: 'meta/mt05_race.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 61, kind: 'text', reveal: [2, 40], text: 'Follow for more business|and tech stories', highlights: ['follow'], size: 32, media: {src: 'meta/mt06_follow.jpg', type: 'img', effect: 'panL'}},
  // 7
  {dur: 56, kind: 'text', reveal: [2, 40], text: 'that could change how|you see the world.', highlights: [], size: 32, media: {src: 'meta/mt07_world.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 120, kind: 'text', reveal: [2, 40], text: 'Meta has been pouring billions of|dollars into artificial intelligence,', highlights: [], size: 29, media: {src: 'meta/mt08_pour.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 115, kind: 'text', reveal: [2, 40], text: 'building massive data centers|and developing AI products.', highlights: ['products.'], size: 30, media: {src: 'meta/mt09_datacenter.jpg', type: 'img', effect: 'panR'}},
  // 10
  {dur: 109, kind: 'text', reveal: [2, 40], text: 'Now, CEO Mark Zuckerberg’s company|is turning to investors', highlights: [], size: 29, media: {src: 'meta/mt10_investors.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 88, kind: 'text', reveal: [2, 28], text: 'to help finance|its next phase of expansion.', highlights: ['expansion.'], size: 32, media: {src: 'meta/mt11_expansion.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 117, kind: 'text', reveal: [2, 40], text: 'On October 26, Meta announced|plans to raise', highlights: [], size: 32, media: {src: 'meta/mt12_announce.jpg', type: 'img', effect: 'in'}},
  // 13 CARD $35B
  {dur: 139, kind: 'stat', stat: {pre: 'TWO PUBLIC OFFERINGS', prefix: '$', value: 35, suffix: 'B', post: 'TO RAISE, IN TOTAL'}, media: {src: 'meta/mt13_offering.jpg', type: 'img', effect: 'in'}},
  // 14 CARD $22.5B
  {dur: 111, kind: 'stat', stat: {pre: 'CLASS A COMMON STOCK', prefix: '$', value: 22.5, decimals: 1, suffix: 'B'}, media: {src: 'meta/mt14_classa.jpg', type: 'img', effect: 'in'}},
  // 15 CARD $12.5B
  {dur: 76, kind: 'stat', stat: {pre: 'PREFERRED STOCK', prefix: '$', value: 12.5, decimals: 1, suffix: 'B'}, media: {src: 'meta/mt15_preferred.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 96, kind: 'text', reveal: [2, 40], text: 'The company also plans|to establish a separate', highlights: [], size: 32, media: {src: 'meta/mt16_separate.jpg', type: 'img', effect: 'panL'}},
  // 17 CARD $60B
  {dur: 115, kind: 'stat', stat: {pre: 'FUTURE STOCK-SALE PLAN', prefix: '$', value: 60, suffix: 'B', post: 'STILL TO COME'}, media: {src: 'meta/mt17_future.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 67, kind: 'text', reveal: [2, 28], text: 'And the scale of|this spending is enormous.', highlights: ['enormous.'], size: 34, media: {src: 'meta/mt18_enormous.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 100, kind: 'text', reveal: [2, 40], text: 'Meta expects its capital|expenditures to reach', highlights: [], size: 32, media: {src: 'meta/mt19_capex.jpg', type: 'img', effect: 'panR'}},
  // 20 CARD $135B
  {dur: 218, kind: 'stat', stat: {pre: '2026 CAPITAL SPENDING', prefix: '$', value: 135, suffix: 'B', post: 'UP TO $145B'}, media: {src: 'meta/mt20_spending.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 112, kind: 'text', reveal: [2, 40], text: 'That’s money going toward|infrastructure and computing', highlights: [], size: 31, media: {src: 'meta/mt21_infra.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 95, kind: 'text', reveal: [2, 40], text: 'needed to support|its growing AI ambitions.', highlights: ['ambitions.'], size: 32, media: {src: 'meta/mt22_ambitions.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 38, kind: 'text', reveal: [2], text: 'But here’s the big question:', highlights: ['question:'], size: 36, media: {src: 'meta/mt23_question.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 137, kind: 'text', reveal: [2, 40], text: 'what happens if these investments|don’t generate enough returns?', highlights: ['returns?'], size: 29, media: {src: 'meta/mt24_returns.jpg', type: 'img', effect: 'panL'}},
  // 25
  {dur: 131, kind: 'text', reveal: [2, 40], text: 'Issuing more stock can dilute|existing shareholders’ ownership,', highlights: ['dilute'], size: 29, media: {src: 'meta/mt25_dilute.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 95, kind: 'text', reveal: [2, 40], text: 'while massive infrastructure|spending creates pressure', highlights: [], size: 31, media: {src: 'meta/mt26_pressure.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 100, kind: 'text', reveal: [2, 28], text: 'to turn AI demand|into a profitable business.', highlights: ['profitable'], size: 32, media: {src: 'meta/mt27_profit.jpg', type: 'img', effect: 'panR'}},
  // 28
  {dur: 151, kind: 'text', reveal: [2, 40], text: 'Meta insists its AI investments|are already improving engagement,', highlights: [], size: 28, media: {src: 'meta/mt28_engagement.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 86, kind: 'text', reveal: [2, 28], text: 'advertising performance,|and monetization.', highlights: ['monetization.'], size: 34, media: {src: 'meta/mt29_monetize.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 107, kind: 'text', reveal: [2, 40], text: 'But investors still have to weigh|those potential gains', highlights: [], size: 30, media: {src: 'meta/mt30_weigh.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 135, kind: 'text', reveal: [2, 40], text: 'against the enormous cost of|building the infrastructure behind them.', highlights: ['cost'], size: 28, media: {src: 'meta/mt31_cost.jpg', type: 'img', effect: 'panL'}},
  // 32
  {dur: 125, kind: 'text', reveal: [2, 40], text: 'And while the $35 billion offering|has been announced,', highlights: [], size: 30, media: {src: 'meta/mt32_announced.jpg', type: 'img', effect: 'in'}},
  // 33
  {dur: 161, kind: 'text', reveal: [2, 40], text: 'the additional $60 billion program|is still planned, rather than guaranteed.', highlights: ['guaranteed.'], size: 28, media: {src: 'meta/mt33_planned.jpg', type: 'img', effect: 'in'}},
  // 34
  {dur: 140, kind: 'text', reveal: [2, 40], text: 'So, is Meta making the right move|by raising billions to dominate AI,', highlights: [], size: 28, media: {src: 'meta/mt34_dominate.jpg', type: 'img', effect: 'in'}},
  // 35 RED
  {dur: 113, kind: 'impact', redBg: true, text: 'or is the company|taking a huge|financial gamble?'},
  // 36 CTA
  {dur: 41, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Let me know what you think|in the comments.', highlights: ['comments.'], size: 38, media: {src: 'meta/mt36_comments.jpg', type: 'img', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 1275, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1414, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1525, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1697, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1979, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 2404, src: 'media/sfx_whoosh.mp3', vol: 0.33},
  {at: 3810, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 3923, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The gamble</span>
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
export const MetaReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('meta/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('meta/music.mp3')}
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
