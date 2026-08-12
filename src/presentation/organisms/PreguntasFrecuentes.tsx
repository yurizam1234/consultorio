"use client";

import { SectionHead } from "@/presentation/molecules/SectionHead";
import { PreguntaItem } from "@/presentation/molecules/PreguntaItem";
import { PREGUNTAS_FRECUENTES } from "@/shared/data/preguntasFrecuentes";
import { Reveal } from "@/presentation/atoms/Reveal";

export function PreguntasFrecuentes() {
  return (
    <section id="preguntas">
      <div className="wrap">
        <SectionHead
          eyebrow="Preguntas frecuentes"
          title="Lo que más nos preguntan por teléfono."
        />

        <Reveal>
          <div className="faq">
            {PREGUNTAS_FRECUENTES.map((item, index) => (
              <PreguntaItem
                key={index}
                pregunta={item.pregunta}
                respuesta={item.respuesta}
                defaultOpen={item.defaultOpen}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}