"use client";

import type { Instalacion } from "@/shared/data/instalaciones";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { Icon } from "@/presentation/atoms/Icon";

interface DiagonalPanelItemProps {
  instalacion: Instalacion;
  onOpenGaleria: (instalacion: Instalacion) => void;
}

export function DiagonalPanelItem({ instalacion, onOpenGaleria }: DiagonalPanelItemProps) {
  const { lang, t } = useLanguage();
  const tieneGaleria = instalacion.galeria.length > 0;

  return (
    <div className="diagonal-panel">
      {instalacion.img ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={instalacion.img} alt={instalacion.title[lang]} loading="lazy" />
      ) : (
        <div className="diagonal-panel-placeholder">
          <Icon name="shield-check" strokeWidth={1.6} />
        </div>
      )}
      <div className="diagonal-panel-content">
        <span className="panel-num">{instalacion.num}</span>
        <h3>{instalacion.title[lang]}</h3>
        <p>{instalacion.desc[lang]}</p>
        <span className="tag">{instalacion.tag[lang]}</span>
        {tieneGaleria && (
          <button type="button" className="ver-mas-btn" onClick={() => onOpenGaleria(instalacion)}>
            {t("instalaciones.ver_mas")}
          </button>
        )}
      </div>
    </div>
  );
}
