export const testimonial = {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    { name: 'name', title: 'Guest Name', type: 'string' },
    { name: 'rating', title: 'Rating', type: 'number', validation: (Rule: any) => Rule.min(1).max(5) },
    { name: 'text', title: 'Review Text', type: 'text' },
    { name: 'date', title: 'Date', type: 'date' },
  ],
};
