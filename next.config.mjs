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
      if (!isServer) {
          // Ignore these modules in client-side bundles
          config.resolve.fallback = {
              ...config.resolve.fallback,
              net: false,
              tls: false,
              dns: false,
              child_process: false,
          };
      }
      return config;
  },
};

export default nextConfig;
