"use client";

import { forwardRef } from "react";
import type { AreaMedica } from "@/shared/data/areasMedicas";
import { especialidadKeyDeTitulo } from "@/shared/data/especialidades";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { useEmergencyModal } from "@/presentation/hooks/useEmergencyModal";

interface AreaMedicaCardProps {
  area: AreaMedica;
  /** Copia visual al final del track (ver ServiciosSlider.tsx) para que, al llegar
   * a la última card real, siempre se asome la "siguiente" (aunque se repita en
   * vez de dejar un hueco vacío) — no debe duplicarse para lectores de pantalla
   * ni robarse el foco de teclado. */
  decorative?: boolean;
  /** Selecciona esta área en "Especialidades y especialistas" (ver
   * LandingPage.tsx) y hace scroll hasta ahí. */
  onSelectEspecialidad: (key: string) => void;
}

export const AreaMedicaCard = forwardRef<HTMLElement, AreaMedicaCardProps>(function AreaMedicaCard(
  { area, decorative, onSelectEspecialidad },
  ref
) {
  const { lang, t } = useLanguage();
  const { open: openEmergency } = useEmergencyModal();
  // "Urgencias 24/7" no tiene pestaña propia en Especialidades (no se
  // "navega", se llama) — ver el comentario junto a "especialidadKeyDeTitulo".
  const especialidadKey = especialidadKeyDeTitulo(area.title.es);

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
            href={especialidadKey ? "#especialidades" : undefined}
            className="servicio-parallax-cta"
            tabIndex={decorative ? -1 : undefined}
            onClick={(event) => {
              if (especialidadKey) {
                onSelectEspecialidad(especialidadKey);
              } else {
                // Urgencias: no se "agenda", se llama — abre el mismo modal
                // que el resto de accesos a urgencias del sitio.
                event.preventDefault();
                openEmergency();
              }
            }}
          >
            {t("servicios.ver_todo")} <i className="btn-circle-icon" />
          </a>
        )}
      </div>
    </article>
  );
});
