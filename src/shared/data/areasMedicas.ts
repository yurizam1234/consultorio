import type { Lang } from "@/shared/i18n/translations";

export interface AreaMedica {
  tagline: Record<Lang, string>;
  title: Record<Lang, string>;
  desc: Record<Lang, string>;
  img: string;
  comingSoon?: boolean;
}

export const areasMedicas: AreaMedica[] = [
  {
    tagline: { es: "Diagnóstico por imagen", en: "Imaging diagnostics" },
    title: { es: "Imagenología", en: "Imaging" },
    desc: {
      es: "Equipos de última generación para estudios de rayos X, tomografía, resonancia y ultrasonido con resultados precisos.",
      en: "Latest-generation equipment for X-ray, CT, MRI, and ultrasound studies with precise results.",
    },
    img: "/instalaciones/areas-diagnosticas/reso3.webp",
  },
  {
    tagline: { es: "Salud visual", en: "Visual health" },
    title: { es: "Oftalmología", en: "Ophthalmology" },
    desc: {
      es: "Diagnóstico y tratamiento visual con especialistas certificados en cirugía refractiva y patologías oculares complejas.",
      en: "Visual diagnosis and treatment with specialists certified in refractive surgery and complex eye conditions.",
    },
    img: "/oftamologia/instalaciones.webp",
  },
  {
    tagline: { es: "Resultados confiables", en: "Reliable results" },
    title: { es: "Laboratorio clínico", en: "Clinical Lab" },
    desc: {
      es: "La mayoría de los estudios de rutina listos en 24 horas con toma de muestras y procesamiento de alta precisión.",
      en: "Most routine studies ready within 24 hours with high-precision sample collection and processing.",
    },
    img: "/servicios/laboratorio-clinico.webp",
  },
  {
    tagline: { es: "Atención inmediata", en: "Immediate care" },
    title: { es: "Urgencias 24/7", en: "24/7 Emergency" },
    desc: {
      es: "Médicos urgenciólogos y área equipada disponible los 365 días del año para cualquier eventualidad médica.",
      en: "Emergency physicians and equipped area available 365 days a year for any medical eventuality.",
    },
    img: "/instalaciones/areas-diagnosticas/urgencia.webp",
  },
  {
    tagline: { es: "Cirugía segura", en: "Safe surgery" },
    title: { es: "Quirófanos", en: "Operating Rooms" },
    desc: {
      es: "Cinco quirófanos propios totalmente equipados con tecnología de mínima invasión y servicio de esterilización.",
      en: "Five fully equipped operating rooms of our own, with minimally invasive technology and sterilization service.",
    },
    img: "/instalaciones/quirofanos/equipo.webp",
  },
  {
    tagline: { es: "Salud del corazón", en: "Heart health" },
    title: { es: "Cardiología", en: "Cardiology" },
    desc: {
      es: "Prevención, diagnóstico y tratamiento de enfermedades cardiovasculares con ECG, Holter, MAPA y AngioTAC.",
      en: "Prevention, diagnosis, and treatment of cardiovascular disease with ECG, Holter, MAPA, and AngioCT.",
    },
    img: "/instalaciones/areas-diagnosticas/qx2.webp",
  },
  {
    tagline: { es: "Manejo integral del dolor", en: "Comprehensive pain care" },
    title: { es: "Medicina del dolor", en: "Pain Medicine" },
    desc: {
      es: "Tratamiento de dolor crónico y agudo de columna y articulaciones con bloqueos ecoguiados y rehabilitación.",
      en: "Treatment of chronic and acute spine and joint pain with ultrasound-guided blocks and rehabilitation.",
    },
    img: "/servicios/medicinadolor.webp",
  },
  {
    tagline: { es: "Atención primaria", en: "Primary care" },
    title: { es: "Medicina General", en: "General Medicine" },
    desc: {
      es: "Consulta general y preventiva para el cuidado integral de tu salud y la de toda tu familia.",
      en: "General and preventive consultation for the comprehensive care of your health and that of your family.",
    },
    img: "/instalaciones/consultorios/con1.webp",
  },
  {
    tagline: { es: "Salud digestiva", en: "Digestive health" },
    title: { es: "Gastroenterología", en: "Gastroenterology" },
    desc: {
      es: "Endoscopía, colonoscopía, enteroscopía, CPRE y elastografía hepática para diagnóstico digestivo avanzado.",
      en: "Endoscopy, colonoscopy, enteroscopy, ERCP, and liver elastography for advanced digestive diagnosis.",
    },
    img: "/instalaciones/areas-diagnosticas/usg.webp",
  },
  {
    tagline: { es: "Salud respiratoria", en: "Respiratory health" },
    title: { es: "Neumología", en: "Pulmonology" },
    desc: {
      es: "Estudios de función pulmonar para adultos y niños: espirometría, poligrafía de sueño y rehabilitación respiratoria.",
      en: "Pulmonary function studies for adults and children: spirometry, sleep polygraphy, and respiratory rehab.",
    },
    img: "/instalaciones/areas-diagnosticas/reso4.webp",
  },
  {
    tagline: { es: "Muy pronto", en: "Coming soon" },
    title: { es: "Atención a domicilio", en: "At-home care" },
    desc: {
      es: "Rayos X, laboratorio, enfermería y medicina general en la comodidad de tu casa u oficina.",
      en: "X-ray, lab work, nursing, and general medicine in the comfort of your home or office.",
    },
    img: "/img/equipo.webp",
    comingSoon: true,
  },
];
