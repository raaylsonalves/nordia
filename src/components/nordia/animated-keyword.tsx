"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const keywords = [
  { label: "Landing Pages", color: "var(--n-accent)" },
  { label: "Design", color: "#7255a4" },
  { label: "Marketing", color: "#ce482b" },
  { label: "Sistemas", color: "#386d9a" },
] as const;

const gestures = ["palette", "format", "mark", "code"] as const;
type Gesture = (typeof gestures)[number];
type Phase = "idle" | "targeting" | "selecting" | "editing" | "styling" | "replacing" | "confirming";

const phaseDuration: Record<Phase, number> = {
  idle: 1650,
  targeting: 320,
  selecting: 320,
  editing: 520,
  styling: 500,
  replacing: 550,
  confirming: 260,
};
const codePhaseDuration = { editing: 700, styling: 650 } as const;

const ease = [0.22, 1, 0.36, 1] as const;

function EditorChrome({ gesture, nextIndex }: { gesture: Gesture; nextIndex: number }) {
  return (
    <>
      <span className="n-keyword-frame" aria-hidden="true">
        <span className="n-keyword-handle n-keyword-handle-tl" />
        <span className="n-keyword-handle n-keyword-handle-tr" />
        <span className="n-keyword-handle n-keyword-handle-bl" />
        <span className="n-keyword-handle n-keyword-handle-br" />
      </span>
      {gesture === "mark" && (
        <svg className="n-keyword-mark" viewBox="0 0 320 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M30 27 C77 2 226 5 285 26 C337 48 291 84 203 89 C100 101 20 76 21 51 C22 43 31 37 41 33" />
        </svg>
      )}
      {gesture !== "code" && (
        <span className="n-keyword-toolbar" aria-hidden="true">
          {gesture === "palette" && <><span>Cor</span><span className="n-keyword-toolbar-divider" /><span className="n-keyword-swatches">{keywords.map((item, index) => <i key={item.label} className={index === nextIndex ? "is-target" : undefined} style={{ background: item.color }} />)}</span></>}
          {gesture === "format" && <><strong>B</strong><em>I</em><span className="n-keyword-toolbar-divider" /><span>Aa</span><span>↗</span></>}
          {gesture === "mark" && <><span>Traço</span><span className="n-keyword-toolbar-divider" /><span className="n-keyword-pen-color" /></>}
        </span>
      )}
      <span className="n-keyword-cursor" aria-hidden="true">
        <svg viewBox="0 0 13 17"><path d="M1 1v13l3.2-3.2 2.7 5 2.4-1.2-2.7-5.1L12 9Z" /></svg>
        <span>nordia</span>
      </span>
      {gesture === "code" && (
        <span className="n-keyword-code" aria-hidden="true">
          <span className="n-keyword-code-tab"><i /><span>sistema.ts</span><span className="n-keyword-code-close">×</span></span>
          <span className="n-keyword-code-line"><span className="n-keyword-code-number">01</span><span><span className="n-keyword-code-blue">const</span> sys = {'{'}</span></span>
          <span className="n-keyword-code-line n-keyword-code-active"><span className="n-keyword-code-number">02</span><span className="n-keyword-code-indent">ativo: <span className="n-keyword-code-orange">true</span><span className="n-keyword-code-caret" /></span></span>
          <span className="n-keyword-code-line"><span className="n-keyword-code-number">03</span><span>{'};'}</span></span>
        </span>
      )}
    </>
  );
}

export function AnimatedKeyword() {
  const [active, setActive] = useState(false);
  const [cycle, setCycle] = useState<{ index: number; phase: Phase }>({ index: 0, phase: "idle" });

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => {
      const shouldAnimate = !media.matches && document.documentElement.dataset.quiet !== "true";
      setActive(shouldAnimate);
      if (!shouldAnimate) setCycle({ index: 0, phase: "idle" });
    };

    syncMotion();
    media.addEventListener("change", syncMotion);
    window.addEventListener("nordia:motion", syncMotion);
    return () => {
      media.removeEventListener("change", syncMotion);
      window.removeEventListener("nordia:motion", syncMotion);
    };
  }, []);

  useEffect(() => {
    if (!active) return;
    const timer = window.setTimeout(() => {
      setCycle(({ index, phase }) => {
        switch (phase) {
          case "idle": return { index, phase: "targeting" };
          case "targeting": return { index, phase: "selecting" };
          case "selecting": return { index, phase: "editing" };
          case "editing": return { index, phase: "styling" };
          case "styling": return { index: (index + 1) % keywords.length, phase: "replacing" };
          case "replacing": return { index, phase: "confirming" };
          case "confirming": return { index, phase: "idle" };
        }
      });
    }, cycle.index === 3 && cycle.phase === "editing" ? codePhaseDuration.editing
      : cycle.index === 3 && cycle.phase === "styling" ? codePhaseDuration.styling
      : phaseDuration[cycle.phase]);
    return () => window.clearTimeout(timer);
  }, [active, cycle.index, cycle.phase]);

  const keyword = keywords[cycle.index];
  const gestureIndex = cycle.phase === "replacing" || cycle.phase === "confirming"
    ? (cycle.index - 1 + keywords.length) % keywords.length
    : cycle.index;
  const nextIndex = (gestureIndex + 1) % keywords.length;

  return (
    <span
      className="n-keyword"
      data-phase={active ? cycle.phase : "idle"}
      data-action={gestures[gestureIndex]}
      style={{ "--keyword-color": keyword.color, "--next-color": keywords[nextIndex].color } as React.CSSProperties}
      aria-hidden="true"
    >
      <span className="n-keyword-sizer">Landing Pages.</span>
      <span className="n-keyword-current">
        {active ? (
          <AnimatePresence initial={false} mode="sync">
            <motion.span
              key={keyword.label}
              className="n-keyword-value"
              initial={{ opacity: 0.25, y: "0.12em", scaleY: 0.42, scaleX: 0.92, skewX: -8, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, scaleY: 1, scaleX: 1, skewX: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: "-0.1em", scaleY: 0.2, scaleX: 0.92, skewX: -8, filter: "blur(6px)", transition: { duration: 0.35, ease } }}
              transition={{ duration: 0.55, ease }}
            >
              {keyword.label}<span className="n-period">.</span>
            </motion.span>
          </AnimatePresence>
        ) : (
          <span className="n-keyword-value">Landing Pages<span className="n-period">.</span></span>
        )}
        <EditorChrome gesture={gestures[gestureIndex]} nextIndex={nextIndex} />
      </span>
    </span>
  );
}
