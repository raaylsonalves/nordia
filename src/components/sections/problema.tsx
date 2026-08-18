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

export function Problema() {
  return (
    <section id="problema" className="bg-ink-950 py-24 text-paper sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <h2 className="text-display max-w-3xl text-[clamp(1.9rem,4.4vw,3.1rem)]">
            O custo não aparece na fatura.
            <span className="block text-ink-300">Aparece no calendário.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2">
          {DORES.map((d, i) => (
            <Reveal key={d.n} delay={i * 0.06}>
              <article className="h-full bg-ink-950 p-8 sm:p-10">
                <span className="font-display text-sm font-bold text-flame-500">
                  {d.n}
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold">
                  {d.titulo}
                </h3>
                <p className="mt-3 leading-relaxed text-ink-300">{d.texto}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
