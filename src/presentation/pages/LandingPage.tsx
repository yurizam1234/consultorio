"use client";

import { Fragment, useState } from "react";
import { EcgDivider } from "@/presentation/atoms/EcgDivider";
import { Navbar } from "@/presentation/organisms/Navbar";
import { Hero } from "@/presentation/organisms/Hero";
import { TrustIntro } from "@/presentation/organisms/TrustIntro";
import { ServiciosSlider } from "@/presentation/organisms/ServiciosSlider";
import { AgendarInfo } from "@/presentation/organisms/AgendarInfo";
import { PorQueEscogernos } from "@/presentation/organisms/PorQueEscogernos";
import { Instalaciones } from "@/presentation/organisms/Instalaciones";
import { Equipo } from "@/presentation/organisms/Equipo";
import { Testimonios } from "@/presentation/organisms/Testimonios";
import { Contacto } from "@/presentation/organisms/Contacto";
import { Footer } from "@/presentation/organisms/Footer";
import { ScrollEffects } from "@/presentation/organisms/ScrollEffects";
import { LandingOverlays } from "@/presentation/pages/LandingOverlays";

import { QueAtendemos } from "@/presentation/organisms/QueAtendemos";
import { Especialidades } from "@/presentation/organisms/Especialidades";
import { Convenios } from "@/presentation/organisms/Convenios";
import { PreguntasFrecuentes } from "@/presentation/organisms/PreguntasFrecuentes";

// Secciones que van con divisores ECG y no necesitan props propias
// (ServiciosSlider y Especialidades se renderizan aparte, arriba: ambas
// necesitan la especialidad seleccionada).
// Equipo se mantiene (no lo pidió quitar el usuario): cubre departamentos que
// Especialidades no tiene, como Enfermería, Recepción o Intendencia — y el
// link "Equipo" del navbar (navegacion.ts, "/#equipo") depende de que esta
// sección exista en la página.
const DIVIDED_SECTIONS = [AgendarInfo, PorQueEscogernos, Instalaciones, Equipo, Testimonios, Contacto];

export function LandingPage() {
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState("oftalmologia");

  const handleSelectEspecialidad = (key: string) => {
    setEspecialidadSeleccionada(key);
    const element = document.getElementById("especialidades");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <ScrollEffects />

      <div className="landing-wrapper">
        <Navbar />
        <Hero />
        <TrustIntro />

        <QueAtendemos onSelectEspecialidad={handleSelectEspecialidad} />

        <EcgDivider />

        <Especialidades selectedKey={especialidadSeleccionada} onSelectKey={setEspecialidadSeleccionada} />

        <EcgDivider />
        <ServiciosSlider onSelectEspecialidad={handleSelectEspecialidad} />

        {DIVIDED_SECTIONS.map((Section, index) => (
          <Fragment key={index}>
            <EcgDivider />
            <Section />
          </Fragment>
        ))}

        <EcgDivider />
        <Convenios />

        <EcgDivider />
        <PreguntasFrecuentes />

        <Footer />
      </div>

      <LandingOverlays />
    </>
  );
}