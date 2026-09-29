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
    title: { es: "Áreas diagnósticas", en: "Diagnostic areas" },
    desc: {
      es: "Equipos de última generación para estudios precisos y rápidos.",
      en: "Latest-generation equipment for precise, fast studies.",
    },
    tag: { es: "Imagenología", en: "Imaging" },
    img: "/instalaciones/areas-diagnosticas/usg.webp",
    galeria: [
      "/instalaciones/areas-diagnosticas/usg.webp",
      "/instalaciones/areas-diagnosticas/usg2.webp",
      "/instalaciones/areas-diagnosticas/estudio.webp",
      "/instalaciones/areas-diagnosticas/reso3.webp",
      "/instalaciones/areas-diagnosticas/reso4.webp",
      "/instalaciones/areas-diagnosticas/tac2.webp",
      "/instalaciones/areas-diagnosticas/urgencia.webp",
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
      "/instalaciones/consultorios/con2.webp",
      "/instalaciones/consultorios/con3.webp",
      "/instalaciones/consultorios/con4.webp",
      "/instalaciones/consultorios/con5.webp",
      "/instalaciones/consultorios/dr3.webp",
      "/instalaciones/consultorios/dr5.webp",
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
      "/instalaciones/habitaciones/hs1.webp",
      "/instalaciones/habitaciones/hs2.webp",
      "/instalaciones/habitaciones/hs5.webp",
      "/instalaciones/habitaciones/hs6.webp",
      "/instalaciones/habitaciones/enf3.webp",
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
    img: "/instalaciones/quirofanos/qx2.webp",
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
