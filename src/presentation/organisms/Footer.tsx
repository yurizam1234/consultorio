"use client";

import { navLinks } from "@/shared/data/navegacion";
import { contactoInfo } from "@/shared/data/contacto";
import { useLanguage } from "@/presentation/hooks/useLanguage";

export function Footer() {
  const { t } = useLanguage();

  return (
    <div className="wrap">
      <footer className="footer">
        <div className="foot-brand">
          <div className="foot-logo">
            <div className="logo-icon" />
            <span>SH Arboledas</span>
          </div>
          <p>{t("footer.desc")}</p>
          <div className="foot-badges">
            <span>{contactoInfo.cofepris}</span>
            <span>{contactoInfo.licenciaSanitaria}</span>
          </div>
        </div>
        <div className="footer-links">
          {navLinks
            .filter((link) => link.href !== "#agendar-info")
            .map((link) => (
              <a key={link.href} href={link.href}>
                {t(link.labelKey)}
              </a>
            ))}
        </div>
      </footer>
    </div>
  );
}