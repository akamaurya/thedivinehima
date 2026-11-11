// Guest questions, shown on the page and emitted as FAQPage schema by <FAQ>.
// Facts here (times, distances, policy) must match the footer and src/lib/schema.ts.
import type { FAQItem } from '@/components/FAQ';
import { PHONE_DISPLAY } from '@/lib/contact';
import { EMAIL, RATING } from '@/lib/schema';

const f = {
  location: {
    q: 'Where is The Divine Hima?',
    a: 'We are in Sidhpur, Dharamshala, directly opposite the Norbulingka Institute in the Kangra district of Himachal Pradesh (PIN 176057). Gyuto Monastery is 2 km away, the HPCA cricket stadium 6 km and McLeod Ganj about 20 km.',
  },
  airport: {
    q: 'How far is the hotel from Kangra (Gaggal) airport?',
    a: 'About 12 km, or 25 to 30 minutes by road. We arrange airport and Dharamshala bus-stand pickups on request.',
  },
  times: {
    q: 'What are the check-in and check-out times?',
    a: 'Check-in is from 2:00 PM and check-out is by 11:00 AM. Ask us about early check-in or late check-out and we will do our best around other bookings.',
  },
  breakfast: {
    q: 'Is breakfast included?',
    a: 'Yes. Complimentary breakfast and daily housekeeping are included with every stay. Room prices are shown before taxes.',
  },
  bestTime: {
    q: 'What is the best time to visit Dharamshala?',
    a: 'March to June for pleasant weather, late September to November for clear skies and mountain views, and late December to February if you want to see snow on the Dhauladhars.',
  },
  amenities: {
    q: 'What amenities does the hotel have?',
    a: 'Free Wi-Fi, room service, an in-house multi-cuisine restaurant, Divine Café with an art gallery and library, a wood-fired pizzeria, The Bar By Far, secure on-site parking and a travel desk for local sightseeing.',
  },
  veg: {
    q: 'Do you serve vegetarian and vegan food?',
    a: 'Yes. Our kitchen cooks Indian, Himachali, Tibetan, Italian, Japanese and Chinese dishes, with plenty of vegetarian and vegan choices. Tell us about any dietary needs when you book.',
  },
  family: {
    q: 'Do you have family rooms or suites?',
    a: 'Yes. The Pin Parbati Pass is a family suite with two bedrooms and two bathrooms for up to four adults, and The Parang La Pass has a loft with a bunk bed for children up to 12.',
  },
  children: {
    q: 'What do you charge for children?',
    a: 'Children under 5 stay free. Children up to 12 are charged ₹800 per night, and children over 12 needing an extra bed ₹1,600 per night. Only one extra cot fits in rooms other than the family suite.',
  },
  pets: {
    q: 'Are pets allowed?',
    a: 'Yes, The Divine Hima is pet friendly. Please let us know in advance if you are bringing a pet.',
  },
  cancellation: {
    q: 'What is your cancellation policy?',
    a: 'Full refund if you cancel at least 14 days before arrival, 50% refund if you cancel at least 3 days before arrival, and no refund after that. Packages and retreats can have their own terms, which we confirm when you book.',
  },
  transport: {
    q: 'Can you arrange transport to local attractions?',
    a: 'Yes. Our travel desk arranges cars to McLeod Ganj, the Dalai Lama Temple, Bhagsunag waterfall, the Triund trek start at Gallu Devi, Bir Billing and Palampur.',
  },
  honeymoon: {
    q: 'Do you offer honeymoon or special-occasion packages?',
    a: 'Yes. We arrange room décor, candlelight dinners and multi-night holiday packages for honeymoons, anniversaries and birthdays. See our holiday packages or message us your dates.',
  },
  parking: {
    q: 'Is there parking at the hotel?',
    a: 'Yes, we have secure on-site parking for guests at no extra cost.',
  },
  book: {
    q: 'How do I book a room?',
    a: `Book direct on this website for the best available rate, call us on ${PHONE_DISPLAY}, message us on WhatsApp, or email ${EMAIL}.`,
  },
  reviews: {
    q: 'What do guests say about The Divine Hima?',
    a: `The hotel is rated ${RATING.value} out of 5 by ${RATING.countLabel} guests on Google. Guests most often mention the art throughout the hotel, the food, and the calm setting opposite Norbulingka.`,
  },
  roomsCount: {
    q: 'How many rooms does the hotel have?',
    a: 'The Divine Hima has 12 rooms in three categories: Deluxe, Superior and Premium. Each is named after a Himalayan pass, from The Kugti Pass to The Sagarmatha Penthouse, and no two are alike.',
  },
  roomPrice: {
    q: 'How much is a room per night?',
    a: 'Rooms start at ₹7,450 per night for a Deluxe room and go up to ₹15,000 for The Sagarmatha Penthouse, with breakfast included. Taxes are extra. Booking direct gets you the best available rate.',
  },
  roomFeatures: {
    q: 'What is in every room?',
    a: 'Mountain views, original artwork, free Wi-Fi, a mini bar, satellite TV, an electronic locker, a study or dressing table, a tea and coffee maker and a private bathroom. Most rooms have a private balcony.',
  },
  nonGuests: {
    q: 'Can non-guests eat at the hotel?',
    a: 'Divine Café and the Firewood Pizzeria welcome walk-in visitors. The main restaurant’s dining hall is kept for overnight guests, so call ahead if you would like to book a table there.',
  },
  cuisines: {
    q: 'What cuisines does the restaurant serve?',
    a: 'Italian, Japanese, Chinese, Tibetan, North and South Indian, and local Himachali food, including a traditional Kangra dham on request.',
  },
  hours: {
    q: 'When can I reach the front desk?',
    a: `WhatsApp, phone and email are answered from 8:00 AM to 10:30 PM IST. Call ${PHONE_DISPLAY} for anything urgent.`,
  },
  reach: {
    q: 'How do I get to the hotel?',
    a: 'Fly to Kangra (Gaggal) airport, 12 km away. The nearest mainline railway station is Pathankot Junction, about 85 km away, and overnight buses run from Delhi (about 475 km) to Dharamshala. We can arrange a pickup from any of them. Our guide on how to reach Dharamshala has every route.',
  },
} satisfies Record<string, FAQItem>;

export const HOME_FAQS = [f.location, f.airport, f.times, f.breakfast, f.bestTime, f.amenities, f.veg, f.family, f.pets, f.cancellation, f.transport, f.honeymoon, f.parking, f.reviews, f.book];
export const ROOMS_FAQS = [f.roomsCount, f.roomPrice, f.roomFeatures, f.breakfast, f.times, f.family, f.children, f.pets, f.cancellation, f.book];
export const ROOM_FAQS = [f.breakfast, f.times, f.children, f.cancellation, f.book];
export const CONTACT_FAQS = [f.location, f.reach, f.airport, f.times, f.hours, f.parking, f.book];
export const DINING_FAQS = [f.nonGuests, f.cuisines, f.veg, f.breakfast];
export const PACKAGE_FAQS = [f.honeymoon, f.children, f.cancellation, f.transport, f.book];
