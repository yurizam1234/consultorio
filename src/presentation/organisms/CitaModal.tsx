"use client";

import { useCitaModal } from "@/presentation/hooks/useCitaModal";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { CitaBookingForm } from "@/presentation/molecules/CitaBookingForm";
import { cn } from "@/shared/lib/utils";

export function CitaModal() {
  const { isOpen, close } = useCitaModal();
  const { t } = useLanguage();

  return (
    <div
      className={cn("cita-modal-overlay", isOpen && "open")}
      onClick={(event) => event.target === event.currentTarget && close()}
    >
      {/* ".cita-modal-shell" no scrollea (a diferencia de ".cita-modal" abajo,
          que sí lo hace cuando el formulario no entra completo) — el botón de
          cerrar vive acá, como hermano del contenido que sí scrollea, para
          que nunca quede recortado por ese scroll interno (antes, al estar
          DENTRO de ".cita-modal" con "overflow-y: auto" y offsets negativos
          para asomar fuera de la tarjeta, el propio scroll lo cortaba). */}
      <div className="cita-modal-shell cita-booking-modal-shell">
        <button className="cita-modal-close" aria-label={t("modal.close")} onClick={close}>
          ×
        </button>

        <div className="cita-modal cita-booking-modal" role="dialog" aria-modal="true" aria-label={t("modal.title")}>
          <div className="cita-card">
            <CitaBookingForm />
          </div>
        </div>
      </div>
    </div>
  );
}
