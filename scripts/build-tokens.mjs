// Generates src/tokens/tokens.css from tokens.json (exported from Figma variables)
import fs from 'node:fs';
const t = JSON.parse(fs.readFileSync(new URL('../src/tokens/tokens.json', import.meta.url)));
const v = (n) => '--tg-' + n.replace(/\//g, '-');
let light = [], dark = [], layout = [], type = [];
for (const [n, [l, d]] of t.color) { light.push(`  ${v(n)}: ${l};`); dark.push(`  ${v(n)}: ${d};`); }
for (const [n, val] of t.layout) layout.push(`  ${v(n)}: ${val}px;`);
for (const [n, fam, w, s, lh, ls] of t.type) type.push(`  --tg-font-${n}: ${w} ${s}px/${lh ? lh + 'px' : 'normal'} "${fam}", system-ui, sans-serif;\n  --tg-tracking-${n}: ${ls}px;`);
const css = `/* AUTO-GENERATED from tokens.json — do not edit by hand. Run: npm run tokens */
:root, [data-theme="light"] {
${light.join('\n')}
}
[data-theme="dark"] {
${dark.join('\n')}
}
@media (prefers-color-scheme: dark) {
  [data-theme="system"] {
${dark.map(x => '  ' + x).join('\n')}
  }
}
:root {
${layout.join('\n')}
${type.join('\n')}
}
`;
fs.writeFileSync(new URL('../src/tokens/tokens.css', import.meta.url), css);
console.log('tokens.css written:', t.color.length, 'colors');
