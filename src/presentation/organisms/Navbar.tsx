"use client";

import { useEffect, useState } from "react";
import { NavLinksList } from "@/presentation/molecules/NavLinksList";
import { navLinks } from "@/shared/data/navegacion";
import { useLanguage } from "@/presentation/hooks/useLanguage";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useLanguage();

  // Mismo patrón que LangSwitch/DatePickerField: cerrar con Escape además de
  // con el botón — no sólo por consistencia, el botón también podía quedar
  // tapado por el propio menú (ver ".burger" en globals.css).
  useEffect(() => {
    if (!mobileOpen) return;
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setMobileOpen(false);
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [mobileOpen]);

  return (
    <header className="navbar">
      <div className="nav-logo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/logo.png" alt="SH Arboledas" />
      </div>

      {mobileOpen && <div className="nav-mobile-backdrop" onClick={() => setMobileOpen(false)} />}

      <NavLinksList links={navLinks} mobileOpen={mobileOpen} onLinkClick={() => setMobileOpen(false)} />

      <button
        className={`burger${mobileOpen ? " open" : ""}`}
        aria-label={t(mobileOpen ? "aria.close_menu" : "aria.open_menu")}
        onClick={() => setMobileOpen((prev) => !prev)}
      >
        <span />
        <span />
        <span />
      </button>
    </header>
  );
}