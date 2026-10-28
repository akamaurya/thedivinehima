import PageHero from '@/components/PageHero';
import styles from './page.module.css';

const WHATSAPP_URL = 'https://wa.me/918626983777';
const EMAIL = 'reservation@thedivinehima.com';

export default function ContactPage() {
  return (
    <main className={styles.main}>
      <PageHero
        title="Get in Touch"
        backgroundImage="/wp-content/uploads/2024/12/luxury-2.jpg"
      />

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
                  className={`btn btn-primary ${styles.actionBtn}`}
                >
                  WhatsApp the front desk
                </a>
                <a href="tel:+918626983777" className={styles.actionBtnGhost}>
                  Call +91 86269 83777
                </a>
                <a
                  href={`mailto:${EMAIL}?subject=${encodeURIComponent('Booking enquiry: The Divine Hima')}`}
                  className={styles.actionBtnGhost}
                >
                  Email {EMAIL}
                </a>
              </div>

              <p className={styles.actionNote}>
                We answer every message, 8:00 AM to 10:00 PM IST.
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
                  <a href="tel:+918626983777" className={styles.infoCardLink}>+91 86269 83777</a>
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
    </main>
  );
}
