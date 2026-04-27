/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // ✅ Supabase Image Support
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },

  experimental: {
    // ✅ Prisma Optimization only (appDir is removed because it's now default)
    serverComponentsExternalPackages: ['@prisma/client'],
  },

  // ✅ Vercel Analytics/Debugging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  // ✅ Required for @react-pdf/renderer
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
};

export default nextConfig;