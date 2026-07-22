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

// Los textos (label/title/description) viven en shared/i18n/translations.ts
// bajo las claves nosotros.point{n}, reasons.feature{n}, agendar.step{n}.title/.desc —
// aquí solo queda lo estructural (valores numéricos, íconos, orden).
export const reasonFeatureIcons = [
  "shield-check" as const,
  "monitor" as const,
  "clock" as const,
  "bolt" as const,
  "heart" as const,
  "building" as const,
];

export const agendaSteps = [
  { num: 1, icon: "calendar" as const },
  { num: 2, icon: "calendar-hours" as const },
  { num: 3, icon: "check-circle" as const },
];
