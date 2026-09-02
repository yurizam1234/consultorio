"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Calendar, Phone, X, ChevronRight } from "lucide-react";
import type { NavLink } from "@/shared/data/navegacion";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { useCitaModal } from "@/presentation/hooks/useCitaModal";
import { LangSwitch } from "@/presentation/molecules/LangSwitch";
import { PanelAccessButton } from "@/presentation/molecules/PanelAccessButton";
import { ComplianceFloatButton } from "@/presentation/molecules/ComplianceFloatButton";
import { FlagMX, FlagUS } from "@/presentation/atoms/FlagIcon";
import { contactoInfo } from "@/shared/data/contacto";
import { cn } from "@/shared/lib/utils";

interface NavLinksListProps {
  links: NavLink[];
  mobileOpen: boolean;
  onLinkClick?: () => void;
}

export function NavLinksList({ links, mobileOpen, onLinkClick }: NavLinksListProps) {
  const { t, lang, setLang } = useLanguage();
  const { open: openCita } = useCitaModal();
  const pathname = usePathname();

  // El drawer se monta con un portal en <body>: ".navbar" tiene backdrop-filter
  // (glass), y cualquier ancestro con backdrop-filter/filter/transform convierte
  // a sus hijos "position: fixed" en relativos A ESE ANCESTRO en vez del viewport
  // (mismo motivo que el portal de "DatePickerField.tsx") — el drawer quedaba
  // encogido a la altura del navbar (~58px) en vez de cubrir toda la pantalla.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    onLinkClick?.();

    if (href.startsWith("/#") || href.startsWith("#")) {
      const targetId = href.replace(/^\/?#/, "");
      if (pathname === "/") {
        e.preventDefault();
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) {
            const navHeight = 75;
            const elementPosition = el.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navHeight;
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          }
        }, 80);
      }
    }
  };

  return (
    <>
      {/* ===== VISTA ESCRITORIO ===== */}
      <nav className="nav-links nav-links-desktop" aria-label="Navegación principal">
        <div className="nav-links-menu">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : link.href.startsWith("/#")
                ? false
                : pathname.startsWith(link.href);

            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={cn("nav-link-item", isActive && "active")}
              >
                {t(link.labelKey)}
              </a>
            );
          })}
        </div>

        <div className="nav-actions-cluster">
          <ComplianceFloatButton />
          <LangSwitch />
          <PanelAccessButton />
        </div>
      </nav>

      {/* ===== VISTA MÓVIL (NAVBAR DE PÁGINA WEB NORMAL) ===== */}
      {mounted && createPortal(
      <aside
        id="mobile-navigation-drawer"
        className={cn("nav-links-mobile-drawer", mobileOpen && "open")}
        aria-hidden={!mobileOpen}
        role="dialog"
        aria-label={t("aria.open_menu")}
      >
        {/* Cabecera del menú móvil con Logo y Botón de cerrar */}
        <div className="mobile-drawer-header">
          <Link
            href="/"
            onClick={onLinkClick}
            className="mobile-drawer-brand"
            aria-label="Inicio - SH Arboledas"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/logo.png" alt="SH Arboledas" className="mobile-drawer-logo-img" />
          </Link>

          <button
            type="button"
            className="mobile-drawer-close-btn"
            onClick={onLinkClick}
            aria-label={t("aria.close_menu")}
          >
            <X size={22} strokeWidth={2.4} />
          </button>
        </div>

        {/* Lista limpia de enlaces del sitio web */}
        <div className="mobile-drawer-scroll-body">
          <nav className="mobile-drawer-nav-list" aria-label="Menú de navegación">
            {links.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : link.href.startsWith("/#")
                  ? false
                  : pathname.startsWith(link.href);

              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={cn(
                    "mobile-drawer-nav-item",
                    isActive && "mobile-drawer-nav-item-active"
                  )}
                >
                  <span className="mobile-drawer-nav-item-text">{t(link.labelKey)}</span>
                  <ChevronRight size={18} strokeWidth={2.2} className="mobile-drawer-nav-chevron" />
                </a>
              );
            })}
          </nav>

          {/* Acciones principales al pie */}
          <div className="mobile-drawer-bottom-section">
            {/* Botón Agendar Cita */}
            <button
              type="button"
              className="mobile-drawer-primary-cta"
              onClick={() => {
                onLinkClick?.();
                openCita();
              }}
            >
              <Calendar size={18} strokeWidth={2.2} />
              <span>{t("nav.agendar_cita")}</span>
            </button>

            {/* Teléfono de Urgencias */}
            <a
              href={`tel:${contactoInfo.telefonoUrgenciasHref}`}
              className="mobile-drawer-phone-cta"
              onClick={onLinkClick}
            >
              <span className="mobile-drawer-phone-pulse" />
              <Phone size={16} strokeWidth={2.2} />
              <span>
                {t("nav.urgencias_247")}: <strong>{contactoInfo.telefonoUrgencias}</strong>
              </span>
            </a>

            {/* Selector de idioma segmentado */}
            <div className="mobile-drawer-lang-row">
              <span className="mobile-drawer-lang-label">{t("aria.lang_menu")}</span>
              <div
                className="mobile-drawer-lang-segmented"
                role="radiogroup"
                aria-label={t("aria.lang_menu")}
              >
                <button
                  type="button"
                  className={cn(
                    "mobile-drawer-segmented-btn",
                    lang === "es" && "segmented-active"
                  )}
                  onClick={() => setLang("es")}
                  role="radio"
                  aria-checked={lang === "es"}
                >
                  <FlagMX className="lang-flag" />
                  <span>Español</span>
                </button>
                <button
                  type="button"
                  className={cn(
                    "mobile-drawer-segmented-btn",
                    lang === "en" && "segmented-active"
                  )}
                  onClick={() => setLang("en")}
                  role="radio"
                  aria-checked={lang === "en"}
                >
                  <FlagUS className="lang-flag" />
                  <span>English</span>
                </button>
              </div>
            </div>

            {/* Fila con COFEPRIS y Portal del Paciente */}
            <div className="mobile-drawer-extra-cluster">
              <ComplianceFloatButton />
              <PanelAccessButton />
            </div>
          </div>
        </div>
      </aside>,
      document.body
      )}
    </>
  );
}