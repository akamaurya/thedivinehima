export const tourPackage = {
  name: 'package',
  title: 'Package',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } },
    { name: 'tagline', title: 'Tagline / Short Label', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    { name: 'duration', title: 'Duration (e.g. 2 Nights / 3 Days)', type: 'string' },
    { name: 'price', title: 'Price (e.g. ₹9,999 per couple)', type: 'string' },
    {
      name: 'inclusions',
      title: 'Inclusions',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'featured',
      title: 'Featured / Popular',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    },
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'price', media: 'image' },
  },
};
