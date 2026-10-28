export const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;

export const SOFT_SPRING = {
  type: "spring",
  stiffness: 115,
  damping: 22,
  mass: 0.8,
} as const;

export const CURSOR_SPRING = {
  type: "spring",
  stiffness: 160,
  damping: 22,
  mass: 0.6,
} as const;

export const BOUNCY_SPRING = {
  type: "spring",
  stiffness: 260,
  damping: 18,
} as const;

export const SCROLL_SPRING = {
  stiffness: 105,
  damping: 28,
  mass: 0.65,
  restDelta: 0.0005,
} as const;

export const VIEWPORT_ONCE = {
  once: true,
  margin: "-8% 0px -8% 0px",
} as const;

export const FADE_UP_VARIANTS = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: LUXURY_EASE,
    },
  },
};

export const STAGGER_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.06,
    },
  },
};

export const CARD_3D_PERSPECTIVE = {
  hidden: { opacity: 0, y: 34, scale: 0.97, rotateX: 5 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: LUXURY_EASE,
    },
  },
};
