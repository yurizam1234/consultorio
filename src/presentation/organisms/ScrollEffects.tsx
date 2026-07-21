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

      // ===== PARALLAX DE SALIDA DEL HERO =====
      const heroSection = document.querySelector(".hero");
      const heroInfo = document.querySelector(".hero-info");
      if (heroInfo && heroSection) {
        gsap.fromTo(
          heroInfo,
          { x: 0, y: 0, opacity: 1 },
          {
            y: -70,
            opacity: 0.25,
            ease: "none",
            scrollTrigger: { trigger: heroSection, start: "top top", end: "bottom top", scrub: 0.6 },
          }
        );
      }

      const heroWedge = document.querySelector(".hero-visual-3d");
      if (heroWedge && heroSection) {
        gsap.fromTo(
          heroWedge,
          { x: 0, y: 0, opacity: 1 },
          {
            y: -40,
            opacity: 0.4,
            ease: "none",
            scrollTrigger: { trigger: heroSection, start: "top top", end: "bottom top", scrub: 0.6 },
          }
        );
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
        if (el === heroInfo || el.closest(".hero")) return;
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