import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl =
  (process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://mariamdigitalbee.org") || "https://mariamdigitalbee.org";

const title = {
  default: "Mariam Kaleem | African Marketing Strategist",
  template: "%s | Mariam Kaleem",
};

const description =
  "Mariam is a seasoned Fireball Marketer , a Snr Professional and dynamic Leader in Brand Strategy, Experiential Marketing, Digital Banking Transformation , and Operational Excellence, with over 18+ years of experience in senior roles across multiple multinationals including Ogilvy, Vodafone, Standard Chartered and Letshego Africa Holdings.";

const faviconPath = "/images/logo.png";

const socialPreviewImage = {
  url: "/images/mariam.jpeg",
  width: 1080,
  height: 1080,
  alt: "Mariam Kaleem",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "Mariam Kaleem",
  authors: [{ name: "Mariam Kaleem", url: siteUrl }],
  creator: "Mariam Kaleem",
  keywords: [
    "Mariam Kaleem",
    "Digital Bee",
    "Fireball Marketer",
    "brand strategy",
    "experiential marketing",
    "digital banking transformation",
    "financial inclusion",
    "Ogilvy",
    "Vodafone Ghana",
    "Standard Chartered",
    "Letshego Africa",
    "sub-Saharan Africa",
    "Africa creative economy",
    "mariamdigitalbee",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [{ url: faviconPath, type: "image/png" }],
    shortcut: faviconPath,
    apple: faviconPath,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Mariam Kaleem",
    title: title.default,
    description,
    images: [socialPreviewImage],
  },
  twitter: {
    card: "summary_large_image",
    title: title.default,
    description,
    images: [socialPreviewImage],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
