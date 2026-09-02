import { cn } from "@/shared/lib/utils";

interface EcgDividerProps {
  // Versión chica para ir al lado de un título (ej. SectionHead) en vez de
  // como separador de ancho completo entre secciones.
  inline?: boolean;
}

export function EcgDivider({ inline }: EcgDividerProps = {}) {
  return (
    <div className={cn("ecg-divider", inline && "ecg-divider-inline")} aria-hidden="true">
      <svg viewBox="0 0 600 60" preserveAspectRatio="none" aria-hidden="true">
        <path className="ecg-path" d="M0,30 L210,30 L228,8 L246,52 L264,20 L282,30 L600,30" />
      </svg>
    </div>
  );
}