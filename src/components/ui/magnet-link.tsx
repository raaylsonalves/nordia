"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

/**
 * A button that leans toward the pointer while it is over it. The pull is
 * capped well under the button's own size — past that it stops reading as
 * magnetism and starts reading as a bug.
 */
export function MagnetLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const el = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const pull = (e: React.PointerEvent) => {
    const node = el.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = node.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.28;
    const y = (e.clientY - r.top - r.height / 2) * 0.38;
    node.style.transform = `translate(${x}px, ${y}px)`;
  };

  const release = () => {
    if (el.current) el.current.style.transform = "";
  };

  return (
    <button
      ref={el}
      type="button"
      onPointerMove={pull}
      onPointerLeave={release}
      onClick={() => router.push(href)}
      className={cn(
        "inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-white/25 px-7 py-4",
        "font-mono text-[0.78rem] tracking-[0.08em] text-paper transition-[transform,background-color,border-color,color] duration-300",
        "hover:border-flame-500 hover:bg-flame-500 hover:text-white",
        className,
      )}
    >
      {children}
      <span aria-hidden="true">↗</span>
    </button>
  );
}
