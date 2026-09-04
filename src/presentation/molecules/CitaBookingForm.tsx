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
// useCitaBooking() por su cuenta, con su propio estado.
//
// Flujo en 5 pasos: 1) ¿Qué necesitas? (consulta, estudio, etc.) — 2) Área —
// 3) Motivo/procedimiento — 4) Fecha — 5) Horario. Con confirmación por WhatsApp.
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
    motivoActual,
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
        <div className="cita-card-head-titles">
          <h4>{t("modal.title")}</h4>
          <span className="cita-card-head-sub">
            {lang === "es" ? "Atención médica y diagnóstica en Tuxtla Gutiérrez" : "Medical & diagnostic care in Tuxtla Gutiérrez"}
          </span>
        </div>
      </div>

      {esUrgencia ? (
        <div className="cita-route-card cita-route-urgencia">
          {/* Sin esto no había forma de volver al formulario normal si se
              tocaba "Es una urgencia" por error */}
          <button type="button" className="cita-route-back" onClick={() => setTipo("consulta")}>
            <Icon name="chevron-left" strokeWidth={2.2} />
            {t("modal.volver_formulario")}
          </button>
          <strong>{t("modal.urgencia_title")}</strong>
          <p>{t("modal.urgencia_body")}</p>

          <div className="cita-route-actions">
            <a className="cita-route-btn cita-route-btn-danger" href={`tel:${contactoInfo.telefonoUrgenciasHref}`}>
              {t("modal.urgencia_call")}  {contactoInfo.telefonoUrgencias}
            </a>
	    <a
		className="cita-route-btn cita-route-btn-danger"
		href={`tel:${contactoInfo.telefonoUrgenciasHref2}`}
		>
		{t("modal.urgencia_call")} {contactoInfo.telefonoUrgencias2}
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
          <button type="button" className="cita-route-back" onClick={() => setTipo("consulta")}>
            <Icon name="chevron-left" strokeWidth={2.2} />
            {t("modal.volver_formulario")}
          </button>
          <strong>{t("modal.hospitalario_title")}</strong>
          <p>{t("modal.hospitalario_body")}</p>
          <a className="cita-route-btn cita-route-btn-primario" href={whatsappHref} target="_blank" rel="noopener noreferrer">
            {t("modal.hospitalario_cta")}
            <Icon name="arrow-right" strokeWidth={2.2} />
          </a>
        </div>
      ) : esNormal ? (
        <div className="cita-card-body">
          {/* Columna izquierda: 5 pasos organizados en grid para máximo aprovechamiento del ancho */}
          <div className="cita-col-left">
            <div className="cita-step cita-step-full">
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

            <div className="cita-steps-grid">
              <div className="cita-step">
                <p className="cita-step-label">
                  <span className="cita-step-num">2</span>
                  {t("modal.step_area")}
                </p>
                <div className="cita-select-wrapper">
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
                  <span className="cita-select-arrow" aria-hidden="true">
                    <Icon name="chevron-right" strokeWidth={2} />
                  </span>
                </div>
              </div>

              <div className="cita-step">
                <p className="cita-step-label">
                  <span className="cita-step-num">3</span>
                  {t("modal.step_motivo")}
                </p>
                <div className="cita-select-wrapper">
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
                  <span className="cita-select-arrow" aria-hidden="true">
                    <Icon name="chevron-right" strokeWidth={2} />
                  </span>
                </div>
              </div>
            </div>

            {preparacion && (
              <div className="cita-prep-note">
                <span className="cita-prep-note-icon">
                  <Icon name="shield-check" strokeWidth={2} />
                </span>
                <div className="cita-prep-note-text">
                  <strong>{t("modal.prep_label")}</strong>
                  <span>{preparacion}</span>
                </div>
              </div>
            )}

            <div className="cita-steps-grid">
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
            </div>
          </div>

          {/* Columna derecha: Resumen Panel de Cita + Confirmar */}
          <div className="cita-col-right">
            <div className="cita-summary">
              <div className="cita-summary-card">
                <div className="cita-summary-header">
                  <span className="cita-summary-icon">
                    <Icon name="check-circle" strokeWidth={2} />
                  </span>
                  <span className="cita-summary-tag">{t("modal.tagline")}</span>
                </div>

                <div className="cita-summary-content">
                  {areaActual && motivoActual ? (
                    <div className="cita-summary-details">
                      <div className="cita-summary-item">
                        <span className="cita-summary-item-label">{lang === "es" ? "Especialidad / Área" : "Specialty / Area"}</span>
                        <strong className="cita-summary-val-highlight">{areaActual.nombre[lang]}</strong>
                      </div>
                      <div className="cita-summary-item">
                        <span className="cita-summary-item-label">{lang === "es" ? "Motivo / Procedimiento" : "Procedure / Reason"}</span>
                        <span className="cita-summary-val">{motivoActual.nombre[lang]}</span>
                      </div>
                      <div className="cita-summary-badge-row">
                        <span className="cita-summary-badge">
                          <Icon name="calendar" strokeWidth={1.8} />
                          <span>{summary.split(" · ")[2] || ""}</span>
                        </span>
                        <span className="cita-summary-badge">
                          <Icon name="clock" strokeWidth={1.8} />
                          <span>{horario} hrs</span>
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="cita-summary-empty">
                      <strong className="cita-summary-placeholder-title">{summary}</strong>
                      <p className="cita-summary-placeholder-hint">
                        {lang === "es" ? "Selecciona el área y motivo para generar tu resumen." : "Select area and reason to build your appointment summary."}
                      </p>
                    </div>
                  )}
                </div>

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
                  {status === "loading" ? (
                    t("modal.confirm_btn_loading")
                  ) : (
                    <>
                      <span>{t("modal.send_btn")}</span>
                      <Icon name="arrow-right" strokeWidth={2.2} />
                    </>
                  )}
                </button>

                <div className="cita-whatsapp-hint-wrap">
                  <span className="cita-whatsapp-dot" aria-hidden="true" />
                  <p className="cita-whatsapp-hint">{t("modal.whatsapp_hint")}</p>
                </div>
              </div>

              <p className="cita-nota-mini">{t("modal.nota_mini")}</p>
            </div>
          </div>
        </div>
      ) : null}

      <div className={cn("toast", status === "success" && "show")}>{t("modal.toast")}</div>
    </div>
  );
}

