"use client";

import { cn } from "@/shared/lib/utils";

interface EspecialidadTabProps {
  key: string;
  label: string;
  isSelected: boolean;
  onSelect: (key: string) => void;
}

export function EspecialidadTab({
  key,
  label,
  isSelected,
  onSelect,
}: EspecialidadTabProps) {
  return (
    <button
      className={cn("tab", isSelected && "active")}
      role="tab"
      aria-selected={isSelected}
      data-k={key}
      onClick={() => onSelect(key)}
    >
      {label}
    </button>
  );
}