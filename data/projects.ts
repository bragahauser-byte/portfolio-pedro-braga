// Dados dos projetos — tudo que aparece em /projetos/[slug] e na Home sai
// daqui, então um projeto novo entra só editando este arquivo:
// 1. Coloque as imagens em /public/images/projects/<slug>/ com nomes
//    descritivos (ex.: fachada-noturna.jpg) e rode `npm run images` para
//    gerar as versões responsivas + data/image-manifest.json.
// 2. Adicione uma entrada abaixo (`order` crescente = ordem na Home).
// 3. /app/projetos/[slug]/page.tsx gera a página via generateStaticParams().
//
// Regra de conteúdo: textos, números e créditos são do Pedro — diagramar
// à vontade, reescrever nunca.

/**
 * Como as imagens de uma seção se compõem no grid de 12 colunas:
 * - "full": largura total, proporção natural da imagem (nunca corta).
 * - "panorama": largura total, recorte 21:9 (só para fotos/renders).
 * - "pair": duas imagens lado a lado, 3:2, colunas 1–6 e 7–12.
 * - "offset-left": horizontal nas colunas 1–8, proporção natural.
 * - "offset-right": vertical 3:4 nas colunas 7–12 (recorte com `focal`).
 * No mobile tudo vira uma coluna, de borda a borda.
 */
export type ImageLayout = "full" | "pair" | "offset-left" | "offset-right" | "panorama";

export type ProjectImage = {
  src: string;
  /** Alt descritivo em pt-BR — o que a imagem realmente mostra. */
  alt: string;
  /** object-position para recortes (ex.: "40% 50%"). Padrão: centro. */
  focal?: string;
};

export type SectionMedia = {
  layout: ImageLayout;
  images: ProjectImage[];
};

export type ProjectSection = {
  title: string;
  body: string;
  /** Composições mostradas depois do texto, na ordem. */
  media?: SectionMedia[];
};

export type ProjectNumber = {
  value: number;
  /** Unidade em sobrescrito, ex.: "m²". */
  unit?: string;
  label: string;
  /** Count-up ao entrar na tela. Anos ficam estáticos. */
  animate: boolean;
  /** Sem separador de milhar (anos: 2026, não 2.026). */
  plain?: boolean;
};

export type Spec = {
  label: string;
  value: string;
};

/** Desenho técnico (planta, corte, elevação, croqui) — sempre object-contain. */
export type Drawing = {
  src: string;
  alt: string;
  /** Legenda curta mostrada sob o desenho. */
  caption: string;
};

export type Credits = {
  /**
   * Autoria quando o projeto é do Pedro (ex.: TFG). Mostrado na ficha
   * técnica como "Autoria".
   */
  authorship?: { title: string; body: string };
  /**
   * Escritório autor quando o Pedro fez só modelagem/desenho técnico.
   * Vira a linha "Projeto de autoria de <office>. Modelagem e desenho
   * técnico por Pedro Braga." e substitui `authorship`.
   */
  office?: { name: string; href: string };
};

export type Project = {
  /** Slug da URL — /projetos/[slug] */
  slug: string;
  title: string;
  /** Frase de abertura, em lead sob o título. */
  subtitle: string;
  /** Linha factual curta, em cinza, sob a frase de abertura. */
  shortText: string;
  /** "Cidade, UF" — também usado no JSON-LD (lib/seo.ts). */
  location: string;
  /** Meta description da página (~150–160 caracteres). */
  metaDescription: string;
  /** Capa: card da Home, primeira imagem da abertura e imagem OG. */
  hero: ProjectImage;
  /** Demais imagens fortes empilhadas na abertura, depois da capa. */
  opening: ProjectImage[];
  sections: ProjectSection[];
  numbers: ProjectNumber[];
  /** Ficha técnica — só o que existe; linhas sem dado não entram. */
  specs: Spec[];
  software: { value: string; label: string };
  credits: Credits;
  drawings: Drawing[];
  /** Lado esquerdo da legenda do card (autor/escritório ou contexto). */
  cardAuthor: string;
  /** Quando o autor tem site próprio, o nome vira link externo. */
  cardAuthorHref?: string;
  /** Lado direito da legenda do card, em cinza. */
  cardLabel: string;
  /** Ordem na Home. */
  order: number;
};

