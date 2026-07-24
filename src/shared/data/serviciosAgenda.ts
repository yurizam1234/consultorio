import type { Lang } from "@/shared/i18n/translations";

export interface ServicioAgenda {
  nombre: string;
  // Texto genérico y estándar de preparación previa — no es protocolo verificado
  // por el hospital, es una guía de referencia editable.
  recomendacion: Record<Lang, string>;
}

export const serviciosAgenda: ServicioAgenda[] = [
  {
    nombre: "Oftalmología",
    recomendacion: {
      es: "Trae tus lentes o lentillas actuales. Si te dilatarán la pupila, evita manejar tú mismo de regreso.",
      en: "Bring your current glasses or contacts. If your pupils will be dilated, avoid driving yourself back.",
    },
  },
  {
    nombre: "Imagenología",
    recomendacion: {
      es: "Llega 15 minutos antes. Para resonancia magnética, avisa si tienes implantes metálicos o marcapasos.",
      en: "Arrive 15 minutes early. For MRI, let us know if you have metal implants or a pacemaker.",
    },
  },
  {
    nombre: "Laboratorio clínico",
    recomendacion: {
      es: "Ayuno de 8 a 12 horas para estudios de sangre, salvo indicación distinta de tu médico.",
      en: "8 to 12 hour fast for blood tests, unless your doctor indicates otherwise.",
    },
  },
  {
    nombre: "Urgencias 24/7",
    recomendacion: {
      es: "Atención inmediata, sin necesidad de cita previa ni preparación especial.",
      en: "Immediate care, no appointment or special preparation needed.",
    },
  },
  {
    nombre: "Quirófanos",
    recomendacion: {
      es: "El ayuno y las indicaciones previas las define tu cirujano según el procedimiento.",
      en: "Fasting and pre-op instructions are set by your surgeon based on the procedure.",
    },
  },
  {
    nombre: "Cardiología",
    recomendacion: {
      es: "Lleva tus estudios previos (electrocardiogramas, análisis) si los tienes a la mano.",
      en: "Bring your previous studies (EKGs, tests) if you have them on hand.",
    },
  },
  {
    nombre: "Medicina del dolor",
    recomendacion: {
      es: "Lleva un resumen de los medicamentos que tomas actualmente.",
      en: "Bring a summary of the medications you currently take.",
    },
  },
  {
    nombre: "Medicina General",
    recomendacion: {
      es: "Sin preparación especial. Lleva tu identificación y, si tienes, tu historial médico previo.",
      en: "No special preparation needed. Bring your ID and, if available, your previous medical history.",
    },
  },
];

// Alias para conciliar el nombre de la especialidad del doctor con el nombre
// del servicio en esta lista (ej. el Dr. Bañuelos es "Radiología" pero el
// servicio equivalente aquí es "Imagenología").
const especialidadAServicio: Record<string, string> = {
  Radiología: "Imagenología",
};

export function nombreServicioDeEspecialidad(especialidad: string): string {
  return especialidadAServicio[especialidad] ?? especialidad;
}
