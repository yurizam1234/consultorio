"use client";

import { useState } from "react";
import { useAuth } from "@/presentation/hooks/useAuth";
import { useImagingBookingModal } from "@/presentation/hooks/useImagingBookingModal";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { useSolicitudes } from "@/presentation/hooks/useSolicitudes";
import { areasEstudio, type AreaEstudioId } from "@/shared/data/estudiosImagen";
import { diasDisponibles, horariosDisponibles } from "@/shared/data/contacto";

type Step = "area" | "agenda" | "resumen";

export function useImagingBooking() {
  const { patient } = useAuth();
  const { isOpen } = useImagingBookingModal();
  const { t } = useLanguage();
  const { addSolicitud } = useSolicitudes();
  const [step, setStep] = useState<Step>("area");
  const [areaId, setAreaId] = useState<AreaEstudioId | null>(null);
  const [dia, setDia] = useState(diasDisponibles[0].label);
  const [horario, setHorario] = useState(horariosDisponibles[0]);
  const [edad, setEdad] = useState(() => String(patient?.edad ?? ""));
  const [peso, setPeso] = useState(() => String(patient?.peso ?? ""));
  const [archivo, setArchivo] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const areaActual = areasEstudio.find((a) => a.id === areaId) ?? null;

  // El modal (y este hook) se montan una sola vez para todo el panel, no se
  // recrean al abrir/cerrar — sin esto, edad/peso se quedaban con el valor que
  // tenía el paciente la PRIMERA vez que se montó el hook, aunque el usuario
  // los hubiera actualizado después en "Mi perfil". Se resincronizan cada vez
  // que el modal se vuelve a abrir (patrón de React: ajustar estado durante el
  // render comparando con el valor anterior, en vez de un useEffect que
  // dispararía un setState extra después de pintar).
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setEdad(String(patient?.edad ?? ""));
      setPeso(String(patient?.peso ?? ""));
    }
  }

  function selectArea(id: AreaEstudioId) {
    setAreaId(id);
    setStep("agenda");
  }

  function goToResumen() {
    setStep("resumen");
  }

  function back() {
    if (step === "resumen") setStep("agenda");
    else if (step === "agenda") setStep("area");
  }

  function reset() {
    setStep("area");
    setAreaId(null);
    setDia(diasDisponibles[0].label);
    setHorario(horariosDisponibles[0]);
    setEdad(String(patient?.edad ?? ""));
    setPeso(String(patient?.peso ?? ""));
    setArchivo(null);
    setStatus("idle");
  }

  // PUNTO DE INTEGRACIÓN: mismo patrón que "Agendar cita" del Hero
  // (useCitaBooking.ts → container.crearCita, ver LocalCitaRepository.ts) —
  // aquí falta seguirlo: crear CrearSolicitudEstudioUseCase + un
  // ImagingRepository (domain/application/infrastructure) y llamarlo aquí en
  // vez del setTimeout. Dos cosas a resolver al conectarlo:
  //  1. "archivo" (la orden médica subida) no se envía a ningún lado todavía —
  //     el backend real necesitará un endpoint multipart/form-data para el archivo.
  //  2. El id "SOL-####" se genera aquí al azar; debe venir del backend.
  async function confirmar() {
    setStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 1200));
    if (areaActual) {
      addSolicitud({
        id: `SOL-${Math.floor(1000 + Math.random() * 9000)}`,
        areaId: areaActual.id,
        estudio: t(areaActual.labelKey),
        fecha: dia,
        horario,
        estado: "confirmada",
      });
    }
    setStatus("success");
    setTimeout(() => setStatus("idle"), 3200);
  }

  return {
    step,
    areaId,
    areaActual,
    selectArea,
    dia,
    setDia,
    horario,
    setHorario,
    edad,
    setEdad,
    peso,
    setPeso,
    archivo,
    setArchivo,
    status,
    goToResumen,
    back,
    reset,
    confirmar,
  };
}
