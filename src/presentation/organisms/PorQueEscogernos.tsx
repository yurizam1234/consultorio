"use client";

import { Reveal } from "@/presentation/atoms/Reveal";
import { Icon } from "@/presentation/atoms/Icon";
import { ReasonFeatureItem } from "@/presentation/molecules/ReasonFeatureItem";
import { DiamondImage } from "@/presentation/molecules/DiamondImage";
import { reasonFeatureIcons } from "@/shared/data/contacto";
import { useLanguage } from "@/presentation/hooks/useLanguage";

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
              <h2 className="reasons-title">{t("reasons.title")}</h2>
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
            <DiamondImage
              position={1}
              src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&q=80"
              alt="Especialistas SH Arboledas"
            />
            <DiamondImage
              position={2}
              src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=500&q=80"
              alt="Tecnología de diagnóstico"
            />
            <DiamondImage
              position={3}
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&q=80"
              alt="Instalaciones SH Arboledas"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
