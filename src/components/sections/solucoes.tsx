import { Reveal } from "@/components/ui/reveal";

const FRENTES = [
  {
    titulo: "Sistemas sob medida",
    texto:
      "Software construído para o seu processo — não o seu processo torcido para caber num software de prateleira.",
    entregas: [
      "Levantamento do processo",
      "Sistema próprio",
      "Suporte contínuo",
    ],
  },
  {
    titulo: "Integrações",
    texto:
      "Fazemos as ferramentas que você já usa trocarem informação entre si, sem ninguém no meio copiando dados.",
    entregas: [
      "APIs e webhooks",
      "Sincronização de dados",
      "Fim da digitação dupla",
    ],
  },
  {
    titulo: "Automações",
    texto:
      "O trabalho repetitivo passa a rodar sozinho, com regra clara e resultado previsível.",
    entregas: ["Rotinas agendadas", "Regras de negócio", "Alertas automáticos"],
  },
  {
    titulo: "Novas soluções",
    texto:
      "Quando não existe pronto, a gente desenha e constrói a partir da necessidade real do negócio.",
    entregas: ["Descoberta do problema", "Protótipo", "Construção sob medida"],
  },
];

/**
 * What the studio does, as an index.
 *
 * This used to be four flip cards over an animated canvas field: the flip hid
 * half the content behind a gesture nobody is obliged to make, and the field
 * ran a full-time animation loop behind text. Everything is on the page now,
 * which also means this no longer needs to be a client component.
 */
export function Solucoes() {
  return (
    <section
      id="solucoes"
      className="edge bg-ink-950 py-[clamp(6rem,18vh,11rem)] text-paper"
    >
      <div className="shell">
        <Reveal as="p" className="rotulo text-flame-500">
          O que fazemos
        </Reveal>

        <Reveal
          as="h2"
          delay={80}
          className="titulo mt-8 max-w-[18ch] text-[clamp(2rem,5.5vw,4rem)]"
        >
          É aí que a Nordia entra.
        </Reveal>

        <Reveal
          delay={140}
          className="mt-7 max-w-[52ch] leading-relaxed text-ink-300"
        >
          Soluções tecnológicas sob medida, de sistemas e integrações a
          automações e ferramentas digitais, pensadas para as necessidades reais
          de cada negócio.
        </Reveal>

        <ul className="mt-[clamp(4rem,11vh,7rem)]">
          {FRENTES.map((f, i) => (
            <li key={f.titulo}>
              <Reveal delay={i * 60}>
                <a
                  href="#conversar"
                  className="group flex flex-col gap-3 border-t border-white/12 py-[clamp(1.6rem,4.5vh,2.8rem)] sm:flex-row sm:gap-10"
                >
                  <span className="rotulo shrink-0 pt-1 text-ink-400 transition-colors duration-300 group-hover:text-flame-500 sm:w-16">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span className="titulo shrink-0 text-[clamp(1.5rem,3.6vw,2.6rem)] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-2 sm:w-[34%]">
                    {f.titulo}
                  </span>

                  <span className="max-w-[48ch]">
                    <span className="block leading-relaxed text-ink-300">
                      {f.texto}
                    </span>
                    <span className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5">
                      {f.entregas.map((e) => (
                        <span key={e} className="rotulo text-ink-400">
                          {e}
                        </span>
                      ))}
                    </span>
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
