// Static export has no server 301s and Next only emits a client-side JS redirect,
// so retired URLs ship an instant meta refresh (Google treats it as permanent) plus a
// canonical to the target. React 19 hoists the <meta> into <head>.
import Link from 'next/link';

export const redirectMetadata = (to: string) => ({ alternates: { canonical: to } });

export default function Redirect({ to }: { to: string }) {
  return (
    <main className="container" style={{ padding: '4rem 1rem' }}>
      <meta httpEquiv="refresh" content={`0;url=${process.env.BASE_PATH ?? ''}${to}`} />
      <p>This page has moved to <Link href={to}>{to}</Link>.</p>
    </main>
  );
}
