export const siteSettings = {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    { name: 'hotelName', title: 'Hotel Name', type: 'string' },
    { name: 'phone', title: 'Phone', type: 'string' },
    { name: 'email', title: 'Email', type: 'string' },
    { name: 'address', title: 'Address', type: 'text' },
    { name: 'socialLinks', title: 'Social Links', type: 'object', fields: [
      { name: 'instagram', title: 'Instagram', type: 'url' },
      { name: 'facebook', title: 'Facebook', type: 'url' },
      { name: 'google', title: 'Google', type: 'url' },
    ]},
  ],
};
