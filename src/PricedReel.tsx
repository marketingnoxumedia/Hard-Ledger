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
// "Priced out" reel (PricedReel) — fast HOUSING / TECH / ECONOMY news reel, Hard Ledger house VISUAL format.
// TOPIC: AI WEALTH (new millionaires from Anthropic's IPO) is reshaping the SAN FRANCISCO BAY AREA HOUSING market —
// bigger down payments and rising rents are pricing ordinary people out.
// CURIOSITY: the impact isn't just home prices — it's how much buyers put DOWN. CONTEXT: Anthropic's IPO created
// thousands of new millionaires fueling an already-competitive market. EVIDENCE: in SF / San Mateo / Santa Clara the
// typical buyer now puts down 25% (up from ~20-21% before the AI boom). ESCALATION: on a $1.33M home that extra five
// points is $60,000+ more cash. CONSEQUENCES: renters feel it too — October rents +6.3% SF, +6.2% San Jose, while
// national rents barely moved. CONTROVERSY: the AI boom's wealth concentrates with people who can outbid everyone else.
// DEBATE: is AI making cities more prosperous, or pricing ordinary people out of their own neighborhoods?
// NOTE ON VOICE: built from a client-supplied script in the influencer "curiosity-gap" format, NOT the faceless house
// voice — EARLY "follow for more" CTA, CLOSES on a "pricing people out?" debate question.
// Mentions Anthropic's IPO once (adjacent to IpoReel / FadeReel) but the SUBJECT is SF-area HOUSING — new standalone;
// adjacent to MiamiReel ("The Miami boom") but a different city and driver (AI wealth). Own footage under public/priced/.
// Per the saved house preference, captions are <=5-6 words/beat with LARGER on-screen type (Anton 42-52). 34 beats. 5
// stat cards: 25% DOWN, $1.33M HOME, MORE THAN $60,000 IN CASH, +6.3% SF RENT, +6.2% SAN JOSE RENT (the ~20-21% prior
// range and "five points" stay in-caption/spoken). 1 red impact at the CONTROVERSY pivot ("Outbid / everyone else."),
// no black beat. Debate question lands over footage, NOT on the red card.
// FOOTAGE — TOPICAL but STRICTLY BRAND-FREE: showing the CITY is fine (SF skyline / Victorians / Golden Gate / Bay-Area
// homes / suburban streets), but NO realtor-brand FOR-SALE / SOLD signs (Zillow / Redfin / Coldwell / Compass etc.), NO
// readable address / price / agent / brand / screen text, NO Anthropic / Claude logo, NO identifiable face. Generic,
// royalty-free material: SF cityscape & rowhouses, luxury & suburban homes, keys / a model house / moving boxes, cash /
// down-payment stacks / a money-counter, a rising price & rent chart with NO readable ticker, an apartment block, a
// bidding-war / many-hands motif, a blank-screen phone for the FOLLOW CTA, a red card. Mix of short videos + photos.
// OWN footage under public/priced/, NO reuse — ledger-checked.
// **UNVERIFIED — the reel names Anthropic and cites specific, post-cutoff market data (SF/San Mateo/Santa Clara 25%
// down vs ~20-21% prior; a $1.33M typical home; $60,000+ extra cash; October rents +6.3% SF / +6.2% San Jose vs flat
// national; "thousands of new millionaires" from Anthropic's IPO). Anthropic is privately held as of this writer's
// knowledge cutoff (Jan 2026); the IPO and every figure are UNCONFIRMED and post-cutoff. Rendered as written. Every
// figure, the cities, and the attribution MUST be fact-checked against primary reporting before publishing. General
// housing/economy news, NOT investment or real-estate advice; the closing line is the client's engagement prompt.**
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 64, kind: 'hook', reveal: [3, 40], text: 'AI is making people rich.', kicker: 'Priced out', highlights: ['rich.'], size: 50, media: {src: 'priced/pr00_rich.mp4', type: 'video', effect: 'in'}},
  // 1
  {dur: 58, kind: 'text', reveal: [2], text: 'But it’s also making it harder', highlights: ['harder'], size: 42, pos: 'upperRight', media: {src: 'priced/pr01_harder.mp4', type: 'video', effect: 'in'}},
  // 2
  {dur: 73, kind: 'text', reveal: [2, 28], text: 'for ordinary people|to afford a home', highlights: ['afford'], size: 44, pos: 'left', media: {src: 'priced/pr02_afford.mp4', type: 'video', effect: 'in'}},
  // 3
  {dur: 31, kind: 'text', reveal: [2], text: 'in San Francisco.', highlights: ['Francisco.'], size: 52, pos: 'lowerRight', media: {src: 'priced/pr03_sf.mp4', type: 'video', effect: 'in'}},
  // 4
  {dur: 38, kind: 'text', reveal: [2], text: 'And the surprising part?', highlights: ['surprising'], size: 50, pos: 'upperLeft', media: {src: 'priced/pr04_surprising.mp4', type: 'video', effect: 'in'}},
  // 5
  {dur: 98, kind: 'text', reveal: [2, 28], text: 'The impact isn’t just|showing up in home prices.', highlights: ['prices.'], size: 44, pos: 'right', media: {src: 'priced/pr05_prices.mp4', type: 'video', effect: 'in'}},
  // 6
  {dur: 50, kind: 'text', reveal: [2], text: 'It’s changing how much', highlights: ['changing'], size: 50, pos: 'lower', media: {src: 'priced/pr06_changing.mp4', type: 'video', effect: 'in'}},
  // 7
  {dur: 61, kind: 'text', reveal: [2, 28], text: 'buyers are willing|to put down.', highlights: ['down.'], size: 44, pos: 'lowerLeft', media: {src: 'priced/pr07_down.mp4', type: 'video', effect: 'in'}},
  // 8 FOLLOW
  {dur: 86, kind: 'text', reveal: [2], text: 'Follow for more stories|about how technology', highlights: ['follow'], size: 44, pos: 'upperRight', media: {src: 'priced/pr08_follow.mp4', type: 'video', effect: 'in'}},
  // 9
  {dur: 61, kind: 'text', reveal: [2], text: 'is changing our economy.', highlights: ['economy.'], size: 50, pos: 'left', media: {src: 'priced/pr09_economy.mp4', type: 'video', effect: 'in'}},
  // 10
  {dur: 62, kind: 'text', reveal: [2], text: 'Anthropic’s blockbuster IPO', highlights: ['IPO'], size: 52, pos: 'right', media: {src: 'priced/pr10_ipo.mp4', type: 'video', effect: 'in'}},
  // 11
  {dur: 79, kind: 'text', reveal: [2, 28], text: 'has created thousands|of new millionaires,', highlights: ['millionaires,'], size: 44, pos: 'upperLeft', media: {src: 'priced/pr11_millionaires.mp4', type: 'video', effect: 'in'}},
  // 12
  {dur: 99, kind: 'text', reveal: [2, 28], text: 'adding fuel to an already|competitive housing market.', highlights: ['competitive'], size: 44, pos: 'lowerRight', media: {src: 'priced/pr12_competitive.mp4', type: 'video', effect: 'in'}},
  // 13
  {dur: 100, kind: 'text', reveal: [2, 28], text: 'In San Francisco, San Mateo,|and Santa Clara,', highlights: ['Clara,'], size: 44, pos: 'upper', media: {src: 'priced/pr13_cities.mp4', type: 'video', effect: 'in'}},
  // 14
  {dur: 58, kind: 'text', reveal: [2, 28], text: 'the typical homebuyer|now puts down', highlights: ['homebuyer'], size: 44, pos: 'left', media: {src: 'priced/pr14_homebuyer.mp4', type: 'video', effect: 'in'}},
  // 15 CARD
  {dur: 59, kind: 'stat', stat: {value: 25, suffix: '%', post: 'OF THE PURCHASE PRICE'}, media: {src: 'priced/pr15_25pct.mp4', type: 'video', effect: 'in'}},
  // 16
  {dur: 89, kind: 'text', reveal: [2], text: 'up from around', highlights: ['up'], size: 52, pos: 'right', media: {src: 'priced/pr16_upfrom.mp4', type: 'video', effect: 'in'}},
  // 17
  {dur: 49, kind: 'text', reveal: [2], text: 'before the AI boom.', highlights: ['boom.'], size: 50, pos: 'lowerLeft', media: {src: 'priced/pr17_boom.mp4', type: 'video', effect: 'in'}},
  // 18 CARD
  {dur: 61, kind: 'stat', stat: {prefix: '$', value: 1.33, decimals: 2, suffix: 'M', post: 'HOME'}, media: {src: 'priced/pr18_home133.mp4', type: 'video', effect: 'in'}},
  // 19
  {dur: 83, kind: 'text', reveal: [2, 28], text: 'that extra five|percentage points means', highlights: ['five'], size: 44, pos: 'upperRight', media: {src: 'priced/pr19_five.mp4', type: 'video', effect: 'in'}},
  // 20 CARD
  {dur: 86, kind: 'stat', stat: {pre: 'MORE THAN', prefix: '$', value: 60000, post: 'IN CASH'}, media: {src: 'priced/pr20_60k.mp4', type: 'video', effect: 'in'}},
  // 21
  {dur: 50, kind: 'text', reveal: [2], text: 'Renters are feeling it too.', highlights: ['Renters'], size: 46, pos: 'left', media: {src: 'priced/pr21_renters.mp4', type: 'video', effect: 'in'}},
  // 22
  {dur: 42, kind: 'text', reveal: [2], text: 'October rents climbed', highlights: ['climbed'], size: 52, pos: 'lowerRight', media: {src: 'priced/pr22_climbed.mp4', type: 'video', effect: 'in'}},
  // 23 CARD
  {dur: 75, kind: 'stat', stat: {prefix: '+', value: 6.3, decimals: 1, suffix: '%', post: 'SAN FRANCISCO'}, media: {src: 'priced/pr23_sf63.mp4', type: 'video', effect: 'in'}},
  // 24 CARD
  {dur: 67, kind: 'stat', stat: {prefix: '+', value: 6.2, decimals: 1, suffix: '%', post: 'SAN JOSE'}, media: {src: 'priced/pr24_sj62.mp4', type: 'video', effect: 'in'}},
  // 25
  {dur: 63, kind: 'text', reveal: [2, 28], text: 'while national rents|barely moved.', highlights: ['barely'], size: 48, pos: 'upperLeft', media: {src: 'priced/pr25_barely.mp4', type: 'video', effect: 'in'}},
  // 26
  {dur: 83, kind: 'text', reveal: [2, 28], text: 'The AI boom is creating|enormous wealth,', highlights: ['wealth,'], size: 44, pos: 'right', media: {src: 'priced/pr26_wealth.mp4', type: 'video', effect: 'in'}},
  // 27
  {dur: 54, kind: 'text', reveal: [2, 28], text: 'but that wealth|is concentrating', highlights: ['concentrating'], size: 48, pos: 'lower', media: {src: 'priced/pr27_concentrating.mp4', type: 'video', effect: 'in'}},
  // 28
  {dur: 61, kind: 'text', reveal: [2, 28], text: 'in the hands of people|who can afford to', highlights: ['afford'], size: 44, pos: 'upperRight', media: {src: 'priced/pr28_hands.mp4', type: 'video', effect: 'in'}},
  // 29 RED
  {dur: 61, kind: 'impact', redBg: true, text: 'Outbid|everyone else.'},
  // 30
  {dur: 61, kind: 'text', reveal: [2], text: 'So is AI making cities', highlights: ['AI'], size: 46, pos: 'lowerLeft', media: {src: 'priced/pr30_prosperous.mp4', type: 'video', effect: 'in'}},
  // 31
  {dur: 73, kind: 'text', reveal: [2, 28], text: 'like San Francisco|more prosperous,', highlights: ['prosperous,'], size: 48, pos: 'left', media: {src: 'priced/pr31_sfpros.mp4', type: 'video', effect: 'in'}},
  // 32
  {dur: 71, kind: 'text', reveal: [2, 28], text: 'or is it pricing|ordinary people out', highlights: ['pricing'], size: 44, pos: 'right', media: {src: 'priced/pr32_pricing.mp4', type: 'video', effect: 'in'}},
  // 33 CTA
  {dur: 41, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'of their own neighborhoods?', highlights: ['neighborhoods?'], size: 52, media: {src: 'priced/pr33_neighborhoods.mp4', type: 'video', effect: 'in'}},
];


type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 1018, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1215, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1359, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1537, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1612, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1940, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 2206, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>Priced out</span>
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
export const PricedReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('priced/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('priced/music.mp3')}
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
