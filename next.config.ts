import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
        {
            protocol: "https",
            hostname: "openmoji.org",
        },
    ],
  },
};

export default nextConfig;
