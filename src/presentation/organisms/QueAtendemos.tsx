"use client";

import { SectionHead } from "@/presentation/molecules/SectionHead";
import { MotivoCard } from "@/presentation/molecules/MotivoCard";
import { MOTIVOS_CONSULTA } from "@/shared/data/motivosConsulta";
import { Reveal } from "@/presentation/atoms/Reveal";

interface QueAtendemosProps {
  onSelectEspecialidad: (key: string) => void;
}

export function QueAtendemos({ onSelectEspecialidad }: QueAtendemosProps) {
  return (
    <section id="atender">
      <div className="wrap">
        <SectionHead
          eyebrow="Por dónde empezar"
          title="¿Qué necesitas atender?"
          description="No hace falta que sepas el nombre de la especialidad. Empieza por lo que te está pasando y nosotros te llevamos con quien corresponde."
        />

        <Reveal>
          <div className="motivos">
            {MOTIVOS_CONSULTA.map((motivo) => (
              <MotivoCard
                key={motivo.key}
                numero={motivo.numero}
                titulo={motivo.titulo}
                descripcion={motivo.descripcion}
                especialidadKey={motivo.key}
                onSelect={onSelectEspecialidad}
              />
            ))}
          </div>
        </Reveal>

        <p className="text-sm text-muted-foreground mt-6">
          ¿Buscas otra cosa? También atendemos{" "}
          <button
            className="text-teal-600 hover:underline font-medium"
            onClick={() => onSelectEspecialidad("general")}
          >
            medicina general, ginecología y obstetricia, cirugía general y biopsias guiadas por imagen
          </button>
          .
        </p>
      </div>
    </section>
  );
}