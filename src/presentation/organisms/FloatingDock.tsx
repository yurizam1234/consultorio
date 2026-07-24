"use client";

import { Icon } from "@/presentation/atoms/Icon";
import { useEmergencyModal } from "@/presentation/hooks/useEmergencyModal";
import { useCitaModal } from "@/presentation/hooks/useCitaModal";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { contactoInfo } from "@/shared/data/contacto";

// Accesos flotantes persistentes: solo se vuelven visibles después de pasar el
// hero (la clase "visible" la agrega ScrollEffects.tsx vía ScrollTrigger).
// Dentro del hero, Contacto/Agendar cita ya tienen sus propias versiones
// (hero-action-cards / cita-card), este dock no las reemplaza, las continúa.
export function FloatingDock() {
  const { t } = useLanguage();
  const { open: openEmergency } = useEmergencyModal();
  const { open: openCita } = useCitaModal();

  return (
    <div className="floating-dock">
      <a
        className="floating-btn floating-btn-whatsapp"
        href={contactoInfo.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("aria.floating_whatsapp")}
      >
        <Icon name="whatsapp" strokeWidth={1.8} />
      </a>
      <button type="button" className="floating-btn floating-btn-cita" onClick={openCita} aria-label={t("aria.floating_cita")}>
        <Icon name="calendar-hours" strokeWidth={1.8} />
      </button>
      <button
        type="button"
        className="floating-btn floating-btn-contacto"
        onClick={openEmergency}
        aria-label={t("aria.floating_contacto")}
      >
        <Icon name="phone" strokeWidth={1.8} />
      </button>
    </div>
  );
}
