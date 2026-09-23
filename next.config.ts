import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
