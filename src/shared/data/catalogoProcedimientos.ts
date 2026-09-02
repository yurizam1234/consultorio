import type { Lang } from "@/shared/i18n/translations";

export interface Procedimiento extends Record<Lang, string> {
  // Estudios que, hasta donde sabemos, no se ofrecen en ningún otro lugar de
  // la región (ej. cardiorresonancia, fusión de próstata, protocolo TAVI) —
  // se resaltan con un badge en /procedimientos. Marcar sólo cuando el
  // cliente lo confirme como diferenciador real.
  exclusivo?: boolean;
  // Cada procedimiento tiene su propia foto (no una sola por especialidad).
  // El cliente todavía no manda fotos por procedimiento individual, así que
  // por ahora se reutiliza la foto real de la especialidad como placeholder
  // — cuando lleguen las fotos definitivas de cada estudio, sólo hay que
  // reemplazar esta ruta en cada entrada.
  img: string;
  // Nombre corto para el título de la card (ej. "Próstata" en vez de
  // "Biopsia de próstata por fusión guiada por ultrasonido", que sigue
  // viviendo en es/en para el buscador y el mensaje de WhatsApp).
  titulo: Record<Lang, string>;
  // Descripción breve (1 línea) de qué es el estudio — texto genérico,
  // informativo, no diagnóstico.
  desc: Record<Lang, string>;
}

export interface GrupoProcedimientos {
  id: string;
  especialidad: Record<Lang, string>;
  subtitulo: Record<Lang, string>;
  procedimientos: Procedimiento[];
}

