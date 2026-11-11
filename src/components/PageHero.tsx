import styles from './PageHero.module.css';
import SanityImage from '@/components/SanityImage';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage: any; // Can be a string URL or a Sanity image object
  alt?: string; // Describes the photo for image search; defaults to the title
}

export default function PageHero({ title, subtitle, backgroundImage, alt = title }: PageHeroProps) {
  const isSanityImage = backgroundImage && typeof backgroundImage !== 'string';

  return (
    <section className={styles.hero}>
      {isSanityImage ? (
        <SanityImage
          image={backgroundImage}
          alt={alt}
          className={styles.backgroundImage}
          priority
          width={1920}
          height={600}
        />
      ) : (
        <img
          src={backgroundImage}
          alt={alt}
          className={styles.backgroundImage}
          loading="eager"
          fetchPriority="high"
        />
      )}
      <div className={styles.overlay} />
      <div className={styles.content}>
        <span className={styles.decorativeLine} />
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
    </section>
  );
}
