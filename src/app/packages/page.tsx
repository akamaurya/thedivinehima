import type { Metadata } from 'next';
import { client } from '../../../sanity/lib/client';
import { urlForImage } from '../../../sanity/lib/image';
import PageHero from '@/components/PageHero';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import styles from './page.module.css';

const WHATSAPP_URL = 'https://wa.me/8626983777';

export const metadata: Metadata = {
  title: 'Packages & Getaways',
  description: 'Curated stay packages at The Divine Hima, Dharamshala — romantic getaways, family escapes, and wellness retreats with Himalayan views, dining, and experiences included.',
  openGraph: {
    title: 'Packages & Getaways | The Divine Hima',
    description: 'Curated stay packages at The Divine Hima, Dharamshala — romantic getaways, family escapes, and wellness retreats with Himalayan views, dining, and experiences included.',
    url: 'https://thedivinehima.com/packages',
    images: [
      {
        url: 'https://thedivinehima.com/wp-content/uploads/2024/12/premium-3.jpg',
        width: 1200,
        height: 630,
        alt: 'Stay packages at The Divine Hima',
      },
    ],
  },
  alternates: {
    canonical: '/packages',
  },
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
    featured
  }`;

  const packages = await client.fetch(query);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Stay Packages at The Divine Hima',
    itemListElement: (packages || []).map((pkg: any, index: number) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: pkg.name,
        description: pkg.description,
        brand: { '@type': 'Brand', name: 'The Divine Hima' },
      },
    })),
  };

  return (
    <main className={styles.main}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        title="Packages & Getaways"
        backgroundImage="https://thedivinehima.com/wp-content/uploads/2024/12/premium-3.jpg"
      />

      <section className={`section ${styles.intro}`}>
        <div className="container">
          <p className={styles.introText}>
            Hand-crafted stays that pair Himalayan serenity with thoughtful
            experiences — from romantic escapes to wellness retreats. Every
            package is tailored to make your time at The Divine Hima effortless
            and unforgettable.
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
                  : 'https://thedivinehima.com/wp-content/uploads/2024/12/premium-1.jpg';

                return (
                  <AnimateOnScroll key={pkg._id} delay={(index % 3) * 120}>
                    <article className={styles.card}>
                      <div className={styles.cardImageWrap}>
                        {pkg.featured && (
                          <span className={styles.badge}>Most Popular</span>
                        )}
                        <img
                          src={imageUrl}
                          alt={pkg.name}
                          className={styles.cardImage}
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

      <section className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <h3 className={styles.ctaTitle}>Want something bespoke?</h3>
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
