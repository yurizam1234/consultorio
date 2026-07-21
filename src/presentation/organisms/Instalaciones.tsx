"use client";

import { SectionHead } from "@/presentation/molecules/SectionHead";
import { DiagonalPanelItem } from "@/presentation/molecules/DiagonalPanelItem";
import { instalaciones } from "@/shared/data/instalaciones";
import { useLanguage } from "@/presentation/hooks/useLanguage";

export function Instalaciones() {
  const { t } = useLanguage();

  return (
    <section id="instalaciones" className="glass-section" style={{ padding: "20px 0 56px" }}>
      <div className="wrap">
        <SectionHead
          eyebrow={t("instalaciones.eyebrow")}
          title={t("instalaciones.title")}
          description={t("instalaciones.desc")}
        />

        <div className="diagonal-container full-bleed">
          {instalaciones.map((item) => (
            <DiagonalPanelItem key={item.num} instalacion={item} />
          ))}
        </div>
      </div>
    </section>
  );
}