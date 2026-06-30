import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio/'], // Disallow Sanity studio from indexing
      },
      {
        // Tier 1 & 2 AI Crawlers - explicitly allowed for AI search visibility (GEO)
        userAgent: ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'PerplexityBot', 'Google-Extended', 'GoogleOther', 'Applebot-Extended', 'Amazonbot', 'FacebookBot'],
        allow: '/',
      },
      {
        // Tier 3 AI Crawlers - blocked (aggressive/low value for search visibility)
        userAgent: ['Bytespider', 'CCBot'],
        disallow: '/',
      }
    ],
    sitemap: 'https://thedivinehima.com/sitemap.xml',
  };
}
