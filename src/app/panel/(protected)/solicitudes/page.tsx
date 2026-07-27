"use client";

import type { LucideIcon } from "lucide-react";
import { Waves, ScanLine, ClipboardList, Stethoscope, Inbox } from "lucide-react";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { useSolicitudes } from "@/presentation/hooks/useSolicitudes";
import type { SolicitudArea, SolicitudEstado } from "@/shared/data/solicitudesMock";
import { cn } from "@/shared/lib/utils";

const areaIcons: Record<SolicitudArea, LucideIcon> = {
  resonancia: Waves,
  tomografia: ScanLine,
  general: ClipboardList,
  consulta: Stethoscope,
};

const estadoKey: Record<SolicitudEstado, string> = {
  confirmada: "panel.solicitudes.estado.confirmada",
  completada: "panel.solicitudes.estado.completada",
  cancelada: "panel.solicitudes.estado.cancelada",
};

export default function PanelSolicitudesPage() {
  const { t } = useLanguage();
  const { solicitudes } = useSolicitudes();

  return (
    <div className="panel-view">
      <div>
        <h1 className="panel-view-title">{t("panel.sidebar.solicitudes")}</h1>
        <p className="panel-view-subtitle">{t("panel.solicitudes.subtitle")}</p>
      </div>

      {solicitudes.length === 0 ? (
        <div className="panel-empty-state">
          <span className="panel-empty-state-icon">
            <Inbox size={26} strokeWidth={1.6} />
          </span>
          <h4>{t("panel.solicitudes.empty")}</h4>
          <p>{t("panel.solicitudes.empty_hint")}</p>
        </div>
      ) : (
        <div className="panel-solicitudes-list">
          {solicitudes.map((solicitud) => {
            const AreaIcon = areaIcons[solicitud.areaId];
            return (
              <div key={solicitud.id} className="panel-solicitud-card">
                <span className="panel-solicitud-icon">
                  <AreaIcon size={20} strokeWidth={1.8} />
                </span>
                <div className="panel-solicitud-body">
                  <h4>{solicitud.estudio}</h4>
                  <span className="panel-solicitud-meta">
                    {solicitud.fecha} · {solicitud.horario} hrs
                  </span>
                </div>
                <span className={cn("panel-solicitud-badge", `is-${solicitud.estado}`)}>
                  {t(estadoKey[solicitud.estado])}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
