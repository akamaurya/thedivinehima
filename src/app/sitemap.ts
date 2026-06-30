import { MetadataRoute } from 'next';
import { client } from '../../sanity/lib/client';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://thedivinehima.com';

  // Fetch dynamic routes from Sanity
  const rooms = await client.fetch(`*[_type == "room" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`);
  const posts = await client.fetch(`*[_type == "blogPost" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`);

  const roomUrls = rooms.map((room: any) => ({
    url: `${baseUrl}/rooms/${room.slug}`,
    lastModified: room._updatedAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const postUrls = posts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post._updatedAt,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/rooms`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/dining`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...roomUrls,
    ...postUrls,
  ];
}
