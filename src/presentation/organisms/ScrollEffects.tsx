"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/presentation/hooks/useLanguage";

// El scroll-scrub le pide al video saltar a cualquier punto de golpe; si esa parte
// todavía no se descargó (conexión lenta, primera carga sin caché), el navegador
// no tiene el frame para mostrar y la imagen se queda "pegada" en el último frame
// decodificado, aunque el reload arregle todo porque el archivo ya quedó en caché.
// En vez de confiar en que TODO el video ya esté descargado, cada salto se recorta
// al final del rango ya bufferizado: en el peor de los casos el video se "detiene"
// en el último frame disponible (en vez de romperse) y avanza solo al terminar de
// llegar más datos — nunca pide un frame que todavía no existe.
function clampToBuffered(video: HTMLVideoElement, target: number) {
  const { buffered } = video;
  let reachable = 0;
  for (let i = 0; i < buffered.length; i++) {
    if (buffered.start(i) <= target) {
      reachable = Math.max(reachable, Math.min(buffered.end(i), target));
    }
  }
  return reachable;
}

// iOS/Safari (WebKit) nunca decodifica ni pinta un frame de un <video> que
// jamás empezó a reproducirse: fijar "currentTime" a mano (como hace el
// scroll-scrub de abajo) sobre un video que sólo estuvo en pause() se queda
// en negro/transparente en iPhone, aunque en Chrome/Android funcione perfecto.
// "Cebamos" el decodificador reproduciendo un instante y pausando enseguida
// (muted + playsInline ya habilitan este autoplay silencioso en iOS) para que,
// de ahí en más, currentTime sí pinte el frame correcto.
function primeVideoForScrub(video: HTMLVideoElement) {
  const playPromise = video.play();
  if (playPromise && typeof playPromise.then === "function") {
    playPromise.then(() => video.pause()).catch(() => video.pause());
  } else {
    video.pause();
  }
}

