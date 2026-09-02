"use client";

import { useRef } from "react";
import type { LucideIcon } from "lucide-react";
import { Waves, ScanLine, ClipboardList, ChevronLeft, Upload, X } from "lucide-react";
import { Chip } from "@/presentation/atoms/Chip";
import { Icon } from "@/presentation/atoms/Icon";
import { useImagingBookingModal } from "@/presentation/hooks/useImagingBookingModal";
import { useImagingBooking } from "@/presentation/hooks/useImagingBooking";
import { useAuth } from "@/presentation/hooks/useAuth";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { diasDisponibles, horariosDisponibles } from "@/shared/data/contacto";
import { areasEstudio, type AreaEstudioId } from "@/shared/data/estudiosImagen";
import { cn } from "@/shared/lib/utils";

const areaIcons: Record<AreaEstudioId, LucideIcon> = {
  resonancia: Waves,
  tomografia: ScanLine,
  general: ClipboardList,
};

export function ImagingBookingModal() {
  const { isOpen, close } = useImagingBookingModal();
  const { t } = useLanguage();
  const { patient } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    step,
    areaActual,
    selectArea,
    dia,
    setDia,
    horario,
    setHorario,
    edad,
    setEdad,
    peso,
    setPeso,
    archivo,
    setArchivo,
    status,
    goToResumen,
    back,
    reset,
    confirmar,
  } = useImagingBooking();

  function handleClose() {
    close();
    reset();
  }

  return (
    <div
      className={cn("cita-modal-overlay", isOpen && "open")}
      onClick={(event) => event.target === event.currentTarget && handleClose()}
    >
      <div className="cita-modal imaging-modal" role="dialog" aria-modal="true" aria-label={t("panel.agendar.modal_title")}>
        <button className="cita-modal-close" aria-label={t("modal.close")} onClick={handleClose}>
          <Icon name="x" strokeWidth={2.2} />
        </button>

        <div className="imaging-modal-inner cita-card">
          {step !== "area" && (
            <button type="button" className="imaging-back-btn" aria-label={t("aria.go_back")} onClick={back}>
              <ChevronLeft size={16} strokeWidth={2} />
              {t("panel.agendar.back")}
            </button>
          )}

          {step === "area" && (
            <>
              <h4 className="imaging-modal-title">{t("panel.agendar.select_area")}</h4>
              <p className="imaging-modal-hint">{t("panel.agendar.select_area_hint")}</p>

              <div className="imaging-area-grid">
                {areasEstudio.map((area) => {
                  const AreaIcon = areaIcons[area.id];
                  return (
                    <button key={area.id} type="button" className="imaging-area-card" onClick={() => selectArea(area.id)}>
                      <span className="imaging-area-icon">
                        <AreaIcon size={22} strokeWidth={1.8} />
                      </span>
                      <span>{t(area.labelKey)}</span>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {step === "agenda" && areaActual && (
            <>
              <h4 className="imaging-modal-title">{t(areaActual.labelKey)}</h4>

              <div className="cita-steps">
                <div className="cita-step">
                  <p className="cita-step-label">
                    <span className="cita-step-num">1</span>
                    {t("modal.step2_label")}
                  </p>
                  <div className="day-strip">
                    {diasDisponibles.map((d) => (
                      <button
                        key={d.label}
                        type="button"
                        className={cn("day", d.label === dia && "active")}
                        onClick={() => setDia(d.label)}
                      >
                        <span className="dname">{d.dname}</span>
                        <span className="dnum">{d.dnum}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="cita-step">
                  <p className="cita-step-label">
                    <span className="cita-step-num">2</span>
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

              <button type="button" className="cita-confirm-btn" onClick={goToResumen}>
                {t("panel.agendar.continue")}
                <Icon name="arrow-right" strokeWidth={2.2} />
              </button>
            </>
          )}

          {step === "resumen" && areaActual && (
            <>
              <h4 className="imaging-modal-title">{t("panel.agendar.resumen_title")}</h4>

              <div className="imaging-resumen-grid">
                <div className="imaging-resumen-field">
                  <span className="panel-field-label">{t("panel.agendar.patient_label")}</span>
                  <span className="imaging-resumen-static">{patient?.nombre}</span>
                </div>
                <div className="imaging-resumen-field">
                  <span className="panel-field-label">{t("panel.agendar.study_label")}</span>
                  <span className="imaging-resumen-static">{t(areaActual.labelKey)}</span>
                </div>
                <label className="imaging-resumen-field">
                  <span className="panel-field-label">{t("panel.agendar.age_label")}</span>
                  <input
                    type="number"
                    min={0}
                    className="input-field-element"
                    value={edad}
                    onChange={(event) => setEdad(event.target.value)}
                  />
                </label>
                <label className="imaging-resumen-field">
                  <span className="panel-field-label">{t("panel.agendar.weight_label")}</span>
                  <input
                    type="number"
                    min={0}
                    className="input-field-element"
                    value={peso}
                    onChange={(event) => setPeso(event.target.value)}
                  />
                </label>
              </div>

              <div className="imaging-upload">
                <span className="panel-field-label">{t("panel.agendar.upload_label")}</span>
                <div className="imaging-upload-row">
                  <button type="button" className="imaging-upload-btn" onClick={() => fileInputRef.current?.click()}>
                    <Upload size={15} strokeWidth={1.8} />
                    {archivo ? t("panel.agendar.upload_change") : t("panel.agendar.upload_cta")}
                  </button>
                  {archivo && (
                    <span className="imaging-upload-filename">
                      {archivo.name}
                      <button type="button" aria-label={t("aria.remove_file")} onClick={() => setArchivo(null)}>
                        <X size={13} strokeWidth={2} />
                      </button>
                    </span>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="imaging-upload-input"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(event) => setArchivo(event.target.files?.[0] ?? null)}
                />
              </div>

              <div className="cita-divider" />

              <div className="cita-summary">
                <span className="cita-summary-tag">{t("panel.agendar.study_label")}</span>
                <strong className="cita-summary-value">
                  {t(areaActual.labelKey)} · {dia} · {horario} hrs
                </strong>
                <button type="button" className="cita-confirm-btn" onClick={confirmar} disabled={status === "loading"}>
                  {status === "loading" ? t("panel.agendar.confirm_btn_loading") : t("panel.agendar.confirm_btn")}
                  <Icon name="arrow-right" strokeWidth={2.2} />
                </button>
              </div>

              <div className={cn("toast", status === "success" && "show")}>{t("panel.agendar.toast")}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
