import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qgbvgmxttrpojnczyfdn.supabase.co",
      },
    ],
  },
};

export default nextConfig;
