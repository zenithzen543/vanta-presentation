import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  transpilePackages: ["next-sanity", "sanity", "@sanity/vision", "swr"],
}

export default nextConfig
