"use client";

import { useEffect, useRef, useState } from "react";

const POOL = "abcdefghijklmnopqrstuvwxyz#%&/";

/**
 * Text that resolves out of noise, one character at a time. The final string
 * is what renders on the server, so the page is readable before hydration and
 * to anything that does not run scripts — the scramble only replaces it once
 * the client takes over.
 */
export function DecryptText({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const [shown, setShown] = useState(children);
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;
    done.current = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let step = 0;
    const id = window.setInterval(() => {
      step++;
      setShown(
        children
          .split("")
          .map((c, i) =>
            c === " " || step > i
              ? c
              : POOL[Math.floor(Math.random() * POOL.length)],
          )
          .join(""),
      );
      if (step > children.length) window.clearInterval(id);
    }, 12);

    return () => window.clearInterval(id);
  }, [children]);

  return <span className={className}>{shown}</span>;
}
