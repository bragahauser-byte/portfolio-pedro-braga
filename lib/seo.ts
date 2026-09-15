import type { Metadata } from "next";

// Production origin. Served from the root of this custom domain via GitHub
// Pages (see /public/CNAME), so it carries no path component — canonical/OG/
// sitemap URLs are just this plus the route.
export const SITE_URL = "https://phbraga.com.br";

export const SITE_NAME = "Pedro Braga";

export const DEFAULT_TITLE = "Pedro Braga | Arquiteto e Urbanista — São Paulo, SP";

export const DEFAULT_DESCRIPTION =
  "Portfólio de Pedro Henrique Braga da Silva (Pedro Braga), arquiteto e urbanista formado pela FMU – FIAM FAAM, com projetos em São Paulo, SP e no sul de Minas Gerais (Pouso Alegre, Borda da Mata, Tocos do Moji, Monte Sião).";

/**
 * Builds page metadata on top of the site defaults. Pages call this from
 * their own `generateMetadata` so title/description/OG stay consistent,
 * while still being overridable per route (e.g. future /projetos/[slug]).
 */
export function buildMetadata({
  title,
  description,
  path = "/",
}: {
  title?: string;
  description?: string;
  path?: string;
} = {}): Metadata {
  const resolvedTitle = title ?? DEFAULT_TITLE;
  const resolvedDescription = description ?? DEFAULT_DESCRIPTION;
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url,
      siteName: SITE_NAME,
      locale: "pt_BR",
      type: "website",
      // Static asset, not a build-time-generated route: `next/og`'s
      // ImageResponse (used for a `opengraph-image.tsx` route) hits an
      // upstream Windows bug under `output: "export"` (crashes the whole
      // build via `fileURLToPath` inside Next's bundled @vercel/og). This
      // PNG was rendered once with the same design via standalone
      // satori + @resvg/resvg-js and committed as a plain static file.
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [`${SITE_URL}/og-image.png`],
    },
  };
}

/** schema.org/Person JSON-LD — injected once on the root layout. */
export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Pedro Henrique Braga da Silva",
  alternateName: "Pedro Braga",
  jobTitle: "Arquiteto e Urbanista",
  url: SITE_URL,
  worksFor: {
    "@type": "Organization",
    name: "Nathalia Trota Arquitetura e Interiores",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Centro Universitário FMU | FIAM-FAAM",
  },
  knowsAbout: [
    "AutoCAD",
    "SketchUp",
    "Revit",
    "Arquitetura Residencial",
    "Arquitetura Comercial",
    "Design de Interiores",
  ],
  areaServed: [
    "São Paulo, SP",
    "Pouso Alegre, MG",
    "Borda da Mata, MG",
    "Tocos do Moji, MG",
    "Monte Sião, MG",
  ],
  // TODO: fill in once the real LinkedIn/Instagram URLs are provided.
  sameAs: [] as string[],
};
