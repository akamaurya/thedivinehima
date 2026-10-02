import type { NextConfig } from 'next';

// Served from the domain root, so no basePath. trailingSlash matches the live
// WordPress URLs (/contact-us/) and exports each route as <route>/index.html.
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
