import { LandingTemplate } from "@/presentation/templates/LandingTemplate";
import { CitaModalProvider } from "@/presentation/hooks/useCitaModal";

export default function Home() {
  return (
    <CitaModalProvider>
      <LandingTemplate />
    </CitaModalProvider>
  );
}
