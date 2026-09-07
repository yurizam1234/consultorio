import type { Lang } from "@/shared/i18n/translations";

export interface Doctor {
  name?: string;
  specialty?: Record<Lang, string>;
  desc?: Record<Lang, string>;
  exp?: Record<Lang, string>;
  // Foto de estudio normal (recorte cuadrado): la que se usa en el
  // circulito de la barra de equipo.
  img: string;
  // Foto de medio cuerpo (recorte tipo "cutout", fondo oscuro difuminado):
  // la que se usa en la foto grande de la tarjeta (".equipo-v2-photo"). Si
  // falta, esa foto grande usa "img" como respaldo.
  imgMedioCuerpo?: string;
  credentials?: Record<Lang, string[]>;
  // Cédula profesional (título) y cédula de especialidad, tal como aparecen
  // en el Registro Nacional de Profesionistas (SEP). Sin completar a propósito.
  cedulaProfesional?: string;
  cedulaEspecialidad?: string;
}

// Datos reales del equipo médico, a partir del listado de personal entregado
// por el hospital ("Personal_Hospital_Arboledas"). Años de experiencia y
// credenciales detalladas se dejan sin completar (no venían en ese listado):
// agrégalos aquí mismo cuando tengas el dato confirmado.
export const doctores: Doctor[] = [
  {
    img: "/nuestro-equipo/medicos/drsolano.webp",
    imgMedioCuerpo: "/nuestro-equipo/medicos/drsolanomediocuerpo.png",
    name: "Dr. Edgar A. Solano Tego",
    specialty: { es: "Oftalmología", en: "Ophthalmology" },
    desc: {
      es: "Especialista en Oftalmología con amplia experiencia en diagnóstico y tratamiento de enfermedades oculares, comprometido con la atención profesional de cada paciente.",
      en: "Ophthalmology specialist with extensive experience in the diagnosis and treatment of eye conditions, committed to professional care for every patient.",
    },
    cedulaProfesional: "2013102",
    cedulaEspecialidad: "4010390",
  },
  {
    img: "/nuestro-equipo/medicos/drdario.webp",
    imgMedioCuerpo: "/nuestro-equipo/medicos/drdariomediocuerpo.png",
    name: "Dr. Carlos Darío Cabrera Reyes",
    specialty: { es: "Oftalmología", en: "Ophthalmology" },
    desc: {
      es: "Especialista en Oftalmología con formación en la UNAM, amplia experiencia clínica y enfoque en el diagnóstico preciso y tratamiento efectivo de padecimientos oculares.",
      en: "Ophthalmology specialist trained at UNAM, with broad clinical experience and a focus on precise diagnosis and effective treatment of eye conditions.",
    },
    cedulaProfesional: "4831468 - UAG",
    cedulaEspecialidad: "7605511 - UNAM",
  },
  {
    img: "/nuestro-equipo/medicos/drmanuel.webp",
    imgMedioCuerpo: "/nuestro-equipo/medicos/drmanuelmediocuerpo.png",
    name: "Dr. Manuel Alejandro Trinidad Balboa",
    specialty: { es: "Oftalmología Primer Contacto", en: "First-Contact Ophthalmology" },
    desc: {
      es: "Master en Oftalmología por la Universidad Cardenal Herrera de España.",
      en: "Master's degree in Ophthalmology from Universidad Cardenal Herrera, Spain.",
    },
    cedulaProfesional: "4831793 - UAG",
  },
  {
    img: "/nuestro-equipo/medicos/drmarcoantoniozenteno.jpg",
    imgMedioCuerpo: "/nuestro-equipo/medicos/drmarcoantoniozentenomediocuerpo.png",
    name: "Dr. Marco Antonio Zenteno Zenteno",
    specialty: { es: "Oftalmología", en: "Ophthalmology" },
    cedulaEspecialidad: "CE 11511570",
  },
  {
    img: "/nuestro-equipo/medicos/drwerner.webp",
    imgMedioCuerpo: "/nuestro-equipo/medicos/drwernermediocuerpo.png",
    name: "Dr. Werner Schlie Villa",
    specialty: { es: "Cardiología", en: "Cardiology" },
    desc: {
      es: "Alta Especialidad en Electrofisiología y Estimulación Cardiaca.",
      en: "Advanced specialty in Electrophysiology and Cardiac Pacing.",
    },
    cedulaProfesional: "11537138",
    cedulaEspecialidad: "14118357",
  },
  {
    img: "/nuestro-equipo/medicos/drnelson.webp",
    imgMedioCuerpo: "/nuestro-equipo/medicos/drnelsonmediocuerpo.png",
    name: "Dr. Nelson Jovanny Urbina López",
    specialty: { es: "Medicina del Dolor", en: "Pain Medicine" },
    desc: {
      es: "Medicina del dolor y Medicina Paliativa.",
      en: "Pain medicine and palliative care.",
    },
    cedulaEspecialidad: "15706245",
  },
  {
    img: "/nuestro-equipo/medicos/drarturopaniagua.webp",
    imgMedioCuerpo: "/nuestro-equipo/medicos/drarturopaniaguamediocuerpo.png",
    name: "Dr. Arturo Gordillo Paniagua",
    specialty: { es: "Coordinador Médico", en: "Medical Coordinator" },
    desc: {
      es: "Coordinador médico de SH Arboledas, enfocado en la calidad de la atención y la coordinación entre las distintas áreas del hospital.",
      en: "Medical coordinator at SH Arboledas, focused on care quality and coordination across the hospital's departments.",
    },
  },
  {
    img: "/nuestro-equipo/medicos/dramaritza.webp",
    imgMedioCuerpo: "/nuestro-equipo/medicos/dramaritzamediocuerpo.png",
    name: "Dra. Maritza Gutierrez Zavala",
    specialty: { es: "Médico General", en: "General Practitioner" },
    desc: {
      es: "Médica general comprometida con brindar una atención cercana, integral y de calidad a cada paciente.",
      en: "General practitioner committed to providing close, comprehensive, quality care to every patient.",
    },
  },
  {
    img: "/nuestro-equipo/medicos/draelviragabriela.webp",
    imgMedioCuerpo: "/nuestro-equipo/medicos/draelviragabrielamediocuerpo.png",
    name: "Dra. Elvira Gabrielle Solis Chacon",
    specialty: { es: "Médico General", en: "General Practitioner" },
    desc: {
      es: "Médica general con un enfoque humano y profesional en la atención primaria de cada paciente.",
      en: "General practitioner with a human, professional approach to primary care for every patient.",
    },
  },
  {
    img: "/nuestro-equipo/medicos/dradrianadelcarmen.webp",
    imgMedioCuerpo: "/nuestro-equipo/medicos/dradrianadelcarmenmediocuerpo.png",
    name: "Dra. Adriana del Carmen Gutierrez Chavarria",
    specialty: { es: "Médico General", en: "General Practitioner" },
    desc: {
      es: "Médica general dedicada a la valoración y el seguimiento integral de la salud de sus pacientes.",
      en: "General practitioner dedicated to comprehensive health assessment and follow-up for her patients.",
    },
  },
  {
    img: "/nuestro-equipo/medicos/drluisernesto.webp",
    imgMedioCuerpo: "/nuestro-equipo/medicos/drluisernestomediocuerpo.png",
    name: "Dr. Luis Ernesto Vazquez Gomez",
    specialty: { es: "Médico General", en: "General Practitioner" },
    desc: {
      es: "Médico general comprometido con la atención oportuna y de calidad para ti y tu familia.",
      en: "General practitioner committed to timely, quality care for you and your family.",
    },
  },
  {
    img: "/nuestro-equipo/medicos/drajulieta.jpg",
    imgMedioCuerpo: "/nuestro-equipo/medicos/drajulietamediocuerpo.png",
    name: "Dra. Julieta",
    specialty: { es: "Medicina Interna", en: "Internal Medicine" },
  },
  {
    img: "/nuestro-equipo/medicos/drmartinchang.jpg",
    imgMedioCuerpo: "/nuestro-equipo/medicos/drmartinchangmediocuerpo.png",
    name: "Dr. Martin Chang",
    specialty: { es: "Nefrología", en: "Nephrology" },
  },
];
