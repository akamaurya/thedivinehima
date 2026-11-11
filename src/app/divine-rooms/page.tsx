import type { Metadata } from 'next';
import Link from 'next/link';
import { client } from '../../../sanity/lib/client';
import { urlForImage } from '../../../sanity/lib/image';
import PageHero from '@/components/PageHero';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import Breadcrumbs from '@/components/Breadcrumbs';
import FAQ from '@/components/FAQ';
import JsonLd from '@/components/JsonLd';
import { PHONE_DISPLAY, TEL_URL } from '@/lib/contact';
import { ROOMS_FAQS } from '@/lib/faqs';
import { BOOKING_URL, HOTEL_ID, RATING, SITE } from '@/lib/schema';
import styles from './page.module.css';

const description =
  'Boutique rooms in Dharamshala from ₹7,450 a night with breakfast: Deluxe, Superior and Premium rooms, a family suite and a penthouse, each named after a Himalayan pass.';

export const metadata: Metadata = {
  title: { absolute: 'Rooms in Dharamshala: Deluxe, Superior & Premium | The Divine Hima' },
  description,
  openGraph: {
    title: 'Rooms and Suites at The Divine Hima, Dharamshala',
    description,
    url: `${SITE}/divine-rooms/`,
    images: [{ url: '/wp-content/uploads/2024/12/premium-3.jpg', width: 1200, height: 630, alt: 'A premium room at The Divine Hima, Dharamshala' }],
  },
  alternates: { canonical: '/divine-rooms/' },
};

export const dynamic = 'force-static';

const categories = [
  { name: 'Deluxe Rooms', text: 'Warm twin rooms with mountain views, south-facing balconies and every essential done well. The ideal base for exploring Dharamshala and McLeod Ganj.' },
  { name: 'Superior Rooms', text: 'More space, valley views and boutique interiors. A step up for longer stays and slower mornings in the mountains.' },
  { name: 'Premium Rooms', text: 'Our best rooms: the two-bedroom Pin Parbati family suite, The South Col with its long verandah, and The Sagarmatha Penthouse in a Swiss ski-hut loft.' },
];

const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;

export default async function RoomsPage() {
  const rooms = await client.fetch(`*[_type == "room" && defined(slug.current)] | order(price desc) {
    _id, name, "slug": slug.current, roomType, description, images, amenities, price
  }`);

  return (
    <main className={styles.main}>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Rooms at The Divine Hima, Dharamshala',
          itemListElement: rooms.map((r: any, i: number) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `${SITE}/rooms/${r.slug}/`,
            item: {
              '@type': 'HotelRoom',
              name: r.name,
              url: `${SITE}/rooms/${r.slug}/`,
              description: r.description,
              ...(r.images?.[0] ? { image: urlForImage(r.images[0]).width(1200).url() } : {}),
              containedInPlace: { '@id': HOTEL_ID },
              ...(r.price ? { offers: { '@type': 'Offer', price: String(r.price), priceCurrency: 'INR', unitText: 'per night', url: BOOKING_URL } } : {}),
            },
          })),
        }}
      />
      <PageHero
        title="Rooms in Dharamshala"
        subtitle="Twelve boutique rooms, each named after a Himalayan pass"
        backgroundImage="/wp-content/uploads/2024/12/premium-3.jpg"
        alt="A premium room at The Divine Hima, Dharamshala"
      />
      <Breadcrumbs items={[{ name: 'Rooms', href: '/divine-rooms/' }]} />

      <section className="section">
        <div className="container prose">
          <p>
            The Divine Hima is a 12-room boutique hotel in Sidhpur, Dharamshala, opposite the Norbulingka Institute, with views of the Dhauladhar range from almost every room. Each room is named after a Himalayan pass and furnished differently, with original art, local stone and wood, and modern comforts throughout. <strong>Complimentary breakfast and daily housekeeping are included with every stay</strong>, and rates start at {inr(7450)} a night.
          </p>
          <p>
            Couples, families and solo travellers are all at home here, and pets are welcome too. The restaurant, wood-fired pizzeria, café and bar are a staircase away, and Gyuto Monastery and the HPCA cricket stadium a short drive from the door.
          </p>
          <h2>Choose a room category</h2>
          {categories.map((c) => (
            <div key={c.name}>
              <h3>{c.name}</h3>
              <p>{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      <h2 className="visually-hidden">All rooms</h2>
      {rooms.map((room: any, index: number) => {
        const imageUrl = room.images?.length ? urlForImage(room.images[0]).width(1200).url() : '/wp-content/uploads/2024/12/premium-1.jpg';

        return (
          <section key={room._id} className={styles.roomSection} aria-labelledby={`room-${room.slug}`}>
            <AnimateOnScroll delay={index * 150}>
              <div className={`${styles.roomInner} ${index % 2 ? styles.reversed : ''}`}>
                <div className={styles.imageCol}>
                  <img src={imageUrl} alt={`${room.name}, a boutique room at The Divine Hima, Dharamshala`} className={styles.roomImage} loading={index ? 'lazy' : 'eager'} />
                </div>
                <div className={styles.contentCol}>
                  {room.roomType && <span className={styles.roomLabel}>{room.roomType} room</span>}
                  <h3 id={`room-${room.slug}`} className={styles.roomTitle}>
                    <Link href={`/rooms/${room.slug}/`}>{room.name}</Link>
                  </h3>
                  {room.price && <p className={styles.roomPrice}>From {inr(room.price)} a night, breakfast included</p>}
                  <p className={styles.roomDescription}>{room.description}</p>
                  <ul className={styles.amenitiesGrid}>
                    {room.amenities?.slice(0, 6).map((amenity: string) => (
                      <li key={amenity} className={styles.amenityPill}>{amenity}</li>
                    ))}
                  </ul>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <a href={BOOKING_URL} className="btn btn-primary">Book now</a>
                    <Link href={`/rooms/${room.slug}/`} className={`btn btn-secondary ${styles.bookBtn}`}>Room details</Link>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </section>
        );
      })}

      <section className="section">
        <div className="container prose">
          <h2>Why book direct with us</h2>
          <ul>
            <li>Our best available rate, always, with no booking-site markup</li>
            <li>Complimentary breakfast and daily housekeeping on every stay</li>
            <li>Rated {RATING.value} on Google by {RATING.countLabel} guests</li>
            <li>Pet friendly, with secure on-site parking</li>
            <li>Airport pickup and local sightseeing arranged on request</li>
          </ul>
          <p>
            Staying three nights or more? Our <Link href="/divine-holiday-packages/">holiday packages</Link> add dinner every day and include taxes.
          </p>
        </div>
      </section>

      <FAQ items={ROOMS_FAQS} title="Questions about our rooms" />

      <section className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>Not sure which room?</h2>
          <p className={styles.ctaText}>Call us and we will help you choose the right room for your stay.</p>
          <a href={TEL_URL} className={styles.ctaPhone}>{PHONE_DISPLAY}</a>
        </div>
      </section>
    </main>
  );
}
