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
    <section id="instalaciones" style={{ padding: "20px 0 56px" }}>
      <div className="wrap">
        <SectionHead eyebrow={t("instalaciones.eyebrow")} />

        <div className="diagonal-container full-bleed">
          {instalaciones.map((item) => (
            <DiagonalPanelItem key={item.num} instalacion={item} onOpenGaleria={setGaleriaAbierta} />
          ))}
        </div>
      </div>

      <InstalacionGaleria instalacion={galeriaAbierta} onClose={() => setGaleriaAbierta(null)} />
    </section>
  );
}
