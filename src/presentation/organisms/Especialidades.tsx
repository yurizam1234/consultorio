"use client";

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
          eyebrow="Especialidades y especialistas"
          title="Qué hacemos y quién lo hace."
          description="Cada área con sus procedimientos y los médicos que la atienden, con cédula profesional y de especialidad a la vista. Elige una para ver el detalle."
        />

        <Reveal>
          <div className="tabs" role="tablist">
            {ESPECIALIDADES_KEYS.map((key) => (
              <EspecialidadTab
                key={key}  // ← Solo la key de React
                especialidadKey={key}  // ← Prop personalizada con otro nombre
                label={ESPECIALIDADES[key].n}
                isSelected={selectedKey === key}
                onSelect={handleTabSelect}
              />
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="panel">
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
      </div>
    </section>
  );
}