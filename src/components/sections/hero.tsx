"use client";

import { motion } from "motion/react";
import { Reveal } from "@/components/ui/reveal";
import {
  NORDIA_PATH_DARK,
  NORDIA_PATH_LIGHT,
} from "@/components/brand/nordia-mark";

/**
 * The two halves of the mark drift in from opposite sides and lock together.
 * That is the whole pitch in one gesture: two things that finally fit.
 *
 * It sits quietly in the hero's footer now rather than filling half the
 * screen — the reference spends its space on emptiness, not on a second
 * focal point.
 */
function MarcaMontando() {
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <svg
      viewBox="0 0 320 414"
      fill="none"
      aria-hidden="true"
      className="h-[clamp(3.5rem,7vw,5.5rem)] w-auto"
    >
      <motion.path
        data-motion
        d={NORDIA_PATH_LIGHT}
        fill="var(--color-paper-dim)"
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease, delay: 0.2 }}
      />
      <motion.path
        data-motion
        d={NORDIA_PATH_DARK}
        fill="var(--color-ink-900)"
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease, delay: 0.2 }}
      />
    </svg>
  );
}

/**
 * The four fronts, listed once under the headline.
 *
 * These are the strings the typewriter used to cycle through. A visitor
 * reading four claims in sequence has to wait to learn what the studio does,
 * and only ever sees one of them in a screenshot.
 */
const FRENTES = [
  "Sistemas sob medida",
  "Integrações",
  "Automações",
  "Ferramentas digitais",
];

export function Hero() {
  return (
    <section className="edge flex min-h-[92svh] flex-col justify-between pt-[clamp(8rem,20vh,13rem)] pb-[clamp(2.5rem,7vh,4rem)]">
      <div className="shell w-full">
        <Reveal as="p" className="rotulo text-[var(--muted)]">
          Tecnologia com propósito
        </Reveal>

        <Reveal
          as="h1"
          delay={90}
          className="titulo mt-[clamp(2rem,6vh,3.5rem)] max-w-[16ch] text-[clamp(2.6rem,8vw,6.5rem)]"
        >
          Seu negócio não precisa de mais tecnologia.
        </Reveal>

        <Reveal
          delay={180}
          className="mt-[clamp(1.5rem,4vh,2.5rem)] max-w-[46ch] leading-relaxed text-[var(--muted)]"
        >
          Precisa da tecnologia certa. Processos manuais, informações espalhadas
          e sistemas que não conversam entre si consomem tempo e energia que
          deveriam estar fazendo o negócio crescer.
        </Reveal>

        <Reveal delay={260} className="mt-[clamp(2rem,5vh,3rem)]">
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
        </Reveal>
      </div>

      {/* rodapé do hero: as frentes de um lado, a marca do outro */}
      <Reveal delay={340} className="shell mt-[clamp(3rem,8vh,5rem)] w-full">
        <span className="block h-px w-full bg-[var(--foreground)] opacity-10" />
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6 pt-6">
          <ul className="flex flex-wrap gap-x-8 gap-y-2">
            {FRENTES.map((f) => (
              <li key={f} className="rotulo text-[var(--muted)]">
                {f}
              </li>
            ))}
          </ul>
          <MarcaMontando />
        </div>
      </Reveal>
    </section>
  );
}
