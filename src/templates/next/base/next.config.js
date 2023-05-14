/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverActions: true,
    typedRoutes: true,
  },
  eslint: {
    dirs: ['.'],
  },
}

module.exports = nextConfig
