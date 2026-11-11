import Redirect, { redirectMetadata } from '@/components/Redirect';

// Retired WordPress archive pages (from the live sitemap) -> blog index.
const tag = ['adventure', 'best-time-to-visit', 'bir-billing', 'cafes', 'chamunda-devi', 'christmas', 'couples', 'cricket', 'dal-lake', 'dalai-lama', 'day-trips', 'dharamkot', 'dharamshala', 'dhauladhar', 'diff', 'events', 'festivals', 'family-travel', 'film-festival', 'food', 'himachal', 'himachali-dham', 'himachali-food', 'honeymoon', 'hotels', 'hpca-stadium', 'itinerary', 'kangra', 'kareri-lake', 'kids', 'long-stay', 'mcleod-ganj', 'meditation', 'monsoon', 'naddi', 'new-year', 'norbulingka', 'offbeat', 'palampur', 'paragliding', 'pilgrimage', 'remote-work', 'restaurants', 'retreat', 'romantic', 'ropeway', 'sidhpur', 'skyway', 'snow', 'spa', 'spiritual-travel', 'temples', 'things-to-do', 'tibetan-culture', 'travel-tips', 'trekking', 'triund', 'triund-trek', 'tsuglagkhang', 'wellness', 'winter', 'workation', 'yoga'];

export const generateStaticParams = () => tag.map((tag) => ({ tag }));
export const dynamicParams = false;
export const metadata = redirectMetadata('/blog/');

export default function Page() {
  return <Redirect to="/blog/" />;
}
