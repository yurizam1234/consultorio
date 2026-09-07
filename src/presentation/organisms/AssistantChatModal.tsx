"use client";

import { useState, useEffect, useRef } from "react";
import { Icon } from "@/presentation/atoms/Icon";
import { useAssistantModal } from "@/presentation/hooks/useAssistantModal";
import { useCitaModal } from "@/presentation/hooks/useCitaModal";
import { useEmergencyModal } from "@/presentation/hooks/useEmergencyModal";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { contactoInfo, mapsDirectionsHref } from "@/shared/data/contacto";
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
    if (text.includes("especialidad") || text.includes("oftalmo") || text.includes("ojo") || text.includes("cardio") || text.includes("cirugia") || text.includes("cirugía") || text.includes("medico") || text.includes("doctor") || text.includes("specialt")) {
      return {
        text: isEn
          ? "We have certified specialists in Ophthalmology (cataracts, retina, laser), Cardiology, Pain Medicine, Imaging & Ultrasound, Clinical Laboratory, and General Surgery."
          : "Contamos con especialistas certificados en Oftalmología (catarata, retina, láser y consulta general), Cardiología, Medicina del Dolor, Imagenología (Tomografía, Mastografía, Ultrasonido, Rayos X), Laboratorio Clínico y Cirugía General.",
        actions: [
          { label: isEn ? "Book with Specialist" : "📅 Agendar con Especialista", icon: "calendar", actionType: "cita" },
          { label: isEn ? "Inquire on WhatsApp" : "💬 Preguntar por Especialidad", icon: "whatsapp", actionType: "whatsapp", payload: "Hola, me gustaría información sobre sus especialistas médicos." },
        ],
      };
    }

    // 5. Estudios / Imagenología / Rayos X / Laboratorio / Tomografía / Mastografía
    if (text.includes("estudio") || text.includes("imagen") || text.includes("rayos") || text.includes("tomografia") || text.includes("tomografía") || text.includes("ultrasonido") || text.includes("laboratorio") || text.includes("mastografia") || text.includes("analisis")) {
      return {
        text: isEn
          ? "Our imaging center offers Computed Tomography (CT), Digital X-Ray, High-Resolution Ultrasound, Digital Mammography, and full Clinical Laboratory testing."
          : "Disponemos de Tomografía Computarizada, Rayos X Digitales, Ultrasonido de Alta Definición, Mastografía Digital y Laboratorio Clínico completo con entrega rápida de resultados.",
        actions: [
          { label: isEn ? "Schedule Medical Study" : "📅 Agendar Estudio Médico", icon: "calendar", actionType: "cita" },
          { label: isEn ? "Inquire preparation & costs" : "💬 Cotizar y preparación", icon: "whatsapp", actionType: "whatsapp", payload: "Hola, deseo información y costo de un estudio de imagen/laboratorio." },
        ],
      };
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

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simular tiempo de respuesta natural
    setTimeout(() => {
      const response = processQuery(query);
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        actions: response.actions,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 600);
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
