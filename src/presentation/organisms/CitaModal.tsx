"use client";

import { Icon } from "@/presentation/atoms/Icon";
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
      <div className="cita-modal-shell cita-booking-modal-shell">
        <button className="cita-modal-close" aria-label={t("modal.close")} onClick={close}>
          <Icon name="x" strokeWidth={2.2} />
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
