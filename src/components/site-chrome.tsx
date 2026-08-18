import { NordiaLockup } from "@/components/brand/nordia-mark";
import { MorphicNavbar } from "@/components/kokonutui/morphic-navbar";

const LINKS = [
  { href: "#problema", rotulo: "O problema" },
  { href: "#solucoes", rotulo: "O que fazemos" },
  { href: "#conversar", rotulo: "Contato" },
];

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 text-white">
        <a href="#" aria-label="NORDIA — início">
          {/* on the orange hero the dark half carries the contrast, not flame */}
          <NordiaLockup light="#ffffff" dark="var(--color-ink-900)" />
        </a>

        <div className="hidden sm:block">
          <MorphicNavbar
            items={Object.fromEntries(
              LINKS.map((l) => [l.href, { name: l.rotulo }]),
            )}
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
