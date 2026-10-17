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

// "covered": cortina fechada sem animar (saída do Sobre mim, que já é preto).
type Phase = "idle" | "covering" | "covered" | "revealing";
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
const ABOUT_PATH = "/sobre-mim";

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
    (target: Target, instant = false) => {
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
      setPhase(instant ? "covered" : "covering");
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
      // O Sobre mim tem a própria cortina preta subindo (AboutView): passar
      // pela cortina global antes só somava ~1,4s de tela preta parada.
      if (path === ABOUT_PATH && !hash) {
        try {
          sessionStorage.setItem(INTERNAL_NAV_KEY, "1");
        } catch {
          // segue sem a marca
        }
        scrollToTop();
        router.push(href);
        return;
      }
      pendingHash.current = hash;
      go({ kind: "push", href });
    },
    [go, pathname, router]
  );

  const back = useCallback(
    (fallbackHref: string) => {
      let hasInternal = false;
      try {
        hasInternal = sessionStorage.getItem(INTERNAL_NAV_KEY) === "1";
      } catch {
        hasInternal = false;
      }
      // Saindo de uma página preta (Sobre mim) a cortina já "está" fechada:
      // fecha sem animar e só revela a página de destino.
      if (hasInternal && window.history.length > 1) go({ kind: "back" }, true);
      else {
        pendingHash.current = undefined;
        go({ kind: "push", href: fallbackHref }, true);
      }
    },
    [go]
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

  function navigatePending() {
    const target = pending.current;
    if (!target) return;
    if (target.kind === "back") router.back();
    else router.push(target.href);
  }

  // Cortina fechada na hora: navega no mesmo frame, sem esperar animação.
  useEffect(() => {
    if (phase === "covered") navigatePending();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  function onCurtainComplete() {
    if (phase === "covering") navigatePending();
    else if (phase === "revealing") setPhase("idle");
  }

  const clipPath =
    phase === "covering" || phase === "covered"
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
          phase === "idle" || phase === "covered"
            ? { duration: 0 }
            : { duration: DURATION.curtain, ease: EASE_EXPO_OUT }
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
