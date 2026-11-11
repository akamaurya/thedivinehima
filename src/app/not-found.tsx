import type { Metadata } from 'next';
import Link from 'next/link';
import { PHONE_DISPLAY, TEL_URL, WHATSAPP_URL } from '@/lib/contact';
import { BOOKING_URL } from '@/lib/schema';
import styles from './not-found.module.css';

// Next adds <meta name="robots" content="noindex"> to this page automatically.
export const metadata: Metadata = { title: 'Page not found' };
const links = [
  { href: '/divine-rooms/', title: 'Rooms', text: 'Twelve boutique rooms from ₹7,450 a night, breakfast included.' },
  { href: '/divine-holiday-packages/', title: 'Holiday packages', text: 'Short breaks, long weekends and a 6-day yoga retreat.' },
  { href: '/dining/', title: 'Dining', text: 'Restaurant, café, wood-fired pizzeria and bar.' },
  { href: '/blog/', title: 'Travel guide', text: 'Treks, temples, cafés and the best time to visit Dharamshala.' },
];

export default function NotFound() {
  return (
    <main className={styles.main}>
      <div className="container">
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>This page isn’t here</h1>
        <p className={styles.lead}>
          The link may be old or mistyped. Everything from our previous website has moved, so one of these should get you where you were going.
        </p>

        <ul className={styles.links}>
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href}>
                <h2>{l.title}</h2>
                <p>{l.text}</p>
              </Link>
            </li>
          ))}
        </ul>

        <p className={styles.help}>
          Looking to book? <a href={BOOKING_URL}>Check availability</a>, call <a href={TEL_URL}>{PHONE_DISPLAY}</a> or{' '}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">message us on WhatsApp</a>. Or go back to the <Link href="/">homepage</Link>.
        </p>
      </div>
    </main>
  );
}
