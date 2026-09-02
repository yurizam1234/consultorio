export interface MotivoConsulta {
  numero: string;
  especialidad: string;
  titulo: string;
  descripcion: string;
  ubicacion: string;
  key: string;
  seccion: string;
  imagen?: string;
  alt?: string;
}

export const MOTIVOS_CONSULTA: MotivoConsulta[] = [
  {
    numero: "01",
    especialidad: "Oftalmología",
    titulo: "Veo borroso o me cansa la vista",
    descripcion:
      "Revisión visual completa, graduación, cataratas, glaucoma, retina y cirugía refractiva con tecnología de vanguardia.",
    ubicacion: "Torre Médica · Piso 2 · Citas disponibles",
    key: "oftalmologia",
    seccion: "especialidades",
    imagen: "/atender/ojo.png",
    alt: "Oftalmología - Cuidado de la vista y cirugía refractiva",
  },
  {
    numero: "02",
    especialidad: "Cardiología",
    titulo: "Me preocupa mi corazón o mi presión",
    descripcion:
      "Electrocardiograma, Holter, MAPA, prueba de esfuerzo, cardiorresonancia y angiotac coronario de alta resolución.",
    ubicacion: "Centro Cardiovascular · Piso 1 · Monitoreo 24h",
    key: "cardiologia",
    seccion: "especialidades",
    imagen: "/atender/corazon.png",
    alt: "Cardiología - Salud cardiovascular y estudios especializados",
  },
  {
    numero: "03",
    especialidad: "Medicina del Dolor",
    titulo: "Tengo un dolor que no cede",
    descripcion:
      "Tratamiento de dolor crónico de columna, articular, neuropático y oncológico con bloqueos y rehabilitación integral.",
    ubicacion: "Clínica del Dolor · Torre A · Valoración experta",
    key: "dolor",
    seccion: "especialidades",
    imagen: "/atender/esqueleto.png",
    alt: "Medicina del dolor - Columna, huesos y articulaciones",
  },
  {
    numero: "04",
    especialidad: "Cirugía General",
    titulo: "Necesito una cirugía o procedimiento",
    descripcion:
      "Valoración quirúrgica y cirugías de mínima invasión y laparoscopía, con 5 quirófanos equipados y hospitalización propia.",
    ubicacion: "Unidad Quirúrgica · Piso 3 · Quirófanos propios",
    key: "cirugia",
    seccion: "especialidades",
    imagen: "/atender/cirugia.png",
    alt: "Cirugía general - Quirófanos y procedimientos de mínima invasión",
  },
];