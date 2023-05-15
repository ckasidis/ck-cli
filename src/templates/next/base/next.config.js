/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverActions: true,
  },
  eslint: {
    dirs: ['.'],
  },
}

module.exports = nextConfig
