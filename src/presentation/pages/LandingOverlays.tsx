import { EmergencyModal } from "@/presentation/organisms/EmergencyModal";
import { CitaModal } from "@/presentation/organisms/CitaModal";
import { FloatingDock } from "@/presentation/organisms/FloatingDock";
import { ComplianceFloatButton } from "../molecules/ComplianceFloatButton";

export function LandingOverlays() {
  return (
    <>
      <EmergencyModal />
      <CitaModal />
      <FloatingDock />
      {/* Botón COFEPRIS flotante (circular, igual al de WhatsApp): oculto en el
          hero, aparece al salir. La clase "compliance-float-visible" la gestiona
          ScrollEffects.tsx según el progreso del scroll. */}
      <ComplianceFloatButton />
    </>
  );
}

