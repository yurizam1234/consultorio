import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LanguageProvider } from "@/presentation/hooks/useLanguage";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
    <html lang="es-MX" className={`${inter.variable}`}>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
