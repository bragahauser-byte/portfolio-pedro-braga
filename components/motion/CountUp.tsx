"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { DURATION } from "@/lib/motion";

const grouped = new Intl.NumberFormat("pt-BR");
const plainFormat = new Intl.NumberFormat("pt-BR", { useGrouping: false });

/**
 * Número que conta de 0 até o valor (~1.2s, easing out) ao entrar na tela,
 * sempre no formato pt-BR (28.995). O HTML estático já traz o valor final
 * (SEO / sem JS) e leitores de tela leem só o valor final.
 * `animate={false}` (ex.: ano do projeto) ou reduced motion: estático.
 */
export function CountUp({
  value,
  animate: shouldAnimate = true,
  plain = false,
}: {
  value: number;
  animate?: boolean;
  /** Sem separador de milhar (anos). */
  plain?: boolean;
}) {
  const formatter = plain ? plainFormat : grouped;
  const ref = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const active = shouldAnimate && !reducedMotion;
  const [display, setDisplay] = useState(value);
  const started = useRef(false);

  useEffect(() => {
    if (active && !started.current) setDisplay(0);
  }, [active]);

  useEffect(() => {
    if (!active || !inView || started.current) return;
    started.current = true;
    const controls = animate(0, value, {
      duration: DURATION.count,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [active, inView, value]);

  return (
    <>
      <span ref={ref} aria-hidden="true">
        {/* Dígitos tabulares (não pulam durante a contagem), mas o ponto
            de milhar volta à largura proporcional — em tnum ele fica largo. */}
        {formatter.formatToParts(active ? display : value).map((part, i) =>
          part.type === "integer" ? (
            <span key={i} className="tnum">
              {part.value}
            </span>
          ) : (
            <span key={i}>{part.value}</span>
          )
        )}
      </span>
      <span className="sr-only">{formatter.format(value)}</span>
    </>
  );
}
