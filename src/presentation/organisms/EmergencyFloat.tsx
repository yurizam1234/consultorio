"use client";

import { useDisclosure } from "@/presentation/hooks/useDisclosure";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { EmergencyOption } from "@/presentation/molecules/EmergencyOption";
import { contactoInfo } from "@/shared/data/contacto";
import { cn } from "@/shared/lib/utils";

export function EmergencyFloat() {
  const { open, toggle, ref } = useDisclosure();
  const { t } = useLanguage();

  return (
    <div ref={ref} className={cn("emergency-float", open && "open")}>
      <button
        className="emergency-btn"
        aria-expanded={open}
        aria-controls="emergencyMenu"
        onClick={(event) => {
          event.stopPropagation();
          toggle();
        }}
      >
        <span className="emergency-pulse" />
        <span className="label">{t("emergency.label")}</span>
      </button>
      <div className="emergency-menu" id="emergencyMenu">
        <EmergencyOption
          href={`tel:${contactoInfo.telefonoUrgenciasHref}`}
          icon="phone"
          label={t("emergency.call", { phone: contactoInfo.telefonoUrgencias })}
        />
        <EmergencyOption href={contactoInfo.whatsappHref} icon="chat" label={t("emergency.whatsapp")} external />
      </div>
    </div>
  );
}