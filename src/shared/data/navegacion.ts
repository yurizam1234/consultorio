export interface NavLink {
  href: string;
  // clave de traducción en shared/i18n/translations.ts
  labelKey: "nav.inicio" | "nav.especialidades" | "nav.historia" | "nav.servicios" | "nav.agendar" | "nav.instalaciones" | "nav.equipo" | "nav.contacto";
}

// Los anclas llevan el "/" al frente (en vez de solo "#servicios") a propósito:
// así funcionan igual desde la landing como desde /historia (u otra página nueva
// que no tenga esas secciones) — el navegador resuelve "/#servicios" como "ir a
// la landing y bajar a esa sección", en vez de buscar el id en la página actual.
export const navLinks: NavLink[] = [
  { href: "/", labelKey: "nav.inicio" },
  { href: "/especialidades", labelKey: "nav.especialidades" },
  { href: "/historia", labelKey: "nav.historia" },
  { href: "/procedimientos", labelKey: "nav.servicios" },
  { href: "/agendar", labelKey: "nav.agendar" },
  { href: "/#instalaciones", labelKey: "nav.instalaciones" },
  { href: "/#equipo", labelKey: "nav.equipo" },
  { href: "/#contacto", labelKey: "nav.contacto" },
];
