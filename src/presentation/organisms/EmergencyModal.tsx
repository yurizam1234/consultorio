"use client";

import { useEmergencyModal } from "@/presentation/hooks/useEmergencyModal";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { Icon } from "@/presentation/atoms/Icon";
import { contactoInfo } from "@/shared/data/contacto";
import { cn } from "@/shared/lib/utils";

export function EmergencyModal() {
  const { isOpen, close } = useEmergencyModal();
  const { t } = useLanguage();

  return (
    <div
      className={cn("cita-modal-overlay", isOpen && "open")}
      onClick={(event) => event.target === event.currentTarget && close()}
    >
      <div className="cita-modal-shell emergency-modal-shell">
        <div className="cita-modal emergency-modal" role="dialog" aria-modal="true" aria-labelledby="emergencyModalTitle">
          <button className="cita-modal-close" aria-label={t("modal.close")} onClick={close}>
            <Icon name="x" strokeWidth={2.2} />
          </button>

          <div className="emergency-modal-card">
            {/* Cabecera de Urgencias con Badge */}
            <div className="emergency-modal-header">
              <div className="emergency-modal-badge">
                <span className="emergency-pulse" />
                <span>Atención Médica 24/7</span>
              </div>
              <h3 id="emergencyModalTitle" className="emergency-modal-title">
                {t("emergency.label")}
              </h3>
              <p className="emergency-modal-sub">
                {t("contact.form_subtitle")}
              </p>
            </div>

            {/* Opciones de contacto directo */}
            <div className="emergency-modal-options">
              {/* Opción 1: Llamada directa inmediata */}
              <a
                href={`tel:${contactoInfo.telefonoUrgenciasHref}`}
                className="emergency-action-card emergency-action-call"
              >
                <div className="emergency-action-icon">
                  <Icon name="phone" strokeWidth={2.2} />
                </div>
                <div className="emergency-action-content">
                  <span className="emergency-action-tag">Línea Directa de Urgencias</span>
                  <strong className="emergency-action-num">{contactoInfo.telefonoUrgencias}</strong>
                  <span className="emergency-action-hint">Guardia médica activa — Tuxtla Gutiérrez</span>
                </div>
                <div className="emergency-action-arrow">
                  <Icon name="chevron-right" strokeWidth={2.2} />
                </div>
              </a>

              {/* Opción 2: WhatsApp Urgencias */}
              <a
                href={contactoInfo.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="emergency-action-card emergency-action-whatsapp"
              >
                <div className="emergency-action-icon">
                  <Icon name="whatsapp" strokeWidth={1.9} />
                </div>
                <div className="emergency-action-content">
                  <span className="emergency-action-tag">Recepción Médica</span>
                  <strong className="emergency-action-num">Escribir por WhatsApp</strong>
                  <span className="emergency-action-hint">Respuesta y orientación clínica inmediata</span>
                </div>
                <div className="emergency-action-arrow">
                  <Icon name="chevron-right" strokeWidth={2.2} />
                </div>
              </a>
	    
	      {/* Línea secundaria */}
  <a
    href={`tel:${contactoInfo.telefonoUrgenciasHref2}`}
    className="emergency-action-card emergency-action-call"
  >
    <div className="emergency-action-icon">
      <Icon name="phone" strokeWidth={2.2} />
    </div>

    <div className="emergency-action-content">
      <span className="emergency-action-tag">
        Línea Alternativa de Urgencias
      </span>

      <strong className="emergency-action-num">
        {contactoInfo.telefonoUrgencias2}
      </strong>

      <span className="emergency-action-hint">
        Línea secundaria de contacto — Tuxtla Gutiérrez
      </span>
    </div>

    <div className="emergency-action-arrow">
      <Icon name="chevron-right" strokeWidth={2.2} />
    </div>
  </a>

              <a
                href={contactoInfo.whatsappHref2}
                target="_blank"
                rel="noopener noreferrer"
                className="emergency-action-card emergency-action-whatsapp"
              >
                <div className="emergency-action-icon">
                  <Icon name="whatsapp" strokeWidth={1.9} />
                </div>
                <div className="emergency-action-content">
                  <span className="emergency-action-tag">Recepción Médica Alternativa</span>
                  <strong className="emergency-action-num">Escribir por WhatsApp</strong>
                  <span className="emergency-action-hint">Respuesta y orientación clínica inmediata</span>
                </div>
                <div className="emergency-action-arrow">
                  <Icon name="chevron-right" strokeWidth={2.2} />
                </div>
              </a>
            </div>
            {/* Pie con dirección y estado */}
            <div className="emergency-modal-footer">
              <div className="emergency-footer-item">
                <Icon name="pin" strokeWidth={1.8} />
                <span>{contactoInfo.direccion}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
