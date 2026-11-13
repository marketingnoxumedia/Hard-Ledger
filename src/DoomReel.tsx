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
// "The reveal" reel (DoomReel) — fast NEWS reel, Hard Ledger house VISUAL format, entertainment / film / pop-culture topic.
// TOPIC: MARVEL just brought back the SCARLET WITCH, and DOCTOR DOOM wants her power. A surprise post-credits scene from
// the VisionQuest finale appears to revive Wanda Maximoff — who seemed to die when Mount Wundagore collapsed at the end of
// Doctor Strange in the Multiverse of Madness. In the scene, Doctor Doom (teased as the MCU's next major villain) lifts the
// rubble and commands "Scarlet Witch, awaken. Your power will be mine." — then Wanda opens her eyes. It reads as more than a
// cameo: Doom knows who she is and may plan to use her extraordinary powers, tying into Avengers: Doomsday and the next
// Avengers storyline (her sons Billy and Tommy are reunited with Vision in VisionQuest). The question: is Doom reviving
// Wanda to control her, or does he need her power for something bigger — and could the Scarlet Witch be the key to his
// defeat?
// NOTE ON VOICE: built VERBATIM from a client-supplied script in the influencer "curiosity-gap" format, NOT the faceless
// house voice — it uses an EARLY "follow for more" CTA and CLOSES on the debate question (no comments-CTA; the script ends
// on rhetorical questions). Per the saved house preference, captions are <=5-6 words/beat with LARGER on-screen type (Anton
// 42-52). 49 beats. NO stat cards (an entertainment story with no hard figures; none invented). 1 red impact on the
// villain's command ("Your power / will be mine." — the dramatic centerpiece quote, placed mid-reel as the thesis punch),
// no black beat. Captions match the VO verbatim (character/film names — Wanda Maximoff, Scarlet Witch, Doctor Doom,
// VisionQuest, Avengers: Doomsday, Multiverse of Madness, Mount Wundagore, Billy/Tommy, Vision — stay in-caption as the VO
// states them). Durations/reveals/SFX locked to the VO via a scribe_v1 word-timestamp anchor pass
// (public/doom/voiceover.mp3). Built at the house +10% pacing default; its own tense cinematic/score-style music mixed at
// 0.2. OWN distinct footage under public/doom/ (48 stills), NO reuse of any other reel's clips — ledger-checked.
// FOOTAGE is strictly BRAND-FREE and CHARACTER-FREE — NO Marvel / Disney / MCU logo or wordmark, NO actual Scarlet Witch /
// Wanda / Doctor Doom / Vision / any MCU character, NO movie still / poster / screenshot / trailer frame, NO comic-book art
// or panel, NO actor likeness (no Elizabeth Olsen etc.), NO cosplay that reads as these specific characters, NO readable
// brand / sign / screen text, NO identifiable real face. Metaphor-led fantasy / cinema b-roll only: crimson-red magic
// energy and glowing red hands/runes and red smoke for the Scarlet Witch, a dark hooded / armored / metal-masked silhouette
// in shadow (a GENERIC menacing figure, never a Doom replica) for the villain, collapsed stone rubble and a crumbling
// mountain cave-in for Wundagore, a single eye opening with a glow for the awakening, a swirling portal / kaleidoscope /
// starfield for the multiverse, a dark empty cinema and blank screen and popcorn for the MCU meta, crackling lightning in
// cupped hands for the power, a chessboard / puppet strings / a crown / a clenched gauntlet for the control-and-plans beats,
// two small silhouettes for the sons, a blank-screen phone for the FOLLOW CTA.
// **UNVERIFIED AND SPECULATIVE — this is unconfirmed entertainment / fan-theory / leak-style content about UNRELEASED
// Marvel films (a claimed VisionQuest post-credits scene, Avengers: Doomsday plot). Rendered VERBATIM as supplied, but the
// plot reveal, quote, character returns and film connections are NOT confirmed by Marvel and MUST be fact-checked against
// official sources before publishing. All characters and films are trademarks of their owners; this is commentary, not
// affiliated with or endorsed by Marvel/Disney.**
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 64, kind: 'hook', reveal: [3, 40], text: 'Marvel may have|just brought back', kicker: 'The reveal', highlights: [], size: 48, media: {src: 'doom/dm00_marvel.jpg', type: 'img', effect: 'in'}},
  // 1
  {dur: 63, kind: 'text', reveal: [2, 28], text: 'one of its most|powerful characters.', highlights: ['powerful'], size: 44, pos: 'upperRight', media: {src: 'doom/dm01_powerful.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 39, kind: 'text', reveal: [2], text: 'And the person responsible', highlights: [], size: 50, pos: 'left', media: {src: 'doom/dm02_responsible.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 87, kind: 'text', reveal: [2, 28], text: 'could be the MCU’s|next major villain:', highlights: ['villain:'], size: 44, pos: 'lowerRight', media: {src: 'doom/dm03_villain.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 26, kind: 'text', reveal: [2], text: 'Doctor Doom.', highlights: ['Doom.'], size: 52, pos: 'upperLeft', media: {src: 'doom/dm04_doom.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 54, kind: 'text', reveal: [2, 28], text: 'The reveal came|in a surprise', highlights: ['surprise'], size: 44, pos: 'right', media: {src: 'doom/dm05_surprise.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 38, kind: 'text', reveal: [2], text: 'post-credits scene', highlights: [], size: 52, pos: 'lower', media: {src: 'doom/dm06_postcredits.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 45, kind: 'text', reveal: [2, 28], text: 'from the|VisionQuest finale,', highlights: ['VisionQuest'], size: 50, pos: 'lowerLeft', media: {src: 'doom/dm07_visionquest.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 48, kind: 'text', reveal: [2, 28], text: 'and it could|completely change', highlights: ['change'], size: 48, pos: 'upperRight', media: {src: 'doom/dm08_change.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 43, kind: 'text', reveal: [2], text: 'what we expect from', highlights: [], size: 50, pos: 'left', media: {src: 'doom/dm09_expect.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 26, kind: 'text', reveal: [2], text: 'Avengers: Doomsday.', highlights: ['Doomsday.'], size: 52, pos: 'right', media: {src: 'doom/dm10_doomsday.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 58, kind: 'text', reveal: [2, 28], text: 'If you’re following|the future of the MCU,', highlights: [], size: 44, pos: 'upperLeft', media: {src: 'doom/dm11_future.jpg', type: 'img', effect: 'in'}},
  // 12 FOLLOW
  {dur: 62, kind: 'text', reveal: [2], text: 'follow for more|entertainment updates.', highlights: ['follow'], size: 48, pos: 'lowerRight', media: {src: 'doom/dm12_follow.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 26, kind: 'text', reveal: [2], text: 'At the end of', highlights: [], size: 50, pos: 'upper', media: {src: 'doom/dm13_atend.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 62, kind: 'text', reveal: [2, 28], text: 'Doctor Strange in the|Multiverse of Madness,', highlights: ['Multiverse'], size: 44, pos: 'left', media: {src: 'doom/dm14_multiverse.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 37, kind: 'text', reveal: [2], text: 'Wanda Maximoff appeared', highlights: ['Wanda'], size: 52, pos: 'right', media: {src: 'doom/dm15_wanda.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 43, kind: 'text', reveal: [2], text: 'to sacrifice herself', highlights: ['sacrifice'], size: 52, pos: 'lowerLeft', media: {src: 'doom/dm16_sacrifice.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 63, kind: 'text', reveal: [2, 28], text: 'when Mount Wundagore|collapsed.', highlights: ['collapsed.'], size: 50, pos: 'upperRight', media: {src: 'doom/dm17_collapsed.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 59, kind: 'text', reveal: [2, 28], text: 'For years, fans|have questioned', highlights: ['fans'], size: 48, pos: 'left', media: {src: 'doom/dm18_fans.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 33, kind: 'text', reveal: [2], text: 'whether the Scarlet Witch', highlights: [], size: 50, pos: 'lowerRight', media: {src: 'doom/dm19_scarlet.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 38, kind: 'text', reveal: [2], text: 'was truly gone.', highlights: ['gone.'], size: 52, pos: 'upperLeft', media: {src: 'doom/dm20_gone.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 74, kind: 'text', reveal: [2, 28], text: 'Now, the VisionQuest|post-credits scene', highlights: [], size: 48, pos: 'right', media: {src: 'doom/dm21_revisit.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 65, kind: 'text', reveal: [2], text: 'revisits that moment.', highlights: ['revisits'], size: 52, pos: 'lower', media: {src: 'doom/dm22_moment.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 26, kind: 'text', reveal: [2, 28], text: 'But this time,|Doctor Doom appears,', highlights: ['Doom'], size: 44, pos: 'upperRight', media: {src: 'doom/dm23_doomappears.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 42, kind: 'text', reveal: [2, 28], text: 'lifts the rubble|covering Wanda,', highlights: ['rubble'], size: 48, pos: 'lowerLeft', media: {src: 'doom/dm24_rubble.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 26, kind: 'text', reveal: [2], text: 'and commands:', highlights: [], size: 52, pos: 'left', media: {src: 'doom/dm25_commands.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 51, kind: 'text', reveal: [2], text: 'Scarlet Witch, awaken.', highlights: ['awaken.'], size: 52, pos: 'right', media: {src: 'doom/dm26_awaken.jpg', type: 'img', effect: 'in'}},
  // 27 RED
  {dur: 63, kind: 'impact', redBg: true, text: 'Your power|will be mine.'},
  // 28
  {dur: 61, kind: 'text', reveal: [2, 28], text: 'Then Wanda|opens her eyes.', highlights: ['eyes.'], size: 48, pos: 'lowerRight', media: {src: 'doom/dm28_eyes.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 58, kind: 'text', reveal: [2, 28], text: 'That is more than|a nostalgic cameo.', highlights: ['cameo.'], size: 44, pos: 'upperLeft', media: {src: 'doom/dm29_cameo.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 69, kind: 'text', reveal: [2, 28], text: 'It suggests Doom|knows exactly', highlights: ['exactly'], size: 48, pos: 'right', media: {src: 'doom/dm30_exactly.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 31, kind: 'text', reveal: [2], text: 'who Wanda is', highlights: [], size: 52, pos: 'upperRight', media: {src: 'doom/dm31_whois.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 29, kind: 'text', reveal: [2], text: 'and may have plans', highlights: ['plans'], size: 50, pos: 'left', media: {src: 'doom/dm32_plans.jpg', type: 'img', effect: 'in'}},
  // 33
  {dur: 62, kind: 'text', reveal: [2, 28], text: 'to use her|extraordinary powers.', highlights: ['extraordinary'], size: 48, pos: 'lowerLeft', media: {src: 'doom/dm33_powers.jpg', type: 'img', effect: 'in'}},
  // 34
  {dur: 56, kind: 'text', reveal: [2, 28], text: 'Her return could|connect directly', highlights: ['connect'], size: 48, pos: 'upper', media: {src: 'doom/dm34_connect.jpg', type: 'img', effect: 'in'}},
  // 35
  {dur: 46, kind: 'text', reveal: [2, 28], text: 'to the next|Avengers storyline,', highlights: ['Avengers'], size: 48, pos: 'right', media: {src: 'doom/dm35_storyline.jpg', type: 'img', effect: 'in'}},
  // 36
  {dur: 39, kind: 'text', reveal: [2], text: 'especially with her sons', highlights: ['sons'], size: 50, pos: 'lowerRight', media: {src: 'doom/dm36_sons.jpg', type: 'img', effect: 'in'}},
  // 37
  {dur: 26, kind: 'text', reveal: [2], text: 'Billy and Tommy', highlights: [], size: 52, pos: 'upperLeft', media: {src: 'doom/dm37_billytommy.jpg', type: 'img', effect: 'in'}},
  // 38
  {dur: 41, kind: 'text', reveal: [2], text: 'now reunited with Vision', highlights: ['Vision'], size: 50, pos: 'left', media: {src: 'doom/dm38_vision.jpg', type: 'img', effect: 'in'}},
  // 39
  {dur: 31, kind: 'text', reveal: [2], text: 'in VisionQuest.', highlights: [], size: 52, pos: 'lowerRight', media: {src: 'doom/dm39_invq.jpg', type: 'img', effect: 'in'}},
  // 40
  {dur: 54, kind: 'text', reveal: [2, 28], text: 'But there’s still|a major question:', highlights: ['question:'], size: 44, pos: 'upperRight', media: {src: 'doom/dm40_question.jpg', type: 'img', effect: 'in'}},
  // 41
  {dur: 59, kind: 'text', reveal: [2, 28], text: 'is Doom bringing|Wanda back', highlights: [], size: 48, pos: 'right', media: {src: 'doom/dm41_bringback.jpg', type: 'img', effect: 'in'}},
  // 42
  {dur: 26, kind: 'text', reveal: [2], text: 'to control her,', highlights: ['control'], size: 52, pos: 'lowerLeft', media: {src: 'doom/dm42_control.jpg', type: 'img', effect: 'in'}},
  // 43
  {dur: 53, kind: 'text', reveal: [2], text: 'or does he need her power', highlights: ['power'], size: 42, pos: 'left', media: {src: 'doom/dm43_needpower.jpg', type: 'img', effect: 'in'}},
  // 44
  {dur: 50, kind: 'text', reveal: [2, 28], text: 'to accomplish|something even bigger?', highlights: ['bigger?'], size: 48, pos: 'upperRight', media: {src: 'doom/dm44_bigger.jpg', type: 'img', effect: 'in'}},
  // 45
  {dur: 68, kind: 'text', reveal: [2, 28], text: 'Should Wanda become|Doctor Doom’s weapon,', highlights: ['weapon,'], size: 44, pos: 'lower', media: {src: 'doom/dm45_weapon.jpg', type: 'img', effect: 'in'}},
  // 46
  {dur: 44, kind: 'text', reveal: [2, 28], text: 'or will she|turn against him?', highlights: ['against'], size: 44, pos: 'right', media: {src: 'doom/dm46_against.jpg', type: 'img', effect: 'in'}},
  // 47
  {dur: 43, kind: 'text', reveal: [2], text: 'And could the Scarlet Witch', highlights: [], size: 46, pos: 'upperLeft', media: {src: 'doom/dm47_couldshe.jpg', type: 'img', effect: 'in'}},
  // 48 CTA
  {dur: 45, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'become the key|to defeating him?', highlights: ['key'], size: 46, media: {src: 'doom/dm48_key.jpg', type: 'img', effect: 'in'}},
];


type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 1298, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 2307, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The reveal</span>
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
export const DoomReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('doom/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('doom/music.mp3')}
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
