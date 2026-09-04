import { contactoInfo } from "./contacto";
export interface PreguntaFrecuente {
  pregunta: string;
  respuesta: string;
  defaultOpen?: boolean;
}

export const PREGUNTAS_FRECUENTES: PreguntaFrecuente[] = [
  {
    pregunta: "¿Necesito orden médica para hacerme un estudio?",
    respuesta:
      "Para laboratorio y rayos X simples no siempre es necesaria. Para resonancia, tomografía, endoscopía y biopsias sí requerimos indicación médica, porque el protocolo del estudio depende de lo que se busca. Si no la tienes, agenda una consulta de medicina general y te la valoramos el mismo día.",
    defaultOpen: true,
  },
  {
    pregunta: "¿Cuánto cuesta la consulta y los estudios?",
    respuesta:
      "Los costos varían según el estudio y si vienes por aseguradora o como paciente particular. Escríbenos por WhatsApp con el nombre del estudio y te damos el precio cerrado antes de que agendes. No damos sorpresas en caja.",
  },
  {
    pregunta: "¿Aceptan mi seguro de gastos médicos?",
    respuesta:
      "Trabajamos con las principales aseguradoras del país y nuestra área de trámites gestiona la carta de autorización por ti. Consulta la sección de convenios o mándanos el nombre de tu aseguradora y lo confirmamos.",
  },
  {
    pregunta: "¿Cuánto tardan los resultados?",
    respuesta:
      "La mayoría de los estudios de laboratorio de rutina se entregan en 24 horas. Los estudios de imagen con interpretación del radiólogo suelen estar el mismo día o al siguiente. Los estudios especializados y las biopsias tienen tiempos distintos que te informamos al agendar.",
  },
  {
    pregunta: "¿Puedo ir sin cita a urgencias?",
    respuesta:
      `Sí. Urgencias no requiere cita ni horario: estamos abiertos las 24 horas, los 365 días del año. Si puedes, llámanos en camino al ${contactoInfo.telefonoUrgencias} o al ${contactoInfo.telefonoUrgencias2} para tener el área lista cuando llegues.`,
  },
  {
    pregunta: "¿Atienden niños?",
    respuesta:
      "Sí. Medicina general, laboratorio, imagenología y estudios de función pulmonar atienden población pediátrica. Para procedimientos que requieren sedación, valoramos cada caso previamente con el anestesiólogo.",
  },
  {
    pregunta: "¿Hay estacionamiento y acceso para silla de ruedas?",
    respuesta:
      "[COMPLETAR — confirmar con dirección: número de cajones, si es gratuito, y accesos con rampa. Es una de las dudas más frecuentes y conviene responderla con precisión.]",
  },
  {
    pregunta: "¿Soy cirujano externo, puedo operar en sus quirófanos?",
    respuesta:
      "Sí. Rentamos sala equipada con servicio de esterilización, personal de quirófano y hospitalización para tu paciente. Escríbenos con el procedimiento y la fecha estimada y te enviamos disponibilidad y cotización.",
  },
];
