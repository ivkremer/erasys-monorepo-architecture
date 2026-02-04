import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hunqz.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;
