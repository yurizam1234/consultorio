"use client";

import { Icon } from "@/presentation/atoms/Icon";
import { useCitaModal } from "@/presentation/hooks/useCitaModal";

export function FloatAgendarButton() {
  const { open } = useCitaModal();

  return (
    <button className="float-agendar" aria-haspopup="dialog" aria-controls="citaModalOverlay" onClick={open}>
      <Icon name="calendar-hours" strokeWidth={1.8} />
      Agendar cita
    </button>
  );
}
