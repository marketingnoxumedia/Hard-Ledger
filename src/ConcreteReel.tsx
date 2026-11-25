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
// "The invoice" reel (ConcreteReel) — fast NEWS reel, Hard Ledger house format.
// NEW topic: why Wall Street is rotating out of AI chips and into INDUSTRIALS/construction.
// Thesis: every gold rush has two trades — the gold and the SHOVELS; the money rotates from the
// STORY to the INVOICE. A Monday note from Morgan Stanley's top equity strategist (Michael Wilson)
// calls the next leg industrials/machinery/metals/capital goods, not semiconductors. Under the
// surface US valuations have already corrected (two-thirds of the largest ~1,000 stocks are >10%
// off their highs) while earnings haven't followed; Q3 growth is driven by AI-infrastructure
// spending, and the strongest order books belong to the firms building the sheds/power/cooling/
// steel, not the chipmakers — backlogs are broadening across machinery and metals. A chip is
// priced on what it might do; a backlog on a signed order. Nvidia sells the dream; somebody has to
// pour the floor it sits on — and the building phase is where the signed contracts are. Full
// VERBATIM QUESTION/STORY/ANSWER/CTA with a ~1.1s post-hook pause; close is the supplied CTA
// QUESTION ("Chips or concrete for the next two years? Tell me below."). Sped VO (atempo ~1.09) —
// total ~2729 frames = ~91s (final CTA beat extended for a clean tail). 27 beats: 24 media (incl.
// video b-roll + 3 cards: IT'S INDUSTRIALS/MACHINERY/CAPITAL GOODS; 2 IN 3 BIG STOCKS/DOWN 10%+/
// FROM PEAK; Q3 DRIVER AI INFRA/BACKLOGS BROADENING/MACHINERY + METALS) / 1 red impact ("Wall
// Street is moving to the second") / 2 black ("Here's the piece you're missing." + "This is the
// part that makes it work.").
// NB: OWN distinct footage under public/concrete/, NO reuse of PaperReel's (public/paper/, the
// AI-circular-financing reel which also uses the shovels metaphor) or any other reel's clips.
// COMPANIES/FIGURES/CALL are editorial (VO + text only); FOOTAGE is strictly BRAND-FREE AND
// FACE-FREE -- generic industrial / construction / market b-roll, NO Morgan Stanley / Nvidia / any
// chip or tech brand, NO construction-equipment brand logos (no CAT/Komatsu/Deere/Volvo/JCB on
// machinery), NO stock tickers, NO bank/fund names, NO seals or national flags, NO readable brand
// text, NO banknote portrait faces, NO human faces. Own footage public/concrete/.
// **TIME-SENSITIVE / UNVERIFIED -- verify before publishing:** attributes a Monday Morgan Stanley
// note (Michael Wilson) calling industrials over semiconductors, a valuation drop since June with
// ~2/3 of the largest ~1,000 stocks >10% off highs, Q3 growth driven by AI infrastructure, and
// broadening machinery/metals backlogs. All author-supplied and rendered as written; confirm every
// figure and the Morgan Stanley call against primary sources before this publishes.
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK (held through ~1.1s post-hook pause)
  {dur: 205, kind: 'hook', reveal: [2, 36, 80], text: 'Why is Wall Street|moving money out of chips|and into bulldozers?', kicker: 'The invoice', highlights: ['bulldozers?'], size: 42, media: {src: 'concrete/b00_excavator.mp4', type: 'video', effect: 'in'}},
  // 1
  {dur: 121, kind: 'text', reveal: [2, 46], text: 'Monday. A note from|Morgan Stanley.', highlights: ['morgan', 'stanley.'], size: 44, media: {src: 'concrete/b01_note.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 106, kind: 'text', reveal: [2, 46], enter: 'slideL', text: 'His call: the next leg|isn’t semiconductors.', highlights: ['semiconductors.'], size: 42, media: {src: 'concrete/b02_wafer.jpg', type: 'img', effect: 'in'}},
  // 3 CARD industrials
  {dur: 129, kind: 'lines', text: 'IT’S INDUSTRIALS|MACHINERY|CAPITAL GOODS', highlights: ['industrials'], reveal: [0, 22, 44], media: {src: 'concrete/b03_machinery.jpg', type: 'img', effect: 'in'}},
  // 4 BLACK
  {dur: 84, kind: 'text', reveal: [0, 0], text: "Here's the piece|you're missing.", highlights: ['missing.'], size: 52},
  // 5
  {dur: 110, kind: 'text', reveal: [2, 46], text: 'US stocks: a steep drop|in valuations since June.', highlights: ['steep'], size: 42, media: {src: 'concrete/b05_marketdrop.jpg', type: 'img', effect: 'in'}},
  // 6 CARD 2 in 3
  {dur: 145, kind: 'lines', text: '2 IN 3 BIG STOCKS|DOWN 10%+|FROM THEIR PEAK', highlights: ['10%+'], reveal: [0, 26, 58], media: {src: 'concrete/b06_board.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 38, kind: 'text', text: 'The index looks fine.', highlights: ['fine.'], size: 46, media: {src: 'concrete/b07_skyline.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 81, kind: 'text', reveal: [0, 0], enter: 'slideUp', text: 'Underneath, most of it|has already corrected.', highlights: ['corrected.'], size: 42, media: {src: 'concrete/b08_iceberg.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 65, kind: 'text', reveal: [0, 0], text: 'And this is where|it gets interesting.', highlights: ['interesting.'], size: 44, media: {src: 'concrete/b09_magnifier.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 107, kind: 'text', reveal: [2, 44], text: 'Earnings haven’t|followed prices down.', highlights: ['earnings'], size: 42, media: {src: 'concrete/b10_earnings.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 143, kind: 'text', reveal: [2, 52], enter: 'slideR', text: 'Q3 growth is driven|by AI infrastructure.', highlights: ['infrastructure.'], size: 42, media: {src: 'concrete/b11_substation.mp4', type: 'video', effect: 'in'}},
  // 12
  {dur: 157, kind: 'text', reveal: [2, 60], text: 'The biggest order books|aren’t the chipmakers.', highlights: ['chipmakers.'], size: 42, media: {src: 'concrete/b12_orderbook.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 90, kind: 'text', reveal: [2, 44], text: 'They’re building the sheds,|the power, the steel.', highlights: ['steel.'], size: 40, media: {src: 'concrete/b13_steelframe.jpg', type: 'img', effect: 'in'}},
  // 14 CARD backlogs
  {dur: 119, kind: 'lines', text: 'Q3 DRIVER: AI INFRA|BACKLOGS BROADENING|MACHINERY + METALS', highlights: ['broadening'], reveal: [0, 22, 44], media: {src: 'concrete/b14_metal.jpg', type: 'img', effect: 'in'}},
  // 15 BLACK
  {dur: 49, kind: 'text', reveal: [0, 0], text: 'This is the part|that makes it work.', highlights: ['work.'], size: 48},
  // 16
  {dur: 73, kind: 'text', reveal: [2, 40], text: 'A chip is priced on|what it might do.', highlights: ['might'], size: 42, media: {src: 'concrete/b16_chip.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 80, kind: 'text', reveal: [2, 40], text: 'A backlog is priced|on a signed order.', highlights: ['signed'], size: 42, media: {src: 'concrete/b17_contract.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 118, kind: 'text', reveal: [2, 46], enter: 'slideL', text: 'When valuations fall|and earnings don’t,', highlights: ['fall'], size: 40, media: {src: 'concrete/b18_scale.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 93, kind: 'text', reveal: [2, 44], text: 'the money rotates|from the story to the invoice.', highlights: ['invoice.'], size: 40, media: {src: 'concrete/b19_invoice.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 89, kind: 'text', reveal: [2, 46], text: 'Nvidia sells the dream.|Somebody pours the floor.', highlights: ['floor.'], size: 42, media: {src: 'concrete/b20_concrete.mp4', type: 'video', effect: 'in'}},
  // 21
  {dur: 122, kind: 'text', reveal: [2, 52], enter: 'slideR', text: 'Every gold rush|has two trades.', highlights: ['two'], size: 44, media: {src: 'concrete/b21_gold.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 54, kind: 'text', reveal: [0, 0], text: 'The gold.|And the shovels.', highlights: ['shovels.'], size: 46, media: {src: 'concrete/b22_shovels.jpg', type: 'img', effect: 'in'}},
  // 23 RED impact
  {dur: 119, kind: 'impact', text: 'Wall Street is moving|to the second.', highlights: ['second'], redBg: true},
  // 24
  {dur: 47, kind: 'text', reveal: [0, 0], text: 'Not because|AI is failing.', highlights: ['failing.'], size: 44, media: {src: 'concrete/b24_crane.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 84, kind: 'text', reveal: [2, 44], text: 'The building phase is where|the contracts are.', highlights: ['contracts'], size: 40, media: {src: 'concrete/b25_site.jpg', type: 'img', effect: 'in'}},
  // 26 CTA
  {dur: 101, kind: 'text', reveal: [2, 22, 60], enter: 'zoom', text: 'Chips or concrete|for the next two years?|Tell me below.', highlights: ['concrete'], size: 40, media: {src: 'concrete/b26_road.mp4', type: 'video', effect: 'in'}},
];

// Sound-effect cues (frame, file, gain). Impacts punch the open, the three cards, the
// story->invoice thesis and the red card; whooshes mark the "this is where" pivot, the
// "makes it work" turn, the gold-rush beat and the CTA. Frames align to BEAT STARTS.
type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 432, src: 'media/sfx_impact.mp3', vol: 0.45},
  {at: 755, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 1019, src: 'media/sfx_whoosh.mp3', vol: 0.35},
  {at: 1581, src: 'media/sfx_impact.mp3', vol: 0.45},
  {at: 1700, src: 'media/sfx_whoosh.mp3', vol: 0.35},
  {at: 2020, src: 'media/sfx_impact.mp3', vol: 0.45},
  {at: 2202, src: 'media/sfx_whoosh.mp3', vol: 0.35},
  {at: 2378, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 2628, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The invoice</span>
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
export const ConcreteReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('concrete/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('concrete/music.mp3')}
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
