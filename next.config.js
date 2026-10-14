/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [],
    formats: ["image/webp"],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ];
  },

  async redirects() {
    // Pages Anthony retired in his restructure (v39): Conditions and Resources
    // were folded into Your Body, Working Together into Your Session, and the
    // single Anthony page became Therapists with individual pages behind it.
    return [
      { source: "/conditions", destination: "/your-body", permanent: true },
      { source: "/resources", destination: "/your-body", permanent: true },
      { source: "/working-together", destination: "/your-session", permanent: true },
      { source: "/anthony", destination: "/therapist-anthony", permanent: true },
    ];
  },
};

module.exports = nextConfig;
