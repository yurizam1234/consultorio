import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { LanguageProvider } from "@/presentation/hooks/useLanguage";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX" className={`${nunito.variable}`}>
      <body suppressHydrationWarning>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
