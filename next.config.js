/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },

  images: {
    domains: ['cdn.dummyjson.com'],
  },
};

module.exports = nextConfig;
