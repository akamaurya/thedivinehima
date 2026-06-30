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
    { name: 'categories', title: 'Categories', type: 'array', of: [{ type: 'string' }] },
  ],
};
