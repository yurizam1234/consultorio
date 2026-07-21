import type { Lang } from "@/shared/i18n/translations";

export interface Doctor {
  name: string;
  specialty: Record<Lang, string>;
  desc: Record<Lang, string>;
  exp: Record<Lang, string>;
  img: string;
}

export const doctores: Doctor[] = [
  {
    name: "Dr. Edgar A. Solano Tego",
    specialty: { es: "Oftalmología", en: "Ophthalmology" },
    desc: {
      es: "Especialista en diagnóstico y tratamiento visual con más de 12 años de experiencia.",
      en: "Specialist in visual diagnosis and treatment with over 12 years of experience.",
    },
    exp: { es: "12 años", en: "12 years" },
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=1200&q=80",
  },
  {
    name: "Dr. Carlos D. Cabrera Reyes",
    specialty: { es: "Oftalmología", en: "Ophthalmology" },
    desc: {
      es: "Certificado en cirugía refractiva y manejo de patologías oculares complejas.",
      en: "Certified in refractive surgery and management of complex eye conditions.",
    },
    exp: { es: "10 años", en: "10 years" },
    img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1200&q=80",
  },
  {
    name: "Dr. Werner Schlie Villa",
    specialty: { es: "Cardiología", en: "Cardiology" },
    desc: {
      es: "Experto en prevención y tratamiento de enfermedades cardiovasculares.",
      en: "Expert in prevention and treatment of cardiovascular disease.",
    },
    exp: { es: "15 años", en: "15 years" },
    img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=1200&q=80",
  },
  {
    name: "Dr. Nelson J. Urbina López",
    specialty: { es: "Medicina del dolor", en: "Pain Medicine" },
    desc: {
      es: "Manejo integral del dolor crónico y agudo con enfoque multidisciplinario.",
      en: "Comprehensive management of chronic and acute pain with a multidisciplinary approach.",
    },
    exp: { es: "8 años", en: "8 years" },
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80",
  },
  {
    name: "Dr. Rubén Bañuelos",
    specialty: { es: "Radiología", en: "Radiology" },
    desc: {
      es: "Jefe de imagenología, especialista en resonancia magnética y tomografía.",
      en: "Head of imaging, specialist in MRI and CT scans.",
    },
    exp: { es: "14 años", en: "14 years" },
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=1200&q=80",
  },
];
