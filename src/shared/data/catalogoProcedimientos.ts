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
  // Sólo para especialidades sin procedimientos confirmados todavía (ver las
  // entradas con "procedimientos: []" más abajo): foto de la especialidad
  // que se usa en su card dentro de la sección "Especialidades" de
  // /procedimientos (ver page.tsx) mientras no hay procedimientos propios
  // que mostrar. Se edita acá mismo cuando llegue la foto definitiva.
  img?: string;
}

// Catálogo de procedimientos/estudios agrupados por especialidad — fuente
// única para la página /procedimientos (buscador + filtro por especialidad).
// Contenido editable aquí mismo cuando se confirmen más procedimientos.
export const catalogoProcedimientos: GrupoProcedimientos[] = [
  {
    id: "diagnostico-por-imagen",
    especialidad: { es: "Diagnóstico por imagen", en: "Imaging Diagnostics" },
    subtitulo: {
      es: "Estudios de imagen para un diagnóstico preciso, con equipo de última generación.",
      en: "Imaging studies for an accurate diagnosis, using the latest-generation equipment.",
    },
    procedimientos: [
      {
        es: "Resonancia magnética simple",
        en: "MRI (simple)",
        titulo: { es: "RM simple", en: "MRI – simple" },
        desc: {
          es: "Estudio de resonancia magnética sin contraste para evaluar tejidos blandos y estructuras internas.",
          en: "MRI study without contrast to evaluate soft tissue and internal structures.",
        },
        img: "/instalaciones/areas-diagnosticas/reso3.webp",
      },
      {
        es: "Resonancia magnética contrastada",
        en: "MRI (contrast)",
        titulo: { es: "RM contrastada", en: "MRI – contrast" },
        desc: {
          es: "Resonancia magnética con medio de contraste para mayor detalle diagnóstico.",
          en: "MRI performed with contrast medium for greater diagnostic detail.",
        },
        img: "/instalaciones/areas-diagnosticas/reso4.webp",
      },
      {
        es: "Tomografía simple",
        en: "CT scan (simple)",
        titulo: { es: "TAC simple", en: "CT – simple" },
        desc: {
          es: "Tomografía computarizada sin contraste para una evaluación rápida y detallada.",
          en: "CT scan without contrast for a fast, detailed evaluation.",
        },
        img: "/instalaciones/areas-diagnosticas/tac2.webp",
      },
      {
        es: "Tomografía contrastada",
        en: "CT scan (contrast)",
        titulo: { es: "TAC contrastada", en: "CT – contrast" },
        desc: {
          es: "Tomografía computarizada con medio de contraste para mayor precisión diagnóstica.",
          en: "CT scan with contrast medium for greater diagnostic precision.",
        },
        img: "/instalaciones/areas-diagnosticas/tomografia.webp",
      },
      {
        es: "Ultrasonido",
        en: "Ultrasound",
        titulo: { es: "Ultrasonido", en: "Ultrasound" },
        desc: {
          es: "Estudio de imagen por ultrasonido para la evaluación de órganos y tejidos blandos.",
          en: "Ultrasound imaging study to evaluate organs and soft tissue.",
        },
        img: "/instalaciones/areas-diagnosticas/usg.webp",
      },
      {
        es: "Mastografía",
        en: "Mammography",
        titulo: { es: "Mastografía", en: "Mammography" },
        desc: {
          es: "Estudio de imagen para la detección temprana de alteraciones en el tejido mamario.",
          en: "Imaging study for the early detection of abnormalities in breast tissue.",
        },
        img: "/instalaciones/areas-diagnosticas/matografia.webp",
      },
    ],
  },
  {
    id: "estudios-diagnosticos",
    especialidad: { es: "Estudios diagnósticos", en: "Diagnostic Studies" },
    subtitulo: {
      es: "Pruebas complementarias para apoyar el diagnóstico médico.",
      en: "Complementary tests to support medical diagnosis.",
    },
    procedimientos: [
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
      {
        es: "Electroencefalograma",
        en: "Electroencephalogram",
        titulo: { es: "Electroencefalograma", en: "EEG" },
        desc: {
          es: "Registro de la actividad eléctrica cerebral para evaluar el funcionamiento neurológico.",
          en: "Recording of brain electrical activity to assess neurological function.",
        },
        img: "/instalaciones/areas-diagnosticas/arcoencotro.webp",
      },
      {
        es: "Estudios de Laboratorio",
        en: "Lab Tests",
        titulo: { es: "Laboratorio", en: "Lab tests" },
        desc: {
          es: "Análisis clínicos de sangre, orina y otras muestras para apoyar el diagnóstico.",
          en: "Clinical analysis of blood, urine, and other samples to support diagnosis.",
        },
        img: "/instalaciones/areas-diagnosticas/laboratorio.webp",
      },
      {
        // Confirmado por el cliente: sí se hace la biopsia "cognitiva"
        // (convencional, ver entrada de abajo) también, pero la de fusión es
        // el diferenciador real que quiere destacado — de ahí el "exclusivo".
        exclusivo: true,
        es: "Biopsia de Próstata por Fusión guiada por Ultrasonido",
        en: "Ultrasound-Guided Prostate Fusion Biopsy",
        titulo: { es: "Biopsia de próstata por Fusión", en: "Prostate biopsy (fusion)" },
        desc: {
          es: "Combina imágenes de resonancia magnética con ultrasonido en tiempo real para dirigir la toma de tejido con mayor precisión.",
          en: "Combines MRI and real-time ultrasound imaging to guide tissue sampling with greater precision.",
        },
        img: "/instalaciones/areas-diagnosticas/usg2.webp",
      },
      {
        es: "Biopsia de próstata cognitiva",
        en: "Cognitive Prostate Biopsy",
        titulo: { es: "Biopsia de próstata Cognitiva", en: "Prostate biopsy (cognitive)" },
        desc: {
          es: "Toma de tejido prostático guiada por ultrasonido — la técnica convencional para el diagnóstico.",
          en: "Prostate tissue sampling guided by ultrasound — the conventional diagnostic technique.",
        },
        img: "/instalaciones/areas-diagnosticas/usg23.webp",
      },
    ],
  },
  {
    id: "atencion-medica",
    especialidad: { es: "Atención médica", en: "Medical Care" },
    subtitulo: {
      es: "Consultas y valoraciones médicas para el cuidado integral de la salud.",
      en: "Medical consultations and assessments for comprehensive health care.",
    },
    procedimientos: [
      {
        es: "Consulta General",
        en: "General Consultation",
        titulo: { es: "Consulta General", en: "General consultation" },
        desc: {
          es: "Valoración médica general para atender cualquier padecimiento o duda de salud.",
          en: "General medical assessment to address any condition or health concern.",
        },
        img: "/instalaciones/consultorios/con1.webp",
      },
      {
        es: "Atención Médica",
        en: "Medical Care",
        titulo: { es: "Atención Médica", en: "Medical care" },
        desc: {
          es: "Atención médica personalizada a cargo de nuestro equipo de especialistas.",
          en: "Personalized medical care provided by our team of specialists.",
        },
        img: "/instalaciones/consultorios/con3.webp",
      },
      {
        es: "Check Up",
        en: "Check-up",
        titulo: { es: "Check Up", en: "Check-up" },
        desc: {
          es: "Revisión médica preventiva integral para detectar oportunamente cualquier alteración.",
          en: "Comprehensive preventive medical exam to catch any issue early.",
        },
        img: "/instalaciones/consultorios/con5.webp",
      },
    ],
  },
  {
    id: "servicios-hospitalarios",
    especialidad: { es: "Servicios hospitalarios", en: "Hospital Services" },
    subtitulo: {
      es: "Instalaciones hospitalarias para la internación y recuperación de pacientes.",
      en: "Hospital facilities for patient admission and recovery.",
    },
    procedimientos: [
      {
        es: "Hospitalización",
        en: "Hospitalization",
        titulo: { es: "Hospitalización", en: "Hospitalization" },
        desc: {
          es: "Internación hospitalaria con atención médica y de enfermería las 24 horas.",
          en: "Hospital admission with round-the-clock medical and nursing care.",
        },
        img: "/instalaciones/habitaciones/hs2.webp",
      },
      {
        es: "Estancia Ambulatoria",
        en: "Outpatient Stay",
        titulo: { es: "Estancia Ambulatoria", en: "Outpatient stay" },
        desc: {
          es: "Área de recuperación de corta estancia para procedimientos ambulatorios.",
          en: "Short-stay recovery area for outpatient procedures.",
        },
        img: "/instalaciones/habitaciones/hs5.webp",
      },
    ],
  },
  {
    id: "oftalmologia",
    especialidad: { es: "Oftalmología", en: "Ophthalmology" },
    subtitulo: {
      es: "Consultas y procedimientos quirúrgicos para el cuidado de la salud visual.",
      en: "Consultations and surgical procedures for eye health care.",
    },
    procedimientos: [
      {
        es: "Consultas de Oftalmología",
        en: "Ophthalmology Consultations",
        titulo: { es: "Consulta de Oftalmología", en: "Ophthalmology consultation" },
        desc: {
          es: "Valoración oftalmológica para el diagnóstico y seguimiento de la salud visual.",
          en: "Ophthalmology assessment for diagnosing and monitoring eye health.",
        },
        img: "/instalaciones/consultorios/con4.webp",
      },
      {
        es: "Procedimientos quirúrgicos de Oftalmología",
        en: "Ophthalmology Surgical Procedures",
        titulo: { es: "Cirugía Oftalmológica", en: "Eye surgery" },
        desc: {
          es: "Procedimientos quirúrgicos especializados para el tratamiento de padecimientos oculares.",
          en: "Specialized surgical procedures to treat eye conditions.",
        },
        img: "/instalaciones/quirofanos/qx3.webp",
      },
    ],
  },
  {
    id: "servicios-quirurgicos",
    especialidad: { es: "Servicios quirúrgicos", en: "Surgical Services" },
    subtitulo: {
      es: "Paquetes quirúrgicos con todo lo necesario para tu procedimiento.",
      en: "Surgical packages with everything you need for your procedure.",
    },
    procedimientos: [
      {
        es: "Paquetes Quirúrgicos",
        en: "Surgical Packages",
        titulo: { es: "Paquetes Quirúrgicos", en: "Surgical packages" },
        desc: {
          es: "Paquetes que integran quirófano, hospitalización y honorarios para tu procedimiento.",
          en: "Packages that bundle the operating room, hospital stay, and fees for your procedure.",
        },
        img: "/instalaciones/quirofanos/qx1.webp",
      },
    ],
  },
  // Especialidades pendientes de confirmación de procedimientos (ver PDF de
  // servicios) — se muestran como especialidad pero sin cards de
  // procedimiento hasta que el cliente confirme cuáles publicar.
  {
    id: "cardiologia",
    especialidad: { es: "Cardiología", en: "Cardiology" },
    subtitulo: {
      es: "Diagnóstico y tratamiento de enfermedades del corazón y el sistema circulatorio.",
      en: "Diagnosis and treatment of heart and circulatory system conditions.",
    },
    procedimientos: [],
    // Foto real del Dr. Werner Schlie Villa, cardiólogo del hospital (ver
    // doctores.ts) — mejor que reutilizar una foto genérica de instalaciones.
    img: "/instalaciones/areas-diagnosticas/cardiologia.webp",
  },
  {
    id: "medicina-del-dolor",
    especialidad: { es: "Medicina del Dolor", en: "Pain Medicine" },
    subtitulo: {
      es: "Manejo especializado del dolor agudo y crónico.",
      en: "Specialized management of acute and chronic pain.",
    },
    procedimientos: [],
    // Foto real del Dr. Nelson Jovanny Urbina López, especialista en
    // medicina del dolor (ver doctores.ts).
    img: "/instalaciones/areas-diagnosticas/medicinadeldolor.webp",
  },
  {
    id: "gastroenterologia",
    especialidad: { es: "Gastroenterología", en: "Gastroenterology" },
    subtitulo: {
      es: "Diagnóstico y tratamiento de enfermedades del sistema digestivo.",
      en: "Diagnosis and treatment of digestive system conditions.",
    },
    procedimientos: [],
    // Endoscopía real (equipo con monitor mostrando el estudio en vivo).
    img: "/instalaciones/quirofanos/qx2.webp",
  },
  {
    id: "endocrinologia",
    especialidad: { es: "Endocrinología", en: "Endocrinology" },
    subtitulo: {
      es: "Diagnóstico y tratamiento de trastornos hormonales y metabólicos.",
      en: "Diagnosis and treatment of hormonal and metabolic disorders.",
    },
    procedimientos: [],
    img: "/instalaciones/consultorios/consultorio.webp",
  },
  {
    id: "ginecoobstetricia",
    especialidad: { es: "Ginecoobstetricia", en: "Obstetrics & Gynecology" },
    subtitulo: {
      es: "Atención integral de la salud ginecológica y el embarazo.",
      en: "Comprehensive care for gynecological health and pregnancy.",
    },
    procedimientos: [],
    img: "/instalaciones/areas-diagnosticas/ginecologia.webp",
  },
  {
    id: "implantologia-oral",
    especialidad: { es: "Implantología Oral", en: "Oral Implantology" },
    subtitulo: {
      es: "Colocación de implantes dentales para restaurar piezas perdidas.",
      en: "Placement of dental implants to restore missing teeth.",
    },
    procedimientos: [],
    img: "/instalaciones/habitaciones/hs1.webp",
  },
  {
    id: "medicina-interna",
    especialidad: { es: "Medicina Interna", en: "Internal Medicine" },
    subtitulo: {
      es: "Diagnóstico y tratamiento integral de enfermedades en el adulto.",
      en: "Comprehensive diagnosis and treatment of adult diseases.",
    },
    procedimientos: [],
    // Foto real de la Dra. Julieta, medicina interna (ver doctores.ts).
    img: "/instalaciones/areas-diagnosticas/medicinaimagen.webp",
  },
  {
    id: "nefrologia",
    especialidad: { es: "Nefrología", en: "Nephrology" },
    subtitulo: {
      es: "Diagnóstico y tratamiento de enfermedades renales.",
      en: "Diagnosis and treatment of kidney disease.",
    },
    procedimientos: [],
    // Foto real del Dr. Martin Chang, nefrólogo (ver doctores.ts).
    img: "/instalaciones/areas-diagnosticas/netrologia.webp",
  },
  {
    id: "ortodoncia",
    especialidad: { es: "Ortodoncia", en: "Orthodontics" },
    subtitulo: {
      es: "Corrección de la posición dental y alineación de la mordida.",
      en: "Correction of tooth position and bite alignment.",
    },
    procedimientos: [],
    img: "/instalaciones/areas-diagnosticas/dentista.webp",
  },
  {
    id: "pediatria",
    especialidad: { es: "Pediatría", en: "Pediatrics" },
    subtitulo: {
      es: "Atención médica integral para bebés, niños y adolescentes.",
      en: "Comprehensive medical care for infants, children, and adolescents.",
    },
    procedimientos: [],
    img: "/instalaciones/areas-diagnosticas/urgencia.webp",
  },
  {
    id: "psicologia",
    especialidad: { es: "Psicología", en: "Psychology" },
    subtitulo: {
      es: "Evaluación y acompañamiento psicológico para la salud emocional.",
      en: "Psychological assessment and support for emotional well-being.",
    },
    procedimientos: [],
    img: "/instalaciones/consultorios/dr5.webp",
  },
  {
    id: "urologia",
    especialidad: { es: "Urología", en: "Urology" },
    subtitulo: {
      es: "Diagnóstico y tratamiento de enfermedades del sistema urinario y reproductor masculino.",
      en: "Diagnosis and treatment of urinary tract and male reproductive conditions.",
    },
    procedimientos: [],
    img: "/instalaciones/quirofanos/qx7.webp",
  },
  {
    id: "cirujano-dentista",
    especialidad: { es: "Cirujano Dentista", en: "Dentistry" },
    subtitulo: {
      es: "Atención dental integral para el cuidado de tu salud bucal.",
      en: "Comprehensive dental care for your oral health.",
    },
    procedimientos: [],
    img: "/instalaciones/areas-diagnosticas/ortodoncia.webp",
  },
  {
    id: "cirugia-general",
    especialidad: { es: "Cirugía General", en: "General Surgery" },
    subtitulo: {
      es: "Valoración y procedimientos quirúrgicos para el tratamiento de diversos padecimientos.",
      en: "Assessment and surgical procedures to treat a wide range of conditions.",
    },
    procedimientos: [],
    // El directorio del lobby muestra "Cirugía General" en el listado.
    img: "/instalaciones/consultorios/con1.webp",
  },
  {
    id: "cirugia-vascular",
    especialidad: { es: "Cirugía Vascular (Angiología)", en: "Vascular Surgery (Angiology)" },
    subtitulo: {
      es: "Diagnóstico y tratamiento de enfermedades de venas y arterias.",
      en: "Diagnosis and treatment of vein and artery conditions.",
    },
    procedimientos: [],
    img: "/instalaciones/habitaciones/enf3.webp",
  },
  {
    id: "dietetica-nutricion",
    especialidad: { es: "Dietética y Nutrición", en: "Dietetics & Nutrition" },
    subtitulo: {
      es: "Planes de alimentación personalizados para el cuidado de tu salud.",
      en: "Personalized nutrition plans to support your health.",
    },
    procedimientos: [],
    img: "/instalaciones/consultorios/dr3.webp",
  },
  {
    id: "ecocardiografia",
    especialidad: { es: "Ecocardiografía", en: "Echocardiography" },
    subtitulo: {
      es: "Estudio de imagen para evaluar la estructura y función del corazón.",
      en: "Imaging study to assess the heart's structure and function.",
    },
    procedimientos: [],
    // Equipo de ultrasonido real — encaja bien con un eco cardíaco.
    img: "/instalaciones/areas-diagnosticas/usg.webp",
  },
];
