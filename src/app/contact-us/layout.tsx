import type { Metadata } from 'next';

const description =
  'Call The Divine Hima on +91 86269 83777 or WhatsApp the front desk. Opposite Norbulingka Institute, Sidhpur, Dharamshala 176057, 12 km from Kangra airport.';

export const metadata: Metadata = {
  title: { absolute: 'Contact The Divine Hima, Dharamshala | +91 86269 83777' },
  description,
  openGraph: {
    title: 'Contact The Divine Hima, Dharamshala',
    description,
    url: 'https://thedivinehima.com/contact-us/',
    images: [{ url: '/wp-content/uploads/2024/12/luxury-2.jpg', width: 1200, height: 630, alt: 'The Divine Hima, Sidhpur, Dharamshala' }],
  },
  alternates: { canonical: '/contact-us/' },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
