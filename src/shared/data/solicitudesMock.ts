import type { AreaEstudioId } from "@/shared/data/estudiosImagen";

export type SolicitudEstado = "confirmada" | "completada" | "cancelada";
export type SolicitudArea = AreaEstudioId | "consulta";

export interface Solicitud {
  id: string;
  areaId: SolicitudArea;
  estudio: string;
  fecha: string;
  horario: string;
  estado: SolicitudEstado;
}

// Historial de demostración: el paciente mock (ver patientMock.ts) ya trae estas
// solicitudes previas. Al confirmar un nuevo estudio en el panel (ver
// useImagingBooking.ts) se agrega una solicitud real más arriba de esta lista.
export const solicitudesMock: Solicitud[] = [
  { id: "SOL-1042", areaId: "resonancia", estudio: "Resonancia Magnética", fecha: "15 may 2026", horario: "10:30", estado: "completada" },
  { id: "SOL-1103", areaId: "tomografia", estudio: "Tomografía", fecha: "02 jun 2026", horario: "09:00", estado: "completada" },
  { id: "SOL-1156", areaId: "consulta", estudio: "Consulta general", fecha: "10 jun 2026", horario: "12:00", estado: "cancelada" },
  { id: "SOL-1225", areaId: "general", estudio: "Agenda General", fecha: "30 jul 2026", horario: "17:30", estado: "confirmada" },
];
