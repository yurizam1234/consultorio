"use client";

import { useState, type FormEvent } from "react";
import { container } from "@/infrastructure/container";
import { serviciosAgenda } from "@/shared/data/serviciosAgenda";

export function useEncuestaForm() {
  const [servicio, setServicio] = useState(serviciosAgenda[0].nombre);
  const [calificacion, setCalificacion] = useState(0);
  const [comentario, setComentario] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    await container.enviarEncuesta.execute({ servicio, calificacion, comentario });
    setStatus("success");
    setCalificacion(0);
    setComentario("");
    setTimeout(() => setStatus("idle"), 3200);
  }

  return {
    servicio,
    setServicio,
    calificacion,
    setCalificacion,
    comentario,
    setComentario,
    status,
    handleSubmit,
  };
}
