import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  typescript: {
    // ⚠️ Warning: This skips type checking during build
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
