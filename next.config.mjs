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
      // Add other remote image patterns if needed
    ],
  },

  webpack: (config, { isServer }) => {
    // Ignore these modules in client-side bundles
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
            console.error('Build errors:', compilation.errors); // Log errors instead of ignoring
          }
          callback(); // Continue with the build
        });
      },
    });

    return config;
  },
};

export default nextConfig;
