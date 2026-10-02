import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with The Divine Hima. Reach us for bookings, inquiries, and more.',
  openGraph: {
    title: 'Contact Us | The Divine Hima',
    description: 'Get in touch with The Divine Hima. Reach us for bookings, inquiries, and more.',
    url: 'https://thedivinehima.com/contact-us/',
    images: [
      {
        url: '/images/luxury-2.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact The Divine Hima',
      }
    ],
  },
  alternates: {
    canonical: '/contact-us/',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
