import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Breadcrumbs from '@/components/Breadcrumbs';
import FAQ from '@/components/FAQ';
import JsonLd from '@/components/JsonLd';
import { PHONE_DISPLAY, TEL_URL, WHATSAPP_URL } from '@/lib/contact';
import { CONTACT_FAQS } from '@/lib/faqs';
import { EMAIL, HOTEL_ID, SITE } from '@/lib/schema';
import styles from './page.module.css';

export default function ContactPage() {
  return (
    <main className={styles.main}>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          url: `${SITE}/contact-us/`,
          name: 'Contact The Divine Hima',
          about: { '@id': HOTEL_ID },
        }}
      />
      <PageHero
        title="Contact The Divine Hima"
        subtitle="Bookings and questions, answered 8:00 AM to 10:30 PM IST"
        backgroundImage="/wp-content/uploads/2024/12/luxury-2.jpg"
        alt="The Divine Hima, Sidhpur, Dharamshala"
      />
      <Breadcrumbs items={[{ name: 'Contact', href: '/contact-us/' }]} />

      <section className={`section ${styles.contactSection}`}>
        <div className="container">
          <div className={styles.grid}>
            {/* Left Col: working contact channels (no form backend on a static site) */}
            <div className={styles.actionCard}>
              <h2 className={styles.sectionTitle}>Reserve or Enquire</h2>
              <p className={styles.actionText}>
                Tell us your dates and how many guests are travelling, and we
                will reply with availability and the best rate. WhatsApp is the
                fastest way to reach the front desk.
              </p>

              <div className={styles.actions}>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  WhatsApp the front desk
                </a>
                <a href={TEL_URL} className="btn btn-secondary">
                  Call {PHONE_DISPLAY}
                </a>
                <a
                  href={`mailto:${EMAIL}?subject=${encodeURIComponent('Booking enquiry: The Divine Hima')}`}
                  className="btn btn-secondary"
                >
                  Email us
                </a>
              </div>

              <p className={styles.actionNote}>
                We answer every message, 8:00 AM to 10:30 PM IST.
              </p>
            </div>

            {/* Right Col - Info */}
            <div className={styles.infoCards}>
              <div className={styles.infoCard}>
                <div className={styles.infoCardIcon}>📍</div>
                <div className={styles.infoCardContent}>
                  <h3 className={styles.infoCardTitle}>Address</h3>
                  <p className={styles.infoCardText}>
                    Opp. Norbulingka Institute, Sidhpur<br/>
                    Dharamshala, Kangra<br/>
                    Himachal Pradesh 176057
                  </p>
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoCardIcon}>📞</div>
                <div className={styles.infoCardContent}>
                  <h3 className={styles.infoCardTitle}>Phone</h3>
                  <a href={TEL_URL} className={styles.infoCardLink}>{PHONE_DISPLAY}</a>
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoCardIcon}>✉️</div>
                <div className={styles.infoCardContent}>
                  <h3 className={styles.infoCardTitle}>Email</h3>
                  <a href={`mailto:${EMAIL}`} className={styles.infoCardLink}>{EMAIL}</a>
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoCardIcon}>🕐</div>
                <div className={styles.infoCardContent}>
                  <h3 className={styles.infoCardTitle}>Hours</h3>
                  <p className={styles.infoCardText}>
                    Check-in: 2:00 PM<br/>
                    Check-out: 11:00 AM
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="section">
        <div className="container prose">
          <h2>How to reach us</h2>
          <p>
            The Divine Hima is in Sidhpur, between lower Dharamshala and McLeod Ganj, directly opposite the Norbulingka Institute. Our address is Opp. Norbulingka Institute, Sidhpur, Dharamshala, Kangra, Himachal Pradesh 176057.
          </p>
          <h3>By air</h3>
          <p>Kangra (Gaggal) airport is about 12 km away, 25 to 30 minutes by road, with regular flights from Delhi. We arrange airport pickups on request.</p>
          <h3>By train</h3>
          <p>Pathankot Junction, about 85 km away, is the most practical mainline railway station. The drive from there takes 3 to 3.5 hours.</p>
          <h3>By road</h3>
          <p>Dharamshala is about 475 km from Delhi (10 to 12 hours) and 250 km from Chandigarh (6 to 7 hours), with overnight buses from both to the Dharamshala bus stand. There is secure parking at the hotel.</p>
          <p>
            Our guide on <Link href="/how-to-reach-dharamshala/">how to reach Dharamshala</Link> compares every route in detail.
          </p>
        </div>
      </section>

      <section className={styles.mapSection}>
        <div className={styles.mapWrapper}>
          <iframe 
            src="https://maps.google.com/maps?q=The%20Divine%20Hima,%20Sidhpur,%20Dharamshala&t=&z=15&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="450" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map location of The Divine Hima"
          ></iframe>
        </div>
      </section>

      <FAQ items={CONTACT_FAQS} title="Before you arrive" />
    </main>
  );
}
