"use client";

import { useState, useEffect, useRef } from "react";
import { Icon } from "@/presentation/atoms/Icon";
import { useAssistantModal } from "@/presentation/hooks/useAssistantModal";
import { useCitaModal } from "@/presentation/hooks/useCitaModal";
import { useEmergencyModal } from "@/presentation/hooks/useEmergencyModal";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { contactoInfo, mapsDirectionsHref } from "@/shared/data/contacto";
import { catalogoProcedimientos } from "@/shared/data/catalogoProcedimientos";
import type { Lang } from "@/shared/i18n/translations";
import { cn } from "@/shared/lib/utils";

interface ChatAction {
  label: string;
  icon: "calendar" | "phone" | "whatsapp" | "pin" | "arrow-right" | "check-circle";
  actionType: "cita" | "emergency" | "whatsapp" | "maps" | "navigate";
  payload?: string;
}

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  actions?: ChatAction[];
}

// ===== Búsqueda en el catálogo real de /procedimientos =====
// El bot antes sólo reconocía categorías genéricas ("cirugía", "estudio"...)
// con una respuesta fija. Esto arma un índice de palabras clave a partir del
// catálogo real (catalogoProcedimientos.ts) para que, si alguien escribe
// "necesito una biopsia de próstata" o "tienen cirugía vascular", el bot
// responda con el procedimiento/especialidad real que corresponde (y si de
// verdad se ofrece), en vez de una respuesta genérica de la categoría.
const STOPWORDS = new Set([
  "de", "del", "la", "el", "los", "las", "por", "para", "con", "una", "unos", "unas", "guiada",
  "guiado", "the", "of", "for", "with", "and", "for", "una", "necesito", "quiero", "tengo",
  // Palabras genéricas de categoría — aparecen tal cual dentro de varios
  // nombres de grupo ("Servicios hospitalarios", "Servicios quirúrgicos")
  // y por sí solas no distinguen un servicio de otro: dejarlas como
  // keyword hacía que una pregunta amplia como "¿qué servicios tienen?"
  // matcheara un solo grupo al azar en vez de caer en el listado completo
  // ("buildServiceListResponse").
  "servicio", "servicios", "especialidad", "especialidades", "procedimiento", "procedimientos",
]);

function normalizeText(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

function significantWords(text: string): string[] {
  return normalizeText(text)
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length >= 4 && !STOPWORDS.has(word));
}

interface CatalogMatch {
  kind: "procedimiento" | "especialidad";
  especialidad: Record<Lang, string>;
  nombre: Record<Lang, string>;
  desc?: Record<Lang, string>;
  exclusivo?: boolean;
}

interface CatalogIndexEntry {
  keywords: string[];
  match: CatalogMatch;
}

// Se arma una sola vez a partir de datos estáticos — no depende del idioma
// (indexa es/en juntos) ni cambia entre renders.
const catalogIndex: CatalogIndexEntry[] = (() => {
  const index: CatalogIndexEntry[] = [];

  for (const grupo of catalogoProcedimientos) {
    const especialidadKeywords = [...significantWords(grupo.especialidad.es), ...significantWords(grupo.especialidad.en)];

    if (grupo.procedimientos.length === 0) {
      // Especialidad todavía sin procedimientos confirmados (ver el
      // comentario en catalogoProcedimientos.ts) — igual es un resultado
      // válido: "sí tenemos esa especialidad", aunque no un procedimiento
      // puntual.
      index.push({
        keywords: especialidadKeywords,
        match: {
          kind: "especialidad",
          especialidad: grupo.especialidad,
          nombre: grupo.especialidad,
        },
      });
      continue;
    }

    for (const procedimiento of grupo.procedimientos) {
      index.push({
        keywords: [
          ...significantWords(procedimiento.es),
          ...significantWords(procedimiento.en),
          ...significantWords(procedimiento.titulo.es),
          ...significantWords(procedimiento.titulo.en),
          ...especialidadKeywords,
        ],
        match: {
          kind: "procedimiento",
          especialidad: grupo.especialidad,
          nombre: procedimiento.titulo,
          desc: procedimiento.desc,
          exclusivo: procedimiento.exclusivo,
        },
      });
    }
  }

  return index;
})();

