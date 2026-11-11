'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from '@/app/page.module.css';
import SanityImage from '@/components/SanityImage';
import FAQ from '@/components/FAQ';
import { PHONE_DISPLAY, TEL_URL } from '@/lib/contact';
import { HOME_FAQS } from '@/lib/faqs';
import { BOOKING_URL, RATING } from '@/lib/schema';

const rooms = [
  {
    name: 'Premium Rooms',
    type: 'Suites and the penthouse',
    description: 'Our largest rooms, the two-bedroom Pin Parbati family suite and The Sagarmatha Penthouse with its skylight. For honeymoons, celebrations and families.',
    image: '/wp-content/uploads/2024/12/premium-1.jpg',
  },
  {
    name: 'Superior Rooms',
    type: 'More space, valley views',
    description: 'The Thamsar and Inderhaar passes: roomier, with balconies over the Kangra valley. A good choice for longer stays and slow mornings.',
    image: '/wp-content/uploads/2024/12/luxury-1.jpg',
  },
  {
    name: 'Deluxe Rooms',
    type: 'From ₹7,450 a night',
    description: 'Warm twin rooms with south-facing balconies, artwork and every essential done well. A comfortable base for Dharamshala and McLeod Ganj.',
    image: '/wp-content/uploads/2024/12/deluxe-2.jpg',
  },
];

const amenities = [
  {
    title: 'Restaurant',
    href: '/dining/',
    description: 'Italian, Japanese, Chinese, Tibetan, North and South Indian, and local Himachali cooking from our own kitchen.',
  },
  {
    title: 'Divine Café',
    href: '/dining/',
    description: 'Walk-ins welcome. Coffee, light meals and free Wi-Fi beside the hotel’s art gallery and library.',
  },
  {
    title: 'Firewood Pizzeria',
    href: '/dining/#pizzeria',
    description: 'Pizzas from a wood-fired clay oven, made to order.',
  },
  {
    title: 'The Bar By Far',
    href: '/dining/',
    description: 'Premium spirits, cocktails and local brews in a small, warm room at the end of the day.',
  },
  {
    title: 'Parking and pickups',
    href: '/contact-us/',
    description: 'Secure on-site parking. Airport, railway and bus-stand pickups on request.',
  },
];

// Fallback until testimonial documents exist in Sanity. Real Google reviews, quoted as written.
const fallbackTestimonials = [
  {
    name: 'Vishal Singh Rana',
    text: 'Overall, this property seamlessly blends art, luxury, and functionality, creating an almost perfect experience. Anyone visiting can enjoy a delightful fusion of art and geology, adding depth to their time spent here. The staff are cordial and well-mannered, enhancing the overall ambiance.',
  },
  {
    name: 'Shilpa Manhas',
    text: 'Absolutely divine place to visit, amazing food, drinks and artistically crafted every corner of the hotel. Authentic food served with so much love and grace. Peaceful ambience.',
  },
  {
    name: 'Ankan Paul',
    text: 'This property blends art, luxury and functionality to near perfection. If you are into art and geology then this place should be on your list of destinations even if you are not staying here. The staff were cordial and well-mannered.',
  },
];

