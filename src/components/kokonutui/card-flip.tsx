"use client";

/**
 * Card Flip — Kokonut UI (MIT), adapted for NORDIA.
 *
 * @author: @dorianbaffier
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 *
 * Changes from upstream, all deliberate — re-running `shadcn add card-flip`
 * would overwrite them:
 *  - zinc/tailwind-orange palette swapped for the brand tokens (tailwind's
 *    orange-500 is #f97316; the NORDIA flame is #f74b01 — they clash side by side)
 *  - dropped `max-w-[280px]`, which pinned the card and broke the two-column grid
 *  - flip now also responds to tap and keyboard focus. Upstream flips on hover
 *    only, which leaves the entire back face unreachable on touch devices —
 *    and the back is where the description lives.
 *  - the CTA label is a prop instead of a hardcoded "Start today"
 */

import { ArrowRight, Repeat2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { NordiaMark } from "@/components/brand/nordia-mark";

export interface CardFlipProps {
  title?: string;
  subtitle?: string;
  description?: string;
  features?: string[];
  ctaLabel?: string;
}

export default function CardFlip({
  title = "Sistemas sob medida",
  subtitle = "Construído para o seu processo",
  description = "Software desenhado a partir da sua operação real.",
  features = [],
  ctaLabel = "Falar sobre isso",
}: CardFlipProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="group relative h-[340px] w-full [perspective:2000px]"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onFocus={() => setIsFlipped(true)}
      onBlur={() => setIsFlipped(false)}
      // touch devices never fire hover; without this the back face is dead
      onClick={() => setIsFlipped((v) => !v)}
    >
      <div
        className={cn(
          "relative h-full w-full",
          "[transform-style:preserve-3d]",
          "transition-[transform] duration-500 ease-[cubic-bezier(0.77,0,0.175,1)]",
          "motion-reduce:transition-none",
          isFlipped ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]",
        )}
      >
        {/* Front */}
        <div
          className={cn(
            "absolute inset-0 h-full w-full",
            "[backface-visibility:hidden] [transform:rotateY(0deg)]",
            "overflow-hidden rounded-2xl",
            "border border-[var(--border)]",
            "shadow-lg transition-shadow duration-500 group-hover:shadow-xl",
          )}
        >
          {/* Light face. The card sits on the dark flow field now, so contrast
              comes from the section behind it rather than from the card itself
              — which also means the flame bloom has no job here. */}
          <div className="relative h-full overflow-hidden bg-gradient-to-b from-white to-flame-50">
            {/* The mark, oversized and cropped as a watermark — the same device
                the reference post uses. Replaces upstream's glowing bloom,
                which only reads on a dark face. */}
            <div
              aria-hidden="true"
              className="absolute inset-0 overflow-hidden"
            >
              <NordiaMark
                className="absolute -right-8 -top-6 h-[78%] w-auto opacity-[0.09] transition-transform duration-700 ease-out group-hover:scale-105"
                light="var(--color-flame-500)"
                dark="var(--color-ink-900)"
              />
            </div>
          </div>

          <div className="absolute right-0 bottom-0 left-0 p-6">
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-1.5">
                <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-ink-900 transition-transform duration-500 group-hover:translate-y-[-4px]">
                  {title}
                </h3>
                <p className="line-clamp-2 text-sm text-ink-400 transition-transform delay-[50ms] duration-500 group-hover:translate-y-[-4px]">
                  {subtitle}
                </p>
              </div>
              <div className="group/icon relative shrink-0">
                <div className="absolute inset-[-8px] rounded-lg bg-gradient-to-br from-flame-500/20 via-flame-500/10 to-transparent transition-opacity duration-300" />
                <Repeat2
                  aria-hidden="true"
                  className="relative z-10 h-4 w-4 text-flame-600 transition-transform duration-300 group-hover/icon:-rotate-12 group-hover/icon:scale-110"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className={cn(
            "absolute inset-0 h-full w-full",
            "[backface-visibility:hidden] [transform:rotateY(180deg)]",
            "rounded-2xl p-6",
            "bg-[var(--surface)]",
            "border border-flame-500/40",
            "shadow-xs transition-shadow duration-500 group-hover:shadow-lg",
            "flex flex-col",
          )}
        >
          <div className="flex-1 space-y-5">
            <div className="space-y-2">
              <h3 className="font-display text-lg font-semibold leading-snug tracking-tight">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--muted)]">
                {description}
              </p>
            </div>

            {features.length > 0 && (
              <div className="space-y-2">
                {features.map((feature, index) => (
                  <div
                    className="flex items-center gap-2 text-sm transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
                    key={feature}
                    style={{
                      transform: isFlipped
                        ? "translateX(0)"
                        : "translateX(-10px)",
                      opacity: isFlipped ? 1 : 0,
                      transitionDelay: `${index * 50 + 150}ms`,
                    }}
                  >
                    <ArrowRight
                      aria-hidden="true"
                      className="h-3 w-3 shrink-0 text-flame-600"
                    />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 border-t border-[var(--border)] pt-5">
            <a
              href="#conversar"
              className={cn(
                "group/start relative flex w-full items-center justify-between",
                "-m-3 rounded-xl p-3",
                "transition-[transform,background] duration-300",
                "hover:bg-flame-50",
                "hover:scale-[1.02] active:scale-[0.98]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flame-500 focus-visible:ring-offset-2",
              )}
            >
              <span className="font-medium text-sm transition-colors duration-300 group-hover/start:text-flame-600">
                {ctaLabel}
              </span>
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 text-flame-600 transition-transform duration-300 group-hover/start:translate-x-0.5"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
