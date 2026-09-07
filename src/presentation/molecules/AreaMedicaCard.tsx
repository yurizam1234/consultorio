"use client";

import { forwardRef } from "react";
import Image from "next/image";
import type { AreaMedica } from "@/shared/data/areasMedicas";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { Icon } from "@/presentation/atoms/Icon";
import { cn } from "@/shared/lib/utils";

interface AreaMedicaCardProps {
  area: AreaMedica;
  index?: number;
  total?: number;
  isActive?: boolean;
  decorative?: boolean;
  onSelectEspecialidad: (key: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const AreaMedicaCard = forwardRef<HTMLElement, AreaMedicaCardProps>(function AreaMedicaCard(
  { area, index, total, isActive, decorative, className, style },
  ref
) {
  const { lang, t } = useLanguage();

  const displayIndex = index !== undefined ? String(index + 1).padStart(2, "0") : undefined;
  const displayTotal = total !== undefined ? String(total).padStart(2, "0") : undefined;

  return (
    <article
      ref={ref}
      className={cn("servicio-fullscreen-card", isActive && "is-active", className)}
      style={style}
      aria-hidden={decorative || undefined}
      inert={decorative || undefined}
    >
      {/* 1. Imagen 100% Width y 100% Height de toda la Card y Sección */}
      <div className="servicio-fullscreen-img-wrap">
        <Image
          src={area.img}
          alt={area.title[lang]}
          fill
          priority={index === 0 || index === 1}
          sizes="100vw"
          className="servicio-fullscreen-img"
          unoptimized
        />
        {/* Scrim cinematográfico multicapa para contraste y legibilidad total */}
        <div className="servicio-fullscreen-scrim" />
        <div className="servicio-fullscreen-vignette" />
      </div>

      {/* 2. Contenido Flotante Centrado en el Grid Wrap */}
      <div className="servicio-fullscreen-inner wrap">
        {/* Todo el texto vive junto abajo: categoría + contador, título,
            descripción y estado, en vez de repartido entre arriba y abajo. */}
        <div className="servicio-fullscreen-bottom">
          <div className="servicio-fullscreen-top">
            <div className="servicio-pill-tag">
              <span className="servicio-pulse-dot" aria-hidden="true" />
              <span>{area.tagline[lang]}</span>
            </div>

            {displayIndex && displayTotal && (
              <div className="servicio-counter-badge">
                <span>{displayIndex}</span>
                <span className="servicio-counter-divider">/</span>
                <span>{displayTotal}</span>
              </div>
            )}
          </div>

          <div className="servicio-title-group">
            <h3 className="servicio-fullscreen-title">{area.title[lang]}</h3>
            <p className="servicio-fullscreen-desc">{area.desc[lang]}</p>
          </div>

          <div className="servicio-actions-row">
            {area.comingSoon && (
              <span className="servicio-coming-badge">
                <Icon name="sparkles" strokeWidth={2} />
                {t("areas.coming_soon_badge")}
              </span>
            )}

            <div className="servicio-status-tag">
              <span className="servicio-status-dot" />
              <span>
                {area.title.es.includes("Urgencias")
                  ? "Atención médica continua 24 horas"
                  : "Especialistas certificados en turno"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
});