// Catálogo de procedimientos/estudios agrupados por especialidad — fuente
// única para la página /procedimientos (buscador + filtro por especialidad).
// Contenido editable aquí mismo cuando se confirmen más procedimientos.
export const catalogoProcedimientos: GrupoProcedimientos[] = [
  {
    id: "cirugia-general",
    especialidad: { es: "Cirugía General", en: "General Surgery" },
    subtitulo: {
      es: "Procedimientos quirúrgicos realizados por especialistas certificados.",
      en: "Surgical procedures performed by certified specialists.",
    },
    procedimientos: [
      {
        es: "Colecistectomía",
        en: "Cholecystectomy",
        titulo: { es: "Colecistectomía", en: "Cholecystectomy" },
        desc: {
          es: "Extracción quirúrgica de la vesícula biliar, generalmente por laparoscopía.",
          en: "Surgical removal of the gallbladder, usually done laparoscopically.",
        },
        img: "/instalaciones/quirofanos/qx1.webp",
      },
      {
        es: "Apendicectomía",
        en: "Appendectomy",
        titulo: { es: "Apendicectomía", en: "Appendectomy" },
        desc: {
          es: "Extracción quirúrgica del apéndice inflamado para tratar la apendicitis.",
          en: "Surgical removal of the inflamed appendix to treat appendicitis.",
        },
        img: "/instalaciones/quirofanos/qx1.webp",
      },
    ],
  },
  {
    id: "ginecologia-obstetricia",
    especialidad: { es: "Ginecología y Obstetricia", en: "Gynecology & Obstetrics" },
    subtitulo: {
      es: "Atención integral del embarazo, el parto y la salud ginecológica.",
      en: "Comprehensive care for pregnancy, delivery, and gynecological health.",
    },
    procedimientos: [
      {
        es: "Parto",
        en: "Delivery",
        titulo: { es: "Parto", en: "Delivery" },
        desc: {
          es: "Atención del nacimiento con acompañamiento médico especializado.",
          en: "Delivery care with specialized medical support.",
        },
        img: "/instalaciones/habitaciones/hs2.jpg",
      },
      {
        es: "Cesárea",
        en: "C-section",
        titulo: { es: "Cesárea", en: "C-section" },
        desc: {
          es: "Procedimiento quirúrgico para el nacimiento cuando el parto vaginal no es recomendable.",
          en: "Surgical delivery procedure when a vaginal birth isn't advisable.",
        },
        img: "/instalaciones/habitaciones/hs2.jpg",
      },
      {
        es: "Histerectomía",
        en: "Hysterectomy",
        titulo: { es: "Histerectomía", en: "Hysterectomy" },
        desc: {
          es: "Extracción quirúrgica del útero para tratar diversas condiciones ginecológicas.",
          en: "Surgical removal of the uterus to treat various gynecological conditions.",
        },
        img: "/instalaciones/habitaciones/hs2.jpg",
      },
    ],
  },
  {
    id: "quirofano",
    especialidad: { es: "Quirófano", en: "Operating Room" },
    subtitulo: {
      es: "Infraestructura quirúrgica de alta especialidad, disponible para procedimientos externos.",
      en: "Highly specialized surgical facilities, available for outside procedures.",
    },
    procedimientos: [
      {
        es: "Renta de quirófano",
        en: "Operating room rental",
        titulo: { es: "Renta de quirófano", en: "OR rental" },
        desc: {
          es: "Sala equipada disponible para cirujanos externos que requieran realizar procedimientos.",
          en: "Fully equipped room available for outside surgeons who need to perform procedures.",
        },
        img: "/instalaciones/quirofanos/qx7.webp",
      },
      {
        es: "Servicio de esterilización",
        en: "Sterilization service",
        titulo: { es: "Esterilización", en: "Sterilization" },
        desc: {
          es: "Procesamiento y esterilización de instrumental quirúrgico con estándares hospitalarios.",
          en: "Processing and sterilization of surgical instruments to hospital standards.",
        },
        img: "/instalaciones/quirofanos/qx7.webp",
      },
    ],
  },
  {
    id: "biopsias",
    especialidad: { es: "Biopsias", en: "Biopsies" },
    subtitulo: {
      es: "Estudios especializados para diagnóstico preciso y toma de tejido guiado por imagen.",
      en: "Specialized studies for accurate diagnosis and image-guided tissue sampling.",
    },
    procedimientos: [
      {
        es: "Biopsia de próstata por fusión guiada por ultrasonido",
        en: "Fusion-guided prostate biopsy (MRI/ultrasound)",
        exclusivo: true,
        titulo: { es: "Próstata", en: "Prostate" },
        desc: {
          es: "Biopsia por fusión guiada por ultrasonido y resonancia magnética para mayor precisión.",
          en: "Fusion-guided biopsy combining ultrasound and MRI for greater precision.",
        },
        img: "/instalaciones/areas-diagnosticas/usg2.jpg",
      },
      {
        es: "Biopsia de mama",
        en: "Breast biopsy",
        titulo: { es: "Mama", en: "Breast" },
        desc: {
          es: "Procedimiento mínimamente invasivo para el diagnóstico preciso de lesiones mamarias.",
          en: "Minimally invasive procedure for the accurate diagnosis of breast lesions.",
        },
        img: "/instalaciones/areas-diagnosticas/usg2.jpg",
      },
      {
        es: "Biopsia de tiroides",
        en: "Thyroid biopsy",
        titulo: { es: "Tiroides", en: "Thyroid" },
        desc: {
          es: "Punción con aguja fina guiada por ultrasonido para evaluar nódulos tiroideos.",
          en: "Ultrasound-guided fine-needle aspiration to evaluate thyroid nodules.",
        },
        img: "/instalaciones/areas-diagnosticas/usg2.jpg",
      },
      {
        es: "Biopsia de hígado",
        en: "Liver biopsy",
        titulo: { es: "Hígado", en: "Liver" },
        desc: {
          es: "Estudio especializado para diagnóstico de enfermedades hepáticas y toma de tejido.",
          en: "Specialized study for diagnosing liver disease through tissue sampling.",
        },
        img: "/instalaciones/areas-diagnosticas/usg2.jpg",
      },
    ],
  },
  {
    id: "cardiologia",
    especialidad: { es: "Cardiología", en: "Cardiology" },
    subtitulo: {
      es: "Evaluación y monitoreo de la salud cardiovascular.",
      en: "Evaluation and monitoring of cardiovascular health.",
    },
    procedimientos: [
      {
        es: "Prueba de esfuerzo",
        en: "Stress test",
        titulo: { es: "Prueba de esfuerzo", en: "Stress test" },
        desc: {
          es: "Evaluación de la respuesta del corazón ante actividad física controlada.",
          en: "Assessment of the heart's response to controlled physical activity.",
        },
        img: "/instalaciones/consultorios/dr3.webp",
      },
      {
        es: "Holter",
        en: "Holter monitor",
        titulo: { es: "Holter", en: "Holter" },
        desc: {
          es: "Monitoreo continuo del ritmo cardíaco durante 24 horas o más.",
          en: "Continuous heart rhythm monitoring over 24 hours or longer.",
        },
        img: "/instalaciones/consultorios/dr3.webp",
      },
      {
        es: "MAPA (monitoreo ambulatorio de presión arterial)",
        en: "Ambulatory blood pressure monitoring",
        titulo: { es: "MAPA", en: "Ambulatory BP" },
        desc: {
          es: "Monitoreo ambulatorio de la presión arterial a lo largo del día.",
          en: "Ambulatory blood pressure monitoring throughout the day.",
        },
        img: "/instalaciones/consultorios/dr3.webp",
      },
      {
        es: "Electrocardiograma",
        en: "Electrocardiogram",
        titulo: { es: "Electrocardiograma", en: "Electrocardiogram" },
        desc: {
          es: "Registro de la actividad eléctrica del corazón en reposo.",
          en: "Recording of the heart's electrical activity at rest.",
        },
        img: "/instalaciones/consultorios/dr3.webp",
      },
    ],
  },
  {
    id: "gastroenterologia",
    especialidad: { es: "Gastroenterología", en: "Gastroenterology" },
    subtitulo: {
      es: "Diagnóstico y tratamiento de enfermedades del sistema digestivo.",
      en: "Diagnosis and treatment of digestive system conditions.",
    },
    procedimientos: [
      {
        es: "Endoscopía diagnóstica y terapéutica",
        en: "Diagnostic and therapeutic endoscopy",
        titulo: { es: "Endoscopía", en: "Endoscopy" },
        desc: {
          es: "Exploración del tracto digestivo superior con fines diagnósticos y terapéuticos.",
          en: "Exploration of the upper digestive tract for diagnostic and therapeutic purposes.",
        },
        img: "/instalaciones/quirofanos/qx2.jpg",
      },
      {
        es: "Colonoscopía",
        en: "Colonoscopy",
        titulo: { es: "Colonoscopía", en: "Colonoscopy" },
        desc: {
          es: "Exploración del colon para la detección de pólipos y otras alteraciones.",
          en: "Examination of the colon to detect polyps and other abnormalities.",
        },
        img: "/instalaciones/quirofanos/qx2.jpg",
      },
      {
        es: "Enteroscopía",
        en: "Enteroscopy",
        titulo: { es: "Enteroscopía", en: "Enteroscopy" },
        desc: {
          es: "Exploración especializada del intestino delgado.",
          en: "Specialized examination of the small intestine.",
        },
        img: "/instalaciones/quirofanos/qx2.jpg",
      },
      {
        es: "CPRE (colangiopancreatografía retrógrada endoscópica)",
        en: "ERCP",
        titulo: { es: "CPRE", en: "ERCP" },
        desc: {
          es: "Estudio endoscópico de las vías biliares y el páncreas.",
          en: "Endoscopic examination of the bile ducts and pancreas.",
        },
        img: "/instalaciones/quirofanos/qx2.jpg",
      },
      {
        es: "Elastografía hepática",
        en: "Liver elastography",
        titulo: { es: "Elastografía hepática", en: "Liver elastography" },
        desc: {
          es: "Medición no invasiva de la rigidez del hígado para evaluar fibrosis.",
          en: "Non-invasive measurement of liver stiffness to assess fibrosis.",
        },
        img: "/instalaciones/quirofanos/qx2.jpg",
      },
    ],
  },
  {
    id: "neumologia",
    especialidad: { es: "Neumología", en: "Pulmonology" },
    subtitulo: {
      es: "Estudios de función pulmonar para adultos y niños.",
      en: "Pulmonary function studies for adults and children.",
    },
    procedimientos: [
      {
        es: "Espirometría simple y con broncodilatador",
        en: "Simple and post-bronchodilator spirometry",
        titulo: { es: "Espirometría", en: "Spirometry" },
        desc: {
          es: "Medición de la capacidad y función pulmonar, con y sin broncodilatador.",
          en: "Measurement of lung capacity and function, with and without a bronchodilator.",
        },
        img: "/instalaciones/areas-diagnosticas/estudio.jpeg",
      },
      {
        es: "FeNO (óxido nítrico exhalado)",
        en: "FeNO (exhaled nitric oxide)",
        titulo: { es: "FeNO", en: "FeNO" },
        desc: {
          es: "Medición del óxido nítrico exhalado para evaluar inflamación de las vías respiratorias.",
          en: "Measurement of exhaled nitric oxide to assess airway inflammation.",
        },
        img: "/instalaciones/areas-diagnosticas/estudio.jpeg",
      },
      {
        es: "Poligrafía de sueño",
        en: "Sleep polygraphy",
        titulo: { es: "Poligrafía de sueño", en: "Sleep polygraphy" },
        desc: {
          es: "Estudio del sueño para detectar apnea y otros trastornos respiratorios nocturnos.",
          en: "Sleep study to detect apnea and other nighttime breathing disorders.",
        },
        img: "/instalaciones/areas-diagnosticas/estudio.jpeg",
      },
      {
        es: "Dinamometría",
        en: "Dynamometry",
        titulo: { es: "Dinamometría", en: "Dynamometry" },
        desc: {
          es: "Medición de la fuerza muscular respiratoria.",
          en: "Measurement of respiratory muscle strength.",
        },
        img: "/instalaciones/areas-diagnosticas/estudio.jpeg",
      },
      {
        es: "Higiene bronquial con chaleco percutor",
        en: "Bronchial hygiene with percussion vest",
        titulo: { es: "Chaleco percutor", en: "Percussion vest" },
        desc: {
          es: "Terapia de higiene bronquial mediante vibración para ayudar a despejar las vías respiratorias.",
          en: "Vibration-based bronchial hygiene therapy that helps clear the airways.",
        },
        img: "/instalaciones/areas-diagnosticas/estudio.jpeg",
      },
      {
        es: "Higiene bronquial con máquina de tos",
        en: "Bronchial hygiene with cough assist machine",
        titulo: { es: "Máquina de tos", en: "Cough assist" },
        desc: {
          es: "Asistencia mecánica para la expulsión de secreciones en pacientes con tos débil.",
          en: "Mechanical assistance to clear secretions in patients with weak cough.",
        },
        img: "/instalaciones/areas-diagnosticas/estudio.jpeg",
      },
    ],
  },
  {
    id: "resonancia",
    especialidad: { es: "Resonancia Magnética", en: "MRI" },
    subtitulo: {
      es: "Estudios de resonancia magnética con equipo de última generación.",
      en: "MRI studies with the latest-generation equipment.",
    },
    procedimientos: [
      {
        es: "Resonancia bajo sedación",
        en: "MRI under sedation",
        titulo: { es: "Bajo sedación", en: "Under sedation" },
        desc: {
          es: "Estudio de resonancia realizado con sedación para pacientes que lo requieran.",
          en: "MRI study performed under sedation for patients who need it.",
        },
        img: "/instalaciones/areas-diagnosticas/reso4.jpeg",
      },
      {
        es: "Cardiorresonancia",
        en: "Cardiac MRI",
        exclusivo: true,
        titulo: { es: "Cardiorresonancia", en: "Cardiac MRI" },
        desc: {
          es: "Evaluación detallada de la estructura y función del corazón por resonancia magnética.",
          en: "Detailed evaluation of the heart's structure and function via MRI.",
        },
        img: "/instalaciones/areas-diagnosticas/reso4.jpeg",
      },
      {
        es: "Detección de placenta previa",
        en: "Placenta previa detection",
        titulo: { es: "Placenta previa", en: "Placenta previa" },
        desc: {
          es: "Detección de placenta previa mediante resonancia magnética.",
          en: "Detection of placenta previa using MRI.",
        },
        img: "/instalaciones/areas-diagnosticas/reso4.jpeg",
      },
      {
        es: "Difusión de cuerpo completo (pacientes oncológicos)",
        en: "Whole-body diffusion (oncology patients)",
        titulo: { es: "Cuerpo completo", en: "Whole body" },
        desc: {
          es: "Estudio de difusión de cuerpo completo para seguimiento de pacientes oncológicos.",
          en: "Whole-body diffusion study for monitoring oncology patients.",
        },
        img: "/instalaciones/areas-diagnosticas/reso4.jpeg",
      },
    ],
  },
  {
    id: "tomografia",
    especialidad: { es: "Tomografía", en: "CT Scan" },
    subtitulo: {
      es: "Estudios de tomografía computarizada de alta resolución.",
      en: "High-resolution CT scan studies.",
    },
    procedimientos: [
      {
        es: "Protocolo TAVI",
        en: "TAVI protocol",
        exclusivo: true,
        titulo: { es: "Protocolo TAVI", en: "TAVI protocol" },
        desc: {
          es: "Evaluación tomográfica previa al implante valvular aórtico transcatéter.",
          en: "CT evaluation prior to transcatheter aortic valve implantation.",
        },
        img: "/instalaciones/areas-diagnosticas/tac2.jpeg",
      },
      {
        es: "Angiotac de coronarias",
        en: "Coronary CT angiography",
        titulo: { es: "Angiotac de coronarias", en: "Coronary CT angio" },
        desc: {
          es: "Estudio no invasivo de las arterias coronarias por tomografía.",
          en: "Non-invasive study of the coronary arteries using CT.",
        },
        img: "/instalaciones/areas-diagnosticas/tac2.jpeg",
      },
    ],
  },
];
