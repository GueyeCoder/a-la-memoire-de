import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    localPatterns: [
      { pathname: '/uploads/**' },
      { pathname: '/*.jpeg' },
      { pathname: '/*.jpg' },
      { pathname: '/*.png' },
      { pathname: '/*.webp' },
    ],
  },
}

export default nextConfig
