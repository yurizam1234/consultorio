import type { ContactRepository } from "@/domain/repositories/ContactRepository";
import type { ContactMessage, ContactMessageEnviado } from "@/domain/entities/ContactMessage";

export class EnviarMensajeUseCase {
  constructor(private readonly contactRepository: ContactRepository) {}

  execute(message: ContactMessage): Promise<ContactMessageEnviado> {
    return this.contactRepository.enviar(message);
  }
}
