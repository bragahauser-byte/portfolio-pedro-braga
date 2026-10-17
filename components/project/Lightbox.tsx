"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { KeyboardEvent as ReactKeyboardEvent, PointerEvent, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Picture } from "@/components/media/Picture";
import { setScrollLocked } from "@/components/providers/SmoothScroll";
import { DURATION, EASE_EXPO_OUT } from "@/lib/motion";

export type LightboxItem = { src: string; alt: string; caption: string };

const ZOOM = 2.5;

/**
 * Lightbox dos desenhos técnicos: imagem inteira (object-contain) sobre
 * fundo off-white, com navegação por teclado (← → Esc), foco preso dentro
 * do diálogo e devolvido ao gatilho ao fechar. Zoom: clique / duplo
 * clique / tecla Z alternam 2.5×; com zoom, arrastar move a prancha.
 */
export function Lightbox({
  items,
  index,
  onClose,
  onChange,
}: {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
}) {
  const reducedMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const drag = useRef<{ x: number; y: number; ox: number; oy: number; moved: boolean } | null>(null);
  const [mounted, setMounted] = useState(false);
  const open = index !== null;
  const item = open ? items[index] : null;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    returnFocus.current = document.activeElement as HTMLElement;
    setScrollLocked(true);
    closeRef.current?.focus();
    return () => {
      setScrollLocked(false);
      returnFocus.current?.focus();
    };
  }, [open]);

  useEffect(() => {
    setZoomed(false);
    setOrigin({ x: 50, y: 50 });
  }, [index]);

  function go(delta: number) {
    if (index === null) return;
    onChange((index + delta + items.length) % items.length);
  }

  function onKeyDown(e: ReactKeyboardEvent<HTMLDivElement>) {
    if (e.key === "Escape") onClose();
    else if (e.key === "ArrowRight") go(1);
    else if (e.key === "ArrowLeft") go(-1);
    else if (e.key.toLowerCase() === "z") setZoomed((z) => !z);
    else if (e.key === "Tab") {
      // Foco preso no diálogo.
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>("button");
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    drag.current = { x: e.clientX, y: e.clientY, ox: origin.x, oy: origin.y, moved: false };
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (!drag.current || !zoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = ((e.clientX - drag.current.x) / rect.width) * 100;
    const dy = ((e.clientY - drag.current.y) / rect.height) * 100;
    if (Math.abs(dx) + Math.abs(dy) > 1) drag.current.moved = true;
    setOrigin({
      x: Math.min(100, Math.max(0, drag.current.ox - dx)),
      y: Math.min(100, Math.max(0, drag.current.oy - dy)),
    });
  }

  function onPointerUp(e: PointerEvent<HTMLDivElement>) {
    const wasDrag = drag.current?.moved;
    drag.current = null;
    if (wasDrag) return;
    if (!zoomed) {
      const rect = e.currentTarget.getBoundingClientRect();
      setOrigin({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    }
    setZoomed((z) => !z);
  }

  const fade = { duration: reducedMotion ? DURATION.reduced : 0.5, ease: EASE_EXPO_OUT };
  const buttonClass =
    "focus-ring flex h-11 min-w-11 items-center justify-center rounded-full px-3 text-14 text-ink transition-colors hover:bg-ink/5";

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {item && index !== null && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${item.caption} — ${index + 1} de ${items.length}`}
          onKeyDown={onKeyDown}
          className="fixed inset-0 z-[400] flex flex-col bg-drawing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={fade}
        >
          <div className="site-grid shrink-0 items-center py-4">
            <p className="col-span-2 text-12 text-muted tnum md:col-span-4 xl:col-span-6" aria-live="polite">
              {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </p>
            <div className="col-span-2 flex justify-end md:col-span-4 xl:col-span-6">
              <button ref={closeRef} type="button" onClick={onClose} aria-label="Fechar" className={buttonClass}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.25" />
                </svg>
              </button>
            </div>
          </div>

          <div
            className={`relative min-h-0 flex-1 touch-none overflow-hidden px-grid-margin ${
              zoomed ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
            }`}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={item.src}
                className="h-full w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reducedMotion ? DURATION.reduced : 0.35 }}
              >
                <Picture
                  src={item.src}
                  alt={item.alt}
                  fit="contain"
                  sizes="100vw"
                  className="block h-full w-full"
                  imgClassName="select-none"
                  style={{
                    transform: zoomed ? `scale(${ZOOM})` : "scale(1)",
                    transformOrigin: `${origin.x}% ${origin.y}%`,
                    transition: drag.current ? "none" : "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="site-grid shrink-0 items-center py-4">
            <p className="col-span-full text-14 md:col-span-4 xl:col-span-6">{item.caption}</p>
            <div className="col-span-full flex justify-end gap-2 md:col-span-4 xl:col-span-6">
              <button type="button" onClick={() => setZoomed((z) => !z)} className={buttonClass}>
                {zoomed ? "Reduzir" : "Ampliar"}
              </button>
              <button type="button" onClick={() => go(-1)} aria-label="Desenho anterior" className={buttonClass}>
                ←
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Próximo desenho" className={buttonClass}>
                →
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
