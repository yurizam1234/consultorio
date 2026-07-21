import { ScrollAurora } from "@/presentation/atoms/ScrollAurora";
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

export function LandingTemplate() {
  return (
    <>
      <ScrollAurora />

      <div className="landing-wrapper">
        <Navbar />
        <Hero />
        <TrustIntro />
        <ServiciosSlider />
        <AgendarInfo />
        <PorQueEscogernos />
        <Instalaciones />
        <Equipo />
        <Testimonios />
        <Contacto />
        <Footer />
      </div>

      <EmergencyFloat />
      <FloatAgendarButton />
      <CitaModal />
    </>
  );
}
