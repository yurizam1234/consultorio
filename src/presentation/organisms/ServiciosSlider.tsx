"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import Link from "next/link";
import { Icon } from "@/presentation/atoms/Icon";
import { Reveal } from "@/presentation/atoms/Reveal";
import { AreaMedicaCard } from "@/presentation/molecules/AreaMedicaCard";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { areasMedicas } from "@/shared/data/areasMedicas";
import { cn } from "@/shared/lib/utils";

const DRAG_THRESHOLD = 60;
const AUTOPLAY_MS = 6500;
const N = areasMedicas.length;
// 3 sets para navegación infinita continua sin cortes
const SLIDES = [...areasMedicas, ...areasMedicas, ...areasMedicas];
const START_INDEX = N;

interface ServiciosSliderProps {
  onSelectEspecialidad: (key: string) => void;
}

export function ServiciosSlider({ onSelectEspecialidad }: ServiciosSliderProps) {
  const { lang, t } = useLanguage();
  const [displayIndex, setDisplayIndex] = useState(START_INDEX);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const [dragging, setDragging] = useState(false);
  const [dragDelta, setDragDelta] = useState(0);
  const dragStartX = useRef(0);
  const isJumpingRef = useRef(false);

  const realIndex = ((displayIndex % N) + N) % N;

  const next = useCallback(() => {
    setIsTransitioning(true);
    setDisplayIndex((prev) => prev + 1);
  }, []);

  const prev = useCallback(() => {
    setIsTransitioning(true);
    setDisplayIndex((prev) => prev - 1);
  }, []);

  const goTo = useCallback((targetRealIndex: number) => {
    setIsTransitioning(true);
    setDisplayIndex(START_INDEX + targetRealIndex);
  }, []);

  // Salto instantáneo imperceptible para el bucle infinito
  const handleTransitionEnd = useCallback(() => {
    if (isJumpingRef.current) return;

    if (displayIndex >= 2 * N) {
      isJumpingRef.current = true;
      setIsTransitioning(false);
      const newIdx = displayIndex - N;
      setDisplayIndex(newIdx);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
          isJumpingRef.current = false;
        });
      });
    } else if (displayIndex < N) {
      isJumpingRef.current = true;
      setIsTransitioning(false);
      const newIdx = displayIndex + N;
      setDisplayIndex(newIdx);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
          isJumpingRef.current = false;
        });
      });
    }
  }, [displayIndex]);

  // Autoplay continuo
  useEffect(() => {
    if (isPaused || dragging) return;
    const interval = setInterval(() => {
      next();
    }, AUTOPLAY_MS);
    return () => clearInterval(interval);
  }, [isPaused, dragging, next]);

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    dragStartX.current = event.clientX;
    setDragDelta(0);
    setDragging(true);
    setIsPaused(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!dragging) return;
    setDragDelta(event.clientX - dragStartX.current);
  }

  function endDrag() {
    if (!dragging) return;
    setDragging(false);
    if (dragDelta < -DRAG_THRESHOLD) {
      next();
    } else if (dragDelta > DRAG_THRESHOLD) {
      prev();
    }
    setDragDelta(0);
    setIsPaused(false);
  }

  return (
    <section id="servicios" className="servicios-fullscreen-section">
      {/* Escenario Full-Screen 100vw x 100vh */}
      <Reveal
        className="servicios-fullscreen-stage"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className={cn("servicios-fullscreen-track", dragging && "dragging")}
          style={{
            transform: `translateX(calc(-${displayIndex * 100}vw + ${dragging ? dragDelta : 0}px))`,
            transition: !isTransitioning || dragging ? "none" : "transform 0.75s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
          onTransitionEnd={handleTransitionEnd}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          {SLIDES.map((area, index) => (
            <AreaMedicaCard
              key={`${area.title.es}-${index}`}
              area={area}
              index={index % N}
              total={N}
              isActive={index === displayIndex}
              onSelectEspecialidad={onSelectEspecialidad}
            />
          ))}
        </div>

        {/* Controles Flotantes de Navegación */}
        <div className="servicios-fullscreen-controls">
          <button
            type="button"
            className="carousel-btn"
            aria-label={t("aria.prev_area")}
            onClick={prev}
          >
            ‹
          </button>
          <div className="slide-dots">
            {areasMedicas.map((area, index) => (
              <button
                key={area.title.es}
                type="button"
                className={cn("dot", index === realIndex && "active")}
                aria-label={t("aria.view_area", { name: area.title[lang] })}
                onClick={() => goTo(index)}
              />
            ))}
          </div>
          <button
            type="button"
            className="carousel-btn"
            aria-label={t("aria.next_area")}
            onClick={next}
          >
            ›
          </button>
        </div>

        {/* Botón Flotante de Acceso al Catálogo de Procedimientos */}
        <div className="servicios-floating-cta">
          <Link href="/procedimientos" className="servicios-catalog-btn">
            <span>{t("procedimientos.cta")}</span>
            <span className="servicios-btn-arrow">
              <Icon name="arrow-right" strokeWidth={2.4} />
            </span>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
