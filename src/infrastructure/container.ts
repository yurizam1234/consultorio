import { LocalCitaRepository } from "./repositories/LocalCitaRepository";
import { LocalEncuestaRepository } from "./repositories/LocalEncuestaRepository";
import { CrearCitaUseCase } from "@/application/citas/CrearCitaUseCase";
import { EnviarEncuestaUseCase } from "@/application/encuesta/EnviarEncuestaUseCase";

const citaRepository = new LocalCitaRepository();
const encuestaRepository = new LocalEncuestaRepository();

export const container = {
  crearCita: new CrearCitaUseCase(citaRepository),
  enviarEncuesta: new EnviarEncuestaUseCase(encuestaRepository),
};
