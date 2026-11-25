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
// "The field" reel (FieldReel) — fast NEWS reel, Hard Ledger house format.
// TOPIC: the UK's re-approval of the North Sea "Jackdaw" gas field (Shell / Equinor) — a field already
// approved in 2022, struck down by a court, now being waved through, for ~2% of UK gas demand for ~a decade.
// Thesis: the UK is about to approve a gas field it already approved four years ago, covering ~2% of what
// the country burns. It's Shell and Equinor's Jackdaw — approved in 2022, then struck down by a court, and
// the government that pledged no new drilling is waving it through. The numbers: ~6% of North Sea gas
// output, but the North Sea is shrinking, so in UK demand terms ~2%, for roughly 10 years, then it's gone.
// The platform is largely unmanned / remotely operated, so the jobs argument barely applies. On the climate
// pledge, the line is that Jackdaw isn't a NEW licence so the promise "still stands" (technically true) —
// though the court ruling was about the emissions from burning the gas, which haven't changed. Does ~2%
// move your bill? Gas is priced globally, so probably not. Is Rosebank next? Binary close ("Energy
// security, or a very expensive way to keep a pledge technically intact? Pick a side below."). QUESTION/
// STORY/ANSWER/CTA with NO post-hook pause (claim flows straight into the personal beat), mid-reel
// like+follow ask.
// 41 beats: 39 media (incl. 4 number cards: APPROVED 2022 / STRUCK DOWN; ~6% of North Sea output; ~2% of UK
// demand; ~10 YEARS) / 1 red impact ("...technically intact?") / 1 black ("Technically|true."). Captions
// match the VO verbatim (except the number cards; spoken figures as numerals). Durations/reveals/SFX locked
// to the VO via a scribe_v1 word-timestamp anchor pass (public/field/voiceover.mp3, NO inserted pause);
// music mixed at 0.17.
// NB: OWN distinct footage under public/field/, NO reuse of any other reel's clips (incl. OilReel).
// FOOTAGE is BRAND-FREE, FACE-FREE, FLAG-FREE and LANDMARK-FREE — generic energy / sea / civic b-roll: an
// unmarked offshore gas platform, the North Sea, a gas-hob flame, an energy bill / gas meter, a gavel, a
// government podium, pipelines, a control room, hard hats, pylons, a forked road. **NO Shell / Equinor / BP
// / Total / Exxon logos, wordmarks, livery or branded products; NO readable rig/vessel names; NO flags
// (Union Jack / saltire / any); NO identifiable UK landmarks; NO identifiable faces; NO brand logos; no
// foreign text, no banknote portraits, no military insignia.**
// **UNVERIFIED / SENSITIVE — names real companies (Shell, Equinor) and a real UK project (Jackdaw,
// Rosebank) and attributes figures / court actions / government positions; rendered as written but MUST be
// fact-checked against primary sources before publishing:** the "approved four years ago / ~2% of demand"
// framing; "Shell and Equinor's Jackdaw", approved 2022 and struck down by a court; "government that
// pledged no new drilling"; the ~6% of North Sea output / ~2% of UK demand / ~10-year figures; "largely
// unmanned / remotely operated"; the "not a new licence / promise still stands" line and the emissions
// court ruling; "gas priced globally"; Rosebank "decision due later this year"; and "two ministers in
// Aberdeen on Wednesday". The energy-security-vs-pledge framing is editorial analysis.
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK a
  {dur: 88, kind: 'hook', reveal: [3, 40], text: 'The UK is about to approve|a gas field', kicker: 'The field', highlights: [], size: 38, media: {src: 'field/fi00_platform.mp4', type: 'video', effect: 'in'}},
  // 1
  {dur: 83, kind: 'text', reveal: [2, 28], text: 'it already approved|four years ago.', highlights: ['four'], size: 42, media: {src: 'field/fi01_approved.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 105, kind: 'text', reveal: [2, 40], text: 'And it’ll cover 2%|of what the country burns.', highlights: ['2%'], size: 36, media: {src: 'field/fi02_flame.jpg', type: 'img', effect: 'panL'}},
  // 3
  {dur: 53, kind: 'text', reveal: [2, 28], text: 'If you’re paying|a British energy bill,', highlights: [], size: 36, media: {src: 'field/fi03_meter.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 67, kind: 'text', reveal: [2, 40], text: 'this is the project|you’ve been told will help.', highlights: ['help.'], size: 34, media: {src: 'field/fi04_pipeline.jpg', type: 'img', effect: 'panR'}},
  // 5
  {dur: 66, kind: 'text', reveal: [2, 40], text: 'Look at the size of it|before you believe that.', highlights: ['size'], size: 34, media: {src: 'field/fi05_magnifier.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 80, kind: 'text', reveal: [2, 40], text: 'I’ll show you exactly|what’s being signed off.', highlights: ['signed'], size: 36, media: {src: 'field/fi06_signing.jpg', type: 'img', effect: 'panL'}},
  // 7 ask
  {dur: 118, kind: 'text', reveal: [2, 40], text: 'But first, like the video|and make sure to follow.', highlights: ['follow.'], size: 36, media: {src: 'field/fi07_phone.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 77, kind: 'text', reveal: [2, 40], text: 'Now, a North Sea gas field|is nothing new.', highlights: [], size: 34, media: {src: 'field/fi08_northsea.jpg', type: 'img', effect: 'panL'}},
  // 9
  {dur: 39, kind: 'text', reveal: [2, 28], enter: 'slideL', text: 'But this one|is different.', highlights: ['different.'], size: 48, media: {src: 'field/fi09_standout.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 83, kind: 'text', reveal: [2, 40], text: 'Because it’s Shell|and Equinor’s Jackdaw.', highlights: ['Jackdaw.'], size: 36, media: {src: 'field/fi10_rig.jpg', type: 'img', effect: 'in'}},
  // 11 CARD 2022
  {dur: 176, kind: 'lines', reveal: [0, 22], text: 'APPROVED: 2022|STRUCK DOWN BY A COURT', highlights: ['2022'], media: {src: 'field/fi11_gavel.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 114, kind: 'text', reveal: [2, 40], text: 'And the government that|pledged no new drilling', highlights: [], size: 32, media: {src: 'field/fi12_building.jpg', type: 'img', effect: 'panR'}},
  // 13
  {dur: 64, kind: 'text', reveal: [2, 28], text: 'is the one|waving it through.', highlights: ['waving'], size: 42, media: {src: 'field/fi13_greenlight.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 31, kind: 'text', reveal: [2], enter: 'slideUp', text: 'Look at the numbers.', highlights: ['numbers.'], size: 46, media: {src: 'field/fi14_numbers.jpg', type: 'img', effect: 'in'}},
  // 15 CARD 6%
  {dur: 111, kind: 'stat', stat: {pre: 'ABOUT', value: 6, suffix: '%', post: 'OF NORTH SEA GAS OUTPUT'}, media: {src: 'field/fi15_output.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 25, kind: 'text', reveal: [2], text: 'Sounds big.', highlights: ['big.'], size: 52, media: {src: 'field/fi16_big.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 54, kind: 'text', reveal: [2, 28], text: 'But the North Sea|is shrinking.', highlights: ['shrinking.'], size: 42, media: {src: 'field/fi17_shrinking.jpg', type: 'img', effect: 'panL'}},
  // 18 CARD 2%
  {dur: 96, kind: 'stat', stat: {pre: 'IN UK DEMAND TERMS', value: 2, suffix: '%'}, media: {src: 'field/fi18_sliver.jpg', type: 'img', effect: 'in'}},
  // 19 CARD 10yr
  {dur: 39, kind: 'stat', stat: {pre: 'FOR ROUGHLY', value: 10, post: 'YEARS'}, media: {src: 'field/fi19_decade.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 29, kind: 'text', reveal: [2], text: 'Then it’s gone.', highlights: ['gone.'], size: 50, media: {src: 'field/fi20_gone.jpg', type: 'img', effect: 'panR'}},
  // 21
  {dur: 47, kind: 'text', reveal: [2, 28], text: 'And the problem|doesn’t stop there.', highlights: ['problem'], size: 44, media: {src: 'field/fi21_warning.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 86, kind: 'text', reveal: [2, 28], text: 'The platform will be|largely unmanned.', highlights: ['unmanned.'], size: 38, media: {src: 'field/fi22_unmanned.jpg', type: 'img', effect: 'panL'}},
  // 23
  {dur: 48, kind: 'text', reveal: [2], enter: 'slideR', text: 'Remotely operated.', highlights: ['Remotely'], size: 48, media: {src: 'field/fi23_control.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 97, kind: 'text', reveal: [2, 40], text: 'So the jobs argument,|the one used every time', highlights: ['jobs'], size: 34, media: {src: 'field/fi24_jobs.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 98, kind: 'text', reveal: [2, 40], text: 'a field gets approved,|barely applies here.', highlights: ['barely'], size: 36, media: {src: 'field/fi25_barely.jpg', type: 'img', effect: 'panR'}},
  // 26
  {dur: 100, kind: 'text', reveal: [2, 40], text: 'Normally you’d expect a straight|answer on the climate pledge.', highlights: ['pledge.'], size: 32, media: {src: 'field/fi26_climate.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 112, kind: 'text', reveal: [2, 40], text: 'Instead, the line is that Jackdaw|isn’t a new licence,', highlights: ['licence,'], size: 32, media: {src: 'field/fi27_permit-document.jpg', type: 'img', effect: 'panL'}},
  // 28
  {dur: 68, kind: 'text', reveal: [2, 28], text: 'so the promise|still stands.', highlights: ['stands.'], size: 42, media: {src: 'field/fi28_handshake-hands.jpg', type: 'img', effect: 'in'}},
  // 29 BLACK
  {dur: 31, kind: 'impact', text: 'Technically|true.'},
  // 30a
  {dur: 99, kind: 'text', reveal: [2, 40], text: 'And the strange part is that|the court ruling last year', highlights: ['strange'], size: 34, media: {src: 'field/fi41_courthouse.jpg', type: 'img', effect: 'in'}},
  // 30b
  {dur: 72, kind: 'text', reveal: [2, 40], text: 'was about the emissions|from burning the gas,', highlights: ['emissions'], size: 36, media: {src: 'field/fi30_smokestack-plume.jpg', type: 'img', effect: 'panL'}},
  // 31
  {dur: 39, kind: 'text', reveal: [2], enter: 'zoom', text: 'which haven’t changed.', highlights: ['changed.'], size: 46, media: {src: 'field/fi31_gas-flare.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 81, kind: 'text', reveal: [2, 28], text: 'Does 2% move|your bill at all?', highlights: ['2%'], size: 38, media: {src: 'field/fi32_gas-meter-dials.jpg', type: 'img', effect: 'panR'}},
  // 33
  {dur: 100, kind: 'text', reveal: [2, 40], text: 'Gas is priced globally,|so probably not.', highlights: ['globally,'], size: 36, media: {src: 'field/fi33_globe.jpg', type: 'img', effect: 'in'}},
  // 34
  {dur: 100, kind: 'text', reveal: [2, 40], text: 'Is Rosebank next?|Decision due later this year.', highlights: ['Rosebank'], size: 34, media: {src: 'field/fi34_rig-horizon.jpg', type: 'img', effect: 'panL'}},
  // 35
  {dur: 124, kind: 'text', reveal: [2, 40, 80], text: 'Four years, one court case,|two ministers in Aberdeen|on Wednesday.', highlights: ['Aberdeen'], size: 30, media: {src: 'field/fi35_official-handshake.jpg', type: 'img', effect: 'in'}},
  // 36
  {dur: 72, kind: 'text', reveal: [2, 28], text: 'For 2% of demand,|for a decade.', highlights: ['decade.'], size: 40, media: {src: 'field/fi36_thin-sliver.jpg', type: 'img', effect: 'panR'}},
  // 37
  {dur: 27, kind: 'text', reveal: [2], text: 'So you tell me.', highlights: ['you'], size: 50, media: {src: 'field/fi37_hand-pointing.jpg', type: 'img', effect: 'in'}},
  // 38
  {dur: 38, kind: 'text', reveal: [2], text: 'Energy security,', highlights: ['security,'], size: 46, media: {src: 'field/fi38_pylons-dusk.jpg', type: 'img', effect: 'panL'}},
  // 39 RED
  {dur: 129, kind: 'impact', redBg: true, text: 'or a very expensive way|to keep a pledge|technically intact?'},
  // 40 CTA
  {dur: 35, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Pick a side|below.', highlights: ['side'], size: 48, media: {src: 'field/fi40_forked-road.mp4', type: 'video', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 736, src: 'media/sfx_whoosh.mp3', vol: 0.33},
  {at: 858, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1212, src: 'media/sfx_whoosh.mp3', vol: 0.33},
  {at: 1243, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 1433, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 1529, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 1730, src: 'media/sfx_whoosh.mp3', vol: 0.33},
  {at: 2252, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 2455, src: 'media/sfx_whoosh.mp3', vol: 0.33},
  {at: 3036, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 3165, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The field</span>
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
export const FieldReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('field/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('field/music.mp3')}
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
