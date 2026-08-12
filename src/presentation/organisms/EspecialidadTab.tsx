"use client";

import { cn } from "@/shared/lib/utils";

interface EspecialidadTabProps {
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