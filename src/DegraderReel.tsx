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
// "The option" reel (DegraderReel) — fast NEWS reel, Hard Ledger house format.
// TOPIC: why Big Pharma is spending ~$28B on PROTEIN DEGRADERS, a drug class with exactly one approval.
// Thesis: degraders DESTROY a target protein instead of just blocking it; the idea is ~25 years old and
// got its first approval (a breast-cancer drug from Arvinas + Pfizer) in May 2026 — one drug. Yet in two
// years pharma signed >$28B of deals (J&J ~$1B cash; Roche ~$700M upfront / up to $3B; AbbVie, Biogen and
// Novo Nordisk each ~$1.5B with the same small company, Neomorph). They're buying PLATFORMS, not molecules
// — small cash now, big milestones later — because ~80% of human proteins are "undruggable" the
// conventional way, and the patent cliff hits by 2030. The payoff framing: $28B is an OPTION on 80% of
// biology; one approval proved the mechanism and every deal since is paying for a seat before the price
// rises. Full QUESTION/STORY/ANSWER/CTA with a ~1.1s post-hook pause; close is the CTA rephrased as the
// house rhetorical question ("Breakthrough, or bubble?"). 36 beats: 33 media (incl. 4 cards: IDEA 2001 /
// APPROVAL 2026 / 1 DRUG; $28B 2 YEARS / J&J $1B · ROCHE $3B / NEOMORPH ×3; PLATFORMS NOT PILLS / SMALL
// CASH NOW / BILLIONS IF IT WORKS; 80% UNDRUGGABLE / PATENT CLIFF 2030) / 1 red impact ("An option on 80%
// of biology.") mid-tail / 2 black. Durations / reveals / SFX locked to the VO via a scribe_v1 word-
// timestamp anchor pass (public/degrader/voiceover.mp3, ~100.8s incl. the post-hook pause).
// NB: OWN distinct footage under public/degrader/, NO reuse of any other reel's clips.
// FOOTAGE is BRAND-FREE and FACE-FREE — generic science / lab / pharma / finance b-roll: molecules, pills,
// vials, dissolving tablets, microscopes, lab automation, cells, cash, contracts, charts, patents, towers.
// NO company logos/wordmarks (esp. Pfizer/J&J/Roche/AbbVie/Biogen/Novo Nordisk/Arvinas/Neomorph and any
// pharma brand), NO readable drug names or pill imprints, NO identifiable faces, NO foreign-language text,
// NO banknote portrait faces.
// **UNVERIFIED — names real companies and asserts specific financials and an approval date; render as
// written but FACT-CHECK before publishing:** the first protein-degrader approval (Arvinas/Pfizer breast-
// cancer drug, "May 2026"); the >$28B / 2-year deal total; J&J ~$1B cash; Roche ~$700M upfront up to $3B;
// AbbVie/Biogen/Novo Nordisk each ~$1.5B with Neomorph; the ~80% "undruggable" figure; and the 2030
// patent-cliff framing. The "option on 80% of biology / paying for a seat" framing is editorial analysis.
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK (held through ~1.1s post-hook pause)
  {dur: 238, kind: 'hook', reveal: [3, 80, 160], text: 'Why is Big Pharma spending|$28 billion on a class of drugs|that has exactly one approval?', kicker: 'The option', highlights: ['$28'], size: 34, media: {src: 'degrader/d00_lab.mp4', type: 'video', effect: 'in'}},
  // 1
  {dur: 40, kind: 'text', reveal: [2, 20], text: 'Protein|degraders.', highlights: ['degraders.'], size: 64, media: {src: 'degrader/d01_molecule.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 71, kind: 'text', reveal: [2, 36], text: 'Conventional drugs|block a bad protein.', highlights: ['block'], size: 42, media: {src: 'degrader/d02_pills.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 41, kind: 'text', reveal: [2, 20], text: 'These ones|destroy it.', highlights: ['destroy'], size: 54, media: {src: 'degrader/d03_dissolve.mp4', type: 'video', effect: 'in'}},
  // 4
  {dur: 61, kind: 'text', reveal: [2, 32], text: 'The idea is|25 years old.', highlights: ['25'], size: 48, media: {src: 'degrader/d04_oldlab.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 94, kind: 'text', reveal: [2, 34, 66], text: 'The first approval —|a breast-cancer drug|from Arvinas and Pfizer.', highlights: ['first'], size: 38, media: {src: 'degrader/d05_vial.jpg', type: 'img', effect: 'in'}},
  // 6 CARD 1
  {dur: 66, kind: 'lines', reveal: [0, 28, 50], text: 'IDEA: 2001|FIRST APPROVAL: 2026|1 DRUG', highlights: ['1'], media: {src: 'degrader/d06_calendar.jpg', type: 'img', effect: 'in'}},
  // 7 BLACK
  {dur: 67, kind: 'text', reveal: [0, 0], text: 'But nobody tells you|this part.', highlights: ['part.'], size: 48},
  // 8
  {dur: 104, kind: 'text', reveal: [2, 54], text: 'Over $28 billion in deals,|in two years.', highlights: ['$28'], size: 42, media: {src: 'degrader/d08_ticker.mp4', type: 'video', effect: 'in'}},
  // 9
  {dur: 139, kind: 'text', reveal: [2, 48, 96], enter: 'slideL', text: 'Johnson & Johnson bought|a degrader company for|$1 billion in cash.', highlights: ['$1'], size: 38, media: {src: 'degrader/d09_cash.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 86, kind: 'text', reveal: [2, 44], text: 'Roche paid|$700 million upfront.', highlights: ['$700'], size: 42, media: {src: 'degrader/d10_contract.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 103, kind: 'text', reveal: [2, 52], text: 'Up to $3 billion, for one|blood-cancer degrader.', highlights: ['$3'], size: 40, media: {src: 'degrader/d11_moneyvial.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 91, kind: 'text', reveal: [2, 46], text: 'AbbVie, Biogen and Novo|Nordisk each signed', highlights: ['signed'], size: 40, media: {src: 'degrader/d12_towers.jpg', type: 'img', effect: 'in'}},
  // 13 CARD 2
  {dur: 77, kind: 'lines', reveal: [0, 32, 58], text: '$28B / 2 YEARS|J&J $1B · ROCHE $3B|NEOMORPH ×3', highlights: ['$28B'], media: {src: 'degrader/d13_dealdoc.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 79, kind: 'text', reveal: [2, 40], text: 'with the same small company,|Neomorph, inside a year.', highlights: ['Neomorph,'], size: 36, media: {src: 'degrader/d14_smalllab.jpg', type: 'img', effect: 'in'}},
  // 15 BLACK
  {dur: 53, kind: 'text', reveal: [0, 0], text: 'But that’s not even|the craziest part.', highlights: ['craziest'], size: 48},
  // 16
  {dur: 79, kind: 'text', reveal: [2, 40], text: 'They’re not buying drugs.|They’re buying platforms.', highlights: ['platforms.'], size: 38, media: {src: 'degrader/d16_factory.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 116, kind: 'text', reveal: [2, 40, 78], text: 'The capability to make|degraders, not any|single molecule.', highlights: ['capability'], size: 40, media: {src: 'degrader/d17_robotarm.mp4', type: 'video', effect: 'in'}},
  // 18 CARD 3
  {dur: 67, kind: 'lines', reveal: [0, 28, 50], text: 'PLATFORMS, NOT PILLS|SMALL CASH NOW|BILLIONS IF IT WORKS', highlights: ['platforms,'], media: {src: 'degrader/d18_servers.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 88, kind: 'text', reveal: [2, 44], text: 'Small cash now,|billions later if it works.', highlights: ['billions'], size: 40, media: {src: 'degrader/d19_coinsgrow.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 39, kind: 'text', reveal: [2, 20], text: 'Here’s exactly|how they do it.', highlights: ['exactly'], size: 48, media: {src: 'degrader/d20_microscope.mp4', type: 'video', effect: 'in'}},
  // 21
  {dur: 69, kind: 'text', reveal: [2, 36], text: 'About 80% of|the proteins', highlights: ['80%'], size: 44, media: {src: 'degrader/d21_proteins.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 103, kind: 'text', reveal: [2, 52], text: 'in the human body can’t be hit|by a conventional drug.', highlights: ['can’t'], size: 36, media: {src: 'degrader/d22_bindfail.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 58, kind: 'text', reveal: [2, 30], text: 'There’s nowhere|for the pill to bind.', highlights: ['nowhere'], size: 44, media: {src: 'degrader/d23_surface.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 70, kind: 'text', reveal: [2, 36], text: 'Degraders don’t need|to bind that way.', highlights: ['Degraders'], size: 44, media: {src: 'degrader/d24_tag.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 84, kind: 'text', reveal: [2, 44], text: 'They tag the protein for the|cell’s own disposal system.', highlights: ['disposal'], size: 36, media: {src: 'degrader/d25_cell.mp4', type: 'video', effect: 'in'}},
  // 26
  {dur: 116, kind: 'text', reveal: [2, 60], text: 'Crack that, and the undruggable|80% becomes a market.', highlights: ['market.'], size: 36, media: {src: 'degrader/d26_growth.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 82, kind: 'text', reveal: [2, 42], text: 'Meanwhile, pharma’s|best-selling drugs', highlights: ['best-selling'], size: 42, media: {src: 'degrader/d27_pillscal.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 85, kind: 'text', reveal: [2, 44], text: 'lose patent protection|by the end of the decade.', highlights: ['patent'], size: 40, media: {src: 'degrader/d28_patent.jpg', type: 'img', effect: 'in'}},
  // 29 CARD 4
  {dur: 99, kind: 'lines', reveal: [0, 48], text: '80% UNDRUGGABLE|PATENT CLIFF: 2030', highlights: ['80%'], media: {src: 'degrader/d29_cliff.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 51, kind: 'text', reveal: [2, 26], text: '$28 billion isn’t a bet|on one drug.', highlights: ['bet'], size: 42, media: {src: 'degrader/d30_money.jpg', type: 'img', effect: 'in'}},
  // 31 RED impact (thesis)
  {dur: 92, kind: 'impact', text: 'It’s an option on|80% of biology.', redBg: true},
  // 32
  {dur: 51, kind: 'text', reveal: [2, 26], text: 'One approval proved|the mechanism works.', highlights: ['proved'], size: 42, media: {src: 'degrader/d32_approve.jpg', type: 'img', effect: 'in'}},
  // 33
  {dur: 132, kind: 'text', reveal: [2, 44, 88], enter: 'slideR', text: 'Every deal since is a company|paying for a seat before|the price goes up.', highlights: ['seat'], size: 34, media: {src: 'degrader/d33_auction.jpg', type: 'img', effect: 'in'}},
  // 34
  {dur: 101, kind: 'text', reveal: [2, 52], text: 'The science took 25 years.|The pricing took one approval.', highlights: ['one'], size: 34, media: {src: 'degrader/d34_clockmoney.jpg', type: 'img', effect: 'in'}},
  // 35 CTA (question close)
  {dur: 75, kind: 'text', reveal: [2, 18], enter: 'zoom', text: 'Breakthrough,|or bubble?', highlights: ['bubble?'], size: 48, media: {src: 'degrader/d35_bubble.mp4', type: 'video', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 238, src: 'media/sfx_whoosh.mp3', vol: 0.35}, // hook -> reveal
  {at: 545, src: 'media/sfx_impact.mp3', vol: 0.46}, // card 1 (idea/approval/1 drug)
  {at: 611, src: 'media/sfx_whoosh.mp3', vol: 0.35}, // into black
  {at: 678, src: 'media/sfx_impact.mp3', vol: 0.46}, // $28B reveal
  {at: 782, src: 'media/sfx_chaching.mp3', vol: 0.4}, // $1B cash
  {at: 1201, src: 'media/sfx_impact.mp3', vol: 0.46}, // card 2 ($28B deals)
  {at: 1357, src: 'media/sfx_whoosh.mp3', vol: 0.35}, // into black
  {at: 1605, src: 'media/sfx_impact.mp3', vol: 0.46}, // card 3 (platforms not pills)
  {at: 2466, src: 'media/sfx_impact.mp3', vol: 0.46}, // card 4 (undruggable / cliff)
  {at: 2616, src: 'media/sfx_impact.mp3', vol: 0.55}, // red thesis (option on 80%)
  {at: 2992, src: 'media/sfx_whoosh.mp3', vol: 0.4}, // close
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The option</span>
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
export const DegraderReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('degrader/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('degrader/music.mp3')}
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
