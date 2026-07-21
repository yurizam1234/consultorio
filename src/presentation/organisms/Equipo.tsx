"use client";

import { Reveal } from "@/presentation/atoms/Reveal";
import { SectionHead } from "@/presentation/molecules/SectionHead";
import { DoctorSlide } from "@/presentation/molecules/DoctorSlide";
import { useCarousel } from "@/presentation/hooks/useCarousel";
import { doctores } from "@/shared/data/doctores";
import { cn } from "@/shared/lib/utils";

export function Equipo() {
  const { activeIndex, next, prev, goTo, pause, resume } = useCarousel({
    length: doctores.length,
    autoplayMs: 5000,
  });

  return (
    <section id="equipo">
      <div className="wrap">
        <SectionHead
          eyebrow="Nuestro equipo"
          title="Las personas detrás de tu atención"
          description="Médicos con amplia experiencia y vocación de servicio."
          center
          eyebrowColor="var(--teal-start)"
          titleColor="#284d5c"
          descriptionColor="#4b5563"
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
          <button className="carousel-btn prev-btn" aria-label="Doctor anterior" onClick={prev}>
            ‹
          </button>
          <div className="slide-dots">
            {doctores.map((doctor, index) => (
              <button
                key={doctor.name}
                className={cn("dot", index === activeIndex && "active")}
                aria-label={`Ver a ${doctor.name}`}
                onClick={() => goTo(index)}
              />
            ))}
          </div>
          <button className="carousel-btn next-btn" aria-label="Doctor siguiente" onClick={next}>
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
