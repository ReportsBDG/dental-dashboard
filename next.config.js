/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router is stable in Next.js 14, no need for experimental flag
  swcMinify: true,
  images: {
    domains: [],
  },
}

module.exports = nextConfig 