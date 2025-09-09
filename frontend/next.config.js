/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove static export for dynamic content
  images: {
    domains: ['localhost'],
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
    // Enable server actions with the new format
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

module.exports = nextConfig;
