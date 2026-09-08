export interface Procedimiento {
  n: string;
  prep: string;
  tag?: string;
}

export interface Medico {
  n: string;
  e: string;
  c: string;
}

export interface Especialidad {
  n: string;
  tipo: string[];
  d: string;
  img: string;
  procs: Procedimiento[];
  med: Medico[];
}

export const ESPECIALIDADES: Record<string, Especialidad> = {
  oftalmologia: {
    n: "Oftalmología",
    tipo: ["consulta", "estudio"],
    d: "El área con la que nació el hospital. Revisión visual completa, seguimiento de patología ocular y cirugía refractiva, con equipo de diagnóstico propio.",
    img: "/servicios/oftalmologia.webp",
    procs: [
      {
        n: "Consulta y revisión visual",
        prep: "Trae tus lentes o lentillas actuales y tus estudios previos. Si te dilatan la pupila no podrás manejar de regreso: ven acompañado.",
      },
      {
        n: "Valoración para cirugía refractiva",
        prep: "Suspende el uso de lentes de contacto blandos 5 días antes y rígidos 15 días antes. Ven acompañado.",
      },
      {
        n: "Control de glaucoma o retina",
        prep: "Trae tus estudios de campimetría y OCT previos, y la lista de gotas que estás usando.",
      },
    ],
    med: [
      {
        n: "[Nombre del especialista]",
        e: "Oftalmología",
        c: "Cédula profesional 0000000 · Cédula de especialidad 0000000",
      },
      {
        n: "[Nombre del especialista]",
        e: "Oftalmología · Retina",
        c: "Cédula profesional 0000000 · Cédula de especialidad 0000000",
      },
    ],
  },
  imagenologia: {
    n: "Imagenología",
    tipo: ["estudio"],
    d: "Resonancia, tomografía, ultrasonido y rayos X, con interpretación del radiólogo incluida. También biopsias guiadas por imagen.",
    img: "/instalaciones/areas-diagnosticas/reso3.jpg",
    procs: [
      {
        n: "Resonancia magnética",
        prep: "Ayuno de 4 horas si tu estudio requiere contraste. Avísanos si tienes marcapasos, implantes metálicos o claustrofobia. No traigas objetos metálicos.",
        tag: "Con y sin contraste",
      },
      {
        n: "Resonancia bajo sedación",
        prep: "Ayuno de 8 horas. Acompañante obligatorio: no podrás manejar de regreso. Trae valoración cardiológica si tienes antecedentes.",
        tag: "Requiere valoración",
      },
      {
        n: "Cardiorresonancia",
        prep: "Ayuno de 4 horas. Evita cafeína 12 horas antes. Trae tus estudios cardiológicos previos.",
        tag: "Poco disponible en la región",
      },
      {
        n: "Tomografía computarizada",
        prep: "Ayuno de 4 horas si lleva contraste. Trae estudios de función renal si tienes más de 60 años o antecedente renal.",
      },
      {
        n: "Angiotac de coronarias",
        prep: "Ayuno de 4 horas, sin cafeína 12 horas antes. Toma tus medicamentos habituales con poca agua.",
        tag: "Poco disponible en la región",
      },
      {
        n: "Ultrasonido",
        prep: "Para estudio abdominal, ayuno de 6 horas. Para pélvico, vejiga llena: toma un litro de agua una hora antes y no orines.",
      },
      {
        n: "Rayos X",
        prep: "No requiere preparación. Trae tu orden médica y ven con ropa sin broches ni metal.",
      },
      {
        n: "Biopsia guiada por imagen",
        prep: "Suspende anticoagulantes solo si tu médico lo indicó. Ven acompañado y con ayuno de 6 horas.",
        tag: "Próstata, mama, tiroides, hígado",
      },
    ],
    med: [
      {
        n: "[Nombre del especialista]",
        e: "Radiología e imagen",
        c: "Cédula profesional 0000000 · Cédula de especialidad 0000000",
      },
      {
        n: "[Nombre del especialista]",
        e: "Radiología intervencionista",
        c: "Cédula profesional 0000000 · Cédula de especialidad 0000000",
      },
    ],
  },
  laboratorio: {
    n: "Laboratorio clínico",
    tipo: ["estudio"],
    d: "Química sanguínea, biometría, perfiles hormonales, marcadores y pruebas especiales. La mayoría de los estudios de rutina se entregan en 24 horas.",
    img: "/servicios/laboratorio-clinico.png",
    procs: [
      {
        n: "Química sanguínea y perfiles",
        prep: "Ayuno de 8 a 12 horas. Puedes tomar agua simple. No suspendas tus medicamentos sin indicación médica.",
      },
      {
        n: "Biometría hemática",
        prep: "No requiere ayuno salvo indicación de tu médico.",
      },
      {
        n: "Perfil hormonal o tiroideo",
        prep: "Preferentemente por la mañana. Avísanos si tomas biotina: puede alterar el resultado.",
      },
      {
        n: "Examen general de orina",
        prep: "Primera orina de la mañana, chorro medio, en frasco estéril. Lo entregamos en recepción.",
      },
    ],
    med: [
      {
        n: "[Nombre del responsable]",
        e: "Químico clínico responsable",
        c: "Cédula profesional 0000000",
      },
    ],
  },
  cardiologia: {
    n: "Cardiología",
    tipo: ["consulta", "estudio"],
    d: "Prevención, diagnóstico y seguimiento de enfermedades cardiovasculares, con estudios de monitoreo y de imagen avanzada en el mismo hospital.",
    img: "/instalaciones/areas-diagnosticas/tac2.jpeg",
    procs: [
      {
        n: "Consulta de cardiología",
        prep: "Trae electrocardiogramas y estudios previos, la lista de tus medicamentos y tus últimas cifras de presión.",
      },
      {
        n: "Electrocardiograma",
        prep: "No requiere preparación. Evita cremas o aceites en el pecho ese día.",
      },
      {
        n: "Prueba de esfuerzo",
        prep: "Ayuno ligero de 3 horas. Trae ropa y tenis cómodos. Evita cafeína y tabaco 12 horas antes.",
      },
      {
        n: "Holter 24 horas",
        prep: "Báñate antes de la colocación: no podrás mojarte mientras traigas el equipo. Usa ropa holgada.",
      },
      {
        n: "MAPA (presión arterial)",
        prep: "Usa camisa o blusa holgada. Continúa tu rutina normal durante el registro y anota tus actividades.",
      },
    ],
    med: [
      {
        n: "[Nombre del especialista]",
        e: "Cardiología",
        c: "Cédula profesional 0000000 · Cédula de especialidad 0000000",
      },
    ],
  }, /*
  gastro: {
    n: "Gastroenterología",
    tipo: ["consulta", "estudio"],
    d: "Diagnóstico y tratamiento del aparato digestivo. Nuestros estudios endoscópicos se realizan en quirófano, con anestesiólogo y monitoreo, no en consultorio.",
    img: "/instalaciones/areas-diagnosticas/usg.jpg",
    procs: [
      {
        n: "Consulta de gastroenterología",
        prep: "Trae tus estudios previos y una lista de los medicamentos que tomas.",
      },
      {
        n: "Endoscopía",
        prep: "Ayuno estricto de 8 horas. Acompañante obligatorio: se realiza con sedación y no podrás manejar.",
      },
      {
        n: "Colonoscopía",
        prep: "Preparación intestinal el día previo con la solución que te entregamos, más ayuno de 8 horas. Acompañante obligatorio.",
      },
      {
        n: "CPRE",
        prep: "Ayuno de 8 horas, valoración previa y acompañante obligatorio. Se realiza bajo sedación en quirófano.",
      },
      {
        n: "Elastografía hepática",
        prep: "Ayuno de 4 horas. No requiere sedación.",
      },
    ],
    med: [
      {
        n: "[Nombre del especialista]",
        e: "Gastroenterología y endoscopía",
        c: "Cédula profesional 0000000 · Cédula de especialidad 0000000",
      },
    ],
  },
  neumologia: {
    n: "Neumología",
    tipo: ["consulta", "estudio"],
    d: "Estudios de función pulmonar para adultos y niños, diagnóstico de apnea del sueño y terapia de higiene bronquial.",
    img: "/instalaciones/areas-diagnosticas/reso4.jpeg",
    procs: [
      {
        n: "Consulta de neumología",
        prep: "Trae radiografías o tomografías previas y la lista de inhaladores que usas.",
      },
      {
        n: "Espirometría",
        prep: "Suspende broncodilatadores según indique tu médico. Evita fumar y comer abundante 2 horas antes. Usa ropa cómoda.",
      },
      {
        n: "FeNO",
        prep: "Evita alimentos ricos en nitratos y ejercicio intenso una hora antes. No fumes ese día.",
      },
      {
        n: "Poligrafía de sueño",
        prep: "El equipo se coloca en el hospital y duermes en casa. Báñate antes, no uses cremas y evita alcohol y siestas ese día.",
      },
      {
        n: "Higiene bronquial",
        prep: "Acude sin haber comido en la hora previa. Trae tus medicamentos inhalados.",
        tag: "Chaleco percutor y máquina de tos",
      },
    ],
    med: [
      {
        n: "[Nombre del especialista]",
        e: "Neumología",
        c: "Cédula profesional 0000000 · Cédula de especialidad 0000000",
      },
    ],
  },
  dolor: {
    n: "Medicina del dolor",
    tipo: ["consulta"],
    d: "Tratamiento del dolor crónico y agudo con enfoque multidisciplinario: bloqueos, manejo farmacológico y seguimiento, no solo receta.",
    img: "/instalaciones/areas-diagnosticas/usg2.jpg",
    procs: [
      {
        n: "Primera valoración del dolor",
        prep: "Trae tus estudios de imagen previos y una lista de todos los analgésicos que has usado, con dosis y resultado.",
      },
      {
        n: "Bloqueo o procedimiento intervencionista",
        prep: "Ayuno de 6 horas y acompañante obligatorio. Avísanos si tomas anticoagulantes.",
      },
      {
        n: "Seguimiento de dolor crónico",
        prep: "Trae tu diario de dolor si lo llevas y los medicamentos actuales.",
      },
    ],
    med: [
      {
        n: "[Nombre del especialista]",
        e: "Anestesiología · Medicina del dolor",
        c: "Cédula profesional 0000000 · Cédula de especialidad 0000000",
      },
    ],
  },
  cirugia: {
    n: "Cirugía general",
    tipo: ["consulta"],
    d: "Valoración y cirugía por especialistas certificados, con quirófano, esterilización y hospitalización propios.",
    img: "/instalaciones/quirofanos/qx3.jpg",
    procs: [
      {
        n: "Valoración quirúrgica",
        prep: "Trae tus estudios de imagen y laboratorio previos, y la lista de medicamentos y alergias.",
      },
      {
        n: "Colecistectomía (vesícula)",
        prep: "Requiere valoración previa. Ayuno de 8 horas el día del procedimiento y acompañante.",
      },
      {
        n: "Apendicectomía",
        prep: "Si sospechas apendicitis, no esperes cita: acude directo a urgencias.",
      },
    ],
    med: [
      {
        n: "[Nombre del especialista]",
        e: "Cirugía general",
        c: "Cédula profesional 0000000 · Cédula de especialidad 0000000",
      },
    ],
  },
  gineco: {
    n: "Ginecología y obstetricia",
    tipo: ["consulta"],
    d: "Atención del embarazo, el parto y la salud ginecológica, con quirófano y hospitalización en el mismo edificio.",
    img: "/instalaciones/consultorios/dr5.jpeg",
    procs: [
      {
        n: "Consulta ginecológica",
        prep: "Agenda fuera de tu periodo menstrual, salvo que consultes por sangrado. Trae tu último papanicolaou.",
      },
      {
        n: "Control prenatal",
        prep: "Trae tu carnet de embarazo y tus ultrasonidos previos.",
      },
      {
        n: "Atención de parto o cesárea",
        prep: "Requiere control prenatal previo. Te entregamos la lista de lo que debes llevar al hospital.",
      },
    ],
    med: [
      {
        n: "[Nombre de la especialista]",
        e: "Ginecología y obstetricia",
        c: "Cédula profesional 0000000 · Cédula de especialidad 0000000",
      },
    ],
  },
  general: {
    n: "Medicina general",
    tipo: ["consulta"],
    d: "Atención primaria para ti y tu familia: primera valoración, control de enfermedades crónicas y orientación sobre a qué especialista acudir.",
    img: "/instalaciones/consultorios/con1.jpg",
    procs: [
      {
        n: "Consulta general",
        prep: "Trae tus estudios recientes y la lista de medicamentos que tomas.",
      },
      {
        n: "Control de diabetes o hipertensión",
        prep: "Trae tu registro de glucosa o presión de las últimas semanas y tus últimos laboratorios.",
      },
      {
        n: "Certificado o valoración prequirúrgica",
        prep: "Trae identificación oficial y los estudios que te haya solicitado tu cirujano.",
      },
    ],
    med: [
      {
        n: "[Nombre del médico]",
        e: "Medicina general",
        c: "Cédula profesional 0000000",
      },
    ],
  },
  quirofano: {
    n: "Quirófanos y esterilización",
    tipo: ["hospitalario"],
    d: "Cinco salas equipadas con central de esterilización propia. Disponibles para nuestros cirujanos y también para cirujanos externos que requieran sala.",
    img: "/instalaciones/quirofanos/qx2.jpg",
    procs: [
      {
        n: "Renta de sala quirúrgica",
        prep: "Cotización previa. Envíanos procedimiento, fecha estimada, duración y equipo requerido.",
      },
      {
        n: "Servicio de esterilización de instrumental",
        prep: "Procesamiento con estándares hospitalarios y entrega documentada de cada ciclo.",
      },
    ],
    med: [
      {
        n: "[Nombre del responsable]",
        e: "Jefatura de quirófano",
        c: "Cédula profesional 0000000",
      },
    ],
  },
*/
};

export const ESPECIALIDADES_KEYS = Object.keys(ESPECIALIDADES);

// Relaciona el título en español de "areasMedicas.ts" (el carrusel de
// Servicios) con la key de acá — los nombres no siempre coinciden 1 a 1
// (ej. "Laboratorio clínico" → "laboratorio", "Medicina del dolor" →
// "dolor"), así que no alcanza con una transformación automática del texto.
// "Urgencias 24/7" no tiene pestaña propia a propósito (no se "navega", se
// llama) — AreaMedicaCard.tsx debe manejar ese caso aparte.
const TITULO_A_KEY: Record<string, string> = {
  "Imagenología": "imagenologia",
  "Oftalmología": "oftalmologia",
  "Laboratorio clínico": "laboratorio",
  "Quirófanos": "quirofano",
  "Cardiología": "cardiologia",
  "Medicina del dolor": "dolor",
  "Medicina General": "general",
  "Gastroenterología": "gastro",
  "Neumología": "neumologia",
};

export function especialidadKeyDeTitulo(tituloEs: string): string | undefined {
  return TITULO_A_KEY[tituloEs];
}
