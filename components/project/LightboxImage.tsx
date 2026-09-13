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
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();
  const titleId = useId();

  // Zoom/pan interaction state — kept in refs (not React state) since it
  // updates on every pointermove and shouldn't trigger re-renders itself.
  const dragRef = useRef<{ active: boolean; startX: number; startY: number; originX: number; originY: number }>({
    active: false,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
  });
  const pinchRef = useRef<{ active: boolean; startDist: number; startScale: number }>({
    active: false,
    startDist: 0,
    startScale: 1,
  });

  const MIN_SCALE = 1;
  const MAX_SCALE = 4;
  const DOUBLE_TAP_SCALE = 2.5;

  function clampScale(value: number) {
    return Math.min(MAX_SCALE, Math.max(MIN_SCALE, value));
  }

  function resetZoom() {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  }

  function handleWheel(e: React.WheelEvent<HTMLImageElement>) {
    e.preventDefault();
    e.stopPropagation();
    setScale((prev) => {
      const next = clampScale(prev - e.deltaY * 0.0015 * prev);
      if (next === 1) setTranslate({ x: 0, y: 0 });
      return next;
    });
  }

  function handleDoubleClick(e: React.MouseEvent<HTMLImageElement>) {
    e.stopPropagation();
    setScale((prev) => {
      if (prev > 1) {
        setTranslate({ x: 0, y: 0 });
        return 1;
      }
      return DOUBLE_TAP_SCALE;
    });
  }

  function handleMouseDown(e: React.MouseEvent<HTMLImageElement>) {
    if (scale <= 1) return;
    e.preventDefault();
    dragRef.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      originX: translate.x,
      originY: translate.y,
    };
  }

  function handleMouseMove(e: React.MouseEvent<HTMLImageElement>) {
    if (!dragRef.current.active) return;
    setTranslate({
      x: dragRef.current.originX + (e.clientX - dragRef.current.startX),
      y: dragRef.current.originY + (e.clientY - dragRef.current.startY),
    });
  }

  function stopDrag() {
    dragRef.current.active = false;
  }

  function touchDistance(touches: React.TouchList) {
    const [a, b] = [touches[0], touches[1]];
    return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
  }

  function handleTouchStart(e: React.TouchEvent<HTMLImageElement>) {
    if (e.touches.length === 2) {
      pinchRef.current = { active: true, startDist: touchDistance(e.touches), startScale: scale };
      dragRef.current.active = false;
    } else if (e.touches.length === 1 && scale > 1) {
      dragRef.current = {
        active: true,
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY,
        originX: translate.x,
        originY: translate.y,
      };
    }
  }

  function handleTouchMove(e: React.TouchEvent<HTMLImageElement>) {
    if (pinchRef.current.active && e.touches.length === 2) {
      e.preventDefault();
      const ratio = touchDistance(e.touches) / pinchRef.current.startDist;
      const next = clampScale(pinchRef.current.startScale * ratio);
      setScale(next);
      if (next === 1) setTranslate({ x: 0, y: 0 });
    } else if (dragRef.current.active && e.touches.length === 1) {
      e.preventDefault();
      setTranslate({
        x: dragRef.current.originX + (e.touches[0].clientX - dragRef.current.startX),
        y: dragRef.current.originY + (e.touches[0].clientY - dragRef.current.startY),
      });
    }
  }

  function handleTouchEnd(e: React.TouchEvent<HTMLImageElement>) {
    if (e.touches.length < 2) pinchRef.current.active = false;
    if (e.touches.length === 0) dragRef.current.active = false;
  }

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
    resetZoom();
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

                <motion.div
                  initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
                  transition={{ duration: fadeDuration, ease: "easeOut" }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative max-h-[90vh] max-w-[90vw] overflow-hidden"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={withBasePath(src)}
                    alt={alt}
                    onWheel={handleWheel}
                    onDoubleClick={handleDoubleClick}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={stopDrag}
                    onMouseLeave={stopDrag}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    style={{
                      transform: `scale(${scale}) translate(${translate.x / scale}px, ${translate.y / scale}px)`,
                      transition: dragRef.current.active || pinchRef.current.active ? "none" : "transform 150ms ease-out",
                      touchAction: scale > 1 ? "none" : "pinch-zoom",
                    }}
                    className={`block max-h-[90vh] max-w-[90vw] select-none object-contain ${
                      scale > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
                    }`}
                  />
                </motion.div>

                {scale > 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      resetZoom();
                    }}
                    className="focus-ring fixed left-6 top-6 z-[110] flex h-11 items-center justify-center rounded-full bg-white/10 px-4 text-sm text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                  >
                    Redefinir zoom
                  </button>
                )}

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
