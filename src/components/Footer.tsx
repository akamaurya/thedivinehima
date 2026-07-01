'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Footer.module.css';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/rooms', label: 'Rooms' },
  { href: '/packages', label: 'Packages' },
  { href: '/dining', label: 'Dining' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const socialLinks = [
  { href: 'https://instagram.com', label: 'Instagram' },
  { href: 'https://facebook.com', label: 'Facebook' },
  { href: 'https://google.com', label: 'Google' },
];

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith('/studio')) return null;

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerGrid}`}>
        {/* Column 1 — Brand */}
        <div className={styles.column}>
          <Link href="/" className={styles.logo}>
            <img src="https://thedivinehima.com/wp-content/uploads/2016/04/Divine-Hima-ftr@2x.png" alt="The Divine Hima" style={{ maxHeight: '80px' }} />
          </Link>
          <p className={styles.brandDescription}>
            A luxury boutique hotel nestled in the serene landscapes of
            Dharamshala, offering breathtaking Himalayan views and unmatched
            hospitality.
          </p>
          <div className={styles.socialRow}>
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        {/* Column 2 — Quick Links */}
        <div className={styles.column}>
          <h4 className={styles.columnHeading}>Quick Links</h4>
          <ul className={styles.linkList}>
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.footerLink}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Contact */}
        <div className={styles.column}>
          <h4 className={styles.columnHeading}>Contact Us</h4>
          <address className={styles.contactInfo}>
            <p className={styles.contactLine}>
              📍 Opp. Norbulingka Institute, Sidhpur, Dharamshala, Kangra, HP
            </p>
            <p className={styles.contactLine}>
              📞{' '}
              <a href="tel:+918626983777" className={styles.footerLink}>
                +91 86269 83777
              </a>
            </p>
            <p className={styles.contactLine}>
              ✉️{' '}
              <a
                href="mailto:reservation@thedivinehima.com"
                className={styles.footerLink}
              >
                reservation@thedivinehima.com
              </a>
            </p>
          </address>
        </div>

        {/* Column 4 — Book */}
        <div className={styles.column}>
          <h4 className={styles.columnHeading}>Book Your Stay</h4>
          <p className={styles.bookText}>
            Ready for an unforgettable experience?
          </p>
          <Link href="https://asiatech.in/booking_engine/index3?token=MTA4NDQ=" className="btn btn-primary">
            Book Now
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottomBar}>
        <div className={`container ${styles.bottomBarInner}`}>
          <p className={styles.copyright}>
            © 2024–2026 The Divine Hima. All rights reserved.
          </p>
          <p className={styles.craft}>Crafted with ❤️ in the Himalayas</p>
        </div>
      </div>
    </footer>
  );
}
