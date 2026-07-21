"use client";

import { Icon } from "@/presentation/atoms/Icon";
import { useCitaModal } from "@/presentation/hooks/useCitaModal";
import { useLanguage } from "@/presentation/hooks/useLanguage";

export function FloatAgendarButton() {
  const { open } = useCitaModal();
  const { t } = useLanguage();

  return (
    <button className="float-agendar" aria-haspopup="dialog" aria-controls="citaModalOverlay" onClick={open}>
      <Icon name="calendar-hours" strokeWidth={1.8} />
      {t("float.agendar")}
    </button>
  );
}
