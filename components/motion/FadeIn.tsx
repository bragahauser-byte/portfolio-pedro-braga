"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { DURATION, EASE_EXPO_OUT, FADE_Y } from "@/lib/motion";

const TAGS = { div: motion.div, p: motion.p, span: motion.span, li: motion.li, dl: motion.dl } as const;

/** Fade + y 12px ao entrar na tela (uma vez). Reduced motion: só o fade. */
export function FadeIn({
  children,
  as = "div",
  className = "",
  delay = 0,
  immediate = false,
}: {
  children: ReactNode;
  as?: keyof typeof TAGS;
  className?: string;
  delay?: number;
  immediate?: boolean;
}) {
  const reducedMotion = useReducedMotion();
  const MotionTag = TAGS[as];
  const hidden = { opacity: 0, y: reducedMotion ? 0 : FADE_Y };
  const visible = { opacity: 1, y: 0 };
  const transition = {
    duration: reducedMotion ? DURATION.reduced : DURATION.fade,
    ease: EASE_EXPO_OUT,
    delay,
  };

  return immediate ? (
    <MotionTag className={className} initial={hidden} animate={visible} transition={transition}>
      {children}
    </MotionTag>
  ) : (
    <MotionTag
      className={className}
      initial={hidden}
      whileInView={visible}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={transition}
    >
      {children}
    </MotionTag>
  );
}
