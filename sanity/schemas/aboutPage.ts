export const aboutPage = {
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    { name: 'heroImage', title: 'Hero Background Image', type: 'image', options: { hotspot: true } },
    { name: 'storyImage', title: 'Story Section Image', type: 'image', options: { hotspot: true } },
    { name: 'storyTitle', title: 'Story Heading', type: 'string' },
    { name: 'story', title: 'Story Paragraphs', type: 'array', of: [{ type: 'text', rows: 4 }] },
    { name: 'founderQuote', title: 'Founder Quote', type: 'text', rows: 4 },
    {
      name: 'features',
      title: 'What You Will Find Here',
      type: 'array',
      of: [{ type: 'object', fields: [{ name: 'title', type: 'string' }, { name: 'text', type: 'text', rows: 3 }] }],
    },
  ],
};
