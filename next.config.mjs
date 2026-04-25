/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },

  // 🟢 FIX: Moved out of 'experimental' and renamed for Next.js 16+
  serverExternalPackages: ['@prisma/client'],

  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;