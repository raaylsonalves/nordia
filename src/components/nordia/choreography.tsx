"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/** Native scrolling and reversible lifecycles, including the quiet-mode control. */
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
        const lenis = new Lenis({ lerp: 0.09, anchors: true, smoothWheel: true, prevent: (node) => node.closest('[role="dialog"]') !== null || document.body.hasAttribute("data-scroll-locked") });
        const tick = (time: number) => lenis.raf(time * 1000);
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add(tick);
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
        const essence = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: ".n-essence-scene", start: "top top", end: () => `+=${window.innerHeight * 1.7}`, pin: true, scrub: 0.6, invalidateOnRefresh: true } });
        essence.fromTo(".n-essence-line:first-child", { xPercent: -18 }, { xPercent: 0, duration: 1 }, 0)
          .fromTo(".n-essence-middle", { xPercent: 55 }, { xPercent: 0, duration: 1 }, 0)
          .fromTo(".n-essence-last", { xPercent: -25 }, { xPercent: 0, duration: 1 }, 0)
          .fromTo(".n-essence-middle svg", { rotation: -135 }, { rotation: 0, duration: 1 }, 0)
          .fromTo(".n-essence-rule", { scaleX: 0 }, { scaleX: 1, duration: 3.8 }, 0)
          .to(".n-essence-line:first-child", { xPercent: -35, y: -50, duration: 1 }, 1.4)
          .to(".n-essence-middle", { xPercent: 65, duration: 1 }, 1.4)
          .to(".n-essence-last", { xPercent: -25, y: 50, duration: 1 }, 1.4)
          .set(".n-story-wipe", { autoAlpha: 1 }, 1.5)
          .fromTo(".n-story-wipe", { clipPath: "inset(50% 0% 50% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2 }, 1.5)
          .fromTo(".n-story-wipe p", { yPercent: 80 }, { yPercent: 0, duration: 1.1 }, 1.8)
          .fromTo(".n-story-wipe svg", { rotation: -25, scale: 0.5 }, { rotation: 0, scale: 1, duration: 1.2 }, 1.8)
          .to({}, { duration: 0.8 });
        gsap.from(".n-essence-art .n-about-mark", { rotation: -12, scale: 0.75, y: 60, ease: "none", scrollTrigger: { trigger: ".n-essence-art", start: "top 95%", end: "bottom 35%", scrub: 0.7 } });
        gsap.from(".n-essence-art path:first-child", { x: -35, y: 45, ease: "none", scrollTrigger: { trigger: ".n-essence-art", start: "top 85%", end: "center 45%", scrub: 0.6 } });
        gsap.from(".n-essence-art path:last-child", { x: 35, y: -45, ease: "none", scrollTrigger: { trigger: ".n-essence-art", start: "top 85%", end: "center 45%", scrub: 0.6 } });
        const solutionsScene = document.querySelector(".n-solutions-scene");
        if (desktop) {
          solutionsScene?.classList.add("is-story");
          const solutions = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: ".n-solutions-scene", start: "top top", end: () => `+=${window.innerHeight * 1.9}`, pin: true, scrub: 0.7, invalidateOnRefresh: true } });
          solutions.from(".n-services-line", { yPercent: 110, clipPath: "inset(0% 0% 100% 0%)", stagger: 0.15, duration: 0.7 }, 0)
            .to(".n-services-line:first-child", { xPercent: -45, duration: 1 }, 1)
            .to(".n-services-line:last-child", { xPercent: 45, duration: 1 }, 1)
            .to(".n-solutions-scene .n-section-heading", { opacity: 0, duration: 0.5 }, 1.5)
            .fromTo(".n-work-pair", { clipPath: "inset(50% 35% 50% 35%)", autoAlpha: 0 }, { clipPath: "inset(0% 0% 0% 0%)", autoAlpha: 1, duration: 1.2 }, 1.5)
            .from(".n-work-primary", { yPercent: 30, rotation: -4, duration: 1.3 }, 1.5)
            .from(".n-work-secondary", { yPercent: 60, rotation: 5, duration: 1.5 }, 1.5)
            .to(".n-work-primary", { yPercent: -5, duration: 0.9 }, 3)
            .to(".n-work-secondary", { yPercent: -12, duration: 0.9 }, 3);
        } else {
          gsap.from(".n-services-line", { y: 65, clipPath: "inset(0% 0% 100% 0%)", stagger: 0.15, scrollTrigger: { trigger: ".n-section-heading", start: "top 95%", end: "top 35%", scrub: 0.5 } });
          gsap.utils.toArray<HTMLElement>(".n-work").forEach((work) => {
            gsap.from(work, { clipPath: "inset(20% 10% 20% 10%)", y: 70, ease: "none", scrollTrigger: { trigger: work, start: "top bottom", end: "top 20%", scrub: 0.5 } });
          });
        }
        gsap.utils.toArray<HTMLElement>(".n-service").forEach((service) => {
          gsap.from(service, { y: 80, rotationX: -35, transformPerspective: 800, opacity: 0.25, ease: "none", scrollTrigger: { trigger: service, start: "top 98%", end: "top 65%", scrub: 0.4 } });
        });
        gsap.utils.toArray<HTMLElement>("[data-enter]").forEach((heading) => {
          gsap.from(heading, { y: desktop ? 36 : 18, opacity: 0.35, duration: 0.9, ease: "power2.out", scrollTrigger: { trigger: heading, start: "top 92%", once: true } });
        });
        return () => { gsap.ticker.remove(tick); lenis.destroy(); solutionsScene?.classList.remove("is-story"); };
      });
      ScrollTrigger.refresh();
    };
    void document.fonts.ready.then(mount);
    window.addEventListener("nordia:motion", mount);
    return () => { disposed = true; window.removeEventListener("nordia:motion", mount); media?.revert(); };
  }, []);
  return null;
}
