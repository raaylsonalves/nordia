import { Mail, MessageCircle } from "lucide-react";
import { Linhas, Placa } from "@/components/motion/linhas";

/** lucide-react dropped its brand glyphs, so the Instagram mark lives here. */
function Instagram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const CANAIS = [
  {
    icone: MessageCircle,
    rotulo: "WhatsApp",
    valor: "(85) 99133-1364",
    href: "https://wa.me/5585991331364",
    externo: true,
  },
  {
    icone: Mail,
    rotulo: "E-mail",
    valor: "nordia@nordiatech.com.br",
    href: "mailto:nordia@nordiatech.com.br",
    externo: false,
  },
  {
    icone: Instagram,
    rotulo: "Instagram",
    valor: "@nordia.solucoes",
    href: "https://www.instagram.com/nordia.solucoes/",
    externo: true,
  },
];

/**
 * Cena 05 — o fecho.
 *
 * A placa fica atrás dos canais e corre mais devagar que eles: os dois
 * ocupam a mesma faixa da tela e se cruzam. Os canais continuam sendo o
 * maior texto da seção — um telefone e um e-mail são o que a pessoa veio
 * buscar.
 */
export function Contato() {
  return (
    <section
      data-cena
      id="conversar"
      className="relative overflow-hidden py-[clamp(6rem,18vh,11rem)]"
    >
      <Placa
        de="direita"
        className="pointer-events-none absolute top-[18%] right-[-8vw] z-0 hidden aspect-square w-[min(38vw,460px)] lg:block"
      >
        <div
          data-lento
          className="h-full w-full bg-paper-dim"
          style={{
            backgroundImage:
              "repeating-linear-gradient(108deg, rgba(18,17,16,.14) 0 1px, transparent 1px 20px)",
          }}
        >
          <span className="sr-only">Espaço reservado para imagem</span>
        </div>
      </Placa>

      <div className="shell edge relative z-10">
        <p data-rapido className="rotulo text-flame-500">
          Contato
        </p>

        <Linhas
          as="h2"
          className="titulo mt-8 max-w-[24ch] text-[clamp(1.6rem,4vw,3rem)]"
          linhas={[
            "Se existe algo na sua empresa",
            "que poderia funcionar melhor,",
            "talvez seja por onde devemos começar.",
          ]}
        />

        <ul data-medio className="mt-[clamp(4rem,12vh,7rem)]">
          {CANAIS.map((c) => {
            const Icone = c.icone;
            return (
              <li key={c.rotulo}>
                <a
                  href={c.href}
                  {...(c.externo
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                  className="group flex flex-col gap-1 border-t border-[var(--border)] py-[clamp(1.4rem,4vh,2.4rem)] sm:flex-row sm:items-baseline sm:gap-10"
                >
                  <span className="flex shrink-0 items-center gap-3 sm:w-40">
                    <Icone className="size-3.5 shrink-0 text-[var(--muted)] transition-colors duration-300 group-hover:text-flame-500" />
                    <span className="rotulo text-[var(--muted)]">
                      {c.rotulo}
                    </span>
                  </span>

                  <span className="titulo text-[clamp(1.4rem,3.6vw,2.6rem)] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-2">
                    {c.valor}
                  </span>

                  <span
                    aria-hidden="true"
                    className="ml-auto hidden self-center text-[var(--muted)] opacity-0 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-1 group-hover:text-flame-500 group-hover:opacity-100 lg:block"
                  >
                    →
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        <span className="block h-px w-full bg-[var(--border)]" />
      </div>
    </section>
  );
}
