import type { Lang } from "@/shared/i18n/translations";

export interface Doctor {
  name: string;
  specialty: Record<Lang, string>;
  desc: Record<Lang, string>;
  exp: Record<Lang, string>;
  img: string;
  credentials: Record<Lang, string[]>;
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
    credentials: {
      es: [
        "Especialidad en Oftalmología, UNAM",
        "Alta especialidad en Cirugía de Retina",
        "Miembro de la Sociedad Mexicana de Oftalmología",
      ],
      en: [
        "Specialization in Ophthalmology, UNAM",
        "Advanced training in Retinal Surgery",
        "Member of the Mexican Society of Ophthalmology",
      ],
    },
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
    credentials: {
      es: [
        "Especialidad en Oftalmología, IPN",
        "Certificación en Cirugía Refractiva LASIK",
        "Consejo Mexicano de Oftalmología, vigente",
      ],
      en: [
        "Specialization in Ophthalmology, IPN",
        "Certification in LASIK Refractive Surgery",
        "Mexican Board of Ophthalmology, current",
      ],
    },
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
    credentials: {
      es: [
        "Especialidad en Cardiología, IMSS",
        "Alta especialidad en Hemodinamia",
        "Consejo Mexicano de Cardiología, vigente",
      ],
      en: [
        "Specialization in Cardiology, IMSS",
        "Advanced training in Hemodynamics",
        "Mexican Board of Cardiology, current",
      ],
    },
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
    credentials: {
      es: [
        "Especialidad en Anestesiología, UANL",
        "Alta especialidad en Clínica del Dolor",
        "Miembro de la Asociación Mexicana para el Estudio del Dolor",
      ],
      en: [
        "Specialization in Anesthesiology, UANL",
        "Advanced training in Pain Clinic Management",
        "Member of the Mexican Pain Society",
      ],
    },
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
    credentials: {
      es: [
        "Especialidad en Radiología e Imagen, UDG",
        "Alta especialidad en Resonancia Magnética",
        "Consejo Mexicano de Radiología, vigente",
      ],
      en: [
        "Specialization in Radiology and Imaging, UDG",
        "Advanced training in MRI Imaging",
        "Mexican Board of Radiology, current",
      ],
    },
  },
];
