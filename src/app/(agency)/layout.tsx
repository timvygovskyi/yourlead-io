import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lead Your Marketing — Content & Growth Marketing",
  description:
    "We research what convinces your customers, produce the content that proves it, and run it across the channels that turn attention into revenue.",
};

// Tracking scripts for the agency site go here, so they stay off /leadgentool.
export default function AgencyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
