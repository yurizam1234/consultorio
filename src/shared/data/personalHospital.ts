export type AreaPersonal =
  | "medicos"
  | "enfermeria"
  | "quirofano"
  | "recepcion"
  | "aseguradora"
  | "imagenologia"
  | "intendencia";

export interface CedulasPersonal {
  profesional?: string;
  especialidad?: string;
  subespecialidad?: string;
}

export interface MiembroPersonal {
  id: string;
  area: AreaPersonal;

  nombre: string;
  cargoEspecialidad: string;

  foto: string;

  cedulas?: CedulasPersonal;
  credenciales?: string[];

  descripcion: string | null;

  esJefe?: boolean;
}

export const personalHospital: MiembroPersonal[] = [
  // =========================================================
  // MÉDICOS
  // =========================================================

  {
    id: "dr-edgar-solano",
    area: "medicos",
    nombre: "Dr. Edgar A. Solano Tego",
    cargoEspecialidad: "Oftalmología",
    foto: "/nuestro-equipo/medicos/drsolano.webp",
    cedulas: {
      profesional: "2013102",
      especialidad: "4010390",
    },
    descripcion:
      "Especialista en Oftalmología con amplia experiencia en diagnóstico y tratamiento de enfermedades oculares, comprometido con la atención profesional de cada paciente.",
  },

  {
    id: "dr-carlos-dario-cabrera",
    area: "medicos",
    nombre: "Dr. Carlos Darío Cabrera Reyes",
    cargoEspecialidad: "Oftalmología",
    foto: "/nuestro-equipo/medicos/drdario.webp",
    cedulas: {
      profesional: "4831468 - UAG",
      especialidad: "7605511 - UNAM",
    },
    descripcion:
      "Especialista en Oftalmología con formación en la UNAM, amplia experiencia clínica y enfoque en el diagnóstico preciso y tratamiento efectivo de padecimientos oculares.",
  },

  {
    id: "dr-manuel-alejandro-trinidad",
    area: "medicos",
    nombre: "Dr. Manuel Alejandro Trinidad Balboa",
    cargoEspecialidad: "Oftalmología Primer Contacto",
    foto: "/nuestro-equipo/medicos/drmanuel.webp",
    cedulas: {
      profesional: "4831793 - UAG",
    },
    descripcion:
      "Master en Oftalmología por la Universidad Cardenal Herrera de España y Médico Cirujano por la Universidad Autónoma de Guadalajara.",
  },

  {
    id: "dr-werner-schlie",
    area: "medicos",
    nombre: "Dr. Werner Schlie Villa",
    cargoEspecialidad: "Cardiología",
    foto: "/nuestro-equipo/medicos/drwerner.webp",
    cedulas: {
      profesional: "11537138",
      especialidad: "14118357",
    },
    descripcion:
      "Alta Especialidad en Electrofisiología y Estimulación Cardiaca.",
  },

  {
    id: "dr-nelson-urbina",
    area: "medicos",
    nombre: "Dr. Nelson Jovanny Urbina López",
    cargoEspecialidad: "Medicina del Dolor",
    foto: "/nuestro-equipo/medicos/drnelson.webp",
    cedulas: {
      subespecialidad: "15706245",
    },
    descripcion:
      "Medicina del dolor y Medicina Paliativa.",
  },

  {
    id: "dr-arturo-gordillo",
    area: "medicos",
    nombre: "Dr. Arturo Gordillo Paniagua",
    cargoEspecialidad: "Coordinador Médico",
    foto: "/nuestro-equipo/medicos/drarturopaniagua.webp",
    descripcion: null,
  },

  {
    id: "dra-maritza-gutierrez",
    area: "medicos",
    nombre: "Dra. Maritza Gutierrez Zavala",
    cargoEspecialidad: "Médico General",
    foto: "/nuestro-equipo/medicos/dramaritza.webp",
    descripcion: null,
  },

  {
    id: "dra-elvira-gabrielle",
    area: "medicos",
    nombre: "Dra. Elvira Gabrielle Solis Chacon",
    cargoEspecialidad: "Médico General",
    foto: "/nuestro-equipo/medicos/draelviragabriela.webp",
    descripcion: null,
  },

  {
    id: "dra-adriana-del-carmen",
    area: "medicos",
    nombre: "Dra. Adriana del Carmen Gutierrez Chavarria",
    cargoEspecialidad: "Médico General",
    foto: "/nuestro-equipo/medicos/dradrianadelcarmen.webp",
    descripcion: null,
  },

  {
    id: "dr-luis-ernesto-vazquez",
    area: "medicos",
    nombre: "Dr. Luis Ernesto Vazquez Gomez",
    cargoEspecialidad: "Médico General",
    foto: "/nuestro-equipo/medicos/drluisernesto.webp",
    descripcion: null,
  },

  // =========================================================
  // ENFERMERÍA
  // =========================================================

  {
    id: "enf-linda-ramirez",
    area: "enfermeria",
    nombre: "Enf. Linda Azucena Ramirez Nañez",
    cargoEspecialidad: "Jefa de Enfermería",
    foto: "/nuestro-equipo/enfermeria/enflinda.webp",
    descripcion: null,
    esJefe: true,
  },

  {
    id: "enf-angelita-robres",
    area: "enfermeria",
    nombre: "Enf. Angelita Robres Ramos",
    cargoEspecialidad: "Enfermería",
    foto: "/nuestro-equipo/enfermeria/enfangelita.webp",
    descripcion: null,
  },

  {
    id: "enf-diana-de-la-cruz",
    area: "enfermeria",
    nombre: "Enf. Diana Iris de la Cruz Castellanos",
    cargoEspecialidad: "Enfermería",
    foto: "/nuestro-equipo/enfermeria/enfdiana.webp",
    descripcion: null,
  },

  {
    id: "enf-nancy-gutierrez",
    area: "enfermeria",
    nombre: "Enf. Nancy Vianney Gutierrez Ramos",
    cargoEspecialidad: "Enfermería",
    foto: "/nuestro-equipo/enfermeria/enfnancy.webp",
    descripcion: null,
  },

  {
    id: "enf-raquel-morales",
    area: "enfermeria",
    nombre: "Enf. Raquel Morales Ramirez",
    cargoEspecialidad: "Enfermería",
    foto: "/nuestro-equipo/enfermeria/enfraquel.webp",
    descripcion: null,
  },

  {
    id: "enf-samuel-blas",
    area: "enfermeria",
    nombre: "Enf. Samuel Blas Jiménez",
    cargoEspecialidad: "Enfermería",
    foto: "/nuestro-equipo/enfermeria/enfsamuel.webp",
    descripcion: null,
  },

  {
    id: "enf-trinidad-perez",
    area: "enfermeria",
    nombre: "Enf. Trinidad Pérez López",
    cargoEspecialidad: "Enfermería",
    foto: "/nuestro-equipo/enfermeria/enftrini.webp",
    descripcion: null,
  },

  {
    id: "enf-veronica-aguilar",
    area: "enfermeria",
    nombre: "Enf. Veronica Aguilar Jimenez",
    cargoEspecialidad: "Enfermería",
    foto: "/nuestro-equipo/enfermeria/enfvero.webp",
    descripcion: null,
  },

  // =========================================================
  // QUIRÓFANO
  // =========================================================

  {
    id: "qui-cecilia-perez",
    area: "quirofano",
    nombre: "Enf. Cecilia Pérez Albores",
    cargoEspecialidad: "Jefa de Quirófano",
    foto: "/nuestro-equipo/quirofano/enfceci.webp",
    descripcion: null,
    esJefe: true,
  },

  {
    id: "qui-erick-sierra",
    area: "quirofano",
    nombre: "Enf. Erick Sierra Gutiérrez",
    cargoEspecialidad: "Enfermería",
    foto: "/nuestro-equipo/quirofano/enferik.webp",
    descripcion: null,
  },

  {
    id: "qui-francisco-caballero",
    area: "quirofano",
    nombre: "Enf. Francisco Javier Caballero Alvarado",
    cargoEspecialidad: "Enfermería",
    foto: "/nuestro-equipo/quirofano/enfpaco.webp",
    descripcion: null,
  },

  {
    id: "qui-karime-lopez",
    area: "quirofano",
    nombre: "Enf. Karime López Carrasco",
    cargoEspecialidad: "Enfermería",
    foto: "/nuestro-equipo/quirofano/enfkarime.webp",
    descripcion: null,
  },

  {
    id: "qui-rebeca-altunar",
    area: "quirofano",
    nombre: "Enf. Rebeca Altunar Díaz",
    cargoEspecialidad: "Enfermería",
    foto: "/nuestro-equipo/quirofano/enfrebeca.webp",
    descripcion: null,
  },

  // =========================================================
  // RECEPCIÓN
  // =========================================================

  {
    id: "rec-teresa-molina",
    area: "recepcion",
    nombre: "Teresa Molina",
    cargoEspecialidad: "Área Administrativa",
    foto: "/nuestro-equipo/recepcion/rectere.webp",
    credenciales: [
      "Mtra. en Administración en Sistemas de Salud",
    ],
    descripcion: null,
  },

  {
    id: "rec-dlayni-ramirez",
    area: "recepcion",
    nombre: "Lic. Dlayni Ramírez Gómez",
    cargoEspecialidad: "Jefa del Área",
    foto: "/nuestro-equipo/recepcion/recdlay.webp",
    descripcion: null,
    esJefe: true,
  },

  {
    id: "rec-gabriela-borrego",
    area: "recepcion",
    nombre: "Lic. Gabriela Borrego Ramos",
    cargoEspecialidad: "Recepción",
    foto: "/nuestro-equipo/recepcion/recgaby.webp",
    descripcion: null,
  },

  {
    id: "rec-karen-trujillo",
    area: "recepcion",
    nombre: "Lic. Karen Yamilet Trujillo Montesinos",
    cargoEspecialidad: "Recepción",
    foto: "/nuestro-equipo/recepcion/reckaren.webp",
    descripcion: null,
  },

  {
    id: "rec-natividad-gomez",
    area: "recepcion",
    nombre: "Lic. Natividad Gómez Moreno",
    cargoEspecialidad: "Recepción",
    foto: "/nuestro-equipo/recepcion/recnati.webp",
    descripcion: null,
  },

  // =========================================================
  // ASEGURADORA
  // =========================================================

  {
    id: "asg-sadi-rodriguez",
    area: "aseguradora",
    nombre: "Lic. Sadi Rodríguez Espinoza",
    cargoEspecialidad: "Jefa del Área",
    foto: "/nuestro-equipo/aseguradora/asgsadi.webp",
    descripcion: null,
    esJefe: true,
  },

  {
    id: "asg-lisseth-garcia",
    area: "aseguradora",
    nombre: "Lic. Lisseth García Carbajal",
    cargoEspecialidad: "Aseguradora",
    foto: "/nuestro-equipo/aseguradora/asglis.webp",
    descripcion: null,
  },

  // =========================================================
  // IMAGENOLOGÍA
  // =========================================================

  {
    id: "img-karla-martinez",
    area: "imagenologia",
    nombre: "T.R. Karla Itzel Martínez Ferado",
    cargoEspecialidad: "Jefa de Área de Imagenología",
    foto: "/nuestro-equipo/imagenologia/imgkarla.webp",
    descripcion: null,
    esJefe: true,
  },

  {
    id: "img-alexis-ventura",
    area: "imagenologia",
    nombre: "T.R. Alexis Geovanni Ventura Vera",
    cargoEspecialidad: "Imagenología",
    foto: "/nuestro-equipo/imagenologia/imgalexis.webp",
    descripcion: null,
  },

  {
    id: "img-carlos-maldonado",
    area: "imagenologia",
    nombre: "T.R. Carlos Eduardo Maldonado Magaña",
    cargoEspecialidad: "Imagenología",
    foto: "/nuestro-equipo/imagenologia/imgcarlos.webp",
    descripcion: null,
  },

  {
    id: "img-fernando-gutierrez",
    area: "imagenologia",
    nombre: "T.R. Fernando Gutiérrez",
    cargoEspecialidad: "Imagenología",
    foto: "/nuestro-equipo/imagenologia/imgfer.webp",
    descripcion: null,
  },

  {
    id: "img-arlette-monzon",
    area: "imagenologia",
    nombre: "Lic. Arlette Monzón Farro",
    cargoEspecialidad: "Imagenología",
    foto: "/nuestro-equipo/imagenologia/imgarlet.webp",
    descripcion: null,
  },

  {
    id: "img-karen-jimenez",
    area: "imagenologia",
    nombre: "Lic. Karen Rubí Jiménez",
    cargoEspecialidad: "Imagenología",
    foto: "/nuestro-equipo/imagenologia/imgkaren.webp",
    descripcion: null,
  },

  {
    id: "img-raquel-castillo",
    area: "imagenologia",
    nombre: "Raquel Castillo Cruz",
    cargoEspecialidad: "Imagenología",
    foto: "/nuestro-equipo/imagenologia/imgkely.webp",
    descripcion: null,
  },

  // =========================================================
  // INTENDENCIA
  // =========================================================

  {
    id: "int-gabriela-teverasco",
    area: "intendencia",
    nombre: "Gabriela Teverasco Ramos",
    cargoEspecialidad: "Jefa de Área",
    foto: "/nuestro-equipo/intendencia/intgabi.webp",
    descripcion: null,
    esJefe: true,
  },

  {
    id: "int-braulio-trejo",
    area: "intendencia",
    nombre: "Braulio Adrián Trejo Escamilla",
    cargoEspecialidad: "Intendencia",
    foto: "/nuestro-equipo/intendencia/intbraulio.webp",
    descripcion: null,
  },

  {
    id: "int-humberto-martinez",
    area: "intendencia",
    nombre: "Humberto de Jesús Martínez Díaz",
    cargoEspecialidad: "Intendencia",
    foto: "/nuestro-equipo/intendencia/inthumberto.webp",
    descripcion: null,
  },

  {
    id: "int-octavio-macal",
    area: "intendencia",
    nombre: "Octavio Orbelin Macal Pérez",
    cargoEspecialidad: "Intendencia",
    foto: "/nuestro-equipo/intendencia/intoctavio.webp",
    descripcion: null,
  },

  {
    id: "int-pavel-osorio",
    area: "intendencia",
    nombre: "Pavel Osorio Ramos",
    cargoEspecialidad: "Intendencia",
    foto: "/nuestro-equipo/intendencia/intpavel.webp",
    descripcion: null,
  },

  {
    id: "int-rafael-perez",
    area: "intendencia",
    nombre: "Rafael Alberto Pérez Albores",
    cargoEspecialidad: "Intendencia",
    foto: "/nuestro-equipo/intendencia/intrafa.webp",
    descripcion: null,
  },
];
