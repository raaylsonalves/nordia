import type { Metadata } from "next";
import { WorkRows } from "@/components/sections/work-rows";
import { ProximityWord } from "@/components/brand/proximity-word";

export const metadata: Metadata = {
  title: "Trabalhos",
  description:
    "Projetos da NORDIA no ar: ClickObserve, proteção de tráfego pago, e Selecting Motors, concessionária premium em Fortaleza.",
};

/**
 * 02 — Trabalhos. One line per project, and the line itself is the graphic:
 * it fills with flame from the bottom on hover. With two projects, a grid of
 * cards would look empty; a list of two lines looks deliberate.
 */
export default function Trabalhos() {
  return (
    <section className="relative flex h-full flex-col justify-center px-[var(--gutter)]">
      <div className="mb-8 flex items-baseline justify-between gap-4">
        <h1 className="text-display text-[clamp(1.2rem,3vw,1.8rem)]">
          <ProximityWord>Trabalhos</ProximityWord>
        </h1>
        <p className="font-mono text-xs tracking-[0.14em] text-ink-600 uppercase">
          02 projetos · no ar
        </p>
      </div>

      <WorkRows />
    </section>
  );
}
