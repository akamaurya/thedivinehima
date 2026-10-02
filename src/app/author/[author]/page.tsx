import Redirect, { redirectMetadata } from '@/components/Redirect';

// Retired WordPress archive pages (from the live sitemap) -> blog index.
const author = ['sanjay'];

export const generateStaticParams = () => author.map((author) => ({ author }));
export const dynamicParams = false;
export const metadata = redirectMetadata('/blog/');

export default function Page() {
  return <Redirect to="/blog/" />;
}
