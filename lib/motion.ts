// Linguagem de movimento única do site — todo componente animado lê daqui
// em vez de inventar timing/easing próprios. Princípio: o movimento serve à
// fotografia. Nada de bounce; expo-out e durações entre 0.6s e 1.2s.

export const EASE_EXPO_OUT = [0.22, 1, 0.36, 1] as const;

export const DURATION = {
  /** Fades de parágrafo, legendas. */
  fade: 0.7,
  /** Reveal de imagem (clip-path + scale). */
  reveal: 1.1,
  /** Linhas de título. */
  line: 0.9,
  /** Count-up dos números. */
  count: 1.2,
  /** Cada metade da cortina de transição de página (cobrir / revelar). */
  curtain: 0.7,
  /** Hover em cards (zoom lento). */
  hover: 1.2,
  /** Fade curto que substitui tudo com prefers-reduced-motion. */
  reduced: 0.3,
} as const;

/** Atraso entre linhas de um título. */
export const LINE_STAGGER = 0.06;

/** Deslocamento do parágrafo no fade de entrada. */
export const FADE_Y = 12;

/** Escala inicial da imagem no reveal (1.08 → 1). */
export const REVEAL_SCALE = 1.08;

/** Amplitude do parallax das imagens grandes (±7%). */
export const PARALLAX_RANGE = 7;
