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
// "The tax" reel (ForgivenReel) — fast NEWS reel, Hard Ledger house format.
// NEW topic: how a student-loan borrower can owe ~$12,000 in tax on debt they never received.
// Thesis: last year's "One Big Beautiful Bill" let a tax exemption expire, so FORGIVEN student debt
// now counts as income again -- forgive $100K and the IRS treats it like $100K earned; one group
// estimates ~3M borrowers could face a ~$12K tax bill on debt they'll never see. Meanwhile the
// Education Dept cut staff and servicer oversight, borrowers got false delinquency notices, and the
// system that decides the tax can't process the paperwork. The fix is now a line item in a budget
// negotiation decided by the 3 Nov midterms (a Democratic Congress can't repeal the bill -- Trump
// holds the veto -- but the budget has to pass, and the tax-free-forgiveness fix is the kind of
// concession that gets attached). Full QUESTION/STORY/ANSWER/CTA with a ~1.1s post-hook pause; close
// is the supplied CTA QUESTION ("Did you know forgiveness is taxable? Tell me below."). 33 beats:
// 30 media (incl. 4 cards: 13,000,000 BORROWERS / 0 DEMOCRATIC VOTES; FORGIVENESS = INCOME / 3M /
// ~$12,000 TAX; FALSE DELINQUENCY NOTICES / BACKLOGS MONTHS-YEARS; 3 NOV / VETO STANDS / BUDGET
// NEGOTIABLE) / 1 red impact ("They vote on whether relief counts as income.") / 2 black. Red card
// mid-tail (beat 31). Durations / reveals / SFX locked to the VO via a scribe_v1 word-timestamp anchor
// pass (public/forgiven/voiceover.mp3, ~104.8s incl. the post-hook pause).
// NB: OWN distinct footage under public/forgiven/, NO reuse of any other reel's clips.
// FOOTAGE is strictly POLITICALLY NEUTRAL, FLAG-FREE AND FACE-FREE -- generic education / finance /
// government / paperwork b-roll, NO national flags, NO identifiable faces, NO politicians or lookalikes
// (no Trump/Biden/any figure), NO party symbols or colors-as-logos (no donkey/elephant, no "VOTE"/
// ballots/ballot boxes/"I VOTED" stickers), NO government agency seals or names (no IRS / Dept of Ed /
// Treasury seal), NO bank/lender logos, NO banknote portrait faces, NO foreign-language text.
// **SENSITIVE -- names real political actors and asserts specific, checkable policy claims; render as
// written but FULLY FACT- AND LEGAL-CHECK before publishing:** that the 2025 "One Big Beautiful Bill"
// ended/phased out income-driven repayment and cut Parent PLUS forgiveness, affected ~13M borrowers
// with 0 Democratic votes; that it let the student-loan-forgiveness tax exclusion expire so forgiven
// debt is taxed as income; the "~3M borrowers / ~$12K tax" estimate (attributed to "one group" --
// name and verify the source); the Education Dept staff/oversight cuts, false delinquency notices and
// backlogs; the 3 Nov 2026 midterms, the veto math, and the "2% fixed rate / federal refinancing"
// bipartisan bills. The "it's a line item in a budget negotiation / they're voting on whether relief
// counts as income" framing is editorial analysis. This is a PARTISAN-ADJACENT topic (names Trump,
// Democrats) -- run a political/defamation check, and schedule it APART from the other politics reels
// (CentsReel / PumpReel / etc.) for the same audience.
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK (held through ~1.1s post-hook pause)
  {dur: 207, kind: 'hook', reveal: [3, 62, 128], text: 'How can a borrower owe|$12,000 in tax|on money they never got?', kicker: 'The tax', highlights: ['$12,000'], size: 38, media: {src: 'forgiven/f00_gradcap.mp4', type: 'video', effect: 'in'}},
  // 1
  {dur: 140, kind: 'text', reveal: [2, 72], text: 'Last year’s One Big Beautiful Bill|rewrote student loans.', highlights: ['rewrote'], size: 40, media: {src: 'forgiven/f01_loandocs.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 103, kind: 'text', reveal: [2, 52], text: 'Income-driven repayment|ended or phased out.', highlights: ['ended'], size: 42, media: {src: 'forgiven/f02_calculator.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 99, kind: 'text', reveal: [2, 50], text: 'Parent PLUS: cut off|from most forgiveness.', highlights: ['forgiveness.'], size: 42, media: {src: 'forgiven/f03_parenthands.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 57, kind: 'text', reveal: [2, 30], text: '13 million borrowers|affected.', highlights: ['13'], size: 44, media: {src: 'forgiven/f04_crowd.jpg', type: 'img', effect: 'in'}},
  // 5 CARD 1
  {dur: 38, kind: 'lines', reveal: [0, 19], text: '13,000,000 BORROWERS|0 DEMOCRATIC VOTES', highlights: ['0'], media: {src: 'forgiven/f05_legislature.jpg', type: 'img', effect: 'in'}},
  // 6 BLACK
  {dur: 55, kind: 'text', reveal: [0, 0], text: 'But nobody tells you|this part.', highlights: ['part.'], size: 48},
  // 7
  {dur: 88, kind: 'text', reveal: [2, 44], text: 'It let a tax|exemption expire.', highlights: ['expire.'], size: 44, media: {src: 'forgiven/f07_taxform.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 106, kind: 'text', reveal: [2, 55], text: 'Forgiven debt is now|counted as income.', highlights: ['income.'], size: 42, media: {src: 'forgiven/f08_moneystack.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 71, kind: 'text', reveal: [2, 2], enter: 'slideL', text: 'Get $100,000 forgiven,', highlights: ['$100,000'], size: 46, media: {src: 'forgiven/f09_check.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 112, kind: 'text', reveal: [2, 58], text: 'and the IRS treats it|like income you earned.', highlights: ['irs'], size: 40, media: {src: 'forgiven/f10_letter.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 78, kind: 'text', reveal: [2, 40], text: 'One group estimates|3 million borrowers', highlights: ['3'], size: 42, media: {src: 'forgiven/f11_studentswalk.jpg', type: 'img', effect: 'in'}},
  // 12 CARD 2
  {dur: 89, kind: 'lines', reveal: [0, 32, 62], text: 'FORGIVENESS = INCOME|3,000,000 BORROWERS|~$12,000 TAX', highlights: ['~$12,000'], media: {src: 'forgiven/f12_amountdue.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 68, kind: 'text', reveal: [2, 36], text: 'on debt they’ll never|see a cent of.', highlights: ['cent'], size: 42, media: {src: 'forgiven/f29_gradcapmoney.jpg', type: 'img', effect: 'in'}},
  // 14 BLACK
  {dur: 50, kind: 'text', reveal: [0, 0], text: 'But that’s not even|the craziest part.', highlights: ['craziest'], size: 48},
  // 15
  {dur: 59, kind: 'text', reveal: [2, 30], text: 'The Education Department|cut staff.', highlights: ['cut'], size: 42, media: {src: 'forgiven/f13_emptyoffice.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 89, kind: 'text', reveal: [2, 46], text: 'Oversight of servicers|was curtailed.', highlights: ['curtailed.'], size: 42, media: {src: 'forgiven/f14_magnifier.jpg', type: 'img', effect: 'in'}},
  // 17 CARD 3
  {dur: 79, kind: 'lines', reveal: [0, 40], text: 'FALSE DELINQUENCY NOTICES|BACKLOGS: MONTHS TO YEARS', highlights: ['years'], media: {src: 'forgiven/f15_pastdue.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 82, kind: 'text', reveal: [2, 42], text: 'Some wait months or years|for a determination.', highlights: ['determination.'], size: 40, media: {src: 'forgiven/f16_clockfiles.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 173, kind: 'text', reveal: [2, 90], text: 'The system that decides the tax|can’t process your paperwork.', highlights: ['can’t'], size: 36, media: {src: 'forgiven/f17_backlog.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 58, kind: 'text', reveal: [2, 30], text: 'Here’s exactly|how they do it.', highlights: ['exactly'], size: 46, media: {src: 'forgiven/f06_govbuilding.jpg', type: 'img', effect: 'in'}},
  // 21 CARD 4
  {dur: 65, kind: 'lines', reveal: [0, 28, 52], text: '3 NOVEMBER|VETO: STANDS|BUDGET: NEGOTIABLE', highlights: ['negotiable'], media: {src: 'forgiven/f18_calendar.jpg', type: 'img', effect: 'in'}},
  // 22
  {dur: 67, kind: 'text', reveal: [2, 34], text: 'Even a Democratic Congress|can’t repeal the bill.', highlights: ['repeal'], size: 40, media: {src: 'forgiven/f23_hearingroom.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 102, kind: 'text', reveal: [2, 54], text: 'Trump holds the veto.|What it can do is trade.', highlights: ['trade.'], size: 40, media: {src: 'forgiven/f19_vetostamp.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 173, kind: 'text', reveal: [2, 90], enter: 'slideR', text: 'The budget has to pass.|The fix gets attached.', highlights: ['attached.'], size: 42, media: {src: 'forgiven/f21_budgetdoc.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 178, kind: 'text', reveal: [2, 92], text: 'Bipartisan bills sit unvoted:|a 2% rate, refinancing.', highlights: ['2%'], size: 40, media: {src: 'forgiven/f27_pensign.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 75, kind: 'text', reveal: [2, 40], text: 'Who controls the committees|decides what gets a vote.', highlights: ['committees'], size: 38, media: {src: 'forgiven/f22_gavel.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 64, kind: 'text', reveal: [2, 32], text: 'The loan was never|the whole debt.', highlights: ['debt.'], size: 44, media: {src: 'forgiven/f20_handshake.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 115, kind: 'text', reveal: [2, 58], text: 'The tax on forgiveness|is what nobody budgeted for.', highlights: ['budgeted'], size: 40, media: {src: 'forgiven/f24_scale.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 168, kind: 'text', reveal: [2, 88], text: 'Whether it stays is a line item|decided by an election.', highlights: ['election.'], size: 36, media: {src: 'forgiven/f25_spreadsheet.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 53, kind: 'text', reveal: [2, 28], text: 'Borrowers aren’t|voting on relief.', highlights: ['relief.'], size: 44, media: {src: 'forgiven/f26_queue.jpg', type: 'img', effect: 'in'}},
  // 31 RED impact (thesis)
  {dur: 93, kind: 'impact', text: 'They vote on whether|relief counts as income.', redBg: true},
  // 32 CTA (question close)
  {dur: 91, kind: 'text', reveal: [2, 40], enter: 'zoom', text: 'Did you know forgiveness|is taxable?', highlights: ['taxable?'], size: 44, media: {src: 'forgiven/f28_diploma.jpg', type: 'img', effect: 'in'}},
];

type SfxCue = {at: number; src: string; vol: number};
const SFX: SfxCue[] = [
  {at: 0, src: 'media/sfx_impact.mp3', vol: 0.5},
  {at: 606, src: 'media/sfx_impact.mp3', vol: 0.46}, // 13M/0 votes card
  {at: 644, src: 'media/sfx_whoosh.mp3', vol: 0.35}, // into black
  {at: 1154, src: 'media/sfx_impact.mp3', vol: 0.46}, // forgiveness=income card
  {at: 1311, src: 'media/sfx_whoosh.mp3', vol: 0.35}, // into black
  {at: 1509, src: 'media/sfx_impact.mp3', vol: 0.46}, // false delinquency card
  {at: 1901, src: 'media/sfx_impact.mp3', vol: 0.46}, // 3 Nov / veto / budget card
  {at: 2961, src: 'media/sfx_impact.mp3', vol: 0.55}, // red thesis (relief counts as income)
  {at: 3054, src: 'media/sfx_whoosh.mp3', vol: 0.4}, // CTA
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The tax</span>
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
export const ForgivenReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('forgiven/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('forgiven/music.mp3')}
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
