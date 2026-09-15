// Must match `basePath` in next.config.mjs. The site now runs at the root of
// the custom domain https://phbraga.com.br, so there is no prefix to add and
// this is the empty string. It is kept (rather than deleted along with every
// call site) so a future move back to a subpath stays a one-line change:
// unlike next/link / next/router — which apply basePath automatically — a
// plain string `src` (e.g. next/image with `unoptimized: true`, or a raw
// <img>) does NOT get it prepended for free.
export const BASE_PATH = "";

export function withBasePath(path: string): string {
  return `${BASE_PATH}${path}`;
}

/**
 * Strips the trailing slash `usePathname()` returns under this site's
 * `trailingSlash: true` (next.config.mjs) — e.g. "/sobre-mim/", not
 * "/sobre-mim" — so exact route comparisons (active nav state, page
 * transition direction) don't silently fail. Leaves "/" itself alone.
 */
export function normalizePathname(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}
