"use client";

import { useState } from "react";
import { container } from "@/infrastructure/container";
import { especialidades, diasDisponibles, horariosDisponibles } from "@/shared/data/contacto";

export function useCitaBooking() {
  const [especialidad, setEspecialidad] = useState(especialidades[0]);
  const [dia, setDia] = useState(diasDisponibles[0].label);
  const [horario, setHorario] = useState(horariosDisponibles[0]);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  async function confirmar() {
    setStatus("loading");
    await container.crearCita.execute({ especialidad, dia, horario });
    setStatus("success");
    setTimeout(() => setStatus("idle"), 3200);
  }

  return {
    especialidad,
    setEspecialidad,
    dia,
    setDia,
    horario,
    setHorario,
    status,
    confirmar,
    summary: `${especialidad} · ${dia} · ${horario} hrs`,
  };
}
