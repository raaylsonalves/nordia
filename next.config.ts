import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root — otherwise Turbopack walks up past the repo and
  // picks up an unrelated package-lock.json from the home directory.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
