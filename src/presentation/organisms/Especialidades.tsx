"use client";

import { useState, useEffect } from "react";
import { SectionHead } from "@/presentation/molecules/SectionHead";
import { EspecialidadTab } from "@/presentation/molecules/EspecialidadTab";
import { ProcedimientoItem } from "@/presentation/molecules/ProcedimientoItem";
import { MedicoCard } from "@/presentation/molecules/MedicoCard";
import { ESPECIALIDADES, ESPECIALIDADES_KEYS } from "@/shared/data/especialidades";
import { Reveal } from "@/presentation/atoms/Reveal";
import { cn } from "@/shared/lib/utils";

interface EspecialidadesProps {
  initialKey?: string;
}

export function Especialidades({ initialKey = "oftalmologia" }: EspecialidadesProps) {
  const [selectedKey, setSelectedKey] = useState(initialKey);
  const especialidad = ESPECIALIDADES[selectedKey];

  // Actualizar cuando cambia initialKey desde fuera
  useEffect(() => {
    setSelectedKey(initialKey);
  }, [initialKey]);

  const handleTabSelect = (key: string) => {
    setSelectedKey(key);
    // Actualizar URL hash sin scroll
    window.history.pushState(null, "", `#${key}`);
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
                <a className="btn btn-primario" href="#cita">
                  Agendar en esta área
                </a>
                <a
                  className="btn btn-linea"
                  href="https://wa.me/529616029586"
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