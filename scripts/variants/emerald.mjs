// Variant: Emerald Ivory (ivory, emerald, forest, gold).
//
// A light, editorial identity: white and grey surfaces land on sand steps, the dark surfaces on
// espresso and deep olive. Brand accent fills become emerald (teal) and olive (mint); the
// orange call-to-action fills become saffron with espresso text. Surface-aware custom
// properties (--em-*) let text follow the surface it sits on.
// Table format: see scripts/variants/neobrutal.mjs.
export const PALETTE = {
  ivory: '#fdfcf7', sand: '#f8f7f0', sand2: '#efeee3', sand3: '#e3e3d3', clay: '#cfd2bd',
  emerald: '#0f8a5f', terraDeep: '#0b6b49',
  olive: '#1f5a44', oliveDeep: '#174535', oliveDark: '#10241b', oliveCream: '#e4efe6',
  saffron: '#d4a62a', saffronPale: '#f3e2b0', burnt: '#a87a10',
  espresso: '#13261d', espresso2: '#21372c', cocoa: '#52665a',
};
const P = PALETTE;

const vars = o => Object.entries(o).map(([k, v]) => `--em-${k}:${v}`).join(';');
const LIGHT = {
  fg: P.espresso, fg2: P.espresso2, white: P.espresso, muted: P.cocoa, accent: P.terraDeep, accent2: P.oliveDeep,
  deep: P.oliveDeep, hot: P.burnt, line: 'rgba(19,38,29,.14)', line2: 'rgba(19,38,29,.3)', glow: P.emerald,
};
const DARK = {
  fg: P.sand, fg2: '#ecebe0', white: P.sand, muted: '#c2cbbd', accent: P.saffron, accent2: P.saffronPale,
  deep: '#d6e8dc', hot: P.saffron, line: 'rgba(248,247,240,.16)', line2: 'rgba(248,247,240,.32)', glow: P.saffron,
};

// text-like entry: the surface variable when opaque, the same variable at the token's opacity
// (color-mix) when translucent
const t = (v, fallback, alpha) => ({ solid: `var(${v},${fallback})`, alpha: alpha === undefined ? fallback : alpha, mix: true });
const accentVar = { solid: `var(--em-accent,${P.terraDeep})`, alpha: P.emerald };

// the original site is mostly dark: every surface, dark or light, lands on a sand step, and the
// sections drawn over video or dark photography get the DARK set from emerald.js (.tc-darkzone)
export const DARK_CTX = DARK;

export default {
  name: 'emerald',
  dist: 'dist-emerald',
  port: 4325,
  prefix: '--em-',
  styles: ['/styles/emerald.css'],
  scripts: ['/scripts/emerald.js'],

  ctx: {
    dark: vars(LIGHT),
    light: vars(LIGHT),
    // emerald / olive fills: sand ink on top
    accent: vars({ fg: P.sand, fg2: '#fbfaf4', white: P.sand, muted: 'rgba(248,247,240,.82)', accent: '#fdfcf7', accent2: P.saffronPale,
      deep: P.sand, hot: P.saffronPale, line: 'rgba(248,247,240,.3)', line2: 'rgba(248,247,240,.5)', glow: P.emerald }),
    // saffron fills (were orange call-to-actions): espresso ink on top
    orange: vars({ fg: P.espresso, fg2: P.espresso, white: P.espresso, muted: 'rgba(19,38,29,.75)', accent: P.espresso, accent2: P.espresso,
      deep: P.espresso, hot: P.espresso, line: 'rgba(19,38,29,.25)', line2: 'rgba(19,38,29,.45)', glow: P.saffron }),
  },
  // rules that set white text without painting a surface sit on dark artwork
  whiteTextCtx: '',
  lineVar: 'var(--em-line,rgba(19,38,29,.14))',
  varRoles: true,
  // off-palette pale tints (lavender bands, creams) join the sand family
  refineOther: (h, s, l) => (l >= 0.86 ? 'paper' : null),

  map: {
    bg: { white: P.ivory, paper: P.sand2, silver: P.sand3, grey: P.clay, ink: P.sand, ink2: P.sand2,
      teal: P.emerald, blue: P.emerald, mint: P.olive, mintPale: P.oliveCream, deep: P.sand3, orange: P.saffron },
    grad: { white: P.ivory, paper: P.sand2, silver: P.sand3, grey: P.clay, ink: P.sand, ink2: P.sand2,
      teal: P.emerald, blue: P.emerald, mint: P.olive, mintPale: P.sand2, deep: P.sand3, orange: P.saffron },
    // gradients clipped to text (background-clip: text): warm, readable on sand
    gradText: { white: P.espresso, paper: P.espresso2, silver: P.cocoa, grey: P.cocoa, ink: P.espresso, ink2: P.espresso2,
      teal: P.emerald, blue: P.emerald, mint: P.olive, mintPale: P.olive, deep: P.oliveDeep, orange: P.saffron },
    text: {
      white: t('--em-white', P.espresso), paper: t('--em-white', P.espresso),
      silver: t('--em-muted', P.cocoa), grey: t('--em-muted', P.cocoa),
      ink: t('--em-fg', P.espresso), ink2: t('--em-fg2', P.espresso2),
      teal: t('--em-accent', P.terraDeep, P.emerald), blue: t('--em-accent', P.terraDeep, P.emerald),
      mint: t('--em-accent2', P.oliveDeep, P.olive), mintPale: t('--em-accent2', P.oliveDeep, P.olive),
      deep: t('--em-deep', P.oliveDeep), orange: t('--em-hot', P.burnt, P.saffron),
    },
    border: {
      white: { solid: 'var(--em-line2,rgba(19,38,29,.3))', alpha: P.espresso },
      paper: { solid: 'var(--em-line,rgba(19,38,29,.14))', alpha: null },
      silver: { solid: 'var(--em-line,rgba(19,38,29,.14))', alpha: null },
      mintPale: { solid: 'var(--em-line,rgba(19,38,29,.14))', alpha: null },
      grey: { solid: 'rgba(19,38,29,.22)', alpha: P.espresso },
      ink: { solid: 'var(--em-line2,rgba(19,38,29,.3))', alpha: P.espresso },
      ink2: { solid: 'var(--em-line2,rgba(19,38,29,.3))', alpha: P.espresso },
      teal: accentVar, mint: { solid: `var(--em-accent2,${P.oliveDeep})`, alpha: P.olive }, blue: accentVar,
      deep: P.oliveDeep, orange: P.saffron,
    },
    svg: { white: P.espresso, paper: P.sand3, silver: P.clay, grey: P.cocoa, ink: P.sand2, ink2: P.sand3,
      teal: P.emerald, blue: P.emerald, mint: P.olive, mintPale: P.oliveCream, deep: P.oliveDark, orange: P.saffron },
    // custom properties read both as text and as a surface (or never read)
    var: { white: P.ivory, paper: P.sand2, silver: P.sand3, grey: P.clay, ink: P.sand, ink2: P.sand2,
      teal: accentVar, blue: accentVar, mint: P.olive, mintPale: P.oliveCream, deep: P.oliveDeep, orange: P.saffron },
    canvas: { white: P.espresso, ink: P.sand, ink2: P.sand2, teal: P.emerald, mint: P.olive, mintPale: P.oliveCream,
      deep: P.sand3, blue: P.emerald, orange: P.saffron },
  },
};
