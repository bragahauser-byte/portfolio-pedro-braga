# Portfólio — Pedro Braga

Portfólio de Pedro Braga, arquiteto e urbanista — https://phbraga.com.br

Linguagem editorial inspirada na Paravela e na Idea Zarvos: tipografia grande,
grid assimétrico de 12 colunas, muito respiro e um movimento contido, a serviço
da fotografia.

## Stack

- [Next.js 14](https://nextjs.org/) (App Router) + TypeScript, `output: "export"` (site estático)
- [Tailwind CSS](https://tailwindcss.com/): tokens de tipografia, cor e espaçamento em `tailwind.config.ts`
- [Framer Motion](https://www.framer.com/motion/): reveals, parallax, count-up e cortina entre páginas
- [Lenis](https://lenis.darkroom.engineering/): smooth scroll (desligado com `prefers-reduced-motion`)
- Helvetica Now Display Regular via `next/font/local`, em `app/fonts/`
- [sharp](https://sharp.pixelplumbing.com/) (dev): gera as imagens responsivas

## Rodando localmente

```bash
npm install
npm run dev     # http://localhost:3000 — tecla G mostra o grid
npm run build   # gera /out (o mesmo que vai para o GitHub Pages)
npm run lint
```

## Deploy

Todo push na `main` dispara `.github/workflows/deploy.yml`, que builda e publica
`/out` no GitHub Pages com o domínio `phbraga.com.br` (`public/CNAME`).
**Merge na `main` = site no ar.**

## Estrutura

```
/app
  layout.tsx               fonte, Lenis, cortina de transição, overlay do grid (dev)
  page.tsx                 Home
  projetos/[slug]/page.tsx página de projeto (gerada para cada item de data/projects.ts)
  sobre-mim/page.tsx       Sobre mim
  sitemap.ts / robots.ts   SEO
/components
  Grid.tsx                 grid 12/8/4 colunas (obrigatório em toda página)
  Header.tsx / Footer.tsx
  providers/               SmoothScroll (Lenis) e PageTransition (cortina + TransitionLink)
  motion/                  RevealImage, SplitLines, FadeIn, CountUp
  media/Picture.tsx        <picture> com AVIF/WebP responsivos + width/height reais
  home/  project/  about/  blocos de cada página
  dev/GridOverlay.tsx
/data
  projects.ts              todo o conteúdo dos projetos
  image-manifest.json      gerado por `npm run images`
/lib
  motion.ts                easing e durações (fonte única)
  seo.ts                   metadata, Open Graph e JSON-LD
  contact.ts               e-mail e redes
/scripts
  optimize-images.mjs      gera /public/images/optimized + manifesto
```

## Grid

Sempre `<Grid>` (ou `<GridMargin>`) de `@/components/Grid`, nunca margens hardcoded.

| Tela      | Colunas | Margem | Gutter |
| --------- | ------- | ------ | ------ |
| ≥ 1280px  | 12      | 80px   | 20px   |
| 768–1279  | 8       | 40px   | 20px   |
| < 768px   | 4       | 20px   | 16px   |

**Regra da tipografia:** todo texto começa sempre na mesma coluna — a 5 no desktop,
a 3 no tablet, a margem no mobile (`TEXT_COLUMN` / `TEXT_COLUMN_WIDE` em
`components/Grid.tsx`). Só as imagens mudam de posição. Valores medidos nas
referências da Idea Zarvos.

**Tamanhos:** 12, 14, 16, 20, 24, 28, 32, 40, 56, 80 e 120px (classes `text-12`…`text-120`),
um peso só (Regular). Entrelinhas e espaçamentos sempre em múltiplos de 4.
**Cores:** texto #000, secundário #999, fios #EEE.

## Adicionando um projeto

1. Coloque as imagens em `/public/images/projects/<slug>/` com nomes descritivos.
   Desenhos técnicos começam com `planta-`, `corte-`, `elevacao-`, `legenda-` ou `estudo-`:
   eles nunca são cortados nem aparados.
2. Rode `npm run images` para gerar as variantes AVIF/WebP e atualizar o manifesto.
3. Adicione uma entrada em `data/projects.ts`: `hero`, `opening`, `sections[]` (com
   `media[].layout`: `full`, `panorama`, `pair`, `offset-left` ou `offset-right`),
   `numbers[]`, `specs[]`, `credits` e `drawings[]`. A página é gerada sozinha.

Regra de conteúdo: textos, números e créditos vêm do Pedro. A diagramação muda;
o texto, não.

## Pendências

Os `TODO` no código marcam informação que falta:

- Número de lojas do Eixo Oratório: o texto diz "Catorze", os números dizem 16.
- Ano do TFG (para os metadados da abertura).
- Uso, Área do terreno, CA e TO da Área Gourmet G&J (essas linhas ficam fora da ficha até lá).
- Meta description do G&J (texto novo aguardando aprovação).
- Subtítulo do bloco "Outros projetos" e foto/croqui do Sobre mim.
