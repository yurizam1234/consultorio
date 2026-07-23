"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { cn } from "@/shared/lib/utils";

const MIN_VISIBLE_MS = 700;
const MAX_WAIT_MS = 7000;

// Pantalla de carga: fondo blanco + logo + un "barrido" de electrocardiograma en
// bucle. Se ve desde el HTML servido por el servidor (sin depender de JS) para
// evitar cualquier parpadeo; mientras tanto el resto del árbol (Hero, video...)
// ya está montado detrás y cargando en segundo plano. JS solo decide CUÁNDO
// desvanecerla: cuando el video del hero está listo para reproducirse sin
// cortes, con un mínimo (para que no sea un parpadeo) y un máximo (para no
// dejar a alguien con conexión lenta atrapado en la pantalla de carga).
export function Preloader() {
  const { t } = useLanguage();
  const [ready, setReady] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const start = Date.now();
    let settled = false;

    const finish = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(maxTimer);
      const elapsed = Date.now() - start;
      window.setTimeout(() => setReady(true), Math.max(0, MIN_VISIBLE_MS - elapsed));
    };

    const maxTimer = window.setTimeout(finish, MAX_WAIT_MS);
    const heroVideo = document.querySelector<HTMLVideoElement>(".hero-video");

    if (!heroVideo || heroVideo.readyState >= 3) {
      finish();
    } else {
      heroVideo.addEventListener("canplaythrough", finish, { once: true });
      heroVideo.addEventListener("loadeddata", finish, { once: true });
    }

    return () => {
      window.clearTimeout(maxTimer);
      heroVideo?.removeEventListener("canplaythrough", finish);
      heroVideo?.removeEventListener("loadeddata", finish);
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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/img/logo-fondo.png" alt="SH Arboledas" className="preloader-logo" />
      <div className="preloader-ecg">
        <svg viewBox="0 0 600 60" preserveAspectRatio="none" aria-hidden="true">
          <path className="preloader-ecg-track" d="M0,30 L210,30 L228,8 L246,52 L264,20 L282,30 L600,30" />
          <path className="preloader-ecg-sweep" d="M0,30 L210,30 L228,8 L246,52 L264,20 L282,30 L600,30" />
        </svg>
      </div>
      <span className="preloader-label">{t("preloader.loading")}</span>
    </div>
  );
}