"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { CONTENT_ENTRANCE_Y, ENTRANCE_EASE } from "@/lib/motion";

/**
 * Subtle scroll-triggered fade for content that may sit below the initial
 * viewport (e.g. the Home footer) — same soft "just appear in place, don't
 * fly in" language as the rest of the Home entrance (see HomeEntrance.tsx),
 * just triggered by visibility instead of load, since it isn't guaranteed
 * to be on screen at load time.
 */
export function ScrollFadeIn({ children, className }: { children: ReactNode; className?: string }) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: CONTENT_ENTRANCE_Y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35, ease: ENTRANCE_EASE }}
    >
      {children}
    </motion.div>
  );
}
