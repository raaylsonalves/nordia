import { Linhas } from "@/components/motion/linhas";

const OBJETIVOS = [
  "resolver problemas",
  "otimizar processos",
  "transformar desafios em oportunidades",
];

/**
 * Cena 04 — a passagem.
 *
 * A troca entre o escuro e o claro acontece dentro desta cena, não no corte
 * entre duas seções: uma folha clara sobe por máscara na metade de baixo e
 * entrega a página já clara para o contato. Uma cena substituindo a outra.
 *
 * A folha ocupa só a faixa inferior, e nenhum texto fica em cima dela. Um
 * painel que passasse por baixo do texto exigiria inverter a cor no meio do
 * caminho, e existe sempre um instante em que essa inversão deixa a frase
 * ilegível.
 */
export function Proposito() {
  return (
    <section
      data-cena
      className="relative overflow-hidden bg-ink-950 pt-[clamp(7rem,20vh,12rem)] text-paper"
    >
      <div className="shell edge relative z-10">
        <p data-rapido className="rotulo text-ink-300">
          Propósito
        </p>

        <div
          data-medio
          className="mt-8 max-w-[34ch] text-[clamp(1.1rem,2vw,1.4rem)] leading-snug text-ink-300"
        >
          Nosso objetivo é simples: usar a tecnologia para
        </div>

        <ul className="mt-10 max-w-[30ch]">
          {OBJETIVOS.map((o, i) => (
            <li key={o}>
              <span className="flex items-baseline gap-6 border-b border-white/15 py-4">
                <span className="rotulo text-flame-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="titulo text-[clamp(1.3rem,3.2vw,2.2rem)]">
                  {o}
                </span>
              </span>
            </li>
          ))}
        </ul>

        <Linhas
          as="p"
          className="titulo mt-[clamp(4rem,12vh,8rem)] max-w-[16ch] text-[clamp(2rem,6vw,4.5rem)]"
          linhas={["Tecnologia com propósito,", "feita para o seu negócio."]}
        />
      </div>

      {/* a folha clara que sobe e entrega a página já clara para o contato */}
      <div className="relative mt-[clamp(5rem,14vh,9rem)] h-[clamp(6rem,18vh,11rem)]">
        <div
          data-fundo
          aria-hidden="true"
          className="absolute inset-0 bg-[var(--background)]"
        />
      </div>
    </section>
  );
}
