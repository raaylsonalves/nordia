import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 85, 90],
  },
  // Pin the workspace root — otherwise Turbopack walks up past the repo and
  // picks up an unrelated package-lock.json from the home directory.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
