"use client";

import { Reveal } from "@/presentation/atoms/Reveal";
import { SectionHead } from "@/presentation/molecules/SectionHead";
import { DoctorSlide } from "@/presentation/molecules/DoctorSlide";
import { useCarousel } from "@/presentation/hooks/useCarousel";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { doctores } from "@/shared/data/doctores";
import { cn } from "@/shared/lib/utils";

export function Equipo() {
  const { activeIndex, next, prev, goTo, pause, resume } = useCarousel({
    length: doctores.length,
    autoplayMs: 5000,
  });
  const { t } = useLanguage();

  return (
    <section id="equipo">
      <div className="wrap">
        <SectionHead
          eyebrow={t("equipo.eyebrow")}
          title={t("equipo.title")}
          description={t("equipo.desc")}
        />
      </div>

      <div className="wrap">
        <Reveal className="team-slideshow" onMouseEnter={pause} onMouseLeave={resume}>
          <div className="slides-track">
            {doctores.map((doctor, index) => (
              <DoctorSlide key={doctor.name} doctor={doctor} active={index === activeIndex} />
            ))}
          </div>
        </Reveal>

        <div className="carousel-controls">
          <button className="carousel-btn prev-btn" aria-label={t("aria.prev_doctor")} onClick={prev}>
            ‹
          </button>
          <div className="slide-dots">
            {doctores.map((doctor, index) => (
              <button
                key={doctor.name}
                className={cn("dot", index === activeIndex && "active")}
                aria-label={t("aria.view_doctor", { name: doctor.name })}
                onClick={() => goTo(index)}
              />
            ))}
          </div>
          <button className="carousel-btn next-btn" aria-label={t("aria.next_doctor")} onClick={next}>
            ›
          </button>
        </div>
      </div>
    </section>
  );
}