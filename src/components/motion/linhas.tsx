import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A heading set line by line, each line inside its own mask.
 *
 * No client JS: this renders the structure the scroll director animates
 * (`[data-linhas] .ln > span`), and nothing more. Where a headline breaks is a
 * design decision — splitting on whatever the text happens to wrap to is how
 * mask reveals end up with an orphan word rising on its own.
 */
export function Linhas({
  linhas,
  as: Tag = "span",
  className,
}: {
  linhas: ReactNode[];
  as?: ElementType;
  className?: string;
}) {
  return (
    <Tag data-linhas className={cn("block", className)}>
      {linhas.map((linha, i) => (
        <span className="ln" key={i}>
          <span>{linha}</span>
        </span>
      ))}
    </Tag>
  );
}

/**
 * An image-shaped block: reveals behind a clip-path wipe while settling from a
 * slight over-scale. `de` picks which edge the mask opens from.
 *
 * There are no project photographs yet, so what a plate holds today is the
 * brand's own material — the mark, the diagonal, a typographic field. The
 * geometry of the composition is real; only the contents are standing in.
 */
export function Placa({
  children,
  de = "baixo",
  className,
}: {
  children: ReactNode;
  de?: "baixo" | "cima" | "esquerda" | "direita";
  className?: string;
}) {
  return (
    <div data-plate={de} className={className}>
      <div data-plate-inner>{children}</div>
    </div>
  );
}
