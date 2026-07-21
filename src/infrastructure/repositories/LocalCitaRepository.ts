import type { CitaRepository } from "@/domain/repositories/CitaRepository";
import type { CitaBooking, CitaConfirmada } from "@/domain/entities/CitaBooking";

/**
 * Implementación demo sin backend real todavía. Simula latencia de red.
 * Sustituible por una HttpCitaRepository sin tocar application/ ni presentation/.
 */
export class LocalCitaRepository implements CitaRepository {
  async crear(booking: CitaBooking): Promise<CitaConfirmada> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      ...booking,
      id: crypto.randomUUID(),
      confirmadaEn: new Date().toISOString(),
    };
  }
}
