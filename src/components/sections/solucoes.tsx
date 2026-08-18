import { Reveal } from "@/components/ui/reveal";
import { NordiaMark } from "@/components/brand/nordia-mark";
import CardFlip from "@/components/kokonutui/card-flip";
import FlowField from "@/components/kokonutui/flow-field";

const FRENTES = [
  {
    titulo: "Sistemas sob medida",
    resumo: "Construído para o seu processo",
    texto:
      "Software construído para o seu processo — não o seu processo torcido para caber num software de prateleira.",
    entregas: ["Levantamento do processo", "Sistema próprio", "Suporte contínuo"],
  },
  {
    titulo: "Integrações",
    resumo: "Suas ferramentas conversando",
    texto:
      "Fazemos as ferramentas que você já usa trocarem informação entre si, sem ninguém no meio copiando dados.",
    entregas: ["APIs e webhooks", "Sincronização de dados", "Fim da digitação dupla"],
  },
  {
    titulo: "Automações",
    resumo: "O repetitivo rodando sozinho",
    texto:
      "O trabalho repetitivo passa a rodar sozinho, com regra clara e resultado previsível.",
    entregas: ["Rotinas agendadas", "Regras de negócio", "Alertas automáticos"],
  },
  {
    titulo: "Novas soluções",
    resumo: "Quando não existe pronto",
    texto:
      "Quando não existe pronto, a gente desenha e constrói a partir da necessidade real do negócio.",
    entregas: ["Descoberta do problema", "Protótipo", "Construção sob medida"],
  },
];

export function Solucoes() {
  return (
    <section id="solucoes">
      {/*
        FlowField ships as a full-viewport hero: `min-h-screen`, flex-centred.
        The overrides below turn it into a section backdrop. `ember` is its own
        red→orange hue band, so the field lands on the brand palette without
        inventing a theme.
      */}
      <FlowField
        theme="ember"
        density="sparse"
        className="block min-h-0 py-24 sm:py-32"
      >
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="flex items-center gap-4">
              <NordiaMark
                className="h-9 w-auto shrink-0"
                light="var(--color-flame-500)"
                dark="var(--color-paper)"
              />
              <span className="h-px flex-1 rule-flame" />
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="text-display mt-10 max-w-3xl text-[clamp(1.9rem,4.4vw,3.1rem)] text-paper">
              É aí que a Nordia entra.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-300">
              Desenvolvemos soluções tecnológicas sob medida, de sistemas e
              integrações a automações, ferramentas digitais e novas soluções
              pensadas para as necessidades reais de cada negócio.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            {FRENTES.map((f, i) => (
              <Reveal key={f.titulo} delay={i * 0.06}>
                <CardFlip
                  title={f.titulo}
                  subtitle={f.resumo}
                  description={f.texto}
                  features={f.entregas}
                  ctaLabel="Falar sobre isso"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </FlowField>
    </section>
  );
}
