"use client";

import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import Link from "next/link";
import { Icon } from "@/presentation/atoms/Icon";
import { Reveal } from "@/presentation/atoms/Reveal";
import { AreaMedicaCard } from "@/presentation/molecules/AreaMedicaCard";
import { useCarousel } from "@/presentation/hooks/useCarousel";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { areasMedicas } from "@/shared/data/areasMedicas";
import { cn } from "@/shared/lib/utils";

const DRAG_THRESHOLD = 60;
// Copias visuales de las primeras cards, agregadas al final del track: sin esto,
// al llegar a la última card real no queda nada después y se ve un hueco vacío
// a la derecha — con esto se sigue asomando "la siguiente" (aunque se repita),
// igual que en el resto del recorrido. Dos alcanzan incluso en pantallas anchas.
const loopPreview = areasMedicas.slice(0, 2);

export function ServiciosSlider() {
  const { lang, t } = useLanguage();
  const { activeIndex, next, prev, goTo, pause, resume } = useCarousel({
    length: areasMedicas.length,
    autoplayMs: 3000,
  });

  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [offset, setOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragDelta, setDragDelta] = useState(0);
  const dragStartX = useRef(0);

  // Centra la card activa dentro del track (mide su posición real: los anchos
  // de las cards son relativos al viewport, no un valor fijo calculable a mano).
  useEffect(() => {
    function syncOffset() {
      const track = trackRef.current;
      const card = cardRefs.current[activeIndex];
      if (!track || !card) return;
      setOffset(-(card.offsetLeft - track.offsetLeft));
    }
    syncOffset();
    window.addEventListener("resize", syncOffset);
    return () => window.removeEventListener("resize", syncOffset);
  }, [activeIndex]);

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    dragStartX.current = event.clientX;
    setDragDelta(0);
    setDragging(true);
    pause();
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!dragging) return;
    setDragDelta(event.clientX - dragStartX.current);
  }

  function endDrag() {
    if (!dragging) return;
    setDragging(false);
    if (dragDelta < -DRAG_THRESHOLD) next();
    else if (dragDelta > DRAG_THRESHOLD) prev();
    setDragDelta(0);
    resume();
  }

  return (
    <section id="servicios">
      <div className="wrap">
        {/* Único texto tipo-título de esta sección — h2 real para navegación
            por encabezados (lector de pantalla), no sólo un span estilizado. */}
        <h2 className="feature-badge-pill" data-reveal-name>
          {t("servicios.badge")}
        </h2>
      </div>

      <Reveal className="servicios-slider-wrap full-bleed" onMouseEnter={pause} onMouseLeave={resume}>
        <div
          ref={trackRef}
          className={cn("servicios-slider-track", dragging && "dragging")}
          style={{ transform: `translateX(${offset + (dragging ? dragDelta : 0)}px)` }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          {areasMedicas.map((area, index) => (
            <AreaMedicaCard
              key={area.title.es}
              area={area}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
            />
          ))}
          {loopPreview.map((area) => (
            <AreaMedicaCard key={`${area.title.es}-loop`} area={area} decorative />
          ))}
        </div>

        <div className="testimonial-controls">
          <button type="button" className="carousel-btn" aria-label={t("aria.prev_area")} onClick={prev}>
            ‹
          </button>
          <div className="slide-dots">
            {areasMedicas.map((area, index) => (
              <button
                key={area.title.es}
                type="button"
                className={cn("dot", index === activeIndex && "active")}
                aria-label={t("aria.view_area", { name: area.title[lang] })}
                onClick={() => goTo(index)}
              />
            ))}
          </div>
          <button type="button" className="carousel-btn" aria-label={t("aria.next_area")} onClick={next}>
            ›
          </button>
        </div>
      </Reveal>

      <div className="wrap">
        <Link href="/procedimientos" className="reasons-cta-btn servicios-catalogo-cta">
          {t("procedimientos.cta")}
          <Icon name="arrow-right" strokeWidth={2.2} />
        </Link>
      </div>
    </section>
  );
}
