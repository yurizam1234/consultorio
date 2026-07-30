"use client";

import { navLinks } from "@/shared/data/navegacion";
import { contactoInfo } from "@/shared/data/contacto";
import { socialLinks } from "@/shared/data/socialLinks";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { Icon } from "@/presentation/atoms/Icon";

export function Footer() {
  const { t } = useLanguage();

  return (
    <div className="footer-band full-bleed">
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
              .filter((link) => link.href !== "/#agendar-info")
              .map((link) => (
                <a key={link.href} href={link.href}>
                  {t(link.labelKey)}
                </a>
              ))}
          </div>
          <div className="footer-social">
            {socialLinks.map((social) => (
              <a
                key={social.platform}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("aria.social_link", { platform: social.platform })}
                className="footer-social-link"
              >
                <Icon name={social.icon} strokeWidth={1.8} />
              </a>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}