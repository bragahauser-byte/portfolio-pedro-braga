// Shared motion constants — single source of truth so every animated
// component (Home entrance, page transitions, scroll-reveal) uses the
// same timing/easing language instead of one-off values scattered in JSX.

// ---------------------------------------------------------------------
// Home entrance (Apple HIG — content appearing on screen)
// The header gets real movement (fade + rise) since it's the one element
// that should feel like it's "arriving"; everything else (hero, project
// cards, footer) only fades softly in place — no element but the header
// should look like it flew in from somewhere.
// ---------------------------------------------------------------------
export const HEADER_ENTRANCE_Y = 16; // px
export const HEADER_ENTRANCE_DURATION = 0.3; // ~300ms
export const CONTENT_ENTRANCE_Y = 6; // px — barely perceptible, just enough to avoid a hard pop
export const CONTENT_ENTRANCE_DURATION = 0.35; // 300-400ms
export const ENTRANCE_STAGGER = 0.07; // 70ms between staggered elements (60-80ms range)
export const ENTRANCE_EASE = [0.22, 1, 0.36, 1] as const; // soft decelerate, no bounce

export type EntranceRole = "header" | "content";

/** Per-element variants for the Home entrance stagger (header → hero → first image → footer). */
export function entranceItemVariants(reducedMotion: boolean | null, role: EntranceRole = "content") {
  if (reducedMotion) {
    return {
      hidden: { opacity: 1, y: 0 },
      show: { opacity: 1, y: 0, transition: { duration: 0 } },
    };
  }
  const y = role === "header" ? HEADER_ENTRANCE_Y : CONTENT_ENTRANCE_Y;
  const duration = role === "header" ? HEADER_ENTRANCE_DURATION : CONTENT_ENTRANCE_DURATION;
  return {
    hidden: { opacity: 0, y },
    show: { opacity: 1, y: 0, transition: { duration, ease: ENTRANCE_EASE } },
  };
}

/** Container variants driving the stagger between entrance children. */
export function entranceContainerVariants(reducedMotion: boolean | null) {
  return {
    hidden: {},
    show: {
      transition: reducedMotion ? {} : { staggerChildren: ENTRANCE_STAGGER },
    },
  };
}

// ---------------------------------------------------------------------
// Page transitions — directional "push/pop" (Home <-> Sobre mim) vs a
// plain crossfade (anything touching a /projetos/[slug] page).
//
// Home <-> Sobre mim behaves like an iOS navigation stack: Sobre mim is
// always the "pushed" screen (enters by sliding in from the right over a
// static Home, exits by sliding back out to the right to reveal a static
// Home) and Home is always the "root" screen (never itself animates,
// whichever direction the nav goes). Both screens are mounted at once
// during the transition — this is NOT a symmetric two-sided slide.
//
// Any transition into or out of a project page ignores all of that and
// just crossfades, regardless of direction.
// ---------------------------------------------------------------------
export type PageTransitionKind = "push" | "pop" | "fade";

const PROJECT_ROUTE_PREFIX = "/projetos";
const PUSHED_ROUTE = "/sobre-mim";

function isProjectRoute(pathname: string): boolean {
  return pathname.startsWith(PROJECT_ROUTE_PREFIX);
}

/**
 * Classifies a navigation by the pair of routes it moves between — not
 * just the destination — since Home <-> Sobre mim needs to know which
 * screen is arriving and which is leaving to pick "push" vs "pop".
 */
export function classifyPageTransition(from: string | null, to: string): PageTransitionKind {
  if (from === null || from === to) return "fade";
  if (isProjectRoute(from) || isProjectRoute(to)) return "fade";
  if (from === "/" && to === PUSHED_ROUTE) return "push";
  if (from === PUSHED_ROUTE && to === "/") return "pop";
  return "fade";
}

const PUSH_POP_DURATION = 0.32; // 300-350ms
const IOS_COVER_EASE = [0.32, 0.72, 0, 1] as const; // Apple's "cover screen" curve
const PROJECT_FADE_DURATION = 0.22; // 200-250ms
const REDUCED_MOTION_FADE_DURATION = 0.15;

