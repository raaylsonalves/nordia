"use client";

import ScrollStack, { ScrollStackItem } from "@/components/ui/scroll-stack";

/**
 * Trabalhos — the portfolio block.
 *
 * The cards stack as you scroll: each one pins near the top of the viewport
 * while the next slides up and covers it. With only a couple of projects that
 * reads as deliberate rather than thin, which is exactly the situation here.
 *
 * Copy below is drawn from each project's own site. The `resultado` line is
 * intentionally the one thing left blank — put a real, checkable number there
 * (hours saved, spend recovered, leads) or drop the line entirely. A made-up
 * metric is worse than no metric.
 */

type Caso = {
  numero: string;
  nome: string;
  url: string;
  /** One line: what the product is. */
  resumo: string;
  /** What NORDIA actually built. */
  entrega: string;
  tags: string[];
  /** TODO: replace with a real, verifiable outcome, or leave undefined. */
  resultado?: string;
  status?: string;
  /** Two brand-adjacent stops used for the card's own field. */
  cor: [string, string];
};

const CASOS: Caso[] = [
  {
    numero: "01",
    nome: "ClickObserve",
    url: "https://clickobserve.com.br",
    resumo:
      "Proteção de tráfego pago: detecta bots, VPNs e proxies em tempo real e bloqueia os IPs direto na conta do Google Ads.",
    entrega:
      "Plataforma completa — painel de análise em tempo real, motor de detecção e integração com a API do Google Ads.",
    tags: ["Produto SaaS", "Next.js", "Google Ads API", "Tempo real"],
    status: "Em desenvolvimento",
    cor: ["#F97316", "#EF4444"],
  },
  {
    numero: "02",
    nome: "Selecting Motors",
    url: "https://selectingmotors.com.br",
    resumo:
      "Concessionária premium em Fortaleza/CE, com uma seleção de veículos diferenciados, SUVs, nacionais e importados.",
    entrega:
      "Vitrine digital com catálogo de veículos, páginas otimizadas para busca e contato direto pelo WhatsApp.",
    tags: ["Site institucional", "Catálogo", "SEO local"],
    status: "Em desenvolvimento",
    cor: ["#fb793c", "#7a220c"],
  },
];

function Card({ caso }: { caso: Caso }) {
  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[40px] border border-white/10 bg-ink-900 p-8 sm:p-12">
      {/* the card's own light source, tinted per project */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-32 h-[28rem] w-[28rem] rounded-full opacity-40 blur-3xl"
        style={{
          background: `radial-gradient(circle, ${caso.cor[0]} 0%, ${caso.cor[1]} 45%, transparent 70%)`,
        }}
      />

      <div className="relative flex items-start justify-between gap-6">
        <div>
          <span className="font-display text-sm font-bold tracking-[0.2em] text-flame-500">
            {caso.numero}
          </span>
          <h3 className="text-display mt-3 text-[clamp(1.9rem,4.2vw,3.2rem)] leading-[0.95] text-white">
            {caso.nome}
          </h3>
        </div>
        {caso.status && (
          <span className="shrink-0 rounded-full border border-white/20 px-3 py-1.5 text-xs font-medium text-white/70">
            {caso.status}
          </span>
        )}
      </div>

      <div className="relative mt-8 grid gap-6 sm:grid-cols-2">
        <p className="text-[0.95rem] leading-relaxed text-white/75">
          {caso.resumo}
        </p>
        <div>
          <p className="eyebrow text-white/40">O que construímos</p>
          <p className="mt-2 text-[0.95rem] leading-relaxed text-white/75">
            {caso.entrega}
          </p>
        </div>
      </div>

      {caso.resultado && (
        <p className="relative mt-6 font-display text-lg font-semibold text-flame-400">
          {caso.resultado}
        </p>
      )}

      <div className="relative mt-8 flex flex-wrap items-center justify-between gap-4">
        <ul className="flex flex-wrap gap-2">
          {caso.tags.map((t) => (
            <li
              key={t}
              className="rounded-full bg-white/[0.06] px-3 py-1.5 text-xs text-white/60"
            >
              {t}
            </li>
          ))}
        </ul>
        <a
          href={caso.url}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-flame-400"
        >
          {caso.url.replace("https://", "")}
          <span
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </a>
      </div>
    </div>
  );
}

export function Trabalhos() {
  return (
    <section id="trabalhos" className="relative bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <p className="eyebrow text-flame-500">Trabalhos</p>
        <h2 className="text-display mt-4 max-w-3xl text-[clamp(2rem,5vw,3.5rem)] text-white">
          O que já está no ar.
        </h2>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/60">
          Poucos projetos, escolhidos a dedo. Cada um resolve um problema
          concreto de um negócio real.
        </p>
      </div>

      <ScrollStack
        useWindowScroll
        className="mt-4"
        itemDistance={80}
        itemStackDistance={24}
        itemScale={0.02}
        baseScale={0.9}
        stackPosition="22%"
        blurAmount={0.6}
      >
        {CASOS.map((caso) => (
          <ScrollStackItem key={caso.nome}>
            <Card caso={caso} />
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  );
}
