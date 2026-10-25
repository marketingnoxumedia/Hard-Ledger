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
// "The warehouse" reel (WarehouseReel) — fast NEWS reel, Hard Ledger house format.
// TOPIC: the AI capex boom is showing up in INDUSTRIAL REAL ESTATE — US big-box warehouse leasing had its
// biggest quarter in four years, driven by data-centre-adjacent tenants concentrated in Texas. The AI build-out
// lands as concrete, not just chips.
// Thesis: if you've wondered where AI capex actually lands, it's warehouses — concrete, in Texas — and it's
// pricing out the companies that used to rent the space. US industrial leasing hit ~202.6M sq ft in one quarter,
// up ~38.5% YoY, the biggest quarter since 2022 (the pandemic-logistics peak). Who's signing: logistics still
// first (~17.9%), construction materials (~14.7%), then the new names — comms & tech (~7.5%, rising) and energy
// & utilities (~4.6%, rising): power, infrastructure, defence — the supply chain behind the data centre.
// Second-order: Savills tracked the data-centre-adjacent tenants alone — ~69M sq ft of big-box over two years,
// ~10.1% of all leasing in H1, concentrated in four metros (Dallas, Houston, Austin, the East Bay). Twist: a 38%
// jump reads like a boom but it's NARROWER than that — vacancy down to ~6.8%, ~317M sq ft under construction (the
// most since early 2024), and a tenth of demand is one industry in one state, building boxes for servers. Open
// questions: does 10% become 20%? what happens to the Texas warehouse market if AI capital dries up (as Nvidia's
// CEO warned on Thursday — see ScarcityReel)? Outcome: busiest quarter since 2022, vacancy falling, ~317M sq ft
// going up, and the fastest-growing tenant doesn't ship anything. Binary close ("Is this the AI boom reaching
// Main Street, or renting Main Street out from under it? Pick a side below."). 10-part structure, NO post-hook
// pause, mid-reel like+follow ask.
// Card figures: 202.6M SQ FT / 38.5% / 17.9% / 14.7% / 7.5% / 4.6% / 69M SQ FT / 10.1% / 6.8% / 317M SQ FT (10
// stat cards; "2022" is a TEXT beat, NOT a stat, to avoid the thousands-comma on a year). Captions match the VO
// verbatim (except the number cards; spoken figures as numerals). Durations/reveals/SFX locked to the VO via a
// scribe_v1 word-timestamp anchor pass (public/warehouse/voiceover.mp3, NO inserted pause); music mixed at 0.17.
// 47 beats; built at the house +10% pacing default. OWN distinct footage under public/warehouse/, NO reuse of any
// other reel's clips — ledger-checked. New STANDALONE reel; thematically a companion to ScarcityReel/ConstraintReel
// (the same AI-capex week, the DEMAND-side / real-estate footprint of the build-out) but a wholly distinct subject.
// Card text naming "NVIDIA"/sectors is editorial overlay, not footage.
// FOOTAGE is BRAND-FREE, FACE-FREE and LANDMARK-FREE despite naming Savills / Nvidia / Dallas / Houston / Austin /
// the East Bay / Texas: generic warehouses, loading docks, pallets, concrete, construction, server/cloud and
// supply-chain b-roll. **NO company logo or wordmark — ESPECIALLY no Amazon/FedEx/UPS/Walmart/DHL on any warehouse
// roof, truck, trailer or dock sign; NO Nvidia or any identifiable face; NO stock TICKER or readable price; NO
// exchange signage; NO flags; NO identifiable landmarks or skyline; NO readable foreign text; NO banknote/coin
// portraits or identifiable currency; NO military.**
// **UNVERIFIED / SENSITIVE — cites a specific Savills industrial-market dataset and names a CEO warning; rendered
// as written but MUST be fact-checked before publishing.** Verify: ~202.6M sq ft Q leasing and the ~38.5% YoY jump
// / "biggest since 2022"; the sector mix (logistics 17.9%, construction materials 14.7%, comms&tech 7.5%, energy&
// utilities 4.6%); the ~69M sq ft / ~10.1%-of-H1 data-centre-adjacent figures and the four-metro concentration;
// vacancy ~6.8% and ~317M sq ft under construction ("most since early 2024"); and the Nvidia-CEO "Thursday"
// warning cross-reference. "AI boom renting Main Street out from under it" framing is editorial analysis.
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 90, kind: 'hook', reveal: [3, 40], text: 'The AI boom just showed up|somewhere nobody was looking.', kicker: 'The warehouse', highlights: ['boom'], size: 30, media: {src: 'warehouse/wh00_aerial.mp4', type: 'video', effect: 'in'}},
  // 1
  {dur: 90, kind: 'text', reveal: [2], enter: 'slideUp', text: 'Warehouses.', highlights: ['warehouses.'], size: 56, media: {src: 'warehouse/wh01_empty.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 90, kind: 'text', reveal: [2, 28], text: 'And the numbers are|the biggest in four years.', highlights: ['four'], size: 34, media: {src: 'warehouse/wh02_fouryears.jpg', type: 'img', effect: 'panR'}},
  // 3
  {dur: 90, kind: 'text', reveal: [2, 40], text: 'If you’ve ever wondered where|AI capex actually lands,', highlights: [], size: 30, media: {src: 'warehouse/wh03_capex.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 90, kind: 'text', reveal: [2], text: 'it’s not just chips.', highlights: ['chips.'], size: 46, media: {src: 'warehouse/wh04_chips.jpg', type: 'img', effect: 'panL'}},
  // 5
  {dur: 90, kind: 'text', reveal: [2, 28], text: 'It’s concrete,|in Texas,', highlights: ['concrete,'], size: 42, media: {src: 'warehouse/wh05_concrete.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 90, kind: 'text', reveal: [2, 40], text: 'pricing out the companies|that used to rent it.', highlights: ['pricing'], size: 32, media: {src: 'warehouse/wh06_rent.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 90, kind: 'text', reveal: [2, 28], text: 'I’ll show you exactly|what the data says.', highlights: ['data'], size: 34, media: {src: 'warehouse/wh07_data.jpg', type: 'img', effect: 'panR'}},
  // 8
  {dur: 90, kind: 'text', reveal: [2, 40], text: 'If that’s worth a follow,|you know where the button is.', highlights: ['follow,'], size: 32, media: {src: 'warehouse/wh08_phone.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 90, kind: 'text', reveal: [2, 28], text: 'A busy quarter for industry|is nothing new.', highlights: [], size: 32, media: {src: 'warehouse/wh09_busy.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 90, kind: 'text', reveal: [2], enter: 'slideL', text: 'But this one is different.', highlights: ['different.'], size: 44, media: {src: 'warehouse/wh10_standout.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 90, kind: 'text', reveal: [2, 28], text: 'US industrial leasing hit,|in one quarter,', highlights: [], size: 32, media: {src: 'warehouse/wh11_docks.jpg', type: 'img', effect: 'panL'}},
  // 12 CARD 202.6M
  {dur: 90, kind: 'stat', stat: {pre: 'US INDUSTRIAL LEASING', value: 202.6, decimals: 1, suffix: 'M', post: 'SQ FT · ONE QUARTER'}, media: {src: 'warehouse/wh12_park.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 90, kind: 'text', reveal: [2], text: 'Up on last year by', highlights: [], size: 40, media: {src: 'warehouse/wh13_up.jpg', type: 'img', effect: 'in'}},
  // 14 CARD 38.5%
  {dur: 90, kind: 'stat', stat: {pre: 'VERSUS A YEAR AGO', value: 38.5, decimals: 1, suffix: '%', post: 'UP'}, media: {src: 'warehouse/wh14_jump.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 90, kind: 'text', reveal: [2, 28], text: 'The biggest quarter|since 2022.', highlights: ['2022.'], size: 40, media: {src: 'warehouse/wh15_since.jpg', type: 'img', effect: 'panR'}},
  // 16
  {dur: 90, kind: 'text', reveal: [2], text: 'Look at who’s signing.', highlights: [], size: 44, media: {src: 'warehouse/wh16_sign.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 90, kind: 'text', reveal: [2], text: 'Logistics, still first.', highlights: ['first.'], size: 42, media: {src: 'warehouse/wh17_logistics.jpg', type: 'img', effect: 'in'}},
  // 18 CARD 17.9%
  {dur: 90, kind: 'stat', stat: {pre: 'LOGISTICS', value: 17.9, decimals: 1, suffix: '%', post: 'OF LEASING'}, media: {src: 'warehouse/wh18_pallets.jpg', type: 'img', effect: 'in'}},
  // 19 CARD 14.7%
  {dur: 90, kind: 'stat', stat: {pre: 'CONSTRUCTION MATERIALS', value: 14.7, decimals: 1, suffix: '%'}, media: {src: 'warehouse/wh19_materials.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 90, kind: 'text', reveal: [2], text: 'Then the new names.', highlights: ['new'], size: 46, media: {src: 'warehouse/wh20_new.jpg', type: 'img', effect: 'panL'}},
  // 21 CARD 7.5%
  {dur: 90, kind: 'stat', stat: {pre: 'COMMS & TECH', value: 7.5, decimals: 1, suffix: '%', post: 'RISING'}, media: {src: 'warehouse/wh21_tech.jpg', type: 'img', effect: 'in'}},
  // 22 CARD 4.6%
  {dur: 90, kind: 'stat', stat: {pre: 'ENERGY & UTILITIES', value: 4.6, decimals: 1, suffix: '%', post: 'RISING'}, media: {src: 'warehouse/wh22_energy.jpg', type: 'img', effect: 'in'}},
  // 23 BLACK
  {dur: 90, kind: 'impact', text: 'Power.|Infrastructure. Defence.'},
  // 24
  {dur: 90, kind: 'text', reveal: [2, 40], text: 'The supply chain|behind the data centre.', highlights: ['centre.'], size: 34, media: {src: 'warehouse/wh24_chain.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 90, kind: 'text', reveal: [2, 28], text: 'And the problem|doesn’t stop there.', highlights: ['problem'], size: 44, media: {src: 'warehouse/wh25_warning.jpg', type: 'img', effect: 'panR'}},
  // 26
  {dur: 90, kind: 'text', reveal: [2, 40], text: 'Savills tracked the data-centre|tenants on their own.', highlights: [], size: 30, media: {src: 'warehouse/wh26_report.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 90, kind: 'text', reveal: [2], text: 'Over two years:', highlights: [], size: 44, media: {src: 'warehouse/wh27_twoyears.jpg', type: 'img', effect: 'in'}},
  // 28 CARD 69M
  {dur: 90, kind: 'stat', stat: {pre: 'DATA-CENTRE-ADJACENT', value: 69, suffix: 'M', post: 'SQ FT · 2 YEARS'}, media: {src: 'warehouse/wh28_bigbox.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 90, kind: 'text', reveal: [2, 28], text: 'In the first half|of this year,', highlights: [], size: 36, media: {src: 'warehouse/wh29_half.jpg', type: 'img', effect: 'panL'}},
  // 30 CARD 10.1%
  {dur: 90, kind: 'stat', stat: {pre: 'OF ALL LEASING', value: 10.1, decimals: 1, suffix: '%', post: 'THIS HALF'}, media: {src: 'warehouse/wh30_share.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 90, kind: 'text', reveal: [2, 40], text: 'Four places: Dallas, Houston,|Austin, the East Bay.', highlights: [], size: 30, media: {src: 'warehouse/wh31_map.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 90, kind: 'text', reveal: [2, 28], text: 'A 38% jump sounds|like a boom.', highlights: ['boom.'], size: 36, media: {src: 'warehouse/wh32_fireworks.jpg', type: 'img', effect: 'panR'}},
  // 33
  {dur: 90, kind: 'text', reveal: [2, 28], text: 'Read it carefully.|It’s narrower.', highlights: ['narrower.'], size: 40, media: {src: 'warehouse/wh33_narrow.jpg', type: 'img', effect: 'in'}},
  // 34
  {dur: 90, kind: 'text', reveal: [2], text: 'Vacancy is down to', highlights: [], size: 42, media: {src: 'warehouse/wh34_vacancy.jpg', type: 'img', effect: 'in'}},
  // 35 CARD 6.8%
  {dur: 90, kind: 'stat', stat: {pre: 'VACANCY', value: 6.8, decimals: 1, suffix: '%', post: 'DOWN'}, media: {src: 'warehouse/wh35_tolet.jpg', type: 'img', effect: 'in'}},
  // 36
  {dur: 90, kind: 'text', reveal: [2], text: 'Construction is at', highlights: [], size: 42, media: {src: 'warehouse/wh36_crane.jpg', type: 'img', effect: 'panL'}},
  // 37 CARD 317M
  {dur: 90, kind: 'stat', stat: {pre: 'UNDER CONSTRUCTION', value: 317, suffix: 'M', post: 'SQ FT'}, media: {src: 'warehouse/wh37_site.jpg', type: 'img', effect: 'in'}},
  // 38 BLACK
  {dur: 90, kind: 'impact', text: 'A tenth of the demand|is one industry, one state.'},
  // 39
  {dur: 90, kind: 'text', reveal: [2, 28], text: 'Building boxes|for servers.', highlights: ['servers.'], size: 42, media: {src: 'warehouse/wh39_servers.jpg', type: 'img', effect: 'in'}},
  // 40
  {dur: 90, kind: 'text', reveal: [2, 28], text: 'Does ten percent|become twenty?', highlights: [], size: 40, media: {src: 'warehouse/wh40_double.jpg', type: 'img', effect: 'panR'}},
  // 41
  {dur: 90, kind: 'text', reveal: [2, 28], text: 'What if the AI capital|dries up?', highlights: ['dries'], size: 36, media: {src: 'warehouse/wh41_dry.jpg', type: 'img', effect: 'in'}},
  // 42
  {dur: 90, kind: 'text', reveal: [2, 40], text: 'Like Nvidia’s CEO|warned on Thursday.', highlights: ['Thursday.'], size: 34, media: {src: 'warehouse/wh42_warned.jpg', type: 'img', effect: 'in'}},
  // 43
  {dur: 90, kind: 'text', reveal: [2, 40], text: 'Busiest quarter since 2022.|Vacancy falling.', highlights: [], size: 32, media: {src: 'warehouse/wh43_busiest.jpg', type: 'img', effect: 'panL'}},
  // 44
  {dur: 90, kind: 'text', reveal: [2, 40], text: 'And the fastest-growing tenant|doesn’t ship anything.', highlights: ['ship'], size: 30, media: {src: 'warehouse/wh44_idle.jpg', type: 'img', effect: 'in'}},
  // 45 RED
  {dur: 90, kind: 'impact', redBg: true, text: 'Is this the AI boom reaching Main Street,|or renting Main Street|out from under it?'},
  // 46 CTA
  {dur: 90, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Pick a side|below.', highlights: ['side'], size: 48, media: {src: 'warehouse/wh46_fork.mp4', type: 'video', effect: 'in'}},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The warehouse</span>
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
export const WarehouseReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('warehouse/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('warehouse/music.mp3')}
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
