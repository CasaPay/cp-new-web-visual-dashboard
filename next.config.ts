import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/*": ["./public/site-pages/**/*"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/", destination: "/tenant", permanent: true },
      { source: "/offers", destination: "/tenant/offers", permanent: true },
      { source: "/tenant-protection", destination: "/tenant/tenant-protection", permanent: true },
      { source: "/casapay-plus", destination: "/tenant/casapay-plus", permanent: true },
      { source: "/en/discovery", destination: "/tenant", permanent: true },
      { source: "/en/est", destination: "/tenant", permanent: true },
      { source: "/et/discovery/:path*", destination: "/tenant", permanent: false },
      { source: "/en/est/tallinn", destination: "/tenant/en/est/tallinn", permanent: true },
      { source: "/en/gbr/london", destination: "/tenant/en/gbr/london", permanent: true },
      { source: "/rentlink", destination: "/partner/operator/rentlink", permanent: true },
      { source: "/partner", destination: "/partner/operator", permanent: true },
      { source: "/partner/offers", destination: "/partner/operator/offers", permanent: true },
      { source: "/partner/capital", destination: "/partner/operator/capital", permanent: true },
      { source: "/partner/referrals", destination: "/partner/operator/referrals", permanent: true },
      { source: "/partner/en/est", destination: "/partner/operator", permanent: true },
      { source: "/partner/en/est/rentlink", destination: "/partner/operator/rentlink", permanent: true },
      { source: "/partner/en/est/solution/casapay-plus", destination: "/partner/operator/casapay-plus", permanent: true },
      { source: "/partner/en/est/solution/capital", destination: "/partner/operator/capital", permanent: true },
      { source: "/partner/en/est/:path*", destination: "/partner/operator/:path*", permanent: true },
      { source: "/partner/operator/solution/casapay-plus", destination: "/partner/operator/casapay-plus", permanent: true },
      { source: "/partner/operator/solution/capital", destination: "/partner/operator/capital", permanent: true },
    ];
  },
};

export default nextConfig;
