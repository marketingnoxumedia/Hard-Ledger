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
// "The outage" reel (OutageReel) — fast TECHNOLOGY / BUSINESS news reel, Hard Ledger house VISUAL format.
// TOPIC: MICROSOFT went down WORLDWIDE, revealing a major technology-dependence RISK. On November 12 a widespread
// disruption hit Microsoft 365, Outlook, Teams, SharePoint, OneDrive and Copilot; users across many countries lost access
// to essential services. Downdetector logged NEARLY 130,000 Outlook reports at the peak, with organizations in Australia,
// Japan and other regions affected. Microsoft struggled to restore servers — some systems brought back online went
// unresponsive again once traffic returned, so even recovery wasn't working as expected. The impact went beyond email:
// schools couldn't hold online classes, businesses struggled with operations, government services were disrupted, and even
// integrations used by AI companies (named in the script as OpenAI and Anthropic) were affected. Microsoft said there was
// NO indication of a cyberattack; its investigation pointed to server/infrastructure problems — a process responsible for
// establishing secure connections became overwhelmed. Debate: if one company can disrupt so much of the world's digital
// infrastructure, are businesses too dependent on Microsoft, and should they keep backup systems ready?
// NOTE ON VOICE: built VERBATIM from a client-supplied script in the influencer "curiosity-gap" format, NOT the faceless
// house voice — it uses an EARLY "follow for more" CTA and CLOSES on the debate question "...backup systems ready?".
// Per the saved house preference, captions are <=5-6 words/beat with LARGER on-screen type (Anton 42-52). 57 beats. 1 stat
// card: NEARLY 130,000 OUTLOOK REPORTS (the one hard figure the script states; the date Nov 12 stays in-caption). 1 red
// impact at the ESCALATION pivot ("Weren't working / as expected." — the failed recovery), no black beat. Captions match
// the VO verbatim (all product and company names stay in-caption). Durations/reveals/SFX locked to the VO via a scribe_v1
// word-timestamp anchor pass (public/outage/voiceover.mp3). Built at the house +10% pacing default; its own tense
// tech-failure/infrastructure music mixed at 0.2. OWN distinct footage under public/outage/ (56 stills), NO reuse —
// ledger-checked.
// FOOTAGE is strictly BRAND-FREE and FACE-FREE — NO Microsoft / Outlook / Teams / SharePoint / OneDrive / Copilot / Office
// / OpenAI / Anthropic / Downdetector or ANY company logo or wordmark, NO product UI, NO readable error / sign / screen /
// headline text, NO national flag (Australia / Japan stay verbal), NO identifiable real face. Metaphor-led outage /
// infrastructure b-roll only: a dark server room / blinking data-center aisles going dark, tangled or severed cables, a
// generic "no signal" / spinning-loader / blank-screen motif (NO readable text), an empty office at night, a laptop with a
// dark screen, a world/map or network of lights going dark for the global spread, a broken chain / a snapped link for the
// dependence, a power switch / a tripped breaker, a padlock / a secure-connection handshake motif for the secure-connection
// process, surveillance-free; a blank-screen phone for the FOLLOW CTA, a question mark and a backup drive / a safety net for
// the close.
// **UNVERIFIED AND TIME-SENSITIVE — describes a specific real event (a Microsoft worldwide outage dated November 12) with
// specific claims (services affected, ~130,000 Downdetector reports, countries hit, named AI companies OpenAI and
// Anthropic affected, no cyberattack, a secure-connection process overwhelmed). Rendered VERBATIM as supplied. Every claim,
// the figure, the date and the company/service names MUST be fact-checked against primary sources (Microsoft's official
// status/incident reports, Downdetector, reputable coverage) before publishing. This is general technology news, NOT a
// security advisory.**
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 70, kind: 'hook', reveal: [3, 40], text: 'Imagine waking up|and discovering', kicker: 'The outage', highlights: [], size: 52, media: {src: 'outage/og00_waking.jpg', type: 'img', effect: 'in'}},
  // 1
  {dur: 70, kind: 'text', reveal: [2], text: 'you can’t access your emails,', highlights: ['emails,'], size: 46, pos: 'upperRight', media: {src: 'outage/og01_emails.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 70, kind: 'text', reveal: [2], text: 'join a work meeting,', highlights: [], size: 50, pos: 'left', media: {src: 'outage/og02_meeting.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 70, kind: 'text', reveal: [2], text: 'or even use the tools', highlights: [], size: 46, pos: 'lowerRight', media: {src: 'outage/og03_tools.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 70, kind: 'text', reveal: [2], text: 'your company depends on.', highlights: ['depends'], size: 50, pos: 'upperLeft', media: {src: 'outage/og04_depends.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 70, kind: 'text', reveal: [2], text: 'That’s exactly what happened', highlights: [], size: 50, pos: 'right', media: {src: 'outage/og05_happened.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'during Microsoft’s|massive global outage.', highlights: ['outage.'], size: 48, pos: 'lower', media: {src: 'outage/og06_outage.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 70, kind: 'text', reveal: [2], text: 'And the surprising part?', highlights: ['surprising'], size: 50, pos: 'lowerLeft', media: {src: 'outage/og07_surprising.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'This wasn’t just|an Outlook problem.', highlights: ['Outlook'], size: 44, pos: 'upperRight', media: {src: 'outage/og08_outlook.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 70, kind: 'text', reveal: [2], text: 'The disruption spread', highlights: ['disruption'], size: 52, pos: 'left', media: {src: 'outage/og09_spread.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 70, kind: 'text', reveal: [2], text: 'across services used by', highlights: [], size: 50, pos: 'right', media: {src: 'outage/og10_services.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 70, kind: 'text', reveal: [2], text: 'businesses, schools, governments,', highlights: ['governments,'], size: 52, pos: 'upperLeft', media: {src: 'outage/og11_sectors.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 70, kind: 'text', reveal: [2], text: 'and even other AI companies.', highlights: ['AI'], size: 46, pos: 'lowerRight', media: {src: 'outage/og12_aicompanies.jpg', type: 'img', effect: 'in'}},
  // 13 FOLLOW
  {dur: 70, kind: 'text', reveal: [2], text: 'Follow for more technology|and business news.', highlights: ['follow'], size: 44, pos: 'upper', media: {src: 'outage/og13_follow.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 70, kind: 'text', reveal: [2], text: 'On November 12,', highlights: ['November'], size: 52, pos: 'left', media: {src: 'outage/og14_nov12.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 70, kind: 'text', reveal: [2], text: 'Microsoft experienced', highlights: [], size: 52, pos: 'right', media: {src: 'outage/og15_experienced.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 70, kind: 'text', reveal: [2], text: 'a widespread disruption', highlights: ['widespread'], size: 52, pos: 'lowerLeft', media: {src: 'outage/og16_widespread.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 70, kind: 'text', reveal: [2], text: 'affecting Microsoft 365, Outlook,', highlights: ['365,'], size: 50, pos: 'upperRight', media: {src: 'outage/og17_365.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Teams, SharePoint, OneDrive,|and Copilot.', highlights: ['Copilot.'], size: 48, pos: 'left', media: {src: 'outage/og18_copilot.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Users across|multiple countries', highlights: ['countries'], size: 50, pos: 'lowerRight', media: {src: 'outage/og19_countries.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 70, kind: 'text', reveal: [2], text: 'reported problems accessing', highlights: ['problems'], size: 52, pos: 'upperLeft', media: {src: 'outage/og20_accessing.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 70, kind: 'text', reveal: [2], text: 'essential services.', highlights: ['essential'], size: 52, pos: 'right', media: {src: 'outage/og21_essential.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 70, kind: 'text', reveal: [2], text: 'Downdetector recorded', highlights: ['Downdetector'], size: 52, pos: 'lower', media: {src: 'outage/og22_downdetector.jpg', type: 'img', effect: 'in'}},
  // 23 CARD
  {dur: 70, kind: 'stat', stat: {pre: 'NEARLY', value: 130000, post: 'OUTLOOK REPORTS'}, media: {src: 'outage/og23_card130k.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'of Outlook problems|at the peak.', highlights: ['peak.'], size: 44, pos: 'upperRight', media: {src: 'outage/og24_peak.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 70, kind: 'text', reveal: [2], text: 'The disruption also affected', highlights: [], size: 50, pos: 'lowerLeft', media: {src: 'outage/og25_alsoaffected.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 70, kind: 'text', reveal: [2], text: 'organizations in Australia,', highlights: ['Australia,'], size: 52, pos: 'left', media: {src: 'outage/og26_australia.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 70, kind: 'text', reveal: [2], text: 'Japan, and other regions.', highlights: ['Japan,'], size: 50, pos: 'right', media: {src: 'outage/og27_japan.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 70, kind: 'text', reveal: [2], text: 'Microsoft initially struggled', highlights: ['struggled'], size: 52, pos: 'lowerRight', media: {src: 'outage/og28_struggled.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 70, kind: 'text', reveal: [2], text: 'to restore its servers.', highlights: ['servers.'], size: 50, pos: 'upperLeft', media: {src: 'outage/og29_servers.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Some systems that were|brought back online', highlights: [], size: 44, pos: 'right', media: {src: 'outage/og30_backonline.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 70, kind: 'text', reveal: [2], text: 'became unresponsive again', highlights: ['unresponsive'], size: 52, pos: 'upperRight', media: {src: 'outage/og31_unresponsive.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 70, kind: 'text', reveal: [2], text: 'once traffic returned.', highlights: ['traffic'], size: 52, pos: 'left', media: {src: 'outage/og32_traffic.jpg', type: 'img', effect: 'in'}},
  // 33
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'That meant even|its recovery efforts', highlights: ['recovery'], size: 44, pos: 'lowerLeft', media: {src: 'outage/og33_recovery.jpg', type: 'img', effect: 'in'}},
  // 34 RED
  {dur: 70, kind: 'impact', redBg: true, text: 'Weren’t working|as expected.'},
  // 35
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'The impact went beyond|missed emails.', highlights: ['beyond'], size: 44, pos: 'upper', media: {src: 'outage/og35_beyond.jpg', type: 'img', effect: 'in'}},
  // 36
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Some schools couldn’t|hold online classes,', highlights: ['schools'], size: 44, pos: 'right', media: {src: 'outage/og36_schools.jpg', type: 'img', effect: 'in'}},
  // 37
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'businesses struggled|with operations,', highlights: ['operations,'], size: 50, pos: 'lowerRight', media: {src: 'outage/og37_operations.jpg', type: 'img', effect: 'in'}},
  // 38
  {dur: 70, kind: 'text', reveal: [2], text: 'and government services', highlights: [], size: 52, pos: 'upperLeft', media: {src: 'outage/og38_govservices.jpg', type: 'img', effect: 'in'}},
  // 39
  {dur: 70, kind: 'text', reveal: [2], text: 'experienced disruptions.', highlights: ['disruptions.'], size: 52, pos: 'left', media: {src: 'outage/og39_disruptions.jpg', type: 'img', effect: 'in'}},
  // 40
  {dur: 70, kind: 'text', reveal: [2], text: 'Even integrations used by', highlights: [], size: 50, pos: 'lowerRight', media: {src: 'outage/og40_integrations.jpg', type: 'img', effect: 'in'}},
  // 41
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'AI companies like|OpenAI and Anthropic', highlights: ['OpenAI'], size: 44, pos: 'upperRight', media: {src: 'outage/og41_aicos.jpg', type: 'img', effect: 'in'}},
  // 42
  {dur: 70, kind: 'text', reveal: [2], text: 'were affected.', highlights: ['affected.'], size: 52, pos: 'right', media: {src: 'outage/og42_affected.jpg', type: 'img', effect: 'in'}},
  // 43
  {dur: 70, kind: 'text', reveal: [2], text: 'Microsoft said there was', highlights: [], size: 50, pos: 'lowerLeft', media: {src: 'outage/og43_saidthere.jpg', type: 'img', effect: 'in'}},
  // 44
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'no indication|of a cyberattack.', highlights: ['cyberattack.'], size: 48, pos: 'left', media: {src: 'outage/og44_cyberattack.jpg', type: 'img', effect: 'in'}},
  // 45
  {dur: 70, kind: 'text', reveal: [2], text: 'Its investigation pointed to', highlights: ['investigation'], size: 50, pos: 'upperRight', media: {src: 'outage/og45_investigation.jpg', type: 'img', effect: 'in'}},
  // 46
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'server and|infrastructure problems,', highlights: ['infrastructure'], size: 50, pos: 'lower', media: {src: 'outage/og46_infra.jpg', type: 'img', effect: 'in'}},
  // 47
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'including a process|responsible for', highlights: [], size: 48, pos: 'right', media: {src: 'outage/og47_process.jpg', type: 'img', effect: 'in'}},
  // 48
  {dur: 70, kind: 'text', reveal: [2], text: 'establishing secure connections', highlights: ['secure'], size: 52, pos: 'upperLeft', media: {src: 'outage/og48_secure.jpg', type: 'img', effect: 'in'}},
  // 49
  {dur: 70, kind: 'text', reveal: [2], text: 'becoming overwhelmed.', highlights: ['overwhelmed.'], size: 52, pos: 'lowerRight', media: {src: 'outage/og49_overwhelmed.jpg', type: 'img', effect: 'in'}},
  // 50
  {dur: 70, kind: 'text', reveal: [2], text: 'Here’s the bigger question:', highlights: ['question:'], size: 50, pos: 'left', media: {src: 'outage/og50_question.jpg', type: 'img', effect: 'in'}},
  // 51
  {dur: 70, kind: 'text', reveal: [2], text: 'if one technology company', highlights: ['one'], size: 50, pos: 'upperRight', media: {src: 'outage/og51_onecompany.jpg', type: 'img', effect: 'in'}},
  // 52
  {dur: 70, kind: 'text', reveal: [2], text: 'can disrupt so much', highlights: ['disrupt'], size: 50, pos: 'right', media: {src: 'outage/og52_disruptmuch.jpg', type: 'img', effect: 'in'}},
  // 53
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'of the world’s|digital infrastructure,', highlights: ['digital'], size: 48, pos: 'lowerLeft', media: {src: 'outage/og53_digitalinfra.jpg', type: 'img', effect: 'in'}},
  // 54
  {dur: 70, kind: 'text', reveal: [2], text: 'are businesses becoming', highlights: [], size: 52, pos: 'upperLeft', media: {src: 'outage/og54_becoming.jpg', type: 'img', effect: 'in'}},
  // 55
  {dur: 70, kind: 'text', reveal: [2], text: 'too dependent on Microsoft?', highlights: ['dependent'], size: 50, pos: 'right', media: {src: 'outage/og55_dependent.jpg', type: 'img', effect: 'in'}},
  // 56 CTA
  {dur: 70, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Should companies have|backup systems ready?', highlights: ['backup'], size: 46, media: {src: 'outage/og56_backup.jpg', type: 'img', effect: 'in'}},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The outage</span>
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
export const OutageReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('outage/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('outage/music.mp3')}
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
