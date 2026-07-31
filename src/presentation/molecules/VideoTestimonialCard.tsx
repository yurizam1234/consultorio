"use client";

import type { TestimonioVideo } from "@/shared/data/testimonios";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { Icon } from "@/presentation/atoms/Icon";
import { cn } from "@/shared/lib/utils";

interface VideoTestimonialCardProps {
  testimonio: TestimonioVideo;
  active: boolean;
}

export function VideoTestimonialCard({ testimonio, active }: VideoTestimonialCardProps) {
  const { lang, t } = useLanguage();

  return (
    <div className={cn("video-testimonial-card", active && "active")}>
      {testimonio.videoSrc ? (
        <video controls poster={testimonio.posterSrc ?? undefined} className="video-testimonial-player">
          <source src={testimonio.videoSrc} />
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
