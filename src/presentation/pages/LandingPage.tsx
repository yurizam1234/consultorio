"use client";

import { useState } from "react";
import { Navbar } from "@/presentation/organisms/Navbar";
import { Hero } from "@/presentation/organisms/Hero";
import { TrustIntro } from "@/presentation/organisms/TrustIntro";
import { ServiciosSlider } from "@/presentation/organisms/ServiciosSlider";
import { Instalaciones } from "@/presentation/organisms/Instalaciones";
import { Equipo } from "@/presentation/organisms/Equipo";
import { Testimonios } from "@/presentation/organisms/Testimonios";
import { Contacto } from "@/presentation/organisms/Contacto";
import { Footer } from "@/presentation/organisms/Footer";
import { ScrollEffects } from "@/presentation/organisms/ScrollEffects";
import { LandingOverlays } from "@/presentation/pages/LandingOverlays";

import { QueAtendemos } from "@/presentation/organisms/QueAtendemos";
import { PaquetesPreventivos } from "@/presentation/organisms/PaquetesPreventivos";
import { Convenios } from "@/presentation/organisms/Convenios";
import { PreguntasFrecuentes } from "@/presentation/organisms/PreguntasFrecuentes";

export function LandingPage() {
  const handleSelectEspecialidad = (key: string) => {
    window.location.href = `/especialidades#${key}`;
  };

  return (
    <>
      <ScrollEffects />

      <div className="landing-wrapper">
        <Navbar />
        <Hero />
        <TrustIntro />
        <QueAtendemos onSelectEspecialidad={handleSelectEspecialidad} />
        <ServiciosSlider onSelectEspecialidad={handleSelectEspecialidad} />

        {/* Sin línea antes de la primera (Instalaciones): ServiciosSlider ya
            tiene su propio corte sin costuras hacia ella (ver
            ".servicios-fullscreen-section { margin: -26px 0 }" en
            globals.css) — meter algo ahí reintroduciría el hueco. */}
        <Instalaciones />

        <Equipo />

        <Testimonios />

        <Contacto />

        <Convenios />
        
        <PreguntasFrecuentes />

        <Footer />
      </div>

      <LandingOverlays />
    </>
  );
}