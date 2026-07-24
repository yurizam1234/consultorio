import type { EncuestaRepository } from "@/domain/repositories/EncuestaRepository";
import type { Encuesta, EncuestaEnviada } from "@/domain/entities/Encuesta";

export class EnviarEncuestaUseCase {
  constructor(private readonly encuestaRepository: EncuestaRepository) {}

  execute(encuesta: Encuesta): Promise<EncuestaEnviada> {
    return this.encuestaRepository.enviar(encuesta);
  }
}
