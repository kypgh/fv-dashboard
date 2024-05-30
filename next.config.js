/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SERVER: process.env.SERVER,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "forexview.s3.eu-central-1.amazonaws.com",
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
