import { client } from '../../sanity/lib/client';
import HomePageClient from '@/components/HomePageClient';

// By default, let's keep the home page revalidated often or static depending on Next.js config
export const revalidate = 60; // Revalidate every 60 seconds so CMS changes show up

export default async function HomePage() {
  // Fetch the siteSettings document
  const settings = await client.fetch(
    `*[_type == "siteSettings"][0]{ heroImage, introImage, premiumRoomImage, superiorRoomImage, deluxeRoomImage }`
  );

  return <HomePageClient settings={settings} />;
}
