import { LandingTemplate } from "@/presentation/templates/LandingTemplate";
import { EmergencyModalProvider } from "@/presentation/hooks/useEmergencyModal";
import { LanguageProvider } from "@/presentation/hooks/useLanguage";

export default function Home() {
  return (
    <LanguageProvider>
      <EmergencyModalProvider>
        <LandingTemplate />
      </EmergencyModalProvider>
    </LanguageProvider>
  );
}
