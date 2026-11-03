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
// "The gate" reel (TokenReel) — Hard Ledger house VISUAL format, crypto / blockchain / digital-asset news topic.
// TOPIC: the XRP Ledger tightening the rules for who can hold RESTRICTED (permissioned) tokens. Some XRPL tokens can
// only be held by accounts approved by their issuer — important for regulated assets (stablecoins, tokenized funds).
// Per CoinDesk, developers proposed FOUR fixes to close gaps that could let restricted tokens reach unapproved
// accounts (one targets automated trading pools / AMMs; another, accounts that keep receiving tokens because they
// already held a balance). Under the proposed rules, unapproved holders could face restrictions until issuer approval
// restores normal use. The TWIST: developers are closing loopholes even though the Foundation says it knows of no
// outsider exploiting them — it calls this routine security hardening, NOT a response to a confirmed attack. The
// changes are NOT live yet (still need to enter the software and win enough validator support). Debate: are stricter
// token rules necessary for institutional adoption, or do they make crypto less open?
// NOTE ON VOICE: built VERBATIM from a client-supplied script in the influencer "curiosity-gap" format (HOOK /
// CURIOSITY GAP / EARLY CTA / CONTEXT / EVIDENCE / ESCALATION / CONSEQUENCES / CONTROVERSY / AUDIENCE DEBATE), NOT
// the faceless house voice — it names the XRP Ledger / "the Foundation" / CoinDesk, uses an EARLY "follow for more"
// CTA, and CLOSES on a "let me know in the comments" debate CTA. Per the saved house preference, captions are
// <=5-6 words/beat with LARGER on-screen type (Anton 42-52). 55 beats. 1 stat card: DEVELOPERS PROPOSED / 4 / FIXES
// (the script's only hard figure). 1 red impact mid-tail ("But they are / not live yet." — the key caveat; reel
// closes on the comments-CTA media beat), no black beat. Captions match the VO verbatim (the one figure is the card).
// Durations/reveals/SFX locked to the VO via a scribe_v1 word-timestamp anchor pass (public/token/voiceover.mp3).
// Built at the house +10% pacing default; its own tense, modern crypto/tech music mixed at 0.2. OWN distinct footage
// under public/token/ (54 stills), NO reuse of any other reel's clips — ledger-checked.
// FOOTAGE is strictly BRAND-FREE and GENERIC — because the reel names a real network/company/outlet, NONE of their
// assets appear: NO XRP / Ripple / XRPL / CoinDesk / Bitcoin / Ethereum or any crypto/exchange logos, coins, tickers,
// charts, screens or wordmarks, NO identifiable faces, NO national flags, NO readable text. Metaphor-led blockchain/
// security b-roll only: abstract network nodes and glowing connection graphs, digital locks / vaults / gates / keys
// (permissioned access), server/data-center light, abstract code and data streams (no readable text), generic
// glowing token/coin ABSTRACTS (no crypto branding), a padlock on a circuit, doors and barriers, keys and approval
// motifs. **UNVERIFIED — reports a specific, recent crypto-protocol development and named sourcing (the CoinDesk-
// attributed four proposed fixes; the Foundation's "no known outsider exploit" / "routine hardening" characterization;
// the AMM and balance-based gaps; the not-live-yet / validator-support status). Rendered VERBATIM as supplied, but
// every figure, claim, attribution and the current status MUST be fact-checked against CoinDesk and the XRP Ledger's
// own proposals before publishing — protocol proposals change and this is a fast-moving, technical topic.**
// ---------------------------------------------------------------------------
const SCENES: SceneDef[] = [
  // 0 HOOK
  {dur: 70, kind: 'hook', reveal: [3, 40], text: 'The XRP Ledger', kicker: 'The gate', highlights: [], size: 56, media: {src: 'token/tk00_xrpl.jpg', type: 'img', effect: 'in'}},
  // 1
  {dur: 70, kind: 'text', reveal: [2], text: 'is tightening the rules', highlights: ['tightening'], size: 50, pos: 'upperRight', media: {src: 'token/tk01_tightening.jpg', type: 'img', effect: 'in'}},
  // 2
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'for who can hold|restricted tokens.', highlights: ['restricted'], size: 44, pos: 'left', media: {src: 'token/tk02_restricted.jpg', type: 'img', effect: 'in'}},
  // 3
  {dur: 70, kind: 'text', reveal: [2], text: 'And this could change', highlights: [], size: 50, pos: 'lowerRight', media: {src: 'token/tk03_change.jpg', type: 'img', effect: 'in'}},
  // 4
  {dur: 70, kind: 'text', reveal: [2], text: 'how certain digital assets', highlights: [], size: 50, pos: 'upperLeft', media: {src: 'token/tk04_assets.jpg', type: 'img', effect: 'in'}},
  // 5
  {dur: 70, kind: 'text', reveal: [2], text: 'move across the network.', highlights: ['network'], size: 50, pos: 'right', media: {src: 'token/tk05_network.jpg', type: 'img', effect: 'in'}},
  // 6
  {dur: 70, kind: 'text', reveal: [2], text: 'But here’s the twist.', highlights: ['twist'], size: 50, pos: 'lower', media: {src: 'token/tk06_twist.jpg', type: 'img', effect: 'in'}},
  // 7
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Developers are|closing loopholes,', highlights: ['loopholes'], size: 50, pos: 'upperLeft', media: {src: 'token/tk07_loopholes.jpg', type: 'img', effect: 'in'}},
  // 8
  {dur: 70, kind: 'text', reveal: [2], text: 'even though the Foundation', highlights: [], size: 50, pos: 'upperRight', media: {src: 'token/tk08_foundation.jpg', type: 'img', effect: 'in'}},
  // 9
  {dur: 70, kind: 'text', reveal: [2], text: 'says it knows of no', highlights: [], size: 46, pos: 'lowerLeft', media: {src: 'token/tk09_knows.jpg', type: 'img', effect: 'in'}},
  // 10
  {dur: 70, kind: 'text', reveal: [2], text: 'outsider exploiting them.', highlights: ['outsider'], size: 52, pos: 'right', media: {src: 'token/tk10_outsider.jpg', type: 'img', effect: 'in'}},
  // 11
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Follow for more updates|on crypto', highlights: ['follow'], size: 44, media: {src: 'token/tk11_follow.jpg', type: 'img', effect: 'in'}},
  // 12
  {dur: 70, kind: 'text', reveal: [2], text: 'and the technology', highlights: [], size: 52, pos: 'left', media: {src: 'token/tk12_technology.jpg', type: 'img', effect: 'in'}},
  // 13
  {dur: 70, kind: 'text', reveal: [2], text: 'shaping its future.', highlights: ['future'], size: 52, pos: 'lowerRight', media: {src: 'token/tk13_future.jpg', type: 'img', effect: 'in'}},
  // 14
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'Some tokens|on the XRP Ledger', highlights: [], size: 44, pos: 'upper', media: {src: 'token/tk14_sometokens.jpg', type: 'img', effect: 'in'}},
  // 15
  {dur: 70, kind: 'text', reveal: [2], text: 'can only be held', highlights: [], size: 50, pos: 'left', media: {src: 'token/tk15_held.jpg', type: 'img', effect: 'in'}},
  // 16
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'by accounts approved|by their issuer.', highlights: ['approved'], size: 44, pos: 'right', media: {src: 'token/tk16_issuer.jpg', type: 'img', effect: 'in'}},
  // 17
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'This is|especially important', highlights: [], size: 50, pos: 'lowerLeft', media: {src: 'token/tk17_important.jpg', type: 'img', effect: 'in'}},
  // 18
  {dur: 70, kind: 'text', reveal: [2], text: 'for regulated assets', highlights: ['regulated'], size: 52, pos: 'upperRight', media: {src: 'token/tk18_regulated.jpg', type: 'img', effect: 'in'}},
  // 19
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'like stablecoins|and tokenized funds.', highlights: ['stablecoins'], size: 48, pos: 'left', media: {src: 'token/tk19_stablecoins.jpg', type: 'img', effect: 'in'}},
  // 20
  {dur: 70, kind: 'text', reveal: [2], text: 'According to CoinDesk,', highlights: [], size: 52, pos: 'lowerRight', media: {src: 'token/tk20_coindesk.jpg', type: 'img', effect: 'in'}},
  // 21
  {dur: 70, kind: 'text', reveal: [2], text: 'developers proposed', highlights: [], size: 52, pos: 'upperLeft', media: {src: 'token/tk21_proposed.jpg', type: 'img', effect: 'in'}},
  // 22 CARD
  {dur: 70, kind: 'stat', stat: {pre: 'DEVELOPERS PROPOSED', value: 4, post: 'FIXES'}, media: {src: 'token/tk22_card4.jpg', type: 'img', effect: 'in'}},
  // 23
  {dur: 70, kind: 'text', reveal: [2], text: 'to close gaps', highlights: ['gaps'], size: 52, pos: 'right', media: {src: 'token/tk23_gaps.jpg', type: 'img', effect: 'in'}},
  // 24
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'that could let|restricted tokens', highlights: [], size: 48, pos: 'lower', media: {src: 'token/tk24_rt.jpg', type: 'img', effect: 'in'}},
  // 25
  {dur: 70, kind: 'text', reveal: [2], text: 'reach unapproved accounts.', highlights: ['unapproved'], size: 52, pos: 'upperRight', media: {src: 'token/tk25_unapproved.jpg', type: 'img', effect: 'in'}},
  // 26
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'One targets|automated trading pools.', highlights: ['automated'], size: 48, pos: 'lowerLeft', media: {src: 'token/tk26_pools.jpg', type: 'img', effect: 'in'}},
  // 27
  {dur: 70, kind: 'text', reveal: [2], text: 'Another addresses accounts', highlights: [], size: 52, pos: 'left', media: {src: 'token/tk27_accounts.jpg', type: 'img', effect: 'in'}},
  // 28
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'that could keep|receiving tokens', highlights: [], size: 48, pos: 'right', media: {src: 'token/tk28_receiving.jpg', type: 'img', effect: 'in'}},
  // 29
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'simply because they|already had a balance.', highlights: ['balance'], size: 44, pos: 'lowerRight', media: {src: 'token/tk29_balance.jpg', type: 'img', effect: 'in'}},
  // 30
  {dur: 70, kind: 'text', reveal: [2], text: 'Under the proposed rules,', highlights: [], size: 50, pos: 'upperLeft', media: {src: 'token/tk30_proposedrules.jpg', type: 'img', effect: 'in'}},
  // 31
  {dur: 70, kind: 'text', reveal: [2], text: 'unapproved holders', highlights: ['unapproved'], size: 52, pos: 'right', media: {src: 'token/tk31_holders.jpg', type: 'img', effect: 'in'}},
  // 32
  {dur: 70, kind: 'text', reveal: [2], text: 'could face restrictions', highlights: ['restrictions'], size: 52, pos: 'upperRight', media: {src: 'token/tk32_restrictions.jpg', type: 'img', effect: 'in'}},
  // 33
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'on what they do|with those tokens.', highlights: [], size: 44, pos: 'left', media: {src: 'token/tk33_whattheydo.jpg', type: 'img', effect: 'in'}},
  // 34
  {dur: 70, kind: 'text', reveal: [2], text: 'Issuer approval', highlights: ['issuer'], size: 52, pos: 'lowerLeft', media: {src: 'token/tk34_issuerapproval.jpg', type: 'img', effect: 'in'}},
  // 35
  {dur: 70, kind: 'text', reveal: [2], text: 'could restore normal use.', highlights: ['restore'], size: 50, pos: 'upper', media: {src: 'token/tk35_restore.jpg', type: 'img', effect: 'in'}},
  // 36
  {dur: 70, kind: 'text', reveal: [2], text: 'These changes could make', highlights: [], size: 50, pos: 'right', media: {src: 'token/tk36_changes.jpg', type: 'img', effect: 'in'}},
  // 37
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'the XRP Ledger|more reliable', highlights: ['reliable'], size: 48, pos: 'lowerRight', media: {src: 'token/tk37_reliable.jpg', type: 'img', effect: 'in'}},
  // 38
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'for regulated|financial products.', highlights: ['regulated'], size: 50, pos: 'upperLeft', media: {src: 'token/tk38_products.jpg', type: 'img', effect: 'in'}},
  // 39 RED
  {dur: 70, kind: 'impact', redBg: true, text: 'But they are|not live yet.'},
  // 40
  {dur: 70, kind: 'text', reveal: [2], text: 'The proposals still need', highlights: [], size: 50, pos: 'left', media: {src: 'token/tk40_proposals.jpg', type: 'img', effect: 'in'}},
  // 41
  {dur: 70, kind: 'text', reveal: [2], text: 'to enter the software', highlights: [], size: 50, pos: 'lowerRight', media: {src: 'token/tk41_software.jpg', type: 'img', effect: 'in'}},
  // 42
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'and receive enough|validator support.', highlights: ['validator'], size: 48, pos: 'upperRight', media: {src: 'token/tk42_validator.jpg', type: 'img', effect: 'in'}},
  // 43
  {dur: 70, kind: 'text', reveal: [2], text: 'The Foundation describes this', highlights: [], size: 50, pos: 'right', media: {src: 'token/tk43_describes.jpg', type: 'img', effect: 'in'}},
  // 44
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'as routine|security hardening,', highlights: ['routine'], size: 50, pos: 'lowerLeft', media: {src: 'token/tk44_hardening.jpg', type: 'img', effect: 'in'}},
  // 45
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'not a response|to a confirmed attack.', highlights: ['attack'], size: 44, pos: 'left', media: {src: 'token/tk45_attack.jpg', type: 'img', effect: 'in'}},
  // 46
  {dur: 70, kind: 'text', reveal: [2], text: 'Still, the debate raises', highlights: [], size: 50, pos: 'upperRight', media: {src: 'token/tk46_debate.jpg', type: 'img', effect: 'in'}},
  // 47
  {dur: 70, kind: 'text', reveal: [2], text: 'a bigger question', highlights: ['bigger'], size: 52, pos: 'lower', media: {src: 'token/tk47_bigger.jpg', type: 'img', effect: 'in'}},
  // 48
  {dur: 70, kind: 'text', reveal: [2], text: 'about how much control', highlights: ['control'], size: 50, pos: 'right', media: {src: 'token/tk48_control.jpg', type: 'img', effect: 'in'}},
  // 49
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'issuers should have|over digital assets.', highlights: ['issuers'], size: 44, pos: 'upperLeft', media: {src: 'token/tk49_issuers.jpg', type: 'img', effect: 'in'}},
  // 50
  {dur: 70, kind: 'text', reveal: [2], text: 'So what do you think?', highlights: [], size: 46, pos: 'lowerRight', media: {src: 'token/tk50_think.jpg', type: 'img', effect: 'in'}},
  // 51
  {dur: 70, kind: 'text', reveal: [2], text: 'Are stricter token rules', highlights: ['stricter'], size: 50, pos: 'left', media: {src: 'token/tk51_stricter.jpg', type: 'img', effect: 'in'}},
  // 52
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'necessary for|institutional adoption,', highlights: ['institutional'], size: 50, pos: 'upperRight', media: {src: 'token/tk52_institutional.jpg', type: 'img', effect: 'in'}},
  // 53
  {dur: 70, kind: 'text', reveal: [2, 28], text: 'or do they make|crypto less open?', highlights: ['open?'], size: 44, pos: 'right', media: {src: 'token/tk53_open.jpg', type: 'img', effect: 'in'}},
  // 54 CTA
  {dur: 70, kind: 'text', reveal: [2, 28], enter: 'zoom', text: 'Let me know|in the comments.', highlights: ['comments'], size: 46, media: {src: 'token/tk54_comments.jpg', type: 'img', effect: 'in'}},
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
        <span style={{fontFamily: BODY, fontWeight: 700, fontSize: 22, letterSpacing: 5, color: C.ink, textTransform: 'uppercase', textShadow: SH}}>The gate</span>
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
export const TokenReel: React.FC = () => {
  const frame = useCurrentFrame();
  const globalOpacity = interpolate(frame, [0, 12, DURATION_IN_FRAMES - 16, DURATION_IN_FRAMES], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      {HAS_VOICEOVER ? <Audio src={staticFile('token/voiceover.mp3')} /> : null}
      <Audio
        src={staticFile('token/music.mp3')}
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
