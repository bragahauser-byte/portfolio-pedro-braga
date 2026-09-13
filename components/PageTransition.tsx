"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { pageTransitionVariants } from "@/lib/motion";

/**
 * Material Design 3 "Shared Axis X" page transition — the recommended
 * pattern for navigating between hierarchy levels (Home → Sobre mim, and
 * any future /projetos/[slug]). Entering and exiting screens use a short
 * offset (not a full-screen slide) with asymmetric easing: decelerate in,
 * accelerate out. Driven purely by usePathname(), so any new route gets
 * this automatically — nothing to reimplement per page.
 *
 * mode="wait" avoids overlapping DOM (two full pages mounted at once),
 * which also sidesteps layout-collapse issues from stacking pages with
 * differing heights. Switch to mode="popLayout" if this ever produces a
 * visible blank-screen flash between pages.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const variants = pageTransitionVariants(reducedMotion);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
