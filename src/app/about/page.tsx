import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'About Us | The Divine Hima',
  description: 'Learn about The Divine Hima, a luxury boutique hotel in Dharamshala where art meets the Himalayas.',
};

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <PageHero 
        title="Our Story" 
        backgroundImage="https://images.unsplash.com/photo-1585136917935-1a7dd2e8e5b1?w=1920&q=80"
      />

      <section className={`section ${styles.storySection}`}>
        <div className="container">
          <AnimateOnScroll>
            <div className={styles.storyGrid}>
              <div className={styles.storyImageWrapper}>
                <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80" alt="Hotel exterior" className={styles.storyImage} />
                <div className={styles.imageAccent}></div>
              </div>
              <div className={styles.storyContent}>
                <h2 className={styles.storyTitle}>Where Art Meets the Himalayas</h2>
                <p className={styles.storyText}>
                  The Divine Hima was born from a passion for blending art, luxury, and the timeless beauty of the Himalayas. Founded by Sanjay Kumbkarni, our boutique hotel is more than a place to stay — it's an experience that celebrates the rich cultural heritage of Dharamshala while providing world-class comfort and hospitality.
                </p>
                <p className={styles.storyText}>
                  Located opposite the renowned Norbulingka Institute in Sidhpur, we are perfectly positioned for guests to explore Tibetan art, Buddhist monasteries, and the breathtaking Dhauladhar mountain range.
                </p>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <section className={`section ${styles.valuesSection}`}>
        <div className="container">
          <h2 className="section-title">Our Philosophy</h2>
          <p className="section-subtitle">The pillars of The Divine Hima experience</p>
          
          <div className={styles.valuesGrid}>
            <AnimateOnScroll delay={0}>
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>🎨</div>
                <h3 className={styles.valueTitle}>Art & Culture</h3>
                <p className={styles.valueDesc}>
                  Every corner of our hotel is artistically crafted, creating a living gallery that celebrates local and international art forms.
                </p>
              </div>
            </AnimateOnScroll>
            
            <AnimateOnScroll delay={150}>
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>🏔️</div>
                <h3 className={styles.valueTitle}>Himalayan Heritage</h3>
                <p className={styles.valueDesc}>
                  We embrace the traditions and natural beauty of the Himalayas, from our architecture to our cuisine to our warm hospitality.
                </p>
              </div>
            </AnimateOnScroll>
            
            <AnimateOnScroll delay={300}>
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>🤝</div>
                <h3 className={styles.valueTitle}>Warm Hospitality</h3>
                <p className={styles.valueDesc}>
                  Our cordial and well-mannered staff ensure every guest feels at home, with personalized service that goes above and beyond.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <section className={`section ${styles.locationSection}`}>
        <div className="container">
          <div className={styles.locationContent}>
            <h2 className={styles.locationTitle}>Our Location</h2>
            <p className={styles.locationText}>
              Sidhpur, Dharamshala is a serene haven nestled in the lap of the Dhauladhar range. It offers the perfect balance — quiet enough for a peaceful retreat, yet close enough to key attractions.
            </p>
            
            <ul className={styles.locationList}>
              <li><strong>Norbulingka Institute:</strong> Right opposite the hotel</li>
              <li><strong>Gyuto Monastery:</strong> 2 km away</li>
              <li><strong>Chinmaya Tapovan:</strong> 4 km away</li>
              <li><strong>Dharamshala Cricket Stadium:</strong> 6 km away</li>
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className="container">
          <h2 className={styles.ctaTitle}>Experience The Divine Hima</h2>
          <Link href="/rooms" className="btn btn-primary">Explore Our Rooms</Link>
        </div>
      </section>
    </main>
  );
}
