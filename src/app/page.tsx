'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

const rooms = [
  {
    name: 'Premium Rooms',
    type: 'LUXURY',
    description: 'Experience the ultimate comfort and elegance with our luxury hotel rooms.',
    image: 'https://thedivinehima.com/wp-content/uploads/2024/12/premium-1.jpg',
  },
  {
    name: 'Superior Rooms',
    type: 'COMFORT',
    description: 'Unmatched comfort and elegance in our premium rooms in Dharamshala.',
    image: 'https://thedivinehima.com/wp-content/uploads/2024/12/luxury-1.jpg',
  },
  {
    name: 'Deluxe Rooms',
    type: 'COZY',
    description: 'Relax in comfort with modern amenities and breathtaking mountain views.',
    image: 'https://thedivinehima.com/wp-content/uploads/2024/12/deluxe-2.jpg',
  },
];

const amenities = [
  {
    icon: '🍽️',
    title: 'Restaurant',
    description: 'Italian, Japanese, Chinese, Tibetan, Indian, South-Indian and local Himachali cuisine',
  },
  {
    icon: '☕',
    title: 'Divine Café',
    description: 'Casual walk-ins welcome with free WiFi, art gallery, and library access',
  },
  {
    icon: '🍕',
    title: 'Firewood Pizzeria',
    description: 'The best wood-fired clay oven pizzas — authentic taste guaranteed',
  },
  {
    icon: '🍸',
    title: 'The Bar By Far',
    description: 'Premium spirits, cocktails, and local brews in a cozy setting',
  },
  {
    icon: '🅿️',
    title: 'Ample Parking',
    description: 'Secure on-site parking with drop-in & pickup service',
  },
];

const testimonials = [
  {
    name: 'Vishal Singh Rana',
    text: 'This property seamlessly blends art, luxury, and functionality, creating an almost perfect experience. The staff are cordial and well-mannered, and the food is excellent.',
  },
  {
    name: 'Shilpa Manhas',
    text: 'Absolutely divine place to visit, amazing food, drinks and artistically crafted every corner of the hotel. Authentic food served with so much love and grace.',
  },
  {
    name: 'Ankan Paul',
    text: 'This property blends art, luxury and functionality to near perfection. If you are into art and geology then this place should be on your list of destinations.',
  },
];

const sights = [
  {
    title: 'Norbulingka Institute',
    distance: 'Walking distance',
    description: "Famous Tibetan Arts Institute and learning center, named after the Dalai Lama's summer residence.",
  },
  {
    title: 'Gyuto Monastery',
    distance: '2 km',
    description: 'One of the famous Buddhist Monasteries, abode of Karmapa, Head of Kagyu Tibetan Buddhism.',
  },
  {
    title: 'Chinmaya Tapovan',
    distance: '4 km',
    description: 'Ashram with Ram temple, 9-meter Hanuman image, meditation hall and school.',
  },
  {
    title: 'HPCA Cricket Stadium',
    distance: '6 km',
    description: 'The picturesque cricket stadium at 1,457m amidst the Dhauladhar mountains.',
  },
  {
    title: 'Dalai Lama Temple',
    distance: '20 km',
    description: 'The Namgyal monastery in Mcleodganj, accessible via Dharamshala.',
  },
  {
    title: 'Chamunda Temple',
    distance: '14 km',
    description: 'Hilltop shrine of Maa Chamunda, one of 51 Shakti Peethas, on the banks of river Baner.',
  },
];

