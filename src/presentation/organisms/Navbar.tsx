"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLinksList } from "@/presentation/molecules/NavLinksList";
import { navLinks } from "@/shared/data/navegacion";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { cn } from "@/shared/lib/utils";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useLanguage();
  const pathname = usePathname();

  // Portal a <body>: ".navbar" tiene backdrop-filter (glass), y eso lo convierte
  // en el "containing block" de sus hijos "position: fixed" (se posicionan
  // relativos A ESE ANCESTRO en vez del viewport) — ver el mismo comentario en
  // "NavLinksList.tsx" para el drawer, que tiene el mismo problema.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Cerrar el menú móvil automáticamente al cambiar de página
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Bloquear el scroll de fondo y soportar Escape para cerrar el menú móvil
  useEffect(() => {
    if (!mobileOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setMobileOpen(false);
    }

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [mobileOpen]);

  // Scroll suave al inicio si ya estamos en la landing
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setMobileOpen(false);
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="navbar" role="banner">
      <Link
        href="/"
        className="nav-logo"
        onClick={handleLogoClick}
        aria-label="Inicio - SH Arboledas"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/logo.webp" alt="SH Arboledas" />
      </Link>

      {/* Backdrop con desenfoque para móvil */}
      {mounted && createPortal(
        <div
          className={cn("nav-mobile-backdrop", mobileOpen && "open")}
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />,
        document.body
      )}

      {/* Navegación (Desktop horizontal + Mobile Drawer normal) */}
      <NavLinksList
        links={navLinks}
        mobileOpen={mobileOpen}
        onLinkClick={() => setMobileOpen(false)}
      />

      {/* Botón Hamburguesa normal */}
      <button
        type="button"
        className={cn("burger", mobileOpen && "open")}
        aria-label={t(mobileOpen ? "aria.close_menu" : "aria.open_menu")}
        aria-expanded={mobileOpen}
        aria-controls="mobile-navigation-drawer"
        onClick={() => setMobileOpen((prev) => !prev)}
      >
        <span />
        <span />
        <span />
      </button>
    </header>
  );
}