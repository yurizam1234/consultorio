import type { AreaMedica } from "@/shared/data/areasMedicas";
import { cn } from "@/shared/lib/utils";

interface MedAreaThumbProps {
  area: AreaMedica;
  active: boolean;
  onClick: () => void;
}

export function MedAreaThumb({ area, active, onClick }: MedAreaThumbProps) {
  return (
    <button className={cn("med-thumb", active && "active")} aria-label={area.title} onClick={onClick}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={area.img} alt={area.title} loading="lazy" />
    </button>
  );
}
