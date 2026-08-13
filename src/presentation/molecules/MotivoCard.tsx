"use client";

import { cn } from "@/shared/lib/utils";
import { ESPECIALIDADES } from "@/shared/data/especialidades";

interface MotivoCardProps {
  numero: string;
  titulo: string;
  descripcion: string;
  especialidadKey: string;
  onSelect: (key: string) => void;
  className?: string;
}

export function MotivoCard({
  numero,
  titulo,
  descripcion,
  especialidadKey,
  onSelect,
  className,
}: MotivoCardProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onSelect(especialidadKey);
  };

  // Nombre real de la especialidad destino (ej. "Oftalmología"), no la
  // primera palabra del título de la tarjeta — antes decía cosas como
  // "Ir a Veo →" porque tomaba la primera palabra de "Veo borroso o me
  // cansa la vista".
  const nombreEspecialidad = ESPECIALIDADES[especialidadKey]?.n ?? titulo;

  return (
    <a
      href={`#${especialidadKey}`}
      onClick={handleClick}
      className={cn("motivo", className)}
    >
      <span className="n">{numero}</span>
      <h3>{titulo}</h3>
      <p>{descripcion}</p>
      <span className="ir">Ir a {nombreEspecialidad} →</span>
    </a>
  );
}