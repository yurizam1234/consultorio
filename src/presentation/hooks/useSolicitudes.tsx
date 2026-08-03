"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { solicitudesMock, type Solicitud } from "@/shared/data/solicitudesMock";

interface SolicitudesContextValue {
  solicitudes: Solicitud[];
  addSolicitud: (solicitud: Solicitud) => void;
}

const SolicitudesContext = createContext<SolicitudesContextValue | null>(null);

// Estado compartido entre el modal de "Agendar nuevo estudio" (useImagingBooking.ts,
// que agrega una solicitud al confirmar) y la vista "Mis solicitudes" (que las lista).
// En memoria nada más (no localStorage): son datos de sesión, no hay backend todavía.
// PUNTO DE INTEGRACIÓN: al conectar el backend, "solicitudesMock" inicial se
// reemplaza por un fetch real (ej. `container.solicitudes.listar(patient.id)`
// dentro de un useEffect al montar el provider), y "addSolicitud" pasa de sólo
// actualizar el estado local a esperar la confirmación del backend antes de
// insertarla (o revertir el optimistic-update si la petición falla).
export function SolicitudesProvider({ children }: { children: ReactNode }) {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>(solicitudesMock);

  const addSolicitud = useCallback((solicitud: Solicitud) => {
    setSolicitudes((prev) => [solicitud, ...prev]);
  }, []);

  const value = useMemo<SolicitudesContextValue>(() => ({ solicitudes, addSolicitud }), [solicitudes, addSolicitud]);

  return <SolicitudesContext.Provider value={value}>{children}</SolicitudesContext.Provider>;
}

export function useSolicitudes() {
  const ctx = useContext(SolicitudesContext);
  if (!ctx) throw new Error("useSolicitudes debe usarse dentro de SolicitudesProvider");
  return ctx;
}
