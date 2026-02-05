import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.hunqz.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'hunqz.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;
