"use client";

import { Reveal } from "@/presentation/atoms/Reveal";
import { SectionHead } from "@/presentation/molecules/SectionHead";
import { TestimonialCardItem } from "@/presentation/molecules/TestimonialCardItem";
import { useCarousel } from "@/presentation/hooks/useCarousel";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { testimonios } from "@/shared/data/testimonios";
import { cn } from "@/shared/lib/utils";

export function Testimonios() {
  const { activeIndex, next, prev, goTo, pause, resume } = useCarousel({
    length: testimonios.length,
    autoplayMs: 6000,
  });
  const { t } = useLanguage();

  return (
    <section id="testimonios" className="glass-section" style={{ padding: "20px 0 56px" }}>
      <div className="wrap">
        <SectionHead eyebrow={t("testimonios.eyebrow")} title={t("testimonios.title")} />

        <Reveal className="testimonial-carousel" onMouseEnter={pause} onMouseLeave={resume}>
          <div className="testimonial-track">
            {testimonios.map((testimonio, index) => (
              <TestimonialCardItem key={testimonio.name} testimonio={testimonio} active={index === activeIndex} />
            ))}
          </div>

          <div className="testimonial-controls">
            <button className="carousel-btn" aria-label={t("aria.prev_testimonial")} onClick={prev}>
              ‹
            </button>
            <div className="slide-dots">
              {testimonios.map((testimonio, index) => (
                <button
                  key={testimonio.name}
                  className={cn("dot", index === activeIndex && "active")}
                  aria-label={t("aria.view_testimonial", { name: testimonio.name })}
                  onClick={() => goTo(index)}
                />
              ))}
            </div>
            <button className="carousel-btn" aria-label={t("aria.next_testimonial")} onClick={next}>
              ›
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}