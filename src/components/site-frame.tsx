"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  NORDIA_PATH_DARK,
  NORDIA_PATH_LIGHT,
} from "@/components/brand/nordia-mark";
import { cn } from "@/lib/utils";

/**
 * The chrome that wraps all three pages: the pill nav, the page counter, the
 * grain, and the transition between routes.
 *
 * The transition is the thing that makes three separate routes read as one
 * site — four panels sheared to the mark's own -18°, sweeping up over the old
 * page and back down off the new one. Navigation waits for the sweep to cover
 * the screen before the route actually changes, so the swap is never seen.
 */

const PAGES = [
  { href: "/", rotulo: "Marca" },
  { href: "/trabalhos", rotulo: "Trabalhos" },
  { href: "/estudio", rotulo: "Estúdio" },
] as const;

const SCRAMBLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&/";
const COVER_MS = 620;

/** Nav label that shuffles its letters before settling, on hover. */
function ScrambleLabel({ text }: { text: string }) {
  const [shown, setShown] = useState(text);
  const timer = useRef<number | undefined>(undefined);

  const run = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    window.clearInterval(timer.current);
    let step = 0;
    timer.current = window.setInterval(() => {
      step++;
      setShown(
        text
          .split("")
          .map((c, i) =>
            c === " " || step / 3 > i
              ? c
              : SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)],
          )
          .join(""),
      );
      if (step > text.length * 3) {
        window.clearInterval(timer.current);
        setShown(text);
      }
    }, 26);
  }, [text]);

  useEffect(() => () => window.clearInterval(timer.current), []);

  return <span onPointerEnter={run}>{shown}</span>;
}

export function SiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sweep, setSweep] = useState<"idle" | "in" | "out">("idle");
  const grain = useRef<HTMLCanvasElement>(null);

  const index = Math.max(
    0,
    PAGES.findIndex((p) => p.href === pathname),
  );

  // the whole sequence is driven from the click, not from a pathname effect:
  // cover the screen, swap the route underneath, uncover
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  const navigate = (href: string) => {
    if (href === pathname || sweep !== "idle") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      router.push(href);
      return;
    }
    setSweep("in");
    timers.current.push(
      window.setTimeout(() => {
        router.push(href);
        setSweep("out");
      }, COVER_MS),
      window.setTimeout(() => setSweep("idle"), COVER_MS * 2),
    );
  };

  // static noise, drawn once and stretched — cheaper than a repeating image
  useEffect(() => {
    const c = grain.current;
    if (!c) return;
    const size = 160;
    c.width = size;
    c.height = size;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const img = ctx.createImageData(size, size);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = Math.random() * 255;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
      img.data[i + 3] = 20;
    }
    ctx.putImageData(img, 0, 0);
  }, []);

  return (
    <div className="site-shell">
      <canvas
        ref={grain}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[60] h-full w-full opacity-30 mix-blend-overlay [image-rendering:pixelated]"
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-50 flex items-center justify-between px-[var(--gutter)] py-5">
        <button
          type="button"
          onClick={() => navigate("/")}
          aria-label="NORDIA — início"
          className="pointer-events-auto flex cursor-pointer items-center gap-2.5"
        >
          <svg viewBox="0 0 320 414" aria-hidden="true" className="h-5 w-auto">
            <path d={NORDIA_PATH_LIGHT} fill="var(--color-paper)" />
            <path d={NORDIA_PATH_DARK} fill="var(--color-flame-500)" />
          </svg>
          <b className="font-display text-base font-extrabold tracking-tight">
            NORDIA
          </b>
        </button>

        <nav aria-label="Páginas" className="pointer-events-auto flex">
          {PAGES.map((p) => (
            <button
              key={p.href}
              type="button"
              onClick={() => navigate(p.href)}
              aria-current={pathname === p.href ? "page" : undefined}
              className={cn(
                "relative cursor-pointer rounded-full px-3.5 py-2 font-mono text-xs tracking-[0.1em] uppercase transition-colors",
                "after:absolute after:inset-x-3.5 after:bottom-1 after:h-px after:bg-flame-500 after:opacity-0",
                pathname === p.href
                  ? "text-paper after:opacity-100"
                  : "text-ink-600 hover:text-paper",
              )}
            >
              <ScrambleLabel text={p.rotulo} />
            </button>
          ))}
        </nav>
      </div>

      {children}

      <p className="absolute bottom-5 left-[var(--gutter)] z-50 font-mono text-xs tracking-[0.14em] text-ink-600">
        <b className="font-normal text-flame-500">
          0{Math.min(index + 1, PAGES.length)}
        </b>{" "}
        / 0{PAGES.length}
      </p>

      <Link
        href="mailto:nordia@nordiatech.com.br"
        className="absolute right-[var(--gutter)] bottom-5 z-50 font-mono text-xs tracking-[0.1em] text-ink-600 transition-colors hover:text-paper"
      >
        CONVERSAR ↗
      </Link>

      {/* the sweep, sheared to the mark's angle */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-[-30%_-20%] z-[70] flex [transform:skewX(var(--nordia-shear))]",
          sweep === "in" && "sweep-in",
          sweep === "out" && "sweep-out",
        )}
      >
        <i className="flex-1 origin-bottom scale-y-0 bg-flame-500" />
        <i className="flex-1 origin-bottom scale-y-0 bg-flame-500 [animation-delay:60ms]" />
        <i className="flex-1 origin-bottom scale-y-0 bg-flame-500 [animation-delay:120ms]" />
        <i className="flex-1 origin-bottom scale-y-0 bg-flame-500 [animation-delay:180ms]" />
      </div>
    </div>
  );
}
