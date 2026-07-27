"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/presentation/hooks/useAuth";
import { ImagingBookingModalProvider } from "@/presentation/hooks/useImagingBookingModal";
import { SolicitudesProvider } from "@/presentation/hooks/useSolicitudes";
import { PanelSidebar } from "@/presentation/organisms/PanelSidebar";
import { ImagingBookingModal } from "@/presentation/organisms/ImagingBookingModal";
import { Footer } from "@/presentation/organisms/Footer";

export default function PanelProtectedLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  // Candado de acceso del lado del cliente: no hay sesión de servidor (export
  // estático), así que se valida contra localStorage y se redirige si no hay sesión.
  useEffect(() => {
    if (!isAuthenticated) router.replace("/panel/login");
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <SolicitudesProvider>
      <ImagingBookingModalProvider>
        <div className="panel-shell-page">
          <header className="panel-topbar">
            <Link href="/" className="panel-topbar-logo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/logo.png" alt="SH Arboledas" />
            </Link>
          </header>

          <div className="panel-shell-wrap panel-shell">
            <PanelSidebar />
            <main className="panel-main">{children}</main>
          </div>
          <Footer />
        </div>
        <ImagingBookingModal />
      </ImagingBookingModalProvider>
    </SolicitudesProvider>
  );
}
