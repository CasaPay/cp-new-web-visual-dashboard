import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [{ source: "/partner", destination: "/partner/operator", permanent: true }];
  },
};

export default nextConfig;
