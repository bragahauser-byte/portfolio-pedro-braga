"use client";

import { motion } from "framer-motion";

export function BioSection({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="col-span-2 flex flex-col gap-6 sm:col-span-5">
      {paragraphs.map((paragraph, index) => (
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="text-base leading-[26px] text-justify text-paper sm:text-bio"
        >
          {paragraph}
        </motion.p>
      ))}
    </div>
  );
}
