// Portfolio project data — hardcoded for now, structured so it can be
// lifted into a CMS later without changing the shape consumers rely on.
//
// To add a new project:
// 1. Drop its images in /public/images/projects/<slug>/ with descriptive
//    filenames (e.g. fachada-noturna.jpg, not an export/camera default)
// 2. Add an entry here (keep `order` ascending for display order)
// 3. /app/projetos/[slug]/page.tsx picks it up automatically via
//    generateStaticParams() — nothing else to wire up.

/**
 * How a section's photo(s) should be laid out — picked explicitly per
 * section instead of one generic gallery treating every image the same:
 * - "full-bleed": one photo, full content width.
 * - "diptico-simetrico": two photos side by side, equal width, standard gutter.
 * - "assimetrica-aberta": two photos as two separate editorial moments —
 *   the first medium-sized and left-anchored, the second lower and
 *   right-anchored, with generous whitespace between them (never a paired
 *   "gallery" look). Collapses to stacked full-width photos on mobile.
 */
export type SectionImageVariant = "full-bleed" | "diptico-simetrico" | "assimetrica-aberta";

export type SectionImages = {
  variant: SectionImageVariant;
  photos: string[];
};

export type ProjectSection = {
  title: string;
  body: string;
  /** Photo(s) shown right after this section's text, with an explicit layout. */
  images?: SectionImages;
};

export type TechSpec = {
  label: string;
  value: string;
};

/**
 * Authorship credit for a project Pedro didn't design himself (e.g. an
 * outside office's project where he only did modelagem/desenho técnico) —
 * rendered as a small, muted line under the software credit, with a link
 * on the office name. Omit entirely for Pedro's own/TFG projects.
 */
export type CreditLine = {
  authorName: string;
  authorHref: string;
};

export type BigNumber = {
  value: string;
  label: string;
};

/** One photo in `gallery`, with alt text specific to what it actually shows. */
export type GalleryImage = {
  src: string;
  alt: string;
};

export type Project = {
  /** URL slug — backs /projetos/[slug] */
  slug: string;
  /** Project name */
  title: string;
  /** One-line pitch, shown large under the title on the project page */
  subtitle: string;
  /** Short factual line (location/context), shown under the subtitle */
  shortText: string;
  /**
   * "City, State" — structured separately from `shortText` (which is
   * free-form display copy) so it can be reused as plain data, e.g. in the
   * CreativeWork JSON-LD's `locationCreated` (see lib/seo.ts).
   */
  location: string;
  /**
   * SEO meta description for this project's page (~150-160 chars,
   * Google's usual snippet cutoff). Kept separate from `shortText`, which
   * is shorter, UI display copy shown under the hero subtitle — reusing
   * it directly as the meta description undersells the page in search
   * results.
   */
  metaDescription: string;
  /** Cover photo — used as both the Home card image and the project hero */
  heroImage: string;
  /** Alt text for `heroImage`, describing what's actually pictured. */
  heroImageAlt: string;
  /** Left side of the Home card (office/author) */
  cardAuthor: string;
  /**
   * When the author is an outside office/collaborator with their own site,
   * `cardAuthor` becomes its own external link (new tab) instead of part
   * of the card's internal link to /projetos/[slug] — e.g. a partner
   * studio. Leave unset when the author is Pedro himself / a TFG, so the
   * name stays plain text inside the card's single internal link.
   */
  cardAuthorHref?: string;
  /** Right side of the Home card, gray (project name [+ year]) */
  cardLabel: string;
  /** Editorial text blocks alternating left/right down the page */
  sections: ProjectSection[];
  /** Marquee stats (e.g. area, unit count) */
  bigNumbers: BigNumber[];
  authorship: { title: string; body: string };
  /** Optional second, denser spec sheet (only some projects have one) */
  detailedSpecs?: TechSpec[];
  software: { value: string; label: string };
  /** Only set when Pedro wasn't the project's author — see CreditLine. */
  creditLine?: CreditLine;
  /** Remaining photos beyond heroImage, shown alongside `sections` */
  gallery: GalleryImage[];
  /** Display order on the Home page */
  order: number;
};

