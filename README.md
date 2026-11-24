# HatchWorks replica (static)

A static, dependency-light replica of https://hatchworks.com/ built for local study and
reference. It mirrors the site's pages, styles, images and interactions, with no WordPress,
Elementor or tracking scripts at runtime.

> The content, branding and assets belong to HatchWorks. Keep this build local or on a
> private preview; do not publish it as a public site.

## Run it

```bash
npm install
npm run build     # src/ -> dist/
npm run serve     # http://localhost:4321
```

`npm run dev` does both.

## How it is organised

```
src/
  layouts/base.html        document shell ({{placeholders}} filled by the build)
  components/              shared chrome, each with index.html + style.css + script.js
    announcement/            top announcement bar
    header/                  sticky nav, mega menus, mobile drawer
    footer/                  footer, CTA / newsletter tabs
    trust-strip/             client logo marquee
  pages/<route>/           one folder per URL
    index.html               page content
    page.json                title, meta, body classes, stylesheets, shared blocks
    style.css / script.js    page-specific CSS / JS (when the page has any)
  shared/                  CSS / JS blocks reused by several pages
  styles/
    wp-globals.css           WordPress / Elementor global variables
    hubspot-forms.css        base form styles
    replica.css              replica-only adjustments
    neobrutal.css            neo-brutalist skin (loaded last)
    aurora.css               Midnight Aurora skin (loaded last in that variant)
  scripts/
    neobrutal.js             skin behaviour: tagging, scroll reveals, animated shapes
    aurora.js                Midnight Aurora behaviour: reveals, card tilt, aurora sky
    widgets.js               video, nav menu, carousels, tabs, tables
    hubspot-forms.js         local form renderer (see "Forms")
    blog-filters.js          blog sort / filter / pagination
  data/
    forms/<id>.json          form field definitions
    posts.json               blog post index used by the filters
  assets/                  images, fonts, videos and vendor CSS (original paths)
  site.json                route list and redirects
scripts/
  build.mjs                assembles a variant's output folder (dist/, dist-aurora/, ...)
  theme.mjs                colour re-theme applied to the built output
  variants/                one file per visual variant: palette tables, skin files, port
  variant-check.mjs        proves a variant leaves structure and layout untouched
  serve.mjs                static server with clean URLs and the 404 page
  compare.mjs              measures the build against the live site
  import/                  one-off importers (crawl, extract, posts index)
```

## Neo-brutalist skin

The build applies a visual-only makeover (electric lime, cobalt, vivid orange, off-white, black)
on top of the mirrored pages. Content, markup, section order and behaviour are untouched.

- `scripts/theme.mjs` runs at the end of `npm run build` and remaps colour values in the built
  CSS, inline styles and script-injected styles. `src/` keeps the original colours, so a fresh
  import is re-skinned automatically.
- `src/styles/neobrutal.css` (loaded last) adds the type, chunky borders, offset shadows,
  patterns, hover states and motion.
- `src/scripts/neobrutal.js` tags existing blocks (cards, buttons, bands, photos) for that
  stylesheet, plays scroll-in animations and adds an `aria-hidden` layer of animated shapes.
  It respects `prefers-reduced-motion`.

`THEME=off npm run build` builds with the original palette (the skin stylesheet and script still
load); `npm run build:original` builds the fully original look into `dist-original/`.

## Visual variants

Every variant has the same pages, sections, content, navigation and layout. Only the visual
identity changes: palette, lighting, motion and hover behaviour. Each one is a file in
`scripts/variants/` naming its colour tables, its skin stylesheet and script, its output folder and
its port.

| Variant | Build | Serve | Identity |
|---|---|---|---|
| `neobrutal` (default) | `npm run build` | `npm run serve` (:4321) | lime / cobalt / orange on off-white; hard shadows, stamps, bouncy shapes |
| `aurora` | `npm run build:aurora` | `npm run serve:aurora` (:4322) | Midnight Aurora, below |
| `terracotta` | `npm run build:terracotta` | `npm run serve:terracotta` (:4323) | Sunlit Terracotta, below |
| `original` | `npm run build:original` | `npm run serve:original` (:4320) | untouched baseline for checks |

### Midnight Aurora (`aurora`)

Deep navy `#0b1026`, electric violet `#7c5cff`, aqua `#2de2e6`, mist `#f5f3ff`. Dark, glowing, tech-premium.

- **Colour.** Every surface lands on a navy step and text lands on mist. Accent fills become violet,
  and the orange call-to-actions become aqua with navy ink. Custom properties are mapped by what
  they paint where they are read (`color` means text, `background` means surface). Gradients
  clipped to text get light stops.
