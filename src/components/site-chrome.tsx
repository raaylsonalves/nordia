"use client";

import { useEffect, useState } from "react";
import { NordiaLockup } from "@/components/brand/nordia-mark";
import { MorphicNavbar } from "@/components/kokonutui/morphic-navbar";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#problema", rotulo: "O problema" },
  { href: "#solucoes", rotulo: "O que fazemos" },
  { href: "#conversar", rotulo: "Contato" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activePath, setActivePath] = useState(LINKS[0].href);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll spy: the highlight should follow where the reader actually is, not
  // only what they last clicked. rootMargin biases the "current" section to the
  // upper part of the viewport, under the fixed bar.
  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(
      (el): el is Element => el !== null,
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible?.target.id) setActivePath(`#${visible.target.id}`);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    for (const s of sections) observer.observe(s);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-flame-600/90 py-3 shadow-lg backdrop-blur-md"
          : "bg-transparent py-6",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 text-white">
        <a href="#" aria-label="NORDIA — início">
          {/* on the orange hero the dark half carries the contrast, not flame */}
          <NordiaLockup light="#ffffff" dark="var(--color-ink-900)" />
        </a>

        <div className="hidden sm:block">
          <MorphicNavbar
            items={Object.fromEntries(
              LINKS.map((l) => [l.href, { name: l.rotulo }]),
            )}
            activePath={activePath}
            defaultPath={LINKS[0].href}
          />
        </div>

        <a
          href="#conversar"
          className="rounded-full bg-ink-900 px-5 py-2.5 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5 sm:hidden"
        >
          Contato
        </a>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--background)] py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 sm:flex-row sm:items-center">
        <NordiaLockup className="text-[var(--foreground)]" />
        <p className="text-sm text-[var(--muted)]">
          &copy; {new Date().getFullYear()} NORDIA. Tecnologia com propósito.
        </p>
      </div>
    </footer>
  );
}
