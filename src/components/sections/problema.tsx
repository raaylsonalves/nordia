import { Reveal } from "@/components/ui/reveal";

const DORES = [
  {
    n: "01",
    titulo: "Processos manuais",
    texto:
      "Tarefas que alguém refaz toda semana, do mesmo jeito, porque nunca houve tempo de automatizar.",
  },
  {
    n: "02",
    titulo: "Informações espalhadas",
    texto:
      "Planilhas, e-mails e cadernos. O dado existe — só não está onde a decisão acontece.",
  },
  {
    n: "03",
    titulo: "Sistemas que não conversam",
    texto:
      "Duas ferramentas boas que não trocam nada entre si, e uma pessoa no meio copiando de uma para a outra.",
  },
  {
    n: "04",
    titulo: "Tarefas repetitivas",
    texto:
      "Trabalho que consome as horas da equipe sem devolver nada em troca além de mais trabalho.",
  },
];

/**
 * The four costs, as a ruled list rather than a card grid.
 *
 * Same four items, same copy. A 2×2 of rounded boxes gives each one the same
 * weight and reads as a feature grid; a list with the number set apart reads
 * as an index, which is what this is.
 */
export function Problema() {
  return (
    <section id="problema" className="edge py-[clamp(6rem,18vh,11rem)]">
      <div className="shell">
        <Reveal as="p" className="rotulo text-[var(--muted)]">
          O custo
        </Reveal>

        <Reveal
          as="h2"
          delay={80}
          className="titulo mt-8 max-w-[20ch] text-[clamp(2rem,5.5vw,4rem)]"
        >
          O custo não aparece na fatura. Aparece no calendário.
        </Reveal>

        <ul className="mt-[clamp(4rem,11vh,7rem)]">
          {DORES.map((d, i) => (
            <li key={d.n}>
              <Reveal delay={i * 60}>
                <article className="flex flex-col gap-2 border-t border-[var(--border)] py-[clamp(1.5rem,4vh,2.5rem)] sm:flex-row sm:gap-10">
                  <span className="rotulo shrink-0 pt-1 text-flame-500 sm:w-16">
                    {d.n}
                  </span>
                  <h3 className="titulo shrink-0 text-[clamp(1.2rem,2.4vw,1.8rem)] sm:w-[34%]">
                    {d.titulo}
                  </h3>
                  <p className="max-w-[48ch] leading-relaxed text-[var(--muted)]">
                    {d.texto}
                  </p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
