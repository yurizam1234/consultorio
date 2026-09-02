"use client";

import { useState, useEffect, useRef } from "react";
import { Icon } from "@/presentation/atoms/Icon";
import { contactoInfo } from "@/shared/data/contacto";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { cn } from "@/shared/lib/utils";

interface ComplianceButtonProps {
  className?: string;
  variant?: "floating" | "nav";
}

export function ComplianceFloatButton({ className }: ComplianceButtonProps) {
  const [open, setOpen] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();
  const isEn = lang === "en";

  // Extraer sólo los números limpios para la acción de copiar
  const cofeprisNumber = contactoInfo.cofepris.replace(/[^a-zA-Z0-9]/g, "").replace(/^COFEPRIS/, "");
  const licSanitariaNumber = contactoInfo.licenciaSanitariaCompleta.replace(/^[^:]+:\s*/, "");

  // Cerrar al presionar Escape o al hacer click/tap fuera
  useEffect(() => {
    if (!open) return;

    const handleOutside = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const handleCopy = (text: string, key: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => {
        setCopiedKey(null);
      }, 2200);
    }
  };

  return (
    <div className={cn("compliance-wrapper", className)} ref={ref}>
      {/* Píldora de certificación elegante y profesional */}
      <button
        type="button"
        className={cn("compliance-pill-btn", open && "compliance-pill-active")}
        aria-label={isEn ? "View COFEPRIS Health Certification" : "Ver certificación oficial COFEPRIS y Licencia Sanitaria"}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="compliance-pill-glow" aria-hidden="true" />
        <span className="compliance-pill-shimmer" aria-hidden="true" />
        
        <span className="compliance-pill-icon-wrap">
          <Icon name="shield-check" strokeWidth={2.2} />
          <span className="compliance-pill-pulse-dot" aria-hidden="true" />
        </span>

        <span className="compliance-pill-text">
          <span className="compliance-pill-label">
            {isEn ? "COFEPRIS" : "COFEPRIS"}
          </span>
        </span>

        <span className={cn("compliance-pill-chevron", open && "compliance-pill-chevron-open")}>
          <Icon name="chevron-down" strokeWidth={2.4} />
        </span>
      </button>

      {/* Tarjeta modal flotante de acreditación oficial */}
      <div
        className={cn("compliance-modal-card", open && "compliance-modal-open")}
        role="dialog"
        aria-label={isEn ? "Official Health Accreditation" : "Acreditación Sanitaria Oficial"}
        aria-hidden={!open}
      >
        {/* Encabezado */}
        <div className="compliance-modal-header">
          <div className="compliance-modal-badge">
            <span className="compliance-status-dot-live" />
            <span>{isEn ? "Official SSA Accreditation" : "Acreditación Oficial SSA"}</span>
          </div>
          <button
            type="button"
            className="compliance-modal-close"
            onClick={() => setOpen(false)}
            aria-label={isEn ? "Close" : "Cerrar"}
          >
            <Icon name="x" strokeWidth={2.2} />
          </button>
        </div>

        <div className="compliance-modal-intro">
          <h3 className="compliance-modal-title">
            {isEn ? "Sanitary & Health Registry" : "Certificación Sanitaria y Licencias"}
          </h3>
          <p className="compliance-modal-subtitle">
            {isEn
              ? "Verified regulatory compliance by the Federal Commission for the Protection against Sanitary Risk (COFEPRIS)."
              : "Cumplimiento normativo avalado por la Comisión Federal para la Protección contra Riesgos Sanitarios (COFEPRIS)."}
          </p>
        </div>

        {/* Lista de acreditaciones con copiado rápido */}
        <div className="compliance-items-list">
          {/* Card 1: Aviso de Funcionamiento */}
          <div className="compliance-item-card">
            <div className="compliance-item-head">
              <div className="compliance-item-icon-box">
                <Icon name="shield-check" strokeWidth={2} />
              </div>
              <div className="compliance-item-info">
                <span className="compliance-item-type">
                  {isEn ? "Operating Notice" : "Aviso de Funcionamiento"}
                </span>
                <span className="compliance-item-code">{contactoInfo.cofeprisCompleto}</span>
              </div>
              <span className="compliance-tag-status">
                {isEn ? "Active" : "Vigente"}
              </span>
            </div>

            <button
              type="button"
              className={cn("compliance-copy-btn", copiedKey === "cofepris" && "compliance-copy-btn-success")}
              onClick={() => handleCopy(cofeprisNumber, "cofepris")}
              aria-label={isEn ? "Copy COFEPRIS notice code" : "Copiar folio de aviso COFEPRIS"}
            >
              <Icon name={copiedKey === "cofepris" ? "check" : "copy"} strokeWidth={2} />
              <span>{copiedKey === "cofepris" ? (isEn ? "Copied!" : "¡Copiado!") : (isEn ? "Copy folio" : "Copiar folio")}</span>
            </button>
          </div>

          {/* Card 2: Licencia Sanitaria */}
          <div className="compliance-item-card">
            <div className="compliance-item-head">
              <div className="compliance-item-icon-box compliance-item-icon-box-teal">
                <Icon name="building" strokeWidth={2} />
              </div>
              <div className="compliance-item-info">
                <span className="compliance-item-type">
                  {isEn ? "Sanitary License" : "Licencia Sanitaria Quirúrgica"}
                </span>
                <span className="compliance-item-code">{contactoInfo.licenciaSanitariaCompleta}</span>
              </div>
              <span className="compliance-tag-status">
                {isEn ? "Approved" : "Aprobada"}
              </span>
            </div>

            <button
              type="button"
              className={cn("compliance-copy-btn", copiedKey === "licencia" && "compliance-copy-btn-success")}
              onClick={() => handleCopy(licSanitariaNumber, "licencia")}
              aria-label={isEn ? "Copy sanitary license code" : "Copiar folio de licencia sanitaria"}
            >
              <Icon name={copiedKey === "licencia" ? "check" : "copy"} strokeWidth={2} />
              <span>{copiedKey === "licencia" ? (isEn ? "Copied!" : "¡Copiado!") : (isEn ? "Copy folio" : "Copiar folio")}</span>
            </button>
          </div>
        </div>

        {/* Footer con sello de garantía */}
        <div className="compliance-modal-footer">
          <Icon name="check-circle" strokeWidth={2} />
          <span>
            {isEn
              ? "Facilities and medical personnel certified under the General Health Law regulations."
              : "Instalaciones, quirófanos y médicos certificados bajo la normativa de la Ley General de Salud."}
          </span>
        </div>
      </div>
    </div>
  );
}
