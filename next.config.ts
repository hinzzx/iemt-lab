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
};

export default nextConfig;
