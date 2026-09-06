import { Mail, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

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
 * The close.
 *
 * The three channels were a stacked card deck; they are now three rules the
 * width of the page. A phone number and an e-mail address are what a visitor
 * came for, and they should be the largest type in the section — which they
 * now are.
 */
export function Contato() {
  return (
    <section id="conversar" className="edge py-[clamp(6rem,18vh,11rem)]">
      <div className="shell">
        <Reveal as="p" className="rotulo text-flame-500">
          Contato
        </Reveal>

        <Reveal
          as="h2"
          delay={80}
          className="titulo mt-8 max-w-[24ch] text-[clamp(1.6rem,4vw,3rem)]"
        >
          Se existe algo na sua empresa que poderia funcionar melhor, talvez
          seja por onde devemos começar.
        </Reveal>

        <ul className="mt-[clamp(4rem,12vh,7rem)]">
          {CANAIS.map((c, i) => {
            const Icone = c.icone;
            return (
              <li key={c.rotulo}>
                <Reveal delay={i * 60}>
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
                </Reveal>
              </li>
            );
          })}
        </ul>

        <span className="block h-px w-full bg-[var(--border)]" />
      </div>
    </section>
  );
}
