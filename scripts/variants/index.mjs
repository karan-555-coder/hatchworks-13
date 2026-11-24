// Visual variants. Each one is a colour re-theme (applied to the built output by scripts/theme.mjs)
// plus its own skin stylesheet and script. Structure, content and behaviour are shared by all.
//
//   npm run build                    -> neobrutal, into dist/
//   VARIANT=aurora npm run build     -> Midnight Aurora, into dist-aurora/  (or: npm run build:aurora)
import neobrutal from './neobrutal.mjs';
import aurora from './aurora.mjs';
import terracotta from './terracotta.mjs';
import frost from './frost.mjs';
import emerald from './emerald.mjs';
import original from './original.mjs';

export const VARIANTS = { neobrutal, aurora, terracotta, frost, emerald, original };

// the variant comes from --variant=<name> (works in every shell, used by the npm scripts) or VARIANT
const flag = (process.argv.find(a => a.startsWith('--variant=')) || '').split('=')[1];

export function getVariant(name = flag || process.env.VARIANT || 'neobrutal') {
  const v = VARIANTS[name];
  if (!v) throw new Error(`Unknown VARIANT "${name}". Known: ${Object.keys(VARIANTS).join(', ')}`);
  return v;
}

// every variant's skin files, so the re-theme never rewrites any of them
export const SKIN_FILES = new Set(Object.values(VARIANTS).flatMap(v => [...v.styles, ...v.scripts].map(p => p.split('/').pop())));
