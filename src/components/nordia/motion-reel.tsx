"use client";

import { useEffect, useRef } from "react";

export function MotionReel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const portrait = window.matchMedia("(max-width: 700px)");
    let visible = false;
    const syncPoster = () => {
      video.poster = portrait.matches
        ? "/videos/nordia-identity-motion-portrait-poster.webp"
        : "/videos/nordia-identity-motion-poster.webp";
    };
    const sync = () => {
      const reduced = media.matches || document.documentElement.dataset.quiet === "true";
      if (visible && !document.hidden && !reduced) {
        video.preload = "auto";
        void video.play().catch(() => { /* The play button remains available if autoplay is blocked. */ });
      } else {
        video.pause();
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    }, { threshold: 0.15 });
    observer.observe(video);
    const syncSources = () => {
      syncPoster();
      // <source media> is only evaluated when a video loads; resizing alone can
      // leave the portrait file playing inside the desktop 16:9 frame.
      video.load();
      sync();
    };
    syncSources();
    portrait.addEventListener("change", syncSources);
    const preferencesChanged = sync;
    media.addEventListener("change", preferencesChanged);
    window.addEventListener("nordia:motion", preferencesChanged);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      portrait.removeEventListener("change", syncSources);
      media.removeEventListener("change", preferencesChanged);
      window.removeEventListener("nordia:motion", preferencesChanged);
      document.removeEventListener("visibilitychange", sync);
      video.pause();
    };
  }, []);

  return (
    <figure className="n-reel" aria-labelledby="n-reel-caption">
      <video
        ref={videoRef}
        className="n-reel-video"
        poster="/videos/nordia-identity-motion-poster.webp"
        preload="none"
        muted
        playsInline
        loop
        width={1920}
        height={1080}
        aria-hidden="true"
        tabIndex={-1}
      >
        <source media="(max-width: 700px)" src="/videos/nordia-identity-motion-portrait.webm" type="video/webm" />
        <source media="(max-width: 700px)" src="/videos/nordia-identity-motion-portrait.mp4" type="video/mp4" />
        <source src="/videos/nordia-identity-motion.webm" type="video/webm" />
        <source src="/videos/nordia-identity-motion.mp4" type="video/mp4" />
        <track kind="captions" src="/videos/nordia-identity-motion-pt.vtt" srcLang="pt-BR" label="Português" />
      </video>
      <figcaption id="n-reel-caption" className="sr-only">
        Bem-vindo a uma nova forma de avançar. A marca Nordia aparece entre faixas curvas,
        anéis e esferas nas cores preto, cinza e laranja. Nordia — Tecnologia com propósito.
      </figcaption>
      <noscript><a className="n-reel-fallback" href="/videos/nordia-identity-motion.mp4">Assistir ao vídeo da Nordia</a></noscript>
    </figure>
  );
}
