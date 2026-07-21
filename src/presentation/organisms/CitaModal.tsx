"use client";

import { Icon } from "@/presentation/atoms/Icon";
import { Chip } from "@/presentation/atoms/Chip";
import { useCitaModal } from "@/presentation/hooks/useCitaModal";
import { useCitaBooking } from "@/presentation/hooks/useCitaBooking";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { especialidades, diasDisponibles, horariosDisponibles } from "@/shared/data/contacto";
import { cn } from "@/shared/lib/utils";

export function CitaModal() {
  const { isOpen, close } = useCitaModal();
  const { especialidad, setEspecialidad, dia, setDia, horario, setHorario, status, confirmar, summary } =
    useCitaBooking();
  const { t } = useLanguage();

  return (
    <div className={cn("cita-modal-overlay", isOpen && "open")} onClick={(event) => event.target === event.currentTarget && close()}>
      <div className="cita-modal" role="dialog" aria-modal="true" aria-labelledby="citaModalTitle">
        <button className="cita-modal-close" aria-label={t("modal.close")} onClick={close}>
          ×
        </button>

        <div className="organic-booker-card">
          <div className="card-graphic-container">
            <Icon name="calendar-hours" strokeWidth={1.6} />
          </div>

          <div className="card-info-content">
            <div className="organic-card-head">
              <h4 id="citaModalTitle">{t("modal.title")}</h4>
              <span className="demo-badge">{t("modal.demo_badge")}</span>
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
  );
}
