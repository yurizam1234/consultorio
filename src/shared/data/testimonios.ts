export interface Testimonio {
  quote: string;
  name: string;
  role: string;
  initials: string;
}

export const testimonios: Testimonio[] = [
  {
    quote:
      "La atención fue excelente desde el primer contacto. Agendé mi cita en línea y me atendieron puntual, sin esperas.",
    name: "Renata M.",
    role: "Paciente de Medicina General",
    initials: "RM",
  },
  {
    quote: "El equipo de imagenología es de primer nivel. Tuve mis resultados en menos de 24 horas.",
    name: "Carlos V.",
    role: "Paciente de Imagenología",
    initials: "CV",
  },
  {
    quote: "Fui a urgencias un domingo y me atendieron de inmediato. Se nota que están preparados 24/7.",
    name: "Daniela R.",
    role: "Paciente de Urgencias",
    initials: "DR",
  },
  {
    quote: "Los doctores explican todo con calma y claridad. Me sentí escuchada en cada consulta.",
    name: "Sofía L.",
    role: "Paciente de Oftalmología",
    initials: "SL",
  },
  {
    quote: "Instalaciones limpias, modernas y personal muy amable. Totalmente recomendado.",
    name: "Jorge A.",
    role: "Paciente de Laboratorio",
    initials: "JA",
  },
];
