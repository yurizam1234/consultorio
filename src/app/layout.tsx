import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import { LanguageProvider } from "@/presentation/hooks/useLanguage";
import { AuthProvider } from "@/presentation/hooks/useAuth";
import { EmergencyModalProvider } from "@/presentation/hooks/useEmergencyModal";
import { CitaModalProvider } from "@/presentation/hooks/useCitaModal";
import { AssistantModalProvider } from "@/presentation/hooks/useAssistantModal";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "SH Arboledas — Diagnóstico y atención médica",
  description:
    "Hospital y centro de diagnóstico en Tuxtla Gutiérrez, Chiapas. Agenda en línea, especialistas certificados, imagenología de alta precisión y urgencias 24/7.",
};

// Sin esto, los navegadores móviles usan un "layout viewport" por defecto
// (~980px) en vez del ancho real del dispositivo: todo el sitio (video del
// hero incluido) se renderiza a ese ancho y luego se ve "alejado", con
// franjas en blanco a los costados en vez de ocupar la pantalla completa.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX" className={`${nunito.variable}`}>
      <body suppressHydrationWarning>
        <LanguageProvider>
          {/* A nivel raíz (no sólo dentro de /panel) para que el nav de la
              landing/Historia también sepa si hay sesión iniciada — ver
              PanelAccessButton.tsx. */}
          <AuthProvider>
            <EmergencyModalProvider>
              <CitaModalProvider>
                <AssistantModalProvider>
                  {children}
                </AssistantModalProvider>
              </CitaModalProvider>
            </EmergencyModalProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
