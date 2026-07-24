import type { Lang } from "@/shared/i18n/translations";

export interface AreaMedica {
  tagline: Record<Lang, string>;
  title: Record<Lang, string>;
  desc: Record<Lang, string>;
  img: string;
}

export const areasMedicas: AreaMedica[] = [
  {
    tagline: { es: "Diagnóstico por imagen", en: "Imaging diagnostics" },
    title: { es: "Imagenología", en: "Imaging" },
    desc: {
      es: "Equipos de última generación para estudios de rayos X, tomografía, resonancia y ultrasonido con resultados precisos.",
      en: "Latest-generation equipment for X-ray, CT, MRI, and ultrasound studies with precise results.",
    },
    img: "/servicios/imagenologia.jpg",
  },
  {
    tagline: { es: "Salud visual", en: "Visual health" },
    title: { es: "Oftalmología", en: "Ophthalmology" },
    desc: {
      es: "Diagnóstico y tratamiento visual con especialistas certificados en cirugía refractiva y patologías oculares complejas.",
      en: "Visual diagnosis and treatment with specialists certified in refractive surgery and complex eye conditions.",
    },
    img: "/servicios/oftalmologia.png",
  },
  {
    tagline: { es: "Resultados confiables", en: "Reliable results" },
    title: { es: "Laboratorio clínico", en: "Clinical Lab" },
    desc: {
      es: "Pruebas de laboratorio con tecnología de punta y entrega de resultados en 24 horas.",
      en: "Lab tests with cutting-edge technology and results delivered within 24 hours.",
    },
    img: "/servicios/laboratorio-clinico.png",
  },
  {
    tagline: { es: "Atención inmediata", en: "Immediate care" },
    title: { es: "Urgencias 24/7", en: "24/7 Emergency" },
    desc: {
      es: "Personal capacitado y área equipada disponible los 365 días del año, a cualquier hora.",
      en: "Trained staff and an equipped area available 365 days a year, any time.",
    },
    img: "/servicios/urgencias-24hr.jpg",
  },
  {
    tagline: { es: "Cirugía segura", en: "Safe surgery" },
    title: { es: "Quirófanos", en: "Operating Rooms" },
    desc: {
      es: "Cinco quirófanos totalmente equipados con tecnología de punta para procedimientos seguros.",
      en: "Five fully equipped operating rooms with cutting-edge technology for safe procedures.",
    },
    img: "/servicios/quirofanos.png",
  },
  {
    tagline: { es: "Salud del corazón", en: "Heart health" },
    title: { es: "Cardiología", en: "Cardiology" },
    desc: {
      es: "Prevención, diagnóstico y tratamiento de enfermedades cardiovasculares.",
      en: "Prevention, diagnosis, and treatment of cardiovascular disease.",
    },
    // Foto temporal (reutilizada de consultorios) — reemplazar cuando haya una
    // foto real de esta especialidad en public/servicios/.
    img: "/instalaciones/consultorios/con1.jpg",
  },
  {
    tagline: { es: "Manejo integral del dolor", en: "Comprehensive pain care" },
    title: { es: "Medicina del dolor", en: "Pain Medicine" },
    desc: {
      es: "Tratamiento del dolor crónico y agudo con un enfoque multidisciplinario.",
      en: "Chronic and acute pain treatment with a multidisciplinary approach.",
    },
    // Foto temporal (reutilizada de consultorios) — reemplazar cuando haya una
    // foto real de esta especialidad en public/servicios/.
    img: "/instalaciones/consultorios/con1.jpg",
  },
  {
    tagline: { es: "Atención primaria", en: "Primary care" },
    title: { es: "Medicina General", en: "General Medicine" },
    desc: {
      es: "Consulta general para el cuidado de tu salud y la de tu familia.",
      en: "General consultation for your health and your family's health.",
    },
    // Foto temporal (reutilizada de consultorios) — reemplazar cuando haya una
    // foto real de esta especialidad en public/servicios/.
    img: "/instalaciones/consultorios/con1.jpg",
  },
];
