import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/thumbnails/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=2592000" }, // 30 days, revalidatable
        ],
      },
      {
        source: "/fonts/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000" }, // 1 year, revalidatable
        ],
      },
    ];
  },
};

export default nextConfig;
