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
  comingSoon?: boolean;
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
    imagen: "/oftamologia/intervencion.webp",
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
  {
    numero: "05",
    especialidad: "Imagenología",
    titulo: "Necesito una resonancia, tomografía o rayos X",
    descripcion:
      "Equipos de última generación para estudios de rayos X, tomografía, resonancia y ultrasonido con resultados precisos.",
    ubicacion: "Área de Imagenología · Estudios el mismo día",
    key: "imagenologia",
    seccion: "especialidades",
    imagen: "/instalaciones/areas-diagnosticas/reso3.jpg",
    alt: "Imagenología - Resonancia, tomografía, ultrasonido y rayos X",
  },
  {
    numero: "06",
    especialidad: "Laboratorio clínico",
    titulo: "Necesito análisis de laboratorio",
    descripcion:
      "La mayoría de los estudios de rutina listos en 24 horas con toma de muestras y procesamiento de alta precisión.",
    ubicacion: "Laboratorio Clínico · Resultados en 24h",
    key: "laboratorio",
    seccion: "especialidades",
    imagen: "/servicios/laboratorio-clinico.png",
    alt: "Laboratorio clínico - Toma de muestras y procesamiento de alta precisión",
  },
  {
    numero: "07",
    especialidad: "Urgencias 24/7",
    titulo: "Tengo una urgencia médica ahora mismo",
    descripcion:
      "Médicos urgenciólogos y área equipada disponible los 365 días del año para cualquier eventualidad médica.",
    ubicacion: "Urgencias · Atención inmediata las 24 horas",
    key: "urgencia",
    seccion: "urgencia",
    imagen: "/instalaciones/areas-diagnosticas/urgencia.jpeg",
    alt: "Urgencias 24/7 - Atención médica inmediata los 365 días del año",
  },
  {
    numero: "08",
    especialidad: "Quirófanos",
    titulo: "Busco un hospital con quirófanos propios",
    descripcion:
      "Cinco quirófanos propios totalmente equipados con tecnología de mínima invasión y servicio de esterilización.",
    ubicacion: "Unidad Quirúrgica · 5 quirófanos equipados",
    key: "quirofano",
    seccion: "especialidades",
    imagen: "/instalaciones/quirofanos/equipo.jpeg",
    alt: "Quirófanos - Cinco salas equipadas con tecnología de mínima invasión",
  },
  {
    numero: "09",
    especialidad: "Medicina General",
    titulo: "No sé qué especialista necesito",
    descripcion:
      "Consulta general y preventiva para el cuidado integral de tu salud y la de toda tu familia.",
    ubicacion: "Consulta Externa · Citas disponibles",
    key: "general",
    seccion: "especialidades",
    imagen: "/instalaciones/consultorios/con1.jpg",
    alt: "Medicina General - Consulta general y preventiva para toda la familia",
  },
  {
    numero: "10",
    especialidad: "Gastroenterología",
    titulo: "Tengo molestias digestivas o quiero un chequeo",
    descripcion:
      "Endoscopía, colonoscopía, enteroscopía, CPRE y elastografía hepática para diagnóstico digestivo avanzado.",
    ubicacion: "Endoscopía · Diagnóstico digestivo avanzado",
    key: "gastro",
    seccion: "especialidades",
    imagen: "/instalaciones/areas-diagnosticas/usg.jpg",
    alt: "Gastroenterología - Endoscopía, colonoscopía y elastografía hepática",
  },
  {
    numero: "11",
    especialidad: "Neumología",
    titulo: "Tengo tos, apnea del sueño o problemas para respirar",
    descripcion:
      "Estudios de función pulmonar para adultos y niños: espirometría, poligrafía de sueño y rehabilitación respiratoria.",
    ubicacion: "Función Pulmonar · Citas disponibles",
    key: "neumologia",
    seccion: "especialidades",
    imagen: "/instalaciones/areas-diagnosticas/reso4.jpeg",
    alt: "Neumología - Espirometría, poligrafía de sueño y rehabilitación respiratoria",
  },
  {
    numero: "12",
    especialidad: "Atención a domicilio",
    titulo: "Necesito atención médica en casa",
    descripcion:
      "Rayos X, laboratorio, enfermería y medicina general en la comodidad de tu casa u oficina.",
    ubicacion: "Muy pronto disponible",
    key: "domicilio",
    seccion: "proximamente",
    imagen: "/img/equipo.jpg",
    alt: "Atención a domicilio - Rayos X, laboratorio y enfermería en casa",
    comingSoon: true,
  },
];