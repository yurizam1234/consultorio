export interface NavLink {
  href: string;
  // clave de traducción en shared/i18n/translations.ts
  labelKey: "nav.servicios" | "nav.agendar" | "nav.instalaciones" | "nav.equipo" | "nav.contacto";
}

export const navLinks: NavLink[] = [
  { href: "#servicios", labelKey: "nav.servicios" },
  { href: "#agendar-info", labelKey: "nav.agendar" },
  { href: "#instalaciones", labelKey: "nav.instalaciones" },
  { href: "#equipo", labelKey: "nav.equipo" },
  { href: "#contacto", labelKey: "nav.contacto" },
];
