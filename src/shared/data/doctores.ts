import type { Lang } from "@/shared/i18n/translations";

export interface Doctor {
  name?: string;
  specialty?: Record<Lang, string>;
  desc?: Record<Lang, string>;
  exp?: Record<Lang, string>;
  img: string;
  credentials?: Record<Lang, string[]>;
  // Cédula profesional (título) y cédula de especialidad, tal como aparecen
  // en el Registro Nacional de Profesionistas (SEP). Sin completar a propósito.
  cedulaProfesional?: string;
  cedulaEspecialidad?: string;
}

// 10 fotos reales del equipo médico (public/nuestro-equipo/medicos/). Nombre,
// especialidad, descripción, años de experiencia, credenciales y cédulas se
// dejan SIN completar a propósito — agrégalos aquí mismo, doctor por doctor,
// cuando tengas los datos reales (no se debe publicar información de un
// médico real, y menos su cédula, sin confirmarla primero).
export const doctores: Doctor[] = [
  { img: "/nuestro-equipo/medicos/drsolano.webp" },
  { img: "/nuestro-equipo/medicos/drwerner.webp" },
  { img: "/nuestro-equipo/medicos/drnelson.webp" },
  { img: "/nuestro-equipo/medicos/dradrianadelcarmen.webp" },
  { img: "/nuestro-equipo/medicos/draelviragabriela.webp" },
  { img: "/nuestro-equipo/medicos/dramaritza.webp" },
  { img: "/nuestro-equipo/medicos/drarturopaniagua.webp" },
  { img: "/nuestro-equipo/medicos/drdario.webp" },
  { img: "/nuestro-equipo/medicos/drluisernesto.webp" },
  { img: "/nuestro-equipo/medicos/drmanuel.webp" },
];
