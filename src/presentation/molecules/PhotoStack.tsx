"use client";

import { useState, type CSSProperties } from "react";

interface PhotoStackImage {
  src: string;
  alt: string;
}

interface PhotoStackProps {
  images: PhotoStackImage[];
  className?: string;
}

// Pila de fotos superpuestas: la activa se ve completa al frente, el resto
// asoma detrás en abanico. Click en cualquiera de las de atrás la trae al
// frente (reordena por "profundidad", no por posición en el DOM, para que
// la transición de transform/opacity sea la que se anime).
export function PhotoStack({ images, className }: PhotoStackProps) {
  const [active, setActive] = useState(0);
  const count = images.length;

  return (
    <div className={className ? `photo-stack ${className}` : "photo-stack"}>
      {images.map((image, index) => {
        const depth = (index - active + count) % count;
        // La de al frente (depth 0) no reordena nada al tocarla (ya está
        // adelante) — en vez de no hacer nada, avanza a la siguiente del
        // abanico, para que las de atrás también sean alcanzables tocando
        // sólo la que se ve, sin depender de que asomen lo suficiente.
        const handleClick = () => setActive(depth === 0 ? (index + 1) % count : index);
        return (
          <button
            key={image.src}
            type="button"
            className="photo-stack-item"
            style={{ "--depth": depth } as CSSProperties}
            onClick={handleClick}
            aria-label={image.alt}
            aria-current={depth === 0}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image.src} alt={image.alt} loading="lazy" />
          </button>
        );
      })}
    </div>
  );
}
