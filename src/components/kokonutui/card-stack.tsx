"use client";

/**
 * Card Stack — Kokonut UI (MIT), rewritten for NORDIA.
 *
 * @author: @dorianbaffier
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 *
 * The stack geometry (fan offsets, spread math) is upstream's and is the good
 * part. Everything around it was replaced:
 *
 *  - items come in as a prop. Upstream hardcodes a `products` array inside the
 *    module, so the component can only ever render its own demo data.
 *  - cards carry an icon, not an `image`. Upstream requires an image URL per
 *    item; our contact channels are glyphs.
 *  - `useReducedMotion()` is no longer read during render. Upstream does
 *    `useReducedMotion() ?? false`, which resolves to false on the server and
 *    to the real preference on the client — the two renders disagree on every
 *    `rotate` value and hydration fails. It is read after mount instead.
 *  - the wrapper is a div, not a button. Each card is an <a>, and an <a> inside
 *    a <button> is invalid HTML that browsers actively re-parse. A separate
 *    control drives expansion for keyboard and screen-reader users.
 */

import { motion } from "motion/react";
import type { ComponentType } from "react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const CARD_WIDTH = 300;
const CARD_HEIGHT = 190;
// Negative "overlap" = a gap. Upstream fans the cards with a real overlap,
// which covers the text on the cards behind — fine for product art, not for
// contact details that have to stay readable.
const CARD_OVERLAP = -20;

export interface StackItem {
  id: string;
  label: string;
  value: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
}

interface CardStackProps {
  items: StackItem[];
  className?: string;
  expandLabel?: string;
  collapseLabel?: string;
}

function Card({
  item,
  index,
  totalCards,
  isExpanded,
  reducedMotion,
  stackVertically,
}: {
  item: StackItem;
  index: number;
  totalCards: number;
  isExpanded: boolean;
  reducedMotion: boolean;
  stackVertically: boolean;
}) {
  const centerOffset = (totalCards - 1) * 5;
  const totalExpandedWidth =
    CARD_WIDTH + (totalCards - 1) * (CARD_WIDTH - CARD_OVERLAP);
  const expandedCenterOffset = totalExpandedWidth / 2;

  const collapsed = {
    x: index * 10 - centerOffset,
    y: index * 2,
    rotate: reducedMotion ? 0 : index * 1.5,
  };

  // Below `stackVertically` the fan would run off a phone screen and clip the
  // contact details, so the cards expand into a column instead of a row.
  const expanded = stackVertically
    ? { x: 0, y: index * (CARD_HEIGHT + 16), rotate: 0 }
    : {
        x:
          index * (CARD_WIDTH - CARD_OVERLAP) -
          expandedCenterOffset +
          CARD_WIDTH / 2,
        y: 0,
        rotate: reducedMotion ? 0 : index * 5 - (totalCards - 1) * 2.5,
      };

  const Icon = item.icon;

  return (
    <motion.a
      href={item.href}
      target={item.href.startsWith("http") ? "_blank" : undefined}
      rel={item.href.startsWith("http") ? "noopener" : undefined}
      animate={{ ...(isExpanded ? expanded : collapsed), zIndex: totalCards - index }}
      transition={
        reducedMotion
          ? { duration: 0 }
          : { type: "spring", stiffness: 260, damping: 30 }
      }
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        // Absolutely positioned children with no inset resolve to the container's
        // left edge, so upstream's centre-relative offsets were measured from the
        // wrong origin and the fan collapsed onto itself. Anchor to the centre.
        left: "50%",
        marginLeft: -CARD_WIDTH / 2,
      }}
      className={cn(
        "absolute flex flex-col justify-between",
        "rounded-2xl p-6",
        "border border-[var(--border)] bg-[var(--surface)]",
        "shadow-lg transition-shadow hover:shadow-xl",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flame-500 focus-visible:ring-offset-2",
      )}
    >
      <span className="inline-flex size-11 items-center justify-center rounded-xl bg-flame-50 text-flame-600">
        <Icon className="size-5" />
      </span>
      <span>
        <span className="block text-sm text-[var(--muted)]">{item.label}</span>
        <span className="mt-1 block font-display font-semibold">
          {item.value}
        </span>
      </span>
    </motion.a>
  );
}

export default function CardStack({
  items,
  className,
  expandLabel = "Ver todos os canais",
  collapseLabel = "Recolher",
}: CardStackProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [stackVertically, setStackVertically] = useState(false);

  // After mount only — see the note at the top of this file. Seeding state from
  // an effect is the point here: reading the preference during render is what
  // breaks hydration.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );

    const narrow = window.matchMedia("(max-width: 900px)");
    const sync = () => setStackVertically(narrow.matches);
    sync();
    narrow.addEventListener("change", sync);
    return () => narrow.removeEventListener("change", sync);
  }, []);

  return (
    <div className={cn("flex flex-col items-center gap-8", className)}>
      <div
        className="relative flex w-full items-center justify-center transition-[height] duration-500"
        style={{
          height:
            isExpanded && stackVertically
              ? items.length * (CARD_HEIGHT + 16)
              : CARD_HEIGHT + 40,
        }}
      >
        {items.map((item, index) => (
          <Card
            key={item.id}
            item={item}
            index={index}
            isExpanded={isExpanded}
            reducedMotion={reducedMotion}
            stackVertically={stackVertically}
            totalCards={items.length}
          />
        ))}
      </div>

      <button
        type="button"
        aria-expanded={isExpanded}
        onClick={() => setIsExpanded((v) => !v)}
        className="rounded-full border border-[var(--border)] px-6 py-2.5 text-sm font-medium transition-colors hover:border-flame-500/60 hover:text-flame-600"
      >
        {isExpanded ? collapseLabel : expandLabel}
      </button>
    </div>
  );
}
