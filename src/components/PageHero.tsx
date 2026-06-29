import styles from './PageHero.module.css';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
}

export default function PageHero({ title, subtitle, backgroundImage }: PageHeroProps) {
  return (
    <section className={styles.hero}>
      <img
        src={backgroundImage}
        alt=""
        className={styles.backgroundImage}
        loading="eager"
      />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <span className={styles.decorativeLine} />
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
    </section>
  );
}
