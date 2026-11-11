import JsonLd from '@/components/JsonLd';
import styles from './FAQ.module.css';

export type FAQItem = { q: string; a: string };

// Visible questions and their FAQPage schema come from the same list, so they can't drift apart.
export default function FAQ({ items, title = 'Frequently asked questions', id = 'faq' }: { items: FAQItem[]; title?: string; id?: string }) {
  return (
    <section className={`section ${styles.faq}`} aria-labelledby={`${id}-title`}>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: items.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
        }}
      />
      <div className={`container ${styles.layout}`}>
        <h2 id={`${id}-title`} className={styles.title}>{title}</h2>
        <div className={styles.list}>
          {items.map(({ q, a }) => (
            <details key={q} className={styles.item}>
              <summary className={styles.question}><h3>{q}</h3></summary>
              <p className={styles.answer}>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
