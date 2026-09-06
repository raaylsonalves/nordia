"use client";

import { useEffect, useState } from "react";
import { NordiaMark } from "@/components/brand/nordia-mark";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#problema", rotulo: "O problema" },
  { href: "#solucoes", rotulo: "O que fazemos" },
  { href: "#conversar", rotulo: "Contato" },
];

/**
 * The bar. A mark, three words, a hairline.
 *
 * It used to be a pill navbar sliding a highlight between items over a solid
 * orange bar — a gesture a product dashboard makes. The one move borrowed from
 * the reference is the wordmark collapsing to the glyph once you start
 * reading: past the first screen the brand only needs to be present, not
 * announced. The scroll spy stayed, as a dot rather than a capsule.
 */
export function Header() {
  const [rolou, setRolou] = useState(false);
  const [ativo, setAtivo] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setRolou(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll spy: the highlight should follow where the reader actually is, not
  // only what they last clicked. rootMargin biases the "current" section to the
  // upper part of the viewport, under the fixed bar.
  useEffect(() => {
    const secoes = LINKS.map((l) => document.querySelector(l.href)).filter(
      (el): el is Element => el !== null,
    );
    if (secoes.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visivel = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];
        if (visivel?.target.id) setAtivo(`#${visivel.target.id}`);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    for (const s of secoes) obs.observe(s);
    return () => obs.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,padding,border-color] duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
        rolou
          ? "border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--background)_85%,transparent)] py-3 backdrop-blur-md"
          : "border-b border-transparent py-6",
      )}
    >
      <div className="shell edge flex items-center justify-between gap-6">
        <a
          href="#"
          aria-label="NORDIA — início"
          className="flex shrink-0 items-center gap-2.5"
        >
          <NordiaMark
            className="h-5 w-auto"
            light="var(--color-paper-dim)"
            dark="var(--color-flame-500)"
          />
          <span
            className={cn(
              "overflow-hidden font-display text-[0.95rem] font-bold tracking-tight whitespace-nowrap transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
              rolou ? "max-w-0 opacity-0" : "max-w-[7rem] opacity-100",
            )}
          >
            NORDIA
          </span>
        </a>

        <nav className="hidden items-center gap-7 sm:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={ativo === l.href ? "true" : undefined}
              className={cn(
                "rotulo flex items-center gap-2 transition-colors duration-300",
                ativo === l.href
                  ? "text-[var(--foreground)]"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "size-1 rounded-full bg-flame-500 transition-opacity duration-300",
                  ativo === l.href ? "opacity-100" : "opacity-0",
                )}
              />
              {l.rotulo}
            </a>
          ))}
        </nav>

        <a
          href="#conversar"
          className="rotulo rounded-full bg-ink-900 px-4 py-2 text-paper sm:hidden"
        >
          Contato
        </a>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="edge pb-[clamp(2rem,6vh,3.5rem)]">
      <div className="shell flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <p className="rotulo text-[var(--muted)]">Fortaleza · CE · Brasil</p>
        <p className="rotulo text-[var(--muted)]">
          &copy; {new Date().getFullYear()} NORDIA
        </p>
      </div>
    </footer>
  );
}
