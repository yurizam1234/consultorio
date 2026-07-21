import { ScrollAurora } from "@/presentation/atoms/ScrollAurora";
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
import { EmergencyFloat } from "@/presentation/organisms/EmergencyFloat";
import { FloatAgendarButton } from "@/presentation/organisms/FloatAgendarButton";
import { CitaModal } from "@/presentation/organisms/CitaModal";
import { ScrollEffects } from "@/presentation/organisms/ScrollEffects";

export function LandingTemplate() {
  return (
    <>
      <ScrollAurora />
      <ScrollEffects />

      <div className="landing-wrapper">
        <Navbar />
        <Hero />
        <EcgDivider />
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
        <Footer />
      </div>

      <EmergencyFloat />
      <FloatAgendarButton />
      <CitaModal />
    </>
  );
}