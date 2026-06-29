export const gallery = {
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    { name: 'category', title: 'Category', type: 'string', options: { list: ['property', 'rooms', 'dining', 'views', 'activities'] } },
    { name: 'order', title: 'Display Order', type: 'number' },
  ],
};
