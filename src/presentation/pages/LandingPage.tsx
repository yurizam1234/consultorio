import { Fragment } from "react";
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
import { Encuesta } from "@/presentation/organisms/Encuesta";
import { Footer } from "@/presentation/organisms/Footer";
import { ScrollEffects } from "@/presentation/organisms/ScrollEffects";
import { LandingOverlays } from "@/presentation/pages/LandingOverlays";

const DIVIDED_SECTIONS = [
  ServiciosSlider,
  AgendarInfo,
  PorQueEscogernos,
  Instalaciones,
  Equipo,
  Testimonios,
  Contacto,
  Encuesta,
];

export function LandingPage() {
  return (
    <>
      <ScrollEffects />

      <div className="landing-wrapper">
        <Navbar />
        <Hero />
        <TrustIntro />

        {DIVIDED_SECTIONS.map((Section, index) => (
          <Fragment key={index}>
            <EcgDivider />
            <Section />
          </Fragment>
        ))}

        <Footer />
      </div>

      <LandingOverlays />
    </>
  );
}
