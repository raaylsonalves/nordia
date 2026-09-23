"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Only transforms/opacity, native scrolling, and fully reversible lifecycles. */
export function Choreography() {
  useEffect(() => {
    let media: gsap.MatchMedia | undefined;
    let disposed = false;
    const mount = () => {
      media?.revert();
      if (disposed || document.documentElement.dataset.quiet === "true") return;
      media = gsap.matchMedia();
      media.add({ desktop: "(min-width: 701px)", mobile: "(max-width: 700px)", reduced: "(prefers-reduced-motion: reduce)" }, (context) => {
        if (context.conditions?.reduced) return;
        const desktop = context.conditions?.desktop;
        // Do not replay the opening when returning via an anchor or browser back.
        if (window.scrollY < 40) {
          gsap.from(".n-title-line", { yPercent: 112, duration: 1.05, stagger: 0.105, ease: "power3.out" });
          gsap.from("[data-mark-left]", { x: -60, y: 45, duration: 1.25, delay: 0.35, ease: "power3.out" });
          gsap.from("[data-mark-right]", { x: 60, y: -45, duration: 1.25, delay: 0.35, ease: "power3.out" });
        }
        gsap.fromTo(".n-hero-visual", { scale: desktop ? 0.66 : 0.96 }, { scale: 1, ease: "none", scrollTrigger: { trigger: ".n-hero-stage", start: "top 48%", end: desktop ? "top -12%" : "top 15%", scrub: 0.7, invalidateOnRefresh: true } });
        if (desktop) {
          gsap.to(".n-hero-rail", { opacity: 0, y: -18, ease: "none", scrollTrigger: { trigger: ".n-hero-stage", start: "top 38%", end: "top 18%", scrub: true } });
          gsap.fromTo(".n-work-image img", { yPercent: -5, scale: 1.12 }, { yPercent: 5, scale: 1.12, ease: "none", scrollTrigger: { trigger: ".n-work-image", start: "top bottom", end: "bottom top", scrub: 0.6 } });
        }
        gsap.from("[data-study-left]", { x: -22, y: 26, ease: "none", scrollTrigger: { trigger: ".n-brand-study", start: "top 85%", end: "center 45%", scrub: 0.5 } });
        gsap.from("[data-study-right]", { x: 22, y: -26, ease: "none", scrollTrigger: { trigger: ".n-brand-study", start: "top 85%", end: "center 45%", scrub: 0.5 } });
        gsap.utils.toArray<HTMLElement>("[data-enter]").forEach((heading) => {
          gsap.from(heading, { y: desktop ? 36 : 18, opacity: 0.35, duration: 0.9, ease: "power2.out", scrollTrigger: { trigger: heading, start: "top 92%", once: true } });
        });
      });
      ScrollTrigger.refresh();
    };
    void document.fonts.ready.then(mount);
    window.addEventListener("nordia:motion", mount);
    return () => { disposed = true; window.removeEventListener("nordia:motion", mount); media?.revert(); };
  }, []);
  return null;
}
