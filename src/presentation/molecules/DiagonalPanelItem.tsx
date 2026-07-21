"use client";

import type { Instalacion } from "@/shared/data/instalaciones";
import { useLanguage } from "@/presentation/hooks/useLanguage";

interface DiagonalPanelItemProps {
  instalacion: Instalacion;
}

export function DiagonalPanelItem({ instalacion }: DiagonalPanelItemProps) {
  const { lang } = useLanguage();

  return (
    <div className="diagonal-panel">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={instalacion.img} alt={instalacion.title[lang]} loading="lazy" />
      <div className="diagonal-panel-content">
        <span className="panel-num">{instalacion.num}</span>
        <h3>{instalacion.title[lang]}</h3>
        <p>{instalacion.desc[lang]}</p>
        <span className="tag">{instalacion.tag[lang]}</span>
      </div>
    </div>
  );
}
