import type { StringRule } from 'sanity';

const DEFAULT_AMENITIES = [
  'Wi-Fi',
  'Air Conditioning',
  'Room Service',
  'Flat-Screen TV',
  'Hot Water',
  'Clean Towels & Linen',
  'Toiletries',
  'Wardrobe',
  'Wake-up Service',
  'Daily Housekeeping',
];

export const room = {
  name: 'room',
  title: 'Room',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } },
    { name: 'roomType', title: 'Room Type', type: 'string', options: { list: ['premium', 'superior', 'deluxe'] } },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'images', title: 'Images', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] },
    {
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: DEFAULT_AMENITIES,
    },
    { name: 'price', title: 'Price per Night', type: 'number' },
    { name: 'seoTitle', title: 'SEO Title', type: 'string', description: 'Full page <title> (no suffix added). Leave blank to use "<name> | The Divine Hima".', validation: (Rule: StringRule) => Rule.max(60).warning('Keep under 60 characters') },
    { name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 3, description: 'Meta description for search results. Leave blank to use the description.', validation: (Rule: StringRule) => Rule.max(160).warning('Keep under 160 characters') },
  ],
};
