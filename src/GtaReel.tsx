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
  pos?: 'center' | 'upper' | 'lower' | 'left' | 'right' | 'upperLeft' | 'upperRight' | 'lowerLeft' | 'lowerRight';
};

// ---------------------------------------------------------------------------
// "The launch" reel (GtaReel) — fast NEWS reel, Hard Ledger house VISUAL format, gaming / tech / business topic.
// TOPIC: GTA 6 IS ALMOST HERE, but Take-Two is already looking at the next decade. After years of delays, GTA 6 is days
// away, and Take-Two CEO Strauss Zelnick says the launch could change the franchise's future. The twist: the company
// isn't just prepping GTA 6 — it's thinking about how Rockstar delivers content over the NEXT TEN YEARS. In an IGN
// interview Zelnick said he's optimistic about the NOVEMBER 19 launch and confirmed NO further delay; the company says
// GTA 6 preorders are tracking far beyond expectations, and Rockstar will keep supporting GTA ONLINE after launch. The
// biggest statement: Zelnick expects the pace and nature of content from major franchises (GTA included) to look
// dramatically different over the next decade — more ways to reach players, stronger post-launch experiences, a faster
// flow of content — but it does NOT confirm a GTA 7 release date. Debate: can Rockstar ship more often without
// sacrificing the quality that made the franchise? Would you wait a decade for a masterpiece, or get new GTA more often?
// NOTE ON VOICE: built VERBATIM from a client-supplied script in the influencer "curiosity-gap" format, NOT the faceless
// house voice — it uses an EARLY "follow for more" CTA and CLOSES on a "let us know below" debate CTA. Per the saved
// house preference, captions are <=5-6 words/beat with LARGER on-screen type (Anton 42-52). 46 beats. NO stat cards (the
// script states no hard figures and none were invented; the "November 19" date and "ten years"/"decade" stay in-caption
// as the VO states them). 1 red impact at the CONTROVERSY pivot ("Without sacrificing / quality?" — the frequency-vs-
// quality tension; reel closes on the below-CTA media beat), no black beat. Captions match the VO verbatim. Durations/
// reveals/SFX locked to the VO via a scribe_v1 word-timestamp anchor pass (public/gta/voiceover.mp3). Built at the house
// +10% pacing default; its own tense gaming/tech-business music mixed at 0.2. OWN distinct footage under public/gta/ (45
// stills), NO reuse of any other reel's clips — ledger-checked. ADJACENT to but DISTINCT from TicketReel (the GTA 6
// PC-port timing / GTA-Online-as-business reel) and PlaystationReel ("The exchange", PS5 Pro price with GTA 6 as a demand
// driver) — this is Take-Two's CEO decade-of-content outlook / the Nov-19 launch and GTA 7.
// FOOTAGE is strictly BRAND-FREE — NO GTA / Grand Theft Auto / Rockstar / Take-Two / IGN logo or wordmark, NO game
// screenshots, characters, map or key art, NO Strauss-Zelnick likeness or any identifiable face, NO console brand mark
// (PlayStation / Xbox / Nintendo) or DualSense/controller-button glyphs, NO national flag, NO readable brand / sign /
// screen / store text, NO readable currency. Metaphor-led gaming / tech / business b-roll only: a generic unbranded game
// controller in neon light, an arcade / neon-lit room, a dark gamer setup with RGB glow and blank monitors, abstract
// code / data streams and a city-at-night skyline for the open-world feel, a countdown clock / calendar for the Nov-19
// date and the decade, a hooded figure at a keyboard (no face) for the studio, a hundred-dollar-free stack-of-chips /
// upward chart for preorders & business, a long road / horizon and a branching path for "what comes next", a scale /
// tug-of-war for the speed-vs-quality debate, blank-screen phones for the FOLLOW and below CTAs.
// **UNVERIFIED — states specific, checkable, fast-moving claims (the Nov 19 2025 GTA 6 launch and no-further-delay; CEO
// Strauss Zelnick's IGN remarks; preorders "far beyond expectations"; continued GTA Online support; the next-decade
// content-pace comments; GTA 7 unconfirmed). Rendered VERBATIM as supplied, but every name, date and quote MUST be fact-
// checked against primary sources (Take-Two / Rockstar / the IGN interview) before publishing — launch dates and
// executive quotes move. This is general information, not investment advice.**
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 79, kind: 'hook', reveal: [3, 40], text: 'After years|of delays,', kicker: 'The launch', highlights: ['delays,'], size: 54, media: {src: 'gta/gt00_delays.jpg', type: 'img', effect: 'in'}},
  // 1
  {dur: 58, kind: 'text', reveal: [2, 28], text: 'GTA 6 is finally|just days away.', highlights: ['days'], size: 44, pos: 'upperRight', media: {src: 'gta/gt01_daysaway.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 68, kind: 'text', reveal: [2, 28], text: 'And according to|Take-Two’s CEO,', highlights: [], size: 48, pos: 'left', media: {src: 'gta/gt02_ceo.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 34, kind: 'text', reveal: [2], text: 'this launch could change', highlights: ['change'], size: 50, pos: 'lowerRight', media: {src: 'gta/gt03_launch.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 75, kind: 'text', reveal: [2, 28], text: 'the future of|the entire franchise.', highlights: ['franchise.'], size: 44, pos: 'upperLeft', media: {src: 'gta/gt04_franchise.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 31, kind: 'text', reveal: [2], text: 'But here’s what makes', highlights: [], size: 50, pos: 'right', media: {src: 'gta/gt05_makes.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 57, kind: 'text', reveal: [2, 28], text: 'his latest comments|interesting.', highlights: ['interesting.'], size: 50, pos: 'lower', media: {src: 'gta/gt06_interesting.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 80, kind: 'text', reveal: [2, 28], text: 'The company isn’t just|preparing for GTA 6.', highlights: [], size: 44, pos: 'lowerLeft', media: {src: 'gta/gt07_preparing.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 33, kind: 'text', reveal: [2], text: 'It’s thinking about', highlights: [], size: 52, pos: 'upperRight', media: {src: 'gta/gt08_thinking.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 47, kind: 'text', reveal: [2], text: 'how Rockstar will deliver', highlights: ['Rockstar'], size: 50, pos: 'left', media: {src: 'gta/gt09_deliver.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 81, kind: 'text', reveal: [2, 28], text: 'content over the|next ten years.', highlights: ['ten'], size: 44, pos: 'right', media: {src: 'gta/gt10_tenyears.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 40, kind: 'text', reveal: [2, 28], text: 'Before we|break it down,', highlights: [], size: 48, pos: 'upperLeft', media: {src: 'gta/gt11_breakitdown.jpg', type: 'img', effect: 'in'}},
  // 12 FOLLOW
  {dur: 86, kind: 'text', reveal: [2], text: 'follow for more|gaming and technology news.', highlights: ['follow'], size: 44, pos: 'lowerRight', media: {src: 'gta/gt12_follow.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 106, kind: 'text', reveal: [2, 28], text: 'In an interview|with IGN,', highlights: ['IGN,'], size: 48, pos: 'upper', media: {src: 'gta/gt13_ign.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 39, kind: 'text', reveal: [2, 28], text: 'Take-Two CEO|Strauss Zelnick said', highlights: ['Zelnick'], size: 48, pos: 'left', media: {src: 'gta/gt14_zelnick.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 42, kind: 'text', reveal: [2], text: 'he feels optimistic', highlights: ['optimistic'], size: 52, pos: 'right', media: {src: 'gta/gt15_optimistic.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 55, kind: 'text', reveal: [2, 28], text: 'about the|November 19 launch.', highlights: ['November'], size: 48, pos: 'lowerLeft', media: {src: 'gta/gt16_nov19.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 31, kind: 'text', reveal: [2], text: 'He also confirmed', highlights: [], size: 52, pos: 'upperRight', media: {src: 'gta/gt17_confirmed.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 92, kind: 'text', reveal: [2, 28], text: 'that the game will|not be delayed again.', highlights: ['delayed'], size: 44, pos: 'left', media: {src: 'gta/gt18_notdelayed.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 83, kind: 'text', reveal: [2, 28], text: 'The company says|GTA 6 preorders', highlights: ['preorders'], size: 44, pos: 'lowerRight', media: {src: 'gta/gt19_preorders.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 60, kind: 'text', reveal: [2], text: 'are tracking far beyond', highlights: ['beyond'], size: 50, pos: 'upperLeft', media: {src: 'gta/gt20_tracking.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 53, kind: 'text', reveal: [2], text: 'its initial expectations.', highlights: ['expectations.'], size: 52, pos: 'right', media: {src: 'gta/gt21_expectations.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 28, kind: 'text', reveal: [2], text: 'And Zelnick revealed', highlights: ['revealed'], size: 52, pos: 'lower', media: {src: 'gta/gt22_revealed.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 74, kind: 'text', reveal: [2, 28], text: 'that Rockstar plans|to keep supporting', highlights: ['supporting'], size: 44, pos: 'upperRight', media: {src: 'gta/gt23_supporting.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 47, kind: 'text', reveal: [2], text: 'GTA Online,', highlights: ['Online,'], size: 52, pos: 'lowerLeft', media: {src: 'gta/gt24_gtaonline.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 79, kind: 'text', reveal: [2, 28], text: 'even after the|new game arrives.', highlights: [], size: 44, pos: 'left', media: {src: 'gta/gt25_newgame.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 37, kind: 'text', reveal: [2], text: 'But the biggest statement', highlights: ['biggest'], size: 50, pos: 'right', media: {src: 'gta/gt26_biggest.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 61, kind: 'text', reveal: [2, 28], text: 'was about|what comes next.', highlights: ['next.'], size: 48, pos: 'lowerRight', media: {src: 'gta/gt27_whatnext.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 59, kind: 'text', reveal: [2, 28], text: 'Zelnick expects|the pace and nature', highlights: ['pace'], size: 44, pos: 'upperLeft', media: {src: 'gta/gt28_pace.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 66, kind: 'text', reveal: [2, 28], text: 'of content from|major franchises,', highlights: [], size: 48, pos: 'right', media: {src: 'gta/gt29_franchises.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 40, kind: 'text', reveal: [2], text: 'including GTA,', highlights: ['GTA,'], size: 52, pos: 'upperRight', media: {src: 'gta/gt30_includinggta.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 58, kind: 'text', reveal: [2, 28], text: 'to look|dramatically different', highlights: ['dramatically'], size: 50, pos: 'left', media: {src: 'gta/gt31_different.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 39, kind: 'text', reveal: [2], text: 'over the next decade.', highlights: ['decade.'], size: 50, pos: 'lowerLeft', media: {src: 'gta/gt32_decade.jpg', type: 'img', effect: 'in'}},
  // 33
  {dur: 64, kind: 'text', reveal: [2, 28], text: 'That could mean|more ways to reach players,', highlights: ['players,'], size: 44, pos: 'upper', media: {src: 'gta/gt33_players.jpg', type: 'img', effect: 'in'}},
  // 34
  {dur: 59, kind: 'text', reveal: [2, 28], text: 'stronger|post-launch experiences,', highlights: ['stronger'], size: 52, pos: 'right', media: {src: 'gta/gt34_postlaunch.jpg', type: 'img', effect: 'in'}},
  // 35
  {dur: 94, kind: 'text', reveal: [2, 28], text: 'and potentially a|faster flow of content.', highlights: ['faster'], size: 44, pos: 'lowerRight', media: {src: 'gta/gt35_faster.jpg', type: 'img', effect: 'in'}},
  // 36
  {dur: 89, kind: 'text', reveal: [2], text: 'But it does not confirm', highlights: [], size: 46, pos: 'upperLeft', media: {src: 'gta/gt36_notconfirm.jpg', type: 'img', effect: 'in'}},
  // 37
  {dur: 26, kind: 'text', reveal: [2, 28], text: 'a GTA 7|release date.', highlights: ['7'], size: 48, pos: 'left', media: {src: 'gta/gt37_gta7.jpg', type: 'img', effect: 'in'}},
  // 38
  {dur: 31, kind: 'text', reveal: [2], text: 'The big question is', highlights: ['question'], size: 50, pos: 'lowerRight', media: {src: 'gta/gt38_bigquestion.jpg', type: 'img', effect: 'in'}},
  // 39
  {dur: 43, kind: 'text', reveal: [2], text: 'whether Rockstar can deliver', highlights: [], size: 50, pos: 'upperRight', media: {src: 'gta/gt39_frequent.jpg', type: 'img', effect: 'in'}},
  // 40
  {dur: 39, kind: 'text', reveal: [2], text: 'more frequent releases', highlights: ['frequent'], size: 52, pos: 'right', media: {src: 'gta/gt40_releases.jpg', type: 'img', effect: 'in'}},
  // 41 RED
  {dur: 145, kind: 'impact', redBg: true, text: 'Without sacrificing|quality?'},
  // 42
  {dur: 28, kind: 'text', reveal: [2], text: 'Would you rather wait', highlights: [], size: 50, pos: 'lowerLeft', media: {src: 'gta/gt42_rather.jpg', type: 'img', effect: 'in'}},
  // 43
  {dur: 59, kind: 'text', reveal: [2, 28], text: 'another decade|for a masterpiece,', highlights: ['masterpiece,'], size: 48, pos: 'left', media: {src: 'gta/gt43_masterpiece.jpg', type: 'img', effect: 'in'}},
  // 44
  {dur: 97, kind: 'text', reveal: [2, 28], text: 'or get new GTA|experiences more often?', highlights: ['often?'], size: 44, pos: 'upperRight', media: {src: 'gta/gt44_moreoften.jpg', type: 'img', effect: 'in'}},
  // 45 CTA
  {dur: 38, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Let us know|below.', highlights: ['below.'], size: 52, media: {src: 'gta/gt45_below.jpg', type: 'img', effect: 'in'}},
];


type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 2363, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 2692, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
const Caption: React.FC<{text: string; highlights?: string[]; size?: number; align?: 'center' | 'flex-start' | 'flex-end'; typewriter?: boolean; lineSync?: boolean; lineReveal?: number[]}> = ({text, highlights = [], size = 112, align = 'center', typewriter = false, lineSync = false, lineReveal}) => {
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
        <div key={li} style={{display: 'flex', flexWrap: 'wrap', justifyContent: align === 'center' ? 'center' : align === 'flex-end' ? 'flex-end' : 'flex-start', gap: '0 18px', opacity: lineOp[li]}}>
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

const POS: Record<string, {jc: 'center' | 'flex-start' | 'flex-end'; ai: 'center' | 'flex-start' | 'flex-end'; al: 'center' | 'flex-start' | 'flex-end'; pt: number; pb: number}> = {
  center:     {jc: 'center',     ai: 'center',     al: 'center',     pt: 84,  pb: 84},
  upper:      {jc: 'flex-start', ai: 'center',     al: 'center',     pt: 300, pb: 84},
  lower:      {jc: 'flex-end',   ai: 'center',     al: 'center',     pt: 84,  pb: 360},
  left:       {jc: 'center',     ai: 'flex-start', al: 'flex-start', pt: 84,  pb: 84},
  right:      {jc: 'center',     ai: 'flex-end',   al: 'flex-end',   pt: 84,  pb: 84},
  upperLeft:  {jc: 'flex-start', ai: 'flex-start', al: 'flex-start', pt: 300, pb: 84},
  upperRight: {jc: 'flex-start', ai: 'flex-end',   al: 'flex-end',   pt: 190, pb: 84},
  lowerLeft:  {jc: 'flex-end',   ai: 'flex-start', al: 'flex-start', pt: 84,  pb: 320},
  lowerRight: {jc: 'flex-end',   ai: 'flex-end',   al: 'flex-end',   pt: 84,  pb: 320},
};
const SceneText: React.FC<{text: string; highlights?: string[]; size?: number; reveal?: number[]; pos?: string}> = ({text, highlights, size = 100, reveal, pos = 'center'}) => {
  const p = POS[pos] || POS.center;
  const sidey = pos !== 'center' && pos !== 'upper' && pos !== 'lower';
  return (
    <AbsoluteFill style={{justifyContent: p.jc, alignItems: p.ai, paddingLeft: 80, paddingRight: 80, paddingTop: p.pt, paddingBottom: p.pb}}>
      <div style={{maxWidth: sidey ? 740 : '100%'}}>
        <Caption text={text} highlights={highlights} size={size} align={p.al} typewriter={false} lineSync lineReveal={reveal} />
      </div>
    </AbsoluteFill>
  );
};

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
          {stat.suffix ? <span style={{fontFamily: HEAD, fontSize: 120, color: C.red, lineHeight: 1, marginLeft: stat.suffix && stat.suffix.trim().length > 1 ? 18 : 3}}>{stat.suffix.trim()}</span> : null}
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The launch</span>
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
      return <SceneText text={s.text!} highlights={s.highlights} size={s.size} reveal={s.reveal} pos={s.pos} />;
    case 'stat':
      return <SceneStat stat={s.stat!} />;
    case 'impact':
      return <SceneImpact text={s.text!} redBg={s.redBg} />;
    default:
      return null;
  }
};

// ---------------------------------------------------------------------------
export const GtaReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('gta/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('gta/music.mp3')}
        volume={(f) => interpolate(f, [0, 20, DURATION_IN_FRAMES - 55, DURATION_IN_FRAMES], [0, 0.2, 0.2, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}
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
