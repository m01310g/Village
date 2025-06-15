import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  devIndicators: false,
  webpack(config) {
    config.resolve.alias["tailwindConfig$"] = path.resolve(
      __dirname,
      "tailwind.config.js",
    );
    return config;
  },
};

export default nextConfig;
