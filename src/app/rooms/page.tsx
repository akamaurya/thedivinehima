import type { Metadata } from 'next';
import Link from 'next/link';
import { client } from '../../../sanity/lib/client';
import { urlForImage } from '../../../sanity/lib/image';
import PageHero from '@/components/PageHero';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Rooms & Suites | The Divine Hima',
  description: 'Explore our premium, superior, and deluxe rooms with stunning mountain views at The Divine Hima, Dharamshala.',
};

export const dynamic = 'force-static';

export default async function RoomsPage() {
  const query = `*[_type == "room"] | order(price desc) {
    _id,
    name,
    "slug": slug.current,
    roomType,
    description,
    images,
    amenities,
    price
  }`;

  const rooms = await client.fetch(query);

  return (
    <main className={styles.main}>
      <PageHero 
        title="Our Rooms & Suites" 
        backgroundImage="https://thedivinehima.com/wp-content/uploads/2024/12/premium-3.jpg"
      />

      <section className={`section ${styles.roomsList}`}>
        <div className="container">
          
          {rooms.map((room: any, index: number) => {
            const isReverse = index % 2 !== 0;
            const imageUrl = room.images && room.images.length > 0 
              ? urlForImage(room.images[0]).url() 
              : 'https://thedivinehima.com/wp-content/uploads/2024/12/premium-1.jpg'; // fallback

            return (
              <AnimateOnScroll key={room._id} delay={index * 150}>
                <div className={`${styles.roomItem} ${isReverse ? styles.roomItemReverse : ''}`}>
                  <div className={styles.roomImageWrapper}>
                    <img src={imageUrl} alt={room.name} className={styles.roomImage} />
                  </div>
                  <div className={styles.roomContent}>
                    <span className={styles.roomLabel}>{room.roomType?.toUpperCase() || 'ROOM'}</span>
                    <h2 className={styles.roomTitle}>{room.name}</h2>
                    <p className={styles.roomDesc}>{room.description}</p>
                    <div className={styles.amenitiesGrid}>
                      {room.amenities?.slice(0, 6).map((amenity: string, i: number) => (
                        <div key={i} className={styles.amenityItem}>✨ {amenity}</div>
                      ))}
                    </div>
                    <Link href={`/rooms/${room.slug}`} className="btn btn-primary">View Details</Link>
                  </div>
                </div>
              </AnimateOnScroll>
            );
          })}

        </div>
      </section>

      <section className={styles.bottomCta}>
        <div className="container">
          <h3 className={styles.ctaTitle}>Can't decide?</h3>
          <p className={styles.ctaText}>Let us help you find the perfect room for your stay.</p>
          <a href="tel:+918626983777" className="btn btn-secondary">Call us at +91 86269 83777</a>
        </div>
      </section>
    </main>
  );
}
