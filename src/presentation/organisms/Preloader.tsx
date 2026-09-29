"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { cn } from "@/shared/lib/utils";

// >= lo que tarda la animación de "armado" del logo en globals.css (5 piezas
// en secuencia, una por una; la última arranca a los 2400ms + dura 450ms) —
// así nunca se corta a medias en una conexión rápida.
const MIN_VISIBLE_MS = 2900;
// Techo duro para no atrapar a alguien con muy mala conexión en la pantalla de
// carga: si se cumple sin que el video haya terminado de descargarse, el propio
// scroll-scrub (ver clampToBuffered en ScrollEffects.tsx) recorta cada salto al
// rango ya bufferizado, así que nunca se ve un frame roto — sólo avanza más
// lento hasta que el resto del archivo termine de llegar en segundo plano.
const MAX_WAIT_MS = 6000;

// Sólo la primera carga real de la sesión debe ver la animación completa —
// sin esto, cada vez que el usuario navega a otra página (SPA, sin recargar
// el documento) y vuelve a "/", este componente se vuelve a montar y repite
// los ~3s de espera de nuevo, aunque el video ya esté en caché.
const PRELOADER_SESSION_KEY = "sh-preloader-shown";

// sessionStorage se lee con useSyncExternalStore (mismo patrón que
// useLanguage.tsx), NO en un lazy initializer de useState: el servidor siempre
// renderiza "no visto", y leerlo durante el primer render del cliente daba
// "visto" al recargar dentro de la sesión → error de hidratación (className y
// aria-hidden distintos). Así la hidratación usa el valor del servidor y React
// aplica el real justo después; en una navegación SPA de vuelta a "/" (sin
// hidratación) se lee directo y el preloader no llega a pintarse.
const subscribeNoop = () => () => {};
const readShownThisSession = () => sessionStorage.getItem(PRELOADER_SESSION_KEY) === "1";
const readShownOnServer = () => false;

// ¿Ya se descargó el archivo completo (no sólo "puede reproducirse desde el
// inicio")? El scroll-scrub salta a cualquier punto del video de golpe; con
// "canplaythrough" (que sólo garantiza reproducción LINEAL sin cortes desde la
// posición actual) el video puede quedarse "pegado" en el último frame
// decodificado si el usuario hace scroll hacia una parte que aún no llegó —
// visible sobre todo en la primera carga (caché vacía), y por eso al recargar
// (con el archivo ya en caché del navegador) se ve fluido de inmediato.
function isFullyBuffered(video: HTMLVideoElement) {
  if (!video.duration || Number.isNaN(video.duration)) return false;
  const { buffered } = video;
  if (buffered.length === 0) return false;
  return buffered.end(buffered.length - 1) >= video.duration - 0.2;
}

function waitForFullDownload(maybeVideo: HTMLVideoElement | null, onDone: () => void) {
  if (!maybeVideo) {
    onDone();
    return () => {};
  }
  const video = maybeVideo;
  if (isFullyBuffered(video)) {
    onDone();
    return () => {};
  }

  let done = false;
  const check = () => {
    if (done || !isFullyBuffered(video)) return;
    done = true;
    cleanup();
    onDone();
  };
  // "progress" se dispara repetidas veces mientras el navegador sigue
  // descargando el archivo (gracias a preload="auto"); en cuanto el rango
  // bufferizado alcanza la duración total, se considera listo.
  video.addEventListener("progress", check);
  video.addEventListener("loadedmetadata", check);
  video.addEventListener("canplaythrough", check);
  function cleanup() {
    video.removeEventListener("progress", check);
    video.removeEventListener("loadedmetadata", check);
    video.removeEventListener("canplaythrough", check);
  }
  return cleanup;
}

// Espera a que la foto esté descargada Y decodificada: así, al quitarse la
// pantalla de carga, el hero ya se pinta completo en vez de aparecer a medias.
function waitForImage(img: HTMLImageElement | null, onDone: () => void) {
  if (!img) {
    onDone();
    return () => {};
  }
  let cancelled = false;
  const finish = () => {
    if (cancelled) return;
    img.decode().catch(() => {}).then(() => {
      if (!cancelled) onDone();
    });
  };
  if (img.complete) {
    finish();
    return () => {
      cancelled = true;
    };
  }
  img.addEventListener("load", finish, { once: true });
  img.addEventListener("error", finish, { once: true });
  return () => {
    cancelled = true;
    img.removeEventListener("load", finish);
    img.removeEventListener("error", finish);
  };
}

