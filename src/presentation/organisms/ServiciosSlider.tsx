"use client";

import { Reveal } from "@/presentation/atoms/Reveal";
import { MedAreaSlide } from "@/presentation/molecules/MedAreaSlide";
import { MedAreaThumb } from "@/presentation/molecules/MedAreaThumb";
import { useCarousel } from "@/presentation/hooks/useCarousel";
import { areasMedicas } from "@/shared/data/areasMedicas";

export function ServiciosSlider() {
  const { activeIndex, next, prev, goTo, pause, resume } = useCarousel({
    length: areasMedicas.length,
    autoplayMs: 6000,
  });
  const activeArea = areasMedicas[activeIndex];

  return (
    <section id="servicios" style={{ background: "#e6f7f5", padding: "56px 0" }}>
      <div className="wrap">
        <Reveal className="organic-feature-card">
          <div className="media-mask-wrapper">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700&q=80"
              alt="Áreas médicas SH Arboledas"
            />
          </div>
          <div className="info-content-wrapper">
            <span className="feature-badge-pill">Áreas médicas</span>
            <h2 className="feature-title">Todo lo que tu salud necesita, bajo un mismo techo.</h2>
            <p className="feature-desc">
              Instalaciones modernas y personal especializado en diagnóstico, cirugía y atención integral.
            </p>
          </div>
        </Reveal>

        <Reveal className="med-hero-slider" onMouseEnter={pause} onMouseLeave={resume}>
          <div className="med-hero-slides">
            {areasMedicas.map((area, index) => (
              <MedAreaSlide key={area.title} area={area} active={index === activeIndex} />
            ))}
          </div>
          <div className="med-hero-scrim" />

          <div className="med-hero-content">
            <span className="med-hero-tagline">{activeArea.tagline}</span>
            <h3 className="med-hero-title">{activeArea.title}</h3>
            <p className="med-hero-desc">{activeArea.desc}</p>
            <a href="#contacto" className="med-hero-cta">
              Ver todo <i className="btn-circle-icon" />
            </a>
          </div>

          <div className="med-hero-thumbs">
            <div className="med-thumb-row">
              {areasMedicas.map((area, index) => (
                <MedAreaThumb key={area.title} area={area} active={index === activeIndex} onClick={() => goTo(index)} />
              ))}
            </div>
            <div className="med-hero-controls">
              <button className="med-control-dot" aria-label="Área anterior" onClick={prev} />
              <button className="med-control-dot" aria-label="Área siguiente" onClick={next} />
            </div>
          </div>

          <div className="med-hero-counter">{String(activeIndex + 1).padStart(2, "0")}</div>
        </Reveal>
      </div>
    </section>
  );
}
