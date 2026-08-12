import type { Lang } from "@/shared/i18n/translations";

// Áreas del flujo "Agendar cita", migradas del modelo index.html y traducidas
// es/en. Cada área indica a qué tipo(s) de servicio pertenece (consulta,
// estudio, hospitalario) y lista sus procedimientos con el texto de
// preparación previa — guía de referencia editable, NO protocolo médico
// verificado por el hospital.

export type TipoCita = "consulta" | "estudio" | "hospitalario";

export interface ProcedimientoCita {
  nombre: Record<Lang, string>;
  // Etiqueta corta opcional (ej. "Con y sin contraste", "Único en la región").
  tag?: Record<Lang, string>;
  // Indicaciones de preparación previa para el paciente.
  prep: Record<Lang, string>;
}

export interface MedicoCita {
  nombre: Record<Lang, string>;
  especialidad: Record<Lang, string>;
  cedula: string;
}

export interface AreaCita {
  id: string;
  nombre: Record<Lang, string>;
  tipo: TipoCita[];
  desc: Record<Lang, string>;
  procs: ProcedimientoCita[];
  med: MedicoCita[];
}

// Opciones del paso 1 del agendador ("¿Qué necesitas?"). "urgencia" no es un
// área: abre la ruta especial de urgencias (no se agendan, se llama).
export const tiposCita = [
  { id: "consulta", label: { es: "Consulta con especialista", en: "Specialist consultation" } },
  { id: "estudio", label: { es: "Estudio o procedimiento", en: "Study or procedure" } },
  { id: "hospitalario", label: { es: "Servicio hospitalario", en: "Hospital service" } },
  { id: "urgencia", label: { es: "Es una urgencia", en: "It's an emergency" } },
] as const satisfies readonly { id: TipoCita | "urgencia"; label: Record<Lang, string> }[];

export type TipoCitaId = (typeof tiposCita)[number]["id"];

