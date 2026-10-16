import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first (smallest), WebP fallback. Applies to next/image only; the lead tool uses none.
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75],
  },
  async redirects() {
    return [
      {
        source: "/success",
        destination: "/leadgentool/success",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
