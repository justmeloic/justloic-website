/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Allows static export & local deployment without external image optimization server
  },
};

export default nextConfig;
