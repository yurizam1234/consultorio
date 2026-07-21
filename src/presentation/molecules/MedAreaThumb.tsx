"use client";

import type { AreaMedica } from "@/shared/data/areasMedicas";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { cn } from "@/shared/lib/utils";

interface MedAreaThumbProps {
  area: AreaMedica;
  active: boolean;
  onClick: () => void;
}

export function MedAreaThumb({ area, active, onClick }: MedAreaThumbProps) {
  const { lang } = useLanguage();
  const title = area.title[lang];

  return (
    <button className={cn("med-thumb", active && "active")} aria-label={title} onClick={onClick}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={area.img} alt={title} loading="lazy" />
    </button>
  );
}
