export interface MotivoConsulta {
  numero: string;
  titulo: string;
  descripcion: string;
  key: string;
}

export const MOTIVOS_CONSULTA: MotivoConsulta[] = [
  {
    numero: "01",
    titulo: "Veo borroso o me cansa la vista",
    descripcion:
      "Revisión visual completa, graduación, cataratas, glaucoma, retina y cirugía refractiva. Es el área con la que nació el hospital.",
    key: "oftalmologia",
  },
  {
    numero: "02",
    titulo: "Mi médico me pidió un estudio",
    descripcion:
      "Resonancia, tomografía, ultrasonido, rayos X y laboratorio clínico. Traes tu orden, te agendamos y entregamos resultados con interpretación.",
    key: "imagenologia",
  },
  {
    numero: "03",
    titulo: "Tengo un dolor que no cede",
    descripcion:
      "Dolor crónico de espalda, articular, neuropático u oncológico, tratado por un equipo que combina bloqueos, medicación y rehabilitación.",
    key: "dolor",
  },
  {
    numero: "04",
    titulo: "Me preocupa mi corazón o mi presión",
    descripcion:
      "Electrocardiograma, Holter, MAPA y prueba de esfuerzo. También cardiorresonancia y angiotac de coronarias, poco disponibles en la región.",
    key: "cardiologia",
  },
  {
    numero: "05",
    titulo: "Algo anda mal con mi digestión",
    descripcion:
      "Endoscopía, colonoscopía, CPRE y elastografía hepática, con sedación y monitoreo en quirófano, no en consultorio.",
    key: "gastro",
  },
  {
    numero: "06",
    titulo: "Me falta el aire o ronco al dormir",
    descripcion:
      "Espirometría, FeNO y poligrafía de sueño para adultos y niños, más terapia de higiene bronquial.",
    key: "neumologia",
  },
];