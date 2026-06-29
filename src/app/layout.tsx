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
  title: "The Divine Hima | Boutique Hotel in Dharamshala",
  description:
    "Experience luxury in the Himalayas at The Divine Hima — a boutique hotel in Dharamshala offering premium rooms, world-class dining, and breathtaking mountain views.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
