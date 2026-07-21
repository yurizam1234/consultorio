export interface ContactMessage {
  nombre: string;
  telefono?: string;
  mensaje: string;
}

export interface ContactMessageEnviado extends ContactMessage {
  id: string;
  enviadoEn: string;
}
