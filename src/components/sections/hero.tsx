import { Linhas, Placa } from "@/components/motion/linhas";
import { NordiaMark } from "@/components/brand/nordia-mark";

/**
 * Cena 01 — abertura.
 *
 * A cena prende no topo e o conteúdo continua andando enquanto ela está
 * presa: o título sobe linha a linha, a placa abre por máscara e assenta de
 * uma escala maior, e a faixa de metadados corre mais rápido que o resto. A
 * placa e o texto ocupam a mesma faixa da tela de propósito — é a composição
 * sobreposta da referência, não duas colunas lado a lado.
 *
 * Ainda não existem fotos dos projetos, então a placa carrega o material da
 * própria marca: a diagonal do "N" repetida. A geometria da composição é
 * real; só o conteúdo dela é provisório.
 */

const FRENTES = [
  "Sistemas sob medida",
  "Integrações",
  "Automações",
  "Ferramentas digitais",
];

export function Hero() {
  return (
    <section
      data-cena="pin"
      className="relative h-svh overflow-hidden"
      aria-label="Início"
    >
      <div
        data-preso-conteudo
        className="edge flex h-full flex-col justify-between pt-[clamp(7rem,17vh,10rem)] pb-[clamp(2rem,6vh,3.5rem)]"
      >
        <div className="shell relative w-full">
          {/* a placa entra por trás do título e sai pela direita do trilho */}
          <Placa
            de="baixo"
            className="pointer-events-none absolute top-[38%] right-[-7vw] z-0 hidden aspect-[3/4] w-[min(24vw,290px)] lg:block"
          >
            <div
              data-lento
              className="h-full w-full bg-ink-900"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(108deg, rgba(247,75,1,.55) 0 2px, transparent 2px 26px)",
              }}
            >
              <span className="sr-only">
                Espaço reservado para imagem de projeto
              </span>
            </div>
          </Placa>

          <p data-sai className="rotulo relative z-10 text-[var(--muted)]">
            Tecnologia com propósito
          </p>

          <Linhas
            as="h1"
            className="titulo relative z-10 mt-[clamp(2rem,6vh,3.25rem)] max-w-[15ch] text-[clamp(2.6rem,7.4vw,6rem)]"
            linhas={["Seu negócio não precisa", "de mais tecnologia."]}
          />

          <div
            data-medio
            className="relative z-10 mt-[clamp(1.5rem,4vh,2.25rem)] max-w-[46ch] leading-relaxed text-[var(--muted)]"
          >
            Precisa da tecnologia certa. Processos manuais, informações
            espalhadas e sistemas que não conversam entre si consomem tempo e
            energia que deveriam estar fazendo o negócio crescer.
          </div>

          <div
            data-rapido
            className="relative z-10 mt-[clamp(1.75rem,4.5vh,2.5rem)]"
          >
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

        {/* rodapé da cena: as frentes e a marca */}
        <div data-sai className="shell w-full">
          <span className="block h-px w-full bg-[var(--foreground)] opacity-10" />
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5 pt-5">
            <ul className="flex flex-wrap gap-x-8 gap-y-2">
              {FRENTES.map((f) => (
                <li key={f} className="rotulo text-[var(--muted)]">
                  {f}
                </li>
              ))}
            </ul>
            <NordiaMark
              className="h-[clamp(2rem,4vw,3rem)] w-auto"
              light="var(--color-paper-dim)"
              dark="var(--color-ink-900)"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
