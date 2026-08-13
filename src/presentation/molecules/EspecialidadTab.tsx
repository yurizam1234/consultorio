"use client";

import { cn } from "@/shared/lib/utils";

interface EspecialidadTabProps {
  // "key" es una prop reservada de React (nunca llega al componente, la usa
  // React para reconciliar la lista) — por eso el valor real viaja aparte,
  // en esta prop con nombre propio.
  especialidadKey: string;
  label: string;
  isSelected: boolean;
  onSelect: (key: string) => void;
}

export function EspecialidadTab({
  especialidadKey,
  label,
  isSelected,
  onSelect,
}: EspecialidadTabProps) {
  return (
    <button
      className={cn("tab", isSelected && "active")}
      role="tab"
      aria-selected={isSelected}
      data-k={especialidadKey}
      onClick={() => onSelect(especialidadKey)}
    >
      {label}
    </button>
  );
}