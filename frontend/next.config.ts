import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  reactStrictMode: true,
  images: {
    domains: [
      'images.pexels.com',
      'cdn.trustpilot.net',
      'upload.wikimedia.org'
    ]
  }
  /* config options here */
};

export default nextConfig;
