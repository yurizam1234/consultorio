"use client";

import { Reveal } from "@/presentation/atoms/Reveal";
import { MedAreaSlide } from "@/presentation/molecules/MedAreaSlide";
import { MedAreaThumb } from "@/presentation/molecules/MedAreaThumb";
import { useCarousel } from "@/presentation/hooks/useCarousel";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { areasMedicas } from "@/shared/data/areasMedicas";

export function ServiciosSlider() {
  const { activeIndex, next, prev, goTo, pause, resume } = useCarousel({
    length: areasMedicas.length,
    autoplayMs: 6000,
  });
  const { lang, t } = useLanguage();
  const activeArea = areasMedicas[activeIndex];

  return (
    <section id="servicios" className="glass-section" style={{ padding: "20px 0 56px" }}>
      <div className="wrap">
        <span className="feature-badge-pill" data-reveal-name>
          {t("servicios.badge")}
        </span>
        <Reveal className="feature-intro">
          <h2 className="feature-title">{t("servicios.title")}</h2>
          <p className="feature-desc">{t("servicios.desc")}</p>
        </Reveal>

        <Reveal className="med-hero-slider full-bleed" onMouseEnter={pause} onMouseLeave={resume}>
          <div className="med-hero-slides">
            {areasMedicas.map((area, index) => (
              <MedAreaSlide key={area.title.es} area={area} active={index === activeIndex} />
            ))}
          </div>
          <div className="med-hero-scrim" />

          <div className="med-hero-content">
            <span className="med-hero-tagline">{activeArea.tagline[lang]}</span>
            <h3 className="med-hero-title">{activeArea.title[lang]}</h3>
            <p className="med-hero-desc">{activeArea.desc[lang]}</p>
            <a href="#contacto" className="med-hero-cta">
              {t("servicios.ver_todo")} <i className="btn-circle-icon" />
            </a>
          </div>

          <div className="med-hero-thumbs">
            <div className="med-thumb-row">
              {areasMedicas.map((area, index) => (
                <MedAreaThumb key={area.title.es} area={area} active={index === activeIndex} onClick={() => goTo(index)} />
              ))}
            </div>
            <div className="med-hero-controls">
              <button className="med-control-dot" aria-label={t("aria.prev_area")} onClick={prev} />
              <button className="med-control-dot" aria-label={t("aria.next_area")} onClick={next} />
            </div>
          </div>

          <div className="med-hero-counter">{String(activeIndex + 1).padStart(2, "0")}</div>
        </Reveal>
      </div>
    </section>
  );
}
