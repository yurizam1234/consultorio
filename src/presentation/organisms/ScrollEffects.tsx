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

    // Todo el montaje se declara fuera de gsap.context() porque, si el video del hero
    // aún no está listo, difiere el arranque (más abajo) a "loadedmetadata"/un timeout,
    // y React Strict Mode (dev) monta este efecto dos veces (mount → cleanup → mount):
    // sin esto, el listener del primer montaje "fantasma" podría sobrevivir al cleanup
    // y disparar un segundo montaje duplicado más tarde.
    const heroVideo = document.querySelector<HTMLVideoElement>(".hero-video");
    const contactoVideo = document.querySelector<HTMLVideoElement>(".contacto-video");
    let ctx: gsap.Context | null = null;
    let cancelled = false;
    const timeouts: number[] = [];

    // Espera a que el video tenga metadata (duración/dimensiones) o, si tarda
    // demasiado (red lenta, error de códec...), sigue de todas formas pasado el
    // timeout — así nunca se bloquean el resto de animaciones de la página.
    const readyOrTimeout = (video: HTMLVideoElement | null, timeoutMs: number) =>
      new Promise<void>((resolve) => {
        if (!video || video.readyState >= 1) {
          resolve();
          return;
        }
        const onReady = () => {
          window.clearTimeout(timeoutId);
          resolve();
        };
        video.addEventListener("loadedmetadata", onReady, { once: true });
        const timeoutId = window.setTimeout(() => {
          video.removeEventListener("loadedmetadata", onReady);
          resolve();
        }, timeoutMs);
        timeouts.push(timeoutId);
      });

    // IMPORTANTE: el pin del hero se crea (si hay video) ANTES que cualquier otro
    // ScrollTrigger posicional (ECG, reveals...). El pin inserta un "pin-spacer" que
    // empuja +120% de la altura de pantalla a todo lo que está debajo; si un ECG
    // (o cualquier otro) trigger se crea/mide ANTES de que ese spacer exista, y luego
    // se llama a ScrollTrigger.refresh() para "corregirlo" una vez que el spacer ya
    // está, el trigger queda con posiciones equivocadas (se comprobó: exactamente
    // desplazadas por los ~1080px del spacer) — refresh() no re-ancla correctamente
    // esos triggers ya creados. La solución robusta es simplemente no crearlos hasta
    // que el layout final (con o sin pin) ya esté resuelto.
    const runSetup = () => {
      if (cancelled) return;

      ctx = gsap.context(() => {
        // ===== HERO: video de fondo controlado por el scroll (se fija y el video avanza cuadro a cuadro) =====
        const heroVideoWrap = document.querySelector<HTMLElement>(".hero-video-wrap");
        const heroTitle = document.querySelector<HTMLElement>(".hero-video-title");
        const heroActionCards = document.querySelector<HTMLElement>(".hero-action-cards");
        const citaTabWrap = document.querySelector<HTMLElement>(".cita-tab-wrap");

        if (heroVideo && heroVideoWrap) {
          heroVideo.pause();

          const cardEls = heroActionCards ? Array.from(heroActionCards.children) as HTMLElement[] : [];

          // Título, card(s) y la pestaña de "Agendar cita" se manejan a mano dentro del
          // MISMO onUpdate del pin (en vez de scrollTriggers propios con su propio scrub)
          // para que compartan un único progreso ya suavizado: con capas de scrub
          // independientes, un scroll rápido hacía que siguieran "alcanzando" su valor
          // final después de que el pin ya se hubiera liberado (fuera de pantalla).
          ScrollTrigger.create({
            trigger: heroVideoWrap,
            start: "top top",
            end: "+=120%",
            pin: true,
            scrub: 0.5,
            onUpdate: (self) => {
              const progress = self.progress;

              if (heroVideo.duration) {
                const target = progress * heroVideo.duration;
                if (Math.abs(heroVideo.currentTime - target) > 0.02) {
                  heroVideo.currentTime = target;
                }
              }

              // El título sólo se ve al principio: se desvanece en el primer tercio.
              if (heroTitle) {
                const p = gsap.utils.clamp(0, 1, progress / 0.35);
                gsap.set(heroTitle, { opacity: 1 - p, y: -30 * p });
              }

              // La card "Contáctanos" y la pestaña de "Agendar cita" entran hacia el final
              // del tramo fijado (55%→90%) — siempre terminan de aparecer ANTES de que el
              // pin se libere (100%) y entre la siguiente sección.
              cardEls.forEach((card) => {
                const p = gsap.utils.clamp(0, 1, (progress - 0.55) / 0.35);
                gsap.set(card, { opacity: p, x: 60 * (1 - p), y: 20 * (1 - p) });
              });

              if (citaTabWrap) {
                const p = gsap.utils.clamp(0, 1, (progress - 0.55) / 0.35);
                gsap.set(citaTabWrap, { opacity: p, x: 40 * (1 - p) });
              }
            },
          });
        }

        // ===== CONTACTO: video de fondo con scroll-scrub + card que "se levanta" desde abajo al final =====
        const contactoVideoWrap = document.querySelector<HTMLElement>(".contacto-video-wrap");
        const contactoCard = document.querySelector<HTMLElement>(".contacto-rise-card");

        if (contactoVideo && contactoVideoWrap) {
          contactoVideo.pause();

          const updateContacto = (progress: number) => {
            if (contactoVideo.duration) {
              const target = progress * contactoVideo.duration;
              if (Math.abs(contactoVideo.currentTime - target) > 0.02) {
                contactoVideo.currentTime = target;
              }
            }

            // La card se queda escondida debajo del video y sube en el último
            // tramo (55%→95%), como si se levantara — termina de subir ANTES
            // de que el pin se libere (100%) y siga el resto de la página.
            if (contactoCard) {
              const p = gsap.utils.clamp(0, 1, (progress - 0.55) / 0.4);
              gsap.set(contactoCard, { yPercent: 130 * (1 - p), opacity: 0.2 + 0.8 * p });
            }
          };

          // Estado inicial explícito: ScrollTrigger sólo llama a onUpdate cuando el
          // progreso CAMBIA, así que si el usuario entra directo a esta sección (link
          // de ancla, recarga con el scroll ya ahí) sin haber generado un delta de
          // scroll todavía, onUpdate nunca se dispararía y la card quedaría visible
          // (semitransparente) en su posición final en vez de escondida.
          updateContacto(0);

          ScrollTrigger.create({
            trigger: contactoVideoWrap,
            start: "top top",
            end: "+=120%",
            pin: true,
            scrub: 0.5,
            onUpdate: (self) => updateContacto(self.progress),
          });
        }

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
          if (el.closest(".contacto-video-wrap")) return;
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
    };

    Promise.all([readyOrTimeout(heroVideo, 2000), readyOrTimeout(contactoVideo, 2000)]).then(runSetup);

    // Las imágenes cargan de forma asíncrona y cambian alturas: recalculamos los triggers.
    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", handleLoad);

    return () => {
      cancelled = true;
      timeouts.forEach((id) => window.clearTimeout(id));
      window.removeEventListener("load", handleLoad);
      ctx?.revert();
    };
  }, []);

  // El idioma cambia el largo de los textos (y por tanto las alturas): reajusta los triggers.
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [lang]);

  return null;
}