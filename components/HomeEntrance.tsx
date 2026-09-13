"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { EntranceRole, entranceContainerVariants, entranceItemVariants } from "@/lib/motion";

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

/**
 * One staggered step within <HomeEntrance> — header, hero, first image, or
 * footer. `role="header"` gets real movement (fade + rise, ~300ms); the
 * default `"content"` only fades softly in place — no element but the
 * header should look like it flew in from somewhere.
 */
export function EntranceItem({
  children,
  className,
  role = "content",
}: {
  children: ReactNode;
  className?: string;
  role?: EntranceRole;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div variants={entranceItemVariants(reducedMotion, role)} className={className}>
      {children}
    </motion.div>
  );
}
