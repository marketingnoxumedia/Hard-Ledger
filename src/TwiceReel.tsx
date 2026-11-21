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
// "The bill" reel (TwiceReel) — fast NEWS reel, Hard Ledger house format.
// NEW topic: the COST of reopening the Brexit vote. Thesis: whatever Russia did, the LEDGER
// doesn't care — Britain has paid ten years for one vote, and reopening it means being asked to
// PAY TWICE; the only question is whether the bill is worth it. Monday: Andy Burnham (MAYOR OF
// GREATER MANCHESTER — corrected from the client's draft, which called him PM) says on the record
// that Russia interfered in the 2016 Brexit vote (he asked when he took office in July; the answer,
// he says, was yes; he gave no evidence). In 2020 Parliament's intelligence committee found the
// government never assessed Russian interference (Boris Johnson said there was no evidence; nobody
// looked). Burnham has said he could campaign to rejoin the EU and wouldn't rule out doing it
// without another referendum; the 2016 vote was 17.4m for Leave, the largest vote in British
// history. The OBR puts Brexit's long-run cost near -4% of GDP with trade ~15% lower; rejoining
// doesn't refund that — it restarts the clock on a decade of adjustment. Full QUESTION/STORY/
// ANSWER/CTA (VERBATIM except Burnham's title: PM -> Mayor of Greater Manchester, at the client's
// direction) with a ~1.1s post-hook pause; close is the supplied CTA QUESTION ("Would you vote
// again? Tell me below."). Sped VO (atempo ~1.11) — total ~2886 frames = ~96s (final CTA beat
// extended for a clean tail). 29 beats: 26 media (incl. video b-roll + 3 cards: 2020 "NEVER
// ASSESSED" / 2026 "ASKED. YES."; 17,400,000 VOTES FOR LEAVE / BRITAIN'S BIGGEST; OBR -4% GDP /
// TRADE -15%) / 1 red impact ("Going back is a country asked to pay twice.") / 2 black ("Here's the
// piece you're missing." + "This is the part that makes it work.").
// NB: OWN distinct footage under public/twice/, NO reuse of any other reel's clips.
// PEOPLE/FIGURES/CLAIMS are editorial (VO + text only); FOOTAGE is strictly BRAND-FREE, FACE-FREE
// AND FLAG-FREE -- generic ballots / documents / economics b-roll, NO real politicians (no Burnham/
// Johnson), NO party logos, NO Union/EU/Russian or any national flag, NO EU ring of stars, NO UK
// government crest / royal arms, NO identifiable landmark (no Big Ben / Parliament / Downing St /
// Brussels), NO readable brand text, NO banknote portrait faces, NO human faces. Own footage public/twice/.
// **SENSITIVE / UNVERIFIED -- verify before publishing:** this names living individuals (Andy
// Burnham, Boris Johnson) and renders a CONTESTED claim (that Russia interfered in the 2016 Brexit
// vote, attributed to Burnham "on the record", with no evidence published), plus the 2020 ISC
// finding, a 17.4m Leave figure, OBR -4%-GDP / -15%-trade estimates, and Burnham's rejoin/
// referendum remarks. Burnham is the Mayor of Greater Manchester, NOT the Prime Minister (draft
// corrected). All author-supplied; confirm every attribution, quote and figure against primary
// sources, and legal/defamation-check the named claims, before this publishes.
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK (held through ~1.1s post-hook pause)
  {dur: 262, kind: 'hook', reveal: [2, 40, 92], text: 'What does it cost|to reopen a decision|17 million already made?', kicker: 'The bill', highlights: ['17'], size: 40, media: {src: 'twice/b00_ballotbox.mp4', type: 'video', effect: 'in'}},
  // 1
  {dur: 140, kind: 'text', reveal: [2, 52, 100], text: 'Andy Burnham, Mayor|of Greater Manchester,|says it on the record.', highlights: ['record.'], size: 40, media: {src: 'twice/b01_podium.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 92, kind: 'text', reveal: [2, 46], enter: 'slideL', text: 'Russia interfered in|the 2016 Brexit vote.', highlights: ['interfered'], size: 42, media: {src: 'twice/b02_cyber.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 71, kind: 'text', reveal: [2, 42], text: 'He asked when he|took office in July.', highlights: ['july.'], size: 42, media: {src: 'twice/b03_calendar.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 119, kind: 'text', reveal: [2, 56], text: 'The answer, he says: yes.|He gave no evidence.', highlights: ['evidence.'], size: 42, media: {src: 'twice/b04_redacted.jpg', type: 'img', effect: 'in'}},
  // 5 BLACK
  {dur: 86, kind: 'text', reveal: [0, 0], text: "Here's the piece|you're missing.", highlights: ['missing.'], size: 50},
  // 6
  {dur: 66, kind: 'text', reveal: [2, 42], text: '2020: an intelligence|committee reported.', highlights: ['2020:'], size: 42, media: {src: 'twice/b06_dossier.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 95, kind: 'text', reveal: [2, 48], text: 'The government never assessed|Russian interference.', highlights: ['never'], size: 40, media: {src: 'twice/b07_emptydesk.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 82, kind: 'text', reveal: [2, 44], text: 'Boris Johnson said|there was no evidence.', highlights: ['johnson'], size: 42, media: {src: 'twice/b08_press.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 108, kind: 'text', reveal: [2, 48], enter: 'slideR', text: 'Nobody looked.|Now someone says they did.', highlights: ['nobody'], size: 42, media: {src: 'twice/b09_magnifier.jpg', type: 'img', effect: 'in'}},
  // 10 CARD
  {dur: 57, kind: 'lines', text: '2020: “NEVER ASSESSED”|2026: “ASKED. YES.”', highlights: ['2026:'], reveal: [0, 30], media: {src: 'twice/b10_archive.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 128, kind: 'text', reveal: [0, 0], text: 'And this is where|it gets interesting.', highlights: ['interesting.'], size: 44, media: {src: 'twice/b11_crossroads.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 106, kind: 'text', reveal: [2, 48], text: 'Burnham says he could|campaign to rejoin the EU.', highlights: ['rejoin'], size: 40, media: {src: 'twice/b12_europemap.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 89, kind: 'text', reveal: [2, 44], text: 'And maybe without|another referendum.', highlights: ['referendum.'], size: 42, media: {src: 'twice/b13_ballotpaper.jpg', type: 'img', effect: 'in'}},
  // 14 CARD
  {dur: 92, kind: 'lines', text: '17,400,000|VOTES FOR LEAVE|BRITAIN’S BIGGEST', highlights: ['17,400,000'], reveal: [0, 26, 58], media: {src: 'twice/b14_polling.mp4', type: 'video', effect: 'in'}},
  // 15
  {dur: 89, kind: 'text', reveal: [2, 46], text: 'The largest vote for|anything in British history.', highlights: ['largest'], size: 40, media: {src: 'twice/b15_ballots.jpg', type: 'img', effect: 'in'}},
  // 16 BLACK
  {dur: 77, kind: 'text', reveal: [0, 0], text: 'This is the part|that makes it work.', highlights: ['work.'], size: 48},
  // 17
  {dur: 69, kind: 'text', reveal: [2, 42], text: 'The Office for|Budget Responsibility:', highlights: ['budget'], size: 42, media: {src: 'twice/b17_govbuilding.jpg', type: 'img', effect: 'in'}},
  // 18 CARD
  {dur: 118, kind: 'lines', text: 'OBR: BREXIT COST|≈ −4% OF GDP|TRADE ≈ −15%', highlights: ['−4%'], reveal: [0, 26, 58], media: {src: 'twice/b18_chartdown.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 87, kind: 'text', reveal: [2, 46], text: 'Trade about 15% lower|than it would’ve been.', highlights: ['15%'], size: 40, media: {src: 'twice/b19_port.mp4', type: 'video', effect: 'in'}},
  // 20
  {dur: 57, kind: 'text', reveal: [0, 0], text: 'Rejoining doesn’t|refund that.', highlights: ['refund'], size: 44, media: {src: 'twice/b20_coins.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 129, kind: 'text', reveal: [2, 52], enter: 'slideL', text: 'It restarts the clock|on a decade of adjustment.', highlights: ['decade'], size: 40, media: {src: 'twice/b21_clock.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 127, kind: 'text', reveal: [2, 56], text: 'Whatever Russia did or didn’t,|the ledger doesn’t care.', highlights: ['ledger'], size: 40, media: {src: 'twice/b22_ledger.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 97, kind: 'text', reveal: [2, 46], text: 'Britain has paid ten years|for one vote.', highlights: ['ten'], size: 42, media: {src: 'twice/b23_years.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 75, kind: 'text', reveal: [2, 42], enter: 'slideR', text: 'The Mayor is now|pricing a second one.', highlights: ['second'], size: 42, media: {src: 'twice/b24_pricetag.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 115, kind: 'text', reveal: [2, 48], text: 'Leaving was slow|and invisible.', highlights: ['invisible.'], size: 44, media: {src: 'twice/b25_fog.jpg', type: 'img', effect: 'in'}},
  // 26 RED impact
  {dur: 89, kind: 'impact', text: 'Going back is a country|asked to pay twice.', highlights: ['twice'], redBg: true},
  // 27
  {dur: 102, kind: 'text', reveal: [2, 44, 88], text: 'Is the bill worth it?|The interference is|just the opening argument.', highlights: ['bill'], size: 40, media: {src: 'twice/b27_gavel.jpg', type: 'img', effect: 'in'}},
  // 28 CTA
  {dur: 62, kind: 'text', reveal: [2, 40], enter: 'zoom', text: 'Would you vote again?|Tell me below.', highlights: ['vote'], size: 44, media: {src: 'twice/b28_pencilvote.jpg', type: 'img', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 494, src: 'media/sfx_impact.mp3', vol: 0.45},
  {at: 1121, src: 'media/sfx_impact.mp3', vol: 0.45},
  {at: 1178, src: 'media/sfx_whoosh.mp3', vol: 0.35},
  {at: 1501, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 1682, src: 'media/sfx_whoosh.mp3', vol: 0.35},
  {at: 1946, src: 'media/sfx_impact.mp3', vol: 0.45},
  {at: 2346, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 2633, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 2824, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The bill</span>
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
export const TwiceReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('twice/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('twice/music.mp3')}
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
