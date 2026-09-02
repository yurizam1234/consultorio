"use client";

import { navLinks } from "@/shared/data/navegacion";
import { contactoInfo } from "@/shared/data/contacto";
import { socialLinks } from "@/shared/data/socialLinks";
import { useLanguage } from "@/presentation/hooks/useLanguage";
import { Icon } from "@/presentation/atoms/Icon";

export function Footer() {
  const { t } = useLanguage();

  return (
        <footer className="footer footer-band">
          <div className="foot-brand">
            <div className="foot-logo">
              <div className="foot-logo-mark">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/img/logo-blanco.png" alt="" aria-hidden="true" />
              </div>
           
            </div>
            <p>{t("footer.desc")}</p>
            <div className="foot-badges">
              <span>{contactoInfo.cofepris}</span>
              <span>{contactoInfo.licenciaSanitaria}</span>
            </div>
          </div>
          <div className="footer-links">
            {navLinks
              .filter((link) => link.href !== "/agendar")
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
   
  );
}