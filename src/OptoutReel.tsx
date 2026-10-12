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
// "The premium" reel (OptoutReel) — fast NEWS reel, Hard Ledger house format.
// NEW topic: how a government could raise income tax WITHOUT breaking a promise not to — by
// renaming it a "premium" you can OPT OUT of, and letting INERTIA do the collecting. A Monday
// proposal (from a former pensions minister, via a consultancy) has everyone over 40 (pensioners
// included) pay an extra 1p in every £ of taxable income (avg ~£31/month) to fund social care; it
// isn't called a tax, it's a "premium" with an opt-out, so Labour's manifesto promise stays
// "intact." The mechanism is auto-enrolment (the 2012 pensions trick): most people never opt out
// because most people never do anything, and the money comes out before you notice. The threat is
// real (1 in 7 over-65s face £100k+ care bills, so it's sold as insurance), and it lands as the
// same PM proposes changing the pension triple lock from 2030. The answer: you don't raise the
// tax, you rename it, make it automatic, and let inertia collect — not a loophole, the design; the
// question isn't whether it's a tax, it's whether you'll remember to say no. Full VERBATIM QUESTION/
// STORY/ANSWER/CTA with a ~1.1s post-hook pause; close is the supplied CTA QUESTION ("Would you opt
// out? Tell me below."). Sped VO (atempo ~1.03) — total ~2825 frames = ~94s (final CTA beat
// extended for a clean tail). 30 beats: 27 media (incl. video b-roll + 3 cards: OVER-40s/+1p IN
// THE £/£31 A MONTH; "PREMIUM" NOT TAX/OPT-OUT = PROMISE KEPT; AUTO-ENROLMENT 2012 — plus a
// £100,000+ stat) / 1 red impact ("It's not a loophole. It's the design.") / 2 black ("Here's the
// piece you're missing." + "This is the part that makes it work.").
// NB: OWN distinct footage under public/optout/, NO reuse of any other reel's clips.
// FIGURES/PROPOSAL/PARTY are editorial (VO + text only); FOOTAGE is strictly BRAND-FREE AND
// FACE-FREE -- generic tax/paperwork/care/pension b-roll, NO real politicians, NO party logos (no
// Labour rose), NO UK government crest / royal coat of arms / royal cypher, NO £ banknote portrait
// faces, NO identifiable landmark (no 10 Downing St / Big Ben as subject), NO HMRC/DWP or other
// readable brand marks, NO human faces. Own footage public/optout/.
// **TIME-SENSITIVE / UNVERIFIED -- verify before publishing:** attributes a Monday social-care
// "premium" proposal (over-40s, +1p, ~£31/month, opt-out, from a former pensions minister via a
// consultancy), the auto-enrolment-2012 framing, a 1-in-7 / £100k+ care-cost stat, and a
// triple-lock-from-2030 change by the same PM. All author-supplied and rendered as written; confirm
// every figure and the proposal/party claims against primary sources before this publishes.
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK (held through ~1.1s post-hook pause)
  {dur: 249, kind: 'hook', reveal: [2, 40, 92], text: 'How do you raise income tax|without breaking a promise|not to raise it?', kicker: 'The premium', highlights: ['promise'], size: 40, media: {src: 'optout/b00_taxform.mp4', type: 'video', effect: 'in'}},
  // 1
  {dur: 139, kind: 'text', reveal: [2, 52], text: 'Monday. A proposal lands|on the PM’s desk.', highlights: ['proposal'], size: 42, media: {src: 'optout/b01_desk.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 110, kind: 'text', reveal: [2, 46], enter: 'slideL', text: 'Everyone over 40,|pensioners included.', highlights: ['pensioners'], size: 42, media: {src: 'optout/b02_highstreet.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 83, kind: 'text', reveal: [2, 44], text: 'An extra 1p in every pound|of taxable income.', highlights: ['1p'], size: 42, media: {src: 'optout/b03_pennies.jpg', type: 'img', effect: 'in'}},
  // 4 CARD
  {dur: 93, kind: 'lines', text: 'OVER-40s|+1p IN THE £|£31 A MONTH', highlights: ['£31'], reveal: [0, 24, 52], media: {src: 'optout/b04_payslip.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 30, kind: 'text', text: 'It funds social care.', highlights: ['care.'], size: 44, media: {src: 'optout/b05_care.jpg', type: 'img', effect: 'in'}},
  // 6 BLACK
  {dur: 31, kind: 'text', reveal: [0, 0], text: "Here's the piece|you're missing.", highlights: ['missing.'], size: 50},
  // 7
  {dur: 128, kind: 'text', reveal: [2, 50], text: 'Labour promised not|to raise income tax.', highlights: ['promised'], size: 42, media: {src: 'optout/b07_ballot.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 53, kind: 'text', reveal: [0, 0], text: 'From a former|pensions minister.', highlights: ['minister.'], size: 44, media: {src: 'optout/b08_govbuilding.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 81, kind: 'text', reveal: [2, 42], enter: 'slideUp', text: 'It doesn’t call it a tax.|It calls it a premium.', highlights: ['premium.'], size: 42, media: {src: 'optout/b09_premium.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 109, kind: 'text', reveal: [2, 52], text: 'And you can|opt out.', highlights: ['opt'], size: 46, media: {src: 'optout/b10_optout.jpg', type: 'img', effect: 'in'}},
  // 11 CARD
  {dur: 118, kind: 'lines', text: '“PREMIUM”, NOT TAX|OPT-OUT =|PROMISE KEPT', highlights: ['promise'], reveal: [0, 24, 52], media: {src: 'optout/b11_contract.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 71, kind: 'text', reveal: [0, 0], text: 'This is where|it gets interesting.', highlights: ['interesting.'], size: 44, media: {src: 'optout/b12_magnifier.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 114, kind: 'text', reveal: [2, 50], enter: 'slideR', text: 'Opt-out built Britain’s|pension system.', highlights: ['optout'], size: 42, media: {src: 'optout/b13_pension.jpg', type: 'img', effect: 'in'}},
  // 14 CARD
  {dur: 44, kind: 'lines', text: 'AUTO-ENROLMENT|IN 2012', highlights: ['2012'], reveal: [0, 22], media: {src: 'optout/b14_calendar.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 144, kind: 'text', reveal: [2, 62], text: 'Most never opt out.|Most never do anything.', highlights: ['anything.'], size: 42, media: {src: 'optout/b15_inertia.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 120, kind: 'text', reveal: [2, 52], text: 'The money comes out|before you notice.', highlights: ['before'], size: 42, media: {src: 'optout/b16_deduction.jpg', type: 'img', effect: 'in'}},
  // 17 BLACK
  {dur: 55, kind: 'text', reveal: [0, 0], text: 'This is the part|that makes it work.', highlights: ['work.'], size: 48},
  // 18
  {dur: 101, kind: 'text', reveal: [0, 0], enter: 'slideL', text: 'The threat|is real.', highlights: ['real.'], size: 48, media: {src: 'optout/b18_corridor.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 111, kind: 'text', reveal: [2, 46], text: 'One in seven over-65s|face huge care bills.', highlights: ['seven'], size: 40, media: {src: 'optout/b19_elderlycare.jpg', type: 'img', effect: 'in'}},
  // 20 STAT
  {dur: 103, kind: 'stat', stat: {pre: 'CARE BILLS CAN TOP', prefix: '£', value: 100000, post: 'PER PERSON'}, media: {src: 'optout/b20_bills.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 70, kind: 'text', reveal: [0, 0], text: 'Sold to you|as insurance.', highlights: ['insurance.'], size: 44, media: {src: 'optout/b21_umbrella.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 98, kind: 'text', reveal: [2, 44], enter: 'slideR', text: 'As the same PM eyes|the triple lock.', highlights: ['triple'], size: 42, media: {src: 'optout/b22_padlock.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 104, kind: 'text', reveal: [0, 0], text: 'Changing it|from 2030.', highlights: ['2030.'], size: 46, media: {src: 'optout/b23_clock2030.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 35, kind: 'text', reveal: [0, 0], text: 'You don’t raise the tax.|You rename it.', highlights: ['rename'], size: 42, media: {src: 'optout/b24_rename.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 117, kind: 'text', reveal: [2, 52], text: 'Make it automatic.|Let inertia collect.', highlights: ['inertia'], size: 42, media: {src: 'optout/b25_automation.jpg', type: 'img', effect: 'in'}},
  // 26 RED impact
  {dur: 86, kind: 'impact', text: 'It’s not a loophole.|It’s the design.', highlights: ['design'], redBg: true},
  // 27
  {dur: 115, kind: 'text', reveal: [2, 50], text: 'The question isn’t|whether it’s a tax.', highlights: ['tax.'], size: 42, media: {src: 'optout/b27_taxquestion.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 45, kind: 'text', reveal: [0, 0], text: 'It’s whether you’ll|remember to say no.', highlights: ['no.'], size: 44, media: {src: 'optout/b28_nobox.jpg', type: 'img', effect: 'in'}},
  // 29 CTA
  {dur: 68, kind: 'text', reveal: [2, 40], enter: 'zoom', text: 'Would you opt out?|Tell me below.', highlights: ['opt'], size: 44, media: {src: 'optout/b29_signpen.jpg', type: 'img', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 581, src: 'media/sfx_impact.mp3', vol: 0.45},
  {at: 916, src: 'media/sfx_impact.mp3', vol: 0.4},
  {at: 1106, src: 'media/sfx_impact.mp3', vol: 0.45},
  {at: 1224, src: 'media/sfx_whoosh.mp3', vol: 0.35},
  {at: 1409, src: 'media/sfx_impact.mp3', vol: 0.4},
  {at: 1717, src: 'media/sfx_whoosh.mp3', vol: 0.35},
  {at: 1984, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 2511, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 2757, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
            <div key={i} style={{opacity: op, fontFamily: HEAD, fontSize: 96, lineHeight: 0.98, letterSpacing: 0.5, textTransform: 'uppercase'}}>
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
  const barW = stat.bar != null ? interpolate(frame, [6, 40], [0, stat.bar], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeInOut}) : 0;
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', padding: 80}}>
      <div style={{textAlign: 'center'}}>
        {stat.pre ? <div style={{fontFamily: BODY, fontWeight: 700, fontSize: 30, letterSpacing: 6, color: C.ink, textTransform: 'uppercase', marginBottom: 8}}>{stat.pre}</div> : null}
        <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'center'}}>
          {stat.prefix ? <span style={{fontFamily: HEAD, fontSize: 150, color: C.red, lineHeight: 1}}>{stat.prefix}</span> : null}
          <span style={{fontFamily: HEAD, fontSize: 250, color: C.red, lineHeight: 0.85, letterSpacing: 2, textShadow: SH}}>{num}</span>
          {stat.suffix ? <span style={{fontFamily: HEAD, fontSize: 150, color: C.red, lineHeight: 1}}>{stat.suffix}</span> : null}
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
      <div style={{position: 'relative', zIndex: 1, textAlign: 'center', fontFamily: HEAD, fontSize: 150, lineHeight: 0.92, letterSpacing: 1, textTransform: 'uppercase'}}>
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The premium</span>
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
export const OptoutReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('optout/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('optout/music.mp3')}
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
