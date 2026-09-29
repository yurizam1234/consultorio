"use client";

import { useEffect, useRef, useState, type SyntheticEvent } from "react";
import type { TestimonioVideo } from "@/shared/data/testimonios";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { Icon } from "@/presentation/atoms/Icon";
import { cn } from "@/shared/lib/utils";

interface VideoTestimonialCardProps {
  testimonio: TestimonioVideo;
  isActive?: boolean;
  onPlay?: () => void;
  onEnded?: () => void;
}

// Sólo un testimonio suena a la vez: al dar play a uno se pausan los demás.
function pauseOtherTestimonials(event: SyntheticEvent<HTMLVideoElement>) {
  document.querySelectorAll<HTMLVideoElement>("video.video-testimonial-player").forEach((video) => {
    if (video !== event.currentTarget) video.pause();
  });
}

// Margen con el que se monta el video antes de entrar a pantalla, para que el
// poster ya esté pintado cuando el usuario llegue a la sección.
const LAZY_ROOT_MARGIN = "400px";

export function VideoTestimonialCard({ testimonio, isActive, onPlay, onEnded }: VideoTestimonialCardProps) {
  const { lang, t } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isNearScreen, setIsNearScreen] = useState(false);

  // Lazy loading: el <video> (y con él su poster) no se monta hasta que la
  // tarjeta se acerca a la pantalla. Una vez montado se queda — desmontarlo
  // al salir cortaría la reproducción.
  useEffect(() => {
    const card = cardRef.current;
    if (!card || isNearScreen) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearScreen(true);
          observer.disconnect();
        }
      },
      { rootMargin: LAZY_ROOT_MARGIN },
    );
    observer.observe(card);
    return () => observer.disconnect();
  }, [isNearScreen]);

  return (
    <div ref={cardRef} className={cn("video-testimonial-card", isActive && "is-active")}>
      {testimonio.videoSrc && !isNearScreen ? (
        <div className="video-testimonial-player" aria-hidden />
      ) : testimonio.videoSrc ? (
        <video
          controls
          playsInline
          // Con poster no hace falta bajar metadata al cargar la página: el
          // navegador ya tiene algo que pintar y sólo pide el video al dar play.
          preload={testimonio.posterSrc ? "none" : "metadata"}
          poster={testimonio.posterSrc ?? undefined}
          className="video-testimonial-player"
          onPlay={(event) => {
            pauseOtherTestimonials(event);
            onPlay?.();
          }}
          onEnded={onEnded}
        >
          {/* El orden manda: el navegador toma la primera fuente que soporta. */}
          {testimonio.webmSrc && <source src={testimonio.webmSrc} type="video/webm" />}
          <source src={testimonio.videoSrc} type="video/mp4" />
          {testimonio.subtitlesSrc && (
            <track kind="subtitles" src={testimonio.subtitlesSrc} srcLang={lang} default />
          )}
        </video>
      ) : (
        <div className="video-testimonial-empty">
          <span className="video-testimonial-empty-icon">
            <Icon name="video" strokeWidth={1.8} />
          </span>
          <p>{t("testimonios.placeholder")}</p>
          <span>{t("testimonios.placeholder_sub")}</span>
        </div>
      )}
    </div>
  );
}
