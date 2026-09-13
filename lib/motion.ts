// Shared motion constants — single source of truth so every animated
// component (Home entrance, page transitions, scroll-reveal) uses the
// same timing/easing language instead of one-off values scattered in JSX.

// ---------------------------------------------------------------------
// Home entrance (Apple HIG — content appearing on screen)
// Duration 250–350ms, small vertical offset (≤ ~20px), soft spring
// (damping 0.7–0.9 equivalent, no perceptible bounce).
// ---------------------------------------------------------------------
export const ENTRANCE_Y = 12; // px
export const ENTRANCE_STAGGER = 0.07; // 70ms between staggered elements (60–80ms range)
export const ENTRANCE_SPRING = { type: "spring", damping: 24, stiffness: 220 } as const;

/** Per-element variants for the Home entrance stagger (header → hero → first image). */
export function entranceItemVariants(reducedMotion: boolean | null) {
  if (reducedMotion) {
    return {
      hidden: { opacity: 1, y: 0 },
      show: { opacity: 1, y: 0, transition: { duration: 0 } },
    };
  }
  return {
    hidden: { opacity: 0, y: ENTRANCE_Y },
    show: { opacity: 1, y: 0, transition: ENTRANCE_SPRING },
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
// Page transitions — Material Design 3 "Shared Axis X"
// Short offset (not a full-screen slide), asymmetric easing: decelerate
// on the way in, accelerate on the way out. Exit is shorter than enter.
// ---------------------------------------------------------------------
export const SHARED_AXIS_DISTANCE = 24; // px
export const SHARED_AXIS_ENTER_DURATION = 0.3; // 300ms — desktop ceiling per Apple HIG
export const SHARED_AXIS_EXIT_DURATION = 0.15; // faster than the entrance, per M3 guidance
export const M3_DECELERATE = [0.2, 0, 0, 1] as const; // entrance easing
export const M3_ACCELERATE = [0.3, 0, 0.8, 0.15] as const; // exit easing

export const REDUCED_MOTION_FADE_DURATION = 0.15;

export function pageTransitionVariants(reducedMotion: boolean | null) {
  if (reducedMotion) {
    return {
      initial: { opacity: 0 },
      animate: {
        opacity: 1,
        transition: { duration: REDUCED_MOTION_FADE_DURATION, ease: "linear" as const },
      },
      exit: {
        opacity: 0,
        transition: { duration: REDUCED_MOTION_FADE_DURATION, ease: "linear" as const },
      },
    };
  }
  return {
    initial: { x: SHARED_AXIS_DISTANCE, opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: SHARED_AXIS_ENTER_DURATION, ease: M3_DECELERATE },
    },
    exit: {
      x: -SHARED_AXIS_DISTANCE,
      opacity: 0,
      transition: { duration: SHARED_AXIS_EXIT_DURATION, ease: M3_ACCELERATE },
    },
  };
}
