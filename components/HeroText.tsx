"use client";

import { motion } from "framer-motion";

export function HeroText() {
  return (
    <motion.p
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="text-[24px] leading-[31px] text-ink sm:text-hero"
    >
      Sou Pedro Braga, Arquiteto e Urbanista brasileiro, natural de São Paulo
      – SP, formado pela FMU – FIAM FAAM.
    </motion.p>
  );
}
