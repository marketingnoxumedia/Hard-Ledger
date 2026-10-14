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
// "The ticket" reel (TicketReel) — fast NEWS reel, Hard Ledger house format.
// NEW topic: why Rockstar would bring GTA 6 to PC in ~4 months when GTA 5 took 19. Thesis: it isn't
// generosity, it's rational — the console-exclusivity window only pays when it SELLS consoles, and
// this time the consoles (PS5 Pro) are already sold out in a memory-chip shortage, so the fastest
// route to the money isn't exclusivity: the game is the TICKET, GTA Online is the BUSINESS (12 years
// of microtransactions), and the move is to get Online in front of every screen on earth as fast as
// possible — PC included. Full QUESTION/STORY/ANSWER/CTA with a ~1.1s post-hook pause; close is the
// supplied CTA QUESTION ("Waiting for PC or buying day one? Tell me below."). 27 beats: 24 media
// (incl. 2 video + 4 cards: CONSOLES 19 NOV / PC Q1 2027 (REPORTED); GTA 5 19 MONTHS / RDR2 13 / GTA
// 6 ~4; PS5 PRO SOLD OUT / USED > NEW; GTA ONLINE 12 YEARS OF REVENUE) / 1 red impact ("Rockstar
// isn't being generous. It's being rational.") / 2 black. Red card mid-tail (beat 21). Durations /
// reveals / SFX locked to the VO via a scribe_v1 word-timestamp anchor pass (public/ticket/
// voiceover.mp3, ~101.96s incl. the post-hook pause). Restated-fact cards land where the VO speaks
// them.
// NB: OWN distinct footage under public/ticket/, NO reuse of any other reel's clips.
// FOOTAGE is strictly BRAND-FREE AND FACE-FREE -- generic gaming / tech / money / crowd b-roll, NO
// game or company logos or imagery (no GTA / Rockstar / Take-Two / Red Dead screenshots, characters
// or box art), NO console-maker logos or brand-shaped controllers (no PlayStation DualSense / Xbox /
// Nintendo), NO store logos (Steam / Epic), NO readable brand marks, NO banknote portrait faces, NO
// identifiable human faces (hands / backs / blurred crowds only).
// **SENSITIVE -- verify before publishing:** the Nov 19 2026 console launch is confirmed and "no PC
// version announced / Take-Two lists consoles only" is accurate. NOT independently verified: the
// GamesBeat "four sources / PC in Q1 2027" report (I could not find it; general estimates actually
// skew LATER, to late 2027-2028), the "PS5 Pro sold out / used > new / memory-chip shortage" claim,
// and "GTA 5 the most profitable entertainment product ever." The script already hedges the PC
// timing ("reported", "Rockstar hasn't confirmed"); confirm the GamesBeat source and the shortage
// figures before publishing. The strategy read ("it's rational / the game is the ticket") is
// editorial opinion.
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK (held through ~1.1s post-hook pause)
  {dur: 222, kind: 'hook', reveal: [3, 60, 116], text: 'Why would Rockstar bring|GTA 6 to PC in four months|when GTA 5 took 19?', kicker: 'The ticket', highlights: ['19?'], size: 40, media: {src: 'ticket/b00_rig.mp4', type: 'video', effect: 'in'}},
  // 1
  {dur: 193, kind: 'text', reveal: [2, 52, 122], text: 'GTA 6 hits|PlayStation and Xbox|November 19th.', highlights: ['19th.'], size: 42, media: {src: 'ticket/b04_consolebox.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 204, kind: 'text', reveal: [2, 74, 107], enter: 'slideL', text: 'GamesBeat: four sources|say the PC version|lands in early 2027.', highlights: ['2027.'], size: 40, media: {src: 'ticket/b03_list.jpg', type: 'img', effect: 'in'}},
  // 3 CARD
  {dur: 161, kind: 'lines', reveal: [0, 70], text: 'CONSOLES: 19 NOV 2026|PC: Q1 2027 (REPORTED)', highlights: ['q1'], media: {src: 'ticket/b02_calendar.jpg', type: 'img', effect: 'in'}},
  // 4 BLACK
  {dur: 50, kind: 'text', reveal: [0, 0], text: 'But nobody|tells you this part.', highlights: ['part.'], size: 50},
  // 5
  {dur: 191, kind: 'text', reveal: [2, 119], text: 'GTA 5 hit consoles in 2013.|PC waited until 2015.', highlights: ['2015.'], size: 42, media: {src: 'ticket/b07_retroconsole.jpg', type: 'img', effect: 'in'}},
  // 6 CARD
  {dur: 94, kind: 'lines', reveal: [0, 30, 60], text: 'GTA 5: 19 MONTHS|RDR2: 13|GTA 6: ~4', highlights: ['~4'], media: {src: 'ticket/b09_calendar2.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 118, kind: 'text', reveal: [2, 67], text: 'The exclusivity window|was the business model.', highlights: ['model.'], size: 42, media: {src: 'ticket/b06_coins.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 98, kind: 'text', reveal: [2, 60], enter: 'slideR', text: 'Sony and Microsoft pay.|It sells consoles.', highlights: ['consoles.'], size: 42, media: {src: 'ticket/b11_moneyhands.jpg', type: 'img', effect: 'in'}},
  // 9 BLACK
  {dur: 43, kind: 'text', reveal: [0, 0], text: 'But that’s not|the craziest part.', highlights: ['craziest'], size: 48},
  // 10
  {dur: 79, kind: 'text', reveal: [2, 20], text: 'This time, the consoles|are already sold out.', highlights: ['out.'], size: 42, media: {src: 'ticket/b12_soldout.jpg', type: 'img', effect: 'in'}},
  // 11 CARD
  {dur: 165, kind: 'lines', reveal: [0, 55], text: 'PS5 PRO: SOLD OUT|USED > NEW', highlights: ['new'], media: {src: 'ticket/b15_pricetag.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 36, kind: 'text', reveal: [2, 16], text: 'Sony can’t|build enough.', highlights: ['enough.'], size: 46, media: {src: 'ticket/b13_chips.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 140, kind: 'text', reveal: [2, 66], enter: 'slideL', text: 'Exclusivity means nothing|if no one can buy it.', highlights: ['buy'], size: 42, media: {src: 'ticket/b14_factory.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 47, kind: 'text', reveal: [2, 25], text: 'Here’s exactly|how they do it.', highlights: ['exactly'], size: 46, media: {src: 'ticket/b08_monitor.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 132, kind: 'text', reveal: [2, 76], text: 'GTA 5: the most profitable|product in entertainment.', highlights: ['profitable'], size: 40, media: {src: 'ticket/b16_cash.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 116, kind: 'text', reveal: [2, 41], text: 'Most of the money came|after launch — from Online.', highlights: ['online.'], size: 40, media: {src: 'ticket/b18_servers.mp4', type: 'video', effect: 'in'}},
  // 17 CARD
  {dur: 84, kind: 'lines', reveal: [0, 50], text: 'GTA ONLINE:|12 YEARS OF REVENUE', highlights: ['12'], media: {src: 'ticket/b17_card.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 114, kind: 'text', reveal: [2, 58], text: 'The PC release is timed|with GTA 6 Online.', highlights: ['online.'], size: 42, media: {src: 'ticket/b23_keyboard.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 84, kind: 'text', reveal: [2, 46], enter: 'slideR', text: 'The game is the ticket.|Online is the business.', highlights: ['ticket.'], size: 42, media: {src: 'ticket/b20_ticket.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 120, kind: 'text', reveal: [2, 67], text: 'PC has the biggest|audience Steam’s ever seen.', highlights: ['biggest'], size: 40, media: {src: 'ticket/b22_crowd.jpg', type: 'img', effect: 'in'}},
  // 21 RED impact (mid-tail thesis)
  {dur: 96, kind: 'impact', text: 'Rockstar isn’t|being generous.|It’s being rational.', redBg: true},
  // 22
  {dur: 84, kind: 'text', reveal: [2, 52], text: 'The window only pays|when it sells consoles.', highlights: ['consoles.'], size: 42, media: {src: 'ticket/b21_graph.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 68, kind: 'text', reveal: [2, 29], text: 'And the consoles|are selling themselves.', highlights: ['themselves.'], size: 42, media: {src: 'ticket/b25_queue.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 106, kind: 'text', reveal: [2, 61], text: 'The fastest route to the money|isn’t exclusivity.', highlights: ['exclusivity.'], size: 40, media: {src: 'ticket/b24_screens.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 129, kind: 'text', reveal: [2, 50], text: 'It’s getting Online|on every screen on earth.', highlights: ['earth.'], size: 40, media: {src: 'ticket/b26_globe.jpg', type: 'img', effect: 'in'}},
  // 26 CTA
  {dur: 91, kind: 'text', reveal: [2, 34], enter: 'zoom', text: 'Waiting for PC,|or buying day one?', highlights: ['one?'], size: 44, media: {src: 'ticket/b05_controllerhands.jpg', type: 'img', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 619, src: 'media/sfx_impact.mp3', vol: 0.45}, // consoles/PC card
  {at: 780, src: 'media/sfx_whoosh.mp3', vol: 0.35}, // into black
  {at: 1021, src: 'media/sfx_impact.mp3', vol: 0.48}, // 19/13/4 card
  {at: 1331, src: 'media/sfx_whoosh.mp3', vol: 0.35}, // into black
  {at: 1453, src: 'media/sfx_impact.mp3', vol: 0.48}, // sold out card
  {at: 2089, src: 'media/sfx_impact.mp3', vol: 0.48}, // GTA Online 12yrs card
  {at: 2491, src: 'media/sfx_impact.mp3', vol: 0.55}, // red thesis
  {at: 2974, src: 'media/sfx_whoosh.mp3', vol: 0.4}, // CTA
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The ticket</span>
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
export const TicketReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('ticket/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('ticket/music.mp3')}
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
