"use client";

import GlitchText from "@/components/ui/glitch-text";
import { cn } from "@/lib/utils";

/**
 * The wordmark, glitching on its own — no hover required.
 *
 * react-bits ships the effect in red/cyan, the standard chromatic-aberration
 * pair. Here the two ghosts are flame and a cold ink instead, so the artefact
 * still reads as a signal fault but stays inside the brand's two colours.
 */
export function GlitchWord({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <GlitchText
      speed={2.4}
      enableShadows
      enableOnHover={false}
      className={cn("text-display nordia-glitch", className)}
    >
      {children}
    </GlitchText>
  );
}
