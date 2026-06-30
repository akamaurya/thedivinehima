'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

const rooms = [
  {
    name: 'Premium Rooms',
    type: 'Luxury Collection',
    description: 'Experience the ultimate comfort and elegance with our luxury hotel rooms.',
    image: 'https://thedivinehima.com/wp-content/uploads/2024/12/premium-1.jpg',
  },
  {
    name: 'Superior Rooms',
    type: 'Comfort & Grace',
    description: 'Unmatched comfort and elegance in our premium rooms in Dharamshala.',
    image: 'https://thedivinehima.com/wp-content/uploads/2024/12/luxury-1.jpg',
  },
  {
    name: 'Deluxe Rooms',
    type: 'Cozy Retreat',
    description: 'Relax in comfort with modern amenities and breathtaking mountain views.',
    image: 'https://thedivinehima.com/wp-content/uploads/2024/12/deluxe-2.jpg',
  },
];

const amenities = [
  {
    icon: 'I',
    title: 'Restaurant',
    description: 'Italian, Japanese, Chinese, Tibetan, Indian, South-Indian and local Himachali cuisine',
  },
  {
    icon: 'II',
    title: 'Divine Café',
    description: 'Casual walk-ins welcome with free WiFi, art gallery, and library access',
  },
  {
    icon: 'III',
    title: 'Firewood Pizzeria',
    description: 'The best wood-fired clay oven pizzas — authentic taste guaranteed',
  },
  {
    icon: 'IV',
    title: 'The Bar By Far',
    description: 'Premium spirits, cocktails, and local brews in an intimate setting',
  },
  {
    icon: 'V',
    title: 'Ample Parking',
    description: 'Secure on-site parking with drop-in & pickup service',
  },
];

