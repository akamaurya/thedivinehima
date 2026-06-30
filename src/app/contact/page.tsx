'use client';
import { FormEvent, useState } from 'react';
import PageHero from '@/components/PageHero';
import styles from './page.module.css';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Real implementation would send to an API
  };

  return (
    <main className={styles.main}>
      <PageHero 
        title="Get in Touch" 
        backgroundImage="https://thedivinehima.com/wp-content/uploads/2024/12/luxury-2.jpg"
      />

      <section className={`section ${styles.contactSection}`}>
        <div className="container">
          <div className={styles.grid}>
            
            {/* Left Col - Form */}
            <div className={styles.formCard}>
              <h2 className={styles.sectionTitle}>Send us a Message</h2>
              {submitted ? (
                <div className={styles.successMessage}>
                  Thank you for reaching out! We will get back to you shortly.
                </div>
              ) : (
                <form className={styles.contactForm} onSubmit={handleSubmit}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="name" className={styles.label}>Name</label>
                      <input type="text" id="name" required className={styles.input} />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="email" className={styles.label}>Email</label>
                      <input type="email" id="email" required className={styles.input} />
                    </div>
                  </div>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="phone" className={styles.label}>Phone</label>
                      <input type="tel" id="phone" className={styles.input} />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="subject" className={styles.label}>Subject</label>
                      <input type="text" id="subject" required className={styles.input} />
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="message" className={styles.label}>Message</label>
                    <textarea id="message" rows={5} required className={styles.textarea}></textarea>
                  </div>
                  <button type="submit" className={`btn btn-primary ${styles.submitBtn}`}>Send Message</button>
                </form>
              )}
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
                  <a href="mailto:info@thedivinehima.com" className={styles.infoCardLink}>info@thedivinehima.com</a>
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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d17105.744111325603!2d76.3248!3d32.2223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3904b509f6111111%3A0x8e83348102a96996!2sThe%20Divine%20Hima!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin" 
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
