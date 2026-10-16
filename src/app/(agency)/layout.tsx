import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import SiteHeader from "./_components/SiteHeader";
import SiteFooter from "./_components/SiteFooter";
import ConsentBanner from "./_components/ConsentBanner";
import TrackingScripts from "./_components/TrackingScripts";
import "./agency.css";

// Self-hosted at build time by next/font: no request to Google Fonts from the browser.
const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const description =
  "We research what convinces your customers, produce the content that proves it, and run it across the channels that turn attention into revenue.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.yourlead.io"),
  title: "Lead Your Marketing — Content & Growth Marketing",
  description,
  icons: {
    icon: [{ url: "/brand/favicon.svg", type: "image/svg+xml" }],
    apple: "/brand/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: "Lead Your Marketing",
    title: "Lead Your Marketing · Content & Growth Marketing",
    description,
    images: [{ url: "/brand/og-image.png", width: 1200, height: 630, alt: "Lead Your Marketing: We turn your business into a brand people trust, and buy from." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lead Your Marketing · Content & Growth Marketing",
    description,
    images: ["/brand/og-image.png"],
  },
};

// Banner and tracking live here (not the root layout), so /leadgentool and /api stay untouched.
export default function AgencyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`lym ${instrumentSerif.variable} ${inter.variable}`}>
      <SiteHeader />
      {children}
      <SiteFooter />
      <ConsentBanner />
      <TrackingScripts />
    </div>
  );
}
