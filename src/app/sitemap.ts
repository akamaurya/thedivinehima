import { MetadataRoute } from 'next';
import { client } from '../../sanity/lib/client';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://thedivinehima.com';

  // Fetch dynamic routes from Sanity
  const rooms = await client.fetch(`*[_type == "room" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`);
  const posts = await client.fetch(`*[_type == "blogPost" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`);

  const roomUrls = rooms.map((room: any) => ({
    url: `${baseUrl}/rooms/${room.slug}/`,
    lastModified: room._updatedAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const postUrls = posts.map((post: any) => ({
    url: `${baseUrl}/${post.slug}/`,
    lastModified: post._updatedAt,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Last-changed dates from Sanity, so lastmod only moves when content does.
  // Pages whose copy lives in code use COPY_UPDATED: bump it when you edit them.
  const COPY_UPDATED = '2026-11-11';
  const latest = await client.fetch(`{
    "home": *[_type in ["siteSettings", "testimonial"]] | order(_updatedAt desc)[0]._updatedAt,
    "about": *[_type == "aboutPage"][0]._updatedAt,
    "dining": *[_type == "diningPage"][0]._updatedAt,
    "packages": *[_type == "package"] | order(_updatedAt desc)[0]._updatedAt,
    "rooms": *[_type == "room"] | order(_updatedAt desc)[0]._updatedAt,
    "posts": *[_type == "blogPost"] | order(_updatedAt desc)[0]._updatedAt,
    "gallery": *[_type == "galleryImage"] | order(_updatedAt desc)[0]._updatedAt
  }`);
  // A page changes when its CMS content or its code copy does, whichever is later.
  const at = (...dates: (string | undefined)[]) => dates.filter(Boolean).sort().at(-1)!;

  const core: [string, string, MetadataRoute.Sitemap[number]['changeFrequency'], number][] = [
    ['/', at(latest.home, COPY_UPDATED), 'weekly', 1],
    ['/divine-rooms/', at(latest.rooms, COPY_UPDATED), 'weekly', 0.9],
    ['/divine-holiday-packages/', at(latest.packages, COPY_UPDATED), 'weekly', 0.9],
    ['/retreats/', COPY_UPDATED, 'monthly', 0.9],
    ['/dining/', at(latest.dining, COPY_UPDATED), 'monthly', 0.8],
    ['/about/', at(latest.about, COPY_UPDATED), 'monthly', 0.7],
    ['/gallery/', at(latest.gallery, COPY_UPDATED), 'monthly', 0.6],
    ['/blog/', at(latest.posts, COPY_UPDATED), 'weekly', 0.8],
    ['/contact-us/', COPY_UPDATED, 'monthly', 0.7],
  ];

  return [
    ...core.map(([path, lastModified, changeFrequency, priority]) => ({ url: `${baseUrl}${path}`, lastModified, changeFrequency, priority })),
    ...roomUrls,
    ...postUrls,
  ];
}
