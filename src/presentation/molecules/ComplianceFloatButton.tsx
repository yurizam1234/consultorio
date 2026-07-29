"use client";

import { useState, useEffect, useRef } from "react";
import { Icon } from "@/presentation/atoms/Icon";
import { contactoInfo } from "@/shared/data/contacto";

// Botón circular flotante (igual al de WhatsApp) que al presionarse muestra
// un tooltip con el número COFEPRIS y la Licencia Sanitaria completos.
// La clase "compliance-float-visible" la agrega/quita ScrollEffects.tsx.
export function ComplianceFloatButton() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Cerrar al hacer click fuera
  useEffect(() => {
    if (!open) return;
    const handleOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [open]);

  return (
    <div className="compliance-float-badge" ref={ref}>
      {/* Tooltip con la información completa */}
      <div className={`compliance-tooltip${open ? " compliance-tooltip-open" : ""}`} role="tooltip">
        <p className="compliance-tooltip-title">Certificación Sanitaria</p>
        <div className="compliance-tooltip-row">
          <Icon name="shield-check" strokeWidth={2} />
          <span>{contactoInfo.cofeprisCompleto}</span>
        </div>
        <div className="compliance-tooltip-row">
          <Icon name="shield-check" strokeWidth={2} />
          <span>{contactoInfo.licenciaSanitariaCompleta}</span>
        </div>
      </div>

      {/* Botón circular */}
      <button
        type="button"
        className="compliance-float-btn"
        aria-label="Ver certificación COFEPRIS"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <Icon name="shield-check" strokeWidth={2} />
      </button>
    </div>
  );
}
