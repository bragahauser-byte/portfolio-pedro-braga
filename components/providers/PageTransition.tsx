"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ComponentProps,
  createContext,
  MouseEvent,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { DURATION, EASE_EXPO_OUT } from "@/lib/motion";
import { normalizePathname } from "@/lib/paths";
import { scrollToElement, scrollToTop } from "./SmoothScroll";

type Phase = "idle" | "covering" | "revealing";
type Target = { kind: "push"; href: string } | { kind: "back" };

const TransitionContext = createContext<{
  navigate: (href: string) => void;
  back: (fallbackHref: string) => void;
}>({ navigate: () => {}, back: () => {} });

export function usePageTransition() {
  return useContext(TransitionContext);
}

// Marca que já houve navegação interna nesta aba — o × do Sobre mim só
// usa history.back() quando há para onde voltar dentro do site.
const INTERNAL_NAV_KEY = "pb:internal-nav";

function splitHash(href: string) {
  const [path, hash] = href.split("#");
  return { path: normalizePathname(path || "/"), hash };
}

/**
 * Transição de página com cortina sólida (preta): cobre a tela subindo de
 * baixo para cima, troca a rota por baixo dela e revela a página nova
 * saindo pelo topo. Com prefers-reduced-motion, a troca é direta.
 *
 * Nota: o shared layout (layoutId) do card da Home até o hero do projeto
 * foi testado como alternativa, mas com static export + App Router a página
 * antiga desmonta antes da nova montar, então não há par de elementos para
 * interpolar — fica a cortina.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = normalizePathname(usePathname());
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const pending = useRef<Target | null>(null);
  const pendingHash = useRef<string | undefined>(undefined);
  const lastPathname = useRef(pathname);

  const go = useCallback(
    (target: Target) => {
      try {
        sessionStorage.setItem(INTERNAL_NAV_KEY, "1");
      } catch {
        // sessionStorage indisponível (aba privada etc.) — segue sem a marca.
      }
      if (reducedMotion) {
        if (target.kind === "back") router.back();
        else router.push(target.href);
        return;
      }
      pending.current = target;
      setPhase("covering");
    },
    [reducedMotion, router]
  );

  const navigate = useCallback(
    (href: string) => {
      const { path, hash } = splitHash(href);
      if (path === pathname) {
        const element = hash ? document.getElementById(hash) : null;
        if (element) scrollToElement(element);
        else if (!hash) scrollToTop();
        return;
      }
      pendingHash.current = hash;
      go({ kind: "push", href });
    },
    [go, pathname]
  );

  const back = useCallback(
    (fallbackHref: string) => {
      let hasInternal = false;
      try {
        hasInternal = sessionStorage.getItem(INTERNAL_NAV_KEY) === "1";
      } catch {
        hasInternal = false;
      }
      if (hasInternal && window.history.length > 1) go({ kind: "back" });
      else navigate(fallbackHref);
    },
    [go, navigate]
  );

  // A rota trocou por baixo da cortina → topo da página (ou âncora) e revela.
  useEffect(() => {
    if (pathname === lastPathname.current) return;
    lastPathname.current = pathname;
    if (pending.current === null && phase === "idle") return; // voltar/avançar do navegador
    pending.current = null;
    const hash = pendingHash.current;
    pendingHash.current = undefined;
    scrollToTop();
    if (hash) {
      requestAnimationFrame(() => {
        const element = document.getElementById(hash);
        if (element) element.scrollIntoView({ block: "start" });
      });
    }
    if (!reducedMotion) setPhase("revealing");
  }, [pathname, phase, reducedMotion]);

  function onCurtainComplete() {
    if (phase === "covering" && pending.current) {
      const target = pending.current;
      if (target.kind === "back") router.back();
      else router.push(target.href);
    } else if (phase === "revealing") {
      setPhase("idle");
    }
  }

  const clipPath =
    phase === "covering"
      ? "inset(0% 0% 0% 0%)"
      : phase === "revealing"
        ? "inset(0% 0% 100% 0%)"
        : "inset(100% 0% 0% 0%)";

  return (
    <TransitionContext.Provider value={{ navigate, back }}>
      {children}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[300] bg-night"
        initial={false}
        animate={{ clipPath }}
        transition={
          phase === "idle" ? { duration: 0 } : { duration: DURATION.curtain, ease: EASE_EXPO_OUT }
        }
        onAnimationComplete={onCurtainComplete}
        style={{ pointerEvents: phase === "idle" ? "none" : "auto" }}
      />
    </TransitionContext.Provider>
  );
}

/**
 * Link interno que passa pela cortina. Cliques com modificador (nova aba)
 * e links externos seguem o comportamento normal do navegador.
 */
export function TransitionLink({ href, onClick, ...rest }: ComponentProps<typeof Link> & { href: string }) {
  const { navigate } = usePageTransition();

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (rest.target === "_blank") return;
    e.preventDefault();
    navigate(href);
  }

  return <Link href={href} onClick={handleClick} {...rest} />;
}
