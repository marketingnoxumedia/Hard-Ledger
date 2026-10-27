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
// "Game over" reel (UniteReel) — Hard Ledger house VISUAL format, gaming-news topic.
// TOPIC: The Pokémon Company confirmed Pokémon UNITE (the free-to-play 5-on-5 MOBA, launched on Nintendo Switch
// July 2021, later on mobile) will END SERVICE on March 23, 2027, on both Switch and mobile — after that players
// can't log in or battle. The countdown has started: Aeos Gem sales suspended, new UNITE Club memberships and
// auto-renewals stopped (remaining gems/benefits usable until the end). To keep records / Pokémon / cosmetics,
// players must use an upcoming library feature and complete a data download before shutdown. Bittersweet twist:
// devs still plan special events and the Aeos Crown 2027 tournament before closing, so competitive play continues
// a little longer. Debate: did UNITE deserve more support, or is it time to move on — and your favorite memory?
// NOTE ON VOICE: built VERBATIM from a client-supplied script in the influencer "curiosity-gap" format (like
// HalfReel / HavenReel / SurvivorReel / MetaReel / SteamReel), NOT the faceless house voice — it NAMES Pokémon /
// Pokémon UNITE / Nintendo Switch / The Pokémon Company / Aeos, uses an EARLY "follow for more" CTA, and CLOSES on
// a "let us know in the comments" audience-debate CTA. The client's standing choice is "build verbatim." The red
// beat poses the would-you-rather (deserved more years vs time to move on).
// 37 beats. 1 stat card: SERVICE ENDS MARCH 23 (2027) — the shutdown date (count-up on the day, year as static
// text to avoid the year-comma bug). 1 red impact, no black beat. Captions match the VO verbatim (except the
// number card; spoken figures as numerals). Durations/reveals/SFX locked to the VO via a scribe_v1 word-timestamp
// anchor pass (public/unite/voiceover.mp3, NO inserted pause); music mixed at 0.17. Built at the house +10% pacing
// default. OWN distinct footage under public/unite/, NO reuse of any other reel's clips — ledger-checked.
// New STANDALONE reel; a gaming-news story like SteamReel but a DISTINCT topic (a game sunset, not an outage).
// Card text is editorial overlay, not footage.
// FOOTAGE is BRAND-FREE, FACE-FREE and IP-FREE despite naming Pokémon / Nintendo / UNITE / Aeos: generic esports,
// gaming-setup, server/shutdown, gems/collectible, countdown, tournament/trophy and farewell b-roll. **Screen
// HARD: NO Pokémon of any kind (no Pikachu, no creatures, NO Pokéball, no Pokémon/UNITE/Aeos logo, wordmark,
// character or game UI/screenshot); NO Nintendo Switch / Joy-Con / Nintendo logo or any recognizable console; NO
// console/controller BRAND marks; NO game title/box art/IP; NO readable game or UI text; NO other brand logos; NO
// flags; NO identifiable landmarks; NO readable foreign text; NO identifiable faces; NO military.**
// **UNVERIFIED / SENSITIVE — names real entities (The Pokémon Company, Nintendo, Pokémon UNITE) and asserts a
// specific shutdown (March 23, 2027 end-of-service on Switch + mobile; Aeos Gem sales suspended; an Aeos Crown 2027
// tournament); rendered as written but MUST be fact-checked before publishing.** The "deserved more support"
// framing is editorial analysis.
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 70, kind: 'hook', reveal: [3, 40], text: 'A Pokémon game is|officially shutting down forever,', kicker: 'Game over', highlights: ['forever,'], size: 29, media: {src: 'unite/un00_gameover.mp4', type: 'video', effect: 'in'}},
  // 1
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'and millions of fans|are about to lose', highlights: [], size: 32, media: {src: 'unite/un01_fans.jpg', type: 'img', effect: 'panL'}},
  // 2
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'one of their ways to battle|with their favorite Pokémon.', highlights: ['battle'], size: 28, media: {src: 'unite/un02_battle.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Pokémon UNITE is coming|to an end in 2027.', highlights: ['2027.'], size: 30, media: {src: 'unite/un03_end2027.jpg', type: 'img', effect: 'panR'}},
  // 4
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'But there’s one important detail|players need to know', highlights: [], size: 29, media: {src: 'unite/un04_detail.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'before the servers|go offline.', highlights: ['offline.'], size: 36, media: {src: 'unite/un05_offline.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 70, kind: 'text', reveal: [2, 40], text: 'Follow for more gaming news|and updates you don’t want to miss.', highlights: ['follow'], size: 28, media: {src: 'unite/un06_follow.jpg', type: 'img', effect: 'panL'}},
  // 7
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Pokémon UNITE launched on|Nintendo Switch in July 2021', highlights: [], size: 28, media: {src: 'unite/un07_launch.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'before arriving on|mobile later that year.', highlights: [], size: 31, media: {src: 'unite/un08_mobile.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'The free-to-play game lets players|team up and battle opponents', highlights: [], size: 27, media: {src: 'unite/un09_teamup.jpg', type: 'img', effect: 'panR'}},
  // 10
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'in fast-paced|5-on-5 matches.', highlights: ['5-on-5'], size: 34, media: {src: 'unite/un10_5v5.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'The Pokémon Company|has officially confirmed', highlights: [], size: 32, media: {src: 'unite/un11_company.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'that Pokémon UNITE|will end service', highlights: [], size: 32, media: {src: 'unite/un12_endservice.jpg', type: 'img', effect: 'panL'}},
  // 13 CARD — shutdown date
  {dur: 70, kind: 'stat', stat: {pre: 'SERVICE ENDS MARCH', value: 23, post: '2027'}, media: {src: 'unite/un13_date.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'The shutdown affects both|Nintendo Switch and mobile,', highlights: [], size: 29, media: {src: 'unite/un14_devices.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'meaning players will no longer|be able to log in', highlights: [], size: 29, media: {src: 'unite/un15_login.jpg', type: 'img', effect: 'panR'}},
  // 16
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'or participate in battles|after that date.', highlights: ['battles'], size: 32, media: {src: 'unite/un16_battles.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'And the countdown|has already started.', highlights: ['countdown'], size: 34, media: {src: 'unite/un17_countdown.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Sales of Aeos Gems|have been suspended,', highlights: ['suspended,'], size: 32, media: {src: 'unite/un18_gems.jpg', type: 'img', effect: 'panL'}},
  // 19
  {dur: 70, kind: 'text', reveal: [2, 40], text: 'and new UNITE Club memberships|and automatic renewals have also stopped.', highlights: ['stopped.'], size: 25, media: {src: 'unite/un19_stopped.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Players can still use|their remaining gems', highlights: [], size: 32, media: {src: 'unite/un20_remaining.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'and existing membership benefits|until service ends.', highlights: ['ends.'], size: 29, media: {src: 'unite/un21_benefits.jpg', type: 'img', effect: 'panR'}},
  // 22
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'But losing access to battles|isn’t the only concern.', highlights: ['concern.'], size: 29, media: {src: 'unite/un22_concern.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Players who want to preserve|certain in-game records,', highlights: [], size: 29, media: {src: 'unite/un23_records.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Pokémon, and cosmetics|will need to use', highlights: [], size: 32, media: {src: 'unite/un24_cosmetics.jpg', type: 'img', effect: 'panL'}},
  // 25
  {dur: 70, kind: 'text', reveal: [2], text: 'the upcoming library feature', highlights: ['library'], size: 32, media: {src: 'unite/un25_library.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'and complete the required data download|before the shutdown.', highlights: ['shutdown.'], size: 25, media: {src: 'unite/un26_download.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 70, kind: 'text', reveal: [2], text: 'There’s a bittersweet twist:', highlights: ['twist:'], size: 34, media: {src: 'unite/un27_twist.jpg', type: 'img', effect: 'panR'}},
  // 28
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'the developers are still planning|special events', highlights: [], size: 30, media: {src: 'unite/un28_events.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'and the Pokémon UNITE|Aeos Crown 2027 tournament', highlights: ['tournament'], size: 28, media: {src: 'unite/un29_tournament.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 70, kind: 'text', reveal: [2], text: 'before the game closes.', highlights: ['closes.'], size: 34, media: {src: 'unite/un30_closes.jpg', type: 'img', effect: 'panL'}},
  // 31
  {dur: 70, kind: 'text', reveal: [2], text: 'So even as the end approaches,', highlights: [], size: 31, media: {src: 'unite/un31_approaches.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'competitive play will continue|for a little longer.', highlights: ['longer.'], size: 30, media: {src: 'unite/un32_compete.jpg', type: 'img', effect: 'in'}},
  // 33
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'So, do you think Pokémon UNITE|deserved more years of support,', highlights: [], size: 27, media: {src: 'unite/un33_deserved.jpg', type: 'img', effect: 'panR'}},
  // 34 RED
  {dur: 70, kind: 'impact', redBg: true, text: 'or is it time|for the developers|to move on?'},
  // 35
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'And what’s your favorite|memory from the game?', highlights: ['memory'], size: 31, media: {src: 'unite/un35_memory.jpg', type: 'img', effect: 'in'}},
  // 36 CTA
  {dur: 70, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Let us know|in the comments.', highlights: ['comments.'], size: 40, media: {src: 'unite/un36_comments.jpg', type: 'img', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 416, src: 'media/sfx_whoosh.mp3', vol: 0.33},
  {at: 1285, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1376, src: 'media/sfx_impact.mp3', vol: 0.46},
  {at: 1653, src: 'media/sfx_whoosh.mp3', vol: 0.33},
  {at: 2995, src: 'media/sfx_impact.mp3', vol: 0.55},
  {at: 3076, src: 'media/sfx_whoosh.mp3', vol: 0.4},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>Game over</span>
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
export const UniteReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('unite/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('unite/music.mp3')}
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
