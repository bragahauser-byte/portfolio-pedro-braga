import type { Metadata } from "next";
import type { Project } from "@/data/projects";

// Production origin. Served from the root of this custom domain via GitHub
// Pages (see /public/CNAME), so it carries no path component — canonical/OG/
// sitemap URLs are just this plus the route.
export const SITE_URL = "https://phbraga.com.br";

export const SITE_NAME = "Pedro Braga";

export const DEFAULT_TITLE = "Pedro Braga | Arquiteto e Urbanista — São Paulo, SP";

// Kept to 150-160 chars (Google's usual snippet cutoff) — see also each
// page's own generateMetadata for a description grounded in that page's
// actual content instead of falling back to this one.
export const DEFAULT_DESCRIPTION =
  "Portfólio de Pedro Braga, arquiteto e urbanista formado pela FMU–FIAM FAAM, com projetos residenciais e multifuncionais em São Paulo e no sul de Minas Gerais.";

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

/**
 * schema.org/Person JSON-LD — injected on the home page only (the entity
 * this whole site is about), not site-wide, per standard practice of
 * keeping the "who this site represents" schema on the primary page.
 */
export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Pedro Henrique Braga da Silva",
  alternateName: "Pedro Braga",
  jobTitle: "Arquiteto e Urbanista",
  url: SITE_URL,
  image: `${SITE_URL}/og-image.png`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "São Paulo",
    addressRegion: "SP",
    addressCountry: "BR",
  },
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
  // TODO: fill in once the real LinkedIn/Instagram URLs are provided —
  // see the summary at the end of this change for what's needed.
  sameAs: [] as string[],
};

/**
 * schema.org/CreativeWork JSON-LD for a single portfolio project —
 * injected on each /projetos/[slug] page. CreativeWork fits an
 * architecture project better than ImageObject (the page documents a
 * designed work, not a standalone photo) and links back to the Person
 * schema via `creator`/`author` so Google can associate the work with
 * Pedro Braga specifically, not just the site as a whole.
 */
export function projectJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.metaDescription,
    url: `${SITE_URL}/projetos/${project.slug}`,
    image: `${SITE_URL}${project.heroImage}`,
    creator: {
      "@type": "Person",
      name: "Pedro Braga",
      url: SITE_URL,
    },
    about: "Arquitetura e Urbanismo",
    locationCreated: {
      "@type": "Place",
      name: project.location,
    },
  };
}
