"use client";

interface ProcedimientoItemProps {
  nombre: string;
  tag?: string;
}

export function ProcedimientoItem({ nombre, tag }: ProcedimientoItemProps) {
  return (
    <li>
      {nombre}
      {tag && <span>{tag}</span>}
    </li>
  );
}