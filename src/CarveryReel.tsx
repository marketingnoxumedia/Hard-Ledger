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
// "The comparison" reel (CarveryReel) — fast NEWS reel, Hard Ledger house format.
// NEW topic: why Britain's biggest hotel company (Whitbread, owner of Premier Inn) closed ~200
// Beefeater & Brewers Fayre restaurants that new buyers now want to reopen. Thesis: the business
// didn't fail — it LOST A COMPARISON. A Beefeater is usually bolted on to a Premier Inn; a hotel
// room earns every night with two staff per floor, a restaurant earns twice a day with a whole
// kitchen — same square footage, different margin. In 2024 Whitbread said it would turn 112
// restaurants into 3,500 hotel rooms; the sites it SOLD are the ones with no hotel to convert into
// (dead weight to a hotel company, a restaurant to a restaurant company). April 2026 it announced
// shutting 197 restaurants / 3,800 jobs (last closed September); this week 110 are coming back via
// two buyers (one a new group run by a doughnut-chain founder), 1,600 jobs from mid-November. The
// answer: Whitbread wasn't asking if a Brewers Fayre makes money, but if it makes more than the
// rooms it's standing on — it doesn't; the new owners are buying the bits a hotel company couldn't
// use. Full VERBATIM QUESTION/STORY/ANSWER/CTA with a ~1.1s post-hook pause; close is the supplied
// CTA QUESTION ("Would you go back to a reopened Beefeater? Tell me below."). Sped VO (atempo
// ~1.15) — total ~2789 frames = ~93s (final CTA beat extended for a clean tail). 28 beats: 25
// media (incl. video b-roll + 3 cards: 197 RESTAURANTS/3,800 JOBS/CLOSED SEPT; 110 REOPENING/1,600
// JOBS/FROM MID-NOV; 112 RESTAURANTS → 3,500 HOTEL ROOMS) / 1 red impact ("The business didn't
// fail. It lost a comparison.") / 2 black ("Here's the piece you're missing." + "This is the part
// that makes it work.").
// NB: OWN distinct footage under public/carvery/, NO reuse of CostaReel's (the Coca-Cola/Costa-
// from-Whitbread reel) or any other reel's clips.
// COMPANIES/FIGURES/EVENT are editorial (VO + text only); FOOTAGE is strictly BRAND-FREE AND
// FACE-FREE -- generic hotel / restaurant / construction / money b-roll, NO Whitbread / Premier
// Inn (no purple logo) / Beefeater / Brewers Fayre / Travelodge / any hotel or doughnut chain
// logo or signage, NO readable brand text, NO banknote portrait faces, NO flags or seals, NO human
// faces. Own footage public/carvery/.
// **TIME-SENSITIVE / UNVERIFIED -- verify before publishing:** attributes an April-2026 Whitbread
// closure (197 restaurants / 3,800 jobs / last closed September), a 110-reopening by two buyers
// (one a doughnut-chain founder, 1,600 jobs, mid-November), a 2024 plan to convert 112 restaurants
// into 3,500 hotel rooms, and the room-vs-restaurant margin framing. All author-supplied and
// rendered as written; confirm every figure and the closure/reopening claims against primary
// sources before this publishes.
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK (held through ~1.1s post-hook pause)
  {dur: 240, kind: 'hook', reveal: [2, 40, 92], text: 'Why close 200 restaurants|someone else|now wants to reopen?', kicker: 'The comparison', highlights: ['reopen?'], size: 42, media: {src: 'carvery/b00_hotelrest.mp4', type: 'video', effect: 'in'}},
  // 1
  {dur: 86, kind: 'text', reveal: [0, 0], text: 'April 2026.|The news breaks.', highlights: ['2026.'], size: 46, media: {src: 'carvery/b01_calendar.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 70, kind: 'text', reveal: [0, 0], enter: 'slideL', text: 'Whitbread owns|Premier Inn.', highlights: ['premier'], size: 44, media: {src: 'carvery/b02_hotel.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 130, kind: 'text', reveal: [2, 52], text: 'It’s shutting every Beefeater|and Brewers Fayre.', highlights: ['shutting'], size: 42, media: {src: 'carvery/b03_closed.jpg', type: 'img', effect: 'in'}},
  // 4 CARD
  {dur: 136, kind: 'lines', text: '197 RESTAURANTS|3,800 JOBS|CLOSED SEPT', highlights: ['3,800'], reveal: [0, 26, 58], media: {src: 'carvery/b04_emptydining.jpg', type: 'img', effect: 'in'}},
  // 5 BLACK
  {dur: 30, kind: 'text', reveal: [0, 0], text: "Here's the piece|you're missing.", highlights: ['missing.'], size: 50},
  // 6
  {dur: 88, kind: 'text', reveal: [2, 46], text: 'This week, 110|are coming back.', highlights: ['110'], size: 44, media: {src: 'carvery/b06_renovation.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 86, kind: 'text', reveal: [0, 0], text: 'Two buyers|step in.', highlights: ['two'], size: 46, media: {src: 'carvery/b07_handshake.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 66, kind: 'text', reveal: [2, 40], text: 'One, run by the founder|of a doughnut chain.', highlights: ['doughnut'], size: 42, media: {src: 'carvery/b08_doughnuts.jpg', type: 'img', effect: 'in'}},
  // 9 CARD
  {dur: 109, kind: 'lines', text: '110 REOPENING|1,600 JOBS|FROM MID-NOV', highlights: ['1,600'], reveal: [0, 26, 58], media: {src: 'carvery/b09_kitchen.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 114, kind: 'text', reveal: [0, 0], text: 'And this is where|it gets interesting.', highlights: ['interesting.'], size: 44, media: {src: 'carvery/b10_magnifier.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 99, kind: 'text', reveal: [2, 46], text: 'They didn’t close because|nobody wanted a carvery.', highlights: ['carvery.'], size: 40, media: {src: 'carvery/b11_carvery.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 78, kind: 'text', reveal: [2, 44], text: 'They closed because of|what sits next to them.', highlights: ['next'], size: 42, media: {src: 'carvery/b12_adjacency.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 119, kind: 'text', reveal: [2, 50], enter: 'slideR', text: 'Most Beefeaters are bolted|onto a Premier Inn.', highlights: ['bolted'], size: 42, media: {src: 'carvery/b13_hotelrestaurant.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 80, kind: 'text', reveal: [2, 44], text: 'In 2024, Whitbread said|it would convert them.', highlights: ['convert'], size: 42, media: {src: 'carvery/b14_construction.jpg', type: 'img', effect: 'in'}},
  // 15 CARD
  {dur: 100, kind: 'lines', text: '112 RESTAURANTS →|3,500 HOTEL ROOMS', highlights: ['3,500'], reveal: [0, 24], media: {src: 'carvery/b15_hotelrooms.jpg', type: 'img', effect: 'in'}},
  // 16 BLACK
  {dur: 51, kind: 'text', reveal: [0, 0], text: 'This is the part|that makes it work.', highlights: ['work.'], size: 48},
  // 17
  {dur: 127, kind: 'text', reveal: [2, 52], text: 'A hotel room earns every night,|two staff per floor.', highlights: ['night,'], size: 40, media: {src: 'carvery/b17_room_night.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 80, kind: 'text', reveal: [2, 44], text: 'A restaurant earns twice a day,|with a whole kitchen.', highlights: ['kitchen.'], size: 40, media: {src: 'carvery/b18_kitchen.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 130, kind: 'text', reveal: [2, 52], enter: 'slideL', text: 'Same square footage.|Different margin.', highlights: ['margin.'], size: 44, media: {src: 'carvery/b19_floorplan.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 95, kind: 'text', reveal: [2, 46], text: 'The sites sold have|no hotel to turn into.', highlights: ['hotel'], size: 42, media: {src: 'carvery/b20_standalone.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 97, kind: 'text', reveal: [2, 52], text: 'To a hotel firm, dead weight.|To a restaurant firm, a restaurant.', highlights: ['dead'], size: 38, media: {src: 'carvery/b21_emptyrest.jpg', type: 'img', effect: 'in'}},
  // 22 RED impact
  {dur: 90, kind: 'impact', text: 'The business didn’t fail.|It lost a comparison.', highlights: ['comparison'], redBg: true},
  // 23
  {dur: 136, kind: 'text', reveal: [2, 56], text: 'Whitbread wasn’t asking|if it makes money.', highlights: ['money.'], size: 42, media: {src: 'carvery/b23_money.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 68, kind: 'text', reveal: [2, 40], text: 'But if it makes more|than the rooms below it.', highlights: ['more'], size: 42, media: {src: 'carvery/b24_roomstack.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 60, kind: 'text', text: 'It doesn’t.', highlights: ['doesn’t.'], size: 58, media: {src: 'carvery/b25_emptyroom.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 114, kind: 'text', reveal: [2, 44, 88], text: 'They’re not rescuing a chain.|They’re buying the bits|a hotel firm couldn’t use.', highlights: ['bits'], size: 40, media: {src: 'carvery/b26_handover.jpg', type: 'img', effect: 'in'}},
  // 27 CTA
  {dur: 110, kind: 'text', reveal: [2, 22, 62], enter: 'zoom', text: 'Would you go back|to a reopened Beefeater?|Tell me below.', highlights: ['reopened'], size: 40, media: {src: 'carvery/b27_open.jpg', type: 'img', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 526, src: 'media/sfx_impact.mp3', vol: 0.45},
  {at: 932, src: 'media/sfx_impact.mp3', vol: 0.45},
  {at: 1041, src: 'media/sfx_whoosh.mp3', vol: 0.35},
  {at: 1531, src: 'media/sfx_impact.mp3', vol: 0.45},
  {at: 1631, src: 'media/sfx_whoosh.mp3', vol: 0.35},
  {at: 1889, src: 'media/sfx_impact.mp3', vol: 0.45},
  {at: 2211, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 2505, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 2679, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The comparison</span>
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
export const CarveryReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('carvery/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('carvery/music.mp3')}
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
