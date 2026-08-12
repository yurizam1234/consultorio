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
// import { Equipo } from "@/presentation/organisms/Equipo"; // ELIMINADO
import { Testimonios } from "@/presentation/organisms/Testimonios";
import { Contacto } from "@/presentation/organisms/Contacto";
import { Encuesta } from "@/presentation/organisms/Encuesta";
import { Footer } from "@/presentation/organisms/Footer";
import { ScrollEffects } from "@/presentation/organisms/ScrollEffects";
import { LandingOverlays } from "@/presentation/pages/LandingOverlays";

// NUEVOS IMPORTS
import { QueAtendemos } from "@/presentation/organisms/QueAtendemos";
import { Especialidades } from "@/presentation/organisms/Especialidades";
import { Convenios } from "@/presentation/organisms/Convenios";
import { PreguntasFrecuentes } from "@/presentation/organisms/PreguntasFrecuentes";

// Secciones que van con divisores ECG
const DIVIDED_SECTIONS = [
  ServiciosSlider,
  AgendarInfo,
  PorQueEscogernos,
  Instalaciones,
  // Equipo, // ELIMINADO
  Testimonios,
  Contacto,
  Encuesta,
];

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

        <Especialidades initialKey={especialidadSeleccionada} />

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