<<<<<<< HEAD
/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router is stable in Next.js 14, no need for experimental flag
  swcMinify: true,
  images: {
    domains: [],
  },
}

=======
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
}

>>>>>>> becca72358969d5b4d324a29dd5a2c42b9a6fe69
module.exports = nextConfig 