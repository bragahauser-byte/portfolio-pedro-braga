/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for GitHub Pages — no Node server involved.
  output: "export",
  // The site is served from https://bragahauser-byte.github.io/portfolio-pedro-braga/
  // (a subpath, not the domain root), so every internal link/asset needs this prefix.
  // Drop this (and the matching SITE_URL in lib/seo.ts) once a custom domain is set up.
  basePath: "/portfolio-pedro-braga",
  images: {
    // GitHub Pages can't run Next's on-demand image optimization server —
    // ship the source files as-is instead.
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