const EIXO = "/images/projects/eixo-oratorio";
const GJ = "/images/projects/area-gourmet-gj";

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
    // TODO: ano do TFG não consta nos dados — confirmar com o Pedro.
    hero: {
      src: `${EIXO}/fachada-capa-conjunto-aereo.jpg`,
      alt: "Vista aérea da fachada do conjunto do Multifuncional Eixo Oratório, com as torres residenciais e comerciais junto à Estação Oratório",
    },
    // TODO: implantacao-vista-aerea.jpg é idêntico byte a byte à capa
    // (fachada-capa-conjunto-aereo.jpg) — fica fora da diagramação para não
    // repetir a mesma imagem. O arquivo continua na pasta.
    opening: [
      {
        src: `${EIXO}/vista-aerea-torres-metro.jpg`,
        alt: "Vista frontal das duas torres a partir da avenida, com o embasamento comercial e o acesso marcado em verde",
      },
      {
        src: `${EIXO}/fachada-rua-diurna.jpg`,
        alt: "Vista diurna da escadaria e das rampas ajardinadas que vencem o desnível entre a avenida e a galeria",
      },
    ],
    sections: [
      {
        title: "O conceito",
        body: "O Eixo Oratório nasce de uma praça central que articula o fluxo de pedestres entre as avenidas Oratório e Anhaia Mello. O projeto amplia os espaços coletivos do bairro, integrando comércio, serviços e moradia em um só percurso urbano.",
        media: [
          {
            layout: "panorama",
            images: [
              {
                src: `${EIXO}/cobertura-vista-aerea.jpg`,
                alt: "Vista aérea vertical do conjunto, com as coberturas ajardinadas, o entorno de casas e a via elevada da estação",
                focal: "50% 45%",
              },
            ],
          },
        ],
      },
      {
        title: "A praça e o percurso",
        body: "A galeria vence o desnível entre as duas avenidas por meio de uma escadaria e rampa na fachada oeste, com bancos e árvores que transformam a circulação em uma praça verticalizada — acessível a moradores, trabalhadores e usuários da Estação Oratório.",
        media: [
          {
            layout: "offset-left",
            images: [
              {
                src: `${EIXO}/praca-acesso-paisagismo.jpg`,
                alt: "Praça de acesso com escadaria, rampas e canteiros ajardinados junto à base do edifício",
              },
            ],
          },
          {
            layout: "offset-right",
            images: [
              {
                src: `${EIXO}/fachada-rua-angulo-alternativo.jpg`,
                alt: "Galeria coberta do térreo com pessoas circulando entre árvores e bancos, e a escada verde de acesso ao fundo",
                focal: "38% 50%",
              },
            ],
          },
        ],
      },
      {
        // TODO: o texto diz "Catorze lojas", mas Números do projeto e a
        // Composição dizem 16 lojas comerciais — aguardando o Pedro
        // confirmar o número. Nada foi alterado.
        title: "O térreo comercial",
        body: "Catorze lojas de diferentes dimensões ocupam o térreo, entre barbearia, loja de roupas, minimercado e lanchonetes. Um bicicletário para 200 bicicletas dialoga com a ciclovia da Avenida Anhaia Mello, tornando a galeria também um ponto de parada para ciclistas.",
        media: [
          {
            layout: "offset-left",
            images: [
              {
                src: `${EIXO}/vista-aerea-torres-contexto.jpg`,
                alt: "Vista da rua com as torres residenciais e as lojas do térreo comercial abertas para a calçada",
              },
            ],
          },
        ],
      },
      {
        title: "A fachada norte",
        body: "Vãos amplos garantem ventilação cruzada, luz natural e visibilidade entre o interior e o espaço público. O setor recebe ainda eventos temporários, como feiras e atividades comunitárias, reforçando o caráter aberto do projeto.",
        // fachadas-comparativo.jpg já é um comparativo de 2 vistas num só
        // arquivo — sempre "full", na proporção natural, sem recorte.
        media: [
          {
            layout: "full",
            images: [
              {
                src: `${EIXO}/fachadas-comparativo.jpg`,
                alt: "Comparativo de duas vistas das fachadas das torres, lado a lado",
              },
            ],
          },
        ],
      },
      {
        title: "Os usos do edifício",
        body: "Além do térreo comercial, o multifuncional reúne escritórios, coworking, auditório, espaços expositivos e ambientes multiuso. No primeiro pavimento, uma academia e uma livraria ancoram áreas flexíveis para exposições e apresentações artísticas.",
        media: [
          {
            layout: "offset-right",
            images: [
              {
                src: `${EIXO}/passagem-publica-terreo.jpg`,
                alt: "Espaço expositivo amplo, com obras nas paredes, bancos e visitantes, aberto para a vegetação",
                focal: "55% 50%",
              },
            ],
          },
        ],
      },
      {
        title: "O contexto urbano",
        body: "Inserido em um entorno predominantemente residencial e com baixa diversidade comercial, o projeto propõe maior ênfase em comércio e serviços, consolidando-se como um polo de atividades para a região.",
        media: [
          {
            layout: "full",
            images: [
              {
                src: `${EIXO}/vista-aerea-metro-alternativa.jpg`,
                alt: "Vista aérea das duas torres sobre o embasamento comercial, ao lado da via elevada da Estação Oratório",
              },
            ],
          },
        ],
      },
    ],
    numbers: [
      { value: 136, label: "Apartamentos", animate: true },
      { value: 28995, unit: "m²", label: "Área construída", animate: true },
      { value: 110, label: "Salas comerciais", animate: true },
      // TODO: 16 aqui e na Composição, "Catorze lojas" no texto do térreo —
      // confirmar com o Pedro.
      { value: 16, label: "Lojas comerciais", animate: true },
    ],
    specs: [
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
    credits: {
      authorship: {
        title: "Arquitetura e Urbanismo — Pedro Braga",
        body: "Trabalho Final de Graduação orientado por Braz Casagrande, apresentado na FIAM-FAAM Centro Universitário.",
      },
    },
    // Ordem das pranchas conferida contra os arquivos: Térreo → Subsolo →
    // 1º Pav. → 2º Pav. → Pavimento Tipo → Tipo Residencial (+ legenda das
    // tipologias) → Coberturas → Corte A → Corte B → Elevações N, S, L, O.
    drawings: [
      {
        src: `${EIXO}/planta-terreo-comercial.jpg`,
        alt: "Planta do térreo comercial — Multifuncional Eixo Oratório",
        caption: "Planta do térreo comercial",
      },
      {
        src: `${EIXO}/planta-subsolo-estacionamento.jpg`,
        alt: "Planta do subsolo com estacionamento — Multifuncional Eixo Oratório",
        caption: "Planta do subsolo com estacionamento",
      },
      {
        src: `${EIXO}/planta-primeiro-pavimento.jpg`,
        alt: "Planta do primeiro pavimento — Multifuncional Eixo Oratório",
        caption: "Planta do primeiro pavimento",
      },
      {
        src: `${EIXO}/planta-segundo-pavimento.jpg`,
        alt: "Planta do segundo pavimento — Multifuncional Eixo Oratório",
        caption: "Planta do segundo pavimento",
      },
      {
        src: `${EIXO}/planta-pavimento-tipo.jpg`,
        alt: "Planta do pavimento tipo — Multifuncional Eixo Oratório",
        caption: "Planta do pavimento tipo",
      },
      {
        src: `${EIXO}/planta-pavimento-tipo-residencial.jpg`,
        alt: "Planta do pavimento tipo residencial — Multifuncional Eixo Oratório",
        caption: "Planta do pavimento tipo residencial",
      },
      {
        src: `${EIXO}/legenda-tipologias-apartamento.jpg`,
        alt: "Legenda das tipologias de apartamento — Multifuncional Eixo Oratório",
        caption: "Legenda das tipologias de apartamento",
      },
      {
        src: `${EIXO}/planta-coberturas.jpg`,
        alt: "Planta de coberturas — Multifuncional Eixo Oratório",
        caption: "Planta de coberturas",
      },
      {
        src: `${EIXO}/corte-a-tecnico.jpg`,
        alt: "Corte técnico A — Multifuncional Eixo Oratório",
        caption: "Corte técnico A",
      },
      {
        src: `${EIXO}/corte-b-tecnico.jpg`,
        alt: "Corte técnico B — Multifuncional Eixo Oratório",
        caption: "Corte técnico B",
      },
      {
        src: `${EIXO}/elevacao-norte.jpg`,
        alt: "Elevação norte — Multifuncional Eixo Oratório",
        caption: "Elevação norte",
      },
      {
        src: `${EIXO}/elevacao-sul.png`,
        alt: "Elevação sul — Multifuncional Eixo Oratório",
        caption: "Elevação sul",
      },
      {
        src: `${EIXO}/elevacao-leste.jpg`,
        alt: "Elevação leste — Multifuncional Eixo Oratório",
        caption: "Elevação leste",
      },
      {
        src: `${EIXO}/elevacao-oeste.jpg`,
        alt: "Elevação oeste — Multifuncional Eixo Oratório",
        caption: "Elevação oeste",
      },
    ],
    cardAuthor: "Trabalho Final de Graduação",
    cardLabel: "Multifuncional Eixo Oratório",
    order: 1,
  },
  {
    slug: "area-gourmet-gj",
    title: "Área Gourmet G&J",
    subtitle: "De quintal ocioso a espaço de convívio, descanso e encontro.",
    shortText: "Reforma residencial em Borda da Mata, MG, com cozinha, estar e lazer integrados.",
    location: "Borda da Mata, MG",
    // TODO: "projetada por Pedro Braga" contradiz o crédito oficial (autoria
    // de Nathalia Trotta Arquitetura). Texto novo proposto no PR, aguardando
    // aprovação antes de trocar.
    metaDescription:
      "Área Gourmet G&J: reforma residencial de 106m² em Borda da Mata, MG, projetada por Pedro Braga, integrando cozinha, estar e lazer em um espaço acolhedor.",
    hero: {
      src: `${GJ}/varanda-gourmet-noturna.jpg`,
      alt: "Varanda gourmet iluminada à noite, com estrutura metálica e área de estar — Área Gourmet G&J",
    },
    opening: [
      {
        src: `${GJ}/spa-pergolado-noturno.jpg`,
        alt: "Deck com spa, cadeira suspensa e pergolado metálico iluminados à noite, com a sala de jogos ao fundo",
      },
    ],
    sections: [
      {
        title: "O conceito",
        body: "O projeto surgiu da proposta de transformar um quintal pouco utilizado em uma área gourmet voltada ao convívio entre amigos e familiares. A intervenção buscou criar um ambiente confortável e acolhedor, integrando cozinha, estar e lazer em um mesmo espaço, pensado para receber sem perder a sensação de casa.",
        media: [
          {
            layout: "pair",
            images: [
              {
                src: `${GJ}/cozinha-ilha-detalhe.jpg`,
                alt: "Cozinha com ilha em madeira, banquetas pretas e prateleiras iluminadas, com a mesa de bilhar em primeiro plano",
                focal: "42% 50%",
              },
              {
                src: `${GJ}/cozinha-sala-de-jogos.jpg`,
                alt: "Área externa com sofá, fogueira e cadeira suspensa diante dos caixilhos pretos que se abrem para a cozinha e a sala de jogos",
              },
            ],
          },
        ],
      },
      {
        title: "Os materiais",
        body: "A linguagem contemporânea incorpora referências industriais por meio das estruturas metálicas, esquadrias e elementos em preto, equilibradas pela presença da madeira, da vegetação e de uma iluminação predominantemente quente. O paisagismo participa dos ambientes e contribui para tornar o conjunto mais leve e convidativo — mais do que uma nova função para o quintal, um espaço de permanência.",
        media: [
          {
            layout: "full",
            images: [
              {
                src: `${GJ}/lounge-spa-fogueira.jpg`,
                alt: "Lounge externo com fogueira, spa em deck de madeira e iluminação quente nas paredes",
              },
            ],
          },
        ],
      },
    ],
    numbers: [
      { value: 3, label: "Ambientes integrados", animate: true },
      { value: 106, unit: "m²", label: "Área reformada", animate: true },
      { value: 2026, label: "Ano do projeto", animate: false, plain: true },
    ],
    // TODO: Uso, Área do terreno, CA e TO não existem para este projeto —
    // as linhas ficam fora da ficha até o Pedro passar os dados.
    specs: [{ label: "Local", value: "Borda da Mata, MG" }],
    software: { value: "SketchUp + AutoCAD", label: "Modelagem e desenho técnico" },
    credits: {
      office: {
        name: "Nathalia Trotta Arquitetura",
        href: "https://www.nathaliatrottaarquiteta.com.br/",
      },
      // Texto original do campo de autoria, mantido aqui mas NÃO exibido:
      // contradiz o crédito oficial do escritório (decisão de out/2026 —
      // usar só a linha de crédito).
      // "Arquitetura e Design de Interiores — Pedro Braga" /
      // "Responsável por todas as etapas do projeto, da concepção à escolha
      // de materiais, buscando equilibrar linguagem industrial e acolhimento
      // no mesmo espaço."
    },
    // Corte A sempre antes do Corte B.
    drawings: [
      {
        src: `${GJ}/estudo-croqui-tecnico.jpg`,
        alt: "Estudo em croqui técnico — Área Gourmet G&J",
        caption: "Estudo em croqui técnico",
      },
      {
        src: `${GJ}/planta-baixa.jpg`,
        alt: "Planta baixa — Área Gourmet G&J",
        caption: "Planta baixa",
      },
      {
        src: `${GJ}/corte-a-tecnico.png`,
        alt: "Corte técnico A — Área Gourmet G&J",
        caption: "Corte técnico A",
      },
      {
        src: `${GJ}/corte-b-tecnico.jpg`,
        alt: "Corte técnico B — Área Gourmet G&J",
        caption: "Corte técnico B",
      },
    ],
    cardAuthor: "Nathalia Trotta Arquitetura",
    cardAuthorHref: "https://www.nathaliatrottaarquiteta.com.br/",
    cardLabel: "Área Gourmet G&J — 2026",
    order: 2,
  },
];

export const sortedProjects = [...projects].sort((a, b) => a.order - b.order);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** Próximo projeto na ordem da Home (volta ao primeiro depois do último). */
export function getNextProject(slug: string): Project {
  const index = sortedProjects.findIndex((project) => project.slug === slug);
  return sortedProjects[(index + 1) % sortedProjects.length];
}
