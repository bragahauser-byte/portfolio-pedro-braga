"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { withBasePath } from "@/lib/paths";

/**
 * Drop-in replacement for `<Image fill />` inside a `relative aspect-[...]
 * overflow-hidden` wrapper — used for every project image (hero, gallery,
 * paired) so all of them are click-to-expand the same way. Renders the
 * expanded view through a portal so it always sits above the sticky
 * header, regardless of where the trigger lives in the tree.
 */
export function LightboxImage({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();
  const titleId = useId();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;

    closeRef.current?.focus();

    // Plain `overflow: hidden` on <body> isn't enough on mobile Safari: if
    // the page was already scrolled when the lightbox opens, iOS has a
    // long-standing bug where `position: fixed` elements can render
    // pinned to the *document's* scroll position instead of the actual
    // visual viewport, so the overlay ends up not covering the full
    // screen (gaps above/below, close button floating over page text —
    // exactly the "doesn't work" symptom on phones). Freezing <body> at
    // its current scroll offset (the standard fix for this class of bug)
    // keeps the fixed overlay correctly pinned to the viewport, and we
    // restore the scroll position on close.
    const scrollY = window.scrollY;
    const body = document.body.style;
    const previous = { position: body.position, top: body.top, width: body.width, overflow: body.overflow };
    body.position = "fixed";
    body.top = `-${scrollY}px`;
    body.width = "100%";
    body.overflow = "hidden";

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", onKeyDown);

    return () => {
      body.position = previous.position;
      body.top = previous.top;
      body.width = previous.width;
      body.overflow = previous.overflow;
      window.scrollTo(0, scrollY);
      document.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function close() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  const fadeDuration = reducedMotion ? 0.15 : 0.22;

  return (
    <>
      <button
        type="button"
        ref={triggerRef}
        onClick={() => setOpen(true)}
        aria-label={`Ampliar imagem: ${alt}`}
        className="focus-ring absolute inset-0 h-full w-full cursor-zoom-in"
      >
        <Image
          src={withBasePath(src)}
          alt={alt}
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover"
        />
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                className="fixed inset-0 z-[100] flex items-center justify-center p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: fadeDuration, ease: "easeOut" }}
                onClick={close}
              >
                <div
                  className="absolute inset-0 bg-black/60 backdrop-blur-[12px]"
                  aria-hidden="true"
                />
                <span id={titleId} className="sr-only">
                  {alt}
                </span>

                <motion.img
                  src={withBasePath(src)}
                  alt={alt}
                  initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
                  transition={{ duration: fadeDuration, ease: "easeOut" }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative max-h-[90vh] max-w-[90vw] cursor-zoom-out object-contain"
                />

                <button
                  type="button"
                  ref={closeRef}
                  onClick={close}
                  aria-label="Fechar imagem ampliada"
                  className="focus-ring fixed right-6 top-6 z-[110] flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 4L16 16M16 4L4 16"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
