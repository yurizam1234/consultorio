"use client";

import dynamic from "next/dynamic";
import { FloatingDock } from "@/presentation/organisms/FloatingDock";

// Lazy loading de los modales: arrancan cerrados, así que no hace falta
// prerenderizarlos ni meter su JS en el bundle inicial — cada uno viaja en su
// propio chunk que se baja después de la hidratación, sin frenar el primer
// pintado. El dock sí es visible desde el inicio y se importa normal.
const EmergencyModal = dynamic(
  () => import("@/presentation/organisms/EmergencyModal").then((mod) => mod.EmergencyModal),
  { ssr: false },
);
const CitaModal = dynamic(
  () => import("@/presentation/organisms/CitaModal").then((mod) => mod.CitaModal),
  { ssr: false },
);
const AssistantChatModal = dynamic(
  () => import("@/presentation/organisms/AssistantChatModal").then((mod) => mod.AssistantChatModal),
  { ssr: false },
);

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
