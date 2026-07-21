export interface Instalacion {
  num: string;
  title: string;
  desc: string;
  tag: string;
  img: string;
}

export const instalaciones: Instalacion[] = [
  {
    num: "01",
    title: "Consultorios privados",
    desc: "Espacios acogedores para una atención personalizada y confidencial.",
    tag: "🔬 Diagnóstico",
    img: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&q=80",
  },
  {
    num: "02",
    title: "Área de diagnóstico",
    desc: "Equipos de última generación para estudios precisos y rápidos.",
    tag: "📡 Imagenología",
    img: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&q=80",
  },
  {
    num: "03",
    title: "Sala de espera",
    desc: "Ambiente relajante con luz natural, áreas verdes y confort.",
    tag: "🛋️ Confort",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80",
  },
  {
    num: "04",
    title: "Quirófanos",
    desc: "Cinco quirófanos totalmente equipados con tecnología de punta.",
    tag: "🏥 Cirugía",
    img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80",
  },
  {
    num: "05",
    title: "Urgencias 24/7",
    desc: "Personal capacitado y área equipada disponible todos los días del año.",
    tag: "🚨 Atención inmediata",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80",
  },
];