// Cuenta cuántas palabras clave de cada entrada aparecen en lo que escribió
// el usuario y se queda con la de mayor coincidencia — así "cirugía" sólo
// (una palabra genérica) puede matchear varias entradas, pero "próstata" +
// "fusión" juntas apuntan directo al procedimiento correcto.
//
// La comparación es en ambos sentidos ("incluye" en cualquier dirección) y
// no sólo "la palabra completa del catálogo aparece tal cual en lo que
// escribió el usuario": alguien escribe formas cortas o con género/número
// distinto todo el tiempo ("cardio", "cirugías", "dermatólogo"), que nunca
// contienen la palabra completa del catálogo ("cardiologia",
// "cirugia", "dermatologia") pero sí están contenidas en ella (o al revés).
function findCatalogMatch(rawQuery: string): CatalogMatch | null {
  const queryWords = significantWords(rawQuery);
  if (queryWords.length === 0) return null;

  let best: CatalogMatch | null = null;
  let bestScore = 0;

  for (const entry of catalogIndex) {
    const uniqueKeywords = new Set(entry.keywords);
    let score = 0;
    for (const keyword of uniqueKeywords) {
      const matched = queryWords.some((word) => word.includes(keyword) || keyword.includes(word));
      if (matched) score++;
    }
    if (score > bestScore) {
      bestScore = score;
      best = entry.match;
    }
  }

  return best;
}

function buildCatalogResponse(match: CatalogMatch, isEn: boolean): { text: string; actions: ChatAction[] } {
  const lang: Lang = isEn ? "en" : "es";
  const especialidadNombre = match.especialidad[lang];

  if (match.kind === "procedimiento") {
    const nombre = match.nombre[lang];
    const desc = match.desc?.[lang] ?? "";
    const exclusivoNote = match.exclusivo
      ? isEn
        ? " This is a service only we offer in the region."
        : " Este es un servicio que sólo nosotros ofrecemos en la región."
      : "";

    return {
      text: isEn
        ? `Yes, we do offer ${nombre} (${especialidadNombre}). ${desc}${exclusivoNote}`
        : `Sí, contamos con ${nombre} (${especialidadNombre}). ${desc}${exclusivoNote}`,
      actions: [
        { label: isEn ? "📅 Book Appointment" : "📅 Agendar Cita", icon: "calendar", actionType: "cita" },
        {
          label: isEn ? "💬 Ask on WhatsApp" : "💬 Preguntar por WhatsApp",
          icon: "whatsapp",
          actionType: "whatsapp",
          payload: isEn
            ? `Hi, I'd like information about: ${nombre} (${especialidadNombre}).`
            : `Hola, quiero información sobre: ${nombre} (${especialidadNombre}).`,
        },
      ],
    };
  }

  return {
    text: isEn
      ? `We do have the ${especialidadNombre} specialty. We're still confirming which specific procedures to list — message us on WhatsApp and we'll tell you right away whether we cover what you need.`
      : `Sí contamos con la especialidad de ${especialidadNombre}. Todavía estamos confirmando qué procedimientos específicos publicar en la página — escríbenos por WhatsApp y te decimos al momento si cubrimos lo que necesitas.`,
    actions: [
      { label: isEn ? "📅 Book Appointment" : "📅 Agendar Cita", icon: "calendar", actionType: "cita" },
      {
        label: isEn ? "💬 Ask on WhatsApp" : "💬 Preguntar por WhatsApp",
        icon: "whatsapp",
        actionType: "whatsapp",
        payload: isEn
          ? `Hi, I'd like information about the ${especialidadNombre} specialty.`
          : `Hola, quiero información sobre la especialidad de ${especialidadNombre}.`,
      },
    ],
  };
}

