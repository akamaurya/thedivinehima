import type { NextConfig } from 'next';

// thedivinehima.com serves from the root. BASE_PATH is set only by the GitHub Pages
// preview build (/thedivinehima). trailingSlash matches the live WordPress URLs
// (/contact-us/) and exports each route as <route>/index.html.
const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.BASE_PATH,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
