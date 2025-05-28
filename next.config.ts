import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  eslint:{
    ignoreDuringBuilds:true
  },
  images:{
    unoptimized:true
  },
  typescript:{
    ignoreBuildErrors:true
  }
};

export default nextConfig;
