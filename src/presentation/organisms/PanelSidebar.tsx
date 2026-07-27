"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CalendarPlus, History, LayoutGrid, User, LogOut } from "lucide-react";
import { useAuth } from "@/presentation/hooks/useAuth";
import { useImagingBookingModal } from "@/presentation/hooks/useImagingBookingModal";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { cn } from "@/shared/lib/utils";

const navLinks = [
  { href: "/panel/solicitudes", labelKey: "panel.sidebar.solicitudes", icon: History },
  { href: "/panel/servicios", labelKey: "panel.sidebar.servicios", icon: LayoutGrid },
  { href: "/panel/perfil", labelKey: "panel.sidebar.perfil", icon: User },
] as const;

export function PanelSidebar() {
  const { t } = useLanguage();
  const { patient, logout } = useAuth();
  const { open: openAgendar } = useImagingBookingModal();
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.push("/panel/login");
  }

  return (
    <aside className="panel-sidebar">
      <div className="panel-sidebar-user">
        <div className="panel-sidebar-avatar">{patient?.nombre.charAt(0) ?? "P"}</div>
        <div className="panel-sidebar-user-text">
          <span className="panel-sidebar-greeting">{t("panel.welcome", { name: patient?.nombre.split(" ")[0] ?? "" })}</span>
          <span className="panel-sidebar-id">{patient?.id}</span>
        </div>
      </div>

      <nav className="panel-nav-list" aria-label={t("aria.panel_nav")}>
        <button type="button" className="panel-nav-item panel-nav-item-cta" onClick={openAgendar}>
          <CalendarPlus size={18} strokeWidth={1.8} />
          <span>{t("panel.sidebar.agendar")}</span>
        </button>

        {navLinks.map((item) => {
          const ItemIcon = item.icon;
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} prefetch={false} className={cn("panel-nav-item", active && "active")}>
              <ItemIcon size={18} strokeWidth={1.8} />
              <span>{t(item.labelKey)}</span>
            </Link>
          );
        })}
      </nav>

      <button type="button" className="panel-logout-btn" onClick={handleLogout}>
        <LogOut size={17} strokeWidth={1.8} />
        {t("panel.logout")}
      </button>
    </aside>
  );
}
