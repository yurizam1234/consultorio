"use client";

import { useState } from "react";
import { container } from "@/infrastructure/container";
import { contactoInfo, diasDisponibles, horariosDisponibles } from "@/shared/data/contacto";
import { serviciosAgenda, nombreServicioDeEspecialidad } from "@/shared/data/serviciosAgenda";
import { doctores } from "@/shared/data/doctores";
import { translations, type Lang } from "@/shared/i18n/translations";

function buildWhatsAppUrl(mensaje: string) {
  return `${contactoInfo.whatsappHref}?text=${encodeURIComponent(mensaje)}`;
}

export function useCitaBooking() {
  const [servicio, setServicio] = useState(serviciosAgenda[0].nombre);
  const [dia, setDia] = useState(diasDisponibles[0].label);
  const [horario, setHorario] = useState(horariosDisponibles[0]);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const servicioActual = serviciosAgenda.find((s) => s.nombre === servicio) ?? serviciosAgenda[0];
  const doctoresDelServicio = doctores.filter(
    (doctor) => doctor.specialty && nombreServicioDeEspecialidad(doctor.specialty.es) === servicio
  );
  const sinDoctorAsignado = doctoresDelServicio.length === 0;

  async function confirmar(lang: Lang) {
    const doctorTexto = sinDoctorAsignado
      ? translations[lang]["modal.doctor_fallback"]
      : doctoresDelServicio.map((d) => d.name ?? "—").join(", ");

    const mensaje =
      lang === "es"
        ? `Hola, quiero confirmar mi cita:\nServicio: ${servicio}\nEspecialista: ${doctorTexto}\nFecha: ${dia}\nHorario: ${horario} hrs\nRecomendación previa: ${servicioActual.recomendacion.es}`
        : `Hi, I'd like to confirm my appointment:\nService: ${servicio}\nSpecialist: ${doctorTexto}\nDate: ${dia}\nTime: ${horario} hrs\nBefore your visit: ${servicioActual.recomendacion.en}`;

    // Debe ejecutarse de forma síncrona, antes de cualquier `await`, para que
    // el navegador no lo bloquee como pop-up (ya no cuenta como "gesto directo
    // del usuario" en cuanto el handler hace su primer await).
    window.open(buildWhatsAppUrl(mensaje), "_blank", "noopener,noreferrer");

    setStatus("loading");
    await container.crearCita.execute({ especialidad: servicio, dia, horario });
    setStatus("success");
    setTimeout(() => setStatus("idle"), 3200);
  }

  return {
    servicio,
    setServicio,
    dia,
    setDia,
    horario,
    setHorario,
    status,
    confirmar,
    servicioActual,
    doctoresDelServicio,
    sinDoctorAsignado,
    summary: `${servicio} · ${dia} · ${horario} hrs`,
  };
}
