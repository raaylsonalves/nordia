import { cn } from "@/lib/utils";

/**
 * The NORDIA "N".
 *
 * Geometry was traced from references/logo_new_nordia.jpeg by least-squares
 * fitting each straight edge and intersecting the resulting lines, then verified
 * by re-rasterising and diffing against the source (0.19% pixel mismatch, all of
 * it edge antialiasing). Do not eyeball-adjust these coordinates.
 *
 * The two halves are separate paths on purpose — they are what animates.
 */
export const NORDIA_PATH_LIGHT =
  "M0 4L168 103.6L168 169.8L84 115.8L84 346.1L0 414Z";
export const NORDIA_PATH_DARK =
  "M320 0L190 82.4L190 246.9L125 204.7L125 276.9L320 412.8Z";

type Props = {
  className?: string;
  /** Colour of the light half. Defaults to the paper token. */
  light?: string;
  /** Colour of the dark half. Defaults to the ink token. */
  dark?: string;
  title?: string;
};

export function NordiaMark({
  className,
  light = "#F5F4F3",
  dark = "#121110",
  title = "NORDIA",
}: Props) {
  return (
    <svg
      viewBox="0 0 320 414"
      fill="none"
      role="img"
      aria-label={title}
      className={cn("block", className)}
    >
      <path d={NORDIA_PATH_LIGHT} fill={light} />
      <path d={NORDIA_PATH_DARK} fill={dark} />
    </svg>
  );
}

/**
 * Lockup: mark + wordmark, for the header and footer.
 *
 * Both halves must be passed explicitly on coloured surfaces — the default
 * flame half disappears against the orange hero.
 */
export function NordiaLockup({
  className,
  light = "currentColor",
  dark = "var(--color-flame-500)",
}: {
  className?: string;
  light?: string;
  dark?: string;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <NordiaMark className="h-7 w-auto" light={light} dark={dark} />
      <span className="font-display text-[1.35rem] font-bold tracking-tight">
        NORDIA
      </span>
    </span>
  );
}
