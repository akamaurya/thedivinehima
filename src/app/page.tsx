import type { Metadata } from 'next';
import { client } from '../../sanity/lib/client';
import HomePageClient from '@/components/HomePageClient';

// Title and description come from the root layout defaults; the homepage owns the canonical.
export const metadata: Metadata = { alternates: { canonical: '/' } };

export default async function HomePage() {
  const [settings, testimonials] = await Promise.all([
    client.fetch(`*[_type == "siteSettings"][0]{ heroImage, introImage, premiumRoomImage, superiorRoomImage, deluxeRoomImage }`),
    client.fetch(`*[_type == "testimonial" && defined(text)] | order(date desc) { name, text, rating }`),
  ]);

  return <HomePageClient settings={settings} testimonials={testimonials} />;
}
