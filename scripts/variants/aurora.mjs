// Variant: Midnight Aurora (deep navy, electric violet, aqua, mist).
//
// A dark identity: every original surface, light or dark, lands on a navy step, and text
// lands on mist. Accent fills become violet; the orange call-to-action fills become aqua with
// navy text. Surface-aware custom properties (--au-*) let text follow the surface it sits on.
// Table format: see scripts/variants/neobrutal.mjs.
export const PALETTE = {
  void: '#070b1d', navy: '#0b1026', navy2: '#10173a', navy3: '#172050', navy4: '#222c63',
  indigo: '#231d66', indigoDeep: '#130f3d', indigoPale: '#141a48',
  violet: '#7c5cff', violetHi: '#9d85ff', lilac: '#cbbfff',
  aqua: '#2de2e6', aquaPale: '#a6f3f4',
  mist: '#f5f3ff', mist2: '#d8d5f0', muted: '#a5a2cc',
};
const P = PALETTE;

const BASE = [
  `--au-accent:${P.aqua}`, `--au-accent2:${P.aquaPale}`, `--au-white:${P.mist}`, `--au-fg:${P.mist}`,
  `--au-fg2:${P.mist2}`, `--au-muted:${P.muted}`, `--au-deep:${P.lilac}`, `--au-hot:${P.violetHi}`,
  '--au-line:rgba(245,243,255,.14)', '--au-line2:rgba(245,243,255,.3)', `--au-glow:${P.violet}`,
].join(';');

// text-like entry: the surface variable when opaque, and the same variable at the token's
// opacity (color-mix) when translucent, so ink follows the surface it lands on
const t = (v, fallback, alpha) => ({ solid: `var(${v},${fallback})`, alpha: alpha === undefined ? fallback : alpha, mix: true });

export default {
  name: 'aurora',
  dist: 'dist-aurora',
  port: 4322,
  prefix: '--au-',
  styles: ['/styles/aurora.css'],
  scripts: ['/scripts/aurora.js'],

  ctx: {
    dark: BASE,
    light: BASE,
    // violet / indigo fills
    accent: [`--au-accent:#ffffff`, `--au-accent2:#ffffff`, `--au-white:#ffffff`, `--au-fg:#ffffff`, `--au-fg2:#f1eeff`,
      `--au-muted:#e2dcff`, `--au-deep:#ffffff`, `--au-hot:#ffffff`, '--au-line:rgba(255,255,255,.3)',
      '--au-line2:rgba(255,255,255,.5)', `--au-glow:${P.violet}`].join(';'),
    // aqua fills (were orange call-to-actions): navy ink on top
    orange: [`--au-accent:${P.navy}`, `--au-accent2:${P.navy}`, `--au-white:${P.navy}`, `--au-fg:${P.navy}`, `--au-fg2:${P.navy}`,
      '--au-muted:rgba(11,16,38,.72)', `--au-deep:${P.navy}`, `--au-hot:${P.navy}`, '--au-line:rgba(11,16,38,.25)',
      '--au-line2:rgba(11,16,38,.45)', `--au-glow:${P.aqua}`].join(';'),
  },
  whiteTextCtx: '',
  lineVar: 'var(--au-line,rgba(245,243,255,.14))',
  // custom properties are mapped by what they paint where they are read (see collectUses)
  varRoles: true,
  // off-palette pale tints (creams, blush, pastel washes) are light surfaces too: on a dark skin
  // they must land on navy like the rest
  refineOther: (h, s, l) => (l >= 0.86 ? 'paper' : null),

  map: {
    bg: { white: P.navy, paper: P.navy2, silver: P.navy3, grey: P.navy4, ink: P.void, ink2: '#0d1330',
      teal: P.violet, blue: P.violet, mint: P.indigo, mintPale: P.indigoPale, deep: P.indigoDeep, orange: P.aqua },
    grad: { white: P.navy, paper: P.navy2, silver: P.navy3, ink: P.void, ink2: '#0d1330',
      teal: P.violet, mint: '#3b2fa0', mintPale: P.navy2, deep: '#1b1060', blue: P.violet, orange: P.aqua },
    // gradients clipped to text (background-clip: text): light, glowing stops
    gradText: { white: P.mist, paper: P.mist2, silver: P.muted, grey: P.muted, ink: P.mist, ink2: P.mist2,
      teal: P.aqua, blue: P.violetHi, mint: P.aquaPale, mintPale: P.aquaPale, deep: P.lilac, orange: P.violetHi },
    text: {
      white: t('--au-white', P.mist), paper: t('--au-white', P.mist),
      silver: t('--au-muted', '#b9b6dc', P.mist), grey: t('--au-muted', P.muted, P.mist),
      ink: t('--au-fg', P.mist), ink2: t('--au-fg2', P.mist2, P.mist),
      teal: t('--au-accent', P.aqua), blue: t('--au-accent', P.aqua),
      mint: t('--au-accent2', P.aquaPale, P.aqua), mintPale: t('--au-accent2', P.aquaPale, P.aqua),
      deep: t('--au-deep', P.lilac), orange: t('--au-hot', P.violetHi, P.violet),
    },
    border: {
      white: { solid: 'rgba(245,243,255,.55)', alpha: P.mist },
      paper: { solid: 'var(--au-line,rgba(245,243,255,.14))', alpha: null },
      silver: { solid: 'var(--au-line,rgba(245,243,255,.14))', alpha: null },
      mintPale: { solid: 'var(--au-line,rgba(245,243,255,.14))', alpha: null },
      grey: { solid: 'rgba(245,243,255,.22)', alpha: P.mist },
      ink: { solid: 'var(--au-line2,rgba(245,243,255,.3))', alpha: P.mist },
      ink2: { solid: 'var(--au-line2,rgba(245,243,255,.3))', alpha: P.mist },
      teal: t('--au-accent', P.aqua), mint: t('--au-accent', P.aqua), blue: t('--au-accent', P.aqua),
      deep: P.violet, orange: P.aqua,
    },
    svg: { white: P.mist, paper: P.navy3, silver: '#3a4378', grey: P.muted, ink: P.mist, ink2: P.mist2,
      teal: P.aqua, blue: P.violet, mint: P.aquaPale, mintPale: P.navy3, deep: P.lilac, orange: P.aqua },
    // fallback for custom properties read both as text and as a surface (or never read):
    // neutrals act as surfaces, saturated colours as accents that must stay readable on navy
    var: { white: P.navy, paper: P.navy2, silver: P.navy3, ink: P.void, ink2: '#0d1330',
      teal: { solid: `var(--au-accent,${P.aqua})`, alpha: P.violet }, blue: { solid: `var(--au-accent,${P.aqua})`, alpha: P.violet },
      mint: P.aquaPale, mintPale: P.indigoPale, deep: P.aqua, orange: P.violetHi },
    canvas: { white: P.mist, ink: P.navy, ink2: P.navy2, teal: P.aqua, mint: P.aquaPale, mintPale: P.indigoPale,
      deep: P.violet, blue: P.violet, orange: P.aqua },
  },
};
