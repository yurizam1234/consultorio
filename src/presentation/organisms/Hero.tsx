"use client";

import { useLanguage } from "@/presentation/hooks/useLanguage";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="hero" id="inicio">
      <div className="hero-video-wrap">
        <video
          className="hero-video"
          src="/videos/hero_arboledas_scrub.mp4"
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className="hero-video-scrim" />
        <h1 className="hero-video-title">
          {t("hero.h1_pre")} <em>{t("hero.h1_em")}</em>
        </h1>
      </div>
    </section>
  );
}