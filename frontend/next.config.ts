import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Docker Compose環境でコンテナ名(front)経由でアクセスした際にHMRがブロックされないようにする
  allowedDevOrigins: ["front"],
};

export default nextConfig;
