import type { ContactRepository } from "@/domain/repositories/ContactRepository";
import type { ContactMessage, ContactMessageEnviado } from "@/domain/entities/ContactMessage";

/**
 * Implementación demo sin backend real todavía. Simula latencia de red.
 * Sustituible por una HttpContactRepository sin tocar application/ ni presentation/.
 */
export class LocalContactRepository implements ContactRepository {
  async enviar(message: ContactMessage): Promise<ContactMessageEnviado> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      ...message,
      id: crypto.randomUUID(),
      enviadoEn: new Date().toISOString(),
    };
  }
}
