/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'oncure-backend.onrender.com'],
  },

  // Configure WebSocket if needed
  webpack: (config, { isServer }) => {
    // Add WebSocket support
    if (isServer) {
      config.externals.push({
        'utf-8-validate': 'commonjs utf-8-validate',
        'bufferutil': 'commonjs bufferutil',
      });
    }
    return config;
  },

  // Configure experimental features
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },

  // Vercel-specific optimizations
  output: 'standalone',
};

module.exports = nextConfig;
