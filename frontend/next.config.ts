import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    API_BASE_URL: process.env.SERVER_BACKEND_URL,
  },
};

export default nextConfig;
