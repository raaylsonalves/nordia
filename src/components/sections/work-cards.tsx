"use client";

import dynamic from "next/dynamic";

/**
 * The project cards.
 *
 * This page scrolls while the other two hold a single screen — the exception
 * is the point: it is the only page whose content is meant to grow. Each card
 * has slots for what is known today and marked gaps for what isn't; filling
 * `resultado` with a real number is what turns this page into proof.
 */

const DriftWall = dynamic(() => import("@/components/backgrounds/drift-wall"), {
  ssr: false,
});

type Caso = {
  numero: string;
  nome: string;
  resumo: string;
  entrega: string;
  tags: string[];
  url: string;
  status: string;
  /** A real, checkable outcome — or nothing at all. */
  resultado?: string;
  cor: string;
};

const CASOS: Caso[] = [
  {
    numero: "01",
    nome: "ClickObserve",
    resumo:
      "Proteção de tráfego pago: detecta bots, VPNs e proxies em tempo real e bloqueia os IPs direto na conta do Google Ads.",
    entrega:
      "Plataforma completa — painel de análise em tempo real, motor de detecção e integração com a API do Google Ads.",
    tags: ["Produto SaaS", "Next.js", "Google Ads API", "Tempo real"],
    url: "https://clickobserve.com.br",
    status: "Em desenvolvimento",
    cor: "#F97316",
  },
  {
    numero: "02",
    nome: "Selecting Motors",
    resumo:
      "Concessionária premium em Fortaleza/CE, com uma seleção de veículos diferenciados, SUVs, nacionais e importados.",
    entrega:
      "Vitrine digital com catálogo de veículos, páginas otimizadas para busca e contato direto pelo WhatsApp.",
    tags: ["Site institucional", "Catálogo", "SEO local"],
    url: "https://selectingmotors.com.br",
    status: "Em desenvolvimento",
    cor: "#FB793C",
  },
];

/**
 * Tiles for the wall behind the cards. They are generated gradients rather
 * than screenshots — swap `image` for real captures when they exist, which is
 * the only change this needs.
 */
const TILES = Array.from({ length: 12 }, (_, i) => {
  const [a, b] = [
    ["#F74B01", "#7A220C"],
    ["#FB793C", "#98260B"],
    ["#121110", "#F74B01"],
    ["#C02D02", "#121110"],
  ][i % 4];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="600" height="400" fill="url(#g)"/></svg>`;
  return {
    image: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`,
    title: `Nordia ${i + 1}`,
    href: undefined,
  };
});

export function WorkCards() {
  return (
    <div className="relative h-full overflow-y-auto overscroll-contain">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 opacity-25"
      >
        <DriftWall
          items={TILES}
          columns={5}
          speed={26}
          tilt={14}
          turn={-12}
          dim={0.7}
          fade={0.7}
          overlayColor="#050505"
        />
      </div>

      <div className="relative mx-auto grid max-w-5xl gap-4 px-[var(--gutter)] pt-28 pb-24">
        {CASOS.map((c) => (
          <article
            key={c.nome}
            className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-ink-900/80 p-7 backdrop-blur-md transition-colors hover:border-white/25 sm:p-10"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-40 -right-24 h-[26rem] w-[26rem] rounded-full opacity-30 blur-3xl transition-opacity duration-500 group-hover:opacity-50"
              style={{
                background: `radial-gradient(circle, ${c.cor}, transparent 65%)`,
              }}
            />

            <div className="relative flex items-start justify-between gap-5">
              <div>
                <span className="font-mono text-xs tracking-[0.2em] text-flame-500">
                  {c.numero}
                </span>
                <h2 className="text-display mt-2 text-[clamp(1.7rem,4.2vw,2.9rem)]">
                  {c.nome}
                </h2>
              </div>
              <span className="shrink-0 rounded-full border border-white/20 px-3 py-1.5 font-mono text-[0.62rem] tracking-[0.12em] text-ink-300 uppercase">
                {c.status}
              </span>
            </div>

            <div className="relative mt-7 grid gap-5 sm:grid-cols-2">
              <p className="text-[0.95rem] leading-relaxed text-white/70">
                {c.resumo}
              </p>
              <div>
                <p className="font-mono text-[0.62rem] tracking-[0.14em] text-ink-600 uppercase">
                  O que construímos
                </p>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-white/70">
                  {c.entrega}
                </p>
              </div>
            </div>

            {c.resultado ? (
              <p className="relative mt-6 font-display text-lg font-semibold text-flame-400">
                {c.resultado}
              </p>
            ) : (
              <p className="relative mt-6 rounded-xl border border-dashed border-flame-500/40 px-4 py-2.5 font-mono text-xs text-flame-400">
                Resultado — a preencher
              </p>
            )}

            <div className="relative mt-7 flex flex-wrap items-center justify-between gap-4">
              <ul className="flex flex-wrap gap-2">
                {c.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-full bg-white/6 px-3 py-1.5 font-mono text-[0.66rem] text-white/60"
                  >
                    {t}
                  </li>
                ))}
              </ul>
              <a
                href={c.url}
                target="_blank"
                rel="noreferrer"
                className="group/link inline-flex items-center gap-2 border-b border-white/25 pb-1 font-mono text-[0.78rem] transition-colors hover:border-flame-400 hover:text-flame-400"
              >
                {c.url.replace("https://", "")}
                <span className="transition-transform group-hover/link:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </article>
        ))}

        <p className="mt-4 text-center font-mono text-xs tracking-[0.14em] text-ink-600 uppercase">
          mais projetos em breve
        </p>
      </div>
    </div>
  );
}
