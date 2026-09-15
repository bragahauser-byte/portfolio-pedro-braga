/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for GitHub Pages — no Node server involved.
  output: "export",
  // No basePath/assetPrefix: the site is served from the root of the custom
  // domain https://phbraga.com.br (see /public/CNAME), not from the old
  // /portfolio-pedro-braga GitHub Pages subpath.
  images: {
    // GitHub Pages can't run Next's on-demand image optimization server —
    // ship the source files as-is instead.
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
