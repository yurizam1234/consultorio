"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { container } from "@/infrastructure/container";
import { buildWhatsAppUrl, contactoInfo } from "@/shared/data/contacto";
import { areasCita, areaCitaPorId, tiposCita, type TipoCitaId } from "@/shared/data/areasCita";
import { translations } from "@/shared/i18n/translations";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { buildTimeSlots, formatDateFull, startOfToday } from "@/shared/lib/dates";

export const citaTimeSlots = buildTimeSlots();

// Nombre del evento que el slider de Servicios dispara para pre-seleccionar un
// área en el formulario de cita (ver AreaMedicaCard.tsx). Lo escuchan ambas
// instancias del form (card del hero + modal), cada una con su propio estado.
export const CITA_PRESELECT_EVENT = "cita:agendarArea";

export function useCitaBooking() {
  const { lang } = useLanguage();
  // Paso 1: ¿Qué necesitas? — arranca en "consulta" (el caso más común) para
  // que el flujo se vea lleno desde el primer segundo, sin un vacío de
  // "selecciona una opción".
  const [tipo, setTipo] = useState<TipoCitaId>("consulta");
  const [areaId, setAreaId] = useState("");
  const [motivo, setMotivo] = useState("");
  const [fecha, setFecha] = useState<Date>(() => startOfToday());
  const [horario, setHorario] = useState(citaTimeSlots[2] ?? citaTimeSlots[0]);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const esUrgencia = tipo === "urgencia";
  const esHospitalario = tipo === "hospitalario";
  const esNormal = !esUrgencia && !esHospitalario;

  const areasDisponibles = useMemo(() => {
    if (esUrgencia || esHospitalario) return [];
    return areasCita.filter((area) => area.tipo.includes(tipo));
  }, [tipo, esUrgencia, esHospitalario]);

  const areaActual = areaCitaPorId(areaId) ?? null;
  const motivoActual = areaActual?.procs[Number(motivo)] ?? null;

  // Resetea los campos dependientes cuando cambia un paso anterior.
  const cambiarTipo = useCallback((next: TipoCitaId) => {
    setTipo(next);
    setAreaId("");
    setMotivo("");
    setConsent(false);
  }, []);

  const cambiarArea = useCallback((next: string) => {
    setAreaId(next);
    setMotivo("");
    setConsent(false);
  }, []);

  // Texto legible de la fecha ("jueves, 30 de julio"), reutilizado en el
  // resumen de la card y en el mensaje de WhatsApp — una sola fuente de verdad
  // para no reformatear la fecha en cada lugar que la muestra.
  const diaLabel = useMemo(() => formatDateFull(fecha, lang), [fecha, lang]);

  const completo = areaActual !== null && motivoActual !== null && consent;

  // Pre-selección desde el slider: cualquiera de las dos instancias del form
  // reacciona al evento y queda lista con el área (y su tipo) elegidos.
  useEffect(() => {
    function handlePreselect(event: Event) {
      const areaIdEvent = (event as CustomEvent<{ areaId: string }>).detail?.areaId;
      const area = areaCitaPorId(areaIdEvent ?? "");
      if (!area) return;
      setTipo(area.tipo[0] ?? "consulta");
      setAreaId(area.id);
      setMotivo("");
      setConsent(false);
    }
    window.addEventListener(CITA_PRESELECT_EVENT, handlePreselect);
    return () => window.removeEventListener(CITA_PRESELECT_EVENT, handlePreselect);
  }, []);

  async function confirmar() {
    if (!completo || !areaActual || !motivoActual) return;

    const tipoLabel = tiposCita.find((t) => t.id === tipo)?.label[lang] ?? "";
    const mensaje =
      lang === "es"
        ? `Hola, quiero confirmar mi cita:\nTipo: ${tipoLabel}\nÁrea: ${areaActual.nombre.es}\nMotivo: ${motivoActual.nombre.es}\nFecha: ${diaLabel}\nHorario: ${horario} hrs\nPreparación previa: ${motivoActual.prep.es}`
        : `Hi, I'd like to confirm my appointment:\nType: ${tipoLabel}\nArea: ${areaActual.nombre.en}\nReason: ${motivoActual.nombre.en}\nDate: ${diaLabel}\nTime: ${horario} hrs\nBefore your visit: ${motivoActual.prep.en}`;

    // Debe ejecutarse de forma síncrona, antes de cualquier `await`, para que
    // el navegador no lo bloquee como pop-up (ya no cuenta como "gesto directo
    // del usuario" en cuanto el handler hace su primer await).
    window.open(buildWhatsAppUrl(mensaje), "_blank", "noopener,noreferrer");

    setStatus("loading");
    await container.crearCita.execute({
      especialidad: areaActual.nombre[lang],
      tipo,
      motivo: motivoActual.nombre[lang],
      dia: diaLabel,
      horario,
    });
    setStatus("success");
    setTimeout(() => setStatus("idle"), 3200);
  }

  const summary = useMemo(() => {
    if (!areaActual || !motivoActual) {
      return translations[lang]["modal.resumen_placeholder"];
    }
    return `${areaActual.nombre[lang]} · ${motivoActual.nombre[lang]} · ${diaLabel} · ${horario} hrs`;
  }, [areaActual, motivoActual, diaLabel, horario, lang]);

  return {
    tipo,
    setTipo: cambiarTipo,
    areaId,
    setAreaId: cambiarArea,
    motivo,
    setMotivo,
    fecha,
    setFecha,
    horario,
    setHorario,
    consent,
    setConsent,
    status,
    confirmar,
    areasDisponibles,
    areaActual,
    motivoActual,
    preparacion: motivoActual?.prep[lang] ?? "",
    esUrgencia,
    esHospitalario,
    esNormal,
    completo,
    summary,
    whatsappHref: contactoInfo.whatsappHref,
  };
}
