import { LandingPage } from "@/presentation/pages/LandingPage";
import { Preloader } from "@/presentation/organisms/Preloader";

export default function Home() {
  return (
    <>
      <link rel="preload" as="video" href="/videos/hero_arboledas_scrub.mp4" type="video/mp4" />
      <LandingPage />
      <Preloader />
    </>
  );
}
