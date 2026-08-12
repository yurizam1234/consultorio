"use client";

import { Icon } from "@/presentation/atoms/Icon";
import { Chip } from "@/presentation/atoms/Chip";
import { DatePickerField } from "@/presentation/molecules/DatePickerField";
import { TimePickerField } from "@/presentation/molecules/TimePickerField";
import { citaTimeSlots, useCitaBooking } from "@/presentation/hooks/useCitaBooking";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { tiposCita } from "@/shared/data/areasCita";
import { contactoInfo } from "@/shared/data/contacto";
import { cn } from "@/shared/lib/utils";

// Formulario de "Agenda tu cita" reutilizable: lo usa tanto la card grande del
// Hero (siempre visible, ver Hero.tsx) como CitaModal.tsx (abierto desde el
// teaser del hero y desde el dock flotante). Cada instancia llama a
// useCitaBooking() por su cuenta, con su propio estado — no hace falta
// compartirlo entre ambas porque el usuario solo interactúa con una a la vez.
//
// Flujo en 5 pasos (modelo index.html): 1) ¿Qué necesitas? con rutas especiales
// para urgencia (no se agendan) y hospitalario (cotización) — 2) Área filtrada
// por el tipo — 3) Motivo o procedimiento con su preparación previa — 4) Fecha
// — 5) Horario. El envío exige el consentimiento de privacidad.
export function CitaBookingForm() {
  const { t, lang } = useLanguage();
  const {
    tipo,
    setTipo,
    areaId,
    setAreaId,
    motivo,
    setMotivo,
    fecha,
    setFecha,
    horario,
    setHorario,
    consent,
    setConsent,
    status,
    confirmar,
    areasDisponibles,
    areaActual,
    preparacion,
    esUrgencia,
    esHospitalario,
    esNormal,
    completo,
    summary,
    whatsappHref,
  } = useCitaBooking();

  return (
    <div className="cita-card-inner">
      <div className="cita-card-head">
        <span className="cita-card-icon">
          <Icon name="calendar-hours" strokeWidth={1.8} />
        </span>
        <h4>{t("modal.title")}</h4>
      </div>

      {esUrgencia ? (
        <div className="cita-route-card cita-route-urgencia">
          <strong>{t("modal.urgencia_title")}</strong>
          <p>{t("modal.urgencia_body")}</p>
          <div className="cita-route-actions">
            <a className="cita-route-btn cita-route-btn-danger" href={`tel:${contactoInfo.telefonoUrgenciasHref}`}>
              {t("modal.urgencia_call")}
            </a>
            <a
              className="cita-route-btn cita-route-btn-line"
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("modal.urgencia_whatsapp")}
            </a>
          </div>
        </div>
      ) : esHospitalario ? (
        <div className="cita-route-card cita-route-hospitalario">
          <strong>{t("modal.hospitalario_title")}</strong>
          <p>{t("modal.hospitalario_body")}</p>
          <a className="cita-route-btn cita-route-btn-primario" href={whatsappHref} target="_blank" rel="noopener noreferrer">
            {t("modal.hospitalario_cta")}
            <Icon name="arrow-right" strokeWidth={2.2} />
          </a>
        </div>
      ) : esNormal ? (
        <div className="cita-card-body">
          {/* Columna izquierda: Tipo + Área + Motivo (con preparación) */}
          <div className="cita-col-left">
            <div className="cita-step">
              <p className="cita-step-label">
                <span className="cita-step-num">1</span>
                {t("modal.step0_label")}
              </p>
              <div className="chip-row cita-tipo-row">
                {tiposCita.map((opcion) => (
                  <Chip key={opcion.id} active={opcion.id === tipo} onClick={() => setTipo(opcion.id)}>
                    {opcion.label[lang]}
                  </Chip>
                ))}
              </div>
            </div>

            <div className="cita-step">
              <p className="cita-step-label">
                <span className="cita-step-num">2</span>
                {t("modal.step_area")}
              </p>
              <select
                className="cita-select-field"
                value={areaId}
                onChange={(event) => setAreaId(event.target.value)}
                aria-label={t("modal.step_area")}
              >
                <option value="">{t("modal.area_placeholder")}</option>
                {areasDisponibles.map((area) => (
                  <option key={area.id} value={area.id}>
                    {area.nombre[lang]}
                  </option>
                ))}
              </select>
            </div>

            <div className="cita-step">
              <p className="cita-step-label">
                <span className="cita-step-num">3</span>
                {t("modal.step_motivo")}
              </p>
              <select
                className="cita-select-field"
                value={motivo}
                disabled={!areaActual}
                onChange={(event) => setMotivo(event.target.value)}
                aria-label={t("modal.step_motivo")}
              >
                <option value="">
                  {areaActual ? t("modal.motivo_placeholder") : t("modal.motivo_placeholder_area")}
                </option>
                {areaActual?.procs.map((procedimiento, index) => (
                  <option key={index} value={String(index)}>
                    {procedimiento.nombre[lang]}
                    {procedimiento.tag ? ` — ${procedimiento.tag[lang]}` : ""}
                  </option>
                ))}
              </select>
            </div>

            {preparacion && (
              <div className="cita-prep-note">
                <strong>{t("modal.prep_label")}</strong>
                <span>{preparacion}</span>
              </div>
            )}
          </div>

          {/* Columna derecha: Fecha + Horario + Resumen + Confirmar */}
          <div className="cita-col-right">
            <div className="cita-step">
              <p className="cita-step-label">
                <span className="cita-step-num">4</span>
                {t("modal.step_fecha")}
              </p>
              <DatePickerField value={fecha} onChange={setFecha} />
            </div>

            <div className="cita-step">
              <p className="cita-step-label">
                <span className="cita-step-num">5</span>
                {t("modal.step_horario")}
              </p>
              <TimePickerField value={horario} onChange={setHorario} slots={citaTimeSlots} />
            </div>

            <div className="cita-divider" />

            <div className="cita-summary">
              <span className="cita-summary-tag">{t("modal.tagline")}</span>
              <strong className="cita-summary-value">{summary}</strong>

              <label className="cita-consent">
                <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} />
                <span>
                  {t("modal.consent")} <a href="#aviso-privacidad">{t("modal.aviso_link")}</a>
                </span>
              </label>

              <button
                className="cita-confirm-btn"
                onClick={confirmar}
                disabled={status === "loading" || !completo}
              >
                {status === "loading" ? t("modal.confirm_btn_loading") : t("modal.send_btn")}
                <Icon name="arrow-right" strokeWidth={2.2} />
              </button>

              <p className="cita-whatsapp-hint">{t("modal.whatsapp_hint")}</p>
              <p className="cita-nota-mini">{t("modal.nota_mini")}</p>
            </div>
          </div>
        </div>
      ) : null}

      <div className={cn("toast", status === "success" && "show")}>{t("modal.toast")}</div>
    </div>
  );
}
