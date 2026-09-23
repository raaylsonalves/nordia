import { Linhas, Placa } from "@/components/motion/linhas";
import { NordiaMark } from "@/components/brand/nordia-mark";

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
 * Cena 03 — o que fazemos.
 *
 * A cena prende e as quatro frentes atravessam a tela na horizontal enquanto
 * a pessoa continua rolando para baixo. É a única seção da página que se
 * percorre de lado, e é de propósito: quatro coisas em fila são uma fila, não
 * uma grade — e ler uma de cada vez é o que a rolagem passa a controlar.
 */
export function Solucoes() {
  return (
    <section
      data-cena
      id="solucoes"
      className="relative flex h-svh flex-col justify-center overflow-hidden bg-ink-950 text-paper"
    >
      <div className="shell edge w-full shrink-0">
        <p className="rotulo text-flame-500">O que fazemos</p>
        <Linhas
          as="h2"
          className="titulo mt-6 max-w-[18ch] text-[clamp(1.8rem,4.6vw,3.4rem)]"
          linhas={["É aí que a Nordia entra."]}
        />
      </div>

      {/* o trilho: mais largo que a tela, conduzido pelo scroll vertical */}
      <div className="mt-[clamp(2.5rem,7vh,4.5rem)] overflow-hidden">
        <div
          data-trilho
          className="gap-[clamp(1.25rem,3vw,2.5rem)] pl-[var(--edge)] pr-[35vw]"
        >
          {FRENTES.map((f, i) => (
            <article
              key={f.titulo}
              className="flex w-[min(76vw,420px)] shrink-0 flex-col border-t border-white/15 pt-6"
            >
              <span className="rotulo text-flame-500">
                {String(i + 1).padStart(2, "0")}
              </span>

              <h3 className="titulo mt-5 text-[clamp(1.5rem,3vw,2.2rem)]">
                {f.titulo}
              </h3>

              <Placa
                de={i % 2 === 0 ? "baixo" : "esquerda"}
                className="mt-7 aspect-[4/3] w-full"
              >
                <div
                  className="relative flex h-full w-full flex-col justify-between bg-ink-900 p-6"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(108deg, rgba(247,75,1,.4) 0 2px, transparent 2px 22px)",
                  }}
                >
                  <span className="rotulo text-paper/55">NORDIA / {String(i + 1).padStart(2, "0")}</span>
                  <NordiaMark className="h-16 w-auto self-end" light="var(--color-paper)" dark="var(--color-flame-500)" />
                  <span className="rotulo max-w-[18ch] text-paper/55">SOLUÇÃO FEITA PARA O SEU PROCESSO</span>
                </div>
              </Placa>

              <p className="mt-6 leading-relaxed text-ink-300">{f.texto}</p>

              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5">
                {f.entregas.map((e) => (
                  <li key={e} className="rotulo text-ink-400">
                    {e}
                  </li>
                ))}
              </ul>
            </article>
          ))}

          {/* fecho do trilho: o convite, já no fim da fila */}
          <div className="flex w-[min(70vw,360px)] shrink-0 items-center">
            <a
              href="#conversar"
              className="group inline-flex items-center gap-3 text-[0.95rem]"
            >
              <span className="border-b border-current pb-1">
                Vamos conversar
              </span>
              <span
                aria-hidden="true"
                className="text-flame-500 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
