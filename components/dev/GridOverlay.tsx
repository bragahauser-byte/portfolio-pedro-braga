"use client";

import { useEffect, useState } from "react";

/**
 * Overlay das colunas do grid para conferir alinhamentos — só em dev,
 * liga/desliga com a tecla G (ignorada enquanto se digita num campo).
 */
export function GridOverlay() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      if (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
      if (e.key.toLowerCase() === "g" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        setVisible((v) => !v);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  if (!visible) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[999]">
      <div className="site-grid h-full">
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className={`h-full bg-[rgba(255,0,80,0.08)] outline outline-1 outline-[rgba(255,0,80,0.25)] ${
              i >= 4 ? "hidden md:block" : ""
            } ${i >= 8 ? "md:hidden xl:block" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}
