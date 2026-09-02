"use client";

import { createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";

const PORTAL_URL = process.env.NEXT_PUBLIC_PORTAL_URL || "/portal-paciente";

interface CitaModalContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const CitaModalContext = createContext<CitaModalContextValue | null>(null);

// "Agendar cita" ya no abre un modal propio: la web pública sólo redirige al
// Portal del Paciente — la validación de sesión y todo el flujo de agenda
// viven ahí (ver PanelAccessButton.tsx, que sigue el mismo criterio para
// login). "isOpen"/"close" quedan como no-ops: se conservan para no romper
// a quien siga llamando a este hook (Hero, FloatingDock, Especialidades,
// PaquetesPreventivos...), pero CitaModal.tsx ya nunca llega a abrirse.
export function CitaModalProvider({ children }: { children: ReactNode }) {
  const value = useMemo<CitaModalContextValue>(
    () => ({
      isOpen: false,
      open: () => {
        window.location.href = `${PORTAL_URL}/agenda`;
      },
      close: () => {},
    }),
    []
  );

  return <CitaModalContext.Provider value={value}>{children}</CitaModalContext.Provider>;
}

export function useCitaModal() {
  const ctx = useContext(CitaModalContext);
  if (!ctx) throw new Error("useCitaModal debe usarse dentro de CitaModalProvider");
  return ctx;
}
