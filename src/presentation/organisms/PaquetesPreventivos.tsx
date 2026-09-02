"use client";

import { useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent, MouseEvent as ReactMouseEvent } from "react";
import Image from "next/image";
import { SectionHead } from "@/presentation/molecules/SectionHead";
import { ProcedimientoItem } from "@/presentation/molecules/ProcedimientoItem";
import { MedicoCard } from "@/presentation/molecules/MedicoCard";
import { PAQUETES_PREVENTIVOS, PAQUETES_PREVENTIVOS_KEYS } from "@/shared/data/paquetesPreventivos";
import { Reveal } from "@/presentation/atoms/Reveal";
import { Icon } from "@/presentation/atoms/Icon";
import { contactoInfo } from "@/shared/data/contacto";
import { useCitaModal } from "@/presentation/hooks/useCitaModal";
import { CITA_PRESELECT_EVENT } from "@/presentation/hooks/useCitaBooking";
import { cn } from "@/shared/lib/utils";

interface PaquetesPreventivosProps {
  initialKey?: string;
}

export function PaquetesPreventivos({ initialKey = "basico" }: PaquetesPreventivosProps) {
  const [selectedKey, setSelectedKey] = useState<string>(initialKey);
  const paquete = PAQUETES_PREVENTIVOS[selectedKey] ?? PAQUETES_PREVENTIVOS.basico;
  const { open: openCita } = useCitaModal();

  // Tira de paquetes arrastrable y navegable con flechas
  const tabsRef = useRef<HTMLDivElement>(null);
  const [draggingTabs, setDraggingTabs] = useState(false);
  const dragState = useRef({ pointerId: 0, isDown: false, startX: 0, startScrollLeft: 0, moved: false });

  function scrollTabs(direction: 1 | -1) {
    tabsRef.current?.scrollBy({ left: direction * 220, behavior: "smooth" });
  }

  function handleTabsPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    const el = tabsRef.current;
    if (!el) return;
    dragState.current = {
      pointerId: event.pointerId,
      isDown: true,
      startX: event.clientX,
      startScrollLeft: el.scrollLeft,
      moved: false,
    };
  }

  function handleTabsPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const el = tabsRef.current;
    if (!el || !dragState.current.isDown) return;
    const delta = event.clientX - dragState.current.startX;
    if (!dragState.current.moved && Math.abs(delta) > 4) {
      dragState.current.moved = true;
      setDraggingTabs(true);
      el.setPointerCapture(dragState.current.pointerId);
    }
    if (dragState.current.moved) el.scrollLeft = dragState.current.startScrollLeft - delta;
  }

  function endTabsDrag() {
    dragState.current.isDown = false;
    setDraggingTabs(false);
  }

  function handleTabsClickCapture(event: ReactMouseEvent<HTMLDivElement>) {
    if (dragState.current.moved) {
      event.stopPropagation();
      event.preventDefault();
      dragState.current.moved = false;
    }
  }

  const handleTabSelect = (key: string) => {
    setSelectedKey(key);
  };

  const handleAgendar = (event: React.MouseEvent) => {
    event.preventDefault();
    window.dispatchEvent(new CustomEvent(CITA_PRESELECT_EVENT, { detail: { areaId: "general" } }));
    openCita();
  };

  const whatsappMessage = encodeURIComponent(
    `Hola, me gustaría solicitar información y cotización del paquete "${paquete.n}".`
  );
  const whatsappUrl = `${contactoInfo.whatsappHref}?text=${whatsappMessage}`;

  return (
    <section id="paquetes-preventivos" className="paquetes-section-wrap">
      <div className="wrap">
        <SectionHead
          eyebrow="Medicina preventiva y diagnóstico"
          title="Paquetes de salud y check-ups."
          description="Estudios coordinados en una sola visita para cuidar de ti y tu familia con resultados claros, interpretación médica y precios accesibles."
        />

        <Reveal>
          <div className="especialidades-tabs-row">
            <button
              type="button"
              className="carousel-btn"
              aria-label="Paquete anterior"
              onClick={() => scrollTabs(-1)}
            >
              ‹
            </button>
            <div
              className={cn("tabs", draggingTabs && "dragging")}
              role="tablist"
              ref={tabsRef}
              onPointerDown={handleTabsPointerDown}
              onPointerMove={handleTabsPointerMove}
              onPointerUp={endTabsDrag}
              onPointerCancel={endTabsDrag}
              onClickCapture={handleTabsClickCapture}
            >
              {PAQUETES_PREVENTIVOS_KEYS.map((key) => {
                const item = PAQUETES_PREVENTIVOS[key];
                const isSelected = selectedKey === key;
                return (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    className={cn("tab", isSelected && "active")}
                    onClick={() => handleTabSelect(key)}
                  >
                    {item.n}
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              className="carousel-btn"
              aria-label="Paquete siguiente"
              onClick={() => scrollTabs(1)}
            >
              ›
            </button>
          </div>
        </Reveal>

        <Reveal>
          <div className="panel">
            <div className="panel-visual">
              <Image
                key={selectedKey}
                src={paquete.img}
                alt={paquete.n}
                fill
                sizes="(max-width: 900px) 100vw, 900px"
                className="panel-visual-img"
                unoptimized
              />
              <div className="panel-visual-scrim" />
              <span className="panel-visual-tag">{paquete.n}</span>
            </div>

            <div className="panel-info">
              <div className="flex items-center gap-2 mb-2">
                <span className="badge-pill-accent">
                  <Icon name="check" strokeWidth={2.4} />
                  {paquete.tag}
                </span>
                <span className="text-xs text-muted-foreground font-medium">
                  ⏱ Duración aprox: {paquete.duracion}
                </span>
              </div>

              <h3>{paquete.n}</h3>
              <p>{paquete.d}</p>

              <div className="mt-4">
                <h4 className="text-sm font-bold tracking-wide uppercase text-teal-800 mb-3">
                  Estudios y valoraciones incluidas ({paquete.procs.length})
                </h4>
                <ul className="lista-proc">
                  {paquete.procs.map((proc, index) => (
                    <ProcedimientoItem
                      key={index}
                      nombre={proc.n}
                      tag={proc.tag}
                    />
                  ))}
                </ul>
              </div>

              <div className="paquete-indicaciones-box">
                <div className="flex items-start gap-2.5">
                  <span className="text-teal-600 mt-0.5 flex-none">
                    <Icon name="info" strokeWidth={2.2} />
                  </span>
                  <div>
                    <strong className="text-xs uppercase tracking-wide text-teal-900 block mb-0.5">
                      Indicaciones y preparación previa
                    </strong>
                    <p className="text-xs text-muted-foreground m-0 leading-relaxed">
                      {paquete.indicaciones}
                    </p>
                  </div>
                </div>
              </div>

              <div className="panel-acciones">
                <a className="btn btn-primario" href="#cita" onClick={handleAgendar}>
                  Agendar este paquete
                </a>
                <a
                  className="btn btn-linea"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cotizar por WhatsApp
                </a>
              </div>
            </div>

            <div>
              <p className="eyebrow" style={{ marginBottom: "14px" }}>
                Coordinación y entrega médica
              </p>
              <div className="medicos">
                {paquete.med.map((medico, index) => (
                  <MedicoCard
                    key={index}
                    nombre={medico.n}
                    especialidad={medico.e}
                    cedula={medico.c}
                  />
                ))}
              </div>

              <div className="paquete-guarantee-card mt-5">
                <h5 className="font-bold text-sm text-foreground flex items-center gap-2 mb-1.5">
                  <span className="text-teal-600">✓</span> Resultados integrados en expediente
                </h5>
                <p className="text-xs text-muted-foreground leading-relaxed m-0">
                  Tus estudios de laboratorio y gabinete se entregan de forma digital e impresa, analizados en conjunto con tu médico tratante.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
