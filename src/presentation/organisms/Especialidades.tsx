"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent, MouseEvent as ReactMouseEvent } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { SectionHead } from "@/presentation/molecules/SectionHead";
import { EspecialidadTab } from "@/presentation/molecules/EspecialidadTab";
import { ProcedimientoItem } from "@/presentation/molecules/ProcedimientoItem";
import { MedicoCard } from "@/presentation/molecules/MedicoCard";
import { ESPECIALIDADES, ESPECIALIDADES_KEYS } from "@/shared/data/especialidades";
import { Reveal } from "@/presentation/atoms/Reveal";
import { contactoInfo } from "@/shared/data/contacto";
import { useCitaModal } from "@/presentation/hooks/useCitaModal";
import { CITA_PRESELECT_EVENT } from "@/presentation/hooks/useCitaBooking";

interface EspecialidadesProps {
  // Controlado desde LandingPage: así "¿Qué necesitas atender?" puede
  // seleccionar una especialidad desde afuera sin duplicar el estado ni
  // sincronizarlo con un efecto (ver el useState+useEffect que había antes
  // acá — React lo marca como anti-patrón: "derived state via effect").
  selectedKey: string;
  onSelectKey: (key: string) => void;
}

export function Especialidades({ selectedKey, onSelectKey }: EspecialidadesProps) {
  const especialidad = ESPECIALIDADES[selectedKey];
  const { open: openCita } = useCitaModal();

  // Buscador: filtra las pestañas por nombre de especialidad o por cualquiera
  // de sus procedimientos (así "endoscopía" encuentra "Gastroenterología" sin
  // que el usuario tenga que saber el nombre exacto de la especialidad).
  const [query, setQuery] = useState("");
  const filteredKeys = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ESPECIALIDADES_KEYS;
    return ESPECIALIDADES_KEYS.filter((key) => {
      const esp = ESPECIALIDADES[key];
      return (
        esp.n.toLowerCase().includes(q) ||
        esp.procs.some((proc) => proc.n.toLowerCase().includes(q))
      );
    });
  }, [query]);

  // Si el filtro deja afuera a la especialidad seleccionada, se salta al
  // primer resultado — evita mostrar un panel que ya no tiene pestaña activa.
  useEffect(() => {
    if (filteredKeys.length > 0 && !filteredKeys.includes(selectedKey)) {
      onSelectKey(filteredKeys[0]);
    }
  }, [filteredKeys, selectedKey, onSelectKey]);

  // Tira de especialidades: se desplaza con flechas y también se puede
  // arrastrar con el mouse (mismo patrón que ".procedimientos-filter-row"
  // en /procedimientos, ver ese archivo para más contexto de cada parte).
  const tabsRef = useRef<HTMLDivElement>(null);
  const [draggingTabs, setDraggingTabs] = useState(false);
  const dragState = useRef({ pointerId: 0, isDown: false, startX: 0, startScrollLeft: 0, moved: false });

  function scrollTabs(direction: 1 | -1) {
    tabsRef.current?.scrollBy({ left: direction * 220, behavior: "smooth" });
  }

  function handleTabsPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    const el = tabsRef.current;
    if (!el) return;
    // No se captura el puntero aquí todavía — capturar de inmediato en el
    // pointerdown redirige el mouseup/click resultante al contenedor en vez
    // del <button>, matando el click normal. Sólo se captura si el gesto se
    // confirma como arrastre (ver handleTabsPointerMove).
    dragState.current = { pointerId: event.pointerId, isDown: true, startX: event.clientX, startScrollLeft: el.scrollLeft, moved: false };
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

  // Un arrastre real no debe además disparar el click del tab que quedó
  // debajo del cursor al soltar.
  function handleTabsClickCapture(event: ReactMouseEvent<HTMLDivElement>) {
    if (dragState.current.moved) {
      event.stopPropagation();
      event.preventDefault();
      dragState.current.moved = false;
    }
  }

  const handleTabSelect = (key: string) => {
    onSelectKey(key);
    // Actualizar URL hash sin scroll
    window.history.pushState(null, "", `#${key}`);
  };

  // "Agendar en esta área": abre el modal de citas con esta especialidad ya
  // preseleccionada (mismo evento que usa el carrusel de Servicios, ver
  // useCitaBooking.ts — las keys de ambos catálogos coinciden 1 a 1).
  const handleAgendar = (event: React.MouseEvent) => {
    event.preventDefault();
    window.dispatchEvent(new CustomEvent(CITA_PRESELECT_EVENT, { detail: { areaId: selectedKey } }));
    openCita();
  };

  // Filtrar procedimientos que no sean "Todavía no lo sé"
  const procedimientosFiltrados = especialidad.procs.filter(
    (p) => p.n !== "Todavía no lo sé"
  );

  return (
    <section id="especialidades">
      <div className="wrap">
        <SectionHead
        
        />

        <Reveal>
          <div className="especialidades-search-row">
            <label className="procedimientos-search">
              <Search size={18} strokeWidth={1.8} />
              <input
                type="text"
                placeholder="Buscar especialidad o procedimiento..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>
          </div>

          <div className="especialidades-tabs-row">
              <button
                type="button"
                className="carousel-btn"
                aria-label="Especialidad anterior"
                onClick={() => scrollTabs(-1)}
              >
                ‹
              </button>
              <div
                className={"tabs" + (draggingTabs ? " dragging" : "")}
                role="tablist"
                ref={tabsRef}
                onPointerDown={handleTabsPointerDown}
                onPointerMove={handleTabsPointerMove}
                onPointerUp={endTabsDrag}
                onPointerCancel={endTabsDrag}
                onClickCapture={handleTabsClickCapture}
              >
                {filteredKeys.map((key) => (
                  <EspecialidadTab
                    key={key}  // ← Solo la key de React
                    especialidadKey={key}  // ← Prop personalizada con otro nombre
                    label={ESPECIALIDADES[key].n}
                    isSelected={selectedKey === key}
                    onSelect={handleTabSelect}
                  />
                ))}
              </div>
              <button
                type="button"
                className="carousel-btn"
                aria-label="Especialidad siguiente"
                onClick={() => scrollTabs(1)}
              >
                ›
              </button>
          </div>
        </Reveal>

        {filteredKeys.length === 0 ? (
          <p className="procedimientos-empty">
            No encontramos esa especialidad o procedimiento. Prueba con otro término o{" "}
            <a href={contactoInfo.whatsappHref} target="_blank" rel="noopener noreferrer">
              pregúntanos por WhatsApp
            </a>
            .
          </p>
        ) : (
        <Reveal>
          <div className="panel">
            <div className="panel-visual">
              <Image
                key={selectedKey}
                src={especialidad.img}
                alt={especialidad.n}
                fill
                sizes="(max-width: 900px) 100vw, 900px"
                className="panel-visual-img"
                unoptimized
              />
              <div className="panel-visual-scrim" />
              <span className="panel-visual-tag">{especialidad.n}</span>
            </div>

            <div className="panel-info">
              <h3>{especialidad.n}</h3>
              <p>{especialidad.d}</p>
              <ul className="lista-proc">
                {procedimientosFiltrados.map((proc, index) => (
                  <ProcedimientoItem
                    key={index}
                    nombre={proc.n}
                    tag={proc.tag}
                  />
                ))}
              </ul>
              <div className="panel-acciones">
                <a className="btn btn-primario" href="#cita" onClick={handleAgendar}>
                  Agendar en esta área
                </a>
                <a
                  className="btn btn-linea"
                  href={contactoInfo.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Preguntar por WhatsApp
                </a>
              </div>
            </div>

            <div>
              <p className="eyebrow" style={{ marginBottom: "14px" }}>
                Quién te atiende
              </p>
              <div className="medicos">
                {especialidad.med.map((medico, index) => (
                  <MedicoCard
                    key={index}
                    nombre={medico.n}
                    especialidad={medico.e}
                    cedula={medico.c}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Puedes verificar cualquier cédula en el Registro Nacional de
                Profesionistas de la SEP.
              </p>
            </div>
          </div>
        </Reveal>
        )}
      </div>
    </section>
  );
}