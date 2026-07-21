import type { CitaBooking, CitaConfirmada } from "../entities/CitaBooking";

export interface CitaRepository {
  crear(booking: CitaBooking): Promise<CitaConfirmada>;
}
