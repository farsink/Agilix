import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  reactStrictMode: true,
  images: {
    domains: [
      'images.pexels.com',
      'cdn.trustpilot.net',
      'upload.wikimedia.org'
    ]
  },
  async redirects() {
    return [
      {
        source: '/physical-info',
        destination: '/UserRegistered',
        permanent: true,
      },
      {
        source: '/fitness-level',
        destination: '/UserRegistered',
        permanent: true,
      },
      {
        source: '/workout-preferences',
        destination: '/UserRegistered',
        permanent: true,
      },
      {
        source: '/equipment-space',
        destination: '/UserRegistered',
        permanent: true,
      },
      {
        source: '/health-safety',
        destination: '/UserRegistered',
        permanent: true,
      },
      {
        source: '/completion',
        destination: '/UserRegistered',
        permanent: true,
      },
    ];
  },
  /* config options here */
};

export default nextConfig;
