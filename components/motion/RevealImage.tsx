"use client";

import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Picture, getImageSize } from "@/components/media/Picture";
import { DURATION, EASE_EXPO_OUT, PARALLAX_RANGE, REVEAL_SCALE } from "@/lib/motion";

/**
 * Foto/render com entrada editorial: a máscara abre de baixo para cima
 * (clip-path inset(100% 0 0 0) → inset(0)) enquanto a imagem assenta de
 * 1.08 para 1 — uma vez só, ao entrar na tela. Opcionalmente com parallax
 * sutil (±7%) dentro do container com overflow hidden.
 *
 * - `aspect` recorta numa proporção fixa (ex.: "4/5"); sem ele, usa a
 *   proporção natural do arquivo e nada é cortado.
 * - `priority` (hero): sem máscara, só o assentamento da escala — a imagem
 *   aparece no primeiro paint e não atrasa o LCP.
 * - prefers-reduced-motion: só um fade.
 */
export function RevealImage({
  src,
  alt,
  sizes,
  aspect,
  focal,
  priority = false,
  parallax = false,
  className = "",
  cursor,
}: {
  src: string;
  alt: string;
  sizes: string;
  aspect?: string;
  focal?: string;
  priority?: boolean;
  parallax?: boolean;
  className?: string;
  /** Rótulo do cursor customizado sobre esta imagem. */
  cursor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const { width, height } = getImageSize(src);
  const ratio = aspect ?? `${width}/${height}`;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // A camada tem 100% + 2×7% de altura; o deslocamento é relativo a ela,
  // então ±7% do container = ±(7 / 1.14)% da camada — nunca abre fresta.
  const shift = (PARALLAX_RANGE / (100 + 2 * PARALLAX_RANGE)) * 100;
  const y = useTransform(scrollYProgress, [0, 1], [`-${shift}%`, `${shift}%`]);
  const useParallax = parallax && !reducedMotion;

  const shown = priority || inView;

  const mask = reducedMotion
    ? {
        // O HTML do servidor já vem com a máscara fechada (no servidor não
        // se sabe a preferência) — com reduced motion ela é aberta na hora.
        initial: { opacity: 0 },
        animate: { clipPath: "inset(0% 0% 0% 0%)", opacity: shown ? 1 : 0 },
      }
    : priority
      ? { initial: false as const, animate: {} }
      : {
          initial: { clipPath: "inset(100% 0% 0% 0%)" },
          animate: shown ? { clipPath: "inset(0% 0% 0% 0%)" } : { clipPath: "inset(100% 0% 0% 0%)" },
        };

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden bg-[#ECEBE8] ${className}`}
      style={{ aspectRatio: ratio }}
      data-cursor={cursor}
    >
      <motion.div
        data-motion
        className="absolute inset-0"
        {...mask}
        transition={{ duration: reducedMotion ? DURATION.reduced : DURATION.reveal, ease: EASE_EXPO_OUT }}
      >
        <motion.div
          className="absolute inset-x-0"
          style={
            useParallax
              ? { y, top: `-${PARALLAX_RANGE}%`, bottom: `-${PARALLAX_RANGE}%` }
              : { top: 0, bottom: 0 }
          }
        >
          <motion.div
            className="h-full w-full"
            initial={reducedMotion ? false : { scale: REVEAL_SCALE }}
            animate={reducedMotion ? { scale: 1 } : shown ? { scale: 1 } : { scale: REVEAL_SCALE }}
            transition={{ duration: DURATION.reveal + 0.3, ease: EASE_EXPO_OUT }}
          >
            <Picture src={src} alt={alt} sizes={sizes} priority={priority} focal={focal} className="block h-full w-full" />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
