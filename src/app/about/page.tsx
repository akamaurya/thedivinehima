import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import SanityImage from '@/components/SanityImage';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import { HOTEL_ID, SITE } from '@/lib/schema';
import { client } from '../../../sanity/lib/client';
import styles from './page.module.css';

const description =
  'The story of The Divine Hima, a 12-room boutique hotel in Sidhpur, Dharamshala, built by a Himalayan geologist: an art gallery, library and rooftop yoga room opposite Norbulingka.';

export const metadata: Metadata = {
  title: { absolute: 'About The Divine Hima: A Geologist’s Boutique Hotel in Dharamshala' },
  description,
  openGraph: {
    title: 'About The Divine Hima, Dharamshala',
    description,
    url: `${SITE}/about/`,
    images: [{ url: '/wp-content/uploads/2023/12/southcol-main.jpg', width: 1200, height: 630, alt: 'Inside The Divine Hima, Dharamshala' }],
  },
  alternates: { canonical: '/about/' },
};

// Shown until the aboutPage document has copy.
const fallback = {
  storyTitle: 'Where Art Meets the Himalayas',
  story: [
    'The Divine Hima was born from a passion for blending art, comfort and the timeless beauty of the Himalayas. Founded by Sanjay Kumbkarni, it celebrates the cultural heritage of Dharamshala while giving every guest a warm, personal stay.',
  ],
  founderQuote: null as string | null,
  features: [] as { title: string; text: string }[],
};

export default async function AboutPage() {
  const data = (await client.fetch(`*[_type == "aboutPage"][0]`)) ?? {};
  const story: string[] = data.story?.length ? data.story : fallback.story;
  const features: { title: string; text: string }[] = data.features ?? fallback.features;

  return (
    <main className={styles.main}>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          url: `${SITE}/about/`,
          name: 'About The Divine Hima',
          description,
          about: { '@id': HOTEL_ID },
        }}
      />
      <PageHero
        title="About The Divine Hima"
        subtitle="A boutique hotel in Dharamshala, built by a Himalayan geologist"
        backgroundImage={data.heroImage || '/wp-content/uploads/2023/12/southcol-main.jpg'}
        alt="A room at The Divine Hima with Himalayan photographs on the walls"
      />
      <Breadcrumbs items={[{ name: 'About', href: '/about/' }]} />

      <section className={`section ${styles.storySection}`}>
        <div className="container">
          <AnimateOnScroll>
            <div className={styles.storyGrid}>
              <div className={styles.storyImageWrapper}>
                {data.storyImage ? (
                  <SanityImage image={data.storyImage} alt="The Divine Hima, Sidhpur" className={styles.storyImage} width={800} height={1200} />
                ) : (
                  <img src="/wp-content/uploads/2016/03/divine-hima0044.jpg" alt="Stone and timber exterior of The Divine Hima, Sidhpur" className={styles.storyImage} loading="lazy" />
                )}
                <div className={styles.imageAccent}></div>
              </div>
              <div className={styles.storyContent}>
                <h2 className={styles.storyTitle}>{data.storyTitle || fallback.storyTitle}</h2>
                {story.map((p) => (
                  <p key={p.slice(0, 40)} className={styles.storyText}>{p}</p>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {data.founderQuote && (
        <section className={`section ${styles.quoteSection}`}>
          <figure className={`container ${styles.quote}`}>
            <blockquote>{data.founderQuote}</blockquote>
            <figcaption>Sanjay Kumbkarni, founder</figcaption>
          </figure>
        </section>
      )}

      {features.length > 0 && (
        <section className={`section ${styles.valuesSection}`}>
          <div className="container">
            <h2 className="section-title">What You Will Find Here</h2>
            <div className={styles.valuesGrid}>
              {features.map((f) => (
                <div key={f.title} className={styles.valueCard}>
                  <h3 className={styles.valueTitle}>{f.title}</h3>
                  <p className={styles.valueDescription}>{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className={`section ${styles.locationSection}`}>
        <div className="container">
          <div className={styles.locationContent}>
            <h2 className={styles.locationTitle}>Where We Are</h2>
            <p className={styles.locationText}>
              Sidhpur is a quiet village in the lap of the Dhauladhar range, between lower Dharamshala and McLeod Ganj. It is calm enough for a real rest and close enough to everything worth seeing in the Kangra valley.
            </p>
            <ul className={styles.locationList}>
              <li><strong>Norbulingka Institute:</strong> directly opposite the hotel</li>
              <li><strong>Gyuto Monastery:</strong> 2 km</li>
              <li><strong>Chinmaya Tapovan:</strong> 4 km</li>
              <li><strong>HPCA cricket stadium:</strong> 6 km</li>
              <li><strong>Kangra (Gaggal) airport:</strong> 12 km</li>
              <li><strong>Dalai Lama Temple, McLeod Ganj:</strong> about 20 km</li>
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className="container">
          <h2 className={styles.ctaTitle}>Stay at The Divine Hima</h2>
          <Link href="/divine-rooms/" className="btn btn-primary">See the rooms</Link>
        </div>
      </section>
    </main>
  );
}
