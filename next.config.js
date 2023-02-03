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
    loader: 'imgix',
    path: '/',
  },
}

module.exports = nextConfig
