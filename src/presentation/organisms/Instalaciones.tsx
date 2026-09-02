"use client";

import { useState } from "react";
import { SectionHead } from "@/presentation/molecules/SectionHead";
import { DiagonalPanelItem } from "@/presentation/molecules/DiagonalPanelItem";
import { InstalacionGaleria } from "@/presentation/organisms/InstalacionGaleria";
import { instalaciones, type Instalacion } from "@/shared/data/instalaciones";
import { useLanguage } from "@/presentation/hooks/useLanguage";

export function Instalaciones() {
  const { t } = useLanguage();
  const [galeriaAbierta, setGaleriaAbierta] = useState<Instalacion | null>(null);

  return (
    <section id="instalaciones" style={{ padding: "0 0 56px" }}>
      <div className="wrap">
        <div className="instalaciones-gallery-frame full-bleed">
          {/* Centrado sobre la galería (no arriba, en flujo normal): píldora
              oscura detrás para que el eyebrow blanco se lea bien sobre
              cualquier foto, sin depender de qué tan clara/oscura sea. */}
          <div className="instalaciones-overlay-head">
            <SectionHead eyebrow={t("instalaciones.eyebrow")} />
          </div>

          <div className="diagonal-container">
            {instalaciones.map((item) => (
              <DiagonalPanelItem key={item.num} instalacion={item} onOpenGaleria={setGaleriaAbierta} />
            ))}
          </div>
        </div>
      </div>

      <InstalacionGaleria instalacion={galeriaAbierta} onClose={() => setGaleriaAbierta(null)} />
    </section>
  );
}
