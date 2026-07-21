"use client";

import type { AreaMedica } from "@/shared/data/areasMedicas";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { cn } from "@/shared/lib/utils";

interface MedAreaSlideProps {
  area: AreaMedica;
  active: boolean;
}

export function MedAreaSlide({ area, active }: MedAreaSlideProps) {
  const { lang } = useLanguage();

  return (
    <div className={cn("med-hero-slide", active && "active")}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={area.img} alt={area.title[lang]} loading="lazy" />
    </div>
  );
}
