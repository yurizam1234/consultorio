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
import { EmergencyModal } from "@/presentation/organisms/EmergencyModal";
import { CitaModal } from "@/presentation/organisms/CitaModal";
import { FloatingDock } from "@/presentation/organisms/FloatingDock";
import { ScrollEffects } from "@/presentation/organisms/ScrollEffects";

export function LandingTemplate() {
  return (
    <>
      <ScrollEffects />

      <div className="landing-wrapper">
        <Navbar />
        <Hero />
        <TrustIntro />
        <EcgDivider />
        <ServiciosSlider />
        <EcgDivider />
        <AgendarInfo />
        <EcgDivider />
        <PorQueEscogernos />
        <EcgDivider />
        <Instalaciones />
        <EcgDivider />
        <Equipo />
        <EcgDivider />
        <Testimonios />
        <EcgDivider />
        <Contacto />
        <EcgDivider />
        <Encuesta />
        <Footer />
      </div>

      <EmergencyModal />
      <CitaModal />
      <FloatingDock />
    </>
  );
}