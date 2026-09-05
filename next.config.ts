import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  agentRules: false,

  output: "export",

  basePath: isProd ? "/developer-portfolio" : "",
  assetPrefix: isProd ? "/developer-portfolio/" : "",

  images: {
    unoptimized: true,
  },
};

export default nextConfig;