export default function HomePage() {
  const heroBgRef = useRef<HTMLDivElement>(null);
  const observerSections = useRef<HTMLDivElement[]>([]);

  const addToObserver = (el: HTMLDivElement | null) => {
    if (el && !observerSections.current.includes(el)) {
      observerSections.current.push(el);
    }
  };

  useEffect(() => {
    // Parallax effect for hero background
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (heroBgRef.current) {
            const scrollY = window.scrollY;
            heroBgRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Intersection Observer for scroll-triggered animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    observerSections.current.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main>
      {/* ─── HERO ─── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} ref={heroBgRef} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.heroLine} />
          <img src="https://thedivinehima.com/wp-content/themes/calluna-child/img/logo1.png" alt="The Divine Hima" className={styles.heroBrand} style={{ margin: '0 auto 1.5rem', maxHeight: '60px' }} />
          <h1 className={styles.heroTitle}>Your Perfect Stay in Dharamshala</h1>
          <p className={styles.heroSubtitle}>
            Nestled in the serene landscapes of Dharamshala, experience a blend of luxury and
            tranquility with breathtaking Himalayan views.
          </p>
          <div className={styles.heroButtons}>
            <Link href="/contact" className={`btn btn-primary ${styles.heroBtn}`}>
              Book Now
            </Link>
            <Link href="/rooms" className={`btn btn-secondary ${styles.heroBtn}`}>
              Explore Rooms
            </Link>
          </div>
        </div>
        <div className={styles.scrollIndicator}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </section>

      {/* ─── INTRO / ABOUT ─── */}
      <section className={`section ${styles.intro}`} ref={addToObserver}>
        <div className={`container ${styles.introGrid}`}>
          <div className={styles.introImageWrap}>
            <img
              src="https://thedivinehima.com/wp-content/uploads/2016/03/divine-hima0044.jpg"
              alt="The Divine Hima exterior"
              className={styles.introImage}
              loading="lazy"
            />
          </div>
          <div className={styles.introText}>
            <span className={styles.goldLine} />
            <p className={styles.preTitle}>WELCOME</p>
            <h2 className={styles.introTitle}>A Boutique Retreat in the Himalayas</h2>
            <p className={styles.introBody}>
              Renowned as one of the best boutique hotels in Dharamshala, our property provides
              elegantly designed rooms, breathtaking views of the Himalayas, and unmatched
              hospitality. Whether you&apos;re planning a peaceful retreat, a family vacation, or a
              romantic getaway, The Divine Hima is your ideal destination. Conveniently located near
              Norbulingka and Gyuto Monastery, we ensure a seamless experience for those exploring
              the cultural and natural beauty of Dharamshala.
            </p>
            <div className={styles.statsRow}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>10+</span>
                <span className={styles.statLabel}>Room Types</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>7</span>
                <span className={styles.statLabel}>Cuisines</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>6</span>
                <span className={styles.statLabel}>Nearby Sites</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ROOMS SHOWCASE ─── */}
      <section className={`section ${styles.rooms}`} ref={addToObserver}>
        <div className="container">
          <h2 className={`section-title ${styles.sectionTitle}`}>Our Rooms &amp; Suites</h2>
          <p className={`section-subtitle ${styles.sectionSubtitle}`}>Experience comfort redefined</p>
          <div className={styles.roomsGrid}>
            {rooms.map((room, i) => (
              <Link href="/rooms" key={room.name} className={styles.roomCard} style={{ animationDelay: `${i * 150}ms` }}>
                <img src={room.image} alt={room.name} className={styles.roomImage} loading="lazy" />
                <div className={styles.roomOverlay} />
                <div className={styles.roomGoldBorder} />
                <div className={styles.roomContent}>
                  <span className={styles.roomType}>{room.type}</span>
                  <h3 className={styles.roomName}>{room.name}</h3>
                  <p className={styles.roomDesc}>{room.description}</p>
                  <span className={styles.roomLink}>View Room →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AMENITIES ─── */}
      <section className={`section ${styles.amenities}`} ref={addToObserver}>
        <div className="container">
          <h2 className={`section-title ${styles.sectionTitle}`}>Services &amp; Amenities</h2>
          <p className={`section-subtitle ${styles.sectionSubtitle}`}>
            Everything you need for an unforgettable stay
          </p>
          <div className={styles.amenitiesGrid}>
            {amenities.map((item) => (
              <div key={item.title} className={styles.amenityCard}>
                <span className={styles.amenityIcon}>{item.icon}</span>
                <h4 className={styles.amenityTitle}>{item.title}</h4>
                <p className={styles.amenityDesc}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className={`section ${styles.testimonials}`} ref={addToObserver}>
        <div className="container">
          <h2 className={`section-title ${styles.sectionTitle}`}>What Our Guests Say</h2>
          <div className={styles.testimonialsGrid}>
            {testimonials.map((t) => (
              <div key={t.name} className={styles.testimonialCard}>
                <span className={styles.quoteIcon}>&ldquo;</span>
                <p className={styles.testimonialText}>{t.text}</p>
                <div className={styles.stars}>★★★★★</div>
                <p className={styles.testimonialName}>{t.name}</p>
              </div>
            ))}
          </div>
          <p className={styles.reviewsLink}>
            <a
              href="https://g.co/kgs/YourGoogleLink"
              target="_blank"
              rel="noopener noreferrer"
            >
              See more reviews on Google →
            </a>
          </p>
        </div>
      </section>

      {/* ─── SIGHTSEEING ─── */}
      <section className={`section ${styles.sightseeing}`} ref={addToObserver}>
        <div className="container">
          <h2 className={`section-title ${styles.sectionTitle}`}>Explore Around Us</h2>
          <p className={`section-subtitle ${styles.sectionSubtitle}`}>
            Discover the beauty of Dharamshala
          </p>
          <div className={styles.sightsGrid}>
            {sights.map((s) => (
              <div key={s.title} className={styles.sightCard}>
                <span className={styles.distanceBadge}>{s.distance}</span>
                <h4 className={styles.sightTitle}>{s.title}</h4>
                <p className={styles.sightDesc}>{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className={styles.cta}>
        <div className={styles.ctaBg} />
        <div className={styles.ctaOverlay} />
        <div className={`container ${styles.ctaContent}`}>
          <h2 className={styles.ctaTitle}>Ready to Experience The Divine Hima?</h2>
          <p className={styles.ctaPhone}>
            <a href="tel:+918626983777">+91 86269 83777</a>
          </p>
          <Link href="/contact" className={`btn btn-primary ${styles.ctaBtn}`}>
            Book Your Stay
          </Link>
        </div>
      </section>
    </main>
  );
}
