import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { abs } from '@/lib/schema';

export type Crumb = { name: string; href: string };

// Home is added automatically. The last crumb is the current page.
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: 'Home', href: '/' }, ...items];
  return (
    <nav aria-label="Breadcrumb" className="container breadcrumbs">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: all.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: abs(c.href) })),
        }}
      />
      <ol>
        {all.map((c, i) =>
          i === all.length - 1 ? (
            <li key={c.href} aria-current="page">{c.name}</li>
          ) : (
            <li key={c.href}><Link href={c.href}>{c.name}</Link></li>
          ),
        )}
      </ol>
    </nav>
  );
}
