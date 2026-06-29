import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Dining & Restaurant | The Divine Hima',
  description: 'Experience a culinary journey at The Divine Hima with Italian, Japanese, Chinese, Tibetan, and local Himachali cuisine.',
};

export default function DiningPage() {
  return (
    <main className={styles.main}>
      <PageHero 
        title="Dining at The Divine Hima" 
        backgroundImage="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80"
      />

      <section className={`section ${styles.introSection}`}>
        <div className="container">
          <p className={styles.introText}>
            From Italian to Himachali, Japanese to Tibetan — experience a culinary journey that celebrates flavors from around the world, crafted with local ingredients and international flair.
          </p>
        </div>
      </section>

      <section className={styles.venuesList}>
        <div className="container">
          
          {/* The Restaurant */}
          <AnimateOnScroll>
            <div className={styles.venueItem}>
              <div className={styles.venueImageWrapper}>
                <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1000&q=80" alt="The Restaurant" className={styles.venueImage} />
              </div>
              <div className={styles.venueContent}>
                <h2 className={styles.venueTitle}>The Restaurant</h2>
                <p className={styles.venueDesc}>
                  Our main restaurant offers cuisines as varied as Italian, Japanese, Chinese, Tibetan, Indian, South-Indian and local Himachali. The dining hall is exclusively reserved for overnight guests, ensuring an intimate and refined experience.
                </p>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Divine Cafe */}
          <AnimateOnScroll delay={150}>
            <div className={`${styles.venueItem} ${styles.venueItemReverse}`}>
              <div className={styles.venueImageWrapper}>
                <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1000&q=80" alt="Divine Café" className={styles.venueImage} />
              </div>
              <div className={styles.venueContent}>
                <h2 className={styles.venueTitle}>Divine Café</h2>
                <p className={styles.venueDesc}>
                  The Café welcomes casual walk-ins and folks curious about the art gallery and the library. Enjoy light bites, artisan coffee, and free WiFi in a relaxed, creative atmosphere.
                </p>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Firewood Pizzeria */}
          <AnimateOnScroll delay={300}>
            <div className={styles.venueItem}>
              <div className={styles.venueImageWrapper}>
                <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1000&q=80" alt="Firewood Pizzeria" className={styles.venueImage} />
              </div>
              <div className={styles.venueContent}>
                <h2 className={styles.venueTitle}>Firewood Pizzeria</h2>
                <p className={styles.venueDesc}>
                  Visit us for the best wood-fired clay oven pizzas. Our authentic pizzeria uses traditional techniques and fresh ingredients for an unforgettable taste of Italy in the Himalayas.
                </p>
              </div>
            </div>
          </AnimateOnScroll>

          {/* The Bar By Far */}
          <AnimateOnScroll delay={450}>
            <div className={`${styles.venueItem} ${styles.venueItemReverse}`}>
              <div className={styles.venueImageWrapper}>
                <img src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1000&q=80" alt="The Bar By Far" className={styles.venueImage} />
              </div>
              <div className={styles.venueContent}>
                <h2 className={styles.venueTitle}>The Bar By Far</h2>
                <p className={styles.venueDesc}>
                  Unwind with a curated selection of premium spirits, cocktails, and local brews in a cozy, vibrant setting. The ultimate spot to end your day in the mountains.
                </p>
              </div>
            </div>
          </AnimateOnScroll>

        </div>
      </section>
    </main>
  );
}
