"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * A word whose letters react to how close the pointer is.
 *
 * The obvious implementation — measure every letter on every pointermove and
 * hand the result to a CSS transition — janks badly: each rect read forces a
 * synchronous layout right after the previous write, and the transition is
 * restarted on every event, so the letters stutter instead of following.
 *
 * So: rects are measured once (and on resize / font load), the pointer only
 * records a coordinate, and a single rAF loop eases each letter toward its
 * target. Nothing reads layout inside the loop and no CSS transition is
 * involved, which is what makes it feel attached to the cursor.
 *
 * The entrance and the hover live on two different elements on purpose. A
 * running CSS animation outranks inline styles, so an entrance animating
 * `transform` with `fill: both` would keep overriding the hover forever.
 */

/** How far the pointer's influence reaches, in px. */
const RADIUS = 140;
/** How far the nearest letter rises, in px. */
const LIFT = 22;

const PAPER = [245, 244, 243] as const;
const FLAME = [247, 75, 1] as const;

type Props = {
  children: string;
  className?: string;
  /** Delay before the entrance starts, in ms. */
  enterDelay?: number;
};

export function ProximityWord({ children, className, enterDelay = 0 }: Props) {
  const host = useRef<HTMLSpanElement>(null);
  // the entrance slides letters up from below, so the word clips until it lands
  const [clipped, setClipped] = useState(true);

  useEffect(() => {
    const root = host.current;
    if (!root) return;

    const letters = Array.from(
      root.querySelectorAll<HTMLElement>("[data-letter]"),
    );
    const landed = enterDelay + children.length * 35 + 800;
    const unclip = window.setTimeout(() => setClipped(false), landed);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || letters.length === 0) {
      return () => window.clearTimeout(unclip);
    }

    // measured once; a letter's box only moves when the layout does
    let centers: { x: number; y: number }[] = [];
    const measure = () => {
      centers = letters.map((el) => {
        const r = el.getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      });
    };

    const current = letters.map(() => 0);
    const target = letters.map(() => 0);
    let pointer: { x: number; y: number } | null = null;
    let frame = 0;
    let idle = 0;

    const tick = () => {
      let moving = false;

      for (let i = 0; i < letters.length; i++) {
        if (pointer && centers[i]) {
          const dx = pointer.x - centers[i].x;
          const dy = pointer.y - centers[i].y;
          target[i] = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / RADIUS);
        } else {
          target[i] = 0;
        }

        // ease toward the target instead of jumping to it — this is the whole
        // smoothness of the effect, at the cost of one multiply per letter
        current[i] += (target[i] - current[i]) * 0.18;
        if (Math.abs(target[i] - current[i]) > 0.002) moving = true;

        const k = current[i];
        letters[i].style.transform = `translateY(${(-LIFT * k).toFixed(2)}px)`;
        letters[i].style.color =
          k < 0.01
            ? ""
            : `rgb(${Math.round(PAPER[0] + (FLAME[0] - PAPER[0]) * k)},` +
              `${Math.round(PAPER[1] + (FLAME[1] - PAPER[1]) * k)},` +
              `${Math.round(PAPER[2] + (FLAME[2] - PAPER[2]) * k)})`;
      }

      // keep spinning a few frames past the last change, so a pointer that
      // stops dead still gets its final easing frames
      idle = moving || pointer ? 0 : idle + 1;
      frame = idle > 4 ? 0 : requestAnimationFrame(tick);
    };

    const start = () => {
      idle = 0;
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      pointer = { x: e.clientX, y: e.clientY };
      start();
    };
    const onLeave = () => {
      pointer = null;
      start();
    };

    const settle = window.setTimeout(measure, landed);
    measure();

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    void document.fonts?.ready.then(measure);

    return () => {
      window.clearTimeout(unclip);
      window.clearTimeout(settle);
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [children, enterDelay]);

  return (
    <span
      ref={host}
      aria-label={children}
      className={cn(
        "inline-block align-bottom",
        clipped ? "overflow-hidden" : "overflow-visible",
        className,
      )}
    >
      {children.split("").map((ch, i) => (
        <span
          key={`${ch}-${i}`}
          aria-hidden="true"
          className="inline-block"
          style={{
            animation: `letter-rise .8s cubic-bezier(.16,1,.3,1) ${
              enterDelay + i * 35
            }ms both`,
          }}
        >
          <span data-letter className="inline-block will-change-transform">
            {/* an inline-block collapses a plain space, so spaces are hard */}
            {ch === " " ? " " : ch}
          </span>
        </span>
      ))}
    </span>
  );
}
