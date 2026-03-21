import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const repoName = '/beverly-hills-luxury-estate';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isProd ? repoName : '',
  assetPrefix: isProd ? repoName : '',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
