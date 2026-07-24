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
      <div className="cita-modal cita-booking-modal" role="dialog" aria-modal="true" aria-label={t("modal.title")}>
        <button className="cita-modal-close" aria-label={t("modal.close")} onClick={close}>
          ×
        </button>

        <div className="cita-card">
          <CitaBookingForm />
        </div>
      </div>
    </div>
  );
}
