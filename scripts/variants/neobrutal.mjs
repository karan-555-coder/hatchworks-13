// Variant: Neo-brutalist (electric lime, cobalt, vivid orange, off-white, black).
//
// Colour tables are keyed by the original palette families (see family() in scripts/theme.mjs).
// An entry is either a hex colour (alpha is carried over) or { solid, alpha }: `solid` is used
// as written for opaque colours, `alpha` (a hex) for translucent ones; alpha: null keeps the token.
export const PALETTE = {
  lime: '#c6ff3d', limePale: '#eef9c4', cobalt: '#1f3fff', orange: '#ff5a1f',
  paper: '#f4f1e8', paper2: '#e8e4d6', ink: '#0a0a0a', ink2: '#171717',
};
const P = PALETTE;

export default {
  name: 'neobrutal',
  dist: 'dist',
  port: 4321,
  prefix: '--nb-',
  styles: ['/styles/neobrutal.css'],
  scripts: ['/scripts/neobrutal.js'],

  ctx: {
    dark: `--nb-accent:${P.lime};--nb-white:${P.paper};--nb-fg:${P.paper};--nb-line:${P.paper};--nb-pop:${P.lime};--nb-orange-t:#ff6a2b`,
    light: `--nb-accent:${P.cobalt};--nb-white:${P.paper};--nb-fg:${P.ink};--nb-line:${P.ink};--nb-pop:${P.ink};--nb-orange-t:#e8470c`,
    accent: `--nb-accent:${P.cobalt};--nb-white:${P.ink};--nb-fg:${P.ink};--nb-line:${P.ink};--nb-pop:${P.cobalt};--nb-orange-t:${P.ink}`,
    orange: `--nb-accent:${P.ink};--nb-white:${P.ink};--nb-fg:${P.ink};--nb-line:${P.ink};--nb-pop:${P.cobalt};--nb-orange-t:${P.ink}`,
  },
  // added to rules that set solid white text without painting a surface
  whiteTextCtx: `--nb-accent:${P.lime};--nb-line:${P.paper};--nb-orange-t:#ff6a2b`,
  // custom properties named like a rule / border: light greys become the surface line colour
  lineVar: `var(--nb-line,${P.ink})`,
  varRoles: false,

  map: {
    bg: { white: P.paper, paper: P.paper2, ink: P.ink, ink2: P.ink2, teal: P.lime, mint: P.lime, mintPale: P.limePale,
      deep: P.cobalt, blue: P.cobalt, orange: P.orange },
    grad: { white: P.paper, paper: P.paper2, ink: P.ink, ink2: P.ink2, teal: P.cobalt, mint: P.cobalt, mintPale: P.paper,
      deep: P.cobalt, blue: P.cobalt, orange: P.orange },
    text: {
      white: { solid: `var(--nb-white,${P.paper})`, alpha: P.paper },
      teal: { solid: `var(--nb-accent,${P.cobalt})`, alpha: P.cobalt },
      blue: { solid: `var(--nb-accent,${P.cobalt})`, alpha: P.cobalt },
      orange: { solid: 'var(--nb-orange-t,#e8470c)', alpha: P.orange },
      ink: P.ink, ink2: '#1c1c1c', mint: P.lime, mintPale: P.lime, deep: P.cobalt,
    },
    border: {
      paper: { solid: `var(--nb-line,${P.ink})`, alpha: null },
      silver: { solid: `var(--nb-line,${P.ink})`, alpha: null },
      teal: { solid: `var(--nb-accent,${P.cobalt})`, alpha: P.cobalt },
      mint: { solid: `var(--nb-accent,${P.cobalt})`, alpha: P.cobalt },
      blue: { solid: `var(--nb-accent,${P.cobalt})`, alpha: P.cobalt },
      ink: P.ink, ink2: P.ink, deep: P.cobalt, orange: P.orange, mintPale: P.ink,
    },
    svg: { white: P.paper, paper: P.paper2, ink: P.ink, ink2: P.ink2, teal: P.cobalt, blue: P.cobalt, mint: P.lime,
      mintPale: P.limePale, deep: P.cobalt, orange: P.orange },
    var: {
      teal: { solid: `var(--nb-accent,${P.cobalt})`, alpha: P.cobalt },
      blue: { solid: `var(--nb-accent,${P.cobalt})`, alpha: P.cobalt },
      white: P.paper, paper: P.paper2, ink: P.ink, ink2: P.ink2, mint: P.lime, mintPale: P.limePale,
      deep: P.cobalt, orange: P.orange,
    },
    canvas: { white: P.paper, ink: P.ink, ink2: P.ink2, teal: P.lime, mint: P.lime, mintPale: P.lime, deep: P.cobalt, blue: P.cobalt, orange: P.orange },
  },
};
