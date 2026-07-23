"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/presentation/atoms/Reveal";
import { SectionHead } from "@/presentation/molecules/SectionHead";
import { DoctorSlide } from "@/presentation/molecules/DoctorSlide";
import { DoctorModal } from "@/presentation/organisms/DoctorModal";
import { useCarousel } from "@/presentation/hooks/useCarousel";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { doctores, type Doctor } from "@/shared/data/doctores";
import { cn } from "@/shared/lib/utils";

export function Equipo() {
  const { activeIndex, next, prev, goTo, pause, resume } = useCarousel({
    length: doctores.length,
    autoplayMs: 5000,
  });
  const { t } = useLanguage();
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    document.body.style.overflow = selectedDoctor ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedDoctor]);

  useEffect(() => {
    if (!selectedDoctor) return;
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setSelectedDoctor(null);
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [selectedDoctor]);

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
              <DoctorSlide
                key={doctor.name}
                doctor={doctor}
                active={index === activeIndex}
                onOpenProfile={() => setSelectedDoctor(doctor)}
              />
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

      <DoctorModal doctor={selectedDoctor} onClose={() => setSelectedDoctor(null)} />
    </section>
  );
}