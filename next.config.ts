import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Static export for Hostinger: `next build` emits plain HTML/CSS/JS in out/ */
  output: "export",
  /* Folder-style URLs (/projects/aavilo/index.html) so Apache serves them directly */
  trailingSlash: true,
  images: {
    /* No image-optimization server on static hosting */
    unoptimized: true,
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
