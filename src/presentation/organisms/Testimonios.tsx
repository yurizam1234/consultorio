"use client";

import { Reveal } from "@/presentation/atoms/Reveal";
import { SectionHead } from "@/presentation/molecules/SectionHead";
import { VideoTestimonialCard } from "@/presentation/molecules/VideoTestimonialCard";
import { useCarousel } from "@/presentation/hooks/useCarousel";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { testimoniosVideos } from "@/shared/data/testimonios";
import { cn } from "@/shared/lib/utils";

export function Testimonios() {
  const { activeIndex, next, prev, goTo, pause, resume } = useCarousel({
    length: testimoniosVideos.length,
    autoplayMs: 6000,
  });
  const { t } = useLanguage();

  return (
    <section id="testimonios" style={{ padding: "20px 0 56px" }}>
      <div className="wrap">
        <SectionHead eyebrow={t("testimonios.eyebrow")} title={t("testimonios.title")} />

        <Reveal className="testimonial-carousel" onMouseEnter={pause} onMouseLeave={resume}>
          <div className="testimonial-track">
            {testimoniosVideos.map((testimonio, index) => (
              <VideoTestimonialCard key={testimonio.id} testimonio={testimonio} active={index === activeIndex} />
            ))}
          </div>

          <div className="testimonial-controls">
            <button className="carousel-btn" aria-label={t("aria.prev_testimonial")} onClick={prev}>
              ‹
            </button>
            <div className="slide-dots">
              {testimoniosVideos.map((testimonio, index) => (
                <button
                  key={testimonio.id}
                  className={cn("dot", index === activeIndex && "active")}
                  aria-label={t("aria.view_testimonial", { name: String(index + 1) })}
                  onClick={() => goTo(index)}
                />
              ))}
            </div>
            <button className="carousel-btn" aria-label={t("aria.next_testimonial")} onClick={next}>
              ›
            </button>
          </div>
        </Reveal>

        <p className="testimonios-consent-notice">{t("testimonios.consent_notice")}</p>
      </div>
    </section>
  );
}