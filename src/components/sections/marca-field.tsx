"use client";

import { useEffect, useRef } from "react";

/**
 * The field behind the wordmark: the mark's diagonal, repeated, revealed only
 * where the pointer is. Pure CSS gradients under a radial mask — a shader here
 * would cost a WebGL context for something two gradients already say.
 *
 * The coordinate is written to a custom property on the element rather than to
 * React state, so moving the mouse never triggers a render.
 */
export function MarcaField() {
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = el.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let next: { x: number; y: number } | null = null;

    const apply = () => {
      frame = 0;
      if (!next) return;
      node.style.setProperty("--mx", `${next.x}%`);
      node.style.setProperty("--my", `${next.y}%`);
    };

    const onMove = (e: PointerEvent) => {
      const r = node.getBoundingClientRect();
      next = {
        x: ((e.clientX - r.left) / r.width) * 100,
        y: ((e.clientY - r.top) / r.height) * 100,
      };
      if (!frame) frame = requestAnimationFrame(apply);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div
      ref={el}
      aria-hidden="true"
      className="marca-field pointer-events-none absolute inset-[-20%]"
    />
  );
}
