/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dev',
        permanent: true,
      },
    ]
  },

  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
