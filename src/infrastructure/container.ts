import { LocalCitaRepository } from "./repositories/LocalCitaRepository";
import { LocalContactRepository } from "./repositories/LocalContactRepository";
import { CrearCitaUseCase } from "@/application/citas/CrearCitaUseCase";
import { EnviarMensajeUseCase } from "@/application/contacto/EnviarMensajeUseCase";

const citaRepository = new LocalCitaRepository();
const contactRepository = new LocalContactRepository();

export const container = {
  crearCita: new CrearCitaUseCase(citaRepository),
  enviarMensaje: new EnviarMensajeUseCase(contactRepository),
};
