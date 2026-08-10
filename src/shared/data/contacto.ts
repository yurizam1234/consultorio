const cofeprisNumero = "253301201A0303";
const licenciaSanitariaNumero = "24AM071010011";

export const contactoInfo = {
  nombreHospital: "Hospital Arboledas",
  direccion: "16 Poniente Norte #436, Col. Bonampak, Tuxtla Gutiérrez, CP 29030",
  // Referencia visual para quien va en coche/a pie, en el idioma que corresponda.
  // Edita este texto si el punto de referencia real es otro.
  referencia: { es: "Junto a Óptica Arboledas, a una cuadra del Boulevard Belisario Domínguez", en: "Next to Óptica Arboledas, one block from Belisario Domínguez Boulevard" },
  telefonoUrgencias: "(961) 602-9586",
  telefonoUrgenciasHref: "+529616029586",
  whatsappHref: "https://wa.me/529616029586",
  telefonoConmutador: "(961) 404-7409",
  email: "sharboledas@gmail.com",
  // Forma corta, usada en el badge chico del footer (".foot-badges").
  cofepris: `COFEPRIS ${cofeprisNumero}`,
  licenciaSanitaria: `Lic. San. ${licenciaSanitariaNumero}`,
  // Forma completa, sin abreviar, usada en <ComplianceBadge /> del hero.
  cofeprisCompleto: `COFEPRIS: ${cofeprisNumero}`,
  licenciaSanitariaCompleta: `Licencia Sanitaria: ${licenciaSanitariaNumero}`,
};

// URL del <iframe> de Google Maps (Maps Embed sin API key, vía "output=embed") y del
// deep link "Cómo llegar" (Directions API por URL: funciona igual en el navegador de
// escritorio, en Android y en iOS — Safari lo resuelve a través de Google Maps o del
// mapa web si la app no está instalada, sin necesitar un botón aparte para Apple Maps).
const direccionQuery = encodeURIComponent(`${contactoInfo.nombreHospital}, ${contactoInfo.direccion}`);
export const mapsEmbedSrc = `https://www.google.com/maps?q=${direccionQuery}&output=embed`;
export const mapsDirectionsHref = `https://www.google.com/maps/dir/?api=1&destination=${direccionQuery}`;

// Compartido por cualquier flujo que abra WhatsApp con un mensaje ya escrito
// (ver useCitaBooking.ts y /procedimientos) — una sola forma de armar la URL.
export function buildWhatsAppUrl(mensaje: string) {
  return `${contactoInfo.whatsappHref}?text=${encodeURIComponent(mensaje)}`;
}

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
