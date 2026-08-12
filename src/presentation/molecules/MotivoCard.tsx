"use client";

import { cn } from "@/shared/lib/utils";

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

  return (
    <a
      href={`#${especialidadKey}`}
      onClick={handleClick}
      className={cn("motivo", className)}
    >
      <span className="n">{numero}</span>
      <h3>{titulo}</h3>
      <p>{descripcion}</p>
      <span className="ir">Ir a {titulo.split(" ")[0]} →</span>
    </a>
  );
}