// Sin salida visual: monta una sola vez el parallax del hero, el ensamblado
// horizontal ligado al scroll y el dibujo de los divisores ECG (GSAP + ScrollTrigger).
export function ScrollEffects() {
  const { lang } = useLanguage();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Con reduced-motion no se arma el scroll-scrub ni los reveals (son decorativos),
    // pero los videos de fondo son contenido, no decoración: sin este bloque se
    // quedarían congelados en el frame 0 para siempre, porque el scrub normal es lo
    // único que los mueve. Se reproducen en bucle, sin depender del scroll.
    if (prefersReducedMotion) {
      const heroVideo = document.querySelector<HTMLVideoElement>(".hero-video");
      const contactoVideo = document.querySelector<HTMLVideoElement>(".contacto-video");
      [heroVideo, contactoVideo].forEach((video) => {
        if (!video) return;
        video.loop = true;
        video.play().catch(() => {});
      });
      return;
    }

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
    // "resync" en vivo: si el video todavía no tenía metadata/suficiente buffer
    // la ÚLTIMA vez que el usuario scrolleó, el navegador no vuelve a llamar a
    // onUpdate por sí solo — sólo se dispara con NUEVO scroll. Si el usuario ya
    // dejó de scrollear justo en ese momento (un gesto normal: scrollear una vez
    // y detenerse a mirar), el video se queda pegado esperando un scroll que tal
    // vez no llegue pronto — reproducible sobre todo con conexiones reales lentas,
    // donde las pruebas automatizadas (que scrollean sin parar) no lo detectan.
    // Estas funciones re-sincronizan el video a mano apenas llega más metadata/
    // buffer, usando el progreso ACTUAL del scroll (sin depender de un scroll nuevo).
    let resyncHero: (() => void) | null = null;
    let resyncContacto: (() => void) | null = null;

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
        const heroCitaTeaser = document.querySelector<HTMLElement>(".hero-cita-teaser");
        const heroActionCards = document.querySelector<HTMLElement>(".hero-action-cards");
        const citaCardWrap = document.querySelector<HTMLElement>(".cita-card-wrap");
        const heroSubtitle = document.querySelector<HTMLElement>(".hero-video-subtitle");

        if (heroVideo && heroVideoWrap) {
          primeVideoForScrub(heroVideo);

          // Título, card(s) y la pestaña de "Agendar cita" se manejan a mano dentro del
          // MISMO onUpdate del pin (en vez de scrollTriggers propios con su propio scrub)
          // para que compartan un único progreso ya suavizado: con capas de scrub
          // independientes, un scroll rápido hacía que siguieran "alcanzando" su valor
          // final después de que el pin ya se hubiera liberado (fuera de pantalla).
          const syncHero = (progress: number) => {
            if (heroVideo.duration) {
              const target = clampToBuffered(heroVideo, progress * heroVideo.duration);
              if (Math.abs(heroVideo.currentTime - target) > 0.02) {
                heroVideo.currentTime = target;
              }
            }

            // El título sólo se ve al principio: se desvanece en el primer tercio.
            if (heroTitle) {
              const p = gsap.utils.clamp(0, 1, progress / 0.35);
              gsap.set(heroTitle, { opacity: 1 - p, y: -30 * p });
            }

            // El teaser de "Agenda tu cita", el subtítulo y el botón de Urgencias
            // aparecen y desaparecen junto con el título (misma curva).
            if (heroCitaTeaser) {
              const p = gsap.utils.clamp(0, 1, progress / 0.35);
              gsap.set(heroCitaTeaser, { opacity: 1 - p, y: -30 * p });
            }
            if (heroSubtitle) {
              const p = gsap.utils.clamp(0, 1, progress / 0.35);
              gsap.set(heroSubtitle, { opacity: 1 - p, y: -20 * p });
            }
            if (heroActionCards) {
              const p = gsap.utils.clamp(0, 1, progress / 0.35);
              gsap.set(heroActionCards, {
                opacity: 1 - p,
                y: -20 * p,
                pointerEvents: p > 0.8 ? "none" : "auto",
              });
            }

            if (citaCardWrap) {
              const p = gsap.utils.clamp(0, 1, (progress - 0.55) / 0.35);
              gsap.set(citaCardWrap, { opacity: p, x: 60 * (1 - p), pointerEvents: p > 0.05 ? "auto" : "none" });
            }
          };

          // El dock flotante usa onLeave/onEnterBack de este MISMO trigger en vez
          // de uno nuevo con start:"bottom top": sobre un elemento ya pineado, un
          // segundo trigger posicional propio no calculaba bien el final del pin-spacer.
          const floatingDock = document.querySelector<HTMLElement>(".floating-dock");
          const heroTrigger = ScrollTrigger.create({
            trigger: heroVideoWrap,
            start: "top top",
            end: "+=120%",
            pin: true,
            scrub: 0.5,
            onUpdate: (self) => syncHero(self.progress),
            onLeave: () => {
              floatingDock?.classList.add("visible");
            },
            onEnterBack: () => {
              floatingDock?.classList.remove("visible");
            },
          });

          // Estado inicial explícito: si la página carga con el scroll ya pasado
          // el hero (ej. recarga con la posición guardada), onLeave nunca se
          // dispara porque no hubo cruce.
          if (heroTrigger.progress >= 1) {
            floatingDock?.classList.add("visible");
          }

          // Ver el comentario junto a "resyncHero" más arriba: sin esto, si el video
          // aún no tenía metadata/buffer suficiente en el último scroll, se queda
          // pegado hasta el PRÓXIMO scroll del usuario en vez de ponerse al día solo.
          resyncHero = () => syncHero(heroTrigger.progress);
          heroVideo.addEventListener("loadedmetadata", resyncHero);
          heroVideo.addEventListener("progress", resyncHero);
        } else {
          // Páginas sin hero de video (/historia, /procedimientos,
          // /especialidades, /agendar): el dock flotante sólo se revela vía
          // onLeave/onEnterBack del ScrollTrigger del hero de arriba — sin
          // ese hero no hay nada que dispare esos eventos, así que se
          // quedaba con "opacity: 0" (ver ".floating-dock .floating-btn" en
          // globals.css) para siempre. En estas páginas no hay nada que
          // "pasar" primero, así que se muestra directo.
          document.querySelector(".floating-dock")?.classList.add("visible");
        }

        // El navbar se expande justo al llegar a "Nuestra Historia" en la landing
        // (justo después del hero, ya sin el video en pantalla) — o, en páginas
        // sin hero (ej. /historia), en cuanto se llega a su propio marcador
        // ".navbar-expand-trigger". Fuera del bloque del hero a propósito: en
        // páginas sin video no habría pin-spacer que esperar, y este trigger debe
        // existir igual. Cuando SÍ hay hero, se crea después de su pin (mismo
        // motivo que el resto de triggers posicionales de este archivo).
        const navbarExpandSection = document.querySelector<HTMLElement>("#nosotros, .navbar-expand-trigger");
        const navbarEl = document.querySelector<HTMLElement>(".navbar");
        if (navbarExpandSection) {
          ScrollTrigger.create({
            trigger: navbarExpandSection,
            start: "top top",
            onEnter: () => navbarEl?.classList.add("expanded"),
            onLeaveBack: () => navbarEl?.classList.remove("expanded"),
          });
          // Estado inicial explícito (misma razón que el resto de estos casos): si
          // la página ya carga con esa sección en la parte superior de la pantalla.
          if (navbarExpandSection.getBoundingClientRect().top <= 0) {
            navbarEl?.classList.add("expanded");
          }
        }

        // ===== CONTACTO: video de fondo con scroll-scrub + card que "se levanta" desde abajo al final =====
        const contactoVideoWrap = document.querySelector<HTMLElement>(".contacto-video-wrap");
        const contactoCard = document.querySelector<HTMLElement>(".contacto-rise-card");

        if (contactoVideo && contactoVideoWrap) {
          primeVideoForScrub(contactoVideo);

          const updateContacto = (progress: number) => {
            if (contactoVideo.duration) {
              const target = clampToBuffered(contactoVideo, progress * contactoVideo.duration);
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

          const contactoTrigger = ScrollTrigger.create({
            trigger: contactoVideoWrap,
            start: "top top",
            end: "+=120%",
            pin: true,
            scrub: 0.5,
            onUpdate: (self) => updateContacto(self.progress),
          });

          // Ver el comentario junto a "resyncHero" más arriba: misma protección
          // para el video de Contacto.
          resyncContacto = () => updateContacto(contactoTrigger.progress);
          contactoVideo.addEventListener("loadedmetadata", resyncContacto);
          contactoVideo.addEventListener("progress", resyncContacto);
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

        // ===== DIRECCIÓN DE ENTRADA POR SECCIÓN =====
        // Por defecto todo entra desde la izquierda (x negativo → 0), como siempre.
        // Estas 4 secciones entran desde la derecha (x positivo → 0) a pedido: dan
        // variedad visual al recorrido sin tocar el resto de secciones.
        const rightEntrySectionIds = ["servicios", "por-que-escogernos", "equipo", "contacto"];
        const revealDir = (el: Element) => {
          const section = el.closest("section[id]");
          return section && rightEntrySectionIds.includes(section.id) ? 1 : -1;
        };

        // ===== NOMBRE DE SECCIÓN: aparece primero, grande, antes que el resto del contenido =====
        document.querySelectorAll("[data-reveal-name]").forEach((el) => {
          const dir = revealDir(el);
          gsap.fromTo(
            el,
            { x: 50 * dir, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 92%", end: "top 68%", scrub: 0.6 },
            }
          );
        });

        // ===== TÍTULOS DE SECCIÓN: cascada letra por letra (ver SplitChars.tsx) =====
        // Stagger y duración cortos a propósito: con títulos largos (40+ letras),
        // un stagger/duración generosos dejaban una ventana larga (~1.3s) en la
        // que el usuario, scrolleando a ritmo normal, veía letras a medio camino
        // (opacidad/posición intermedias) — se leía como "palabras troceadas".
        // Con esto el peor caso (título más largo) termina en ~0.6s.
        document.querySelectorAll<HTMLElement>(".split-chars").forEach((wrapper) => {
          const chars = wrapper.querySelectorAll(".split-char");
          gsap.fromTo(
            chars,
            { opacity: 0, y: 8 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.008,
              ease: "power1.out",
              duration: 0.3,
              scrollTrigger: { trigger: wrapper, start: "top 92%", toggleActions: "play none none reverse" },
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
          const dir = revealDir(container);
          const items = Array.from(container.children);
          gsap.fromTo(
            items,
            { x: 70 * dir, opacity: 0 },
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

          // ".full-bleed" (ej. el slider de Servicios) mide 100vw: si se le anima "x"
          // como al resto, el translateX empuja su borde más allá del viewport y
          // algunos navegadores móviles reaccionan alejando el zoom para que quepa
          // ese contenido — deformando TODA la página (no sólo esta sección) mientras
          // dura la animación. Estos sólo se desvanecen (opacity), sin desplazamiento.
          if (el.classList.contains("full-bleed")) {
            gsap.fromTo(
              el,
              { opacity: 0 },
              {
                opacity: 1,
                ease: "power2.out",
                scrollTrigger: { trigger: el, start: "top 68%", end: "top 30%", scrub: 0.6 },
              }
            );
            return;
          }

          const dir = revealDir(el);
          gsap.fromTo(
            el,
            { x: 60 * dir, opacity: 0 },
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

    // Cambiar de tamaño de viewport SIN recargar (ej. alternar el device
    // toolbar de DevTools con la página ya cargada en escritorio, o rotar el
    // teléfono) deja triggers posicionales como "navbarExpandSection" con las
    // coordenadas calculadas para el viewport viejo — nada los recalculaba.
    // Debounced: "resize" dispara muchas veces seguidas mientras se arrastra/
    // anima el cambio de tamaño (el panel de DevTools se desliza), no hace
    // falta un refresh por cada evento intermedio.
    let resizeTimer: number | undefined;
    const handleResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelled = true;
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      timeouts.forEach((id) => window.clearTimeout(id));
      window.removeEventListener("load", handleLoad);
      if (resyncHero) {
        heroVideo?.removeEventListener("loadedmetadata", resyncHero);
        heroVideo?.removeEventListener("progress", resyncHero);
      }
      if (resyncContacto) {
        contactoVideo?.removeEventListener("loadedmetadata", resyncContacto);
        contactoVideo?.removeEventListener("progress", resyncContacto);
      }
      ctx?.revert();
    };
  }, []);

  // El idioma cambia el largo de los textos (y por tanto las alturas): reajusta los triggers.
  // Se salta la PRIMERA vez (el montaje) a propósito: ese refresh ya lo hace "runSetup" en
  // cuanto termina de crear los pines, y disparar este OTRO refresh global justo en el mismo
  // instante — encima con React Strict Mode montando el efecto dos veces en dev — competía
  // con esa construcción y GSAP terminaba revirtiendo un pin-spacer que ya no era hijo de su
  // nodo esperado ("insertBefore" roto). A partir de un cambio de idioma real (ya con todo
  // estable) no hay ese conflicto.
  const isFirstLangRun = useRef(true);
  useEffect(() => {
    if (isFirstLangRun.current) {
      isFirstLangRun.current = false;
      return;
    }
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [lang]);

  return null;
}