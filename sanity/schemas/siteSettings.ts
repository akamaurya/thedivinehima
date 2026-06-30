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
    { 
      name: 'heroImage', 
      title: 'Landing Page Hero Image', 
      type: 'image', 
      options: { hotspot: true },
      description: 'The main background image at the top of the homepage'
    },
    { 
      name: 'introImage', 
      title: 'Landing Page Intro Image', 
      type: 'image', 
      options: { hotspot: true },
      description: 'The image shown in the editorial introduction section'
    },
    { 
      name: 'premiumRoomImage', 
      title: 'Premium Room Image (Landing Page)', 
      type: 'image', 
      options: { hotspot: true }
    },
    { 
      name: 'superiorRoomImage', 
      title: 'Superior Room Image (Landing Page)', 
      type: 'image', 
      options: { hotspot: true }
    },
    { 
      name: 'deluxeRoomImage', 
      title: 'Deluxe Room Image (Landing Page)', 
      type: 'image', 
      options: { hotspot: true }
    },
  ],
};
