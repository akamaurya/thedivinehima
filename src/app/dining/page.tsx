import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import SanityImage from '@/components/SanityImage';
import Breadcrumbs from '@/components/Breadcrumbs';
import FAQ from '@/components/FAQ';
import JsonLd from '@/components/JsonLd';
import { DINING_FAQS } from '@/lib/faqs';
import { HOTEL_ID, SITE, abs, hotelSchema } from '@/lib/schema';
import { PHONE_E164 } from '@/lib/contact';
import { client } from '../../../sanity/lib/client';
import styles from './page.module.css';

const description =
  'Restaurant, café, wood-fired pizzeria and bar at The Divine Hima, Sidhpur, Dharamshala. Himachali, Tibetan, Indian, Italian, Japanese and Chinese food, with vegetarian and vegan options.';

export const metadata: Metadata = {
  title: { absolute: 'Restaurant, Café & Bar in Sidhpur, Dharamshala | The Divine Hima' },
  description,
  openGraph: {
    title: 'Dining at The Divine Hima, Dharamshala',
    description,
    url: `${SITE}/dining/`,
    images: [{ url: '/wp-content/uploads/2020/10/dining.jpg', width: 1200, height: 630, alt: 'The restaurant at The Divine Hima, Dharamshala' }],
  },
  alternates: { canonical: '/dining/' },
};

// Copy shown until the diningPage document fills these fields.
const fallback = {
  intro: 'From Italian to Himachali, Japanese to Tibetan: a kitchen that cooks seven cuisines with local ingredients, and four places to enjoy them.',
  restaurantText: 'Our main restaurant serves Italian, Japanese, Chinese, Tibetan, Indian, South Indian and local Himachali food. The dining hall is kept for overnight guests.',
  cafeText: 'The café welcomes walk-ins and anyone curious about the art gallery and library, with coffee, light bites and free Wi-Fi.',
  pizzeriaText: 'Pizzas from a wood-fired clay oven, made to order with fresh ingredients.',
  barText: 'Premium spirits, cocktails and local brews in a cozy room at the end of the day.',
};

const venues = [
  { key: 'restaurant', name: 'The Restaurant', image: '/wp-content/uploads/2020/10/dining2.jpg', type: 'Restaurant', cuisine: ['Himachali', 'Tibetan', 'North Indian', 'South Indian', 'Italian', 'Japanese', 'Chinese'], menu: '/divine-menu/' },
  { key: 'cafe', name: 'Divine Café', image: '/wp-content/uploads/2020/10/cafe1.jpg', type: 'CafeOrCoffeeShop', cuisine: ['Café', 'Coffee'] },
  { key: 'pizzeria', name: 'Firewood Pizzeria', image: '/wp-content/uploads/2024/12/pizerria.jpg', type: 'Restaurant', cuisine: ['Pizza', 'Italian'], menu: '/pizzeria/' },
  { key: 'bar', name: 'The Bar By Far', image: '/wp-content/uploads/2024/12/bar.jpg', type: 'BarOrPub', cuisine: [] },
] as const;

export default async function DiningPage() {
  const data = (await client.fetch(`*[_type == "diningPage"][0]`)) ?? {};
  const text = (key: string) => data[`${key}Text`] || fallback[`${key}Text` as keyof typeof fallback];

  return (
    <main className={styles.main}>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': venues.map((v) => ({
            '@type': v.type,
            '@id': `${SITE}/dining/#${v.key}`,
            name: `${v.name} at The Divine Hima`,
            description: text(v.key),
            image: abs(v.image),
            address: hotelSchema.address,
            telephone: PHONE_E164,
            containedInPlace: { '@id': HOTEL_ID },
            ...(v.cuisine.length ? { servesCuisine: v.cuisine } : {}),
            ...('menu' in v ? { hasMenu: abs(v.menu) } : {}),
          })),
        }}
      />
      <PageHero
        title="Dining at The Divine Hima"
        subtitle="A restaurant, café, pizzeria and bar in Sidhpur, Dharamshala"
        backgroundImage={data.heroImage || '/wp-content/uploads/2020/10/dining.jpg'}
        alt="The dining room at The Divine Hima, Dharamshala"
      />
      <Breadcrumbs items={[{ name: 'Dining', href: '/dining/' }]} />

      <section className={`section ${styles.intro}`}>
        <div className="container">
          <p className={styles.introText}>{data.intro || fallback.intro}</p>
        </div>
      </section>

      <section className={styles.venues}>
        <div className="container">
          {venues.map((v, i) => {
            const image = data[`${v.key}Image`];
            const alt = `${v.name} at The Divine Hima, Dharamshala`;
            return (
              <AnimateOnScroll key={v.key} delay={i * 150}>
                <div id={v.key} className={`${styles.venueRow} ${i % 2 ? styles.venueRowReversed : ''}`}>
                  <div className={styles.venueImageWrap}>
                    {image ? (
                      <SanityImage image={image} alt={alt} className={styles.venueImage} width={800} height={600} />
                    ) : (
                      <img src={v.image} alt={alt} className={styles.venueImage} loading="lazy" />
                    )}
                  </div>
                  <div className={styles.venueBody}>
                    <h2 className={styles.venueName}>{v.name}</h2>
                    <p className={styles.venueDesc}>{text(v.key)}</p>
                    {'menu' in v && (
                      <a href={v.menu} className="btn btn-secondary">See the {v.name === 'The Restaurant' ? 'restaurant' : 'pizzeria'} menu</a>
                    )}
                  </div>
                </div>
              </AnimateOnScroll>
            );
          })}
          <p className={styles.introText} style={{ marginTop: '4rem' }}>
            Planning your days around food? Read our guides to the{' '}
            <Link href="/best-restaurants-in-dharamshala/">best restaurants in Dharamshala</Link>,{' '}
            <Link href="/restaurants-in-sidhpur-dharamshala/">where to eat in Sidhpur</Link> and{' '}
            <Link href="/himachali-dham-dharamshala/">Himachali dham</Link>.
          </p>
        </div>
      </section>

      <FAQ items={DINING_FAQS} title="Dining questions" />
    </main>
  );
}
