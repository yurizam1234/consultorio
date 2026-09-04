"use client";

import { SectionHead } from "@/presentation/molecules/SectionHead";
import { ConvenioLogo } from "@/presentation/molecules/ConvenioLogo";
import { CONVENIOS } from "@/shared/data/convenios";
import { Reveal } from "@/presentation/atoms/Reveal";
import { contactoInfo } from "@/shared/data/contacto";

export function Convenios() {
  return (
    <section>
      <div className="wrap">
        <SectionHead
          eyebrow="Aseguradoras y convenios"
          title="Trabajamos con tu seguro y hacemos el trámite por ti."
          description="Nuestra área de trámites gestiona la carta de autorización, el pago directo y los documentos con tu aseguradora. Tú solo traes tu póliza e identificación."
        />

        <Reveal>
          <div className="convenios">
            {CONVENIOS.map((nombre, index) => (
              <ConvenioLogo key={index} nombre={nombre} />
            ))}
          </div>
        </Reveal>

        <p className="text-sm text-muted-foreground mt-6">
          ¿No ves tu aseguradora? Escríbenos al{" "}
          <a
            href={contactoInfo.whatsappHref}
            className="text-teal-600 hover:underline font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
	    {contactoInfo.telefonoUrgencias}
          </a>{" "}
	  o al{" "}
  <a
    href={contactoInfo.whatsappHref2}
    className="text-teal-600 hover:underline font-medium"
    target="_blank"
    rel="noopener noreferrer"
  >
    {contactoInfo.telefonoUrgencias2}
  </a>{" "}
          y revisamos tu caso. También atendemos pacientes particulares con
          costos cerrados por paquete.
        </p>
      </div>
    </section>
  );
}
