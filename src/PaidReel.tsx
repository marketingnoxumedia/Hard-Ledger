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
// "Paid off" reel (PaidReel) — fast REAL-ESTATE / HOUSING news reel, Hard Ledger house VISUAL format.
// TOPIC: a GROWING SHARE of US homeowners own their homes free and clear. While many Americans struggle to afford a home,
// more than 4 in 10 homeowners no longer have a mortgage payment — and the trend could reshape housing supply. CONTEXT:
// per a new Realtor.com analysis of US Census Bureau data, 41% of owner-occupied homes were mortgage-free in 2025, up from
// 32.8% in 2010. EVIDENCE: West Virginia leads at 56.6% owned outright, Mississippi 52.7%, New Mexico 50%; Washington, DC
// is lowest at 26.5%. ESCALATION: mortgage-free owners are less exposed to rising rates and can sell/downsize/buy without
// giving up a cheap loan. CONSEQUENCES: that flexibility could add supply — while owners locked into low-rate loans may
// refuse to sell (the "lock-in" effect). CONTROVERSY: owning outright isn't living for free — property taxes, insurance,
// utilities and maintenance still cost money, and in expensive markets paying a home off stays out of reach for many.
// DEBATE: if your mortgage vanished, would you stay or sell and buy?
// NOTE ON VOICE: built VERBATIM from a client-supplied script in the influencer "curiosity-gap" format, NOT the faceless
// house voice — it uses an EARLY "follow for more" CTA and CLOSES on a debate question + "Let us know.".
// Per the saved house preference, captions are <=5-6 words/beat with LARGER on-screen type (Anton 42-52). 49 beats. 3 stat
// cards: 41% MORTGAGE-FREE IN 2025, 32.8% IN 2010, 56.6% WEST VIRGINIA (the other state figures — 52.7% / 50% / 26.5% —
// stay in-caption). 1 red impact at the CONTROVERSY pivot ("Not / free."), no black beat. Captions match the VO verbatim
// (Realtor.com / Census / the state names stay in-caption). Durations/reveals/SFX locked to the VO via a scribe_v1
// word-timestamp anchor pass (public/paid/voiceover.mp3). Built at the house +10% pacing default; its own warm
// real-estate-news music mixed at 0.2. OWN distinct footage under public/paid/ (48 stills), NO reuse — ledger-checked.
// FOOTAGE is strictly BRAND-FREE and FACE-FREE — NO "For Sale" / "SOLD" / address / price / street sign text, NO Realtor.com
// / Zillow / Redfin / bank logo, NO state map with labels, NO national flag or government seal, NO identifiable landmark, NO
// identifiable real face (all human figures are silhouettes / backs / hands), NO readable document / screen / calculator
// text, NO identifiable currency. Metaphor-led housing / home-ownership b-roll only: suburban homes / rooftops / aerials for
// the market, a key in a hand / in a lock for ownership, a model house cradled in hands for owning outright, a broken chain
// / golden padlock for the rate lock-in, rolling hills / a porch / an adobe home for the leading states, dense rowhouses /
// an apartment block for DC and the low-share end, moving boxes for downsizing, coins beside a model house (no
// denomination) / repair tools for the ongoing costs, a steep climb for the difficult goal, a glowing question mark / two
// doors for the debate close, a blank-screen phone for the FOLLOW CTA, a red beat for the red card.
// **UNVERIFIED — cites specific, checkable figures attributed to a Realtor.com analysis of US Census Bureau data: 41% of
// owner-occupied homes mortgage-free in 2025 (up from 32.8% in 2010), West Virginia 56.6%, Mississippi 52.7%, New Mexico
// 50%, Washington DC 26.5%. Rendered VERBATIM as supplied. Every figure, the year-over-year comparison, the state rankings
// and the Realtor.com/Census attribution MUST be fact-checked against the primary Realtor.com report and Census data before
// publishing. This is general real-estate information, NOT financial advice; the closing line is the client's engagement
// prompt.**
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 70, kind: 'hook', reveal: [3, 40], text: 'While millions are struggling|to afford a home,', kicker: 'Paid off', highlights: ['struggling'], size: 48, media: {src: 'paid/pd00_struggling.jpg', type: 'img', effect: 'in'}},
  // 1
  {dur: 70, kind: 'text', reveal: [2], text: 'a growing number of homeowners', highlights: ['homeowners'], size: 46, pos: 'upperRight', media: {src: 'paid/pd01_homeowners.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 70, kind: 'text', reveal: [2], text: 'have already paid theirs off.', highlights: ['paid'], size: 46, pos: 'left', media: {src: 'paid/pd02_paid.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 70, kind: 'text', reveal: [2], text: 'And the latest data reveals', highlights: ['data'], size: 46, pos: 'lowerRight', media: {src: 'paid/pd03_data.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'just how big|that group has become.', highlights: ['big'], size: 44, pos: 'upperLeft', media: {src: 'paid/pd04_big.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'We’re talking about|more than 4 in 10', highlights: ['10'], size: 44, pos: 'right', media: {src: 'paid/pd05_fourin10.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'American homeowners who|no longer have', highlights: ['American'], size: 44, pos: 'lower', media: {src: 'paid/pd06_american.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 70, kind: 'text', reveal: [2], text: 'a mortgage payment.', highlights: ['mortgage'], size: 52, pos: 'lowerLeft', media: {src: 'paid/pd07_mortgage.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 70, kind: 'text', reveal: [2], text: 'But this trend could have', highlights: ['trend'], size: 46, pos: 'upperRight', media: {src: 'paid/pd08_trend.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'a major impact|on the housing market.', highlights: ['housing'], size: 44, pos: 'left', media: {src: 'paid/pd09_housing.jpg', type: 'img', effect: 'in'}},
  // 10 FOLLOW
  {dur: 70, kind: 'text', reveal: [2], text: 'Follow for more real estate|and financial news.', highlights: ['follow'], size: 44, pos: 'right', media: {src: 'paid/pd10_follow.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'According to a new|Realtor.com analysis', highlights: ['Realtor.com'], size: 44, pos: 'upperLeft', media: {src: 'paid/pd11_realtor.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 70, kind: 'text', reveal: [2], text: 'of US Census Bureau data,', highlights: ['Census'], size: 46, pos: 'lowerRight', media: {src: 'paid/pd12_census.jpg', type: 'img', effect: 'in'}},
  // 13 CARD
  {dur: 70, kind: 'stat', stat: {value: 41, suffix: '%', post: 'MORTGAGE-FREE IN 2025'}, media: {src: 'paid/pd13_card41.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'of owner-occupied homes|were mortgage-free in 2025.', highlights: ['mortgage-free'], size: 44, pos: 'upper', media: {src: 'paid/pd14_owneroccupied.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 70, kind: 'text', reveal: [2], text: 'That’s up from just', highlights: ['up'], size: 50, pos: 'left', media: {src: 'paid/pd15_upfrom.jpg', type: 'img', effect: 'in'}},
  // 16 CARD
  {dur: 70, kind: 'stat', stat: {value: 32.8, decimals: 1, suffix: '%', post: 'IN 2010'}, media: {src: 'paid/pd16_card328.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'West Virginia|leads the country,', highlights: ['leads'], size: 48, pos: 'right', media: {src: 'paid/pd17_westvirginia.jpg', type: 'img', effect: 'in'}},
  // 18 CARD
  {dur: 70, kind: 'stat', stat: {value: 56.6, decimals: 1, suffix: '%', post: 'WEST VIRGINIA'}, media: {src: 'paid/pd18_card566.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'owning their|properties outright.', highlights: ['outright.'], size: 50, pos: 'lowerLeft', media: {src: 'paid/pd19_outright.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 70, kind: 'text', reveal: [2], text: 'Mississippi follows at 52.7%,', highlights: ['52.7%'], size: 50, pos: 'upperRight', media: {src: 'paid/pd20_mississippi.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 70, kind: 'text', reveal: [2], text: 'while New Mexico reaches 50%.', highlights: ['50%'], size: 46, pos: 'left', media: {src: 'paid/pd21_newmexico.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 70, kind: 'text', reveal: [2], text: 'At the other end,', highlights: ['other'], size: 50, pos: 'lowerRight', media: {src: 'paid/pd22_otherend.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Washington, DC|has the lowest share,', highlights: ['lowest'], size: 44, pos: 'upperLeft', media: {src: 'paid/pd23_dc.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 70, kind: 'text', reveal: [2], text: 'with only 26.5% of homes', highlights: ['26.5%'], size: 46, pos: 'right', media: {src: 'paid/pd24_265.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 70, kind: 'text', reveal: [2], text: 'owned free and clear.', highlights: ['free'], size: 50, pos: 'lower', media: {src: 'paid/pd25_freeclear.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 70, kind: 'text', reveal: [2], text: 'And here’s why this matters.', highlights: ['matters.'], size: 46, pos: 'upperRight', media: {src: 'paid/pd26_matters.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 70, kind: 'text', reveal: [2], text: 'Homeowners without mortgages', highlights: ['without'], size: 52, pos: 'lowerLeft', media: {src: 'paid/pd27_without.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'are less exposed|to rising interest rates.', highlights: ['rates.'], size: 44, pos: 'left', media: {src: 'paid/pd28_rates.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 70, kind: 'text', reveal: [2], text: 'They can sell, downsize,', highlights: ['downsize,'], size: 50, pos: 'right', media: {src: 'paid/pd29_downsize.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 70, kind: 'text', reveal: [2], text: 'or purchase another property', highlights: ['purchase'], size: 50, pos: 'lowerRight', media: {src: 'paid/pd30_purchase.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'without worrying about|giving up a low-rate mortgage.', highlights: ['low-rate'], size: 44, pos: 'upperLeft', media: {src: 'paid/pd31_lowrate.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 70, kind: 'text', reveal: [2], text: 'That flexibility could help', highlights: ['flexibility'], size: 50, pos: 'right', media: {src: 'paid/pd32_flexibility.jpg', type: 'img', effect: 'in'}},
  // 33
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'bring more homes|onto the market.', highlights: ['market.'], size: 44, pos: 'upperRight', media: {src: 'paid/pd33_market.jpg', type: 'img', effect: 'in'}},
  // 34
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Meanwhile, homeowners|with existing low-rate loans', highlights: ['existing'], size: 44, pos: 'left', media: {src: 'paid/pd34_existing.jpg', type: 'img', effect: 'in'}},
  // 35
  {dur: 70, kind: 'text', reveal: [2], text: 'may refuse to sell', highlights: ['refuse'], size: 50, pos: 'lowerLeft', media: {src: 'paid/pd35_refuse.jpg', type: 'img', effect: 'in'}},
  // 36
  {dur: 70, kind: 'text', reveal: [2], text: 'because replacing their mortgage', highlights: ['replacing'], size: 50, pos: 'upper', media: {src: 'paid/pd36_replacing.jpg', type: 'img', effect: 'in'}},
  // 37
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'could mean taking on|a much more expensive payment.', highlights: ['expensive'], size: 44, pos: 'right', media: {src: 'paid/pd37_expensive.jpg', type: 'img', effect: 'in'}},
  // 38
  {dur: 70, kind: 'text', reveal: [2], text: 'But owning a home outright', highlights: ['outright'], size: 46, pos: 'lowerRight', media: {src: 'paid/pd38_outright2.jpg', type: 'img', effect: 'in'}},
  // 39 RED
  {dur: 70, kind: 'impact', redBg: true, text: 'Not|free.'},
  // 40
  {dur: 70, kind: 'text', reveal: [2], text: 'Property taxes, insurance,', highlights: ['taxes,'], size: 52, pos: 'upperLeft', media: {src: 'paid/pd40_taxes.jpg', type: 'img', effect: 'in'}},
  // 41
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'utilities, and maintenance|still cost money.', highlights: ['maintenance'], size: 44, pos: 'left', media: {src: 'paid/pd41_maintenance.jpg', type: 'img', effect: 'in'}},
  // 42
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'And in expensive|housing markets,', highlights: ['expensive'], size: 48, pos: 'lowerRight', media: {src: 'paid/pd42_expensivemkt.jpg', type: 'img', effect: 'in'}},
  // 43
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'paying off a home|remains a difficult goal', highlights: ['difficult'], size: 44, pos: 'upperRight', media: {src: 'paid/pd43_difficult.jpg', type: 'img', effect: 'in'}},
  // 44
  {dur: 70, kind: 'text', reveal: [2], text: 'for many families.', highlights: ['families.'], size: 52, pos: 'right', media: {src: 'paid/pd44_families.jpg', type: 'img', effect: 'in'}},
  // 45
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'If you could eliminate|your mortgage today,', highlights: ['eliminate'], size: 44, pos: 'lowerLeft', media: {src: 'paid/pd45_eliminate.jpg', type: 'img', effect: 'in'}},
  // 46
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'would you stay in|your current home,', highlights: ['stay'], size: 44, pos: 'left', media: {src: 'paid/pd46_stay.jpg', type: 'img', effect: 'in'}},
  // 47
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'or sell and buy|another property?', highlights: ['sell'], size: 44, pos: 'upperRight', media: {src: 'paid/pd47_sell.jpg', type: 'img', effect: 'in'}},
  // 48 CTA
  {dur: 70, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Let us know.', highlights: ['know.'], size: 54, media: {src: 'paid/pd48_letusknow.jpg', type: 'img', effect: 'in'}},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>Paid off</span>
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
export const PaidReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('paid/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('paid/music.mp3')}
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
