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
// "The catch" reel (StarshipReel) — fast SPACE / FINANCE news reel, Hard Ledger house VISUAL format.
// TOPIC: SpaceX's STARSHIP pulled off a historic first on NOV 14 — the upper stage returned from orbit and was CAUGHT by
// the launch tower's mechanical arms in Texas. EVIDENCE: it spent 22+ hours in space, completed 14 orbits and deployed 26
// Starlink satellites before the catch. ESCALATION: the point isn't a bigger rocket but a REUSABLE one — reused again and
// again to make space access dramatically cheaper. CONSEQUENCES: per Evercore ISI analyst Kutgun Maral, reusability — how
// cheaply and frequently SpaceX can send payloads to orbit — is what could ultimately determine its value, more than the
// next Starlink contract or its AI ambitions. CONTROVERSY: the Super Heavy booster was NOT recovered this mission, and
// SpaceX still must prove it can reuse BOTH stages reliably; meanwhile rival ULA's Vulcan failed to deliver 40 Amazon Leo
// satellites to orbit. DEBATE: what makes SpaceX more valuable long-term — Starlink + AI, or reusable rockets as the
// backbone of the space industry?
// NOTE ON VOICE: built from a client-supplied script in the influencer "curiosity-gap" format, NOT the faceless house
// voice — it uses an EARLY "follow for more" CTA and CLOSES on a "what makes it more valuable?" debate question.
// Per the saved house preference, captions are <=5-6 words/beat with LARGER on-screen type (Anton 42-52). 40 beats. 3 stat
// cards: 22 HOURS IN SPACE, 26 STARLINK SATELLITES, 40 AMAZON LEO SATELLITES (the other figures — Nov 14, 14 orbits — stay
// in-caption). 1 red impact at the CONTROVERSY pivot ("Still a / catch."), no black beat. Captions track the VO (SpaceX /
// Starship / Starlink / Evercore / Kutgun Maral / Vulcan / United Launch Alliance stay in-caption). Durations/reveals/SFX
// locked to the VO via a scribe_v1 word-timestamp anchor pass (public/starship/voiceover.mp3). Built at the house +10%
// pacing default; its own tense space/tech-news music mixed at 0.2.
// FOOTAGE — PER CLIENT REQUEST, this reel uses TOPICAL on-subject space footage (real rockets, launch towers/gantries,
// liftoffs, rockets in space, Earth from orbit, satellites, mission control, rocket engines & boosters) rather than the
// abstract metaphors of other reels; the strict brand-free rule is RELAXED for this reel at the client's instruction.
// Still avoids readable on-screen UI/paragraph text and identifiable real faces where practical. OWN distinct footage under
// public/starship/ (39 stills), NO reuse — ledger-checked.
// **UNVERIFIED — names a REAL company and people (SpaceX, Starship/Super Heavy, Starlink, Evercore ISI analyst Kutgun
// Maral, United Launch Alliance / Vulcan, Amazon Leo) and cites specific, checkable claims: a Nov 14 orbital flight and
// tower-catch, 22+ hours in space, 14 orbits, 26 Starlink satellites deployed, the booster not recovered, and a Vulcan
// failure to deliver 40 Amazon Leo satellites. Rendered VERBATIM as supplied. Every figure, the date, the attribution to
// Kutgun Maral / Evercore and the Vulcan claim MUST be fact-checked against primary reporting before publishing. This is
// general business/space news, NOT investment advice; the closing line is the client's engagement prompt.**
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 202, kind: 'hook', reveal: [3, 40], text: 'One of the most important|moments in SpaceX’s history.', kicker: 'The catch', highlights: ['important'], size: 48, media: {src: 'starship/ss00_moment.jpg', type: 'img', effect: 'in'}},
  // 1
  {dur: 113, kind: 'text', reveal: [2, 28], text: 'Investors might be looking|at the wrong part.', highlights: ['wrong'], size: 44, pos: 'upperRight', media: {src: 'starship/ss01_wrongpart.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 48, kind: 'text', reveal: [2], text: 'Because what happened this weekend', highlights: ['weekend'], size: 46, pos: 'left', media: {src: 'starship/ss02_weekend.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 156, kind: 'text', reveal: [2], text: 'wasn’t just another rocket launch.', highlights: ['just'], size: 46, pos: 'lowerRight', media: {src: 'starship/ss03_justlaunch.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 143, kind: 'text', reveal: [2, 28], text: 'It could change|SpaceX’s entire future.', highlights: ['future.'], size: 44, pos: 'upperLeft', media: {src: 'starship/ss04_future.jpg', type: 'img', effect: 'in'}},
  // 5 FOLLOW
  {dur: 176, kind: 'text', reveal: [2], text: 'Follow for more stories|on tech and business.', highlights: ['follow'], size: 44, pos: 'right', media: {src: 'starship/ss05_follow.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 64, kind: 'text', reveal: [2], text: 'On November 14,', highlights: ['November'], size: 52, pos: 'lower', media: {src: 'starship/ss06_nov14.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 97, kind: 'text', reveal: [2, 28], text: 'SpaceX pulled off something|it had never done.', highlights: ['never'], size: 44, pos: 'lowerLeft', media: {src: 'starship/ss07_never.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 76, kind: 'text', reveal: [2, 28], text: 'Its Starship spacecraft|returned from orbit', highlights: ['orbit'], size: 44, pos: 'upperRight', media: {src: 'starship/ss08_orbit.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 82, kind: 'text', reveal: [2, 28], text: 'and was caught|by giant mechanical arms', highlights: ['caught'], size: 44, pos: 'left', media: {src: 'starship/ss09_caught.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 54, kind: 'text', reveal: [2], text: 'of its launch tower in Texas.', highlights: ['tower'], size: 42, pos: 'right', media: {src: 'starship/ss10_tower.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 78, kind: 'text', reveal: [2, 28], text: 'And this wasn’t|just a short test flight.', highlights: ['short'], size: 44, pos: 'upperLeft', media: {src: 'starship/ss11_testflight.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 43, kind: 'text', reveal: [2], text: 'Starship spent more than', highlights: ['Starship'], size: 50, pos: 'lowerRight', media: {src: 'starship/ss12_spent.jpg', type: 'img', effect: 'in'}},
  // 13 CARD
  {dur: 68, kind: 'stat', stat: {value: 22, post: 'HOURS IN SPACE'}, media: {src: 'starship/ss13_card22.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 99, kind: 'text', reveal: [2], text: 'completed 14 orbits around Earth,', highlights: ['14'], size: 46, pos: 'upper', media: {src: 'starship/ss14_orbits.jpg', type: 'img', effect: 'in'}},
  // 15 CARD
  {dur: 82, kind: 'stat', stat: {value: 26, post: 'STARLINK SATELLITES'}, media: {src: 'starship/ss15_card26.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 75, kind: 'text', reveal: [2, 28], text: 'before coming back|for that historic catch.', highlights: ['historic'], size: 44, pos: 'left', media: {src: 'starship/ss16_historic.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 80, kind: 'text', reveal: [2, 28], text: 'But here’s where|things get interesting.', highlights: ['interesting.'], size: 44, pos: 'right', media: {src: 'starship/ss17_interesting.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 76, kind: 'text', reveal: [2, 28], text: 'SpaceX isn’t just trying|to build a bigger rocket.', highlights: ['bigger'], size: 44, pos: 'lowerLeft', media: {src: 'starship/ss18_bigger.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 37, kind: 'text', reveal: [2], text: 'It’s trying to build a rocket', highlights: ['rocket'], size: 42, pos: 'upperRight', media: {src: 'starship/ss19_buildrocket.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 96, kind: 'text', reveal: [2, 28], text: 'that can be reused|again and again,', highlights: ['reused'], size: 44, pos: 'left', media: {src: 'starship/ss20_reused.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 104, kind: 'text', reveal: [2, 28], text: 'making access to space|dramatically cheaper.', highlights: ['cheaper.'], size: 44, pos: 'lowerRight', media: {src: 'starship/ss21_cheaper.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 105, kind: 'text', reveal: [2, 28], text: 'And according to Evercore|analyst Kutgun Maral,', highlights: ['Evercore'], size: 44, pos: 'upperLeft', media: {src: 'starship/ss22_evercore.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 111, kind: 'text', reveal: [2, 28], text: 'that’s what could|determine SpaceX’s value.', highlights: ['value.'], size: 44, pos: 'right', media: {src: 'starship/ss23_determine.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 129, kind: 'text', reveal: [2, 28], text: 'Not just its next|Starlink contract or AI,', highlights: ['AI,'], size: 44, pos: 'lower', media: {src: 'starship/ss24_aicontract.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 61, kind: 'text', reveal: [2], text: 'but how cheaply and frequently', highlights: ['cheaply'], size: 46, pos: 'upperRight', media: {src: 'starship/ss25_cheaply.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 54, kind: 'text', reveal: [2], text: 'it can send payloads into orbit.', highlights: ['payloads'], size: 42, pos: 'lowerLeft', media: {src: 'starship/ss26_payloads.jpg', type: 'img', effect: 'in'}},
  // 27 RED
  {dur: 54, kind: 'impact', redBg: true, text: 'Still a|catch.'},
  // 28
  {dur: 93, kind: 'text', reveal: [2, 28], text: 'The Super Heavy booster|wasn’t recovered.', highlights: ['booster'], size: 44, pos: 'left', media: {src: 'starship/ss28_booster.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 173, kind: 'text', reveal: [2], text: 'SpaceX still has to prove', highlights: ['prove'], size: 46, pos: 'right', media: {src: 'starship/ss29_prove.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 86, kind: 'text', reveal: [2, 28], text: 'it can reuse|both stages reliably.', highlights: ['reliably.'], size: 44, pos: 'lowerRight', media: {src: 'starship/ss30_stages.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 93, kind: 'text', reveal: [2, 28], text: 'Meanwhile, rival|United Launch Alliance', highlights: ['rival'], size: 48, pos: 'upperLeft', media: {src: 'starship/ss31_rival.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 53, kind: 'text', reveal: [2], text: 'suffered a major setback', highlights: ['setback'], size: 50, pos: 'right', media: {src: 'starship/ss32_setback.jpg', type: 'img', effect: 'in'}},
  // 33
  {dur: 39, kind: 'text', reveal: [2], text: 'when its Vulcan rocket', highlights: ['Vulcan'], size: 50, pos: 'upperRight', media: {src: 'starship/ss33_vulcan.jpg', type: 'img', effect: 'in'}},
  // 34
  {dur: 37, kind: 'text', reveal: [2], text: 'failed to deliver', highlights: ['failed'], size: 52, pos: 'left', media: {src: 'starship/ss34_failed.jpg', type: 'img', effect: 'in'}},
  // 35 CARD
  {dur: 46, kind: 'stat', stat: {value: 40, post: 'AMAZON LEO SATELLITES'}, media: {src: 'starship/ss35_card40.jpg', type: 'img', effect: 'in'}},
  // 36
  {dur: 48, kind: 'text', reveal: [2], text: 'into orbit.', highlights: ['orbit.'], size: 52, pos: 'lowerLeft', media: {src: 'starship/ss36_intoorbit.jpg', type: 'img', effect: 'in'}},
  // 37
  {dur: 128, kind: 'text', reveal: [2, 28], text: 'So what will make SpaceX|more valuable long term?', highlights: ['valuable'], size: 44, pos: 'upper', media: {src: 'starship/ss37_valuable.jpg', type: 'img', effect: 'in'}},
  // 38
  {dur: 40, kind: 'text', reveal: [2], text: 'Starlink and AI,', highlights: ['AI,'], size: 52, pos: 'right', media: {src: 'starship/ss38_starlinkai.jpg', type: 'img', effect: 'in'}},
  // 39 CTA
  {dur: 149, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'or reusable rockets, the backbone|of the space industry?', highlights: ['industry?'], size: 46, media: {src: 'starship/ss39_industry.jpg', type: 'img', effect: 'in'}},
];


type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 1332, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1499, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 2509, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 3137, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 3399, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The catch</span>
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
export const StarshipReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('starship/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('starship/music.mp3')}
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
