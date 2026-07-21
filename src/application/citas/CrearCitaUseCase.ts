import type { CitaRepository } from "@/domain/repositories/CitaRepository";
import type { CitaBooking, CitaConfirmada } from "@/domain/entities/CitaBooking";

export class CrearCitaUseCase {
  constructor(private readonly citaRepository: CitaRepository) {}

  execute(booking: CitaBooking): Promise<CitaConfirmada> {
    return this.citaRepository.crear(booking);
  }
}
