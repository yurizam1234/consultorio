"use client";

import { cn } from "@/shared/lib/utils";

interface MedicoCardProps {
  nombre: string;
  especialidad: string;
  cedula: string;
  className?: string;
}

export function MedicoCard({
  nombre,
  especialidad,
  cedula,
  className,
}: MedicoCardProps) {
  return (
    <div className={cn("medico", className)}>
      <div className="slot">
        Retrato
        <span>INSERTAR AQUÍ — Foto vertical, fondo neutro, bata institucional.</span>
      </div>
      <div className="txt">
        <h4>{nombre}</h4>
        <p className="esp">{especialidad}</p>
        <p className="ced">{cedula}</p>
      </div>
    </div>
  );
}