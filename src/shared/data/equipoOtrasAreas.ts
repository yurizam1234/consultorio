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
  // Nombre real de la persona (ver "Personal_Hospital_Arboledas").
  name?: string;
  // Rol/cargo de la persona (ej. "Enfermera general", "Coordinadora de recepción")
  // y si es la jefa/jefe de esa área.
  role?: string;
  esJefe?: boolean;
}

export const equipoOtrasAreas: Record<OtroDepartamento, MiembroOtraArea[]> = {
  enfermeria: [
    { id: "enf-1", img: "/nuestro-equipo/enfermeria/enflinda.webp", name: "Enf. Linda Azucena Ramirez Nañez", role: "Jefa de Enfermería", esJefe: true },
    { id: "enf-2", img: "/nuestro-equipo/enfermeria/enfangelita.webp", name: "Enf. Angelita Robres Ramos", role: "Enfermería" },
    { id: "enf-3", img: "/nuestro-equipo/enfermeria/enfdiana.webp", name: "Enf. Diana Iris de la Cruz Castellanos", role: "Enfermería" },
    { id: "enf-4", img: "/nuestro-equipo/enfermeria/enfnancy.webp", name: "Enf. Nancy Vianney Gutierrez Ramos", role: "Enfermería" },
    { id: "enf-5", img: "/nuestro-equipo/enfermeria/enfraquel.webp", name: "Enf. Raquel Morales Ramirez", role: "Enfermería" },
    { id: "enf-6", img: "/nuestro-equipo/enfermeria/enfsamuel.webp", name: "Enf. Samuel Blas Jiménez", role: "Enfermería" },
    { id: "enf-7", img: "/nuestro-equipo/enfermeria/enftrini.webp", name: "Enf. Trinidad Pérez López", role: "Enfermería" },
    { id: "enf-8", img: "/nuestro-equipo/enfermeria/enfvero.webp", name: "Enf. Veronica Aguilar Jimenez", role: "Enfermería" },
  ],
  quirofano: [
    { id: "qui-1", img: "/nuestro-equipo/quirofano/enfceci.webp", name: "Enf. Cecilia Pérez Albores", role: "Jefa de Quirófano", esJefe: true },
    { id: "qui-2", img: "/nuestro-equipo/quirofano/enferik.webp", name: "Enf. Erick Sierra Gutiérrez", role: "Enfermería de quirófano" },
    { id: "qui-3", img: "/nuestro-equipo/quirofano/enfpaco.webp", name: "Enf. Francisco Javier Caballero Alvarado", role: "Enfermería de quirófano" },
    { id: "qui-4", img: "/nuestro-equipo/quirofano/enfkarime.webp", name: "Enf. Karime López Carrasco", role: "Enfermería de quirófano" },
    { id: "qui-5", img: "/nuestro-equipo/quirofano/enfrebeca.webp", name: "Enf. Rebeca Altunar Díaz", role: "Enfermería de quirófano" },
  ],
  recepcion: [
    { id: "rec-1", img: "/nuestro-equipo/recepcion/recdlay.webp", name: "Lic. Dlayni Ramírez Gómez", role: "Jefa de Recepción", esJefe: true },
    { id: "rec-2", img: "/nuestro-equipo/recepcion/rectere.webp", name: "Teresa Molina", role: "Área Administrativa" },
    { id: "rec-3", img: "/nuestro-equipo/recepcion/recgaby.webp", name: "Lic. Gabriela Borrego Ramos", role: "Recepción" },
    { id: "rec-4", img: "/nuestro-equipo/recepcion/reckaren.webp", name: "Lic. Karen Yamilet Trujillo Montesinos", role: "Recepción" },
    { id: "rec-5", img: "/nuestro-equipo/recepcion/recnati.webp", name: "Lic. Natividad Gómez Moreno", role: "Recepción" },
  ],
  aseguradora: [
    { id: "asg-1", img: "/nuestro-equipo/aseguradora/asgsadi.webp", name: "Lic. Sadi Rodríguez Espinoza", role: "Jefa de Aseguradora", esJefe: true },
    { id: "asg-2", img: "/nuestro-equipo/aseguradora/asglis.webp", name: "Lic. Lisseth García Carbajal", role: "Aseguradora" },
  ],
  imagenologia: [
    { id: "img-1", img: "/nuestro-equipo/imagenologia/imgkarla.webp", name: "T.R. Karla Itzel Martínez Ferado", role: "Jefa de Imagenología", esJefe: true },
    { id: "img-2", img: "/nuestro-equipo/imagenologia/imgalexis.webp", name: "T.R. Alexis Geovanni Ventura Vera", role: "Técnico en Imagenología" },
    { id: "img-3", img: "/nuestro-equipo/imagenologia/imgcarlos.webp", name: "T.R. Carlos Eduardo Maldonado Magaña", role: "Técnico en Imagenología" },
    { id: "img-4", img: "/nuestro-equipo/imagenologia/imgfer.webp", name: "T.R. Fernando Gutiérrez", role: "Técnico en Imagenología" },
    { id: "img-5", img: "/nuestro-equipo/imagenologia/imgarlet.webp", name: "Lic. Arlette Monzón Farro", role: "Imagenología" },
    { id: "img-6", img: "/nuestro-equipo/imagenologia/imgkaren.webp", name: "Lic. Karen Rubí Jiménez", role: "Imagenología" },
    { id: "img-7", img: "/nuestro-equipo/imagenologia/imgkely.webp", name: "Raquel Castillo Cruz", role: "Imagenología" },
  ],
  intendencia: [
    { id: "int-1", img: "/nuestro-equipo/intendencia/intgabi.webp", name: "Gabriela Teverasco Ramos", role: "Jefa de Intendencia", esJefe: true },
    { id: "int-2", img: "/nuestro-equipo/intendencia/intbraulio.webp", name: "Braulio Adrián Trejo Escamilla", role: "Intendencia" },
    { id: "int-3", img: "/nuestro-equipo/intendencia/inthumberto.webp", name: "Humberto de Jesús Martínez Díaz", role: "Intendencia" },
    { id: "int-4", img: "/nuestro-equipo/intendencia/intoctavio.webp", name: "Octavio Orbelin Macal Pérez", role: "Intendencia" },
    { id: "int-5", img: "/nuestro-equipo/intendencia/intpavel.webp", name: "Pavel Osorio Ramos", role: "Intendencia" },
    { id: "int-6", img: "/nuestro-equipo/intendencia/intrafa.webp", name: "Rafael Alberto Pérez Albores", role: "Intendencia" },
  ],
};
