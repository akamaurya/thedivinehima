// Seed the page content WordPress never had as structured data: packages, About, Dining
// and testimonials. Copy comes from the live site (/retreats/, /divine-study/, homepage
// reviews) and the archived /divine-holiday-packages/ and /break-free-divine-package/ pages.
// Fixed _ids, so reruns overwrite instead of duplicating. Rerunning also overwrites
// any Studio edits to these documents, so only rerun on purpose.
// Usage: node scripts/seed-pages.mjs [--dry]
import { createClient } from '@sanity/client';

process.loadEnvFile(); // token: `migration_wp` in .env
const client = createClient({ projectId: 'cwlrdggu', dataset: 'production', apiVersion: '2024-06-29', token: process.env.migration_wp, useCdn: false });

const holidayInclusions = [
  'Breakfast and dinner every day',
  'All taxes included',
  'Free minibar items',
  '10% off the Divine Café menu',
  'Children under 5 stay free',
];

const docs = [
  {
    _id: 'pkg-himalayan-reset',
    _type: 'package',
    name: 'The Himalayan Reset',
    slug: { _type: 'slug', current: 'the-himalayan-reset' },
    tagline: 'Yoga and wellness retreat',
    duration: '6 days / 5 nights, Monday to Saturday',
    price: 'From $599 per person, all-inclusive',
    description:
      'A small-group yoga and wellness week for up to 12 guests: daily Hatha and Vinyasa yoga, guided meditation, the Triund trek, Tibetan culture in McLeod Ganj and every meal from our own kitchen. You stay in your own private room, not a dorm. All levels welcome.',
    inclusions: [
      '5 nights in a private mountain-view room',
      'All vegetarian meals, herbal teas and evening chai',
      '8 yoga and 4 meditation sessions',
      'Guided Triund trek day',
      'McLeod Ganj and Norbulingka cultural visits',
      'Airport and bus-stand transfers',
      'A free 60-minute Ayurvedic massage',
    ],
    url: '/retreats/',
    featured: true,
    order: 1,
  },
  {
    _id: 'pkg-divine-holiday-2n',
    _type: 'package',
    name: 'Divine Holiday Package, 2 Nights',
    slug: { _type: 'slug', current: 'divine-holiday-package-2-nights' },
    tagline: 'Short break',
    duration: '2 nights / 3 days',
    price: 'From ₹19,999 for two',
    description:
      'Two nights in the room of your choice, with breakfast and dinner each day. Prices are for two guests on twin sharing, including taxes: Deluxe ₹19,999, Superior Deluxe ₹23,999, Large Deluxe ₹26,999 and the Pin Parbati family suite ₹31,999.',
    inclusions: holidayInclusions,
    featured: false,
    order: 2,
  },
  {
    _id: 'pkg-divine-holiday-3n',
    _type: 'package',
    name: 'Divine Holiday Package, 3 Nights',
    slug: { _type: 'slug', current: 'divine-holiday-package-3-nights' },
    tagline: 'Long weekend',
    duration: '3 nights / 4 days',
    price: 'From ₹28,999 for two',
    description:
      'Three nights to see Dharamshala properly, with breakfast and dinner each day. Prices are for two guests on twin sharing, including taxes: Deluxe ₹28,999, Superior Deluxe ₹34,999, Large Deluxe ₹38,999 and the Pin Parbati family suite ₹45,999.',
    inclusions: holidayInclusions,
    featured: false,
    order: 3,
  },
  // Withdrawn from the live site, so it stays a draft: visible in Studio, not on the site.
  {
    _id: 'drafts.pkg-break-free',
    _type: 'package',
    name: 'Break-Free Divine Package',
    slug: { _type: 'slug', current: 'break-free-divine-package' },
    tagline: 'For honeymooners and anniversaries',
    duration: '3 nights / 4 days',
    price: '₹59,000 for two, including taxes',
    description:
      'Airport pickup and a wine-and-cheese welcome, Kangra Fort with an audio guide, a day at Billing for paragliding and a rhododendron forest walk, then your choice of the Pong reservoir and Masroor rock-cut temples or McLeod Ganj and the tea gardens. Log-fire dinners at the hotel every night.',
    inclusions: ['Airport transfers', 'All meals and sightseeing in the itinerary', 'Free minibar items', 'A framed limited-edition photograph from the Divine Hima gallery', 'Children under 5 stay free'],
    featured: false,
    order: 4,
  },
  {
    _id: 'aboutPage',
    _type: 'aboutPage',
    storyTitle: 'A Geologist’s Tribute to the Himalayas',
    story: [
      'The Divine Hima was built by Sanjay Kumbkarni, a geologist who spent 25 years working and walking in the Himalayas. Years in remote, staggeringly beautiful country led him to photography, and long months of solitude taught him to cook. The hotel is where those three things meet.',
      'It stands on the slopes of the Dhauladhar fluvio-glacial plain in Sidhpur, Dharamshala, on granite boulders and between old tea gardens, directly opposite the Norbulingka Institute. The architecture uses local stone and timber, and the rooms are named after the Himalayan passes Sanjay crossed.',
      'Inside, it is part guesthouse and part gallery. His photographs hang in every room and corridor, objects collected on mountain walks sit in its corners, and there is a library, a fire room and a carpeted octagon on the roof for yoga and meditation.',
    ],
    founderQuote:
      'A geologist by profession, for 25 years I gathered the Himalayas in my heart. Living in the shadows of these majestic mountains, awed by their splendour, humbled by their immense vastness, my life has been filled with worship for these peaks. The Divine Hima is a journey, a tribute, a culmination of my life’s wonderment with the Himalayas.',
    features: [
      { _key: 'gallery', title: 'An art gallery you sleep in', text: 'Sanjay’s Himalayan photographs fill the corridors and every guest room, so the gallery carries on through your stay.' },
      { _key: 'library', title: 'The library', text: 'Shelves of books and a collection of films for families, with sofas made for rainy afternoons.' },
      { _key: 'fire', title: 'The fire room', text: 'A warm room built for winter evenings, board games and long conversations.' },
      { _key: 'octagon', title: 'The rooftop octagon', text: 'A carpeted octagonal room on the roof for yoga, meditation and massage, facing the Dhauladhars.' },
      { _key: 'walks', title: 'Walks with a geologist', text: 'Nature walks and treks into the hills, sometimes with a geologist who can read every rock along the way.' },
    ],
  },
  {
    _id: 'diningPage',
    _type: 'diningPage',
    intro:
      'Four places to eat and drink under one roof in Sidhpur, Dharamshala. Our kitchen cooks Italian, Japanese, Chinese, Tibetan, North and South Indian and local Himachali food, with plenty of vegetarian and vegan dishes, and breakfast is included for every hotel guest.',
    restaurantText:
      'The main restaurant serves seven cuisines, from Himachali dham and Tibetan thukpa to Italian pasta and Japanese dishes, cooked to order with local produce. The dining hall is kept for overnight guests, which keeps dinner calm and unhurried. Ask us about a traditional Kangra dham or a candlelit dinner for a special occasion.',
    cafeText:
      'Divine Café is open to walk-in visitors as well as guests. Come for coffee, light meals and free Wi-Fi, and stay to browse the art gallery and the library next door. It is a short walk from the Norbulingka Institute, which makes it an easy stop on a day of sightseeing.',
    pizzeriaText:
      'Our pizzas are baked in a wood-fired clay oven and made to order with a thin, blistered crust. Walk-ins are welcome; see the pizzeria menu or call ahead for a table.',
    barText:
      'The Bar By Far pours premium spirits, cocktails and local brews in a small, warm room. It is where retreat guests have their farewell evening and where most of our guests end the day after the mountains.',
  },
  ...[
    ['Vishal Singh Rana', 'Overall, this property seamlessly blends art, luxury, and functionality, creating an almost perfect experience. Anyone visiting can enjoy a delightful fusion of art and geology, adding depth to their time spent here. The staff are cordial and well-mannered, enhancing the overall ambiance. Additionally, the food is excellent.'],
    ['Shilpa Manhas', 'Absolutely divine place to visit, amazing food, drinks and artistically crafted every corner of the hotel. Authentic food served with so much love and grace. Peaceful ambience.'],
    ['Ankan Paul', 'This property blends art, luxury and functionality to near perfection. If you are into art and geology then this place should be on your list of destinations even if you are not staying here. The staff were cordial and well-mannered.'],
  ].map(([name, text], i) => ({ _id: `testimonial-google-${i + 1}`, _type: 'testimonial', name, text })),
];

if (process.argv.includes('--dry')) {
  console.log(docs.map((d) => `${d._id} (${d._type})`).join('\n'));
} else {
  await docs.reduce((t, doc) => t.createOrReplace(doc), client.transaction()).commit();
  console.log(`Seeded ${docs.length} documents.`);
}
