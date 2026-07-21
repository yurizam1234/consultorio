"use client";

import { Button } from "@/presentation/atoms/Button";
import { useCitaModal } from "@/presentation/hooks/useCitaModal";
import { useLanguage } from "@/presentation/hooks/useLanguage";

export function HeroCtas() {
  const { open } = useCitaModal();
  const { t } = useLanguage();

  return (
    <div className="hero-ctas">
      <Button
        variant="primary"
        href="#"
        onClick={(event) => {
          event.preventDefault();
          open();
        }}
      >
        {t("hero.cta1")}
      </Button>
      <Button variant="ghost" href="#servicios">
        {t("hero.cta2")}
      </Button>
    </div>
  );
}
