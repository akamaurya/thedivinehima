import type { Metadata } from 'next';
import { client } from '../../../sanity/lib/client';
import { urlForImage } from '../../../sanity/lib/image';
import PageHero from '@/components/PageHero';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import FAQ from '@/components/FAQ';
import JsonLd from '@/components/JsonLd';
import { PACKAGE_FAQS } from '@/lib/faqs';
import { HOTEL_ID, SITE, abs } from '@/lib/schema';
import { WHATSAPP_URL } from '@/lib/contact';
import styles from './page.module.css';

const description =
  'Holiday packages at The Divine Hima, Dharamshala: 2- and 3-night stays with breakfast and dinner from ₹19,999 for two, and The Himalayan Reset, a 6-day yoga and wellness retreat.';

export const metadata: Metadata = {
  title: { absolute: 'Holiday Packages in Dharamshala | The Divine Hima' },
  description,
  openGraph: {
    title: 'Holiday Packages at The Divine Hima, Dharamshala',
    description,
    url: `${SITE}/divine-holiday-packages/`,
    images: [{ url: '/wp-content/uploads/2024/12/premium-3.jpg', width: 1200, height: 630, alt: 'A premium room at The Divine Hima, Dharamshala' }],
  },
  alternates: { canonical: '/divine-holiday-packages/' },
};

export const dynamic = 'force-static';

export default async function PackagesPage() {
  const query = `*[_type == "package"] | order(order asc) {
    _id,
    name,
    tagline,
    description,
    image,
    duration,
    price,
    inclusions,
    featured,
    url
  }`;

  const packages = await client.fetch(query);

  // TouristTrip, not Product: a Product without offers or reviews fails Google's rich-result checks.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Holiday packages at The Divine Hima',
    itemListElement: (packages || []).map((pkg: any, index: number) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'TouristTrip',
        name: pkg.name,
        description: pkg.description,
        url: abs(pkg.url || '/divine-holiday-packages/'),
        ...(pkg.image ? { image: urlForImage(pkg.image).width(1200).url() } : {}),
        provider: { '@id': HOTEL_ID },
      },
    })),
  };

  return (
    <main className={styles.main}>
      <JsonLd data={jsonLd} />

      <PageHero
        title="Holiday Packages in Dharamshala"
        subtitle="Short breaks, long weekends and a week-long yoga retreat"
        backgroundImage="/wp-content/uploads/2024/12/premium-3.jpg"
        alt="A premium room at The Divine Hima, Dharamshala"
      />
      <Breadcrumbs items={[{ name: 'Holiday packages', href: '/divine-holiday-packages/' }]} />

      <section className={`section ${styles.intro}`}>
        <div className="container">
          <p className={styles.introText}>
            Every package bundles your room, meals and the parts of Dharamshala
            worth planning around, so you only have to choose your dates. Holiday
            packages include breakfast and dinner each day and all taxes. For
            honeymoons, anniversaries or a group, message us and we will tailor
            one for you.
          </p>
        </div>
      </section>

      <section className={styles.packages}>
        <div className="container">
          {packages && packages.length > 0 ? (
            <div className={styles.grid}>
              {packages.map((pkg: any, index: number) => {
                const imageUrl = pkg.image
                  ? urlForImage(pkg.image).width(800).height(600).url()
                  : '/wp-content/uploads/2024/12/premium-1.jpg';

                return (
                  <AnimateOnScroll key={pkg._id} delay={(index % 3) * 120}>
                    <article className={styles.card}>
                      <div className={styles.cardImageWrap}>
                        {pkg.featured && (
                          <span className={styles.badge}>Most Popular</span>
                        )}
                        <img
                          src={imageUrl}
                          alt={`${pkg.name} at The Divine Hima, Dharamshala`}
                          className={styles.cardImage}
                          loading="lazy"
                        />
                      </div>
                      <div className={styles.cardBody}>
                        {pkg.tagline && (
                          <span className={styles.cardLabel}>{pkg.tagline}</span>
                        )}
                        <h2 className={styles.cardTitle}>{pkg.name}</h2>
                        {pkg.duration && (
                          <p className={styles.cardDuration}>{pkg.duration}</p>
                        )}
                        <p className={styles.cardDescription}>{pkg.description}</p>

                        {pkg.inclusions && pkg.inclusions.length > 0 && (
                          <ul className={styles.inclusions}>
                            {pkg.inclusions.map((item: string, i: number) => (
                              <li key={i} className={styles.inclusionItem}>
                                {item}
                              </li>
                            ))}
                          </ul>
                        )}

                        {pkg.url && (
                          <Link href={pkg.url} className={styles.detailsLink}>
                            See the full itinerary
                          </Link>
                        )}

                        <div className={styles.cardFooter}>
                          {pkg.price && (
                            <span className={styles.cardPrice}>{pkg.price}</span>
                          )}
                          <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`btn btn-primary ${styles.enquireBtn}`}
                          >
                            Enquire on WhatsApp
                          </a>
                        </div>
                      </div>
                    </article>
                  </AnimateOnScroll>
                );
              })}
            </div>
          ) : (
            <p className={styles.emptyState}>
              Our curated packages are being prepared. Reach out and we’ll craft
              the perfect getaway for you.
            </p>
          )}
        </div>
      </section>

      <section className={`section ${styles.notes}`}>
        <div className="container prose">
          <h2>Good to know</h2>
          <ul>
            <li>Holiday package prices are for two guests on twin sharing and include taxes.</li>
            <li>Children under 5 stay free. Children up to 12 are ₹800 per night, and children over 12 with an extra bed ₹1,600 per night.</li>
            <li>Only one extra cot fits in rooms other than the Pin Parbati family suite.</li>
            <li>Rates change with the season. We confirm the final price for your dates before you pay.</li>
          </ul>
          <p>
            Not sure which room suits your package? Compare all twelve on our <Link href="/divine-rooms/">rooms page</Link>, or read our guide to the <Link href="/best-time-to-visit-dharamshala/">best time to visit Dharamshala</Link>.
          </p>
        </div>
      </section>

      <FAQ items={PACKAGE_FAQS} title="Package questions" />

      <section className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>Want something bespoke?</h2>
          <p className={styles.ctaText}>
            Tell us your dates and we’ll tailor a package just for you.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn btn-primary ${styles.ctaBtn}`}
          >
            Chat with us on WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
