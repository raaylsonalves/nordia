import { ShiftingField } from "@/components/backgrounds/shifting-field";
import { AssemblingMark } from "@/components/brand/assembling-mark";
import { GlitchWord } from "@/components/brand/glitch-word";
import { MagnetLink } from "@/components/ui/magnet-link";

/**
 * 01 — Início. One screen, no scroll: the mark assembles, the wordmark glitches
 * quietly behind it, and the field underneath is different on every visit.
 */
export default function Inicio() {
  return (
    <section className="relative flex h-full flex-col items-center justify-center bg-black px-[var(--gutter)] text-center">
      <ShiftingField />

      <AssemblingMark className="relative h-[clamp(7rem,20vh,11rem)] w-auto" />

      <GlitchWord className="relative mt-10 text-[clamp(2.2rem,8.5vw,6.2rem)]">
        NORDIA
      </GlitchWord>

      <p className="relative mt-6 font-mono text-[clamp(0.72rem,1.6vw,0.85rem)] tracking-[0.32em] text-ink-300 uppercase">
        Tecnologia com propósito
      </p>

      <MagnetLink href="/trabalhos" className="relative mt-12">
        Ver trabalhos
      </MagnetLink>
    </section>
  );
}
