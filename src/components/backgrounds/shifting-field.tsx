"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

/**
 * The home page's background, which is never the same twice.
 *
 * Three fields take turns: a new one is picked at random on every load, and if
 * the visitor stays put it hands over to the next after a while. All three are
 * tinted to the brand, so the page changes texture without changing identity.
 *
 * Each one opens a WebGL context, so they load client-side only and — this is
 * the part that matters — only the chosen one is ever mounted. Three live
 * contexts at once would cost more than the whole rest of the site.
 */

const LiquidEther = dynamic(
  () => import("@/components/backgrounds/liquid-ether"),
  { ssr: false },
);
const PixelBlast = dynamic(() => import("@/components/backgrounds/pixel-blast"), {
  ssr: false,
});
const FaultyTerminal = dynamic(
  () => import("@/components/backgrounds/faulty-terminal"),
  { ssr: false },
);

/** How long one field holds the screen before the next takes over. */
const HOLD_MS = 9_000;

const FIELDS = [
  function Ether() {
    return (
      <LiquidEther
        colors={["#F74B01", "#7A220C", "#FB793C"]}
        mouseForce={18}
        cursorSize={110}
        resolution={0.45}
        autoIntensity={1.9}
        autoSpeed={0.4}
      />
    );
  },
  function Blast() {
    return (
      <PixelBlast
        variant="square"
        color="#F74B01"
        pixelSize={4}
        patternScale={2.4}
        patternDensity={0.9}
        speed={0.4}
        edgeFade={0.4}
        liquid
        liquidStrength={0.08}
      />
    );
  },
  function Terminal() {
    return (
      <FaultyTerminal
        tint="#F74B01"
        scale={1.4}
        digitSize={1.3}
        timeScale={0.28}
        scanlineIntensity={0.4}
        glitchAmount={0.9}
        flickerAmount={0.8}
        curvature={0.15}
        brightness={0.7}
        mouseStrength={0.15}
      />
    );
  },
];

export function ShiftingField() {
  // -1 until mounted: picking on the server would ship the same field to
  // everyone and then hydrate into a different one
  const [which, setWhich] = useState(-1);

  useEffect(() => {
    // deferred a tick so the text lands before a WebGL context is built, but
    // on a timer rather than rAF: rAF never fires in a background tab, which
    // would leave the page with no background at all until it was focused
    const id = window.setTimeout(
      () => setWhich(Math.floor(Math.random() * FIELDS.length)),
      0,
    );
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (which < 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(
      () => setWhich((n) => (n + 1) % FIELDS.length),
      HOLD_MS,
    );
    return () => window.clearTimeout(t);
  }, [which]);

  if (which < 0) return null;
  const Field = FIELDS[which];

  return (
    <div
      aria-hidden="true"
      // keyed so swapping fields tears the old context down instead of
      // trying to reconcile two different renderers
      key={which}
      className="pointer-events-none absolute inset-0 opacity-70 [animation:field-in_1.2s_ease-out_both]"
    >
      <Field />
    </div>
  );
}
