import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "spirit-flashcard-images.s3.ap-southeast-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
}

export default nextConfig
