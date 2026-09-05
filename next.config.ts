import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  agentRules: false,
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
