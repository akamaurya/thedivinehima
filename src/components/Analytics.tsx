'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import posthog from 'posthog-js';

const GA_ID = 'G-GHCNSVZJ90';

// PostHog project (client-side / publishable) key. Safe to expose.
// TODO: replace with the "Project API Key" from PostHog > Settings > Project.
const POSTHOG_KEY = 'phc_mWVYd5x4y3uc7XLZ8bQ5766T8VL2M4234ykpks4wBywB';
const POSTHOG_HOST = 'https://eu.i.posthog.com';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Classifies a clicked anchor into one of our tracked conversion events.
 * Returns null for anchors we don't care about.
 */
function classifyAnchor(anchor: HTMLAnchorElement) {
  const href = anchor.getAttribute('href') || '';
  const linkText = anchor.textContent?.trim().slice(0, 100);

  if (href.includes('asiatech.in/booking_engine')) {
    return { name: 'book_now_click', props: { link_url: href, link_text: linkText } };
  }
  if (href.startsWith('mailto:')) {
    return { name: 'email_click', props: { link_url: href, email_address: href.replace(/^mailto:/, '') } };
  }
  if (href.startsWith('tel:')) {
    return { name: 'phone_click', props: { link_url: href, phone_number: href.replace(/^tel:/, '') } };
  }
  return null;
}

/**
 * Single analytics hub for the NEW site (the "new" A/B cohort).
 *
 * - Google Analytics 4 (gtag.js) — existing conversion tracking.
 * - PostHog — shared with the WordPress ("control") site so we can compare
 *   how each cohort experiences the site. Every event here is tagged
 *   `site_variant: 'new'`; the WordPress snippet tags its events 'control'.
 *
 * When a visitor is redirected here from WordPress they arrive with a
 * `?ph_did=` param carrying their shared visitor id, so both sites resolve
 * to the same person in PostHog (one funnel across the redirect).
 *
 * The custom events (book_now_click, email_click, phone_click) still need to
 * be marked as "Key Events" in the GA4 Admin > Events UI to count as
 * conversions; in PostHog set up a funnel broken down by `site_variant`.
 */
export default function Analytics() {
  useEffect(() => {
    // Continue the same PostHog identity as the WordPress site, if present.
    const params = new URLSearchParams(window.location.search);
    const sharedId = params.get('ph_did') || undefined;

    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      person_profiles: 'identified_only',
      capture_pageview: true,
      bootstrap: sharedId ? { distinctID: sharedId } : undefined,
    });
    // Tag every event from this deployment as the "new site" cohort.
    posthog.register({ site_variant: 'new' });

    // Strip the ph_did param so it isn't shared/bookmarked/indexed.
    if (sharedId) {
      params.delete('ph_did');
      const query = params.toString();
      const clean = window.location.pathname + (query ? `?${query}` : '') + window.location.hash;
      window.history.replaceState({}, '', clean);
    }

    function handleClick(event: MouseEvent) {
      const anchor = (event.target as HTMLElement | null)?.closest('a');
      if (!anchor) return;

      const hit = classifyAnchor(anchor as HTMLAnchorElement);
      if (!hit) return;

      if (typeof window.gtag === 'function') {
        window.gtag('event', hit.name, hit.props);
      }
      posthog.capture(hit.name, hit.props);
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
