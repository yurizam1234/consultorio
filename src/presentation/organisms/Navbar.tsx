"use client";

import { useState } from "react";
import { NavLinksList } from "@/presentation/molecules/NavLinksList";
import { navLinks } from "@/shared/data/navegacion";
import { useLanguage } from "@/presentation/hooks/useLanguage";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <header className="navbar">
      <div className="nav-logo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/logo.png" alt="SH Arboledas" />
      </div>

      <NavLinksList links={navLinks} mobileOpen={mobileOpen} onLinkClick={() => setMobileOpen(false)} />

      <button
        className="burger"
        aria-label={t("aria.open_menu")}
        onClick={() => setMobileOpen((prev) => !prev)}
      >
        <span />
        <span />
        <span />
      </button>
    </header>
  );
}