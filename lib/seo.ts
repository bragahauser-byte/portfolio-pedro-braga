import type { Metadata } from "next";
import type { Project } from "@/data/projects";

export const SITE_URL = "https://phbraga.com.br";

export const SITE_NAME = "Pedro Braga";

export const DEFAULT_TITLE = "Pedro Braga | Arquiteto e Urbanista — São Paulo, SP";

export const DEFAULT_DESCRIPTION =
  "Portfólio de Pedro Braga, arquiteto e urbanista formado pela FMU–FIAM FAAM, com projetos residenciais e multifuncionais em São Paulo e no sul de Minas Gerais.";

const DEFAULT_IMAGE = { src: "/og-image.png", alt: "Pedro Braga — Arquiteto e Urbanista", width: 1200, height: 630 };

/**
 * Metadata compartilhada (title, description, canonical, Open Graph,
 * Twitter). Páginas de projeto passam a capa como imagem OG.
 */
export function buildMetadata({
  title,
  description,
  path = "/",
  image,
  type = "website",
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: { src: string; alt: string };
  type?: "website" | "article";
} = {}): Metadata {
  const resolvedTitle = title ?? DEFAULT_TITLE;
  const resolvedDescription = description ?? DEFAULT_DESCRIPTION;
  // trailingSlash: true no next.config — a URL canônica segue o mesmo formato.
  const url = path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}/`;
  const ogImage = image
    ? { url: `${SITE_URL}${image.src}`, alt: image.alt }
    : { url: `${SITE_URL}${DEFAULT_IMAGE.src}`, alt: DEFAULT_IMAGE.alt, width: DEFAULT_IMAGE.width, height: DEFAULT_IMAGE.height };

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
      type,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [ogImage.url],
    },
  };
}

/** schema.org/Person — na Home, descreve quem o site apresenta. */
export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Pedro Henrique Braga da Silva",
  alternateName: "Pedro Braga",
  jobTitle: "Arquiteto e Urbanista",
  url: SITE_URL,
  image: `${SITE_URL}/og-image.png`,
  email: "mailto:phbraga93@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "São Paulo",
    addressRegion: "SP",
    addressCountry: "BR",
  },
  worksFor: {
    "@type": "Organization",
    name: "Nathalia Trotta Arquitetura e Interiores",
    url: "https://www.nathaliatrottaarquiteta.com.br/",
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
  sameAs: ["https://www.linkedin.com/in/pedro-braga10/", "https://www.instagram.com/ph_braga10/"],
};

/** schema.org/CreativeWork — um por página de projeto. */
export function projectJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.metaDescription,
    url: `${SITE_URL}/projetos/${project.slug}/`,
    image: `${SITE_URL}${project.hero.src}`,
    // Projeto de escritório parceiro: o escritório é o autor e o Pedro
    // contribui com modelagem e desenho técnico.
    ...(project.credits.office
      ? {
          creator: { "@type": "Organization", name: project.credits.office.name, url: project.credits.office.href },
          contributor: { "@type": "Person", name: "Pedro Braga", url: SITE_URL },
        }
      : { creator: { "@type": "Person", name: "Pedro Braga", url: SITE_URL } }),
    about: "Arquitetura e Urbanismo",
    locationCreated: {
      "@type": "Place",
      name: project.location,
    },
  };
}
