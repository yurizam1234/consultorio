import type { Lang } from "@/shared/i18n/translations";

export interface GrupoProcedimientos {
  id: string;
  especialidad: Record<Lang, string>;
  procedimientos: Record<Lang, string>[];
}

// Catálogo de procedimientos/estudios agrupados por especialidad — fuente
// única para la página /procedimientos (buscador + filtro por especialidad).
// Contenido editable aquí mismo cuando se confirmen más procedimientos.
export const catalogoProcedimientos: GrupoProcedimientos[] = [
  {
    id: "cirugia-general",
    especialidad: { es: "Cirugía General", en: "General Surgery" },
    procedimientos: [
      { es: "Colecistectomía", en: "Cholecystectomy" },
      { es: "Apendicectomía", en: "Appendectomy" },
    ],
  },
  {
    id: "ginecologia-obstetricia",
    especialidad: { es: "Ginecología y Obstetricia", en: "Gynecology & Obstetrics" },
    procedimientos: [
      { es: "Parto", en: "Delivery" },
      { es: "Cesárea", en: "C-section" },
      { es: "Histerectomía", en: "Hysterectomy" },
    ],
  },
  {
    id: "quirofano",
    especialidad: { es: "Quirófano", en: "Operating Room" },
    procedimientos: [
      { es: "Renta de quirófano", en: "Operating room rental" },
      { es: "Servicio de esterilización", en: "Sterilization service" },
    ],
  },
  {
    id: "biopsias",
    especialidad: { es: "Biopsias", en: "Biopsies" },
    procedimientos: [
      {
        es: "Biopsia de próstata por fusión guiada por ultrasonido",
        en: "Fusion-guided prostate biopsy (MRI/ultrasound)",
      },
      { es: "Biopsia de mama", en: "Breast biopsy" },
      { es: "Biopsia de tiroides", en: "Thyroid biopsy" },
      { es: "Biopsia de hígado", en: "Liver biopsy" },
    ],
  },
  {
    id: "cardiologia",
    especialidad: { es: "Cardiología", en: "Cardiology" },
    procedimientos: [
      { es: "Prueba de esfuerzo", en: "Stress test" },
      { es: "Holter", en: "Holter monitor" },
      { es: "MAPA (monitoreo ambulatorio de presión arterial)", en: "Ambulatory blood pressure monitoring" },
      { es: "Electrocardiograma", en: "Electrocardiogram" },
    ],
  },
  {
    id: "gastroenterologia",
    especialidad: { es: "Gastroenterología", en: "Gastroenterology" },
    procedimientos: [
      { es: "Endoscopía diagnóstica y terapéutica", en: "Diagnostic and therapeutic endoscopy" },
      { es: "Colonoscopía", en: "Colonoscopy" },
      { es: "Enteroscopía", en: "Enteroscopy" },
      { es: "CPRE (colangiopancreatografía retrógrada endoscópica)", en: "ERCP" },
      { es: "Elastografía hepática", en: "Liver elastography" },
    ],
  },
  {
    id: "neumologia",
    especialidad: { es: "Neumología", en: "Pulmonology" },
    procedimientos: [
      { es: "Espirometría simple y con broncodilatador", en: "Simple and post-bronchodilator spirometry" },
      { es: "FeNO (óxido nítrico exhalado)", en: "FeNO (exhaled nitric oxide)" },
      { es: "Poligrafía de sueño", en: "Sleep polygraphy" },
      { es: "Dinamometría", en: "Dynamometry" },
      { es: "Higiene bronquial con chaleco percutor", en: "Bronchial hygiene with percussion vest" },
      { es: "Higiene bronquial con máquina de tos", en: "Bronchial hygiene with cough assist machine" },
    ],
  },
  {
    id: "resonancia",
    especialidad: { es: "Resonancia Magnética", en: "MRI" },
    procedimientos: [
      { es: "Resonancia bajo sedación", en: "MRI under sedation" },
      { es: "Cardiorresonancia", en: "Cardiac MRI" },
      { es: "Detección de placenta previa", en: "Placenta previa detection" },
      { es: "Difusión de cuerpo completo (pacientes oncológicos)", en: "Whole-body diffusion (oncology patients)" },
    ],
  },
  {
    id: "tomografia",
    especialidad: { es: "Tomografía", en: "CT Scan" },
    procedimientos: [
      { es: "Protocolo TAVI", en: "TAVI protocol" },
      { es: "Angiotac de coronarias", en: "Coronary CT angiography" },
    ],
  },
];