export const projects: Project[] = [
  {
    slug: "eixo-oratorio",
    title: "Multifuncional Eixo Oratório",
    subtitle:
      "Um eixo de convivência que conecta metrô, comércio e moradia a partir de uma praça central.",
    shortText: "Trabalho Final de Graduação — Parque São Lucas, zona leste de São Paulo, SP.",
    location: "São Paulo, SP",
    metaDescription:
      "Multifuncional Eixo Oratório: Trabalho Final de Graduação de Pedro Braga na zona leste de São Paulo, unindo metrô, comércio e moradia numa praça central.",
    heroImage: "/images/projects/eixo-oratorio/fachada-capa-conjunto-aereo.jpg",
    heroImageAlt:
      "Vista aérea da fachada do conjunto do Multifuncional Eixo Oratório, com as torres residenciais e comerciais junto à Estação Oratório",
    cardAuthor: "Trabalho Final de Graduação",
    cardLabel: "Multifuncional Eixo Oratório",
    sections: [
      {
        title: "O conceito",
        body: "O Eixo Oratório nasce de uma praça central que articula o fluxo de pedestres entre as avenidas Oratório e Anhaia Mello. O projeto amplia os espaços coletivos do bairro, integrando comércio, serviços e moradia em um só percurso urbano.",
        images: {
          variant: "diptico-simetrico",
          photos: [
            "/images/projects/eixo-oratorio/vista-aerea-torres-metro.jpg",
            "/images/projects/eixo-oratorio/implantacao-vista-aerea.jpg",
          ],
        },
      },
      {
        title: "A praça e o percurso",
        body: "A galeria vence o desnível entre as duas avenidas por meio de uma escadaria e rampa na fachada oeste, com bancos e árvores que transformam a circulação em uma praça verticalizada — acessível a moradores, trabalhadores e usuários da Estação Oratório.",
        // Composição assimétrica aberta: a fachada (momento urbano) e a
        // galeria interior (momento de percurso) como dois instantes
        // separados, não um díptico colado — ver referencias-visuais/2.
        images: {
          variant: "assimetrica-aberta",
          photos: [
            "/images/projects/eixo-oratorio/fachada-rua-angulo-alternativo.jpg",
            "/images/projects/eixo-oratorio/passagem-publica-terreo.jpg",
          ],
        },
      },
      {
        title: "O térreo comercial",
        body: "Catorze lojas de diferentes dimensões ocupam o térreo, entre barbearia, loja de roupas, minimercado e lanchonetes. Um bicicletário para 200 bicicletas dialoga com a ciclovia da Avenida Anhaia Mello, tornando a galeria também um ponto de parada para ciclistas.",
        images: {
          variant: "full-bleed",
          photos: ["/images/projects/eixo-oratorio/vista-aerea-metro-alternativa.jpg"],
        },
      },
      {
        title: "A fachada norte",
        body: "Vãos amplos garantem ventilação cruzada, luz natural e visibilidade entre o interior e o espaço público. O setor recebe ainda eventos temporários, como feiras e atividades comunitárias, reforçando o caráter aberto do projeto.",
        // Era um "díptico" com praca-acesso-paisagismo.jpg + fachadas-comparativo.jpg,
        // mas fachadas-comparativo.jpg já É um comparativo de 2 fachadas
        // composto em um único arquivo (confirmado no arquivo original) —
        // colocá-lo dentro de uma metade de díptico espremia as duas fotos
        // internas sem seguir o grid/gutter do site. Correto é full-bleed
        // com essa imagem sozinha; praca-acesso-paisagismo.jpg foi realocada
        // para "O contexto urbano" abaixo.
        images: {
          variant: "full-bleed",
          photos: ["/images/projects/eixo-oratorio/fachadas-comparativo.jpg"],
        },
      },
      {
        title: "Os usos do edifício",
        body: "Além do térreo comercial, o multifuncional reúne escritórios, coworking, auditório, espaços expositivos e ambientes multiuso. No primeiro pavimento, uma academia e uma livraria ancoram áreas flexíveis para exposições e apresentações artísticas.",
        images: {
          variant: "full-bleed",
          photos: ["/images/projects/eixo-oratorio/vista-aerea-torres-contexto.jpg"],
        },
      },
      {
        title: "O contexto urbano",
        body: "Inserido em um entorno predominantemente residencial e com baixa diversidade comercial, o projeto propõe maior ênfase em comércio e serviços, consolidando-se como um polo de atividades para a região.",
        images: {
          variant: "diptico-simetrico",
          photos: [
            "/images/projects/eixo-oratorio/cobertura-vista-aerea.jpg",
            "/images/projects/eixo-oratorio/praca-acesso-paisagismo.jpg",
          ],
        },
      },
    ],
    bigNumbers: [
      { value: "136", label: "Apartamentos" },
      { value: "28.995m²", label: "Área construída" },
      { value: "110", label: "Salas comerciais" },
      { value: "16", label: "Lojas comerciais" },
    ],
    authorship: {
      title: "Arquitetura e Urbanismo — Pedro Braga",
      body: "Trabalho Final de Graduação orientado por Braz Casagrande, apresentado na FIAM-FAAM Centro Universitário.",
    },
    detailedSpecs: [
      { label: "Local", value: "São Paulo, SP" },
      { label: "Uso", value: "Misto" },
      { label: "Área do terreno", value: "7.406,84 m²" },
      { label: "CA (Coeficiente de Aproveitamento)", value: "3,91 (28.995,04 m²)" },
      { label: "TO (Taxa de Ocupação)", value: "0,67" },
      {
        label: "Composição",
        value:
          "136 apartamentos, estacionamento residencial, 110 salas comerciais, coworking, auditório para 102 lugares, 16 lojas comerciais, banheiros públicos, bicicletário e área de lazer",
      },
    ],
    software: { value: "SketchUp + AutoCAD", label: "Modelagem e desenho técnico" },
    // Every photo above is already placed via `sections[].images` — this
    // array is just the technical drawings (plantas/cortes/elevações),
    // trailing after the stats/specs blocks. Ordered by display sequence
    // (checked against the actual files, not the filenames): Térreo(1) →
    // Subsolo(2) → 1º Pav.(3) → 2º Pav.(4) → Pavimento Tipo(5) →
    // Pavimento Tipo Resid.(7, its typology legend has no number of its
    // own but reads right after it) → Coberturas(6 — last planta, shown
    // here rather than in strict sheet-number order so it lands right
    // before the cortes start) → Corte A(8) → Corte B(9) → Elevação
    // Norte(10) → Sul(11) → Leste(12) → Oeste(13).
    gallery: [
      {
        src: "/images/projects/eixo-oratorio/planta-terreo-comercial.jpg",
        alt: "Planta do térreo comercial — Multifuncional Eixo Oratório",
      },
      {
        src: "/images/projects/eixo-oratorio/planta-subsolo-estacionamento.jpg",
        alt: "Planta do subsolo com estacionamento — Multifuncional Eixo Oratório",
      },
      {
        src: "/images/projects/eixo-oratorio/planta-primeiro-pavimento.jpg",
        alt: "Planta do primeiro pavimento — Multifuncional Eixo Oratório",
      },
      {
        src: "/images/projects/eixo-oratorio/planta-segundo-pavimento.jpg",
        alt: "Planta do segundo pavimento — Multifuncional Eixo Oratório",
      },
      {
        src: "/images/projects/eixo-oratorio/planta-pavimento-tipo.jpg",
        alt: "Planta do pavimento tipo — Multifuncional Eixo Oratório",
      },
      {
        src: "/images/projects/eixo-oratorio/planta-pavimento-tipo-residencial.jpg",
        alt: "Planta do pavimento tipo residencial — Multifuncional Eixo Oratório",
      },
      {
        src: "/images/projects/eixo-oratorio/legenda-tipologias-apartamento.jpg",
        alt: "Legenda das tipologias de apartamento — Multifuncional Eixo Oratório",
      },
      {
        src: "/images/projects/eixo-oratorio/planta-coberturas.jpg",
        alt: "Planta de coberturas — Multifuncional Eixo Oratório",
      },
      {
        src: "/images/projects/eixo-oratorio/corte-a-tecnico.jpg",
        alt: "Corte técnico A — Multifuncional Eixo Oratório",
      },
      {
        src: "/images/projects/eixo-oratorio/corte-b-tecnico.jpg",
        alt: "Corte técnico B — Multifuncional Eixo Oratório",
      },
      {
        src: "/images/projects/eixo-oratorio/elevacao-norte.jpg",
        alt: "Elevação norte — Multifuncional Eixo Oratório",
      },
      {
        src: "/images/projects/eixo-oratorio/elevacao-sul.png",
        alt: "Elevação sul — Multifuncional Eixo Oratório",
      },
      {
        src: "/images/projects/eixo-oratorio/elevacao-leste.jpg",
        alt: "Elevação leste — Multifuncional Eixo Oratório",
      },
      {
        src: "/images/projects/eixo-oratorio/elevacao-oeste.jpg",
        alt: "Elevação oeste — Multifuncional Eixo Oratório",
      },
    ],
    order: 1,
  },
  {
    slug: "area-gourmet-gj",
    title: "Área Gourmet G&J",
    subtitle: "De quintal ocioso a espaço de convívio, descanso e encontro.",
    shortText: "Reforma residencial em Borda da Mata, MG, com cozinha, estar e lazer integrados.",
    location: "Borda da Mata, MG",
    metaDescription:
      "Área Gourmet G&J: reforma residencial de 106m² em Borda da Mata, MG, projetada por Pedro Braga, integrando cozinha, estar e lazer em um espaço acolhedor.",
    heroImage: "/images/projects/area-gourmet-gj/varanda-gourmet-noturna.jpg",
    heroImageAlt: "Varanda gourmet iluminada à noite, com estrutura metálica e área de estar — Área Gourmet G&J",
    cardAuthor: "Nathalia Trota Arquitetura",
    cardAuthorHref: "https://www.nathaliatrottaarquiteta.com.br/",
    cardLabel: "Área Gourmet G&J — 2026",
    sections: [
      {
        title: "O conceito",
        body: "O projeto surgiu da proposta de transformar um quintal pouco utilizado em uma área gourmet voltada ao convívio entre amigos e familiares. A intervenção buscou criar um ambiente confortável e acolhedor, integrando cozinha, estar e lazer em um mesmo espaço, pensado para receber sem perder a sensação de casa.",
        // Díptico simétrico clássico — confirmado contra referencias-visuais/1.
        images: {
          variant: "diptico-simetrico",
          photos: [
            "/images/projects/area-gourmet-gj/cozinha-sala-de-jogos.jpg",
            "/images/projects/area-gourmet-gj/cozinha-ilha-detalhe.jpg",
          ],
        },
      },
      {
        title: "Os materiais",
        body: "A linguagem contemporânea incorpora referências industriais por meio das estruturas metálicas, esquadrias e elementos em preto, equilibradas pela presença da madeira, da vegetação e de uma iluminação predominantemente quente. O paisagismo participa dos ambientes e contribui para tornar o conjunto mais leve e convidativo — mais do que uma nova função para o quintal, um espaço de permanência.",
        // Era um "díptico" com a mesma foto (ângulos ligeiramente
        // diferentes) repetida nas duas colunas — mantém só uma ocorrência,
        // full-bleed, em vez do par.
        images: {
          variant: "full-bleed",
          photos: ["/images/projects/area-gourmet-gj/lounge-spa-fogueira.jpg"],
        },
      },
    ],
    bigNumbers: [
      { value: "3", label: "Ambientes integrados" },
      { value: "106m²", label: "Área reformada" },
      { value: "2026", label: "Ano do projeto" },
    ],
    authorship: {
      title: "Arquitetura e Design de Interiores — Pedro Braga",
      body: "Responsável por todas as etapas do projeto, da concepção à escolha de materiais, buscando equilibrar linguagem industrial e acolhimento no mesmo espaço.",
    },
    software: { value: "SketchUp + AutoCAD", label: "Modelagem e desenho técnico" },
    creditLine: {
      authorName: "Nathalia Trota Arquitetura",
      authorHref: "https://www.nathaliatrottaarquiteta.com.br/",
    },
    // Every photo above is already placed via `sections[].images` — this
    // array is just the technical drawings, trailing after stats/specs.
    // Corte A was missing entirely (only Corte B had been added) — added
    // here, before Corte B, per the site-wide rule that Corte A always
    // precedes Corte B. planta-coberturas.jpg used to be here too, but it
    // actually belongs to Multifuncional Eixo Oratório (wrong project) —
    // moved there.
    gallery: [
      {
        src: "/images/projects/area-gourmet-gj/estudo-croqui-tecnico.jpg",
        alt: "Estudo em croqui técnico — Área Gourmet G&J",
      },
      {
        src: "/images/projects/area-gourmet-gj/planta-baixa.jpg",
        alt: "Planta baixa — Área Gourmet G&J",
      },
      {
        src: "/images/projects/area-gourmet-gj/corte-a-tecnico.png",
        alt: "Corte técnico A — Área Gourmet G&J",
      },
      {
        src: "/images/projects/area-gourmet-gj/corte-b-tecnico.jpg",
        alt: "Corte técnico B — Área Gourmet G&J",
      },
    ],
    order: 2,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
