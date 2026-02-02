import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  images: {
    remotePatterns: [
      new URL("https://zq2zfzjayoumiqjp.public.blob.vercel-storage.com/**"),
    ],
  },
};

export default nextConfig;