// Each page sits in normal document flow once settled ("animate"), and
// only becomes a fixed, viewport-covering overlay while it's actively
// entering or exiting — that's what lets two pages occupy the same screen
// space during the transition without permanently changing how the site
// scrolls the rest of the time. Explicit 0s (not the `inset` shorthand,
// and never "auto") on the overlay side — framer-motion treats inset/top/
// left/etc as animatable lengths and errors trying to tween one to "auto".
// The static side simply omits them: framer-motion never animates a
// property a variant doesn't mention, so any leftover `top/left/right/
// bottom: 0` from a prior overlay phase is just left in place — harmless
// on a `position: relative` box, since equal left/right (or top/bottom)
// offsets of 0 are a no-op there.
const OVERLAY_POSITION = { position: "fixed" as const, top: 0, left: 0, right: 0, bottom: 0 };
const STATIC_POSITION = { position: "relative" as const };

/**
 * Variants for one page's wrapping <motion.div>. `pathname` is this node's
 * OWN route, closed over at render time — a node keeps referring to the
 * route it represents even after being removed from the tree (framer-motion
 * clones a removed child's last element to run its exit animation). The
 * transition `kind` for that already-removed node arrives separately, via
 * AnimatePresence's `custom` prop, since a page can't know in advance what
 * it's about to be replaced by — see PageTransition.tsx.
 */
export function pageMotionVariants(pathname: string, reducedMotion: boolean | null) {
  if (reducedMotion) {
    return {
      initial: { ...OVERLAY_POSITION, opacity: 0, zIndex: 2 },
      animate: {
        ...STATIC_POSITION,
        opacity: 1,
        zIndex: 1,
        transition: { duration: REDUCED_MOTION_FADE_DURATION, ease: "linear" as const },
      },
      exit: {
        ...OVERLAY_POSITION,
        opacity: 0,
        zIndex: 1,
        transition: { duration: REDUCED_MOTION_FADE_DURATION, ease: "linear" as const },
      },
    };
  }

  const isPushedRoute = pathname === PUSHED_ROUTE;

  return {
    initial: (kind: PageTransitionKind) =>
      kind === "fade"
        ? { ...OVERLAY_POSITION, x: 0, opacity: 0, zIndex: 2 }
        : {
            ...OVERLAY_POSITION,
            x: isPushedRoute ? "100%" : 0,
            opacity: 1,
            zIndex: isPushedRoute ? 2 : 1,
          },
    animate: (kind: PageTransitionKind) =>
      kind === "fade"
        ? {
            ...STATIC_POSITION,
            x: 0,
            opacity: 1,
            zIndex: 1,
            transition: { duration: PROJECT_FADE_DURATION, ease: "easeOut" as const },
          }
        : {
            ...STATIC_POSITION,
            x: 0,
            opacity: 1,
            zIndex: isPushedRoute ? 2 : 1,
            transition: { duration: PUSH_POP_DURATION, ease: IOS_COVER_EASE },
          },
    exit: (kind: PageTransitionKind) =>
      kind === "fade"
        ? {
            ...OVERLAY_POSITION,
            x: 0,
            opacity: 0,
            zIndex: 1,
            transition: { duration: PROJECT_FADE_DURATION, ease: "easeOut" as const },
          }
        : isPushedRoute
          ? {
              // Sobre mim exiting (a "pop"): slides back out to the right,
              // revealing the already-static Home underneath.
              ...OVERLAY_POSITION,
              x: "100%",
              opacity: 1,
              zIndex: 2,
              transition: { duration: PUSH_POP_DURATION, ease: IOS_COVER_EASE },
            }
          : {
              // Home exiting (a "push"): stays completely put — it's just
              // covered by Sobre mim sliding in on top of it.
              ...OVERLAY_POSITION,
              x: 0,
              opacity: 1,
              zIndex: 1,
              transition: { duration: PUSH_POP_DURATION, ease: IOS_COVER_EASE },
            },
  };
}
