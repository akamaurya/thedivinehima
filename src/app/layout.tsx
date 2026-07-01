import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thedivinehima.com"),
  title: {
    default: "The Divine Hima | Boutique Hotel in Dharamshala",
    template: "%s | The Divine Hima",
  },
  description:
    "Experience luxury in the Himalayas at The Divine Hima — a boutique hotel in Dharamshala offering premium rooms, world-class dining, and breathtaking mountain views.",
  keywords: [
    "Boutique Hotel Dharamshala",
    "Luxury Hotel Himalayas",
    "The Divine Hima",
    "Dharamshala Resorts",
    "Hotels in Sidhpur",
    "Best Hotels in Dharamshala",
    "Luxury Stay Dharamshala"
  ],
  authors: [{ name: "The Divine Hima" }],
  creator: "The Divine Hima",
  publisher: "The Divine Hima",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://thedivinehima.com",
    title: "The Divine Hima | Boutique Hotel in Dharamshala",
    description: "Experience luxury in the Himalayas at The Divine Hima — a boutique hotel in Dharamshala.",
    siteName: "The Divine Hima",
    images: [
      {
        url: "https://thedivinehima.com/wp-content/uploads/2024/12/luxury-hotel-in-dharamshala.jpg",
        width: 1200,
        height: 630,
        alt: "The Divine Hima Exterior in Dharamshala",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Divine Hima | Boutique Hotel in Dharamshala",
    description: "Experience luxury in the Himalayas at The Divine Hima — a boutique hotel in Dharamshala.",
    images: ["https://thedivinehima.com/wp-content/uploads/2024/12/luxury-hotel-in-dharamshala.jpg"],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "https://thedivinehima.com/wp-content/uploads/2016/03/cropped-Divine-Hima-logo-512-32x32.png", sizes: "32x32" },
      { url: "https://thedivinehima.com/wp-content/uploads/2016/03/cropped-Divine-Hima-logo-512-192x192.png", sizes: "192x192" },
    ],
    apple: "https://thedivinehima.com/wp-content/uploads/2016/03/cropped-Divine-Hima-logo-512-180x180.png",
  },
};

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <Script id="schema-org-local-business" type="application/ld+json" strategy="beforeInteractive">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Hotel",
              "name": "The Divine Hima",
              "image": "https://thedivinehima.com/wp-content/uploads/2024/12/luxury-hotel-in-dharamshala.jpg",
              "description": "Experience luxury in the Himalayas at The Divine Hima — a boutique hotel in Dharamshala offering premium rooms, world-class dining, and breathtaking mountain views.",
              "founder": {
                "@type": "Person",
                "name": "Sanjay Kumbkarni"
              },
              "sameAs": [
                "https://www.instagram.com/thedivinehima",
                "https://www.facebook.com/thedivinehima",
                "https://www.tripadvisor.in/Hotel_Review-g2058079-d10243144-Reviews-The_Divine_Hima-Sidhpur_Dharamshala_Kangra_District_Himachal_Pradesh.html"
              ],
              "knowsAbout": [
                "Boutique Hospitality",
                "Himalayan Tourism",
                "Luxury Accommodation",
                "Dharamshala Travel",
                "Fine Dining"
              ],
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Opposite Norbulingka Institute, Sidhpur",
                "addressLocality": "Dharamshala",
                "addressRegion": "HP",
                "postalCode": "176057",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 32.1932,
                "longitude": 76.3533
              },
              "url": "https://thedivinehima.com",
              "telephone": "+918626983777",
              "priceRange": "$$$",
              "starRating": {
                "@type": "Rating",
                "ratingValue": "4.5"
              },
              "amenityFeature": [
                {
                  "@type": "LocationFeatureSpecification",
                  "name": "Free WiFi",
                  "value": true
                },
                {
                  "@type": "LocationFeatureSpecification",
                  "name": "Restaurant",
                  "value": true
                },
                {
                  "@type": "LocationFeatureSpecification",
                  "name": "Parking",
                  "value": true
                }
              ]
            }
          `}
        </Script>
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
