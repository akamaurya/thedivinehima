// Checks that every URL in a Search Console "Pages.csv" export resolves to a
// built page in out/ or to a redirect in BOTH vercel.json and public/.htaccess.
// Usage: npm run build && node scripts/check-live-urls.mjs path/to/Pages.csv
import { existsSync, readFileSync } from 'node:fs';

const csv = process.argv[2];
if (!csv) throw new Error('Usage: node scripts/check-live-urls.mjs <Pages.csv>');

const vercel = new Set(JSON.parse(readFileSync('vercel.json', 'utf8')).redirects.map((r) => r.source));
const htaccess = [...readFileSync('public/.htaccess', 'utf8').matchAll(/^RedirectMatch 301 (\S+)/gm)].map((m) => new RegExp(m[1]));

const paths = [...new Set(
  readFileSync(csv, 'utf8').split('\n').slice(1).filter(Boolean)
    .map((line) => new URL(line.split(',')[0]).pathname),
)];

let missing = 0;
for (const p of paths) {
  const page = existsSync(`out${p}index.html`);
  const inVercel = vercel.has(p);
  const inHtaccess = htaccess.some((re) => re.test(p));
  const status = page ? 'page' : inVercel && inHtaccess ? 'redirect' : inVercel || inHtaccess ? 'REDIRECT MISMATCH' : 'MISSING';
  if (!page && !(inVercel && inHtaccess)) missing++;
  console.log(`${status.padEnd(17)} ${p}`);
}
console.log(`\n${paths.length - missing}/${paths.length} resolve, ${missing} do not.`);
process.exitCode = missing ? 1 : 0;
