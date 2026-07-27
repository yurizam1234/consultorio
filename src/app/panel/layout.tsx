import type { Metadata } from "next";
import { AuthProvider } from "@/presentation/hooks/useAuth";

export const metadata: Metadata = {
  title: "Mi panel — SH Arboledas",
  description: "Panel de paciente de SH Arboledas: agenda estudios, revisa tus solicitudes y tu perfil.",
};

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
