import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "yourlead.io — Find customers before your competitors",
  description: "We scan thousands of online signals daily and send you a ready-to-send message before your competitor even sees it.",
};

export default function ToolLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
