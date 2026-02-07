import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable image optimization for external images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
    // Optimize images for faster loading
    formats: ["image/avif", "image/webp"],
    // Configure quality levels used throughout the app
    qualities: [30, 60, 75, 85],
  },

  // Optimize for production
  reactStrictMode: true,

  // Enable gzip compression
  compress: true,

  // Generate source maps for production debugging
  productionBrowserSourceMaps: false,

  // Experimental features for better performance
  experimental: {
    // Optimize CSS
    optimizeCss: true,
  },

  // Security headers
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "X-Frame-Options",
          value: "DENY",
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "Referrer-Policy",
          value: "strict-origin-when-cross-origin",
        },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=()",
        },
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
        {
          key: "X-DNS-Prefetch-Control",
          value: "on",
        },
      ],
    },
  ],
};

export default nextConfig;
