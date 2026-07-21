import type { Instalacion } from "@/shared/data/instalaciones";

interface DiagonalPanelItemProps {
  instalacion: Instalacion;
}

export function DiagonalPanelItem({ instalacion }: DiagonalPanelItemProps) {
  return (
    <div className="diagonal-panel">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={instalacion.img} alt={instalacion.title} loading="lazy" />
      <div className="diagonal-panel-content">
        <span className="panel-num">{instalacion.num}</span>
        <h3>{instalacion.title}</h3>
        <p>{instalacion.desc}</p>
        <span className="tag">{instalacion.tag}</span>
      </div>
    </div>
  );
}
