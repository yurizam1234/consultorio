export interface Encuesta {
  servicio: string;
  calificacion: number;
  comentario: string;
}

export interface EncuestaEnviada extends Encuesta {
  id: string;
  enviadaEn: string;
}
