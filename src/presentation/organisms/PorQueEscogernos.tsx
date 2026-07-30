"use client";

import { Reveal } from "@/presentation/atoms/Reveal";
import { SplitChars } from "@/presentation/atoms/SplitChars";
import { Icon } from "@/presentation/atoms/Icon";
import { ReasonFeatureItem } from "@/presentation/molecules/ReasonFeatureItem";
import { PhotoStack } from "@/presentation/molecules/PhotoStack";
import { reasonFeatureIcons } from "@/shared/data/contacto";
import { useLanguage } from "@/presentation/hooks/useLanguage";

const REASONS_IMAGES = [
  { src: "/instalaciones/quirofanos/qx1.webp", alt: "Quirófano SH Arboledas" },
  { src: "/instalaciones/quirofanos/qx5.png", alt: "Quirófano SH Arboledas" },
  { src: "/instalaciones/quirofanos/qx6.webp", alt: "Quirófano SH Arboledas" },
  { src: "/instalaciones/quirofanos/qx7.webp", alt: "Quirófano SH Arboledas" },
];

export function PorQueEscogernos() {
  const { t } = useLanguage();

  return (
    <section id="por-que-escogernos" style={{ padding: "20px 0 56px" }}>
      <div className="wrap">
        <div className="reasons-tagline-row">
          <p className="eyebrow" data-reveal-name style={{ margin: 0 }}>
            {t("reasons.eyebrow")}
          </p>
          <span className="reasons-tagline-line" />
        </div>

        <div className="reasons-grid">
          <div className="reasons-content">
            <Reveal style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <h2 className="reasons-title" aria-label={t("reasons.title")}>
                <SplitChars text={t("reasons.title")} />
              </h2>
              <p className="reasons-desc">{t("reasons.desc")}</p>

              <div className="reasons-features">
                {reasonFeatureIcons.map((icon, index) => (
                  <ReasonFeatureItem key={icon} icon={icon} label={t(`reasons.feature${index + 1}`)} />
                ))}
              </div>

              <a href="#servicios" className="reasons-cta-btn">
                {t("reasons.cta")}
                <Icon name="arrow-right" stroke="currentColor" strokeWidth={2.2} />
              </a>
            </Reveal>
          </div>

          <Reveal className="reasons-collage">
            <PhotoStack images={REASONS_IMAGES} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
