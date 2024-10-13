/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Configuration for remote images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'www.washingtonpost.com',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
    ],
  },

  // Enforcing Node.js runtime globally (instead of Edge runtime)
  experimental: {
    runtime: 'nodejs', // Set Node.js runtime globally
  },

  webpack: (config, { isServer }) => {
    // Ignore certain modules in client-side bundles
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        net: false,
        tls: false,
        dns: false,
        child_process: false,
      };
    }

    // Custom plugin to log errors during the build process
    config.plugins.push({
      apply: (compiler) => {
        compiler.hooks.emit.tapAsync('LogErrorsPlugin', (compilation, callback) => {
          if (compilation.errors.length > 0) {
            console.error('Build errors:', compilation.errors);
          }
          callback();
        });
      },
    });

    return config;
  },
};

export default nextConfig;  // Using ES module syntax for export
