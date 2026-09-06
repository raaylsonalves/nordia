import { Linhas } from "@/components/motion/linhas";

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
 * Cena 02 — o custo.
 *
 * A palavra "CUSTO" corre atrás da lista, muito mais devagar que ela: as duas
 * camadas ocupam a mesma faixa e se cruzam durante a rolagem. É de onde vem a
 * profundidade — não de sombra, mas de duas velocidades no mesmo espaço.
 */
export function Problema() {
  return (
    <section
      data-cena
      id="problema"
      className="relative overflow-hidden py-[clamp(6rem,18vh,11rem)]"
    >
      {/* camada de trás: enorme, lenta, cortada pela borda */}
      <span
        data-lento
        aria-hidden="true"
        className="titulo pointer-events-none absolute -top-[4vh] -left-[3vw] z-0 text-[22vw] leading-none text-[var(--foreground)] opacity-[0.045] select-none"
      >
        custo
      </span>

      <div className="shell edge relative z-10">
        <p data-rapido className="rotulo text-[var(--muted)]">
          O custo
        </p>

        <Linhas
          as="h2"
          className="titulo mt-8 max-w-[20ch] text-[clamp(2rem,5.5vw,4rem)]"
          linhas={["O custo não aparece na fatura.", "Aparece no calendário."]}
        />

        <ul data-medio className="mt-[clamp(4rem,11vh,7rem)]">
          {DORES.map((d) => (
            <li key={d.n}>
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
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
