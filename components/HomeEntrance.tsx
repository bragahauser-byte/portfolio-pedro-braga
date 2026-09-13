"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { entranceContainerVariants, entranceItemVariants } from "@/lib/motion";

/**
 * Orchestrates the Home page load-in: header → hero → first project image,
 * staggered 60–80ms apart, fade + small translateY, soft spring easing
 * (Apple HIG guidance for content appearing on screen). Respects
 * prefers-reduced-motion — elements then appear immediately at opacity 1,
 * no offset, no stagger.
 */
export function HomeEntrance({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={entranceContainerVariants(reducedMotion)}
      initial="hidden"
      animate="show"
    >
      {children}
    </motion.div>
  );
}

/** One staggered step within <HomeEntrance> — header, hero, or first image. */
export function EntranceItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div variants={entranceItemVariants(reducedMotion)} className={className}>
      {children}
    </motion.div>
  );
}
