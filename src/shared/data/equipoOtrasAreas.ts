export type OtroDepartamento =
  | "enfermeria"
  | "quirofano"
  | "recepcion"
  | "aseguradora"
  | "imagenologia"
  | "intendencia";

export interface MiembroOtraArea {
  id: string;
  img: string;
  // Rol/cargo de la persona (ej. "Enfermera general", "Coordinadora de recepción")
  // y si es la jefa/jefe de esa área. Ambos sin completar a propósito — agrégalos
  // aquí mismo, persona por persona, cuando tengas el dato confirmado (no se debe
  // marcar a alguien como jefe de área sin confirmarlo primero).
  role?: string;
  esJefe?: boolean;
}
export const equipoOtrasAreas: Record<OtroDepartamento, MiembroOtraArea[]> = {
  enfermeria: [
    { id: "enf-1", img: "/nuestro-equipo/enfermeria/enfangelita.webp" },
    { id: "enf-2", img: "/nuestro-equipo/enfermeria/enfdiana.webp" },
    { id: "enf-3", img: "/nuestro-equipo/enfermeria/enflinda.webp" },
    { id: "enf-4", img: "/nuestro-equipo/enfermeria/enfnancy.webp" },
    { id: "enf-5", img: "/nuestro-equipo/enfermeria/enfraquel.webp" },
    { id: "enf-6", img: "/nuestro-equipo/enfermeria/enfsamuel.webp" },
    { id: "enf-7", img: "/nuestro-equipo/enfermeria/enftrini.webp" },
    { id: "enf-8", img: "/nuestro-equipo/enfermeria/enfvero.webp" },
  ],
  quirofano: [
    { id: "qui-1", img: "/nuestro-equipo/quirofano/enfceci.webp" },
    { id: "qui-2", img: "/nuestro-equipo/quirofano/enferik.webp" },
    { id: "qui-3", img: "/nuestro-equipo/quirofano/enfkarime.webp" },
    { id: "qui-4", img: "/nuestro-equipo/quirofano/enfpaco.webp" },
    { id: "qui-5", img: "/nuestro-equipo/quirofano/enfrebeca.webp" },
  ],
  recepcion: [
    { id: "rec-1", img: "/nuestro-equipo/recepcion/recdlay.webp" },
    { id: "rec-2", img: "/nuestro-equipo/recepcion/recgaby.webp" },
    { id: "rec-3", img: "/nuestro-equipo/recepcion/reckaren.webp" },
    { id: "rec-4", img: "/nuestro-equipo/recepcion/recnati.webp" },
    { id: "rec-5", img: "/nuestro-equipo/recepcion/rectere.webp" },
  ],
  aseguradora: [
    { id: "asg-1", img: "/nuestro-equipo/aseguradora/asglis.webp" },
    { id: "asg-2", img: "/nuestro-equipo/aseguradora/asgsadi.webp" },
  ],
  imagenologia: [
    { id: "img-1", img: "/nuestro-equipo/imagenologia/imgalexis.webp" },
    { id: "img-2", img: "/nuestro-equipo/imagenologia/imgarlet.webp" },
    { id: "img-3", img: "/nuestro-equipo/imagenologia/imgcarlos.webp" },
    { id: "img-4", img: "/nuestro-equipo/imagenologia/imgfer.webp" },
    { id: "img-5", img: "/nuestro-equipo/imagenologia/imgkaren.webp" },
    { id: "img-6", img: "/nuestro-equipo/imagenologia/imgkarla.webp" },
    { id: "img-7", img: "/nuestro-equipo/imagenologia/imgkely.webp" },
  ],
  intendencia: [
    { id: "int-1", img: "/nuestro-equipo/intendencia/intbraulio.webp" },
    { id: "int-2", img: "/nuestro-equipo/intendencia/intgabi.webp" },
    { id: "int-3", img: "/nuestro-equipo/intendencia/inthumberto.webp" },
    { id: "int-4", img: "/nuestro-equipo/intendencia/intoctavio.webp" },
    { id: "int-5", img: "/nuestro-equipo/intendencia/intpavel.webp" },
    { id: "int-6", img: "/nuestro-equipo/intendencia/intrafa.webp" },
  ],
};
