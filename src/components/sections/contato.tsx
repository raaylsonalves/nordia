"use client";

// Client component: the contact channels hand their icon components to
// CardStack, and a function cannot cross the server/client boundary as a prop.
import { Mail, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import CardStack from "@/components/kokonutui/card-stack";

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
  },
  {
    icone: Mail,
    rotulo: "E-mail",
    valor: "nordia@nordiatech.com.br",
    href: "mailto:nordia@nordiatech.com.br",
  },
  {
    icone: Instagram,
    rotulo: "Instagram",
    valor: "@nordia.solucoes",
    href: "https://www.instagram.com/nordia.solucoes/",
  },
];

export function Contato() {
  return (
    <section
      id="conversar"
      className="bg-[var(--background)] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <h2 className="text-display max-w-4xl text-[clamp(1.9rem,4.6vw,3.3rem)]">
            Se existe algo na sua empresa que poderia funcionar melhor, ser mais
            rápido ou simplesmente deixar de depender de processos manuais,{" "}
            <span className="text-flame-500">
              talvez seja exatamente por onde devemos começar.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <CardStack
            className="mt-16"
            items={CANAIS.map((c) => ({
              id: c.rotulo,
              label: c.rotulo,
              value: c.valor,
              href: c.href,
              icon: c.icone,
            }))}
          />
        </Reveal>
      </div>
    </section>
  );
}
