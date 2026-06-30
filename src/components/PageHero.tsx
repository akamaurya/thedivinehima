import styles from './PageHero.module.css';
import SanityImage from '@/components/SanityImage';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage: any; // Can be a string URL or a Sanity image object
}

export default function PageHero({ title, subtitle, backgroundImage }: PageHeroProps) {
  const isSanityImage = backgroundImage && typeof backgroundImage !== 'string';

  return (
    <section className={styles.hero}>
      {isSanityImage ? (
        <SanityImage
          image={backgroundImage}
          alt=""
          className={styles.backgroundImage}
          priority
          width={1920}
          height={600}
        />
      ) : (
        <img
          src={backgroundImage}
          alt=""
          className={styles.backgroundImage}
          loading="eager"
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
