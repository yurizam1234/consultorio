"use client";

import { useEmergencyModal } from "@/presentation/hooks/useEmergencyModal";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { EmergencyOption } from "@/presentation/molecules/EmergencyOption";
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
      <div className="cita-modal emergency-modal" role="dialog" aria-modal="true" aria-labelledby="emergencyModalTitle">
        <button className="cita-modal-close" aria-label={t("modal.close")} onClick={close}>
          ×
        </button>

        <div className="emergency-modal-card">
          <div className="emergency-modal-head">
            <span className="emergency-pulse" />
            <h4 id="emergencyModalTitle">{t("emergency.label")}</h4>
          </div>
          <p className="emergency-modal-sub">{t("contact.form_subtitle")}</p>

          <div className="emergency-modal-options">
            <EmergencyOption
              href={`tel:${contactoInfo.telefonoUrgenciasHref}`}
              icon="phone"
              label={t("emergency.call", { phone: contactoInfo.telefonoUrgencias })}
            />
            <EmergencyOption href={contactoInfo.whatsappHref} icon="chat" label={t("emergency.whatsapp")} external />
          </div>
        </div>
      </div>
    </div>
  );
}