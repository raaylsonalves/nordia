"use client";

import { useRef, useState } from "react";

/**
 * The project list. Each row fills with flame on hover and a tinted panel
 * follows the pointer — enough to make two entries feel like a portfolio.
 *
 * Copy comes from each project's own site. Nothing here claims a result,
 * because there isn't a measured one to claim yet.
 */

const PROJETOS = [
  {
    numero: "01",
    nome: "ClickObserve",
    nota: "Proteção de tráfego pago · SaaS",
    url: "https://clickobserve.com.br",
    cor: "#F97316",
  },
  {
    numero: "02",
    nome: "Selecting Motors",
    nota: "Concessionária premium · Fortaleza",
    url: "https://selectingmotors.com.br",
    cor: "#FB793C",
  },
];

export function WorkRows() {
  const wrap = useRef<HTMLDivElement>(null);
  const peek = useRef<HTMLDivElement>(null);
  const [ativo, setAtivo] = useState<string | null>(null);

  // written straight to the node: a pointer move must not re-render the list
  const move = (e: React.PointerEvent) => {
    const box = wrap.current;
    const node = peek.current;
    if (!box || !node) return;
    const r = box.getBoundingClientRect();
    node.style.left = `${e.clientX - r.left}px`;
    node.style.top = `${e.clientY - r.top}px`;
  };

  const atual = PROJETOS.find((p) => p.nome === ativo);

  return (
    <div ref={wrap} className="relative border-t border-white/12">
      {PROJETOS.map((p) => (
        <a
          key={p.nome}
          href={p.url}
          target="_blank"
          rel="noreferrer"
          onPointerEnter={() => setAtivo(p.nome)}
          onPointerLeave={() => setAtivo(null)}
          onPointerMove={move}
          className="group relative block overflow-hidden border-b border-white/12 py-[clamp(1.4rem,4.5vh,2.6rem)]"
        >
          <span className="absolute inset-0 origin-bottom scale-y-0 bg-flame-500 transition-transform duration-[450ms] ease-[cubic-bezier(.4,0,.2,1)] group-hover:origin-top group-hover:scale-y-100 group-focus-visible:origin-top group-focus-visible:scale-y-100" />

          <span className="relative flex items-baseline gap-6 transition-[color,transform] duration-[450ms] ease-[cubic-bezier(.4,0,.2,1)] group-hover:translate-x-5 group-hover:text-black">
            <span className="shrink-0 font-mono text-xs text-flame-500 transition-colors group-hover:text-black">
              {p.numero}
            </span>
            <span className="text-display text-[clamp(1.9rem,7vw,4.6rem)]">
              {p.nome}
            </span>
            <span className="ml-auto hidden font-mono text-xs tracking-[0.08em] whitespace-nowrap text-ink-600 transition-colors group-hover:text-black/70 sm:block">
              {p.nota}
            </span>
          </span>
        </a>
      ))}

      <div
        ref={peek}
        aria-hidden="true"
        className={`pointer-events-none absolute z-20 hidden aspect-[4/3] w-[min(30vw,320px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-white/12 transition-opacity duration-300 lg:block ${
          atual ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: atual
            ? `linear-gradient(150deg, ${atual.cor}, var(--color-flame-900))`
            : undefined,
        }}
      >
        <span className="absolute inset-0 grid place-items-center font-mono text-[0.68rem] tracking-[0.18em] text-black/75 uppercase">
          {atual?.nome}
        </span>
      </div>
    </div>
  );
}
