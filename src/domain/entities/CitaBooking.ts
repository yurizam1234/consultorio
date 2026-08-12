export interface CitaBooking {
  especialidad: string;
  dia: string;
  horario: string;
  // Campos del flujo enriquecido de agendamiento (opcionales para no romper
  // llamadas existentes del panel): tipo de servicio y motivo/procedimiento.
  tipo?: string;
  motivo?: string;
}

export interface CitaConfirmada extends CitaBooking {
  id: string;
  confirmadaEn: string;
}
