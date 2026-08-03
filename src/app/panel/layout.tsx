import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mi panel — SH Arboledas",
  description: "Panel de paciente de SH Arboledas: agenda estudios, revisa tus solicitudes y tu perfil.",
};

// AuthProvider ahora vive en el layout raíz (src/app/layout.tsx) — este layout
// ya no necesita envolver nada, se deja sólo por el "metadata" de esta sección.
export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
