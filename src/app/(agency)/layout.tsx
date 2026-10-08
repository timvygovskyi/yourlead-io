import type { Metadata } from "next";
import SiteHeader from "./_components/SiteHeader";
import SiteFooter from "./_components/SiteFooter";
import ConsentBanner from "./_components/ConsentBanner";
import TrackingScripts from "./_components/TrackingScripts";

export const metadata: Metadata = {
  title: "Lead Your Marketing — Content & Growth Marketing",
  description:
    "We research what convinces your customers, produce the content that proves it, and run it across the channels that turn attention into revenue.",
};

// Banner and tracking live here (not the root layout), so /leadgentool and /api stay untouched.
export default function AgencyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <SiteHeader />
      {children}
      <SiteFooter />
      <ConsentBanner />
      <TrackingScripts />
    </div>
  );
}
