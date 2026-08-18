import { Reveal } from "@/components/ui/reveal";

const OBJETIVOS = [
  "resolver problemas",
  "otimizar processos",
  "transformar desafios em oportunidades",
];

export function Proposito() {
  return (
    <section className="relative overflow-hidden bg-ink-900 py-24 text-paper sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="max-w-3xl text-[clamp(1.35rem,3vw,1.9rem)] leading-snug">
            Nosso objetivo é simples: usar a tecnologia para{" "}
            {OBJETIVOS.map((o, i) => (
              <span key={o}>
                <span className="text-flame-500">{o}</span>
                {i < OBJETIVOS.length - 2
                  ? ", "
                  : i === OBJETIVOS.length - 2
                    ? " e "
                    : "."}
              </span>
            ))}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-20 border-t border-white/15 pt-12">
            <p className="text-display text-[clamp(2rem,6vw,4rem)]">
              Tecnologia com propósito.
              <span className="block text-flame-500">
                Feita para o seu negócio.
              </span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
