// Portfolio project data — hardcoded for now, structured so it can be
// lifted into a CMS later without changing the shape consumers rely on.
//
// To add a new project:
// 1. Drop its images in /public/images/projects/<slug>/ with descriptive
//    filenames (e.g. fachada-noturna.jpg, not an export/camera default)
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
    coverImage: "/images/projects/multifuncional-eixo-oratorio/fachada-rua-diurna.jpg",
    gallery: [
      "/images/projects/multifuncional-eixo-oratorio/fachada-rua-diurna.jpg",
      "/images/projects/multifuncional-eixo-oratorio/vista-aerea-torres-metro.jpg",
      "/images/projects/multifuncional-eixo-oratorio/implantacao-vista-aerea.jpg",
      "/images/projects/multifuncional-eixo-oratorio/galeria-expositiva-interior.jpg",
      "/images/projects/multifuncional-eixo-oratorio/passagem-publica-terreo.jpg",
      "/images/projects/multifuncional-eixo-oratorio/fachada-rua-angulo-alternativo.jpg",
    ],
    order: 1,
  },
  {
    slug: "area-gourmet-gj",
    author: "Nathalia Trota Arquitetura",
    title: "Área Gourmet G&J",
    year: "2026",
    coverImage: "/images/projects/area-gourmet-gj/varanda-gourmet-noturna.jpg",
    gallery: [
      "/images/projects/area-gourmet-gj/varanda-gourmet-noturna.jpg",
      "/images/projects/area-gourmet-gj/cozinha-sala-de-jogos.jpg",
      "/images/projects/area-gourmet-gj/cozinha-ilha-detalhe.jpg",
      "/images/projects/area-gourmet-gj/spa-pergolado-noturno.jpg",
      "/images/projects/area-gourmet-gj/estudo-croqui-tecnico.jpg",
    ],
    order: 2,
  },
];
