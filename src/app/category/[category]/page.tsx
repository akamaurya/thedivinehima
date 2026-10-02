import Redirect, { redirectMetadata } from '@/components/Redirect';

// Retired WordPress archive pages (from the live sitemap) -> blog index.
const category = ['travel-guide', 'uncategorised'];

export const generateStaticParams = () => category.map((category) => ({ category }));
export const dynamicParams = false;
export const metadata = redirectMetadata('/blog/');

export default function Page() {
  return <Redirect to="/blog/" />;
}