- **Light photography.** Bands drawn over a light photo or illustration are sampled at runtime and
  keep navy ink (`.au-lightzone`). Dark logos on transparent backgrounds are lifted to light.
- **Motion: cinematic reveal.** Headings open with a left-to-right curtain, cards rise out of a
  bottom slit, and photos open from the centre while settling from a zoom. The first headline gets
  a one-off curtain on load.
- **Hover: 3D tilt cards.** Hoverable cards tilt toward the pointer with a violet/aqua glare that
  follows it. This only runs with a fine pointer. Buttons, pills, fields and nav links glow.
- **Background: animated mesh.** Slow-drifting violet and aqua aurora blobs sit behind section
  bands in an `aria-hidden` layer (`mix-blend-mode: screen`) and pause off-screen. They are skipped
  on photographic bands and bands with their own video or canvas.
- **Type: gradient headings.** Large light headings take one mist, lilac, aqua and violet gradient,
  laid across the whole heading and shimmering slowly while on screen. Accent words keep their colour.
- `prefers-reduced-motion` turns off reveals, tilt, shimmer and drifting. Print falls back to plain ink.

### Sunlit Terracotta (`terracotta`)

Sand `#f6efe6`, terracotta `#c8553d`, olive `#6b7d4a`, saffron `#e9a23b`, espresso `#2b1d14`. Light, warm, editorial.

- **Colour.** The site's dark and light surfaces all land on sand steps, with espresso ink. Teal fills
  become terracotta, mint fills become olive, and the orange call-to-actions become saffron with espresso ink.
- **Film and logos.** Background videos behind a band are inverted and warmed into a peach-and-saffron
  glow (`.tc-sunwash`), so dark ink reads on them. White logos on transparent backgrounds are inked
  dark (`.tc-inv`). Bands over dark photography keep light ink (`.tc-darkzone`).
- **Motion: masked line-rise.** Headings rise out of a mask, cards fade up in sequence, and photos
  unroll from the top.
- **Hover: magnetic buttons and drawn underlines.** Buttons lean toward the pointer (fine pointers
  only). Body, nav and footer link underlines draw in, and cards lift on a warm shadow.
- **Background: paper grain.** A fixed, `aria-hidden` film-grain layer covers the page.
- **Type: highlighter marks.** Accent words already in large headings get a saffron marker swipe.
  It's a thick, raised `text-decoration`, so it follows wrapped lines and never changes layout.
- `prefers-reduced-motion` shows everything at once, with the marks already drawn.

### Checking a variant against the original

```bash
npm run serve:original                  # one terminal (:4320)
npm run serve:aurora                    # another (:4322)
npm run check:variant -- --variant=aurora                 # key routes at 1440 / 768 / 390 px
npm run check:variant -- --variant=aurora --all           # every route
```

For each route and width, the check compares DOM structure, text, page height and the geometry of
every heading, paragraph, image, link, button and form field. It also flags horizontal overflow,
broken images and JS errors. The original is loaded twice: anything that moves between those two
loads on its own (rotating copy, late embeds) is reported as a note and not compared, and a
differing route is re-measured before it is reported.

### Adding a variant

1. Copy `scripts/variants/aurora.mjs` and give it a new name, `dist` folder, port and palette.
   Every variant needs a distinct palette. Register it in `scripts/variants/index.mjs`.
2. Add its skin files to `src/styles/` and `src/scripts/` with their own class prefix.
3. Add `build:<name>` / `serve:<name>` scripts, build it, and run `check:variant`.

## Refreshing from the live site

```bash
npm run import     # crawl + extract (pages, assets, forms)
npm run posts      # rebuild src/data/posts.json
npm run build
```

The crawler caches raw HTML in `.cache/` and backs off when the site rate-limits it.
`src/pages`, `src/shared` and `src/components` are regenerated by the extractor; keep
hand-written changes in `src/styles/replica.css`, `src/scripts/` and `src/layouts/`.

## Checking fidelity

```bash
npm run serve                       # in one terminal
npm run compare                     # key pages at 1440 / 1024 / 768 / 390 px
npm run compare -- /faq/ --shots    # one page, with full-page screenshots
npm run compare -- --all --local-only
```

Reports page-height and block-height differences against the live site, horizontal
overflow, broken images, failed requests and JavaScript errors.

## Forms

Forms are rendered locally from `src/data/forms/*.json` with the same markup and classes
as the originals. Submissions are validated and answered with the form's thank-you message,
but **nothing is sent anywhere**. Wire `hubspot-forms.js` to your own endpoint if you need
real submissions.

## What is intentionally different

- Analytics, ad pixels, chat widgets, reCAPTCHA and marketing pop-ups are removed.
- Blog filtering and pagination run in the browser instead of through WordPress AJAX.
- Site search and other server-side features are not available in a static build.
