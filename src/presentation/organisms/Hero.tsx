"use client";

import { Reveal } from "@/presentation/atoms/Reveal";
import { StatItem } from "@/presentation/molecules/StatItem";
import { heroStats } from "@/shared/data/contacto";
import { HeroCtas } from "@/presentation/organisms/HeroCtas";
import { useLanguage } from "@/presentation/hooks/useLanguage";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="hero" id="inicio">
      <div className="wrap">
        <Reveal className="hero-visual-3d">
          <div className="hero-3d-glow" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="hero-3d-img"
            src="https://images.unsplash.com/photo-1516549655169-df83a0774514?w=900&q=80"
            alt="Ilustración 3D SH Arboledas"
          />
        </Reveal>

        <Reveal className="hero-info">
          <p className="eyebrow">{t("hero.eyebrow")}</p>
          <h1>
            {t("hero.h1_pre")} <em>{t("hero.h1_em")}</em>
          </h1>
          <p className="lead">{t("hero.lead")}</p>
          <HeroCtas />
          <div className="hero-stats">
            {heroStats.map((stat, index) => (
              <StatItem key={stat.value} value={stat.value} label={t(`hero.stat${index + 1}`)} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
