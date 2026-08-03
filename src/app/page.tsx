import { LandingPage } from "@/presentation/pages/LandingPage";
import { Preloader } from "@/presentation/organisms/Preloader";
import { EmergencyModalProvider } from "@/presentation/hooks/useEmergencyModal";
import { CitaModalProvider } from "@/presentation/hooks/useCitaModal";

export default function Home() {
  return (
    <>
      {/* El Preloader ya mantiene la página tapada hasta que este video termine
          de descargarse (ver Preloader.tsx), pero sin este hint el navegador no
          empieza a pedirlo hasta que React hidrata y procesa el <video src> de
          Hero.tsx — con esto arranca la descarga en cuanto llega el HTML,
          adelantando ese punto de partida. Sólo el video del Hero: el de
          Contacto es secundario (mucho más abajo en el scroll) y precargarlo
          también competiría por el mismo ancho de banda justo cuando más
          importa. */}
      <link rel="preload" as="video" href="/videos/hero_arboledas_scrub.mp4" type="video/mp4" />
      <EmergencyModalProvider>
        <CitaModalProvider>
          <LandingPage />
        </CitaModalProvider>
      </EmergencyModalProvider>
      <Preloader />
    </>
  );
}
