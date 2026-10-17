"use client";

import Lenis from "lenis";
import { useEffect } from "react";

// Instância única, acessível fora da árvore React (cortina de transição,
// lightbox, link "Contato") sem precisar de contexto.
let lenis: Lenis | null = null;

export function getLenis() {
  return lenis;
}

/** Rola até o topo de forma imediata (troca de página). */
export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
  else window.scrollTo(0, 0);
}

/** Rola suavemente até um elemento — usa o Lenis quando ativo. */
export function scrollToElement(element: HTMLElement) {
  if (lenis) lenis.scrollTo(element, { duration: 1.4 });
  else element.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Trava/destrava a rolagem (lightbox aberto). */
export function setScrollLocked(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = locked ? "hidden" : "";
}

/**
 * Smooth scroll com Lenis (o mesmo da Paravela). Rola a própria janela,
 * então useScroll/useTransform do Framer Motion continuam funcionando sem
 * integração extra. Desligado com prefers-reduced-motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    function start() {
      if (lenis || media.matches) return;
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    }

    function stop() {
      cancelAnimationFrame(frame);
      lenis?.destroy();
      lenis = null;
    }

    function onChange() {
      if (media.matches) stop();
      else start();
    }

    start();
    media.addEventListener("change", onChange);
    return () => {
      media.removeEventListener("change", onChange);
      stop();
    };
  }, []);

  return null;
}