const testimonials = [
  {
    name: 'Vishal Singh Rana',
    text: 'This property seamlessly blends art, luxury, and functionality, creating an almost perfect experience.',
  },
  {
    name: 'Shilpa Manhas',
    text: 'Absolutely divine place to visit, amazing food, drinks and artistically crafted every corner of the hotel.',
  },
  {
    name: 'Ankan Paul',
    text: 'If you are into art and geology then this place should be on your list of destinations.',
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

import FAQSchema from '@/components/FAQSchema';

export default function HomePage() {
  const heroImageRef = useRef<HTMLImageElement>(null);
  const observerSections = useRef<HTMLDivElement[]>([]);

  const addToObserver = (el: HTMLDivElement | null) => {
    if (el && !observerSections.current.includes(el)) {
      observerSections.current.push(el);
    }
  };

  useEffect(() => {
    // Parallax effect for hero image
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (heroImageRef.current) {
            const scrollY = window.scrollY;
            heroImageRef.current.style.transform = `translateY(${scrollY * 0.15}px) scale(1.15)`;
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
      <FAQSchema />
      {/* ─── HERO ─── */}
      <section className={styles.hero}>
        <div className={styles.heroTopMeta}>
          <span>Vol. I — The Himalayan Retreat</span>
          <span>Dharamshala, HP</span>
          <span>Est. 2016</span>
        </div>
        
        <div className={styles.heroContent}>
          <div className={styles.heroTextCol}>
            <h1 className={styles.heroTitle}>A Boutique Retreat in the Himalayas</h1>
            <p className={styles.heroSubtitle}>
              Nestled in the serene landscapes of Dharamshala, experience a blend of luxury and tranquility with breathtaking mountain views.
            </p>
            <div className={styles.heroButtons}>
              <Link href="https://asiatech.in/booking_engine/index3?token=MTA4NDQ=" className="btn btn-primary">
                Reserve
              </Link>
              <Link href="/rooms" className="btn btn-secondary">
                View Collection
              </Link>
            </div>
          </div>
          
          <div className={styles.heroImageCol}>
            <img 
              ref={heroImageRef}
              src="https://thedivinehima.com/wp-content/uploads/2024/12/luxury-hotel-in-dharamshala.jpg" 
              alt="The Divine Hima exterior" 
              className={styles.heroBg}
            />
          </div>
        </div>
      </section>

      {/* ─── INTRO / ABOUT ─── */}
      <section className={`section ${styles.intro}`} ref={addToObserver}>
        <div className={`container ${styles.introGrid}`}>
          <div>
            <span className={styles.preTitle}>Editorial Feature</span>
            <h2 className={styles.introTitle}>Art, Luxury & Functionality</h2>
          </div>
          
          <div className={styles.introText}>
            <span className={styles.dropCap}>R</span>
            <p className={styles.introBody}>
              enowned as one of the best boutique hotels in Dharamshala, our property provides elegantly designed rooms, breathtaking views of the Himalayas, and unmatched hospitality. Whether you&apos;re planning a peaceful retreat, a family vacation, or a romantic getaway, The Divine Hima is your ideal destination.
              <br/><br/>
              Conveniently located near Norbulingka and Gyuto Monastery, we ensure a seamless experience for those exploring the cultural and natural beauty of Dharamshala. Every corner is artistically crafted to blend seamlessly into the mountain landscape.
            </p>
          </div>

          <div className={styles.introImageWrap}>
            <img
              src="https://thedivinehima.com/wp-content/uploads/2016/03/divine-hima0044.jpg"
              alt="The Divine Hima Architecture"
              className={styles.introImage}
              loading="lazy"
            />
          </div>
        </div>

        <div className="container">
          <div className={styles.statsRow}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>10+</span>
              <span className={styles.statLabel}>Room Types</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>07</span>
              <span className={styles.statLabel}>Distinct Cuisines</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>06</span>
              <span className={styles.statLabel}>Nearby Heritage Sites</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ROOMS SHOWCASE ─── */}
      <section className={`section ${styles.rooms}`} ref={addToObserver}>
        <div className="container">
          <div className={styles.roomsHeader}>
            <div>
              <span className="metadata">The Collection</span>
              <h2 className="section-title" style={{ marginBottom: 0, marginTop: '1rem' }}>Rooms & Suites</h2>
            </div>
            <p className="section-subtitle" style={{ marginBottom: 0 }}>Experience comfort redefined</p>
          </div>
          
          <div className={styles.roomsGrid}>
            {rooms.map((room, i) => (
              <Link href="/rooms" key={room.name} className={styles.roomCard}>
                <div className={styles.roomImageWrap}>
                  <img src={room.image} alt={room.name} className={styles.roomImage} loading="lazy" />
                </div>
                <span className={styles.roomType}>{room.type}</span>
                <h3 className={styles.roomName}>{room.name}</h3>
                <p className={styles.roomDesc}>{room.description}</p>
                <span className={styles.roomLink}>Explore Suite</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AMENITIES ─── */}
      <section className={`section ${styles.amenities}`} ref={addToObserver}>
        <div className={`container ${styles.amenitiesLayout}`}>
          <div>
            <span className="metadata">Directory</span>
            <h2 className="section-title" style={{ marginTop: '1rem' }}>Services & Dining</h2>
            <p className="section-subtitle">A curated experience</p>
          </div>
          
          <div className={styles.amenitiesList}>
            {amenities.map((item) => (
              <div key={item.title} className={styles.amenityItem}>
                <span className={styles.amenityIcon}>{item.icon}</span>
                <div className={styles.amenityContent}>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className={`section ${styles.testimonials}`} ref={addToObserver}>
        <div className="container">
          <span className="metadata" style={{ color: 'rgba(255,255,255,0.5)' }}>Guest Dispatches</span>
          <h2 className="section-title" style={{ color: '#fff', marginTop: '1rem' }}>Voices</h2>
          
          <div className={styles.testimonialsGrid}>
            {testimonials.map((t) => (
              <div key={t.name} className={styles.testimonialCard}>
                <span className={styles.quoteIcon}>&ldquo;</span>
                <p className={styles.testimonialText}>{t.text}</p>
                <p className={styles.testimonialName}>— {t.name}</p>
              </div>
            ))}
          </div>
          <div className={styles.reviewsLink}>
            <a href="https://www.google.com/maps/search/?api=1&query=The+Divine+Hima+Dharamshala" target="_blank" rel="noopener noreferrer" style={{ color: '#fff' }}>
              Read the full archive &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* ─── SIGHTSEEING ─── */}
      <section className={`section ${styles.sightseeing}`} ref={addToObserver}>
        <div className="container">
          <span className="metadata">Local Guide</span>
          <h2 className="section-title" style={{ marginTop: '1rem' }}>Environs</h2>
          <div className="thin-rule"></div>
          
          <div className={styles.sightsGrid}>
            {sights.map((s) => (
              <div key={s.title} className={styles.sightCard}>
                <span className={styles.distanceBadge}>{s.distance}</span>
                <h4 className={styles.sightTitle}>{s.title}</h4>
                <p className={styles.sightDesc}>{s.description}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '3rem', textAlign: 'center' }}>
            <a 
              href="https://www.google.com/maps/search/?api=1&query=The+Divine+Hima+Dharamshala" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-secondary"
            >
              Explore Local Environs on Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <span className="metadata">Invitations Open</span>
          <h2 className={styles.ctaTitle} style={{ marginTop: '1.5rem' }}>Experience The Divine Hima</h2>
          <p className={styles.ctaPhone}>
            <a href="tel:+918626983777">+91 86269 83777</a>
          </p>
          <Link href="https://asiatech.in/booking_engine/index3?token=MTA4NDQ=" className="btn btn-primary">
            Request a Reservation
          </Link>
        </div>
      </section>
    </main>
  );
}
