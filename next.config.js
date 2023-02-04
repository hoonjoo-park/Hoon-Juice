/** @type {import('next').NextConfig} */

const withPlugins = require('next-compose-plugins')
const optimizedImages = require('next-optimized-images')
const withOptimizedImages = require('next-optimized-images')

const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
module.exports = withPlugins([
  [
    optimizedImages,
    {
      images: {
        handleImages: ['jpeg', 'png', 'svg', 'webp'],
      },
    },
  ],
])

module.exports = withOptimizedImages({})
