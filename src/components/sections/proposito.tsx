import { Reveal } from "@/components/ui/reveal";

const OBJETIVOS = [
  "resolver problemas",
  "otimizar processos",
  "transformar desafios em oportunidades",
];

/**
 * The breath between the index and the invitation.
 *
 * The most minimal section on the page on purpose: after four fronts and four
 * costs, the reader needs somewhere to put their eyes down.
 */
export function Proposito() {
  return (
    <section className="edge py-[clamp(7rem,22vh,13rem)]">
      <div className="shell">
        <Reveal as="p" className="rotulo text-[var(--muted)]">
          Propósito
        </Reveal>

        <Reveal
          delay={80}
          className="mt-8 max-w-[34ch] text-[clamp(1.1rem,2vw,1.4rem)] leading-snug text-[var(--muted)]"
        >
          Nosso objetivo é simples: usar a tecnologia para
        </Reveal>

        <ul className="mt-10 max-w-[30ch]">
          {OBJETIVOS.map((o, i) => (
            <li key={o}>
              <Reveal delay={i * 70}>
                <span className="flex items-baseline gap-6 border-b border-[var(--border)] py-4">
                  <span className="rotulo text-flame-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="titulo text-[clamp(1.3rem,3.2vw,2.2rem)]">
                    {o}
                  </span>
                </span>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal
          as="p"
          delay={120}
          className="titulo mt-[clamp(4rem,12vh,8rem)] max-w-[16ch] text-[clamp(2rem,6vw,4.5rem)]"
        >
          Tecnologia com propósito, feita para o seu negócio.
        </Reveal>
      </div>
    </section>
  );
}
