import type { AreaMedica } from "@/shared/data/areasMedicas";
import { cn } from "@/shared/lib/utils";

interface MedAreaSlideProps {
  area: AreaMedica;
  active: boolean;
}

export function MedAreaSlide({ area, active }: MedAreaSlideProps) {
  return (
    <div className={cn("med-hero-slide", active && "active")}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={area.img} alt={area.title} loading="lazy" />
    </div>
  );
}
