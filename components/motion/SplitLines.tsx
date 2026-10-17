"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { ElementType, useLayoutEffect, useRef, useState } from "react";
import { DURATION, EASE_EXPO_OUT, LINE_STAGGER } from "@/lib/motion";

/**
 * Título que entra linha a linha: cada palavra sobe de y 100% → 0 dentro
 * de uma máscara, e as palavras da mesma linha (medidas pelo offsetTop
 * depois do layout) compartilham o atraso — então o efeito é por linha,
 * com stagger de 0.06s, qualquer que seja a largura da tela.
 * prefers-reduced-motion: só um fade.
 */
export function SplitLines({
  text,
  as: Tag = "h1",
  className = "",
  delay = 0,
  immediate = false,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  /** Anima no mount em vez de esperar entrar na tela (acima da dobra). */
  immediate?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const [lines, setLines] = useState<number[]>([]);
  const words = text.split(" ");
  const shown = immediate || inView;

  useLayoutEffect(() => {
    function measure() {
      const spans = ref.current?.querySelectorAll<HTMLElement>("[data-word]");
      if (!spans) return;
      const tops: number[] = [];
      setLines(
        Array.from(spans).map((span) => {
          const top = span.offsetTop;
          let index = tops.findIndex((t) => Math.abs(t - top) < 4);
          if (index === -1) index = tops.push(top) - 1;
          return index;
        })
      );
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [text]);

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          <span
            data-word
            className="-my-[0.14em] inline-block overflow-hidden py-[0.14em] align-top"
          >
            {/* Mesmo DOM com ou sem reduced motion (evita erro de hidratação):
                só muda o que anima — subir a linha ou apenas o fade. */}
            <motion.span
              data-motion
              className="inline-block"
              initial={reducedMotion ? { opacity: 0 } : { y: "110%" }}
              animate={
                reducedMotion
                  ? { y: "0%", opacity: shown ? 1 : 0 }
                  : shown
                    ? { y: "0%" }
                    : { y: "110%" }
              }
              transition={
                reducedMotion
                  ? { duration: DURATION.reduced, y: { duration: 0 } }
                  : {
                      duration: DURATION.line,
                      ease: EASE_EXPO_OUT,
                      delay: delay + (lines[i] ?? 0) * LINE_STAGGER,
                    }
              }
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
