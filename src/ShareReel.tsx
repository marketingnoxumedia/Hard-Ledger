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
// "The share" reel (ShareReel) — fast NEWS reel, Hard Ledger house format.
// TOPIC: Meta beat on revenue but is issuing a new NON-VOTING Class C share (a one-for-one dividend that looks
// like a 2-for-1 split) — a currency it can sell to fund its AI build-out while Mark Zuckerberg keeps control.
// Thesis: the new share "comes with nothing attached" — it can't vote, and that's the whole point. Every Class
// A/B holder gets one Class C share (trading from January 2027); the share count doubles but the votes don't
// move. Those non-voting shares are a currency Meta can sell for tens of billions (AI build-out) without the
// founder giving up a single vote — he keeps control, everyone else gets diluted. The twist: instead of
// objecting, JPMorgan's line is "the sooner the better" — sell before January and clear the overhang; the
// market isn't angry about dilution, it's nervous about waiting for it. Open questions: how much does Meta
// raise (not said)? a California billionaire-tax angle (partly)? does Class C trade at a discount to Class A
// (unknown until January)? Outcome: beat on revenue and EPS, stock down ~2% premarket, one new class / zero
// new votes. Binary close ("Smart way to fund AI without losing the company, or a second share worth less by
// design? Pick a side below."). 10-part structure, NO post-hook pause, mid-reel like+follow ask.
// Card figures: $1.7T / $64.6B / 26% / Jan 2027 / $3.83 / $3.56 / 2%. Captions match the VO verbatim (except
// the number cards; spoken figures as numerals). Durations/reveals/SFX locked to the VO via a scribe_v1
// word-timestamp anchor pass (public/share/voiceover.mp3, NO inserted pause); music mixed at 0.17.
// 47 beats; built at the house +10% pacing default. OWN distinct footage under public/share/, NO reuse of any
// other reel's clips — ledger-checked.
// FOOTAGE is BRAND-FREE, FACE-FREE and LANDMARK-FREE despite naming Meta / Mark Zuckerberg / JPMorgan / Wall
// Street / Class A/B/C: generic markets / voting / control / dilution / AI b-roll. **NO Meta / Facebook /
// Instagram / WhatsApp / JPMorgan or any company logo or wordmark; NO Mark Zuckerberg or any identifiable face;
// NO stock TICKER symbols or readable "META"/share price; NO exchange (NYSE/NASDAQ) signage; NO flags; NO
// identifiable landmarks; NO readable foreign text; NO banknote/coin portraits or identifiable currency; NO
// military.** (Card text naming "META" is editorial overlay, not footage.)
// **UNVERIFIED / SENSITIVE — names a real company, its founder and a named bank; rendered as written but MUST
// be fact-checked before publishing. TWO LIKELY ERRORS flagged: (1) the script says the stock FELL / "down 2%
// premarket," but reporting had META UP ~3% after-hours on these results; (2) "$3.83 against $3.56 expected /
// beat on earnings" — the $3.83 GAAP EPS INCLUDES a ~$9.89B legal charge (ex-charge ~$7.40) and the analyst
// estimate was ~$5.75, so on GAAP it was a MISS and the $3.56 figure looks wrong.** Checks out: non-voting
// Class C effective Jan 2027, one-for-one dividend ("like a 2-for-1 split"), $64.6B revenue +26%, Zuckerberg's
// control preserved via a Founder Alignment Agreement. Still verify: the $1.7T market-cap, the JPMorgan "sooner
// the better" quote, and the California billionaire-tax angle. "worth less by design" is editorial analysis.
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 90, kind: 'hook', reveal: [3, 40], text: 'Meta just beat earnings,|grew ad revenue 26%,', kicker: 'The share', highlights: [], size: 34, media: {src: 'share/sh00_earnings.mp4', type: 'video', effect: 'in'}},
  // 1
  {dur: 90, kind: 'text', reveal: [2], text: 'and the stock fell.', highlights: ['fell.'], size: 48, media: {src: 'share/sh01_down.jpg', type: 'img', effect: 'panL'}},
  // 2
  {dur: 90, kind: 'text', reveal: [2, 40], text: 'Because of a new share|that comes with nothing attached.', highlights: ['nothing'], size: 32, media: {src: 'share/sh02_emptyshare.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 90, kind: 'text', reveal: [2, 28], text: 'If you hold Meta,|you’re about to get', highlights: [], size: 36, media: {src: 'share/sh03_hold.jpg', type: 'img', effect: 'panR'}},
  // 4
  {dur: 90, kind: 'text', reveal: [2, 28], text: 'a second share|for every one you own.', highlights: ['second'], size: 36, media: {src: 'share/sh04_two.jpg', type: 'img', effect: 'in'}},
  // 5 BLACK
  {dur: 90, kind: 'impact', text: 'It looks like a split.|It isn’t.'},
  // 6
  {dur: 90, kind: 'text', reveal: [2, 40], text: 'The new one can’t vote,|and that’s the whole point.', highlights: ['whole point.'], size: 32, media: {src: 'share/sh06_mute.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 90, kind: 'text', reveal: [2, 28], text: 'I’ll show you exactly|what it’s built to do.', highlights: [], size: 34, media: {src: 'share/sh07_mag.jpg', type: 'img', effect: 'panL'}},
  // 8
  {dur: 90, kind: 'text', reveal: [2, 40], text: 'If that’s worth a follow,|you know where the button is.', highlights: ['follow,'], size: 32, media: {src: 'share/sh08_phone.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 90, kind: 'text', reveal: [2, 40], text: 'Now, companies creating|new share classes is nothing new.', highlights: [], size: 30, media: {src: 'share/sh09_classes.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 90, kind: 'text', reveal: [2, 28], enter: 'slideL', text: 'But this one|is different.', highlights: ['different.'], size: 48, media: {src: 'share/sh10_standout.jpg', type: 'img', effect: 'in'}},
  // 11 CARD $1.7T
  {dur: 90, kind: 'stat', stat: {pre: 'META —', prefix: '$', value: 1.7, decimals: 1, suffix: 'T', post: 'COMPANY'}, media: {src: 'share/sh11_tower.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 90, kind: 'text', reveal: [2, 40], text: 'Because nobody on Wall Street|saw it coming.', highlights: [], size: 32, media: {src: 'share/sh12_wallst.jpg', type: 'img', effect: 'panR'}},
  // 13
  {dur: 90, kind: 'text', reveal: [2, 40], text: 'And because it’s arriving|in the same quarter as', highlights: [], size: 32, media: {src: 'share/sh13_quarter.jpg', type: 'img', effect: 'in'}},
  // 14 CARD $64.6B
  {dur: 90, kind: 'stat', stat: {pre: 'AD BUSINESS', prefix: '$', value: 64.6, decimals: 1, suffix: 'B'}, media: {src: 'share/sh14_ads.jpg', type: 'img', effect: 'in'}},
  // 15 CARD 26%
  {dur: 90, kind: 'stat', stat: {pre: 'GROWING', value: 26, suffix: '%'}, media: {src: 'share/sh15_growth.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 90, kind: 'text', reveal: [2], enter: 'slideUp', text: 'Look at the mechanics.', highlights: ['mechanics.'], size: 48, media: {src: 'share/sh16_gears.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 90, kind: 'text', reveal: [2, 40], text: 'Every Class A and Class B holder|gets one Class C share.', highlights: [], size: 30, media: {src: 'share/sh17_everyone.jpg', type: 'img', effect: 'panL'}},
  // 18 CARD 2027
  {dur: 90, kind: 'lines', reveal: [0, 22], text: 'CLASS C TRADES FROM|JANUARY 2027', highlights: ['2027'], media: {src: 'share/sh18_calbg.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 90, kind: 'text', reveal: [2, 28], text: 'Class C has|zero votes.', highlights: ['zero'], size: 44, media: {src: 'share/sh19_zerovote.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 90, kind: 'text', reveal: [2, 28], text: 'So the share count|doubles.', highlights: ['doubles.'], size: 44, media: {src: 'share/sh20_double.jpg', type: 'img', effect: 'panR'}},
  // 21
  {dur: 90, kind: 'text', reveal: [2, 28], text: 'The votes|don’t move.', highlights: ['don’t move.'], size: 46, media: {src: 'share/sh21_novote.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 90, kind: 'text', reveal: [2, 28], text: 'And the problem|doesn’t stop there.', highlights: ['problem'], size: 44, media: {src: 'share/sh22_warning.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 90, kind: 'text', reveal: [2, 28], text: 'Those non-voting shares|are a currency.', highlights: ['currency.'], size: 38, media: {src: 'share/sh23_press.jpg', type: 'img', effect: 'panL'}},
  // 24
  {dur: 90, kind: 'text', reveal: [2, 40], text: 'Meta can sell them for its AI build-out,|tens of billions,', highlights: [], size: 28, media: {src: 'share/sh24_ai.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 90, kind: 'text', reveal: [2, 40], text: 'without Mark Zuckerberg|giving up a single vote.', highlights: ['single vote.'], size: 32, media: {src: 'share/sh25_strings.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 90, kind: 'text', reveal: [2], text: 'He keeps control.', highlights: ['control.'], size: 50, media: {src: 'share/sh26_king.jpg', type: 'img', effect: 'panR'}},
  // 27
  {dur: 90, kind: 'text', reveal: [2, 28], text: 'Everyone else|gets diluted.', highlights: ['diluted.'], size: 44, media: {src: 'share/sh27_dilute.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 90, kind: 'text', reveal: [2, 40], text: 'Normally you’d expect|investors to object.', highlights: [], size: 34, media: {src: 'share/sh28_object.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 90, kind: 'text', reveal: [2, 40], text: 'Instead, JPMorgan’s line is|“the sooner the better.”', highlights: ['sooner'], size: 30, media: {src: 'share/sh29_clock.jpg', type: 'img', effect: 'panL'}},
  // 30
  {dur: 90, kind: 'text', reveal: [2, 40], text: 'They want Meta to sell the stock fast,|before January,', highlights: ['fast,'], size: 30, media: {src: 'share/sh30_fast.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 90, kind: 'text', reveal: [2, 28], text: 'and get the overhang|out of the way.', highlights: ['overhang'], size: 36, media: {src: 'share/sh31_overhang.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 90, kind: 'text', reveal: [2, 28], text: 'The market isn’t angry|about dilution.', highlights: [], size: 36, media: {src: 'share/sh32_calm.jpg', type: 'img', effect: 'panR'}},
  // 33
  {dur: 90, kind: 'text', reveal: [2, 28], text: 'It’s nervous|about waiting for it.', highlights: ['waiting'], size: 40, media: {src: 'share/sh33_waiting.jpg', type: 'img', effect: 'in'}},
  // 34
  {dur: 90, kind: 'text', reveal: [2, 40], text: 'How much does Meta raise?|Not said.', highlights: ['Not said.'], size: 36, media: {src: 'share/sh34_howmuch.jpg', type: 'img', effect: 'in'}},
  // 35
  {dur: 90, kind: 'text', reveal: [2, 40], text: 'Is there a California|billionaire tax angle?', highlights: [], size: 34, media: {src: 'share/sh35_tax.jpg', type: 'img', effect: 'panL'}},
  // 36
  {dur: 90, kind: 'text', reveal: [2, 28], text: 'The reporting says|partly, yes.', highlights: ['partly,'], size: 40, media: {src: 'share/sh36_news.jpg', type: 'img', effect: 'in'}},
  // 37
  {dur: 90, kind: 'text', reveal: [2, 40], text: 'Does Class C trade at|a discount to Class A?', highlights: ['discount'], size: 32, media: {src: 'share/sh37_discount.jpg', type: 'img', effect: 'panR'}},
  // 38
  {dur: 90, kind: 'text', reveal: [2, 28], text: 'Nobody knows|until January.', highlights: [], size: 42, media: {src: 'share/sh38_fog.jpg', type: 'img', effect: 'in'}},
  // 39
  {dur: 90, kind: 'text', reveal: [2], text: 'Beat on revenue.', highlights: ['Beat'], size: 48, media: {src: 'share/sh39_beatrev.jpg', type: 'img', effect: 'in'}},
  // 40 CARD $3.83
  {dur: 90, kind: 'stat', stat: {pre: 'EARNINGS PER SHARE', prefix: '$', value: 3.83, decimals: 2}, media: {src: 'share/sh40_eps.jpg', type: 'img', effect: 'panL'}},
  // 41 CARD $3.56
  {dur: 90, kind: 'stat', stat: {pre: 'AGAINST', prefix: '$', value: 3.56, decimals: 2, post: 'EXPECTED'}, media: {src: 'share/sh41_expected.jpg', type: 'img', effect: 'in'}},
  // 42 CARD 2%
  {dur: 90, kind: 'stat', stat: {pre: 'STOCK DOWN', value: 2, suffix: '%', post: 'PREMARKET'}, media: {src: 'share/sh42_downcard.jpg', type: 'img', effect: 'in'}},
  // 43 BLACK
  {dur: 90, kind: 'impact', text: 'One new share class,|zero new votes.'},
  // 44
  {dur: 90, kind: 'text', reveal: [2], text: 'So you tell me.', highlights: ['you'], size: 50, media: {src: 'share/sh44_point.jpg', type: 'img', effect: 'in'}},
  // 45 RED
  {dur: 90, kind: 'impact', redBg: true, text: 'Smart way to fund AI|without losing the company,|or a second share worth less by design?'},
  // 46 CTA
  {dur: 90, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Pick a side|below.', highlights: ['side'], size: 48, media: {src: 'share/sh46_fork.mp4', type: 'video', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The share</span>
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
export const ShareReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('share/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('share/music.mp3')}
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
