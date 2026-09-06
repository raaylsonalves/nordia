"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * The scroll director.
 *
 * Every scene on the page is built from here rather than from inside the
 * sections. The sections only carry `data-*` attributes saying what role each
 * element plays; this file decides how the page behaves. Two reasons: the
 * choreography of a page is one decision and belongs in one file, and it keeps
 * the sections readable as content instead of as animation rigs.
 *
 * Roles it looks for:
 *   [data-cena]        a scene — the trigger for everything inside it
 *   [data-cena="pin"]  a scene that pins while its contents play
 *   [data-linhas]      a heading whose lines rise out of their own masks
 *   [data-plate]       an image-shaped block: clip-path reveal + scale settle
 *   [data-lento]       parallax, slowest layer
 *   [data-medio]       parallax, middle layer
 *   [data-rapido]      parallax, fastest layer
 *   [data-trilho]      a row that travels horizontally while you scroll down
 *   [data-fundo]       a backdrop that crossfades as its scene takes over
 */

gsap.registerPlugin(ScrollTrigger);

/** How far the parallax layers travel, as a fraction of the viewport. */
const CAMADAS: Record<string, number> = {
  "data-lento": -0.04,
  "data-medio": -0.11,
  "data-rapido": -0.2,
};

export function Cinema() {
  useEffect(() => {
    // Reduced motion gets the page, not the show. Nothing below runs, and the
    // resting styles in globals.css already leave every element visible.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      // A long, flat tail: the reference's scroll keeps gliding after the wheel
      // stops, which is most of why it reads as film rather than as a page.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.6,
    });

    // Lenis drives the scroll position, so ScrollTrigger has to be told when it
    // moves, and Lenis has to be stepped from GSAP's ticker rather than from its
    // own rAF — two independent loops would drift a frame apart and jitter.
    lenis.on("scroll", ScrollTrigger.update);
    const passo = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(passo);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      const cenas = gsap.utils.toArray<HTMLElement>("[data-cena]");

      for (const cena of cenas) {
        const preso = cena.dataset.cena === "pin";

        // A primeira cena começa colada no topo da página, então "top bottom"
        // já está satisfeito com o scroll em zero e o parallax nasceria
        // deslocado, empurrando o conteúdo para cima antes de qualquer rolagem.
        const naAbertura = cena.offsetTop <= 1;
        const inicioCena = naAbertura ? "top top" : "top bottom";

        /* ---- títulos: cada linha sobe de dentro da própria máscara -------
           Não é scrub. Uma frase que sobe atrelada ao scroll fica ilegível a
           meio caminho; ela entra uma vez, no tempo dela. */
        const titulos = cena.querySelectorAll<HTMLElement>(
          "[data-linhas] .ln > span",
        );
        if (titulos.length) {
          // Esconder é trabalho do GSAP, não do CSS. Se este arquivo não rodar,
          // o texto nunca chega a ser escondido — em vez de ficar preso fora da
          // máscara esperando um gatilho que não vem.
          gsap.set(titulos, { yPercent: 108 });

          const entrada = {
            yPercent: 0,
            duration: 1.15,
            ease: "expo.out",
            stagger: 0.09,
          };

          // Um ScrollTrigger só dispara ao ENTRAR: se a cena já está em campo
          // quando o gatilho é criado — o caso do topo da página — não existe
          // entrada para disparar, e o título ficaria escondido para sempre.
          if (cena.getBoundingClientRect().top < window.innerHeight * 0.72) {
            gsap.to(titulos, { ...entrada, delay: 0.15 });
          } else {
            gsap.to(titulos, {
              ...entrada,
              scrollTrigger: { trigger: cena, start: "top 72%", once: true },
            });
          }
        }

        /* ---- placas: máscara + escala + deslocamento, ao mesmo tempo ----- */
        const placas = cena.querySelectorAll<HTMLElement>("[data-plate]");
        placas.forEach((placa) => {
          const de = placa.dataset.plate || "baixo";
          const inicio =
            de === "esquerda"
              ? "inset(0% 100% 0% 0%)"
              : de === "direita"
                ? "inset(0% 0% 0% 100%)"
                : de === "cima"
                  ? "inset(0% 0% 100% 0%)"
                  : "inset(100% 0% 0% 0%)";

          gsap.set(placa, { clipPath: inicio, scale: 1.15, y: 40 });
          gsap.to(placa, {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: placa,
              // na primeira cena a placa já nasce em campo: abre com a página
              start: naAbertura ? "top bottom" : "top 92%",
              end: naAbertura ? "top 60%" : "top 32%",
              scrub: 1.1,
            },
          });

          // e continua respirando depois de aberta, devagar
          const interior =
            placa.querySelector<HTMLElement>("[data-plate-inner]");
          if (interior) {
            gsap.fromTo(
              interior,
              { scale: 1.12 },
              {
                scale: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: placa,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              },
            );
          }
        });

        /* ---- parallax: velocidades diferentes na mesma composição -------- */
        for (const [attr, fator] of Object.entries(CAMADAS)) {
          const alvos = cena.querySelectorAll<HTMLElement>(`[${attr}]`);
          if (!alvos.length) continue;
          gsap.to(alvos, {
            y: () => window.innerHeight * fator,
            ease: "none",
            scrollTrigger: {
              trigger: cena,
              start: inicioCena,
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        }

        /* ---- trilho horizontal conduzido pelo scroll vertical ------------ */
        const trilho = cena.querySelector<HTMLElement>("[data-trilho]");
        if (trilho) {
          const distancia = () =>
            Math.max(0, trilho.scrollWidth - trilho.clientWidth);

          gsap.to(trilho, {
            x: () => -distancia(),
            ease: "none",
            scrollTrigger: {
              trigger: cena,
              start: "top top",
              // o comprimento da cena acompanha o quanto há para percorrer
              end: () => "+=" + (distancia() + window.innerHeight * 0.5),
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
        } else if (preso) {
          /* ---- cena presa: o conteúdo interno continua se movendo -------- */
          const dentro = cena.querySelector<HTMLElement>(
            "[data-preso-conteudo]",
          );
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: cena,
              start: "top top",
              end: "+=" + window.innerHeight,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
          if (dentro) {
            tl.to(dentro, { yPercent: -14, ease: "none" }, 0);
          }
          const some = cena.querySelectorAll<HTMLElement>("[data-sai]");
          if (some.length)
            tl.to(some, { autoAlpha: 0, y: -30, ease: "none" }, 0);
        }

        /* ---- fundo que assume enquanto a cena passa ---------------------- */
        const fundo = cena.querySelector<HTMLElement>("[data-fundo]");
        if (fundo) {
          gsap.fromTo(
            fundo,
            { clipPath: "inset(100% 0% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              ease: "none",
              scrollTrigger: {
                trigger: cena,
                start: "top 85%",
                end: "top 25%",
                scrub: 1,
              },
            },
          );
        }
      }
    });

    // Os links do menu continuam sendo âncoras comuns no HTML; aqui o Lenis
    // assume o percurso, já que o scroll-behavior nativo foi desligado para
    // não disputar a posição com ele.
    const aoClicar = (e: MouseEvent) => {
      const alvo = (e.target as HTMLElement)?.closest?.("a[href^='#']");
      if (!alvo) return;
      const href = alvo.getAttribute("href");
      if (!href || href === "#") {
        e.preventDefault();
        lenis.scrollTo(0);
        return;
      }
      const destino = document.querySelector(href);
      if (!destino) return;
      e.preventDefault();
      lenis.scrollTo(destino as HTMLElement, { offset: -88 });
    };
    document.addEventListener("click", aoClicar);

    // As alturas mudam quando as fontes assentam; sem isso os gatilhos ficam
    // calculados sobre um layout que já não existe.
    const aoCarregar = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(aoCarregar);
    window.addEventListener("load", aoCarregar);

    return () => {
      document.removeEventListener("click", aoClicar);
      window.removeEventListener("load", aoCarregar);
      ctx.revert();
      gsap.ticker.remove(passo);
      lenis.destroy();
    };
  }, []);

  return null;
}
