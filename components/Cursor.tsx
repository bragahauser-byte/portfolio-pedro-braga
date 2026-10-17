"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Cursor customizado só para desktop (pointer: fine): aparece apenas sobre
 * elementos com `data-cursor="Ver"` (cards de projeto) ou `data-cursor="+"`
 * (desenhos técnicos, abre o lightbox) — no resto do site o cursor nativo
 * continua. Em seções escuras (.theme-dark) inverte para branco.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [dark, setDark] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    let x = 0;
    let y = 0;
    let frame = 0;

    function onMove(e: PointerEvent) {
      x = e.clientX;
      y = e.clientY;
      if (!frame) {
        frame = requestAnimationFrame(() => {
          frame = 0;
          if (ref.current) ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        });
      }
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      setLabel(target?.dataset.cursor ?? null);
      setDark(Boolean(target?.closest(".theme-dark")));
    }

    function onLeave() {
      setLabel(null);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("has-cursor");
      cancelAnimationFrame(frame);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[250]"
    >
      <div
        className={`flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-14 transition-[transform,opacity] duration-500 ease-expo-out motion-reduce:transition-none ${
          dark ? "bg-paper text-ink" : "bg-ink text-paper"
        } ${label ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}
      >
        {label}
      </div>
    </div>
  );
}
