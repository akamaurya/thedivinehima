// Site-wide facts used in metadata, copy and JSON-LD. Change them only here.
import { PHONE_E164 } from '@/lib/contact';

export const SITE = 'https://thedivinehima.com';
export const HOTEL_ID = `${SITE}/#hotel`;
export const EMAIL = 'reservation@thedivinehima.com';
export const BOOKING_URL = 'https://asiatech.in/booking_engine/index3?token=MTA4NDQ=';
export const LOGO = `${SITE}/wp-content/uploads/2016/03/cropped-Divine-Hima-logo-512-270x270.png`;

// Google Business Profile figures, as shown on the live WordPress site (Nov 2026).
// Update both together when the review count moves.
export const RATING = { value: '4.5', count: '1264', countLabel: '1,264' };

export const abs = (path: string) => (path.startsWith('http') ? path : `${SITE}${path}`);

export const hotelSchema = {
  '@context': 'https://schema.org',
  '@type': 'Hotel',
  '@id': HOTEL_ID,
  name: 'The Divine Hima',
  url: `${SITE}/`,
  logo: LOGO,
  image: [
    `${SITE}/wp-content/uploads/2024/12/luxury-hotel-in-dharamshala.jpg`,
    `${SITE}/wp-content/uploads/2016/03/divine-hima0044.jpg`,
  ],
  description:
    'A 12-room boutique hotel in Sidhpur, Dharamshala, opposite the Norbulingka Institute. Mountain-view rooms named after Himalayan passes, an in-house restaurant, café, wood-fired pizzeria and bar.',
  telephone: PHONE_E164,
  email: EMAIL,
  priceRange: '₹7,450 to ₹15,000 per night',
  currenciesAccepted: 'INR',
  checkinTime: '14:00',
  checkoutTime: '11:00',
  petsAllowed: true,
  numberOfRooms: 12,
  foundingDate: '2016',
  founder: { '@type': 'Person', name: 'Sanjay Kumbkarni', jobTitle: 'Geologist and founder' },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Opposite Norbulingka Institute, Sidhpur',
    addressLocality: 'Dharamshala',
    addressRegion: 'Himachal Pradesh',
    postalCode: '176057',
    addressCountry: 'IN',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 32.1932, longitude: 76.3533 },
  hasMap: 'https://www.google.com/maps/search/?api=1&query=The+Divine+Hima+Dharamshala',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: RATING.value,
    reviewCount: RATING.count,
    bestRating: '5',
    worstRating: '1',
  },
  sameAs: [
    'https://www.instagram.com/thedivinehima',
    'https://www.facebook.com/thedivinehima',
    'https://www.tripadvisor.in/Hotel_Review-g2058079-d10243144-Reviews-The_Divine_Hima-Sidhpur_Dharamshala_Kangra_District_Himachal_Pradesh.html',
  ],
  amenityFeature: [
    'Free WiFi', 'Restaurant', 'Café', 'Wood-fired pizzeria', 'Bar', 'Free parking',
    'Airport transfer on request', 'Pet friendly', 'Room service', 'Library', 'Art gallery',
    'Complimentary breakfast', 'Daily housekeeping',
  ].map((name) => ({ '@type': 'LocationFeatureSpecification', name, value: true })),
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE}/#website`,
  url: `${SITE}/`,
  name: 'The Divine Hima',
  publisher: { '@id': HOTEL_ID },
  inLanguage: 'en-IN',
};
