import type { StringRule } from 'sanity';

export const blogPost = {
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    { name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true } },
    { name: 'publishedAt', title: 'Published At', type: 'datetime' },
    { name: 'body', title: 'Body', type: 'array', of: [
      { type: 'block' }, 
      { type: 'image', options: { hotspot: true } },
      {
        type: 'object',
        name: 'callToAction',
        title: 'Call to Action Button',
        fields: [
          { name: 'text', title: 'Button Text', type: 'string', initialValue: 'Book Now' },
          { name: 'url', title: 'URL / Link', type: 'string', initialValue: 'https://asiatech.in/booking_engine/index3?token=MTA4NDQ=' }
        ]
      }
    ] },
    { name: 'structuredData', title: 'Structured Data (JSON-LD)', type: 'text', rows: 8, description: 'Optional JSON-LD (object or array) rendered in the page head. Replaces the auto-generated Article schema when set.' },
    { name: 'categories', title: 'Categories', type: 'array', of: [{ type: 'string' }] },
    { name: 'seoTitle', title: 'SEO Title', type: 'string', description: 'Full page <title> (no suffix added). Leave blank to use "<title> | The Divine Hima".', validation: (Rule: StringRule) => Rule.max(60).warning('Keep under 60 characters') },
    { name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 3, description: 'Meta description for search results. Leave blank to auto-generate.', validation: (Rule: StringRule) => Rule.max(160).warning('Keep under 160 characters') },
  ],
};