// Pantalla de carga: fondo blanco + logo + etiqueta de texto. Se ve desde el
// HTML servido por el servidor (sin depender de JS) para evitar cualquier
// parpadeo; mientras tanto el resto del árbol ya está montado detrás y
// descargando en segundo plano. JS sólo decide CUÁNDO desvanecerla: cuando
// el hero (foto o video) ya está listo, con un mínimo (para que no sea un
// parpadeo) y un máximo (para no dejar a alguien con conexión lenta atrapado).
export function Preloader() {
  const { t } = useLanguage();
  const shownThisSession = useSyncExternalStore(subscribeNoop, readShownThisSession, readShownOnServer);
  const [finished, setFinished] = useState(false);
  const ready = shownThisSession || finished;
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    // Ya se vio en esta sesión: "ready" sale en true de shownThisSession.
    if (readShownThisSession()) return;

    document.body.style.overflow = "hidden";

    const start = Date.now();
    let settled = false;
    let heroDone = false;

    const finishIfDone = () => {
      if (settled || !heroDone) return;
      settled = true;
      window.clearTimeout(maxTimer);
      const elapsed = Date.now() - start;
      window.setTimeout(() => setFinished(true), Math.max(0, MIN_VISIBLE_MS - elapsed));
    };

    const forceFinish = () => {
      if (settled) return;
      settled = true;
      const elapsed = Date.now() - start;
      window.setTimeout(() => setFinished(true), Math.max(0, MIN_VISIBLE_MS - elapsed));
    };

    const maxTimer = window.setTimeout(forceFinish, MAX_WAIT_MS);

    // El hero hoy es una foto (<img class="hero-video">, ver Hero.tsx), no un
    // video: esperar "descarga completa de video" sobre un <img> nunca se
    // cumplía y la pantalla de carga se quedaba SIEMPRE hasta MAX_WAIT_MS.
    // Si vuelve a ser video, se sigue usando la espera de video de siempre.
    const heroEl = document.querySelector<HTMLElement>(".hero-video");
    const onHeroDone = () => {
      heroDone = true;
      finishIfDone();
    };
    const cleanupHero =
      heroEl instanceof HTMLVideoElement
        ? waitForFullDownload(heroEl, onHeroDone)
        : waitForImage(heroEl instanceof HTMLImageElement ? heroEl : null, onHeroDone);

    // El video de Contacto (8 MB, muy abajo en la página) ya no retiene la
    // pantalla de carga: con preload="metadata" nunca llegaba a descargarse
    // completo, así que sólo sumaba espera. Se descarga en segundo plano
    // en cuanto la página ya está visible (ver el efecto de "ready").

    return () => {
      window.clearTimeout(maxTimer);
      cleanupHero();
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    // Se marca como visto recién al terminar (no al arrancar): si se marcara
    // antes, cualquier re-render durante la espera leería "visto" en
    // shownThisSession y cortaría la animación a medias.
    sessionStorage.setItem(PRELOADER_SESSION_KEY, "1");
    document.body.style.overflow = "";
    // Ya con la página visible y las imágenes de arriba cargadas, se pide el
    // video de Contacto completo para que su scroll-scrub esté fluido al
    // llegar ahí, sin competir con las imágenes durante la carga inicial.
    const contactoVideo = document.querySelector<HTMLVideoElement>(".contacto-video");
    if (contactoVideo) contactoVideo.preload = "auto";
    const id = window.setTimeout(() => setMounted(false), 650);
    return () => window.clearTimeout(id);
  }, [ready]);

  if (!mounted) return null;

  return (
    <div className={cn("preloader", ready && "preloader-done")} role="status" aria-live="polite" aria-hidden={ready}>
      {/* El logo se "arma" pieza por pieza (arriba, izquierda, derecha, abajo,
          y por último el texto) en vez de aparecer de golpe — son 5 copias de
          la misma imagen, cada una recortada a su cuadrante con clip-path
          (ver ".preloader-logo-piece" en globals.css). El navegador sólo pide
          el archivo una vez (misma URL), así que no pesa más que antes. */}
      <div className="preloader-logo-wrap" role="img" aria-label="SH Arboledas">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/logo-fondo.webp" alt="" aria-hidden="true" className="preloader-logo-piece piece-top" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/logo-fondo.webp" alt="" aria-hidden="true" className="preloader-logo-piece piece-left" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/logo-fondo.webp" alt="" aria-hidden="true" className="preloader-logo-piece piece-right" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/logo-fondo.webp" alt="" aria-hidden="true" className="preloader-logo-piece piece-bottom" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/logo-fondo.webp" alt="" aria-hidden="true" className="preloader-logo-piece piece-text" />
      </div>
      <span className="preloader-label">{t("preloader.loading")}</span>
    </div>
  );
}