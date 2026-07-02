import type { NextConfig } from 'next';

// Served from the custom domain root (new.thedivinehima.com via GitHub Pages),
// so no basePath. See public/CNAME.
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
