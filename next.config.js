/** @type {import('next').NextConfig} */

const withOptimizedImages = require('next-optimized-images')

const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  ...nextConfig,
  ...withOptimizedImages({ handleImages: ['jpeg', 'png', 'svg'] }),
}
