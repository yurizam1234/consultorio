import type { Lang } from "@/shared/i18n/translations";

export interface Instalacion {
  num: string;
  title: Record<Lang, string>;
  desc: Record<Lang, string>;
  tag: Record<Lang, string>;
  img: string;
}

export const instalaciones: Instalacion[] = [
  {
    num: "01",
    title: { es: "Consultorios privados", en: "Private offices" },
    desc: {
      es: "Espacios acogedores para una atención personalizada y confidencial.",
      en: "Welcoming spaces for personalized, confidential care.",
    },
    tag: { es: "🔬 Diagnóstico", en: "🔬 Diagnostics" },
    img: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&q=80",
  },
  {
    num: "02",
    title: { es: "Área de diagnóstico", en: "Diagnostics area" },
    desc: {
      es: "Equipos de última generación para estudios precisos y rápidos.",
      en: "Latest-generation equipment for precise, fast studies.",
    },
    tag: { es: "📡 Imagenología", en: "📡 Imaging" },
    img: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&q=80",
  },
  {
    num: "03",
    title: { es: "Sala de espera", en: "Waiting room" },
    desc: {
      es: "Ambiente relajante con luz natural, áreas verdes y confort.",
      en: "Relaxing atmosphere with natural light, green areas, and comfort.",
    },
    tag: { es: "🛋️ Confort", en: "🛋️ Comfort" },
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80",
  },
  {
    num: "04",
    title: { es: "Quirófanos", en: "Operating rooms" },
    desc: {
      es: "Cinco quirófanos totalmente equipados con tecnología de punta.",
      en: "Five fully equipped operating rooms with cutting-edge technology.",
    },
    tag: { es: "🏥 Cirugía", en: "🏥 Surgery" },
    img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80",
  },
  {
    num: "05",
    title: { es: "Urgencias 24/7", en: "24/7 Emergency care" },
    desc: {
      es: "Personal capacitado y área equipada disponible todos los días del año.",
      en: "Trained staff and equipped area available every day of the year.",
    },
    tag: { es: "🚨 Atención inmediata", en: "🚨 Immediate care" },
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80",
  },
];
