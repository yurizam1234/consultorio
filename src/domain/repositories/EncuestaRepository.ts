import type { Encuesta, EncuestaEnviada } from "../entities/Encuesta";

export interface EncuestaRepository {
  enviar(encuesta: Encuesta): Promise<EncuestaEnviada>;
}
