import Link from "next/link";
import { User } from "lucide-react";
import { useAuth } from "@/presentation/hooks/useAuth";
import { useLanguage } from "@/presentation/hooks/useLanguage";

// Con sesión iniciada, "Iniciar sesión" se reemplaza por un avatar con la
// inicial del paciente (mismo estilo que ".panel-sidebar-avatar" dentro del
// panel) — mismo lugar del nav, ahora enlaza directo al panel en vez de al login.
export function PanelAccessButton() {
  const { t } = useLanguage();
  const { isAuthenticated, patient } = useAuth();

  if (isAuthenticated && patient) {
    return (
      <Link
        href="/panel"
        prefetch={false}
        className="panel-access-avatar"
        aria-label={t("panel.nav.my_panel")}
        title={t("panel.nav.my_panel")}
      >
        {patient.nombre.charAt(0)}
      </Link>
    );
  }

  return (
    <Link href="/panel/login" prefetch={false} className="panel-access-btn">
      <User size={16} strokeWidth={2} />
      {t("panel.nav.login")}
    </Link>
  );
}
