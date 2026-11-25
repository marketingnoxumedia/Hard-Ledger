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
// "The stress test" reel (StressReel) — fast TECH / GAMING-BUSINESS news reel, Hard Ledger house VISUAL format.
// TOPIC: the Nov-19 launch of GRAND THEFT AUTO VI is shaping up as a STRESS TEST OF THE INTERNET. EVIDENCE: Sony &
// Microsoft reportedly call it the most pre-ordered game ever — ~11M copies pre-sold for $1B+ before launch, 13 years after
// GTA V (2013), with players already downloading. ESCALATION: those downloads already pressure networks, and
// cybersecurity expert Arun Vishwanath warns the real test is millions trying to play simultaneously worldwide.
// CONSEQUENCES: ISPs believe they have capacity but localized slowdowns are possible — and the risk isn't only bandwidth.
// CONTROVERSY: criminals may exploit the hype with fake early access, scam discounts and fraudulent downloads (Rockstar
// itself was socially-engineered and hacked in 2022); the advice is to avoid unofficial offers and download only through
// official stores. DEBATE: is the internet ready for the biggest gaming launch ever, or will it expose how fragile our
// digital infrastructure is?
// NOTE ON VOICE: built from a client-supplied script in the influencer "curiosity-gap" format, NOT the faceless house
// voice — EARLY "follow for more" CTA, CLOSES on an "is the internet ready?" debate question.
// Per the saved house preference, captions are <=5-6 words/beat with LARGER on-screen type (Anton 42-52). 42 beats. 3 stat
// cards: 13 YEARS SINCE GTA V, 11 MILLION COPIES PRE-SOLD, $1 BILLION IN PRE-ORDERS (Nov 19, 2013, 2022 stay in-caption).
// 1 red impact at the ESCALATION pivot ("Everyone, / at once."), no black beat.
// FOOTAGE — TOPICAL but STRICTLY COPYRIGHT-CLEAN b-roll, and deliberately NOT GTA: the client wanted GTA footage, but GTA
// (Rockstar) trailers/gameplay/characters are copyrighted and were NOT used. Every shot is generic, royalty-free stock:
// gaming setups / controllers / consoles with NO game on screen and NO brand logo, download & progress bars, "server at
// capacity" / loading / error screens, data centers & server racks, fiber & global network-traffic maps, and
// phishing / scam / hacker / cybersecurity imagery for the fraud beats. NO GTA or any game footage, NO recognizable game
// character, NO console/publisher/store logo, NO readable brand or game text on screen. Mix of short videos + photos. OWN
// distinct footage under public/stress/, NO reuse — ledger-checked.
// **UNVERIFIED — names real companies/people (Rockstar / Grand Theft Auto VI & V, Sony, Microsoft, PlayStation, Xbox,
// cybersecurity expert Arun Vishwanath) and cites specific, checkable claims: a Nov 19 launch, "most pre-ordered game
// ever", ~11M pre-orders for $1B+, a 2022 Rockstar hack via social engineering, and the networks-stress warning. Rendered
// as supplied. Every figure, the date, the attribution to Arun Vishwanath and the pre-order/hack claims MUST be
// fact-checked against primary reporting before publishing. General tech/business news, NOT investment advice; the
// closing line is the client's engagement prompt.**
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 228, kind: 'hook', reveal: [3, 40], text: 'Finally launch day—|then you can’t download it.', kicker: 'The stress test', highlights: ['download'], size: 48, media: {src: 'stress/st00_launchday.mp4', type: 'video', effect: 'in'}},
  // 1
  {dur: 113, kind: 'text', reveal: [2, 28], text: 'That’s the problem tech companies|are preparing for.', highlights: ['preparing'], size: 44, pos: 'upperRight', media: {src: 'stress/st01_prepare.mp4', type: 'video', effect: 'in'}},
  // 2
  {dur: 106, kind: 'text', reveal: [2, 28], text: 'GTA VI isn’t just|another game release.', highlights: ['just'], size: 44, pos: 'left', media: {src: 'stress/st02_notjust.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 103, kind: 'text', reveal: [2, 28], text: 'It’s a massive test|of the internet itself.', highlights: ['test'], size: 44, pos: 'lowerRight', media: {src: 'stress/st03_test.mp4', type: 'video', effect: 'in'}},
  // 4
  {dur: 103, kind: 'text', reveal: [2, 28], text: 'The biggest question isn’t|whether people will play it.', highlights: ['question'], size: 44, pos: 'upperLeft', media: {src: 'stress/st04_question.mp4', type: 'video', effect: 'in'}},
  // 5
  {dur: 139, kind: 'text', reveal: [2, 28], text: 'It’s whether the infrastructure|can handle everyone at once.', highlights: ['handle'], size: 44, pos: 'right', media: {src: 'stress/st05_handle.mp4', type: 'video', effect: 'in'}},
  // 6 FOLLOW
  {dur: 167, kind: 'text', reveal: [2], text: 'Follow for more|tech and business stories.', highlights: ['follow'], size: 44, pos: 'lower', media: {src: 'stress/st06_follow.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 111, kind: 'text', reveal: [2, 28], text: 'Grand Theft Auto VI|launches Thursday,', highlights: ['Thursday,'], size: 44, pos: 'lowerLeft', media: {src: 'stress/st07_launches.mp4', type: 'video', effect: 'in'}},
  // 8
  {dur: 47, kind: 'text', reveal: [2], text: 'November 19,', highlights: ['November'], size: 52, pos: 'upperRight', media: {src: 'stress/st08_nov19.jpg', type: 'img', effect: 'in'}},
  // 9 CARD
  {dur: 82, kind: 'stat', stat: {value: 13, suffix: ' YRS', post: 'SINCE GTA V'}, media: {src: 'stress/st09_card13.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 61, kind: 'text', reveal: [2], text: 'since GTA V arrived in 2013.', highlights: ['2013.'], size: 42, pos: 'left', media: {src: 'stress/st10_2013.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 89, kind: 'text', reveal: [2, 28], text: 'And the excitement|is already enormous.', highlights: ['enormous.'], size: 44, pos: 'right', media: {src: 'stress/st11_excitement.mp4', type: 'video', effect: 'in'}},
  // 12
  {dur: 74, kind: 'text', reveal: [2, 28], text: 'Sony and Microsoft|reportedly call it', highlights: ['Sony'], size: 44, pos: 'upperLeft', media: {src: 'stress/st12_sonymsft.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 142, kind: 'text', reveal: [2], text: 'the most pre-ordered game ever.', highlights: ['pre-ordered'], size: 46, pos: 'lowerRight', media: {src: 'stress/st13_mostpre.mp4', type: 'video', effect: 'in'}},
  // 14
  {dur: 48, kind: 'text', reveal: [2], text: 'By late last week, estimates', highlights: ['estimates'], size: 46, pos: 'upper', media: {src: 'stress/st14_bylate.mp4', type: 'video', effect: 'in'}},
  // 15
  {dur: 28, kind: 'text', reveal: [2], text: 'suggested more than', highlights: ['more'], size: 52, pos: 'left', media: {src: 'stress/st15_suggest.mp4', type: 'video', effect: 'in'}},
  // 16 CARD
  {dur: 40, kind: 'stat', stat: {value: 11, suffix: ' MILLION', post: 'COPIES PRE-SOLD'}, media: {src: 'stress/st16_card11.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 92, kind: 'text', reveal: [2], text: 'copies sold through pre-orders,', highlights: ['pre-orders,'], size: 50, pos: 'right', media: {src: 'stress/st17_copies.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 37, kind: 'text', reveal: [2], text: 'generating over', highlights: ['generating'], size: 52, pos: 'lowerLeft', media: {src: 'stress/st18_generating.jpg', type: 'img', effect: 'in'}},
  // 19 CARD
  {dur: 49, kind: 'stat', stat: {prefix: '$', value: 1, suffix: ' BILLION', post: 'IN PRE-ORDERS'}, media: {src: 'stress/st19_card1b.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 106, kind: 'text', reveal: [2, 28], text: 'And players have already|started downloading.', highlights: ['downloading.'], size: 44, pos: 'upperRight', media: {src: 'stress/st20_downloading.mp4', type: 'video', effect: 'in'}},
  // 21
  {dur: 139, kind: 'text', reveal: [2, 28], text: 'But those downloads are|pressuring internet networks.', highlights: ['pressuring'], size: 44, pos: 'left', media: {src: 'stress/st21_pressure.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 91, kind: 'text', reveal: [2, 28], text: 'Cybersecurity expert|Arun Vishwanath says', highlights: ['Cybersecurity'], size: 48, pos: 'lowerRight', media: {src: 'stress/st22_expert.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 47, kind: 'text', reveal: [2], text: 'the bigger challenge comes', highlights: ['bigger'], size: 50, pos: 'upperLeft', media: {src: 'stress/st23_bigger.mp4', type: 'video', effect: 'in'}},
  // 24
  {dur: 31, kind: 'text', reveal: [2], text: 'when the game becomes playable', highlights: ['playable'], size: 46, pos: 'right', media: {src: 'stress/st24_playable.jpg', type: 'img', effect: 'in'}},
  // 25 RED
  {dur: 38, kind: 'impact', redBg: true, text: 'Everyone,|at once.'},
  // 26
  {dur: 115, kind: 'text', reveal: [2, 28], text: 'millions trying to access it|at the same time.', highlights: ['millions'], size: 44, pos: 'lower', media: {src: 'stress/st26_millions.mp4', type: 'video', effect: 'in'}},
  // 27
  {dur: 124, kind: 'text', reveal: [2, 28], text: 'Internet providers believe|they have enough capacity.', highlights: ['capacity.'], size: 44, pos: 'upperRight', media: {src: 'stress/st27_providers.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 119, kind: 'text', reveal: [2, 28], text: 'But localized slowdowns|could still happen.', highlights: ['slowdowns'], size: 44, pos: 'lowerLeft', media: {src: 'stress/st28_slowdowns.mp4', type: 'video', effect: 'in'}},
  // 29
  {dur: 93, kind: 'text', reveal: [2, 28], text: 'And the risks aren’t limited|to internet connections.', highlights: ['risks'], size: 44, pos: 'left', media: {src: 'stress/st29_notlimited.mp4', type: 'video', effect: 'in'}},
  // 30
  {dur: 91, kind: 'text', reveal: [2, 28], text: 'Cybercriminals could|exploit the excitement', highlights: ['Cybercriminals'], size: 48, pos: 'right', media: {src: 'stress/st30_criminals.mp4', type: 'video', effect: 'in'}},
  // 31
  {dur: 63, kind: 'text', reveal: [2], text: 'with fake early access,', highlights: ['fake'], size: 50, pos: 'lowerRight', media: {src: 'stress/st31_fake.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 105, kind: 'text', reveal: [2, 28], text: 'suspicious discounts,|or fraudulent downloads.', highlights: ['fraudulent'], size: 48, pos: 'upperLeft', media: {src: 'stress/st32_fraud.jpg', type: 'img', effect: 'in'}},
  // 33
  {dur: 91, kind: 'text', reveal: [2, 28], text: 'Rockstar itself|was hacked in 2022,', highlights: ['hacked'], size: 44, pos: 'right', media: {src: 'stress/st33_hacked.mp4', type: 'video', effect: 'in'}},
  // 34
  {dur: 67, kind: 'text', reveal: [2, 28], text: 'when attackers used|social engineering', highlights: ['social'], size: 48, pos: 'upperRight', media: {src: 'stress/st34_social.jpg', type: 'img', effect: 'in'}},
  // 35
  {dur: 106, kind: 'text', reveal: [2, 28], text: 'to obtain and release|early game footage.', highlights: ['release'], size: 44, pos: 'left', media: {src: 'stress/st35_leaked.mp4', type: 'video', effect: 'in'}},
  // 36
  {dur: 34, kind: 'text', reveal: [2], text: 'The advice is simple:', highlights: ['advice'], size: 50, pos: 'lowerLeft', media: {src: 'stress/st36_advice.jpg', type: 'img', effect: 'in'}},
  // 37
  {dur: 56, kind: 'text', reveal: [2], text: 'avoid unofficial offers,', highlights: ['avoid'], size: 52, pos: 'upper', media: {src: 'stress/st37_avoid.jpg', type: 'img', effect: 'in'}},
  // 38
  {dur: 143, kind: 'text', reveal: [2, 28], text: 'download only through|official stores.', highlights: ['official'], size: 48, pos: 'right', media: {src: 'stress/st38_official.jpg', type: 'img', effect: 'in'}},
  // 39
  {dur: 28, kind: 'text', reveal: [2], text: 'So what do you think?', highlights: ['think?'], size: 46, pos: 'lowerRight', media: {src: 'stress/st39_sowhat.jpg', type: 'img', effect: 'in'}},
  // 40
  {dur: 103, kind: 'text', reveal: [2, 28], text: 'Is the internet ready|for the biggest launch ever?', highlights: ['ready'], size: 44, pos: 'upperLeft', media: {src: 'stress/st40_ready.mp4', type: 'video', effect: 'in'}},
  // 41 CTA
  {dur: 166, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Or could millions expose|how fragile our infrastructure is?', highlights: ['fragile'], size: 46, media: {src: 'stress/st41_fragile.mp4', type: 'video', effect: 'in'}},
];


type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 1117, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1641, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1810, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 2273, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 3649, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The stress test</span>
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
export const StressReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('stress/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('stress/music.mp3')}
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
