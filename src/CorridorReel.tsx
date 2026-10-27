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
// "The corridor" reel (CorridorReel) — Hard Ledger house VISUAL format, world-news topic. **SENSITIVE: active war.**
// TOPIC: Russia and Ukraine agreed a rare LOCAL CEASEFIRE — a humanitarian window — that could let ~2,000 civilians
// trapped in the frontline city of Oleshky (on the Dnipro in southern Ukraine) escape; residents are reportedly cut
// off from food, medicine, power and water. Per the Financial Times, the US-backed deal has Russian forces clear
// mines from exit roads, with buses to evacuate and aid for those who stay. The complication: Pres. Zelenskyy
// warned evacuees could be routed through Crimea or Russia first, fearing Moscow shapes the war's narrative. Both
// sides accuse the other of obstructing aid; peace talks are expected to resume in Abu Dhabi — but a temporary
// pause is not the war ending. Debate: allow evacuations under international monitoring despite mutual distrust? can
// a local ceasefire be a stepping stone to wider peace?
// NOTE ON VOICE: built VERBATIM from a client-supplied script in the influencer "curiosity-gap" format (like the
// other news reels), NOT the faceless house voice — it NAMES Russia / Ukraine / Oleshky / Zelenskyy / Financial
// Times, uses an EARLY "follow for more" CTA, and CLOSES on a "share your thoughts in the comments" debate CTA. The
// client's standing choice is "build verbatim." The red beat poses the would-you-rather (stepping stone to peace?).
// 39 beats. 1 stat card: AROUND 2,000 CIVILIANS TRAPPED. 1 red impact, no black beat. Captions match the VO
// verbatim (except the number card; spoken figures as numerals). Durations/reveals/SFX locked to the VO via a
// scribe_v1 word-timestamp anchor pass (public/corridor/voiceover.mp3, NO inserted pause); music mixed at 0.17.
// Built at the house +10% pacing default. OWN distinct footage under public/corridor/, NO reuse of any other reel's
// clips — ledger-checked.
// New STANDALONE reel; a world-news story (a departure from the finance/gaming/science reels). Card text is
// editorial overlay, not footage.
// FOOTAGE is strictly BRAND-FREE, FLAG-FREE, MILITARY-FREE and generic — it NAMES a real war but shows NONE of it:
// generic humanitarian / evacuation / darkened-home / river / road / diplomacy / peace b-roll only. **Screen HARD:
// NO flag of ANY nation (esp. Russia/Ukraine); NO military of any kind — no soldiers, uniforms, tanks, weapons,
// missiles, military drones or vehicles; NO identifiable real person (NO Zelenskyy / Putin / any politician or
// soldier); NO Financial Times logo/masthead; NO real/identifiable war or conflict footage, ruins of a nameable
// place, or identifiable landmark; NO readable Cyrillic / Ukrainian / Russian or other foreign text; NO map with
// country labels; NO other brand logos; NO identifiable faces.**
// **UNVERIFIED / HIGHLY SENSITIVE — reports on an ACTIVE WAR and names real people/entities (Russia, Ukraine,
// Oleshky, President Zelenskyy, Financial Times) and contested claims (a US-backed local ceasefire; ~2,000 trapped
// civilians; mine-clearing; evacuation routing via Crimea/Russia; Abu Dhabi talks); rendered as written but MUST be
// fact-checked against primary reporting before publishing, and the situation is fast-moving/perishable.** The
// framing is a balanced news summary; the reel notes both sides' accusations and that a pause is not the war ending.
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 149, kind: 'hook', reveal: [3, 40], text: 'Russia and Ukraine have agreed to|something rarely seen in this war:', kicker: 'The corridor', highlights: [], size: 26, media: {src: 'corridor/cr00_pause.mp4', type: 'video', effect: 'in'}},
  // 1
  {dur: 44, kind: 'text', reveal: [2], text: 'a local ceasefire.', highlights: ['ceasefire.'], size: 42, media: {src: 'corridor/cr01_truce.jpg', type: 'img', effect: 'panL'}},
  // 2
  {dur: 42, kind: 'text', reveal: [2, 28], text: 'And it could be|the only chance', highlights: [], size: 34, media: {src: 'corridor/cr02_chance.jpg', type: 'img', effect: 'in'}},
  // 3 CARD 2000
  {dur: 80, kind: 'stat', stat: {pre: 'AROUND', value: 2000, post: 'CIVILIANS TRAPPED'}, media: {src: 'corridor/cr03_civilians.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 88, kind: 'text', reveal: [2, 28], text: 'trapped in a frontline|city to escape.', highlights: ['escape.'], size: 32, media: {src: 'corridor/cr04_escape.jpg', type: 'img', effect: 'panR'}},
  // 5
  {dur: 88, kind: 'text', reveal: [2, 28], text: 'In Oleshky, residents|have reportedly been cut off', highlights: [], size: 29, media: {src: 'corridor/cr05_cutoff.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 100, kind: 'text', reveal: [2, 28], text: 'from food, medicine,|electricity, and running water.', highlights: ['water.'], size: 28, media: {src: 'corridor/cr06_dark.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 57, kind: 'text', reveal: [2, 28], text: 'But even with|a ceasefire in place,', highlights: [], size: 32, media: {src: 'corridor/cr07_fragile.jpg', type: 'img', effect: 'panL'}},
  // 8
  {dur: 139, kind: 'text', reveal: [2, 28], text: 'getting them to safety could be|far more complicated than it sounds.', highlights: ['complicated'], size: 26, media: {src: 'corridor/cr08_complex.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 156, kind: 'text', reveal: [2, 28], text: 'Follow for more major world news|and the stories behind the headlines.', highlights: ['follow'], size: 25, media: {src: 'corridor/cr09_follow.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 105, kind: 'text', reveal: [2, 28], text: 'Oleshky sits along the Dnipro River|in southern Ukraine.', highlights: [], size: 27, media: {src: 'corridor/cr10_river.jpg', type: 'img', effect: 'panR'}},
  // 11
  {dur: 141, kind: 'text', reveal: [2, 28], text: 'Russian forces took control of the city|early in the 2022 invasion,', highlights: [], size: 25, media: {src: 'corridor/cr11_city.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 78, kind: 'text', reveal: [2, 28], text: 'and it later became|a frontline area.', highlights: ['frontline'], size: 32, media: {src: 'corridor/cr12_line.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 118, kind: 'text', reveal: [2, 28], text: 'Drone strikes and landmines have made|travel dangerously difficult,', highlights: ['dangerously'], size: 26, media: {src: 'corridor/cr13_hazard.jpg', type: 'img', effect: 'panL'}},
  // 14
  {dur: 79, kind: 'text', reveal: [2, 28], text: 'leaving residents|increasingly isolated.', highlights: ['isolated.'], size: 31, media: {src: 'corridor/cr14_isolated.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 82, kind: 'text', reveal: [2, 28], text: 'According to the Financial Times,|the US-backed agreement', highlights: [], size: 28, media: {src: 'corridor/cr15_report.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 157, kind: 'text', reveal: [2, 28], text: 'calls for Russian forces to clear|mines from roads leading out of the city.', highlights: [], size: 24, media: {src: 'corridor/cr16_road.jpg', type: 'img', effect: 'panR'}},
  // 17
  {dur: 80, kind: 'text', reveal: [2, 28], text: 'Buses were expected|to evacuate residents,', highlights: ['evacuate'], size: 31, media: {src: 'corridor/cr17_bus.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 131, kind: 'text', reveal: [2, 28], text: 'while humanitarian supplies would be|delivered to people who choose to stay.', highlights: [], size: 25, media: {src: 'corridor/cr18_aid.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 75, kind: 'text', reveal: [2, 28], text: 'But there’s a|major complication.', highlights: ['complication.'], size: 34, media: {src: 'corridor/cr19_obstacle.jpg', type: 'img', effect: 'panL'}},
  // 20
  {dur: 139, kind: 'text', reveal: [2, 28], text: 'Ukrainian President Volodymyr Zelenskyy|has warned that evacuees', highlights: [], size: 24, media: {src: 'corridor/cr20_warn.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 107, kind: 'text', reveal: [2, 28], text: 'could be taken through Crimea or Russia|before they can return', highlights: [], size: 25, media: {src: 'corridor/cr21_route.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 64, kind: 'text', reveal: [2], text: 'to Ukrainian-controlled territory.', highlights: ['territory.'], size: 28, media: {src: 'corridor/cr22_checkpoint.jpg', type: 'img', effect: 'panR'}},
  // 23
  {dur: 157, kind: 'text', reveal: [2, 28], text: 'He fears Moscow could use the evacuation|to shape the narrative of the war.', highlights: ['narrative'], size: 24, media: {src: 'corridor/cr23_narrative.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 107, kind: 'text', reveal: [2, 28], text: 'For people trapped inside Oleshky,|the stakes are immediate.', highlights: ['immediate.'], size: 27, media: {src: 'corridor/cr24_stakes.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 110, kind: 'text', reveal: [2, 28], text: 'Reports describe severe shortages,|with many residents struggling', highlights: [], size: 27, media: {src: 'corridor/cr25_shortage.jpg', type: 'img', effect: 'panL'}},
  // 26
  {dur: 78, kind: 'text', reveal: [2, 28], text: 'to find enough food|and basic necessities.', highlights: [], size: 31, media: {src: 'corridor/cr26_food.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 125, kind: 'text', reveal: [2, 28], text: 'If the evacuation fails|or safe routes remain inaccessible,', highlights: [], size: 27, media: {src: 'corridor/cr27_blocked.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 133, kind: 'text', reveal: [2, 28], text: 'civilians could remain exposed to danger|with few ways to get help.', highlights: ['danger'], size: 25, media: {src: 'corridor/cr28_exposed.jpg', type: 'img', effect: 'panR'}},
  // 29
  {dur: 94, kind: 'text', reveal: [2, 28], text: 'Both sides have accused the other|of obstructing aid.', highlights: ['obstructing'], size: 28, media: {src: 'corridor/cr29_block.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 110, kind: 'text', reveal: [2, 28], text: 'The ceasefire also comes amid|renewed diplomatic efforts,', highlights: [], size: 28, media: {src: 'corridor/cr30_diplomacy.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 108, kind: 'text', reveal: [2, 28], text: 'with peace talks expected|to resume in Abu Dhabi.', highlights: ['peace'], size: 30, media: {src: 'corridor/cr31_talks.jpg', type: 'img', effect: 'panL'}},
  // 32
  {dur: 149, kind: 'text', reveal: [2, 28], text: 'But a temporary humanitarian pause|does not mean the wider war', highlights: [], size: 26, media: {src: 'corridor/cr32_pause.jpg', type: 'img', effect: 'in'}},
  // 33
  {dur: 38, kind: 'text', reveal: [2], text: 'is close to ending.', highlights: ['ending.'], size: 38, media: {src: 'corridor/cr33_horizon.jpg', type: 'img', effect: 'in'}},
  // 34
  {dur: 133, kind: 'text', reveal: [2, 28], text: 'Should humanitarian evacuations be allowed|to proceed under international monitoring,', highlights: [], size: 23, media: {src: 'corridor/cr34_monitor.jpg', type: 'img', effect: 'panR'}},
  // 35
  {dur: 102, kind: 'text', reveal: [2, 28], text: 'even when both sides|distrust each other?', highlights: ['distrust'], size: 30, media: {src: 'corridor/cr35_divide.jpg', type: 'img', effect: 'in'}},
  // 36
  {dur: 89, kind: 'text', reveal: [2, 28], text: 'And can a local ceasefire|become a stepping stone', highlights: [], size: 29, media: {src: 'corridor/cr36_bridge.jpg', type: 'img', effect: 'in'}},
  // 37 RED
  {dur: 57, kind: 'impact', redBg: true, text: 'toward a wider|peace agreement?'},
  // 38 CTA
  {dur: 48, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Share your thoughts|in the comments.', highlights: ['comments.'], size: 38, media: {src: 'corridor/cr38_comments.jpg', type: 'img', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 235, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1914, src: 'media/sfx_whoosh.mp3', vol: 0.33},
  {at: 3321, src: 'media/sfx_whoosh.mp3', vol: 0.33},
  {at: 3832, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 3889, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The corridor</span>
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
export const CorridorReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('corridor/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('corridor/music.mp3')}
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
