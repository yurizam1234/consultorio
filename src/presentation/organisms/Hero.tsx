"use client";

import { Icon } from "@/presentation/atoms/Icon";
import { useEmergencyModal } from "@/presentation/hooks/useEmergencyModal";
import { useCitaModal } from "@/presentation/hooks/useCitaModal";
import { useLanguage } from "@/presentation/hooks/useLanguage";

export function Hero() {
  const { t } = useLanguage();
  const { open: openEmergency } = useEmergencyModal();
  // Ya redirige al Portal del Paciente (ver useCitaModal.tsx) — un solo
  // lugar para la URL del portal en vez de repetirla en cada componente que
  // agenda cita.
  const { open: openCita } = useCitaModal();

  return (
    <section className="hero" id="inicio">
      <div className="hero-video-wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="hero-video"
          src="/hero/hospital.jpg"
          alt=""
          fetchPriority="high"
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
          {t("hero.h1_pre")}<br /><em>{t("hero.h1_em")}</em>
        </h1>
        {/* El folio COFEPRIS/Licencia Sanitaria ya vive en el nav, el badge
            flotante y el footer (ver ComplianceBadge/ComplianceFloatButton) —
            aquí, en el espacio más valioso de la página, va algo que un
            visitante nuevo necesita antes que un número regulatorio: qué es
            el hospital y en qué ciudad está. */}
       <p className="hero-video-subtitle" style={{ color: "white" }}>
          {t("hero.subtitle")}
        </p>

        <div className="hero-action-cards" style={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <button
            type="button"
            className="hero-action-card hero-action-card-urgent"
            onClick={openEmergency}
            aria-label={`${t("contact.form_title")} — ${t("emergency.label")}`}
          >
            <span className="hero-action-icon">
              <span className="hero-action-pulse" aria-hidden="true" />
              <Icon name="phone" strokeWidth={2} />
            </span>
            <span className="hero-action-text">
              <strong className="hero-action-title">{t("contact.form_title")}</strong>
              <span className="hero-action-sub">
                <span className="hero-action-live-dot" aria-hidden="true" />
                {t("emergency.label")}
              </span>
            </span>
            <span className="hero-action-arrow" aria-hidden="true">
              <Icon name="chevron-right" strokeWidth={2.2} />
            </span>
          </button>
        </div>

        {/* Card "Agendar cita": vidrio esmerilado, siempre visible, se desliza desde
            el costado derecho (mismo timing que la card de arriba, ver ScrollEffects.tsx).
            ".cita-card-center" solo centra horizontalmente (estático, GSAP no lo toca);
            ".cita-card-wrap" es el que anima ScrollEffects.tsx (opacity + x) — si el
            centrado viviera en el mismo elemento que anima GSAP, el x-slide de GSAP
            pisaría el translateX(-50%) del centrado en cada frame. */}
        <div className="cita-card-center">
          <div className="cita-card-wrap">
            <button type="button" className="cita-card" onClick={openCita}>
              <div className="cita-card-inner">
                <div className="cita-card-head" style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                  <span className="cita-card-icon">
                    <Icon name="calendar-hours" strokeWidth={1.8} />
                  </span>
                  <h4>{t("modal.title")}</h4>
                </div>

                <div className="cita-card-body">
                  <div className="cita-summary" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", width: "100%" }}>
                    <span className="cita-summary-tag">{t("modal.tagline")}</span>

                    <strong className="cita-summary-value">{t("float.agendar")}</strong>

                    <span className="cita-confirm-btn">
                      {t("modal.confirm_btn")}
                      <Icon name="arrow-right" strokeWidth={2.2} />
                    </span>

                    <p className="cita-whatsapp-hint">{t("modal.whatsapp_hint")}</p>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
