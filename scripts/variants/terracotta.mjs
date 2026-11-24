// Variant: Sunlit Terracotta (warm sand, terracotta, olive, saffron, espresso).
//
// A light, editorial identity: white and grey surfaces land on sand steps, the dark surfaces on
// espresso and deep olive. Brand accent fills become terracotta (teal) and olive (mint); the
// orange call-to-action fills become saffron with espresso text. Surface-aware custom
// properties (--tc-*) let text follow the surface it sits on.
// Table format: see scripts/variants/neobrutal.mjs.
export const PALETTE = {
  ivory: '#fffaf3', sand: '#f6efe6', sand2: '#efe4d4', sand3: '#e6d6c0', clay: '#d9c4a8',
  terracotta: '#c8553d', terraDeep: '#a8432e',
  olive: '#6b7d4a', oliveDeep: '#4f5d36', oliveDark: '#2f3a22', oliveCream: '#e7e9d6',
  saffron: '#e9a23b', saffronPale: '#f7deaf', burnt: '#b8661a',
  espresso: '#2b1d14', espresso2: '#3d2b20', cocoa: '#6e5848',
};
const P = PALETTE;

const vars = o => Object.entries(o).map(([k, v]) => `--tc-${k}:${v}`).join(';');
const LIGHT = {
  fg: P.espresso, fg2: P.espresso2, white: P.espresso, muted: P.cocoa, accent: P.terraDeep, accent2: P.oliveDeep,
  deep: P.oliveDeep, hot: P.burnt, line: 'rgba(43,29,20,.14)', line2: 'rgba(43,29,20,.3)', glow: P.terracotta,
};
const DARK = {
  fg: P.sand, fg2: '#e9dccb', white: P.sand, muted: '#cbb8a3', accent: P.saffron, accent2: P.saffronPale,
  deep: '#c9d3a7', hot: P.saffron, line: 'rgba(246,239,230,.16)', line2: 'rgba(246,239,230,.32)', glow: P.saffron,
};

// text-like entry: the surface variable when opaque, the same variable at the token's opacity
// (color-mix) when translucent
const t = (v, fallback, alpha) => ({ solid: `var(${v},${fallback})`, alpha: alpha === undefined ? fallback : alpha, mix: true });
const accentVar = { solid: `var(--tc-accent,${P.terraDeep})`, alpha: P.terracotta };

// the original site is mostly dark: every surface, dark or light, lands on a sand step, and the
// sections drawn over video or dark photography get the DARK set from terracotta.js (.tc-darkzone)
export const DARK_CTX = DARK;

export default {
  name: 'terracotta',
  dist: 'dist-terracotta',
  port: 4323,
  prefix: '--tc-',
  styles: ['/styles/terracotta.css'],
  scripts: ['/scripts/terracotta.js'],

  ctx: {
    dark: vars(LIGHT),
    light: vars(LIGHT),
    // terracotta / olive fills: sand ink on top
    accent: vars({ fg: P.sand, fg2: '#fbf4ea', white: P.sand, muted: 'rgba(246,239,230,.82)', accent: '#fff3d6', accent2: P.saffronPale,
      deep: P.sand, hot: P.saffronPale, line: 'rgba(246,239,230,.3)', line2: 'rgba(246,239,230,.5)', glow: P.terracotta }),
    // saffron fills (were orange call-to-actions): espresso ink on top
    orange: vars({ fg: P.espresso, fg2: P.espresso, white: P.espresso, muted: 'rgba(43,29,20,.75)', accent: P.espresso, accent2: P.espresso,
      deep: P.espresso, hot: P.espresso, line: 'rgba(43,29,20,.25)', line2: 'rgba(43,29,20,.45)', glow: P.saffron }),
  },
  // rules that set white text without painting a surface sit on dark artwork
  whiteTextCtx: '',
  lineVar: 'var(--tc-line,rgba(43,29,20,.14))',
  varRoles: true,
  // off-palette pale tints (lavender bands, creams) join the sand family
  refineOther: (h, s, l) => (l >= 0.86 ? 'paper' : null),

  map: {
    bg: { white: P.ivory, paper: P.sand2, silver: P.sand3, grey: P.clay, ink: P.sand, ink2: P.sand2,
      teal: P.terracotta, blue: P.terracotta, mint: P.olive, mintPale: P.oliveCream, deep: P.sand3, orange: P.saffron },
    grad: { white: P.ivory, paper: P.sand2, silver: P.sand3, grey: P.clay, ink: P.sand, ink2: P.sand2,
      teal: P.terracotta, blue: P.terracotta, mint: P.olive, mintPale: P.sand2, deep: P.sand3, orange: P.saffron },
    // gradients clipped to text (background-clip: text): warm, readable on sand
    gradText: { white: P.espresso, paper: P.espresso2, silver: P.cocoa, grey: P.cocoa, ink: P.espresso, ink2: P.espresso2,
      teal: P.terracotta, blue: P.terracotta, mint: P.olive, mintPale: P.olive, deep: P.oliveDeep, orange: P.saffron },
    text: {
      white: t('--tc-white', P.espresso), paper: t('--tc-white', P.espresso),
      silver: t('--tc-muted', P.cocoa), grey: t('--tc-muted', P.cocoa),
      ink: t('--tc-fg', P.espresso), ink2: t('--tc-fg2', P.espresso2),
      teal: t('--tc-accent', P.terraDeep, P.terracotta), blue: t('--tc-accent', P.terraDeep, P.terracotta),
      mint: t('--tc-accent2', P.oliveDeep, P.olive), mintPale: t('--tc-accent2', P.oliveDeep, P.olive),
      deep: t('--tc-deep', P.oliveDeep), orange: t('--tc-hot', P.burnt, P.saffron),
    },
    border: {
      white: { solid: 'var(--tc-line2,rgba(43,29,20,.3))', alpha: P.espresso },
      paper: { solid: 'var(--tc-line,rgba(43,29,20,.14))', alpha: null },
      silver: { solid: 'var(--tc-line,rgba(43,29,20,.14))', alpha: null },
      mintPale: { solid: 'var(--tc-line,rgba(43,29,20,.14))', alpha: null },
      grey: { solid: 'rgba(43,29,20,.22)', alpha: P.espresso },
      ink: { solid: 'var(--tc-line2,rgba(43,29,20,.3))', alpha: P.espresso },
      ink2: { solid: 'var(--tc-line2,rgba(43,29,20,.3))', alpha: P.espresso },
      teal: accentVar, mint: { solid: `var(--tc-accent2,${P.oliveDeep})`, alpha: P.olive }, blue: accentVar,
      deep: P.oliveDeep, orange: P.saffron,
    },
    svg: { white: P.espresso, paper: P.sand3, silver: P.clay, grey: P.cocoa, ink: P.sand2, ink2: P.sand3,
      teal: P.terracotta, blue: P.terracotta, mint: P.olive, mintPale: P.oliveCream, deep: P.oliveDark, orange: P.saffron },
    // custom properties read both as text and as a surface (or never read)
    var: { white: P.ivory, paper: P.sand2, silver: P.sand3, grey: P.clay, ink: P.sand, ink2: P.sand2,
      teal: accentVar, blue: accentVar, mint: P.olive, mintPale: P.oliveCream, deep: P.oliveDeep, orange: P.saffron },
    canvas: { white: P.espresso, ink: P.sand, ink2: P.sand2, teal: P.terracotta, mint: P.olive, mintPale: P.oliveCream,
      deep: P.sand3, blue: P.terracotta, orange: P.saffron },
  },
};
