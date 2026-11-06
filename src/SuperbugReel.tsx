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
// "The superbugs" reel (SuperbugReel) — Hard Ledger house VISUAL format, health/science news topic.
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
// scribe_v1 word-timestamp anchor pass (public/superbug/voiceover.mp3, NO inserted pause); music mixed at 0.17.
// Built at the house +10% pacing default. OWN distinct footage under public/superbug/, NO reuse of any other reel's
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
  {dur: 71, kind: 'hook', reveal: [3, 40], text: 'Some infections are becoming|harder to treat,', kicker: 'The superbugs', highlights: ['harder'], size: 36, media: {src: 'superbug/sb00_petri.jpg', type: 'img', effect: 'in'}},
  // 1
  {dur: 100, kind: 'text', reveal: [2, 28], text: 'and the CDC is warning|that drug resistant superbugs', highlights: ['superbugs'], size: 35, pos: 'upperRight', media: {src: 'superbug/sb01_warning.jpg', type: 'img', effect: 'panL'}},
  // 2
  {dur: 103, kind: 'text', reveal: [2, 28], text: 'are putting millions of Americans|at risk every year.', highlights: ['risk'], size: 36, pos: 'left', media: {src: 'superbug/sb02_crowd.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 79, kind: 'text', reveal: [2, 28], text: 'The latest assessment estimates|these germs cause', highlights: [], size: 36, pos: 'lowerRight', media: {src: 'superbug/sb03_report.jpg', type: 'img', effect: 'in'}},
  // 4 CARD ~10M
  {dur: 91, kind: 'stat', stat: {pre: 'NEARLY', value: 10, suffix: ' MILLION', post: 'INFECTIONS A YEAR'}, media: {src: 'superbug/sb04_microbe.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 35, kind: 'text', reveal: [2], text: 'in the United States.', highlights: [], size: 43, pos: 'upperLeft', media: {src: 'superbug/sb05_map.jpg', type: 'img', effect: 'panR'}},
  // 6
  {dur: 51, kind: 'text', reveal: [2, 28], text: 'And among the most|alarming threats', highlights: ['alarming'], size: 38, pos: 'right', media: {src: 'superbug/sb06_alarm.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 130, kind: 'text', reveal: [2, 28], text: 'is a fungus that has spread|rapidly through healthcare facilities.', highlights: ['fungus'], size: 35, pos: 'lower', media: {src: 'superbug/sb07_fungus.jpg', type: 'img', effect: 'in'}},
  // 8 CTA early
  {dur: 141, kind: 'text', reveal: [2, 12, 22, 32], text: 'Follow for more|health and science stories|that could affect|your everyday life.', highlights: ['follow'], size: 44, pos: 'upper', media: {src: 'superbug/sb08_follow.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 121, kind: 'text', reveal: [2, 28], text: 'Antibiotics and antifungal medicines|are designed to kill germs', highlights: [], size: 35, pos: 'lowerLeft', media: {src: 'superbug/sb09_pills.jpg', type: 'img', effect: 'panL'}},
  // 10
  {dur: 42, kind: 'text', reveal: [2], text: 'or stop them from growing.', highlights: ['growing.'], size: 40, pos: 'upperRight', media: {src: 'superbug/sb10_culture.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 100, kind: 'text', reveal: [2, 28], text: 'But some bacteria and fungi|can develop resistance,', highlights: ['resistance,'], size: 37, pos: 'left', media: {src: 'superbug/sb11_bacteria.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 106, kind: 'text', reveal: [2, 28], text: 'meaning treatments that once worked|may no longer be effective.', highlights: [], size: 35, pos: 'lowerRight', media: {src: 'superbug/sb12_vial.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 85, kind: 'text', reveal: [2, 28], text: 'This is known as|antimicrobial resistance,', highlights: ['antimicrobial'], size: 38, pos: 'upperLeft', media: {src: 'superbug/sb13_micro.jpg', type: 'img', effect: 'panR'}},
  // 14
  {dur: 113, kind: 'text', reveal: [2, 28], text: 'and it can turn routine infections|into serious medical challenges.', highlights: [], size: 35, pos: 'right', media: {src: 'superbug/sb14_ward.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 71, kind: 'text', reveal: [2, 28], text: 'According to the CDC’s|latest assessment,', highlights: [], size: 38, pos: 'center', media: {src: 'superbug/sb15_document.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 97, kind: 'text', reveal: [2, 28], text: '19 drug resistant pathogens|are responsible', highlights: [], size: 36, pos: 'upperRight', media: {src: 'superbug/sb16_cluster.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 95, kind: 'text', reveal: [2, 28], text: 'for an estimated|9.7 million infections', highlights: [], size: 38, pos: 'lowerLeft', media: {src: 'superbug/sb17_lab.jpg', type: 'img', effect: 'panL'}},
  // 18 CARD 50,800
  {dur: 105, kind: 'stat', stat: {value: 50800, post: 'DEATHS A YEAR'}, media: {src: 'superbug/sb18_memorial.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 28, kind: 'text', reveal: [2], text: 'The agency places', highlights: [], size: 43, pos: 'left', media: {src: 'superbug/sb19_clipboard.jpg', type: 'img', effect: 'in'}},
  // 20 CARD 4 urgent threats
  {dur: 110, kind: 'stat', stat: {value: 4, post: 'URGENT THREATS'}, media: {src: 'superbug/sb20_threat.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 60, kind: 'text', reveal: [2, 28], text: 'One of them is|Candida auris,', highlights: ['candida'], size: 40, pos: 'upperLeft', media: {src: 'superbug/sb21_fungus2.jpg', type: 'img', effect: 'panR'}},
  // 22
  {dur: 73, kind: 'text', reveal: [2, 28], text: 'a fungus that can cause|dangerous infections,', highlights: ['dangerous'], size: 37, pos: 'right', media: {src: 'superbug/sb22_infection.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 96, kind: 'text', reveal: [2, 28], text: 'especially in people|who are already seriously ill.', highlights: [], size: 36, pos: 'lowerRight', media: {src: 'superbug/sb23_bed.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 123, kind: 'text', reveal: [2, 28], text: 'The CDC says infections|have increased tenfold since 2019.', highlights: ['tenfold'], size: 35, pos: 'upper', media: {src: 'superbug/sb24_rise.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 86, kind: 'text', reveal: [2, 28], text: 'Other urgent threats include|bacteria resistant to some', highlights: [], size: 36, pos: 'left', media: {src: 'superbug/sb25_resistant.jpg', type: 'img', effect: 'panL'}},
  // 26
  {dur: 56, kind: 'text', reveal: [2], text: 'of the strongest antibiotics available,', highlights: [], size: 35, pos: 'upperRight', media: {src: 'superbug/sb26_antibiotic.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 51, kind: 'text', reveal: [2], text: 'and drug resistant gonorrhea.', highlights: ['gonorrhea.'], size: 39, pos: 'lowerLeft', media: {src: 'superbug/sb27_cells.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 88, kind: 'text', reveal: [2, 28], text: 'The danger goes beyond|a single infection.', highlights: ['danger'], size: 39, pos: 'right', media: {src: 'superbug/sb28_danger.jpg', type: 'img', effect: 'panR'}},
  // 29
  {dur: 72, kind: 'text', reveal: [2, 28], text: 'Drug resistance can mean|fewer treatment options,', highlights: [], size: 37, pos: 'upperLeft', media: {src: 'superbug/sb29_options.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 90, kind: 'text', reveal: [2, 28], text: 'longer hospital stays,|and a higher risk of complications.', highlights: [], size: 35, pos: 'lowerRight', media: {src: 'superbug/sb30_hospital.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 106, kind: 'text', reveal: [2, 28], text: 'It can also make medical procedures|such as surgery, cancer treatment,', highlights: [], size: 34, pos: 'center', media: {src: 'superbug/sb31_surgery.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 103, kind: 'text', reveal: [2, 28], text: 'and organ transplants|more difficult to carry out safely.', highlights: [], size: 35, pos: 'left', media: {src: 'superbug/sb32_transplant.jpg', type: 'img', effect: 'panL'}},
  // 33
  {dur: 85, kind: 'text', reveal: [2, 28], text: 'But there is a critical detail|in the new report:', highlights: ['critical'], size: 36, pos: 'upperRight', media: {src: 'superbug/sb33_detail.jpg', type: 'img', effect: 'in'}},
  // 34
  {dur: 91, kind: 'text', reveal: [2, 28], text: 'the CDC changed its methods|and data sources.', highlights: ['changed'], size: 37, pos: 'lowerLeft', media: {src: 'superbug/sb34_data.jpg', type: 'img', effect: 'in'}},
  // 35
  {dur: 109, kind: 'text', reveal: [2, 28], text: 'That means the latest estimates|cannot be directly compared', highlights: [], size: 35, pos: 'right', media: {src: 'superbug/sb35_compare.jpg', type: 'img', effect: 'in'}},
  // 36
  {dur: 132, kind: 'text', reveal: [2, 12, 22, 32], text: 'with the previous report|as if the numbers|were measured in|exactly the same way.', highlights: [], size: 42, pos: 'center', media: {src: 'superbug/sb36_numbers.jpg', type: 'img', effect: 'panR'}},
  // 37
  {dur: 108, kind: 'text', reveal: [2, 28], text: 'Still, experts warn that|antimicrobial resistance', highlights: [], size: 37, pos: 'upperLeft', media: {src: 'superbug/sb37_expert.jpg', type: 'img', effect: 'in'}},
  // 38
  {dur: 74, kind: 'text', reveal: [2, 28], text: 'remains a serious|and growing concern.', highlights: ['growing'], size: 39, pos: 'lowerRight', media: {src: 'superbug/sb38_growing.jpg', type: 'img', effect: 'in'}},
  // 39
  {dur: 106, kind: 'text', reveal: [2, 28], text: 'So, are we doing enough to protect|the medicines that modern', highlights: [], size: 34, pos: 'left', media: {src: 'superbug/sb39_medicine.jpg', type: 'img', effect: 'in'}},
  // 40
  {dur: 40, kind: 'text', reveal: [2], text: 'healthcare depends on?', highlights: [], size: 40, pos: 'upperRight', media: {src: 'superbug/sb40_depend.jpg', type: 'img', effect: 'panL'}},
  // 41
  {dur: 96, kind: 'text', reveal: [2, 28], text: 'And should governments invest more|in developing new antibiotics', highlights: ['antibiotics'], size: 35, pos: 'center', media: {src: 'superbug/sb41_research.jpg', type: 'img', effect: 'in'}},
  // 42 RED
  {dur: 100, kind: 'impact', redBg: true, text: 'before these superbugs become|even harder to treat?'},
  // 43 CTA
  {dur: 62, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Let us know what you think|in the comments.', highlights: ['comments.'], size: 46, pos: 'center', media: {src: 'superbug/sb43_comments.jpg', type: 'img', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 353, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 801, src: 'media/sfx_whoosh.mp3', vol: 0.33},
  {at: 1631, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1764, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 2419, src: 'media/sfx_whoosh.mp3', vol: 0.33},
  {at: 3719, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 3819, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The superbugs</span>
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
export const SuperbugReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('superbug/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('superbug/music.mp3')}
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
