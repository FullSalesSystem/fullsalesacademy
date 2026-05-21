const nextConfig = {
  output: 'export',
  basePath: '/fullsalesacademy',
  assetPrefix: '/fullsalesacademy',
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'img.youtube.com' },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
