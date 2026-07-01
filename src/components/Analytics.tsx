'use client';

import Script from 'next/script';
import { useEffect } from 'react';

const GA_ID = 'G-GHCNSVZJ90';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Google Analytics 4 (gtag.js) loader + delegated event tracking.
 *
 * Rather than wiring an onClick onto every "Book Now" / email / phone link
 * scattered across the site, we attach a single delegated listener that
 * inspects clicked anchors. This keeps tracking in one place and survives
 * new links being added anywhere in the app.
 *
 * The custom events below (book_now_click, email_click, phone_click) still
 * need to be marked as "Key Events" in the GA4 Admin > Events UI to count
 * as conversions.
 */
export default function Analytics() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const anchor = (event.target as HTMLElement | null)?.closest('a');
      if (!anchor || typeof window.gtag !== 'function') return;

      const href = anchor.getAttribute('href') || '';
      const linkText = anchor.textContent?.trim().slice(0, 100);

      if (href.includes('asiatech.in/booking_engine')) {
        window.gtag('event', 'book_now_click', {
          link_url: href,
          link_text: linkText,
        });
      } else if (href.startsWith('mailto:')) {
        window.gtag('event', 'email_click', {
          link_url: href,
          email_address: href.replace(/^mailto:/, ''),
        });
      } else if (href.startsWith('tel:')) {
        window.gtag('event', 'phone_click', {
          link_url: href,
          phone_number: href.replace(/^tel:/, ''),
        });
      }
    }

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
