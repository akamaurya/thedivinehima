// Import wp-export/{rooms,posts}.json (from scripts/pull-wp.mjs) into Sanity.
// Keeps WordPress slugs so URLs don't change. Deterministic _ids make reruns
// overwrite instead of duplicating.
// Usage: node scripts/import-wp.mjs [--dry]
// ponytail: @sanity/client, @portabletext/html and jsdom come in via sanity/next-sanity, not package.json.
import { createReadStream, readFileSync } from 'node:fs';
import path from 'node:path';
import { createClient } from '@sanity/client';
import { htmlToPortableText } from '@portabletext/html';
import { createFlattenTableRule } from '@portabletext/html/rules';
import { compileSchema, defineSchema } from '@portabletext/schema';
import { JSDOM } from 'jsdom';

const dry = process.argv.includes('--dry');
const SITE = 'https://thedivinehima.com';
const LOGO = `${SITE}/wp-content/uploads/2016/03/cropped-Divine-Hima-logo-512-192x192.png`;

process.loadEnvFile(); // token: `migration_wp` in .env
const client = createClient({ projectId: 'cwlrdggu', dataset: 'production', apiVersion: '2024-06-29', token: process.env.migration_wp, useCdn: false });

const rooms = JSON.parse(readFileSync('wp-export/rooms.json', 'utf8'));
const posts = JSON.parse(readFileSync('wp-export/posts.json', 'utf8'));

const uploaded = new Map();
async function image(file) {
  if (!file) return undefined;
  if (dry) return { _type: 'image', asset: { _type: 'reference', _ref: `dry:${file}` } };
  if (!uploaded.has(file)) {
    const asset = await client.assets.upload('image', createReadStream(file), { filename: path.basename(file) });
    uploaded.set(file, asset._id);
  }
  return { _type: 'image', asset: { _type: 'reference', _ref: uploaded.get(file) } };
}

// Matches Sanity's default block config plus blogPost's callToAction.
const schema = compileSchema(defineSchema({
  styles: ['normal', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote'].map((name) => ({ name })),
  lists: [{ name: 'bullet' }, { name: 'number' }],
  decorators: ['strong', 'em', 'code', 'underline', 'strike-through'].map((name) => ({ name })),
  annotations: [{ name: 'link', fields: [{ name: 'href', type: 'string' }] }],
  blockObjects: [{ name: 'callToAction', fields: [{ name: 'text', type: 'string' }, { name: 'url', type: 'string' }] }],
}));

// Booking boxes become the schema's callToAction; their pitch text stays as a paragraph.
// JSON-LD scripts are pulled out and returned separately.
function convertBody(html, coverUrl) {
  const doc = new JSDOM(html).window.document;

  const structuredData = [...doc.querySelectorAll('script[type="application/ld+json"]')].map((s) => {
    s.remove();
    return JSON.parse(s.textContent.replaceAll(`${SITE}/wp-content/uploads/your-logo.png`, LOGO)
      .replaceAll('"image": ""', `"image": ${JSON.stringify(coverUrl ?? LOGO)}`));
  });
  doc.querySelectorAll('script, style').forEach((el) => el.remove());

  for (const a of doc.querySelectorAll(`a[href*="booking_engine"]`)) {
    const cta = doc.createElement('cta');
    cta.dataset.text = a.textContent.trim();
    cta.dataset.url = a.href;
    // Lift the button out of its <p>/<span> so it becomes a block, not an inline link.
    // In a <p> ("[Book] or call ..."): button goes before that line. Bare in a box: after the pitch.
    const p = a.closest('p');
    const box = a.closest('div') ?? a.parentElement;
    a.remove();
    if (p) p.before(cta);
    else box.after(cta);
  }

  const blocks = htmlToPortableText(doc.body.innerHTML, {
    schema,
    parseHtml: (h) => new JSDOM(h).window.document,
    whitespaceMode: 'normalize',
    rules: [
      {
        deserialize(el, _next, createBlock) {
          if (el.tagName?.toLowerCase() !== 'cta') return undefined;
          return createBlock({ _type: 'callToAction', text: el.getAttribute('data-text'), url: el.getAttribute('data-url') });
        },
      },
      createFlattenTableRule({ schema, separator: () => ({ _type: 'span', text: ' | ' }) }),
    ],
  });
  // Drop blocks left empty by stripped comments/markers.
  const body = blocks.filter((b) => b._type !== 'block' || b.children?.some((c) => c.text?.trim()));
  return { body, structuredData };
}



const tx = [];

for (const r of rooms) {
  const images = (await Promise.all(r.images.map((i) => image(i.file)))).filter(Boolean)
    .map((img, i) => ({ ...img, _key: `img${i}` }));
  tx.push({
    _id: `wp-room-${r.wpId}`,
    _type: 'room',
    name: r.name,
    slug: { _type: 'slug', current: r.slug },
    roomType: r.roomType ?? undefined,
    description: r.description,
    images,
    amenities: r.amenities,
    price: r.price ?? undefined,
    seoTitle: r.seoTitle ?? undefined,
    seoDescription: r.seoDescription ?? undefined,
  });
}

for (const p of posts) {
  const cover = await image(p.coverImage?.file);
  const { body, structuredData } = convertBody(p.bodyHtml, p.coverImage?.url);
  tx.push({
    _id: `wp-post-${p.wpId}`,
    _type: 'blogPost',
    title: p.title,
    slug: { _type: 'slug', current: p.slug },
    coverImage: cover,
    publishedAt: p.publishedAt,
    body,
    categories: p.categories,
    seoTitle: p.seoTitle ?? undefined,
    seoDescription: p.seoDescription ?? p.excerpt ?? undefined,
    structuredData: structuredData.length ? JSON.stringify(structuredData, null, 2) : undefined,
  });
}

if (dry) {
  console.log(JSON.stringify(tx));
  console.log(`\n${tx.length} docs (dry run, nothing written)`);
} else {
  await tx.reduce((t, doc) => t.createOrReplace(doc), client.transaction()).commit();
  console.log(`Imported ${rooms.length} rooms, ${posts.length} posts, ${uploaded.size} images.`);
}
