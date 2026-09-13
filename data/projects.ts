// Portfolio project data — hardcoded for now, structured so it can be
// lifted into a CMS later without changing the shape consumers rely on.
//
// To add a new project:
// 1. Drop its images in /public/images/projects/<slug>/
// 2. Add an entry here (keep `order` ascending for display order)
// 3. (later) create /app/projetos/[slug]/page.tsx — it will reuse the
//    same Header/Footer/Grid/PageTransition already wired in the root layout.

export type Project = {
  /** URL slug — will back /projetos/[slug] once project pages exist */
  slug: string;
  /** Office or author credited for the project */
  author: string;
  /** Project name */
  title: string;
  /** Year of the project — optional (e.g. academic work without a fixed year) */
  year?: string;
  /** Cover image shown on the Home list, relative to /public */
  coverImage: string;
  /** Full image gallery for the future project detail page */
  gallery: string[];
  /** Display order on the Home page */
  order: number;
};

export const projects: Project[] = [
  {
    slug: "multifuncional-eixo-oratorio",
    author: "Trabalho Final de Graduação",
    title: "Multifuncional Eixo Oratório",
    coverImage: "/images/projects/multifuncional-eixo-oratorio/01-cover-fachada-rua.jpg",
    gallery: [
      "/images/projects/multifuncional-eixo-oratorio/01-cover-fachada-rua.jpg",
      "/images/projects/multifuncional-eixo-oratorio/02-aerea-torres-metro.jpg",
      "/images/projects/multifuncional-eixo-oratorio/03-implantacao-aerea.jpg",
      "/images/projects/multifuncional-eixo-oratorio/04-galeria-expositiva.jpg",
      "/images/projects/multifuncional-eixo-oratorio/05-passagem-publica.jpg",
      "/images/projects/multifuncional-eixo-oratorio/06-fachada-rua-alt.jpg",
    ],
    order: 1,
  },
  {
    slug: "area-gourmet-gj",
    author: "Nathalia Trota Arquitetura",
    title: "Área Gourmet G&J",
    year: "2026",
    coverImage: "/images/projects/area-gourmet-gj/01-cover-varanda-gourmet.jpg",
    gallery: [
      "/images/projects/area-gourmet-gj/01-cover-varanda-gourmet.jpg",
      "/images/projects/area-gourmet-gj/02-cozinha-sala-jogos.jpg",
      "/images/projects/area-gourmet-gj/03-cozinha-detalhe.jpg",
      "/images/projects/area-gourmet-gj/04-spa-pergolado.jpg",
      "/images/projects/area-gourmet-gj/05-estudo-croqui.jpg",
    ],
    order: 2,
  },
];
