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

  // Choose one of the following methods for CORS configuration:

  // Method 1: Direct CORS Configuration (Next.js 13
    // OR

    // Method 2: Using `next-cors` Middleware (Next.js 12 and earlier)
    // middleware: {
    //   handler: require('./middleware'), // Replace with your middleware path
    // },
  };

  export default nextConfig;