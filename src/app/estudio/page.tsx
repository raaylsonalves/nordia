import type { Metadata } from "next";
import { ProximityWord } from "@/components/brand/proximity-word";
import { DecryptText } from "@/components/ui/decrypt-text";

export const metadata: Metadata = {
  title: "Estúdio",
  description:
    "Estúdio de tecnologia em Fortaleza. Sistemas sob medida para quem já cresceu além das planilhas.",
};

/**
 * 03 — Estúdio. The facts as a data list rather than prose: it is both shorter
 * to read and honest about what is still missing. The two blanks are marked as
 * blanks on purpose — an invented founding year or team is worse than none.
 */
const FATOS = [
  { rotulo: "Base", valor: "Fortaleza, CE" },
  { rotulo: "Fundação", valor: "ano — a preencher", vazio: true },
  { rotulo: "Time", valor: "nomes — a preencher", vazio: true },
  { rotulo: "Projetos no ar", valor: "02" },
  { rotulo: "Contato", valor: "nordia@nordiatech.com.br" },
];

export default function Estudio() {
  return (
    <section className="relative flex h-full flex-col justify-center px-[var(--gutter)]">
      <div className="grid items-center gap-[clamp(2rem,6vw,5rem)] lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h1 className="text-display text-[clamp(2.2rem,7vw,5rem)] leading-[0.92]">
            <ProximityWord>Somos</ProximityWord>
            <br />
            <ProximityWord className="text-flame-500" enterDelay={120}>
              poucos
            </ProximityWord>
            <br />
            <ProximityWord enterDelay={240}>de propósito.</ProximityWord>
          </h1>

          <DecryptText className="mt-7 block max-w-[44ch] font-mono text-sm text-ink-300">
            Estúdio de tecnologia em Fortaleza. Sistemas sob medida para quem já
            cresceu além das planilhas.
          </DecryptText>
        </div>

        <dl className="border-t border-white/12">
          {FATOS.map((f) => (
            <div
              key={f.rotulo}
              className="flex items-baseline justify-between gap-4 border-b border-white/12 py-4"
            >
              <dt className="font-mono text-[0.68rem] tracking-[0.14em] text-ink-600 uppercase">
                {f.rotulo}
              </dt>
              <dd
                className={
                  f.vazio
                    ? "rounded-lg border border-dashed border-flame-500/50 px-2.5 py-1 font-mono text-xs text-flame-400"
                    : "font-display text-[1.05rem] font-bold tracking-tight"
                }
              >
                {f.valor}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
