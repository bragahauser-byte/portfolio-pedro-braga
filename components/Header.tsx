"use client";

import { MouseEvent } from "react";
import { usePathname } from "next/navigation";
import { normalizePathname } from "@/lib/paths";
import { Grid } from "./Grid";
import { TransitionLink, usePageTransition } from "./providers/PageTransition";
import { scrollToElement } from "./providers/SmoothScroll";

/**
 * Header mínimo: Pedro Braga à esquerda, Sobre mim e Contato à direita,
 * 16px. O link da seção atual fica preto, os outros em cinza (a Home e as
 * páginas de projeto contam como "Pedro Braga"). Fica fora da coluna da
 * tipografia de propósito: é a única faixa que usa as margens do grid.
 */
export function Header() {
  const pathname = normalizePathname(usePathname());
  const { navigate } = usePageTransition();
  const isSobre = pathname === "/sobre-mim";

  const base = "text-16 focus-ring tap-target link-underline";
  const active = "text-ink";
  const inactive = "text-muted";

  function handleContato(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    const footer = document.getElementById("contato");
    if (footer) scrollToElement(footer);
    else navigate("/#contato");
  }

  return (
    <header className="relative z-40 w-full pt-6 md:pt-10">
      <Grid as="nav" aria-label="Principal">
        <div className="col-span-full flex items-center justify-between">
          <TransitionLink href="/" className={`${base} ${isSobre ? inactive : active}`}>
            Pedro Braga
          </TransitionLink>
          <div className="flex items-center gap-6 md:gap-10">
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
