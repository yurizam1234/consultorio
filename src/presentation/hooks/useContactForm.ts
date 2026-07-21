"use client";

import { useState, type FormEvent } from "react";
import { container } from "@/infrastructure/container";

export function useContactForm() {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    await container.enviarMensaje.execute({ nombre, telefono, mensaje });
    setStatus("success");
    setNombre("");
    setTelefono("");
    setMensaje("");
    setTimeout(() => setStatus("idle"), 3200);
  }

  return {
    nombre,
    setNombre,
    telefono,
    setTelefono,
    mensaje,
    setMensaje,
    status,
    handleSubmit,
  };
}
