"use client";

import { useState } from "react";
import { NavLinksList } from "@/presentation/molecules/NavLinksList";
import { navLinks } from "@/shared/data/navegacion";
import { useCitaModal } from "@/presentation/hooks/useCitaModal";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { open } = useCitaModal();

  return (
    <div className="wrap">
      <header className="navbar">
        <div className="nav-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/logo.png" alt="SH Arboledas" />
        </div>

        <NavLinksList
          links={navLinks}
          mobileOpen={mobileOpen}
          onLinkClick={() => setMobileOpen(false)}
          onOpenCita={open}
        />

        <button className="burger" aria-label="Abrir menú" onClick={() => setMobileOpen((prev) => !prev)}>
          <span />
          <span />
          <span />
        </button>
      </header>
    </div>
  );
}