const sights = [
  {
    title: 'Norbulingka Institute',
    distance: 'Across the road',
    description: 'The Tibetan arts institute named after the Dalai Lama’s summer palace in Lhasa. Watch thangka painters, woodcarvers and metalworkers at work, then walk its Japanese-style gardens.',
  },
  {
    title: 'Gyuto Monastery',
    distance: '2 km',
    description: 'One of the best-known Buddhist monasteries in Himachal and the seat of the Karmapa, head of the Kagyu school of Tibetan Buddhism. Go for the evening prayers.',
  },
  {
    title: 'Chinmaya Tapovan',
    distance: '4 km',
    description: 'The ashram founded by Swami Chinmayananda, with a Ram temple, a 9-metre Hanuman statue, a meditation hall and quiet riverside grounds.',
  },
  {
    title: 'HPCA Cricket Stadium',
    distance: '6 km',
    description: 'One of the most scenic cricket grounds in the world, at 1,457 metres with the Dhauladhar range behind the pavilion.',
    href: '/dharamshala-cricket-stadium/',
  },
  {
    title: 'Chamunda Devi Temple',
    distance: '14 km',
    description: 'A hilltop shrine to Maa Chamunda on the Baner river, one of the 51 Shakti Peethas and among the most visited temples in Himachal.',
    href: '/temples-in-dharamshala/',
  },
  {
    title: 'Dalai Lama Temple, McLeod Ganj',
    distance: '20 km',
    description: 'The Tsuglagkhang complex and Namgyal Monastery at the heart of McLeod Ganj, home of the Dalai Lama. Combine it with Bhagsu waterfall and the Tibetan market.',
    href: '/things-to-do-dharamshala/',
  },
];

const guides = [
  { title: 'Best time to visit Dharamshala, month by month', href: '/best-time-to-visit-dharamshala/' },
  { title: 'How to reach Dharamshala by air, rail and road', href: '/how-to-reach-dharamshala/' },
  { title: 'Things to do in Dharamshala, ranked by distance', href: '/things-to-do-dharamshala/' },
  { title: 'Triund trek: route, timings and permits', href: '/triund-trek-guide/' },
  { title: 'Where to stay in Dharamshala', href: '/where-to-stay-in-dharamshala/' },
  { title: 'A 2-day Dharamshala itinerary', href: '/2-day-dharamshala-itinerary/' },
];

type Testimonial = { name: string; text: string };

