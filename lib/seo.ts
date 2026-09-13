import type { Metadata } from "next";

// TODO: swap for the real production domain once it's registered/deployed.
export const SITE_URL = "https://pedrobraga.com.br";

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
  const url = new URL(path, SITE_URL).toString();

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
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
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
