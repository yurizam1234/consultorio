"use client";

import { Icon } from "@/presentation/atoms/Icon";
import { Chip } from "@/presentation/atoms/Chip";
import { DatePickerField } from "@/presentation/molecules/DatePickerField";
import { TimePickerField } from "@/presentation/molecules/TimePickerField";
import { citaTimeSlots, useCitaBooking } from "@/presentation/hooks/useCitaBooking";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { serviciosAgenda } from "@/shared/data/serviciosAgenda";
import { cn } from "@/shared/lib/utils";

// Formulario de "Agenda tu cita" reutilizable: lo usa tanto la card grande del
// Hero (siempre visible, ver Hero.tsx) como CitaModal.tsx (abierto desde el
// teaser del hero y desde el dock flotante). Cada instancia llama a
// useCitaBooking() por su cuenta, con su propio estado — no hace falta
// compartirlo entre ambas porque el usuario solo interactúa con una a la vez.
export function CitaBookingForm() {
  const { t, lang } = useLanguage();
  const {
    servicio,
    setServicio,
    fecha,
    setFecha,
    horario,
    setHorario,
    status,
    confirmar,
    summary,
    servicioActual,
    doctoresDelServicio,
    sinDoctorAsignado,
  } = useCitaBooking();

  return (
    <div className="cita-card-inner">
      <div className="cita-card-head">
        <span className="cita-card-icon">
          <Icon name="calendar-hours" strokeWidth={1.8} />
        </span>
        <h4>{t("modal.title")}</h4>
      </div>

      <div className="cita-card-body">
        {/* Columna izquierda: Especialidad + Fecha */}
        <div className="cita-col-left">
          <div className="cita-step">
            <p className="cita-step-label">
              <span className="cita-step-num">1</span>
              {t("modal.step1_label")}
            </p>
            <div className="chip-row">
              {serviciosAgenda.map((s) => (
                <Chip key={s.nombre} active={s.nombre === servicio} onClick={() => setServicio(s.nombre)}>
                  {s.nombre}
                </Chip>
              ))}
            </div>
          </div>

          <div className="cita-step">
            <p className="cita-step-label">
              <span className="cita-step-num">2</span>
              {t("modal.step2_label")}
            </p>
            <DatePickerField value={fecha} onChange={setFecha} />
          </div>

          {/* Info del especialista y recomendación — en una sola fila */}
          <div className="cita-info-row">
            <div className="cita-doctor-match">
              <Icon name="shield-check" strokeWidth={1.8} />
              <span>
                <b>{t("modal.doctor_label")}: </b>
                {sinDoctorAsignado ? t("modal.doctor_fallback") : doctoresDelServicio.map((d) => d.name ?? "—").join(", ")}
              </span>
            </div>
            <div className="cita-recomendacion">
              <b>{t("modal.recomendacion_label")}: </b>
              {servicioActual.recomendacion[lang]}
            </div>
          </div>
        </div>

        {/* Columna derecha: Horario + Resumen + Confirmar */}
        <div className="cita-col-right">
          <div className="cita-step">
            <p className="cita-step-label">
              <span className="cita-step-num">3</span>
              {t("modal.step3_label")}
            </p>
            <TimePickerField value={horario} onChange={setHorario} slots={citaTimeSlots} />
          </div>

          <div className="cita-divider" />

          <div className="cita-summary">
            <span className="cita-summary-tag">{t("modal.tagline")}</span>
            <strong className="cita-summary-value">{summary}</strong>
            <button className="cita-confirm-btn" onClick={() => confirmar(lang)} disabled={status === "loading"}>
              {status === "loading" ? t("modal.confirm_btn_loading") : t("modal.confirm_btn")}
              <Icon name="arrow-right" strokeWidth={2.2} />
            </button>
            <p className="cita-whatsapp-hint">{t("modal.whatsapp_hint")}</p>
          </div>
        </div>
      </div>


      <div className={cn("toast", status === "success" && "show")}>{t("modal.toast")}</div>
    </div>
  );
}
