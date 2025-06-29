import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "standalone",
  compiler: {
    styledComponents: true,
  },
  devIndicators: false,
  webpack(config) {
    config.resolve.alias["tailwindConfig$"] = path.resolve(
      __dirname,
      "tailwind.config.js",
    );
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sehyeon-gym-images.s3.ap-northeast-2.amazonaws.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
