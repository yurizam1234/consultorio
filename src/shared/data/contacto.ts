export const contactoInfo = {
  nombreHospital: "Hospital Arboledas",
  direccion: "16 Poniente Norte #436, Col. Bonampak, Tuxtla Gutiérrez, CP 29030",
  telefonoUrgencias: "(961) 602-9586",
  telefonoUrgenciasHref: "+529616029586",
  whatsappHref: "https://wa.me/529616029586",
  telefonoConmutador: "(961) 404-7409",
  email: "sharboledas@gmail.com",
  cofepris: "COFEPRIS 253301201A0303",
  licenciaSanitaria: "Lic. San. 24AM071010011",
};

export const especialidades = [
  "Oftalmología",
  "Imagenología",
  "Laboratorio",
  "Medicina General",
  "Urgencias",
];

export const diasDisponibles = [
  { label: "Jue 17", dname: "Jue", dnum: "17" },
  { label: "Vie 18", dname: "Vie", dnum: "18" },
  { label: "Sáb 19", dname: "Sáb", dnum: "19" },
  { label: "Lun 21", dname: "Lun", dnum: "21" },
  { label: "Mar 22", dname: "Mar", dnum: "22" },
];

export const horariosDisponibles = ["09:00", "10:30", "12:00", "16:00", "17:30"];

export const heroStats = [
  { value: "5", label: "Quirófanos equipados" },
  { value: "30+", label: "Especialistas" },
  { value: "24/7", label: "Urgencias todo el año" },
  { value: "24h", label: "Entrega de resultados" },
];

export const trustPoints = [
  "Especialistas certificados en cada área médica",
  "Equipos de diagnóstico de última generación",
  "Acompañamiento cercano en cada etapa de tu atención",
];

export const reasonFeatures = [
  { label: "Especialistas certificados", icon: "shield-check" as const },
  { label: "Tecnología de punta", icon: "monitor" as const },
  { label: "Urgencias 24/7", icon: "clock" as const },
  { label: "Resultados en 24h", icon: "bolt" as const },
  { label: "Atención personalizada", icon: "heart" as const },
  { label: "Instalaciones modernas", icon: "building" as const },
];

export const agendaSteps = [
  {
    num: 1,
    title: "Elige especialidad",
    description:
      "Selecciona el área médica y, si lo sabes, el motivo de tu consulta. Te mostramos horarios reales del especialista.",
    icon: "calendar" as const,
  },
  {
    num: 2,
    title: "Elige fecha y hora",
    description: "Un calendario simple con disponibilidad real. Sin llamadas, sin esperar a que alguien te conteste.",
    icon: "calendar-hours" as const,
  },
  {
    num: 3,
    title: "Confirma y listo",
    description: "Recibe confirmación por WhatsApp o correo, con recordatorio automático 24 horas antes de tu cita.",
    icon: "check-circle" as const,
  },
];
