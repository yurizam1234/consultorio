import { LandingPage } from "@/presentation/pages/LandingPage";
import { Preloader } from "@/presentation/organisms/Preloader";
import { EmergencyModalProvider } from "@/presentation/hooks/useEmergencyModal";
import { CitaModalProvider } from "@/presentation/hooks/useCitaModal";

export default function Home() {
  return (
    <>
      <EmergencyModalProvider>
        <CitaModalProvider>
          <LandingPage />
        </CitaModalProvider>
      </EmergencyModalProvider>
      <Preloader />
    </>
  );
}
