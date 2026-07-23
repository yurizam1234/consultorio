import { LandingTemplate } from "@/presentation/templates/LandingTemplate";
import { Preloader } from "@/presentation/organisms/Preloader";
import { EmergencyModalProvider } from "@/presentation/hooks/useEmergencyModal";
import { LanguageProvider } from "@/presentation/hooks/useLanguage";

export default function Home() {
  return (
    <LanguageProvider>
      <EmergencyModalProvider>
        <LandingTemplate />
      </EmergencyModalProvider>
      <Preloader />
    </LanguageProvider>
  );
}
