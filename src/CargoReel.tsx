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
// "The cheapest hull" reel (CargoReel) — fast NEWS reel, Hard Ledger house format.
// NEW topic: what it ACTUALLY costs to ship grain through a war. Thesis: the real cost of moving
// cargo through the Black Sea war isn't the insurance premium (the cargo owner pays that) — it's
// paid by the people on the ship, and the system is built so that is never anyone expensive. The
// grain still has to move, so it moves under the cheapest hulls, cheapest flags, cheapest crews
// (flags of convenience), where the insurance says don't go. Full QUESTION/STORY/ANSWER/CTA
// (VERBATIM) with a ~1.1s post-hook pause; close is the supplied CTA QUESTION ("Who should be
// paying for this? Tell me below."). 30 beats: 27 media (incl. 3 video b-roll + 4 cards: 20 MILES
// OFF BULGARIA / 11 MISSING; 3 ATTACKS / 8 DAYS / 23 DEAD OR MISSING; GUINEA-BISSAU / TOGO / PALAU;
// 23 PEOPLE / CORN STILL REACHES ITALY) / 1 red impact ("The bill gets paid by whoever is cheapest
// to lose.") / 2 black ("Here's the piece you're missing." + "This is the part that makes it
// work."). Red card is mid-tail (beat 25), closer resolves on the CTA question over a sea horizon.
// NB: OWN distinct footage under public/cargo/, NO reuse of any other reel's clips.
// FOOTAGE is strictly BRAND-FREE, FACE-FREE AND FLAG-FREE -- generic maritime / grain / documents
// b-roll, NO national flags of ANY country (no Russian/Ukrainian/Bulgarian/Turkish/Maltese/EU
// flag, no flag-of-convenience ensign), NO readable ship names / IMO numbers / company livery /
// port signage, NO foreign-language text, NO identifiable human faces (hands/silhouettes only).
// **SENSITIVE -- VERIFIED REAL, but confirm details before publishing:** these are real October
// 2026 events (drone strikes on cargo ships off Bulgaria in the western Black Sea; corroborated by
// Reuters/Insurance Journal, Bloomberg, NBC, Euronews, CBC, gCaptain). Attribution is responsibly
// HEDGED in the script ("nobody has confirmed who fired the drones; Ukraine says Russia"). Two
// cautions: (1) the summons of the Russian ambassador was by the Bulgarian state -- note Rumen
// Radev is Bulgaria's PRESIDENT, not PM, and such summons usually run through the Foreign Ministry
// (the script's "Bulgaria's PM" is rendered verbatim per client). (2) casualty counts, ship names
// and exact distances were still provisional/disputed across outlets at publication; the 23 total
// reconciles (11 + 10 + 2). Legal/defamation-check the Russia attribution framing and confirm the
// live figures against primary sources before this publishes.
// ---------------------------------------------------------------------------
// Durations / line-reveal frames / SFX cues below are LOCKED to the ElevenLabs VO via a scribe_v1
// word-timestamp anchor pass (public/cargo/voiceover.mp3, ~98.95s incl. the post-hook pause).
// 30 beats: 27 media (incl. 3 video + 4 cards) / 1 red impact / 2 black. The restated-number cards
// land on the beat where the VO speaks the figure (e.g. "11 MISSING" slams as "eleven" is said).
const SCENES: SceneDef[] = [
  // 0 HOOK (held through ~1.1s post-hook pause)
  {dur: 164, kind: 'hook', reveal: [3, 43, 98], text: 'What does it cost|to ship a cargo of corn|through a war?', kicker: 'The cheapest hull', highlights: ['war?'], size: 40, media: {src: 'cargo/b00_cargoship.mp4', type: 'video', effect: 'in'}},
  // 1
  {dur: 70, kind: 'text', reveal: [2, 22], text: 'Tuesday.|Three in the morning.', highlights: ['three'], size: 44, media: {src: 'cargo/b01_nightsea.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 68, kind: 'text', reveal: [2, 32], enter: 'slideL', text: 'Two cargo ships|hit by drones.', highlights: ['drones.'], size: 44, media: {src: 'cargo/b02_drones.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 67, kind: 'text', reveal: [2, 31], text: 'Twenty miles|off Bulgaria.', highlights: ['twenty'], size: 46, media: {src: 'cargo/b03_blacksea.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 80, kind: 'text', reveal: [2, 38], text: "Inside a NATO|country's waters.", highlights: ['nato'], size: 44, media: {src: 'cargo/b04_radar.jpg', type: 'img', effect: 'in'}},
  // 5 CARD (rides "one sinks, five rescued, eleven missing")
  {dur: 104, kind: 'lines', text: '20 MILES OFF BULGARIA|11 MISSING', highlights: ['11'], reveal: [0, 69], media: {src: 'cargo/b06_lifebuoy.mp4', type: 'video', effect: 'in'}},
  // 6 BLACK
  {dur: 39, kind: 'text', reveal: [0, 0], text: "Here's the piece|you're missing.", highlights: ['missing.'], size: 50},
  // 7
  {dur: 63, kind: 'text', reveal: [2, 40], text: 'The third attack|in eight days.', highlights: ['third'], size: 44, media: {src: 'cargo/b08_calendar.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 84, kind: 'text', reveal: [2, 55], enter: 'slideR', text: 'Last Tuesday, same waters:|one ship sunk.', highlights: ['sunk.'], size: 42, media: {src: 'cargo/b09_wreck.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 88, kind: 'text', reveal: [2, 52], text: 'Ten crew never found.|Search called off.', highlights: ['ten'], size: 42, media: {src: 'cargo/b10_emptysea.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 67, kind: 'text', reveal: [2, 36], text: 'The day before,|off Romania.', highlights: ['romania.'], size: 44, media: {src: 'cargo/b11_port.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 117, kind: 'text', reveal: [2, 62, 100], enter: 'slideL', text: 'A Turkish-owned ship,|Ukrainian grain,|bound for Italy.', highlights: ['grain,'], size: 40, media: {src: 'cargo/b12_graincarrier.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 56, kind: 'text', reveal: [2, 41], text: 'Hit. Burned. Sank.|Two dead.', highlights: ['two'], size: 44, media: {src: 'cargo/b13_smoke.jpg', type: 'img', effect: 'in'}},
  // 13 CARD (the cumulative toll, landing on "two dead")
  {dur: 56, kind: 'lines', text: '3 ATTACKS|8 DAYS|23 DEAD OR MISSING', highlights: ['23'], reveal: [0, 18, 36], media: {src: 'cargo/b14_candles.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 34, kind: 'text', reveal: [2], text: 'Look at the flags.', highlights: ['flags.'], size: 50, media: {src: 'cargo/b15_stern.jpg', type: 'img', effect: 'in'}},
  // 15 CARD
  {dur: 93, kind: 'lines', text: 'GUINEA-BISSAU|TOGO|PALAU', highlights: ['palau'], reveal: [0, 31, 52], media: {src: 'cargo/b16_worldmap.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 96, kind: 'text', reveal: [2, 52], text: 'Crews from Azerbaijan,|India, Turkey.', highlights: ['turkey.'], size: 40, media: {src: 'cargo/b17_crewhands.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 116, kind: 'text', reveal: [2, 67], text: 'Not the companies|whose grain they carry.', highlights: ['companies'], size: 42, media: {src: 'cargo/b05_liferaft.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 151, kind: 'text', reveal: [2, 39, 75], enter: 'slideL', text: 'The cheapest hulls.|The cheapest flags.|The cheapest crews.', highlights: ['cheapest'], size: 40, media: {src: 'cargo/b18_rustyhull.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 108, kind: 'text', reveal: [2, 54], text: 'Sent where the insurance|says don’t go.', highlights: ['insurance'], size: 42, media: {src: 'cargo/b19_riskmap.jpg', type: 'img', effect: 'in'}},
  // 20 BLACK
  {dur: 81, kind: 'text', reveal: [0, 0], text: 'This is the part|that makes it work.', highlights: ['work.'], size: 48},
  // 21
  {dur: 90, kind: 'text', reveal: [2, 49], text: 'Nobody has confirmed|who fired the drones.', highlights: ['nobody'], size: 42, media: {src: 'cargo/b21_dronesky.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 160, kind: 'text', reveal: [2, 57, 100], text: 'Ukraine says Russia.|Bulgaria called in|the ambassador.', highlights: ['russia.'], size: 40, media: {src: 'cargo/b22_govbuilding.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 152, kind: 'text', reveal: [2, 67], text: 'Brussels calls the Black Sea|a lifeline for food.', highlights: ['lifeline'], size: 40, media: {src: 'cargo/b23_wheatfield.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 68, kind: 'text', reveal: [2, 40], enter: 'slideR', text: 'The grain still|has to move.', highlights: ['move.'], size: 44, media: {src: 'cargo/b24_grainflow.mp4', type: 'video', effect: 'in'}},
  // 25 RED impact (mid-tail thesis)
  {dur: 138, kind: 'impact', text: 'The bill gets paid by|whoever is|cheapest to lose.', redBg: true},
  // 26
  {dur: 181, kind: 'text', reveal: [2, 51, 131], text: 'Shipping through a war|isn’t the premium.|The cargo owner pays that.', highlights: ['premium.'], size: 40, media: {src: 'cargo/b26_premium.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 192, kind: 'text', reveal: [2, 124, 151], text: 'The real cost is the crew.|Built so it’s|never anyone expensive.', highlights: ['crew.'], size: 40, media: {src: 'cargo/b27_lifejacket.jpg', type: 'img', effect: 'in'}},
  // 28 CARD (lands on the spoken "twenty-three")
  {dur: 111, kind: 'lines', text: '23 PEOPLE, 8 DAYS|THE CORN STILL|REACHES ITALY', highlights: ['23'], reveal: [0, 65, 95], media: {src: 'cargo/b28_silo.jpg', type: 'img', effect: 'in'}},
  // 29 CTA
  {dur: 81, kind: 'text', reveal: [2, 28, 43], enter: 'zoom', text: 'Who should be paying|for this?|Tell me below.', highlights: ['paying'], size: 42, media: {src: 'cargo/b29_horizon.jpg', type: 'img', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 449, src: 'media/sfx_impact.mp3', vol: 0.45}, // 20 MI / 11 MISSING card
  {at: 553, src: 'media/sfx_whoosh.mp3', vol: 0.35}, // into the black beat
  {at: 1067, src: 'media/sfx_impact.mp3', vol: 0.48}, // 3 ATTACKS / 23 toll card
  {at: 1157, src: 'media/sfx_whoosh.mp3', vol: 0.3}, // flags card
  {at: 2272, src: 'media/sfx_impact.mp3', vol: 0.55}, // red thesis card
  {at: 2783, src: 'media/sfx_impact.mp3', vol: 0.5}, // 23 / Italy card
  {at: 2894, src: 'media/sfx_whoosh.mp3', vol: 0.4}, // CTA
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The cheapest hull</span>
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
export const CargoReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('cargo/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('cargo/music.mp3')}
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
