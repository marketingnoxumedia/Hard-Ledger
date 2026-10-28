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
// "The outbreak" reel (EbolaReel) — Hard Ledger house VISUAL format, health/world-news topic. SENSITIVE: deadly outbreak; UNVERIFIED claims.
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
// scribe_v1 word-timestamp anchor pass (public/ebola/voiceover.mp3, NO inserted pause); music mixed at 0.17.
// Built at the house +10% pacing default. OWN distinct footage under public/ebola/, NO reuse of any other reel's
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
  {dur: 90, kind: 'hook', reveal: [3, 40], text: 'A deadly Ebola outbreak|has spread across', kicker: 'The outbreak', highlights: ['ebola'], size: 34, media: {src: 'ebola/eb00_virus.jpg', type: 'img', effect: 'in'}},
  // 1
  {dur: 72, kind: 'text', reveal: [2], text: 'three regions of Africa,', highlights: ['africa,'], size: 40, pos: 'upperRight', media: {src: 'ebola/eb01_map.jpg', type: 'img', effect: 'panL'}},
  // 2
  {dur: 93, kind: 'text', reveal: [2, 28], text: 'and one of the continent’s|top health officials is warning', highlights: [], size: 32, pos: 'left', media: {src: 'ebola/eb02_official.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 65, kind: 'text', reveal: [2], text: 'that it could reach the UK.', highlights: ['uk.'], size: 38, pos: 'lowerRight', media: {src: 'ebola/eb03_border.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 49, kind: 'text', reveal: [2], text: 'The outbreak has already passed', highlights: [], size: 36, pos: 'upperLeft', media: {src: 'ebola/eb04_spread.jpg', type: 'img', effect: 'in'}},
  // 5 CARD 10,000
  {dur: 57, kind: 'stat', stat: {pre: 'OVER', value: 10000, post: 'REPORTED CASES'}, media: {src: 'ebola/eb05_cases.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 95, kind: 'text', reveal: [2, 28], text: 'But what makes this outbreak|especially alarming', highlights: ['alarming'], size: 33, pos: 'right', media: {src: 'ebola/eb06_alarm.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 94, kind: 'text', reveal: [2], text: 'is not just how deadly it is.', highlights: ['deadly'], size: 36, pos: 'lower', media: {src: 'ebola/eb07_deadly.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'It is how far|the virus has spread,', highlights: ['spread,'], size: 34, pos: 'upperRight', media: {src: 'ebola/eb08_global.jpg', type: 'img', effect: 'panR'}},
  // 9
  {dur: 93, kind: 'text', reveal: [2, 28], text: 'and how difficult it is|becoming to contain.', highlights: ['contain.'], size: 34, pos: 'lowerLeft', media: {src: 'ebola/eb09_contain.jpg', type: 'img', effect: 'in'}},
  // 10 CTA early (3 lines)
  {dur: 109, kind: 'text', reveal: [2, 12, 22], text: 'Follow for more major|health and science stories|that could affect the world.', highlights: ['follow'], size: 36, pos: 'upper', media: {src: 'ebola/eb10_follow.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 114, kind: 'text', reveal: [2, 28], text: 'The outbreak is being caused|by the Bundibugyo virus,', highlights: ['bundibugyo'], size: 32, pos: 'left', media: {src: 'ebola/eb11_strain.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 60, kind: 'text', reveal: [2], text: 'a rare type of Ebola.', highlights: ['rare'], size: 40, pos: 'lowerRight', media: {src: 'ebola/eb12_rare.jpg', type: 'img', effect: 'panL'}},
  // 13
  {dur: 97, kind: 'text', reveal: [2, 28], text: 'It began in the Democratic|Republic of the Congo', highlights: [], size: 33, pos: 'upperLeft', media: {src: 'ebola/eb13_origin.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 111, kind: 'text', reveal: [2, 28], text: 'and has since spread to|Uganda, Kenya, and Nigeria.', highlights: [], size: 32, pos: 'right', media: {src: 'ebola/eb14_cross.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 119, kind: 'text', reveal: [2, 28], text: 'Ebola can spread through direct contact|with the bodily fluids', highlights: [], size: 30, pos: 'center', media: {src: 'ebola/eb15_contact.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 122, kind: 'text', reveal: [2, 28], text: 'of an infected person,|including blood and vomit.', highlights: [], size: 33, pos: 'lowerLeft', media: {src: 'ebola/eb16_fluids.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 115, kind: 'text', reveal: [2, 28], text: 'According to The Guardian,|Africa CDC director general', highlights: [], size: 31, pos: 'upperRight', media: {src: 'ebola/eb17_report.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 147, kind: 'text', reveal: [2, 28], text: 'Jean Kaseya says the outbreak|has reached more than 10,000 cases,', highlights: [], size: 29, pos: 'left', media: {src: 'ebola/eb18_briefing.jpg', type: 'img', effect: 'in'}},
  // 19 CARD 5,000
  {dur: 70, kind: 'stat', stat: {pre: 'NEARLY', value: 5000, post: 'DEATHS'}, media: {src: 'ebola/eb19_toll.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 83, kind: 'text', reveal: [2, 28], text: 'He warned that the spread|is unprecedented,', highlights: ['unprecedented,'], size: 33, pos: 'lowerRight', media: {src: 'ebola/eb20_surge.jpg', type: 'img', effect: 'in'}},
  // 21 CARD 3
  {dur: 105, kind: 'stat', stat: {value: 3, post: 'AFRICAN REGIONS'}, media: {src: 'ebola/eb21_regions.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 101, kind: 'text', reveal: [2, 28], text: 'France has also confirmed a case|in a doctor who returned', highlights: [], size: 30, pos: 'upperLeft', media: {src: 'ebola/eb22_france.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'from the Democratic|Republic of the Congo.', highlights: [], size: 33, pos: 'right', media: {src: 'ebola/eb23_return.jpg', type: 'img', effect: 'panR'}},
  // 24
  {dur: 109, kind: 'text', reveal: [2, 28], text: 'And the response is facing|serious obstacles.', highlights: ['obstacles.'], size: 34, pos: 'upper', media: {src: 'ebola/eb24_response.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 128, kind: 'text', reveal: [2, 28], text: 'Health workers are dealing with|shortages of protective equipment,', highlights: [], size: 30, pos: 'lowerLeft', media: {src: 'ebola/eb25_ppe.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 132, kind: 'text', reveal: [2, 28], text: 'unpaid wages, conflict,|and mistrust in affected communities.', highlights: ['mistrust'], size: 30, pos: 'left', media: {src: 'ebola/eb26_pressure.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 97, kind: 'text', reveal: [2, 28], text: 'These challenges make it harder|to identify infections,', highlights: [], size: 32, pos: 'upperRight', media: {src: 'ebola/eb27_trace.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 84, kind: 'text', reveal: [2, 28], text: 'isolate patients,|and stop transmission.', highlights: ['transmission.'], size: 34, pos: 'lowerRight', media: {src: 'ebola/eb28_isolate.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 127, kind: 'text', reveal: [2, 28], text: 'The virus could spread further|if countries are not prepared.', highlights: [], size: 32, pos: 'left', media: {src: 'ebola/eb29_further.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 92, kind: 'text', reveal: [2, 28], text: 'Kaseya is urging governments|around the world', highlights: [], size: 33, pos: 'upperRight', media: {src: 'ebola/eb30_world.jpg', type: 'img', effect: 'panL'}},
  // 31
  {dur: 106, kind: 'text', reveal: [2, 28], text: 'to strengthen screening, testing,|and treatment readiness.', highlights: [], size: 31, pos: 'lowerLeft', media: {src: 'ebola/eb31_screen.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 94, kind: 'text', reveal: [2, 28], text: 'He warns that countries|should not assume they are safe', highlights: [], size: 31, pos: 'right', media: {src: 'ebola/eb32_warn.jpg', type: 'img', effect: 'in'}},
  // 33
  {dur: 140, kind: 'text', reveal: [2, 28], text: 'simply because the outbreak|is currently concentrated in Africa.', highlights: [], size: 29, pos: 'upperLeft', media: {src: 'ebola/eb33_concentrated.jpg', type: 'img', effect: 'in'}},
  // 34
  {dur: 50, kind: 'text', reveal: [2, 28], text: 'But there is|an important distinction.', highlights: ['distinction.'], size: 34, pos: 'center', media: {src: 'ebola/eb34_nuance.jpg', type: 'img', effect: 'in'}},
  // 35
  {dur: 92, kind: 'text', reveal: [2, 28], text: 'Ebola has not been|reported in the UK.', highlights: ['uk.'], size: 35, pos: 'lower', media: {src: 'ebola/eb35_uk.jpg', type: 'img', effect: 'in'}},
  // 36
  {dur: 113, kind: 'text', reveal: [2, 28], text: 'The warning is about the possibility|of international spread,', highlights: [], size: 31, pos: 'upperRight', media: {src: 'ebola/eb36_possible.jpg', type: 'img', effect: 'in'}},
  // 37
  {dur: 73, kind: 'text', reveal: [2], text: 'not a confirmed outbreak there.', highlights: ['not'], size: 36, pos: 'left', media: {src: 'ebola/eb37_notruled.jpg', type: 'img', effect: 'in'}},
  // 38
  {dur: 147, kind: 'text', reveal: [2, 28], text: 'The Bundibugyo virus also|has no approved treatment,', highlights: ['treatment,'], size: 32, pos: 'lowerRight', media: {src: 'ebola/eb38_notreatment.jpg', type: 'img', effect: 'in'}},
  // 39
  {dur: 76, kind: 'text', reveal: [2, 28], text: 'although vaccine trials|are underway.', highlights: ['vaccine'], size: 36, pos: 'upperLeft', media: {src: 'ebola/eb39_vaccine.jpg', type: 'img', effect: 'in'}},
  // 40
  {dur: 97, kind: 'text', reveal: [2, 28], text: 'So, should governments be preparing|for a possible', highlights: [], size: 31, pos: 'right', media: {src: 'ebola/eb40_prepare.jpg', type: 'img', effect: 'in'}},
  // 41
  {dur: 60, kind: 'text', reveal: [2], text: 'international health emergency now,', highlights: ['emergency'], size: 32, pos: 'upper', media: {src: 'ebola/eb41_emergency.jpg', type: 'img', effect: 'in'}},
  // 42
  {dur: 117, kind: 'text', reveal: [2, 28], text: 'or is there a risk of|creating unnecessary panic?', highlights: ['panic?'], size: 33, pos: 'lowerLeft', media: {src: 'ebola/eb42_panic.jpg', type: 'img', effect: 'in'}},
  // 43
  {dur: 104, kind: 'text', reveal: [2, 28], text: 'And what should the world do|to help contain the outbreak', highlights: [], size: 31, pos: 'left', media: {src: 'ebola/eb43_help.jpg', type: 'img', effect: 'in'}},
  // 44 RED
  {dur: 48, kind: 'impact', redBg: true, text: 'before it spreads|further?'},
  // 45 CTA
  {dur: 38, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Let us know|in the comments.', highlights: ['comments.'], size: 40, media: {src: 'ebola/eb45_comments.jpg', type: 'img', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 369, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 778, src: 'media/sfx_whoosh.mp3', vol: 0.33},
  {at: 1772, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1925, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 2201, src: 'media/sfx_whoosh.mp3', vol: 0.33},
  {at: 4239, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 4287, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
          {stat.suffix ? <span style={{fontFamily: HEAD, fontSize: 120, color: C.red, lineHeight: 1, marginLeft: 18}}>{stat.suffix.trim()}</span> : null}
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The outbreak</span>
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
export const EbolaReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('ebola/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('ebola/music.mp3')}
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
