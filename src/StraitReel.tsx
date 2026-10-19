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
// "The strait" reel (StraitReel) — fast NEWS reel, Hard Ledger house format.
// TOPIC: why the US won't take a standing offer that reopens the Strait of Hormuz in six days.
// Thesis: Iran's foreign minister says an offer is on the table — accept Tehran's terms and the strait
// (which carried ~1/5 of the world's oil & gas before the war) reopens on day 6, talks start day 7, with
// the war in month 8. The terms: lift the US blockade on Iranian ports, lift sanctions on Iranian oil
// exports, end hostilities on every regional front; Iran gives back the strait, the US gives back
// everything else — and the nuclear programme is NOT on the list. Washington's position is the mirror
// image (attributed to Vance): a meaningful cut to enrichment BEFORE anything else — nuclear first, strait
// after; Tehran wants strait first, nuclear later. Both agree on the end state; they're fighting over the
// ORDER. Mechanic: the strait is the only card Iran holds that the world feels (oil ~$100, record diesel,
// mortgage rates moving with the Gulf); open it on day 6 and that card is gone before talks begin. For the
// US, sanctions + the blockade are the same card in reverse. Whoever moves first hands over leverage.
// Payoff: nobody's refusing to reopen the strait — both sides refuse to go FIRST; the six-day offer is a
// sequencing dispute with 1/5 of the world's oil as the deposit, and every week unsettled the price is
// paid at the pump. Full QUESTION/STORY/ANSWER/CTA with a ~1.1s post-hook pause; close is the CTA question
// + comment ask ("Who should blink first? Tell me below."). 41 beats: 38 media (incl. 4 cards: STRAIT 1/5
// / DAY 6 / MONTH 8; IRAN'S PRICE — PORTS/SANCTIONS/FRONTS/NUCLEAR EXCLUDED; US NUCLEAR FIRST / IRAN
// STRAIT FIRST; IRAN'S CARD STRAIT / US'S CARD BLOCKADE) / 1 red impact ("It's a sequencing dispute.")
// mid-tail / 2 black. Captions match the VO verbatim (except the stylized cards). Durations/reveals/SFX
// locked to the VO via a scribe_v1 word-timestamp anchor pass (public/strait/voiceover.mp3).
// NB: OWN distinct footage under public/strait/, NO reuse of any other reel's clips.
// FOOTAGE is BRAND-FREE, FACE-FREE, FLAG-FREE and MILITARY/PROPAGANDA-FREE — generic oil/shipping/
// diplomacy b-roll: tankers, LNG carriers, straits/seascapes, ports, oil terminals/pipelines/refineries,
// barrels, fuel pumps, empty negotiation tables/podiums/microphones, documents/contracts, industrial
// pipes, a generic domed institutional building, chess, paperwork, a house, a globe, a vault. NO flags,
// NO politicians/faces, NO weapons/warships/uniforms, NO readable brand/ship names, NO Farsi/Arabic text,
// NO labeled maps.
// **UNVERIFIED / SENSITIVE — asserts specific, checkable geopolitical claims and attributes a position to
// a named official (Vance); render as written but FACT-CHECK before publishing:** the existence/terms of
// a six-day Strait-of-Hormuz reopening offer; "war in month eight"; a US blockade of Iranian ports; the
// ~1/5 of world oil & gas figure; the Vance "enrichment cut first" position and the Tehran "strait first"
// position; and "oil near $100 / record diesel / mortgage rates moving with the Gulf." The "sequencing
// dispute / who blinks first / paid at the pump" framing is editorial analysis.
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK (held through ~1.1s post-hook pause)
  {dur: 229, kind: 'hook', reveal: [3, 55, 105, 150], text: 'Why won’t the United States|take a deal that reopens|the Strait of Hormuz|in six days?', kicker: 'The strait', highlights: ['six'], size: 31, media: {src: 'strait/st00_strait.mp4', type: 'video', effect: 'in'}},
  // 1
  {dur: 33, kind: 'text', reveal: [2], text: 'Sunday.', highlights: [], size: 60, media: {src: 'strait/st01_newsdesk.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 105, kind: 'text', reveal: [2, 44], text: 'Iran’s foreign minister says|the offer is still on the table.', highlights: ['offer'], size: 36, media: {src: 'strait/st02_podium.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 57, kind: 'text', reveal: [2], text: 'Accept Tehran’s terms,', highlights: ['terms,'], size: 44, media: {src: 'strait/st03_signing.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 106, kind: 'text', reveal: [2, 48], text: 'and the strait, which carried|a fifth of the world’s oil and gas', highlights: ['fifth'], size: 32, media: {src: 'strait/st04_tanker.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 31, kind: 'text', reveal: [2], text: 'before the war,', highlights: ['war,'], size: 46, media: {src: 'strait/st05_dusk.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 41, kind: 'text', reveal: [2], text: 'reopens on day six.', highlights: ['six.'], size: 44, media: {src: 'strait/st06_opensea.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 50, kind: 'text', reveal: [2], text: 'Talks start on day seven.', highlights: ['seven.'], size: 42, media: {src: 'strait/st07_emptytable.jpg', type: 'img', effect: 'in'}},
  // 8 CARD 1
  {dur: 59, kind: 'lines', reveal: [0, 18, 34, 50], text: 'STRAIT: 1/5 WORLD|OIL + LNG|REOPENS: DAY 6|WAR: MONTH 8', highlights: ['1/5'], media: {src: 'strait/st08_lng.jpg', type: 'img', effect: 'in'}},
  // 9 BLACK
  {dur: 77, kind: 'text', reveal: [0, 0], text: 'But there’s one thing|most people overlook.', highlights: ['overlook.'], size: 46},
  // 10
  {dur: 35, kind: 'text', reveal: [2], text: 'Read the terms.', highlights: ['terms.'], size: 50, media: {src: 'strait/st10_clipboard.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 92, kind: 'text', reveal: [2, 40], text: 'Lift the US blockade|on Iranian ports.', highlights: ['blockade'], size: 38, media: {src: 'strait/st11_port.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 97, kind: 'text', reveal: [2, 40], text: 'Lift sanctions on|Iranian oil exports.', highlights: ['sanctions'], size: 38, media: {src: 'strait/st12_oilterminal.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 92, kind: 'text', reveal: [2, 40], text: 'End hostilities on|every regional front.', highlights: ['hostilities'], size: 38, media: {src: 'strait/st13_calmsea.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 67, kind: 'text', reveal: [2], text: 'Iran gives back the strait.', highlights: ['strait.'], size: 40, media: {src: 'strait/st14_tanker2.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 91, kind: 'text', reveal: [2, 40], text: 'The US gives back|everything else.', highlights: ['everything'], size: 40, media: {src: 'strait/st15_gate.jpg', type: 'img', effect: 'in'}},
  // 16 CARD 2
  {dur: 101, kind: 'lines', reveal: [0, 18, 34, 50], text: 'IRAN’S PRICE:|PORTS / SANCTIONS|ALL FRONTS|NUCLEAR: EXCLUDED', highlights: ['excluded'], media: {src: 'strait/st16_oilmontage.jpg', type: 'img', effect: 'in'}},
  // 17 BLACK
  {dur: 76, kind: 'text', reveal: [0, 0], text: 'And this is where|things get interesting.', highlights: ['interesting.'], size: 46},
  // 18
  {dur: 100, kind: 'text', reveal: [2, 40], text: 'Washington’s position|is the mirror image.', highlights: ['mirror'], size: 38, media: {src: 'strait/st18_capitol.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 142, kind: 'text', reveal: [2, 44, 88], text: 'Vance: Iran must make|a meaningful cut to enrichment|before anything else.', highlights: ['enrichment'], size: 32, media: {src: 'strait/st19_pipes.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 59, kind: 'text', reveal: [2, 26], text: 'Nuclear first,|strait after.', highlights: ['Nuclear'], size: 44, media: {src: 'strait/st20_split.jpg', type: 'img', effect: 'in'}},
  // 21 CARD 3
  {dur: 76, kind: 'lines', reveal: [0, 30], text: 'US: NUCLEAR FIRST|IRAN: STRAIT FIRST', highlights: ['first'], media: {src: 'strait/st21_industrial.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 86, kind: 'text', reveal: [2, 40], text: 'Both sides agree|on the end state.', highlights: ['agree'], size: 40, media: {src: 'strait/st22_twosides.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 91, kind: 'text', reveal: [2, 44], text: 'They’re fighting over|the order of the paperwork.', highlights: ['order'], size: 36, media: {src: 'strait/st23_paperwork.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 67, kind: 'text', reveal: [2, 40], text: 'Now let me show|how to actually do this.', highlights: ['actually'], size: 42, media: {src: 'strait/st24_notebook.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 160, kind: 'text', reveal: [2, 44, 88], text: 'The strait is the only card|Iran holds that the rest|of the world feels.', highlights: ['card'], size: 34, media: {src: 'strait/st25_chokepoint.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 57, kind: 'text', reveal: [2], text: 'Oil near a hundred dollars,', highlights: ['hundred'], size: 40, media: {src: 'strait/st26_barrels.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 46, kind: 'text', reveal: [2], text: 'record diesel prices,', highlights: ['diesel'], size: 46, media: {src: 'strait/st27_dieselpump.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 63, kind: 'text', reveal: [2, 40], text: 'mortgage rates moving|with the Gulf.', highlights: ['mortgage'], size: 38, media: {src: 'strait/st28_house.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 143, kind: 'text', reveal: [2, 44, 88], text: 'Open it on day six|and that card is gone|before the talks begin.', highlights: ['gone'], size: 34, media: {src: 'strait/st29_departing.jpg', type: 'img', effect: 'in'}},
  // 30 CARD 4
  {dur: 148, kind: 'lines', reveal: [0, 30], text: 'IRAN’S CARD: STRAIT|US’S CARD: BLOCKADE', highlights: ['strait', 'blockade'], media: {src: 'strait/st30_sanctions.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 91, kind: 'text', reveal: [2, 44], text: 'Whoever moves first|hands over their leverage', highlights: ['leverage'], size: 36, media: {src: 'strait/st31_chess.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 97, kind: 'text', reveal: [2, 44], text: 'and hopes the other side|turns up on day seven.', highlights: ['seven.'], size: 36, media: {src: 'strait/st32_chairs.jpg', type: 'img', effect: 'in'}},
  // 33
  {dur: 76, kind: 'text', reveal: [2, 40], text: 'Nobody’s refusing|to reopen the strait.', highlights: ['refusing'], size: 40, media: {src: 'strait/st33_strait3.jpg', type: 'img', effect: 'in'}},
  // 34
  {dur: 90, kind: 'text', reveal: [2, 40], text: 'Both sides are refusing|to go first.', highlights: ['first.'], size: 42, media: {src: 'strait/st34_standoff.jpg', type: 'img', effect: 'in'}},
  // 35
  {dur: 64, kind: 'text', reveal: [2, 40], text: 'The six-day offer|isn’t a peace plan.', highlights: ['peace'], size: 40, media: {src: 'strait/st35_peacedoc.jpg', type: 'img', effect: 'in'}},
  // 36 RED impact (thesis)
  {dur: 53, kind: 'impact', text: 'It’s a sequencing|dispute.', redBg: true},
  // 37
  {dur: 97, kind: 'text', reveal: [2, 44], text: 'with a fifth of the world’s oil|as the deposit.', highlights: ['deposit.'], size: 34, media: {src: 'strait/st37_vault.jpg', type: 'img', effect: 'in'}},
  // 38
  {dur: 116, kind: 'text', reveal: [2, 48], text: 'And every week it stays unsettled,|the price is paid at the pump,', highlights: ['pump,'], size: 32, media: {src: 'strait/st38_gaspump.jpg', type: 'img', effect: 'in'}},
  // 39
  {dur: 49, kind: 'text', reveal: [2, 26], text: 'not in Tehran|or Washington.', highlights: [], size: 44, media: {src: 'strait/st39_globe.jpg', type: 'img', effect: 'in'}},
  // 40 CTA (question close + comment ask)
  {dur: 59, kind: 'text', reveal: [2, 40], enter: 'zoom', text: 'Who should blink first?|Tell me below.', highlights: ['first?'], size: 40, media: {src: 'strait/st40_duskstrait.mp4', type: 'video', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 229, src: 'media/sfx_whoosh.mp3', vol: 0.35}, // hook -> Sunday
  {at: 652, src: 'media/sfx_impact.mp3', vol: 0.46}, // CARD 1
  {at: 712, src: 'media/sfx_whoosh.mp3', vol: 0.35}, // into black
  {at: 1264, src: 'media/sfx_impact.mp3', vol: 0.46}, // CARD 2
  {at: 1366, src: 'media/sfx_whoosh.mp3', vol: 0.35}, // into black
  {at: 1742, src: 'media/sfx_impact.mp3', vol: 0.46}, // CARD 3
  {at: 2530, src: 'media/sfx_impact.mp3', vol: 0.46}, // CARD 4
  {at: 3096, src: 'media/sfx_impact.mp3', vol: 0.55}, // red thesis (sequencing dispute)
  {at: 3411, src: 'media/sfx_whoosh.mp3', vol: 0.4}, // close
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The strait</span>
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
export const StraitReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('strait/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('strait/music.mp3')}
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
