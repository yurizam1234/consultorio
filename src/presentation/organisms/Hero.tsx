"use client";

import { Icon } from "@/presentation/atoms/Icon";
import { Chip } from "@/presentation/atoms/Chip";
import { useEmergencyModal } from "@/presentation/hooks/useEmergencyModal";
import { useCitaBooking } from "@/presentation/hooks/useCitaBooking";
import { useDisclosure } from "@/presentation/hooks/useDisclosure";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { especialidades, diasDisponibles, horariosDisponibles } from "@/shared/data/contacto";
import { cn } from "@/shared/lib/utils";

export function Hero() {
  const { t } = useLanguage();
  const { open: openEmergency } = useEmergencyModal();
  const { open: panelOpen, toggle: togglePanel, close: closePanel, ref: panelRef } = useDisclosure();
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

        {/* Pestaña vertical "Agendar cita": pegada al borde derecho, se despliega
            horizontalmente al hacer click (revela el formulario sin taparse con
            ningún modal centrado). Aparece con el mismo timing que la card de arriba. */}
        <div ref={panelRef} className={cn("cita-tab-wrap", panelOpen && "open")}>
          <button
            className="cita-tab"
            type="button"
            aria-haspopup="true"
            aria-expanded={panelOpen}
            onClick={() => togglePanel()}
          >
            <Icon name="calendar-hours" strokeWidth={1.8} />
            <span className="cita-tab-label">{t("float.agendar")}</span>
          </button>

          <div className="cita-tab-panel">
            <div className="cita-tab-panel-inner">
              <div className="cita-tab-panel-head">
                <h4>{t("modal.title")}</h4>
                <button className="cita-tab-panel-close" aria-label={t("modal.close")} onClick={closePanel}>
                  ×
                </button>
              </div>

              <div className="booking-row">
                <div className="booking-field">
                  <p className="booker-label">{t("modal.step1_label")}</p>
                  <div className="chip-row">
                    {especialidades.map((spec) => (
                      <Chip key={spec} active={spec === especialidad} onClick={() => setEspecialidad(spec)}>
                        {spec}
                      </Chip>
                    ))}
                  </div>
                </div>

                <div className="booking-field">
                  <p className="booker-label">{t("modal.step2_label")}</p>
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

                <div className="booking-field">
                  <p className="booker-label">{t("modal.step3_label")}</p>
                  <div className="chip-row">
                    {horariosDisponibles.map((time) => (
                      <Chip key={time} active={time === horario} onClick={() => setHorario(time)}>
                        {time}
                      </Chip>
                    ))}
                  </div>
                </div>
              </div>

              <div className="card-summary-block">
                <div className="summary-left">
                  <span className="info-tagline">{t("modal.tagline")}</span>
                  <h2 className="info-main-date">{summary}</h2>
                </div>
                <button className="card-pill-btn" onClick={confirmar} disabled={status === "loading"}>
                  {status === "loading" ? t("modal.confirm_btn_loading") : t("modal.confirm_btn")}
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