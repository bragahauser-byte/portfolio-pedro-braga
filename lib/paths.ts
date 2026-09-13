// Must match `basePath` in next.config.mjs. GitHub Pages serves this site
// from a /portfolio-pedro-braga subpath (not the domain root), and unlike
// next/link / next/router — which apply basePath automatically — a plain
// string `src` (e.g. next/image with `unoptimized: true`, or a raw <img>)
// does NOT get it prepended for free. Anything that points at a /public
// asset by a literal path needs to go through this.
//
// TODO: drop this (and basePath in next.config.mjs) once a custom domain
// is set up and the site moves to the origin root.
export const BASE_PATH = "/portfolio-pedro-braga";

export function withBasePath(path: string): string {
  return `${BASE_PATH}${path}`;
}
