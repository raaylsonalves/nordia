"use client";

import { motion } from "motion/react";
import {
  NORDIA_PATH_DARK,
  NORDIA_PATH_LIGHT,
} from "@/components/brand/nordia-mark";

/**
 * The two halves drift in from opposite sides and lock together — the whole
 * pitch in one gesture: two things that finally fit.
 *
 * On black the ink half would vanish, so it carries the flame instead.
 */
export function AssemblingMark({ className }: { className?: string }) {
  const ease = [0.4, 0, 0.2, 1] as const;
  const shared = { duration: 1.1, ease, delay: 0.15 };

  return (
    <svg viewBox="0 0 320 414" fill="none" aria-hidden="true" className={className}>
      <motion.path
        data-motion
        d={NORDIA_PATH_LIGHT}
        fill="var(--color-paper)"
        initial={{ x: -90, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={shared}
      />
      <motion.path
        data-motion
        d={NORDIA_PATH_DARK}
        fill="var(--color-flame-500)"
        initial={{ x: 90, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={shared}
      />
    </svg>
  );
}