export const areasCita: AreaCita[] = [
  {
    id: "oftalmologia",
    nombre: { es: "Oftalmología", en: "Ophthalmology" },
    tipo: ["consulta", "estudio"],
    desc: {
      es: "El área con la que nació el hospital. Revisión visual completa, seguimiento de patología ocular y cirugía refractiva, con equipo de diagnóstico propio.",
      en: "The department where the hospital was born. Complete eye exams, management of eye conditions, and refractive surgery, with our own diagnostic equipment.",
    },
    procs: [
      {
        nombre: { es: "Consulta y revisión visual", en: "Consultation and eye exam" },
        prep: {
          es: "Trae tus lentes o lentillas actuales y tus estudios previos. Si te dilatan la pupila no podrás manejar de regreso: ven acompañado.",
          en: "Bring your current glasses or contact lenses and previous studies. If your pupils are dilated you won't be able to drive back: come with someone.",
        },
      },
      {
        nombre: { es: "Valoración para cirugía refractiva", en: "Refractive surgery evaluation" },
        prep: {
          es: "Suspende el uso de lentes de contacto blandos 5 días antes y rígidos 15 días antes. Ven acompañado.",
          en: "Stop wearing soft contact lenses 5 days before and rigid lenses 15 days before. Come with someone.",
        },
      },
      {
        nombre: { es: "Control de glaucoma o retina", en: "Glaucoma or retina follow-up" },
        prep: {
          es: "Trae tus estudios de campimetría y OCT previos, y la lista de gotas que estás usando.",
          en: "Bring your previous visual field and OCT studies, and the list of eye drops you use.",
        },
      },
      {
        nombre: { es: "Todavía no lo sé", en: "I'm not sure yet" },
        prep: {
          es: "El oftalmólogo definirá contigo el estudio necesario durante la consulta.",
          en: "The ophthalmologist will define the needed study with you during the consultation.",
        },
      },
    ],
    med: [
      {
        nombre: { es: "[Especialista por confirmar]", en: "[Specialist to confirm]" },
        especialidad: { es: "Oftalmología", en: "Ophthalmology" },
        cedula: "Cédula profesional 0000000 · Cédula de especialidad 0000000",
      },
    ],
  },
  {
    id: "imagenologia",
    nombre: { es: "Imagenología", en: "Imaging" },
    tipo: ["estudio"],
    desc: {
      es: "Resonancia, tomografía, ultrasonido y rayos X, con interpretación del radiólogo incluida. También biopsias guiadas por imagen.",
      en: "MRI, CT, ultrasound, and X-ray, with radiologist interpretation included. Image-guided biopsies as well.",
    },
    procs: [
      {
        nombre: { es: "Resonancia magnética", en: "Magnetic resonance imaging (MRI)" },
        tag: { es: "Con y sin contraste", en: "With and without contrast" },
        prep: {
          es: "Ayuno de 4 horas si tu estudio requiere contraste. Avísanos si tienes marcapasos, implantes metálicos o claustrofobia. No traigas objetos metálicos.",
          en: "4-hour fast if your study requires contrast. Tell us if you have a pacemaker, metal implants, or claustrophobia. Do not bring metal objects.",
        },
      },
      {
        nombre: { es: "Resonancia bajo sedación", en: "MRI under sedation" },
        tag: { es: "Requiere valoración", en: "Requires evaluation" },
        prep: {
          es: "Ayuno de 8 horas. Acompañante obligatorio: no podrás manejar de regreso. Trae valoración cardiológica si tienes antecedentes.",
          en: "8-hour fast. A companion is required: you won't be able to drive back. Bring a cardiac evaluation if you have a history.",
        },
      },
      {
        nombre: { es: "Cardiorresonancia", en: "Cardiac MRI" },
        tag: { es: "Poco disponible en la región", en: "Rarely available in the region" },
        prep: {
          es: "Ayuno de 4 horas. Evita cafeína 12 horas antes. Trae tus estudios cardiológicos previos.",
          en: "4-hour fast. Avoid caffeine for 12 hours before. Bring your previous cardiac studies.",
        },
      },
      {
        nombre: { es: "Tomografía computarizada", en: "Computed tomography (CT)" },
        prep: {
          es: "Ayuno de 4 horas si lleva contraste. Trae estudios de función renal si tienes más de 60 años o antecedente renal.",
          en: "4-hour fast if it requires contrast. Bring kidney function tests if you're over 60 or have kidney history.",
        },
      },
      {
        nombre: { es: "Angiotac de coronarias", en: "Coronary CT angiography" },
        tag: { es: "Poco disponible en la región", en: "Rarely available in the region" },
        prep: {
          es: "Ayuno de 4 horas, sin cafeína 12 horas antes. Toma tus medicamentos habituales con poca agua.",
          en: "4-hour fast, no caffeine 12 hours before. Take your usual medications with a little water.",
        },
      },
      {
        nombre: { es: "Protocolo TAVI", en: "TAVI protocol" },
        tag: { es: "Poco disponible en la región", en: "Rarely available in the region" },
        prep: {
          es: "Estudio de planeación quirúrgica. Requiere indicación del cardiólogo tratante.",
          en: "Surgical planning study. Requires a referral from your treating cardiologist.",
        },
      },
      {
        nombre: { es: "Ultrasonido", en: "Ultrasound" },
        prep: {
          es: "Para estudio abdominal, ayuno de 6 horas. Para pélvico, vejiga llena: toma un litro de agua una hora antes y no orines.",
          en: "For an abdominal study, 6-hour fast. For pelvic, full bladder: drink a liter of water one hour before and don't urinate.",
        },
      },
      {
        nombre: { es: "Rayos X", en: "X-ray" },
        prep: {
          es: "No requiere preparación. Trae tu orden médica y ven con ropa sin broches ni metal.",
          en: "No preparation needed. Bring your doctor's order and wear clothing without buttons or metal.",
        },
      },
      {
        nombre: { es: "Biopsia guiada por imagen", en: "Image-guided biopsy" },
        tag: { es: "Próstata, mama, tiroides, hígado", en: "Prostate, breast, thyroid, liver" },
        prep: {
          es: "Suspende anticoagulantes solo si tu médico lo indicó. Ven acompañado y con ayuno de 6 horas.",
          en: "Stop anticoagulants only if your doctor instructed you to. Come with a companion and a 6-hour fast.",
        },
      },
      {
        nombre: { es: "Todavía no lo sé", en: "I'm not sure yet" },
        prep: {
          es: "Trae la orden de tu médico y en recepción identificamos el estudio correcto.",
          en: "Bring your doctor's order and we'll identify the correct study at the front desk.",
        },
      },
    ],
    med: [
      {
        nombre: { es: "[Especialista por confirmar]", en: "[Specialist to confirm]" },
        especialidad: { es: "Radiología e imagen", en: "Radiology and imaging" },
        cedula: "Cédula profesional 0000000 · Cédula de especialidad 0000000",
      },
    ],
  },
  {
    id: "laboratorio",
    nombre: { es: "Laboratorio clínico", en: "Clinical laboratory" },
    tipo: ["estudio"],
    desc: {
      es: "Química sanguínea, biometría, perfiles hormonales, marcadores y pruebas especiales. La mayoría de los estudios de rutina se entregan en 24 horas.",
      en: "Blood chemistry, complete blood count, hormone panels, markers, and special tests. Most routine studies are ready in 24 hours.",
    },
    procs: [
      {
        nombre: { es: "Química sanguínea y perfiles", en: "Blood chemistry and panels" },
        prep: {
          es: "Ayuno de 8 a 12 horas. Puedes tomar agua simple. No suspendas tus medicamentos sin indicación médica.",
          en: "8 to 12-hour fast. You may drink plain water. Do not stop your medications without medical advice.",
        },
      },
      {
        nombre: { es: "Biometría hemática", en: "Complete blood count" },
        prep: {
          es: "No requiere ayuno salvo indicación de tu médico.",
          en: "No fasting needed unless your doctor says otherwise.",
        },
      },
      {
        nombre: { es: "Perfil hormonal o tiroideo", en: "Hormone or thyroid panel" },
        prep: {
          es: "Preferentemente por la mañana. Avísanos si tomas biotina: puede alterar el resultado.",
          en: "Preferably in the morning. Let us know if you take biotin: it can alter results.",
        },
      },
      {
        nombre: { es: "Examen general de orina", en: "Urinalysis" },
        prep: {
          es: "Primera orina de la mañana, chorro medio, en frasco estéril. Lo entregamos en recepción.",
          en: "First morning urine, midstream, in a sterile container. We provide it at the front desk.",
        },
      },
      {
        nombre: { es: "Todavía no lo sé", en: "I'm not sure yet" },
        prep: {
          es: "Trae tu orden y en recepción te indicamos si necesitas ayuno antes de tomar la muestra.",
          en: "Bring your order and we'll tell you at the front desk if you need to fast before the sample.",
        },
      },
    ],
    med: [
      {
        nombre: { es: "[Responsable por confirmar]", en: "[Supervisor to confirm]" },
        especialidad: { es: "Químico clínico responsable", en: "Clinical chemist in charge" },
        cedula: "Cédula profesional 0000000",
      },
    ],
  },
  {
    id: "cardiologia",
    nombre: { es: "Cardiología", en: "Cardiology" },
    tipo: ["consulta", "estudio"],
    desc: {
      es: "Prevención, diagnóstico y seguimiento de enfermedades cardiovasculares, con estudios de monitoreo y de imagen avanzada en el mismo hospital.",
      en: "Prevention, diagnosis, and follow-up of cardiovascular disease, with monitoring and advanced imaging studies at the same hospital.",
    },
    procs: [
      {
        nombre: { es: "Consulta de cardiología", en: "Cardiology consultation" },
        prep: {
          es: "Trae electrocardiogramas y estudios previos, la lista de tus medicamentos y tus últimas cifras de presión.",
          en: "Bring previous EKGs and studies, your medication list, and your latest blood pressure readings.",
        },
      },
      {
        nombre: { es: "Electrocardiograma", en: "Electrocardiogram (EKG)" },
        prep: {
          es: "No requiere preparación. Evita cremas o aceites en el pecho ese día.",
          en: "No preparation needed. Avoid creams or oils on your chest that day.",
        },
      },
      {
        nombre: { es: "Prueba de esfuerzo", en: "Stress test" },
        prep: {
          es: "Ayuno ligero de 3 horas. Trae ropa y tenis cómodos. Evita cafeína y tabaco 12 horas antes.",
          en: "Light 3-hour fast. Wear comfortable clothes and sneakers. Avoid caffeine and tobacco for 12 hours before.",
        },
      },
      {
        nombre: { es: "Holter 24 horas", en: "24-hour Holter monitor" },
        prep: {
          es: "Báñate antes de la colocación: no podrás mojarte mientras traigas el equipo. Usa ropa holgada.",
          en: "Shower before placement: you can't get wet while wearing the device. Wear loose clothing.",
        },
      },
      {
        nombre: { es: "MAPA (presión arterial)", en: "Ambulatory blood pressure monitor (ABPM)" },
        prep: {
          es: "Usa camisa o blusa holgada. Continúa tu rutina normal durante el registro y anota tus actividades.",
          en: "Wear a loose shirt or blouse. Keep your normal routine during the recording and note your activities.",
        },
      },
      {
        nombre: { es: "Todavía no lo sé", en: "I'm not sure yet" },
        prep: {
          es: "El cardiólogo definirá el estudio adecuado en la consulta.",
          en: "The cardiologist will define the right study at the consultation.",
        },
      },
    ],
    med: [
      {
        nombre: { es: "[Especialista por confirmar]", en: "[Specialist to confirm]" },
        especialidad: { es: "Cardiología", en: "Cardiology" },
        cedula: "Cédula profesional 0000000 · Cédula de especialidad 0000000",
      },
    ],
  },
  {
    id: "gastro",
    nombre: { es: "Gastroenterología", en: "Gastroenterology" },
    tipo: ["consulta", "estudio"],
    desc: {
      es: "Diagnóstico y tratamiento del aparato digestivo. Nuestros estudios endoscópicos se realizan en quirófano, con anestesiólogo y monitoreo, no en consultorio.",
      en: "Diagnosis and treatment of the digestive system. Our endoscopic studies are done in the operating room, with an anesthesiologist and monitoring — not in the office.",
    },
    procs: [
      {
        nombre: { es: "Consulta de gastroenterología", en: "Gastroenterology consultation" },
        prep: {
          es: "Trae tus estudios previos y una lista de los medicamentos que tomas.",
          en: "Bring your previous studies and a list of the medications you take.",
        },
      },
      {
        nombre: { es: "Endoscopía", en: "Endoscopy" },
        prep: {
          es: "Ayuno estricto de 8 horas. Acompañante obligatorio: se realiza con sedación y no podrás manejar.",
          en: "Strict 8-hour fast. A companion is required: it's done under sedation and you won't be able to drive.",
        },
      },
      {
        nombre: { es: "Colonoscopía", en: "Colonoscopy" },
        prep: {
          es: "Preparación intestinal el día previo con la solución que te entregamos, más ayuno de 8 horas. Acompañante obligatorio.",
          en: "Bowel prep the day before with the solution we give you, plus an 8-hour fast. A companion is required.",
        },
      },
      {
        nombre: { es: "CPRE", en: "ERCP" },
        prep: {
          es: "Ayuno de 8 horas, valoración previa y acompañante obligatorio. Se realiza bajo sedación en quirófano.",
          en: "8-hour fast, prior evaluation, and a required companion. Performed under sedation in the operating room.",
        },
      },
      {
        nombre: { es: "Elastografía hepática", en: "Liver elastography" },
        prep: {
          es: "Ayuno de 4 horas. No requiere sedación.",
          en: "4-hour fast. No sedation needed.",
        },
      },
      {
        nombre: { es: "Todavía no lo sé", en: "I'm not sure yet" },
        prep: {
          es: "El gastroenterólogo definirá el estudio necesario en la consulta.",
          en: "The gastroenterologist will define the needed study at the consultation.",
        },
      },
    ],
    med: [
      {
        nombre: { es: "[Especialista por confirmar]", en: "[Specialist to confirm]" },
        especialidad: { es: "Gastroenterología y endoscopía", en: "Gastroenterology and endoscopy" },
        cedula: "Cédula profesional 0000000 · Cédula de especialidad 0000000",
      },
    ],
  },
  {
    id: "neumologia",
    nombre: { es: "Neumología", en: "Pulmonology" },
    tipo: ["consulta", "estudio"],
    desc: {
      es: "Estudios de función pulmonar para adultos y niños, diagnóstico de apnea del sueño y terapia de higiene bronquial.",
      en: "Pulmonary function studies for adults and children, sleep apnea diagnosis, and bronchial hygiene therapy.",
    },
    procs: [
      {
        nombre: { es: "Consulta de neumología", en: "Pulmonology consultation" },
        prep: {
          es: "Trae radiografías o tomografías previas y la lista de inhaladores que usas.",
          en: "Bring previous X-rays or CT scans and the list of inhalers you use.",
        },
      },
      {
        nombre: { es: "Espirometría", en: "Spirometry" },
        prep: {
          es: "Suspende broncodilatadores según indique tu médico. Evita fumar y comer abundante 2 horas antes. Usa ropa cómoda.",
          en: "Stop bronchodilators as your doctor indicates. Avoid smoking and heavy meals 2 hours before. Wear comfortable clothes.",
        },
      },
      {
        nombre: { es: "FeNO", en: "FeNO test" },
        prep: {
          es: "Evita alimentos ricos en nitratos y ejercicio intenso una hora antes. No fumes ese día.",
          en: "Avoid foods rich in nitrates and intense exercise one hour before. Don't smoke that day.",
        },
      },
      {
        nombre: { es: "Poligrafía de sueño", en: "Sleep polygraphy" },
        prep: {
          es: "El equipo se coloca en el hospital y duermes en casa. Báñate antes, no uses cremas y evita alcohol y siestas ese día.",
          en: "The device is set up at the hospital and you sleep at home. Shower first, skip creams, and avoid alcohol and naps that day.",
        },
      },
      {
        nombre: { es: "Higiene bronquial", en: "Bronchial hygiene" },
        tag: { es: "Chaleco percutor y máquina de tos", en: "Percussor vest and cough machine" },
        prep: {
          es: "Acude sin haber comido en la hora previa. Trae tus medicamentos inhalados.",
          en: "Come without eating for the previous hour. Bring your inhaled medications.",
        },
      },
      {
        nombre: { es: "Todavía no lo sé", en: "I'm not sure yet" },
        prep: {
          es: "El neumólogo definirá el estudio necesario en la consulta.",
          en: "The pulmonologist will define the needed study at the consultation.",
        },
      },
    ],
    med: [
      {
        nombre: { es: "[Especialista por confirmar]", en: "[Specialist to confirm]" },
        especialidad: { es: "Neumología", en: "Pulmonology" },
        cedula: "Cédula profesional 0000000 · Cédula de especialidad 0000000",
      },
    ],
  },
  {
    id: "dolor",
    nombre: { es: "Medicina del dolor", en: "Pain medicine" },
    tipo: ["consulta"],
    desc: {
      es: "Tratamiento del dolor crónico y agudo con enfoque multidisciplinario: bloqueos, manejo farmacológico y seguimiento, no solo receta.",
      en: "Chronic and acute pain treatment with a multidisciplinary approach: blocks, medication management, and follow-up — not just a prescription.",
    },
    procs: [
      {
        nombre: { es: "Primera valoración del dolor", en: "First pain evaluation" },
        prep: {
          es: "Trae tus estudios de imagen previos y una lista de todos los analgésicos que has usado, con dosis y resultado.",
          en: "Bring your previous imaging studies and a list of all painkillers you've used, with doses and results.",
        },
      },
      {
        nombre: { es: "Bloqueo o procedimiento intervencionista", en: "Nerve block or interventional procedure" },
        prep: {
          es: "Ayuno de 6 horas y acompañante obligatorio. Avísanos si tomas anticoagulantes.",
          en: "6-hour fast and a required companion. Let us know if you take anticoagulants.",
        },
      },
      {
        nombre: { es: "Seguimiento de dolor crónico", en: "Chronic pain follow-up" },
        prep: {
          es: "Trae tu diario de dolor si lo llevas y los medicamentos actuales.",
          en: "Bring your pain diary if you keep one and your current medications.",
        },
      },
      {
        nombre: { es: "Todavía no lo sé", en: "I'm not sure yet" },
        prep: {
          es: "El algólogo definirá el plan de tratamiento en la primera valoración.",
          en: "The pain specialist will define the treatment plan at your first evaluation.",
        },
      },
    ],
    med: [
      {
        nombre: { es: "[Especialista por confirmar]", en: "[Specialist to confirm]" },
        especialidad: { es: "Anestesiología · Medicina del dolor", en: "Anesthesiology · Pain medicine" },
        cedula: "Cédula profesional 0000000 · Cédula de especialidad 0000000",
      },
    ],
  },
  {
    id: "cirugia",
    nombre: { es: "Cirugía general", en: "General surgery" },
    tipo: ["consulta"],
    desc: {
      es: "Valoración y cirugía por especialistas certificados, con quirófano, esterilización y hospitalización propios.",
      en: "Evaluation and surgery by certified specialists, with our own operating rooms, sterilization, and hospital stay.",
    },
    procs: [
      {
        nombre: { es: "Valoración quirúrgica", en: "Surgical evaluation" },
        prep: {
          es: "Trae tus estudios de imagen y laboratorio previos, y la lista de medicamentos y alergias.",
          en: "Bring your previous imaging and lab studies, plus your medication and allergy list.",
        },
      },
      {
        nombre: { es: "Colecistectomía (vesícula)", en: "Cholecystectomy (gallbladder)" },
        prep: {
          es: "Requiere valoración previa. Ayuno de 8 horas el día del procedimiento y acompañante.",
          en: "Requires a prior evaluation. 8-hour fast on the day of the procedure and a companion.",
        },
      },
      {
        nombre: { es: "Apendicectomía", en: "Appendectomy" },
        prep: {
          es: "Si sospechas apendicitis, no esperes cita: acude directo a urgencias.",
          en: "If you suspect appendicitis, don't wait for an appointment: go straight to the emergency room.",
        },
      },
      {
        nombre: { es: "Todavía no lo sé", en: "I'm not sure yet" },
        prep: {
          es: "El cirujano definirá el procedimiento y los estudios previos en la valoración.",
          en: "The surgeon will define the procedure and required tests at the evaluation.",
        },
      },
    ],
    med: [
      {
        nombre: { es: "[Especialista por confirmar]", en: "[Specialist to confirm]" },
        especialidad: { es: "Cirugía general", en: "General surgery" },
        cedula: "Cédula profesional 0000000 · Cédula de especialidad 0000000",
      },
    ],
  },
  {
    id: "gineco",
    nombre: { es: "Ginecología y obstetricia", en: "Gynecology and obstetrics" },
    tipo: ["consulta"],
    desc: {
      es: "Atención del embarazo, el parto y la salud ginecológica, con quirófano y hospitalización en el mismo edificio.",
      en: "Care for pregnancy, delivery, and gynecological health, with operating rooms and hospital stay in the same building.",
    },
    procs: [
      {
        nombre: { es: "Consulta ginecológica", en: "Gynecology consultation" },
        prep: {
          es: "Agenda fuera de tu periodo menstrual, salvo que consultes por sangrado. Trae tu último papanicolaou.",
          en: "Book outside your menstrual period unless consulting about bleeding. Bring your last Pap smear.",
        },
      },
      {
        nombre: { es: "Control prenatal", en: "Prenatal check-up" },
        prep: {
          es: "Trae tu carnet de embarazo y tus ultrasonidos previos.",
          en: "Bring your pregnancy card and previous ultrasounds.",
        },
      },
      {
        nombre: { es: "Atención de parto o cesárea", en: "Labor and delivery or cesarean" },
        prep: {
          es: "Requiere control prenatal previo. Te entregamos la lista de lo que debes llevar al hospital.",
          en: "Requires prior prenatal care. We'll give you the list of what to bring to the hospital.",
        },
      },
      {
        nombre: { es: "Todavía no lo sé", en: "I'm not sure yet" },
        prep: {
          es: "La ginecóloga definirá contigo el estudio o procedimiento en la consulta.",
          en: "The gynecologist will define the study or procedure with you at the consultation.",
        },
      },
    ],
    med: [
      {
        nombre: { es: "[Especialista por confirmar]", en: "[Specialist to confirm]" },
        especialidad: { es: "Ginecología y obstetricia", en: "Gynecology and obstetrics" },
        cedula: "Cédula profesional 0000000 · Cédula de especialidad 0000000",
      },
    ],
  },
  {
    id: "general",
    nombre: { es: "Medicina general", en: "General medicine" },
    tipo: ["consulta"],
    desc: {
      es: "Atención primaria para ti y tu familia: primera valoración, control de enfermedades crónicas y orientación sobre a qué especialista acudir.",
      en: "Primary care for you and your family: first evaluation, management of chronic conditions, and guidance on which specialist to see.",
    },
    procs: [
      {
        nombre: { es: "Consulta general", en: "General consultation" },
        prep: {
          es: "Trae tus estudios recientes y la lista de medicamentos que tomas.",
          en: "Bring your recent studies and the list of medications you take.",
        },
      },
      {
        nombre: { es: "Control de diabetes o hipertensión", en: "Diabetes or hypertension check-up" },
        prep: {
          es: "Trae tu registro de glucosa o presión de las últimas semanas y tus últimos laboratorios.",
          en: "Bring your glucose or blood pressure log from recent weeks and your latest labs.",
        },
      },
      {
        nombre: { es: "Certificado o valoración prequirúrgica", en: "Certificate or pre-surgical evaluation" },
        prep: {
          es: "Trae identificación oficial y los estudios que te haya solicitado tu cirujano.",
          en: "Bring official ID and the studies your surgeon requested.",
        },
      },
      {
        nombre: { es: "Todavía no lo sé", en: "I'm not sure yet" },
        prep: {
          es: "Ven a consulta general: es el punto de entrada correcto cuando no sabes qué especialista necesitas.",
          en: "Come to general medicine: it's the right entry point when you don't know which specialist you need.",
        },
      },
    ],
    med: [
      {
        nombre: { es: "[Médico por confirmar]", en: "[Doctor to confirm]" },
        especialidad: { es: "Medicina general", en: "General medicine" },
        cedula: "Cédula profesional 0000000",
      },
    ],
  },
  {
    id: "quirofano",
    nombre: { es: "Quirófanos y esterilización", en: "Operating rooms and sterilization" },
    tipo: ["hospitalario"],
    desc: {
      es: "Cinco salas equipadas con central de esterilización propia. Disponibles para nuestros cirujanos y también para cirujanos externos que requieran sala.",
      en: "Five equipped rooms with our own sterilization center. Available for our surgeons and for external surgeons who need a room.",
    },
    procs: [
      {
        nombre: { es: "Renta de sala quirúrgica", en: "Operating room rental" },
        prep: {
          es: "Cotización previa. Envíanos procedimiento, fecha estimada, duración y equipo requerido.",
          en: "Prior quote required. Send us the procedure, estimated date, duration, and required equipment.",
        },
      },
      {
        nombre: { es: "Servicio de esterilización de instrumental", en: "Instrument sterilization service" },
        prep: {
          es: "Procesamiento con estándares hospitalarios y entrega documentada de cada ciclo.",
          en: "Processing to hospital standards with documented delivery of every cycle.",
        },
      },
    ],
    med: [
      {
        nombre: { es: "[Responsable por confirmar]", en: "[Manager to confirm]" },
        especialidad: { es: "Jefatura de quirófano", en: "Operating room management" },
        cedula: "Cédula profesional 0000000",
      },
    ],
  },
];

// Cada área del slider (areasMedicas.ts) que tenga equivalente en el flujo de
// cita lo declara con "citaId"; aquí está la relación inversa y un helper
// para resolverla sin repetir el mapeo en cada componente.
export function areaCitaPorId(id: string): AreaCita | undefined {
  return areasCita.find((area) => area.id === id);
}

export function areaCitaDeTitulo(tituloEs: string): AreaCita | undefined {
  return areasCita.find((area) => area.nombre.es === tituloEs);
}
