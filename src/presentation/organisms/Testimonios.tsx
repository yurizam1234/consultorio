"use client";

import { useState } from "react";
import { Reveal } from "@/presentation/atoms/Reveal";
import { SectionHead } from "@/presentation/molecules/SectionHead";
import { VideoTestimonialCard } from "@/presentation/molecules/VideoTestimonialCard";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { testimoniosVideos } from "@/shared/data/testimonios";

// Los testimonios son videos verticales (9:16) que el paciente reproduce a
// mano: se muestran todos lado a lado con el mismo formato, sin carrusel
// automático — un autoplay que cambia de slide cortaría el video que alguien
// está viendo. En celular quedan en una fila que se desliza con el dedo.
// El que se está reproduciendo crece y los demás se achican para darle foco.
export function Testimonios() {
  const { t } = useLanguage();
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section id="testimonios" style={{ padding: "20px 0 56px" }}>
      <div className="wrap">
        <SectionHead eyebrow={t("testimonios.eyebrow")} title={t("testimonios.title")} />

        <Reveal className="testimonial-grid" data-has-active={activeId ? "" : undefined}>
          {testimoniosVideos.map((testimonio) => (
            <VideoTestimonialCard
              key={testimonio.id}
              testimonio={testimonio}
              isActive={activeId === testimonio.id}
              onPlay={() => setActiveId(testimonio.id)}
              onEnded={() => setActiveId(null)}
            />
          ))}
        </Reveal>

        <p className="testimonios-consent-notice">{t("testimonios.consent_notice")}</p>
      </div>
    </section>
  );
}
