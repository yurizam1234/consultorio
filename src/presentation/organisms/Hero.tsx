"use client";

import { Icon } from "@/presentation/atoms/Icon";
import { Chip } from "@/presentation/atoms/Chip";
import { useEmergencyModal } from "@/presentation/hooks/useEmergencyModal";
import { useCitaBooking } from "@/presentation/hooks/useCitaBooking";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { especialidades, diasDisponibles, horariosDisponibles } from "@/shared/data/contacto";
import { cn } from "@/shared/lib/utils";

export function Hero() {
  const { t } = useLanguage();
  const { open: openEmergency } = useEmergencyModal();
  const { especialidad, setEspecialidad, dia, setDia, horario, setHorario, status, confirmar, summary } =
    useCitaBooking();

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
            <div className="cita-card-inner">
              <div className="cita-card-head">
                <span className="cita-card-icon">
                  <Icon name="calendar-hours" strokeWidth={1.8} />
                </span>
                <h4>{t("modal.title")}</h4>
              </div>

              <div className="cita-steps">
                <div className="cita-step">
                  <p className="cita-step-label">
                    <span className="cita-step-num">1</span>
                    {t("modal.step1_label")}
                  </p>
                  <div className="chip-row">
                    {especialidades.map((spec) => (
                      <Chip key={spec} active={spec === especialidad} onClick={() => setEspecialidad(spec)}>
                        {spec}
                      </Chip>
                    ))}
                  </div>
                </div>

                <div className="cita-step">
                  <p className="cita-step-label">
                    <span className="cita-step-num">2</span>
                    {t("modal.step2_label")}
                  </p>
                  <div className="day-strip">
                    {diasDisponibles.map((d) => (
                      <div
                        key={d.label}
                        className={cn("day", d.label === dia && "active")}
                        onClick={() => setDia(d.label)}
                      >
                        <span className="dname">{d.dname}</span>
                        <span className="dnum">{d.dnum}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="cita-step">
                  <p className="cita-step-label">
                    <span className="cita-step-num">3</span>
                    {t("modal.step3_label")}
                  </p>
                  <div className="chip-row">
                    {horariosDisponibles.map((time) => (
                      <Chip key={time} active={time === horario} onClick={() => setHorario(time)}>
                        {time}
                      </Chip>
                    ))}
                  </div>
                </div>
              </div>

              <div className="cita-divider" />

              <div className="cita-summary">
                <span className="cita-summary-tag">{t("modal.tagline")}</span>
                <strong className="cita-summary-value">{summary}</strong>
                <button className="cita-confirm-btn" onClick={confirmar} disabled={status === "loading"}>
                  {status === "loading" ? t("modal.confirm_btn_loading") : t("modal.confirm_btn")}
                  <Icon name="arrow-right" strokeWidth={2.2} />
                </button>
              </div>

              <div className={cn("toast", status === "success" && "show")}>{t("modal.toast")}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}