import { NextResponse } from "next/server";
import { catalogoProcedimientos } from "@/shared/data/catalogoProcedimientos";
import { doctores } from "@/shared/data/doctores";
import { CONVENIOS } from "@/shared/data/convenios";
import { contactoInfo } from "@/shared/data/contacto";

// Ruta de servidor a propósito: GEMINI_API_KEY vive sólo en el entorno del
// servidor (.env.local, sin prefijo NEXT_PUBLIC_) — si el fetch a Gemini se
// hiciera directo desde AssistantChatModal.tsx ("use client"), la key
// quedaría incluida en el bundle de JS que se manda al navegador, visible
// para cualquier visitante del sitio.
const GEMINI_MODEL = "gemini-3.6-flash";

// Arma, a partir de los datos reales del sitio (el mismo catálogo que usa
// /procedimientos, los médicos de /equipo, las aseguradoras de /convenios),
// el contexto que se le pasa a Gemini como "verdad" — así el modelo no
// puede inventar servicios/médicos/precios que no existen: sólo tiene el
// texto de abajo para trabajar.
function buildContextoSitio(): string {
  const especialidades = catalogoProcedimientos
    .map((grupo) => {
      const procedimientos = grupo.procedimientos.length
        ? grupo.procedimientos
            .map((p) => `${p.titulo.es}${p.exclusivo ? " (único en la región)" : ""}: ${p.desc.es}`)
            .join(" | ")
        : "todavía sin procedimientos confirmados para publicar — la especialidad existe, pero hay que confirmar con el hospital qué se ofrece exactamente";
      return `- ${grupo.especialidad.es}: ${procedimientos}`;
    })
    .join("\n");

  const medicos = doctores
    .filter((doctor) => doctor.name && doctor.specialty)
    .map((doctor) => `- ${doctor.name} — ${doctor.specialty!.es}`)
    .join("\n");

  const aseguradoras = CONVENIOS.map((convenio) => convenio.nombre).join(", ");

  return `
Nombre del hospital: ${contactoInfo.nombreHospital}
Dirección: ${contactoInfo.direccion} (${contactoInfo.referencia.es})
Teléfono de urgencias: ${contactoInfo.telefonoUrgencias} / ${contactoInfo.telefonoUrgencias2}
WhatsApp: ${contactoInfo.whatsappHref}
Correo: ${contactoInfo.email}
Horario: Urgencias y Hospitalización, 24 horas los 365 días del año. Consulta externa y estudios, de Lunes a Sábado de 8:00 AM a 8:00 PM.

Especialidades y procedimientos ofrecidos:
${especialidades}

Médicos del hospital:
${medicos}

Aseguradoras con las que se tiene convenio: ${aseguradoras}
`.trim();
}

function buildSystemInstruction(lang: "es" | "en"): string {
  const contexto = buildContextoSitio();

  return `
Eres "Arbi", el asistente virtual del sitio web de ${contactoInfo.nombreHospital}. SOLO puedes responder con información basada en los datos reales del hospital listados abajo. No inventes servicios, médicos, precios, horarios ni disponibilidad que no aparezcan ahí.

Reglas estrictas:
1. Responde ÚNICAMENTE sobre temas de este hospital: sus especialidades, procedimientos, médicos, ubicación, horarios, aseguradoras, o cómo agendar cita/contactar. No respondas preguntas de cultura general, de otros temas ajenos al hospital, ni des consejo médico o diagnóstico personal — para eso, invita a agendar una consulta con un médico.
2. Si preguntan por algo que NO aparece en los datos de abajo (un servicio, especialidad o médico que no está listado), dilo con honestidad ("no tengo esa información confirmada" / "no encuentro eso en nuestro catálogo") y sugiere escribir por WhatsApp para confirmar directo con el hospital — nunca inventes que sí existe.
3. Sé breve y claro (máximo 2-4 oraciones), en tono cálido y profesional, como una recepcionista.
4. Responde siempre en ${lang === "en" ? "inglés" : "español"}, sin importar en qué idioma esté escrito este system prompt.
5. Si la pregunta no tiene nada que ver con el hospital (temas ajenos, otras empresas, preguntas generales sin relación), redirige amablemente la conversación hacia cómo puedes ayudar con información del hospital.

=== DATOS REALES DEL HOSPITAL ===
${contexto}
=== FIN DE LOS DATOS ===
`.trim();
}

interface HistoryTurn {
  role: "user" | "model";
  text: string;
}

interface AssistantRequestBody {
  message?: string;
  lang?: "es" | "en";
  history?: HistoryTurn[];
}

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Assistant not configured" }, { status: 500 });
  }

  let body: AssistantRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const message = body.message?.trim();
  if (!message) {
    return NextResponse.json({ error: "Missing message" }, { status: 400 });
  }

  const lang: "es" | "en" = body.lang === "en" ? "en" : "es";
  // Sólo los últimos turnos: no hace falta mandar todo el historial completo
  // en cada request (costo/latencia) para que el modelo mantenga contexto.
  const history = Array.isArray(body.history) ? body.history.slice(-10) : [];

  const contents = [
    ...history.map((turn) => ({ role: turn.role, parts: [{ text: turn.text }] })),
    { role: "user", parts: [{ text: message }] },
  ];

  const requestBody = JSON.stringify({
    system_instruction: { parts: [{ text: buildSystemInstruction(lang) }] },
    contents,
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: 500,
      // gemini-3.6-flash razona internamente antes de responder por
      // defecto — sin esto, ese "pensamiento" se comía casi todo
      // maxOutputTokens (visto en pruebas: 380 de 400) y la respuesta
      // visible salía cortada a media frase. No hace falta razonamiento
      // profundo para un asistente acotado a datos fijos del hospital.
      thinkingConfig: { thinkingBudget: 0 },
    },
  });

  try {
    // Gemini a veces devuelve 503 "high demand" de forma transitoria — un
    // solo reintento corto resuelve la mayoría de esos casos sin que el
    // usuario note nada.
    let geminiResponse: Response | null = null;
    let lastErrText = "";
    for (let attempt = 0; attempt < 2; attempt++) {
      geminiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: requestBody,
        }
      );
      if (geminiResponse.ok) break;
      lastErrText = await geminiResponse.text();
      console.error("Gemini API error:", geminiResponse.status, lastErrText);
      if (geminiResponse.status !== 503 || attempt === 1) break;
      await new Promise((resolve) => setTimeout(resolve, 800));
    }

    if (!geminiResponse || !geminiResponse.ok) {
      return NextResponse.json({ error: "Assistant request failed" }, { status: 502 });
    }

    const data = await geminiResponse.json();
    const text: string =
      data?.candidates?.[0]?.content?.parts
        ?.map((part: { text?: string }) => part.text ?? "")
        .join("") ?? "";

    if (!text.trim()) {
      return NextResponse.json({ error: "Empty response" }, { status: 502 });
    }

    return NextResponse.json({ text: text.trim() });
  } catch (err) {
    console.error("Gemini API request failed:", err);
    return NextResponse.json({ error: "Assistant request failed" }, { status: 502 });
  }
}
