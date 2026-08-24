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
 * The transition never reverses. A translucent veil — tilted to the mark's own
 * angle, so its edge is the brand's diagonal — rises from below, dims the page
 * while the route swaps underneath, then keeps rising off the top. One
 * continuous upward gesture: you half-see through it the whole way.
 *
 * It runs on the Web Animations API rather than CSS classes: the route change
 * is sequenced off `finished`, so the swap can never be seen even if a build
 * is slow to hand over.
 */

const PAGES = [
  { href: "/", rotulo: "Início" },
  { href: "/trabalhos", rotulo: "Trabalhos" },
  { href: "/quem-somos", rotulo: "Quem somos" },
] as const;

const SCRAMBLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&/";
const RISE_MS = 700;
// gentler than the usual UI curve: this one is atmosphere, not feedback
const EASE = "cubic-bezier(.33,0,.15,1)";

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
  const riser = useRef<HTMLDivElement>(null);
  const grain = useRef<HTMLCanvasElement>(null);
  const busy = useRef(false);

  const navigate = async (href: string) => {
    if (href === pathname || busy.current) return;

    const sheet = riser.current;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!sheet || still) {
      router.push(href);
      return;
    }

    busy.current = true;

    const opts = { duration: RISE_MS, easing: EASE, fill: "forwards" as const };
    await sheet.animate(
      [
        { translate: "0 110%", opacity: 0 },
        { translate: "0 40%", opacity: 1, offset: 0.45 },
        { translate: "0 0%", opacity: 1 },
      ],
      opts,
    ).finished;

    router.push(href);
    // one beat for the incoming route to paint under the cover
    await new Promise((r) => window.setTimeout(r, 140));

    await sheet.animate(
      [
        { translate: "0 0%", opacity: 1 },
        { translate: "0 -60%", opacity: 1, offset: 0.55 },
        { translate: "0 -110%", opacity: 0 },
      ],
      opts,
    ).finished;

    // cancel first so no fill survives, then re-arm the resting position by
    // hand — relying on React to restore the inline style left the sheet
    // parked over the page after the route swapped it
    sheet.getAnimations().forEach((a) => a.cancel());
    sheet.style.translate = "0 110%";
    sheet.style.opacity = "0";
    busy.current = false;
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

      <Link
        href="mailto:nordia@nordiatech.com.br"
        className="absolute right-[var(--gutter)] bottom-5 z-50 font-mono text-xs tracking-[0.1em] text-ink-600 transition-colors hover:text-paper"
      >
        CONVERSAR ↗
      </Link>

      {/* the veil: translucent, so the page stays half-visible underneath */}
      <div
        ref={riser}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[-20%] top-[-25%] bottom-[-25%] z-[70] bg-gradient-to-t from-black via-black/85 to-transparent backdrop-blur-md [rotate:-6deg]"
        /*
          Everything here moves through the independent `translate` property,
          never `transform`. Tailwind v4 writes its own values into `transform`
          and into the `--tw-*` chain behind it, and those kept winning over
          both the inline style and the animation — which is exactly why the
          transition was invisible in an earlier build. `rotate` stays separate
          and composes, so the veil keeps the mark's tilt while it travels.
        */
        style={{ translate: "0 110%", opacity: 0 }}
      >
        {/* a single flame line on the leading edge — the only solid colour */}
        <span className="absolute inset-x-0 top-[24%] h-px bg-gradient-to-r from-transparent via-flame-500 to-transparent" />
      </div>
    </div>
  );
}
