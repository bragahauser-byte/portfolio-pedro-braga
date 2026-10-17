"use client";

import { MouseEvent } from "react";
import { usePathname } from "next/navigation";
import { normalizePathname } from "@/lib/paths";
import { Grid } from "./Grid";
import { TransitionLink, usePageTransition } from "./providers/PageTransition";
import { scrollToElement } from "./providers/SmoothScroll";

/**
 * Header: Pedro Braga à esquerda, Sobre mim e Contato à direita, 24/32
 * (20/24 no mobile). O link da seção atual fica preto, os outros em cinza
 * (a Home e as páginas de projeto contam como "Pedro Braga").
 *
 * Fica fixo no topo com fundo branco enquanto a página rola, para a
 * navegação estar sempre à mão. É a única faixa fora da coluna da
 * tipografia: usa as margens do grid, alinhado com o rodapé.
 */
export function Header() {
  const pathname = normalizePathname(usePathname());
  const { navigate } = usePageTransition();
  const isSobre = pathname === "/sobre-mim";

  const base = "text-20 md:text-24 focus-ring tap-target link-underline";
  const active = "text-ink";
  const inactive = "text-muted";

  function handleContato(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    const footer = document.getElementById("contato");
    if (footer) scrollToElement(footer);
    else navigate("/#contato");
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-paper py-4 md:py-6">
      <Grid as="nav" aria-label="Principal">
        <div className="col-span-full flex items-center justify-between">
          <TransitionLink href="/" className={`${base} ${isSobre ? inactive : active}`}>
            Pedro Braga
          </TransitionLink>
          <div className="flex items-center gap-5 md:gap-10">
            <TransitionLink href="/sobre-mim" className={`${base} ${isSobre ? active : inactive}`}>
              Sobre mim
            </TransitionLink>
            <a href="#contato" onClick={handleContato} className={`${base} ${inactive}`}>
              Contato
            </a>
          </div>
        </div>
      </Grid>
    </header>
  );
}
