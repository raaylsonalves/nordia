"use client";

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

/**
 * The page's only effect: a block rises a little and fades in as it arrives.
 *
 * It reveals in one of two ways, because content that starts invisible must not
 * depend on a single mechanism working: if the element is already inside the
 * viewport when the effect runs it appears straight away — measured from a
 * rect, since an observer reports nothing while the page is throttled or
 * occluded — and otherwise the observer reveals it on arrival.
 *
 * The resting style is gated behind `html.js` in globals.css, so a visitor
 * without scripts gets the whole page rather than a blank sheet.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  /** ms */
  delay?: number;
  className?: string;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Anything whose top edge is at or above the fold is revealed at once.
    // Deliberately not also testing `bottom > 0`: before the webfonts settle an
    // element can still measure zero-height, and that test would send the
    // headline off to wait on an observer — which reports nothing at all while
    // the page is throttled or occluded, leaving the hero permanently blank.
    if (node.getBoundingClientRect().top < window.innerHeight) {
      setVisivel(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setVisivel(true);
        obs.disconnect();
      },
      { rootMargin: "-10% 0px", threshold: 0 },
    );

    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn("sobe", visivel && "visivel", className)}
      style={{ "--d": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
