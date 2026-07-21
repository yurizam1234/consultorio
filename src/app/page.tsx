import { LandingTemplate } from "@/presentation/templates/LandingTemplate";
import { CitaModalProvider } from "@/presentation/hooks/useCitaModal";
import { LanguageProvider } from "@/presentation/hooks/useLanguage";

export default function Home() {
  return (
    <LanguageProvider>
      <CitaModalProvider>
        <LandingTemplate />
      </CitaModalProvider>
    </LanguageProvider>
  );
}
