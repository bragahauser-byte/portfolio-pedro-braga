"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

/**
 * Wraps every route's content. New screens slide in from the right while
 * the previous one fades/slides out to the left. Driven purely by
 * usePathname(), so any new route (including future /projetos/[slug]
 * pages) gets this transition automatically — nothing to reimplement.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ x: "6%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "-4%", opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
