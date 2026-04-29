/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // ✅ Required for Hostinger Static Export
  output: 'export', 

  // ✅ Merged Image Settings (Supabase + Unoptimized for static export)
  images: {
    unoptimized: true, // Must be true for 'output: export'
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },

  experimental: {
    // ✅ Prisma Optimization
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