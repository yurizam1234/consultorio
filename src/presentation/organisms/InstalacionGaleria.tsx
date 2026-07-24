"use client";

import { useEffect, useState } from "react";
import type { Instalacion } from "@/shared/data/instalaciones";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { cn } from "@/shared/lib/utils";

interface InstalacionGaleriaProps {
  instalacion: Instalacion | null;
  onClose: () => void;
}

export function InstalacionGaleria({ instalacion, onClose }: InstalacionGaleriaProps) {
  const { t } = useLanguage();
  const isOpen = instalacion !== null;

  // Sin esto, el fondo seguía siendo scrolleable con el modal abierto: el
  // scroll disparaba las animaciones ligadas a ScrollTrigger detrás del
  // overlay (hero pineado, paneles diagonales, etc.), viéndose "destorcido".
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  return (
    <div
      className={cn("cita-modal-overlay", isOpen && "open")}
      onClick={(event) => event.target === event.currentTarget && onClose()}
    >
      {instalacion && (
        <div
          className="cita-modal instalacion-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="instalacionGaleriaTitle"
        >
          <button className="cita-modal-close" aria-label={t("modal.close")} onClick={onClose}>
            ×
          </button>
          {/* key remonta el contenido (y su índice de foto) al cambiar de instalación */}
          <InstalacionGaleriaContent key={instalacion.num} instalacion={instalacion} />
        </div>
      )}
    </div>
  );
}

function InstalacionGaleriaContent({ instalacion }: { instalacion: Instalacion }) {
  const { lang, t } = useLanguage();
  const [index, setIndex] = useState(0);

  const total = instalacion.galeria.length;
  const prev = () => setIndex((current) => (current - 1 + total) % total);
  const next = () => setIndex((current) => (current + 1) % total);

  return (
    <div className="instalacion-modal-card">
      <h4 id="instalacionGaleriaTitle" className="instalacion-modal-title">
        {instalacion.title[lang]}
      </h4>

      <div className="instalacion-modal-viewer">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={instalacion.galeria[index]} alt={`${instalacion.title[lang]} ${index + 1}`} />
        {total > 1 && (
          <>
            <button className="carousel-btn instalacion-modal-prev" aria-label={t("aria.galeria_prev")} onClick={prev}>
              ‹
            </button>
            <button className="carousel-btn instalacion-modal-next" aria-label={t("aria.galeria_next")} onClick={next}>
              ›
            </button>
          </>
        )}
      </div>

      {total > 1 && (
        <div className="instalacion-modal-thumbs">
          {instalacion.galeria.map((src, i) => (
            <button
              key={src}
              type="button"
              className={cn("instalacion-modal-thumb", i === index && "active")}
              onClick={() => setIndex(i)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
