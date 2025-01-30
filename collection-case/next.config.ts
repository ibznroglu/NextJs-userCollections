import type { NextConfig } from "next";
 
/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/collections/:path*',
        destination: 'https://maestro-api-dev.secil.biz/:path*'
      }
    ];
  }
};
 
export default nextConfig;