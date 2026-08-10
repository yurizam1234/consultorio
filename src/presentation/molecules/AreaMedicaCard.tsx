"use client";

import { forwardRef } from "react";
import type { AreaMedica } from "@/shared/data/areasMedicas";
import { useLanguage } from "@/presentation/hooks/useLanguage";

interface AreaMedicaCardProps {
  area: AreaMedica;
  /** Copia visual al final del track (ver ServiciosSlider.tsx) para que, al llegar
   * a la última card real, siempre se asome la "siguiente" (aunque se repita en
   * vez de dejar un hueco vacío) — no debe duplicarse para lectores de pantalla
   * ni robarse el foco de teclado. */
  decorative?: boolean;
}

export const AreaMedicaCard = forwardRef<HTMLElement, AreaMedicaCardProps>(function AreaMedicaCard(
  { area, decorative },
  ref
) {
  const { lang, t } = useLanguage();

  return (
    <article
      ref={ref}
      className="servicio-parallax-card"
      aria-hidden={decorative || undefined}
      inert={decorative || undefined}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={area.img} alt={area.title[lang]} loading="lazy" className="servicio-parallax-img" />
      <div className="servicio-parallax-scrim" />
      <div className="servicio-parallax-content">
        <span className="servicio-parallax-tagline">{area.tagline[lang]}</span>
        <h3 className="servicio-parallax-title">{area.title[lang]}</h3>
        <p className="servicio-parallax-desc">{area.desc[lang]}</p>
        {area.comingSoon ? (
          <span className="servicio-parallax-badge">{t("areas.coming_soon_badge")}</span>
        ) : (
          <a
            href="#equipo"
            className="servicio-parallax-cta"
            tabIndex={decorative ? -1 : undefined}
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent("equipo:seleccionar", { detail: { especialidad: area.title.es } })
              )
            }
          >
            {t("servicios.ver_todo")} <i className="btn-circle-icon" />
          </a>
        )}
      </div>
    </article>
  );
});
