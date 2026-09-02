"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { categoriasServicios, type CategoriaServicioId } from "@/shared/data/categoriasServicios";
import { cn } from "@/shared/lib/utils";

export default function PanelServiciosPage() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<CategoriaServicioId | null>(null);

  const selectedCategoria = categoriasServicios.find((c) => c.id === selected) ?? null;

  return (
    <div className="panel-view">
      <div>
        <h1 className="panel-view-title">{t("panel.sidebar.servicios")}</h1>
        <p className="panel-view-subtitle">{t("panel.servicios.subtitle")}</p>
      </div>

      <div className="panel-servicios-grid">
        {categoriasServicios.map((categoria) => (
          <button
            key={categoria.id}
            type="button"
            className={cn("panel-servicio-cat-card", selected === categoria.id && "active")}
            onClick={() => setSelected(categoria.id)}
          >
            <span className="panel-servicio-cat-icon">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={categoria.img} alt="" loading="lazy" />
            </span>
            <h4>{t(categoria.labelKey)}</h4>
            <span className="panel-servicio-cat-count">
              {t("panel.servicios.count_label", { count: String(categoria.count) })}
            </span>
          </button>
        ))}
      </div>

      {selectedCategoria && (
        <div className="panel-servicio-notice">
          <span className="panel-servicio-notice-icon">
            <Sparkles size={20} strokeWidth={1.8} />
          </span>
          <div>
            <h4>{t("panel.servicios.coming_soon_title")}</h4>
            <p>
              {t("panel.servicios.coming_soon_desc", { category: t(selectedCategoria.labelKey) })}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
