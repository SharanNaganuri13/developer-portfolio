import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  agentRules: false,
  output: 'export',
  basePath: isProduction ? '/developer-portfolio' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