// Nombres reales de los procedimientos de imagen/laboratorio (grupos
// "diagnostico-por-imagen" y "estudios-diagnosticos") — para la categoría de
// "estudios" más abajo, en vez de la lista fija que había antes.
function buildStudiesListResponse(isEn: boolean): { text: string; actions: ChatAction[] } {
  const lang: Lang = isEn ? "en" : "es";
  const nombres = catalogoProcedimientos
    .filter((grupo) => grupo.id === "diagnostico-por-imagen" || grupo.id === "estudios-diagnosticos")
    .flatMap((grupo) => grupo.procedimientos.map((p) => p.titulo[lang]));

  return {
    text: isEn
      ? `These are the imaging and diagnostic studies we offer: ${nombres.join(", ")}.`
      : `Estos son los estudios de imagen y diagnóstico con los que contamos: ${nombres.join(", ")}.`,
    actions: [
      { label: isEn ? "📅 Schedule Medical Study" : "📅 Agendar Estudio Médico", icon: "calendar", actionType: "cita" },
      {
        label: isEn ? "💬 Inquire preparation & costs" : "💬 Cotizar y preparación",
        icon: "whatsapp",
        actionType: "whatsapp",
        payload: isEn
          ? "Hi, I'd like information and pricing for an imaging/lab study."
          : "Hola, deseo información y costo de un estudio de imagen/laboratorio.",
      },
    ],
  };
}

// Lista completa y real de especialidades/áreas del catálogo (24 grupos) —
// para preguntas amplias como "¿qué servicios tienen?" que no nombran un
// procedimiento puntual, así que "findCatalogMatch" no encuentra nada
// específico. Antes esto caía en una respuesta genérica con una lista fija
// escrita a mano en el código, que quedaba desactualizada cada vez que se
// agregaba una especialidad nueva al catálogo — esta se arma siempre desde
// los datos reales.
function buildServiceListResponse(isEn: boolean): { text: string; actions: ChatAction[] } {
  const lang: Lang = isEn ? "en" : "es";
  const nombres = catalogoProcedimientos.map((grupo) => grupo.especialidad[lang]);

  return {
    text: isEn
      ? `These are all the specialties and services we offer: ${nombres.join(", ")}. Which one would you like more information about?`
      : `Estas son todas las especialidades y servicios con los que contamos: ${nombres.join(", ")}. ¿Sobre cuál te gustaría más información?`,
    actions: [
      { label: isEn ? "📅 Book Appointment" : "📅 Agendar Cita", icon: "calendar", actionType: "cita" },
      {
        label: isEn ? "💬 Ask on WhatsApp" : "💬 Preguntar por WhatsApp",
        icon: "whatsapp",
        actionType: "whatsapp",
        payload: isEn
          ? "Hi, I'd like to know more about your services and specialties."
          : "Hola, me gustaría saber más sobre sus servicios y especialidades.",
      },
    ],
  };
}

// Llama al endpoint de servidor (src/app/api/assistant/route.ts), que a su
// vez llama a Gemini con el contexto real del sitio como system prompt —
// null si falla (red, cuota agotada, etc.) para poder caer de vuelta al
// motor local basado en palabras clave ("processQuery") sin que el chat se
// quede sin responder.
async function askAssistant(
  message: string,
  lang: Lang,
  history: { role: "user" | "model"; text: string }[]
): Promise<string | null> {
  try {
    const response = await fetch("/api/assistant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, lang, history }),
    });
    if (!response.ok) return null;
    const data: { text?: string } = await response.json();
    return data.text?.trim() || null;
  } catch {
    return null;
  }
}

