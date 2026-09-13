// Portfolio project data — hardcoded for now, structured so it can be
// lifted into a CMS later without changing the shape consumers rely on.
//
// To add a new project:
// 1. Drop its images in /public/images/projects/<slug>/ with descriptive
//    filenames (e.g. fachada-noturna.jpg, not an export/camera default)
// 2. Add an entry here (keep `order` ascending for display order)
// 3. /app/projetos/[slug]/page.tsx picks it up automatically via
//    generateStaticParams() — nothing else to wire up.

export type ProjectSection = {
  title: string;
  body: string;
};

export type TechSpec = {
  label: string;
  value: string;
};

export type BigNumber = {
  value: string;
  label: string;
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
  /** Cover photo — used as both the Home card image and the project hero */
  heroImage: string;
  /** Left side of the Home card (office/author) */
  cardAuthor: string;
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
  /** Remaining photos beyond heroImage, shown alongside `sections` */
  gallery: string[];
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
    heroImage: "/images/projects/eixo-oratorio/fachada-rua-diurna.jpg",
    cardAuthor: "Trabalho Final de Graduação",
    cardLabel: "Multifuncional Eixo Oratório",
    sections: [
      {
        title: "O conceito",
        body: "O Eixo Oratório nasce de uma praça central que articula o fluxo de pedestres entre as avenidas Oratório e Anhaia Mello. O projeto amplia os espaços coletivos do bairro, integrando comércio, serviços e moradia em um só percurso urbano.",
      },
      {
        title: "A praça e o percurso",
        body: "A galeria vence o desnível entre as duas avenidas por meio de uma escadaria e rampa na fachada oeste, com bancos e árvores que transformam a circulação em uma praça verticalizada — acessível a moradores, trabalhadores e usuários da Estação Oratório.",
      },
      {
        title: "O térreo comercial",
        body: "Catorze lojas de diferentes dimensões ocupam o térreo, entre barbearia, loja de roupas, minimercado e lanchonetes. Um bicicletário para 200 bicicletas dialoga com a ciclovia da Avenida Anhaia Mello, tornando a galeria também um ponto de parada para ciclistas.",
      },
      {
        title: "A fachada norte",
        body: "Vãos amplos garantem ventilação cruzada, luz natural e visibilidade entre o interior e o espaço público. O setor recebe ainda eventos temporários, como feiras e atividades comunitárias, reforçando o caráter aberto do projeto.",
      },
      {
        title: "Os usos do edifício",
        body: "Além do térreo comercial, o multifuncional reúne escritórios, auditório, espaços expositivos e ambientes multiuso. No primeiro pavimento, uma academia e uma livraria ancoram áreas flexíveis para exposições e apresentações artísticas.",
      },
      {
        title: "O contexto urbano",
        body: "Inserido em um entorno predominantemente residencial e com baixa diversidade comercial, o projeto propõe maior ênfase em comércio e serviços, consolidando-se como um polo de atividades para a região.",
      },
    ],
    bigNumbers: [
      { value: "136", label: "Apartamentos" },
      { value: "28.995m²", label: "Área construída" },
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
      { label: "CA", value: "3,91 (28.995,04 m²)" },
      { label: "TO", value: "0,67" },
      {
        label: "Composição",
        value:
          "136 apartamentos, estacionamento residencial, 110 salas comerciais, coworking, auditório para 102 lugares, 16 lojas comerciais, banheiros públicos, bicicletário e área de lazer",
      },
    ],
    software: { value: "SketchUp + AutoCAD", label: "Modelagem e desenho técnico" },
    gallery: [
      "/images/projects/eixo-oratorio/vista-aerea-torres-metro.jpg",
      "/images/projects/eixo-oratorio/implantacao-vista-aerea.jpg",
      "/images/projects/eixo-oratorio/galeria-expositiva-interior.jpg",
      "/images/projects/eixo-oratorio/passagem-publica-terreo.jpg",
      "/images/projects/eixo-oratorio/fachada-rua-angulo-alternativo.jpg",
    ],
    order: 1,
  },
  {
    slug: "area-gourmet-gj",
    title: "Área Gourmet G&J",
    subtitle: "De quintal ocioso a espaço de convívio, descanso e encontro.",
    shortText: "Reforma residencial em Borda da Mata, MG, com cozinha, estar e lazer integrados.",
    heroImage: "/images/projects/area-gourmet-gj/varanda-gourmet-noturna.jpg",
    cardAuthor: "Nathalia Trota Arquitetura",
    cardLabel: "Área Gourmet G&J — 2026",
    sections: [
      {
        title: "O conceito",
        body: "O projeto surgiu da proposta de transformar um quintal pouco utilizado em uma área gourmet voltada ao convívio entre amigos e familiares. A intervenção buscou criar um ambiente confortável e acolhedor, integrando cozinha, estar e lazer em um mesmo espaço, pensado para receber sem perder a sensação de casa.",
      },
      {
        title: "Os materiais",
        body: "A linguagem contemporânea incorpora referências industriais por meio das estruturas metálicas, esquadrias e elementos em preto, equilibradas pela presença da madeira, da vegetação e de uma iluminação predominantemente quente. O paisagismo participa dos ambientes e contribui para tornar o conjunto mais leve e convidativo — mais do que uma nova função para o quintal, um espaço de permanência.",
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
    gallery: [
      "/images/projects/area-gourmet-gj/cozinha-sala-de-jogos.jpg",
      "/images/projects/area-gourmet-gj/cozinha-ilha-detalhe.jpg",
      "/images/projects/area-gourmet-gj/spa-pergolado-noturno.jpg",
      "/images/projects/area-gourmet-gj/estudo-croqui-tecnico.jpg",
    ],
    order: 2,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
