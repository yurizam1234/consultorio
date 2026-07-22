"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/presentation/hooks/useLanguage";

// Sin salida visual: monta una sola vez el parallax del hero, el ensamblado
// horizontal ligado al scroll y el dibujo de los divisores ECG (GSAP + ScrollTrigger).
export function ScrollEffects() {
  const { lang } = useLanguage();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    // Se declara fuera de gsap.context() porque en desarrollo React (Strict Mode)
    // monta este efecto dos veces (mount → cleanup → mount). Si el listener de
    // "loadedmetadata" quedara colgado del video sin quitarse en el cleanup,
    // el montaje "fantasma" del primer pase también dispararía setupHeroScrub()
    // más tarde y crearía un segundo pin duplicado sobre el mismo video —
    // eso es lo que dejaba el ECG "congelado" (los triggers de todo lo demás
    // quedaban recalculados sobre una página con doble espaciador de pin).
    const heroVideo = document.querySelector<HTMLVideoElement>(".hero-video");
    let setupHeroScrub: (() => void) | null = null;

    const ctx = gsap.context(() => {
      // ===== AURORA DE FONDO: los tonos de la paleta se revelan a lo largo de todo el scroll =====
      const aurora = document.querySelector(".scroll-aurora");
      if (aurora) {
        gsap.to(aurora, {
          backgroundPosition: "100% 100%",
          ease: "none",
          scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 1 },
        });
      }

      // ===== DIVISORES ECG ENTRE SECCIONES =====
      document.querySelectorAll<HTMLElement>(".ecg-divider").forEach((divider) => {
        const path = divider.querySelector<SVGPathElement>(".ecg-path");
        if (!path) return;
        const length = path.getTotalLength();
        path.style.strokeDasharray = String(length);
        path.style.strokeDashoffset = String(length);

        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: { trigger: divider, start: "top 90%", end: "top 35%", scrub: 0.6 },
        });
      });

      // ===== HERO: video de fondo controlado por el scroll (se fija y el video avanza cuadro a cuadro) =====
      const heroVideoWrap = document.querySelector<HTMLElement>(".hero-video-wrap");
      const heroTitle = document.querySelector<HTMLElement>(".hero-video-title");

      if (heroVideo && heroVideoWrap) {
        setupHeroScrub = () => {
          heroVideo.pause();

          // Se fija la sección durante 120% de la altura de pantalla; en ese tramo
          // el progreso del scroll se traduce al tiempo del video (scrubbing).
          // scrub numérico (en vez de "true") suaviza el progreso: sin esto, cada pixel
          // de scroll dispara un "seek" del video, y sin suficientes keyframes eso se ve
          // entrecortado. El umbral de 0.02s evita además pedir el mismo frame dos veces.
          ScrollTrigger.create({
            trigger: heroVideoWrap,
            start: "top top",
            end: "+=120%",
            pin: true,
            scrub: 0.5,
            onUpdate: (self) => {
              if (!heroVideo.duration) return;
              const target = self.progress * heroVideo.duration;
              if (Math.abs(heroVideo.currentTime - target) > 0.02) {
                heroVideo.currentTime = target;
              }
            },
          });

          // El título sólo se ve al principio: se desvanece dentro del primer tercio del tramo fijado.
          if (heroTitle) {
            gsap.fromTo(
              heroTitle,
              { opacity: 1, y: 0 },
              {
                opacity: 0,
                y: -30,
                ease: "none",
                scrollTrigger: {
                  trigger: heroVideoWrap,
                  start: "top top",
                  end: "+=40%",
                  scrub: 0.5,
                },
              }
            );
          }

          // El pin agrega un "spacer" que empuja todo lo de abajo (ECG, reveals...).
          // Si el video carga después del refresh() general de más abajo, esas posiciones
          // quedan desactualizadas; este refresh puntual las vuelve a calcular ya con el pin puesto.
          ScrollTrigger.refresh();
        };

        if (heroVideo.readyState >= 1) {
          setupHeroScrub();
        } else {
          heroVideo.addEventListener("loadedmetadata", setupHeroScrub, { once: true });
        }
      }

      // ===== NOMBRE DE SECCIÓN: aparece primero, grande, antes que el resto del contenido =====
      document.querySelectorAll("[data-reveal-name]").forEach((el) => {
        gsap.fromTo(
          el,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 92%", end: "top 68%", scrub: 0.6 },
          }
        );
      });

      // ===== ENSAMBLADO HORIZONTAL: contenedores con varias tarjetas se arman en cascada (después del nombre) =====
      const groupSelectors = [".agenda-steps", ".diagonal-container", ".reasons-features"];
      const groupContainers: Element[] = [];

      groupSelectors.forEach((sel) => {
        const container = document.querySelector(sel);
        if (!container) return;
        groupContainers.push(container);
        const items = Array.from(container.children);
        gsap.fromTo(
          items,
          { x: -70, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: { trigger: container, start: "top 68%", end: "top 30%", scrub: 0.6 },
          }
        );
      });

      // ===== ENSAMBLADO HORIZONTAL: resto de bloques [data-reveal] como una sola pieza (después del nombre) =====
      document.querySelectorAll("[data-reveal]").forEach((el) => {
        if (el.closest(".hero")) return;
        if (el.closest(".cita-modal-overlay")) return;
        if (groupContainers.some((c) => c.contains(el) || c === el)) return;

        gsap.fromTo(
          el,
          { x: -60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 68%", end: "top 30%", scrub: 0.6 },
          }
        );
      });

      ScrollTrigger.refresh();
    });

    // Las imágenes cargan de forma asíncrona y cambian alturas: recalculamos los triggers.
    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
      if (heroVideo && setupHeroScrub) {
        heroVideo.removeEventListener("loadedmetadata", setupHeroScrub);
      }
      ctx.revert();
    };
  }, []);

  // El idioma cambia el largo de los textos (y por tanto las alturas): reajusta los triggers.
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [lang]);

  return null;
}