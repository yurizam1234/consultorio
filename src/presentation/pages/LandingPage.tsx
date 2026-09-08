"use client";

import { useState } from "react";
import { Navbar } from "@/presentation/organisms/Navbar";
import { Hero } from "@/presentation/organisms/Hero";
import { TrustIntro } from "@/presentation/organisms/TrustIntro";
// import { ServiciosSlider } from "@/presentation/organisms/ServiciosSlider";
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
        {/* <ServiciosSlider onSelectEspecialidad={handleSelectEspecialidad} /> */}

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