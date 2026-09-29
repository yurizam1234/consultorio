import type { Lang } from "@/shared/i18n/translations";

export interface Instalacion {
  num: string;
  title: Record<Lang, string>;
  desc: Record<Lang, string>;
  tag: Record<Lang, string>;
  // Opcional: si aún no hay foto real del área, se muestra un fondo neutro
  // en vez de una imagen (ver DiagonalPanelItem.tsx).
  img?: string;
  galeria: string[];
}

export const instalaciones: Instalacion[] = [
  {
    num: "01",
    title: { es: "Farmacia", en: "Pharmacy" },
    desc: {
      es: "Encuentra tus medicamentos y productos de salud en un solo lugar.",
      en: "Find all the medications and health products you need in one place.",
    },
    tag: { es: "Farmacia", en: "Pharmacy" },
    img: "/instalaciones/areas-diagnosticas/farmacia.webp",
    galeria: [
      "/instalaciones/areas-diagnosticas/farmacia1.webp", 
      "/instalaciones/areas-diagnosticas/farmacia2.webp",
      "/instalaciones/areas-diagnosticas/farmacia3.webp",
    ],
  },
  {
    num: "02",
    title: { es: "Consultorios", en: "Private offices" },
    desc: {
      es: "Espacios acogedores para una atención personalizada y confidencial.",
      en: "Welcoming spaces for personalized, confidential care.",
    },
    tag: { es: "Consulta", en: "Consultation" },
    img: "/instalaciones/areas-diagnosticas/consultario.webp",
    galeria: [
      
      "/instalaciones/consultorios/con1.webp",
      "/instalaciones/consultorios/dr3.webp",
      "/instalaciones/consultorios/con3.webp",
      "/instalaciones/consultorios/con2.webp",
      "/instalaciones/consultorios/con5.webp",
      "/instalaciones/consultorios/con6.webp",
      "/instalaciones/consultorios/con7.webp",
      
      
    ],
  },
  {
    num: "03",
    title: { es: "Hospitalización", en: "Inpatient care" },
    desc: {
      es: "Ambiente cómodo y tranquilo para tu recuperación.",
      en: "A comfortable, calm environment for your recovery.",
    },
    tag: { es: "Hospitalización", en: "Inpatient care" },
    img: "/instalaciones/habitaciones/hs1.webp",
    galeria: [
      "/instalaciones/habitaciones/hs3.webp",
      "/instalaciones/habitaciones/hs5.webp",
      "/instalaciones/habitaciones/hs2.webp",
    ],
  },
  {
    num: "04",
    title: { es: "Quirófanos", en: "Operating rooms" },
    desc: {
      es: "Cinco quirófanos propios, totalmente equipados.",
      en: "Five fully equipped operating rooms of our own.",
    },
    tag: { es: "Cirugía", en: "Surgery" },
    img: "/instalaciones/quirofanos/qx8.webp",
    galeria: [
      "/instalaciones/quirofanos/qx2.webp",
      "/instalaciones/quirofanos/qx1.webp",
      "/instalaciones/quirofanos/qx3.webp",
      "/instalaciones/quirofanos/qx4.webp",
      "/instalaciones/quirofanos/qx5.webp",
      "/instalaciones/quirofanos/qx6.webp",
      "/instalaciones/quirofanos/qx7.webp",
    ],
  },
  {
    num: "05",
    title: { es: "Aseguradora", en: "Insurance office" },
    desc: {
      es: "Atención y gestión de trámites con tu aseguradora.",
      en: "Assistance and paperwork with your insurance provider.",
    },
    tag: { es: "Trámites", en: "Paperwork" },
    img: "/nuestro-equipo/aseguradora/aseguradora.webp",
    galeria: [
      "/nuestro-equipo/aseguradora/asglis.webp",
      "/nuestro-equipo/aseguradora/asgsadi.webp",
    ],
  },
];
