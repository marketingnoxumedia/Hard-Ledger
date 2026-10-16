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
// "The account" reel (AccountReel) — fast NEWS reel, Hard Ledger house format.
// TOPIC: why Pepsi bought KFC in 1986 — and why it just lost the fountain account it bought the chain for.
// Thesis: KFC is dropping Pepsi for Coca-Cola across ~3,718 US restaurants (rollout Jan, done spring 2027),
// ending a 40-year tie. In 1986 KFC was Coke's #2 US fountain account (behind McDonald's); Pepsi's answer
// was to BUY the company (it owned KFC, Pizza Hut, Taco Bell; spun them off in 1997 but kept the soda).
// Pepsi has also lost Marriott and Costco food courts while Coke added Culver's, Arby's, Panda Express;
// Pepsi's CEO admits it has fallen behind in soft drinks. The mechanic: a fountain drink costs pennies and
// sells for dollars — the highest-margin menu item — so Coke/Pepsi don't just sell syrup, they PAY for the
// account (marketing, equipment, rebates). Payoff: you can buy loyalty once, but keeping it is a payment
// every contract cycle — and this time Pepsi lost the auction. Full QUESTION/STORY/ANSWER/CTA with a ~1.1s
// post-hook pause; close is the CTA as the house rhetorical question ("Do you even notice which cola your
// fast food serves?"). 35 beats: 29 media (incl. 3 cards: 3,718 RESTAURANTS / PEPSI OUT, COKE IN / JAN
// 2027; 1986 / PEPSI BUYS KFC / COKE'S #2, GONE; PEPSI LOST: KFC-MARRIOTT-COSTCO / COKE WON: ARBY'S) / 1
// red impact ("And this time, Pepsi lost the auction.") mid-tail / 2 black. Captions match the VO verbatim
// (except the stylized number cards). Durations / reveals / SFX locked to the VO via a scribe_v1 word-
// timestamp anchor pass (public/account/voiceover.mp3, ~106s incl. the post-hook pause).
// NB: OWN distinct footage under public/account/, NO reuse of any other reel's clips.
// FOOTAGE is strictly BRAND-FREE and FACE-FREE — this names many brands, so every asset is generic:
// unbranded fountain dispensers / cups / cola, plain fried chicken (NO bucket/branding), generic diners,
// drive-thrus, food courts, money, contracts, syrup lines, straws. NO logos/wordmarks of ANY brand (esp.
// Pepsi / Coca-Cola / Coke / KFC / McDonald's / Marriott / Costco / Culver's / Arby's / Panda Express /
// Pizza Hut / Taco Bell), NO readable cups/signage, NO identifiable faces, NO foreign-language text, NO
// banknote portrait faces.
// **UNVERIFIED — names real companies and asserts specific facts; render as written but FACT-CHECK before
// publishing:** KFC dropping Pepsi for Coca-Cola across ~3,718 US restaurants (rollout Jan, done spring
// 2027); the 40-year tie; 1986 purchase and KFC being Coke's #2 fountain account behind McDonald's; the
// 1997 spin-off; Pepsi losing Marriott/Costco and Coke adding Culver's/Arby's/Panda Express; the Pepsi-CEO
// admission; the "optical straw" analyst line. The "lost the auction / buy loyalty once" framing is
// editorial analysis.
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK (held through ~1.1s post-hook pause)
  {dur: 268, kind: 'hook', reveal: [3, 90, 175], text: 'Why did Pepsi buy a|fried-chicken chain in 1986 —|then lose what it bought it for?', kicker: 'The account', highlights: ['1986'], size: 34, media: {src: 'account/a00_fountain.mp4', type: 'video', effect: 'in'}},
  // 1
  {dur: 49, kind: 'text', reveal: [2], text: 'Thursday.', highlights: [], size: 58, media: {src: 'account/a01_calendar.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 83, kind: 'text', reveal: [2, 42], text: 'KFC announced it’s dropping|Pepsi for Coca-Cola.', highlights: ['Coca-Cola.'], size: 38, media: {src: 'account/a02_chicken.jpg', type: 'img', effect: 'in'}},
  // 3 CARD 1
  {dur: 79, kind: 'lines', reveal: [0, 30, 52], text: '3,718 RESTAURANTS|PEPSI OUT, COKE IN|JAN 2027', highlights: ['coke'], media: {src: 'account/a03_diningroom.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 127, kind: 'text', reveal: [2, 64], text: 'The rollout starts in January,|done by spring 2027.', highlights: ['January,'], size: 38, media: {src: 'account/a04_calendar2.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 75, kind: 'text', reveal: [2, 40], text: 'The partnership|lasted forty years.', highlights: ['forty'], size: 44, media: {src: 'account/a05_handshake.jpg', type: 'img', effect: 'in'}},
  // 6 BLACK
  {dur: 65, kind: 'text', reveal: [0, 0], text: 'But nobody tells you|this part.', highlights: ['part.'], size: 48},
  // 7
  {dur: 145, kind: 'text', reveal: [2, 74], text: 'In 1986, KFC was Coca-Cola’s|second-biggest fountain account', highlights: ['second-biggest'], size: 34, media: {src: 'account/a07_retrodiner.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 64, kind: 'text', reveal: [2, 32], text: 'in America,|behind only McDonald’s.', highlights: ['McDonald’s.'], size: 40, media: {src: 'account/a08_counter.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 53, kind: 'text', reveal: [2, 28], text: 'Pepsi’s answer wasn’t|a better deal.', highlights: ['deal.'], size: 42, media: {src: 'account/a09_documents.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 41, kind: 'text', reveal: [2, 20], enter: 'slideL', text: 'It bought|the company.', highlights: ['bought'], size: 48, media: {src: 'account/a10_acquire.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 105, kind: 'text', reveal: [2, 54], text: 'Pepsi owned KFC, Pizza Hut|and Taco Bell outright.', highlights: ['outright.'], size: 36, media: {src: 'account/a11_foodcourt.jpg', type: 'img', effect: 'in'}},
  // 12 CARD 2
  {dur: 70, kind: 'lines', reveal: [0, 28, 50], text: '1986:|PEPSI BUYS KFC|COKE’S #2, GONE', highlights: ['kfc'], media: {src: 'account/a12_retro.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 32, kind: 'text', reveal: [2, 16], text: 'But the|soda stayed.', highlights: ['stayed.'], size: 48, media: {src: 'account/a13_cola.mp4', type: 'video', effect: 'in'}},
  // 14
  {dur: 68, kind: 'text', reveal: [2, 34], text: 'Thirty years of loyalty|to a former parent.', highlights: ['loyalty'], size: 40, media: {src: 'account/a14_years.jpg', type: 'img', effect: 'in'}},
  // 15 BLACK
  {dur: 75, kind: 'text', reveal: [0, 0], text: 'But that’s not even|the craziest part.', highlights: ['craziest'], size: 48},
  // 16
  {dur: 103, kind: 'text', reveal: [2, 52], text: 'Pepsi has also lost Marriott|and Costco’s food courts.', highlights: ['lost'], size: 34, media: {src: 'account/a16_hotel.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 112, kind: 'text', reveal: [2, 58], text: 'Coke has picked up Culver’s,|Arby’s and Panda Express.', highlights: ['Coke'], size: 34, media: {src: 'account/a17_drivethru.jpg', type: 'img', effect: 'in'}},
  // 18 CARD 3
  {dur: 122, kind: 'lines', reveal: [0, 30, 52], text: 'PEPSI LOST: KFC|MARRIOTT, COSTCO|COKE WON: ARBY’S', highlights: ['lost:'], media: {src: 'account/a18_scoreboard.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 141, kind: 'text', reveal: [2, 50, 98], text: 'One analyst called KFC|the optical straw that|breaks the camel’s back.', highlights: ['straw'], size: 36, media: {src: 'account/a19_straw.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 65, kind: 'text', reveal: [2, 34], text: 'Here’s exactly|how they do it.', highlights: ['exactly'], size: 46, media: {src: 'account/a20_pour.mp4', type: 'video', effect: 'in'}},
  // 21
  {dur: 116, kind: 'text', reveal: [2, 58], text: 'A fountain drink costs the restaurant|pennies, and sells for dollars.', highlights: ['dollars.'], size: 32, media: {src: 'account/a21_sodagun.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 97, kind: 'text', reveal: [2, 50], text: 'It’s the highest-margin|item on the menu.', highlights: ['highest-margin'], size: 40, media: {src: 'account/a22_coins.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 44, kind: 'text', reveal: [2, 22], text: 'So Coke and Pepsi|don’t just sell syrup.', highlights: ['syrup.'], size: 40, media: {src: 'account/a23_syrup.mp4', type: 'video', effect: 'in'}},
  // 24
  {dur: 111, kind: 'text', reveal: [2, 56], text: 'They pay for the account:|marketing money, equipment, rebates.', highlights: ['account:'], size: 30, media: {src: 'account/a24_machine.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 93, kind: 'text', reveal: [2, 48], text: 'KFC is losing traffic, and calls|this part of its comeback.', highlights: ['comeback.'], size: 32, media: {src: 'account/a25_emptybooth.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 88, kind: 'text', reveal: [2, 44], text: 'Translation: Coke made|the better offer,', highlights: ['better'], size: 38, media: {src: 'account/a26_contract.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 82, kind: 'text', reveal: [2, 42], text: 'and Pepsi’s name wasn’t|worth the gap any more.', highlights: ['gap'], size: 38, media: {src: 'account/a27_emptycup.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 136, kind: 'text', reveal: [2, 46, 92], enter: 'slideR', text: 'Pepsi spent billions buying|a restaurant chain to take|an account off Coke.', highlights: ['billions'], size: 34, media: {src: 'account/a28_cash.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 67, kind: 'text', reveal: [2, 34], text: 'Forty years later,|the account went back,', highlights: ['back,'], size: 40, media: {src: 'account/a29_uturn.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 90, kind: 'text', reveal: [2, 46], text: 'and Pepsi didn’t even own|the restaurants any more.', highlights: ['more.'], size: 36, media: {src: 'account/a30_forlease.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 37, kind: 'text', reveal: [2, 18], text: 'You can buy|loyalty once.', highlights: ['once.'], size: 46, media: {src: 'account/a31_buy.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 109, kind: 'text', reveal: [2, 56], text: 'Keeping it is a payment|every time the contract comes up.', highlights: ['payment'], size: 32, media: {src: 'account/a32_bills.jpg', type: 'img', effect: 'in'}},
  // 33 RED impact (thesis)
  {dur: 85, kind: 'impact', text: 'And this time,|Pepsi lost the auction.', redBg: true},
  // 34 CTA (question close)
  {dur: 100, kind: 'text', reveal: [2, 52], enter: 'zoom', text: 'Do you even notice which cola|your fast food serves?', highlights: ['cola'], size: 36, media: {src: 'account/a34_choose.mp4', type: 'video', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 268, src: 'media/sfx_whoosh.mp3', vol: 0.35}, // hook -> Thursday
  {at: 401, src: 'media/sfx_impact.mp3', vol: 0.46}, // CARD 1
  {at: 682, src: 'media/sfx_whoosh.mp3', vol: 0.35}, // into black
  {at: 1156, src: 'media/sfx_impact.mp3', vol: 0.46}, // CARD 2
  {at: 1325, src: 'media/sfx_whoosh.mp3', vol: 0.35}, // into black
  {at: 1615, src: 'media/sfx_impact.mp3', vol: 0.46}, // CARD 3
  {at: 2059, src: 'media/sfx_chaching.mp3', vol: 0.4}, // highest-margin
  {at: 3013, src: 'media/sfx_impact.mp3', vol: 0.55}, // red thesis (lost the auction)
  {at: 3098, src: 'media/sfx_whoosh.mp3', vol: 0.4}, // close
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The account</span>
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
export const AccountReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('account/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('account/music.mp3')}
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
