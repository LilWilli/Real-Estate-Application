/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
      // ... other image patterns you might have
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

    // Custom plugin to log errors during the build process instead of suppressing them
    config.plugins.push({
      apply: (compiler) => {
        compiler.hooks.emit.tapAsync('LogErrorsPlugin', (compilation, callback) => {
          if (compilation.errors.length > 0) {
            console.error('Build errors:', compilation.errors); // Log errors instead of ignoring
          }
          callback(); // Proceed with the build
        });
      },
    });

    return config;
  },
};

export default nextConfig;
