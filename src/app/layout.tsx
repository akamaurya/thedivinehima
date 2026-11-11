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
    default: "Boutique Hotel in Dharamshala, Sidhpur | The Divine Hima",
    template: "%s | The Divine Hima",
  },
  description:
    "12-room boutique hotel opposite Norbulingka in Sidhpur, Dharamshala. Rated 4.5/5 by 1,264 Google reviewers. Mountain-view rooms, restaurant, café and bar.",
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
    title: "Boutique Hotel in Dharamshala, Sidhpur | The Divine Hima",
    description: "12-room boutique hotel opposite Norbulingka in Sidhpur, Dharamshala. Rated 4.5/5 by 1,264 Google reviewers.",
    siteName: "The Divine Hima",
    images: [
      {
        url: "/wp-content/uploads/2024/12/luxury-hotel-in-dharamshala.jpg",
        width: 1200,
        height: 630,
        alt: "The Divine Hima Exterior in Dharamshala",
      },
    ],
  },
  // Card type only: X falls back to each page's og:title/description/image,
  // so posts and rooms no longer preview as the homepage.
  twitter: { card: "summary_large_image" },
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
      { url: "/wp-content/uploads/2016/03/cropped-Divine-Hima-logo-512-32x32.png", sizes: "32x32" },
      { url: "/wp-content/uploads/2016/03/cropped-Divine-Hima-logo-512-192x192.png", sizes: "192x192" },
    ],
    apple: "/wp-content/uploads/2016/03/cropped-Divine-Hima-logo-512-180x180.png",
  },
};

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import JsonLd from "@/components/JsonLd";
import { hotelSchema, websiteSchema } from "@/lib/schema";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <JsonLd data={hotelSchema} />
        <JsonLd data={websiteSchema} />
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
