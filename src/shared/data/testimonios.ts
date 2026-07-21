import type { Lang } from "@/shared/i18n/translations";

export interface Testimonio {
  quote: Record<Lang, string>;
  name: string;
  role: Record<Lang, string>;
  initials: string;
}

export const testimonios: Testimonio[] = [
  {
    quote: {
      es: "La atención fue excelente desde el primer contacto. Agendé mi cita en línea y me atendieron puntual, sin esperas.",
      en: "The care was excellent from the first contact. I booked my appointment online and was seen right on time, no waiting.",
    },
    name: "Renata M.",
    role: { es: "Paciente de Medicina General", en: "General Medicine patient" },
    initials: "RM",
  },
  {
    quote: {
      es: "El equipo de imagenología es de primer nivel. Tuve mis resultados en menos de 24 horas.",
      en: "The imaging team is first-rate. I had my results in under 24 hours.",
    },
    name: "Carlos V.",
    role: { es: "Paciente de Imagenología", en: "Imaging patient" },
    initials: "CV",
  },
  {
    quote: {
      es: "Fui a urgencias un domingo y me atendieron de inmediato. Se nota que están preparados 24/7.",
      en: "I went to the ER on a Sunday and was seen right away. You can tell they are ready 24/7.",
    },
    name: "Daniela R.",
    role: { es: "Paciente de Urgencias", en: "Emergency Care patient" },
    initials: "DR",
  },
  {
    quote: {
      es: "Los doctores explican todo con calma y claridad. Me sentí escuchada en cada consulta.",
      en: "The doctors explain everything calmly and clearly. I felt heard at every visit.",
    },
    name: "Sofía L.",
    role: { es: "Paciente de Oftalmología", en: "Ophthalmology patient" },
    initials: "SL",
  },
  {
    quote: {
      es: "Instalaciones limpias, modernas y personal muy amable. Totalmente recomendado.",
      en: "Clean, modern facilities and very friendly staff. Highly recommended.",
    },
    name: "Jorge A.",
    role: { es: "Paciente de Laboratorio", en: "Laboratory patient" },
    initials: "JA",
  },
];
