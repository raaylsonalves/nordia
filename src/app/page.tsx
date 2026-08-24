import { MarcaField } from "@/components/sections/marca-field";
import { AssemblingMark } from "@/components/brand/assembling-mark";
import { ProximityWord } from "@/components/brand/proximity-word";
import { MagnetLink } from "@/components/ui/magnet-link";

/**
 * 01 — Marca. One screen, no scroll: the mark assembles, the wordmark lands,
 * and the field lights up wherever the pointer is. Nothing else.
 */
export default function Marca() {
  return (
    <section className="relative flex h-full flex-col items-center justify-center bg-black px-[var(--gutter)] text-center">
      <MarcaField />

      <AssemblingMark className="relative h-[clamp(7rem,20vh,11rem)] w-auto" />

      <h1 className="text-display relative mt-10 text-[clamp(2.2rem,8.5vw,6.2rem)] tracking-[-0.055em]">
        <ProximityWord enterDelay={700}>NORDIA</ProximityWord>
      </h1>

      <p className="relative mt-6 font-mono text-[clamp(0.72rem,1.6vw,0.85rem)] tracking-[0.32em] text-ink-300 uppercase">
        Tecnologia com propósito
      </p>

      <MagnetLink href="/trabalhos" className="relative mt-12">
        Ver trabalhos
      </MagnetLink>
    </section>
  );
}
