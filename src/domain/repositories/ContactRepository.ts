import type { ContactMessage, ContactMessageEnviado } from "../entities/ContactMessage";

export interface ContactRepository {
  enviar(message: ContactMessage): Promise<ContactMessageEnviado>;
}
