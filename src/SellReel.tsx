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
// "The payout" reel (SellReel) — Hard Ledger house VISUAL format, housing / personal-finance news topic.
// TOPIC: the HIDDEN COST of selling a home. Per research by Clever Real Estate, US homeowners who sold in the past
// three years spent an average of nearly $82,000 on the whole selling process — 22% more than the prior year. Where it
// goes: repairs & renovations ~$27,649, agent commissions ~$27,448, closing costs >$11,000, buyer concessions ~$10,000,
// plus moving/marketing/staging. Sellers expected to spend under $27,000 — actual costs ran 3x higher. With mortgage
// rates keeping buyers cautious, sellers give more concessions; nearly 39% said costs cut their profit more than
// expected. And even after commission reforms, many sellers still pay both agents' fees. Debate: still sell, or wait?
// NOTE ON VOICE: built VERBATIM from a client-supplied script in the influencer "curiosity-gap" format (HOOK / CURIOSITY
// GAP / EARLY CTA / CONTEXT / EVIDENCE / ESCALATION / CONSEQUENCES / CONTROVERSY / AUDIENCE DEBATE), NOT the faceless
// house voice — it names one source (Clever Real Estate), uses an EARLY "follow for more" CTA, and CLOSES on a "let me
// know in the comments" debate CTA. Per the saved house preference, captions are <=5-6 words/beat with LARGER on-screen
// type (Anton 42-52). 47 beats. 4 stat cards: NEARLY / $82,000 / TO SELL; $27,649 (repairs); $27,448 (commissions);
// 39% (said costs cut profit). 1 red impact at the ESCALATION pivot ("But here's the / problem." — the expectation gap;
// reel closes on the comments-CTA media beat), no black beat. Captions match the VO verbatim (the inline 22% / $11,000 /
// $10,000 / $27,000 / $80,000 read as spoken). Durations/reveals/SFX locked to the VO via a scribe_v1 word-timestamp
// anchor pass (public/sell/voiceover.mp3). Built at the house +10% pacing default; its own warm, slightly tense
// personal-finance music mixed at 0.2. OWN distinct footage under public/sell/ (46 stills), NO reuse of any other
// reel's clips — ledger-checked.
// FOOTAGE is strictly BRAND-FREE and GENERIC — NO Clever Real Estate / Zillow / Redfin / Realtor.com / RE-MAX / brokerage
// logo or branded "for sale" / "sold" sign, NO identifiable house address / number / realtor face / nameplate, NO
// readable listing paperwork / contract text / currency notes, NO national flag, NO identifiable landmark, NO brand
// phone (blank screens only). Metaphor-led housing / money b-roll only: generic suburban houses and keys and a blank
// yard sign, moving boxes and a moving truck, renovation tools and paint and ladders, an empty staged interior, a
// calculator and coins and a piggy bank and a scale for the money, contract/clipboard with no readable text and a pen
// for closing, a downward chart and a cautious-buyer / handshake motif, a door and a SOLD-free sign swap. **UNVERIFIED —
// states specific, checkable but evolving figures (the ~$82,000 average and its breakdown; 22% YoY; the ~39% share),
// attributed to Clever Real Estate in the script. Rendered VERBATIM as supplied, but every figure MUST be fact-checked
// against the original research before publishing. This is general information, not financial advice.**
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 100, kind: 'hook', reveal: [3, 40], text: 'Think selling your house means|collecting a huge profit?', kicker: 'The payout', highlights: ['profit?'], size: 48, media: {src: 'sell/sl00_house.jpg', type: 'img', effect: 'in'}},
  // 1
  {dur: 26, kind: 'text', reveal: [2], text: 'Think again.', highlights: ['again.'], size: 52, pos: 'upperRight', media: {src: 'sell/sl01_again.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 59, kind: 'text', reveal: [2], text: 'American homeowners are spending', highlights: [], size: 50, pos: 'left', media: {src: 'sell/sl02_homeowners.jpg', type: 'img', effect: 'in'}},
  // 3 CARD
  {dur: 43, kind: 'stat', stat: {pre: 'NEARLY', prefix: '$', value: 82000, post: 'TO SELL'}, media: {src: 'sell/sl03_card82k.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 43, kind: 'text', reveal: [2], text: 'just to sell their homes.', highlights: ['homes.'], size: 46, pos: 'lowerRight', media: {src: 'sell/sl04_forsale.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 44, kind: 'text', reveal: [2], text: 'And the biggest expense', highlights: ['biggest'], size: 50, pos: 'upperLeft', media: {src: 'sell/sl05_expense.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 60, kind: 'text', reveal: [2], text: 'isn’t what most people expect.', highlights: [], size: 46, pos: 'right', media: {src: 'sell/sl06_expect.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 26, kind: 'text', reveal: [2], text: 'It’s not even', highlights: [], size: 52, pos: 'lower', media: {src: 'sell/sl07_noteven.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 60, kind: 'text', reveal: [2, 28], text: 'the real estate|agent’s commission.', highlights: ['commission.'], size: 48, pos: 'upperLeft', media: {src: 'sell/sl08_commission.jpg', type: 'img', effect: 'in'}},
  // 9 FOLLOW
  {dur: 44, kind: 'text', reveal: [2], text: 'Follow for more stories', highlights: ['follow'], size: 50, pos: 'upperRight', media: {src: 'sell/sl09_follow.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 81, kind: 'text', reveal: [2, 28], text: 'about money, housing,|and the economy.', highlights: ['economy.'], size: 44, pos: 'lowerLeft', media: {src: 'sell/sl10_economy.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 45, kind: 'text', reveal: [2], text: 'According to new research', highlights: [], size: 50, pos: 'right', media: {src: 'sell/sl11_research.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 40, kind: 'text', reveal: [2], text: 'by Clever Real Estate,', highlights: [], size: 50, pos: 'left', media: {src: 'sell/sl12_clever.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 84, kind: 'text', reveal: [2, 28], text: 'homeowners who sold|within the past three years', highlights: [], size: 44, pos: 'lowerRight', media: {src: 'sell/sl13_sold.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 95, kind: 'text', reveal: [2, 28], text: 'spent an average of|nearly $82,000', highlights: ['$82,000'], size: 44, pos: 'upper', media: {src: 'sell/sl14_avg82k.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 125, kind: 'text', reveal: [2], text: 'on the entire selling process.', highlights: ['process.'], size: 46, pos: 'left', media: {src: 'sell/sl15_process.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 44, kind: 'text', reveal: [2, 28], text: 'That’s 22% more|than the previous year’s figure.', highlights: ['22%'], size: 44, pos: 'right', media: {src: 'sell/sl16_22pct.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 29, kind: 'text', reveal: [2], text: 'Here’s where the money goes.', highlights: ['money'], size: 46, pos: 'lowerLeft', media: {src: 'sell/sl17_moneygoes.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 64, kind: 'text', reveal: [2, 28], text: 'Repairs and renovations|cost an average of', highlights: [], size: 44, pos: 'upperRight', media: {src: 'sell/sl18_repairs.jpg', type: 'img', effect: 'in'}},
  // 19 CARD
  {dur: 78, kind: 'stat', stat: {prefix: '$', value: 27649}, media: {src: 'sell/sl19_card27649.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 43, kind: 'text', reveal: [2], text: 'Agent commissions add another', highlights: [], size: 50, pos: 'left', media: {src: 'sell/sl20_commissions2.jpg', type: 'img', effect: 'in'}},
  // 21 CARD
  {dur: 74, kind: 'stat', stat: {prefix: '$', value: 27448}, media: {src: 'sell/sl21_card27448.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 78, kind: 'text', reveal: [2, 28], text: 'Closing costs average|over $11,000,', highlights: ['$11,000,'], size: 48, pos: 'lowerRight', media: {src: 'sell/sl22_closing.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 92, kind: 'text', reveal: [2, 28], text: 'while buyer concessions|can add nearly $10,000.', highlights: ['$10,000.'], size: 44, pos: 'upperLeft', media: {src: 'sell/sl23_concessions.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 64, kind: 'text', reveal: [2], text: 'Moving, marketing, and staging', highlights: [], size: 50, pos: 'right', media: {src: 'sell/sl24_staging.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 47, kind: 'text', reveal: [2], text: 'push the total even higher.', highlights: ['higher.'], size: 46, pos: 'lower', media: {src: 'sell/sl25_higher.jpg', type: 'img', effect: 'in'}},
  // 26 RED
  {dur: 28, kind: 'impact', redBg: true, text: 'But here’s the|problem.'},
  // 27
  {dur: 140, kind: 'text', reveal: [2, 28], text: 'Sellers expected to spend|less than $27,000.', highlights: ['$27,000.'], size: 44, pos: 'upperRight', media: {src: 'sell/sl27_expected.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 95, kind: 'text', reveal: [2, 28], text: 'Their actual expenses were|more than three times', highlights: ['three'], size: 44, pos: 'lowerLeft', media: {src: 'sell/sl28_threetimes.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 26, kind: 'text', reveal: [2], text: 'that amount.', highlights: ['amount.'], size: 52, pos: 'left', media: {src: 'sell/sl29_amount.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 87, kind: 'text', reveal: [2, 28], text: 'And with mortgage rates|keeping buyers cautious,', highlights: ['cautious,'], size: 44, pos: 'right', media: {src: 'sell/sl30_rates.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 69, kind: 'text', reveal: [2, 28], text: 'sellers are offering|more concessions', highlights: ['concessions'], size: 48, pos: 'lowerRight', media: {src: 'sell/sl31_offering.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'and competing harder|to close deals.', highlights: ['harder'], size: 44, pos: 'upperLeft', media: {src: 'sell/sl32_compete.jpg', type: 'img', effect: 'in'}},
  // 33
  {dur: 26, kind: 'text', reveal: [2], text: 'Nearly', highlights: [], size: 52, pos: 'right', media: {src: 'sell/sl33_nearly.jpg', type: 'img', effect: 'in'}},
  // 34 CARD
  {dur: 50, kind: 'stat', stat: {value: 39, suffix: '%'}, media: {src: 'sell/sl34_card39.jpg', type: 'img', effect: 'in'}},
  // 35
  {dur: 84, kind: 'text', reveal: [2, 28], text: 'said selling costs|reduced their profits', highlights: ['reduced'], size: 44, pos: 'upperRight', media: {src: 'sell/sl35_reduced.jpg', type: 'img', effect: 'in'}},
  // 36
  {dur: 37, kind: 'text', reveal: [2], text: 'more than expected.', highlights: ['expected.'], size: 52, pos: 'left', media: {src: 'sell/sl36_expected2.jpg', type: 'img', effect: 'in'}},
  // 37
  {dur: 43, kind: 'text', reveal: [2], text: 'Even after changes intended', highlights: [], size: 50, pos: 'lowerLeft', media: {src: 'sell/sl37_changes.jpg', type: 'img', effect: 'in'}},
  // 38
  {dur: 81, kind: 'text', reveal: [2, 28], text: 'to make real estate commissions|more competitive,', highlights: ['competitive,'], size: 44, pos: 'upper', media: {src: 'sell/sl38_competitive.jpg', type: 'img', effect: 'in'}},
  // 39
  {dur: 95, kind: 'text', reveal: [2, 28], text: 'many sellers still pay|both agents’ fees.', highlights: ['both'], size: 44, pos: 'right', media: {src: 'sell/sl39_bothfees.jpg', type: 'img', effect: 'in'}},
  // 40
  {dur: 35, kind: 'text', reveal: [2], text: 'That raises questions', highlights: ['questions'], size: 52, pos: 'lowerRight', media: {src: 'sell/sl40_questions.jpg', type: 'img', effect: 'in'}},
  // 41
  {dur: 126, kind: 'text', reveal: [2, 28], text: 'about how much homeowners|really save from those reforms.', highlights: ['save'], size: 44, pos: 'upperLeft', media: {src: 'sell/sl41_save.jpg', type: 'img', effect: 'in'}},
  // 42
  {dur: 50, kind: 'text', reveal: [2, 28], text: 'So, would you still|sell your house', highlights: [], size: 44, pos: 'left', media: {src: 'sell/sl42_wouldyou.jpg', type: 'img', effect: 'in'}},
  // 43
  {dur: 72, kind: 'text', reveal: [2], text: 'if it meant spending $80,000', highlights: ['$80,000'], size: 46, pos: 'lowerRight', media: {src: 'sell/sl43_80k.jpg', type: 'img', effect: 'in'}},
  // 44
  {dur: 83, kind: 'text', reveal: [2, 28], text: 'before counting your mortgage|payoff and taxes?', highlights: ['taxes?'], size: 44, pos: 'upperRight', media: {src: 'sell/sl44_taxes.jpg', type: 'img', effect: 'in'}},
  // 45
  {dur: 46, kind: 'text', reveal: [2, 28], text: 'Or would you wait|for a better market?', highlights: ['market?'], size: 44, pos: 'right', media: {src: 'sell/sl45_market.jpg', type: 'img', effect: 'in'}},
  // 46 CTA
  {dur: 38, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Let me know|in the comments.', highlights: ['comments'], size: 46, media: {src: 'sell/sl46_comments.jpg', type: 'img', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 185, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1112, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1233, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1588, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 2129, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 2931, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The payout</span>
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
export const SellReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('sell/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('sell/music.mp3')}
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
