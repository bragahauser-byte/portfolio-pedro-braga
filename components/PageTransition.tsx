"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, useLayoutEffect, useRef } from "react";
import { classifyPageTransition, pageMotionVariants } from "@/lib/motion";
import { normalizePathname } from "@/lib/paths";

/**
 * Directional page transitions, driven purely by usePathname() — nothing
 * to reimplement per route:
 *
 * - Home <-> Sobre mim behaves like an iOS push/pop: Sobre mim always
 *   slides in from the right over a static Home, and slides back out to
 *   reveal it, never a symmetric two-sided slide (see lib/motion.ts for
 *   the full rationale).
 * - Anything into or out of a /projetos/[slug] page is a plain crossfade,
 *   regardless of direction.
 * - prefers-reduced-motion collapses either of the above into a short
 *   150ms crossfade with no movement.
 *
 * Both the entering and exiting page are mounted at once (`mode="sync"`)
 * so the outgoing screen can stay visibly static underneath the incoming
 * one instead of the two swapping abruptly — each page is a fixed,
 * viewport-covering overlay only while actively transitioning, and normal
 * in-flow content the rest of the time (see pageMotionVariants).
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = normalizePathname(usePathname());
  const reducedMotion = useReducedMotion();
  const prevPathnameRef = useRef<string | null>(null);

  const kind = classifyPageTransition(prevPathnameRef.current, pathname);
  const variants = pageMotionVariants(pathname, reducedMotion);

  // Runs before paint, right as the new page mounts — a fresh page should
  // always start scrolled to its own top, and doing this in a layout
  // effect (not a regular one) avoids a one-frame flash of the outgoing
  // page's content jumping to align with the new scroll position once it
  // becomes a viewport-fixed overlay for the transition.
  useLayoutEffect(() => {
    if (prevPathnameRef.current !== null && prevPathnameRef.current !== pathname) {
      window.scrollTo(0, 0);
    }
    prevPathnameRef.current = pathname;
  }, [pathname]);

  return (
    <AnimatePresence mode="sync" initial={false} custom={kind}>
      <motion.div
        key={pathname}
        custom={kind}
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
