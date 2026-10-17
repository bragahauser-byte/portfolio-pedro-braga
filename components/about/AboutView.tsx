"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Grid, TEXT_COLUMN } from "@/components/Grid";
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
 * colunas no topo (faixa do header), × para voltar. O texto (28/40) e os
 * links seguem a coluna da tipografia do site inteiro.
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
      <header className="pt-6 md:pt-10">
        <Grid className="gap-y-6">
          {META.map((item) => (
            <div key={item.label} className="col-span-3 text-16 md:col-span-2 xl:col-span-3">
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

      <main className="pt-20 md:pt-30 xl:pt-40">
        <Grid>
          <h1 className="sr-only">Sobre mim</h1>

          {/* Colunas 1–4 reservadas para uma foto ou croqui do Pedro.
              TODO: quando o arquivo chegar, colocar aqui um <Picture> em
              xl:col-span-3 xl:sticky xl:top-10 (imagens podem ficar fora
              da coluna da tipografia). */}

          <div className={`${TEXT_COLUMN} flex flex-col gap-6 xl:gap-10`}>
            {paragraphs.map((paragraph, index) => (
              <SplitLines
                key={index}
                as="p"
                text={paragraph}
                immediate={index === 0}
                delay={index === 0 ? 0.55 : 0}
                className="max-w-text text-pretty text-20-loose md:text-24 xl:text-28"
              />
            ))}
          </div>
        </Grid>
      </main>

      <footer className="pb-10 pt-20 md:pt-30 xl:pt-40">
        <Grid>
          <ul className={`${TEXT_COLUMN} flex flex-wrap gap-x-8 gap-y-2 text-16`}>
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
