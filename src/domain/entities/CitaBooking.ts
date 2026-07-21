export interface CitaBooking {
  especialidad: string;
  dia: string;
  horario: string;
}

export interface CitaConfirmada extends CitaBooking {
  id: string;
  confirmadaEn: string;
}
