import type { EncuestaRepository } from "@/domain/repositories/EncuestaRepository";
import type { Encuesta, EncuestaEnviada } from "@/domain/entities/Encuesta";

/**
 * Implementación demo sin backend real todavía. Simula latencia de red.
 * Sustituible por una HttpEncuestaRepository sin tocar application/ ni presentation/.
 */
export class LocalEncuestaRepository implements EncuestaRepository {
  async enviar(encuesta: Encuesta): Promise<EncuestaEnviada> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      ...encuesta,
      id: crypto.randomUUID(),
      enviadaEn: new Date().toISOString(),
    };
  }
}
