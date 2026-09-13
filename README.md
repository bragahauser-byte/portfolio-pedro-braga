# Portfólio — Pedro Braga

Portfólio pessoal de Pedro Braga, arquiteto e urbanista, estilo editorial/minimalista.
Construído para ser escalável: novas páginas de projeto (`/projetos/[slug]`) reaproveitam
o mesmo header, rodapé, grid e animação de transição já implementados.

## Stack

- [Next.js 14](https://nextjs.org/) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) — grid, cores e tipografia como design tokens
- [Framer Motion](https://www.framer.com/motion/) — animações de entrada, scroll-reveal e transição de página
- Fonte [Inter](https://fonts.google.com/specimen/Inter) via `next/font/google`

## Rodando localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Estrutura

```
/app
  layout.tsx              -> fonte, JSON-LD (schema.org/Person), PageTransition global
  page.tsx                 -> Home
  sobre-mim/page.tsx       -> Sobre mim
  sitemap.ts / robots.ts   -> SEO
  opengraph-image.tsx      -> imagem de preview (OG) gerada dinamicamente
/components
  Header.tsx / Footer.tsx  -> presentes em todas as páginas
  Grid.tsx                 -> grid de 80px margem / 6 colunas / 20px gutter (obrigatório em toda página nova)
  PageTransition.tsx       -> slide de página via AnimatePresence + usePathname()
  ProjectCard.tsx          -> card de projeto (imagem + legenda), usado na Home e em futuras páginas de projeto
  HeroText.tsx / BioSection.tsx
/data
  projects.ts               -> lista de projetos (fácil de migrar para um CMS depois)
/lib
  seo.ts                     -> metadata + JSON-LD compartilhados
```

## Grid — obrigatório em qualquer página nova

Use sempre `<Grid>` (ou `<GridMargin>`) de `@/components/Grid` — nunca margens
hardcoded. Em telas pequenas o grid colapsa para 24px de margem / 2 colunas / 16px
de gutter, mantendo a proporção do desktop (80px / 6 colunas / 20px).

## Adicionando um novo projeto

1. Coloque as imagens em `/public/images/projects/<slug>/`
2. Adicione uma entrada em `data/projects.ts`
3. (quando as páginas de projeto existirem) crie `/app/projetos/[slug]/page.tsx`
   reaproveitando `Header`, `Footer`, `Grid` e o `PageTransition` já globais —
   não é necessário reimplementar nada disso.

## Pendências conhecidas

- Links de Email/LinkedIn/Instagram no rodapé são placeholders (`components/Footer.tsx`)
  até que os links reais sejam fornecidos.
- `lib/seo.ts` usa `https://pedrobraga.com.br` como domínio de referência —
  atualizar para o domínio real de produção quando o site for publicado.
- Páginas individuais de projeto (`/projetos/[slug]`) ainda não foram criadas.
