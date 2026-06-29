import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Rooms & Suites | The Divine Hima',
  description: 'Explore our premium, superior, and deluxe rooms with stunning mountain views at The Divine Hima, Dharamshala.',
};

export default function RoomsPage() {
  return (
    <main className={styles.main}>
      <PageHero 
        title="Our Rooms & Suites" 
        backgroundImage="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&q=80"
      />

      <section className={`section ${styles.roomsList}`}>
        <div className="container">
          
          {/* Premium Room */}
          <AnimateOnScroll>
            <div className={styles.roomItem}>
              <div className={styles.roomImageWrapper}>
                <img src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1000&q=80" alt="Premium Room" className={styles.roomImage} />
              </div>
              <div className={styles.roomContent}>
                <span className={styles.roomLabel}>LUXURY</span>
                <h2 className={styles.roomTitle}>Premium Rooms</h2>
                <p className={styles.roomDesc}>
                  Experience the ultimate comfort and elegance with our luxury hotel rooms. Each premium room features handcrafted furniture, premium linens, and panoramic mountain views that will take your breath away.
                </p>
                <div className={styles.amenitiesGrid}>
                  <div className={styles.amenityItem}>🏔️ Mountain View</div>
                  <div className={styles.amenityItem}>🛏️ King Bed</div>
                  <div className={styles.amenityItem}>📶 Free Wi-Fi</div>
                  <div className={styles.amenityItem}>🛎️ Room Service</div>
                  <div className={styles.amenityItem}>🍷 Mini Bar</div>
                  <div className={styles.amenityItem}>🌅 Private Balcony</div>
                </div>
                <Link href="/contact" className="btn btn-primary">Book This Room</Link>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Superior Room */}
          <AnimateOnScroll delay={150}>
            <div className={`${styles.roomItem} ${styles.roomItemReverse}`}>
              <div className={styles.roomImageWrapper}>
                <img src="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1000&q=80" alt="Superior Room" className={styles.roomImage} />
              </div>
              <div className={styles.roomContent}>
                <span className={styles.roomLabel}>COMFORT</span>
                <h2 className={styles.roomTitle}>Superior Rooms</h2>
                <p className={styles.roomDesc}>
                  Unmatched comfort and elegance in our premium rooms. The superior rooms blend modern amenities with traditional Himachali warmth, creating a space that feels like home.
                </p>
                <div className={styles.amenitiesGrid}>
                  <div className={styles.amenityItem}>🏔️ Mountain View</div>
                  <div className={styles.amenityItem}>🛏️ Queen Bed</div>
                  <div className={styles.amenityItem}>📶 Free Wi-Fi</div>
                  <div className={styles.amenityItem}>🛎️ Room Service</div>
                  <div className={styles.amenityItem}>💼 Work Desk</div>
                  <div className={styles.amenityItem}>🛁 En-suite Bathroom</div>
                </div>
                <Link href="/contact" className="btn btn-primary">Book This Room</Link>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Deluxe Room */}
          <AnimateOnScroll delay={300}>
            <div className={styles.roomItem}>
              <div className={styles.roomImageWrapper}>
                <img src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1000&q=80" alt="Deluxe Room" className={styles.roomImage} />
              </div>
              <div className={styles.roomContent}>
                <span className={styles.roomLabel}>COZY</span>
                <h2 className={styles.roomTitle}>Deluxe Rooms</h2>
                <p className={styles.roomDesc}>
                  Relax in comfort with our deluxe rooms featuring modern amenities and breathtaking views. Perfect for couples and solo travelers seeking a cozy retreat in the mountains.
                </p>
                <div className={styles.amenitiesGrid}>
                  <div className={styles.amenityItem}>🌳 Garden View</div>
                  <div className={styles.amenityItem}>🛏️ Double Bed</div>
                  <div className={styles.amenityItem}>📶 Free Wi-Fi</div>
                  <div className={styles.amenityItem}>🛎️ Room Service</div>
                  <div className={styles.amenityItem}>☕ Tea/Coffee Maker</div>
                </div>
                <Link href="/contact" className="btn btn-primary">Book This Room</Link>
              </div>
            </div>
          </AnimateOnScroll>

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
