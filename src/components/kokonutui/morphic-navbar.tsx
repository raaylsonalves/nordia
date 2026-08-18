"use client";

/**
 * Morphic Navbar — Kokonut UI (MIT), adapted for NORDIA.
 *
 * @license: MIT
 * @website: https://kokonutui.com
 *
 * Changes from upstream:
 *  - `href={path}` instead of a hardcoded `href="#"`. Upstream renders every
 *    item pointing at "#", so no link in the navbar ever navigates; `path` was
 *    only ever used as the active-state key.
 *  - plain <a> instead of next/link — these are same-page hash anchors, not
 *    route changes.
 *  - `activePath` can be driven from outside, so the highlight can follow the
 *    scroll position instead of only responding to clicks.
 */

import clsx from "clsx";
import { useState } from "react";

interface NavItem {
  name: string;
}

interface MorphicNavbarProps {
  items?: Record<string, NavItem>;
  defaultPath?: string;
  className?: string;
  /** When provided, the component is controlled by the parent. */
  activePath?: string;
}

const DEFAULT_NAV_ITEMS: Record<string, NavItem> = {
  "/": { name: "home" },
  "/works": { name: "works" },
  "/blog": { name: "blog" },
  "/about": { name: "about" },
};

export function MorphicNavbar({
  items = DEFAULT_NAV_ITEMS,
  defaultPath = "/",
  className,
  activePath: controlledPath,
}: MorphicNavbarProps) {
  const [internalPath, setInternalPath] = useState(defaultPath);
  const activePath = controlledPath ?? internalPath;

  const isActiveLink = (path: string) => {
    if (path === "/") {
      return activePath === "/";
    }
    return activePath.startsWith(path);
  };

  return (
    <nav className={clsx("mx-auto max-w-4xl px-4 py-2", className)}>
      <div className="flex items-center justify-center">
        <div className="glass flex items-center justify-between overflow-hidden rounded-xl">
          {Object.entries(items).map(([path, { name }], index, array) => {
            const isActive = isActiveLink(path);
            const isFirst = index === 0;
            const isLast = index === array.length - 1;
            const prevPath = index > 0 ? array[index - 1][0] : null;
            const nextPath =
              index < array.length - 1 ? array[index + 1][0] : null;

            return (
              <a
                className={clsx(
                  "flex items-center justify-center bg-ink-900 p-1.5 px-4 text-sm text-paper transition-all duration-300",
                  isActive
                    ? "mx-2 rounded-xl font-semibold text-sm"
                    : clsx(
                        (isActiveLink(prevPath || "") || isFirst) &&
                          "rounded-l-xl",
                        (isActiveLink(nextPath || "") || isLast) &&
                          "rounded-r-xl"
                      )
                )}
                href={path}
                key={path}
                onClick={() => setInternalPath(path)}
              >
                {name}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default MorphicNavbar;
