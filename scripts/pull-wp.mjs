// Pull rooms and blog posts from the live WordPress site into wp-export/,
// mapped to the Sanity `room` / `blogPost` schemas. Images are downloaded so
// the Sanity import doesn't depend on WordPress staying up.
// Usage: node scripts/pull-wp.mjs
import { mkdir, writeFile, access } from 'node:fs/promises';
import path from 'node:path';

const WP = 'https://thedivinehima.com/wp-json/wp/v2';
const OUT = 'wp-export';
const ROOMS_PARENT = 1177; // /rooms/
const TYPE_PAGES = { premium: 'premium-rooms', superior: 'superior-rooms', deluxe: 'standard-deluxe-rooms' };

const getJson = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
};

const decode = (s) =>
  s.replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>');

const textLines = (html) =>
  decode(html
    .replace(/<(script|style|noscript)[^>]*>[\s\S]*?<\/\1>/g, '')
    .replace(/<form[\s\S]*?<\/form>/g, '')
    .replace(/<[^>]+>/g, '\n'))
    .split('\n').map((l) => l.replace(/\s+/g, ' ').trim()).filter(Boolean);

// Originals only: strip WordPress "-300x200" size suffixes, dedupe.
const uploadUrls = (html) => [...new Set(
  [...html.matchAll(/https?:\/\/thedivinehima\.com\/wp-content\/uploads\/[^"'\s),]+?\.(?:jpe?g|png|webp)/gi)]
    .map((m) => m[0].replace(/-\d+x\d+(?=\.\w+$)/, '')),
)];

const download = async (url) => {
  const rel = url.split('/wp-content/uploads/')[1];
  const file = path.join(OUT, 'images', rel);
  try { await access(file); return file; } catch {}
  const res = await fetch(url);
  if (!res.ok) { console.warn(`  ! ${res.status} ${url}`); return null; }
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, Buffer.from(await res.arrayBuffer()));
  return file;
};

const withLocal = async (urls) => {
  const out = [];
  for (const url of urls) out.push({ url, file: await download(url) });
  return out;
};

const seo = (y = {}) => ({ seoTitle: y.title ?? null, seoDescription: y.description ?? null });

async function pullRooms() {
  const typeOf = {};
  for (const [type, slug] of Object.entries(TYPE_PAGES)) {
    const [page] = await getJson(`${WP}/pages?slug=${slug}`);
    for (const m of page.content.rendered.matchAll(/\/rooms\/([a-z0-9-]+)\//g)) typeOf[m[1]] = type;
  }

  const pages = await getJson(`${WP}/pages?parent=${ROOMS_PARENT}&per_page=100`);
  const rooms = [];
  for (const p of pages) {
    const html = p.content.rendered;
    const lines = textLines(html);
    const at = (s) => lines.findIndex((l) => l.toLowerCase().startsWith(s));
    const priceLine = lines[at('starting at') + 1] ?? '';
    const descEnd = lines.findIndex((l) => /^(make an inquiry|book now)$/i.test(l));
    const amenStart = lines.findIndex((l) => l.includes('full relaxation during your stay'));

    console.log(`room ${p.slug}`);
    rooms.push({
      wpId: p.id,
      name: decode(p.title.rendered),
      slug: p.slug,
      roomType: typeOf[p.slug] ?? null,
      price: Number(priceLine.match(/[\d,]+/)?.[0].replace(/,/g, '')) || null,
      description: lines.slice(at('starting at') + 2, descEnd).join(' '),
      amenities: lines.slice(amenStart + 1, at('gallery')),
      images: await withLocal(uploadUrls(html)),
      ...seo(p.yoast_head_json),
    });
  }
  return rooms;
}

async function pullPosts() {
  const posts = [];
  for (let page = 1; ; page++) {
    const res = await fetch(`${WP}/posts?per_page=100&page=${page}&_embed=wp:featuredmedia,wp:term`);
    if (!res.ok) throw new Error(`${res.status} posts page ${page}`);
    posts.push(...await res.json());
    if (page >= Number(res.headers.get('x-wp-totalpages'))) break;
  }

  const out = [];
  for (const p of posts) {
    console.log(`post ${p.slug}`);
    const media = p._embedded?.['wp:featuredmedia']?.[0];
    const terms = p._embedded?.['wp:term'] ?? [];
    out.push({
      wpId: p.id,
      title: decode(p.title.rendered),
      slug: p.slug,
      publishedAt: p.date_gmt + 'Z',
      excerpt: textLines(p.excerpt.rendered).join(' '),
      coverImage: media?.source_url
        ? { url: media.source_url, alt: media.alt_text || null, file: await download(media.source_url) }
        : null,
      categories: (terms[0] ?? []).map((t) => decode(t.name)),
      bodyHtml: p.content.rendered,
      ...seo(p.yoast_head_json),
    });
  }
  return out;
}

await mkdir(OUT, { recursive: true });
const rooms = await pullRooms();
await writeFile(path.join(OUT, 'rooms.json'), JSON.stringify(rooms, null, 2));
const posts = await pullPosts();
await writeFile(path.join(OUT, 'posts.json'), JSON.stringify(posts, null, 2));
console.log(`\n${rooms.length} rooms, ${posts.length} posts -> ${OUT}/`);
