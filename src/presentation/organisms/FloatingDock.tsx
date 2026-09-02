"use client";

import { Icon } from "@/presentation/atoms/Icon";
import { useEmergencyModal } from "@/presentation/hooks/useEmergencyModal";
import { useCitaModal } from "@/presentation/hooks/useCitaModal";
import { useAssistantModal } from "@/presentation/hooks/useAssistantModal";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { contactoInfo } from "@/shared/data/contacto";

// Accesos flotantes persistentes: solo se vuelven visibles después de pasar el
// hero (la clase "visible" la agrega ScrollEffects.tsx vía ScrollTrigger).
const PORTAL_URL = process.env.NEXT_PUBLIC_PORTAL_URL;

export function FloatingDock() {
  const { t, lang } = useLanguage();
  const isEn = lang === "en";
  const { open: openEmergency } = useEmergencyModal();
  const { open: openCita } = useCitaModal();
  const { open: openAssistant } = useAssistantModal();

  const goToPortal = () => {
    if (!PORTAL_URL) {
      console.error("NEXT_PUBLIC_PORTAL_URL no está configurada.");
      return;
    }
    window.location.href = `${PORTAL_URL}/agenda`;
  };

  return (
    <div className="floating-dock">
      {/* 1. Agendar Cita */}
      <button
        type="button"
        className="floating-btn floating-btn-cita"
        onClick={openCita}
        aria-label={t("aria.floating_cita")}
        title={isEn ? "Book appointment" : "Agendar cita"}
      >
        <Icon name="calendar-hours" strokeWidth={1.8} />
      </button>

      {/* 2. WhatsApp */}
      <a
        className="floating-btn floating-btn-whatsapp"
        href={contactoInfo.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("aria.floating_whatsapp")}
        title="WhatsApp"
      >
        <Icon name="whatsapp" strokeWidth={1.8} />
      </a>

      {/* 3. Contacto / Urgencias */}
      <button
        type="button"
        className="floating-btn floating-btn-contacto"
        onClick={openEmergency}
        aria-label={t("aria.floating_contacto")}
        title={isEn ? "24/7 Emergency" : "Urgencias 24h"}
      >
        <Icon name="phone" strokeWidth={1.8} />
      </button>

      {/* 4. Asistente Bot 24/7 (Al final de todos los botones flotantes) */}
      <button
        type="button"
        className="floating-btn floating-btn-bot"
        onClick={openAssistant}
        aria-label={isEn ? "Chat with AI Assistant" : "Hablar con Asistente Virtual 24/7"}
        title={isEn ? "Arbi — 24/7 AI Medical Assistant" : "Arbi — Asistente Virtual 24/7"}
      >
        <span className="floating-bot-glow" aria-hidden="true" />
        <Icon name="bot" strokeWidth={1.9} />
        <span className="floating-bot-live-dot" aria-hidden="true" />
      </button>
    </div>
  );
}
