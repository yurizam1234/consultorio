"use client";

import { forwardRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import Image from "next/image";
import { cn } from "@/shared/lib/utils";

interface MotivoCardProps {
  numero: string;
  total?: string;
  especialidad?: string;
  titulo: string;
  descripcion: string;
  ubicacion?: string;
  especialidadKey: string;
  seccion: string;
  imagen?: string;
  alt?: string;
  comingSoon?: boolean;
  isActive?: boolean;
  offsetFromActive?: number;
  onSelect: (key: string, seccion: string) => void;
  onClickCard?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const MotivoCard = forwardRef<HTMLDivElement, MotivoCardProps>(function MotivoCard(
  {
    numero,
    total,
    especialidad,
    titulo,
    descripcion,
    ubicacion,
    especialidadKey,
    seccion,
    imagen,
    alt,
    comingSoon,
    isActive,
    onSelect,
    onClickCard,
    className,
    style,
  },
  ref
) {
  const [tilt, setTilt] = useState({ rotX: 0, rotY: 0, glareX: 50, glareY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: ReactMouseEvent) => {
    if (!isActive) {
      e.preventDefault();
      onClickCard?.();
      return;
    }
    e.preventDefault();
    if (comingSoon) return;
    onSelect(especialidadKey, seccion);
  };

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!isActive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = ((y - centerY) / centerY) * -6;
    const rotY = ((x - centerX) / centerX) * 6;
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setTilt({ rotX, rotY, glareX, glareY });
  };

  const handleMouseEnter = () => {
    if (isActive) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotX: 0, rotY: 0, glareX: 50, glareY: 50 });
  };

  return (
    <div
      ref={ref}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn("visionos-card", isActive && "is-active", className)}
      style={
        {
          ...style,
          "--glare-x": `${tilt.glareX.toFixed(1)}%`,
          "--glare-y": `${tilt.glareY.toFixed(1)}%`,
          transform:
            isHovered && isActive
              ? `${style?.transform || ""} rotateX(${tilt.rotX.toFixed(2)}deg) rotateY(${tilt.rotY.toFixed(2)}deg) scale(1.02)`
              : style?.transform,
        } as React.CSSProperties
      }
      role="button"
      tabIndex={0}
      aria-label={`Ver especialidad ${especialidad || titulo}`}
    >
      {/* 1. Frosted Specular Glare & Lighting Sheen */}
      <span className="visionos-card-glare" aria-hidden="true" />
      <span className="visionos-card-noise" aria-hidden="true" />

      {/* 2. Top Floating Controls Row (Match Expand + Menu from Reference) */}
      <div className="visionos-card-header">
         {/*
        <div className="visionos-expand-pill">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="15 3 21 3 21 9" />
            <polyline points="9 21 3 21 3 15" />
            <line x1="21" y1="3" x2="14" y2="10" />
            <line x1="3" y1="21" x2="10" y2="14" />
          </svg>
          <span>Expand</span>
        </div>
*/}
        <div className="visionos-menu-btn" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="2.2" />
            <circle cx="19" cy="12" r="2.2" />
            <circle cx="5" cy="12" r="2.2" />
          </svg>
        </div>
      </div>

      {/* 3. Hero Visual Image Stage */}
      {imagen && (
        <div className="visionos-card-visual">
          <div className="visionos-visual-glow" aria-hidden="true" />
          <Image
            src={imagen}
            alt={alt || titulo}
            width={320}
            height={320}
            className="visionos-visual-img"
            priority={numero === "01" || numero === "02"}
            unoptimized
          />
        </div>
      )}

      {/* 4. Bottom Frosted Glass Content Panel (Match Reference) */}
      <div className="visionos-card-body">
        {/* Title + Index Row */}
        <div className="visionos-title-bar">
          <h3 className="visionos-title">{especialidad || titulo}</h3>
          <span className="visionos-index">{numero}{total ? ` / ${total}` : ""}</span>
        </div>

        {/* Subtitle / Symptom trigger */}
        <div className="visionos-symptom-tag">
          <span>{comingSoon ? "Muy pronto" : titulo}</span>
        </div>

        {/* Description body */}
        <p className="visionos-description">{descripcion}</p>

        {/* Location & Metadata Row with Pin */}
        <div className="visionos-footer-row">
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="visionos-pin-icon"
            aria-hidden="true"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="visionos-location-text">
            {ubicacion || "Torre Médica SH Arboledas · Citas disponibles"}
          </span>
        </div>
      </div>
    </div>
  );
});
