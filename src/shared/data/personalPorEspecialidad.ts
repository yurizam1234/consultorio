import {
  personalHospital,
  type MiembroPersonal,
} from "@/shared/data/personalHospital";

/*
 * Aquí SOLAMENTE definimos qué personas pertenecen a cada especialidad.
 *
 * Todos los demás datos:
 * - nombre
 * - foto
 * - cargo/especialidad
 * - cédulas
 * - descripción
 *
 * siguen viniendo exclusivamente de personalHospital.ts.
 */
const PERSONAL_IDS_POR_ESPECIALIDAD: Record<string, string[]> = {
  // =========================================================
  // OFTALMOLOGÍA
  // =========================================================
  oftalmologia: [
    "dr-edgar-solano",
    "dr-carlos-dario-cabrera",
    "dr-manuel-alejandro-trinidad",
  ],

  // =========================================================
  // IMAGENOLOGÍA
  // =========================================================
  imagenologia: [
    "img-karla-martinez",
    "img-alexis-ventura",
    "img-carlos-maldonado",
    "img-fernando-gutierrez",
    "img-arlette-monzon",
    "img-karen-jimenez",
    "img-raquel-castillo",
  ],

  // =========================================================
  // LABORATORIO
  // No existe personal de laboratorio registrado actualmente
  // en personalHospital.ts.
  // =========================================================
  laboratorio: [],

  // =========================================================
  // CARDIOLOGÍA
  // =========================================================
  cardiologia: [
    "dr-werner-schlie",
  ],

  // =========================================================
  // GASTROENTEROLOGÍA
  // No existe gastroenterólogo registrado actualmente
  // en personalHospital.ts.
  // =========================================================
  gastro: [],

  // =========================================================
  // NEUMOLOGÍA
  // No existe neumólogo registrado actualmente
  // en personalHospital.ts.
  // =========================================================
  neumologia: [],

  // =========================================================
  // MEDICINA DEL DOLOR
  // =========================================================
  dolor: [
    "dr-nelson-urbina",
  ],

  // =========================================================
  // CIRUGÍA GENERAL
  // No existe cirujano general registrado actualmente
  // en personalHospital.ts.
  // =========================================================
  cirugia: [],

  // =========================================================
  // GINECOLOGÍA
  // No existe ginecólogo/a registrado actualmente
  // en personalHospital.ts.
  // =========================================================
  gineco: [],

  // =========================================================
  // MEDICINA GENERAL
  // =========================================================
  general: [
    "dra-maritza-gutierrez",
    "dra-elvira-gabrielle",
    "dra-adriana-del-carmen",
    "dr-luis-ernesto-vazquez",
  ],

  // =========================================================
  // QUIRÓFANO
  // =========================================================
  quirofano: [
    "qui-cecilia-perez",
    "qui-erick-sierra",
    "qui-francisco-caballero",
    "qui-karime-lopez",
    "qui-rebeca-altunar",
  ],
};

const PERSONAL_POR_ID = new Map<string, MiembroPersonal>(
  personalHospital.map((persona) => [persona.id, persona])
);

export function getPersonalPorEspecialidad(
  especialidadKey: string
): MiembroPersonal[] {
  const ids = PERSONAL_IDS_POR_ESPECIALIDAD[especialidadKey] ?? [];

  return ids
    .map((id) => PERSONAL_POR_ID.get(id))
    .filter((persona): persona is MiembroPersonal => Boolean(persona));
}