export default function HomePageClient({ settings, testimonials }: { settings?: any; testimonials?: Testimonial[] }) {
  const heroImageRef = useRef<HTMLImageElement>(null);
  const observerSections = useRef<HTMLElement[]>([]);
  const voices = testimonials?.length ? testimonials : fallbackTestimonials;

  const getRoomImage = (roomName: string) => {
    if (roomName === 'Premium Rooms' && settings?.premiumRoomImage) return settings.premiumRoomImage;
    if (roomName === 'Superior Rooms' && settings?.superiorRoomImage) return settings.superiorRoomImage;
    if (roomName === 'Deluxe Rooms' && settings?.deluxeRoomImage) return settings.deluxeRoomImage;
    return null;
  };

  const addToObserver = (el: HTMLElement | null) => {
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
            heroImageRef.current.style.transform = `translateY(${window.scrollY * 0.15}px) scale(1.15)`;
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
        <div className={styles.heroTopMeta}>
          <span>Sidhpur, Dharamshala</span>
          <span>Opposite Norbulingka Institute</span>
          <span>Est. 2016</span>
        </div>

        <div className={styles.heroContent}>
          <div className={styles.heroTextCol}>
            <h1 className={styles.heroTitle}>A Boutique Hotel in Dharamshala</h1>
            <p className={styles.heroSubtitle}>
              Twelve art-filled rooms, each named after a Himalayan pass, opposite the Norbulingka Institute. Rated {RATING.value}/5 by {RATING.countLabel} guests on Google.
            </p>
            <div className={styles.heroButtons}>
              <Link href={BOOKING_URL} className="btn btn-primary">
                Check availability
              </Link>
              <Link href="/divine-rooms/" className="btn btn-secondary">
                See the rooms
              </Link>
            </div>
          </div>

          <div className={styles.heroImageCol}>
            {settings?.heroImage ? (
              <SanityImage
                ref={heroImageRef}
                image={settings.heroImage}
                alt="The Divine Hima boutique hotel in Sidhpur, Dharamshala, with the Dhauladhar range behind"
                className={styles.heroBg}
                width={1920}
                height={1080}
                priority
                sizes="100vw"
              />
            ) : (
              <img
                ref={heroImageRef}
                src="/wp-content/uploads/2024/12/luxury-hotel-in-dharamshala.jpg"
                alt="The Divine Hima boutique hotel in Sidhpur, Dharamshala, with the Dhauladhar range behind"
                className={styles.heroBg}
                fetchPriority="high"
              />
            )}
          </div>
        </div>
      </section>

      {/* ─── INTRO / ABOUT ─── */}
      <section className={`section ${styles.intro}`} ref={addToObserver}>
        <div className={`container ${styles.introGrid}`}>
          <div>
            <h2 className={styles.introTitle}>Art, Luxury & Functionality</h2>
          </div>

          <div className={styles.introText}>
            <span className={styles.dropCap} aria-hidden="true">T</span>
            <p className={styles.introBody}>
              <span className="visually-hidden">T</span>he Divine Hima is a 12-room boutique hotel in Sidhpur, on the quiet side of Dharamshala, directly opposite the Norbulingka Institute. It was built by Sanjay Kumbkarni, a geologist who spent 25 years walking the Himalayas, and it shows: granite boulders from the Dhauladhar slopes, his photographs on every wall, a library, a fire room and a carpeted octagon on the roof for yoga and meditation.
              <br /><br />
              Every room is named after a Himalayan pass and furnished differently, with original art, local stone and wood, and mountain views. Breakfast and daily housekeeping are included. Downstairs there is a multi-cuisine restaurant, a café, a wood-fired pizzeria and a bar, so a good dinner is never more than a staircase away.
              <br /><br />
              Sidhpur sits between lower Dharamshala and McLeod Ganj, away from the crowds but close to everything: Gyuto Monastery is 2 km away, the HPCA cricket stadium 6 km and Kangra airport 12 km. Whether you are here for a family holiday, a honeymoon, a yoga retreat or a working stay, it makes a calm base for the whole Kangra valley.
            </p>
          </div>

          <div className={styles.introImageWrap}>
            {settings?.introImage ? (
              <SanityImage
                image={settings.introImage}
                alt="Stone and timber architecture at The Divine Hima, Dharamshala"
                className={styles.introImage}
                width={1920}
                height={820}
                sizes="(max-width: 1024px) 100vw, 80vw"
              />
            ) : (
              <img
                src="/wp-content/uploads/2016/03/divine-hima0044.jpg"
                alt="Stone and timber architecture at The Divine Hima, Dharamshala"
                className={styles.introImage}
                loading="lazy"
              />
            )}
          </div>
        </div>

        <div className="container">
          <div className={styles.statsRow}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>12</span>
              <span className={styles.statLabel}>Rooms, each named after a Himalayan pass</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{RATING.value}</span>
              <span className={styles.statLabel}>Google rating from {RATING.countLabel} reviews</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>4</span>
              <span className={styles.statLabel}>Places to eat and drink on site</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ROOMS SHOWCASE ─── */}
      <section className={`section ${styles.rooms}`} ref={addToObserver}>
        <div className="container">
          <div className={styles.roomsHeader}>
            <h2 className="section-title" style={{ marginBottom: 0 }}>Rooms & Suites</h2>
            <p className={styles.roomsIntro}>
              Three categories, twelve rooms, no two alike. Rates start at ₹7,450 a night with breakfast, and booking direct always gets you our best price.
            </p>
          </div>

          <div className={styles.roomsGrid}>
            {rooms.map((room) => {
              const sanityImage = getRoomImage(room.name);
              const alt = `${room.name} at The Divine Hima, Dharamshala`;
              return (
                <Link href="/divine-rooms/" key={room.name} className={styles.roomCard}>
                  <div className={styles.roomImageWrap}>
                    {sanityImage ? (
                      <SanityImage image={sanityImage} alt={alt} className={styles.roomImage} width={800} height={600} />
                    ) : (
                      <img src={room.image} alt={alt} className={styles.roomImage} loading="lazy" />
                    )}
                  </div>
                  <span className={styles.roomType}>{room.type}</span>
                  <h3 className={styles.roomName}>{room.name}</h3>
                  <p className={styles.roomDesc}>{room.description}</p>
                  <span className={styles.roomLink}>See {room.name.toLowerCase()}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── AMENITIES ─── */}
      <section className={`section ${styles.amenities}`} ref={addToObserver}>
        <div className={`container ${styles.amenitiesLayout}`}>
          <div>
            <h2 className="section-title">Services & Dining</h2>
            <p className={styles.amenitiesIntro}>
              Free Wi-Fi, room service, a travel desk for sightseeing and a kitchen that cooks seven cuisines. Our team can plan your days too, from the Triund trek to Bir Billing paragliding.
            </p>
          </div>

          <ul className={styles.amenitiesList}>
            {amenities.map((item, i) => (
              <li key={item.title} className={styles.amenityItem}>
                <span className={styles.amenityIcon} aria-hidden="true">{['I', 'II', 'III', 'IV', 'V'][i]}</span>
                <div className={styles.amenityContent}>
                  <h3><Link href={item.href}>{item.title}</Link></h3>
                  <p>{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className={`section ${styles.testimonials}`} ref={addToObserver}>
        <div className="container">
          <h2 className="section-title" style={{ color: '#fff' }}>Guest Reviews</h2>
          <p className={styles.ratingLine}>
            Rated {RATING.value} out of 5 by {RATING.countLabel} guests on Google.
          </p>

          <div className={styles.testimonialsGrid}>
            {voices.map((t) => (
              <figure key={t.name} className={styles.testimonialCard}>
                <span className={styles.quoteIcon} aria-hidden="true">&ldquo;</span>
                <blockquote className={styles.testimonialText}>{t.text}</blockquote>
                <figcaption className={styles.testimonialName}>{t.name}, Google review</figcaption>
              </figure>
            ))}
          </div>
          <div className={styles.reviewsLink}>
            <a href="https://www.google.com/maps/search/?api=1&query=The+Divine+Hima+Dharamshala" target="_blank" rel="noopener noreferrer" style={{ color: '#fff' }}>
              Read all reviews on Google
            </a>
          </div>
        </div>
      </section>

      {/* ─── SIGHTSEEING ─── */}
      <section className={`section ${styles.sightseeing}`} ref={addToObserver}>
        <div className="container">
          <h2 className="section-title">Places to Visit Near the Hotel</h2>
          <p className={styles.sightsIntro}>
            Sidhpur is surrounded by Tibetan monasteries, Hindu temples and tea gardens, with the Dhauladhar range behind them all. These are the six places guests ask us about most, with the distance from our front door.
          </p>
          <div className="thin-rule"></div>

          <div className={styles.sightsGrid}>
            {sights.map((s) => (
              <div key={s.title} className={styles.sightCard}>
                <span className={styles.distanceBadge}>{s.distance}</span>
                <h3 className={styles.sightTitle}>{s.href ? <Link href={s.href}>{s.title}</Link> : s.title}</h3>
                <p className={styles.sightDesc}>{s.description}</p>
              </div>
            ))}
          </div>

          <div className={styles.guides}>
            <h3 className={styles.guidesTitle}>From our Dharamshala travel guide</h3>
            <ul>
              {guides.map((g) => (
                <li key={g.href}><Link href={g.href}>{g.title}</Link></li>
              ))}
            </ul>
            <Link href="/blog/" className="btn btn-secondary">All travel guides</Link>
          </div>
        </div>
      </section>

      <FAQ items={HOME_FAQS} title="Questions about staying with us" />

      {/* ─── CTA ─── */}
      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Book your stay at The Divine Hima</h2>
          <p className={styles.ctaPhone}>
            <a href={TEL_URL}>{PHONE_DISPLAY}</a>
          </p>
          <Link href={BOOKING_URL} className="btn btn-primary">
            Check availability
          </Link>
        </div>
      </section>
    </main>
  );
}
