"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/presentation/organisms/Navbar";
import { Footer } from "@/presentation/organisms/Footer";
import { ScrollEffects } from "@/presentation/organisms/ScrollEffects";
import { Especialidades } from "@/presentation/organisms/Especialidades";
import { LandingOverlays } from "@/presentation/pages/LandingOverlays";
import { SectionHead } from "@/presentation/molecules/SectionHead";
import { ESPECIALIDADES_KEYS } from "@/shared/data/especialidades";
import { QueAtendemos } from "@/presentation/organisms/QueAtendemos";
import { PaquetesPreventivos } from "@/presentation/organisms/PaquetesPreventivos";

export default function EspecialidadesPage() {
  const [selectedKey, setSelectedKey] = useState<string>("oftalmologia");

  useEffect(() => {
    // 1. Revisar query param ?area= (leído en cliente para evitar problemas de SSR Suspense)
    const params = new URLSearchParams(window.location.search);
    const areaQuery = params.get("area");
    if (areaQuery && ESPECIALIDADES_KEYS.includes(areaQuery)) {
      setSelectedKey(areaQuery);
      return;
    }

    // 2. Revisar URL hash #oftalmologia
    const hash = window.location.hash.replace("#", "");
    if (hash && ESPECIALIDADES_KEYS.includes(hash)) {
      setSelectedKey(hash);
    }
  }, []);

  return (
    <>
      <ScrollEffects />

      <div className="landing-wrapper" suppressHydrationWarning>
        <Navbar />

        <section className="especialidades-page-hero navbar-expand-trigger" id="especialidades-hero">
          <div className="wrap">
            <SectionHead
              eyebrow="Directorio médico y especialidades"
              title="Nuestras Especialidades Médicas"
              description="Conoce cada una de nuestras áreas de atención clínica, procedimientos especializados y el equipo médico certificado con cédula profesional a la vista."
            />
          </div>
        </section>

        <Especialidades selectedKey={selectedKey} onSelectKey={setSelectedKey} />
        <PaquetesPreventivos />
        <Footer />
        <LandingOverlays />
      </div>
    </>
  );
}
