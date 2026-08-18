"use client";

import { motion } from "motion/react";
import AttractButton from "@/components/kokonutui/attract-button";
import TypewriterTitle from "@/components/kokonutui/type-writer";
import {
  NORDIA_PATH_DARK,
  NORDIA_PATH_LIGHT,
} from "@/components/brand/nordia-mark";

/**
 * The two halves of the mark drift in from opposite sides and lock together.
 * That is the whole pitch in one gesture: two things that finally fit.
 */
function AssemblingMark() {
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <svg
      viewBox="0 0 320 414"
      fill="none"
      aria-hidden="true"
      className="h-[clamp(9rem,26vw,17rem)] w-auto"
    >
      <motion.path
        data-motion
        d={NORDIA_PATH_LIGHT}
        fill="var(--color-paper)"
        initial={{ x: -90, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.1, ease, delay: 0.15 }}
      />
      <motion.path
        data-motion
        d={NORDIA_PATH_DARK}
        fill="var(--color-ink-900)"
        initial={{ x: 90, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.1, ease, delay: 0.15 }}
      />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-flame-500 text-white">
      {/* the mark's own diagonal, blown up as a background field */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(108deg, #000 0 2px, transparent 2px 90px)",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 sm:py-32 lg:grid-cols-[1.25fr_auto] lg:gap-16">
        <div>
          <p className="eyebrow text-white/70">Tecnologia com propósito</p>

          {/*
            The H1 stays static, real text. The typewriter starts from an empty
            string, so anything driven by it is absent from the prerendered HTML
            — fine for a supporting line, not for the page's primary heading.
          */}
          <h1 className="text-display mt-6 text-[clamp(2.4rem,6.2vw,4.5rem)]">
            Seu negócio não precisa
            <br />
            de mais tecnologia.
            <br />
            <span className="text-ink-900">Precisa da tecnologia certa.</span>
          </h1>

          <p
            className="mt-6 font-display text-[clamp(1.1rem,2.4vw,1.6rem)] font-medium text-ink-900"
            aria-hidden="true"
          >
            <TypewriterTitle
              sequences={[
                { text: "Sistemas sob medida.", deleteAfter: true },
                { text: "Integrações que conversam.", deleteAfter: true },
                { text: "Automações que rodam sozinhas.", deleteAfter: true },
                { text: "Ferramentas digitais.", deleteAfter: true },
              ]}
              typingSpeed={55}
              cursorClassName="bg-ink-900"
            />
          </p>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/85">
            Processos manuais, informações espalhadas, sistemas que não conversam
            entre si e tarefas repetitivas consomem tempo, recursos e energia que
            deveriam estar sendo usados para fazer o negócio crescer.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <AttractButton
              onClick={() => {
                document
                  .getElementById("conversar")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Vamos conversar
            </AttractButton>
            <a
              href="#solucoes"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 font-medium text-white transition-colors hover:bg-white/10"
            >
              O que fazemos
            </a>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <AssemblingMark />
        </div>
      </div>
    </section>
  );
}
