"use client";

import { useEffect, useState } from "react";
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

// Pantalla de carga: fondo blanco + logo + etiqueta de texto. Se ve desde el
// HTML servido por el servidor (sin depender de JS) para evitar cualquier
// parpadeo; mientras tanto el resto del árbol (Hero, Contacto,
// videos...) ya está montado detrás y descargando en segundo plano. JS sólo
// decide CUÁNDO desvanecerla: cuando los videos de scroll-scrub (hero y
// contacto) ya se descargaron por completo, con un mínimo (para que no sea un
// parpadeo) y un máximo (para no dejar a alguien con conexión lenta atrapado).
export function Preloader() {
  const { t } = useLanguage();
  // Lazy initializer (no un useEffect con setState): así en una navegación de
  // vuelta a "/" dentro de la misma sesión arranca directo en "ready=true" —
  // sin eso, aunque el efecto de abajo lo corrija enseguida, se alcanza a
  // pintar un primer frame con el preloader visible.
  const [ready, setReady] = useState(
    () => typeof window !== "undefined" && sessionStorage.getItem(PRELOADER_SESSION_KEY) === "1"
  );
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem(PRELOADER_SESSION_KEY) === "1") {
      // "ready" ya salió en true del lazy initializer de arriba.
      return;
    }
    sessionStorage.setItem(PRELOADER_SESSION_KEY, "1");

    document.body.style.overflow = "hidden";

    const start = Date.now();
    let settled = false;
    let heroDone = false;
    let contactoDone = false;

    const finishIfDone = () => {
      if (settled || !heroDone || !contactoDone) return;
      settled = true;
      window.clearTimeout(maxTimer);
      const elapsed = Date.now() - start;
      window.setTimeout(() => setReady(true), Math.max(0, MIN_VISIBLE_MS - elapsed));
    };

    const forceFinish = () => {
      if (settled) return;
      settled = true;
      const elapsed = Date.now() - start;
      window.setTimeout(() => setReady(true), Math.max(0, MIN_VISIBLE_MS - elapsed));
    };

    const maxTimer = window.setTimeout(forceFinish, MAX_WAIT_MS);

    const heroVideo = document.querySelector<HTMLVideoElement>(".hero-video");
    const contactoVideo = document.querySelector<HTMLVideoElement>(".contacto-video");

    const cleanupHero = waitForFullDownload(heroVideo, () => {
      heroDone = true;
      finishIfDone();
    });
    const cleanupContacto = waitForFullDownload(contactoVideo, () => {
      contactoDone = true;
      finishIfDone();
    });

    return () => {
      window.clearTimeout(maxTimer);
      cleanupHero();
      cleanupContacto();
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.body.style.overflow = "";
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
        <img src="/img/logo-fondo.png" alt="" aria-hidden="true" className="preloader-logo-piece piece-top" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/logo-fondo.png" alt="" aria-hidden="true" className="preloader-logo-piece piece-left" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/logo-fondo.png" alt="" aria-hidden="true" className="preloader-logo-piece piece-right" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/logo-fondo.png" alt="" aria-hidden="true" className="preloader-logo-piece piece-bottom" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/logo-fondo.png" alt="" aria-hidden="true" className="preloader-logo-piece piece-text" />
      </div>
      <span className="preloader-label">{t("preloader.loading")}</span>
    </div>
  );
}