export function AssistantChatModal() {
  const { isOpen, close } = useAssistantModal();
  const { open: openCita } = useCitaModal();
  const { open: openEmergency } = useEmergencyModal();
  const { lang } = useLanguage();
  const isEn = lang === "en";

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mensaje de bienvenida inicial
  const getInitialMessages = (): ChatMessage[] => [
    {
      id: "welcome-1",
      sender: "bot",
      text: isEn
        ? "Hello! I'm Arbi, your virtual AI assistant at Hospital Arboledas. How can I help you today?"
        : "¡Hola! Soy Arbi, tu asistente virtual en Hospital Arboledas. ¿En qué te puedo orientar hoy con gusto?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      actions: [
        {
          label: isEn ? "📅 Book an appointment" : "📅 Agendar cita médica",
          icon: "calendar",
          actionType: "cita",
        },
        {
          label: isEn ? "🚨 24/7 Emergencies" : "🚨 Urgencias 24 horas",
          icon: "phone",
          actionType: "emergency",
        },
        {
          label: isEn ? "📍 Location & Directions" : "📍 Ubicación y cómo llegar",
          icon: "pin",
          actionType: "maps",
        },
      ],
    },
  ];

  // Inicializar o reiniciar mensajes al cambiar de idioma
  useEffect(() => {
    setMessages(getInitialMessages());
  }, [lang]);

  // Enfocar input al abrir
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        scrollToBottom();
      }, 150);
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Respuestas del motor conversacional
  const processQuery = (rawText: string): { text: string; actions?: ChatAction[] } => {
    const text = rawText.toLowerCase().trim();

    // 0. Match directo contra el catálogo real de especialidades/procedimientos
    // (ver "catalogIndex" arriba) — tiene prioridad sobre las categorías
    // genéricas de abajo: "necesito una biopsia de próstata" debe responder
    // con ESE procedimiento puntual, no con la respuesta genérica de
    // "cirugía" o "estudio".
    const catalogMatch = findCatalogMatch(rawText);
    if (catalogMatch) {
      return buildCatalogResponse(catalogMatch, isEn);
    }

    // 0.5. Pregunta amplia por "todos los servicios" sin nombrar uno en
    // concreto (no matcheó nada arriba) — se responde con el listado real
    // completo del catálogo en vez de caer directo en la respuesta genérica
    // de por defecto, que no menciona ningún servicio real.
    if (
      text.includes("servicio") ||
      text.includes("ofrece") ||
      text.includes("catalogo") ||
      text.includes("catálogo") ||
      text.includes("que tienen") ||
      text.includes("que manejan") ||
      text.includes("what do you") ||
      text.includes("what services")
    ) {
      return buildServiceListResponse(isEn);
    }

    // 1. Citas / Consultas / Agendar
    if (text.includes("cita") || text.includes("agendar") || text.includes("consulta") || text.includes("book") || text.includes("appointment")) {
      return {
        text: isEn
          ? "You can easily book your appointment online in less than 2 minutes. We also offer WhatsApp assistance."
          : "¡Con gusto! Puedes agendar tu consulta médica directamente en nuestro calendario digital o por WhatsApp con confirmación inmediata.",
        actions: [
          { label: isEn ? "Open Booking Calendar" : "📅 Abrir Agenda de Citas", icon: "calendar", actionType: "cita" },
          { label: isEn ? "Chat via WhatsApp" : "💬 Agendar por WhatsApp", icon: "whatsapp", actionType: "whatsapp", payload: "Hola, deseo agendar una consulta médica." },
        ],
      };
    }

    // 2. Urgencias / Emergencias
    if (text.includes("urgencia") || text.includes("emergencia") || text.includes("dolor") || text.includes("grave") || text.includes("emergency") || text.includes("urgent")) {
      return {
        text: isEn
          ? `🚨 We operate 24/7 Emergency Care with on-duty physicians, surgery suites, and imaging. Emergency hotline: ${contactoInfo.telefonoUrgencias} / ${contactoInfo.telefonoUrgencias2}`
          : `🚨 Nuestro servicio de Urgencias Médicas está activo las 24 horas, los 365 días del año. Contamos con médicos de guardia, quirófanos y tomografía/rayos X inmediatos. Teléfono directo: ${contactoInfo.telefonoUrgencias} / ${contactoInfo.telefonoUrgencias2}`,
        actions: [
          { label: isEn ? "Contact Emergency Hotline" : "🚨 Ver Contacto de Urgencias", icon: "phone", actionType: "emergency" },
          { label: isEn ? "WhatsApp Urgent Care" : "💬 WhatsApp Urgencias", icon: "whatsapp", actionType: "whatsapp", payload: "¡Hola! Tengo una urgencia médica en este momento." },
        ],
      };
    }

    // 3. Ubicación / Dirección / Cómo llegar
    if (text.includes("ubicacion") || text.includes("donde") || text.includes("dirección") || text.includes("direccion") || text.includes("llegar") || text.includes("mapa") || text.includes("location") || text.includes("where")) {
      return {
        text: isEn
          ? `📍 We are located at: ${contactoInfo.direccion}. Reference: ${contactoInfo.referencia.en}.`
          : `📍 Nos encontramos en: ${contactoInfo.direccion}.\n\nReferencia: ${contactoInfo.referencia.es}.`,
        actions: [
          { label: isEn ? "Open in Google Maps" : "📍 Ver en Google Maps", icon: "pin", actionType: "maps" },
          { label: isEn ? "WhatsApp for directions" : "💬 Pedir ubicación por WhatsApp", icon: "whatsapp", actionType: "whatsapp", payload: "Hola, ¿me podrían enviar su ubicación exacta?" },
        ],
      };
    }

    // 4. Especialidades / Oftalmología / Cardiología / Cirugía
    // (lista real y completa del catálogo — ver "buildServiceListResponse")
    if (text.includes("especialidad") || text.includes("oftalmo") || text.includes("ojo") || text.includes("cardio") || text.includes("cirugia") || text.includes("cirugía") || text.includes("medico") || text.includes("doctor") || text.includes("specialt")) {
      return buildServiceListResponse(isEn);
    }

    // 5. Estudios / Imagenología / Rayos X / Laboratorio / Tomografía / Mastografía
    // (lista real de estudios — ver "buildStudiesListResponse")
    if (text.includes("estudio") || text.includes("imagen") || text.includes("rayos") || text.includes("tomografia") || text.includes("tomografía") || text.includes("ultrasonido") || text.includes("laboratorio") || text.includes("mastografia") || text.includes("analisis")) {
      return buildStudiesListResponse(isEn);
    }

    // 6. Horarios / Horario
    if (text.includes("horario") || text.includes("abierto") || text.includes("hora") || text.includes("hours") || text.includes("schedule")) {
      return {
        text: isEn
          ? "⏰ Operating Hours:\n• Urgencias 24/7 (365 days a year)\n• External Consultations & Studies: Monday to Saturday 8:00 AM - 8:00 PM."
          : "⏰ Horarios de Atención:\n• Urgencias y Hospitalización: 24 horas / 365 días.\n• Consulta Externa y Estudios: Lunes a Sábado de 8:00 AM a 8:00 PM.",
        actions: [
          { label: isEn ? "Book Appointment" : "📅 Agendar Cita", icon: "calendar", actionType: "cita" },
          { label: isEn ? "Contact Hotline" : "📞 Llamar al Hospital", icon: "phone", actionType: "emergency" },
        ],
      };
    }

    // 7. Seguros / Aseguradoras / Convenios / Facturación / Costos / Precio
    if (text.includes("seguro") || text.includes("aseguradora") || text.includes("convenio") || text.includes("precio") || text.includes("costo") || text.includes("factura") || text.includes("insurance") || text.includes("cost")) {
      return {
        text: isEn
          ? "We accept major health insurance providers (GNP, MetLife, AXA, Seguros Monterrey, Banorte, Mapfre, etc.) for direct and reimbursement coverage."
          : "Trabajamos en convenio con las principales aseguradoras (GNP, MetLife, AXA, Seguros Monterrey, Banorte, Mapfre, entre otras) para pago directo y reembolso de gastos médicos.",
        actions: [
          { label: isEn ? "Inquire on coverage" : "💬 Consultar mi Aseguradora", icon: "whatsapp", actionType: "whatsapp", payload: "Hola, me gustaría verificar si tienen convenio con mi aseguradora." },
        ],
      };
    }

    // 8. Saludos / Gracias
    if (text.includes("hola") || text.includes("buenos") || text.includes("buenas") || text.includes("gracias") || text.includes("hello") || text.includes("hi") || text.includes("thanks")) {
      return {
        text: isEn
          ? "You're very welcome! Is there anything else about our doctors, procedures, or appointments I can help you with?"
          : "¡Con muchísimo gusto! ¿Hay algo más sobre nuestros médicos, estudios o citas en lo que te pueda apoyar?",
        actions: [
          { label: isEn ? "📅 Book an appointment" : "📅 Agendar consulta médica", icon: "calendar", actionType: "cita" },
          { label: isEn ? "📍 Location" : "📍 Ver ubicación", icon: "pin", actionType: "maps" },
        ],
      };
    }

    // Respuesta por defecto orientativa
    return {
      text: isEn
        ? "I can help you with appointments, 24/7 emergency care, medical specialties, imaging studies, and insurance info. You can also chat directly with our reception desk on WhatsApp."
        : "Te puedo orientar sobre agendar citas, urgencias 24 hrs, especialidades (oftalmología, cardiología, cirugía), estudios de imagenología o convenios con aseguradoras. ¿Qué información necesitas?",
      actions: [
        { label: isEn ? "📅 Book an appointment" : "📅 Agendar Cita", icon: "calendar", actionType: "cita" },
        { label: isEn ? "🚨 24/7 Emergencies" : "🚨 Urgencias 24h", icon: "phone", actionType: "emergency" },
        { label: isEn ? "💬 WhatsApp Reception" : "💬 Chat Recepción WhatsApp", icon: "whatsapp", actionType: "whatsapp", payload: "Hola, tengo una duda sobre sus servicios hospitalarios." },
      ],
    };
  };

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isTyping) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    // Historial para que Gemini mantenga contexto de turnos anteriores —
    // se arma ANTES de agregar el mensaje nuevo (ese va aparte, como
    // "message" en la llamada a la API).
    const history = messages.map((msg) => ({
      role: (msg.sender === "user" ? "user" : "model") as "user" | "model",
      text: msg.text,
    }));

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    (async () => {
      const lang: Lang = isEn ? "en" : "es";
      // Arbi real (Gemini + contexto del sitio, ver askAssistant) primero;
      // si falla — sin conexión, cuota agotada, la API no está configurada —
      // cae al motor local por palabras clave ("processQuery") en vez de
      // dejar al usuario sin respuesta.
      const aiText = await askAssistant(query, lang, history);

      const response = aiText
        ? {
            text: aiText,
            actions: [
              { label: isEn ? "📅 Book Appointment" : "📅 Agendar Cita", icon: "calendar" as const, actionType: "cita" as const },
              {
                label: isEn ? "💬 Ask on WhatsApp" : "💬 Preguntar por WhatsApp",
                icon: "whatsapp" as const,
                actionType: "whatsapp" as const,
                payload: isEn ? `Hi, I'd like more information: ${query}` : `Hola, quiero más información: ${query}`,
              },
            ],
          }
        : processQuery(query);

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        actions: response.actions,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    })();
  };

  const handleActionClick = (action: ChatAction) => {
    if (action.actionType === "cita") {
      openCita();
    } else if (action.actionType === "emergency") {
      openEmergency();
    } else if (action.actionType === "whatsapp") {
      const msg = action.payload || "Hola, me gustaría solicitar información sobre sus servicios médicos.";
      window.open(`${contactoInfo.whatsappHref}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
    } else if (action.actionType === "maps") {
      window.open(mapsDirectionsHref, "_blank", "noopener,noreferrer");
    }
  };

  const handleReset = () => {
    setMessages(getInitialMessages());
    setInput("");
  };

  const quickChips = [
    { label: isEn ? "📅 Book appointment" : "📅 Agendar cita", query: "Quiero agendar una cita médica" },
    { label: isEn ? "🚨 24/7 Emergencies" : "🚨 Urgencias 24h", query: "Información de urgencias 24 horas" },
    { label: isEn ? "👁️ Specialties" : "👁️ Especialidades", query: "¿Qué especialidades médicas tienen?" },
    { label: isEn ? "🔬 Studies & Imaging" : "🔬 Estudios de imagen", query: "Estudios de rayos X, ultrasonido y tomografía" },
    { label: isEn ? "📍 Location" : "📍 Ubicación", query: "¿Dónde están ubicados y cómo llego?" },
    { label: isEn ? "💳 Insurance" : "💳 Aseguradoras", query: "¿Aceptan seguros de gastos médicos?" },
  ];

  if (!isOpen) return null;

  return (
    <div className="assistant-chat-backdrop" onClick={close}>
      <div
        className="assistant-chat-window"
        role="dialog"
        aria-label={isEn ? "Hospital Receptionist Virtual Assistant" : "Recepcionista Virtual Hospital Arboledas"}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Encabezado del Asistente */}
        <div className="assistant-chat-header">
          <div className="assistant-profile">
            <div className="assistant-avatar-wrap assistant-avatar-bot-wrap">
              <Icon name="bot" strokeWidth={2} />
              <span className="assistant-status-dot" title="En línea 24/7" />
            </div>

            <div className="assistant-profile-text">
              <div className="assistant-name-badge">
                <strong className="assistant-name">Arbi</strong>
                <span className="assistant-tag">Asistente AI 24/7</span>
              </div>
              <span className="assistant-status-text">
                <span className="assistant-live-pulse" />
                {isEn ? "Online · AI Medical Assistant" : "En línea · Asistente Médico 24/7"}
              </span>
            </div>
          </div>

          <div className="assistant-header-actions">
            <button
              type="button"
              className="assistant-header-btn"
              onClick={handleReset}
              title={isEn ? "Restart chat" : "Reiniciar conversación"}
              aria-label={isEn ? "Restart chat" : "Reiniciar conversación"}
            >
              <Icon name="rotate-ccw" strokeWidth={2} />
            </button>
            <button
              type="button"
              className="assistant-header-btn assistant-header-close"
              onClick={close}
              title={isEn ? "Close" : "Cerrar"}
              aria-label={isEn ? "Close" : "Cerrar"}
            >
              <Icon name="x" strokeWidth={2.2} />
            </button>
          </div>
        </div>

        {/* Cuerpo de Mensajes */}
        <div className="assistant-chat-body">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn("assistant-msg-row", msg.sender === "user" ? "assistant-msg-user" : "assistant-msg-bot")}
            >
              {msg.sender === "bot" && (
                <div className="assistant-msg-avatar assistant-bot-avatar-badge">
                  <Icon name="bot" strokeWidth={2} />
                </div>
              )}

              <div className="assistant-msg-content">
                <div className="assistant-msg-bubble">
                  <p className="assistant-msg-text">{msg.text}</p>
                </div>

                {/* Botones de acción interactivos */}
                {msg.actions && msg.actions.length > 0 && (
                  <div className="assistant-msg-actions">
                    {msg.actions.map((act, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className="assistant-action-chip"
                        onClick={() => handleActionClick(act)}
                      >
                        <Icon name={act.icon} strokeWidth={2} />
                        <span>{act.label}</span>
                      </button>
                    ))}
                  </div>
                )}

                <span className="assistant-msg-time">{msg.timestamp}</span>
              </div>
            </div>
          ))}

          {/* Indicador de tipeo */}
          {isTyping && (
            <div className="assistant-msg-row assistant-msg-bot">
              <div className="assistant-msg-avatar assistant-bot-avatar-badge">
                <Icon name="bot" strokeWidth={2} />
              </div>
              <div className="assistant-msg-bubble assistant-typing-bubble">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Chips de acceso rápido */}
        <div className="assistant-quick-chips">
          {quickChips.map((chip, i) => (
            <button
              key={i}
              type="button"
              className="assistant-quick-chip"
              onClick={() => handleSend(chip.query)}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Entrada de texto */}
        <form
          className="assistant-chat-input-area"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <input
            ref={inputRef}
            type="text"
            className="assistant-input-field"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isEn ? "Type your question here..." : "Escribe tu duda o pregunta aquí..."}
            disabled={isTyping}
          />
          <button
            type="submit"
            className="assistant-send-btn"
            disabled={!input.trim() || isTyping}
            aria-label={isEn ? "Send message" : "Enviar mensaje"}
          >
            <Icon name="send" strokeWidth={2.2} />
          </button>
        </form>
      </div>
    </div>
  );
}
