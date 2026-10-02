import type { Metadata } from 'next';
import Link from 'next/link';
import { client } from '../../../sanity/lib/client';
import { urlForImage } from '../../../sanity/lib/image';
import PageHero from '@/components/PageHero';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Rooms & Suites',
  description: 'Explore our premium, superior, and deluxe rooms with stunning mountain views at The Divine Hima, Dharamshala.',
  openGraph: {
    title: 'Rooms & Suites | The Divine Hima',
    description: 'Explore our premium, superior, and deluxe rooms with stunning mountain views at The Divine Hima, Dharamshala.',
    url: 'https://thedivinehima.com/divine-rooms/',
    images: [
      {
        url: '/wp-content/uploads/2024/12/premium-3.jpg',
        width: 1200,
        height: 630,
        alt: 'Rooms at The Divine Hima',
      }
    ],
  },
  alternates: {
    canonical: '/divine-rooms/',
  },
};

export const dynamic = 'force-static';

export default async function RoomsPage() {
  const query = `*[_type == "room" && defined(slug.current)] | order(price desc) {
    _id,
    name,
    "slug": slug.current,
    roomType,
    description,
    images,
    amenities
  }`;

  const rooms = await client.fetch(query);

  return (
    <main className={styles.main}>
      <PageHero 
        title="Our Rooms & Suites" 
        backgroundImage="/wp-content/uploads/2024/12/premium-3.jpg"
      />

      {rooms.map((room: any, index: number) => {
        const isReverse = index % 2 !== 0;
        const imageUrl = room.images && room.images.length > 0 
          ? urlForImage(room.images[0]).url() 
          : '/wp-content/uploads/2024/12/premium-1.jpg'; // fallback

        return (
          <section key={room._id} className={styles.roomSection}>
            <AnimateOnScroll delay={index * 150}>
              <div className={`${styles.roomInner} ${isReverse ? styles.reversed : ''}`}>
                <div className={styles.imageCol}>
                  <img src={imageUrl} alt={room.name} className={styles.roomImage} />
                </div>
                <div className={styles.contentCol}>
                  <span className={styles.roomLabel}>{room.roomType?.toUpperCase() || 'ROOM'}</span>
                  <h2 className={styles.roomTitle}>{room.name}</h2>
                  <p className={styles.roomDescription}>{room.description}</p>
                  <div className={styles.amenitiesGrid}>
                    {room.amenities?.slice(0, 6).map((amenity: string, i: number) => (
                      <div key={i} className={styles.amenityPill}>
                        <span className={styles.amenityEmoji}>✨</span> {amenity}
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <a href="https://asiatech.in/booking_engine/index3?token=MTA4NDQ%3D" className="btn btn-primary">Book Now</a>
                    <Link href={`/rooms/${room.slug}/`} className={`btn btn-secondary ${styles.bookBtn}`}>View Details</Link>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </section>
        );
      })}

      <section className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <h3 className={styles.ctaTitle}>Can't decide?</h3>
          <p className={styles.ctaText}>Let us help you find the perfect room for your stay.</p>
          <a href="tel:+918626983777" className={styles.ctaPhone}>+91 86269 83777</a>
        </div>
      </section>
    </main>
  );
}
