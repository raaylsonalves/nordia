"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Scroll reveal. Deliberately small: one transform, one opacity, no stagger
 * containers. The page has a lot of text — motion here should be felt, not read.
 *
 * Reduced motion is handled in globals.css via [data-motion], NOT via
 * useReducedMotion(): that hook resolves to null on the server and to the real
 * preference on the client, so branching `initial` on it makes the server and
 * client render different inline styles and hydration fails.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      data-motion
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
