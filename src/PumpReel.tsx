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
// "The pump" reel (PumpReel) — fast NEWS reel, Hard Ledger house format.
// NEW topic: why WASHINGTON is pressing Ukraine to stop hitting Russian oil refineries three weeks
// before the US midterms. Thesis: Washington isn't managing a war, it's managing a price — Ukraine's
// refinery strikes are its most effective weapon (they pull Russian diesel off the world market), but
// they also push US diesel up, and three weeks before an election the only ask that counts is "stop
// fighting the way that costs us money." Russia's weakest point is the same as America's: the pump.
// Full QUESTION/STORY/ANSWER/CTA with a ~1.1s post-hook pause; close is the supplied CTA QUESTION
// ("Should Ukraine stop? Tell me below."). 28 beats: 25 media (incl. 2 video + 4 cards: WASHINGTON
// TO KYIV / STOP THE STRIKES; EXPORTS BANNED / BRENT $100+ / US DIESEL RECORD; THE THREAT / HALT
// WEAPONS / CUT INTEL; MIDTERMS NOV 3 / 21 DAYS) / 1 red impact ("Washington isn't managing a war.
// It's managing a price.") / 2 black. Red card mid-tail (beat 22); closer resolves on the CTA
// question. Durations / reveals / SFX locked to the VO via a scribe_v1 word-timestamp anchor pass
// (public/pump/voiceover.mp3, ~98.6s incl. the post-hook pause; a hallucinated TTS tail word was
// trimmed). Restated-fact cards land where the VO speaks them.
// **RE-ATTRIBUTION (client-directed):** the script as supplied pinned the "stop the refinery
// strikes" ask on Gen. Alex Grynkewich (NATO's commander in Europe). Reporting attributes that
// pressure to WASHINGTON / US officials (the Financial Times, 11 Oct 2026, via CNN/Reuters-relayed
// coverage) -- and Grynkewich publicly argued the OPPOSITE (arm Ukraine harder; Russia won't break
// Ukraine by hitting its energy sector). Per the client's choice, the "stop" ask is re-attributed to
// Washington; Grynkewich appears only for his real "fight tonight" posture.
// NB: OWN distinct footage under public/pump/, NO reuse of any other reel's clips.
// FOOTAGE is strictly BRAND-FREE, FACE-FREE AND FLAG-FREE -- generic refinery / war / oil / politics
// b-roll, NO national flag (US/NATO/Russian/Ukrainian/EU), NO identifiable faces (no Grynkewich /
// Putin / Trump / Zelensky / soldiers' faces), NO military insignia or unit patches, NO gas-station /
// weapon-maker / newspaper-masthead logos, NO readable foreign text, NO banknote portrait faces.
// **SENSITIVE -- verify + legal-check before publishing:** the FT threat (halt the PURL weapons
// mechanism + cut intel sharing to stop refinery strikes, over diesel/oil-price fears) is real,
// corroborated Oct 2026 reporting; Trump has publicly blamed diesel prices on the war; the strikes'
// effectiveness (~half of Russian refining capacity hit, per Ukraine) is reported. STILL CONFIRM:
// "Brent crossed $100", "Russia banned diesel exports to end-October", "US diesel record last
// quarter", and the exact "$366M"-style figures; and note the motive framing ("managing a price",
// hurting Trump's polling) is editorial opinion -- run a defamation/fact check before publishing.
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK (held through ~1.1s post-hook pause)
  {dur: 208, kind: 'hook', reveal: [10, 52, 103], text: 'Why is Washington|telling Ukraine to stop|hitting Russian refineries?', kicker: 'The pump', highlights: ['refineries?'], size: 40, media: {src: 'pump/b00_refinery.mp4', type: 'video', effect: 'in'}},
  // 1
  {dur: 46, kind: 'text', reveal: [2, 22], text: 'Monday.|Warsaw.', highlights: ['warsaw.'], size: 50, media: {src: 'pump/b01_warsaw.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 140, kind: 'text', reveal: [2, 52, 89], text: 'Alex Grinkevich,|commander of US|and NATO forces in Europe.', highlights: ['nato'], size: 40, media: {src: 'pump/b02_podium.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 102, kind: 'text', reveal: [2, 55], enter: 'slideL', text: 'Talks tough on Russia:|ready to fight tonight.', highlights: ['fight'], size: 42, media: {src: 'pump/b03_soldiers.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 51, kind: 'text', reveal: [2], text: 'Block. Blunt. Break.', highlights: ['break.'], size: 50, media: {src: 'pump/b08_drone.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 121, kind: 'text', reveal: [2, 56], text: 'But Washington’s message|to Kyiv is the opposite.', highlights: ['opposite.'], size: 42, media: {src: 'pump/b04_govbuilding.jpg', type: 'img', effect: 'in'}},
  // 6 CARD
  {dur: 84, kind: 'lines', reveal: [0, 30], text: 'WASHINGTON TO KYIV:|STOP THE STRIKES', highlights: ['stop'], media: {src: 'pump/b06_stop.jpg', type: 'img', effect: 'in'}},
  // 7 BLACK
  {dur: 71, kind: 'text', reveal: [0, 0], text: 'But nobody|tells you this part.', highlights: ['part.'], size: 50},
  // 8
  {dur: 139, kind: 'text', reveal: [2, 67], text: 'Ukraine’s refinery strikes|are its most effective weapon.', highlights: ['effective'], size: 40, media: {src: 'pump/b05_energynight.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 152, kind: 'text', reveal: [2, 97], text: 'Every hit takes diesel|off the world market.', highlights: ['diesel'], size: 42, media: {src: 'pump/b09_diesel.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 133, kind: 'text', reveal: [2, 90], enter: 'slideR', text: 'Russia banned diesel exports|until the end of October.', highlights: ['banned'], size: 40, media: {src: 'pump/b10_tanker.jpg', type: 'img', effect: 'in'}},
  // 11 CARD
  {dur: 150, kind: 'lines', reveal: [0, 28, 69], text: 'EXPORTS: BANNED|BRENT $100+|US DIESEL: RECORD', highlights: ['$100+'], media: {src: 'pump/b13_barrels.jpg', type: 'img', effect: 'in'}},
  // 12 BLACK
  {dur: 59, kind: 'text', reveal: [0, 0], text: 'But that’s not|the craziest part.', highlights: ['craziest'], size: 48},
  // 13
  {dur: 43, kind: 'text', reveal: [2, 12], text: 'Per the|Financial Times.', highlights: ['times.'], size: 46, media: {src: 'pump/b15_newspaper.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 99, kind: 'text', reveal: [2, 51], text: 'Washington threatened|to halt the weapons.', highlights: ['halt'], size: 42, media: {src: 'pump/b16_weapons.jpg', type: 'img', effect: 'in'}},
  // 15 CARD
  {dur: 107, kind: 'lines', reveal: [0, 22, 52], text: 'THE THREAT:|HALT WEAPONS|CUT INTEL', highlights: ['intel'], media: {src: 'pump/b17_redacted.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 60, kind: 'text', reveal: [2, 16], text: 'Not because|the strikes don’t work.', highlights: ['work.'], size: 44, media: {src: 'pump/b19_chess.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 32, kind: 'text', reveal: [2], text: 'Because they do.', highlights: ['do.'], size: 52, media: {src: 'pump/b20_chain.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 56, kind: 'text', reveal: [2, 31], text: 'Here’s exactly|how it works.', highlights: ['works.'], size: 46, media: {src: 'pump/b22_gears.jpg', type: 'img', effect: 'in'}},
  // 19 CARD
  {dur: 104, kind: 'lines', reveal: [0, 75], text: 'MIDTERMS: NOV 3|21 DAYS', highlights: ['21'], media: {src: 'pump/b24_calendar.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 73, kind: 'text', reveal: [2, 22], text: 'Diesel is|on every ballot.', highlights: ['ballot.'], size: 44, media: {src: 'pump/b23_ballot.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 168, kind: 'text', reveal: [2, 68, 128], text: 'Every refinery hit|shows at a US pump|within a fortnight.', highlights: ['pump'], size: 40, media: {src: 'pump/b27_pumpdigits.jpg', type: 'img', effect: 'in'}},
  // 22 RED impact (mid-tail thesis)
  {dur: 138, kind: 'impact', text: 'Washington isn’t|managing a war.|It’s managing a price.', redBg: true},
  // 23
  {dur: 156, kind: 'text', reveal: [2, 90, 131], enter: 'slideR', text: 'Russia’s weakest point|is the same as America’s:|the pump.', highlights: ['pump.'], size: 40, media: {src: 'pump/b26_pump.mp4', type: 'video', effect: 'in'}},
  // 24
  {dur: 125, kind: 'text', reveal: [2, 44, 99], text: 'It hurts Putin,|and Trump’s polling,|the same week.', highlights: ['putin,'], size: 40, media: {src: 'pump/b11_oilchart.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 154, kind: 'text', reveal: [2, 66, 98], text: 'The ask isn’t “stop fighting.”|It’s “stop fighting|the way that costs us money.”', highlights: ['money.'], size: 38, media: {src: 'pump/b30_money.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 128, kind: 'text', reveal: [2, 54], text: 'Three weeks before an election,|that’s the only ask that counts.', highlights: ['counts.'], size: 38, media: {src: 'pump/b12_gasprice.jpg', type: 'img', effect: 'in'}},
  // 27 CTA
  {dur: 66, kind: 'text', reveal: [2, 37], enter: 'zoom', text: 'Should Ukraine stop?|Tell me below.', highlights: ['stop?'], size: 44, media: {src: 'pump/b29_refinerydawn.jpg', type: 'img', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 668, src: 'media/sfx_impact.mp3', vol: 0.45}, // stop-the-strikes card
  {at: 752, src: 'media/sfx_whoosh.mp3', vol: 0.35}, // into black
  {at: 1247, src: 'media/sfx_impact.mp3', vol: 0.48}, // banned/Brent/record card
  {at: 1397, src: 'media/sfx_whoosh.mp3', vol: 0.35}, // into black
  {at: 1598, src: 'media/sfx_impact.mp3', vol: 0.48}, // threat card
  {at: 1853, src: 'media/sfx_impact.mp3', vol: 0.45}, // midterms card
  {at: 2198, src: 'media/sfx_impact.mp3', vol: 0.55}, // red thesis
  {at: 2899, src: 'media/sfx_whoosh.mp3', vol: 0.4}, // CTA
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The pump</span>
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
export const PumpReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('pump/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('pump/music.mp3')}
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
