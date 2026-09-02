"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { User } from "lucide-react";
import { useLanguage } from "@/presentation/hooks/useLanguage";

const PORTAL_URL = process.env.NEXT_PUBLIC_PORTAL_URL || "/portal-paciente";
const CHECK_SESSION_URL = "https://siha.com.mx/arboledas/api/check_session.php";

interface SessionUser {
  id: string | number;
  nombres: string;
  correo: string;
  iniciales: string;
}

interface SessionResponse {
  authenticated: boolean;
  user: SessionUser | null;
}

// Con sesión iniciada en el Portal del Paciente (siha), "Iniciar sesión" se
// reemplaza por un avatar con la inicial del paciente (mismo estilo que
// ".panel-sidebar-avatar" dentro del panel interno) — mismo lugar del nav,
// ahora enlaza directo al portal externo en vez de a /panel.
export function PanelAccessButton() {
  const { t } = useLanguage();

  const [loading, setLoading] = useState(true);
  const [sessionUser, setSessionUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function checkSession() {
      try {
        const response = await fetch(CHECK_SESSION_URL, {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data: SessionResponse = await response.json();

        if (!cancelled) {
          setSessionUser(data.authenticated ? data.user : null);
        }
      } catch (error) {
        console.error("No se pudo comprobar la sesión del Portal:", error);

        if (!cancelled) {
          setSessionUser(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    checkSession();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <span className="panel-access-btn" aria-hidden="true">
        <User size={16} strokeWidth={2} />
      </span>
    );
  }

  if (sessionUser) {
    return (
      <Link
        href={PORTAL_URL}
        prefetch={false}
        className="panel-access-avatar"
        aria-label={t("panel.nav.my_panel")}
        title={sessionUser.nombres || t("panel.nav.my_panel")}
      >
        {sessionUser.iniciales || sessionUser.nombres.charAt(0)}
      </Link>
    );
  }

  return (
    <Link href={PORTAL_URL} prefetch={false} className="panel-access-btn">
      <User size={16} strokeWidth={2} />
      {t("panel.nav.login")}
    </Link>
  );
}
