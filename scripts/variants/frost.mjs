// Variant: Nordic Frost (ice, glacier blue, slate, coral).
//
// A light, editorial identity: white and grey surfaces land on sand steps, the dark surfaces on
// espresso and deep olive. Brand accent fills become frost (teal) and olive (mint); the
// orange call-to-action fills become saffron with espresso text. Surface-aware custom
// properties (--fr-*) let text follow the surface it sits on.
// Table format: see scripts/variants/neobrutal.mjs.
export const PALETTE = {
  ivory: '#ffffff', sand: '#f4f8fb', sand2: '#e8eff6', sand3: '#dbe5ee', clay: '#c6d3df',
  frost: '#3b82c4', terraDeep: '#2a68a3',
  olive: '#3d5a75', oliveDeep: '#2b4560', oliveDark: '#1b2a3a', oliveCream: '#e2edf7',
  saffron: '#ff6b5a', saffronPale: '#ffd6cf', burnt: '#d94a3c',
  espresso: '#1e2a36', espresso2: '#2d3b4a', cocoa: '#56677a',
};
const P = PALETTE;

const vars = o => Object.entries(o).map(([k, v]) => `--fr-${k}:${v}`).join(';');
const LIGHT = {
  fg: P.espresso, fg2: P.espresso2, white: P.espresso, muted: P.cocoa, accent: P.terraDeep, accent2: P.oliveDeep,
  deep: P.oliveDeep, hot: P.burnt, line: 'rgba(30,42,54,.14)', line2: 'rgba(30,42,54,.3)', glow: P.frost,
};
const DARK = {
  fg: P.sand, fg2: '#e3ebf2', white: P.sand, muted: '#b9c7d4', accent: P.saffron, accent2: P.saffronPale,
  deep: '#cfe0ee', hot: P.saffron, line: 'rgba(244,248,251,.16)', line2: 'rgba(244,248,251,.32)', glow: P.saffron,
};

// text-like entry: the surface variable when opaque, the same variable at the token's opacity
// (color-mix) when translucent
const t = (v, fallback, alpha) => ({ solid: `var(${v},${fallback})`, alpha: alpha === undefined ? fallback : alpha, mix: true });
const accentVar = { solid: `var(--fr-accent,${P.terraDeep})`, alpha: P.frost };

// the original site is mostly dark: every surface, dark or light, lands on a sand step, and the
// sections drawn over video or dark photography get the DARK set from frost.js (.tc-darkzone)
export const DARK_CTX = DARK;

export default {
  name: 'frost',
  dist: 'dist-frost',
  port: 4324,
  prefix: '--fr-',
  styles: ['/styles/frost.css'],
  scripts: ['/scripts/frost.js'],

  ctx: {
    dark: vars(LIGHT),
    light: vars(LIGHT),
    // frost / olive fills: sand ink on top
    accent: vars({ fg: P.sand, fg2: '#f8fbfd', white: P.sand, muted: 'rgba(244,248,251,.82)', accent: '#ffffff', accent2: P.saffronPale,
      deep: P.sand, hot: P.saffronPale, line: 'rgba(244,248,251,.3)', line2: 'rgba(244,248,251,.5)', glow: P.frost }),
    // saffron fills (were orange call-to-actions): espresso ink on top
    orange: vars({ fg: P.espresso, fg2: P.espresso, white: P.espresso, muted: 'rgba(30,42,54,.75)', accent: P.espresso, accent2: P.espresso,
      deep: P.espresso, hot: P.espresso, line: 'rgba(30,42,54,.25)', line2: 'rgba(30,42,54,.45)', glow: P.saffron }),
  },
  // rules that set white text without painting a surface sit on dark artwork
  whiteTextCtx: '',
  lineVar: 'var(--fr-line,rgba(30,42,54,.14))',
  varRoles: true,
  // off-palette pale tints (lavender bands, creams) join the sand family
  refineOther: (h, s, l) => (l >= 0.86 ? 'paper' : null),

  map: {
    bg: { white: P.ivory, paper: P.sand2, silver: P.sand3, grey: P.clay, ink: P.sand, ink2: P.sand2,
      teal: P.frost, blue: P.frost, mint: P.olive, mintPale: P.oliveCream, deep: P.sand3, orange: P.saffron },
    grad: { white: P.ivory, paper: P.sand2, silver: P.sand3, grey: P.clay, ink: P.sand, ink2: P.sand2,
      teal: P.frost, blue: P.frost, mint: P.olive, mintPale: P.sand2, deep: P.sand3, orange: P.saffron },
    // gradients clipped to text (background-clip: text): warm, readable on sand
    gradText: { white: P.espresso, paper: P.espresso2, silver: P.cocoa, grey: P.cocoa, ink: P.espresso, ink2: P.espresso2,
      teal: P.frost, blue: P.frost, mint: P.olive, mintPale: P.olive, deep: P.oliveDeep, orange: P.saffron },
    text: {
      white: t('--fr-white', P.espresso), paper: t('--fr-white', P.espresso),
      silver: t('--fr-muted', P.cocoa), grey: t('--fr-muted', P.cocoa),
      ink: t('--fr-fg', P.espresso), ink2: t('--fr-fg2', P.espresso2),
      teal: t('--fr-accent', P.terraDeep, P.frost), blue: t('--fr-accent', P.terraDeep, P.frost),
      mint: t('--fr-accent2', P.oliveDeep, P.olive), mintPale: t('--fr-accent2', P.oliveDeep, P.olive),
      deep: t('--fr-deep', P.oliveDeep), orange: t('--fr-hot', P.burnt, P.saffron),
    },
    border: {
      white: { solid: 'var(--fr-line2,rgba(30,42,54,.3))', alpha: P.espresso },
      paper: { solid: 'var(--fr-line,rgba(30,42,54,.14))', alpha: null },
      silver: { solid: 'var(--fr-line,rgba(30,42,54,.14))', alpha: null },
      mintPale: { solid: 'var(--fr-line,rgba(30,42,54,.14))', alpha: null },
      grey: { solid: 'rgba(30,42,54,.22)', alpha: P.espresso },
      ink: { solid: 'var(--fr-line2,rgba(30,42,54,.3))', alpha: P.espresso },
      ink2: { solid: 'var(--fr-line2,rgba(30,42,54,.3))', alpha: P.espresso },
      teal: accentVar, mint: { solid: `var(--fr-accent2,${P.oliveDeep})`, alpha: P.olive }, blue: accentVar,
      deep: P.oliveDeep, orange: P.saffron,
    },
    svg: { white: P.espresso, paper: P.sand3, silver: P.clay, grey: P.cocoa, ink: P.sand2, ink2: P.sand3,
      teal: P.frost, blue: P.frost, mint: P.olive, mintPale: P.oliveCream, deep: P.oliveDark, orange: P.saffron },
    // custom properties read both as text and as a surface (or never read)
    var: { white: P.ivory, paper: P.sand2, silver: P.sand3, grey: P.clay, ink: P.sand, ink2: P.sand2,
      teal: accentVar, blue: accentVar, mint: P.olive, mintPale: P.oliveCream, deep: P.oliveDeep, orange: P.saffron },
    canvas: { white: P.espresso, ink: P.sand, ink2: P.sand2, teal: P.frost, mint: P.olive, mintPale: P.oliveCream,
      deep: P.sand3, blue: P.frost, orange: P.saffron },
  },
};
