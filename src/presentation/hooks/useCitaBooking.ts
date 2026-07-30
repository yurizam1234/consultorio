"use client";

import { useMemo, useState } from "react";
import { container } from "@/infrastructure/container";
import { contactoInfo } from "@/shared/data/contacto";
import { serviciosAgenda, nombreServicioDeEspecialidad } from "@/shared/data/serviciosAgenda";
import { doctores } from "@/shared/data/doctores";
import { translations, type Lang } from "@/shared/i18n/translations";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { buildTimeSlots, formatDateFull, startOfToday } from "@/shared/lib/dates";

function buildWhatsAppUrl(mensaje: string) {
  return `${contactoInfo.whatsappHref}?text=${encodeURIComponent(mensaje)}`;
}

export const citaTimeSlots = buildTimeSlots();

export function useCitaBooking() {
  const { lang } = useLanguage();
  const [servicio, setServicio] = useState(serviciosAgenda[0].nombre);
  const [fecha, setFecha] = useState<Date>(() => startOfToday());
  const [horario, setHorario] = useState(citaTimeSlots[2] ?? citaTimeSlots[0]);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const servicioActual = serviciosAgenda.find((s) => s.nombre === servicio) ?? serviciosAgenda[0];
  const doctoresDelServicio = doctores.filter(
    (doctor) => doctor.specialty && nombreServicioDeEspecialidad(doctor.specialty.es) === servicio
  );
  const sinDoctorAsignado = doctoresDelServicio.length === 0;

  // Texto legible de la fecha ("jueves, 30 de julio"), reutilizado en el
  // resumen de la card y en el mensaje de WhatsApp — una sola fuente de verdad
  // para no reformatear la fecha en cada lugar que la muestra.
  const diaLabel = useMemo(() => formatDateFull(fecha, lang), [fecha, lang]);

  async function confirmar(lang: Lang) {
    const doctorTexto = sinDoctorAsignado
      ? translations[lang]["modal.doctor_fallback"]
      : doctoresDelServicio.map((d) => d.name ?? "—").join(", ");

    const mensaje =
      lang === "es"
        ? `Hola, quiero confirmar mi cita:\nServicio: ${servicio}\nEspecialista: ${doctorTexto}\nFecha: ${diaLabel}\nHorario: ${horario} hrs\nRecomendación previa: ${servicioActual.recomendacion.es}`
        : `Hi, I'd like to confirm my appointment:\nService: ${servicio}\nSpecialist: ${doctorTexto}\nDate: ${diaLabel}\nTime: ${horario} hrs\nBefore your visit: ${servicioActual.recomendacion.en}`;

    // Debe ejecutarse de forma síncrona, antes de cualquier `await`, para que
    // el navegador no lo bloquee como pop-up (ya no cuenta como "gesto directo
    // del usuario" en cuanto el handler hace su primer await).
    window.open(buildWhatsAppUrl(mensaje), "_blank", "noopener,noreferrer");

    setStatus("loading");
    await container.crearCita.execute({ especialidad: servicio, dia: diaLabel, horario });
    setStatus("success");
    setTimeout(() => setStatus("idle"), 3200);
  }

  return {
    servicio,
    setServicio,
    fecha,
    setFecha,
    diaLabel,
    horario,
    setHorario,
    status,
    confirmar,
    servicioActual,
    doctoresDelServicio,
    sinDoctorAsignado,
    summary: `${servicio} · ${diaLabel} · ${horario} hrs`,
  };
}
