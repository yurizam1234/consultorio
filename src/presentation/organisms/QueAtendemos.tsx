"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { SectionHead } from "@/presentation/molecules/SectionHead";
import { MotivoCard } from "@/presentation/molecules/MotivoCard";
import { Reveal } from "@/presentation/atoms/Reveal";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { useEmergencyModal } from "@/presentation/hooks/useEmergencyModal";
import { MOTIVOS_CONSULTA } from "@/shared/data/motivosConsulta";
import { cn } from "@/shared/lib/utils";

interface QueAtendemosProps {
  
  onSelectEspecialidad: (key: string, seccion: string) => void;
}

const DRAG_THRESHOLD = 30;
const AUTOPLAY_MS = 6000;
const N = MOTIVOS_CONSULTA.length;
const SLIDES = [
  ...MOTIVOS_CONSULTA,
  ...MOTIVOS_CONSULTA,
  ...MOTIVOS_CONSULTA,
  ...MOTIVOS_CONSULTA,
];
const START_INDEX = N * 2;

export function QueAtendemos({ onSelectEspecialidad }: QueAtendemosProps) {
  const { t } = useLanguage();
  const { open: openEmergency } = useEmergencyModal();
  const [displayIndex, setDisplayIndex] = useState(START_INDEX);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const [dragging, setDragging] = useState(false);
  const [dragDelta, setDragDelta] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  const dragStartX = useRef(0);
  const isJumpingRef = useRef(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const realIndex = ((displayIndex % N) + N) % N;

  const handleSelectMotivo = useCallback(
    (key: string, seccion: string) => {
      if (key === "urgencia") {
        openEmergency();
        return;
      }
      onSelectEspecialidad(key, seccion);
    },
    [onSelectEspecialidad, openEmergency]
  );

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

  const checkInfiniteLoop = useCallback((currentIdx: number) => {
    if (isJumpingRef.current) return;

    if (currentIdx >= 3 * N) {
      isJumpingRef.current = true;
      setIsTransitioning(false);
      const newIdx = currentIdx - N;
      setDisplayIndex(newIdx);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
          isJumpingRef.current = false;
        });
      });
    } else if (currentIdx < N) {
      isJumpingRef.current = true;
      setIsTransitioning(false);
      const newIdx = currentIdx + N;
      setDisplayIndex(newIdx);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
          isJumpingRef.current = false;
        });
      });
    }
  }, []);

  useEffect(() => {
    if (isPaused || dragging) return;
    const interval = setInterval(() => {
      next();
    }, AUTOPLAY_MS);
    return () => clearInterval(interval);
  }, [isPaused, dragging, next]);

  useEffect(() => {
    if (!isTransitioning) return;
    const timer = setTimeout(() => {
      checkInfiniteLoop(displayIndex);
    }, 560);
    return () => clearTimeout(timer);
  }, [displayIndex, isTransitioning, checkInfiniteLoop]);

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    dragStartX.current = event.clientX;
    setDragDelta(0);
    setDragging(true);
    setIsPaused(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!dragging) return;
    const delta = event.clientX - dragStartX.current;
    setDragDelta(delta);
  }

  function endDrag() {
    if (!dragging) return;
    setDragging(false);
    
    // Si arrastras hacia la derecha (dragDelta positivo), navega hacia la tarjeta anterior (prev)
    // Si arrastras hacia la izquierda (dragDelta negativo), navega hacia la siguiente (next)
    if (dragDelta > DRAG_THRESHOLD) {
      prev();
    } else if (dragDelta < -DRAG_THRESHOLD) {
      next();
    }
    setDragDelta(0);
    setIsPaused(false);
  }

  const getCardStyle = (index: number): React.CSSProperties => {
    const diff = index - displayIndex;
    
    // El signo debe coincidir con lo que hacen next()/prev() al soltar (suman/restan 1 a
    // displayIndex): con "diff - dragRatio" la vista previa del arrastre avanzaba en la
    // dirección CONTRARIA a la del salto final, así que al soltar se veía la tarjeta
    // "rebotar" — retroceder de golpe antes de recién ahí animar hacia adelante (o viceversa).
    const dragSensitivity = isMobile ? 180 : 300;
    const dragRatio = dragging ? dragDelta / dragSensitivity : 0;
    const effDiff = diff + dragRatio;
    const absDiff = Math.abs(effDiff);

    const maxVisible = isMobile ? 2.5 : 3.8;
    if (absDiff > maxVisible) {
      return { display: "none" };
    }

    const sign = effDiff === 0 ? 0 : effDiff > 0 ? 1 : -1;
    const isCenter = absDiff < 0.35;

    const step1 = isMobile ? 170 : 285;
    const step2 = isMobile ? 130 : 225;
    const xOffset = sign * (Math.min(absDiff, 1) * step1 + Math.max(0, absDiff - 1) * step2);

    const centerZ = isMobile ? 40 : 90;
    const sideZFactor = isMobile ? 45 : 80;
    const zOffset = isCenter ? centerZ : -Math.min(280, absDiff * sideZFactor);

    const baseDeg = isMobile ? 18 : 26;
    const yRotation = isCenter ? 0 : -sign * Math.min(36, baseDeg + absDiff * 4);

    const centerScale = isMobile ? 0.92 : 1.06;
    const minScale = isMobile ? 0.70 : 0.76;
    const scale = isCenter ? centerScale : Math.max(minScale, (isMobile ? 0.88 : 1) - absDiff * 0.09);

    const opacity = isCenter ? 1 : Math.max(0.35, 0.95 - absDiff * 0.22);
    const brightness = isCenter ? 1 : Math.max(0.65, 0.9 - absDiff * 0.12);
    const zIndex = Math.round(100 - absDiff * 10);

    return {
      transform: `translateX(${xOffset.toFixed(1)}px) translateZ(${zOffset.toFixed(1)}px) rotateY(${yRotation.toFixed(1)}deg) scale(${scale.toFixed(3)})`,
      opacity,
      filter: `brightness(${brightness.toFixed(2)})`,
      zIndex,
      transition: dragging || !isTransitioning ? "none" : "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s ease, filter 0.45s ease",
    };
  };

  return (
    <section id="atender" className="motivos-section-wrap coverflow-mode overflow-hidden py-8 md:py-16">
      <div className="wrap relative z-10">
        <SectionHead
          eyebrow="Por dónde empezar"
          title="¿Qué necesitas atender?"
          description="No hace falta que sepas el nombre de la especialidad. Empieza por lo que te está pasando y nosotros te llevamos con quien corresponde."
        />
      </div>

      <Reveal
        className="coverflow-stage-wrap full-bleed select-none touch-pan-y"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="coverflow-stage cursor-grab active:cursor-grabbing touch-pan-y"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <div className="coverflow-ambient-glow" aria-hidden="true" />

          {SLIDES.map((motivo, index) => (
            <MotivoCard
              key={`${motivo.key}-${index}`}
              numero={motivo.numero}
              total={String(N).padStart(2, "0")}
              especialidad={motivo.especialidad}
              titulo={motivo.titulo}
              descripcion={motivo.descripcion}
              ubicacion={motivo.ubicacion}
              especialidadKey={motivo.key}
              seccion={motivo.seccion}
              imagen={motivo.imagen}
              alt={motivo.alt}
              comingSoon={motivo.comingSoon}
              isActive={index === displayIndex}
              offsetFromActive={index - displayIndex}
              onSelect={handleSelectMotivo}
              onClickCard={() => {
                if (Math.abs(dragDelta) > 5) return;
                setIsTransitioning(true);
                setDisplayIndex(index);
              }}
              style={getCardStyle(index)}
            />
          ))}
        </div>

        <div className="testimonial-controls mt-6 flex justify-center items-center gap-4">
          <button
            type="button"
            className="carousel-btn text-xl w-10 h-10 flex items-center justify-center rounded-full bg-white/80 shadow-md active:scale-95 transition-transform"
            aria-label={t("aria.prev_motivo")}
            onClick={prev}
          >
            ‹
          </button>
          <div className="slide-dots flex gap-2">
            {MOTIVOS_CONSULTA.map((motivo, index) => (
              <button
                key={motivo.key}
                type="button"
                className={cn("dot transition-all duration-300", index === realIndex && "active scale-125")}
                aria-label={t("aria.view_motivo", { name: motivo.titulo })}
                onClick={() => goTo(index)}
              />
            ))}
          </div>
          <button
            type="button"
            className="carousel-btn text-xl w-10 h-10 flex items-center justify-center rounded-full bg-white/80 shadow-md active:scale-95 transition-transform"
            aria-label={t("aria.next_motivo")}
            onClick={next}
          >
            ›
          </button>
        </div>
      </Reveal>

      <div className="wrap relative z-10 text-center px-4">
        <p className="motivos-bottom-note text-sm mt-6 leading-relaxed">
          ¿Buscas otra cosa? También atendemos{" "}
          <button
            type="button"
            className="text-teal-700 hover:underline font-semibold"
            onClick={() => onSelectEspecialidad("general", "especialidades")}
          >
            ginecología y biopsias guiadas por imagen
          </button>
          .
        </p>
      </div>
    </section>
  );
}