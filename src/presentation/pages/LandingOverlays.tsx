import { EmergencyModal } from "@/presentation/organisms/EmergencyModal";
import { CitaModal } from "@/presentation/organisms/CitaModal";
import { FloatingDock } from "@/presentation/organisms/FloatingDock";
import { AssistantChatModal } from "@/presentation/organisms/AssistantChatModal";

export function LandingOverlays() {
  return (
    <>
      <EmergencyModal />
      <CitaModal />
      <FloatingDock />
      <AssistantChatModal />
    </>
  );
}
