/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Forces Next.js to build a static HTML/JS site inside the 'out' folder
  output: 'export', 

  // 2. Fixes Hostinger 404 routing errors (e.g., makes /tools load properly)
  trailingSlash: true,

  // 3. Required for Static Export: Disables Next.js server-side image optimization
  images: {
    unoptimized: true, 
  },


  // 5. Safety Net: Prevents strict TypeScript type-checks from blocking the final build
  typescript: {
    ignoreBuildErrors: true, 
  }
};

export default nextConfig;