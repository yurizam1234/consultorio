"use client";

import { Navbar } from "@/presentation/organisms/Navbar";
import { Footer } from "@/presentation/organisms/Footer";
import { ScrollEffects } from "@/presentation/organisms/ScrollEffects";
import { LandingOverlays } from "@/presentation/pages/LandingOverlays";
import { AgendarInfo } from "@/presentation/organisms/AgendarInfo";
import { PorQueEscogernos } from "@/presentation/organisms/PorQueEscogernos";

export default function AgendarPage() {
  return (
    <>
      <ScrollEffects />

      {/* ".navbar-expand-trigger" en el wrapper: esta página no tiene hero de
          video (a diferencia de la landing), así que el navbar debe expandirse
          desde el inicio — mismo mecanismo que /historia y /procedimientos (ver
          "navbarExpandSection" en ScrollEffects.tsx). */}
      <div className="landing-wrapper navbar-expand-trigger agendar-page">
        <Navbar />

        <AgendarInfo />

   
        <PorQueEscogernos />

        <Footer />
        <LandingOverlays />
      </div>
    </>
  );
}
