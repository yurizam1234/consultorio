"use client";

interface PreguntaItemProps {
  pregunta: string;
  respuesta: string;
  defaultOpen?: boolean;
}

export function PreguntaItem({
  pregunta,
  respuesta,
  defaultOpen = false,
}: PreguntaItemProps) {
  return (
    <details open={defaultOpen}>
      <summary>{pregunta}</summary>
      <p>{respuesta}</p>
    </details>
  );
}