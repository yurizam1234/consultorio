import { LandingPage } from "@/presentation/pages/LandingPage";
import { Preloader } from "@/presentation/organisms/Preloader";

export default function Home() {
  return (
    <>
      {/* La foto del hero es lo primero que se ve: se pide con prioridad alta
          desde el <head>, antes de que el navegador llegue a leer el <img>. */}
      <link rel="preload" as="image" href="/hero/hospital.webp" fetchPriority="high" />
      <LandingPage />
      <Preloader />
    </>
  );
}
