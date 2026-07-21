"use client";

import { Button } from "@/presentation/atoms/Button";
import { useCitaModal } from "@/presentation/hooks/useCitaModal";

export function HeroCtas() {
  const { open } = useCitaModal();

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
        Agendar mi cita
      </Button>
      <Button variant="ghost" href="#servicios">
        Conocer especialidades
      </Button>
    </div>
  );
}
