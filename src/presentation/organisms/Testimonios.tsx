"use client";

import { Reveal } from "@/presentation/atoms/Reveal";
import { SectionHead } from "@/presentation/molecules/SectionHead";
import { TestimonialCardItem } from "@/presentation/molecules/TestimonialCardItem";
import { useCarousel } from "@/presentation/hooks/useCarousel";
import { testimonios } from "@/shared/data/testimonios";
import { cn } from "@/shared/lib/utils";

export function Testimonios() {
  const { activeIndex, next, prev, goTo, pause, resume } = useCarousel({
    length: testimonios.length,
    autoplayMs: 6000,
  });

  return (
    <section id="testimonios" style={{ background: "#e6f7f5", padding: "56px 0" }}>
      <div className="wrap">
        <SectionHead eyebrow="Testimonios" title="Qué piensan los pacientes de nosotros" center />

        <Reveal className="testimonial-carousel" onMouseEnter={pause} onMouseLeave={resume}>
          <div className="testimonial-track">
            {testimonios.map((testimonio, index) => (
              <TestimonialCardItem key={testimonio.name} testimonio={testimonio} active={index === activeIndex} />
            ))}
          </div>

          <div className="testimonial-controls">
            <button className="carousel-btn" aria-label="Testimonio anterior" onClick={prev}>
              ‹
            </button>
            <div className="slide-dots">
              {testimonios.map((testimonio, index) => (
                <button
                  key={testimonio.name}
                  className={cn("dot", index === activeIndex && "active")}
                  aria-label={`Ver testimonio de ${testimonio.name}`}
                  onClick={() => goTo(index)}
                />
              ))}
            </div>
            <button className="carousel-btn" aria-label="Testimonio siguiente" onClick={next}>
              ›
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
