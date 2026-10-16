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
// "The metric" reel (MetricReel) — fast NEWS reel, Hard Ledger house format.
// TOPIC: why Netflix fired the content chief behind its biggest hits the day after its biggest layoff.
// Thesis: Wed Netflix cut ~1,000 jobs (6%, its largest layoff); Thu its chief content officer Bela
// Bajaria (~10 yrs) is out, replaced by Peter Rice (ex-Disney/Fox). Her slate WAS the hits (Squid Game,
// Bridgerton, Wednesday, the live-sport push into WWE/NFL) and by the old metric — subscribers — she won
// the streaming war. But the metric changed: total viewing HOURS rose only ~2% in H1 2026, and Netflix is
// under ~8% of US TV time while YouTube is bigger — Netflix is losing to a platform that pays nothing for
// most of its content. Because Netflix now sells ADS, advertisers pay for hours not sign-ups, so flat
// hours = a flat ad business; the job changed from "find the next hit" to "find the next hundred hours."
// The layoff and the new chief are the same decision: it retired the metric she was hired for. Full
// QUESTION/STORY/ANSWER/CTA with a ~1.1s post-hook pause; close is the CTA as the house rhetorical
// question ("How many hours a week do you actually watch Netflix?"). 40 beats: 34 media (incl. 3 cards:
// WED -1,000 JOBS / THU CONTENT CHIEF OUT; SQUID GAME / BRIDGERTON / NFL / WWE; ENGAGEMENT +2% / NETFLIX
// <8% OF ALL TV TIME) / 1 red impact ("It retired the metric she was hired for.") mid-tail / 2 black.
// Captions match the VO verbatim (except the stylized number cards). Durations / reveals / SFX locked to
// the VO via a scribe_v1 word-timestamp anchor pass (public/metric/voiceover.mp3, ~107s incl. the pause).
// NB: OWN distinct footage under public/metric/, NO reuse of any other reel's clips.
// FOOTAGE is strictly BRAND-FREE and FACE-FREE — this names Netflix, YouTube, Disney, HBO, WWE, NFL and
// real people, so every asset is generic: unbranded TV/streaming screens, remotes, empty offices / moving
// boxes, clapperboards / film reels, generic stadiums (no league/team marks), charts, old TV sets, phones
// with NO app UI, library shelves. NO service/show/league/network logos or UI (no Netflix/YouTube/Disney/
// HBO/WWE/NFL marks, no show stills), NO identifiable faces (no Bajaria/Rice likeness), NO foreign text.
// **UNVERIFIED — names real companies/people and asserts specific figures/dates; render as written but
// FACT-CHECK before publishing:** the ~1,000-job / 6% layoff and its timing; Bela Bajaria's departure and
// tenure; Peter Rice (ex-Disney/Fox) starting "the 26th"; the Squid Game/Bridgerton/Wednesday/WWE/NFL
// slate; the "~2% H1 2026 viewing-hours" and "<8% of US TV time / YouTube bigger" figures; and the ad-
// business framing. The "retired the metric / competing with everything" framing is editorial analysis.
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK (held through ~1.1s post-hook pause)
  {dur: 240, kind: 'hook', reveal: [3, 60, 120], text: 'Why did Netflix fire the executive|behind Squid Game and Bridgerton|the day after its biggest layoff ever?', kicker: 'The metric', highlights: ['layoff'], size: 30, media: {src: 'metric/m00_screen.mp4', type: 'video', effect: 'in'}},
  // 1
  {dur: 98, kind: 'text', reveal: [2, 50], text: 'Wednesday: Netflix cuts|about a thousand jobs.', highlights: ['thousand'], size: 38, media: {src: 'metric/m01_boxes.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 47, kind: 'text', reveal: [2, 24], text: 'Six percent|of the company.', highlights: ['Six'], size: 46, media: {src: 'metric/m02_chart.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 34, kind: 'text', reveal: [2, 16], text: 'Its largest|layoff.', highlights: ['largest'], size: 52, media: {src: 'metric/m03_emptydesk.jpg', type: 'img', effect: 'in'}},
  // 4 CARD 1
  {dur: 74, kind: 'lines', reveal: [0, 40], text: 'WED: −1,000 JOBS|THU: CONTENT CHIEF OUT', highlights: ['out'], media: {src: 'metric/m04_office.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 78, kind: 'text', reveal: [2, 44], text: 'nearly ten years at the company,|is out.', highlights: ['out.'], size: 36, media: {src: 'metric/m05_emptychair.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 112, kind: 'text', reveal: [2, 58], text: 'Peter Rice, ex-Disney and Fox,|starts on the 26th.', highlights: ['26th.'], size: 34, media: {src: 'metric/m06_newoffice.jpg', type: 'img', effect: 'in'}},
  // 7 BLACK
  {dur: 85, kind: 'text', reveal: [0, 0], text: 'But there’s one thing|most people overlook.', highlights: ['overlook.'], size: 46},
  // 8
  {dur: 44, kind: 'text', reveal: [2, 22], text: 'Her slate|was the hits.', highlights: ['hits.'], size: 48, media: {src: 'metric/m08_clapper.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 69, kind: 'text', reveal: [2, 36], text: 'Squid Game.|Bridgerton. Wednesday.', highlights: ['Squid'], size: 42, media: {src: 'metric/m09_filmset.mp4', type: 'video', effect: 'in'}},
  // 10
  {dur: 136, kind: 'text', reveal: [2, 70], text: 'The push into live sport,|WWE, the NFL.', highlights: ['NFL.'], size: 38, media: {src: 'metric/m10_stadium.jpg', type: 'img', effect: 'in'}},
  // 11 CARD 2
  {dur: 67, kind: 'lines', reveal: [0, 22, 44, 66], text: 'SQUID GAME|BRIDGERTON|NFL|WWE', highlights: ['nfl'], media: {src: 'metric/m11_trophy.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 64, kind: 'text', reveal: [2, 32], text: 'Netflix won the|streaming war outright.', highlights: ['outright.'], size: 40, media: {src: 'metric/m12_number1.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 63, kind: 'text', reveal: [2, 32], text: 'Her tenure is|the one that won it.', highlights: ['tenure'], size: 42, media: {src: 'metric/m13_timeline.jpg', type: 'img', effect: 'in'}},
  // 14 BLACK
  {dur: 46, kind: 'text', reveal: [0, 0], text: 'And this is where|things get interesting.', highlights: ['interesting.'], size: 46},
  // 15
  {dur: 27, kind: 'text', reveal: [2, 14], text: 'The measure|changed.', highlights: ['changed.'], size: 52, media: {src: 'metric/m15_gauge.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 98, kind: 'text', reveal: [2, 50], text: 'Total viewing hours on Netflix|rose two percent', highlights: ['two'], size: 36, media: {src: 'metric/m16_flatchart.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 64, kind: 'text', reveal: [2, 32], text: 'in the first half|of 2026.', highlights: ['2026.'], size: 44, media: {src: 'metric/m17_calendar.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 25, kind: 'text', reveal: [2], text: 'Two.', highlights: ['Two.'], size: 72, media: {src: 'metric/m18_two.jpg', type: 'img', effect: 'in'}},
  // 19 CARD 3
  {dur: 112, kind: 'lines', reveal: [0, 28, 50], text: 'ENGAGEMENT: +2%|NETFLIX: <8%|OF ALL TV TIME', highlights: ['+2%'], media: {src: 'metric/m19_tvdata.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 52, kind: 'text', reveal: [2, 26], text: 'is under|eight percent.', highlights: ['eight'], size: 44, media: {src: 'metric/m20_slice.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 52, kind: 'text', reveal: [2, 26], text: 'YouTube’s|is bigger.', highlights: ['bigger.'], size: 50, media: {src: 'metric/m21_phonefeed.mp4', type: 'video', effect: 'in'}},
  // 22
  {dur: 82, kind: 'text', reveal: [2, 44], text: 'Netflix isn’t losing to|Disney or HBO any more.', highlights: ['HBO'], size: 36, media: {src: 'metric/m22_tvs.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 97, kind: 'text', reveal: [2, 36, 72], text: 'It’s losing to a platform|that pays nothing|for most of its content.', highlights: ['nothing'], size: 34, media: {src: 'metric/m23_creators.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 80, kind: 'text', reveal: [2, 40], text: 'Now let me show|how to actually do this.', highlights: ['actually'], size: 42, media: {src: 'metric/m24_whiteboard.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 134, kind: 'text', reveal: [2, 68], enter: 'slideL', text: 'Subscribers pay once a month,|whether they watch or not.', highlights: ['month,'], size: 34, media: {src: 'metric/m25_cardswipe.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 47, kind: 'text', reveal: [2, 24], text: 'But Netflix now|sells advertising,', highlights: ['advertising,'], size: 40, media: {src: 'metric/m26_adbreak.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 75, kind: 'text', reveal: [2, 40], text: 'and advertisers pay for hours,|not sign-ups.', highlights: ['hours,'], size: 36, media: {src: 'metric/m27_clockmoney.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 94, kind: 'text', reveal: [2, 48], text: 'Flat hours means|a flat ad business.', highlights: ['Flat'], size: 42, media: {src: 'metric/m28_flatline.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 40, kind: 'text', reveal: [2, 20], text: 'So the job|description changed:', highlights: ['changed:'], size: 44, media: {src: 'metric/m29_jobad.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 112, kind: 'text', reveal: [2, 58], text: 'not “find the next hit,”|but “find the next hundred hours.”', highlights: ['hundred'], size: 32, media: {src: 'metric/m30_shelves.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 112, kind: 'text', reveal: [2, 58], text: 'A thousand jobs cut and a new|content chief are the same decision.', highlights: ['same'], size: 30, media: {src: 'metric/m31_boxeschair.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 41, kind: 'text', reveal: [2, 20], text: 'Netflix didn’t fire|a hit-maker.', highlights: ['hit-maker.'], size: 44, media: {src: 'metric/m32_directorchair.jpg', type: 'img', effect: 'in'}},
  // 33 RED impact (thesis)
  {dur: 65, kind: 'impact', text: 'It retired the metric|she was hired for.', redBg: true},
  // 34
  {dur: 67, kind: 'text', reveal: [2, 34], text: 'Subscribers|are won.', highlights: ['won.'], size: 48, media: {src: 'metric/m34_check.jpg', type: 'img', effect: 'in'}},
  // 35
  {dur: 139, kind: 'text', reveal: [2, 46, 92], text: 'Hours are the fight now, and|the opponent is a video site|that costs nothing to fill.', highlights: ['fight'], size: 32, media: {src: 'metric/m35_scroll.mp4', type: 'video', effect: 'in'}},
  // 36
  {dur: 77, kind: 'text', reveal: [2, 40], enter: 'slideR', text: 'The person who built the catalogue|was replaced by someone', highlights: ['catalogue'], size: 32, media: {src: 'metric/m36_library.jpg', type: 'img', effect: 'in'}},
  // 37
  {dur: 61, kind: 'text', reveal: [2, 32], text: 'from the business that|used to be television.', highlights: ['television.'], size: 38, media: {src: 'metric/m37_oldtv.jpg', type: 'img', effect: 'in'}},
  // 38
  {dur: 92, kind: 'text', reveal: [2, 48], text: 'Because that’s what Netflix|is competing with: everything.', highlights: ['everything.'], size: 34, media: {src: 'metric/m38_screenwall.jpg', type: 'img', effect: 'in'}},
  // 39 CTA (question close)
  {dur: 120, kind: 'text', reveal: [2, 52], enter: 'zoom', text: 'How many hours a week do you|actually watch Netflix?', highlights: ['hours'], size: 34, media: {src: 'metric/m39_watching.mp4', type: 'video', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 240, src: 'media/sfx_whoosh.mp3', vol: 0.35}, // hook -> Wednesday
  {at: 419, src: 'media/sfx_impact.mp3', vol: 0.46}, // CARD 1
  {at: 683, src: 'media/sfx_whoosh.mp3', vol: 0.35}, // into black
  {at: 1017, src: 'media/sfx_impact.mp3', vol: 0.46}, // CARD 2
  {at: 1211, src: 'media/sfx_whoosh.mp3', vol: 0.35}, // into black
  {at: 1471, src: 'media/sfx_impact.mp3', vol: 0.46}, // CARD 3
  {at: 2079, src: 'media/sfx_chaching.mp3', vol: 0.4}, // sells advertising
  {at: 2599, src: 'media/sfx_impact.mp3', vol: 0.55}, // red thesis (retired the metric)
  {at: 3101, src: 'media/sfx_whoosh.mp3', vol: 0.4}, // close
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The metric</span>
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
export const MetricReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('metric/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('metric/music.mp3')}
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
