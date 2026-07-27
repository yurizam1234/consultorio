"use client";

import { Icon } from "@/presentation/atoms/Icon";
import { useEmergencyModal } from "@/presentation/hooks/useEmergencyModal";
import { useCitaModal } from "@/presentation/hooks/useCitaModal";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { CitaBookingForm } from "@/presentation/molecules/CitaBookingForm";

export function Hero() {
  const { t } = useLanguage();
  const { open: openEmergency } = useEmergencyModal();
  const { open: openCita } = useCitaModal();

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
        <div className="hero-video-fade" aria-hidden="true" />

        {/* Aparece y desaparece junto con el título (misma curva 0→35% del
            scroll del hero, ver syncHero() en ScrollEffects.tsx). Abre el
            mismo formulario que la card grande de abajo, sin reemplazarla. */}
        <button type="button" className="hero-cita-teaser" onClick={openCita}>
          <Icon name="calendar-hours" strokeWidth={1.8} />
          {t("float.agendar")}
        </button>

        <h1 className="hero-video-title">
          {t("hero.h1_pre")} <em>{t("hero.h1_em")}</em>
        </h1>

        <div className="hero-action-cards">
          <button className="hero-action-card hero-action-card-urgent" onClick={openEmergency}>
            <span className="hero-action-icon">
              <Icon name="phone" strokeWidth={1.8} />
            </span>
            <span className="hero-action-text">
              <strong>{t("contact.form_title")}</strong>
              <span>{t("emergency.label")}</span>
            </span>
          </button>
        </div>

        {/* Card "Agendar cita": vidrio esmerilado, siempre visible, se desliza desde
            el costado derecho (mismo timing que la card de arriba, ver ScrollEffects.tsx). */}
        <div className="cita-card-wrap">
          <div className="cita-card">
            <CitaBookingForm />
          </div>
        </div>
      </div>
    </section>
  );
}
