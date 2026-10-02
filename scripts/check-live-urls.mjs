// Checks that every URL in a Search Console "Pages.csv" export resolves to a
// file in out/ (a page, an asset, or a redirect page for a retired URL).
// Usage: npm run build && node scripts/check-live-urls.mjs path/to/Pages.csv
import { existsSync, readFileSync, statSync } from 'node:fs';

const csv = process.argv[2];
if (!csv) throw new Error('Usage: node scripts/check-live-urls.mjs <Pages.csv>');

const paths = [...new Set(
  readFileSync(csv, 'utf8').split('\n').slice(1).filter(Boolean)
    .map((line) => new URL(line.split(',')[0].replace(/"/g, '')).pathname),
)];

let missing = 0;
for (const p of paths) {
  const file = existsSync(`out${p}`) && statSync(`out${p}`).isDirectory() ? `out${p.replace(/\/?$/, '/')}index.html` : `out${p}`;
  const status = !existsSync(file) ? 'MISSING'
    : file.endsWith('.html') && readFileSync(file, 'utf8').includes('http-equiv="refresh"') ? 'redirect' : 'page';
  if (status === 'MISSING') missing++;
  console.log(`${status.padEnd(8)} ${p}`);
}
console.log(`\n${paths.length - missing}/${paths.length} resolve, ${missing} do not.`);
process.exitCode = missing ? 1 : 0;
