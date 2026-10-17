"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Grid } from "@/components/Grid";
import { SplitLines } from "@/components/motion/SplitLines";
import { usePageTransition } from "@/components/providers/PageTransition";
import { CONTACT_LINKS } from "@/lib/contact";
import { DURATION, EASE_EXPO_OUT } from "@/lib/motion";

const META = [
  { label: "Pedro Braga", value: "Arquiteto e Urbanista" },
  { label: "Formação", value: "FMU – FIAM FAAM", href: "https://portal.fmu.br/" },
  {
    label: "Atuação",
    value: "São Paulo, SP e Sul de Minas — Tocos do Moji, Borda da Mata, Pouso Alegre e Monte Sião",
  },
];

/**
 * Sobre mim na linguagem do overlay "About" da Paravela: fundo preto que
 * sobe como cortina (clip-path de baixo para cima), metadados em três
 * colunas no topo, × para voltar, texto grande a partir da coluna 7 e os
 * links de contato fixos no canto inferior esquerdo (desktop).
 */
export function AboutView({ paragraphs }: { paragraphs: string[] }) {
  const { back } = usePageTransition();
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className="theme-dark relative min-h-screen bg-night text-paper"
      initial={reducedMotion ? { opacity: 0 } : { clipPath: "inset(100% 0% 0% 0%)" }}
      animate={reducedMotion ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" }}
      transition={{ duration: reducedMotion ? DURATION.reduced : 0.8, ease: EASE_EXPO_OUT }}
    >
      <header className="pt-space-3 md:pt-space-4">
        <Grid className="gap-y-space-3">
          {META.map((item) => (
            <div key={item.label} className="col-span-3 text-nav md:col-span-2 xl:col-span-3">
              <p>{item.label}</p>
              <p className="text-pretty text-muted">
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="link-underline focus-ring">
                    {item.value}
                  </a>
                ) : (
                  item.value
                )}
              </p>
            </div>
          ))}
          <div className="col-start-4 row-start-1 flex justify-end md:col-start-8 xl:col-start-12">
            <button
              type="button"
              onClick={() => back("/")}
              aria-label="Fechar e voltar"
              className="focus-ring -mr-2 -mt-2 flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-white/10"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M3 3l14 14M17 3L3 17" stroke="currentColor" strokeWidth="1.25" />
              </svg>
            </button>
          </div>
        </Grid>
      </header>

      <main className="pb-space-6 pt-space-7 xl:pb-space-8 xl:pt-space-8">
        <Grid>
          <h1 className="sr-only">Sobre mim</h1>

          {/* Coluna esquerda reservada para uma foto ou croqui do Pedro.
              TODO: quando o arquivo chegar, colocar aqui um <Picture> em
              xl:sticky xl:top-space-6 (colunas 1–4). */}
          <div aria-hidden="true" className="hidden xl:col-span-4 xl:block" />

          <div className="col-span-full flex flex-col gap-space-3 md:col-span-6 md:col-start-3 xl:col-span-6 xl:col-start-7">
            {paragraphs.map((paragraph, index) => (
              <SplitLines
                key={index}
                as="p"
                text={paragraph}
                immediate={index === 0}
                delay={index === 0 ? 0.55 : 0}
                className="text-pretty text-lead"
              />
            ))}
          </div>
        </Grid>
      </main>

      <footer className="pb-space-4 xl:fixed xl:bottom-0 xl:left-0 xl:z-10 xl:w-full xl:pb-space-4">
        <Grid>
          <ul className="col-span-full flex flex-wrap gap-x-space-3 gap-y-space-1 text-nav">
            {CONTACT_LINKS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="link-underline link-underline-static focus-ring tap-target"
                >
                  {item.label === "Email" ? item.href.replace("mailto:", "") : item.label}
                </a>
              </li>
            ))}
          </ul>
        </Grid>
      </footer>
    </motion.div>
  );
}
