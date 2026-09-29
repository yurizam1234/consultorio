export interface EstudioPaquete {
  n: string;
  prep: string;
  tag?: string;
}

export interface MedicoPaquete {
  n: string;
  e: string;
  c: string;
}

export interface PaquetePreventivo {
  n: string;
  tag: string;
  d: string;
  img: string;
  duracion: string;
  indicaciones: string;
  procs: EstudioPaquete[];
  med: MedicoPaquete[];
}

export const PAQUETES_PREVENTIVOS: Record<string, PaquetePreventivo> = {
  basico: {
    n: "Check-up Preventivo Básico",
    tag: "Prevención General",
    d: "Evaluación fundamental para conocer tu estado general de salud, detectar anomalías tempranas y valorar el funcionamiento metabólico y renal en una sola sesión.",
    img: "/instalaciones/consultorios/con2.webp",
    duracion: "1 a 1.5 horas",
    indicaciones: "Ayuno estricto de 8 a 10 horas. Traer primera muestra de orina de la mañana en frasco estéril.",
    procs: [
      {
        n: "Biometría Hemática Completa",
        prep: "Detecta anemias, infecciones y estado inmunológico.",
        tag: "Laboratorio",
      },
      {
        n: "Química Sanguínea (6 elementos)",
        prep: "Glucosa, urea, creatinina, ácido úrico, colesterol y triglicéridos.",
        tag: "Laboratorio",
      },
      {
        n: "Examen General de Orina (EGO)",
        prep: "Evalúa función renal y descarta infecciones asintomáticas.",
        tag: "Laboratorio",
      },
      {
        n: "Toma de Signos Vitales y Somatometría",
        prep: "Presión arterial, frecuencia cardíaca, peso, talla e IMC.",
        tag: "Enfermería",
      },
      {
        n: "Consulta Médica de Valoración y Entrega",
        prep: "Interpretación clínica detallada y recomendaciones personalizadas.",
        tag: "Consulta",
      },
    ],
    med: [
      {
        n: "[Nombre del especialista]",
        e: "Medicina General y Preventiva",
        c: "Cédula profesional 0000000 · Certificación Médica Vigente",
      },
    ],
  },
  femenino: {
    n: "Perfil Femenino & Ginecológico",
    tag: "Salud de la Mujer",
    d: "Revisión preventiva integral orientada al cuidado de la salud femenina, detección oportuna de patología mamaria, cervical y balance hormonal.",
    img: "/instalaciones/consultorios/con3.webp",
    duracion: "1.5 a 2 horas",
    indicaciones: "Acudir sin periodo menstrual, 48 hrs sin relaciones sexuales previas ni medicamentos vaginales. Si incluye mastografía o ultrasonido mamario, no usar desodorante ni talco.",
    procs: [
      {
        n: "Papanicolaou en Base Líquida",
        prep: "Detección citológica de lesiones cervicales y prevención de VPH.",
        tag: "Ginecología",
      },
      {
        n: "Colposcopía Digital",
        prep: "Inspección microscópica avanzada del cuello uterino.",
        tag: "Ginecología",
      },
      {
        n: "Ultrasonido Pélvico o Transvaginal",
        prep: "Evaluación estructural de útero y ovarios.",
        tag: "Imagenología",
      },
      {
        n: "Ultrasonido Mamario de Alta Resolución",
        prep: "Exploración de tejido mamario y ganglios axilares.",
        tag: "Imagenología",
      },
      {
        n: "Consulta y Exploración Ginecológica Integral",
        prep: "Valoración médica con especialista certificado.",
        tag: "Consulta",
      },
    ],
    med: [
      {
        n: "[Nombre del especialista]",
        e: "Ginecología y Obstetricia",
        c: "Cédula profesional 0000000 · Cédula de especialidad 0000000",
      },
    ],
  },
  masculino: {
    n: "Perfil Hombre 40+",
    tag: "Salud Masculina",
    d: "Check-up preventivo diseñado para el monitoreo prostático, cardiovascular, metabólico y hepático enfocado en las necesidades del hombre adulto.",
    img: "/instalaciones/areas-diagnosticas/estudio.webp",
    duracion: "1.5 horas",
    indicaciones: "Ayuno de 8 a 10 horas. 48 horas de abstinencia sexual antes de la toma de muestra para antígeno prostático.",
    procs: [
      {
        n: "Antígeno Prostático Específico (PSA Total y Libre)",
        prep: "Detección oportuna y tamizaje de salud prostática.",
        tag: "Laboratorio",
      },
      {
        n: "Química Sanguínea Completa y Perfil de Lípidos",
        prep: "Monitoreo de glucosa, colesterol HDL/LDL y triglicéridos.",
        tag: "Laboratorio",
      },
      {
        n: "Ultrasonido Vesical y Prostático",
        prep: "Medición volumétrica y valoración de orina residual.",
        tag: "Imagenología",
      },
      {
        n: "Electrocardiograma en Reposo (12 Derivaciones)",
        prep: "Registro de actividad eléctrica cardíaca.",
        tag: "Cardiología",
      },
      {
        n: "Consulta Médica Integral y Dictamen Clínico",
        prep: "Revisión de estudios y plan de mantenimiento preventivo.",
        tag: "Consulta",
      },
    ],
    med: [
      {
        n: "[Nombre del especialista]",
        e: "Medicina Interna y Diagnóstico",
        c: "Cédula profesional 0000000 · Cédula de especialidad 0000000",
      },
    ],
  },
  cardiovascular: {
    n: "Check-up Cardiovascular & Metabólico",
    tag: "Salud Cardíaca",
    d: "Evaluación exhaustiva de riesgo cardiovascular, función arterial, detección de hipertensión, dislipidemias y salud del corazón.",
    img: "/instalaciones/areas-diagnosticas/tac2.webp",
    duracion: "2 horas",
    indicaciones: "Ayuno de 10 a 12 horas. Ropa cómoda de dos piezas. No suspender medicamentos habituales salvo indicación médica expresa.",
    procs: [
      {
        n: "Electrocardiograma de 12 Derivaciones con Interpretación",
        prep: "Trazo electrofisiológico analizado por especialista.",
        tag: "Cardiología",
      },
      {
        n: "Perfil de Lípidos Completo y Hemoglobina Glucosilada (HbA1c)",
        prep: "Control metabólico y riesgo aterogénico.",
        tag: "Laboratorio",
      },
      {
        n: "Ecocardiograma Transtorácico / Doppler",
        prep: "Visualización en tiempo real de cavidades y válvulas cardíacas.",
        tag: "Estudio",
      },
      {
        n: "Tele de Tórax (Radiografía Digital)",
        prep: "Silueta cardíaca e índice cardiotorácico.",
        tag: "Imagenología",
      },
      {
        n: "Valoración de Riesgo Cardiovascular Global",
        prep: "Consulta clínica con estratificación Framingham / SCORE.",
        tag: "Consulta",
      },
    ],
    med: [
      {
        n: "[Nombre del especialista]",
        e: "Medicina Interna / Cardiología",
        c: "Cédula profesional 0000000 · Cédula de especialidad 0000000",
      },
    ],
  },
  visual: {
    n: "Check-up Salud Visual Avanzada",
    tag: "Oftalmología Integral",
    d: "Diagnóstico oftalmológico de alta precisión para detectar cataratas, glaucoma, alteraciones en retina y graduación refractiva exacta.",
    img: "/servicios/oftalmologia.webp",
    duracion: "1 hora",
    indicaciones: "Traer lentes de uso actual. Si se requiere dilatación pupilar para fondo de ojo, venir acompañado (no conducir durante 3-4 horas).",
    procs: [
      {
        n: "Refracción Computarizada y Agudeza Visual",
        prep: "Determinación de graduación óptica para visión lejana y cercana.",
        tag: "Oftalmología",
      },
      {
        n: "Tonometría de Aplanación (Presión Intraocular)",
        prep: "Detección y control temprano de glaucoma.",
        tag: "Diagnóstico",
      },
      {
        n: "Biomicroscopía con Lámpara de Hendidura",
        prep: "Examen de córnea, cristalino, conjuntiva y cámara anterior.",
        tag: "Exploración",
      },
      {
        n: "Fondo de Ojo y Valoración de Retina / Nervio Óptico",
        prep: "Inspección detallada de mácula y vasculatura retiniana.",
        tag: "Especialidad",
      },
      {
        n: "Dictamen Oftalmológico y Prescripción Médica",
        prep: "Receta óptica y recomendaciones de salud visual.",
        tag: "Consulta",
      },
    ],
    med: [
      {
        n: "[Nombre del especialista]",
        e: "Oftalmología y Cirugía Refractiva",
        c: "Cédula profesional 0000000 · Cédula de especialidad 0000000",
      },
    ],
  },
};

export const PAQUETES_PREVENTIVOS_KEYS = Object.keys(PAQUETES_PREVENTIVOS);
