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
    img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&q=80",
  },
  {
    tagline: { es: "Salud visual", en: "Visual health" },
    title: { es: "Oftalmología", en: "Ophthalmology" },
    desc: {
      es: "Diagnóstico y tratamiento visual con especialistas certificados en cirugía refractiva y patologías oculares complejas.",
      en: "Visual diagnosis and treatment with specialists certified in refractive surgery and complex eye conditions.",
    },
    img: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1200&q=80",
  },
  {
    tagline: { es: "Resultados confiables", en: "Reliable results" },
    title: { es: "Laboratorio clínico", en: "Clinical Lab" },
    desc: {
      es: "Pruebas de laboratorio con tecnología de punta y entrega de resultados en 24 horas.",
      en: "Lab tests with cutting-edge technology and results delivered within 24 hours.",
    },
    img: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=1200&q=80",
  },
  {
    tagline: { es: "Atención inmediata", en: "Immediate care" },
    title: { es: "Urgencias 24/7", en: "24/7 Emergency" },
    desc: {
      es: "Personal capacitado y área equipada disponible los 365 días del año, a cualquier hora.",
      en: "Trained staff and an equipped area available 365 days a year, any time.",
    },
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80",
  },
  {
    tagline: { es: "Cirugía segura", en: "Safe surgery" },
    title: { es: "Quirófanos", en: "Operating Rooms" },
    desc: {
      es: "Cinco quirófanos totalmente equipados con tecnología de punta para procedimientos seguros.",
      en: "Five fully equipped operating rooms with cutting-edge technology for safe procedures.",
    },
    img: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=1200&q=80",
  },
];
